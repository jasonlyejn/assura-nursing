import { json, bad } from '../_lib/respond.js';
import { getUser, can } from '../_lib/auth.js';
import { audit } from '../_lib/audit.js';
import { createNotification } from '../_lib/notify.js';

// PATCH /api/requests/[id]  { action: 'approve'|'reject'|'cancel', note }
export async function onRequestPatch(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const r = await context.env.DB.prepare('SELECT * FROM staff_requests WHERE id=?')
    .bind(context.params.id).first();
  if (!r) return bad('Request not found', 404);

  const b = await context.request.json().catch(() => ({}));
  const note = (b.note || '').toString().slice(0, 500);

  if (b.action === 'cancel') {
    if (r.staff_id !== user.sid) return bad('Not your request', 403);
    if (r.status !== 'pending') return bad('Only a pending request can be withdrawn');
    await context.env.DB.prepare("UPDATE staff_requests SET status='cancelled' WHERE id=?").bind(r.id).run();
    return json({ ok: true });
  }

  if (!can(user, 'assign')) return bad('You do not have permission to decide requests', 403);
  if (!['approve', 'reject'].includes(b.action)) return bad('Unknown action');
  if (r.status !== 'pending') return bad('That request has already been decided');
  if (r.staff_id === user.sid) return bad('Someone else must decide your own request');

  const who = await context.env.DB.prepare('SELECT name FROM staff WHERE id=?').bind(user.sid).first();
  const adminName = (who && who.name) || 'Admin';

  await context.env.DB.prepare(
    `UPDATE staff_requests SET status=?, decided_by=?, decided_name=?, decided_at=?, decide_note=? WHERE id=?`
  ).bind(b.action === 'approve' ? 'approved' : 'rejected', user.sid,
    adminName, Date.now(), note, r.id).run();

  await audit(context.env, user.sid, 'request_' + b.action, 'staff', r.staff_id);

  // If approved, execute automatic roster assignment or case assignment
  let extraInfo = '';
  if (b.action === 'approve') {
    try {
      let data = {};
      try { data = JSON.parse(r.reason); } catch (_) {}

      if (r.type === 'slot_request' && data.case_id && r.from_date) {
        const shift = data.shift || 'AM';
        const rosterId = crypto.randomUUID();
        await context.env.DB.prepare(
          `INSERT INTO roster (id,case_id,staff_id,shift_date,shift,start_time,end_time,status,note,created_at,created_by)
           VALUES (?,?,?,?,?,?,?,?,?,?,?)
           ON CONFLICT(case_id,shift_date,shift) DO UPDATE SET
             staff_id=excluded.staff_id, status=excluded.status, note=excluded.note`
        ).bind(rosterId, data.case_id, r.staff_id, r.from_date, shift, '', '', 'confirmed', 'Approved slot request', Date.now(), user.sid).run();
        extraInfo = ` for ${data.patient_name || 'Patient'} on ${r.from_date} (${shift})`;

        // Auto-resolve any conflicting pending slot requests for the same case and date
        await context.env.DB.prepare(
          `UPDATE staff_requests SET status='rejected', decided_by=?, decided_name=?, decided_at=?, decide_note='Slot filled by another staff member'
           WHERE type='slot_request' AND from_date=? AND id<>? AND status='pending' AND reason LIKE ?`
        ).bind(user.sid, adminName, Date.now(), r.from_date, r.id, `%"case_id":"${data.case_id}"%`).run().catch(() => {});
      } else if (r.type === 'case_claim' && data.case_id) {
        await context.env.DB.prepare('UPDATE cases SET assigned_staff_id=? WHERE id=?').bind(r.staff_id, data.case_id).run();
        extraInfo = ` for case: ${data.patient_name || 'Patient'}`;
      }
    } catch (err) {
      console.error('Error auto-scheduling approved request:', err);
    }
  }

  // Notify the requesting staff member
  const notifTitle = b.action === 'approve'
    ? '✅ Shift / Case Request Approved!'
    : '❌ Request Update';

  const notifBody = b.action === 'approve'
    ? `Your request${extraInfo} was approved by ${adminName}. Check your Roster schedule!`
    : `Your request was not approved by ${adminName}.${note ? ' Note: ' + note : ''}`;

  await createNotification(
    context.env,
    r.staff_id,
    notifTitle,
    notifBody,
    'request_status',
    r.id
  );

  return json({ ok: true });
}

import { json, bad } from '../_lib/respond.js';
import { getUser, can } from '../_lib/auth.js';
import { audit } from '../_lib/audit.js';

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
  await context.env.DB.prepare(
    `UPDATE staff_requests SET status=?, decided_by=?, decided_name=?, decided_at=?, decide_note=? WHERE id=?`
  ).bind(b.action === 'approve' ? 'approved' : 'rejected', user.sid,
    (who && who.name) || '', Date.now(), note, r.id).run();

  await audit(context.env, user.sid, 'request_' + b.action, 'staff', r.staff_id);
  return json({ ok: true });
}

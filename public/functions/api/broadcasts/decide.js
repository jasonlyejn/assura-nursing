import { json, bad } from '../_lib/respond.js';
import { requireUser, can } from '../_lib/auth.js';
import { audit } from '../_lib/audit.js';
import { createNotification } from '../_lib/notify.js';

// POST /api/broadcasts/decide — Admin assigns chosen nurse to case
export async function onRequestPost(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  if (!can(r.user, 'assign')) return bad('Admin only', 403);

  const b = await context.request.json().catch(() => ({}));
  if (!b.broadcast_id || !b.staff_id) return bad('broadcast_id and staff_id are required');

  const broadcast = await context.env.DB.prepare(`
    SELECT b.*, p.name AS patient_name, c.id AS case_id
    FROM case_broadcasts b
    JOIN cases c ON c.id = b.case_id
    JOIN patients p ON p.id = c.patient_id
    WHERE b.id = ?
  `).bind(b.broadcast_id).first();

  if (!broadcast) return bad('Broadcast not found', 404);

  const chosenStaff = await context.env.DB.prepare(`
    SELECT id, name, phone FROM staff WHERE id = ?
  `).bind(b.staff_id).first();

  if (!chosenStaff) return bad('Selected nurse not found', 404);

  const now = Date.now();

  // 1. Mark selected application as 'selected'
  await context.env.DB.prepare(`
    UPDATE case_applications
    SET status = 'selected', decided_at = ?, decided_by = ?
    WHERE broadcast_id = ? AND staff_id = ?
  `).bind(now, r.user.sid, b.broadcast_id, b.staff_id).run();

  // 2. Mark all other applications for this broadcast as 'rejected'
  await context.env.DB.prepare(`
    UPDATE case_applications
    SET status = 'rejected', decided_at = ?, decided_by = ?
    WHERE broadcast_id = ? AND staff_id != ? AND status = 'pending'
  `).bind(now, r.user.sid, b.broadcast_id, b.staff_id).run();

  // 3. Mark broadcast as 'assigned'
  await context.env.DB.prepare(`
    UPDATE case_broadcasts
    SET status = 'assigned'
    WHERE id = ?
  `).bind(b.broadcast_id).run();

  // 4. Update the case record to assign this staff member
  await context.env.DB.prepare(`
    UPDATE cases
    SET assigned_staff_id = ?, status = 'assigned'
    WHERE id = ?
  `).bind(b.staff_id, broadcast.case_id).run();

  await audit(context.env, r.user.sid, 'case_assigned_from_broadcast', 'case', broadcast.case_id);

  // 5. Notify the winning nurse
  await createNotification(
    context.env,
    b.staff_id,
    '🎉 Case Assignment Confirmed!',
    `You have been assigned to case "${broadcast.title}" (${broadcast.patient_name}). Payout: RM ${broadcast.nurse_wage.toFixed(2)}.`,
    'case_assigned',
    broadcast.case_id
  );

  // 6. Notify other applicant nurses that the position is filled
  const { results: otherApplicants } = await context.env.DB.prepare(`
    SELECT staff_id FROM case_applications WHERE broadcast_id = ? AND staff_id != ?
  `).bind(b.broadcast_id, b.staff_id).all();

  for (const other of otherApplicants || []) {
    await createNotification(
      context.env,
      other.staff_id,
      'ℹ️ Case Update',
      `The case "${broadcast.title}" has been assigned to another nurse. Thank you for your interest!`,
      'info',
      broadcast.case_id
    );
  }

  return json({
    ok: true,
    assigned_staff_id: b.staff_id,
    assigned_staff_name: chosenStaff.name,
    case_id: broadcast.case_id,
  });
}

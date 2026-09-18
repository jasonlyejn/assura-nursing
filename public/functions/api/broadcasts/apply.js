import { json, bad } from '../_lib/respond.js';
import { requireUser } from '../_lib/auth.js';
import { audit } from '../_lib/audit.js';
import { createNotification } from '../_lib/notify.js';

// POST /api/broadcasts/apply — Nurse applies/expresses interest to take a case
export async function onRequestPost(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const user = r.user;

  const b = await context.request.json().catch(() => ({}));
  if (!b.broadcast_id) return bad('broadcast_id is required');

  const broadcast = await context.env.DB.prepare(`
    SELECT b.*, p.name AS patient_name
    FROM case_broadcasts b
    JOIN cases c ON c.id = b.case_id
    JOIN patients p ON p.id = c.patient_id
    WHERE b.id = ?
  `).bind(b.broadcast_id).first();

  if (!broadcast) return bad('Broadcast not found', 404);
  if (broadcast.status !== 'open') return bad('This case is no longer open for applications', 400);

  // Check if already applied
  const existing = await context.env.DB.prepare(`
    SELECT id, status FROM case_applications WHERE broadcast_id = ? AND staff_id = ?
  `).bind(b.broadcast_id, user.sid).first();

  if (existing) {
    if (existing.status === 'pending') return bad('You have already applied for this case');
    if (existing.status === 'selected') return bad('You are already selected for this case');
  }

  const appId = 'app_' + crypto.randomUUID().slice(0, 8);
  const now = Date.now();

  await context.env.DB.prepare(`
    INSERT INTO case_applications (id, broadcast_id, case_id, staff_id, status, note, applied_at)
    VALUES (?, ?, ?, ?, 'pending', ?, ?)
    ON CONFLICT(id) DO UPDATE SET status='pending', note=excluded.note, applied_at=excluded.applied_at
  `).bind(appId, b.broadcast_id, broadcast.case_id, user.sid, b.note || '', now).run();

  await audit(context.env, user.sid, 'case_application_submitted', 'case', broadcast.case_id);

  // Notify Admins about the application
  const { results: admins } = await context.env.DB.prepare(`
    SELECT id FROM staff WHERE role = 'admin' AND active = 1
  `).all();

  const nurseName = user.name || 'A nurse';
  for (const admin of admins || []) {
    await createNotification(
      context.env,
      admin.id,
      `🙋 Case Application: ${nurseName}`,
      `${nurseName} applied to take case "${broadcast.title}". Review and confirm assignment.`,
      'case_application',
      broadcast.case_id
    );
  }

  return json({ ok: true, application_id: appId, status: 'pending' });
}

import { json, bad } from '../_lib/respond.js';
import { requireUser } from '../_lib/auth.js';
import { audit } from '../_lib/audit.js';

// PATCH /api/escalations/:id   body { action: 'ack' }
export async function onRequestPatch(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const b = await context.request.json().catch(() => ({}));
  if (b.action !== 'ack') return bad('Unknown action');

  // Nurses may only acknowledge escalations on their own cases.
  const row = await context.env.DB.prepare(
    `SELECT e.id, c.assigned_staff_id FROM escalations e
       JOIN cases c ON c.id=e.case_id WHERE e.id=?`
  ).bind(context.params.id).first();
  if (!row) return bad('Escalation not found', 404);
  if (r.user.role !== 'admin' && row.assigned_staff_id !== r.user.sid)
    return bad('Not your case', 403);

  await context.env.DB.prepare('UPDATE escalations SET ack_by=?, ack_at=? WHERE id=?')
    .bind(r.user.sid, Date.now(), context.params.id).run();
  await audit(context.env, r.user.sid, 'escalation_ack', 'escalation', context.params.id);
  return json({ ok: true });
}

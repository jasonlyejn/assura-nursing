import { json, bad } from '../../_lib/respond.js';
import { getUser } from '../../_lib/auth.js';
import { caseFor } from '../../_lib/caseAccess.js';
import { audit } from '../../_lib/audit.js';

// PATCH /api/handover/entry/[id]  { action: 'ack' }
// The incoming nurse signs to say they have read the outgoing shift's report.
export async function onRequestPatch(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);

  const h = await context.env.DB.prepare('SELECT id,case_id,staff_id,ack_at FROM handovers WHERE id=?')
    .bind(context.params.id).first();
  if (!h) return bad('Handover not found', 404);

  const c = await caseFor(context, h.case_id, user);
  if (c.error) return c.error;

  const { action } = await context.request.json().catch(() => ({}));
  if (action !== 'ack') return bad('Unknown action');
  if (h.ack_at) return json({ ok: true, already: true });
  if (h.staff_id === user.sid) return bad("The next shift signs this, not the nurse who wrote it");

  const who = await context.env.DB.prepare('SELECT name FROM staff WHERE id=?').bind(user.sid).first();
  await context.env.DB.prepare('UPDATE handovers SET ack_by=?, ack_name=?, ack_at=? WHERE id=?')
    .bind(user.sid, (who && who.name) || '', Date.now(), h.id).run();

  await audit(context.env, user.sid, 'handover_ack', 'case', h.case_id);
  return json({ ok: true });
}

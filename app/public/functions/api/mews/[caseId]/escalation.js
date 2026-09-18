import { json, bad } from '../../_lib/respond.js';
import { requireUser } from '../../_lib/auth.js';
import { caseFor } from '../../_lib/caseAccess.js';
import { audit } from '../../_lib/audit.js';

// POST /api/mews/:caseId/escalation  body { level, total_ews, detail, col_label }
export async function onRequestPost(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const ca = await caseFor(context, context.params.caseId, r.user);
  if (ca.error) return ca.error;

  const b = await context.request.json().catch(() => ({}));
  const level = ['monitor', 'escalate', 'urgent'].includes(b.level) ? b.level : null;
  if (!level) return bad('Invalid level');

  const id = crypto.randomUUID();
  await context.env.DB.prepare(
    `INSERT INTO escalations (id,case_id,level,total_ews,detail,col_label,created_by,created_at)
     VALUES (?,?,?,?,?,?,?,?)`
  ).bind(
    id, context.params.caseId, level,
    Number.isFinite(b.total_ews) ? b.total_ews : null,
    (b.detail || '').slice(0, 500), (b.col_label || '').slice(0, 60),
    r.user.sid, Date.now()
  ).run();
  await audit(context.env, r.user.sid, 'escalation_' + level, 'case', context.params.caseId);
  return json({ ok: true, id });
}

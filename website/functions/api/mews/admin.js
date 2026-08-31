import { json, bad } from '../_lib/respond.js';
import { requireUser, can } from '../_lib/auth.js';
import { audit } from '../_lib/audit.js';

// PUT /api/mews/admin — Admin edit/correction for MEWS chart data
export async function onRequestPut(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  if (!can(r.user, 'chart')) return bad('Not authorized to edit clinical charts', 403);

  const b = await context.request.json().catch(() => ({}));
  if (!b.case_id || !b.data) return bad('case_id and data are required');

  const existing = await context.env.DB.prepare('SELECT rev FROM mews WHERE case_id=?')
    .bind(b.case_id).first();

  const newRev = ((existing && existing.rev) || 0) + 1;
  const now = Date.now();

  await context.env.DB.prepare(
    `INSERT INTO mews (case_id, data, rev, updated_at, updated_by)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(case_id) DO UPDATE SET
       data=excluded.data, rev=excluded.rev, updated_at=excluded.updated_at, updated_by=excluded.updated_by`
  ).bind(b.case_id, JSON.stringify(b.data), newRev, now, r.user.sid).run();

  await audit(context.env, r.user.sid, 'mews_admin_corrected', 'case', b.case_id);
  return json({ ok: true, rev: newRev, updated_at: now });
}

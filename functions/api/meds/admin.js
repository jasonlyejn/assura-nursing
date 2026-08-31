import { json, bad } from '../_lib/respond.js';
import { requireUser, can } from '../_lib/auth.js';
import { audit } from '../_lib/audit.js';

// PUT /api/meds/admin — Admin edit/void/correct a dose record in med_admin
export async function onRequestPut(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  if (!can(r.user, 'chart')) return bad('Not authorized to edit clinical charts', 403);

  const b = await context.request.json().catch(() => ({}));
  if (!b.id) return bad('Dose administration id is required');

  if (b.action === 'void') {
    await context.env.DB.prepare('DELETE FROM med_admin WHERE id=?').bind(b.id).run();
    await audit(context.env, r.user.sid, 'med_admin_voided', 'med_admin', b.id);
    return json({ ok: true, voided: true });
  }

  // Update status, reason, slot, given_date, given_at
  const status = b.status || 'given';
  const reason = (b.reason || '').trim();
  const slot = b.slot || 'dose';

  let givenAt = b.given_at ? Number(b.given_at) : null;
  if (!givenAt && b.given_time && b.given_date && /^\d{1,2}:\d{2}$/.test(b.given_time.trim())) {
    const [hh, mm] = b.given_time.trim().split(':').map(Number);
    const d = new Date(`${b.given_date}T00:00:00+08:00`);
    d.setHours(hh, mm, 0, 0);
    givenAt = d.getTime();
  }

  if (givenAt) {
    await context.env.DB.prepare(
      `UPDATE med_admin SET status=?, reason=?, slot=?, given_at=? WHERE id=?`
    ).bind(status, reason, slot, givenAt, b.id).run();
  } else {
    await context.env.DB.prepare(
      `UPDATE med_admin SET status=?, reason=?, slot=? WHERE id=?`
    ).bind(status, reason, slot, b.id).run();
  }

  await audit(context.env, r.user.sid, 'med_admin_corrected', 'med_admin', b.id);
  return json({ ok: true });
}

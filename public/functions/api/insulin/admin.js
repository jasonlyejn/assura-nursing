import { json, bad } from '../_lib/respond.js';
import { requireUser, can } from '../_lib/auth.js';
import { audit } from '../_lib/audit.js';

// PUT /api/insulin/admin — Admin edit/void glucose & insulin entries
export async function onRequestPut(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  if (!can(r.user, 'chart')) return bad('Not authorized to edit clinical charts', 403);

  const b = await context.request.json().catch(() => ({}));
  if (!b.id) return bad('Insulin record id is required');

  if (b.action === 'void') {
    await context.env.DB.prepare('DELETE FROM insulin_records WHERE id=?').bind(b.id).run();
    await audit(context.env, r.user.sid, 'insulin_record_voided', 'insulin', b.id);
    return json({ ok: true, voided: true });
  }

  await context.env.DB.prepare(`
    UPDATE insulin_records
    SET glucose_reading = ?, insulin_units = ?, insulin_brand = ?, injection_site = ?, meal_slot = ?, notes = ?
    WHERE id = ?
  `).bind(
    Number(b.glucose_reading) || 0,
    Number(b.insulin_units) || 0,
    b.insulin_brand || '',
    b.injection_site || '',
    b.meal_slot || 'random',
    b.notes || '',
    b.id
  ).run();

  await audit(context.env, r.user.sid, 'insulin_record_corrected', 'insulin', b.id);
  return json({ ok: true });
}

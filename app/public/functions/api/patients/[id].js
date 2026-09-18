import { json, bad } from '../_lib/respond.js';
import { requireUser, requireAdmin } from '../_lib/auth.js';
import { audit } from '../_lib/audit.js';

export async function onRequestGet(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const row = await context.env.DB.prepare('SELECT * FROM patients WHERE id=?')
    .bind(context.params.id).first();
  if (!row) return bad('Patient not found', 404);
  return json({ patient: row });
}

export async function onRequestPut(context) {
  const a = await requireAdmin(context);
  if (a.error) return a.error;
  const id = context.params.id;
  const b = await context.request.json().catch(() => ({}));
  if (!b.name || !b.name.trim()) return bad('Name is required');
  await context.env.DB.prepare(
    `UPDATE patients SET name=?, phone=?, address=?, age=?, sex=?, care_type=?, minor=?, notes=? WHERE id=?`
  ).bind(b.name.trim(), b.phone || '', b.address || '', b.age || '', b.sex || '',
    b.care_type === 'longterm' ? 'longterm' : 'procedure', b.minor ? 1 : 0, b.notes || '', id).run();
  await audit(context.env, a.user.sid, 'patient_updated', 'patient', id);
  return json({ ok: true });
}

// Create a new enquiry = a patient + a case in 'intake' status, in one step.
import { json, bad } from './_lib/respond.js';
import { requireUser } from './_lib/auth.js';
import { audit } from './_lib/audit.js';

export async function onRequestPost(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const b = await context.request.json().catch(() => ({}));
  if (!b.name || !b.name.trim()) return bad('Patient name is required');

  const now = Date.now();
  const pid = crypto.randomUUID();
  const cid = crypto.randomUUID();
  const careType = b.care_type === 'longterm' ? 'longterm' : 'procedure';
  const billing = careType === 'longterm' ? 'weekly' : 'per_visit';

  await context.env.DB.batch([
    context.env.DB.prepare(
      `INSERT INTO patients (id,name,phone,address,age,sex,care_type,consent_at,consent_by,minor,notes,created_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
    ).bind(pid, b.name.trim(), b.phone || '', b.address || '', b.age || '', b.sex || '',
      careType, b.consent ? now : null, b.consent ? r.user.sid : null,
      b.minor ? 1 : 0, b.notes || '', now),
    context.env.DB.prepare(
      `INSERT INTO cases (id,patient_id,status,billing_mode,source,created_at)
       VALUES (?,?,?,?,?,?)`
    ).bind(cid, pid, 'intake', billing, b.source || 'manual', now),
  ]);
  await audit(context.env, r.user.sid, 'intake_created', 'case', cid);
  return json({ ok: true, case_id: cid, patient_id: pid });
}

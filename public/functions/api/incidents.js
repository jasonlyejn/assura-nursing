import { json, bad } from './_lib/respond.js';
import { requireUser, can } from './_lib/auth.js';
import { audit } from './_lib/audit.js';
import { createNotification } from './_lib/notify.js';

// GET /api/incidents?case_id=...
export async function onRequestGet(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const user = r.user;

  const url = new URL(context.request.url);
  const caseId = url.searchParams.get('case_id');

  let sql = `
    SELECT i.*, p.name AS patient_name, s.name AS reporter_name, s.role AS reporter_role
    FROM clinical_incidents i
    LEFT JOIN cases c ON c.id = i.case_id
    LEFT JOIN patients p ON p.id = c.patient_id
    LEFT JOIN staff s ON s.id = i.reported_by
  `;
  const binds = [];
  if (caseId) {
    sql += ' WHERE i.case_id = ?';
    binds.push(caseId);
  }
  sql += ' ORDER BY i.created_at DESC LIMIT 100';

  const { results } = await context.env.DB.prepare(sql).bind(...binds).all();
  return json({ incidents: results || [] });
}

// POST /api/incidents — Report a clinical incident
export async function onRequestPost(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const user = r.user;

  const b = await context.request.json().catch(() => ({}));
  if (!b.incident_type || !b.description) return bad('incident_type and description are required');

  const id = 'inc_' + crypto.randomUUID().slice(0, 8);
  const now = Date.now();

  await context.env.DB.prepare(`
    INSERT INTO clinical_incidents (
      id, case_id, incident_type, severity, incident_date, incident_time,
      description, vitals_post_incident, action_taken, doctor_notified,
      family_notified, status, reported_by, created_at, investigation_notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'open', ?, ?, ?)
  `).bind(
    id, b.case_id || null, b.incident_type, b.severity || 'minor',
    b.incident_date || new Date().toISOString().split('T')[0],
    b.incident_time || new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' }),
    b.description.trim(), b.vitals_post_incident || '',
    b.action_taken || '', b.doctor_notified ? 1 : 0, b.family_notified ? 1 : 0,
    user.sid, now, b.investigation_notes || ''
  ).run();

  await audit(context.env, user.sid, 'incident_reported', 'incident', id);

  // Notify Admins
  const { results: admins } = await context.env.DB.prepare(`
    SELECT id FROM staff WHERE role = 'admin' AND active = 1
  `).all();

  for (const admin of admins || []) {
    await createNotification(
      context.env,
      admin.id,
      `🚨 Clinical Incident: ${b.incident_type.toUpperCase()} (${b.severity})`,
      `Reported by ${user.name}: "${b.description.slice(0, 80)}...". Immediate review required.`,
      'alert',
      b.case_id || ''
    );
  }

  return json({ ok: true, id });
}

// PATCH /api/incidents — Admin resolve / add investigation notes
export async function onRequestPatch(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  if (!can(r.user, 'allCases')) return bad('Admin only', 403);

  const b = await context.request.json().catch(() => ({}));
  if (!b.id) return bad('id is required');

  await context.env.DB.prepare(`
    UPDATE clinical_incidents
    SET status = ?, investigation_notes = ?
    WHERE id = ?
  `).bind(b.status || 'resolved', b.investigation_notes || '', b.id).run();

  await audit(context.env, r.user.sid, 'incident_resolved', 'incident', b.id);
  return json({ ok: true });
}

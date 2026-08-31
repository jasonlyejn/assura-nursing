import { json, bad } from '../_lib/respond.js';
import { requireUser, requireAdmin, can } from '../_lib/auth.js';
import { audit } from '../_lib/audit.js';
import { createNotification } from '../_lib/notify.js';

export async function onRequestGet(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const row = await context.env.DB.prepare(
    `SELECT c.*, p.name, p.phone, p.address, p.age, p.sex, p.care_type, p.minor, p.notes,
            p.allergies, p.case_brief, p.things_to_aware, p.things_to_do, p.medical_history,
            p.devices_tubes, p.mobility_status, p.feeding_regimen, p.emergency_contacts,
            s.name AS assigned_name
     FROM cases c JOIN patients p ON p.id=c.patient_id
     LEFT JOIN staff s ON s.id=c.assigned_staff_id WHERE c.id=?`
  ).bind(context.params.id).first();
  if (!row) return bad('Case not found', 404);
  if (!can(r.user, 'allCases') && row.assigned_staff_id !== r.user.sid) return bad('Not your case', 403);
  return json({ case: row });
}

// Actions: accept | assign | decline | activate | close | billing | update_assessment
export async function onRequestPatch(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const id = context.params.id;
  const b = await context.request.json().catch(() => ({}));
  const env = context.env;

  // Case patient assessment & summary update
  if (b.action === 'update_assessment' || b.action === 'update_summary') {
    const c = await env.DB.prepare('SELECT patient_id FROM cases WHERE id=?').bind(id).first();
    if (!c) return bad('Case not found', 404);

    const fields = [
      'case_brief', 'things_to_aware', 'things_to_do', 'medical_history',
      'devices_tubes', 'mobility_status', 'feeding_regimen', 'emergency_contacts',
      'allergies', 'notes',
    ];
    const sets = [], binds = [];
    for (const f of fields) {
      if (f in b) {
        sets.push(`${f} = ?`);
        binds.push(b[f] !== null && b[f] !== undefined ? String(b[f]).trim() : null);
      }
    }
    if (sets.length > 0) {
      binds.push(c.patient_id);
      await env.DB.prepare(`UPDATE patients SET ${sets.join(', ')} WHERE id=?`).bind(...binds).run();
      await audit(env, r.user.sid, 'case_assessment_updated', 'case', id);
    }
    return json({ ok: true });
  }

  // decline / assign / accept / close are admin decisions
  const adminActions = ['accept', 'assign', 'decline', 'close', 'billing'];  // need 'assign' capability
  if (adminActions.includes(b.action) && !can(r.user, 'assign'))
    return bad('Admin only', 403);

  let sql, binds;
  switch (b.action) {
    case 'accept':
      sql = 'UPDATE cases SET status=?, assigned_staff_id=? WHERE id=?';
      binds = ['accepted', r.user.sid, id]; break;
    case 'assign':
      if (!b.staff_id) return bad('Pick a nurse to assign');
      sql = 'UPDATE cases SET status=?, assigned_staff_id=? WHERE id=?';
      binds = ['assigned', b.staff_id, id]; break;
    case 'activate':
      sql = 'UPDATE cases SET status=? WHERE id=?';
      binds = ['active', id]; break;
    case 'decline':
      sql = 'UPDATE cases SET status=?, close_reason=?, closed_at=? WHERE id=?';
      binds = ['declined', b.reason || '', Date.now(), id]; break;
    case 'close':
      sql = 'UPDATE cases SET status=?, close_reason=?, closed_at=? WHERE id=?';
      binds = ['closed', b.reason || '', Date.now(), id]; break;
    case 'billing':
      sql = 'UPDATE cases SET billing_mode=? WHERE id=?';
      binds = [b.billing_mode === 'weekly' ? 'weekly' : 'per_visit', id]; break;
    default:
      return bad('Unknown action');
  }
  await env.DB.prepare(sql).bind(...binds).run();
  await audit(env, r.user.sid, 'case_' + b.action, 'case', id);

  if (b.action === 'assign' && b.staff_id) {
    const caseRow = await env.DB.prepare(
      `SELECT p.name AS patient_name FROM cases c
       JOIN patients p ON p.id = c.patient_id
       WHERE c.id = ?`
    ).bind(id).first();
    const patientName = caseRow ? caseRow.patient_name : 'a patient';

    await createNotification(
      env,
      b.staff_id,
      'New Case Assigned',
      `You have been assigned to care for ${patientName}. Please review the case details and schedule your visits.`,
      'case',
      `case:${id}`
    );
  }

  return json({ ok: true });
}

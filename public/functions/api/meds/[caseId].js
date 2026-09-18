import { json, bad } from '../_lib/respond.js';
import { getUser, can } from '../_lib/auth.js';
import { caseFor } from '../_lib/caseAccess.js';
import { audit } from '../_lib/audit.js';

const KINDS = ['regular', 'stat', 'prn'];

// GET /api/meds/[caseId]?from=YYYY-MM-DD&to=YYYY-MM-DD
export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const caseId = context.params.caseId;
  const c = await caseFor(context, caseId, user);
  if (c.error) return c.error;

  const p = new URL(context.request.url).searchParams;
  const from = p.get('from') || '0000-00-00';
  const to = p.get('to') || '9999-99-99';

  const [meds, admin, pt] = await Promise.all([
    context.env.DB.prepare(
      'SELECT * FROM medications WHERE case_id=? ORDER BY active DESC, kind, created_at'
    ).bind(caseId).all().then((r) => r.results || []),
    context.env.DB.prepare(
      'SELECT * FROM med_admin WHERE case_id=? AND given_date BETWEEN ? AND ? ORDER BY given_at'
    ).bind(caseId, from, to).all().then((r) => r.results || []),
    context.env.DB.prepare(
      `SELECT p.name, p.allergies FROM cases c JOIN patients p ON p.id=c.patient_id WHERE c.id=?`
    ).bind(caseId).first(),
  ]);

  return json({ meds, admin, patient: pt || {} });
}

// POST /api/meds/[caseId] — prescribe a medication
export async function onRequestPost(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const caseId = context.params.caseId;
  const c = await caseFor(context, caseId, user);
  if (c.error) return c.error;
  if (!can(user, 'chart')) return bad('You do not have permission to change medications', 403);

  const b = await context.request.json().catch(() => ({}));
  const name = (b.name || '').trim();
  if (!name) return bad('Medication name is needed');
  const kind = KINDS.includes(b.kind) ? b.kind : 'regular';

  const id = crypto.randomUUID();
  await context.env.DB.prepare(
    `INSERT INTO medications (id,case_id,kind,name,dose,route,frequency,times,start_date,end_date,
       prn,indication,max_dose,notes,active,created_at,created_by)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,?,?)`
  ).bind(id, caseId, kind, name, (b.dose || '').trim(), (b.route || '').trim(),
    (b.frequency || '').trim(), (b.times || '').trim(), b.start_date || '', b.end_date || '',
    kind === 'prn' ? 1 : 0, (b.indication || '').trim(), (b.max_dose || '').trim(),
    (b.notes || '').trim(), Date.now(), user.sid).run();

  await audit(context.env, user.sid, 'med_prescribed', 'case', caseId);
  return json({ ok: true, id });
}

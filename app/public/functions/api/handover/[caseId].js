import { json, bad } from '../_lib/respond.js';
import { getUser, can } from '../_lib/auth.js';
import { caseFor } from '../_lib/caseAccess.js';
import { audit } from '../_lib/audit.js';

const F = ['condition', 'vitals_note', 'ews', 'intake', 'output', 'bowel', 'meds_given',
           'meds_due', 'wound_note', 'mobility', 'meals', 'sleep', 'mood',
           'procedures', 'concerns', 'todo', 'family_note'];

// GET /api/handover/[caseId]  — recent handovers, newest first
export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const caseId = context.params.caseId;

  const c = await caseFor(context, caseId, user);
  if (c.error) return c.error;

  const limit = Math.min(60, Number(new URL(context.request.url).searchParams.get('limit')) || 20);
  const { results } = await context.env.DB.prepare(
    `SELECT * FROM handovers WHERE case_id=? ORDER BY shift_date DESC, created_at DESC LIMIT ?`
  ).bind(caseId, limit).all();

  // who is on before / after the current shift, so the nurse knows who to hand to
  const today = todayMY();
  const { results: today_shifts } = await context.env.DB.prepare(
    `SELECT r.shift, r.status, r.start_time, r.end_time, s.name AS staff_name, s.phone AS staff_phone
       FROM roster r JOIN staff s ON s.id=r.staff_id
      WHERE r.case_id=? AND r.shift_date IN (?, ?)
      ORDER BY r.shift_date, CASE r.shift WHEN 'AM' THEN 1 WHEN 'PM' THEN 2 ELSE 3 END`
  ).bind(caseId, today, nextDay(today)).all();

  return json({ handovers: results || [], roster: today_shifts || [], today });
}

// POST /api/handover/[caseId]  — file this shift's report
export async function onRequestPost(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  if (!can(user, 'handover')) return bad('You do not have permission to file a handover', 403);

  const caseId = context.params.caseId;
  const c = await caseFor(context, caseId, user);
  if (c.error) return c.error;

  const b = await context.request.json().catch(() => ({}));
  const shift = ['AM', 'PM', 'NIGHT'].includes(b.shift) ? b.shift : 'AM';
  const date = /^\d{4}-\d{2}-\d{2}$/.test(b.shift_date || '') ? b.shift_date : todayMY();

  if (!F.some((f) => (b[f] || '').toString().trim())) {
    return bad('Write at least something before filing the handover');
  }

  const who = await context.env.DB.prepare('SELECT name FROM staff WHERE id=?')
    .bind(user.sid).first();

  const id = crypto.randomUUID();
  const cols = ['id', 'case_id', 'shift_date', 'shift', 'staff_id', 'staff_name', ...F, 'created_at'];
  const vals = [id, caseId, date, shift, user.sid, (who && who.name) || '',
                ...F.map((f) => (b[f] || '').toString().trim()), Date.now()];

  await context.env.DB.prepare(
    `INSERT INTO handovers (${cols.join(',')}) VALUES (${cols.map(() => '?').join(',')})`
  ).bind(...vals).run();

  await audit(context.env, user.sid, 'handover_filed', 'case', caseId);
  return json({ ok: true, id });
}

function nextDay(d) {
  const t = new Date(d + 'T00:00:00Z');
  t.setUTCDate(t.getUTCDate() + 1);
  return t.toISOString().slice(0, 10);
}

function todayMY() {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  return p;
}

import { json, bad } from './_lib/respond.js';
import { getUser, can } from './_lib/auth.js';
import { audit } from './_lib/audit.js';

const SHIFTS = ['AM', 'PM', 'NIGHT'];

const SELECT = `
  SELECT r.*, s.name AS staff_name, s.role AS staff_role, s.phone AS staff_phone,
         p.name AS patient_name
  FROM roster r
  JOIN staff s ON s.id = r.staff_id
  JOIN cases c ON c.id = r.case_id
  JOIN patients p ON p.id = c.patient_id`;

// GET /api/roster?case_id=&staff_id=&mine=1&from=&to=&date=
export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const q = new URL(context.request.url).searchParams;

  const where = [], binds = [];
  if (q.get('case_id')) { where.push('r.case_id=?'); binds.push(q.get('case_id')); }
  if (q.get('date')) { where.push('r.shift_date=?'); binds.push(q.get('date')); }
  if (q.get('from')) { where.push('r.shift_date>=?'); binds.push(q.get('from')); }
  if (q.get('to')) { where.push('r.shift_date<=?'); binds.push(q.get('to')); }

  // field staff only ever see their own roster unless they can see all cases
  if (q.get('mine') === '1' || !can(user, 'allCases')) {
    where.push('r.staff_id=?'); binds.push(user.sid);
  } else if (q.get('staff_id')) {
    where.push('r.staff_id=?'); binds.push(q.get('staff_id'));
  }

  const sql = SELECT + (where.length ? ' WHERE ' + where.join(' AND ') : '')
    + " ORDER BY r.shift_date, CASE r.shift WHEN 'AM' THEN 1 WHEN 'PM' THEN 2 ELSE 3 END LIMIT 400";
  const { results } = await context.env.DB.prepare(sql).bind(...binds).all();
  return json({ roster: results || [] });
}

// POST /api/roster — schedule someone. Replaces whoever held that slot.
export async function onRequestPost(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  if (!can(user, 'assign')) return bad('You do not have permission to change the roster', 403);

  const b = await context.request.json().catch(() => ({}));
  if (!b.case_id || !b.staff_id) return bad('Pick a case and a staff member');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b.shift_date || '')) return bad('Pick a date');
  const shift = SHIFTS.includes(b.shift) ? b.shift : 'AM';

  const st = await context.env.DB.prepare('SELECT name,active FROM staff WHERE id=?')
    .bind(b.staff_id).first();
  if (!st) return bad('Staff not found', 404);
  if (!st.active) return bad(st.name + ' is inactive — reactivate them first');

  // warn if this person is already on another case for the same shift
  const clash = await context.env.DB.prepare(
    `SELECT p.name AS patient FROM roster r
      JOIN cases c ON c.id=r.case_id JOIN patients p ON p.id=c.patient_id
      WHERE r.staff_id=? AND r.shift_date=? AND r.shift=? AND r.case_id<>?`
  ).bind(b.staff_id, b.shift_date, shift, b.case_id).first();

  const id = crypto.randomUUID();
  await context.env.DB.prepare(
    `INSERT INTO roster (id,case_id,staff_id,shift_date,shift,start_time,end_time,status,note,created_at,created_by)
     VALUES (?,?,?,?,?,?,?,?,?,?,?)
     ON CONFLICT(case_id,shift_date,shift) DO UPDATE SET
       staff_id=excluded.staff_id, start_time=excluded.start_time, end_time=excluded.end_time,
       status=excluded.status, note=excluded.note`
  ).bind(id, b.case_id, b.staff_id, b.shift_date, shift, b.start_time || '', b.end_time || '',
    b.status || 'planned', b.note || '', Date.now(), user.sid).run();

  await audit(context.env, user.sid, 'roster_set', 'case', b.case_id);
  return json({ ok: true, clash: clash ? clash.patient : null });
}

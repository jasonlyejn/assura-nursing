import { json, bad } from '../_lib/respond.js';
import { getUser } from '../_lib/auth.js';
import { caseFor } from '../_lib/caseAccess.js';
import { audit } from '../_lib/audit.js';

const OK = ['given', 'refused', 'omitted', 'unavailable', 'self'];

// POST /api/meds/give  { case_id, med_id, given_date, given_time, given_at, slot, status, reason, staff_id }
// Signing or editing a dose administration record.
export async function onRequestPost(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const b = await context.request.json().catch(() => ({}));
  if (!b.case_id || !b.med_id) return bad('Missing medication');

  const c = await caseFor(context, b.case_id, user);
  if (c.error) return c.error;

  const status = OK.includes(b.status) ? b.status : 'given';
  if (status !== 'given' && status !== 'self' && !(b.reason || '').trim())
    return bad('Please state clinical reason why the dose was not given');

  const staffId = user.sid;
  const st = await context.env.DB.prepare('SELECT id,name,initials FROM staff WHERE id=? AND active=1')
    .bind(staffId).first();
  if (!st) return bad('Your staff record is not active');
  const initial = (b.staff_initial || st.initials || st.name.split(/\s+/).map((w) => w[0]).join('')).toUpperCase().slice(0, 4);

  const date = /^\d{4}-\d{2}-\d{2}$/.test(b.given_date || '') ? b.given_date : todayMY();
  const slot = (b.slot || '').toString().slice(0, 30) || 'dose';

  // Calculate administer timestamp (supports user-edited given_time HH:mm)
  let givenAt = Date.now();
  if (b.given_time && /^\d{1,2}:\d{2}$/.test(b.given_time.trim())) {
    const [hh, mm] = b.given_time.trim().split(':').map(Number);
    const d = new Date(`${date}T00:00:00+08:00`);
    d.setHours(hh, mm, 0, 0);
    givenAt = d.getTime();
  } else if (b.given_at && Number(b.given_at) > 0) {
    givenAt = Number(b.given_at);
  }

  const id = b.id || crypto.randomUUID();
  await context.env.DB.prepare(
    `INSERT INTO med_admin (id,med_id,case_id,given_date,slot,status,reason,staff_id,staff_initial,given_at)
     VALUES (?,?,?,?,?,?,?,?,?,?)
     ON CONFLICT(med_id,given_date,slot) DO UPDATE SET
       status=excluded.status, reason=excluded.reason, staff_id=excluded.staff_id,
       staff_initial=excluded.staff_initial, given_at=excluded.given_at`
  ).bind(id, b.med_id, b.case_id, date, slot, status, (b.reason || '').trim(),
    staffId, initial, givenAt).run();

  await audit(context.env, user.sid, 'med_' + status, 'case', b.case_id);
  return json({ ok: true, initial, given_at: givenAt, given_time: formatTime(givenAt) });
}

function todayMY() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

function formatTime(ts) {
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuala_Lumpur',
    hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(ts));
}

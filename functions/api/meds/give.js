import { json, bad } from '../_lib/respond.js';
import { getUser } from '../_lib/auth.js';
import { caseFor } from '../_lib/caseAccess.js';
import { audit } from '../_lib/audit.js';

const OK = ['given', 'refused', 'omitted', 'unavailable', 'self'];

// POST /api/meds/give  { case_id, med_id, given_date, slot, status, reason, staff_id }
// Signing for a dose. The initial is taken from the chosen staff record, never typed free-hand.
export async function onRequestPost(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const b = await context.request.json().catch(() => ({}));
  if (!b.case_id || !b.med_id) return bad('Missing medication');

  const c = await caseFor(context, b.case_id, user);
  if (c.error) return c.error;

  const status = OK.includes(b.status) ? b.status : 'given';
  if (status !== 'given' && !(b.reason || '').trim())
    return bad('Please say why the dose was not given');

  // Home-based care: the nurse signed in is the one giving the dose. No counter-signing.
  const staffId = user.sid;
  const st = await context.env.DB.prepare('SELECT id,name,initials FROM staff WHERE id=? AND active=1')
    .bind(staffId).first();
  if (!st) return bad('Your staff record is not active');
  const initial = (st.initials || st.name.split(/\s+/).map((w) => w[0]).join('')).toUpperCase().slice(0, 4);

  const date = /^\d{4}-\d{2}-\d{2}$/.test(b.given_date || '') ? b.given_date : todayMY();
  const slot = (b.slot || '').toString().slice(0, 20) || 'dose';

  // one signature per medicine per slot per day; signing again replaces it
  const id = crypto.randomUUID();
  await context.env.DB.prepare(
    `INSERT INTO med_admin (id,med_id,case_id,given_date,slot,status,reason,staff_id,staff_initial,given_at)
     VALUES (?,?,?,?,?,?,?,?,?,?)
     ON CONFLICT(med_id,given_date,slot) DO UPDATE SET
       status=excluded.status, reason=excluded.reason, staff_id=excluded.staff_id,
       staff_initial=excluded.staff_initial, given_at=excluded.given_at`
  ).bind(id, b.med_id, b.case_id, date, slot, status, (b.reason || '').trim(),
    staffId, initial, Date.now()).run();

  await audit(context.env, user.sid, 'med_' + status, 'case', b.case_id);
  return json({ ok: true, initial });
}

function todayMY() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

import { json, bad } from './_lib/respond.js';
import { getUser, can } from './_lib/auth.js';
import { audit } from './_lib/audit.js';
import { notifyAdmins } from './_lib/notify.js';

const TYPES = ['slot_request', 'case_claim', 'annual', 'medical', 'emergency', 'unpaid', 'offday', 'swap', 'ot', 'claim', 'other'];

// GET /api/requests?status=pending&mine=1&type=
export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const p = new URL(context.request.url).searchParams;
  const reviewer = can(user, 'assign');           // admin / supervisor / office

  const where = [], binds = [];
  if (!reviewer || p.get('mine') === '1') { where.push('staff_id=?'); binds.push(user.sid); }
  if (p.get('status')) { where.push('status=?'); binds.push(p.get('status')); }
  if (p.get('type')) { where.push('type=?'); binds.push(p.get('type')); }

  const { results } = await context.env.DB.prepare(
    'SELECT * FROM staff_requests' + (where.length ? ' WHERE ' + where.join(' AND ') : '')
    + ' ORDER BY CASE status WHEN \'pending\' THEN 0 ELSE 1 END, created_at DESC LIMIT 200'
  ).bind(...binds).all();

  let pending = 0;
  if (reviewer) {
    const r = await context.env.DB.prepare("SELECT COUNT(*) AS n FROM staff_requests WHERE status='pending'")
      .first().catch(() => null);
    pending = (r && r.n) || 0;
  }
  return json({ requests: results || [], reviewer, pending });
}

// POST /api/requests — staff apply for leave, claims, shift slots, or case claims
export async function onRequestPost(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const b = await context.request.json().catch(() => ({}));

  const type = TYPES.includes(b.type) ? b.type : null;
  if (!type) return bad('Pick what you are applying for');

  const needsDates = ['annual', 'medical', 'emergency', 'unpaid', 'offday', 'swap', 'slot_request'].includes(type);
  if (needsDates && !/^\d{4}-\d{2}-\d{2}$/.test(b.from_date || b.shift_date || '')) return bad('Pick a valid date');
  if (!((b.reason || b.note || '').trim())) return bad('Please provide details or notes for your request');

  const from = b.from_date || b.shift_date || '';
  const to = /^\d{4}-\d{2}-\d{2}$/.test(b.to_date || '') ? b.to_date : from;
  if (from && to && to < from) return bad('The end date is before the start date');

  let days = Number(b.days) || 0;
  if (needsDates && !days && from && to) {
    days = Math.round((new Date(to + 'T00:00:00Z') - new Date(from + 'T00:00:00Z')) / 86400000) + 1;
  }
  const att = b.attachment || null;
  if (att && (typeof att !== 'string' || !att.startsWith('data:image/'))) return bad('Not an image');
  if (att && att.length > 200000) return bad('Photo too large — please retake it');

  const who = await context.env.DB.prepare('SELECT name FROM staff WHERE id=?').bind(user.sid).first();
  const staffName = (who && who.name) || 'Staff Nurse';
  const id = crypto.randomUUID();

  // If slot_request or case_claim, encode structured data in reason JSON if provided
  let reasonText = (b.reason || b.note || '').toString().slice(0, 1500);
  if (type === 'slot_request' && b.case_id) {
    const shift = b.shift || 'AM';
    // Check if slot is already occupied in roster
    const occupied = await context.env.DB.prepare(
      'SELECT r.id, s.name AS staff_name FROM roster r LEFT JOIN staff s ON s.id=r.staff_id WHERE r.case_id=? AND r.shift_date=? AND r.shift=?'
    ).bind(b.case_id, from, shift).first().catch(() => null);
    if (occupied) {
      return bad(`This shift slot is already occupied by ${occupied.staff_name || 'another nurse'}.`);
    }

    // Check if this staff member already submitted a pending request for this slot
    const existing = await context.env.DB.prepare(
      "SELECT id FROM staff_requests WHERE staff_id=? AND type='slot_request' AND from_date=? AND status='pending' AND reason LIKE ?"
    ).bind(user.sid, from, `%"case_id":"${b.case_id}"%`).first().catch(() => null);
    if (existing) {
      return bad('You already have a pending request for this shift slot.');
    }

    reasonText = JSON.stringify({
      case_id: b.case_id,
      patient_name: b.patient_name || 'Patient',
      shift,
      note: b.note || b.reason || '',
    });
  } else if (type === 'case_claim' && b.case_id) {
    reasonText = JSON.stringify({
      case_id: b.case_id,
      patient_name: b.patient_name || 'Patient',
      note: b.note || b.reason || '',
    });
  }

  await context.env.DB.prepare(
    `INSERT INTO staff_requests (id,staff_id,staff_name,type,from_date,to_date,days,amount,reason,attachment,status,created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?, 'pending', ?)`
  ).bind(id, user.sid, staffName, type, from, to, days,
    Number(b.amount) || 0, reasonText, att, Date.now()).run();

  await audit(context.env, user.sid, 'request_' + type, 'staff', user.sid);

  // Notify Admins in real-time
  const notifTitle = type === 'slot_request'
    ? '🗓️ Shift Slot Request'
    : type === 'case_claim'
    ? '🙋 Case Claim Request'
    : '📥 New Staff Request';

  const desc = type === 'slot_request'
    ? `${staffName} requested ${b.shift || 'AM'} shift on ${from} (${b.patient_name || 'Patient'}). Requires admin approval.`
    : type === 'case_claim'
    ? `${staffName} requested assignment for case: ${b.patient_name || 'Patient'}.`
    : `${staffName} submitted a ${type} request for ${from}.`;

  await notifyAdmins(context.env, notifTitle, desc, 'staff_request', id);

  return json({ ok: true, id });
}

import { json, bad } from './_lib/respond.js';
import { getUser, can } from './_lib/auth.js';
import { audit } from './_lib/audit.js';

const TYPES = ['annual', 'medical', 'emergency', 'unpaid', 'offday', 'swap', 'ot', 'claim', 'other'];

// GET /api/requests?status=pending&mine=1
export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const p = new URL(context.request.url).searchParams;
  const reviewer = can(user, 'assign');           // admin / supervisor / office

  const where = [], binds = [];
  if (!reviewer || p.get('mine') === '1') { where.push('staff_id=?'); binds.push(user.sid); }
  if (p.get('status')) { where.push('status=?'); binds.push(p.get('status')); }

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

// POST /api/requests — staff apply
export async function onRequestPost(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const b = await context.request.json().catch(() => ({}));

  const type = TYPES.includes(b.type) ? b.type : null;
  if (!type) return bad('Pick what you are applying for');
  const needsDates = ['annual', 'medical', 'emergency', 'unpaid', 'offday', 'swap'].includes(type);
  if (needsDates && !/^\d{4}-\d{2}-\d{2}$/.test(b.from_date || '')) return bad('Pick a start date');
  if (!((b.reason || '').trim())) return bad('Please give a short reason');

  const from = b.from_date || '';
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
  const id = crypto.randomUUID();
  await context.env.DB.prepare(
    `INSERT INTO staff_requests (id,staff_id,staff_name,type,from_date,to_date,days,amount,reason,attachment,status,created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?, 'pending', ?)`
  ).bind(id, user.sid, (who && who.name) || '', type, from, to, days,
    Number(b.amount) || 0, (b.reason || '').toString().slice(0, 1000), att, Date.now()).run();

  await audit(context.env, user.sid, 'request_' + type, 'staff', user.sid);
  return json({ ok: true, id });
}

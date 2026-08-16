import { json, bad } from './_lib/respond.js';
import { getUser, can } from './_lib/auth.js';
import { caseFor } from './_lib/caseAccess.js';
import { audit } from './_lib/audit.js';

const n2 = (x) => Math.round((Number(x) || 0) * 100) / 100;

// GET /api/invoices            — all (managers), with outstanding totals
// GET /api/invoices?case_id=   — one case
export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const p = new URL(context.request.url).searchParams;
  const caseId = p.get('case_id');

  if (caseId) {
    const c = await caseFor(context, caseId, user);
    if (c.error) return c.error;
    const { results } = await context.env.DB.prepare(
      'SELECT * FROM invoices WHERE case_id=? ORDER BY created_at DESC'
    ).bind(caseId).all();
    return json({ invoices: (results || []).map(shape) });
  }

  if (!can(user, 'bill')) return bad('Not allowed', 403);
  const { results } = await context.env.DB.prepare(
    `SELECT i.*, p.name AS patient_name, p.phone AS patient_phone
       FROM invoices i JOIN cases c ON c.id=i.case_id JOIN patients p ON p.id=c.patient_id
      ORDER BY CASE i.status WHEN 'overdue' THEN 0 WHEN 'partial' THEN 1 WHEN 'sent' THEN 2
                             WHEN 'draft' THEN 3 ELSE 4 END, i.created_at DESC LIMIT 200`
  ).all();
  const rows = (results || []).map(shape);
  const owing = rows.filter((r) => !['paid', 'void'].includes(r.status));
  return json({ invoices: rows, summary: {
    count: rows.length,
    outstanding: n2(owing.reduce((s, r) => s + r.balance, 0)),
    overdue: n2(owing.filter((r) => r.overdue).reduce((s, r) => s + r.balance, 0)),
    thisMonth: n2(rows.filter((r) => sameMonth(r.created_at)).reduce((s, r) => s + r.total, 0)),
  } });
}

function shape(r) {
  const balance = n2((r.total || 0) - (r.paid || 0));
  const today = todayMY();
  return { ...r, lines: safe(r.lines), balance,
    overdue: balance > 0 && r.due_date && r.due_date < today && r.status !== 'paid' };
}
const safe = (s) => { try { return JSON.parse(s || '[]'); } catch (_) { return []; } };

// POST /api/invoices — raise an invoice
export async function onRequestPost(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  if (!can(user, 'bill')) return bad('You do not have permission to invoice', 403);
  const b = await context.request.json().catch(() => ({}));
  if (!b.case_id) return bad('case_id required');
  const c = await caseFor(context, b.case_id, user);
  if (c.error) return c.error;

  const lines = Array.isArray(b.lines) ? b.lines : [];
  if (!lines.length) return bad('Add at least one line');

  const subtotal = n2(lines.reduce((s, l) => s + (Number(l.amount) || 0), 0));
  const travel = n2(b.travel);
  const discount = n2(b.discount);
  const tax = n2(b.tax);                       // 0 until SST registration
  const total = n2(subtotal + travel + tax - discount);

  const row = await context.env.DB.prepare('SELECT COUNT(*) AS n FROM invoices').first();
  const no = 'INV' + String(1000 + ((row && row.n) || 0) + 1);
  const id = crypto.randomUUID();

  await context.env.DB.prepare(
    `INSERT INTO invoices (id,no,case_id,period_start,period_end,cycle,type,lines,subtotal,travel,
       discount,tax,total,amount,paid,status,due_date,note,created_at,created_by,issued_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,'draft',?,?,?,?,?)`
  ).bind(id, no, b.case_id, b.period_from || '', b.period_to || '', b.cycle || 'visit',
    b.cycle || 'visit', JSON.stringify(lines), subtotal, travel, discount, tax, total, total,
    b.due_date || '', b.note || '', Date.now(), user.sid, Date.now()).run();

  await audit(context.env, user.sid, 'invoice_create', 'case', b.case_id);
  return json({ ok: true, id, no, total });
}

function todayMY() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}
function sameMonth(ts) { return ts && todayMY().slice(0, 7) === new Date(ts).toISOString().slice(0, 7); }

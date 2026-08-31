import { json, bad } from './_lib/respond.js';
import { getUser, can } from './_lib/auth.js';
import { caseFor } from './_lib/caseAccess.js';
import { audit } from './_lib/audit.js';

// GET /api/quotes?case_id=...  — quotes for a case (newest first)
export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const caseId = new URL(context.request.url).searchParams.get('case_id');
  if (!caseId) return bad('case_id required');

  const c = await caseFor(context, caseId, user);
  if (c.error) return c.error;

  const { results } = await context.env.DB
    .prepare('SELECT * FROM quotes WHERE case_id=? ORDER BY created_at DESC LIMIT 20')
    .bind(caseId).all();
  const quotes = (results || []).map((q) => ({ ...q, lines: safeParse(q.lines) }));
  return json({ quotes });
}

function safeParse(s) { try { return JSON.parse(s || '[]'); } catch (_) { return []; } }

// POST /api/quotes — save a quote for a case
export async function onRequestPost(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  if (!can(user, 'quote')) return bad('You do not have permission to quote', 403);
  const b = await context.request.json().catch(() => ({}));
  if (!b.case_id) return bad('case_id required');

  const c = await caseFor(context, b.case_id, user);
  if (c.error) return c.error;

  const lines = Array.isArray(b.lines) ? b.lines : [];
  if (!lines.length) return bad('Add at least one line to the quote');

  const n = (x) => Math.round((Number(x) || 0) * 100) / 100;
  const subtotal = n(lines.reduce((s, l) => s + (Number(l.amount) || 0), 0));
  const travel = n(b.travel);
  const surcharge = n(b.surcharge);
  const deposit = n(b.deposit);
  const total = n(subtotal + travel + surcharge);

  const row = await context.env.DB
    .prepare("SELECT COUNT(*) AS n FROM quotes").first();
  const no = 'Q' + String(1000 + ((row && row.n) || 0) + 1);
  const id = crypto.randomUUID();
  const now = Date.now();

  await context.env.DB.prepare(
    `INSERT INTO quotes (id,no,case_id,lines,subtotal,travel,surcharge,deposit,total,note,status,created_at,created_by)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`
  ).bind(id, no, b.case_id, JSON.stringify(lines), subtotal, travel, surcharge,
    deposit, total, b.note || '', 'draft', now, user.sid).run();

  await audit(context.env, user.sid, 'quote_create', 'case', b.case_id);
  return json({ ok: true, id, no, subtotal, total });
}

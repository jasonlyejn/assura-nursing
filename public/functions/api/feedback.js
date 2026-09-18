import { json, bad } from './_lib/respond.js';
import { getUser, can } from './_lib/auth.js';
import { caseFor } from './_lib/caseAccess.js';
import { audit } from './_lib/audit.js';

// GET /api/feedback?case_id=  — one case;  no case_id = all results + averages
export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const caseId = new URL(context.request.url).searchParams.get('case_id');

  if (caseId) {
    const c = await caseFor(context, caseId, user);
    if (c.error) return c.error;
    const { results } = await context.env.DB
      .prepare('SELECT * FROM feedback WHERE case_id=? ORDER BY created_at DESC')
      .bind(caseId).all();
    return json({ feedback: results || [] });
  }

  if (!can(user, 'allCases')) return bad('Not allowed', 403);
  const { results } = await context.env.DB.prepare(
    `SELECT f.*, p.name AS patient_name FROM feedback f
       JOIN cases c ON c.id=f.case_id JOIN patients p ON p.id=c.patient_id
      WHERE f.submitted_at IS NOT NULL ORDER BY f.submitted_at DESC LIMIT 100`
  ).all();
  const rows = results || [];
  const avg = (k) => {
    const v = rows.map((r) => r[k]).filter((x) => x != null);
    return v.length ? Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 10) / 10 : null;
  };
  return json({ feedback: rows, summary: {
    count: rows.length, rating: avg('rating'), care: avg('care_rating'),
    comm: avg('comm_rating'),
    recommend: rows.length ? Math.round(rows.filter((r) => r.recommend).length / rows.length * 100) : null,
  } });
}

// POST /api/feedback { case_id } — make (or reuse) the link to send the family
export async function onRequestPost(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const b = await context.request.json().catch(() => ({}));
  if (!b.case_id) return bad('case_id required');
  const c = await caseFor(context, b.case_id, user);
  if (c.error) return c.error;

  const existing = await context.env.DB
    .prepare('SELECT token FROM feedback WHERE case_id=? AND submitted_at IS NULL ORDER BY created_at DESC')
    .bind(b.case_id).first();
  if (existing) return json({ ok: true, token: existing.token, reused: true });

  const token = crypto.randomUUID().replace(/-/g, '').slice(0, 20);
  await context.env.DB.prepare(
    'INSERT INTO feedback (id,case_id,token,created_at,sent_at) VALUES (?,?,?,?,?)'
  ).bind(crypto.randomUUID(), b.case_id, token, Date.now(), Date.now()).run();

  await audit(context.env, user.sid, 'feedback_link', 'case', b.case_id);
  return json({ ok: true, token });
}

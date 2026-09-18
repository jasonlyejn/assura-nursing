import { json, bad } from '../_lib/respond.js';

// Public — the family opens this with the token in their link. No login.
export async function onRequestGet(context) {
  const f = await context.env.DB.prepare(
    `SELECT f.token, f.submitted_at, p.name AS patient_name
       FROM feedback f JOIN cases c ON c.id=f.case_id JOIN patients p ON p.id=c.patient_id
      WHERE f.token=?`
  ).bind(context.params.token).first();
  if (!f) return bad('This feedback link is not valid', 404);
  return json({ patient_name: f.patient_name, done: !!f.submitted_at });
}

const N = (x) => {
  const v = Number(x);
  return Number.isFinite(v) && v >= 1 && v <= 5 ? Math.round(v) : null;
};
const T = (x, n) => (x || '').toString().slice(0, n);

export async function onRequestPost(context) {
  const f = await context.env.DB.prepare('SELECT id,submitted_at FROM feedback WHERE token=?')
    .bind(context.params.token).first();
  if (!f) return bad('This feedback link is not valid', 404);
  if (f.submitted_at) return json({ ok: true, already: true });

  const b = await context.request.json().catch(() => ({}));
  if (b.website) return json({ ok: true });            // honeypot
  if (!N(b.rating)) return bad('Please give an overall rating');

  await context.env.DB.prepare(
    `UPDATE feedback SET rating=?, care_rating=?, comm_rating=?, recommend=?,
            went_well=?, improve=?, staff_praise=?, name=?, submitted_at=? WHERE id=?`
  ).bind(N(b.rating), N(b.care_rating), N(b.comm_rating), b.recommend ? 1 : 0,
    T(b.went_well, 2000), T(b.improve, 2000), T(b.staff_praise, 160), T(b.name, 120),
    Date.now(), f.id).run();

  return json({ ok: true });
}

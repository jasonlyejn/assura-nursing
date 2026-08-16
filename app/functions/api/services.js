import { json, bad } from './_lib/respond.js';
import { getUser, requireAdmin } from './_lib/auth.js';

export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const { results } = await context.env.DB
    .prepare('SELECT id,name_en,name_zh,basis,rate,rate2,grp,sort,active FROM services ORDER BY sort').all();
  return json({ services: results || [] });
}

export async function onRequestPut(context) {
  const a = await requireAdmin(context);
  if (a.error) return a.error;
  const { services } = await context.request.json().catch(() => ({}));
  if (!Array.isArray(services)) return bad('services array required');

  const stmts = services.map((s) =>
    context.env.DB.prepare('UPDATE services SET rate=?, rate2=?, basis=?, active=? WHERE id=?')
      .bind(Number(s.rate) || 0, Number(s.rate2) || 0, s.basis, s.active ? 1 : 0, s.id));
  await context.env.DB.batch(stmts);
  return json({ ok: true, updated: services.length });
}

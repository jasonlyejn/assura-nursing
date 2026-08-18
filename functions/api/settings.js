import { json, bad } from './_lib/respond.js';
import { getUser, requireAdmin } from './_lib/auth.js';

export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const { results } = await context.env.DB.prepare('SELECT key,value FROM settings').all();
  const out = {};
  for (const r of results || []) out[r.key] = r.value;
  return json({ settings: out });
}

export async function onRequestPut(context) {
  const a = await requireAdmin(context);
  if (a.error) return a.error;
  const { settings } = await context.request.json().catch(() => ({}));
  if (!settings || typeof settings !== 'object') return bad('settings object required');

  const stmts = Object.entries(settings).map(([k, v]) =>
    context.env.DB.prepare('INSERT INTO settings (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value')
      .bind(k, String(v)));
  if (stmts.length) await context.env.DB.batch(stmts);
  return json({ ok: true, updated: stmts.length });
}

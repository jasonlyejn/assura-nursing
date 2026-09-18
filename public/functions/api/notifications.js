import { json, bad } from './_lib/respond.js';
import { requireUser } from './_lib/auth.js';

export async function onRequestGet(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const env = context.env;
  const rows = await env.DB.prepare(
    'SELECT * FROM notifications WHERE staff_id=? ORDER BY created_at DESC LIMIT 50'
  ).bind(r.user.sid).all();
  return json({ notifications: rows.results || [] });
}

export async function onRequestPost(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const env = context.env;
  const b = await context.request.json().catch(() => ({}));
  if (b.all) {
    await env.DB.prepare('UPDATE notifications SET read_at=? WHERE staff_id=? AND read_at IS NULL')
      .bind(Date.now(), r.user.sid).run();
  } else if (b.id) {
    await env.DB.prepare('UPDATE notifications SET read_at=? WHERE id=? AND staff_id=?')
      .bind(Date.now(), b.id, r.user.sid).run();
  }
  return json({ ok: true });
}

// First-run: create the first admin. Only works while no staff exist.
import { json, bad } from '../_lib/respond.js';
import { randomSaltHex, hashPin } from '../_lib/crypto.js';
import { signSession, cookie } from '../_lib/session.js';

export async function onRequestGet(context) {
  const { env } = context;
  try {
    const row = await env.DB.prepare('SELECT COUNT(*) AS n FROM staff').first();
    return json({ needsSetup: (row?.n || 0) === 0 });
  } catch (err) {
    return json({ needsSetup: false });
  }
}

export async function onRequestPost(context) {
  const { env, request } = context;
  const row = await env.DB.prepare('SELECT COUNT(*) AS n FROM staff').first();
  if (row.n > 0) return bad('Already set up', 409);

  const { name, pin } = await request.json().catch(() => ({}));
  if (!name || !name.trim()) return bad('Your name is required');
  if (!/^\d{4,8}$/.test(pin || '')) return bad('PIN must be 4–8 digits');

  const salt = randomSaltHex();
  const hash = await hashPin(pin, salt);
  const id = crypto.randomUUID();
  await env.DB.prepare(
    'INSERT INTO staff (id,name,role,pin_salt,pin_hash,active,created_at) VALUES (?,?,?,?,?,1,?)'
  ).bind(id, name.trim(), 'admin', salt, hash, Date.now()).run();

  const token = await signSession(
    { sid: id, role: 'admin', name: name.trim(), exp: Date.now() + 12 * 3600 * 1000 },
    env.SESSION_SECRET
  );
  return json(
    { ok: true, user: { id, name: name.trim(), role: 'admin' } },
    { headers: { 'Set-Cookie': cookie(token, 12 * 3600) } }
  );
}

// PIN sign-in. PINs are unique, so we check the entered PIN against each active
// staff record and sign a session for the first match.
import { json, bad } from '../_lib/respond.js';
import { hashPin, timingSafeEqual } from '../_lib/crypto.js';
import { signSession, cookie } from '../_lib/session.js';

export async function onRequestPost(context) {
  const { env, request } = context;
  const { pin } = await request.json().catch(() => ({}));
  if (!/^\d{4,8}$/.test(pin || '')) return bad('Enter your PIN');

  const { results } = await env.DB
    .prepare('SELECT id,name,role,perms,pin_salt,pin_hash,must_change_pin FROM staff WHERE active=1').all();

  for (const s of results || []) {
    const h = await hashPin(pin, s.pin_salt);
    if (timingSafeEqual(h, s.pin_hash)) {
      const token = await signSession(
        { sid: s.id, role: s.role, name: s.name, perms: parsePerms(s.perms),
          exp: Date.now() + 12 * 3600 * 1000 },
        env.SESSION_SECRET
      );
      return json(
        { ok: true, user: { id: s.id, name: s.name, role: s.role, must_change_pin: !!s.must_change_pin } },
        { headers: { 'Set-Cookie': cookie(token, 12 * 3600) } }
      );
    }
  }
  return bad('PIN not recognised', 401);
}

function parsePerms(v) {
  try { const a = JSON.parse(v || 'null'); return Array.isArray(a) ? a : null; }
  catch (_) { return null; }
}

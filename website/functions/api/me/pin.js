import { json, bad } from '../_lib/respond.js';
import { getUser } from '../_lib/auth.js';
import { randomSaltHex, hashPin, timingSafeEqual } from '../_lib/crypto.js';
import { audit } from '../_lib/audit.js';

// POST /api/me/pin  { current, pin }  — staff change their own PIN
export async function onRequestPost(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);

  const { current, pin } = await context.request.json().catch(() => ({}));
  if (!/^\d{4,8}$/.test(pin || '')) return bad('New PIN must be 4-8 digits');
  if (current === pin) return bad('Please choose a different PIN from your current one');
  if (/^(\d)\1+$/.test(pin)) return bad('That PIN is too easy to guess — pick another');

  const me = await context.env.DB.prepare('SELECT pin_salt,pin_hash FROM staff WHERE id=?')
    .bind(user.sid).first();
  if (!me) return bad('Account not found', 404);

  const h = await hashPin(current || '', me.pin_salt);
  if (!timingSafeEqual(h, me.pin_hash)) return bad('Your current PIN is not correct');

  // PINs identify the person at sign-in, so they must stay unique
  const { results } = await context.env.DB
    .prepare('SELECT pin_salt,pin_hash FROM staff WHERE id<>?').bind(user.sid).all();
  for (const s of results || []) {
    if ((await hashPin(pin, s.pin_salt)) === s.pin_hash)
      return bad('That PIN is already taken — pick another');
  }

  const salt = randomSaltHex();
  await context.env.DB.prepare(
    'UPDATE staff SET pin_salt=?, pin_hash=?, must_change_pin=0, pin_changed_at=? WHERE id=?'
  ).bind(salt, await hashPin(pin, salt), Date.now(), user.sid).run();

  await audit(context.env, user.sid, 'pin_changed_self', 'staff', user.sid);
  return json({ ok: true });
}

import { ROLE_KEYS } from '../_lib/roles.js';
import { json, bad } from '../_lib/respond.js';
import { requireAdmin } from '../_lib/auth.js';
import { randomSaltHex, hashPin } from '../_lib/crypto.js';
import { audit } from '../_lib/audit.js';

export async function onRequestGet(context) {
  const a = await requireAdmin(context);
  if (a.error) return a.error;
  const { results } = await context.env.DB
    .prepare('SELECT id,name,phone,email,role,active,staff_no,reg_no,photo,created_at FROM staff ORDER BY active DESC, role DESC, name').all();
  return json({ staff: results || [] });
}

export async function onRequestPost(context) {
  const a = await requireAdmin(context);
  if (a.error) return a.error;
  const b = await context.request.json().catch(() => ({}));
  if (!b.name || !b.name.trim()) return bad('Name is required');
  if (!/^\d{4,8}$/.test(b.pin || '')) return bad('PIN must be 4–8 digits');

  // PIN must be unique so login can identify the nurse
  const { results } = await context.env.DB.prepare('SELECT pin_salt,pin_hash FROM staff').all();
  for (const s of results || []) {
    if ((await hashPin(b.pin, s.pin_salt)) === s.pin_hash) return bad('That PIN is already in use — pick another');
  }
  const salt = randomSaltHex();
  const hash = await hashPin(b.pin, salt);
  const id = crypto.randomUUID();
  await context.env.DB.prepare(
    'INSERT INTO staff (id,name,phone,role,pin_salt,pin_hash,active,created_at,must_change_pin) VALUES (?,?,?,?,?,?,1,?,1)'
  ).bind(id, b.name.trim(), b.phone || '', ROLE_KEYS.includes(b.role) ? b.role : 'nurse', salt, hash, Date.now()).run();
  await audit(context.env, a.user.sid, 'staff_added', 'staff', id);
  return json({ ok: true, id });
}

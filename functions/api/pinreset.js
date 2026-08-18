import { json, bad } from './_lib/respond.js';
import { getUser, can } from './_lib/auth.js';
import { randomSaltHex, hashPin } from './_lib/crypto.js';
import { audit } from './_lib/audit.js';

// POST /api/pinreset — PUBLIC. Someone on the sign-in screen says they forgot their PIN.
// Deliberately gives nothing away: the reply is the same whether the name exists or not.
export async function onRequestPost(context) {
  const b = await context.request.json().catch(() => ({}));
  const name = (b.name || '').toString().trim();
  if (name.length < 2) return bad('Please type your name');
  if (b.website) return json({ ok: true });                 // honeypot

  const match = await context.env.DB
    .prepare('SELECT id FROM staff WHERE active=1 AND lower(name)=lower(?)').bind(name).first();

  // don't pile up duplicates from repeated taps
  const dupe = await context.env.DB.prepare(
    "SELECT id FROM pin_resets WHERE lower(claim_name)=lower(?) AND status='open'"
  ).bind(name).first();

  if (!dupe) {
    await context.env.DB.prepare(
      'INSERT INTO pin_resets (id,staff_id,claim_name,note,status,created_at) VALUES (?,?,?,?,?,?)'
    ).bind(crypto.randomUUID(), match ? match.id : null, name.slice(0, 120),
      (b.note || '').toString().slice(0, 300), 'open', Date.now()).run();
  }
  return json({ ok: true });
}

// GET /api/pinreset — managers see who is waiting
export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  if (!can(user, 'staff')) return bad('Admin only', 403);

  const { results } = await context.env.DB.prepare(
    `SELECT r.*, s.name AS staff_name, s.role AS staff_role
       FROM pin_resets r LEFT JOIN staff s ON s.id = r.staff_id
      WHERE r.status='open' ORDER BY r.created_at DESC LIMIT 50`
  ).all();
  return json({ resets: results || [] });
}

// PATCH /api/pinreset  { id, action:'reset'|'ignore', staff_id }
// Reset issues a one-time PIN; the person must change it at first sign-in.
export async function onRequestPatch(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  if (!can(user, 'staff')) return bad('Admin only', 403);

  const b = await context.request.json().catch(() => ({}));
  const row = await context.env.DB.prepare('SELECT * FROM pin_resets WHERE id=?').bind(b.id).first();
  if (!row) return bad('Request not found', 404);

  if (b.action === 'ignore') {
    await context.env.DB.prepare("UPDATE pin_resets SET status='ignored', done_by=?, done_at=? WHERE id=?")
      .bind(user.sid, Date.now(), row.id).run();
    return json({ ok: true });
  }
  if (b.action !== 'reset') return bad('Unknown action');

  const staffId = b.staff_id || row.staff_id;
  if (!staffId) return bad('Pick which staff member this is');
  const st = await context.env.DB.prepare('SELECT id,name FROM staff WHERE id=?').bind(staffId).first();
  if (!st) return bad('Staff not found', 404);

  // a temporary PIN that is not already in use
  let pin = '', tries = 0;
  const { results: others } = await context.env.DB
    .prepare('SELECT pin_salt,pin_hash FROM staff WHERE id<>?').bind(staffId).all();
  while (tries++ < 40) {
    const n = new Uint32Array(1); crypto.getRandomValues(n);
    const c = String(100000 + (n[0] % 900000));
    let clash = false;
    for (const o of others || []) {
      if ((await hashPin(c, o.pin_salt)) === o.pin_hash) { clash = true; break; }
    }
    if (!clash) { pin = c; break; }
  }
  if (!pin) return bad('Could not generate a free PIN — please try again');

  const salt = randomSaltHex();
  await context.env.DB.prepare(
    'UPDATE staff SET pin_salt=?, pin_hash=?, must_change_pin=1 WHERE id=?'
  ).bind(salt, await hashPin(pin, salt), staffId).run();

  await context.env.DB.prepare(
    "UPDATE pin_resets SET status='done', staff_id=?, done_by=?, done_name=?, done_at=? WHERE id=?"
  ).bind(staffId, user.sid, '', Date.now(), row.id).run();

  await audit(context.env, user.sid, 'pin_reset', 'staff', staffId);
  // shown once to the admin, who passes it to the person
  return json({ ok: true, pin, name: st.name });
}

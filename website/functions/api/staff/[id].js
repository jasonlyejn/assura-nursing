import { json, bad } from '../_lib/respond.js';
import { requireAdmin } from '../_lib/auth.js';
import { randomSaltHex, hashPin } from '../_lib/crypto.js';
import { ROLE_KEYS, CAPS } from '../_lib/roles.js';
import { audit } from '../_lib/audit.js';

const FIELDS = ['name', 'phone', 'email', 'ic', 'staff_no', 'reg_no', 'qualification',
                'started_at', 'address', 'kin_name', 'kin_phone', 'pay_basis',
                'bank_name', 'bank_acc', 'notes'];

// Full profile for one person
export async function onRequestGet(context) {
  const a = await requireAdmin(context);
  if (a.error) return a.error;
  const s = await context.env.DB.prepare(
    `SELECT id,name,phone,email,ic,staff_no,reg_no,qualification,started_at,address,perms,
            kin_name,kin_phone,pay_basis,pay_rate,bank_name,bank_acc,photo,notes,
            role,active,created_at FROM staff WHERE id=?`
  ).bind(context.params.id).first();
  if (!s) return bad('Staff not found', 404);

  const work = await context.env.DB.prepare(
    'SELECT COUNT(*) AS cases FROM cases WHERE assigned_staff_id=?'
  ).bind(context.params.id).first();

  return json({ staff: s, stats: { cases: (work && work.cases) || 0 } });
}

// Update profile / role / PIN / active
export async function onRequestPatch(context) {
  const a = await requireAdmin(context);
  if (a.error) return a.error;
  const id = context.params.id;
  const b = await context.request.json().catch(() => ({}));

  const me = id === a.user.sid;
  if (me && b.active === false) return bad("You can't deactivate yourself");
  if (me && b.role && b.role !== 'admin') return bad("You can't change your own role away from admin");

  if (Object.keys(b).length === 1 && 'active' in b) {
    await context.env.DB.prepare('UPDATE staff SET active=? WHERE id=?')
      .bind(b.active === false ? 0 : 1, id).run();
    await audit(context.env, a.user.sid,
      'staff_' + (b.active === false ? 'deactivated' : 'reactivated'), 'staff', id);
    return json({ ok: true });
  }

  const sets = [], binds = [];
  for (const f of FIELDS) {
    if (f in b) { sets.push(f + '=?'); binds.push((b[f] === null || b[f] === undefined ? '' : b[f]).toString().trim()); }
  }
  if ('role' in b && ROLE_KEYS.includes(b.role)) { sets.push('role=?'); binds.push(b.role); }
  if ('pay_rate' in b) { sets.push('pay_rate=?'); binds.push(Number(b.pay_rate) || 0); }
  if ('active' in b) { sets.push('active=?'); binds.push(b.active === false ? 0 : 1); }
  if ('perms' in b) {
    // null = follow the role; otherwise store only recognised page keys
    const v = Array.isArray(b.perms) ? JSON.stringify(b.perms.filter((x) => CAPS.includes(x))) : null;
    sets.push('perms=?'); binds.push(v);
  }
  if ('photo' in b) {
    const ph = b.photo;
    if (ph && (typeof ph !== 'string' || !ph.startsWith('data:image/'))) return bad('Not an image');
    if (ph && ph.length > 200000) return bad('Photo too large — please retake it');
    sets.push('photo=?'); binds.push(ph || null);
  }

  if (b.pin) {
    if (!/^\d{4,8}$/.test(b.pin)) return bad('PIN must be 4-8 digits');
    const { results } = await context.env.DB
      .prepare('SELECT id,pin_salt,pin_hash FROM staff WHERE id<>?').bind(id).all();
    for (const s of results || []) {
      if ((await hashPin(b.pin, s.pin_salt)) === s.pin_hash)
        return bad('That PIN is already in use - pick another');
    }
    const salt = randomSaltHex();
    // an admin-issued PIN must be changed by the person at next sign-in
    sets.push('pin_salt=?', 'pin_hash=?', 'must_change_pin=?');
    binds.push(salt, await hashPin(b.pin, salt), 1);
  }

  if (!sets.length) return bad('Nothing to update');
  binds.push(id);
  await context.env.DB.prepare('UPDATE staff SET ' + sets.join(', ') + ' WHERE id=?')
    .bind(...binds).run();
  await audit(context.env, a.user.sid, 'staff_updated', 'staff', id);
  return json({ ok: true });
}

// Delete - refused while the person still holds work, to protect the records
export async function onRequestDelete(context) {
  const a = await requireAdmin(context);
  if (a.error) return a.error;
  const id = context.params.id;
  if (id === a.user.sid) return bad("You can't delete your own account");

  const s = await context.env.DB.prepare('SELECT name FROM staff WHERE id=?').bind(id).first();
  if (!s) return bad('Staff not found', 404);

  const c = await context.env.DB
    .prepare('SELECT COUNT(*) AS n FROM cases WHERE assigned_staff_id=?').bind(id).first();
  if (c && c.n > 0) {
    return bad('This person is assigned to ' + c.n + ' case(s). Reassign those first, '
      + 'or set them Inactive instead so the case history stays intact.', 409);
  }
  let v = null;
  try {
    v = await context.env.DB
      .prepare('SELECT COUNT(*) AS n FROM visits WHERE staff_id=?').bind(id).first();
  } catch (_) { v = null; }
  if (v && v.n > 0) {
    return bad('This person has ' + v.n + ' recorded visit(s). Set them Inactive instead - '
      + 'deleting would break the visit and billing history.', 409);
  }

  await context.env.DB.prepare('DELETE FROM staff WHERE id=?').bind(id).run();
  await audit(context.env, a.user.sid, 'staff_deleted', 'staff', id);
  return json({ ok: true, deleted: s.name });
}

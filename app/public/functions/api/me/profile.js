import { json, bad } from '../_lib/respond.js';
import { getUser } from '../_lib/auth.js';
import { audit } from '../_lib/audit.js';

// Fields staff may propose changes to. Role, pay and staff no stay with admin.
const OWN = ['name', 'phone', 'email', 'ic', 'address', 'qualification', 'reg_no',
             'kin_name', 'kin_phone', 'bank_name', 'bank_acc', 'notes'];

// GET /api/me/profile — my own record + anything still awaiting approval
export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);

  const s = await context.env.DB.prepare(
    `SELECT id,name,phone,email,ic,staff_no,reg_no,qualification,started_at,address,
            kin_name,kin_phone,pay_basis,pay_rate,bank_name,bank_acc,photo,notes,
            role,active,must_change_pin,pin_changed_at FROM staff WHERE id=?`
  ).bind(user.sid).first();
  if (!s) return bad('Account not found', 404);

  const { results } = await context.env.DB.prepare(
    "SELECT * FROM staff_changes WHERE staff_id=? ORDER BY requested_at DESC LIMIT 10"
  ).bind(user.sid).all();

  return json({
    staff: s,
    pending: (results || []).filter((r) => r.status === 'pending')
      .map((r) => ({ ...r, fields: safe(r.fields) })),
    history: (results || []).filter((r) => r.status !== 'pending')
      .map((r) => ({ ...r, fields: safe(r.fields) })),
    editable: OWN,
  });
}

function safe(s) { try { return JSON.parse(s || '{}'); } catch (_) { return {}; } }

// POST /api/me/profile — submit changes for admin approval
export async function onRequestPost(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const b = await context.request.json().catch(() => ({}));

  // a photo is low risk — it applies straight away
  if (b.photo !== undefined) {
    const ph = b.photo;
    if (ph && (typeof ph !== 'string' || !ph.startsWith('data:image/'))) return bad('Not an image');
    if (ph && ph.length > 200000) return bad('Photo too large — please retake it');
    await context.env.DB.prepare('UPDATE staff SET photo=? WHERE id=?')
      .bind(ph || null, user.sid).run();
    if (Object.keys(b).length === 1) return json({ ok: true, photo: true });
  }

  const cur = await context.env.DB.prepare(
    `SELECT name,phone,email,ic,address,qualification,reg_no,kin_name,kin_phone,
            bank_name,bank_acc,notes FROM staff WHERE id=?`).bind(user.sid).first();
  if (!cur) return bad('Account not found', 404);

  const fields = {}, before = {};
  for (const f of OWN) {
    if (!(f in b)) continue;
    const v = (b[f] === null || b[f] === undefined ? '' : b[f]).toString().trim();
    const old = (cur[f] === null || cur[f] === undefined ? '' : cur[f]).toString();
    if (v !== old) { fields[f] = v; before[f] = old; }
  }
  if (!Object.keys(fields).length) return bad('Nothing has changed');

  // replace any earlier request that is still waiting
  await context.env.DB.prepare(
    "UPDATE staff_changes SET status='superseded' WHERE staff_id=? AND status='pending'"
  ).bind(user.sid).run();

  const id = crypto.randomUUID();
  await context.env.DB.prepare(
    `INSERT INTO staff_changes (id,staff_id,staff_name,fields,before,status,note,requested_at)
     VALUES (?,?,?,?,?,'pending',?,?)`
  ).bind(id, user.sid, user.name || '', JSON.stringify(fields), JSON.stringify(before),
    (b.note || '').toString().slice(0, 400), Date.now()).run();

  await audit(context.env, user.sid, 'profile_change_requested', 'staff', user.sid);
  return json({ ok: true, pending: Object.keys(fields).length });
}

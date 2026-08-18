import { json, bad } from '../_lib/respond.js';
import { requireUser, requireAdmin } from '../_lib/auth.js';
import { audit } from '../_lib/audit.js';

export async function onRequestGet(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const row = await context.env.DB.prepare(
    `SELECT c.*, p.name, p.phone, p.address, p.age, p.sex, p.care_type, p.minor, p.notes,
            s.name AS assigned_name
     FROM cases c JOIN patients p ON p.id=c.patient_id
     LEFT JOIN staff s ON s.id=c.assigned_staff_id WHERE c.id=?`
  ).bind(context.params.id).first();
  if (!row) return bad('Case not found', 404);
  if (!can(r.user, 'allCases') && row.assigned_staff_id !== r.user.sid) return bad('Not your case', 403);
  return json({ case: row });
}

// Actions: accept | assign | decline | activate | close  (+ billing_mode)
export async function onRequestPatch(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const id = context.params.id;
  const b = await context.request.json().catch(() => ({}));
  const env = context.env;

  // decline / assign / accept / close are admin decisions
  const adminActions = ['accept', 'assign', 'decline', 'close', 'billing'];  // need 'assign' capability
  if (adminActions.includes(b.action) && !can(r.user, 'assign'))
    return bad('Admin only', 403);

  let sql, binds;
  switch (b.action) {
    case 'accept':
      sql = 'UPDATE cases SET status=?, assigned_staff_id=? WHERE id=?';
      binds = ['accepted', r.user.sid, id]; break;
    case 'assign':
      if (!b.staff_id) return bad('Pick a nurse to assign');
      sql = 'UPDATE cases SET status=?, assigned_staff_id=? WHERE id=?';
      binds = ['assigned', b.staff_id, id]; break;
    case 'activate':
      sql = 'UPDATE cases SET status=? WHERE id=?';
      binds = ['active', id]; break;
    case 'decline':
      sql = 'UPDATE cases SET status=?, close_reason=?, closed_at=? WHERE id=?';
      binds = ['declined', b.reason || '', Date.now(), id]; break;
    case 'close':
      sql = 'UPDATE cases SET status=?, close_reason=?, closed_at=? WHERE id=?';
      binds = ['closed', b.reason || '', Date.now(), id]; break;
    case 'billing':
      sql = 'UPDATE cases SET billing_mode=? WHERE id=?';
      binds = [b.billing_mode === 'weekly' ? 'weekly' : 'per_visit', id]; break;
    default:
      return bad('Unknown action');
  }
  await env.DB.prepare(sql).bind(...binds).run();
  await audit(env, r.user.sid, 'case_' + b.action, 'case', id);
  return json({ ok: true });
}

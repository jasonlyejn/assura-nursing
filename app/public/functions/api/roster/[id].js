import { json, bad } from '../_lib/respond.js';
import { getUser, can } from '../_lib/auth.js';
import { audit } from '../_lib/audit.js';

// DELETE /api/roster/[id] — clear a shift
export async function onRequestDelete(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  if (!can(user, 'assign')) return bad('You do not have permission to change the roster', 403);

  const r = await context.env.DB.prepare('SELECT case_id FROM roster WHERE id=?')
    .bind(context.params.id).first();
  if (!r) return bad('Shift not found', 404);

  await context.env.DB.prepare('DELETE FROM roster WHERE id=?').bind(context.params.id).run();
  await audit(context.env, user.sid, 'roster_cleared', 'case', r.case_id);
  return json({ ok: true });
}

// PATCH /api/roster/[id] — confirm / mark done
export async function onRequestPatch(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const r = await context.env.DB.prepare('SELECT * FROM roster WHERE id=?')
    .bind(context.params.id).first();
  if (!r) return bad('Shift not found', 404);

  const b = await context.request.json().catch(() => ({}));
  const own = r.staff_id === user.sid;
  // staff may confirm their own shift; changing anyone else's needs 'assign'
  if (!own && !can(user, 'assign')) return bad('Not your shift', 403);

  const ok = ['planned', 'confirmed', 'done', 'off'];
  if (!ok.includes(b.status)) return bad('Unknown status');

  await context.env.DB.prepare('UPDATE roster SET status=? WHERE id=?')
    .bind(b.status, r.id).run();
  await audit(context.env, user.sid, 'roster_' + b.status, 'case', r.case_id);
  return json({ ok: true });
}

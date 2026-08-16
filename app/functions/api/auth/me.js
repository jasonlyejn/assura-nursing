import { json } from '../_lib/respond.js';
import { getUser } from '../_lib/auth.js';
import { requireAdmin } from '../_lib/auth.js';

export async function onRequestGet(context) {
  const row = await context.env.DB.prepare('SELECT COUNT(*) AS n FROM staff').first();
  const user = await getUser(context);
  if (!user) return json({ authed: false, needsSetup: row.n === 0 });
  const me = await context.env.DB
    .prepare('SELECT must_change_pin,role,perms FROM staff WHERE id=?').bind(user.sid).first();
  let pendingChanges = 0;
  if (user.role === 'admin') {
    const p = await context.env.DB
      .prepare("SELECT COUNT(*) AS n FROM staff_changes WHERE status='pending'").first();
    pendingChanges = (p && p.n) || 0;
  }
  let perms = null;
  try { const a = JSON.parse((me && me.perms) || 'null'); if (Array.isArray(a)) perms = a; } catch (_) {}
  return json({ authed: true, needsSetup: false, pendingChanges,
    user: { id: user.sid, name: user.name, role: (me && me.role) || user.role,
            perms, must_change_pin: !!(me && me.must_change_pin) } });
}

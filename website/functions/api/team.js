import { json, bad } from './_lib/respond.js';
import { getUser } from './_lib/auth.js';

// Active staff with their initials — used by the medication chart's signature box.
export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const { results } = await context.env.DB
    .prepare('SELECT id,name,role,initials FROM staff WHERE active=1 ORDER BY name').all();
  const team = (results || []).map((s) => ({
    id: s.id, name: s.name, role: s.role,
    initials: (s.initials || autoInitials(s.name)).toUpperCase().slice(0, 4),
  }));
  return json({ team, me: user.sid });
}

function autoInitials(name) {
  return String(name || '').trim().split(/\s+/).map((w) => w[0] || '').join('').slice(0, 3);
}

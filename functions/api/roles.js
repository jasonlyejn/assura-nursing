import { json, bad } from './_lib/respond.js';
import { getUser } from './_lib/auth.js';
import { ROLES } from './_lib/roles.js';

export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const roles = Object.entries(ROLES).map(([key, r]) => ({
    key, label: r.label, zh: r.zh, desc: r.desc, can: r.can,
  }));
  return json({ roles, me: { role: user.role, can: (ROLES[user.role] || {}).can || [] } });
}

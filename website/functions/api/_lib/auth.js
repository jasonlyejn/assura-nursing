import { verifySession, readCookie } from './session.js';
import { bad } from './respond.js';
import { can, isAdmin } from './roles.js';

export async function getUser(context) {
  const token = readCookie(context.request);
  if (!token) return null;
  return await verifySession(token, context.env.SESSION_SECRET);
}

export async function requireUser(context) {
  const user = await getUser(context);
  if (!user) return { error: bad('Not signed in', 401) };
  return { user };
}

export async function requireAdmin(context) {
  const r = await requireUser(context);
  if (r.error) return r;
  if (!isAdmin(r.user)) return { error: bad('Admin only', 403) };
  return r;
}

// Capability check — e.g. requireCan(context, 'assign')
export async function requireCan(context, capability) {
  const r = await requireUser(context);
  if (r.error) return r;
  if (!can(r.user, capability)) return { error: bad('You do not have permission for this', 403) };
  return r;
}

export { can, isAdmin };

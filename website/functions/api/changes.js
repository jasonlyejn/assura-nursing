import { json, bad } from './_lib/respond.js';
import { requireAdmin } from './_lib/auth.js';

// GET /api/changes[?all=1] — profile changes waiting for approval
export async function onRequestGet(context) {
  const a = await requireAdmin(context);
  if (a.error) return a.error;
  const all = new URL(context.request.url).searchParams.get('all') === '1';

  const sql = all
    ? 'SELECT * FROM staff_changes ORDER BY requested_at DESC LIMIT 60'
    : "SELECT * FROM staff_changes WHERE status='pending' ORDER BY requested_at DESC LIMIT 60";
  const { results } = await context.env.DB.prepare(sql).all();

  const parse = (s) => { try { return JSON.parse(s || '{}'); } catch (_) { return {}; } };
  return json({
    changes: (results || []).map((r) => ({ ...r, fields: parse(r.fields), before: parse(r.before) })),
  });
}

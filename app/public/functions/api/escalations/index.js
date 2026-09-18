import { json } from '../_lib/respond.js';
import { requireUser } from '../_lib/auth.js';

// GET /api/escalations?all=1
//   default: open (un-acknowledged) escalations.
//   admin sees every case; a nurse sees only their assigned cases.
export async function onRequestGet(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const url = new URL(context.request.url);
  const includeAcked = url.searchParams.get('all') === '1';

  const where = [];
  const binds = [];
  if (!includeAcked) where.push('e.ack_at IS NULL');
  if (r.user.role !== 'admin') { where.push('c.assigned_staff_id = ?'); binds.push(r.user.sid); }
  const clause = where.length ? ('WHERE ' + where.join(' AND ')) : '';

  const rows = await context.env.DB.prepare(
    `SELECT e.*, p.name AS patient_name, c.assigned_staff_id
       FROM escalations e
       JOIN cases c ON c.id = e.case_id
       JOIN patients p ON p.id = c.patient_id
       ${clause}
       ORDER BY e.created_at DESC
       LIMIT 200`
  ).bind(...binds).all();

  return json({ escalations: rows.results || [] });
}

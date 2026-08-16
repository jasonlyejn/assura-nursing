import { can } from '../_lib/roles.js';
import { json, bad } from '../_lib/respond.js';
import { requireUser } from '../_lib/auth.js';

const SELECT = `
  SELECT c.id, c.status, c.billing_mode, c.assigned_staff_id, c.source, c.created_at, c.closed_at, c.close_reason,
         p.id AS patient_id, p.name, p.phone, p.address, p.age, p.care_type, p.minor, p.notes,
         s.name AS assigned_name
  FROM cases c
  JOIN patients p ON p.id = c.patient_id
  LEFT JOIN staff s ON s.id = c.assigned_staff_id`;

export async function onRequestGet(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const url = new URL(context.request.url);
  const status = url.searchParams.get('status');
  const mine = url.searchParams.get('mine');

  let sql = SELECT, binds = [], where = [];
  if (mine === '1' || !can(r.user, 'allCases')) { where.push('c.assigned_staff_id = ?'); binds.push(r.user.sid); }
  if (status) { where.push('c.status = ?'); binds.push(status); }
  if (where.length) sql += ' WHERE ' + where.join(' AND ');
  sql += ' ORDER BY c.created_at DESC';

  const { results } = await context.env.DB.prepare(sql).bind(...binds).all();
  return json({ cases: results || [] });
}

import { json, bad } from '../_lib/respond.js';
import { requireUser } from '../_lib/auth.js';
import { caseFor } from '../_lib/caseAccess.js';
import { audit } from '../_lib/audit.js';

// GET /api/insulin/:caseId?from=YYYY-MM-DD&to=YYYY-MM-DD
export async function onRequestGet(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const ca = await caseFor(context, context.params.caseId, r.user);
  if (ca.error) return ca.error;

  const url = new URL(context.request.url);
  const from = url.searchParams.get('from');
  const to = url.searchParams.get('to');
  const caseId = context.params.caseId;

  let query = 'SELECT * FROM insulin_records WHERE case_id = ?';
  const binds = [caseId];

  if (from && to) {
    query += ' AND record_date >= ? AND record_date <= ?';
    binds.push(from, to);
  }
  query += ' ORDER BY record_date DESC, created_at DESC LIMIT 100';

  const rows = await context.env.DB.prepare(query).bind(...binds).all();
  return json({ records: rows.results || [] });
}

// POST /api/insulin/:caseId
export async function onRequestPost(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const ca = await caseFor(context, context.params.caseId, r.user);
  if (ca.error) return ca.error;

  const b = await context.request.json().catch(() => ({}));
  if (b.glucose == null || isNaN(Number(b.glucose))) {
    return bad('Valid blood glucose reading (mmol/L) is required');
  }

  const id = 'ins_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  const caseId = context.params.caseId;
  const record_date = b.record_date || new Date().toISOString().slice(0, 10);
  const slot = b.slot || 'Fasting';
  const glucose = Number(b.glucose);
  const insulin_type = b.insulin_type || '';
  const units_recommended = Number(b.units_recommended || 0);
  const units_given = Number(b.units_given || 0);
  const injection_site = b.injection_site || '';
  const notes = (b.notes || '').trim();
  const staff_id = r.user.sid || '';
  const staff_initial = r.user.name ? r.user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 3) : 'RN';
  const now = Date.now();

  await context.env.DB.prepare(`
    INSERT INTO insulin_records (
      id, case_id, record_date, slot, glucose, insulin_type,
      units_recommended, units_given, injection_site, notes,
      staff_id, staff_initial, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    id, caseId, record_date, slot, glucose, insulin_type,
    units_recommended, units_given, injection_site, notes,
    staff_id, staff_initial, now
  ).run();

  await audit(context.env, r.user.sid, 'insulin_log', 'case', caseId);

  return json({ ok: true, id, glucose, units_given, staff_initial });
}

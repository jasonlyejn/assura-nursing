import { json, bad } from './_lib/respond.js';
import { requireUser, can } from './_lib/auth.js';
import { caseFor } from './_lib/caseAccess.js';
import { audit } from './_lib/audit.js';

// GET /api/tubes?case_id=... or /api/tubes?expiring=1
export async function onRequestGet(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const user = r.user;

  const url = new URL(context.request.url);
  const caseId = url.searchParams.get('case_id');
  const expiring = url.searchParams.get('expiring');

  if (expiring === '1') {
    // Show tubes due within next 7 days or overdue across active cases
    const today = new Date().toISOString().split('T')[0];
    const targetDate = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

    const { results } = await context.env.DB.prepare(`
      SELECT t.*, p.name AS patient_name, s.name AS inserted_by_name
      FROM patient_tubes t
      JOIN cases c ON c.id = t.case_id
      JOIN patients p ON p.id = c.patient_id
      LEFT JOIN staff s ON s.id = t.inserted_by
      WHERE t.status = 'active' AND t.due_date <= ? AND c.status = 'active'
      ORDER BY t.due_date ASC
    `).bind(targetDate).all();

    return json({ tubes: results || [] });
  }

  if (!caseId) return bad('case_id is required');
  const c = await caseFor(context, caseId, user);
  if (c.error) return c.error;

  const { results } = await context.env.DB.prepare(`
    SELECT t.*, s.name AS inserted_by_name
    FROM patient_tubes t
    LEFT JOIN staff s ON s.id = t.inserted_by
    WHERE t.case_id = ?
    ORDER BY t.status = 'active' DESC, t.due_date ASC
  `).bind(caseId).all();

  return json({ tubes: results || [] });
}

// POST /api/tubes — Log a new tube / catheter insertion
export async function onRequestPost(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const user = r.user;

  const b = await context.request.json().catch(() => ({}));
  if (!b.case_id || !b.tube_type || !b.brand_size || !b.insertion_date) {
    return bad('case_id, tube_type, brand_size, and insertion_date are required');
  }

  const c = await caseFor(context, b.case_id, user);
  if (c.error) return c.error;

  // Default lifespans: Ryles 14/28 days, Foley Latex 28 days, Foley Silicone 90 days, Trach 30 days
  let dueDate = b.due_date;
  if (!dueDate) {
    const ins = new Date(b.insertion_date);
    let days = 28;
    if (b.tube_type === 'ryles_tube') days = b.brand_size.toLowerCase().includes('silicone') ? 28 : 14;
    else if (b.tube_type === 'foley_catheter') days = b.brand_size.toLowerCase().includes('silicone') ? 90 : 28;
    else if (b.tube_type === 'tracheostomy') days = 30;
    else if (b.tube_type === 'stoma_wafer') days = 7;
    ins.setDate(ins.getDate() + days);
    dueDate = ins.toISOString().split('T')[0];
  }

  // Mark previous tube of same type as replaced
  await context.env.DB.prepare(`
    UPDATE patient_tubes
    SET status = 'replaced'
    WHERE case_id = ? AND tube_type = ? AND status = 'active'
  `).bind(b.case_id, b.tube_type).run();

  const id = 'tube_' + crypto.randomUUID().slice(0, 8);
  const now = Date.now();

  await context.env.DB.prepare(`
    INSERT INTO patient_tubes (
      id, case_id, tube_type, brand_size, insertion_date,
      due_date, inserted_by, insertion_notes, status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active', ?)
  `).bind(
    id, b.case_id, b.tube_type, b.brand_size.trim(), b.insertion_date,
    dueDate, user.sid, (b.insertion_notes || '').trim(), now
  ).run();

  await audit(context.env, user.sid, 'tube_inserted', 'tube', id);
  return json({ ok: true, id, due_date: dueDate });
}

// PATCH /api/tubes — Update or mark removed
export async function onRequestPatch(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;

  const b = await context.request.json().catch(() => ({}));
  if (!b.id) return bad('id is required');

  const status = b.status || 'removed';
  await context.env.DB.prepare(`
    UPDATE patient_tubes SET status = ? WHERE id = ?
  `).bind(status, b.id).run();

  await audit(context.env, r.user.sid, 'tube_' + status, 'tube', b.id);
  return json({ ok: true });
}

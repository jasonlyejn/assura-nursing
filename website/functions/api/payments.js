import { json, bad } from './_lib/respond.js';
import { requireUser, can } from './_lib/auth.js';
import { caseFor } from './_lib/caseAccess.js';
import { audit } from './_lib/audit.js';

// GET /api/payments?case_id=...
export async function onRequestGet(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const user = r.user;

  const url = new URL(context.request.url);
  const caseId = url.searchParams.get('case_id');
  if (!caseId) return bad('case_id is required');

  const c = await caseFor(context, caseId, user);
  if (c.error) return c.error;

  const { results } = await context.env.DB.prepare(`
    SELECT p.*, s.name AS verified_by_name
    FROM payment_records p
    LEFT JOIN staff s ON s.id = p.verified_by
    WHERE p.case_id = ?
    ORDER BY p.paid_at DESC
  `).bind(caseId).all();

  return json({ payments: results || [] });
}

// POST /api/payments — Record payment or upload receipt slip
export async function onRequestPost(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const user = r.user;

  const b = await context.request.json().catch(() => ({}));
  if (!b.case_id || !b.amount) return bad('case_id and amount are required');

  const id = 'pay_' + crypto.randomUUID().slice(0, 8);
  const now = Date.now();

  await context.env.DB.prepare(`
    INSERT INTO payment_records (
      id, case_id, invoice_id, amount, payment_method, reference_no,
      proof_image, status, paid_by, paid_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)
  `).bind(
    id, b.case_id, b.invoice_id || null, Number(b.amount) || 0,
    b.payment_method || 'duitnow_qr', b.reference_no || '',
    b.proof_image || null, b.paid_by || user.name, now
  ).run();

  await audit(context.env, user.sid, 'payment_submitted', 'case', b.case_id);
  return json({ ok: true, id });
}

// PATCH /api/payments — Admin verify payment
export async function onRequestPatch(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  if (!can(r.user, 'bill')) return bad('Admin or billing permission required', 403);

  const b = await context.request.json().catch(() => ({}));
  if (!b.id) return bad('id is required');

  const status = b.status === 'rejected' ? 'rejected' : 'verified';
  const now = Date.now();

  await context.env.DB.prepare(`
    UPDATE payment_records
    SET status = ?, verified_at = ?, verified_by = ?
    WHERE id = ?
  `).bind(status, now, r.user.sid, b.id).run();

  // If verified and invoice attached, mark invoice as paid
  if (status === 'verified') {
    const pay = await context.env.DB.prepare('SELECT invoice_id, case_id FROM payment_records WHERE id=?')
      .bind(b.id).first();
    if (pay && pay.invoice_id) {
      await context.env.DB.prepare('UPDATE invoices SET status="paid", paid_at=? WHERE id=?')
        .bind(now, pay.invoice_id).run();
    }
  }

  await audit(context.env, r.user.sid, 'payment_' + status, 'payment', b.id);
  return json({ ok: true });
}

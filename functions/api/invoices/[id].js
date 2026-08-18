import { json, bad } from '../_lib/respond.js';
import { getUser, can } from '../_lib/auth.js';
import { caseFor } from '../_lib/caseAccess.js';
import { audit } from '../_lib/audit.js';

const n2 = (x) => Math.round((Number(x) || 0) * 100) / 100;
const METHODS = ['cash', 'transfer', 'duitnow', 'ewallet', 'cheque', 'other'];

// GET — one invoice with its payments
export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const inv = await context.env.DB.prepare(
    `SELECT i.*, p.name AS patient_name, p.phone AS patient_phone, p.address
       FROM invoices i JOIN cases c ON c.id=i.case_id JOIN patients p ON p.id=c.patient_id
      WHERE i.id=?`).bind(context.params.id).first();
  if (!inv) return bad('Invoice not found', 404);
  const c = await caseFor(context, inv.case_id, user);
  if (c.error) return c.error;

  const { results } = await context.env.DB
    .prepare('SELECT * FROM payments WHERE invoice_id=? ORDER BY created_at').bind(inv.id).all();
  let lines = []; try { lines = JSON.parse(inv.lines || '[]'); } catch (_) {}
  return json({ invoice: { ...inv, lines, balance: n2(inv.total - inv.paid) },
                payments: results || [] });
}

// PATCH — record a payment, mark sent, or void
export async function onRequestPatch(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  if (!can(user, 'bill')) return bad('You do not have permission to change invoices', 403);

  const inv = await context.env.DB.prepare('SELECT * FROM invoices WHERE id=?')
    .bind(context.params.id).first();
  if (!inv) return bad('Invoice not found', 404);

  const b = await context.request.json().catch(() => ({}));

  if (b.action === 'sent') {
    await context.env.DB.prepare(
      "UPDATE invoices SET status=CASE WHEN status='draft' THEN 'sent' ELSE status END, sent_at=? WHERE id=?"
    ).bind(Date.now(), inv.id).run();
    return json({ ok: true });
  }

  if (b.action === 'void') {
    if (inv.paid > 0) return bad('This invoice already has a payment — refund it before voiding');
    await context.env.DB.prepare("UPDATE invoices SET status='void' WHERE id=?").bind(inv.id).run();
    await audit(context.env, user.sid, 'invoice_void', 'case', inv.case_id);
    return json({ ok: true });
  }

  if (b.action === 'pay') {
    const amount = n2(b.amount);
    if (amount <= 0) return bad('Enter how much was paid');
    const balance = n2(inv.total - inv.paid);
    if (amount > balance + 0.009) return bad('That is more than the outstanding RM' + balance.toFixed(2));
    const method = METHODS.includes(b.method) ? b.method : 'cash';

    const who = await context.env.DB.prepare('SELECT name FROM staff WHERE id=?').bind(user.sid).first();
    await context.env.DB.prepare(
      `INSERT INTO payments (id,invoice_id,case_id,amount,method,ref,paid_on,note,received_by,received_name,created_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?)`
    ).bind(crypto.randomUUID(), inv.id, inv.case_id, amount, method, (b.ref || '').slice(0, 120),
      b.paid_on || todayMY(), (b.note || '').slice(0, 300), user.sid, (who && who.name) || '', Date.now()).run();

    const paid = n2(inv.paid + amount);
    const status = paid + 0.009 >= inv.total ? 'paid' : 'partial';
    await context.env.DB.prepare(
      'UPDATE invoices SET paid=?, status=?, settled_at=? WHERE id=?'
    ).bind(paid, status, status === 'paid' ? Date.now() : null, inv.id).run();

    await audit(context.env, user.sid, 'payment_' + method, 'case', inv.case_id);
    return json({ ok: true, paid, status, balance: n2(inv.total - paid) });
  }

  return bad('Unknown action');
}

function todayMY() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

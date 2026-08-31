import { json, bad } from './_lib/respond.js';
import { requireUser } from './_lib/auth.js';
import { caseFor } from './_lib/caseAccess.js';
import { audit } from './_lib/audit.js';

// GET /api/consents?case_id=... or /api/consents?status=pending_approval
export async function onRequestGet(context) {
  try {
    const r = await requireUser(context);
    if (r.error) return r.error;
    const user = r.user;

    const url = new URL(context.request.url);
    const caseId = url.searchParams.get('case_id');
    const filterStatus = url.searchParams.get('status');

    if (caseId) {
      const c = await caseFor(context, caseId, user);
      if (c.error) return c.error;

      const { results } = await context.env.DB.prepare(`
        SELECT pc.*, s.name AS witness_name, s.role AS witness_role
        FROM procedure_consents pc
        LEFT JOIN staff s ON s.id = pc.witness_staff_id
        WHERE pc.case_id = ?
        ORDER BY pc.signed_at DESC
      `).bind(caseId).all().catch(() => ({ results: [] }));

      return json({ consents: results || [] });
    }

    // Admin / Consultant system-wide pending consents query
    if (user.role === 'admin' || user.role === 'doctor') {
      let query = `
        SELECT pc.*, c.name AS patient_name, s.name AS witness_name, s.role AS witness_role
        FROM procedure_consents pc
        LEFT JOIN cases c ON c.id = pc.case_id
        LEFT JOIN staff s ON s.id = pc.witness_staff_id
      `;
      const binds = [];
      if (filterStatus) {
        query += ` WHERE pc.status = ? `;
        binds.push(filterStatus);
      }
      query += ` ORDER BY pc.signed_at DESC LIMIT 100`;

      const stmt = binds.length ? context.env.DB.prepare(query).bind(...binds) : context.env.DB.prepare(query);
      const { results } = await stmt.all().catch(() => ({ results: [] }));
      return json({ consents: results || [] });
    }

    return bad('case_id is required');
  } catch (err) {
    return json({ consents: [], error: err.message });
  }
}

// POST /api/consents — Record signed procedure, DNR consent, or Emergency Verbal Order (VO)
export async function onRequestPost(context) {
  try {
    const r = await requireUser(context);
    if (r.error) return r.error;
    const user = r.user;

    const b = await context.request.json().catch(() => ({}));
    if (!b.case_id || !b.procedure_name) {
      return bad('case_id and procedure_name are required');
    }

    const c = await caseFor(context, b.case_id, user);
    if (c.error) return c.error;

    const id = 'cst_' + crypto.randomUUID().slice(0, 8);
    const now = Date.now();
    const isDnr = b.is_dnr || b.procedure_name.includes('DNR') || b.procedure_name.includes('Resuscitate') ? 1 : 0;
    const isVo = b.is_verbal_order ? 1 : 0;
    const initialStatus = isVo && !b.signature_data ? 'pending_consent_sign' : 'pending_approval';

    await context.env.DB.prepare(`
      INSERT INTO procedure_consents (
        id, case_id, procedure_name, signee_name, signee_ic,
        relationship, signature_data, witness_staff_id, doctor_name,
        doctor_mmc, is_dnr, consent_terms, signed_at,
        status, is_verbal_order, verbal_order_dr, verbal_order_at, verbal_order_notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id, b.case_id, b.procedure_name.trim(), (b.signee_name || '').trim(),
      (b.signee_ic || '').trim(), b.relationship || 'self',
      b.signature_data || '', user.sid, (b.doctor_name || '').trim(),
      (b.doctor_mmc || '').trim(), isDnr, b.consent_terms || '', now,
      initialStatus, isVo, (b.verbal_order_dr || b.doctor_name || '').trim(),
      b.verbal_order_at || (isVo ? now : null), b.verbal_order_notes || ''
    ).run();

    await audit(context.env, user.sid, isVo ? 'emergency_verbal_order_logged' : (isDnr ? 'dnr_consent_submitted' : 'procedure_consent_submitted'), 'case', b.case_id);
    return json({ ok: true, id, is_dnr: isDnr, status: initialStatus, is_verbal_order: isVo });
  } catch (err) {
    return bad(err.message, 500);
  }
}

// PATCH /api/consents — Review/Approve consent OR Sign verbal order
export async function onRequestPatch(context) {
  try {
    const r = await requireUser(context);
    if (r.error) return r.error;
    const user = r.user;

    const b = await context.request.json().catch(() => ({}));
    if (!b.id) return bad('Consent ID is required');

    // 1. Consultant / Director Approval Action
    if (b.action === 'approve' || b.action === 'reject') {
      if (user.role !== 'admin' && user.role !== 'doctor') {
        return bad('Only Primary Attending Consultant or Nursing Director can grant consent authorization', 403);
      }

      const status = b.action === 'approve' ? 'approved' : 'rejected';
      const now = Date.now();

      const existing = await context.env.DB.prepare(`
        SELECT * FROM procedure_consents WHERE id = ?
      `).bind(b.id).first();

      if (!existing) return bad('Consent record not found', 404);

      await context.env.DB.prepare(`
        UPDATE procedure_consents
        SET status = ?, reviewer_staff_id = ?, reviewer_name = ?, reviewer_role = ?, reviewed_at = ?, review_notes = ?
        WHERE id = ?
      `).bind(status, user.sid, user.name || 'Clinical Director', user.role, now, b.review_notes || '', b.id).run();

      // If approved DNR consent, activate case DNR
      if (existing.is_dnr === 1) {
        await context.env.DB.prepare(`
          UPDATE cases SET dnr_active = ? WHERE id = ?
        `).bind(status === 'approved' ? 1 : 0, existing.case_id).run().catch(() => {});
      }

      await audit(context.env, user.sid, `consent_${status}`, 'case', existing.case_id);
      return json({ ok: true, id: b.id, status });
    }

    // 2. Sign Pending Verbal Order
    if (b.action === 'sign_verbal_order') {
      if (!b.signee_name || !b.signature_data) {
        return bad('Signee name and signature data are required');
      }

      const existing = await context.env.DB.prepare(`
        SELECT * FROM procedure_consents WHERE id = ?
      `).bind(b.id).first();
      if (!existing) return bad('Consent record not found', 404);

      const now = Date.now();
      await context.env.DB.prepare(`
        UPDATE procedure_consents
        SET signee_name = ?, signee_ic = ?, relationship = ?, signature_data = ?, signed_at = ?, status = 'pending_approval'
        WHERE id = ?
      `).bind(
        b.signee_name.trim(), (b.signee_ic || '').trim(), b.relationship || 'self',
        b.signature_data, now, b.id
      ).run();

      await audit(context.env, user.sid, 'verbal_order_written_consent_signed', 'case', existing.case_id);
      return json({ ok: true, id: b.id, status: 'pending_approval' });
    }

    return bad('Invalid action');
  } catch (err) {
    return bad(err.message, 500);
  }
}

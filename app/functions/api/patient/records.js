import { json, bad } from '../_lib/respond.js';
import { verifySession, readCookie } from '../_lib/session.js';
import { hashPin, timingSafeEqual } from '../_lib/crypto.js';

const PATIENT_COOKIE = 'assura_patient_session';

async function getSecret(env) {
  return env.SESSION_SECRET || 'assura-patient-default-secret-key-2026';
}

async function getAuthUser(context) {
  const secret = await getSecret(context.env);
  const authHeader = context.request.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : readCookie(context.request, PATIENT_COOKIE);

  if (!token) return null;
  const payload = await verifySession(token, secret).catch(() => null);
  if (!payload || !payload.puid) return null;

  return await context.env.DB.prepare(
    'SELECT * FROM patient_users WHERE id = ?'
  ).bind(payload.puid).first().catch(() => null);
}

export async function onRequestGet(context) {
  const user = await getAuthUser(context);
  if (!user) return new Response(JSON.stringify({ error: 'Unauthorized: Please sign in as a patient/member' }), { status: 401, headers: { 'Content-Type': 'application/json' } });

  let caseData = null;
  let mewsData = null;
  let meds = [];
  let medAdmin = [];
  let insulinLogs = [];
  let documents = [];

  if (user.case_id) {
    caseData = await context.env.DB.prepare(`
      SELECT c.id, p.name, p.ic, p.age, p.allergies, p.address, s.name AS assigned_name
      FROM cases c
      LEFT JOIN patients p ON p.id = c.patient_id
      LEFT JOIN staff s ON s.id = c.assigned_staff_id
      WHERE c.id = ?
    `).bind(user.case_id).first().catch(() => null);

    // MEWS chart
    const mewsRow = await context.env.DB.prepare(
      'SELECT data FROM mews WHERE case_id = ?'
    ).bind(user.case_id).first().catch(() => null);
    if (mewsRow && mewsRow.data) {
      try { mewsData = JSON.parse(mewsRow.data); } catch (_) {}
    }

    // Medications
    const medsRows = await context.env.DB.prepare(`
      SELECT * FROM medications WHERE case_id = ? AND active = 1 ORDER BY created_at DESC
    `).bind(user.case_id).all().catch(() => ({ results: [] }));
    meds = medsRows.results || [];

    // Medication administration logs (last 7 days)
    const adminRows = await context.env.DB.prepare(`
      SELECT a.*, m.name AS med_name, m.dose, m.route
      FROM med_admin a
      JOIN medications m ON m.id = a.med_id
      WHERE a.case_id = ?
      ORDER BY a.given_at DESC
      LIMIT 100
    `).bind(user.case_id).all().catch(() => ({ results: [] }));
    medAdmin = adminRows.results || [];

    // Blood Glucose & Insulin Logs
    const insulinRows = await context.env.DB.prepare(`
      SELECT * FROM patient_insulin_logs
      WHERE case_id = ?
      ORDER BY timestamp DESC
      LIMIT 60
    `).bind(user.case_id).all().catch(() => ({ results: [] }));
    insulinLogs = insulinRows.results || [];
  }

  // Uploaded documents for this user
  const docRows = await context.env.DB.prepare(`
    SELECT id, title, category, file_type, uploaded_at, uploaded_by
    FROM patient_documents
    WHERE patient_user_id = ?
    ORDER BY uploaded_at DESC
  `).bind(user.id).all().catch(() => ({ results: [] }));
  documents = docRows.results || [];

  return json({
    user: {
      id: user.id,
      patient_name: user.patient_name,
      phone: user.phone,
      nric: user.nric,
      case_id: user.case_id,
    },
    caseData,
    mews: mewsData,
    meds,
    medAdmin,
    insulinLogs,
    documents,
  });
}

export async function onRequestPost(context) {
  const user = await getAuthUser(context);
  if (!user) return new Response(JSON.stringify({ error: 'Unauthorized: Please sign in as a patient/member' }), { status: 401, headers: { 'Content-Type': 'application/json' } });

  const body = await context.request.json().catch(() => ({}));
  const action = body.action;

  // 1. LINK CASE (by Access Code or Patient IC)
  if (action === 'link_case') {
    const codeOrIc = (body.query || '').trim();
    if (!codeOrIc) return bad('Please enter your Case Access Code or NRIC.');

    let foundCase = await context.env.DB.prepare(`
      SELECT c.id, p.name, p.ic, p.phone
      FROM cases c
      JOIN patients p ON p.id = c.patient_id
      WHERE c.id = ? OR p.ic = ? OR p.phone = ? OR p.phone LIKE ?
      LIMIT 1
    `).bind(codeOrIc, codeOrIc, codeOrIc, `%${codeOrIc.slice(-8)}%`).first().catch(() => null);

    if (!foundCase) {
      return bad('No active nursing case found matching this Access Code / IC. Please verify with your attending nurse.');
    }

    await context.env.DB.prepare(
      'UPDATE patient_users SET case_id = ? WHERE id = ?'
    ).bind(foundCase.id, user.id).run();

    return json({ ok: true, case_id: foundCase.id, name: foundCase.name });
  }

  // 2. UPLOAD MEDICAL DOCUMENT
  if (action === 'upload_doc') {
    const title = (body.title || '').trim();
    const category = (body.category || 'General Medical Report').trim();
    const file_data = body.file_data;
    const file_type = body.file_type || 'image/jpeg';

    if (!title) return bad('Document title is required (e.g. Hospital Discharge Summary).');
    if (!file_data) return bad('Document file attachment is required.');

    const docId = 'doc_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    const now = Date.now();

    await context.env.DB.prepare(`
      INSERT INTO patient_documents (
        id, patient_user_id, case_id, title, category, file_data, file_type, uploaded_at, uploaded_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(docId, user.id, user.case_id || null, title, category, file_data, file_type, now, user.patient_name).run();

    // Log PDPA upload action
    const ip = context.request.headers.get('cf-connecting-ip') || 'unknown';
    const ua = context.request.headers.get('user-agent') || 'unknown';
    const logId = 'log_' + Math.random().toString(36).slice(2, 10);
    await context.env.DB.prepare(`
      INSERT INTO patient_consent_logs (id, patient_user_id, case_id, action, ip_address, user_agent, created_at)
      VALUES (?, ?, ?, 'upload_doc', ?, ?, ?)
    `).bind(logId, user.id, user.case_id || '', ip, ua, now).run().catch(() => {});

    return json({ ok: true, docId, title });
  }

  // 3. CONSENT-EXPORT / DOWNLOAD VERIFICATION
  if (action === 'consent_export') {
    const pin = (body.pin || '').trim();
    if (!pin) return bad('Your security PIN is required to verify consent before downloading.');

    const expectedHash = await hashPin(pin, user.salt);
    if (!timingSafeEqual(expectedHash, user.pin_hash)) {
      return bad('Incorrect security PIN. Access denied under PDPA protocol.');
    }

    const ip = context.request.headers.get('cf-connecting-ip') || 'unknown';
    const ua = context.request.headers.get('user-agent') || 'unknown';
    const logId = 'log_' + Math.random().toString(36).slice(2, 10);
    const now = Date.now();

    await context.env.DB.prepare(`
      INSERT INTO patient_consent_logs (id, patient_user_id, case_id, action, ip_address, user_agent, created_at)
      VALUES (?, ?, ?, 'export_consent_authorized', ?, ?, ?)
    `).bind(logId, user.id, user.case_id || '', ip, ua, now).run().catch(() => {});

    return json({
      ok: true,
      consent_token: 'PDPA-CONSENT-' + Date.now().toString(36).toUpperCase(),
      timestamp: now,
      patient_name: user.patient_name,
    });
  }

  return bad('Invalid action');
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function onRequest(context) {
  if (context.request.method === 'GET') return onRequestGet(context);
  if (context.request.method === 'POST') return onRequestPost(context);
  if (context.request.method === 'OPTIONS') return onRequestOptions();
  return bad('Method not allowed', 405);
}

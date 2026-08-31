import { json, bad } from '../_lib/respond.js';
import { requireUser } from '../_lib/auth.js';
import { hashPin, timingSafeEqual } from '../_lib/crypto.js';
import { audit } from '../_lib/audit.js';

// POST /api/share/doctor — Generate a 72-hour PIN-protected doctor share link
export async function onRequestPost(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const user = r.user;

  const b = await context.request.json().catch(() => ({}));
  if (!b.case_id) return bad('case_id is required');

  const pin = (b.pin || '').toString().trim();
  if (!/^\d{4,6}$/.test(pin)) return bad('4-6 digit numeric PIN required');

  const salt = crypto.randomUUID().slice(0, 8);
  const pinHash = await hashPin(pin, salt);
  const token = 'doc_' + crypto.randomUUID().replace(/-/g, '').slice(0, 16);
  const now = Date.now();
  const expiresAt = now + 72 * 3600 * 1000; // 72 hours

  const id = crypto.randomUUID();
  await context.env.DB.prepare(`
    INSERT INTO doctor_shares (
      id, case_id, token, pin_hash, doctor_name, doctor_phone,
      expires_at, created_at, created_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    id, b.case_id, token, `${salt}:${pinHash}`,
    b.doctor_name || '', b.doctor_phone || '',
    expiresAt, now, user.sid
  ).run();

  await audit(context.env, user.sid, 'doctor_share_created', 'case', b.case_id);

  return json({
    ok: true,
    token,
    pin,
    expires_at: expiresAt,
    share_url: `https://assuranursing.com/doctor.html?t=${token}`,
  });
}

// GET /api/share/doctor?token=...&pin=... — Doctor accesses clinical records
export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const token = url.searchParams.get('token');
  const pin = url.searchParams.get('pin');

  if (!token) return bad('token is required', 400);

  const share = await context.env.DB.prepare(`
    SELECT * FROM doctor_shares WHERE token = ?
  `).bind(token).first();

  if (!share) return bad('Invalid or expired doctor link', 404);
  if (Date.now() > share.expires_at) return bad('This doctor link has expired (72-hour limit reached)', 410);

  // Verify PIN if provided
  if (!pin) {
    return json({ requires_pin: true, doctor_name: share.doctor_name || '' });
  }

  const [salt, expectedHash] = (share.pin_hash || '').split(':');
  const actualHash = await hashPin(pin.trim(), salt);
  if (!timingSafeEqual(actualHash, expectedHash)) {
    return bad('Incorrect security PIN', 401);
  }

  // Update access stats
  await context.env.DB.prepare(`
    UPDATE doctor_shares
    SET access_count = access_count + 1, last_accessed_at = ?
    WHERE id = ?
  `).bind(Date.now(), share.id).run();

  const caseId = share.case_id;

  // Fetch patient details, MEWS chart, MAR active meds, wound progress, glucose logs safely
  let patient = null, mews = null, meds = { results: [] }, wounds = { results: [] }, glucose = { results: [] }, visits = { results: [] }, docs = { results: [] };
  
  try {
    patient = await context.env.DB.prepare(`
      SELECT p.name, p.age, p.sex, p.care_type, p.notes
      FROM cases c JOIN patients p ON p.id = c.patient_id WHERE c.id = ?
    `).bind(caseId).first().catch(() => null);
  } catch (_) {}

  try {
    mews = await context.env.DB.prepare('SELECT data, updated_at FROM mews WHERE case_id = ?').bind(caseId).first().catch(() => null);
  } catch (_) {}

  try {
    meds = await context.env.DB.prepare('SELECT * FROM medications WHERE case_id = ? AND active = 1').bind(caseId).all().catch(() => ({ results: [] }));
  } catch (_) {}

  try {
    wounds = await context.env.DB.prepare('SELECT * FROM wounds WHERE case_id = ? ORDER BY created_at DESC').bind(caseId).all().catch(() => ({ results: [] }));
  } catch (_) {}

  try {
    glucose = await context.env.DB.prepare('SELECT * FROM insulin_records WHERE case_id = ? ORDER BY date DESC, time DESC LIMIT 20').bind(caseId).all().catch(() => ({ results: [] }));
  } catch (_) {}

  try {
    visits = await context.env.DB.prepare('SELECT * FROM visits WHERE case_id = ? ORDER BY visit_at DESC LIMIT 10').bind(caseId).all().catch(() => ({ results: [] }));
  } catch (_) {}

  try {
    docs = await context.env.DB.prepare('SELECT id, doc_type, title, content_json, created_at FROM clinical_documents WHERE case_id = ? ORDER BY created_at DESC').bind(caseId).all().catch(() => ({ results: [] }));
  } catch (_) {}

  return json({
    ok: true,
    patient: patient || {},
    mews: mews ? { data: safeParse(mews.data), updated_at: mews.updated_at } : null,
    medications: (meds && meds.results) || [],
    wounds: (wounds && wounds.results) || [],
    glucose_logs: (glucose && glucose.results) || [],
    recent_visits: (visits && visits.results) || [],
    clinical_docs: ((docs && docs.results) || []).map((d) => ({ ...d, content: safeParse(d.content_json) })),
    expires_at: share.expires_at,
  });
}

function safeParse(s) {
  try { return JSON.parse(s || '{}'); } catch { return {}; }
}

import { json, bad } from '../_lib/respond.js';
import { hashPin, randomSaltHex, timingSafeEqual } from '../_lib/crypto.js';
import { signSession, verifySession, readCookie } from '../_lib/session.js';

const PATIENT_COOKIE = 'assura_patient_session';

async function getSecret(env) {
  return env.SESSION_SECRET || 'assura-patient-default-secret-key-2026';
}

function normalizePhone(p) {
  let clean = String(p || '').trim().replace(/[^\d]/g, '');
  if (clean.startsWith('60')) clean = '0' + clean.slice(2);
  else if (!clean.startsWith('0') && clean.length >= 9) clean = '0' + clean;
  return clean;
}

async function ensureTables(db) {
  try {
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS patient_users (
        id TEXT PRIMARY KEY,
        phone TEXT NOT NULL UNIQUE,
        email TEXT,
        patient_name TEXT NOT NULL,
        nric TEXT,
        pin_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        consent_pdpa INTEGER NOT NULL DEFAULT 1,
        case_id TEXT,
        created_at INTEGER NOT NULL,
        last_login INTEGER
      )
    `).run();
  } catch (_) {}
}

export async function onRequestGet(context) {
  const { env, request } = context;
  const secret = await getSecret(env);
  await ensureTables(env.DB);

  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : readCookie(request, PATIENT_COOKIE);

  if (!token) return json({ user: null });
  const payload = await verifySession(token, secret).catch(() => null);
  if (!payload || !payload.puid) return json({ user: null });

  const row = await env.DB.prepare(
    'SELECT id, phone, email, patient_name, nric, case_id, created_at FROM patient_users WHERE id = ?'
  ).bind(payload.puid).first().catch(() => null);

  if (!row) return json({ user: null });

  let caseInfo = null;
  if (row.case_id) {
    caseInfo = await env.DB.prepare(`
      SELECT c.id, p.name, p.allergies, p.address
      FROM cases c
      JOIN patients p ON p.id = c.patient_id
      WHERE c.id = ?
    `).bind(row.case_id).first().catch(() => null);
  }

  return json({ user: row, caseInfo });
}

export async function onRequestPost(context) {
  const { env, request } = context;
  const secret = await getSecret(env);
  await ensureTables(env.DB);

  const body = await request.json().catch(() => ({}));
  const action = body.action || 'login';

  if (action === 'logout') {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Set-Cookie', `${PATIENT_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`);
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  }

  // 1. REGISTRATION
  if (action === 'register') {
    const rawPhone = (body.phone || '').trim();
    const phone = normalizePhone(rawPhone);
    const patient_name = (body.patient_name || '').trim();
    const pin = (body.pin || '').trim();
    const email = (body.email || '').trim();
    const nric = (body.nric || '').trim();
    const consent_pdpa = body.consent_pdpa === true || body.consent_pdpa === 1 || body.consent_pdpa === 'true' || body.consent_pdpa === 'on';

    if (!phone || phone.length < 8) return bad('A valid mobile phone number is required (e.g. 0123456789).');
    if (!patient_name) return bad('Patient / Member name is required.');
    if (!pin || pin.length < 4) return bad('A security PIN / password of at least 4 characters is required.');
    if (!consent_pdpa) return bad('PDPA consent agreement is mandatory to register and access medical records.');

    // Check if phone already registered
    const existing = await env.DB.prepare(
      'SELECT id FROM patient_users WHERE phone = ?'
    ).bind(phone).first().catch(() => null);
    if (existing) {
      return bad('This phone number is already registered. Please sign in with your PIN on the Sign In tab.');
    }

    // Check if an existing case exists in Assura database by phone or IC
    let linkedCase = null;
    if (nric) {
      linkedCase = await env.DB.prepare(`
        SELECT c.id FROM cases c
        JOIN patients p ON p.id = c.patient_id
        WHERE p.ic = ? OR p.phone = ?
        LIMIT 1
      `).bind(nric, nric).first().catch(() => null);
    }
    if (!linkedCase && phone) {
      const lastDigits = phone.slice(-8);
      linkedCase = await env.DB.prepare(`
        SELECT c.id FROM cases c
        JOIN patients p ON p.id = c.patient_id
        WHERE p.phone LIKE ?
        LIMIT 1
      `).bind(`%${lastDigits}%`).first().catch(() => null);
    }

    const id = 'pt_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    const salt = randomSaltHex();
    const pin_hash = await hashPin(pin, salt);
    const now = Date.now();
    const case_id = linkedCase ? linkedCase.id : null;

    try {
      await env.DB.prepare(`
        INSERT INTO patient_users (
          id, phone, email, patient_name, nric, pin_hash, salt, consent_pdpa, case_id, created_at, last_login
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)
      `).bind(id, phone, email, patient_name, nric, pin_hash, salt, case_id, now, now).run();
    } catch (dbErr) {
      return bad('Registration error: ' + (dbErr.message || 'Database error occurred. Please try again.'));
    }

    const token = await signSession({ puid: id, phone, exp: now + 30 * 86400000 }, secret);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Set-Cookie', `${PATIENT_COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=2592000`);

    return new Response(JSON.stringify({
      ok: true,
      user: { id, phone, email, patient_name, nric, case_id, created_at: now },
      token,
    }), { status: 200, headers });
  }

  // 2. LOGIN
  if (action === 'login') {
    const rawPhone = (body.phone || '').trim();
    const phone = normalizePhone(rawPhone);
    const pin = (body.pin || '').trim();

    if (!phone || !pin) return bad('Phone number and PIN / password are required.');

    let user = await env.DB.prepare(
      'SELECT * FROM patient_users WHERE phone = ?'
    ).bind(phone).first().catch(() => null);

    if (!user && rawPhone !== phone) {
      user = await env.DB.prepare(
        'SELECT * FROM patient_users WHERE phone = ?'
      ).bind(rawPhone).first().catch(() => null);
    }

    if (!user) {
      return bad('Account not found. Please click "Register Member (新会员注册)" tab to create your account.');
    }

    const expectedHash = await hashPin(pin, user.salt);
    if (!timingSafeEqual(expectedHash, user.pin_hash)) {
      return bad('Incorrect security PIN / password. Please try again.');
    }

    const now = Date.now();
    await env.DB.prepare('UPDATE patient_users SET last_login = ? WHERE id = ?').bind(now, user.id).run().catch(() => {});

    const token = await signSession({ puid: user.id, phone: user.phone, exp: now + 30 * 86400000 }, secret);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Set-Cookie', `${PATIENT_COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=2592000`);

    let caseInfo = null;
    if (user.case_id) {
      caseInfo = await env.DB.prepare(`
        SELECT c.id, p.name, p.allergies, p.address
        FROM cases c
        JOIN patients p ON p.id = c.patient_id
        WHERE c.id = ?
      `).bind(user.case_id).first().catch(() => null);
    }

    return new Response(JSON.stringify({
      ok: true,
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        patient_name: user.patient_name,
        nric: user.nric,
        case_id: user.case_id,
        created_at: user.created_at,
      },
      caseInfo,
      token,
    }), { status: 200, headers });
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

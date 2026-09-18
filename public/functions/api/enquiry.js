// Public booking/enquiry intake — the assuranursing.com booking page POSTs here
// (no login) and we create a patient + case in 'intake' status, source 'web',
// so every web booking lands in the staff app's Cases list automatically.
//
// Protections: only accepts the booking site's origin, drops honeypot hits,
// requires name + phone, de-dupes repeat submits within 10 minutes, and (once
// configured) verifies a Cloudflare Turnstile token. On success it can also
// email you a "new booking" alert via Resend.
import { json, bad } from './_lib/respond.js';
import { notifyAdmins, notifyAllStaff } from './_lib/notify.js';

const ALLOWED = [
  'https://assuranursing.com',
  'https://www.assuranursing.com',
];

function corsHeaders(origin) {
  const allow = origin && ALLOWED.includes(origin) ? origin : ALLOWED[0];
  return {
    'access-control-allow-origin': allow,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-max-age': '86400',
    'vary': 'origin',
  };
}

export function onRequestOptions(context) {
  return new Response(null, { status: 204, headers: corsHeaders(context.request.headers.get('origin')) });
}

// Verify a Turnstile token. If no secret is configured yet, we skip (so the
// form keeps working before you set it up).
async function verifyTurnstile(env, token, ip) {
  if (!env.TURNSTILE_SECRET) return true;
  if (!token) return false;
  const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token });
  if (ip) body.set('remoteip', ip);
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const d = await r.json();
    return !!d.success;
  } catch (_) { return false; }
}

// Optional: email you a "new booking" alert (needs RESEND_API_KEY + NOTIFY_EMAIL).
async function emailAlert(env, name, phone, notes) {
  if (!env.RESEND_API_KEY || !env.NOTIFY_EMAIL) return;
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: 'Bearer ' + env.RESEND_API_KEY, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: env.NOTIFY_FROM || 'Assura Bookings <onboarding@resend.dev>',
        to: [env.NOTIFY_EMAIL],
        subject: '🌐 New web booking — ' + name,
        text: `A new booking came in from the website.\n\nName: ${name}\nPhone: ${phone}\n\n${notes}\n\nOpen the app to accept or assign it.`,
      }),
    });
  } catch (_) { /* never block the booking on a mail failure */ }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const origin = request.headers.get('origin');
  const cors = corsHeaders(origin);

  if (origin && !ALLOWED.includes(origin)) {
    return json({ error: 'Forbidden origin' }, { status: 403, headers: cors });
  }

  const b = await request.json().catch(() => ({}));

  // Honeypot: real users never fill this hidden field.
  if (b.website) return json({ ok: true }, { headers: cors });

  const name = (b.name || '').toString().trim();
  const phone = (b.phone || '').toString().trim();
  if (!name || !phone) {
    return json({ error: 'Name and phone are required' }, { status: 400, headers: cors });
  }

  // Anti-bot check (skipped until you configure Turnstile).
  const ip = request.headers.get('CF-Connecting-IP');
  if (!(await verifyTurnstile(env, b.token, ip))) {
    return json({ error: 'Verification failed — please try again.' }, { status: 400, headers: cors });
  }

  const now = Date.now();

  const recent = await env.DB.prepare(
    `SELECT c.id FROM cases c JOIN patients p ON p.id = c.patient_id
      WHERE p.phone = ? AND c.source = 'web' AND c.created_at > ? LIMIT 1`
  ).bind(phone, now - 10 * 60 * 1000).first();
  if (recent) return json({ ok: true, deduped: true }, { headers: cors });

  const services = Array.isArray(b.services) ? b.services.filter(Boolean) : [];
  const lines = [];
  lines.push(b.mode === 'ask' ? '[Web enquiry — question]' : '[Web booking]');
  if (services.length) lines.push('Services: ' + services.join(', '));
  if (b.date) lines.push('Preferred date: ' + b.date);
  if (b.time) lines.push('Preferred time: ' + b.time);
  if (b.km != null && b.km !== '') lines.push('Approx distance: ' + b.km + ' km');
  if (b.lat != null && b.lng != null)
    lines.push('Location pin: https://www.google.com/maps?q=' + b.lat + ',' + b.lng);
  if (b.notes) lines.push('Notes: ' + b.notes);
  const notes = lines.join('\n').slice(0, 1500);

  const pid = crypto.randomUUID();
  const cid = crypto.randomUUID();
  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO patients (id,name,phone,address,age,sex,care_type,consent_at,consent_by,minor,notes,created_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
    ).bind(pid, name, phone, (b.area || '').toString().slice(0, 300), '', '',
      'procedure', null, null, 0, notes, now),
    env.DB.prepare(
      `INSERT INTO cases (id,patient_id,status,billing_mode,source,created_at)
       VALUES (?,?,?,?,?,?)`
    ).bind(cid, pid, 'intake', 'per_visit', 'web', now),
  ]);

  // Send in-app notification alerts to Admins and all Staff
  const alertAction = async () => {
    await emailAlert(env, name, phone, notes);
    await notifyAdmins(env, '🌐 New Web Booking Received', `New booking: ${name} (${phone}) in ${b.area || 'Penang'}. Tap to review & assign.`, 'case_intake', cid);
    await notifyAllStaff(env, '📢 New Open Case Available', `New visit request in ${b.area || 'Penang'} (${name}). View case to request slot!`, 'open_case', cid);
  };

  if (context.waitUntil) context.waitUntil(alertAction());
  else await alertAction();

  return json({ ok: true, case_id: cid }, { headers: cors });
}

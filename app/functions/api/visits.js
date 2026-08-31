import { json, bad } from './_lib/respond.js';
import { requireUser } from './_lib/auth.js';
import { createNotification } from './_lib/notify.js';

export async function onRequestGet(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const env = context.env;
  const url = new URL(context.request.url);
  const caseId = url.searchParams.get('case_id');
  const active = url.searchParams.get('active');

  if (active) {
    const row = await env.DB.prepare(
      'SELECT * FROM visits WHERE staff_id=? AND clock_out_at IS NULL ORDER BY clock_in_at DESC LIMIT 1'
    ).bind(r.user.sid).first();
    return json({ visit: row || null });
  }

  if (caseId) {
    const rows = await env.DB.prepare(
      'SELECT * FROM visits WHERE case_id=? ORDER BY clock_in_at DESC'
    ).bind(caseId).all();
    return json({ visits: rows.results || [] });
  }

  // Get recent visits for staff or all if supervisor/admin
  const query = r.user.role === 'admin' || r.user.role === 'supervisor' || r.user.role === 'office'
    ? 'SELECT * FROM visits ORDER BY clock_in_at DESC LIMIT 50'
    : 'SELECT * FROM visits WHERE staff_id=? ORDER BY clock_in_at DESC LIMIT 50';
  
  const stmt = query.includes('WHERE')
    ? env.DB.prepare(query).bind(r.user.sid)
    : env.DB.prepare(query);
  
  const rows = await stmt.all();
  return json({ visits: rows.results || [] });
}

export async function onRequestPost(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const env = context.env;
  const b = await context.request.json().catch(() => ({}));

  if (b.action === 'clock_in') {
    if (!b.case_id) return bad('Missing case_id');
    const id = 'vis_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    const now = Date.now();
    await env.DB.prepare(
      'INSERT INTO visits (id, case_id, staff_id, staff_name, clock_in_at, clock_out_at, duration_minutes, lat, lng, notes, care_summary, created_at) VALUES (?, ?, ?, ?, ?, NULL, NULL, ?, ?, ?, NULL, ?)'
    ).bind(id, b.case_id, r.user.sid, r.user.name, now, b.lat || null, b.lng || null, b.notes || null, now).run();

    return json({ ok: true, id, clock_in_at: now });
  }

  if (b.action === 'clock_out') {
    if (!b.id) return bad('Missing visit id');
    const now = Date.now();
    const existing = await env.DB.prepare('SELECT * FROM visits WHERE id=?').bind(b.id).first();
    if (!existing) return bad('Visit not found');

    const duration = Math.max(1, Math.round((now - existing.clock_in_at) / 60000));
    await env.DB.prepare(
      'UPDATE visits SET clock_out_at=?, duration_minutes=?, care_summary=?, notes=? WHERE id=?'
    ).bind(now, duration, b.care_summary || '', b.notes || existing.notes || '', b.id).run();

    return json({ ok: true, duration_minutes: duration, clock_out_at: now });
  }

  return bad('Invalid action');
}

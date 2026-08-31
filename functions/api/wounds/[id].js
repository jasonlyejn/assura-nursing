import { json, bad } from '../_lib/respond.js';
import { requireUser } from '../_lib/auth.js';

export async function onRequestGet(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const env = context.env;
  const caseId = context.params.id;

  const rows = await env.DB.prepare(
    'SELECT * FROM wound_records WHERE case_id=? ORDER BY assessed_at DESC'
  ).bind(caseId).all();

  return json({ wounds: rows.results || [] });
}

export async function onRequestPost(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const env = context.env;
  const caseId = context.params.id;
  const b = await context.request.json().catch(() => ({}));

  if (!b.wound_type && !b.stage && !b.photo_data) {
    return bad('Missing wound assessment details');
  }

  const id = 'wnd_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
  const now = Date.now();

  await env.DB.prepare(`
    INSERT INTO wound_records (
      id, case_id, staff_id, staff_name, photo_data, wound_type, location, stage,
      length_cm, width_cm, depth_cm, exudate,
      granulation_pct, slough_pct, necrotic_pct, epithelial_pct,
      dressing_used, notes, assessed_at, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    id, caseId, r.user.sid, r.user.name, b.photo_data || '',
    b.wound_type || 'General Wound', b.location || '', b.stage || '',
    Number(b.length_cm) || 0, Number(b.width_cm) || 0, Number(b.depth_cm) || 0,
    b.exudate || 'None',
    Number(b.granulation_pct) || 0, Number(b.slough_pct) || 0,
    Number(b.necrotic_pct) || 0, Number(b.epithelial_pct) || 0,
    b.dressing_used || '', b.notes || '',
    Number(b.assessed_at) || now, now
  ).run();

  return json({ ok: true, id });
}

export async function onRequestDelete(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  if (r.user.role !== 'admin' && r.user.role !== 'supervisor') return bad('Forbidden');
  const env = context.env;
  const id = context.params.id;

  await env.DB.prepare('DELETE FROM wound_records WHERE id=?').bind(id).run();
  return json({ ok: true });
}

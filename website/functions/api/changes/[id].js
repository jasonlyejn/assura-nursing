import { json, bad } from '../_lib/respond.js';
import { requireAdmin } from '../_lib/auth.js';
import { audit } from '../_lib/audit.js';

const OWN = ['name', 'phone', 'email', 'ic', 'address', 'qualification', 'reg_no',
             'kin_name', 'kin_phone', 'bank_name', 'bank_acc', 'notes'];

// PATCH /api/changes/[id]  { action: 'approve' | 'reject', note }
export async function onRequestPatch(context) {
  const a = await requireAdmin(context);
  if (a.error) return a.error;

  const c = await context.env.DB.prepare('SELECT * FROM staff_changes WHERE id=?')
    .bind(context.params.id).first();
  if (!c) return bad('Request not found', 404);
  if (c.status !== 'pending') return bad('This request was already dealt with');

  const b = await context.request.json().catch(() => ({}));
  const now = Date.now();
  const who = await context.env.DB.prepare('SELECT name FROM staff WHERE id=?')
    .bind(a.user.sid).first();

  if (b.action === 'approve') {
    let fields = {};
    try { fields = JSON.parse(c.fields || '{}'); } catch (_) { fields = {}; }
    const sets = [], binds = [];
    for (const f of OWN) {
      if (f in fields) { sets.push(f + '=?'); binds.push((fields[f] || '').toString()); }
    }
    if (sets.length) {
      binds.push(c.staff_id);
      await context.env.DB.prepare('UPDATE staff SET ' + sets.join(', ') + ' WHERE id=?')
        .bind(...binds).run();
    }
    await context.env.DB.prepare(
      "UPDATE staff_changes SET status='approved', reviewed_by=?, reviewed_name=?, reviewed_at=?, note=? WHERE id=?"
    ).bind(a.user.sid, (who && who.name) || '', now, (b.note || '').slice(0, 400), c.id).run();
    await audit(context.env, a.user.sid, 'profile_change_approved', 'staff', c.staff_id);
    return json({ ok: true });
  }

  if (b.action === 'reject') {
    await context.env.DB.prepare(
      "UPDATE staff_changes SET status='rejected', reviewed_by=?, reviewed_name=?, reviewed_at=?, note=? WHERE id=?"
    ).bind(a.user.sid, (who && who.name) || '', now, (b.note || '').slice(0, 400), c.id).run();
    await audit(context.env, a.user.sid, 'profile_change_rejected', 'staff', c.staff_id);
    return json({ ok: true });
  }

  return bad('Unknown action');
}

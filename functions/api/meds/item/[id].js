import { json, bad } from '../../_lib/respond.js';
import { getUser, can } from '../../_lib/auth.js';
import { caseFor } from '../../_lib/caseAccess.js';
import { audit } from '../../_lib/audit.js';

// PATCH /api/meds/item/[id]  — edit, or stop a medication
export async function onRequestPatch(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const m = await context.env.DB.prepare('SELECT * FROM medications WHERE id=?')
    .bind(context.params.id).first();
  if (!m) return bad('Medication not found', 404);
  const c = await caseFor(context, m.case_id, user);
  if (c.error) return c.error;
  if (!can(user, 'chart')) return bad('You do not have permission to change medications', 403);

  const b = await context.request.json().catch(() => ({}));

  if (b.action === 'stop') {
    await context.env.DB.prepare('UPDATE medications SET active=0, stopped_at=? WHERE id=?')
      .bind(Date.now(), m.id).run();
    await audit(context.env, user.sid, 'med_stopped', 'case', m.case_id);
    return json({ ok: true });
  }
  if (b.action === 'resume') {
    await context.env.DB.prepare('UPDATE medications SET active=1, stopped_at=NULL WHERE id=?')
      .bind(m.id).run();
    return json({ ok: true });
  }

  const F = ['name', 'dose', 'route', 'frequency', 'times', 'start_date', 'end_date',
             'indication', 'max_dose', 'notes'];
  const sets = [], binds = [];
  for (const f of F) if (f in b) { sets.push(f + '=?'); binds.push((b[f] || '').toString().trim()); }
  if (!sets.length) return bad('Nothing to update');
  binds.push(m.id);
  await context.env.DB.prepare('UPDATE medications SET ' + sets.join(', ') + ' WHERE id=?')
    .bind(...binds).run();
  await audit(context.env, user.sid, 'med_edited', 'case', m.case_id);
  return json({ ok: true });
}

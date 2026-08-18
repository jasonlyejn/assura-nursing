import { json, bad } from '../_lib/respond.js';
import { getUser } from '../_lib/auth.js';
import { caseFor } from '../_lib/caseAccess.js';
import { audit } from '../_lib/audit.js';

// PATCH /api/quotes/[id]  { action: 'sent' | 'accepted' | 'declined' }
export async function onRequestPatch(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);

  const q = await context.env.DB.prepare('SELECT * FROM quotes WHERE id=?')
    .bind(context.params.id).first();
  if (!q) return bad('Quote not found', 404);

  const c = await caseFor(context, q.case_id, user);
  if (c.error) return c.error;

  const { action } = await context.request.json().catch(() => ({}));
  const now = Date.now();

  if (action === 'sent') {
    await context.env.DB.prepare("UPDATE quotes SET status='sent', sent_at=? WHERE id=?")
      .bind(now, q.id).run();
  } else if (action === 'accepted') {
    await context.env.DB.prepare("UPDATE quotes SET status='accepted', accepted_at=? WHERE id=?")
      .bind(now, q.id).run();
    // an accepted quote moves the case forward
    await context.env.DB.prepare("UPDATE cases SET status='accepted' WHERE id=? AND status='intake'")
      .bind(q.case_id).run();
  } else if (action === 'declined') {
    await context.env.DB.prepare("UPDATE quotes SET status='declined' WHERE id=?").bind(q.id).run();
  } else {
    return bad('Unknown action');
  }

  await audit(context.env, user.sid, 'quote_' + action, 'case', q.case_id);
  return json({ ok: true });
}

import { json, bad } from '../_lib/respond.js';
import { requireUser } from '../_lib/auth.js';
import { caseFor } from '../_lib/caseAccess.js';
import { audit } from '../_lib/audit.js';

// GET /api/mews/:caseId  ->  { data, rev }   (data null if none yet)
export async function onRequestGet(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const ca = await caseFor(context, context.params.caseId, r.user);
  if (ca.error) return ca.error;

  const row = await context.env.DB.prepare(
    'SELECT data, rev, updated_at, updated_by FROM mews WHERE case_id=?'
  ).bind(context.params.caseId).first();

  if (!row) return json({ data: null, rev: 0 });
  let data = null;
  try { data = JSON.parse(row.data); } catch { data = null; }
  return json({ data, rev: row.rev, updated_at: row.updated_at, updated_by: row.updated_by });
}

// PUT /api/mews/:caseId  body { data, rev }
//   - rev is the revision the client last saw. If it still matches, we save and
//     return the new rev. If the server moved on, we return { conflict, data, rev }
//     so the client can reload (last-write-wins, no silent overwrite).
export async function onRequestPut(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const ca = await caseFor(context, context.params.caseId, r.user);
  if (ca.error) return ca.error;

  const b = await context.request.json().catch(() => ({}));
  if (b.data == null || typeof b.data !== 'object') return bad('Missing chart data');
  const clientRev = Number.isFinite(b.rev) ? b.rev : 0;
  const env = context.env, caseId = context.params.caseId;

  const cur = await env.DB.prepare('SELECT rev FROM mews WHERE case_id=?').bind(caseId).first();
  const serverRev = cur ? cur.rev : 0;

  if (serverRev !== clientRev) {
    // Someone else saved since the client loaded. Hand back the latest.
    const row = await env.DB.prepare('SELECT data, rev FROM mews WHERE case_id=?').bind(caseId).first();
    let data = null; try { data = JSON.parse(row.data); } catch {}
    return json({ conflict: true, data, rev: row.rev }, { status: 409 });
  }

  const nextRev = serverRev + 1;
  const payload = JSON.stringify(b.data);
  const now = Date.now();
  if (cur) {
    await env.DB.prepare('UPDATE mews SET data=?, rev=?, updated_at=?, updated_by=? WHERE case_id=?')
      .bind(payload, nextRev, now, r.user.sid, caseId).run();
  } else {
    await env.DB.prepare('INSERT INTO mews (case_id,data,rev,updated_at,updated_by) VALUES (?,?,?,?,?)')
      .bind(caseId, payload, nextRev, now, r.user.sid).run();
  }
  await audit(env, r.user.sid, 'mews_save', 'case', caseId);
  return json({ ok: true, rev: nextRev, updated_at: now });
}

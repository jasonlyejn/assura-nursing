import { json, bad } from '../_lib/respond.js';
import { getUser } from '../_lib/auth.js';
import { caseFor } from '../_lib/caseAccess.js';

const KINDS = ['team', 'client_out', 'client_in'];

// GET /api/chat/[caseId]?since=<ms>  — thread, oldest first
export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const caseId = context.params.caseId;
  const c = await caseFor(context, caseId, user);
  if (c.error) return c.error;

  const since = Number(new URL(context.request.url).searchParams.get('since')) || 0;
  const { results } = await context.env.DB.prepare(
    `SELECT id,kind,body,photo,staff_id,staff_name,pinned,created_at
       FROM messages WHERE case_id=? AND created_at>?
       ORDER BY created_at ASC LIMIT 300`
  ).bind(caseId, since).all();

  // remember how far this person has read (used for unread badges)
  if (results && results.length) {
    const last = results[results.length - 1].created_at;
    try {
      await context.env.DB.prepare(
        `INSERT INTO message_reads (case_id,staff_id,read_at) VALUES (?,?,?)
         ON CONFLICT(case_id,staff_id) DO UPDATE SET read_at=MAX(read_at, excluded.read_at)`
      ).bind(caseId, user.sid, last).run();
    } catch (_) { /* table added later — safe to skip */ }
  }
  return json({ messages: results || [] });
}

// POST /api/chat/[caseId]  { kind, body, photo }
export async function onRequestPost(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const caseId = context.params.caseId;
  const c = await caseFor(context, caseId, user);
  if (c.error) return c.error;

  const b = await context.request.json().catch(() => ({}));
  const text = (b.body || '').toString().trim();
  const photo = b.photo || null;
  if (!text && !photo) return bad('Write something first');
  if (text.length > 4000) return bad('That message is too long');
  if (photo && (typeof photo !== 'string' || !photo.startsWith('data:image/')))
    return bad('Not an image');
  if (photo && photo.length > 200000) return bad('Photo too large — please retake it');

  const kind = KINDS.includes(b.kind) ? b.kind : 'team';
  const who = await context.env.DB.prepare('SELECT name FROM staff WHERE id=?')
    .bind(user.sid).first();

  const id = crypto.randomUUID();
  await context.env.DB.prepare(
    `INSERT INTO messages (id,case_id,kind,body,photo,staff_id,staff_name,pinned,created_at)
     VALUES (?,?,?,?,?,?,?,0,?)`
  ).bind(id, caseId, kind, text, photo, user.sid, (who && who.name) || '', Date.now()).run();

  return json({ ok: true, id });
}

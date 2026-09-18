import { json, bad } from './_lib/respond.js';
import { requireUser, can } from './_lib/auth.js';
import { caseFor } from './_lib/caseAccess.js';
import { audit } from './_lib/audit.js';

// GET /api/clinical_docs?case_id=...&doc_type=...
export async function onRequestGet(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const user = r.user;

  const url = new URL(context.request.url);
  const caseId = url.searchParams.get('case_id');
  const docType = url.searchParams.get('doc_type');

  if (!caseId) return bad('case_id required');
  const c = await caseFor(context, caseId, user);
  if (c.error) return c.error;

  let sql = `
    SELECT d.*, s.name AS author_name, s.role AS author_role
    FROM clinical_documents d
    LEFT JOIN staff s ON s.id = d.created_by
    WHERE d.case_id = ?
  `;
  const binds = [caseId];
  if (docType) {
    sql += ' AND d.doc_type = ?';
    binds.push(docType);
  }
  sql += ' ORDER BY d.created_at DESC';

  const { results } = await context.env.DB.prepare(sql).bind(...binds).all();
  const docs = (results || []).map((d) => ({
    ...d,
    content: safeParse(d.content_json),
  }));

  return json({ documents: docs });
}

function safeParse(str) {
  try { return JSON.parse(str || '{}'); } catch { return {}; }
}

// POST /api/clinical_docs — Create a new clinical assessment / document / notes
export async function onRequestPost(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const user = r.user;

  const b = await context.request.json().catch(() => ({}));
  if (!b.case_id || !b.title || !b.doc_type) return bad('case_id, title, and doc_type are required');

  const c = await caseFor(context, b.case_id, user);
  if (c.error) return c.error;

  const id = 'doc_' + crypto.randomUUID().slice(0, 8);
  const now = Date.now();
  const contentJson = typeof b.content === 'string' ? b.content : JSON.stringify(b.content || {});

  await context.env.DB.prepare(`
    INSERT INTO clinical_documents (id, case_id, doc_type, title, content_json, attachment_url, created_by, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    id, b.case_id, b.doc_type, b.title.trim(), contentJson,
    b.attachment_url || null, user.sid, now
  ).run();

  await audit(context.env, user.sid, 'clinical_doc_created', 'case', b.case_id);
  return json({ ok: true, id });
}

// PUT /api/clinical_docs — Update an existing clinical document
export async function onRequestPut(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const user = r.user;

  const b = await context.request.json().catch(() => ({}));
  if (!b.id) return bad('id is required');

  const doc = await context.env.DB.prepare('SELECT * FROM clinical_documents WHERE id=?')
    .bind(b.id).first();
  if (!doc) return bad('Document not found', 404);

  // Author or Admin can edit
  if (doc.created_by !== user.sid && !can(user, 'allCases')) {
    return bad('Not authorized to edit this document', 403);
  }

  const now = Date.now();
  const title = b.title ? b.title.trim() : doc.title;
  const contentJson = b.content !== undefined
    ? (typeof b.content === 'string' ? b.content : JSON.stringify(b.content))
    : doc.content_json;

  await context.env.DB.prepare(`
    UPDATE clinical_documents
    SET title = ?, content_json = ?, attachment_url = ?, updated_at = ?, updated_by = ?
    WHERE id = ?
  `).bind(
    title, contentJson, b.attachment_url !== undefined ? b.attachment_url : doc.attachment_url,
    now, user.sid, b.id
  ).run();

  await audit(context.env, user.sid, 'clinical_doc_updated', 'case', doc.case_id);
  return json({ ok: true, id: b.id });
}

// DELETE /api/clinical_docs — Delete/void an assessment
export async function onRequestDelete(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const user = r.user;

  const url = new URL(context.request.url);
  const id = url.searchParams.get('id');
  if (!id) return bad('id is required');

  const doc = await context.env.DB.prepare('SELECT * FROM clinical_documents WHERE id=?')
    .bind(id).first();
  if (!doc) return bad('Document not found', 404);

  if (doc.created_by !== user.sid && !can(user, 'allCases')) {
    return bad('Not authorized to delete this document', 403);
  }

  await context.env.DB.prepare('DELETE FROM clinical_documents WHERE id=?').bind(id).run();
  await audit(context.env, user.sid, 'clinical_doc_deleted', 'case', doc.case_id);
  return json({ ok: true });
}

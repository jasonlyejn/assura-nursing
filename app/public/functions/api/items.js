import { json, bad } from './_lib/respond.js';
import { getUser, requireAdmin } from './_lib/auth.js';

export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const { results } = await context.env.DB
    .prepare(`SELECT id,code,category,name,brand,size,uom,price,prepare_by,order_ahead,spec,image,sort,active
              FROM items ORDER BY category, sort, code`).all();
  return json({ items: results || [] });
}

// Save edits (prices, codes, categories, uom, active flag)
export async function onRequestPut(context) {
  const a = await requireAdmin(context);
  if (a.error) return a.error;
  const { items } = await context.request.json().catch(() => ({}));
  if (!Array.isArray(items)) return bad('items array required');

  const stmts = items.map((it) =>
    context.env.DB.prepare(
      `UPDATE items SET code=?, category=?, name=?, brand=?, size=?, uom=?, price=?,
              prepare_by=?, order_ahead=?, spec=?, active=? WHERE id=?`
    ).bind(
      (it.code || '').trim().toUpperCase() || null,
      (it.category || 'UNCATEGORISED').trim().toUpperCase(),
      (it.name || '').trim(),
      (it.brand || '').trim(),
      (it.size || '').trim(),
      (it.uom || 'EACH').trim().toUpperCase(),
      Number(it.price) || 0,
      it.prepare_by === 'family' ? 'family' : 'staff',
      it.order_ahead ? 1 : 0,
      it.spec || '',
      it.active === 0 || it.active === false ? 0 : 1,
      it.id
    ));
  await context.env.DB.batch(stmts);
  return json({ ok: true, updated: items.length });
}

// Add a new chargeable item
export async function onRequestPost(context) {
  const a = await requireAdmin(context);
  if (a.error) return a.error;
  const b = await context.request.json().catch(() => ({}));
  const name = (b.name || '').trim();
  if (!name) return bad('Item name required');

  const code = (b.code || '').trim().toUpperCase();
  if (code) {
    const dup = await context.env.DB.prepare('SELECT id FROM items WHERE code=?').bind(code).first();
    if (dup) return bad('That item code is already used: ' + code);
  }
  const category = (b.category || 'UNCATEGORISED').trim().toUpperCase();
  const row = await context.env.DB
    .prepare('SELECT COALESCE(MAX(sort),0)+1 AS n FROM items').first();

  const id = 'itm_' + crypto.randomUUID().slice(0, 8);
  await context.env.DB.prepare(
    `INSERT INTO items (id,code,category,name,brand,size,uom,price,prepare_by,order_ahead,spec,sort,active)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,1)`
  ).bind(id, code || null, category, name, (b.brand || '').trim(), (b.size || '').trim(),
    (b.uom || 'EACH').trim().toUpperCase(),
    Number(b.price) || 0, b.prepare_by === 'family' ? 'family' : 'staff',
    b.order_ahead ? 1 : 0, b.spec || '', (row && row.n) || 1).run();

  return json({ ok: true, id, code });
}

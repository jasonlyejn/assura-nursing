import { json, bad } from '../../_lib/respond.js';
import { requireAdmin } from '../../_lib/auth.js';

// Attach or clear a product photo. Body: { image: "data:image/jpeg;base64,..." } or { image: null }
export async function onRequestPut(context) {
  const a = await requireAdmin(context);
  if (a.error) return a.error;
  const id = context.params.id;
  const { image } = await context.request.json().catch(() => ({}));

  if (image && typeof image === 'string') {
    if (!image.startsWith('data:image/')) return bad('Not an image');
    // keep the database small — photos are compressed to a thumbnail client-side
    if (image.length > 200000) return bad('Image too large — please retake it');
  }
  await context.env.DB.prepare('UPDATE items SET image=? WHERE id=?')
    .bind(image || null, id).run();
  return json({ ok: true });
}

export async function audit(env, actorId, action, entity, entityId) {
  try {
    await env.DB.prepare(
      'INSERT INTO audit (id,actor_id,action,entity,entity_id,at) VALUES (?,?,?,?,?,?)'
    ).bind(crypto.randomUUID(), actorId || null, action, entity, entityId || null, Date.now()).run();
  } catch (_) { /* audit must never block the action */ }
}

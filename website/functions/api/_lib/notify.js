export async function createNotification(env, staffId, title, body, type = 'info', link = '') {
  if (!staffId) return;
  try {
    const id = 'notif_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    await env.DB.prepare(
      'INSERT INTO notifications (id, staff_id, title, body, type, link, read_at, created_at) VALUES (?, ?, ?, ?, ?, ?, NULL, ?)'
    ).bind(id, staffId, title, body, type, link, Date.now()).run();
  } catch (e) {
    console.error('Failed to create notification:', e);
  }
}

export async function notifyAdmins(env, title, body, type = 'admin_alert', link = '') {
  try {
    const admins = await env.DB.prepare(
      "SELECT id FROM staff WHERE role IN ('admin', 'supervisor', 'office') AND active=1"
    ).all().then(r => r.results || []);
    for (const a of admins) {
      await createNotification(env, a.id, title, body, type, link);
    }
  } catch (e) {
    console.error('Failed to notify admins:', e);
  }
}

export async function notifyAllStaff(env, title, body, type = 'open_case', link = '') {
  try {
    const staff = await env.DB.prepare(
      "SELECT id FROM staff WHERE active=1"
    ).all().then(r => r.results || []);
    for (const s of staff) {
      await createNotification(env, s.id, title, body, type, link);
    }
  } catch (e) {
    console.error('Failed to notify staff:', e);
  }
}

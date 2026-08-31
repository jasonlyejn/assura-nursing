import { json, bad } from '../_lib/respond.js';
import { requireUser, can } from '../_lib/auth.js';
import { audit } from '../_lib/audit.js';
import { createNotification } from '../_lib/notify.js';

// GET /api/broadcasts — List broadcasts
// If Admin: sees client_payment, commission_pct, nurse_wage, and all applicant details
// If Nurse: sees ONLY nurse_wage (less 20% commission), sanitized patient info, and whether they have applied
export async function onRequestGet(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  const user = r.user;
  const isAdmin = can(user, 'assign');
  const url = new URL(context.request.url);
  const status = url.searchParams.get('status') || (isAdmin ? '' : 'open');

  let sql = `
    SELECT b.id, b.case_id, b.title, b.area, b.care_type, b.schedule, b.notes, b.status, b.created_at,
           b.nurse_wage,
           ${isAdmin ? 'b.client_payment, b.commission_pct, s_by.name AS created_by_name,' : ''}
           p.id AS patient_id, p.name AS patient_name, p.age, p.sex, p.care_type AS patient_care_type,
           c.status AS case_status, c.assigned_staff_id, s_assign.name AS assigned_staff_name
    FROM case_broadcasts b
    JOIN cases c ON c.id = b.case_id
    JOIN patients p ON p.id = c.patient_id
    LEFT JOIN staff s_by ON s_by.id = b.created_by
    LEFT JOIN staff s_assign ON s_assign.id = c.assigned_staff_id
  `;
  const binds = [];
  if (status) {
    sql += ' WHERE b.status = ? ';
    binds.push(status);
  }
  sql += ' ORDER BY b.created_at DESC LIMIT 100';

  const { results: rawBroadcasts } = await context.env.DB.prepare(sql).bind(...binds).all();
  const broadcasts = rawBroadcasts || [];

  // Fetch applications
  if (isAdmin) {
    // For admin: fetch all applications with applicant nurse info
    const { results: allApps } = await context.env.DB.prepare(`
      SELECT a.id, a.broadcast_id, a.case_id, a.staff_id, a.status, a.note, a.applied_at,
             s.name AS staff_name, s.phone AS staff_phone, s.reg_no, s.qualification, s.role
      FROM case_applications a
      JOIN staff s ON s.id = a.staff_id
      ORDER BY a.applied_at ASC
    `).all();

    const appsByBroadcast = (allApps || []).reduce((acc, app) => {
      acc[app.broadcast_id] = acc[app.broadcast_id] || [];
      acc[app.broadcast_id].push(app);
      return acc;
    }, {});

    const enriched = broadcasts.map((b) => ({
      ...b,
      applications: appsByBroadcast[b.id] || [],
    }));
    return json({ broadcasts: enriched, is_admin: true });
  } else {
    // For field nurse: check if current nurse has applied
    const { results: myApps } = await context.env.DB.prepare(`
      SELECT broadcast_id, id, status, applied_at, note
      FROM case_applications
      WHERE staff_id = ?
    `).bind(user.sid).all();

    const myAppMap = (myApps || []).reduce((acc, a) => {
      acc[a.broadcast_id] = a;
      return acc;
    }, {});

    const sanitized = broadcasts.map((b) => ({
      id: b.id,
      case_id: b.case_id,
      title: b.title,
      area: b.area,
      care_type: b.care_type,
      schedule: b.schedule,
      notes: b.notes,
      status: b.status,
      created_at: b.created_at,
      nurse_wage: b.nurse_wage, // Net wage only (20% commission removed)
      patient_age: b.age,
      patient_sex: b.sex,
      my_application: myAppMap[b.id] || null,
    }));
    return json({ broadcasts: sanitized, is_admin: false });
  }
}

// POST /api/broadcasts — Create & broadcast a new case to all team members
// Calculates tiered commission deduction (30-35% company commission / 65-70% nurse payout)
export async function onRequestPost(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  if (!can(r.user, 'assign')) return bad('Admin only', 403);

  const b = await context.request.json().catch(() => ({}));
  if (!b.case_id) return bad('case_id is required');
  if (!b.title || !b.title.trim()) return bad('Broadcast title is required');

  const clientPayment = Math.max(0, Number(b.client_payment) || 0);
  const commissionPct = Math.max(0, Math.min(100, Number(b.commission_pct ?? 30.0))); // Default 30% company commission
  // Calculate Nurse Wage (70% net payout by default)
  const nurseWage = Number(b.custom_nurse_wage) > 0
    ? Number(b.custom_nurse_wage)
    : Math.round(clientPayment * (1 - commissionPct / 100) * 100) / 100;

  const id = 'bc_' + crypto.randomUUID().slice(0, 8);
  const now = Date.now();

  await context.env.DB.prepare(`
    INSERT INTO case_broadcasts (
      id, case_id, title, area, care_type, schedule,
      client_payment, commission_pct, nurse_wage, notes,
      status, created_at, created_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'open', ?, ?)
  `).bind(
    id, b.case_id, b.title.trim(), b.area || '', b.care_type || '', b.schedule || '',
    clientPayment, commissionPct, nurseWage, b.notes || '',
    now, r.user.sid
  ).run();

  await audit(context.env, r.user.sid, 'case_broadcast_created', 'case', b.case_id);

  // Send Push / In-App Notifications to ALL Active Field Nurses
  const { results: activeNurses } = await context.env.DB.prepare(`
    SELECT id, name FROM staff WHERE active = 1 AND id != ?
  `).bind(r.user.sid).all();

  for (const nurse of activeNurses || []) {
    await createNotification(
      context.env,
      nurse.id,
      `📢 New Case Available: ${b.title.trim()}`,
      `📍 ${b.area || 'Area'} · 🩺 ${b.care_type || 'Care'} · 💵 Payout: RM ${nurseWage.toFixed(2)}. Tap to view and apply!`,
      'case_broadcast',
      b.case_id
    );
  }

  return json({
    ok: true,
    broadcast_id: id,
    nurse_wage: nurseWage,
    client_payment: clientPayment,
    commission_pct: commissionPct,
    notified_count: (activeNurses || []).length,
  });
}

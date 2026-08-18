import { json, bad } from './_lib/respond.js';
import { getUser, can } from './_lib/auth.js';

// Everything the home page needs, in one request.
export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  const db = context.env.DB;
  const all = can(user, 'allCases');
  const today = todayMY();
  const q = (sql, ...b) => db.prepare(sql).bind(...b).all().then((r) => r.results || []).catch(() => []);
  const one = (sql, ...b) => db.prepare(sql).bind(...b).first().catch(() => null);

  // scope: office roles see everything, field staff see their own cases
  const mineOnly = all ? '' : ' AND c.assigned_staff_id = ?';
  const mineBind = all ? [] : [user.sid];

  const [cases, duty, escalations, todayHo, quotes, intake, myShifts, myReqs] = await Promise.all([
    // active cases + their latest handover (that's the practical vitals summary)
    q(`SELECT c.id, c.status, p.name, p.care_type,
              s.name AS nurse,
              (SELECT h.ews FROM handovers h WHERE h.case_id=c.id
                ORDER BY h.shift_date DESC, h.created_at DESC LIMIT 1) AS ews,
              (SELECT h.shift_date FROM handovers h WHERE h.case_id=c.id
                ORDER BY h.shift_date DESC, h.created_at DESC LIMIT 1) AS last_report,
              (SELECT h.concerns FROM handovers h WHERE h.case_id=c.id
                ORDER BY h.shift_date DESC, h.created_at DESC LIMIT 1) AS concerns,
              (SELECT h.todo FROM handovers h WHERE h.case_id=c.id
                ORDER BY h.shift_date DESC, h.created_at DESC LIMIT 1) AS todo
         FROM cases c
         JOIN patients p ON p.id = c.patient_id
         LEFT JOIN staff s ON s.id = c.assigned_staff_id
        WHERE c.status IN ('accepted','assigned','active')${mineOnly}
        ORDER BY p.name LIMIT 60`, ...mineBind),

    // who is on duty today
    q(`SELECT r.shift, r.status, r.start_time, r.end_time,
              st.name AS staff_name, st.phone, st.role, p.name AS patient_name
         FROM roster r
         JOIN staff st ON st.id = r.staff_id
         JOIN cases c ON c.id = r.case_id
         JOIN patients p ON p.id = c.patient_id
        WHERE r.shift_date = ?${all ? '' : ' AND r.staff_id = ?'}
        ORDER BY CASE r.shift WHEN 'AM' THEN 1 WHEN 'PM' THEN 2 ELSE 3 END, p.name`,
      ...(all ? [today] : [today, user.sid])),

    // open escalations
    q(`SELECT e.id, e.level, e.total_ews, e.detail, e.col_label, e.created_at, p.name AS patient_name
         FROM escalations e
         JOIN cases c ON c.id = e.case_id
         JOIN patients p ON p.id = c.patient_id
        WHERE e.ack_at IS NULL${mineOnly}
        ORDER BY CASE e.level WHEN 'urgent' THEN 1 WHEN 'escalate' THEN 2 ELSE 3 END,
                 e.created_at DESC LIMIT 20`, ...mineBind),

    // handovers filed today + any still unsigned
    q(`SELECT h.id, h.shift, h.shift_date, h.staff_name, h.ack_at, h.concerns, p.name AS patient_name
         FROM handovers h
         JOIN cases c ON c.id = h.case_id
         JOIN patients p ON p.id = c.patient_id
        WHERE h.shift_date >= ?${mineOnly}
        ORDER BY h.created_at DESC LIMIT 20`, ...[yesterday(today), ...mineBind]),

    all ? q(`SELECT q.id, q.no, q.total, q.status, q.created_at, p.name AS patient_name
               FROM quotes q JOIN cases c ON c.id=q.case_id JOIN patients p ON p.id=c.patient_id
              WHERE q.status IN ('draft','sent') ORDER BY q.created_at DESC LIMIT 10`) : [],

    all ? q(`SELECT c.id, c.source, c.created_at, p.name, p.phone
               FROM cases c JOIN patients p ON p.id=c.patient_id
              WHERE c.status='intake' ORDER BY c.created_at DESC LIMIT 10`) : [],

    // my next few shifts
    q(`SELECT r.id, r.shift_date, r.shift, r.status, r.start_time, r.end_time, p.name AS patient_name
         FROM roster r JOIN cases c ON c.id=r.case_id JOIN patients p ON p.id=c.patient_id
        WHERE r.staff_id=? AND r.shift_date>=?
        ORDER BY r.shift_date, CASE r.shift WHEN 'AM' THEN 1 WHEN 'PM' THEN 2 ELSE 3 END
        LIMIT 8`, user.sid, today),

    // my requests + (for managers) anything waiting on them
    q(`SELECT id, type, from_date, to_date, days, status, staff_name, staff_id
         FROM staff_requests WHERE staff_id=? OR (? = 1 AND status='pending')
        ORDER BY CASE status WHEN 'pending' THEN 0 ELSE 1 END, created_at DESC LIMIT 10`,
      user.sid, can(user, 'assign') ? 1 : 0),
  ]);

  // cases with nobody rostered today (office view only)
  const unrostered = all
    ? cases.filter((c) => !duty.some((d) => d.patient_name === c.name)).map((c) => c.name)
    : [];

  // cases with no report yet today
  const noReport = cases.filter((c) => c.last_report !== today).map((c) => c.name);

  const stats = {
    active: cases.length,
    onDuty: duty.length,
    urgent: escalations.filter((e) => e.level === 'urgent').length,
    openEsc: escalations.length,
    unsigned: todayHo.filter((h) => !h.ack_at).length,
    intake: intake.length,
    quotes: quotes.length,
  };

  stats.myShifts = myShifts.length;
  stats.pendingReq = myReqs.filter((r) => r.status === 'pending' && r.staff_id !== user.sid).length;

  return json({ today, all, stats, cases, duty, escalations,
                handovers: todayHo, quotes, intake, unrostered, noReport,
                myShifts, myRequests: myReqs });
}

function todayMY() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}
function yesterday(d) {
  const t = new Date(d + 'T00:00:00Z'); t.setUTCDate(t.getUTCDate() - 1);
  return t.toISOString().slice(0, 10);
}

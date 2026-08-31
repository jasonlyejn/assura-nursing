import { json, bad } from './_lib/respond.js';
import { requireUser, can } from './_lib/auth.js';

// GET /api/payroll?month=YYYY-MM&staff_id=...
// Calculates tiered nurse net payout / 30-35% company commission, aggregates visit durations & broadcasts
export async function onRequestGet(context) {
  try {
    const r = await requireUser(context);
    if (r.error) return r.error;
    const user = r.user;
    const isAdmin = can(user, 'allCases') || user.role === 'admin';

    const url = new URL(context.request.url);
    const month = url.searchParams.get('month') || getCurrentMonth();
    const staffId = url.searchParams.get('staff_id') || (isAdmin ? '' : user.sid);

    // Month range in ms
    const [yearStr, monthStr] = month.split('-');
    const year = parseInt(yearStr, 10) || new Date().getFullYear();
    const mon = (parseInt(monthStr, 10) || (new Date().getMonth() + 1)) - 1;
    const startMs = new Date(year, mon, 1).getTime();
    const endMs = new Date(year, mon + 1, 0, 23, 59, 59, 999).getTime();

    // Auto-create visits table if missing
    await context.env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS visits (
        id TEXT PRIMARY KEY,
        case_id TEXT NOT NULL,
        staff_id TEXT NOT NULL,
        staff_name TEXT,
        clock_in_at INTEGER NOT NULL,
        clock_out_at INTEGER,
        duration_minutes INTEGER,
        lat REAL,
        lng REAL,
        notes TEXT,
        care_summary TEXT,
        created_at INTEGER NOT NULL
      )
    `).run().catch(() => {});

    // Fetch Staff list
    let staffSql = 'SELECT id, name, role, staff_no, reg_no, ic, phone, bank_name, bank_acc FROM staff WHERE active=1';
    const staffBinds = [];
    if (staffId) {
      staffSql += ' AND id = ?';
      staffBinds.push(staffId);
    }
    const staffRes = await context.env.DB.prepare(staffSql).bind(...staffBinds).all().catch(() => ({ results: [] }));
    const staffList = staffRes.results || [];

    // Fetch completed visits for this month safely
    const visitsRes = await context.env.DB.prepare(`
      SELECT v.*, p.name AS patient_name, c.billing_mode
      FROM visits v
      LEFT JOIN cases c ON c.id = v.case_id
      LEFT JOIN patients p ON p.id = c.patient_id
      WHERE v.clock_in_at BETWEEN ? AND ?
      ORDER BY v.clock_in_at ASC
    `).bind(startMs, endMs).all().catch(() => ({ results: [] }));
    const visits = visitsRes.results || [];

    // Fetch assigned broadcasts completed/active for this month safely
    const broadcastsRes = await context.env.DB.prepare(`
      SELECT b.*, p.name AS patient_name
      FROM case_broadcasts b
      LEFT JOIN cases c ON c.id = b.case_id
      LEFT JOIN patients p ON p.id = c.patient_id
      WHERE b.created_at BETWEEN ? AND ?
    `).bind(startMs, endMs).all().catch(() => ({ results: [] }));
    const broadcasts = broadcastsRes.results || [];

    // Fetch case applications that were approved for staff
    const appsRes = await context.env.DB.prepare(`
      SELECT a.*, b.title AS broadcast_title, b.client_payment, b.nurse_wage, b.commission_pct,
             b.created_at AS broadcast_created_at, p.name AS patient_name
      FROM case_applications a
      JOIN case_broadcasts b ON b.id = a.broadcast_id
      LEFT JOIN cases c ON c.id = b.case_id
      LEFT JOIN patients p ON p.id = c.patient_id
      WHERE a.status = 'approved' AND b.created_at BETWEEN ? AND ?
    `).bind(startMs, endMs).all().catch(() => ({ results: [] }));
    const approvedApps = appsRes.results || [];

    // Aggregate payroll per nurse
    const payrollSummaries = staffList.map((st) => {
      const staffVisits = visits.filter((v) => v.staff_id === st.id);
      const staffApps = approvedApps.filter((a) => a.staff_id === st.id);

      let totalGrossRevenue = 0;
      let totalNursePayout = 0;
      let totalVisits = staffVisits.length;
      let totalMinutes = 0;

      const itemizedLines = [];

      // Calculate from approved case applications
      for (const app of staffApps) {
        const gross = Number(app.client_payment) || 0;
        const commPct = Number(app.commission_pct) || 30;
        const netWage = Number(app.nurse_wage) || (gross * (1 - commPct / 100));

        totalGrossRevenue += gross;
        totalNursePayout += netWage;

        itemizedLines.push({
          id: app.id,
          type: 'case_assignment',
          date: new Date(app.broadcast_created_at || Date.now()).toLocaleDateString('en-MY'),
          description: `${app.broadcast_title || 'Case Care'} (${app.patient_name || 'Patient'})`,
          gross_amount: gross,
          commission_pct: commPct,
          commission_amount: Math.max(0, gross - netWage),
          net_nurse_payout: netWage,
        });
      }

      // Calculate visit hours/shifts
      for (const v of staffVisits) {
        const mins = Number(v.duration_minutes) || 0;
        totalMinutes += mins;
      }

      const companyCommission = Math.max(0, totalGrossRevenue - totalNursePayout);

      return {
        staff: st,
        month,
        total_visits: totalVisits,
        total_hours: Math.round((totalMinutes / 60) * 10) / 10,
        total_gross_revenue: Math.round(totalGrossRevenue * 100) / 100,
        company_commission: Math.round(companyCommission * 100) / 100,
        net_nurse_payout: Math.round(totalNursePayout * 100) / 100,
        lines: itemizedLines,
      };
    });

    return json({
      month,
      is_admin: isAdmin,
      payroll: staffId ? payrollSummaries[0] || null : payrollSummaries,
    });
  } catch (err) {
    return json({
      month: getCurrentMonth(),
      is_admin: false,
      payroll: [],
      error: err.message,
    });
  }
}

function getCurrentMonth() {
  const d = new Date();
  const yr = d.getFullYear();
  const mon = String(d.getMonth() + 1).padStart(2, '0');
  return `${yr}-${mon}`;
}

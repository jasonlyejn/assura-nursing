import { json, bad } from './_lib/respond.js';
import { getUser, isAdmin } from './_lib/auth.js';

// Every structural change the app has ever needed, in order.
// Each runs on its own and failures are ignored, so this is safe to run any
// number of times. "duplicate column" simply means it is already there.
const STEPS = [
  // --- core tables -------------------------------------------------------
  [`CREATE TABLE IF NOT EXISTS mews (case_id TEXT PRIMARY KEY, data TEXT, rev INTEGER NOT NULL DEFAULT 0,
      updated_at INTEGER, updated_by TEXT)`, 'mews table'],
  [`CREATE TABLE IF NOT EXISTS escalations (id TEXT PRIMARY KEY, case_id TEXT NOT NULL, level TEXT NOT NULL,
      total_ews INTEGER, detail TEXT, col_label TEXT, created_by TEXT, created_at INTEGER NOT NULL,
      ack_by TEXT, ack_at INTEGER)`, 'escalations table'],
  [`CREATE INDEX IF NOT EXISTS idx_esc_open ON escalations(ack_at, created_at DESC)`, 'escalations index'],

  [`CREATE TABLE IF NOT EXISTS handovers (id TEXT PRIMARY KEY, case_id TEXT NOT NULL, shift_date TEXT NOT NULL,
      shift TEXT NOT NULL, staff_id TEXT, staff_name TEXT, condition TEXT, vitals_note TEXT, ews TEXT,
      intake TEXT, output TEXT, bowel TEXT, meds_given TEXT, meds_due TEXT, wound_note TEXT, mobility TEXT,
      meals TEXT, sleep TEXT, mood TEXT, procedures TEXT, concerns TEXT, todo TEXT, family_note TEXT,
      created_at INTEGER NOT NULL, ack_by TEXT, ack_name TEXT, ack_at INTEGER)`, 'handovers table'],
  [`CREATE INDEX IF NOT EXISTS idx_ho_case ON handovers(case_id, shift_date DESC, created_at DESC)`, 'handover index'],

  [`CREATE TABLE IF NOT EXISTS roster (id TEXT PRIMARY KEY, case_id TEXT NOT NULL, staff_id TEXT NOT NULL,
      shift_date TEXT NOT NULL, shift TEXT NOT NULL, start_time TEXT, end_time TEXT,
      status TEXT NOT NULL DEFAULT 'planned', note TEXT, created_at INTEGER NOT NULL, created_by TEXT)`, 'roster table'],
  [`CREATE UNIQUE INDEX IF NOT EXISTS idx_roster_slot ON roster(case_id, shift_date, shift)`, 'roster slot index'],
  [`CREATE INDEX IF NOT EXISTS idx_roster_staff ON roster(staff_id, shift_date)`, 'roster staff index'],

  [`CREATE TABLE IF NOT EXISTS messages (id TEXT PRIMARY KEY, case_id TEXT NOT NULL,
      kind TEXT NOT NULL DEFAULT 'team', body TEXT, photo TEXT, staff_id TEXT, staff_name TEXT,
      pinned INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL)`, 'chat messages table'],
  [`CREATE INDEX IF NOT EXISTS idx_msg_case ON messages(case_id, created_at DESC)`, 'chat index'],
  [`CREATE TABLE IF NOT EXISTS message_reads (case_id TEXT NOT NULL, staff_id TEXT NOT NULL,
      read_at INTEGER NOT NULL, PRIMARY KEY (case_id, staff_id))`, 'chat read markers'],

  [`CREATE TABLE IF NOT EXISTS quotes (id TEXT PRIMARY KEY, no TEXT, case_id TEXT, lines TEXT,
      subtotal REAL NOT NULL DEFAULT 0, travel REAL NOT NULL DEFAULT 0, surcharge REAL NOT NULL DEFAULT 0,
      deposit REAL NOT NULL DEFAULT 0, total REAL NOT NULL DEFAULT 0, note TEXT,
      status TEXT NOT NULL DEFAULT 'draft', created_at INTEGER NOT NULL, created_by TEXT,
      sent_at INTEGER, accepted_at INTEGER)`, 'quotes table'],

  [`CREATE TABLE IF NOT EXISTS feedback (id TEXT PRIMARY KEY, case_id TEXT NOT NULL, token TEXT UNIQUE,
      rating INTEGER, care_rating INTEGER, comm_rating INTEGER, recommend INTEGER, went_well TEXT,
      improve TEXT, staff_praise TEXT, name TEXT, created_at INTEGER NOT NULL, sent_at INTEGER,
      submitted_at INTEGER)`, 'feedback table'],

  [`CREATE TABLE IF NOT EXISTS staff_requests (id TEXT PRIMARY KEY, staff_id TEXT NOT NULL, staff_name TEXT,
      type TEXT NOT NULL, from_date TEXT, to_date TEXT, days REAL NOT NULL DEFAULT 0,
      amount REAL NOT NULL DEFAULT 0, reason TEXT, attachment TEXT, status TEXT NOT NULL DEFAULT 'pending',
      decided_by TEXT, decided_name TEXT, decided_at INTEGER, decide_note TEXT,
      created_at INTEGER NOT NULL)`, 'staff requests table'],
  [`CREATE INDEX IF NOT EXISTS idx_sreq_status ON staff_requests(status, created_at DESC)`, 'requests index'],

  [`CREATE TABLE IF NOT EXISTS pin_resets (id TEXT PRIMARY KEY, staff_id TEXT, claim_name TEXT NOT NULL,
      note TEXT, status TEXT NOT NULL DEFAULT 'open', created_at INTEGER NOT NULL,
      done_by TEXT, done_name TEXT, done_at INTEGER)`, 'PIN reset table'],

  [`CREATE TABLE IF NOT EXISTS staff_changes (id TEXT PRIMARY KEY, staff_id TEXT NOT NULL, staff_name TEXT,
      fields TEXT NOT NULL, before TEXT, status TEXT NOT NULL DEFAULT 'pending', note TEXT,
      requested_at INTEGER NOT NULL, reviewed_by TEXT, reviewed_name TEXT, reviewed_at INTEGER)`, 'profile changes table'],

  [`CREATE TABLE IF NOT EXISTS medications (id TEXT PRIMARY KEY, case_id TEXT NOT NULL, name TEXT NOT NULL,
      dose TEXT, route TEXT, frequency TEXT, times TEXT, start_date TEXT, end_date TEXT, prn INTEGER NOT NULL DEFAULT 0,
      indication TEXT, notes TEXT, active INTEGER NOT NULL DEFAULT 1, created_at INTEGER NOT NULL,
      created_by TEXT)`, 'medication list'],
  [`CREATE TABLE IF NOT EXISTS med_admin (id TEXT PRIMARY KEY, med_id TEXT NOT NULL, case_id TEXT NOT NULL,
      given_date TEXT NOT NULL, slot TEXT NOT NULL, status TEXT NOT NULL, reason TEXT,
      staff_id TEXT, staff_initial TEXT, given_at INTEGER NOT NULL)`, 'medication administration'],
  [`CREATE UNIQUE INDEX IF NOT EXISTS idx_mar_slot ON med_admin(med_id, given_date, slot)`, 'MAR slot index'],

  // --- staff columns -----------------------------------------------------
  [`ALTER TABLE staff ADD COLUMN must_change_pin INTEGER NOT NULL DEFAULT 0`, 'staff.must_change_pin'],
  [`ALTER TABLE staff ADD COLUMN pin_changed_at INTEGER`, 'staff.pin_changed_at'],
  [`ALTER TABLE staff ADD COLUMN email TEXT`, 'staff.email'],
  [`ALTER TABLE staff ADD COLUMN ic TEXT`, 'staff.ic'],
  [`ALTER TABLE staff ADD COLUMN staff_no TEXT`, 'staff.staff_no'],
  [`ALTER TABLE staff ADD COLUMN reg_no TEXT`, 'staff.reg_no'],
  [`ALTER TABLE staff ADD COLUMN qualification TEXT`, 'staff.qualification'],
  [`ALTER TABLE staff ADD COLUMN started_at TEXT`, 'staff.started_at'],
  [`ALTER TABLE staff ADD COLUMN address TEXT`, 'staff.address'],
  [`ALTER TABLE staff ADD COLUMN kin_name TEXT`, 'staff.kin_name'],
  [`ALTER TABLE staff ADD COLUMN kin_phone TEXT`, 'staff.kin_phone'],
  [`ALTER TABLE staff ADD COLUMN pay_basis TEXT`, 'staff.pay_basis'],
  [`ALTER TABLE staff ADD COLUMN pay_rate REAL NOT NULL DEFAULT 0`, 'staff.pay_rate'],
  [`ALTER TABLE staff ADD COLUMN bank_name TEXT`, 'staff.bank_name'],
  [`ALTER TABLE staff ADD COLUMN bank_acc TEXT`, 'staff.bank_acc'],
  [`ALTER TABLE staff ADD COLUMN photo TEXT`, 'staff.photo'],
  [`ALTER TABLE staff ADD COLUMN notes TEXT`, 'staff.notes'],
  [`ALTER TABLE staff ADD COLUMN initials TEXT`, 'staff.initials'],
  [`ALTER TABLE staff ADD COLUMN perms TEXT`, 'staff.perms (page access)'],

  // --- other columns -----------------------------------------------------
  [`ALTER TABLE items ADD COLUMN image TEXT`, 'items.image'],
  [`ALTER TABLE items ADD COLUMN brand TEXT`, 'items.brand'],
  [`ALTER TABLE items ADD COLUMN size TEXT`, 'items.size'],
  [`ALTER TABLE items ADD COLUMN code TEXT`, 'items.code'],
  [`ALTER TABLE items ADD COLUMN category TEXT`, 'items.category'],
  [`ALTER TABLE items ADD COLUMN uom TEXT`, 'items.uom'],
  [`ALTER TABLE services ADD COLUMN plus INTEGER NOT NULL DEFAULT 0`, 'services.plus'],
  [`ALTER TABLE cases ADD COLUMN source TEXT`, 'cases.source'],
  [`ALTER TABLE medications ADD COLUMN kind TEXT NOT NULL DEFAULT 'regular'`, 'medications.kind'],
  [`ALTER TABLE medications ADD COLUMN max_dose TEXT`, 'medications.max_dose'],
  [`ALTER TABLE medications ADD COLUMN stopped_at INTEGER`, 'medications.stopped_at'],
  [`ALTER TABLE patients ADD COLUMN allergies TEXT`, 'patients.allergies'],
  [`ALTER TABLE patients ADD COLUMN room TEXT`, 'patients.room'],
  [`CREATE INDEX IF NOT EXISTS idx_med_case ON medications(case_id, active, kind)`, 'medication index'],

  // invoices already exist from the original schema — extend, don't replace
  [`ALTER TABLE invoices ADD COLUMN cycle TEXT`, 'invoices.cycle'],
  [`ALTER TABLE invoices ADD COLUMN lines TEXT`, 'invoices.lines'],
  [`ALTER TABLE invoices ADD COLUMN subtotal REAL NOT NULL DEFAULT 0`, 'invoices.subtotal'],
  [`ALTER TABLE invoices ADD COLUMN travel REAL NOT NULL DEFAULT 0`, 'invoices.travel'],
  [`ALTER TABLE invoices ADD COLUMN discount REAL NOT NULL DEFAULT 0`, 'invoices.discount'],
  [`ALTER TABLE invoices ADD COLUMN tax REAL NOT NULL DEFAULT 0`, 'invoices.tax'],
  [`ALTER TABLE invoices ADD COLUMN total REAL NOT NULL DEFAULT 0`, 'invoices.total'],
  [`ALTER TABLE invoices ADD COLUMN paid REAL NOT NULL DEFAULT 0`, 'invoices.paid'],
  [`ALTER TABLE invoices ADD COLUMN due_date TEXT`, 'invoices.due_date'],
  [`ALTER TABLE invoices ADD COLUMN note TEXT`, 'invoices.note'],
  [`ALTER TABLE invoices ADD COLUMN created_at INTEGER`, 'invoices.created_at'],
  [`ALTER TABLE invoices ADD COLUMN created_by TEXT`, 'invoices.created_by'],
  [`ALTER TABLE invoices ADD COLUMN sent_at INTEGER`, 'invoices.sent_at'],
  [`ALTER TABLE invoices ADD COLUMN settled_at INTEGER`, 'invoices.settled_at'],
  [`CREATE INDEX IF NOT EXISTS idx_inv_case ON invoices(case_id)`, 'invoice index'],
  // payment details shown on every invoice (edit later in Rate card > Charges)
  [`INSERT OR IGNORE INTO settings (key,value) VALUES ('bankName','UOB Bank')`, 'bank name'],
  [`INSERT OR IGNORE INTO settings (key,value) VALUES ('bankAcc','9003219654')`, 'bank account'],
  [`INSERT OR IGNORE INTO settings (key,value) VALUES ('bankHolder','Ng Lye Tiam')`, 'account holder'],
  [`INSERT OR IGNORE INTO settings (key,value) VALUES ('tngAcc','140726927712')`, 'TNG eWallet'],
  [`INSERT OR IGNORE INTO settings (key,value) VALUES ('payQr','/pay-qr.jpg')`, 'payment QR'],

  [`CREATE TABLE IF NOT EXISTS payments (id TEXT PRIMARY KEY, invoice_id TEXT NOT NULL, case_id TEXT,
      amount REAL NOT NULL, method TEXT NOT NULL, ref TEXT, paid_on TEXT, note TEXT,
      received_by TEXT, received_name TEXT, created_at INTEGER NOT NULL)`, 'payments table'],
  [`CREATE INDEX IF NOT EXISTS idx_pay_inv ON payments(invoice_id)`, 'payments index'],
];

// GET — what is missing, without changing anything
export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  if (!isAdmin(user)) return bad('Admin only', 403);

  const tables = await context.env.DB
    .prepare("SELECT name FROM sqlite_master WHERE type='table'").all()
    .then((r) => (r.results || []).map((x) => x.name)).catch(() => []);
  return json({ tables, steps: STEPS.length });
}

// POST — bring the database up to date. Safe to run repeatedly.
export async function onRequestPost(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  if (!isAdmin(user)) return bad('Admin only', 403);

  const applied = [], already = [], failed = [];
  for (const [sql, label] of STEPS) {
    try {
      await context.env.DB.prepare(sql).run();
      applied.push(label);
    } catch (e) {
      const m = (e && e.message) || '';
      if (/duplicate column|already exists/i.test(m)) already.push(label);
      else failed.push(label + ' — ' + m.slice(0, 120));
    }
  }
  return json({ ok: true, applied, already, failed,
    summary: `${applied.length} applied, ${already.length} already there, ${failed.length} failed` });
}

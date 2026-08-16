-- Assura Nursing Care v2 — D1 schema (full model; Phase 0 uses staff/services/items/settings)
-- Run once:  wrangler d1 execute assura --file=db/schema.sql

PRAGMA foreign_keys = ON;

-- People who log in ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS staff (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  phone      TEXT,
  role       TEXT NOT NULL DEFAULT 'nurse',   -- 'admin' | 'nurse'
  pin_salt   TEXT NOT NULL,
  pin_hash   TEXT NOT NULL,
  active     INTEGER NOT NULL DEFAULT 1,
  created_at INTEGER NOT NULL,
  -- profile
  email TEXT, ic TEXT, staff_no TEXT, reg_no TEXT, qualification TEXT,
  started_at TEXT, address TEXT, kin_name TEXT, kin_phone TEXT,
  pay_basis TEXT, pay_rate REAL NOT NULL DEFAULT 0,
  must_change_pin INTEGER NOT NULL DEFAULT 0, pin_changed_at INTEGER,
  bank_name TEXT, bank_acc TEXT, photo TEXT, notes TEXT
);

-- Rate card ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
  id      TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_zh TEXT,
  basis   TEXT NOT NULL,          -- procedure | session | hour | tiered | day | week
  rate    REAL NOT NULL DEFAULT 0,
  rate2   REAL NOT NULL DEFAULT 0, -- second tier (e.g. /hr after first hour)
  grp     TEXT,                    -- service group id
  sort    INTEGER NOT NULL DEFAULT 0,
  active  INTEGER NOT NULL DEFAULT 1,
  plus    INTEGER NOT NULL DEFAULT 0   -- 1 = "++" starting price
);

CREATE TABLE IF NOT EXISTS items (
  id          TEXT PRIMARY KEY,
  code        TEXT UNIQUE,         -- e.g. WND001
  category    TEXT,                -- e.g. WOUND CARE - DRESSINGS
  name        TEXT NOT NULL,       -- bilingual label
  brand       TEXT,                -- e.g. Mepilex / Bard / Terumo
  size        TEXT,                -- e.g. 10x10cm / Fr16 / 24G
  uom         TEXT,                -- EACH / PACK / BOTTLE ...
  price       REAL NOT NULL DEFAULT 0,
  prepare_by  TEXT NOT NULL DEFAULT 'staff',  -- 'family' | 'staff'
  order_ahead INTEGER NOT NULL DEFAULT 0,
  spec        TEXT,
  image       TEXT,                -- staff-taken photo (compressed data URL)
  sort        INTEGER NOT NULL DEFAULT 0,
  active      INTEGER NOT NULL DEFAULT 1
);

-- Key/value settings (surcharges, travel, deposit, business details) ---------
CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT
);

-- Patients & cases -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS patients (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  phone      TEXT,
  address    TEXT,
  age        TEXT,
  sex        TEXT,
  care_type  TEXT,                 -- 'procedure' | 'longterm'
  consent_at INTEGER,
  consent_by TEXT,
  minor      INTEGER NOT NULL DEFAULT 0,
  notes      TEXT,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS cases (
  id          TEXT PRIMARY KEY,
  patient_id  TEXT NOT NULL REFERENCES patients(id),
  status      TEXT NOT NULL DEFAULT 'intake', -- intake|accepted|assigned|active|closed
  assigned_staff_id TEXT REFERENCES staff(id),
  billing_mode TEXT NOT NULL DEFAULT 'per_visit', -- per_visit | weekly
  source      TEXT,
  created_at  INTEGER NOT NULL,
  closed_at   INTEGER,
  close_reason TEXT
);

-- Incoming enquiries from the public booking page ----------------------------
CREATE TABLE IF NOT EXISTS requests (
  id            TEXT PRIMARY KEY,
  name          TEXT, phone TEXT, address TEXT,
  options_json  TEXT,
  computed_quote REAL,
  status        TEXT NOT NULL DEFAULT 'new',  -- new | converted | declined
  created_at    INTEGER NOT NULL
);

-- Visits + documentation -----------------------------------------------------
CREATE TABLE IF NOT EXISTS visits (
  id           TEXT PRIMARY KEY,
  case_id      TEXT NOT NULL REFERENCES cases(id),
  staff_id     TEXT REFERENCES staff(id),
  visit_at     INTEGER NOT NULL,
  kind         TEXT,                -- 'procedure' | 'longterm_shift'
  services_json TEXT,
  items_json   TEXT,
  note         TEXT,
  next_visit_at INTEGER,
  done_at      INTEGER
);

CREATE TABLE IF NOT EXISTS vitals (
  id           TEXT PRIMARY KEY,
  visit_id     TEXT NOT NULL REFERENCES visits(id),
  bp           TEXT,
  pulse        INTEGER,
  temp         REAL,
  spo2         INTEGER,
  resp         INTEGER,
  blood_sugar  REAL,
  intake_ml    INTEGER,
  output_ml    INTEGER,
  pain         INTEGER,
  consciousness TEXT,
  mews_score   INTEGER,
  recorded_by  TEXT REFERENCES staff(id),
  recorded_at  INTEGER NOT NULL
);

-- Billing --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS invoices (
  id           TEXT PRIMARY KEY,
  no           TEXT UNIQUE,
  case_id      TEXT REFERENCES cases(id),
  period_start TEXT,
  period_end   TEXT,
  type         TEXT,                -- 'visit' | 'weekly'
  amount       REAL NOT NULL DEFAULT 0,
  status       TEXT NOT NULL DEFAULT 'draft', -- draft | sent | paid
  issued_at    INTEGER
);

CREATE TABLE IF NOT EXISTS invoice_lines (
  id             TEXT PRIMARY KEY,
  invoice_id     TEXT NOT NULL REFERENCES invoices(id),
  label          TEXT,
  qty            REAL DEFAULT 1,
  unit           TEXT,
  amount         REAL NOT NULL DEFAULT 0,
  source_visit_id TEXT REFERENCES visits(id)
);

-- Audit trail (who did what) -------------------------------------------------
CREATE TABLE IF NOT EXISTS audit (
  id        TEXT PRIMARY KEY,
  actor_id  TEXT,
  action    TEXT,
  entity    TEXT,
  entity_id TEXT,
  at        INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_cases_status   ON cases(status);
CREATE INDEX IF NOT EXISTS idx_visits_case    ON visits(case_id);
CREATE INDEX IF NOT EXISTS idx_vitals_visit   ON vitals(visit_id);
CREATE INDEX IF NOT EXISTS idx_invoices_case  ON invoices(case_id);
CREATE INDEX IF NOT EXISTS idx_lines_invoice  ON invoice_lines(invoice_id);

-- Quotes ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quotes (
  id          TEXT PRIMARY KEY,
  no          TEXT,
  case_id     TEXT REFERENCES cases(id),
  lines       TEXT,
  subtotal    REAL NOT NULL DEFAULT 0,
  travel      REAL NOT NULL DEFAULT 0,
  surcharge   REAL NOT NULL DEFAULT 0,
  deposit     REAL NOT NULL DEFAULT 0,
  total       REAL NOT NULL DEFAULT 0,
  note        TEXT,
  status      TEXT NOT NULL DEFAULT 'draft',
  created_at  INTEGER NOT NULL,
  created_by  TEXT,
  sent_at     INTEGER,
  accepted_at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_quotes_case ON quotes(case_id, created_at DESC);

-- Shift handovers ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS handovers (
  id          TEXT PRIMARY KEY,
  case_id     TEXT NOT NULL REFERENCES cases(id),
  shift_date  TEXT NOT NULL,          -- YYYY-MM-DD (Malaysia)
  shift       TEXT NOT NULL,          -- AM | PM | NIGHT
  staff_id    TEXT REFERENCES staff(id),
  staff_name  TEXT,

  condition   TEXT,                   -- how the patient is
  vitals_note TEXT,                   -- BP/HR/temp/SpO2 summary
  ews         TEXT,                   -- latest MEWS total, if taken
  intake      TEXT,                   -- fluids / feeds in
  output      TEXT,                   -- urine / drain out
  bowel       TEXT,                   -- BO / BNO + days
  meds_given  TEXT,
  meds_due    TEXT,
  wound_note  TEXT,
  mobility    TEXT,                   -- positioning, transfers, walking
  meals       TEXT,                   -- appetite / feeding
  sleep       TEXT,
  mood        TEXT,                   -- behaviour / orientation
  procedures  TEXT,                   -- what was done this shift
  concerns    TEXT,                   -- anything worrying
  todo        TEXT,                   -- what the next shift must do
  family_note TEXT,                   -- what the family was told

  created_at  INTEGER NOT NULL,
  ack_by      TEXT REFERENCES staff(id),
  ack_name    TEXT,
  ack_at      INTEGER
);
CREATE INDEX IF NOT EXISTS idx_ho_case ON handovers(case_id, shift_date DESC, created_at DESC);

-- Roster ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS roster (
  id         TEXT PRIMARY KEY,
  case_id    TEXT NOT NULL REFERENCES cases(id),
  staff_id   TEXT NOT NULL REFERENCES staff(id),
  shift_date TEXT NOT NULL,            -- YYYY-MM-DD
  shift      TEXT NOT NULL,            -- AM | PM | NIGHT
  start_time TEXT,                     -- optional, e.g. 08:00
  end_time   TEXT,
  status     TEXT NOT NULL DEFAULT 'planned',  -- planned | confirmed | done | off
  note       TEXT,
  created_at INTEGER NOT NULL,
  created_by TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_roster_slot ON roster(case_id, shift_date, shift);
CREATE INDEX IF NOT EXISTS idx_roster_staff ON roster(staff_id, shift_date);
CREATE INDEX IF NOT EXISTS idx_roster_date  ON roster(shift_date, shift);

-- Per-patient chat -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS messages (
  id         TEXT PRIMARY KEY,
  case_id    TEXT NOT NULL REFERENCES cases(id),
  kind       TEXT NOT NULL DEFAULT 'team',   -- team | client_out | client_in
  body       TEXT,
  photo      TEXT,                            -- small compressed image
  staff_id   TEXT REFERENCES staff(id),
  staff_name TEXT,
  pinned     INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_msg_case ON messages(case_id, created_at DESC);

-- who has read up to when, so we can show an unread dot
CREATE TABLE IF NOT EXISTS message_reads (
  case_id  TEXT NOT NULL,
  staff_id TEXT NOT NULL,
  read_at  INTEGER NOT NULL,
  PRIMARY KEY (case_id, staff_id)
);

-- Feedback --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS feedback (
  id           TEXT PRIMARY KEY,
  case_id      TEXT NOT NULL REFERENCES cases(id),
  token        TEXT UNIQUE NOT NULL,     -- goes in the link we send the family
  rating       INTEGER,                  -- 1..5 overall
  care_rating  INTEGER,                  -- nurse / caregiver
  comm_rating  INTEGER,                  -- communication
  recommend    INTEGER,                  -- 1 yes / 0 no
  went_well    TEXT,
  improve      TEXT,
  staff_praise TEXT,
  name         TEXT,
  created_at   INTEGER NOT NULL,
  sent_at      INTEGER,
  submitted_at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_fb_case ON feedback(case_id);

-- Staff self-service ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS staff_changes (
  id           TEXT PRIMARY KEY,
  staff_id     TEXT NOT NULL REFERENCES staff(id),
  staff_name   TEXT,
  fields       TEXT NOT NULL,          -- JSON {field: newValue}
  before       TEXT,                   -- JSON {field: oldValue}
  status       TEXT NOT NULL DEFAULT 'pending',   -- pending | approved | rejected
  note         TEXT,
  requested_at INTEGER NOT NULL,
  reviewed_by  TEXT,
  reviewed_name TEXT,
  reviewed_at  INTEGER
);
CREATE INDEX IF NOT EXISTS idx_chg_status ON staff_changes(status, requested_at DESC);
CREATE INDEX IF NOT EXISTS idx_chg_staff ON staff_changes(staff_id, requested_at DESC);

-- Staff leave / claim requests ------------------------------------------------
CREATE TABLE IF NOT EXISTS staff_requests (
  id          TEXT PRIMARY KEY,
  staff_id    TEXT NOT NULL REFERENCES staff(id),
  staff_name  TEXT,
  type        TEXT NOT NULL,        -- annual|medical|emergency|unpaid|offday|swap|ot|claim|other
  from_date   TEXT,
  to_date     TEXT,
  days        REAL NOT NULL DEFAULT 0,
  amount      REAL NOT NULL DEFAULT 0,   -- for OT hours / claim RM
  reason      TEXT,
  attachment  TEXT,                 -- e.g. photo of the MC
  status      TEXT NOT NULL DEFAULT 'pending',  -- pending|approved|rejected|cancelled
  decided_by  TEXT,
  decided_name TEXT,
  decided_at  INTEGER,
  decide_note TEXT,
  created_at  INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sreq_staff  ON staff_requests(staff_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sreq_status ON staff_requests(status, created_at DESC);

-- Forgot-PIN requests ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS pin_resets (
  id         TEXT PRIMARY KEY,
  staff_id   TEXT REFERENCES staff(id),
  claim_name TEXT NOT NULL,          -- what the person typed on the sign-in screen
  note       TEXT,
  status     TEXT NOT NULL DEFAULT 'open',   -- open | done | ignored
  created_at INTEGER NOT NULL,
  done_by    TEXT,
  done_name  TEXT,
  done_at    INTEGER
);
CREATE INDEX IF NOT EXISTS idx_pinreset ON pin_resets(status, created_at DESC);

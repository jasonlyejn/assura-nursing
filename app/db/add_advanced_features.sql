-- Assura Advanced Clinical & Operations Schema
CREATE TABLE IF NOT EXISTS clinical_documents (
  id              TEXT PRIMARY KEY,
  case_id         TEXT NOT NULL REFERENCES cases(id),
  doc_type        TEXT NOT NULL, -- progress_notes | doctors_orders | fall_risk_morse | braden_scale | care_plan_ncp | bowel_bladder | io_balance | discharge_summary | uploaded_file
  title           TEXT NOT NULL,
  content_json    TEXT NOT NULL,
  attachment_url  TEXT,
  created_by      TEXT REFERENCES staff(id),
  created_at      INTEGER NOT NULL,
  updated_at      INTEGER,
  updated_by      TEXT REFERENCES staff(id)
);

CREATE TABLE IF NOT EXISTS clinical_incidents (
  id                    TEXT PRIMARY KEY,
  case_id               TEXT REFERENCES cases(id),
  incident_type         TEXT NOT NULL, -- fall | skin_tear | tube_dislodgement | med_error | injury | emergency | other
  severity              TEXT NOT NULL DEFAULT 'minor', -- minor | moderate | major | sentinel
  incident_date         TEXT NOT NULL,
  incident_time         TEXT NOT NULL,
  description           TEXT NOT NULL,
  vitals_post_incident  TEXT,
  action_taken          TEXT NOT NULL,
  doctor_notified       INTEGER NOT NULL DEFAULT 0,
  family_notified       INTEGER NOT NULL DEFAULT 0,
  status                TEXT NOT NULL DEFAULT 'open', -- open | under_review | resolved
  reported_by           TEXT REFERENCES staff(id),
  created_at            INTEGER NOT NULL,
  investigation_notes   TEXT
);

CREATE TABLE IF NOT EXISTS doctor_shares (
  id                TEXT PRIMARY KEY,
  case_id           TEXT NOT NULL REFERENCES cases(id),
  token             TEXT NOT NULL UNIQUE,
  pin_hash          TEXT NOT NULL,
  doctor_name       TEXT,
  doctor_phone      TEXT,
  expires_at        INTEGER NOT NULL,
  created_at        INTEGER NOT NULL,
  created_by        TEXT REFERENCES staff(id),
  access_count      INTEGER NOT NULL DEFAULT 0,
  last_accessed_at  INTEGER
);

CREATE TABLE IF NOT EXISTS payment_records (
  id              TEXT PRIMARY KEY,
  case_id         TEXT NOT NULL REFERENCES cases(id),
  invoice_id      TEXT REFERENCES invoices(id),
  amount          REAL NOT NULL,
  payment_method  TEXT NOT NULL DEFAULT 'duitnow_qr',
  reference_no    TEXT,
  proof_image     TEXT,
  status          TEXT NOT NULL DEFAULT 'pending', -- pending | verified | rejected
  paid_by         TEXT,
  paid_at         INTEGER NOT NULL,
  verified_at     INTEGER,
  verified_by     TEXT REFERENCES staff(id)
);

CREATE INDEX IF NOT EXISTS idx_clindocs_case ON clinical_documents(case_id);
CREATE INDEX IF NOT EXISTS idx_clindocs_type ON clinical_documents(doc_type);
CREATE INDEX IF NOT EXISTS idx_incidents_case ON clinical_incidents(case_id);
CREATE INDEX IF NOT EXISTS idx_docshares_token ON doctor_shares(token);
CREATE INDEX IF NOT EXISTS idx_payments_case ON payment_records(case_id);

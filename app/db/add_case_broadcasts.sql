-- Case Broadcasts & Nurse Application / Assignment with 20% Company Commission Shield
CREATE TABLE IF NOT EXISTS case_broadcasts (
  id              TEXT PRIMARY KEY,
  case_id         TEXT NOT NULL REFERENCES cases(id),
  title           TEXT NOT NULL,
  area            TEXT,
  care_type       TEXT,
  schedule        TEXT,
  client_payment  REAL NOT NULL DEFAULT 0,
  commission_pct  REAL NOT NULL DEFAULT 20.0,
  nurse_wage      REAL NOT NULL DEFAULT 0,
  notes           TEXT,
  status          TEXT NOT NULL DEFAULT 'open', -- 'open' | 'assigned' | 'cancelled'
  created_at      INTEGER NOT NULL,
  created_by      TEXT REFERENCES staff(id)
);

CREATE TABLE IF NOT EXISTS case_applications (
  id              TEXT PRIMARY KEY,
  broadcast_id    TEXT NOT NULL REFERENCES case_broadcasts(id),
  case_id         TEXT NOT NULL REFERENCES cases(id),
  staff_id        TEXT NOT NULL REFERENCES staff(id),
  status          TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'selected' | 'rejected' | 'withdrawn'
  note            TEXT,
  applied_at      INTEGER NOT NULL,
  decided_at      INTEGER,
  decided_by      TEXT REFERENCES staff(id)
);

CREATE INDEX IF NOT EXISTS idx_broadcast_status ON case_broadcasts(status);
CREATE INDEX IF NOT EXISTS idx_apps_broadcast ON case_applications(broadcast_id);
CREATE INDEX IF NOT EXISTS idx_apps_staff ON case_applications(staff_id);

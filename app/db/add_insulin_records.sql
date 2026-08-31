CREATE TABLE IF NOT EXISTS insulin_records (
  id TEXT PRIMARY KEY,
  case_id TEXT NOT NULL,
  record_date TEXT NOT NULL,
  slot TEXT NOT NULL,
  glucose REAL NOT NULL,
  insulin_type TEXT,
  units_recommended INTEGER DEFAULT 0,
  units_given INTEGER DEFAULT 0,
  injection_site TEXT,
  notes TEXT,
  staff_id TEXT,
  staff_initial TEXT,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_insulin_case_date ON insulin_records(case_id, record_date);

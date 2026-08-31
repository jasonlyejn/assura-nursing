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
);

CREATE INDEX IF NOT EXISTS idx_visits_case ON visits(case_id, clock_in_at DESC);
CREATE INDEX IF NOT EXISTS idx_visits_staff ON visits(staff_id, clock_in_at DESC);

-- Staff roster — who works which shift, on which case.
--   npx wrangler d1 execute assura --remote --file=db\roster.sql
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

-- Staff self-service: own PIN change + profile edits that admin must approve.
--   npx wrangler d1 execute assura --remote --file=db\selfservice.sql
-- ("duplicate column" on a second run is harmless.)

-- Staff must change the admin-issued PIN the first time they sign in.
ALTER TABLE staff ADD COLUMN must_change_pin INTEGER NOT NULL DEFAULT 0;
ALTER TABLE staff ADD COLUMN pin_changed_at INTEGER;

-- Profile edits wait here until an admin approves them.
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

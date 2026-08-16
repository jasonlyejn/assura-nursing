-- Staff requests — leave, off days, shift swaps, claims.
--   npx wrangler d1 execute assura --remote --file=db\requests.sql


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

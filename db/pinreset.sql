-- "I forgot my PIN" requests, raised from the sign-in screen.
--   npx wrangler d1 execute assura --remote --file=db\pinreset.sql
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

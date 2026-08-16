-- End-of-case feedback from the family.
--   npx wrangler d1 execute assura --remote --file=db\feedback.sql
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

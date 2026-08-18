-- Per-patient chat is already created by schema.sql (messages + message_reads).
-- This file is kept so the setup steps stay in one place; running it is harmless.
--   npx wrangler d1 execute assura --remote --file=db\chat.sql
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY, case_id TEXT NOT NULL, kind TEXT NOT NULL DEFAULT 'team',
  body TEXT, photo TEXT, staff_id TEXT, staff_name TEXT,
  pinned INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_msg_case ON messages(case_id, created_at DESC);
CREATE TABLE IF NOT EXISTS message_reads (
  case_id TEXT NOT NULL, staff_id TEXT NOT NULL, read_at INTEGER NOT NULL,
  PRIMARY KEY (case_id, staff_id)
);

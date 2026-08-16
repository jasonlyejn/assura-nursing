-- Assura Nursing Care v2 — Phase 2 migration (MEWS charts + escalations)
-- Run once (safe to re-run):
--   wrangler d1 execute assura --remote --file=db/mews.sql

PRAGMA foreign_keys = ON;

-- One revision-synced MEWS chart document per case (JSON blob, last-write-wins by rev).
CREATE TABLE IF NOT EXISTS mews (
  case_id    TEXT PRIMARY KEY REFERENCES cases(id),
  data       TEXT NOT NULL,             -- JSON: { header, cols, log, view, week }
  rev        INTEGER NOT NULL DEFAULT 1,
  updated_at INTEGER NOT NULL,
  updated_by TEXT
);

-- Abnormal EWS events raised from a chart, visible to staff across the app.
CREATE TABLE IF NOT EXISTS escalations (
  id         TEXT PRIMARY KEY,
  case_id    TEXT NOT NULL REFERENCES cases(id),
  level      TEXT NOT NULL,             -- monitor | escalate | urgent
  total_ews  INTEGER,
  detail     TEXT,
  col_label  TEXT,
  created_by TEXT,
  created_at INTEGER NOT NULL,
  ack_by     TEXT,
  ack_at     INTEGER
);

CREATE INDEX IF NOT EXISTS idx_esc_case ON escalations(case_id);
CREATE INDEX IF NOT EXISTS idx_esc_open ON escalations(ack_at);

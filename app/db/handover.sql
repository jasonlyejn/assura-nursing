-- Shift handover reports — one per shift, per case.
--   npx wrangler d1 execute assura --remote --file=db\handover.sql
CREATE TABLE IF NOT EXISTS handovers (
  id          TEXT PRIMARY KEY,
  case_id     TEXT NOT NULL REFERENCES cases(id),
  shift_date  TEXT NOT NULL,          -- YYYY-MM-DD (Malaysia)
  shift       TEXT NOT NULL,          -- AM | PM | NIGHT
  staff_id    TEXT REFERENCES staff(id),
  staff_name  TEXT,

  condition   TEXT,                   -- how the patient is
  vitals_note TEXT,                   -- BP/HR/temp/SpO2 summary
  ews         TEXT,                   -- latest MEWS total, if taken
  intake      TEXT,                   -- fluids / feeds in
  output      TEXT,                   -- urine / drain out
  bowel       TEXT,                   -- BO / BNO + days
  meds_given  TEXT,
  meds_due    TEXT,
  wound_note  TEXT,
  mobility    TEXT,                   -- positioning, transfers, walking
  meals       TEXT,                   -- appetite / feeding
  sleep       TEXT,
  mood        TEXT,                   -- behaviour / orientation
  procedures  TEXT,                   -- what was done this shift
  concerns    TEXT,                   -- anything worrying
  todo        TEXT,                   -- what the next shift must do
  family_note TEXT,                   -- what the family was told

  created_at  INTEGER NOT NULL,
  ack_by      TEXT REFERENCES staff(id),
  ack_name    TEXT,
  ack_at      INTEGER
);
CREATE INDEX IF NOT EXISTS idx_ho_case ON handovers(case_id, shift_date DESC, created_at DESC);

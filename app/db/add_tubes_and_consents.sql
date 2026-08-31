-- Migration: Patient Tubes Tracker & Procedure Consents
CREATE TABLE IF NOT EXISTS patient_tubes (
  id              TEXT PRIMARY KEY,
  case_id         TEXT NOT NULL REFERENCES cases(id),
  tube_type       TEXT NOT NULL, -- ryles_tube | foley_catheter | tracheostomy | peg_tube | stoma_wafer | picc_line | wound_drain | other
  brand_size      TEXT NOT NULL, -- e.g. "Silicone Fr 16 (10ml)"
  insertion_date  TEXT NOT NULL,
  due_date        TEXT NOT NULL,
  inserted_by     TEXT REFERENCES staff(id),
  insertion_notes TEXT,
  status          TEXT NOT NULL DEFAULT 'active', -- active | replaced | removed
  created_at      INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS procedure_consents (
  id                TEXT PRIMARY KEY,
  case_id           TEXT NOT NULL REFERENCES cases(id),
  procedure_name    TEXT NOT NULL,
  signee_name       TEXT NOT NULL,
  signee_ic         TEXT NOT NULL,
  relationship      TEXT NOT NULL, -- self | son_daughter | spouse | parent | legal_guardian
  signature_data    TEXT NOT NULL, -- Base64 data URL
  witness_staff_id  TEXT REFERENCES staff(id),
  signed_at         INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_tubes_case ON patient_tubes(case_id);
CREATE INDEX IF NOT EXISTS idx_tubes_due ON patient_tubes(due_date);
CREATE INDEX IF NOT EXISTS idx_consents_case ON procedure_consents(case_id);

CREATE TABLE IF NOT EXISTS patient_users (
  id TEXT PRIMARY KEY,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  patient_name TEXT NOT NULL,
  nric TEXT,
  pin_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  consent_pdpa INTEGER NOT NULL DEFAULT 1,
  case_id TEXT,
  created_at INTEGER NOT NULL,
  last_login INTEGER
);

CREATE TABLE IF NOT EXISTS patient_documents (
  id TEXT PRIMARY KEY,
  patient_user_id TEXT NOT NULL,
  case_id TEXT,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  file_data TEXT NOT NULL,
  file_type TEXT NOT NULL,
  uploaded_at INTEGER NOT NULL,
  uploaded_by TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS patient_consent_logs (
  id TEXT PRIMARY KEY,
  patient_user_id TEXT NOT NULL,
  case_id TEXT,
  action TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_patient_users_phone ON patient_users(phone);
CREATE INDEX IF NOT EXISTS idx_patient_docs_user ON patient_documents(patient_user_id);
CREATE INDEX IF NOT EXISTS idx_patient_docs_case ON patient_documents(case_id);
CREATE INDEX IF NOT EXISTS idx_patient_consent_user ON patient_consent_logs(patient_user_id);

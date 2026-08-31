import crypto from 'node:crypto';
import fs from 'node:fs';

function hashPin(pin, saltHex) {
  const salt = Buffer.from(saltHex, 'hex');
  return crypto.pbkdf2Sync(pin, salt, 100000, 32, 'sha256').toString('hex');
}

const salt1 = crypto.randomBytes(16).toString('hex');
const hash1 = hashPin('1234', salt1);

const salt2 = crypto.randomBytes(16).toString('hex');
const hash2 = hashPin('1234', salt2);

const salt3 = crypto.randomBytes(16).toString('hex');
const hash3 = hashPin('1234', salt3);

const now = Date.now();

const sql = `
-- DEMO ACCOUNTS SEED FOR INVESTORS, PARTNERS & CLIENTS

-- 1. Demo Admin Account
INSERT OR REPLACE INTO staff (
  id, name, phone, role, pin_salt, pin_hash, active, created_at,
  email, qualification, started_at
) VALUES (
  'demo_admin_001', 'Demo Nursing Director (Admin)', '0120001111', 'admin',
  '${salt1}', '${hash1}', 1, ${now},
  'admin@assuranursing.com', 'RN / BNSc / MBA Healthcare', '2024-01-01'
);

-- 2. Demo Field Staff Nurse
INSERT OR REPLACE INTO staff (
  id, name, phone, role, pin_salt, pin_hash, active, created_at,
  email, qualification, staff_no, reg_no, started_at
) VALUES (
  'demo_nurse_001', 'Staff Nurse Siti (Demo)', '0120002222', 'nurse',
  '${salt2}', '${hash2}', 1, ${now},
  'siti@assuranursing.com', 'Diploma in Nursing (LJM Certified)', 'ASN-1088', 'LJM-88992', '2024-03-01'
);

-- 3. Demo Patient & Case
INSERT OR REPLACE INTO patients (
  id, name, phone, address, age, sex, care_type, created_at,
  case_brief, things_to_aware, things_to_do, medical_history, devices_tubes,
  mobility_status, feeding_regimen, emergency_contacts, allergies
) VALUES (
  'demo_patient_001', 'Mr. Tan Ah Kow (Demo Case)', '0120003333', '12, Jalan Gurney, 10250 George Town, Penang',
  '74', 'M', 'longterm', ${now},
  '74yo male post-ischemic stroke with right-sided hemiplegia. Alert, oriented, under home rehabilitation.',
  'High fall risk (keep bed rails up)\nStrict aspiration precaution (30-degree head elevation during feeds)\nAllergic to Penicillin & NSAIDs\nTurn and reposition Q2H',
  'Check MEWS Vitals (BP, SpO2, Temp, HR) at 09:00 & 17:00\nPEG feeding 250ml Glucerna + 50ml water flush Q4H\nAseptic wound dressing on right sacral sore with Aquacel Ag\nFoley catheter drainage monitoring (target >50ml/hr)',
  'Ischemic Stroke (MCA territory, 2024), Hypertension (10 yrs), T2DM (15 yrs), Hyperlipidemia',
  'Foley Urinary Catheter Fr 16 (Silicone, due 28 Sep), PEG Tube size 20',
  'Bedbound, requires 2-person assistance with slide sheet for wheelchair transfer',
  'Glucerna SR 250ml Q4H (08:00, 12:00, 16:00, 20:00) + 100ml water flush',
  'Son: Mr. Tan Jun Wei (012-3456789) · NOK / Main Caregiver. Full resuscitation code.',
  'Penicillin, Aspirin'
);

INSERT OR REPLACE INTO cases (
  id, patient_id, status, assigned_staff_id, billing_mode, source, created_at
) VALUES (
  'demo_case_001', 'demo_patient_001', 'active', 'demo_nurse_001', 'per_visit', 'Hospital Discharge (Island Hospital)', ${now}
);

-- 4. Demo Patient User (Member Portal)
INSERT OR REPLACE INTO patient_users (
  id, phone, email, patient_name, nric, pin_hash, salt, consent_pdpa, case_id, created_at, last_login
) VALUES (
  'demo_puser_001', '0120003333', 'tan.family@gmail.com', 'Mr. Tan Ah Kow', '520101-07-5566',
  '${hash3}', '${salt3}', 1, 'demo_case_001', ${now}, ${now}
);

-- 5. Demo MEWS Vitals Data
INSERT OR REPLACE INTO mews (
  case_id, data, updated_at
) VALUES (
  'demo_case_001',
  '{"cols":[{"date":"24 Aug","time":"09:00","readings":{"sbp":"128","dbp":"82","hr":"76","temp":"36.8","spo2":"98","sugar":"6.4","resp":"16","avpu":"A","ews":0}},{"date":"24 Aug","time":"14:00","readings":{"sbp":"130","dbp":"85","hr":"78","temp":"37.0","spo2":"97","sugar":"7.1","resp":"17","avpu":"A","ews":0}},{"date":"24 Aug","time":"18:00","readings":{"sbp":"125","dbp":"80","hr":"74","temp":"36.7","spo2":"99","sugar":"6.2","resp":"16","avpu":"A","ews":0}}]}',
  ${now}
);

-- 6. Demo Active Medications (MAR)
INSERT OR REPLACE INTO medications (
  id, case_id, name, dose, route, frequency, times, indication, notes, active, created_at
) VALUES
  ('med_001', 'demo_case_001', 'Amlodipine Besylate', '5mg', 'PO', 'OD (Morning)', '08:00', 'Hypertension', 'Give after breakfast', 1, ${now}),
  ('med_002', 'demo_case_001', 'Metformin HCl', '500mg', 'PO', 'BD', '08:00, 20:00', 'Type 2 Diabetes', 'Crush for tube feeding if necessary', 1, ${now}),
  ('med_003', 'demo_case_001', 'Atorvastatin', '20mg', 'PO', 'ON (Night)', '21:00', 'Hyperlipidemia', 'Take before bedtime', 1, ${now});

-- 7. Demo Active Tubes
INSERT OR REPLACE INTO patient_tubes (
  id, case_id, tube_type, brand_size, insertion_date, due_date, inserted_by, insertion_notes, status, created_at
) VALUES (
  'tube_demo_001', 'demo_case_001', 'foley_catheter', 'Silicone 100% Fr 16 (Balloon 10ml)', '2026-08-01', '2026-08-31', 'demo_nurse_001',
  'Smooth aseptic insertion. Clear yellow urine drained 400ml. No trauma.', 'active', ${now}
);
`;

fs.writeFileSync('c:/assura/app/db/seed_demo_accounts.sql', sql);
console.log('✓ Generated c:/assura/app/db/seed_demo_accounts.sql');

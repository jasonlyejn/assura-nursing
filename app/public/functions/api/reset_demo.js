import { json, bad } from './_lib/respond.js';
import { hashPin, randomSaltHex } from './_lib/crypto.js';

export async function onRequest(context) {
  const { env } = context;
  const db = env.DB;

  try {
    // 1. CLEAR OLD CASES & CLINICAL DATA
    const tablesToClear = [
      'case_broadcasts', 'case_applications', 'visits', 'mews',
      'medications', 'med_admin', 'wounds', 'handovers', 'roster',
      'quotes', 'invoices', 'feedback', 'escalations', 'messages',
      'patient_users', 'cases', 'patients'
    ];

    for (const tbl of tablesToClear) {
      await db.prepare(`DELETE FROM ${tbl}`).run().catch(() => {});
    }

    const now = Date.now();

    // 2. SEED STAFF ACCOUNTS WITH DEFINED DEMO PINS
    const staffSeeds = [
      {
        id: 'st_admin_01',
        name: 'Mr. Jason Ng Lye Tiam (吴乃添)',
        role: 'admin',
        email: 'admin@assuranursing.com',
        phone: '0164448888',
        staff_no: 'ASN-001',
        reg_no: 'LJM 59102',
        qualification: 'BSc Nursing / Clinical Director',
        pin: '8888'
      },
      {
        id: 'st_super_02',
        name: 'Sister Tan Siew Lan (陈秀兰)',
        role: 'supervisor',
        email: 'supervisor@assuranursing.com',
        phone: '0124567891',
        staff_no: 'ASN-002',
        reg_no: 'LJM 48291',
        qualification: 'Registered Nurse / Nurse Supervisor',
        pin: '1234'
      },
      {
        id: 'st_nurse_03',
        name: 'Nurse Farah (法拉护士)',
        role: 'nurse',
        email: 'nurse@assuranursing.com',
        phone: '0174889923',
        staff_no: 'ASN-003',
        reg_no: 'LJM 62319',
        qualification: 'Registered Nurse (SRN)',
        pin: '1234'
      },
      {
        id: 'st_care_04',
        name: 'Caregiver Siti (西蒂护理员)',
        role: 'caregiver',
        email: 'caregiver@assuranursing.com',
        phone: '0194443322',
        staff_no: 'ASN-004',
        reg_no: 'HCA-910',
        qualification: 'Certified Healthcare Assistant (HCA)',
        pin: '1234'
      }
    ];

    for (const s of staffSeeds) {
      const salt = randomSaltHex();
      const pinHash = await hashPin(s.pin, salt);
      await db.prepare(`
        INSERT OR REPLACE INTO staff (
          id, name, role, email, phone, staff_no, reg_no, qualification,
          pin_salt, pin_hash, active, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
      `).bind(
        s.id, s.name, s.role, s.email, s.phone, s.staff_no, s.reg_no, s.qualification,
        salt, pinHash, now
      ).run();
    }

    // 3. SEED 4 REALISTIC CLINICAL DEMO CASES
    const cases = [
      {
        case_id: 'case_lee_01',
        case_code: 'ASN-8821',
        patient_id: 'pat_lee_01',
        name: 'Mr. Lee Hock Seng (李福星)',
        age: '76',
        sex: 'Male',
        phone: '0124567890',
        nric: '480512-07-5511',
        address: 'Persiaran Bayan Indah, Queensbay, Bayan Lepas, 11900 Penang',
        care_type: 'longterm',
        billing_mode: 'weekly',
        assigned_staff_id: 'st_super_02',
        status: 'active',
        dx: 'Post-Ischemic Stroke (Left Hemiplegia), Dysphagia with Ryle\'s NG Tube',
        allergies: 'NKDA (No Known Drug Allergies)',
        pin: '1234'
      },
      {
        case_id: 'case_tan_02',
        case_code: 'ASN-4492',
        patient_id: 'pat_tan_02',
        name: 'Madam Tan Ah Lan (陈亚兰)',
        age: '68',
        sex: 'Female',
        phone: '0164123890',
        nric: '560318-07-5234',
        address: 'Jalan Kelawai, Pulau Tikus, 10250 George Town, Penang',
        care_type: 'procedure',
        billing_mode: 'per_visit',
        assigned_staff_id: 'st_admin_01',
        status: 'active',
        dx: 'Type 2 Diabetes Mellitus, Stage 3 Sacral Pressure Ulcer (Wound Care)',
        allergies: 'Penicillin, Iodine',
        pin: '1234'
      },
      {
        case_id: 'case_raman_03',
        case_code: 'ASN-6638',
        patient_id: 'pat_raman_03',
        name: 'Mr. Muthusamy A/L Raman',
        age: '72',
        sex: 'Male',
        phone: '0174889922',
        nric: '520924-07-5893',
        address: 'Jalan Masjid Negeri, Green Lane, 11600 George Town, Penang',
        care_type: 'longterm',
        billing_mode: 'weekly',
        assigned_staff_id: 'st_nurse_03',
        status: 'active',
        dx: 'Severe COPD with Tracheostomy & Frequent Secretion Suctioning',
        allergies: 'Aspirin / NSAIDs',
        pin: '1234'
      },
      {
        case_id: 'case_khor_04',
        case_code: 'ASN-1105',
        patient_id: 'pat_khor_04',
        name: 'Madam Khor Bee Geok (许美玉)',
        age: '82',
        sex: 'Female',
        phone: '0124993388',
        nric: '421105-07-5120',
        address: 'Taman Bukit Mas, 14000 Bukit Mertajam, Seberang Perai, Penang',
        care_type: 'longterm',
        billing_mode: 'weekly',
        assigned_staff_id: 'st_care_04',
        status: 'active',
        dx: 'Advanced Vascular Dementia, Bedbound ADL Assistance & Foley Catheter',
        allergies: 'Sulfa Drugs',
        pin: '1234'
      }
    ];

    for (const c of cases) {
      // Patient table
      await db.prepare(`
        INSERT OR REPLACE INTO patients (
          id, name, phone, address, age, sex, care_type, notes, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        c.patient_id, c.name, c.phone, c.address, c.age, c.sex, c.care_type,
        `Diagnosis: ${c.dx}. Allergies: ${c.allergies}. Case Access Code: ${c.case_code}`,
        now
      ).run();

      // Case table
      await db.prepare(`
        INSERT OR REPLACE INTO cases (
          id, patient_id, status, assigned_staff_id, billing_mode, source, created_at
        ) VALUES (?, ?, ?, ?, ?, 'website', ?)
      `).bind(
        c.case_id, c.patient_id, c.status, c.assigned_staff_id, c.billing_mode, now
      ).run();

      // Patient Portal Account (Patient / Family Login)
      const pSalt = randomSaltHex();
      const pHash = await hashPin(c.pin, pSalt);
      await db.prepare(`
        INSERT OR REPLACE INTO patient_users (
          id, phone, patient_name, nric, pin_hash, salt, consent_pdpa, case_id, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
      `).bind(
        'puid_' + c.case_id, c.phone, c.name, c.nric, pHash, pSalt, c.case_id, now
      ).run();

      // Seed Standard MEWS Chart for each case
      const todayStr = new Date().toISOString().slice(0, 10);
      const mewsData = {
        header: {
          name: c.name,
          ic: c.nric,
          room: c.address.split(',')[0],
          dx: c.dx,
          remarks: `Allergies: ${c.allergies} · Code: ${c.case_code}`
        },
        cols: [
          {
            date: todayStr,
            time: '08:00',
            marks: { resp: 3, spo2a: 0, o2: 0, bp: 8, hr: 2, temp: 4 },
            readings: { sbp: '128', dbp: '78', hr: '76', temp: '36.7', spo2: '98', rr: '16', o2raw: 'RA' },
            notes: { pain: '0', hgt: '6.4', fluidin: '350', urine: '400', bowel: '1', stool: 'S', hygiene: 'Bed bath', wound: 'C', staff: 'RN' }
          },
          {
            date: todayStr,
            time: '14:00',
            marks: { resp: 3, spo2a: 0, o2: 0, bp: 8, hr: 2, temp: 4 },
            readings: { sbp: '130', dbp: '80', hr: '78', temp: '36.8', spo2: '97', rr: '18', o2raw: 'RA' },
            notes: { pain: '1', hgt: '7.1', fluidin: '400', urine: '350', bowel: '0', stool: '', hygiene: 'Oral care', wound: 'C', staff: 'RN' }
          }
        ]
      };

      await db.prepare(`
        INSERT OR REPLACE INTO mews (case_id, data, rev, updated_at, updated_by)
        VALUES (?, ?, 1, ?, 'system_seed')
      `).bind(c.case_id, JSON.stringify(mewsData), now).run();

      // Seed Prescriptions (MAR)
      const medId1 = 'med_' + c.case_id + '_1';
      const medId2 = 'med_' + c.case_id + '_2';
      await db.prepare(`
        INSERT OR REPLACE INTO medications (
          id, case_id, name, dose, route, frequency, times, active, created_at, created_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, 'Dr. Consultant')
      `).bind(medId1, c.case_id, 'Amlodipine 5mg', '5mg (1 Tab)', 'Oral (PO)', 'OD', '07:00', now).run();

      await db.prepare(`
        INSERT OR REPLACE INTO medications (
          id, case_id, name, dose, route, frequency, times, active, created_at, created_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, 'Dr. Consultant')
      `).bind(medId2, c.case_id, 'Metformin 500mg', '500mg (1 Tab)', 'Oral (PO)', 'BD', '06:00, 18:00', now).run();
    }

    // 4. SEED 2 OPEN BROADCASTS WITH STRICT 30:70 COMMISSION RATIO
    const broadcasts = [
      {
        id: 'bc_demo_01',
        case_id: 'case_tan_02',
        title: 'Post-Op Surgical Wound Dressing & Hydrogel Care',
        area: 'Pulau Tikus / George Town',
        care_type: 'Wound Dressing & Aseptic Care',
        schedule: 'Daily 10:00 AM (1 Hour Session)',
        client_payment: 150.00,
        commission_pct: 30.0,
        nurse_wage: 105.00, // 70%
        notes: 'Stage 3 sacral wound dressing. Sterile technique required. Consumables provided.'
      },
      {
        id: 'bc_demo_02',
        case_id: 'case_lee_01',
        title: '12-Hour Day Shift Post-Stroke Rehab & Tube Feeding',
        area: 'Queensbay, Bayan Lepas',
        care_type: '12hr Day Shift & ADL Support',
        schedule: 'Mon–Fri 8:00 AM – 8:00 PM',
        client_payment: 240.00,
        commission_pct: 30.0,
        nurse_wage: 168.00, // 70%
        notes: 'Elderly gentleman recovering from stroke. Regular turning Q2H, vitals, NG tube feed.'
      }
    ];

    for (const b of broadcasts) {
      await db.prepare(`
        INSERT OR REPLACE INTO case_broadcasts (
          id, case_id, title, area, care_type, schedule,
          client_payment, commission_pct, nurse_wage, notes,
          status, created_at, created_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'open', ?, 'st_admin_01')
      `).bind(
        b.id, b.case_id, b.title, b.area, b.care_type, b.schedule,
        b.client_payment, b.commission_pct, b.nurse_wage, b.notes, now
      ).run();
    }

    return json({
      ok: true,
      message: '✓ All cases wiped and fresh demo cases generated with 30:70 split.',
      demo_logins: {
        staff: [
          { role: 'Admin / Director', identifier: 'admin@assuranursing.com', staff_no: 'ASN-001', pin: '8888' },
          { role: 'Nurse Supervisor', identifier: 'supervisor@assuranursing.com', staff_no: 'ASN-002', pin: '1234' },
          { role: 'Staff Nurse', identifier: 'nurse@assuranursing.com', staff_no: 'ASN-003', pin: '1234' },
          { role: 'Caregiver (HCA)', identifier: 'caregiver@assuranursing.com', staff_no: 'ASN-004', pin: '1234' }
        ],
        patient_family: [
          { name: 'Mr. Lee Hock Seng (李福星)', phone: '0124567890', pin: '1234', case_code: 'ASN-8821', nric: '480512-07-5511' },
          { name: 'Madam Tan Ah Lan (陈亚兰)', phone: '0164123890', pin: '1234', case_code: 'ASN-4492', nric: '560318-07-5234' },
          { name: 'Mr. Muthusamy A/L Raman', phone: '0174889922', pin: '1234', case_code: 'ASN-6638', nric: '520924-07-5893' },
          { name: 'Madam Khor Bee Geok (许美玉)', phone: '0124993388', pin: '1234', case_code: 'ASN-1105', nric: '421105-07-5120' }
        ]
      }
    });

  } catch (err) {
    return bad('Reset failed: ' + err.message, 500);
  }
}

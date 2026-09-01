import React, { useState, useEffect } from 'react';

export default function PatientAssessmentForm({ caseObj, caseId, onSave, onCancel, existingContent, me }) {
  const c = caseObj || {};
  const id = caseId || c.id;

  const [formData, setFormData] = useState(() => {
    if (existingContent && Object.keys(existingContent).length > 5) {
      return existingContent;
    }
    return {
      // SECTION A & B: RESIDENT DETAILS
      admission_date: new Date().toISOString().split('T')[0],
      room_bed: c.address || c.room || '',
      admission_no: 'ADM-' + (id ? id.slice(-6).toUpperCase() : Math.floor(100000 + Math.random() * 900000)),
      ward_unit: 'Home Nursing / Private Care',
      name: c.name || '',
      ic: c.ic || c.nric || '',
      dob: '',
      age: c.age || '',
      gender: c.sex || c.gender || 'Female',
      nationality: 'Malaysian',
      marital: 'Married',
      race: 'Chinese',
      religion: 'Buddhism',
      phone: c.phone || '',

      // SECTION C: NEXT OF KIN
      nok_name: c.kin_name || '',
      nok_relation: c.kin_relation || 'Spouse',
      nok_phone: c.kin_phone || '',
      nok_ic: '',
      nok_address: c.address || '',

      // SECTION D: MEDICAL CONDITIONS (TICKABLE CHECKLIST)
      medical_conditions: ['Hypertension (高血压)', 'Diabetes (糖尿病)'],
      chronic_illnesses: [],
      allergies_list: c.allergies ? c.allergies.split(',').map(s => s.trim()) : ['None Known (无已知过敏)'],
      physical_disabilities: ['None (无)'],
      mental_cognitive: ['None (无)'],
      mobility_status: 'Assisted (需协助/轮椅)',
      dietary_requirements: ['Normal (正常饮食)'],
      special_care_needs: ['Fall Prevention (防跌倒)', 'Wound Dressing (伤口敷料更换)'],
      additional_medical_notes: c.medical_history || c.dx || '',

      // SECTION RED: BIOHAZARD & OXYGEN
      biohazard_blood: [],
      biohazard_precautions: ['Standard Precautions'],
      o2_type: 'None (无需氧气)',
      o2_device: 'Nasal Cannula',
      o2_flow_rate: '',

      // SECTION GREEN: ON ARRIVAL
      arrival_datetime: new Date().toISOString().slice(0, 16),
      arrived_by: 'Family Vehicle (家属接送)',
      accompanied_by: c.kin_name || 'Family Members',
      consciousness: 'Alert (清醒 / A)',
      orientation: ['Person', 'Place', 'Time'],
      pain_category: '0 None (无痛)',
      fall_risk_category: 'Moderate Risk (中度风险)',
      nutritional_status: 'Well Nourished (营养良好)',
      hydration_status: 'Adequate (充足/正常)',

      // SECTION BLUE: VITALS BASELINE
      vital_bp_sys: '',
      vital_bp_dia: '',
      vital_hr: '',
      vital_rr: '',
      vital_temp: '',
      vital_spo2: '',
      vital_glucose: '',
      vital_pain_score: '0',
      vital_height: c.height || '',
      vital_weight: c.weight || '',
      vital_bmi: '',
      vital_gcs: '15',
      vital_pupil: 'Equal & Reactive',

      // SECTION PURPLE: SKIN & WOUNDS
      skin_overall: ['Intact & Healthy (完好无损)'],
      braden_risk_level: 'Low (15-18 分 低风险)',
      wound_stage: 'N/A (No Wounds)',
      edema_status: 'None (无水肿)',
      edema_location: '',
      existing_wounds: ['None (无伤口)'],
      photo_docs: 'Taken & Uploaded to Wound Care (已拍照留档)',

      // SECTION J: CONSENT & DECLARATION
      consent_medical: true,
      consent_emergency_transfer: true,
      consent_data_collection: true,
      admission_status: 'Permanent (长期照护)',
      verified_by: me?.name || 'Attending Nurse',

      // SECTION L: DISCHARGE PLAN
      discharge_type: 'Home (居家长期护理)',
      discharge_condition: 'Stable (病情平稳)',
      discharge_mobility: 'Assisted (需协助/轮椅)',
      discharge_home_care: 'Professional Home Nursing (专业居家护理)',
      discharge_equipment: ['Wheelchair (轮椅)'],

      // SECTION M: PATIENT EDUCATION
      edu_topics: ['Medication Management (药物管理)', 'Wound Care (伤口护理)', 'Fall Prevention (防跌倒宣教)'],
      edu_understanding: 'Verbalizes Understanding (家属口头理解并掌握)',
      edu_educator_name: me?.name || 'Nurse in charge',
    };
  });

  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3500); };

  // Auto BMI
  useEffect(() => {
    const h = parseFloat(formData.vital_height);
    const w = parseFloat(formData.vital_weight);
    if (h > 50 && w > 10) {
      const hm = h / 100;
      const bmi = (w / (hm * hm)).toFixed(1);
      setFormData(prev => ({ ...prev, vital_bmi: bmi }));
    }
  }, [formData.vital_height, formData.vital_weight]);

  function toggleArrayItem(field, value) {
    setFormData(prev => {
      const list = prev[field] || [];
      if (value === 'None' || value.startsWith('None')) {
        return { ...prev, [field]: list.some(x => x.startsWith('None')) ? [] : [value] };
      }
      const filtered = list.filter(x => !x.startsWith('None'));
      if (filtered.includes(value)) {
        return { ...prev, [field]: filtered.filter(x => x !== value) };
      } else {
        return { ...prev, [field]: [...filtered, value] };
      }
    });
  }

  function isChecked(field, value) {
    const list = formData[field] || [];
    return list.includes(value);
  }

  function setField(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setBusy(true);
    try {
      const payload = {
        case_id: id,
        doc_type: 'admission_assessment',
        title: '📋 Comprehensive Clinical Assessment · ' + (formData.name || 'Patient'),
        content: formData,
      };

      const res = await fetch('/api/clinical_docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save assessment');
      flash('✓ Assessment saved successfully to patient clinical record!');
      if (onSave) onSave(formData);
    } catch (e) {
      flash('Error saving assessment: ' + e.message);
    } finally {
      setBusy(false);
    }
  }

  function generateSoapNote() {
    const d = formData;
    const text = '📋 [COMPREHENSIVE ADMISSION & CLINICAL ASSESSMENT SUMMARY]\n' +
      '👤 Patient: ' + d.name + ' (' + d.age + 'y/o ' + d.gender + ') · NRIC: ' + (d.ic || '—') + '\n' +
      '📅 Date: ' + d.admission_date + ' · Ward/Room: ' + d.room_bed + '\n\n' +
      '🩺 MEDICAL CONDITIONS & ILLNESSES:\n' +
      '• Conditions: ' + ((d.medical_conditions || []).join(', ') || 'None') + '\n' +
      '• Chronic Illnesses: ' + ((d.chronic_illnesses || []).join(', ') || 'None') + '\n' +
      '• Allergies: ' + ((d.allergies_list || []).join(', ') || 'None') + '\n' +
      '• Mobility & Diet: ' + d.mobility_status + ' | ' + ((d.dietary_requirements || []).join(', ')) + '\n' +
      '• Special Care: ' + ((d.special_care_needs || []).join(', ') || 'Standard') + '\n\n' +
      '⚠️ BIOHAZARD & RESPIRATORY / O2:\n' +
      '• Hazards: ' + ((d.biohazard_blood || []).join(', ') || 'None') + '\n' +
      '• O2: ' + d.o2_type + ' (' + d.o2_device + ' @ ' + (d.o2_flow_rate || '0') + ' L/min)\n\n' +
      '💓 BASELINE VITALS & ARRIVAL:\n' +
      '• BP: ' + (d.vital_bp_sys || '—') + '/' + (d.vital_bp_dia || '—') + ' mmHg | HR: ' + (d.vital_hr || '—') + ' bpm | Temp: ' + (d.vital_temp || '—') + '°C | SpO2: ' + (d.vital_spo2 || '—') + '%\n' +
      '• Glucose: ' + (d.vital_glucose || '—') + ' mmol/L | Pain: ' + (d.vital_pain_score || '0') + '/10 | Consciousness: ' + d.consciousness + '\n' +
      '• Ht/Wt/BMI: ' + (d.vital_height || '—') + 'cm / ' + (d.vital_weight || '—') + 'kg (BMI ' + (d.vital_bmi || '—') + ')\n\n' +
      '🩹 SKIN & BRADEN RISK:\n' +
      '• Skin: ' + ((d.skin_overall || []).join(', ')) + ' | Braden: ' + d.braden_risk_level + '\n' +
      '• Wounds: ' + d.wound_stage + ' (' + ((d.existing_wounds || []).join(', ')) + ')\n\n' +
      'Verified By: ' + (d.verified_by || me?.name || 'Attending Nurse');

    navigator.clipboard.writeText(text);
    flash('✓ Comprehensive clinical SOAP note copied to clipboard!');
  }

  function printOfficialForm() {
    const w = window.open('', '_blank');
    if (!w) { alert('Please allow popups to print the admission form.'); return; }

    const d = formData;
    const isChk = (field, val) => (d[field] || []).includes(val) ? '☑' : '☐';

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Assura Clinical Admission & Assessment Form · ${d.name}</title>
<style>
  :root {
    --blue:#0C3054; --blue-l:#e3f2fd; --red:#c62828; --red-l:#ffebee;
    --green:#2e7d32; --green-l:#e8f5e9; --purple:#6a1b9a; --purple-l:#f3e5f5;
    --orange:#e65100; --orange-l:#fff3e0; --yellow-l:#fffde7;
    --grey:#37474f; --grey-l:#eceff1; --line:#90a4ae;
  }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; background: #fff; color: #1a1a1a; font-size: 11px; line-height: 1.4; }
  .page { width: 210mm; min-height: 297mm; margin: 0 auto; padding: 12mm 10mm; page-break-after: always; }
  h1 { font-size: 18px; text-align: center; margin: 0; color: var(--blue); letter-spacing: 0.5px; font-weight: 800; }
  .subtitle { text-align: center; font-size: 10px; color: #555; margin: 2px 0 10px; }
  .section { border: 1.5px solid var(--line); border-radius: 6px; margin: 8px 0; overflow: hidden; }
  .section>.head { font-weight: 700; padding: 4px 8px; color: #fff; font-size: 12px; }
  .grey .head { background: var(--grey); } .blue .head { background: var(--blue); }
  .red .head { background: var(--red); } .green .head { background: var(--green); }
  .purple .head { background: var(--purple); } .orange .head { background: var(--orange); }
  table { width: 100%; border-collapse: collapse; }
  td { border: 1px solid #cfd8dc; padding: 4px 6px; vertical-align: top; font-size: 10.5px; }
  td.lbl { background: var(--grey-l); font-weight: 700; width: 16%; white-space: nowrap; }
  td.lbl.opt { background: var(--yellow-l); }
  .red td.lbl { background: var(--red-l); } .blue td.lbl { background: var(--blue-l); }
  .green td.lbl { background: var(--green-l); } .purple td.lbl { background: var(--purple-l); }
  .orange td.lbl { background: var(--orange-l); }
  .vitals td { text-align: center; } .vitals td.lbl { text-align: left; }
  .pagebar { text-align: center; font-size: 10px; color: #607d8b; margin-top: 10px; border-top: 1px dashed #b0bec5; padding-top: 4px; font-weight: 700; }
  .declaration { font-size: 10px; background: #fffde7; border: 1px solid #ffe082; padding: 6px; border-radius: 4px; margin: 6px 0; }
  @media print { body { background: #fff; } .page { padding: 8mm 6mm; margin: 0; box-shadow: none; } }
</style>
</head>
<body>

<div class="page">
  <h1>🏥 ASSURA CLINICAL NURSING ADMISSION &amp; ASSESSMENT FORM</h1>
  <div class="subtitle">Official Patient Record · Private Healthcare Facilities &amp; Services Act (PHFSA) Standards</div>

  <div class="section grey">
    <div class="head">🏢 A. FACILITY &amp; RESIDENT PERSONAL DETAILS</div>
    <table>
      <tr><td class="lbl">📅 Admission Date</td><td>${d.admission_date}</td><td class="lbl">👤 Full Name</td><td colspan="3"><b>${d.name}</b></td></tr>
      <tr><td class="lbl">🛏️ Room/Address</td><td>${d.room_bed}</td><td class="lbl">🆔 IC/Passport</td><td>${d.ic}</td><td class="lbl">📅 Age / Gender</td><td>${d.age} yrs · ${d.gender}</td></tr>
      <tr><td class="lbl">🔢 Admission No.</td><td>${d.admission_no}</td><td class="lbl">🌍 Nationality</td><td>${d.nationality}</td><td class="lbl">💍 Marital</td><td>${d.marital}</td></tr>
      <tr><td class="lbl opt">🙏 Race / Religion</td><td class="opt" colspan="3">${d.race} · ${d.religion}</td><td class="lbl">📱 Phone</td><td>${d.phone}</td></tr>
    </table>
  </div>

  <div class="section grey">
    <div class="head">👨‍👩‍👧 C. NEXT OF KIN / EMERGENCY CONTACT</div>
    <table>
      <tr><td class="lbl">👤 Primary NOK</td><td><b>${d.nok_name}</b></td><td class="lbl">🔗 Relation</td><td>${d.nok_relation}</td><td class="lbl">📱 NOK Phone</td><td><b>${d.nok_phone}</b></td></tr>
      <tr><td class="lbl">📍 NOK Address</td><td colspan="5">${d.nok_address}</td></tr>
    </table>
  </div>

  <div class="section grey">
    <div class="head">🩺 D. MEDICAL INFORMATION &amp; CONDITIONS</div>
    <table>
      <tr><td class="lbl opt">🩺 Medical Conditions</td><td class="opt" colspan="5">
        ${['Diabetes (糖尿病)', 'Hypertension (高血压)', 'Heart Disease (心脏病)', 'Stroke (中风)', 'Cancer (癌症)', 'Kidney Disease (肾病)', 'None (无)'].map(x => `${isChk('medical_conditions', x)} ${x}`).join('&nbsp;&nbsp;')}
      </td></tr>
      <tr><td class="lbl opt">🫁 Chronic Illness</td><td class="opt" colspan="5">
        ${['Asthma (哮喘)', 'COPD (慢阻肺)', 'Arthritis (关节炎)', 'Dementia (失智/老年痴呆)', "Parkinson's (帕金森)", 'Epilepsy (癫痫)', 'None (无)'].map(x => `${isChk('chronic_illnesses', x)} ${x}`).join('&nbsp;&nbsp;')}
      </td></tr>
      <tr><td class="lbl opt">⚠️ Allergies</td><td class="opt" colspan="5">
        ${['Penicillin (青霉素)', 'Aspirin (阿司匹林)', 'Seafood (海鲜)', 'Nuts (坚果)', 'Latex (乳胶)', 'None Known (无已知过敏)'].map(x => `${isChk('allergies_list', x)} ${x}`).join('&nbsp;&nbsp;')}
      </td></tr>
      <tr><td class="lbl opt">♿ Physical &amp; Mental</td><td class="opt" colspan="5">
        Disability: ${(d.physical_disabilities || []).join(', ') || 'None'} │ Mental/Cognitive: ${(d.mental_cognitive || []).join(', ') || 'None'}
      </td></tr>
      <tr><td class="lbl opt">🚶 Mobility &amp; Diet</td><td class="opt" colspan="5">
        Mobility: <b>${d.mobility_status}</b> │ Dietary: <b>${(d.dietary_requirements || []).join(', ')}</b>
      </td></tr>
      <tr><td class="lbl opt">⭐ Special Care</td><td class="opt" colspan="5">
        ${(d.special_care_needs || []).join(' │ ') || 'Standard Care'}
      </td></tr>
      <tr><td class="lbl">📝 Clinical Notes</td><td colspan="5">${d.additional_medical_notes || '—'}</td></tr>
    </table>
  </div>

  <div class="section red">
    <div class="head">⚠️ BIOHAZARD &amp; 🔵 OXYGEN THERAPY</div>
    <table>
      <tr><td class="lbl">🦠 Blood/Resp Hazards</td><td class="opt">${(d.biohazard_blood || []).join(', ') || 'None'}</td><td class="lbl">🫁 O2 Type</td><td colspan="3">${d.o2_type}</td></tr>
      <tr><td class="lbl">⚡ Precautions</td><td class="opt">${(d.biohazard_precautions || []).join(', ')}</td><td class="lbl">😷 Delivery Device</td><td colspan="3">${d.o2_device} (@ ${d.o2_flow_rate || 0} L/min)</td></tr>
    </table>
  </div>

  <div class="section green">
    <div class="head">🏥 E. ON ARRIVAL ASSESSMENT</div>
    <table>
      <tr><td class="lbl">⏰ Date &amp; Time</td><td>${d.arrival_datetime}</td><td class="lbl">🚑 Arrived By</td><td>${d.arrived_by}</td><td class="lbl">👥 Accompanied</td><td>${d.accompanied_by}</td></tr>
      <tr><td class="lbl">💭 Consciousness</td><td><b>${d.consciousness}</b></td><td class="lbl">🧭 Orientation</td><td>${(d.orientation || []).join(', ')}</td><td class="lbl">😣 Pain (0-10)</td><td>${d.pain_category}</td></tr>
      <tr><td class="lbl">⚡ Fall Risk</td><td><b>${d.fall_risk_category}</b></td><td class="lbl">🍎 Nutrition</td><td>${d.nutritional_status}</td><td class="lbl">💧 Hydration</td><td>${d.hydration_status}</td></tr>
    </table>
  </div>

  <div class="section blue">
    <div class="head">💓 F. VITAL SIGNS BASELINE</div>
    <table class="vitals">
      <tr><td class="lbl">🩸 Blood Pressure</td><td><b>${d.vital_bp_sys || '—'} / ${d.vital_bp_dia || '—'} mmHg</b></td><td class="lbl">🌡️ Temp</td><td><b>${d.vital_temp || '—'} °C</b></td><td class="lbl">📊 SpO2</td><td><b>${d.vital_spo2 || '—'} %</b></td></tr>
      <tr><td class="lbl">❤️ Heart Rate</td><td><b>${d.vital_hr || '—'} bpm</b></td><td class="lbl">🩸 Glucose</td><td><b>${d.vital_glucose || '—'} mmol/L</b></td><td class="lbl">😣 Pain</td><td><b>${d.vital_pain_score || '0'} / 10</b></td></tr>
      <tr><td class="lbl">🫁 Resp Rate</td><td><b>${d.vital_rr || '—'} /min</b></td><td class="lbl">📏 Ht / Wt</td><td><b>${d.vital_height || '—'} cm / ${d.vital_weight || '—'} kg</b></td><td class="lbl">📊 BMI</td><td><b>${d.vital_bmi || '—'} kg/m²</b></td></tr>
      <tr><td class="lbl">🧠 GCS Score</td><td><b>${d.vital_gcs || '15'} / 15</b></td><td class="lbl">👁️ Pupils</td><td colspan="3"><b>${d.vital_pupil}</b></td></tr>
    </table>
  </div>
  <div class="pagebar">━━━━━━━━ PAGE 1 OF 2 ━━━━━━━━</div>
</div>

<div class="page">
  <h1>🏥 ASSURA CLINICAL NURSING ADMISSION &amp; ASSESSMENT FORM (Page 2)</h1>

  <div class="section purple">
    <div class="head">🩹 G. SKIN INTEGRITY &amp; BRADEN PRESSURE SORE ASSESSMENT</div>
    <table>
      <tr><td class="lbl">🔍 Overall Skin</td><td>${(d.skin_overall || []).join(', ')}</td><td class="lbl">📊 Braden Scale</td><td colspan="3"><b>${d.braden_risk_level}</b></td></tr>
      <tr><td class="lbl">📈 Wound Stage</td><td>${d.wound_stage}</td><td class="lbl">💧 Edema</td><td colspan="3">${d.edema_status} ${d.edema_location ? '(' + d.edema_location + ')' : ''}</td></tr>
      <tr><td class="lbl">🩹 Existing Wounds</td><td colspan="2">${(d.existing_wounds || []).join(', ')}</td><td class="lbl">📷 Photo Docs</td><td colspan="2">${d.photo_docs}</td></tr>
    </table>
  </div>

  <div class="section grey">
    <div class="head">✍️ J. CONSENT &amp; LEGAL DECLARATION</div>
    <table>
      <tr><td class="lbl">✅ Medical Care</td><td>${d.consent_medical ? '☑ Yes' : '☐ No'} — Consents to nursing care</td><td class="lbl">🚨 Emergency Transfer</td><td>${d.consent_emergency_transfer ? '☑ Yes' : '☐ No'} — Consents to emergency hospital transfer</td></tr>
      <tr><td class="lbl">📊 PDPA Data</td><td colspan="3">${d.consent_data_collection ? '☑ Yes' : '☐ No'} — Consents to healthcare data processing under PDPA 2010</td></tr>
    </table>
    <div class="declaration">📜 <b>DECLARATION:</b> I hereby declare that all clinical assessment details provided above are true and verified. The patient / next of kin has been briefed regarding care plans and emergency protocols.</div>
    <table>
      <tr><td class="lbl">✍️ Verified By Nurse</td><td><b>${d.verified_by}</b></td><td class="lbl">📅 Date</td><td>${d.admission_date}</td><td class="lbl">📋 Care Mode</td><td><b>${d.admission_status}</b></td></tr>
    </table>
  </div>

  <div class="section green">
    <div class="head">🏠 L. DISCHARGE CARE PLAN</div>
    <table>
      <tr><td class="lbl">📋 Discharge Plan</td><td>${d.discharge_type}</td><td class="lbl">🩺 Condition</td><td>${d.discharge_condition}</td></tr>
      <tr><td class="lbl">🚶 Mobility</td><td>${d.discharge_mobility}</td><td class="lbl">🏠 Home Care Needs</td><td>${d.discharge_home_care}</td></tr>
      <tr><td class="lbl">🛠️ Equipment</td><td colspan="3">${(d.discharge_equipment || []).join(', ')}</td></tr>
    </table>
  </div>

  <div class="section orange">
    <div class="head">📚 M. PATIENT &amp; FAMILY EDUCATION</div>
    <table>
      <tr><td class="lbl">📖 Topics Covered</td><td colspan="3">${(d.edu_topics || []).join(', ')}</td></tr>
      <tr><td class="lbl">✅ Understanding</td><td><b>${d.edu_understanding}</b></td><td class="lbl">👨‍🏫 Educator Nurse</td><td>${d.edu_educator_name}</td></tr>
    </table>
  </div>

  <div class="pagebar">━━━━━━━━ PAGE 2 OF 2 ━━━━━━━━</div>
</div>

<script>
  window.onload = function() { window.print(); }
</script>
</body>
</html>`;

    w.document.write(html);
    w.document.close();
  }

  return (
    <div style={{ background: '#fff', borderRadius: '16px', border: '1.5px solid var(--line)', padding: '18px', maxWidth: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderBottom: '2px solid var(--line)', paddingBottom: '12px', marginBottom: '14px' }}>
        <div>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--blue)', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase' }}>
            🏥 PHFSA &amp; CLINICAL STANDARD COMPLIANT
          </span>
          <h2 style={{ margin: '4px 0 0', color: 'var(--navy)', fontSize: '1.25rem', fontWeight: 800 }}>
            📋 Comprehensive Clinical Admission Assessment
          </h2>
          <p className="muted" style={{ margin: '2px 0 0', fontSize: '0.84rem' }}>
            Interactive tickable assessment covering medical history, biohazards, baseline vitals, Braden skin risk, and discharge planning.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="ghost sm"
            onClick={generateSoapNote}
            style={{ fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            📋 Copy SOAP Summary
          </button>
          <button
            type="button"
            className="sec sm"
            onClick={printOfficialForm}
            style={{ fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#eef6ff', color: '#0369a1', border: '1.5px solid #0284c7' }}
          >
            🖨️ Print Official PDF Form
          </button>
          <button
            type="button"
            className="pri sm"
            onClick={handleSave}
            disabled={busy}
            style={{ fontWeight: 800 }}
          >
            {busy ? 'Saving…' : '💾 Save Assessment'}
          </button>
        </div>
      </div>

      {status && <p className="status" style={{ marginBottom: '14px' }}>{status}</p>}

      {/* SECTION A & B */}
      <div className="section grey" style={{ border: '1.5px solid #90a4ae', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
        <div style={{ background: '#37474f', color: '#fff', padding: '8px 12px', fontWeight: 800, fontSize: '0.9rem' }}>
          🏢 A. FACILITY INFO &amp; 👤 B. RESIDENT PERSONAL DETAILS
        </div>
        <div style={{ padding: '14px', background: '#f8fafc' }}>
          <div className="grid3" style={{ gap: '10px', marginBottom: '10px' }}>
            <div className="f">
              <label>📅 Admission Date</label>
              <input type="date" value={formData.admission_date} onChange={(e) => setField('admission_date', e.target.value)} />
            </div>
            <div className="f">
              <label>👤 Patient Full Name</label>
              <input value={formData.name} onChange={(e) => setField('name', e.target.value)} placeholder="Full Name" />
            </div>
            <div className="f">
              <label>🆔 IC / Passport Number</label>
              <input value={formData.ic} onChange={(e) => setField('ic', e.target.value)} placeholder="e.g. 580101-07-5555" />
            </div>
          </div>

          <div className="grid4" style={{ gap: '10px', marginBottom: '10px' }}>
            <div className="f">
              <label>📊 Age</label>
              <input value={formData.age} onChange={(e) => setField('age', e.target.value)} placeholder="Age in years" />
            </div>
            <div className="f">
              <label>⚧️ Gender</label>
              <select value={formData.gender} onChange={(e) => setField('gender', e.target.value)}>
                <option value="Female">Female (女)</option>
                <option value="Male">Male (男)</option>
              </select>
            </div>
            <div className="f">
              <label>🌍 Nationality</label>
              <select value={formData.nationality} onChange={(e) => setField('nationality', e.target.value)}>
                <option value="Malaysian">Malaysian (马来西亚)</option>
                <option value="Singaporean">Singaporean (新加坡)</option>
                <option value="Indonesian">Indonesian (印尼)</option>
                <option value="Other">Other International</option>
              </select>
            </div>
            <div className="f">
              <label>💍 Marital Status</label>
              <select value={formData.marital} onChange={(e) => setField('marital', e.target.value)}>
                <option value="Married">Married (已婚)</option>
                <option value="Single">Single (单身)</option>
                <option value="Widowed">Widowed (丧偶)</option>
                <option value="Divorced">Divorced (离异)</option>
              </select>
            </div>
          </div>

          <div className="grid3" style={{ gap: '10px' }}>
            <div className="f">
              <label>🙏 Race</label>
              <select value={formData.race} onChange={(e) => setField('race', e.target.value)}>
                <option value="Chinese">Chinese (华裔)</option>
                <option value="Malay">Malay (巫裔)</option>
                <option value="Indian">Indian (印裔)</option>
                <option value="Sikh">Sikh (锡克)</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="f">
              <label>🙏 Religion</label>
              <select value={formData.religion} onChange={(e) => setField('religion', e.target.value)}>
                <option value="Buddhism">Buddhism (佛教)</option>
                <option value="Islam">Islam (伊斯兰教)</option>
                <option value="Christian">Christian (基督教)</option>
                <option value="Hindu">Hindu (印度教)</option>
                <option value="Taoism">Taoism (道教)</option>
                <option value="None">None</option>
              </select>
            </div>
            <div className="f">
              <label>📱 Primary Contact Phone</label>
              <input value={formData.phone} onChange={(e) => setField('phone', e.target.value)} placeholder="01X-XXXXXXX" />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION C */}
      <div className="section grey" style={{ border: '1.5px solid #90a4ae', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
        <div style={{ background: '#37474f', color: '#fff', padding: '8px 12px', fontWeight: 800, fontSize: '0.9rem' }}>
          👨‍👩‍👧 C. NEXT OF KIN / EMERGENCY CONTACT
        </div>
        <div style={{ padding: '14px', background: '#f8fafc' }}>
          <div className="grid3" style={{ gap: '10px', marginBottom: '10px' }}>
            <div className="f">
              <label>👤 Primary NOK Name</label>
              <input value={formData.nok_name} onChange={(e) => setField('nok_name', e.target.value)} placeholder="NOK Full Name" />
            </div>
            <div className="f">
              <label>🔗 Relationship</label>
              <select value={formData.nok_relation} onChange={(e) => setField('nok_relation', e.target.value)}>
                <option value="Spouse">Spouse (配偶)</option>
                <option value="Child">Child (子女 / Son / Daughter)</option>
                <option value="Parent">Parent (父母)</option>
                <option value="Sibling">Sibling (兄弟姐妹)</option>
                <option value="Guardian">Legal Guardian (监护人)</option>
                <option value="Friend">Friend / Caregiver</option>
              </select>
            </div>
            <div className="f">
              <label>📱 NOK Phone Number</label>
              <input value={formData.nok_phone} onChange={(e) => setField('nok_phone', e.target.value)} placeholder="01X-XXXXXXX" />
            </div>
          </div>
          <div className="f">
            <label>📍 NOK Residence Address</label>
            <input value={formData.nok_address} onChange={(e) => setField('nok_address', e.target.value)} placeholder="Home address" />
          </div>
        </div>
      </div>

      {/* SECTION D: MEDICAL CHECKLIST */}
      <div className="section grey" style={{ border: '1.5px solid #90a4ae', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
        <div style={{ background: '#37474f', color: '#fff', padding: '8px 12px', fontWeight: 800, fontSize: '0.9rem' }}>
          🩺 D. MEDICAL INFORMATION &amp; CONDITIONS (TICKABLE CHECKLIST)
        </div>
        <div style={{ padding: '14px', background: '#ffffff' }}>
          
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontWeight: 800, fontSize: '0.86rem', color: '#1e293b', display: 'block', marginBottom: '6px' }}>
              🩺 Medical Conditions (主要病症 / 勾选适用项):
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['Diabetes (糖尿病)', 'Hypertension (高血压)', 'Heart Disease (心脏病)', 'Stroke (中风)', 'Cancer (癌症)', 'Kidney Disease (肾病)', 'None (无)'].map(item => {
                const checked = isChecked('medical_conditions', item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleArrayItem('medical_conditions', item)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      border: checked ? '2px solid #0284c7' : '1px solid #cbd5e1',
                      background: checked ? '#e0f2fe' : '#f8fafc',
                      color: checked ? '#0369a1' : '#334155',
                      cursor: 'pointer'
                    }}
                  >
                    {checked ? '☑' : '☐'} {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontWeight: 800, fontSize: '0.86rem', color: '#1e293b', display: 'block', marginBottom: '6px' }}>
              🫁 Chronic Illnesses (慢性疾病):
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['Asthma (哮喘)', 'COPD (慢阻肺)', 'Arthritis (关节炎)', 'Dementia (失智/老年痴呆)', "Parkinson's (帕金森)", 'Epilepsy (癫痫)', 'None (无)'].map(item => {
                const checked = isChecked('chronic_illnesses', item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleArrayItem('chronic_illnesses', item)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      border: checked ? '2px solid #0284c7' : '1px solid #cbd5e1',
                      background: checked ? '#e0f2fe' : '#f8fafc',
                      color: checked ? '#0369a1' : '#334155',
                      cursor: 'pointer'
                    }}
                  >
                    {checked ? '☑' : '☐'} {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontWeight: 800, fontSize: '0.86rem', color: '#dc2626', display: 'block', marginBottom: '6px' }}>
              ⚠️ Allergies (药物与食物过敏史):
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['Penicillin (青霉素)', 'Aspirin (阿司匹林)', 'Seafood (海鲜)', 'Nuts (坚果)', 'Latex (乳胶)', 'None Known (无已知过敏)'].map(item => {
                const checked = isChecked('allergies_list', item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleArrayItem('allergies_list', item)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      border: checked ? '2px solid #dc2626' : '1px solid #cbd5e1',
                      background: checked ? '#fef2f2' : '#f8fafc',
                      color: checked ? '#991b1b' : '#334155',
                      cursor: 'pointer'
                    }}
                  >
                    {checked ? '☑' : '☐'} {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid2" style={{ gap: '12px', marginBottom: '14px' }}>
            <div className="f">
              <label>🚶 Mobility Status (行动能力)</label>
              <select value={formData.mobility_status} onChange={(e) => setField('mobility_status', e.target.value)}>
                <option value="Independent (完全自理)">Independent (完全自理)</option>
                <option value="Assisted (需协助/轮椅)">Assisted (需协助/轮椅)</option>
                <option value="Bedridden (完全卧床)">Bedridden (完全卧床)</option>
              </select>
            </div>
            <div className="f">
              <label>🍽️ Dietary Requirements (饮食要求)</label>
              <select value={formData.dietary_requirements[0] || 'Normal (正常饮食)'} onChange={(e) => setField('dietary_requirements', [e.target.value])}>
                <option value="Normal (正常饮食)">Normal (正常饮食)</option>
                <option value="Diabetic (糖尿病餐/低糖)">Diabetic (糖尿病餐/低糖)</option>
                <option value="Low Salt / Low Sodium (低盐)">Low Salt / Low Sodium (低盐)</option>
                <option value="Soft / Pureed (软食/流质)">Soft / Pureed (软食/流质)</option>
                <option value="Vegetarian (素食)">Vegetarian (素食)</option>
                <option value="Ryle's Tube / Enteral (管饲)">Ryle's Tube / Enteral (管饲)</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontWeight: 800, fontSize: '0.86rem', color: '#1e293b', display: 'block', marginBottom: '6px' }}>
              ⭐ Special Clinical Care Procedures (特殊护理需求):
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {[
                'Fall Prevention (防跌倒)',
                'Pressure Ulcer Care (压疮护理/翻身)',
                'Catheter Care (导尿管护理)',
                'Wound Dressing (伤口敷料更换)',
                'Feeding Tube (鼻胃管护理)',
                'Suction (抽痰护理)',
                'Tracheostomy (气切护理)',
                'Stoma Care (造口护理)',
                'None (常规基础护理)'
              ].map(item => {
                const checked = isChecked('special_care_needs', item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleArrayItem('special_care_needs', item)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      border: checked ? '2px solid #059669' : '1px solid #cbd5e1',
                      background: checked ? '#ecfdf5' : '#f8fafc',
                      color: checked ? '#065f46' : '#334155',
                      cursor: 'pointer'
                    }}
                  >
                    {checked ? '☑' : '☐'} {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="f" style={{ marginTop: '10px' }}>
            <label>📝 Additional Medical Notes &amp; History</label>
            <textarea
              rows="3"
              value={formData.additional_medical_notes}
              onChange={(e) => setField('additional_medical_notes', e.target.value)}
              placeholder="Surgical history, hospital discharge diagnosis, physician notes..."
            />
          </div>
        </div>
      </div>

      {/* SECTION RED: BIOHAZARD */}
      <div className="section red" style={{ border: '1.5px solid #ef4444', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
        <div style={{ background: '#c62828', color: '#fff', padding: '8px 12px', fontWeight: 800, fontSize: '0.9rem' }}>
          ⚠️ BIOHAZARD &amp; 🔵 OXYGEN THERAPY
        </div>
        <div style={{ padding: '14px', background: '#fff5f5' }}>
          <div className="grid2" style={{ gap: '14px' }}>
            <div>
              <label style={{ fontWeight: 800, fontSize: '0.82rem', color: '#991b1b', display: 'block', marginBottom: '6px' }}>
                🦠 Infectious Pathogens &amp; Precautions:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['HIV/AIDS', 'Hepatitis B', 'Hepatitis C', 'Tuberculosis (TB)', 'MRSA', 'COVID-19', 'Open Wounds'].map(item => {
                  const checked = isChecked('biohazard_blood', item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleArrayItem('biohazard_blood', item)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        border: checked ? '2px solid #dc2626' : '1px solid #fca5a5',
                        background: checked ? '#fee2e2' : '#fff',
                        color: checked ? '#991b1b' : '#334155',
                        cursor: 'pointer'
                      }}
                    >
                      {checked ? '☑' : '☐'} {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label style={{ fontWeight: 800, fontSize: '0.82rem', color: '#0369a1', display: 'block', marginBottom: '6px' }}>
                🫁 Oxygen Therapy &amp; Respiratory Support:
              </label>
              <div className="grid2" style={{ gap: '8px' }}>
                <div className="f">
                  <label>O2 Type</label>
                  <select value={formData.o2_type} onChange={(e) => setField('o2_type', e.target.value)}>
                    <option value="None (无需氧气)">None (无需氧气)</option>
                    <option value="Continuous (持续吸氧)">Continuous (持续吸氧)</option>
                    <option value="PRN (需要时吸氧)">PRN (需要时吸氧)</option>
                  </select>
                </div>
                <div className="f">
                  <label>Flow Rate (L/min)</label>
                  <input
                    type="number"
                    value={formData.o2_flow_rate}
                    onChange={(e) => setField('o2_flow_rate', e.target.value)}
                    placeholder="e.g. 2 - 4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION GREEN: ON ARRIVAL */}
      <div className="section green" style={{ border: '1.5px solid #22c55e', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
        <div style={{ background: '#2e7d32', color: '#fff', padding: '8px 12px', fontWeight: 800, fontSize: '0.9rem' }}>
          🏥 E. ON ARRIVAL ASSESSMENT
        </div>
        <div style={{ padding: '14px', background: '#f0fdf4' }}>
          <div className="grid3" style={{ gap: '10px', marginBottom: '10px' }}>
            <div className="f">
              <label>💭 Consciousness (意识状态)</label>
              <select value={formData.consciousness} onChange={(e) => setField('consciousness', e.target.value)}>
                <option value="Alert (清醒 / A)">Alert (清醒 / A)</option>
                <option value="Drowsy (嗜睡 / V)">Drowsy (嗜睡 / V)</option>
                <option value="Confused (意识混乱)">Confused (意识混乱)</option>
                <option value="Pain (对痛有反应 / P)">Pain (对痛有反应 / P)</option>
                <option value="Unresponsive (无反应 / U)">Unresponsive (无反应 / U)</option>
              </select>
            </div>
            <div className="f">
              <label>😣 Pain Category (疼痛等级)</label>
              <select value={formData.pain_category} onChange={(e) => setField('pain_category', e.target.value)}>
                <option value="0 None (无痛)">0 None (无痛)</option>
                <option value="1-3 Mild (轻度疼痛)">1-3 Mild (轻度疼痛)</option>
                <option value="4-6 Moderate (中度疼痛)">4-6 Moderate (中度疼痛)</option>
                <option value="7-10 Severe (重度剧痛)">7-10 Severe (重度剧痛)</option>
              </select>
            </div>
            <div className="f">
              <label>⚡ Fall Risk (跌倒风险)</label>
              <select value={formData.fall_risk_category} onChange={(e) => setField('fall_risk_category', e.target.value)}>
                <option value="Low Risk (低风险)">Low Risk (低风险)</option>
                <option value="Moderate Risk (中度风险)">Moderate Risk (中度风险)</option>
                <option value="High Risk (高风险 - 需防跌措施)">High Risk (高风险 - 需防跌措施)</option>
              </select>
            </div>
          </div>

          <div className="grid3" style={{ gap: '10px' }}>
            <div className="f">
              <label>🚑 Arrived By (到达方式)</label>
              <select value={formData.arrived_by} onChange={(e) => setField('arrived_by', e.target.value)}>
                <option value="Family Vehicle (家属接送)">Family Vehicle (家属接送)</option>
                <option value="Ambulance (救护车送达)">Ambulance (救护车送达)</option>
                <option value="Wheelchair (轮椅推入)">Wheelchair (轮椅推入)</option>
                <option value="Walk-in (自行走入)">Walk-in (自行走入)</option>
              </select>
            </div>
            <div className="f">
              <label>🍎 Nutritional Status (营养状况)</label>
              <select value={formData.nutritional_status} onChange={(e) => setField('nutritional_status', e.target.value)}>
                <option value="Well Nourished (营养良好)">Well Nourished (营养良好)</option>
                <option value="Mildly Malnourished (轻度营养不良)">Mildly Malnourished (轻度营养不良)</option>
                <option value="Moderately Malnourished (中度)">Moderately Malnourished (中度)</option>
                <option value="Severely Malnourished (重度恶液质)">Severely Malnourished (重度恶液质)</option>
              </select>
            </div>
            <div className="f">
              <label>💧 Hydration (水分状态)</label>
              <select value={formData.hydration_status} onChange={(e) => setField('hydration_status', e.target.value)}>
                <option value="Adequate (充足/正常)">Adequate (充足/正常)</option>
                <option value="Mild Dehydration (轻度缺水)">Mild Dehydration (轻度缺水)</option>
                <option value="Moderate Dehydration (中度脱水)">Moderate Dehydration (中度脱水)</option>
                <option value="Severe Dehydration (重度脱水)">Severe Dehydration (重度脱水)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION BLUE: VITALS */}
      <div className="section blue" style={{ border: '1.5px solid #0284c7', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
        <div style={{ background: '#0C3054', color: '#fff', padding: '8px 12px', fontWeight: 800, fontSize: '0.9rem' }}>
          💓 F. VITAL SIGNS BASELINE &amp; ANTHROPOMETRY
        </div>
        <div style={{ padding: '14px', background: '#f0f9ff' }}>
          <div className="grid4" style={{ gap: '10px', marginBottom: '10px' }}>
            <div className="f">
              <label>🩸 SBP (收缩压 mmHg)</label>
              <input type="number" value={formData.vital_bp_sys} onChange={(e) => setField('vital_bp_sys', e.target.value)} placeholder="120" />
            </div>
            <div className="f">
              <label>🩸 DBP (舒张压 mmHg)</label>
              <input type="number" value={formData.vital_bp_dia} onChange={(e) => setField('vital_bp_dia', e.target.value)} placeholder="80" />
            </div>
            <div className="f">
              <label>❤️ Heart Rate (心率 bpm)</label>
              <input type="number" value={formData.vital_hr} onChange={(e) => setField('vital_hr', e.target.value)} placeholder="75" />
            </div>
            <div className="f">
              <label>🫁 Resp Rate (呼吸 /min)</label>
              <input type="number" value={formData.vital_rr} onChange={(e) => setField('vital_rr', e.target.value)} placeholder="18" />
            </div>
          </div>

          <div className="grid4" style={{ gap: '10px', marginBottom: '10px' }}>
            <div className="f">
              <label>🌡️ Temp (体温 °C)</label>
              <input type="number" step="0.1" value={formData.vital_temp} onChange={(e) => setField('vital_temp', e.target.value)} placeholder="36.5" />
            </div>
            <div className="f">
              <label>📊 SpO2 (血氧 %)</label>
              <input type="number" value={formData.vital_spo2} onChange={(e) => setField('vital_spo2', e.target.value)} placeholder="98" />
            </div>
            <div className="f">
              <label>🩸 Blood Sugar (血糖 mmol/L)</label>
              <input type="number" step="0.1" value={formData.vital_glucose} onChange={(e) => setField('vital_glucose', e.target.value)} placeholder="6.5" />
            </div>
            <div className="f">
              <label>😣 Pain Score (0-10)</label>
              <input type="number" min="0" max="10" value={formData.vital_pain_score} onChange={(e) => setField('vital_pain_score', e.target.value)} />
            </div>
          </div>

          <div className="grid4" style={{ gap: '10px' }}>
            <div className="f">
              <label>📏 Height (身高 cm)</label>
              <input type="number" value={formData.vital_height} onChange={(e) => setField('vital_height', e.target.value)} placeholder="165" />
            </div>
            <div className="f">
              <label>⚖️ Weight (体重 kg)</label>
              <input type="number" value={formData.vital_weight} onChange={(e) => setField('vital_weight', e.target.value)} placeholder="60" />
            </div>
            <div className="f">
              <label>📊 Auto BMI (kg/m²)</label>
              <input value={formData.vital_bmi || '—'} readOnly style={{ background: '#e2e8f0', fontWeight: 800 }} />
            </div>
            <div className="f">
              <label>🧠 GCS Score (/15)</label>
              <select value={formData.vital_gcs} onChange={(e) => setField('vital_gcs', e.target.value)}>
                <option value="15">15 / 15 (Fully Conscious)</option>
                <option value="14">14 / 15 (Mild)</option>
                <option value="13">13 / 15 (Moderate)</option>
                <option value="12">12 / 15</option>
                <option value="11">11 / 15</option>
                <option value="10">10 / 15</option>
                <option value="9">9 / 15 (Severe Coma &lt;9)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION PURPLE: SKIN */}
      <div className="section purple" style={{ border: '1.5px solid #8b5cf6', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
        <div style={{ background: '#6a1b9a', color: '#fff', padding: '8px 12px', fontWeight: 800, fontSize: '0.9rem' }}>
          🩹 G. SKIN INTEGRITY &amp; BRADEN PRESSURE SORE ASSESSMENT
        </div>
        <div style={{ padding: '14px', background: '#faf5ff' }}>
          <div className="grid3" style={{ gap: '10px', marginBottom: '10px' }}>
            <div className="f">
              <label>🔍 Overall Skin Condition</label>
              <select value={formData.skin_overall[0] || 'Intact & Healthy (完好无损)'} onChange={(e) => setField('skin_overall', [e.target.value])}>
                <option value="Intact & Healthy (完好无损)">Intact &amp; Healthy (完好无损)</option>
                <option value="Dry & Fragile (干燥脆弱/老化)">Dry &amp; Fragile (干燥脆弱/老化)</option>
                <option value="Bruised (有瘀青)">Bruised (有瘀青)</option>
                <option value="Rash (皮疹)">Rash (皮疹)</option>
                <option value="Open Breakdown (有破损/溃疡)">Open Breakdown (有破损/溃疡)</option>
              </select>
            </div>
            <div className="f">
              <label>📊 Braden Scale Risk (压疮风险评估)</label>
              <select value={formData.braden_risk_level} onChange={(e) => setField('braden_risk_level', e.target.value)}>
                <option value="No Risk (19-23 分 无风险)">No Risk (19-23 分 无风险)</option>
                <option value="Low (15-18 分 低风险)">Low Risk (15-18 分 低风险)</option>
                <option value="Mod (13-14 分 中度风险)">Moderate Risk (13-14 分 中度风险)</option>
                <option value="High (10-12 分 高风险)">High Risk (10-12 分 高风险)</option>
                <option value="Severe (<9 分 极高风险)">Severe Risk (&lt;9 分 极高风险)</option>
              </select>
            </div>
            <div className="f">
              <label>📈 Wound Staging (伤口分期)</label>
              <select value={formData.wound_stage} onChange={(e) => setField('wound_stage', e.target.value)}>
                <option value="N/A (No Wounds)">N/A (No Wounds)</option>
                <option value="Stage 1 (Non-blanchable erythema)">Stage 1 (Non-blanchable erythema)</option>
                <option value="Stage 2 (Partial thickness)">Stage 2 (Partial thickness)</option>
                <option value="Stage 3 (Full thickness skin loss)">Stage 3 (Full thickness skin loss)</option>
                <option value="Stage 4 (Full thickness tissue loss)">Stage 4 (Full thickness tissue loss)</option>
                <option value="Unstageable (Slough / Eschar)">Unstageable (Slough / Eschar)</option>
                <option value="Deep Tissue Pressure Injury">Deep Tissue Pressure Injury</option>
              </select>
            </div>
          </div>

          <div className="grid3" style={{ gap: '10px' }}>
            <div className="f">
              <label>💧 Edema (水肿评估)</label>
              <select value={formData.edema_status} onChange={(e) => setField('edema_status', e.target.value)}>
                <option value="None (无水肿)">None (无水肿)</option>
                <option value="Mild (+1 凹陷轻微)">Mild (+1 凹陷轻微)</option>
                <option value="Moderate (+2 凹陷4mm)">Moderate (+2 凹陷4mm)</option>
                <option value="Severe (+3/+4 重度6-8mm)">Severe (+3/+4 重度6-8mm)</option>
              </select>
            </div>
            <div className="f">
              <label>📷 Photo Documentation</label>
              <select value={formData.photo_docs} onChange={(e) => setField('photo_docs', e.target.value)}>
                <option value="Taken & Uploaded to Wound Care (已拍照留档)">Taken &amp; Uploaded to Wound Care (已拍照留档)</option>
                <option value="Not Required (无伤口无需拍照)">Not Required (无伤口无需拍照)</option>
                <option value="Declined (家属婉拒)">Declined (家属婉拒)</option>
              </select>
            </div>
            <div className="f">
              <label>🩹 Existing Wound Types</label>
              <select value={formData.existing_wounds[0] || 'None (无伤口)'} onChange={(e) => setField('existing_wounds', [e.target.value])}>
                <option value="None (无伤口)">None (无伤口)</option>
                <option value="Pressure Ulcer (压疮/褥疮)">Pressure Ulcer (压疮/褥疮)</option>
                <option value="Surgical Wound (手术伤口)">Surgical Wound (手术伤口)</option>
                <option value="Diabetic Foot Ulcer (糖尿病足溃疡)">Diabetic Foot Ulcer (糖尿病足溃疡)</option>
                <option value="Venous Ulcer (静脉溃疡)">Venous Ulcer (静脉溃疡)</option>
                <option value="Skin Tear (皮肤撕裂伤)">Skin Tear (皮肤撕裂伤)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION J, L, M */}
      <div className="section green" style={{ border: '1.5px solid #16a34a', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
        <div style={{ background: '#15803d', color: '#fff', padding: '8px 12px', fontWeight: 800, fontSize: '0.9rem' }}>
          ✍️ J. LEGAL CONSENT, 🏠 L. DISCHARGE PLAN &amp; 📚 M. PATIENT EDUCATION
        </div>
        <div style={{ padding: '14px', background: '#f0fdf4' }}>
          <div style={{ marginBottom: '14px', background: '#fff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
            <b style={{ color: '#166534', fontSize: '0.86rem', display: 'block', marginBottom: '6px' }}>
              ✅ Statutory Consents &amp; Declarations:
            </b>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={formData.consent_medical} onChange={(e) => setField('consent_medical', e.target.checked)} />
                <b>Medical Treatment Consent:</b> Patient / Family consents to clinical nursing care, medication management, and dressings.
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={formData.consent_emergency_transfer} onChange={(e) => setField('consent_emergency_transfer', e.target.checked)} />
                <b>Emergency Hospital Transfer:</b> Consents to 999 ambulance / emergency clinic transfer in acute deterioration.
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={formData.consent_data_collection} onChange={(e) => setField('consent_data_collection', e.target.checked)} />
                <b>PDPA 2010 Data Protection:</b> Consents to clinical data processing and confidential medical archiving.
              </label>
            </div>
          </div>

          <div className="grid3" style={{ gap: '10px', marginBottom: '14px' }}>
            <div className="f">
              <label>📋 Discharge Plan Type</label>
              <select value={formData.discharge_type} onChange={(e) => setField('discharge_type', e.target.value)}>
                <option value="Home (居家长期护理)">Home (居家长期护理)</option>
                <option value="Hospital Transfer (转院治疗)">Hospital Transfer (转院治疗)</option>
                <option value="Daycare (日间照护)">Daycare (日间照护)</option>
                <option value="Other Facility">Other Nursing Facility</option>
              </select>
            </div>
            <div className="f">
              <label>🩺 Planned Patient Condition</label>
              <select value={formData.discharge_condition} onChange={(e) => setField('discharge_condition', e.target.value)}>
                <option value="Stable (病情平稳)">Stable (病情平稳)</option>
                <option value="Improved (明显好转)">Improved (明显好转)</option>
                <option value="Palliative Care (姑息疗护)">Palliative Care (姑息疗护)</option>
              </select>
            </div>
            <div className="f">
              <label>🏠 Home Care Requirements</label>
              <select value={formData.discharge_home_care} onChange={(e) => setField('discharge_home_care', e.target.value)}>
                <option value="Professional Home Nursing (专业居家护理)">Professional Home Nursing (专业居家护理)</option>
                <option value="Hired Caregiver (全职护工)">Hired Caregiver (全职护工)</option>
                <option value="Family (家属自行照护)">Family (家属自行照护)</option>
                <option value="Independent (完全自理)">Independent (完全自理)</option>
              </select>
            </div>
          </div>

          <div style={{ background: '#fff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #fed7aa' }}>
            <b style={{ color: '#c2410c', fontSize: '0.86rem', display: 'block', marginBottom: '6px' }}>
              📚 Patient &amp; Family Education (健康宣教):
            </b>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
              {[
                'Medication Management (药物管理)',
                'Wound Care (伤口护理)',
                'Fall Prevention (防跌倒宣教)',
                'Infection Control (感染控制/手卫生)',
                'Signs to Seek Help (急症识别与求助)',
                'Diet & Nutrition (饮食指导)',
                'Catheter Care (导尿管/引流管照护)'
              ].map(item => {
                const checked = isChecked('edu_topics', item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleArrayItem('edu_topics', item)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      border: checked ? '2px solid #ea580c' : '1px solid #fed7aa',
                      background: checked ? '#fff7ed' : '#fff',
                      color: checked ? '#c2410c' : '#334155',
                      cursor: 'pointer'
                    }}
                  >
                    {checked ? '☑' : '☐'} {item}
                  </button>
                );
              })}
            </div>

            <div className="grid2" style={{ gap: '10px' }}>
              <div className="f">
                <label>✅ Education Understanding</label>
                <select value={formData.edu_understanding} onChange={(e) => setField('edu_understanding', e.target.value)}>
                  <option value="Verbalizes Understanding (家属口头理解并掌握)">Verbalizes Understanding (家属口头理解并掌握)</option>
                  <option value="Return Demonstration (家属回示范操作合格)">Return Demonstration (家属回示范操作合格)</option>
                  <option value="Needs Reinforcement (需再次宣教强化)">Needs Reinforcement (需再次宣教强化)</option>
                </select>
              </div>
              <div className="f">
                <label>👨‍🏫 Verified / Assessed by Nurse</label>
                <input value={formData.verified_by} onChange={(e) => setField('verified_by', e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
        <button
          type="button"
          className="ghost"
          onClick={onCancel}
          style={{ fontWeight: 700 }}
        >
          ✕ Cancel / Back
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className="sec"
            onClick={printOfficialForm}
            style={{ fontWeight: 700, background: '#eef6ff', color: '#0369a1', border: '1.5px solid #0284c7' }}
          >
            🖨️ Print Official PDF Form
          </button>
          <button
            type="button"
            className="pri"
            onClick={handleSave}
            disabled={busy}
            style={{ fontWeight: 800, padding: '10px 20px' }}
          >
            {busy ? 'Saving…' : '💾 Complete & Save Assessment'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Assura Nursing Care — Clinical Laboratory Reference Ranges & Critical Values Library

export const LAB_PANELS = [
  {
    id: 'abg',
    name: '🩸 Arterial Blood Gas (ABG 血气分析)',
    shortName: 'ABG',
    params: [
      { key: 'ph', name: 'pH (酸碱度)', unit: '', min: 7.35, max: 7.45, critLow: 7.20, critHigh: 7.60,
        panicAdviceLow: 'Severe Acidemia: Risk of myocardial depression & arrhythmia. Check PaCO2 (respiratory) vs HCO3/Lactate (metabolic). Notify MO/Consultant stat.',
        panicAdviceHigh: 'Severe Alkalemia: Risk of tetany, hypokalemia & seizure. Adjust minute ventilation or correct metabolic cause.' },
      { key: 'paco2', name: 'PaCO₂ (二氧化碳分压)', unit: 'mmHg', min: 35, max: 45, critLow: 20, critHigh: 60,
        panicAdviceLow: 'Severe Hypocapnia: Hyperventilation or respiratory alkalosis.',
        panicAdviceHigh: 'Severe Hypercapnia (Type II Respiratory Failure): Risk of CO2 narcosis/coma. Standby bag-valve-mask / BiPAP / Ventilator.' },
      { key: 'pao2', name: 'PaO₂ (氧分压)', unit: 'mmHg', min: 80, max: 100, critLow: 60, critHigh: null,
        panicAdviceLow: 'Severe Hypoxemia (Type I Respiratory Failure): Increase FiO2 immediately. Check airway, position upright, auscultate lungs.' },
      { key: 'hco3', name: 'HCO₃⁻ (碳酸氢根)', unit: 'mmol/L', min: 22, max: 26, critLow: 10, critHigh: 40,
        panicAdviceLow: 'Severe Metabolic Acidosis (DKA / Sepsis / Renal Failure). Check Anion Gap & Lactate.',
        panicAdviceHigh: 'Severe Metabolic Alkalosis: Check for volume depletion, diuretic excess, or severe vomiting.' },
      { key: 'be', name: 'Base Excess (BE 碱剩余)', unit: 'mmol/L', min: -2.0, max: 2.0, critLow: -10.0, critHigh: 10.0,
        panicAdviceLow: 'Marked base deficit: Severe metabolic acidosis.',
        panicAdviceHigh: 'Marked base excess: Severe metabolic alkalosis.' },
      { key: 'sao2', name: 'SaO₂ (动脉血氧饱和度)', unit: '%', min: 95, max: 100, critLow: 88, critHigh: null,
        panicAdviceLow: 'Severe desaturation: Target >92% (>88% for COPD). Check O2 flow & interface.' },
      { key: 'lactate', name: 'Lactate (血乳酸)', unit: 'mmol/L', min: 0.5, max: 2.0, critLow: null, critHigh: 4.0,
        panicAdviceHigh: '🚨 CRITICAL LACTATE > 4.0 (Septic Shock / Tissue Hypoperfusion): Start fluid resuscitation, blood cultures & broad-spectrum IV antibiotics per Sepsis Six protocol.' },
      { key: 'pf_ratio', name: 'P/F Ratio (PaO₂ / FiO₂)', unit: 'mmHg', min: 300, max: 500, critLow: 200, critHigh: null,
        panicAdviceLow: 'ARDS Alert: P/F < 200 indicates Moderate-to-Severe ARDS. Implement lung-protective ventilation (6 mL/kg PBW).' }
    ]
  },
  {
    id: 'fbc',
    name: '🩸 Full Blood Count (FBC / CBC 全血细胞)',
    shortName: 'FBC',
    params: [
      { key: 'hb', name: 'Hemoglobin (Hb 血红蛋白)', unit: 'g/dL', min: 12.0, max: 16.0, critLow: 7.0, critHigh: 20.0,
        panicAdviceLow: '🚨 CRITICAL ANEMIA (Hb < 7.0): Transfusion threshold. Check active bleeding, hematuria, melena. Group & Crossmatch standby.',
        panicAdviceHigh: 'Severe Polycythemia: Risk of hyperviscosity and thrombosis. Hydrate and notify physician.' },
      { key: 'wbc', name: 'White Blood Cell (WBC 白细胞)', unit: '×10⁹/L', min: 4.0, max: 11.0, critLow: 2.0, critHigh: 30.0,
        panicAdviceLow: '🚨 CRITICAL LEUKOPENIA / NEUTROPENIA: Severe infection/sepsis risk. Implement reverse barrier nursing / neutropenic precautions.',
        panicAdviceHigh: 'Severe Leukocytosis / Leukemoid Reaction: Severe bacterial sepsis / hematologic emergency.' },
      { key: 'plt', name: 'Platelets (PLT 血小板)', unit: '×10⁹/L', min: 150, max: 400, critLow: 50, critHigh: 1000,
        panicAdviceLow: '🚨 CRITICAL THROMBOCYTOPENIA (PLT < 50): High risk of spontaneous hemorrhage (mucosal, GI, intracranial). Fall prevention & soft toothbrush.',
        panicAdviceHigh: 'Severe Thrombocytosis: High arterial/venous thrombotic risk.' },
      { key: 'hct', name: 'Hematocrit (HCT / PCV 红细胞比容)', unit: '%', min: 36, max: 48, critLow: 21, critHigh: 60,
        panicAdviceLow: 'Severe Anemia / Hemodilution.', panicAdviceHigh: 'Severe Hemoconcentration / Dehydration.' },
      { key: 'neut', name: 'Neutrophils (中性粒细胞)', unit: '%', min: 40, max: 75, critLow: 20, critHigh: 85,
        panicAdviceLow: 'Neutropenia.', panicAdviceHigh: 'Neutrophilia: Active acute bacterial infection or stress.' },
      { key: 'lymph', name: 'Lymphocytes (淋巴细胞)', unit: '%', min: 20, max: 45, critLow: 10, critHigh: 55,
        panicAdviceLow: 'Lymphopenia.', panicAdviceHigh: 'Lymphocytosis: Viral infection or chronic lymphoproliferative disorder.' }
    ]
  },
  {
    id: 'renal',
    name: '🧪 Renal Profile & Electrolytes (RP / 肾功能与电解质)',
    shortName: 'Renal/Electrolytes',
    params: [
      { key: 'k', name: 'Potassium (K⁺ 钾)', unit: 'mmol/L', min: 3.5, max: 5.0, critLow: 2.8, critHigh: 6.0,
        panicAdviceLow: '🚨 CRITICAL HYPOKALEMIA (< 2.8): High risk of ventricular arrhythmias, U-waves, muscle paralysis. Urgent IV KCL infusion with continuous cardiac monitoring.',
        panicAdviceHigh: '🚨 CRITICAL HYPERKALEMIA (> 6.0): High risk of Tall T-waves, PR prolongation, VFib / Asystole! Stat 12-lead ECG, standby 10% Calcium Gluconate & IV Insulin-Dextrose.' },
      { key: 'na', name: 'Sodium (Na⁺ 钠)', unit: 'mmol/L', min: 135, max: 145, critLow: 120, critHigh: 160,
        panicAdviceLow: '🚨 CRITICAL HYPONATREMIA (< 120): High risk of cerebral edema, confusion, seizure, coma. Fluid restriction / hypertonic saline per doctor protocol.',
        panicAdviceHigh: '🚨 CRITICAL HYPERNATREMIA (> 160): Risk of osmotic demyelination / intracranial hemorrhage. Hydrate cautiously.' },
      { key: 'creat', name: 'Serum Creatinine (肌酐)', unit: 'µmol/L', min: 50, max: 110, critLow: null, critHigh: 350,
        panicAdviceHigh: '🚨 ACUTE KIDNEY INJURY / UREMIA: Creatinine markedly elevated or acute doubling. Strict I/O monitoring, withhold nephrotoxic medications, nephrology review.' },
      { key: 'urea', name: 'Blood Urea (尿素氮)', unit: 'mmol/L', min: 2.5, max: 7.1, critLow: null, critHigh: 20.0,
        panicAdviceHigh: 'Marked Uremia: Assess hydration, GI bleeding, or acute renal impairment.' },
      { key: 'egfr', name: 'eGFR (肾小球滤过率)', unit: 'mL/min', min: 60, max: 120, critLow: 15, critHigh: null,
        panicAdviceLow: '🚨 END-STAGE RENAL FAILURE (eGFR < 15): Dialysis assessment required.' },
      { key: 'ca', name: 'Total Calcium (Ca²⁺ 钙)', unit: 'mmol/L', min: 2.15, max: 2.55, critLow: 1.75, critHigh: 3.00,
        panicAdviceLow: '🚨 CRITICAL HYPOCALCEMIA: Risk of tetany, laryngospasm, QT prolongation. Check Chvostek / Trousseau signs.',
        panicAdviceHigh: '🚨 CRITICAL HYPERCALCEMIA (> 3.00): Hypercalcemic crisis (confusion, cardiac shortening). Aggressive IV hydration.' },
      { key: 'mg', name: 'Magnesium (Mg²⁺ 镁)', unit: 'mmol/L', min: 0.70, max: 1.05, critLow: 0.50, critHigh: 1.80,
        panicAdviceLow: 'Critical Hypomagnesemia: Risk of Torsades de Pointes & refractory hypokalemia. IV MgSO4 replacement.',
        panicAdviceHigh: 'Critical Hypermagnesemia: Loss of deep tendon reflexes, respiratory depression.' },
      { key: 'po4', name: 'Phosphate (PO₄ 磷)', unit: 'mmol/L', min: 0.80, max: 1.50, critLow: 0.40, critHigh: 2.50,
        panicAdviceLow: 'Severe Hypophosphatemia: Risk of respiratory muscle weakness, hemolysis.',
        panicAdviceHigh: 'Severe Hyperphosphatemia: Common in advanced CKD.' }
    ]
  },
  {
    id: 'lft',
    name: '🧪 Liver Function Test (LFT / 肝功能)',
    shortName: 'LFT',
    params: [
      { key: 't_bili', name: 'Total Bilirubin (总胆红素)', unit: 'µmol/L', min: 3, max: 21, critLow: null, critHigh: 80,
        panicAdviceHigh: 'Severe Hyperbilirubinemia / Deep Jaundice: Evaluate biliary obstruction or acute liver failure.' },
      { key: 'alt', name: 'ALT / SGPT (谷丙转氨酶)', unit: 'U/L', min: 7, max: 56, critLow: null, critHigh: 500,
        panicAdviceHigh: '🚨 ACUTE HEPATITIS / DRUG-INDUCED LIVER INJURY (ALT > 500): Check paracetamol levels, viral hepatitis panel, stop hepatotoxic drugs.' },
      { key: 'ast', name: 'AST / SGOT (谷草转氨酶)', unit: 'U/L', min: 10, max: 40, critLow: null, critHigh: 500,
        panicAdviceHigh: 'Severe transaminitis: Acute hepatic necrosis, severe ischemic hepatitis, or rhabdomyolysis.' },
      { key: 'alp', name: 'Alkaline Phosphatase (ALP 碱性磷酸酶)', unit: 'U/L', min: 44, max: 147, critLow: null, critHigh: 500,
        panicAdviceHigh: 'Marked cholestasis or bone pathology.' },
      { key: 'alb', name: 'Albumin (白蛋白)', unit: 'g/L', min: 35, max: 50, critLow: 20, critHigh: null,
        panicAdviceLow: '🚨 SEVERE HYPOALBUMINEMIA (< 20 g/L): Severe peripheral edema, ascites, delayed wound healing, poor drug binding.' },
      { key: 'tp', name: 'Total Protein (总蛋白)', unit: 'g/L', min: 60, max: 80, critLow: 45, critHigh: 95 }
    ]
  },
  {
    id: 'coag',
    name: '🩸 Coagulation & INR Profile (凝血功能)',
    shortName: 'Coagulation',
    params: [
      { key: 'inr', name: 'INR (国际标准化比值)', unit: '', min: 0.8, max: 1.2, critLow: null, critHigh: 4.5,
        panicAdviceHigh: '🚨 CRITICAL INR > 4.5 (Major Hemorrhage Risk): If on Warfarin, withhold dose, notify doctor for Vitamin K1 (Phytomenadione) / Prothrombin Complex Concentrate.' },
      { key: 'pt', name: 'PT (凝血酶原时间)', unit: 'seconds', min: 11.0, max: 13.5, critLow: null, critHigh: 30.0,
        panicAdviceHigh: 'Marked PT prolongation: Bleeding precaution.' },
      { key: 'aptt', name: 'APTT (部分凝血活酶时间)', unit: 'seconds', min: 25.0, max: 35.0, critLow: null, critHigh: 70.0,
        panicAdviceHigh: 'Marked APTT prolongation: Bleeding risk (or Heparin over-anticoagulation).' },
      { key: 'd_dimer', name: 'D-Dimer (D-二聚体)', unit: 'µg/mL FEU', min: 0.0, max: 0.50, critLow: null, critHigh: 5.0,
        panicAdviceHigh: 'Markedly elevated D-Dimer: Evaluate for DVT, Pulmonary Embolism, or Disseminated Intravascular Coagulation (DIC).' }
    ]
  },
  {
    id: 'biomarkers',
    name: '🔬 Cardiac, Inflammatory & Metabolic (心肌/感染标志物/血糖)',
    shortName: 'Biomarkers',
    params: [
      { key: 'trop', name: 'Troponin I / T (肌钙蛋白)', unit: 'ng/mL', min: 0.0, max: 0.04, critLow: null, critHigh: 0.04,
        panicAdviceHigh: '🚨 CRITICAL POSITIVE TROPONIN: Acute Myocardial Infarction / Myocardial Necrosis Alert! Immediate 12-lead ECG, give Oxygen if SpO2 < 94%, notify emergency/cardiology.' },
      { key: 'crp', name: 'hs-CRP (C反应蛋白)', unit: 'mg/L', min: 0.0, max: 5.0, critLow: null, critHigh: 50.0,
        panicAdviceHigh: 'Severe Systemic Inflammation / Bacterial Infection (> 50 mg/L).' },
      { key: 'pct', name: 'Procalcitonin (降钙素原 PCT)', unit: 'ng/mL', min: 0.0, max: 0.25, critLow: null, critHigh: 2.0,
        panicAdviceHigh: '🚨 CRITICAL PROCALCITONIN > 2.0: Severe systemic bacterial infection / Sepsis / Septic Shock alert. Urgent blood cultures and IV antibiotics.' },
      { key: 'bnp', name: 'BNP / NT-proBNP (脑钠肽)', unit: 'pg/mL', min: 0, max: 100, critLow: null, critHigh: 900,
        panicAdviceHigh: 'Acute Decompensated Heart Failure.' },
      { key: 'fbs', name: 'Fasting Blood Glucose (空腹血糖)', unit: 'mmol/L', min: 3.9, max: 6.1, critLow: 3.0, critHigh: 15.0,
        panicAdviceLow: '🚨 CRITICAL HYPOGLYCEMIA: Rule of 15 (15g fast-acting carbs) or IV 50% Dextrose if unconscious.',
        panicAdviceHigh: 'Severe Hyperglycemia.' },
      { key: 'rbs', name: 'Random Blood Glucose (随机血糖)', unit: 'mmol/L', min: 4.0, max: 8.0, critLow: 3.0, critHigh: 20.0,
        panicAdviceLow: '🚨 CRITICAL HYPOGLYCEMIA (< 3.0 mmol/L): Hypoglycemic coma risk! Give oral glucose/IV Dextrose stat.',
        panicAdviceHigh: '🚨 CRITICAL HYPERGLYCEMIA (> 20.0 mmol/L): Risk of DKA or Hyperosmolar Hyperglycemic State (HHS). Check urine ketones, hydrate & notify physician.' },
      { key: 'hba1c', name: 'HbA1c (糖化血红蛋白)', unit: '%', min: 4.0, max: 6.0, critLow: null, critHigh: 10.0 }
    ]
  }
];

export function getParamDef(key) {
  for (const panel of LAB_PANELS) {
    const p = panel.params.find(x => x.key === key);
    if (p) return { ...p, panelId: panel.id, panelName: panel.shortName };
  }
  return null;
}

export function evaluateLabParam(key, rawVal) {
  if (rawVal === '' || rawVal == null) return { status: 'empty', label: '—' };
  const num = typeof rawVal === 'number' ? rawVal : parseFloat(String(rawVal).replace(/[^0-9.-]/g, ''));
  if (isNaN(num)) return { status: 'text', label: String(rawVal), val: String(rawVal) };

  const def = getParamDef(key);
  if (!def) return { status: 'normal', val: num, label: String(num) };

  if (def.critLow != null && num <= def.critLow) {
    return {
      status: 'crit_low',
      badge: '🚨 CRITICAL LOW',
      color: '#ffffff',
      bg: '#dc2626',
      borderColor: '#991b1b',
      val: num,
      def,
      advice: def.panicAdviceLow || ('Critical low value below ' + def.critLow + ' ' + def.unit + '. Alert attending doctor.')
    };
  }
  if (def.critHigh != null && num >= def.critHigh) {
    return {
      status: 'crit_high',
      badge: '🚨 CRITICAL HIGH',
      color: '#ffffff',
      bg: '#dc2626',
      borderColor: '#991b1b',
      val: num,
      def,
      advice: def.panicAdviceHigh || ('Critical high value above ' + def.critHigh + ' ' + def.unit + '. Alert attending doctor.')
    };
  }

  if (def.min != null && num < def.min) {
    return {
      status: 'low',
      badge: '↓ LOW',
      color: '#92400e',
      bg: '#fef3c7',
      borderColor: '#f59e0b',
      val: num,
      def,
      advice: 'Low: Below normal reference limit (' + def.min + ' ' + def.unit + ').'
    };
  }
  if (def.max != null && num > def.max) {
    return {
      status: 'high',
      badge: '↑ HIGH',
      color: '#92400e',
      bg: '#fef3c7',
      borderColor: '#f59e0b',
      val: num,
      def,
      advice: 'High: Above normal reference limit (' + def.max + ' ' + def.unit + ').'
    };
  }

  return {
    status: 'normal',
    badge: '✓ NORMAL',
    color: '#166534',
    bg: '#dcfce7',
    borderColor: '#86efac',
    val: num,
    def,
    advice: 'Normal: Within standard limits (' + def.min + ' – ' + def.max + ' ' + def.unit + ').'
  };
}

export function evaluateLabSet(readings) {
  const criticals = [];
  const abnormals = [];
  const normals = [];

  Object.entries(readings || {}).forEach(([k, v]) => {
    if (v === '' || v == null) return;
    const res = evaluateLabParam(k, v);
    if (res.status === 'crit_low' || res.status === 'crit_high') criticals.push({ key: k, ...res });
    else if (res.status === 'low' || res.status === 'high') abnormals.push({ key: k, ...res });
    else if (res.status === 'normal') normals.push({ key: k, ...res });
  });

  const overall = criticals.length > 0 ? 'critical' : abnormals.length > 0 ? 'abnormal' : 'normal';
  return { overall, criticals, abnormals, normals };
}

export function generateSbarSummary(patient, panelTitle, dateStr, readings, criticals) {
  const pName = (patient && patient.name) || 'Patient';
  const pAge = (patient && patient.age) ? ('(' + patient.age + 'yo)') : '';
  const pDx = (patient && (patient.notes || patient.care_type)) || 'Care';

  let txt = '🚨 *ASSURA CLINICAL ALERT: CRITICAL LAB RESULT*\n';
  txt += '━━━━━━━━━━━━━━━━━━━━━\n';
  txt += '👤 *Patient:* ' + pName + ' ' + pAge + '\n';
  txt += '📋 *Diagnosis/Care:* ' + pDx + '\n';
  txt += '🧪 *Test Panel:* ' + panelTitle + '\n';
  txt += '📅 *Date/Time:* ' + dateStr + '\n\n';

  txt += '⚠️ *CRITICAL / PANIC VALUES FOUND:*\n';
  (criticals || []).forEach(c => {
    txt += '• *' + ((c.def && c.def.name) || c.key) + ':* ' + c.val + ' ' + ((c.def && c.def.unit) || '') + ' (' + c.badge + ')\n';
    txt += '  ↳ _Action Directive:_ ' + c.advice + '\n';
  });

  txt += '\n📊 *Full Panel Summary:*\n';
  Object.entries(readings || {}).forEach(([k, v]) => {
    if (v === '' || v == null) return;
    const ev = evaluateLabParam(k, v);
    txt += '• ' + ((ev.def && ev.def.name) || k) + ': ' + v + ' ' + ((ev.def && ev.def.unit) || '') + ' [' + (ev.badge || 'Normal') + ']\n';
  });

  txt += '\n👩‍⚕️ *Nursing Action Taken:* Attending doctor notified for urgent review and directive.';
  return txt;
}

export function buildLongitudinalMatrix(docs) {
  const labDocs = (docs || []).filter(d => {
    if (d.doc_type === 'lab_results') return true;
    if (d.doc_type === 'uploaded_file' && d.content && d.content.readings && Object.keys(d.content.readings).length > 0) return true;
    return false;
  }).sort((a, b) => (a.created_at || 0) - (b.created_at || 0));

  if (!labDocs.length) return { columns: [], rows: [] };

  const columns = labDocs.map(d => {
    const c = d.content || {};
    const dt = c.test_date || (d.created_at ? new Date(d.created_at).toLocaleDateString('en-GB') : '—');
    const tm = c.test_time || (d.created_at ? new Date(d.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '');
    return {
      id: d.id,
      title: d.title || 'Lab Test',
      panelId: c.panel_id || 'general',
      dateStr: dt + (tm ? (' ' + tm) : ''),
      created_at: d.created_at,
      readings: c.readings || {},
      evaluation: evaluateLabSet(c.readings || {})
    };
  });

  const allKeys = new Set();
  columns.forEach(col => {
    Object.keys(col.readings || {}).forEach(k => allKeys.add(k));
  });

  const rows = [];
  LAB_PANELS.forEach(panel => {
    const panelParams = panel.params.filter(p => allKeys.has(p.key));
    if (panelParams.length > 0) {
      panelParams.forEach(param => {
        const values = columns.map(col => {
          const raw = col.readings[param.key];
          if (raw === '' || raw == null) return null;
          return evaluateLabParam(param.key, raw);
        });

        const activeVals = values.filter(v => v !== null && typeof v.val === 'number');
        let delta = null;
        if (activeVals.length >= 2) {
          const prev = activeVals[activeVals.length - 2].val;
          const curr = activeVals[activeVals.length - 1].val;
          const diff = curr - prev;
          const pct = prev !== 0 ? ((diff / prev) * 100).toFixed(1) : null;
          delta = { diff: diff.toFixed(2), pct, direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'same' };
        }

        rows.push({
          panelId: panel.id,
          panelName: panel.shortName,
          key: param.key,
          name: param.name,
          unit: param.unit,
          refRange: (param.min != null ? param.min : '') + ' – ' + (param.max != null ? param.max : '') + ' ' + (param.unit || ''),
          values,
          delta
        });
      });
    }
  });

  return { columns, rows };
}
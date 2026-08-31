import { useState, useEffect } from 'react';
import SignaturePad from './SignaturePad.jsx';

export default function ClinicalFormsModal({ caseId, patientName, initialDoc = 'braden', onClose, onSaved, me }) {
  const [activeTab, setActiveTab] = useState(initialDoc); // 'braden', 'morse', 'bristol', 'restraint', 'death'
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const flash = (m) => { setStatusMsg(m); setTimeout(() => setStatusMsg(''), 3500); };

  async function loadDocs() {
    setLoading(true);
    try {
      const res = await fetch(`/api/clinical_docs?case_id=${encodeURIComponent(caseId)}`, { credentials: 'same-origin' });
      const data = await res.json().catch(() => ({}));
      setDocs(data.documents || []);
    } catch (_) {}
    setLoading(false);
  }

  useEffect(() => {
    loadDocs();
  }, [caseId]);

  // Filter docs by type
  const bradenDocs = docs.filter((d) => d.doc_type === 'braden');
  const morseDocs = docs.filter((d) => d.doc_type === 'morse');
  const bristolDocs = docs.filter((d) => d.doc_type === 'bristol');
  const restraintDocs = docs.filter((d) => d.doc_type === 'restraint');
  const deathDocs = docs.filter((d) => d.doc_type === 'death');

  /* -------------------------------------------------------------
     1. BRADEN PRESSURE ULCER SCALE & TURNING CHART STATE
  ------------------------------------------------------------- */
  const [bradenForm, setBradenForm] = useState({
    sensory: 3, // 1-4
    moisture: 3, // 1-4
    activity: 2, // 1-4
    mobility: 2, // 1-4
    nutrition: 3, // 1-4
    friction: 2, // 1-3
    turning_active: true,
    air_mattress: true,
    barrier_cream: true,
    notes: '',
  });

  const [turnPosition, setTurnPosition] = useState('left_lateral');
  const [turnSkin, setTurnSkin] = useState('intact');
  const [turnNotes, setTurnNotes] = useState('');

  const bradenScore = Number(bradenForm.sensory) + Number(bradenForm.moisture) + Number(bradenForm.activity) +
    Number(bradenForm.mobility) + Number(bradenForm.nutrition) + Number(bradenForm.friction);

  function bradenRiskLevel(score) {
    if (score <= 9) return { lvl: 'Very High Risk (极高风险)', col: '#dc2626', bg: '#fef2f2' };
    if (score <= 12) return { lvl: 'High Risk (高风险)', col: '#ea580c', bg: '#fff7ed' };
    if (score <= 14) return { lvl: 'Moderate Risk (中度风险)', col: '#ca8a04', bg: '#fefce8' };
    if (score <= 18) return { lvl: 'Mild Risk (轻度风险)', col: '#2563eb', bg: '#eff6ff' };
    return { lvl: 'No / Low Risk (无明显风险)', col: '#16a34a', bg: '#f0fdf4' };
  }

  async function saveBradenAssessment() {
    setBusy(true);
    setErr('');
    try {
      const risk = bradenRiskLevel(bradenScore);
      const payload = {
        case_id: caseId,
        doc_type: 'braden',
        title: `Braden Score: ${bradenScore}/23 (${risk.lvl})`,
        content: {
          ...bradenForm,
          score: bradenScore,
          risk: risk.lvl,
          assessed_by: me?.name || 'Nurse',
          assessed_at: Date.now(),
        },
      };
      const res = await fetch('/api/clinical_docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save Braden assessment');
      flash('✓ Braden Pressure Sore Risk Assessment recorded.');
      loadDocs();
      if (onSaved) onSaved();
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function logTurningRecord() {
    setBusy(true);
    try {
      const payload = {
        case_id: caseId,
        doc_type: 'turning_log',
        title: `2H Turn: ${turnPosition.replace('_', ' ').toUpperCase()} (${turnSkin})`,
        content: {
          position: turnPosition,
          skin: turnSkin,
          notes: turnNotes,
          logged_at: Date.now(),
          logged_by: me?.name || 'Nurse',
        },
      };
      const res = await fetch('/api/clinical_docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to log position turn');
      flash('✓ 2-Hourly Position Turn & Skin Check recorded.');
      setTurnNotes('');
      loadDocs();
      if (onSaved) onSaved();
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  /* -------------------------------------------------------------
     2. MORSE FALL RISK SCALE STATE
  ------------------------------------------------------------- */
  const [morseForm, setMorseForm] = useState({
    history_fall: 0, // 0 or 25
    secondary_dx: 15, // 0 or 15
    ambulatory_aid: 15, // 0, 15, 30
    iv_lock: 0, // 0 or 20
    gait: 10, // 0, 10, 20
    mental: 0, // 0 or 15
    bed_rails: true,
    call_bell_reach: true,
    non_slip_socks: true,
    two_person_assist: false,
    notes: '',
  });

  const morseScore = Number(morseForm.history_fall) + Number(morseForm.secondary_dx) +
    Number(morseForm.ambulatory_aid) + Number(morseForm.iv_lock) + Number(morseForm.gait) + Number(morseForm.mental);

  function morseRiskLevel(score) {
    if (score >= 51) return { lvl: 'High Fall Risk (高跌倒风险 - 实施全面防跌措施)', col: '#dc2626', bg: '#fef2f2' };
    if (score >= 25) return { lvl: 'Moderate Fall Risk (中度跌倒风险 - 标准防跌照护)', col: '#ea580c', bg: '#fff7ed' };
    return { lvl: 'Low Fall Risk (低跌倒风险 - 常规安全照护)', col: '#16a34a', bg: '#f0fdf4' };
  }

  async function saveMorseAssessment() {
    setBusy(true);
    setErr('');
    try {
      const risk = morseRiskLevel(morseScore);
      const payload = {
        case_id: caseId,
        doc_type: 'morse',
        title: `Morse Fall Score: ${morseScore} (${risk.lvl.split(' ')[0]})`,
        content: {
          ...morseForm,
          score: morseScore,
          risk: risk.lvl,
          assessed_by: me?.name || 'Nurse',
          assessed_at: Date.now(),
        },
      };
      const res = await fetch('/api/clinical_docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save Morse fall assessment');
      flash('✓ Morse Fall Risk Assessment & Prevention Care Plan recorded.');
      loadDocs();
      if (onSaved) onSaved();
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  /* -------------------------------------------------------------
     3. BRISTOL STOOL & BOWEL MANAGEMENT STATE
  ------------------------------------------------------------- */
  const [bristolForm, setBristolForm] = useState({
    type: 4, // 1 to 7
    amount: 'moderate', // small, moderate, large
    color: 'brown', // brown, yellow, black_tarry, clay, red_blood
    bno_days: 0,
    intervention: 'none', // none, lactulose, senna, bisacodyl_supp, fleet_enema, manual_evacuation
    notes: '',
  });

  const BRISTOL_TYPES = [
    { type: 1, desc: 'Type 1: Separate hard lumps, like nuts (hard to pass) — 严重便秘 (坚硬羊粪状)' },
    { type: 2, desc: 'Type 2: Sausage-shaped, but lumpy — 轻度便秘 (凹凸块状香肠)' },
    { type: 3, desc: 'Type 3: Like a sausage with cracks on surface — 正常 (表面有裂痕香肠)' },
    { type: 4, desc: 'Type 4: Like a sausage or snake, smooth and soft — 理想健康便 (光滑柔软)' },
    { type: 5, desc: 'Type 5: Soft blobs with clear-cut edges — 缺乏膳食纤维 (柔软分段块状)' },
    { type: 6, desc: 'Type 6: Fluffy pieces with ragged edges, mushy — 轻度腹泻 (糊状松散块)' },
    { type: 7, desc: 'Type 7: Watery, no solid pieces, entirely liquid — 严重腹泻 (完全水样便)' },
  ];

  async function saveBristolLog() {
    setBusy(true);
    setErr('');
    try {
      const payload = {
        case_id: caseId,
        doc_type: 'bristol',
        title: `Bowel Log: Bristol Type ${bristolForm.type} (${bristolForm.amount})`,
        content: {
          ...bristolForm,
          logged_by: me?.name || 'Nurse',
          logged_at: Date.now(),
        },
      };
      const res = await fetch('/api/clinical_docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to record Bristol bowel log');
      flash('✓ Bristol Stool & Bowel log recorded successfully.');
      loadDocs();
      if (onSaved) onSaved();
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  /* -------------------------------------------------------------
     4. PHYSICAL RESTRAINT / SAFETY MITTENS & CONSENT STATE
  ------------------------------------------------------------- */
  const [restraintForm, setRestraintForm] = useState({
    indication: 'prevent_extubation_ng_tube',
    type: 'safety_mittens',
    alternatives: 'Verbal reorientation, family bedside presence, sensory diversion attempted but patient repeatedly pulling tube.',
    doctor_dr: '',
    doctor_mmc: '',
    family_name: '',
    family_ic: '',
    family_rel: 'son_daughter',
  });

  async function handleRestraintSignatureSave(sigData) {
    if (!restraintForm.family_name.trim()) { setErr('Family / NOK name is required'); return; }
    setBusy(true);
    setErr('');
    try {
      const payload = {
        case_id: caseId,
        doc_type: 'restraint',
        title: `Restraint / Mittens Consent: ${restraintForm.type.replace('_', ' ').toUpperCase()}`,
        content: {
          ...restraintForm,
          signature: sigData,
          created_by: me?.name || 'Nurse',
          created_at: Date.now(),
        },
      };
      const res = await fetch('/api/clinical_docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save restraint consent');
      flash('✓ Physical Restraint / Safety Mittens Assessment & Consent authorized.');
      loadDocs();
      if (onSaved) onSaved();
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  /* -------------------------------------------------------------
     5. PALLIATIVE VERIFICATION OF DEATH & HANDOVER RECORD
  ------------------------------------------------------------- */
  const [deathForm, setDeathForm] = useState({
    time_of_death: new Date().toISOString().slice(0, 16),
    cessation_resp: true,
    absence_carotid: true,
    absence_heart_sounds: true,
    fixed_dilated_pupils: true,
    doctor_notified: '',
    doctor_mmc: '',
    devices_removed: 'NG tube and Foley catheter safely removed with gentle skin care and dignity.',
    belongings_handed: 'Jewelry, watch, personal clothes, and medical documents handed to next of kin.',
    nok_name: '',
    nok_ic: '',
    nok_rel: 'spouse',
    notes: '',
  });

  async function handleDeathSignatureSave(sigData) {
    if (!deathForm.nok_name.trim()) { setErr('Next of Kin recipient name is required'); return; }
    setBusy(true);
    setErr('');
    try {
      const payload = {
        case_id: caseId,
        doc_type: 'death',
        title: `Verification of Death & Handover (${deathForm.time_of_death})`,
        content: {
          ...deathForm,
          nok_signature: sigData,
          verified_by_nurse: me?.name || 'Nurse',
          verified_at: Date.now(),
        },
      };
      const res = await fetch('/api/clinical_docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save Verification of Death record');
      flash('✓ Palliative Verification of Death & NOK Handover record finalized.');
      loadDocs();
      if (onSaved) onSaved();
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10,20,40,0.68)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '14px',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '14px',
          padding: '22px',
          width: 'min(760px, 96vw)',
          maxHeight: '94vh',
          overflowY: 'auto',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          border: '1px solid #cbd5e1',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h3 style={{ margin: 0, color: '#0d3a54', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              📑 Clinical Assessments &amp; Nursing Charts (临床评估与图表)
            </h3>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '2px' }}>
              Patient: <b>{patientName}</b> · Clinical Governance Standards (LJM / MOH Compliance)
            </div>
          </div>
          <button className="link" onClick={onClose} style={{ fontSize: '1.2rem', color: '#64748b' }}>✕</button>
        </div>

        {/* Tab Selection */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', borderBottom: '1.5px solid #e2e8f0', marginBottom: '14px' }}>
          <button
            className={`xs ${activeTab === 'braden' ? 'pri' : 'ghost'}`}
            onClick={() => setActiveTab('braden')}
            style={{ fontWeight: 700, whiteSpace: 'nowrap' }}
          >
            🛏️ Braden Bedsore &amp; 2H Turn ({bradenDocs.length})
          </button>
          <button
            className={`xs ${activeTab === 'morse' ? 'pri' : 'ghost'}`}
            onClick={() => setActiveTab('morse')}
            style={{ fontWeight: 700, whiteSpace: 'nowrap' }}
          >
            🚶 Morse Fall Risk ({morseDocs.length})
          </button>
          <button
            className={`xs ${activeTab === 'bristol' ? 'pri' : 'ghost'}`}
            onClick={() => setActiveTab('bristol')}
            style={{ fontWeight: 700, whiteSpace: 'nowrap' }}
          >
            🚽 Bristol Stool ({bristolDocs.length})
          </button>
          <button
            className={`xs ${activeTab === 'restraint' ? 'pri' : 'ghost'}`}
            onClick={() => setActiveTab('restraint')}
            style={{ fontWeight: 700, whiteSpace: 'nowrap' }}
          >
            🧤 Restraint &amp; Mittens ({restraintDocs.length})
          </button>
          <button
            className={`xs ${activeTab === 'death' ? 'pri' : 'ghost'}`}
            onClick={() => setActiveTab('death')}
            style={{ fontWeight: 700, whiteSpace: 'nowrap' }}
          >
            🕊️ Death Handover ({deathDocs.length})
          </button>
        </div>

        {statusMsg && (
          <p style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#166534', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600, marginBottom: '12px' }}>
            {statusMsg}
          </p>
        )}
        {err && (
          <p style={{ background: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '12px' }}>
            {err}
          </p>
        )}

        {/* ================= 1. BRADEN SCALE & 2H TURNING CHART ================= */}
        {activeTab === 'braden' && (
          <div>
            <div style={{ background: bradenRiskLevel(bradenScore).bg, border: `1.5px solid ${bradenRiskLevel(bradenScore).col}`, borderRadius: '10px', padding: '12px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <b style={{ color: bradenRiskLevel(bradenScore).col, fontSize: '1.05rem' }}>
                    Braden Pressure Injury Score: {bradenScore} / 23
                  </b>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: bradenRiskLevel(bradenScore).col, marginTop: '2px' }}>
                    Risk Level: {bradenRiskLevel(bradenScore).lvl}
                  </div>
                </div>
                <button className="pri xs" disabled={busy} onClick={saveBradenAssessment} style={{ fontWeight: 800 }}>
                  {busy ? 'Saving…' : '💾 Save Braden Assessment'}
                </button>
              </div>
            </div>

            {/* 6 Sub-Scales */}
            <div className="grid2" style={{ gap: '10px', marginBottom: '14px' }}>
              <div className="f">
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>1. Sensory Perception (感觉知觉)</label>
                <select value={bradenForm.sensory} onChange={(e) => setBradenForm({ ...bradenForm, sensory: e.target.value })}>
                  <option value={1}>1 — Completely Limited (完全受限/无反应)</option>
                  <option value={2}>2 — Very Limited (高度受限/仅对疼痛有反应)</option>
                  <option value={3}>3 — Slightly Limited (轻度受限/能用言语表达)</option>
                  <option value={4}>4 — No Impairment (未受限/感觉完全正常)</option>
                </select>
              </div>

              <div className="f">
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>2. Moisture / Incontinence (潮湿程度)</label>
                <select value={bradenForm.moisture} onChange={(e) => setBradenForm({ ...bradenForm, moisture: e.target.value })}>
                  <option value={1}>1 — Constantly Moist (持续潮湿/大小便失禁)</option>
                  <option value={2}>2 — Very Moist (非常潮湿/床单每班更换多次)</option>
                  <option value={3}>3 — Occasionally Moist (偶尔潮湿/每天换1次)</option>
                  <option value={4}>4 — Rarely Moist (极少潮湿/皮肤通常干燥)</option>
                </select>
              </div>

              <div className="f">
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>3. Physical Activity (身体活动度)</label>
                <select value={bradenForm.activity} onChange={(e) => setBradenForm({ ...bradenForm, activity: e.target.value })}>
                  <option value={1}>1 — Bedfast (完全卧床)</option>
                  <option value={2}>2 — Chairfast (只能坐轮椅/无法自行站立)</option>
                  <option value={3}>3 — Walks Occasionally (偶尔行走/需搀扶)</option>
                  <option value={4}>4 — Walks Frequently (频繁走动/完全独立)</option>
                </select>
              </div>

              <div className="f">
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>4. Mobility / Position Change (活动能力)</label>
                <select value={bradenForm.mobility} onChange={(e) => setBradenForm({ ...bradenForm, mobility: e.target.value })}>
                  <option value={1}>1 — Completely Immobile (完全无法移动机体)</option>
                  <option value={2}>2 — Very Limited (极度受限/需他人协助大翻身)</option>
                  <option value={3}>3 — Slightly Limited (轻微受限/可做小幅调整)</option>
                  <option value={4}>4 — No Limitations (活动自如/随意变换体位)</option>
                </select>
              </div>

              <div className="f">
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>5. Nutrition Status (营养摄入)</label>
                <select value={bradenForm.nutrition} onChange={(e) => setBradenForm({ ...bradenForm, nutrition: e.target.value })}>
                  <option value={1}>1 — Very Poor (严重不足/进食少于1/3)</option>
                  <option value={2}>2 — Probably Inadequate (可能不足/进食约1/2)</option>
                  <option value={3}>3 — Adequate (良好/管饲或进食大部)</option>
                  <option value={4}>4 — Excellent (极佳/摄入充足蛋白营养)</option>
                </select>
              </div>

              <div className="f">
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>6. Friction &amp; Shear (摩擦力与剪切力)</label>
                <select value={bradenForm.friction} onChange={(e) => setBradenForm({ ...bradenForm, friction: e.target.value })}>
                  <option value={1}>1 — Problem (存在明显问题/床上下滑/需经常抬高)</option>
                  <option value={2}>2 — Potential Problem (潜在问题/移动较吃力)</option>
                  <option value={3}>3 — No Apparent Problem (无明显问题/移动无摩擦)</option>
                </select>
              </div>
            </div>

            {/* 2-HOURLY TURNING CHART LOGGING SUB-SECTION */}
            <div style={{ background: '#f8fafc', border: '1.5px solid #0d3a54', borderRadius: '10px', padding: '14px', marginTop: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <b style={{ color: '#0d3a54', fontSize: '0.92rem' }}>🔄 2-Hourly Turning Chart &amp; Pressure Relief Log (2小时翻身表)</b>
                <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700 }}>● Active Protocol</span>
              </div>

              <div className="grid2" style={{ gap: '8px', marginBottom: '8px' }}>
                <div className="f">
                  <label style={{ fontSize: '0.74rem', fontWeight: 600 }}>New Position (翻身体位)</label>
                  <select value={turnPosition} onChange={(e) => setTurnPosition(e.target.value)}>
                    <option value="left_lateral">Left Lateral 30° (左侧卧 30度减压)</option>
                    <option value="right_lateral">Right Lateral 30° (右侧卧 30度减压)</option>
                    <option value="supine">Supine (平卧位 / 枕垫减压)</option>
                    <option value="semi_fowler">Semi-Fowler 30° (半坐卧位 ≤30度防剪切力)</option>
                    <option value="chair_transfer">Chair / Wheelchair with Cushion (坐轮椅/减压垫)</option>
                  </select>
                </div>
                <div className="f">
                  <label style={{ fontSize: '0.74rem', fontWeight: 600 }}>Skin Condition at Pressure Points (骨突处皮肤)</label>
                  <select value={turnSkin} onChange={(e) => setTurnSkin(e.target.value)}>
                    <option value="intact">Intact &amp; Pink (完好无红斑)</option>
                    <option value="erythema_blanchable">Blanchable Redness (可褪色压红/早期警示)</option>
                    <option value="erythema_non_blanchable">Non-Blanchable Redness (不可褪色红斑/1期压疮)</option>
                    <option value="dressing_intact">Dressing Clean &amp; Intact (敷料平整干燥)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  value={turnNotes}
                  placeholder="Remarks (e.g. Skin barrier cream applied, pillow positioned behind back)..."
                  onChange={(e) => setTurnNotes(e.target.value)}
                  style={{ flex: 1, fontSize: '0.8rem' }}
                />
                <button className="pri xs" disabled={busy} onClick={logTurningRecord} style={{ fontWeight: 800 }}>
                  ✓ Log Turn (记录翻身)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. MORSE FALL RISK SCALE ================= */}
        {activeTab === 'morse' && (
          <div>
            <div style={{ background: morseRiskLevel(morseScore).bg, border: `1.5px solid ${morseRiskLevel(morseScore).col}`, borderRadius: '10px', padding: '12px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <b style={{ color: morseRiskLevel(morseScore).col, fontSize: '1.05rem' }}>
                    Morse Fall Risk Score: {morseScore}
                  </b>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: morseRiskLevel(morseScore).col, marginTop: '2px' }}>
                    Classification: {morseRiskLevel(morseScore).lvl}
                  </div>
                </div>
                <button className="pri xs" disabled={busy} onClick={saveMorseAssessment} style={{ fontWeight: 800 }}>
                  {busy ? 'Saving…' : '💾 Save Fall Assessment'}
                </button>
              </div>
            </div>

            <div className="grid2" style={{ gap: '10px', marginBottom: '14px' }}>
              <div className="f">
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>1. History of Falling (近3个月内跌倒史)</label>
                <select value={morseForm.history_fall} onChange={(e) => setMorseForm({ ...morseForm, history_fall: e.target.value })}>
                  <option value={0}>No (无跌倒史) — 0 pts</option>
                  <option value={25}>Yes (有跌倒史) — 25 pts</option>
                </select>
              </div>

              <div className="f">
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>2. Secondary Medical Diagnoses (≥2项合并诊断)</label>
                <select value={morseForm.secondary_dx} onChange={(e) => setMorseForm({ ...morseForm, secondary_dx: e.target.value })}>
                  <option value={0}>No (单一诊断) — 0 pts</option>
                  <option value={15}>Yes (存在合并诊断/慢性病多发) — 15 pts</option>
                </select>
              </div>

              <div className="f">
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>3. Ambulatory Aid / Assistive Device (助行器械)</label>
                <select value={morseForm.ambulatory_aid} onChange={(e) => setMorseForm({ ...morseForm, ambulatory_aid: e.target.value })}>
                  <option value={0}>None / Bedrest / Nurse assist (无/完全卧床/护士搀扶) — 0 pts</option>
                  <option value={15}>Crutches / Cane / Walker (使用拐杖/手杖/助行架) — 15 pts</option>
                  <option value={30}>Furniture / Holding walls (扶靠家具墙壁行走) — 30 pts</option>
                </select>
              </div>

              <div className="f">
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>4. IV Cannula / Saline Lock / Heparin Lock (静脉留置针)</label>
                <select value={morseForm.iv_lock} onChange={(e) => setMorseForm({ ...morseForm, iv_lock: e.target.value })}>
                  <option value={0}>No (无输液/无静脉针) — 0 pts</option>
                  <option value={20}>Yes (有静脉输液或留置针) — 20 pts</option>
                </select>
              </div>

              <div className="f">
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>5. Gait &amp; Transferring Ability (步态与转移能力)</label>
                <select value={morseForm.gait} onChange={(e) => setMorseForm({ ...morseForm, gait: e.target.value })}>
                  <option value={0}>Normal / Immobile (步态稳健或完全卧床) — 0 pts</option>
                  <option value={10}>Weak (虚弱步态/步伐短而缓) — 10 pts</option>
                  <option value={20}>Impaired (受损步态/平衡差/需扶持) — 20 pts</option>
                </select>
              </div>

              <div className="f">
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>6. Mental Status (精神与自知力状态)</label>
                <select value={morseForm.mental} onChange={(e) => setMorseForm({ ...morseForm, mental: e.target.value })}>
                  <option value={0}>Oriented to own ability (知晓自身限制/量力而行) — 0 pts</option>
                  <option value={15}>Overestimates / Forgets limitations (高估能力/遗忘限制/躁动) — 15 pts</option>
                </select>
              </div>
            </div>

            {/* Fall Prevention Protocol Checklist */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '12px' }}>
              <b style={{ color: '#0d3a54', fontSize: '0.84rem' }}>🛡️ Standard Fall Prevention Bundle Implemented (防跌照护清单):</b>
              <div className="grid2" style={{ marginTop: '8px', fontSize: '0.78rem' }}>
                <label style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <input type="checkbox" checked={morseForm.bed_rails} onChange={(e) => setMorseForm({ ...morseForm, bed_rails: e.target.checked })} />
                  Bilateral Bed Rails Elevated (双侧床栏抬起固定)
                </label>
                <label style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <input type="checkbox" checked={morseForm.non_slip_socks} onChange={(e) => setMorseForm({ ...morseForm, non_slip_socks: e.target.checked })} />
                  Non-slip Footwear / Socks (穿戴防滑鞋袜)
                </label>
                <label style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <input type="checkbox" checked={morseForm.call_bell_reach} onChange={(e) => setMorseForm({ ...morseForm, call_bell_reach: e.target.checked })} />
                  Call Bell / Phone within Reach (呼叫铃置于触手可及处)
                </label>
                <label style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <input type="checkbox" checked={morseForm.two_person_assist} onChange={(e) => setMorseForm({ ...morseForm, two_person_assist: e.target.checked })} />
                  2-Person Assist on Transfer (转移体位时双人协助)
                </label>
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. BRISTOL STOOL & BOWEL CHART ================= */}
        {activeTab === 'bristol' && (
          <div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', marginBottom: '14px' }}>
              <b style={{ color: '#0d3a54', fontSize: '0.95rem' }}>🚽 Bristol Stool Classification &amp; Bowel Log (布里斯托大便分类)</b>
              <div style={{ fontSize: '0.76rem', color: 'var(--muted)', marginTop: '2px', marginBottom: '10px' }}>
                Clinical standard for tracking bowel regularity, constipation risk, and diarrhea management.
              </div>

              <div className="f" style={{ marginBottom: '10px' }}>
                <label style={{ fontWeight: 700, fontSize: '0.8rem' }}>Stool Type (布里斯托大便性状分类)</label>
                <select value={bristolForm.type} onChange={(e) => setBristolForm({ ...bristolForm, type: Number(e.target.value) })}>
                  {BRISTOL_TYPES.map((bt) => (
                    <option key={bt.type} value={bt.type}>{bt.desc}</option>
                  ))}
                </select>
              </div>

              <div className="grid3" style={{ gap: '8px', marginBottom: '10px' }}>
                <div className="f">
                  <label style={{ fontSize: '0.74rem', fontWeight: 600 }}>Amount (排便量)</label>
                  <select value={bristolForm.amount} onChange={(e) => setBristolForm({ ...bristolForm, amount: e.target.value })}>
                    <option value="small">Small (少量)</option>
                    <option value="moderate">Moderate (中等)</option>
                    <option value="large">Large (大量)</option>
                  </select>
                </div>
                <div className="f">
                  <label style={{ fontSize: '0.74rem', fontWeight: 600 }}>Stool Color (便色)</label>
                  <select value={bristolForm.color} onChange={(e) => setBristolForm({ ...bristolForm, color: e.target.value })}>
                    <option value="brown">Brown (正常黄褐色)</option>
                    <option value="yellow">Yellow (黄色)</option>
                    <option value="black_tarry">Black Tarry / Melaena (柏油样黑便 ⚠️)</option>
                    <option value="clay">Clay / Pale (陶土色/胆道异常 ⚠️)</option>
                    <option value="red_blood">Fresh Red Blood (鲜血便 🚨)</option>
                  </select>
                </div>
                <div className="f">
                  <label style={{ fontSize: '0.74rem', fontWeight: 600 }}>Days of BNO (未排便天数)</label>
                  <input
                    type="number"
                    value={bristolForm.bno_days}
                    onChange={(e) => setBristolForm({ ...bristolForm, bno_days: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="f" style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '0.74rem', fontWeight: 600 }}>Aperient / Bowel Intervention Given (通便药物与干预)</label>
                <select value={bristolForm.intervention} onChange={(e) => setBristolForm({ ...bristolForm, intervention: e.target.value })}>
                  <option value="none">None (无干预/自然排便)</option>
                  <option value="lactulose">Syr. Lactulose (乳果糖口服)</option>
                  <option value="senna">Tab. Senna (番泻叶片)</option>
                  <option value="bisacodyl_supp">Bisacodyl Suppository (前列腺素栓剂塞肛)</option>
                  <option value="fleet_enema">Fleet Enema (开塞露/灌肠)</option>
                  <option value="manual_evacuation">Manual Evacuation (指套人工掏便术)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="pri xs" disabled={busy} onClick={saveBristolLog} style={{ fontWeight: 800 }}>
                  {busy ? 'Recording…' : '✓ Record Bowel Log'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. PHYSICAL RESTRAINT / MITTENS ================= */}
        {activeTab === 'restraint' && (
          <div>
            <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '10px', padding: '14px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>🧤</span>
                <div>
                  <b style={{ color: '#92400e', fontSize: '0.95rem' }}>Physical Restraint / Safety Mittens Assessment &amp; Consent (约束与安全手套评估)</b>
                  <div style={{ fontSize: '0.74rem', color: '#b45309' }}>
                    Strict clinical criteria: only used for patient safety when least-restrictive alternatives have failed.
                  </div>
                </div>
              </div>

              <div className="grid2" style={{ gap: '8px', marginBottom: '10px' }}>
                <div className="f">
                  <label style={{ fontSize: '0.76rem', fontWeight: 700 }}>Clinical Indication (约束指征)</label>
                  <select value={restraintForm.indication} onChange={(e) => setRestraintForm({ ...restraintForm, indication: e.target.value })}>
                    <option value="prevent_extubation_ng_tube">Repeatedly pulling NG / Ryles Feeding Tube (拔除胃管)</option>
                    <option value="prevent_catheter_pull">Repeatedly pulling Foley Urinary Catheter (拔除导尿管)</option>
                    <option value="dislodge_iv_tracheostomy">Dislodging Tracheostomy Cannula / IV lines (拔除气管套管/静脉针)</option>
                    <option value="severe_agitation_scratching">Severe Agitation / Self-Harm / Scratching Wounds (谵妄躁动/抓挠伤口)</option>
                  </select>
                </div>
                <div className="f">
                  <label style={{ fontSize: '0.76rem', fontWeight: 700 }}>Restraint Device Type (约束用具类型)</label>
                  <select value={restraintForm.type} onChange={(e) => setRestraintForm({ ...restraintForm, type: e.target.value })}>
                    <option value="safety_mittens">Padded Safety Mittens (防抓安全手套 - 推荐最少限制用具)</option>
                    <option value="wrist_restraint_soft">Soft Padded Wrist Restraint (软垫手腕约束带)</option>
                    <option value="bilateral_bed_rails">Bilateral Bed Rails with Padded Bumpers (双侧床栏及防撞垫)</option>
                  </select>
                </div>
              </div>

              <div className="grid2" style={{ gap: '8px', marginBottom: '10px' }}>
                <div className="f">
                  <label style={{ fontSize: '0.76rem', fontWeight: 600 }}>Attending Doctor Name</label>
                  <input
                    value={restraintForm.doctor_dr}
                    placeholder="e.g. Dr. Wong"
                    onChange={(e) => setRestraintForm({ ...restraintForm, doctor_dr: e.target.value })}
                  />
                </div>
                <div className="f">
                  <label style={{ fontSize: '0.76rem', fontWeight: 600 }}>Doctor MMC No.</label>
                  <input
                    value={restraintForm.doctor_mmc}
                    placeholder="e.g. MMC 38291"
                    onChange={(e) => setRestraintForm({ ...restraintForm, doctor_mmc: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid2" style={{ gap: '8px', marginBottom: '10px' }}>
                <div className="f">
                  <label style={{ fontSize: '0.76rem', fontWeight: 600 }}>Family / NOK Signee Name</label>
                  <input
                    value={restraintForm.family_name}
                    placeholder="e.g. Tan Ah Kow"
                    onChange={(e) => setRestraintForm({ ...restraintForm, family_name: e.target.value })}
                  />
                </div>
                <div className="f">
                  <label style={{ fontSize: '0.76rem', fontWeight: 600 }}>Signee IC / Passport</label>
                  <input
                    value={restraintForm.family_ic}
                    placeholder="e.g. 700101-07-1234"
                    onChange={(e) => setRestraintForm({ ...restraintForm, family_ic: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '8px 10px', borderRadius: '6px', fontSize: '0.74rem', color: '#991b1b', marginBottom: '10px' }}>
                ⚠️ <b>Mandatory Protocol</b>: Restraint must be released every 2 hours for 15 minutes to inspect distal circulation, perform skin massage, and conduct passive Range of Motion (ROM).
              </div>

              <SignaturePad
                title="Family Next of Kin Digital Signature (家属知情同意签名)"
                onSave={handleRestraintSignatureSave}
                onCancel={() => setActiveTab('braden')}
              />
            </div>
          </div>
        )}

        {/* ================= 5. VERIFICATION OF DEATH ================= */}
        {activeTab === 'death' && (
          <div>
            <div style={{ background: '#f8fafc', border: '1.5px solid #475569', borderRadius: '10px', padding: '14px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>🕊️</span>
                <div>
                  <b style={{ color: '#0f172a', fontSize: '1rem' }}>Palliative Verification of Death &amp; Handover Record (临终生命终结与交接记录)</b>
                  <div style={{ fontSize: '0.74rem', color: '#475569' }}>
                    Clinical documentation of clinical death signs, attending doctor notification, and release of belongings.
                  </div>
                </div>
              </div>

              <div className="grid2" style={{ gap: '8px', marginBottom: '10px' }}>
                <div className="f">
                  <label style={{ fontSize: '0.76rem', fontWeight: 700 }}>Date &amp; Time of Death (死亡确认时间)</label>
                  <input
                    type="datetime-local"
                    value={deathForm.time_of_death}
                    onChange={(e) => setDeathForm({ ...deathForm, time_of_death: e.target.value })}
                  />
                </div>
                <div className="f">
                  <label style={{ fontSize: '0.76rem', fontWeight: 700 }}>Attending Doctor Notified (通知主治医生)</label>
                  <input
                    value={deathForm.doctor_notified}
                    placeholder="Doctor Name & Hospital"
                    onChange={(e) => setDeathForm({ ...deathForm, doctor_notified: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px', marginBottom: '10px', fontSize: '0.76rem' }}>
                <b>Clinical Signs of Death Verified by Attending Nurse (护士临床体征核实):</b>
                <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <input type="checkbox" checked={deathForm.cessation_resp} onChange={(e) => setDeathForm({ ...deathForm, cessation_resp: e.target.checked })} />
                    ✓ Complete cessation of spontaneous respiration (confirmed for 1 full minute)
                  </label>
                  <label style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <input type="checkbox" checked={deathForm.absence_carotid} onChange={(e) => setDeathForm({ ...deathForm, absence_carotid: e.target.checked })} />
                    ✓ Absence of central carotid / femoral pulse (confirmed for 1 full minute)
                  </label>
                  <label style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <input type="checkbox" checked={deathForm.absence_heart_sounds} onChange={(e) => setDeathForm({ ...deathForm, absence_heart_sounds: e.target.checked })} />
                    ✓ Absence of heart sounds upon direct precordial auscultation (1 full minute)
                  </label>
                  <label style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <input type="checkbox" checked={deathForm.fixed_dilated_pupils} onChange={(e) => setDeathForm({ ...deathForm, fixed_dilated_pupils: e.target.checked })} />
                    ✓ Bilateral pupils fixed, dilated, and non-reactive to light
                  </label>
                </div>
              </div>

              <div className="f" style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '0.76rem', fontWeight: 600 }}>Personal Belongings &amp; Valuables Handed Over (遗物交接清单)</label>
                <textarea
                  rows={2}
                  value={deathForm.belongings_handed}
                  onChange={(e) => setDeathForm({ ...deathForm, belongings_handed: e.target.value })}
                />
              </div>

              <div className="grid2" style={{ gap: '8px', marginBottom: '10px' }}>
                <div className="f">
                  <label style={{ fontSize: '0.76rem', fontWeight: 600 }}>Received By NOK Full Name</label>
                  <input
                    value={deathForm.nok_name}
                    placeholder="NOK Name"
                    onChange={(e) => setDeathForm({ ...deathForm, nok_name: e.target.value })}
                  />
                </div>
                <div className="f">
                  <label style={{ fontSize: '0.76rem', fontWeight: 600 }}>NOK NRIC / Passport</label>
                  <input
                    value={deathForm.nok_ic}
                    placeholder="NRIC"
                    onChange={(e) => setDeathForm({ ...deathForm, nok_ic: e.target.value })}
                  />
                </div>
              </div>

              <SignaturePad
                title="Next of Kin Receipt & Handover Signature (家属接收签名)"
                onSave={handleDeathSignatureSave}
                onCancel={() => setActiveTab('braden')}
              />
            </div>
          </div>
        )}

        {/* Historical Assessments Timeline */}
        {docs.length > 0 && (
          <div style={{ marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
            <b style={{ color: '#0d3a54', fontSize: '0.84rem' }}>🕒 Completed Assessments for this Patient ({docs.length}):</b>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px', maxHeight: '180px', overflowY: 'auto' }}>
              {docs.map((d) => (
                <div key={d.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '6px 10px', fontSize: '0.76rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <b>{d.title}</b>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>
                      By {d.author_name || 'Nurse'} on {when(d.created_at)}
                    </div>
                  </div>
                  <span className="sbadge s-live" style={{ fontSize: '0.68rem' }}>✓ Logged</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function when(ts) {
  if (!ts) return '—';
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kuala_Lumpur',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date(ts));
  } catch (_) {
    return String(ts);
  }
}

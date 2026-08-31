import React, { Fragment, useEffect, useState } from 'react';
import { api } from '../api.js';
import { createSpeechRecognizer } from '../dictation.jsx';
import PatientSummaryCard from '../components/PatientSummaryCard.jsx';
import {
  LAB_PANELS,
  getParamDef,
  evaluateLabParam,
  evaluateLabSet,
  generateSbarSummary,
  buildLongitudinalMatrix
} from '../labReference.js';

const DOC_TYPES = [
  ['lab_results', '🧪 Laboratory Results & ABG (检验单与血气)'],
  ['progress_notes', '📝 Progress Notes (护理病程记录)'],
  ['doctors_orders', '🩺 Doctor\'s Order (医嘱执行记录)'],
  ['fall_risk_morse', '⚠️ Morse Fall Risk Scale (跌倒风险评估)'],
  ['braden_scale', '🩹 Braden Pressure Sore Scale (压疮风险评估)'],
  ['care_plan_ncp', '📋 Nursing Care Plan / NCP (护理计划)'],
  ['io_balance', '💧 Fluid Intake / Output (I/O 出入量)'],
  ['bowel_bladder', '🚽 Bowel & Bladder Chart (排泄记录)'],
  ['uploaded_file', '📁 Medical File / General Document (医疗文件)'],
];

export default function ClinicalDocs({ caseId, onBack, me }) {
  const [c, setC] = useState(null);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('lab_results');
  const [showAdd, setShowAdd] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [editingDocId, setEditingDocId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  // Lab & Matrix state
  const [viewTab, setViewTab] = useState('docs'); // 'docs' | 'lab_summary'
  const [selectedLabPanel, setSelectedLabPanel] = useState('abg');
  const [matrixFilterPanel, setMatrixFilterPanel] = useState('all');
  const [sbarCopied, setSbarCopied] = useState(false);

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3000); };

  async function load() {
    try {
      const docsPromise = fetch(`/api/clinical_docs?case_id=${encodeURIComponent(caseId)}`, { credentials: 'same-origin' })
        .then(async (r) => {
          const text = await r.text().catch(() => '');
          try { return text ? JSON.parse(text) : {}; } catch (_) { return {}; }
        }).catch(() => ({}));

      const [caseRes, docsRes] = await Promise.all([
        api.getCase(caseId),
        docsPromise,
      ]);
      setC(caseRes.case || caseRes);
      setDocs(docsRes.documents || []);
    } catch (e) {
      flash(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [caseId]);

  function startNewDoc(type) {
    setSelectedType(type);
    setEditingDocId(null);
    let initialContent = {};

    if (type === 'lab_results') {
      initialContent = {
        panel_id: 'abg',
        test_date: new Date().toISOString().split('T')[0],
        test_time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        lab_provider: '',
        readings: {},
        notes: ''
      };
      setSelectedLabPanel('abg');
    } else if (type === 'progress_notes') {
      initialContent = { notes: '', plan: '', subjective: '', objective: '' };
    } else if (type === 'doctors_orders') {
      initialContent = { doctor_name: '', hospital: '', order_text: '', date: new Date().toISOString().split('T')[0] };
    } else if (type === 'fall_risk_morse') {
      initialContent = { history_falls: 0, secondary_diag: 0, aid: 0, iv: 0, gait: 0, mental: 0 };
    } else if (type === 'braden_scale') {
      initialContent = { sensory: 4, moisture: 4, activity: 4, mobility: 4, nutrition: 4, friction: 3 };
    } else if (type === 'care_plan_ncp') {
      initialContent = { diagnosis: '', goal: '', interventions: '', evaluation: '' };
    } else if (type === 'io_balance') {
      initialContent = { oral_in: '', iv_in: '', urine_out: '', drain_out: '', balance: '' };
    } else if (type === 'bowel_bladder') {
      initialContent = { stool_type: 'Type 4 (Normal)', stool_freq: '1x', urine_color: 'Clear Yellow', incontinence: 'None', notes: '' };
    } else if (type === 'uploaded_file') {
      initialContent = { doc_title: '', file_data: '', notes: '' };
    }

    setActiveForm({
      title: (DOC_TYPES.find((t) => t[0] === type) || [])[1] || 'Clinical Record',
      doc_type: type,
      content: initialContent,
      attachment_url: '',
    });
    setShowAdd(true);
  }

  // Voice dictation toggle
  function toggleDictation(field) {
    if (isRecording) {
      setIsRecording(false);
      return;
    }
    const recognizer = createSpeechRecognizer({
      lang: 'en-MY',
      onStart: () => setIsRecording(true),
      onEnd: () => setIsRecording(false),
      onResult: (finalText) => {
        if (finalText && activeForm) {
          const prev = activeForm.content[field] || '';
          setActiveForm({
            ...activeForm,
            content: { ...activeForm.content, [field]: (prev ? prev + ' ' : '') + finalText.trim() },
          });
        }
      },
    });
    if (recognizer.supported) recognizer.start();
  }

  async function saveDoc() {
    if (!activeForm) return;
    setBusy(true);
    try {
      const payload = {
        id: editingDocId,
        case_id: caseId,
        doc_type: activeForm.doc_type,
        title: activeForm.title,
        content: activeForm.content,
        attachment_url: activeForm.attachment_url,
      };
      const res = await fetch('/api/clinical_docs', {
        method: editingDocId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });
      const text = await res.text().catch(() => '');
      let data = {};
      try { data = text ? JSON.parse(text) : {}; } catch (_) {
        data = { error: `Server error (${res.status}): ${text.slice(0, 100) || res.statusText || 'Unable to process'}` };
      }
      if (!res.ok) throw new Error(data.error || 'Failed to save document');

      flash('✓ Clinical assessment saved successfully!');
      setShowAdd(false);
      setActiveForm(null);
      setEditingDocId(null);
      await load();
    } catch (e) {
      flash(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function deleteDoc(id) {
    if (!confirm('Are you sure you want to delete/void this clinical document?')) return;
    try {
      await fetch(`/api/clinical_docs?id=${encodeURIComponent(id)}`, { method: 'DELETE', credentials: 'same-origin' });
      flash('Document removed.');
      await load();
    } catch (e) { flash(e.message); }
  }

  // File upload compressor
  function handleFileUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setActiveForm({
        ...activeForm,
        attachment_url: reader.result,
        content: { ...activeForm.content, file_name: file.name, file_size: file.size },
      });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <div className="case-subbar">
        <button className="case-back-btn" onClick={onBack}>
          <span>←</span> <b>Back to Cases</b>
        </button>
        <div className="case-subbar-info">
          <span className="case-patient-name">{c ? c.name : 'Patient'} {c?.age ? `(${c.age}yo)` : ''}</span>
          <span className="case-view-tag">📁 Clinical Docs</span>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h2 style={{ margin: 0 }}>📁 Clinical Documentation &amp; Assessments</h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '2px' }}>
              Patient: <b>{c ? c.name : '…'}</b> {c?.age ? `(${c.age}yo)` : ''}
            </div>
          </div>

          <button className="pri sm" onClick={() => setShowAdd(!showAdd)} style={{ margin: 0 }}>
            {showAdd ? '✕ Close Form' : '＋ New Clinical Assessment'}
          </button>
        </div>

      {/* PATIENT BRIEF & SUMMARY CARD (1ST PAGE VIEW) */}
      {c && <div style={{ marginTop: '12px' }}><PatientSummaryCard patient={c} caseId={caseId} onUpdated={load} /></div>}

      {status && <p className="status" style={{ marginTop: '10px' }}>{status}</p>}

      {/* FORM SELECTOR & BUILDER */}
      {showAdd && (
        <div style={{ background: '#f8fafc', border: '1.5px solid var(--blue)', borderRadius: '12px', padding: '16px', margin: '14px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <b style={{ color: 'var(--navy)', fontSize: '1rem' }}>Select Assessment / Form Template:</b>
            <select
              value={selectedType}
              onChange={(e) => startNewDoc(e.target.value)}
              style={{ fontWeight: 700, padding: '4px 8px' }}
            >
              {DOC_TYPES.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
            </select>
          </div>

          {activeForm && (
            <div>
              <div className="f"><label>Document Title</label>
                <input value={activeForm.title} onChange={(e) => setActiveForm({ ...activeForm, title: e.target.value })} /></div>

              {/* 0. LABORATORY RESULTS & ABG */}
              {activeForm.doc_type === 'lab_results' && (() => {
                const readings = activeForm.content.readings || {};
                const evSet = evaluateLabSet(readings);
                const isCrit = evSet.criticals.length > 0;
                const isAbn = evSet.abnormals.length > 0;

                const setReading = (key, val) => {
                  const updated = { ...readings };
                  if (val === '') delete updated[key];
                  else updated[key] = val;
                  setActiveForm({
                    ...activeForm,
                    content: { ...activeForm.content, readings: updated }
                  });
                };

                const copySbar = () => {
                  const dateStr = `${activeForm.content.test_date || ''} ${activeForm.content.test_time || ''}`.trim() || new Date().toLocaleString('en-GB');
                  const currentPanel = LAB_PANELS.find(p => p.id === selectedLabPanel);
                  const txt = generateSbarSummary(c, currentPanel?.name || 'Laboratory Test', dateStr, readings, evSet.criticals);
                  navigator.clipboard.writeText(txt);
                  setSbarCopied(true);
                  setTimeout(() => setSbarCopied(false), 3000);
                };

                const panelsToDisplay = selectedLabPanel === 'all' ? LAB_PANELS : LAB_PANELS.filter(p => p.id === selectedLabPanel);

                return (
                  <div>
                    {/* CRITICAL / ABNORMAL ALERT BANNER */}
                    {isCrit && (
                      <div style={{ background: '#fef2f2', border: '2px solid #ef4444', borderRadius: '8px', padding: '12px', marginBottom: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                          <div>
                            <div style={{ fontWeight: 800, color: '#b91c1c', fontSize: '0.95rem' }}>
                              🚨 CRITICAL PANIC ALERT: {evSet.criticals.length} Critical Value(s) Detected!
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#7f1d1d', marginTop: '2px' }}>
                              Values exceed physiological safety limits. Immediate attending physician notification and intervention required.
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={copySbar}
                            style={{ background: '#b91c1c', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer' }}
                          >
                            {sbarCopied ? '✓ SBAR Copied!' : '📋 Copy SBAR for Doctor (WhatsApp)'}
                          </button>
                        </div>
                        <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {evSet.criticals.map(cr => (
                            <div key={cr.key} style={{ background: '#fff', border: '1px solid #f87171', borderRadius: '6px', padding: '6px 10px', fontSize: '0.82rem' }}>
                              <b style={{ color: '#b91c1c' }}>{cr.def?.name || cr.key}: {cr.val} {cr.def?.unit} ({cr.badge})</b>
                              <div style={{ color: '#334155', fontSize: '0.78rem', marginTop: '2px' }}>↳ <b>Action:</b> {cr.advice}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!isCrit && isAbn && (
                      <div style={{ background: '#fffbeb', border: '1.5px solid #f59e0b', borderRadius: '8px', padding: '10px 12px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <b style={{ color: '#b45309', fontSize: '0.9rem' }}>⚠️ {evSet.abnormals.length} Abnormal Value(s) Flagged</b>
                          <div style={{ fontSize: '0.78rem', color: '#92400e' }}>Results outside standard reference range. Documented for physician follow-up.</div>
                        </div>
                        <button
                          type="button"
                          onClick={copySbar}
                          style={{ background: '#d97706', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer' }}
                        >
                          {sbarCopied ? '✓ Copied!' : '📋 Copy SBAR Summary'}
                        </button>
                      </div>
                    )}

                    {/* METADATA: DATE, TIME, LAB PROVIDER */}
                    <div className="grid3" style={{ marginBottom: '12px' }}>
                      <div className="f">
                        <label>Test Date (检验日期)</label>
                        <input
                          type="date"
                          value={activeForm.content.test_date || ''}
                          onChange={(e) => setActiveForm({ ...activeForm, content: { ...activeForm.content, test_date: e.target.value } })}
                        />
                      </div>
                      <div className="f">
                        <label>Test Time (采样/化验时间)</label>
                        <input
                          type="time"
                          value={activeForm.content.test_time || ''}
                          onChange={(e) => setActiveForm({ ...activeForm, content: { ...activeForm.content, test_time: e.target.value } })}
                        />
                      </div>
                      <div className="f">
                        <label>Laboratory / Facility Provider</label>
                        <input
                          placeholder="e.g. Hospital Lab, Gribbles, BP, i-STAT"
                          value={activeForm.content.lab_provider || ''}
                          onChange={(e) => setActiveForm({ ...activeForm, content: { ...activeForm.content, lab_provider: e.target.value } })}
                        />
                      </div>
                    </div>

                    {/* PANEL SELECTOR PILLS */}
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--navy)', display: 'block', marginBottom: '6px' }}>
                        Select Lab Panel / Test Category:
                      </label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {LAB_PANELS.map(p => {
                          const isSel = selectedLabPanel === p.id;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => {
                                setSelectedLabPanel(p.id);
                                setActiveForm({ ...activeForm, content: { ...activeForm.content, panel_id: p.id }, title: `🧪 ${p.shortName} Results · ${activeForm.content.test_date || 'Today'}` });
                              }}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                border: isSel ? '2px solid var(--blue)' : '1px solid #cbd5e1',
                                background: isSel ? 'var(--blue)' : '#fff',
                                color: isSel ? '#fff' : '#334155',
                                cursor: 'pointer'
                              }}
                            >
                              {p.name}
                            </button>
                          );
                        })}
                        <button
                          type="button"
                          onClick={() => setSelectedLabPanel('all')}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            border: selectedLabPanel === 'all' ? '2px solid var(--navy)' : '1px solid #cbd5e1',
                            background: selectedLabPanel === 'all' ? 'var(--navy)' : '#fff',
                            color: selectedLabPanel === 'all' ? '#fff' : '#334155',
                            cursor: 'pointer'
                          }}
                        >
                          📑 All Panels / Full Workup
                        </button>
                      </div>
                    </div>

                    {/* PARAMETERS INPUT GRID */}
                    {panelsToDisplay.map(panel => (
                      <div key={panel.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', marginBottom: '14px' }}>
                        <div style={{ fontWeight: 800, color: 'var(--navy)', fontSize: '0.92rem', marginBottom: '10px', borderBottom: '1.5px solid #f1f5f9', paddingBottom: '4px' }}>
                          {panel.name}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                          {panel.params.map(param => {
                            const val = readings[param.key] || '';
                            const ev = evaluateLabParam(param.key, val);
                            const isPnc = ev.status === 'crit_low' || ev.status === 'crit_high';
                            const isAb = ev.status === 'low' || ev.status === 'high';

                            return (
                              <div
                                key={param.key}
                                style={{
                                  border: isPnc ? '2px solid #ef4444' : isAb ? '1.5px solid #f59e0b' : '1px solid #cbd5e1',
                                  background: isPnc ? '#fef2f2' : isAb ? '#fffbeb' : '#f8fafc',
                                  borderRadius: '8px',
                                  padding: '8px 10px'
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                  <label style={{ fontWeight: 700, fontSize: '0.8rem', color: '#1e293b' }}>
                                    {param.name}
                                  </label>
                                  {val !== '' && (
                                    <span
                                      style={{
                                        fontSize: '0.7rem',
                                        fontWeight: 800,
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        background: ev.bg,
                                        color: ev.color,
                                        border: `1px solid ${ev.borderColor}`
                                      }}
                                    >
                                      {ev.badge}
                                    </span>
                                  )}
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <input
                                    type="number"
                                    step="any"
                                    value={val}
                                    placeholder={param.min != null && param.max != null ? `${param.min} – ${param.max}` : 'Enter value'}
                                    onChange={(e) => setReading(param.key, e.target.value)}
                                    style={{
                                      fontSize: '0.9rem',
                                      fontWeight: 800,
                                      padding: '5px 8px',
                                      borderRadius: '6px',
                                      border: '1px solid #cbd5e1',
                                      flex: 1
                                    }}
                                  />
                                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)', minWidth: '45px' }}>
                                    {param.unit}
                                  </span>
                                </div>

                                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '4px' }}>
                                  Ref Range: <b>{param.min != null ? param.min : '—'} – {param.max != null ? param.max : '—'} {param.unit}</b>
                                  {param.critLow != null && <span style={{ color: '#dc2626', marginLeft: '4px' }}>(Panic &lt;{param.critLow})</span>}
                                  {param.critHigh != null && <span style={{ color: '#dc2626', marginLeft: '4px' }}>(Panic &gt;{param.critHigh})</span>}
                                </div>

                                {isPnc && (
                                  <div style={{ marginTop: '6px', background: '#fee2e2', color: '#991b1b', padding: '4px 6px', borderRadius: '4px', fontSize: '0.74rem', fontWeight: 700 }}>
                                    🚨 {ev.advice}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    {/* PHYSICAL LAB SLIP / REPORT ATTACHMENT */}
                    <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 12px', marginBottom: '12px' }}>
                      <label style={{ fontWeight: 700, fontSize: '0.82rem', display: 'block', marginBottom: '4px' }}>
                        📎 Attach Lab Report Photo / PDF (检验报告拍照/单据上传)
                      </label>
                      <input type="file" accept="image/*,application/pdf" onChange={handleFileUpload} />
                      {activeForm.attachment_url && (
                        <div style={{ marginTop: '6px', fontSize: '0.8rem', color: '#16a34a' }}>
                          ✓ File attached: {activeForm.content.file_name || 'Lab Report Document'}
                          {activeForm.attachment_url.startsWith('data:image') && (
                            <div>
                              <img src={activeForm.attachment_url} style={{ maxHeight: '120px', borderRadius: '6px', marginTop: '4px', border: '1px solid #cbd5e1' }} alt="Lab preview" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* CLINICAL SUMMARY & NURSING NOTES */}
                    <div className="f">
                      <label>Clinical Interpretation / Doctor Notification Notes</label>
                      <textarea
                        rows="3"
                        placeholder="e.g. Dr. Wong notified at 14:30 via phone regarding critical potassium 6.2 mmol/L. Verbal order received for stat 12-lead ECG and IV Insulin-Dextrose infusion..."
                        value={activeForm.content.notes || ''}
                        onChange={(e) => setActiveForm({ ...activeForm, content: { ...activeForm.content, notes: e.target.value } })}
                      />
                    </div>
                  </div>
                );
              })()}

              {/* 1. PROGRESS NOTES */}
              {activeForm.doc_type === 'progress_notes' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label style={{ fontWeight: 700, fontSize: '0.82rem' }}>Nursing Observation &amp; Progress (SOAP / DAR Notes)</label>
                    <button type="button" className="ghost xs" onClick={() => toggleDictation('notes')}>
                      {isRecording ? '🔴 Listening…' : '🎙️ Voice Dictate (语音)'}
                    </button>
                  </div>
                  <textarea
                    rows="4"
                    value={activeForm.content.notes || ''}
                    placeholder="e.g. Patient conscious and oriented. Vital signs stable. Performed sterile dressing on sacral pressure ulcer..."
                    onChange={(e) => setActiveForm({ ...activeForm, content: { ...activeForm.content, notes: e.target.value } })}
                  />
                  <div className="f" style={{ marginTop: '6px' }}><label>Care Plan &amp; Recommendations</label>
                    <input
                      value={activeForm.content.plan || ''}
                      placeholder="e.g. Turn patient q2h, keep skin barrier cream applied, high protein diet"
                      onChange={(e) => setActiveForm({ ...activeForm, content: { ...activeForm.content, plan: e.target.value } })}
                    /></div>
                </div>
              )}

              {/* 2. DOCTOR'S ORDERS */}
              {activeForm.doc_type === 'doctors_orders' && (
                <div className="grid2">
                  <div className="f"><label>Attending Doctor Name</label>
                    <input value={activeForm.content.doctor_name || ''} placeholder="e.g. Dr. Lee (Orthopaedic)"
                      onChange={(e) => setActiveForm({ ...activeForm, content: { ...activeForm.content, doctor_name: e.target.value } })} /></div>
                  <div className="f"><label>Hospital / Clinic</label>
                    <input value={activeForm.content.hospital || ''} placeholder="e.g. Island Hospital / Gleneagles"
                      onChange={(e) => setActiveForm({ ...activeForm, content: { ...activeForm.content, hospital: e.target.value } })} /></div>
                  <div className="f" style={{ gridColumn: 'span 2' }}><label>Doctor's Order / Treatment Directive</label>
                    <textarea rows="3" value={activeForm.content.order_text || ''} placeholder="e.g. Daily wound dressing with Aquacel Ag+, Foley catheter change every 4 weeks..."
                      onChange={(e) => setActiveForm({ ...activeForm, content: { ...activeForm.content, order_text: e.target.value } })} /></div>
                </div>
              )}

              {/* 3. MORSE FALL RISK SCALE */}
              {activeForm.doc_type === 'fall_risk_morse' && (() => {
                const c = activeForm.content;
                const score = (Number(c.history_falls) || 0) + (Number(c.secondary_diag) || 0) +
                              (Number(c.aid) || 0) + (Number(c.iv) || 0) + (Number(c.gait) || 0) + (Number(c.mental) || 0);
                const riskLevel = score >= 45 ? 'High Fall Risk (高风险)' : score >= 25 ? 'Moderate Fall Risk (中风险)' : 'Low / No Risk (低风险)';
                const riskColor = score >= 45 ? '#dc2626' : score >= 25 ? '#d97706' : '#16a34a';

                return (
                  <div>
                    <div style={{ background: '#fef3c7', padding: '8px 12px', borderRadius: '8px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <b>Morse Fall Score: {score} / 125</b>
                      <span style={{ color: riskColor, fontWeight: 800 }}>{riskLevel}</span>
                    </div>
                    <div className="grid2">
                      <div className="f"><label>History of Falling (past 3 months)</label>
                        <select value={c.history_falls} onChange={(e) => setActiveForm({ ...activeForm, content: { ...c, history_falls: Number(e.target.value) } })}>
                          <option value="0">No (0 pts)</option><option value="25">Yes (25 pts)</option>
                        </select></div>
                      <div className="f"><label>Secondary Diagnosis (≥2 medical conditions)</label>
                        <select value={c.secondary_diag} onChange={(e) => setActiveForm({ ...activeForm, content: { ...c, secondary_diag: Number(e.target.value) } })}>
                          <option value="0">No (0 pts)</option><option value="15">Yes (15 pts)</option>
                        </select></div>
                      <div className="f"><label>Ambulatory Aid</label>
                        <select value={c.aid} onChange={(e) => setActiveForm({ ...activeForm, content: { ...c, aid: Number(e.target.value) } })}>
                          <option value="0">None / Bedrest / Wheelchair (0 pts)</option>
                          <option value="15">Crutches / Walking Stick / Frame (15 pts)</option>
                          <option value="30">Furniture Support (30 pts)</option>
                        </select></div>
                      <div className="f"><label>IV Line / Saline Lock</label>
                        <select value={c.iv} onChange={(e) => setActiveForm({ ...activeForm, content: { ...c, iv: Number(e.target.value) } })}>
                          <option value="0">No (0 pts)</option><option value="20">Yes (20 pts)</option>
                        </select></div>
                      <div className="f"><label>Gait / Transferring</label>
                        <select value={c.gait} onChange={(e) => setActiveForm({ ...activeForm, content: { ...c, gait: Number(e.target.value) } })}>
                          <option value="0">Normal / Bedrest / Immobile (0 pts)</option>
                          <option value="10">Weak (10 pts)</option>
                          <option value="20">Impaired / Shuffling (20 pts)</option>
                        </select></div>
                      <div className="f"><label>Mental Status</label>
                        <select value={c.mental} onChange={(e) => setActiveForm({ ...activeForm, content: { ...c, mental: Number(e.target.value) } })}>
                          <option value="0">Oriented to own ability (0 pts)</option>
                          <option value="15">Overestimates / Forgets limitations (15 pts)</option>
                        </select></div>
                    </div>
                  </div>
                );
              })()}

              {/* 4. BRADEN PRESSURE SORE SCALE */}
              {activeForm.doc_type === 'braden_scale' && (() => {
                const c = activeForm.content;
                const score = (Number(c.sensory) || 4) + (Number(c.moisture) || 4) + (Number(c.activity) || 4) +
                              (Number(c.mobility) || 4) + (Number(c.nutrition) || 4) + (Number(c.friction) || 3);
                const risk = score <= 9 ? 'Severe Risk (极高风险)' : score <= 12 ? 'High Risk (高风险)' : score <= 14 ? 'Moderate Risk (中风险)' : score <= 18 ? 'Mild Risk (低风险)' : 'No Risk (无风险)';

                return (
                  <div>
                    <div style={{ background: '#fef2f2', padding: '8px 12px', borderRadius: '8px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <b>Braden Scale Score: {score} / 23</b>
                      <span style={{ color: score <= 12 ? '#dc2626' : '#d97706', fontWeight: 800 }}>{risk}</span>
                    </div>
                    <div className="grid3">
                      <div className="f"><label>Sensory Perception</label>
                        <select value={c.sensory} onChange={(e) => setActiveForm({ ...activeForm, content: { ...c, sensory: Number(e.target.value) } })}>
                          <option value="1">1. Completely Limited</option><option value="2">2. Very Limited</option>
                          <option value="3">3. Slightly Limited</option><option value="4">4. No Impairment</option>
                        </select></div>
                      <div className="f"><label>Moisture Exposure</label>
                        <select value={c.moisture} onChange={(e) => setActiveForm({ ...activeForm, content: { ...c, moisture: Number(e.target.value) } })}>
                          <option value="1">1. Constantly Moist</option><option value="2">2. Very Moist</option>
                          <option value="3">3. Occasionally Moist</option><option value="4">4. Rarely Moist</option>
                        </select></div>
                      <div className="f"><label>Activity</label>
                        <select value={c.activity} onChange={(e) => setActiveForm({ ...activeForm, content: { ...c, activity: Number(e.target.value) } })}>
                          <option value="1">1. Bedfast</option><option value="2">2. Chairfast</option>
                          <option value="3">3. Walks Occasionally</option><option value="4">4. Walks Frequently</option>
                        </select></div>
                      <div className="f"><label>Mobility</label>
                        <select value={c.mobility} onChange={(e) => setActiveForm({ ...activeForm, content: { ...c, mobility: Number(e.target.value) } })}>
                          <option value="1">1. Completely Immobile</option><option value="2">2. Very Limited</option>
                          <option value="3">3. Slightly Limited</option><option value="4">4. No Limitations</option>
                        </select></div>
                      <div className="f"><label>Nutrition</label>
                        <select value={c.nutrition} onChange={(e) => setActiveForm({ ...activeForm, content: { ...c, nutrition: Number(e.target.value) } })}>
                          <option value="1">1. Very Poor</option><option value="2">2. Probably Inadequate</option>
                          <option value="3">3. Adequate</option><option value="4">4. Excellent</option>
                        </select></div>
                      <div className="f"><label>Friction &amp; Shear</label>
                        <select value={c.friction} onChange={(e) => setActiveForm({ ...activeForm, content: { ...c, friction: Number(e.target.value) } })}>
                          <option value="1">1. Problem</option><option value="2">2. Potential Problem</option>
                          <option value="3">3. No Apparent Problem</option>
                        </select></div>
                    </div>
                  </div>
                );
              })()}

              {/* 5. NURSING CARE PLAN (NCP) */}
              {activeForm.doc_type === 'care_plan_ncp' && (
                <div>
                  <div className="f"><label>Nursing Diagnosis</label>
                    <input value={activeForm.content.diagnosis || ''} placeholder="e.g. Impaired skin integrity r/t immobility"
                      onChange={(e) => setActiveForm({ ...activeForm, content: { ...activeForm.content, diagnosis: e.target.value } })} /></div>
                  <div className="f"><label>Expected Goals / Outcomes</label>
                    <input value={activeForm.content.goal || ''} placeholder="e.g. Wound bed demonstrates granulation within 14 days"
                      onChange={(e) => setActiveForm({ ...activeForm, content: { ...activeForm.content, goal: e.target.value } })} /></div>
                  <div className="f"><label>Nursing Interventions</label>
                    <textarea rows="3" value={activeForm.content.interventions || ''} placeholder="1. Q2H position repositioning. 2. Aseptic wound dressing..."
                      onChange={(e) => setActiveForm({ ...activeForm, content: { ...activeForm.content, interventions: e.target.value } })} /></div>
                </div>
              )}

              {/* 6. FLUID INTAKE / OUTPUT (I/O) */}
              {activeForm.doc_type === 'io_balance' && (
                <div className="grid2">
                  <div className="f"><label>Oral / Enteral Feeds (ml)</label>
                    <input type="number" value={activeForm.content.oral_in || ''} placeholder="e.g. 1500"
                      onChange={(e) => setActiveForm({ ...activeForm, content: { ...activeForm.content, oral_in: e.target.value } })} /></div>
                  <div className="f"><label>IV Fluids Infused (ml)</label>
                    <input type="number" value={activeForm.content.iv_in || ''} placeholder="e.g. 500"
                      onChange={(e) => setActiveForm({ ...activeForm, content: { ...activeForm.content, iv_in: e.target.value } })} /></div>
                  <div className="f"><label>Urine Output (ml)</label>
                    <input type="number" value={activeForm.content.urine_out || ''} placeholder="e.g. 1200"
                      onChange={(e) => setActiveForm({ ...activeForm, content: { ...activeForm.content, urine_out: e.target.value } })} /></div>
                  <div className="f"><label>Drain / Emesis / Stool (ml)</label>
                    <input type="number" value={activeForm.content.drain_out || ''} placeholder="e.g. 100"
                      onChange={(e) => setActiveForm({ ...activeForm, content: { ...activeForm.content, drain_out: e.target.value } })} /></div>
                </div>
              )}

              {/* 7. MEDICAL FILE / LAB UPLOAD */}
              {activeForm.doc_type === 'uploaded_file' && (
                <div>
                  <div className="f"><label>Upload Document / Image / Lab Report</label>
                    <input type="file" accept="image/*,application/pdf" onChange={handleFileUpload} /></div>
                  {activeForm.attachment_url && (
                    <div style={{ margin: '8px 0', fontSize: '0.8rem', color: '#16a34a' }}>
                      ✓ File attached: {activeForm.content.file_name || 'Document'}
                    </div>
                  )}
                  <div className="f"><label>File Description / Notes</label>
                    <input value={activeForm.content.notes || ''} placeholder="e.g. Hospital Discharge Summary from 20 Aug"
                      onChange={(e) => setActiveForm({ ...activeForm, content: { ...activeForm.content, notes: e.target.value } })} /></div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '14px' }}>
                <button className="ghost" onClick={() => { setShowAdd(false); setActiveForm(null); }}>Cancel</button>
                <button className="pri" onClick={saveDoc} disabled={busy}>💾 Save Assessment</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE TOGGLE TABS */}
      {(() => {
        const matrixData = buildLongitudinalMatrix(docs);
        const labDocsCount = docs.filter(d => d.doc_type === 'lab_results' || (d.doc_type === 'uploaded_file' && d.content?.readings)).length;

        return (
          <div>
            <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', margin: '18px 0 12px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setViewTab('docs')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    border: 'none',
                    background: viewTab === 'docs' ? 'var(--navy)' : '#f1f5f9',
                    color: viewTab === 'docs' ? '#fff' : '#475569',
                    cursor: 'pointer'
                  }}
                >
                  📁 All Clinical Documents ({docs.length})
                </button>
                <button
                  type="button"
                  onClick={() => setViewTab('lab_summary')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    border: 'none',
                    background: viewTab === 'lab_summary' ? 'var(--blue)' : '#f1f5f9',
                    color: viewTab === 'lab_summary' ? '#fff' : '#475569',
                    cursor: 'pointer'
                  }}
                >
                  📊 Longitudinal Lab Tracker &amp; Serial Matrix ({labDocsCount})
                </button>
              </div>

              {viewTab === 'lab_summary' && matrixData.columns.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--muted)' }}>Filter Panel:</label>
                  <select
                    value={matrixFilterPanel}
                    onChange={(e) => setMatrixFilterPanel(e.target.value)}
                    style={{ fontSize: '0.8rem', fontWeight: 700, padding: '3px 8px' }}
                  >
                    <option value="all">All Lab Panels</option>
                    {LAB_PANELS.map(p => <option key={p.id} value={p.id}>{p.shortName}</option>)}
                  </select>
                </div>
              )}
            </div>

            {/* TAB 1: ALL CLINICAL DOCUMENTS */}
            {viewTab === 'docs' && (
              <div>
                {loading ? (
                  <p className="muted">Loading clinical records…</p>
                ) : docs.length === 0 ? (
                  <p className="empty">No clinical assessments added yet. Tap "+ New Clinical Assessment" above.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {docs.map((d) => (
                      <div
                        key={d.id}
                        style={{
                          background: '#fff',
                          border: d.doc_type === 'lab_results' && evaluateLabSet(d.content?.readings).criticals.length > 0 ? '2px solid #ef4444' : '1px solid var(--line)',
                          borderRadius: '10px',
                          padding: '12px 14px',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '6px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              <b style={{ color: 'var(--navy)', fontSize: '0.96rem' }}>{d.title}</b>
                              {d.doc_type === 'lab_results' && (() => {
                                const ev = evaluateLabSet(d.content?.readings);
                                if (ev.criticals.length > 0) {
                                  return (
                                    <span style={{ background: '#fee2e2', color: '#b91c1c', border: '1px solid #ef4444', fontSize: '0.72rem', fontWeight: 800, padding: '1px 6px', borderRadius: '4px' }}>
                                      🚨 {ev.criticals.length} CRITICAL VALUE(S)
                                    </span>
                                  );
                                }
                                if (ev.abnormals.length > 0) {
                                  return (
                                    <span style={{ background: '#fef3c7', color: '#b45309', border: '1px solid #f59e0b', fontSize: '0.72rem', fontWeight: 700, padding: '1px 6px', borderRadius: '4px' }}>
                                      ⚠️ {ev.abnormals.length} Abnormal
                                    </span>
                                  );
                                }
                                return (
                                  <span style={{ background: '#dcfce7', color: '#166534', border: '1px solid #86efac', fontSize: '0.72rem', fontWeight: 700, padding: '1px 6px', borderRadius: '4px' }}>
                                    ✓ All Normal
                                  </span>
                                );
                              })()}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: 'var(--muted)', marginTop: '2px' }}>
                              Recorded by <b>{d.author_name || 'Staff'}</b> on {new Date(d.created_at).toLocaleDateString('en-MY', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              {d.content?.lab_provider && <span> · Facility: <b>{d.content.lab_provider}</b></span>}
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '6px' }}>
                            {d.doc_type === 'lab_results' && (
                              <button
                                className="ghost xs"
                                onClick={() => {
                                  const ev = evaluateLabSet(d.content?.readings);
                                  const dateStr = `${d.content?.test_date || ''} ${d.content?.test_time || ''}`.trim() || new Date(d.created_at).toLocaleDateString('en-GB');
                                  const txt = generateSbarSummary(c, d.title, dateStr, d.content?.readings || {}, ev.criticals);
                                  navigator.clipboard.writeText(txt);
                                  flash('✓ SBAR text copied to clipboard!');
                                }}
                              >
                                📋 SBAR
                              </button>
                            )}
                            <button
                              className="link xs"
                              onClick={() => {
                                setActiveForm({ title: d.title, doc_type: d.doc_type, content: d.content, attachment_url: d.attachment_url });
                                setEditingDocId(d.id);
                                if (d.content?.panel_id) setSelectedLabPanel(d.content.panel_id);
                                setShowAdd(true);
                              }}
                            >
                              ✏️ Edit
                            </button>
                            <button className="danger xs" onClick={() => deleteDoc(d.id)}>
                              🗑️ Void
                            </button>
                          </div>
                        </div>

                        {/* Render Structured Content */}
                        <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', fontSize: '0.82rem', marginTop: '8px', color: '#334155' }}>
                          {/* LAB RESULTS CARD VIEW */}
                          {d.doc_type === 'lab_results' && (() => {
                            const readings = d.content?.readings || {};
                            const keys = Object.keys(readings);
                            if (!keys.length) return <div className="muted">No parameters recorded in this test.</div>;

                            return (
                              <div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '6px', marginBottom: '6px' }}>
                                  {keys.map(k => {
                                    const val = readings[k];
                                    const ev = evaluateLabParam(k, val);
                                    return (
                                      <div
                                        key={k}
                                        style={{
                                          background: ev.bg,
                                          border: `1px solid ${ev.borderColor}`,
                                          padding: '5px 8px',
                                          borderRadius: '6px',
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          alignItems: 'center'
                                        }}
                                      >
                                        <div>
                                          <div style={{ fontWeight: 700, fontSize: '0.76rem', color: '#1e293b' }}>
                                            {ev.def?.name || k}
                                          </div>
                                          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                                            Ref: {ev.def?.min ?? '—'}–{ev.def?.max ?? '—'} {ev.def?.unit}
                                          </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: ev.status.startsWith('crit') ? '#b91c1c' : '#0f172a' }}>
                                            {val} <span style={{ fontSize: '0.7rem' }}>{ev.def?.unit}</span>
                                          </div>
                                          <span style={{ fontSize: '0.66rem', fontWeight: 800, color: ev.status.startsWith('crit') ? '#b91c1c' : ev.status !== 'normal' ? '#b45309' : '#166534' }}>
                                            {ev.badge}
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>

                                {d.content?.notes && (
                                  <div style={{ marginTop: '6px', fontSize: '0.8rem', color: '#334155' }}>
                                    <b>Clinical Notes / Directive:</b> {d.content.notes}
                                  </div>
                                )}

                                {d.attachment_url && (
                                  <div style={{ marginTop: '6px' }}>
                                    {d.attachment_url.startsWith('data:image') ? (
                                      <img src={d.attachment_url} style={{ maxHeight: '140px', borderRadius: '6px', border: '1px solid #cbd5e1' }} alt="Lab Slip Preview" />
                                    ) : (
                                      <a href={d.attachment_url} target="_blank" rel="noopener noreferrer" className="link">📄 View Attached Lab Report Document</a>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })()}

                          {d.doc_type === 'progress_notes' && (
                            <div>
                              <p style={{ whiteSpace: 'pre-line' }}>{d.content.notes}</p>
                              {d.content.plan && <div style={{ marginTop: '4px', fontWeight: 700, color: 'var(--blue)' }}>Plan: {d.content.plan}</div>}
                            </div>
                          )}
                          {d.doc_type === 'doctors_orders' && (
                            <div>
                              <b>Doctor:</b> {d.content.doctor_name} ({d.content.hospital})
                              <div style={{ marginTop: '4px', whiteSpace: 'pre-line' }}>{d.content.order_text}</div>
                            </div>
                          )}
                          {d.doc_type === 'fall_risk_morse' && (
                            <div>
                              <b>Morse Score:</b> {(Number(d.content.history_falls) || 0) + (Number(d.content.secondary_diag) || 0) + (Number(d.content.aid) || 0) + (Number(d.content.iv) || 0) + (Number(d.content.gait) || 0) + (Number(d.content.mental) || 0)} / 125
                            </div>
                          )}
                          {d.doc_type === 'braden_scale' && (
                            <div>
                              <b>Braden Score:</b> {(Number(d.content.sensory) || 4) + (Number(d.content.moisture) || 4) + (Number(d.content.activity) || 4) + (Number(d.content.mobility) || 4) + (Number(d.content.nutrition) || 4) + (Number(d.content.friction) || 3)} / 23
                            </div>
                          )}
                          {d.doc_type === 'care_plan_ncp' && (
                            <div>
                              <b>Diagnosis:</b> {d.content.diagnosis}<br />
                              <b>Goal:</b> {d.content.goal}<br />
                              <b>Interventions:</b> {d.content.interventions}
                            </div>
                          )}
                          {d.doc_type === 'io_balance' && (
                            <div>
                              <b>Total In:</b> {(Number(d.content.oral_in) || 0) + (Number(d.content.iv_in) || 0)} ml · <b>Total Out:</b> {(Number(d.content.urine_out) || 0) + (Number(d.content.drain_out) || 0)} ml
                            </div>
                          )}
                          {d.doc_type === 'uploaded_file' && (
                            <div>
                              {d.attachment_url && d.attachment_url.startsWith('data:image') ? (
                                <img src={d.attachment_url} style={{ maxHeight: '140px', borderRadius: '6px', marginTop: '4px' }} alt="Doc upload" />
                              ) : (
                                <a href={d.attachment_url} target="_blank" rel="noopener noreferrer" className="link">📄 View Attached File</a>
                              )}
                              {d.content.notes && <div style={{ marginTop: '4px' }}>{d.content.notes}</div>}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: LONGITUDINAL LAB TRACKER & SERIAL SUMMARY MATRIX */}
            {viewTab === 'lab_summary' && (
              <div>
                {matrixData.columns.length === 0 ? (
                  <div style={{ background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '10px', padding: '30px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🧪</div>
                    <b style={{ color: 'var(--navy)', fontSize: '1rem' }}>No Blood Tests or Lab Results Recorded Yet</b>
                    <p style={{ color: 'var(--muted)', fontSize: '0.85rem', margin: '6px 0 14px' }}>
                      Add your first laboratory assessment or ABG to begin tracking serial trends across dates.
                    </p>
                    <button className="pri sm" onClick={() => startNewDoc('lab_results')}>
                      ＋ Add New Lab Result / ABG
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                        Tracking <b>{matrixData.columns.length} serial test(s)</b> across timeline. Color codes: <span style={{ color: '#16a34a', fontWeight: 700 }}>■ Normal</span> · <span style={{ color: '#d97706', fontWeight: 700 }}>■ Abnormal</span> · <span style={{ color: '#dc2626', fontWeight: 800 }}>■ 🚨 Critical / Panic</span>
                      </div>
                    </div>

                    <div style={{ overflowX: 'auto', border: '1.5px solid #cbd5e1', borderRadius: '10px', background: '#fff', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                        <thead>
                          <tr style={{ background: '#0f2b48', color: '#fff', textAlign: 'left' }}>
                            <th style={{ padding: '8px 10px', borderRight: '1px solid #1e40af', minWidth: '180px', position: 'sticky', left: 0, background: '#0f2b48', zIndex: 2 }}>
                              Lab Test Parameter
                            </th>
                            <th style={{ padding: '8px 8px', borderRight: '1px solid #1e40af', width: '65px', textAlign: 'center' }}>
                              Unit
                            </th>
                            <th style={{ padding: '8px 8px', borderRight: '1px solid #1e40af', width: '110px', textAlign: 'center' }}>
                              Standard Ref
                            </th>
                            {matrixData.columns.map((col, idx) => (
                              <th
                                key={col.id}
                                style={{
                                  padding: '8px 10px',
                                  borderRight: '1px solid #1e40af',
                                  minWidth: '110px',
                                  textAlign: 'center',
                                  background: col.evaluation.criticals.length > 0 ? '#991b1b' : '#0f2b48'
                                }}
                              >
                                <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>Test #{idx + 1}</div>
                                <div style={{ fontSize: '0.72rem', opacity: 0.9 }}>{col.dateStr}</div>
                                {col.evaluation.criticals.length > 0 && (
                                  <div style={{ fontSize: '0.65rem', background: '#fee2e2', color: '#991b1b', borderRadius: '3px', padding: '1px 3px', marginTop: '2px', fontWeight: 800 }}>
                                    🚨 {col.evaluation.criticals.length} Critical
                                  </div>
                                )}
                              </th>
                            ))}
                            {matrixData.columns.length >= 2 && (
                              <th style={{ padding: '8px 10px', textAlign: 'center', width: '110px', background: '#0369a1' }}>
                                Serial Delta (Latest Trend)
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                            const filteredRows = matrixFilterPanel === 'all'
                              ? matrixData.rows
                              : matrixData.rows.filter(r => r.panelId === matrixFilterPanel);

                            if (!filteredRows.length) {
                              return (
                                <tr>
                                  <td colSpan={3 + matrixData.columns.length + (matrixData.columns.length >= 2 ? 1 : 0)} style={{ padding: '20px', textAlign: 'center', color: 'var(--muted)' }}>
                                    No parameters recorded for the selected panel filter.
                                  </td>
                                </tr>
                              );
                            }

                            let currentPanelHeader = null;
                            return filteredRows.map(row => {
                              const showHeader = row.panelName !== currentPanelHeader;
                              if (showHeader) currentPanelHeader = row.panelName;

                              return (
                                <Fragment key={row.key}>
                                  {showHeader && (
                                    <tr key={`hdr_${row.panelId}`} style={{ background: '#f1f5f9', fontWeight: 800, color: 'var(--navy)', borderTop: '2px solid #cbd5e1' }}>
                                      <td colSpan={3 + matrixData.columns.length + (matrixData.columns.length >= 2 ? 1 : 0)} style={{ padding: '6px 10px', fontSize: '0.82rem' }}>
                                        {row.panelName} Panel
                                      </td>
                                    </tr>
                                  )}
                                  <tr key={row.key} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '6px 10px', fontWeight: 700, color: '#1e293b', borderRight: '1px solid #e2e8f0', position: 'sticky', left: 0, background: '#fff', zIndex: 1 }}>
                                      {row.name}
                                    </td>
                                    <td style={{ padding: '6px 6px', textAlign: 'center', color: '#64748b', fontSize: '0.74rem', borderRight: '1px solid #e2e8f0' }}>
                                      {row.unit || '—'}
                                    </td>
                                    <td style={{ padding: '6px 6px', textAlign: 'center', color: '#64748b', fontSize: '0.74rem', borderRight: '1px solid #e2e8f0' }}>
                                      {row.refRange}
                                    </td>
                                    {row.values.map((v, cIdx) => {
                                      if (!v) {
                                        return <td key={cIdx} style={{ padding: '6px 10px', textAlign: 'center', color: '#cbd5e1', borderRight: '1px solid #e2e8f0' }}>—</td>;
                                      }
                                      return (
                                        <td
                                          key={cIdx}
                                          style={{
                                            padding: '6px 10px',
                                            textAlign: 'center',
                                            background: v.bg,
                                            borderRight: '1px solid #e2e8f0'
                                          }}
                                        >
                                          <div style={{ fontWeight: 800, fontSize: '0.88rem', color: v.status.startsWith('crit') ? '#b91c1c' : '#0f172a' }}>
                                            {v.val}
                                          </div>
                                          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: v.status.startsWith('crit') ? '#b91c1c' : v.status !== 'normal' ? '#b45309' : '#166534' }}>
                                            {v.badge}
                                          </div>
                                        </td>
                                      );
                                    })}
                                    {matrixData.columns.length >= 2 && (
                                      <td style={{ padding: '6px 10px', textAlign: 'center', background: '#f8fafc' }}>
                                        {row.delta ? (
                                          <div style={{ fontWeight: 800, fontSize: '0.8rem', color: row.delta.direction === 'up' ? '#dc2626' : row.delta.direction === 'down' ? '#2563eb' : '#64748b' }}>
                                            {row.delta.direction === 'up' ? '▲ +' : row.delta.direction === 'down' ? '▼ ' : '= '}
                                            {row.delta.diff} {row.delta.pct ? `(${row.delta.pct}%)` : ''}
                                          </div>
                                        ) : (
                                          <span style={{ color: '#cbd5e1' }}>—</span>
                                        )}
                                      </td>
                                    )}
                                  </tr>
                                </Fragment>
                              );
                            });
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })()}
    </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { api } from '../api.js';
import TubesTracker from './TubesTracker.jsx';
import ConsentModal from './ConsentModal.jsx';
import ClinicalFormsModal from './ClinicalFormsModal.jsx';
import SosModal from './SosModal.jsx';

export default function PatientSummaryCard({ patient, caseId, onUpdated, readonly = false, me }) {
  const [editing, setEditing] = useState(false);
  const [fullStudyOpen, setFullStudyOpen] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [consentInitialTab, setConsentInitialTab] = useState('sign');
  const [showClinicalForms, setShowClinicalForms] = useState(false);
  const [clinicalFormsTab, setClinicalFormsTab] = useState('braden');
  const [showSos, setShowSos] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [checkedTasks, setCheckedTasks] = useState({});

  const [consentsList, setConsentsList] = useState([]);

  const p = patient || {};
  const isDnrActive = p.dnr_active === 1 || p.dnr_active === true;

  async function loadConsents() {
    try {
      const res = await fetch(`/api/consents?case_id=${encodeURIComponent(caseId)}`, { credentials: 'same-origin' });
      const data = await res.json().catch(() => ({}));
      setConsentsList(data.consents || []);
    } catch (_) {}
  }

  useEffect(() => {
    loadConsents();
  }, [caseId]);

  const pendingVo = consentsList.filter(c => c.status === 'pending_consent_sign');
  const pendingApprovals = consentsList.filter(c => c.status === 'pending_approval');

  const [form, setForm] = useState({
    case_brief: p.case_brief || '',
    things_to_aware: p.things_to_aware || '',
    things_to_do: p.things_to_do || '',
    medical_history: p.medical_history || '',
    devices_tubes: p.devices_tubes || '',
    mobility_status: p.mobility_status || '',
    feeding_regimen: p.feeding_regimen || '',
    emergency_contacts: p.emergency_contacts || '',
    allergies: p.allergies || '',
  });

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3000); };

  async function save() {
    setBusy(true);
    try {
      const res = await fetch(`/api/cases/${encodeURIComponent(caseId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          action: 'update_assessment',
          ...form,
        }),
      });
      const text = await res.text().catch(() => '');
      let data = {};
      try { data = text ? JSON.parse(text) : {}; } catch (_) {
        data = { error: `Server error (${res.status}): ${text.slice(0, 100) || res.statusText || 'Unable to process'}` };
      }
      if (!res.ok) throw new Error(data.error || 'Failed to update patient assessment');

      flash('✓ Patient background & summary updated successfully!');
      setEditing(false);
      setFullStudyOpen(false);
      if (onUpdated) onUpdated();
    } catch (e) {
      flash(e.message);
    } finally {
      setBusy(false);
    }
  }

  // Parse tasks from multiline text
  const tasks = (p.things_to_do || '')
    .split('\n')
    .map((t) => t.trim().replace(/^[-*•]\s*/, ''))
    .filter(Boolean);

  const awareList = (p.things_to_aware || '')
    .split('\n')
    .map((a) => a.trim().replace(/^[-*•]\s*/, ''))
    .filter(Boolean);

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1.5px solid #0d3a54',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px',
        boxShadow: '0 3px 10px rgba(13,58,84,0.08)',
      }}
    >
      {/* CARD HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', borderBottom: '1.5px solid #e2e8f0', paddingBottom: '10px', marginBottom: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.25rem' }}>📌</span>
            <b style={{ color: '#0d3a54', fontSize: '1.1rem' }}>Patient Summary &amp; Shift Briefing</b>
            <span className="sbadge s-intake" style={{ fontSize: '0.72rem', textTransform: 'uppercase' }}>
              {p.care_type === 'procedure' ? 'Procedure' : 'Long-Term Care (长期护理)'}
            </span>
            {isDnrActive && (
              <span style={{ background: '#fef2f2', color: '#b91c1c', border: '1.5px solid #f87171', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                🕊️ DNR DIRECTIVE (生前预嘱已生效)
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '2px' }}>
            Essential background briefing, safety precautions &amp; routine checklist for attending staff.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            className="danger xs"
            onClick={() => setShowSos(true)}
            style={{ fontWeight: 800, padding: '3px 8px' }}
          >
            🚨 SOS
          </button>
          {!readonly && (
            <>
              <button
                className="pri xs"
                onClick={() => { setConsentInitialTab('sign'); setShowConsent(true); }}
                style={{ fontWeight: 700, background: pendingVo.length ? '#dc2626' : undefined }}
              >
                ✍️ Consents &amp; DNR ({consentsList.length})
                {pendingVo.length > 0 && ` 🚨 VO (${pendingVo.length})`}
                {pendingApprovals.length > 0 && ` · 🟡 ${pendingApprovals.length}`}
              </button>
              <button
                className="ghost xs"
                onClick={() => { setClinicalFormsTab('braden'); setShowClinicalForms(true); }}
                style={{ fontWeight: 700, color: '#0d3a54', borderColor: '#94a3b8' }}
              >
                📑 Clinical Charts &amp; Forms
              </button>
              <button
                className="ghost xs"
                onClick={() => { setForm({ ...p }); setFullStudyOpen(true); }}
                style={{ fontWeight: 700 }}
              >
                📋 Background Study
              </button>
              <button
                className="pri xs"
                onClick={() => { setForm({ ...p }); setEditing(!editing); }}
                style={{ fontWeight: 700 }}
              >
                {editing ? '✕ Close' : '✏️ Edit Brief'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* EMERGENCY VERBAL ORDER PENDING SIGNATURE ALERT BANNER */}
      {pendingVo.length > 0 && (
        <div style={{ background: '#fef2f2', border: '1.5px solid #f87171', borderRadius: '8px', padding: '10px 14px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <b style={{ color: '#991b1b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🚨 URGENT: Emergency Verbal Order (口头医嘱) Pending Written Consent Signing!
            </b>
            <div style={{ fontSize: '0.76rem', color: '#b91c1c', marginTop: '2px' }}>
              Doctor gave emergency verbal order for <b>{pendingVo.map(v => v.procedure_name).join(', ')}</b>. Per clinical governance, written consent must be signed within 24 hours.
            </div>
          </div>
          <button
            className="danger xs"
            onClick={() => { setConsentInitialTab('list'); setShowConsent(true); }}
            style={{ fontWeight: 800 }}
          >
            ✍️ Sign Consent Form Now →
          </button>
        </div>
      )}

      {status && <p className="status" style={{ marginBottom: '10px' }}>{status}</p>}

      {/* EDIT MODAL / INLINE FORM */}
      {(editing || fullStudyOpen) && (
        <div style={{ background: '#f8fafc', border: '1.5px solid var(--blue)', borderRadius: '10px', padding: '14px', marginBottom: '14px' }}>
          <h4 style={{ margin: '0 0 10px', color: '#0d3a54' }}>
            {fullStudyOpen ? '📋 Comprehensive Long-Term & Complex Care Background Study' : '✏️ Edit Case Brief & Alerts'}
          </h4>

          <div className="f">
            <label style={{ fontWeight: 700 }}>📌 1. Case Brief / Background Summary (个案背景简述)</label>
            <textarea
              rows="2"
              value={form.case_brief}
              placeholder="e.g. 78yo bedbound female post-stroke with right hemiplegia. Tracheostomy and PEG feeding in-situ. Alert but non-verbal."
              onChange={(e) => setForm({ ...form, case_brief: e.target.value })}
            />
          </div>

          <div className="grid2">
            <div className="f">
              <label style={{ fontWeight: 700, color: '#dc2626' }}>⚠️ 2. Things to Aware &amp; Precautions (关键注意事项 &amp; 警报)</label>
              <textarea
                rows="3"
                value={form.things_to_aware}
                placeholder="One item per line:\n- High fall risk (bed rails up)\n- Strict aspiration precautions\n- Allergic to Penicillin\n- Reposition Q2H to prevent sacral sore"
                onChange={(e) => setForm({ ...form, things_to_aware: e.target.value })}
              />
            </div>

            <div className="f">
              <label style={{ fontWeight: 700, color: '#16a34a' }}>✅ 3. Things to Do Checklist (当班执行清单)</label>
              <textarea
                rows="3"
                value={form.things_to_do}
                placeholder="One task per line:\n- Check MEWS vitals at 09:00\n- PEG feeding 250ml Ensure + 50ml flush\n- Aseptic wound dressing on left heel\n- Suction tracheostomy prn"
                onChange={(e) => setForm({ ...form, things_to_do: e.target.value })}
              />
            </div>
          </div>

          {/* EXTENDED BACKGROUND STUDY FIELDS */}
          {fullStudyOpen && (
            <div style={{ marginTop: '10px', borderTop: '1px solid #cbd5e1', paddingTop: '10px' }}>
              <div className="grid2">
                <div className="f"><label>🩺 Past Medical &amp; Surgical History</label>
                  <textarea rows="2" value={form.medical_history} placeholder="e.g. HTN, T2DM, Ischaemic Stroke (2024), CABG (2018)"
                    onChange={(e) => setForm({ ...form, medical_history: e.target.value })} /></div>
                <div className="f"><label>🩻 Active Devices &amp; Tubes in-situ</label>
                  <textarea rows="2" value={form.devices_tubes} placeholder="e.g. Ryles Tube Fr16 (due 15 Sep), Foley Catheter Fr16 (due 28 Sep), Trach tube size 7.0"
                    onChange={(e) => setForm({ ...form, devices_tubes: e.target.value })} /></div>
                <div className="f"><label>🚶 Mobility &amp; Functional Transfer</label>
                  <input value={form.mobility_status} placeholder="e.g. Bedbound, 2-person slide sheet transfer to wheelchair"
                    onChange={(e) => setForm({ ...form, mobility_status: e.target.value })} /></div>
                <div className="f"><label>🍲 Feeding Regimen &amp; Swallowing</label>
                  <input value={form.feeding_regimen} placeholder="e.g. Glucerna 250ml Q4H (08:00, 12:00, 16:00, 20:00) + 100ml water flush"
                    onChange={(e) => setForm({ ...form, feeding_regimen: e.target.value })} /></div>
                <div className="f" style={{ gridColumn: 'span 2' }}><label>📞 Family Dynamics &amp; Emergency Contacts</label>
                  <input value={form.emergency_contacts} placeholder="e.g. Son: Mr. Tan (012-3456789), Helper: Siti (living with patient). Full resuscitation status."
                    onChange={(e) => setForm({ ...form, emergency_contacts: e.target.value })} /></div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px' }}>
            <button className="ghost sm" onClick={() => { setEditing(false); setFullStudyOpen(false); }}>Cancel</button>
            <button className="pri sm" onClick={save} disabled={busy}>💾 Save Patient Assessment</button>
          </div>
        </div>
      )}

      {/* 3-COLUMN CLINICAL DASHBOARD */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
        
        {/* COLUMN 1: CASE BRIEF */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
          <b style={{ color: '#0d3a54', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>📖</span> Case Brief &amp; Diagnosis
          </b>
          <div style={{ fontSize: '0.82rem', color: '#334155', marginTop: '6px', lineHeight: 1.45 }}>
            {p.case_brief || p.notes || (
              <span style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
                No case brief recorded yet. Tap "Edit Brief" to summarize patient condition.
              </span>
            )}
          </div>

          {p.medical_history && (
            <div style={{ marginTop: '8px', fontSize: '0.76rem', color: '#475569' }}>
              <b>History:</b> {p.medical_history}
            </div>
          )}
          {p.devices_tubes && (
            <div style={{ marginTop: '4px', fontSize: '0.76rem', color: '#0369a1' }}>
              <b>Devices:</b> {p.devices_tubes}
            </div>
          )}
        </div>

        {/* COLUMN 2: THINGS TO AWARE (PRECAUTIONS) */}
        <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: '8px', padding: '12px' }}>
          <b style={{ color: '#991b1b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>⚠️</span> Things to Aware (注意事项)
          </b>
          {awareList.length === 0 ? (
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '6px', fontStyle: 'italic' }}>
              No critical precautions logged.
            </div>
          ) : (
            <ul style={{ margin: '6px 0 0', paddingLeft: '18px', fontSize: '0.82rem', color: '#7f1d1d', lineHeight: 1.4 }}>
              {awareList.map((a, i) => (
                <li key={i} style={{ marginBottom: '4px', fontWeight: 600 }}>{a}</li>
              ))}
            </ul>
          )}
          {p.allergies && (
            <div style={{ marginTop: '6px', background: '#fee2e2', padding: '4px 6px', borderRadius: '4px', fontSize: '0.76rem', color: '#991b1b', fontWeight: 700 }}>
              🚫 ALLERGIES: {p.allergies}
            </div>
          )}
        </div>

        {/* COLUMN 3: THINGS TO DO (CHECKLIST) */}
        <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '8px', padding: '12px' }}>
          <b style={{ color: '#166534', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>✅</span> Shift Care Routine (必须执行事项)
          </b>
          {tasks.length === 0 ? (
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '6px', fontStyle: 'italic' }}>
              No specific shift tasks defined.
            </div>
          ) : (
            <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {tasks.map((t, i) => (
                <label
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px',
                    fontSize: '0.8rem',
                    color: checkedTasks[i] ? 'var(--muted)' : '#14532d',
                    textDecoration: checkedTasks[i] ? 'line-through' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!checkedTasks[i]}
                    onChange={(e) => setCheckedTasks({ ...checkedTasks, [i]: e.target.checked })}
                    style={{ marginTop: '2px' }}
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* EMBEDDED TUBES & CATHETER EXPIRY TRACKER */}
      <TubesTracker caseId={caseId} patientName={p.name} me={me} />

      {/* MODALS */}
      {showConsent && (
        <ConsentModal
          caseId={caseId}
          patientName={p.name || 'Patient'}
          initialTab={consentInitialTab}
          onClose={() => setShowConsent(false)}
          onSaved={() => {
            flash('✓ Consents updated & synchronized.');
            loadConsents();
            onUpdated && onUpdated();
          }}
          me={me}
        />
      )}

      {showClinicalForms && (
        <ClinicalFormsModal
          caseId={caseId}
          patientName={p.name || 'Patient'}
          initialDoc={clinicalFormsTab}
          onClose={() => setShowClinicalForms(false)}
          onSaved={() => {
            flash('✓ Clinical assessments updated.');
            onUpdated && onUpdated();
          }}
          me={me}
        />
      )}

      {showSos && (
        <SosModal
          patient={p}
          caseId={caseId}
          onClose={() => setShowSos(false)}
          me={me}
        />
      )}
    </div>
  );
}

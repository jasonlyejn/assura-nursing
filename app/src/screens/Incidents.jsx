import { useEffect, useState } from 'react';
import { api } from '../api.js';

const INCIDENT_TYPES = [
  ['fall', '⚠️ Patient Slip / Fall (跌倒与滑倒)'],
  ['skin_tear', '🩹 Skin Tear / Pressure Sore (皮肤撕裂/压疮)'],
  ['tube_dislodgement', '🩻 Tube Dislodgement / Foley / Ryles (管路滑脱)'],
  ['med_error', '💊 Medication Error / Omission (用药差错/遗漏)'],
  ['injury', '🩺 Minor Injury / Bruise (轻微外伤)'],
  ['emergency', '🚨 Acute Medical Emergency / CPR (急症抢救)'],
  ['other', '📋 Other Incident (其他意外事件)'],
];

export default function Incidents({ me, onBack }) {
  const [incidents, setIncidents] = useState([]);
  const [cases, setCases] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    case_id: '', incident_type: 'fall', severity: 'minor',
    incident_date: new Date().toISOString().split('T')[0],
    incident_time: new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' }),
    description: '', vitals_post_incident: '', action_taken: '',
    doctor_notified: false, family_notified: false,
  });

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3000); };

  async function load() {
    setLoading(true);
    try {
      const incPromise = fetch('/api/incidents', { credentials: 'same-origin' })
        .then(async (r) => {
          const text = await r.text().catch(() => '');
          try { return text ? JSON.parse(text) : {}; } catch (_) { return {}; }
        }).catch(() => ({}));

      const [incRes, casesRes] = await Promise.all([
        incPromise,
        api.getCases('status=active').catch(() => ({ cases: [] })),
      ]);
      setIncidents(incRes.incidents || []);
      setCases(casesRes.cases || []);
    } catch (e) {
      flash(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function submitIncident() {
    if (!form.description.trim()) { flash('Description is required'); return; }
    setBusy(true);
    try {
      const res = await fetch('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(form),
      });
      const text = await res.text().catch(() => '');
      let data = {};
      try { data = text ? JSON.parse(text) : {}; } catch (_) {
        data = { error: `Server error (${res.status}): ${text.slice(0, 100) || res.statusText || 'Unable to process'}` };
      }
      if (!res.ok) throw new Error(data.error || 'Failed to submit incident report');

      flash('✓ Incident report submitted. Management alerted.');
      setShowNew(false);
      setForm({
        case_id: '', incident_type: 'fall', severity: 'minor',
        incident_date: new Date().toISOString().split('T')[0],
        incident_time: new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' }),
        description: '', vitals_post_incident: '', action_taken: '',
        doctor_notified: false, family_notified: false,
      });
      await load();
    } catch (e) {
      flash(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function resolveIncident(id) {
    const notes = prompt('Enter management investigation notes / corrective action:') ?? null;
    if (notes === null) return;
    try {
      await fetch('/api/incidents', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ id, status: 'resolved', investigation_notes: notes }),
      });
      flash('✓ Incident marked as resolved.');
      await load();
    } catch (e) { flash(e.message); }
  }

  return (
    <div>
      {onBack && (
        <div className="case-subbar">
          <button className="case-back-btn" onClick={onBack}>
            <span>←</span> <b>Back to Care</b>
          </button>
          <div className="case-subbar-info">
            <span className="case-view-tag" style={{ background: '#fee2e2', color: '#991b1b', borderColor: '#fca5a5' }}>
              🚨 Incidents &amp; Safety
            </span>
          </div>
        </div>
      )}

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h2 style={{ margin: '4px 0 0' }}>🚨 Clinical Incident &amp; Fall Reporting</h2>
            <p className="muted" style={{ margin: '2px 0 0', fontSize: '0.84rem' }}>
              Document patient falls, injuries, tube dislodgements, and emergencies according to PHFSA clinical standards.
            </p>
          </div>

          <button className="danger sm" onClick={() => setShowNew(!showNew)} style={{ margin: 0 }}>
            {showNew ? '✕ Cancel' : '🚨 Report New Incident (报告意外)'}
          </button>
        </div>

      {status && <p className="status" style={{ marginTop: '10px' }}>{status}</p>}

      {/* NEW INCIDENT REPORT FORM */}
      {showNew && (
        <div style={{ background: '#fef2f2', border: '1.5px solid #f87171', borderRadius: '12px', padding: '16px', margin: '14px 0' }}>
          <h3 style={{ margin: '0 0 10px', color: '#991b1b' }}>🚨 Log Clinical Incident / Fall Event</h3>

          <div className="grid2">
            <div className="f"><label>Patient Case (Optional if general)</label>
              <select value={form.case_id} onChange={(e) => setForm({ ...form, case_id: e.target.value })}>
                <option value="">-- Select Patient --</option>
                {cases.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.care_type})</option>)}
              </select></div>
            <div className="f"><label>Incident Classification</label>
              <select value={form.incident_type} onChange={(e) => setForm({ ...form, incident_type: e.target.value })}>
                {INCIDENT_TYPES.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
              </select></div>
          </div>

          <div className="grid3">
            <div className="f"><label>Severity</label>
              <select value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value })}>
                <option value="minor">Minor (No obvious injury)</option>
                <option value="moderate">Moderate (First aid / dressing required)</option>
                <option value="major">Major (Hospital emergency transfer)</option>
                <option value="sentinel">Sentinel Event</option>
              </select></div>
            <div className="f"><label>Date of Event</label>
              <input type="date" value={form.incident_date} onChange={(e) => setForm({ ...form, incident_date: e.target.value })} /></div>
            <div className="f"><label>Time</label>
              <input type="time" value={form.incident_time} onChange={(e) => setForm({ ...form, incident_time: e.target.value })} /></div>
          </div>

          <div className="f"><label>Detailed Description of What Happened</label>
            <textarea rows="3" value={form.description} placeholder="e.g. Patient found on bedroom floor near bedside. Attempted to get up without assistance..."
              onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>

          <div className="f"><label>Post-Incident Vital Signs &amp; Physical Assessment</label>
            <input value={form.vitals_post_incident} placeholder="e.g. BP 128/80, HR 82, SpO2 98%, GCS 15/15. No head trauma or limb deformities noted."
              onChange={(e) => setForm({ ...form, vitals_post_incident: e.target.value })} /></div>

          <div className="f"><label>Immediate Actions Taken &amp; First Aid</label>
            <textarea rows="2" value={form.action_taken} placeholder="e.g. Assisted patient back to bed safely. Full vitals checked. Bed rails elevated..."
              onChange={(e) => setForm({ ...form, action_taken: e.target.value })} /></div>

          <div className="grid2" style={{ margin: '8px 0' }}>
            <label className="chk" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700 }}>
              <input type="checkbox" checked={form.doctor_notified} onChange={(e) => setForm({ ...form, doctor_notified: e.target.checked })} />
              Attending Doctor Notified (已通知主治医生)
            </label>
            <label className="chk" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700 }}>
              <input type="checkbox" checked={form.family_notified} onChange={(e) => setForm({ ...form, family_notified: e.target.checked })} />
              Family / Next-of-Kin Notified (已通知家属)
            </label>
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px' }}>
            <button className="ghost" onClick={() => setShowNew(false)}>Cancel</button>
            <button className="danger" onClick={submitIncident} disabled={busy}>
              🚨 Submit Incident Report
            </button>
          </div>
        </div>
      )}

      {/* INCIDENT LOGS LIST */}
      <h3 style={{ fontSize: '1rem', color: 'var(--navy)', margin: '16px 0 8px' }}>
        Reported Incidents ({incidents.length})
      </h3>

      {loading ? (
        <p className="muted">Loading incidents log…</p>
      ) : incidents.length === 0 ? (
        <p className="empty">No clinical incidents reported. Excellent patient safety record!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {incidents.map((inc) => (
            <div
              key={inc.id}
              style={{
                background: '#fff',
                border: inc.status === 'open' ? '1.5px solid #f87171' : '1px solid var(--line)',
                borderRadius: '10px',
                padding: '14px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '6px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <b style={{ color: '#991b1b', fontSize: '0.98rem' }}>
                      {(INCIDENT_TYPES.find((t) => t[0] === inc.incident_type) || [])[1] || inc.incident_type}
                    </b>
                    <span className={`sbadge s-${inc.severity === 'minor' ? 'active' : 'declined'}`}>
                      {inc.severity.toUpperCase()}
                    </span>
                    <span className={`sbadge s-${inc.status === 'resolved' ? 'active' : 'intake'}`}>
                      {inc.status.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '3px' }}>
                    Patient: <b>{inc.patient_name || 'General'}</b> · Occurred: {inc.incident_date} at {inc.incident_time} · Reported by {inc.reporter_name}
                  </div>
                </div>

                {inc.status === 'open' && (
                  <button className="pri xs" onClick={() => resolveIncident(inc.id)}>
                    ✓ Mark Resolved &amp; Add RCA
                  </button>
                )}
              </div>

              <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', fontSize: '0.82rem', marginTop: '8px', color: '#334155' }}>
                <b>Description:</b> {inc.description}
                {inc.vitals_post_incident && <div style={{ marginTop: '4px' }}><b>Vitals:</b> {inc.vitals_post_incident}</div>}
                {inc.action_taken && <div style={{ marginTop: '4px' }}><b>Action Taken:</b> {inc.action_taken}</div>}
                {inc.investigation_notes && (
                  <div style={{ marginTop: '6px', color: '#166534', fontWeight: 700 }}>
                    🔍 <b>Investigation &amp; Corrective Action:</b> {inc.investigation_notes}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

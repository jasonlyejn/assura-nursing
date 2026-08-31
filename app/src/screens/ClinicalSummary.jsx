import { useState, useEffect } from 'react';
import { api } from '../api.js';

function getLatestMewsReading(mewsData) {
  if (!mewsData) return null;
  if (Array.isArray(mewsData.cols)) {
    for (let i = mewsData.cols.length - 1; i >= 0; i--) {
      const col = mewsData.cols[i];
      const r = col.readings || {};
      if (r.sbp || r.hr || r.temp || r.spo2 || r.sugar || r.rr || r.pain !== undefined || r.avpu) {
        return {
          date: col.date,
          time: col.time,
          sbp: r.sbp,
          dbp: r.dbp,
          hr: r.hr,
          temp: r.temp,
          spo2: r.spo2,
          rr: r.rr,
          bsl: r.sugar,
          sugar: r.sugar,
          pain: r.pain,
          avpu: r.avpu,
          score: r.ews !== undefined && r.ews !== null ? Number(r.ews) : 0,
        };
      }
    }
  }
  if (Array.isArray(mewsData.entries) && mewsData.entries.length) {
    return mewsData.entries[mewsData.entries.length - 1];
  }
  return null;
}

export default function ClinicalSummary({ caseObj, me, onBack }) {
  const [data, setData] = useState({
    mews: null,
    meds: [],
    wounds: [],
    handovers: [],
    loading: true,
  });

  const [shareModal, setShareModal] = useState(false);
  const [shareDocName, setShareDocName] = useState('');
  const [shareDocPhone, setShareDocPhone] = useState('');
  const [sharePin, setSharePin] = useState(() => Math.floor(1000 + Math.random() * 9000).toString());
  const [shareResult, setShareResult] = useState(null);
  const [shareLoading, setShareLoading] = useState(false);

  useEffect(() => {
    async function loadAll() {
      try {
        const [mewsRes, medsRes, woundsRes, handRes] = await Promise.all([
          api.getMews(caseObj.id).catch(() => ({})),
          api.getMeds(caseObj.id, '', '').catch(() => ({ items: [] })),
          api.getWounds(caseObj.id).catch(() => ({ wounds: [] })),
          api.getHandovers(caseObj.id).catch(() => ({ handovers: [] })),
        ]);
        setData({
          mews: mewsRes.data || null,
          meds: medsRes.items || [],
          wounds: woundsRes.wounds || [],
          handovers: handRes.handovers || [],
          loading: false,
        });
      } catch {
        setData((prev) => ({ ...prev, loading: false }));
      }
    }
    loadAll();
  }, [caseObj.id]);

  const latestMewsEntry = getLatestMewsReading(data.mews);

  async function handleCreateDoctorShare() {
    if (!sharePin || sharePin.length < 4) {
      alert('Please enter a 4 to 6-digit security PIN');
      return;
    }
    setShareLoading(true);
    try {
      const res = await api.createDoctorShare(caseObj.id, sharePin, shareDocName, shareDocPhone);
      if (res && res.share_url) {
        setShareResult(res);
      } else {
        alert(res.error || 'Failed to generate link');
      }
    } catch (e) {
      alert(e.message || 'Error generating link');
    } finally {
      setShareLoading(false);
    }
  }

  function handleShareWhatsApp() {
    if (!shareResult) return;
    const msg = `🩺 *Assura Nursing Care — Clinical Summary & Records for ${caseObj.name}*\n\nDear Doctor ${shareDocName || ''},\nHere is the live confidential clinical referral record:\n🔗 ${shareResult.share_url}\n\n🔑 *Security PIN:* ${shareResult.pin}\n⏳ *Validity:* 72 hours\n\n_Prepared by Attending Nurse: ${me?.name || 'Assura Care Team'}_`;
    const cleanPhone = (shareDocPhone || '').replace(/\D/g, '');
    const url = cleanPhone ? `https://wa.me/${cleanPhone.startsWith('60') ? cleanPhone : '60' + cleanPhone.replace(/^0/, '')}?text=${encodeURIComponent(msg)}` : `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
        <button className="ghost" onClick={onBack}>
          ← Back to Case
        </button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="sec" onClick={() => setShareModal(true)} style={{ width: 'auto', padding: '8px 16px', fontWeight: 700, color: '#0d3a54', border: '1.5px solid #0d3a54' }}>
            🩺 Share with Doctor (72-hr Link)
          </button>
          <button className="pri" onClick={() => window.print()} style={{ width: 'auto', padding: '8px 20px' }}>
            🖨️ Print / Save PDF Medical Report
          </button>
        </div>
      </div>

      {shareModal && (
        <div className="modal-backdrop no-print" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div className="card" style={{ maxWidth: '460px', width: '100%', padding: '24px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, color: 'var(--navy)' }}>🩺 Doctor Access Link & PIN</h3>
              <button className="ghost" onClick={() => { setShareModal(false); setShareResult(null); }} style={{ fontSize: '18px', padding: '0 6px' }}>✕</button>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '16px' }}>
              Generate a secure 72-hour PIN-protected link for attending hospital doctors or specialists to view MEWS vitals, active medications, glucose logs, and wound photos.
            </p>

            {!shareResult ? (
              <div>
                <div className="f" style={{ marginBottom: '12px' }}>
                  <label>Attending Doctor Name (Optional)</label>
                  <input value={shareDocName} onChange={(e) => setShareDocName(e.target.value)} placeholder="e.g. Dr. Tan (Cardiologist)" />
                </div>
                <div className="f" style={{ marginBottom: '12px' }}>
                  <label>Doctor / Clinic WhatsApp Phone (Optional)</label>
                  <input value={shareDocPhone} onChange={(e) => setShareDocPhone(e.target.value)} placeholder="e.g. 0123456789" />
                </div>
                <div className="f" style={{ marginBottom: '16px' }}>
                  <label>4-Digit Security PIN (Doctor enters this to unlock)</label>
                  <input type="text" maxLength="6" value={sharePin} onChange={(e) => setSharePin(e.target.value.replace(/\D/g, ''))} style={{ fontSize: '1.2rem', letterSpacing: '4px', textAlign: 'center', fontWeight: 800 }} />
                </div>
                <button className="pri" disabled={shareLoading} onClick={handleCreateDoctorShare} style={{ width: '100%' }}>
                  {shareLoading ? 'Generating Link...' : 'Generate 72-hr Doctor Access Link'}
                </button>
              </div>
            ) : (
              <div>
                <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '8px', padding: '12px', marginBottom: '14px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 700 }}>✓ Doctor Link Created (Valid 72 Hours)</div>
                  <div style={{ marginTop: '6px', fontSize: '0.85rem', wordBreak: 'break-all' }}>
                    <b>Link:</b> <a href={shareResult.share_url} target="_blank" rel="noreferrer" style={{ color: '#0284c7' }}>{shareResult.share_url}</a>
                  </div>
                  <div style={{ marginTop: '6px', fontSize: '1.1rem' }}>
                    <b>Unlock PIN:</b> <span style={{ background: '#e0f2fe', padding: '2px 8px', borderRadius: '4px', color: '#0369a1', letterSpacing: '2px', fontWeight: 800 }}>{shareResult.pin}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                  <button className="pri" onClick={handleShareWhatsApp} style={{ background: '#25D366', borderColor: '#25D366' }}>
                    📱 Send Link &amp; PIN to Doctor via WhatsApp
                  </button>
                  <button className="sec" onClick={() => {
                    navigator.clipboard.writeText(`Patient: ${caseObj.name}\nDoctor Link: ${shareResult.share_url}\nPIN: ${shareResult.pin}`);
                    alert('Copied link & PIN to clipboard!');
                  }}>
                    📋 Copy Link &amp; PIN to Clipboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div
        className="card"
        style={{
          background: '#fff',
          padding: '28px 24px',
          border: '2px solid var(--navy)',
          borderRadius: '12px',
          boxShadow: 'none',
        }}
      >
        {/* Hospital / Clinic Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottom: '2px solid var(--navy)',
            paddingBottom: '14px',
            marginBottom: '16px',
          }}
        >
          <div>
            <h1 style={{ margin: '0 0 4px', fontSize: '1.4rem', color: 'var(--navy)' }}>ASSURA NURSING CARE</h1>
            <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: '1.4' }}>
              Home Nursing & Clinical Case Management Services<br />
              Penang & Bukit Mertajam · LJM Registered Nursing Team<br />
              Hotline: 012-206 4868 · info@assuranursing.com
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span
              style={{
                display: 'inline-block',
                border: '1.5px solid var(--blue)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontWeight: 800,
                fontSize: '0.8rem',
                color: 'var(--blue-dark)',
                textTransform: 'uppercase',
              }}
            >
              Clinical Handover Summary
            </span>
            <div style={{ fontSize: '0.74rem', color: 'var(--muted)', marginTop: '4px' }}>
              Generated: {new Date().toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>

        {/* Patient Profile Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
            background: '#f8fafc',
            padding: '12px 14px',
            borderRadius: '8px',
            border: '1px solid var(--line)',
            fontSize: '0.84rem',
            marginBottom: '16px',
          }}
        >
          <div>
            <span className="muted">Patient Name: </span>
            <b>{caseObj.patient_name || caseObj.name}</b>
          </div>
          <div>
            <span className="muted">Case / File No: </span>
            <b>{caseObj.case_no || caseObj.id}</b>
          </div>
          <div>
            <span className="muted">Age / Sex: </span>
            <b>{caseObj.age || '—'} {caseObj.gender ? `(${caseObj.gender})` : ''}</b>
          </div>
          <div>
            <span className="muted">Care Type: </span>
            <b>{caseObj.care_type || 'General Nursing'}</b>
          </div>
          <div>
            <span className="muted">Primary Phone: </span>
            <b>{caseObj.phone || '—'}</b>
          </div>
          <div>
            <span className="muted">Assigned Nurse: </span>
            <b>{caseObj.assigned_name || me.name}</b>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <span className="muted">Address: </span>
            <b>{caseObj.address || '—'}</b>
          </div>
          {caseObj.notes && (
            <div style={{ gridColumn: '1 / -1' }}>
              <span className="muted">Clinical Diagnoses / Instructions: </span>
              <b>{caseObj.notes}</b>
            </div>
          )}
        </div>

        {/* Latest Vitals & MEWS Score */}
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--navy)', borderBottom: '1px solid var(--line)', paddingBottom: '4px', margin: '0 0 10px' }}>
            1. Recent Vital Signs & MEWS Score
          </h3>
          {latestMewsEntry ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', textAlign: 'center' }}>
              <div style={{ border: '1px solid var(--line)', borderRadius: '6px', padding: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)', display: 'block' }}>Blood Pressure</span>
                <b style={{ fontSize: '1rem' }}>{latestMewsEntry.sbp}/{latestMewsEntry.dbp || '—'} mmHg</b>
              </div>
              <div style={{ border: '1px solid var(--line)', borderRadius: '6px', padding: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)', display: 'block' }}>Heart Rate</span>
                <b style={{ fontSize: '1rem' }}>{latestMewsEntry.hr || '—'} bpm</b>
              </div>
              <div style={{ border: '1px solid var(--line)', borderRadius: '6px', padding: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)', display: 'block' }}>Oxygen (SpO2)</span>
                <b style={{ fontSize: '1rem' }}>{latestMewsEntry.spo2 || '—'}%</b>
              </div>
              <div style={{ border: '1px solid var(--line)', borderRadius: '6px', padding: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)', display: 'block' }}>Temperature</span>
                <b style={{ fontSize: '1rem' }}>{latestMewsEntry.temp || '—'} °C</b>
              </div>
              <div style={{ border: '1px solid var(--line)', borderRadius: '6px', padding: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)', display: 'block' }}>Blood Sugar (Dextrostix)</span>
                <b style={{ fontSize: '1rem' }}>{latestMewsEntry.bsl || '—'} mmol/L</b>
              </div>
              <div style={{ border: '1px solid var(--line)', borderRadius: '6px', padding: '8px', background: latestMewsEntry.score >= 4 ? '#fde2e2' : '#eaf7f0' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)', display: 'block' }}>MEWS Risk Score</span>
                <b style={{ fontSize: '1.1rem', color: latestMewsEntry.score >= 4 ? '#c0392b' : '#0a7f4f' }}>
                  {latestMewsEntry.score ?? 0} ({latestMewsEntry.score >= 4 ? 'High Risk' : 'Normal/Stable'})
                </b>
              </div>
            </div>
          ) : (
            <p className="muted small">No MEWS vitals recorded yet.</p>
          )}
        </div>

        {/* Active Medications */}
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--navy)', borderBottom: '1px solid var(--line)', paddingBottom: '4px', margin: '0 0 8px' }}>
            2. Active Medication Administration (MAR)
          </h3>
          {data.meds.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ background: '#f4f8fc', textAlign: 'left' }}>
                  <th style={{ padding: '6px 8px', borderBottom: '1px solid var(--line)' }}>Medication</th>
                  <th style={{ padding: '6px 8px', borderBottom: '1px solid var(--line)' }}>Dose</th>
                  <th style={{ padding: '6px 8px', borderBottom: '1px solid var(--line)' }}>Route</th>
                  <th style={{ padding: '6px 8px', borderBottom: '1px solid var(--line)' }}>Frequency</th>
                  <th style={{ padding: '6px 8px', borderBottom: '1px solid var(--line)' }}>Indication</th>
                </tr>
              </thead>
              <tbody>
                {data.meds.map((m) => (
                  <tr key={m.id}>
                    <td style={{ padding: '6px 8px', borderBottom: '1px solid var(--line)' }}><b>{m.name}</b></td>
                    <td style={{ padding: '6px 8px', borderBottom: '1px solid var(--line)' }}>{m.dose || '—'}</td>
                    <td style={{ padding: '6px 8px', borderBottom: '1px solid var(--line)' }}>{m.route || 'Oral'}</td>
                    <td style={{ padding: '6px 8px', borderBottom: '1px solid var(--line)' }}>{m.freq || 'OD'}</td>
                    <td style={{ padding: '6px 8px', borderBottom: '1px solid var(--line)', color: 'var(--muted)' }}>{m.indication || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="muted small">No medications active in MAR chart.</p>
          )}
        </div>

        {/* Wound Assessment Summary */}
        {data.wounds.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--navy)', borderBottom: '1px solid var(--line)', paddingBottom: '4px', margin: '0 0 8px' }}>
              3. Recent Wound Care & Healing Assessment
            </h3>
            <div style={{ fontSize: '0.82rem', lineHeight: '1.5' }}>
              {data.wounds.slice(0, 2).map((w) => (
                <div key={w.id} style={{ border: '1px solid var(--line)', borderRadius: '6px', padding: '8px 12px', marginBottom: '8px', background: '#fafcff' }}>
                  <b>{w.wound_type}</b> ({w.location}) — <span style={{ color: 'var(--blue)' }}>{w.stage}</span>
                  <div>
                    Dimensions: <b>{w.length_cm} × {w.width_cm} cm</b> · Exudate: <b>{w.exudate}</b> · Dressing: <b>{w.dressing_used}</b>
                  </div>
                  {w.notes && <div className="muted" style={{ fontStyle: 'italic', marginTop: '2px' }}>"{w.notes}"</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Doctor & Nurse Attending Signatures */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            marginTop: '36px',
            paddingTop: '16px',
            borderTop: '1px dashed var(--line)',
            fontSize: '0.8rem',
          }}
        >
          <div>
            <div style={{ borderBottom: '1px solid var(--navy)', height: '44px', marginBottom: '6px' }} />
            <b>Attending LJM Nurse Signature & Stamp</b>
            <div className="muted">Name: {me.name}</div>
          </div>
          <div>
            <div style={{ borderBottom: '1px solid var(--navy)', height: '44px', marginBottom: '6px' }} />
            <b>Hospital Doctor / Primary Physician Acknowledged</b>
            <div className="muted">Doctor Stamp / Date:</div>
          </div>
        </div>
      </div>
    </div>
  );
}

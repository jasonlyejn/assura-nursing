import { useEffect, useState } from 'react';
import { api } from '../api.js';
import Mews from './Mews.jsx';

export default function MewsPicker({ onOpenMews }) {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    api.getCases('status=active,assigned,accepted')
      .then((res) => {
        const list = res.cases || [];
        setCases(list);
        if (list.length === 1) {
          setSelectedCase(list[0]);
        }
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (selectedCase) {
    return (
      <div>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="ghost sm" onClick={() => setSelectedCase(null)}>
            ← Switch Patient (切换患者)
          </button>
          <span style={{ fontSize: '0.86rem', color: 'var(--muted)' }}>
            Viewing vital signs for <b>{selectedCase.name}</b>
          </span>
        </div>
        <Mews caseObj={selectedCase} onBack={() => setSelectedCase(null)} />
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
        <div>
          <h2 style={{ margin: 0, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📈 MEWS Vital Signs Scoring &amp; Clinical Chart
          </h2>
          <p className="muted" style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>
            Modified Early Warning Score (MEWS) real-time vital signs monitoring, color risk bands &amp; clinical trend curves.
          </p>
        </div>
      </div>

      {err && <p className="err">{err}</p>}
      {loading && <p className="muted">Loading patient records…</p>}

      {!loading && cases.length === 0 && (
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--muted)' }}>
          <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>🩺</span>
          No active patient cases found. Start an intake or activate a case to begin vital signs charting.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px', marginTop: '10px' }}>
        {cases.map((c) => {
          const ews = c.ews === null || c.ews === undefined ? null : Number(c.ews);
          return (
            <div
              key={c.id}
              onClick={() => setSelectedCase(c)}
              style={{
                background: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                borderRadius: '10px',
                padding: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0284c7'; e.currentTarget.style.background = '#f0f9ff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.background = '#f8fafc'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <b style={{ fontSize: '1.05rem', color: '#0f172a' }}>{c.name}</b>
                {ews !== null && !Number.isNaN(ews) ? (
                  <span className={'ewsb ' + (ews >= 5 ? 'r' : ews >= 3 ? 'o' : ews >= 1 ? 'y' : 'g')}>
                    EWS {ews}
                  </span>
                ) : (
                  <span className="sbadge s-assigned" style={{ fontSize: '0.7rem' }}>Active</span>
                )}
              </div>

              <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}>
                Care Type: <b>{c.care_type === 'procedure' ? 'Procedure' : 'Home Nursing'}</b>
              </div>

              {c.assigned_name && (
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                  Attending: <b>{c.assigned_name}</b>
                </div>
              )}

              {c.address && (
                <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px' }}>
                  📍 {c.address}
                </div>
              )}

              <button
                className="pri wide sm"
                style={{ marginTop: '12px', background: '#0369a1', fontWeight: 700 }}
                onClick={(e) => { e.stopPropagation(); setSelectedCase(c); }}
              >
                📈 Open MEWS Chart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

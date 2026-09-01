import { useEffect, useState } from 'react';
import { api } from '../api.js';

const REQ = { annual: 'Annual leave', medical: 'Medical leave', emergency: 'Emergency leave',
  unpaid: 'Unpaid leave', offday: 'Off day', swap: 'Shift swap', ot: 'Overtime',
  claim: 'Claim', other: 'Request' };

export default function Dashboard({ me, onOpenMews, onOpenHand, onOpenChat, goTo }) {
  const [d, setD] = useState(null);
  const [err, setErr] = useState('');

  const load = () => api.getDashboard().then(setD).catch((e) => setErr(e.message));
  useEffect(() => { load(); const t = setInterval(load, 30000); return () => clearInterval(t); }, []);

  if (err) return <div className="card"><p className="status">{err}</p></div>;
  if (!d) return <div className="card"><p className="muted">Loading…</p></div>;

  const S = d.stats;
  const todo = buildTodo(d, goTo);

  const hasPendingApprovals = (d.pendingChanges && d.pendingChanges.length > 0) ||
                             (d.pendingApps && d.pendingApps.length > 0) ||
                             (d.stats.pendingReq > 0);

  return (
    <div className="dash">
      {/* --- LUXURY WELCOME BANNER & SHIFT STATUS --- */}
      <div
        className="dash-welcome-banner"
        style={{
          background: 'linear-gradient(135deg, #07192d 0%, #0c2b48 50%, #09263f 100%)',
          borderRadius: '16px',
          padding: '14px 16px',
          color: '#fff',
          boxShadow: '0 8px 24px rgba(7, 25, 45, 0.2)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '2px',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', minWidth: 0 }}>
          <div style={{ padding: '2px', flexShrink: 0, filter: 'drop-shadow(0 4px 12px rgba(56, 189, 248, 0.3))' }}>
            <img src="/logo.png?v=9" alt="Assura" style={{ height: '42px', width: 'auto', display: 'block', maxWidth: '80px', objectFit: 'contain' }} />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(56, 189, 248, 0.18)', color: '#7dd3fc', border: '1px solid rgba(56, 189, 248, 0.35)', fontSize: '0.68rem', fontWeight: 800, padding: '1px 6px', borderRadius: '8px', whiteSpace: 'nowrap' }}>
                {me?.role?.toUpperCase() || 'STAFF'} · 🟢 ON SHIFT
              </span>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                {new Date().toLocaleDateString('en-MY', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#fff', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
              Welcome back, <span style={{ color: '#38bdf8' }}>{me?.name || 'Nurse'}</span>
            </h2>
            <div style={{ fontSize: '0.74rem', color: '#cbd5e1', overflowWrap: 'break-word', wordBreak: 'break-word', lineHeight: 1.3, marginTop: '2px' }}>
              Assura Private Home Healthcare &amp; Clinical Nursing Portal
            </div>
          </div>
        </div>
      </div>

      {/* --- headline numbers --- */}
      <div className="tiles4">
        <Tile n={S.active} label="Active cases" onClick={() => goTo('cases')} />
        <Tile n={S.onDuty} label="On duty today" onClick={() => goTo('roster')} />
        <Tile n={S.urgent} label="Urgent alerts" tone={S.urgent ? 'bad' : ''}
          onClick={() => goTo('escalations')} />
        <Tile n={todo.length} label="Needs attention" tone={todo.length ? 'warn' : ''} />
      </div>

      {/* --- IMMEDIATE ACTION & APPROVALS HUB (For Admin / Managers) --- */}
      {hasPendingApprovals && (
        <div className="card" style={{ background: '#fffbeb', border: '1.5px solid #fcd34d', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ margin: 0, color: '#92400e', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem' }}>
                ⚡ Pending Staff Approvals &amp; Requests
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#78350f' }}>
                Staff have submitted updates, shift requests, or case applications waiting for your approval.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {d.pendingChanges && d.pendingChanges.length > 0 && (
                <button className="pri sm" onClick={() => goTo('approvals')} style={{ background: '#b45309', fontWeight: 700 }}>
                  👤 Review Profile Changes ({d.pendingChanges.length})
                </button>
              )}
              {((d.pendingApps && d.pendingApps.length > 0) || d.stats.pendingReq > 0) && (
                <button className="pri sm" onClick={() => goTo('requests')} style={{ background: '#0284c7', fontWeight: 700 }}>
                  📝 Review Shift &amp; Case Requests ({((d.pendingApps || []).length) + (d.stats.pendingReq || 0)})
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- to-do --- */}
      <div className="card">
        <h3 className="dh">✅ To do{todo.length ? ` (${todo.length})` : ''}</h3>
        {todo.length === 0 && <p className="muted">Nothing outstanding. All caught up.</p>}
        {todo.map((t, i) => (
          <div className={'todo ' + t.tone} key={i}>
            <span className="dot" />
            <div className="grow"><b>{t.title}</b><span>{t.detail}</span></div>
            {t.go && <button className="ghost sm" onClick={t.go}>Open</button>}
          </div>
        ))}
      </div>

      {/* --- patients + latest vitals --- */}
      <div className="card">
        <h3 className="dh">🩺 Patients — latest report</h3>
        {d.cases.length === 0 && <p className="muted">No active cases.</p>}
        {d.cases.map((c) => {
          const ews = c.ews === null || c.ews === '' ? null : Number(c.ews);
          const stale = c.last_report !== d.today;
          return (
            <div className="pcase" key={c.id}>
              <div className="grow">
                <b>{c.name}</b>
                {ews !== null && !Number.isNaN(ews) &&
                  <span className={'ewsb ' + (ews >= 5 ? 'r' : ews >= 3 ? 'o' : ews >= 1 ? 'y' : 'g')}>
                    EWS {ews}</span>}
                {c.concerns ? <span className="ewsb o">⚠</span> : null}
                <div className="meta">
                  {c.nurse ? c.nurse : 'unassigned'} ·{' '}
                  <span className={stale ? 'stale' : ''}>
                    {c.last_report ? (stale ? 'last report ' + c.last_report : 'reported today') : 'no report yet'}
                  </span>
                </div>
                {c.todo ? <div className="ptodo">➡ {c.todo}</div> : null}
              </div>
              <div className="pbtns">
                <button className="ghost sm" onClick={() => onOpenHand(c)}>Report</button>
                <button className="ghost sm" onClick={() => onOpenMews(c)}>Vitals</button>
                {onOpenChat && <button className="ghost sm" onClick={() => onOpenChat(c)}>Chat</button>}
              </div>
            </div>
          );
        })}
      </div>

      {/* --- my shifts --- */}
      {(d.myShifts || []).length > 0 && (
        <div className="card">
          <h3 className="dh">🗓 My next shifts</h3>
          {d.myShifts.map((r) => (
            <div className="hrow" key={r.id}>
              <div className="grow">
                <b>{r.shift_date === d.today ? 'Today' : r.shift_date}</b>
                <span className="sh">{r.shift}</span>
                <div className="meta">{r.patient_name}
                  {r.start_time ? ' · ' + r.start_time + '–' + r.end_time : ''}</div>
              </div>
              <span className={'cbadge ' + (r.status === 'confirmed' ? 'proc' : 'lt')}>{r.status}</span>
            </div>
          ))}
          <button className="ghost wide" onClick={() => goTo('roster')}>See full roster</button>
        </div>
      )}

      {/* --- my requests --- */}
      <div className="card">
        <h3 className="dh">📝 Requests</h3>
        {(d.myRequests || []).length === 0 && <p className="muted">No requests yet.</p>}
        {(d.myRequests || []).map((r) => (
          <div className="hrow" key={r.id}>
            <div className="grow">
              <b>{REQ[r.type] || r.type}</b>
              {r.staff_name && r.staff_id !== me?.id ? <span className="meta"> · by {r.staff_name}</span> : null}
              <div className="meta">{r.from_date} {r.to_date && r.to_date !== r.from_date ? '– ' + r.to_date : ''}
                {r.days ? ' (' + r.days + ' day' + (r.days > 1 ? 's' : '') + ')' : ''}</div>
            </div>
            <span className={'cbadge ' + (r.status === 'approved' ? 'proc' : r.status === 'rejected' ? 'bad' : 'warn')}>
              {r.status}
            </span>
          </div>
        ))}
      </div>

      {/* --- recent reports --- */}
      <div className="card">
        <h3 className="dh">📋 Recent shift reports</h3>
        {d.handovers.length === 0 && <p className="muted">No reports in the last two days.</p>}
        {d.handovers.slice(0, 8).map((h) => (
          <div className="hrow" key={h.id}>
            <div className="grow">
              <b>{h.patient_name}</b> <span className="sh">{h.shift_date} {h.shift}</span>
              <div className="meta">by {h.staff_name || '—'}
                {h.ack_at ? '' : ' · not signed'}</div>
            </div>
            {h.concerns ? <span className="ewsb o">⚠</span> : null}
          </div>
        ))}
      </div>

      {/* --- APP DOWNLOAD & APK INSTALLATION QUICK CARD --- */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #07192d 0%, #0c2b48 100%)', color: '#fff', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '16px 20px', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              OFFICIAL CLINICAL APP DISTRIBUTION
            </div>
            <h3 style={{ margin: '3px 0 0', color: '#fff', fontSize: '1.08rem', fontWeight: 800 }}>
              📲 Install Assura Staff App on Phone or PC
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.4 }}>
              Download the Android APK or open the download portal for offline bedside care and real-time alerts.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <a
              href="/AssuraStaff.apk"
              download="AssuraStaff.apk"
              className="pri sm"
              style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', fontWeight: 800, padding: '8px 14px', borderRadius: '10px' }}
            >
              🤖 Download Android .APK
            </a>
            <a
              href="/download.html"
              target="_blank"
              rel="noopener noreferrer"
              className="sec sm"
              style={{ textDecoration: 'none', background: 'rgba(255, 255, 255, 0.12)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.25)', fontWeight: 700, padding: '8px 14px', borderRadius: '10px' }}
            >
              📖 Download Portal &amp; Guide ➔
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tile({ n, label, tone, onClick }) {
  return (
    <button className={'dtile ' + (tone || '')} onClick={onClick} disabled={!onClick}>
      <b>{n}</b><span>{label}</span>
    </button>
  );
}

function buildTodo(d, goTo) {
  const t = [];
  
  // Pending profile approvals
  (d.pendingChanges || []).forEach((c) => t.push({
    tone: 'warn',
    title: `👤 Profile update: ${c.staff_name}`,
    detail: Object.keys(c.fields || {}).join(', ') + ' waiting for approval',
    go: () => goTo && goTo('approvals'),
  }));

  // Pending case applications
  (d.pendingApps || []).forEach((a) => t.push({
    tone: 'warn',
    title: `📝 Case application: ${a.staff_name}`,
    detail: `Applied for ${a.broadcast_title}`,
    go: () => goTo && goTo('requests'),
  }));

  d.escalations.forEach((e) => t.push({
    tone: e.level === 'urgent' ? 'bad' : 'warn',
    title: (e.level === 'urgent' ? '🚨 ' : '⚠ ') + e.patient_name + ' — EWS ' + (e.total_ews ?? ''),
    detail: e.detail || 'Needs review',
    go: () => goTo && goTo('escalations'),
  }));

  d.handovers.filter((h) => !h.ack_at).slice(0, 5).forEach((h) => t.push({
    tone: 'warn', title: 'Handover not signed — ' + h.patient_name,
    detail: h.shift_date + ' ' + h.shift + ' by ' + (h.staff_name || '—'),
  }));

  d.noReport.slice(0, 5).forEach((n) => t.push({
    tone: '', title: 'No report today — ' + n, detail: 'Shift report still to be filed',
  }));

  (d.unrostered || []).slice(0, 5).forEach((n) => t.push({
    tone: '', title: 'Nobody rostered — ' + n, detail: 'No shift set for today',
    go: () => goTo && goTo('roster'),
  }));

  (d.intake || []).forEach((c) => t.push({
    tone: 'warn', title: 'New enquiry — ' + c.name,
    detail: (c.source === 'web' ? 'from the website' : 'awaiting your decision') + (c.phone ? ' · ' + c.phone : ''),
    go: () => goTo && goTo('intake'),
  }));

  (d.quotes || []).forEach((q) => t.push({
    tone: '', title: 'Quote ' + q.no + ' — ' + q.patient_name,
    detail: 'RM' + Number(q.total).toFixed(2) + ' · ' + q.status,
    go: () => goTo && goTo('invoices'),
  }));

  return t;
}

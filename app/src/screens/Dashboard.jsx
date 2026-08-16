import { useEffect, useState } from 'react';
import { api } from '../api.js';

const REQ = { annual: 'Annual leave', medical: 'Medical leave', emergency: 'Emergency leave',
  unpaid: 'Unpaid leave', offday: 'Off day', swap: 'Shift swap', ot: 'Overtime',
  claim: 'Claim', other: 'Request' };

export default function Dashboard({ me, onOpenMews, onOpenHand, onOpenChat, goTo }) {
  const [d, setD] = useState(null);
  const [err, setErr] = useState('');

  const load = () => api.getDashboard().then(setD).catch((e) => setErr(e.message));
  useEffect(() => { load(); const t = setInterval(load, 60000); return () => clearInterval(t); }, []);

  if (err) return <div className="card"><p className="status">{err}</p></div>;
  if (!d) return <div className="card"><p className="muted">Loading…</p></div>;

  const S = d.stats;
  const todo = buildTodo(d);

  return (
    <div className="dash">
      {/* --- headline numbers --- */}
      <div className="tiles4">
        <Tile n={S.active} label="Active cases" onClick={() => goTo('cases')} />
        <Tile n={S.onDuty} label="On duty today" onClick={() => goTo('roster')} />
        <Tile n={S.urgent} label="Urgent alerts" tone={S.urgent ? 'bad' : ''}
          onClick={() => goTo('escalations')} />
        <Tile n={todo.length} label="Needs attention" tone={todo.length ? 'warn' : ''} />
      </div>

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
        {(d.myRequests || []).slice(0, 5).map((r) => (
          <div className="hrow" key={r.id}>
            <div className="grow"><b>{REQ[r.type] || r.type}</b>
              <div className="meta">
                {r.staff_id !== (me && me.id) ? r.staff_name + ' · ' : ''}
                {r.from_date || ''}{r.days ? ' · ' + r.days + ' day(s)' : ''}</div>
            </div>
            <span className={'cbadge ' + (r.status === 'approved' ? 'proc'
              : r.status === 'pending' ? 'lt' : 'off')}>{r.status}</span>
          </div>
        ))}
        <button className="ghost wide" onClick={() => goTo('requests')}>
          Apply for leave / off day / claim</button>
      </div>

      {/* --- staff on duty --- */}
      {d.all && <div className="card">
        <h3 className="dh">👥 On duty today</h3>
        {d.duty.length === 0 && <p className="muted">Nobody rostered today.
          {d.all ? ' Set the roster so handover knows who takes over.' : ''}</p>}
        {['AM', 'PM', 'NIGHT'].map((sh) => {
          const rows = d.duty.filter((x) => x.shift === sh);
          if (!rows.length) return null;
          return (
            <div className="dutyrow" key={sh}>
              <span className="shp">{sh}</span>
              <div className="grow">
                {rows.map((r, i) => (
                  <div className="dstaff" key={i}>
                    <b>{r.staff_name}</b> <span>{r.patient_name}</span>
                    {r.status === 'confirmed' && <span className="ok">✓</span>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>}

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

function buildTodo(d) {
  const t = [];
  d.escalations.forEach((e) => t.push({
    tone: e.level === 'urgent' ? 'bad' : 'warn',
    title: (e.level === 'urgent' ? '🚨 ' : '⚠ ') + e.patient_name + ' — EWS ' + (e.total_ews ?? ''),
    detail: e.detail || 'Needs review',
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
  }));
  (d.intake || []).forEach((c) => t.push({
    tone: 'warn', title: 'New enquiry — ' + c.name,
    detail: (c.source === 'web' ? 'from the website' : 'awaiting your decision') + (c.phone ? ' · ' + c.phone : ''),
  }));
  (d.quotes || []).forEach((q) => t.push({
    tone: '', title: 'Quote ' + q.no + ' — ' + q.patient_name,
    detail: 'RM' + Number(q.total).toFixed(2) + ' · ' + q.status,
  }));
  return t;
}

import { useEffect, useState } from 'react';
import { api } from '../api.js';

const LEVEL = {
  urgent:   { label: '🚨 URGENT',   cls: 's-urgent' },
  escalate: { label: '⚠ ESCALATE',  cls: 's-escalate' },
  monitor:  { label: '● Monitor',   cls: 's-monitor' },
};

function when(ms) {
  try { return new Date(ms).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }); }
  catch { return ''; }
}

export default function Escalations({ onOpenMews }) {
  const [list, setList] = useState(null);
  const [all, setAll] = useState(false);

  async function load() {
    try { setList((await api.getEscalations(all)).escalations); }
    catch { setList([]); }
  }
  useEffect(() => { load(); const t = setInterval(load, 15000); return () => clearInterval(t); }, [all]);

  async function ack(id) { await api.ackEscalation(id); load(); }

  return (
    <div className="card">
      <h2>Escalations</h2>
      <div className="tabs">
        <button className={'tab' + (!all ? ' on' : '')} onClick={() => setAll(false)}>Open</button>
        <button className={'tab' + (all ? ' on' : '')} onClick={() => setAll(true)}>All (recent)</button>
      </div>

      {list === null ? <p className="muted">Loading…</p>
        : list.length === 0 ? <p className="empty">No {all ? '' : 'open '}escalations. 🎉</p>
        : list.map((e) => {
          const L = LEVEL[e.level] || LEVEL.monitor;
          return (
            <div className="rec" key={e.id}>
              <div className="rec-head" style={{ cursor: 'default' }}>
                <div>
                  <b>{e.patient_name || 'Patient'}</b>{' '}
                  <span className={'sbadge ' + L.cls}>{L.label}{e.total_ews != null ? ' · EWS ' + e.total_ews : ''}</span>
                  <div className="meta">{e.col_label ? e.col_label + ' · ' : ''}{when(e.created_at)}{e.ack_at ? ' · acknowledged' : ''}</div>
                  {e.detail && <div className="note">{e.detail}</div>}
                </div>
              </div>
              <div className="acts">
                {onOpenMews && <button onClick={() => onOpenMews({ id: e.case_id, name: e.patient_name })}>📈 Open chart</button>}
                {!e.ack_at && <button className="ok" onClick={() => ack(e.id)}>Acknowledge</button>}
              </div>
            </div>
          );
        })}
    </div>
  );
}

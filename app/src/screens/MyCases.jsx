import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { waOpen, msg } from '../wa.js';
import { CareBadge } from './Intake.jsx';

export default function MyCases({ me, onOpenMews, onOpenHand, onOpenQuote, onOpenChat, onOpenMeds }) {
  const [cases, setCases] = useState(null);
  useEffect(() => { api.getCases('mine=1').then((d) => setCases(d.cases)); }, []);

  return (
    <div className="card">
      <h2>My cases</h2>
      <p className="muted">Cases assigned to you, {me.name}. Open a patient's MEWS chart to record vitals — it syncs to the team.</p>
      {cases === null ? <p className="muted">Loading…</p>
        : cases.length === 0 ? <p className="empty">Nothing assigned to you yet.</p>
        : cases.map((c) => (
          <div className="rec" key={c.id}>
            <div className="rec-head">
              <div><b>{c.name}</b> <CareBadge t={c.care_type} />
                <div className="meta"><span className={'sbadge s-' + c.status}>{c.status}</span>
                  {c.phone ? ' · ' + c.phone : ''}</div>
                {c.address && <div className="note">{c.address}</div>}
                {c.notes && <div className="note">{c.notes}</div>}</div>
            </div>
            <div className="wa-row">
              <button onClick={() => onOpenMews(c)}>📈 MEWS chart</button>
              {onOpenHand && <button onClick={() => onOpenHand(c)}>📋 Handover</button>}
                  {onOpenMeds && <button onClick={() => onOpenMeds(c)}>💊 Medication</button>}
              {onOpenChat && <button onClick={() => onOpenChat(c)}>💭 Chat</button>}
              {c.phone && <button className="wa" onClick={() => waOpen(c.phone, msg.followup(c.name))}>WhatsApp</button>}
            </div>
          </div>
        ))}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { waOpen, msg } from '../wa.js';
import { CareBadge, WebBadge } from './Intake.jsx';

const FILTERS = [
  ['active', 'Active'], ['assigned', 'Assigned'], ['accepted', 'Accepted'],
  ['closed', 'Closed'], ['declined', 'Declined'], ['', 'All'],
];
const STATUS_LABEL = {
  intake: 'Intake', accepted: 'Accepted', assigned: 'Assigned',
  active: 'Active', closed: 'Closed', declined: 'Declined',
};

export default function Cases({ onOpenMews, onOpenQuote, onOpenHand, onOpenChat, onOpenMeds, onOpenInvoice }) {
  async function askFeedback(c) {
    try {
      const r = await api.makeFeedbackLink(c.id);
      const link = location.origin + '/feedback.html?t=' + r.token;
      const msg = `Hello${c.name ? ' ' + c.name : ''}, thank you for trusting Assura Nursing Care `
        + `with your family's care 🙏\n\nWould you spare a minute to tell us how we did? `
        + `It helps us care better.\n感谢您的信任，请花一分钟给我们意见：\n\n${link}`;
      const phone = String(c.phone || '').replace(/[^0-9]/g, '').replace(/^0/, '60');
      if (phone) window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      else { await navigator.clipboard.writeText(link); alert('Feedback link copied:\n' + link); }
    } catch (e) { alert(e.message); }
  }

  const [filter, setFilter] = useState('active');
  const [cases, setCases] = useState(null);
  const [open, setOpen] = useState(null);

  async function load() {
    setCases((await api.getCases(filter ? 'status=' + filter : '')).cases);
  }
  useEffect(() => { load(); }, [filter]);

  async function act(c, body, note) {
    await api.caseAction(c.id, body);
    if (note) waOpen(c.phone, note);
    await load();
  }

  return (
    <div className="card">
      <h2>Cases</h2>
      <div className="tabs">
        {FILTERS.map(([k, l]) => (
          <button key={k || 'all'} className={'tab' + (filter === k ? ' on' : '')} onClick={() => setFilter(k)}>{l}</button>
        ))}
      </div>

      {cases === null ? <p className="muted">Loading…</p>
        : cases.length === 0 ? <p className="empty">Nothing here.</p>
        : cases.map((c) => (
          <div className="rec" key={c.id}>
            <div className="rec-head" onClick={() => setOpen(open === c.id ? null : c.id)}>
              <div><b>{c.name}</b> <CareBadge t={c.care_type} /> <WebBadge s={c.source} />
                <div className="meta">
                  <span className={'sbadge s-' + c.status}>{STATUS_LABEL[c.status] || c.status}</span>
                  {c.assigned_name ? ' · ' + c.assigned_name : ''}
                  {c.phone ? ' · ' + c.phone : ''}
                </div></div>
              <span className="chev">{open === c.id ? '▾' : '▸'}</span>
            </div>

            {open === c.id && (
              <div className="detail">
                {c.address && <p className="row-line"><span>Address</span>{c.address}</p>}
                {c.age && <p className="row-line"><span>Age</span>{c.age}</p>}
                {c.notes && <p className="row-line"><span>Needs</span>{c.notes}</p>}
                <p className="row-line"><span>Billing</span>
                  <select value={c.billing_mode}
                    onChange={(e) => act(c, { action: 'billing', billing_mode: e.target.value })}>
                    <option value="per_visit">Per visit (procedures)</option>
                    <option value="weekly">Weekly (long-term)</option>
                  </select></p>

                <div className="wa-row">
                  <button className="wa" onClick={() => waOpen(c.phone, msg.confirm(c.name))}>WhatsApp: confirm</button>
                  <button className="wa" onClick={() => waOpen(c.phone, msg.followup(c.name))}>follow-up</button>
                </div>

                <div className="acts">
                  <button onClick={() => onOpenMews(c)}>📈 MEWS chart</button>
                  {onOpenQuote && <button onClick={() => onOpenQuote(c)}>💬 Quote</button>}
                  {onOpenHand && <button onClick={() => onOpenHand(c)}>📋 Handover</button>}
                  {onOpenMeds && <button onClick={() => onOpenMeds(c)}>💊 Medication</button>}
                  {onOpenInvoice && <button onClick={() => onOpenInvoice(c)}>💵 Invoice</button>}
              {onOpenChat && <button onClick={() => onOpenChat(c)}>💭 Chat</button>}
                  <button onClick={() => askFeedback(c)}>⭐ Ask for feedback</button>
                  {c.status !== 'active' && c.status !== 'closed' && c.status !== 'declined' &&
                    <button className="ok" onClick={() => act(c, { action: 'activate' })}>Mark active</button>}
                  {c.status !== 'closed' && c.status !== 'declined' &&
                    <button className="danger" onClick={() => {
                      const reason = prompt('Reason for closing (e.g. care ended):') ?? null;
                      if (reason === null) return;
                      act(c, { action: 'close', reason });
                    }}>Close case</button>}
                </div>
                {(c.status === 'closed' || c.status === 'declined') && c.close_reason &&
                  <p className="muted small">Reason: {c.close_reason}</p>}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

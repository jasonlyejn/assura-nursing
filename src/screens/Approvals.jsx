import { useEffect, useState } from 'react';
import { api } from '../api.js';

const LABEL = { name: 'Full name', ic: 'IC / passport', phone: 'Phone', email: 'Email',
  address: 'Address', reg_no: 'Nursing reg no', qualification: 'Qualification',
  kin_name: 'Emergency contact', kin_phone: 'Emergency phone',
  bank_name: 'Bank', bank_acc: 'Account no', notes: 'Notes' };

export default function Approvals({ onChanged }) {
  const [list, setList] = useState(null);
  const [status, setStatus] = useState('');
  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3000); };

  const load = () => api.getChanges().then((d) => setList(d.changes || []))
    .catch((e) => flash(e.message));
  useEffect(() => { load(); }, []);

  async function act(id, action) {
    let note = '';
    if (action === 'reject') { note = prompt('Reason (the staff member will see this):') || ''; }
    try {
      await api.reviewChange(id, action, note);
      flash(action === 'approve' ? '✓ Approved and applied' : 'Rejected');
      load(); onChanged && onChanged();
    } catch (e) { flash(e.message); }
  }

  return (
    <div className="card">
      <h2>Profile approvals</h2>
      <p className="muted">Staff can update their own details — you check them before they take effect.</p>
      {status && <p className="status">{status}</p>}

      {list === null && <p className="muted">Loading…</p>}
      {list && list.length === 0 && <p className="muted">Nothing waiting. All up to date.</p>}

      {list && list.map((c) => (
        <div className="rec" key={c.id}>
          <div className="rec-head">
            <div className="grow">
              <b>{c.staff_name}</b>
              <div className="meta">{when(c.requested_at)}{c.note ? ' · “' + c.note + '”' : ''}</div>
            </div>
            <button className="pri sm" onClick={() => act(c.id, 'approve')}>Approve</button>
            <button className="danger sm" onClick={() => act(c.id, 'reject')}>Reject</button>
          </div>
          <div className="hobody">
            {Object.entries(c.fields).map(([k, v]) => (
              <div className="chg" key={k}>
                <span className="ck">{LABEL[k] || k}</span>
                <span className="cold">{(c.before || {})[k] || '—'}</span>
                <span className="carr">→</span>
                <span className="cnew">{v || '(cleared)'}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function when(ts) {
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuala_Lumpur',
    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })
    .format(new Date(ts));
}

import { useEffect, useState } from 'react';
import { api } from '../api.js';

const TYPES = [
  ['annual', 'Annual leave', '年假', true],
  ['medical', 'Medical leave (MC)', '病假', true],
  ['emergency', 'Emergency leave', '紧急事假', true],
  ['unpaid', 'Unpaid leave', '无薪假', true],
  ['offday', 'Off day / rest day', '休息日', true],
  ['swap', 'Shift swap', '换班', true],
  ['ot', 'Overtime claim', '加班', false],
  ['claim', 'Expense / mileage claim', '报销', false],
  ['other', 'Something else', '其他', false],
];
const LABEL = Object.fromEntries(TYPES.map(([k, en, zh]) => [k, en + ' ' + zh]));

export default function Requests({ me }) {
  const [list, setList] = useState(null);
  const [reviewer, setReviewer] = useState(false);
  const [tab, setTab] = useState('mine');
  const [open, setOpen] = useState(false);
  const [f, setF] = useState(blank());
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3200); };
  const load = () => api.getRequests(tab === 'mine' ? { mine: 1 } : {})
    .then((d) => { setList(d.requests || []); setReviewer(d.reviewer); })
    .catch((e) => flash(e.message));
  useEffect(() => { load(); }, [tab]);

  const needsDates = (TYPES.find((t) => t[0] === f.type) || [])[3];

  async function apply() {
    setBusy(true);
    try {
      await api.createRequest(f);
      setF(blank()); setOpen(false); flash('✓ Sent — your manager will review it'); load();
    } catch (e) { flash(e.message); }
    setBusy(false);
  }

  async function decide(id, action) {
    const note = action === 'reject' ? (prompt('Reason (the staff member will see this):') || '') : '';
    try { await api.decideRequest(id, action, note); load(); } catch (e) { flash(e.message); }
  }

  async function withdraw(id) {
    if (!confirm('Withdraw this request?')) return;
    try { await api.decideRequest(id, 'cancel'); load(); } catch (e) { flash(e.message); }
  }

  function pickFile() {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'image/*'; inp.capture = 'environment';
    inp.onchange = async () => {
      const file = inp.files && inp.files[0]; if (!file) return;
      try { setF({ ...f, attachment: await compress(file) }); }
      catch (_) { flash('Could not read that photo'); }
    };
    inp.click();
  }

  return (
    <div className="card">
      <h2>Requests</h2>
      <p className="muted">Apply for leave, an off day, a shift swap or a claim. Your manager sees it straight away.</p>
      {status && <p className="status">{status}</p>}

      {reviewer && (
        <div className="tabs">
          <button className={tab === 'mine' ? 'on' : ''} onClick={() => setTab('mine')}>Mine</button>
          <button className={tab === 'all' ? 'on' : ''} onClick={() => setTab('all')}>Everyone</button>
        </div>
      )}

      <button className="ghost wide" onClick={() => setOpen(!open)}>
        {open ? '▾ Hide the form' : '＋ Apply for something'}</button>

      {open && (
        <div className="hoform">
          <div className="f"><label>What are you applying for?</label>
            <select value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>
              {TYPES.map(([k, en, zh]) => <option key={k} value={k}>{en} · {zh}</option>)}
            </select></div>

          {needsDates && (
            <div className="grid2">
              <div className="f"><label>From</label>
                <input type="date" value={f.from_date}
                  onChange={(e) => setF({ ...f, from_date: e.target.value })} /></div>
              <div className="f"><label>To</label>
                <input type="date" value={f.to_date}
                  onChange={(e) => setF({ ...f, to_date: e.target.value })} /></div>
            </div>
          )}

          {f.type === 'ot' && (
            <div className="f"><label>Overtime hours</label>
              <input type="number" step="0.5" value={f.amount}
                onChange={(e) => setF({ ...f, amount: e.target.value })} /></div>
          )}
          {f.type === 'claim' && (
            <div className="f"><label>Amount (RM)</label>
              <input type="number" step="0.01" value={f.amount}
                onChange={(e) => setF({ ...f, amount: e.target.value })} /></div>
          )}

          <div className="f"><label>Reason</label>
            <textarea rows="3" value={f.reason} onChange={(e) => setF({ ...f, reason: e.target.value })}
              placeholder={f.type === 'swap' ? 'Which shift, and who will cover it'
                : f.type === 'claim' ? 'What the claim is for' : 'A short reason'} /></div>

          <div className="f"><label>Attach a photo (MC, receipt) — optional</label>
            {f.attachment
              ? <div className="prev"><img src={f.attachment} alt="" />
                  <button onClick={() => setF({ ...f, attachment: null })}>✕</button></div>
              : <button className="ghost" onClick={pickFile}>📷 Add photo</button>}
          </div>

          <button className="pri wide" onClick={apply} disabled={busy}>
            {busy ? 'Sending…' : 'Send request'}</button>
        </div>
      )}

      {list === null && <p className="muted">Loading…</p>}
      {list && list.length === 0 && <p className="muted">Nothing here yet.</p>}
      {list && list.map((r) => (
        <div className={'rec req ' + r.status} key={r.id}>
          <div className="rec-head">
            <div className="grow">
              <b>{LABEL[r.type] || r.type}</b>
              <span className={'cbadge ' + (r.status === 'approved' ? 'proc'
                : r.status === 'pending' ? 'lt' : 'off')}>{r.status}</span>
              <div className="meta">
                {tab === 'all' ? r.staff_name + ' · ' : ''}
                {r.from_date ? r.from_date + (r.to_date && r.to_date !== r.from_date ? ' → ' + r.to_date : '') : ''}
                {r.days ? ' · ' + r.days + ' day(s)' : ''}
                {r.type === 'ot' && r.amount ? ' · ' + r.amount + ' hr' : ''}
                {r.type === 'claim' && r.amount ? ' · RM' + Number(r.amount).toFixed(2) : ''}
              </div>
              {r.reason ? <div className="rreason">{r.reason}</div> : null}
              {r.attachment ? <img className="rimg" src={r.attachment} alt=""
                onClick={() => window.open(r.attachment, '_blank')} /> : null}
              {r.decided_at ? <div className="meta">
                {r.status} by {r.decided_name}{r.decide_note ? ' — ' + r.decide_note : ''}</div> : null}
            </div>
            <div className="pbtns">
              {r.status === 'pending' && reviewer && r.staff_id !== me.id && <>
                <button className="pri sm" onClick={() => decide(r.id, 'approve')}>Approve</button>
                <button className="danger sm" onClick={() => decide(r.id, 'reject')}>Reject</button>
              </>}
              {r.status === 'pending' && r.staff_id === me.id &&
                <button className="ghost sm" onClick={() => withdraw(r.id)}>Withdraw</button>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function blank() {
  return { type: 'annual', from_date: '', to_date: '', days: 0, amount: '', reason: '', attachment: null };
}

function compress(file) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => {
      const im = new Image();
      im.onload = () => {
        const max = 500, sc = Math.min(1, max / Math.max(im.width, im.height));
        const c = document.createElement('canvas');
        c.width = Math.round(im.width * sc); c.height = Math.round(im.height * sc);
        c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
        res(c.toDataURL('image/jpeg', 0.6));
      };
      im.onerror = rej; im.src = fr.result;
    };
    fr.onerror = rej; fr.readAsDataURL(file);
  });
}

import { useEffect, useState } from 'react';
import { api } from '../api.js';

const TYPES = [
  ['slot_request', '🗓️ Shift Slot Request', '申请排班时段', true],
  ['case_claim', '🙋 Case Claim Request', '申请接单负责', false],
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
const LABEL = Object.fromEntries(TYPES.map(([k, en, zh]) => [k, en + ' · ' + zh]));

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
      setF(blank()); setOpen(false); flash('✓ Sent — manager / admin notified'); load();
    } catch (e) { flash(e.message); }
    setBusy(false);
  }

  async function decide(id, action) {
    const note = action === 'reject' ? (prompt('Reason (the staff member will see this):') || '') : '';
    try {
      await api.decideRequest(id, action, note);
      flash(action === 'approve' ? '✅ Request approved & scheduled' : 'Request rejected');
      load();
    } catch (e) { flash(e.message); }
  }

  async function withdraw(id) {
    if (!confirm('Withdraw this request?')) return;
    try { await api.decideRequest(id, 'cancel'); flash('✓ Request withdrawn'); load(); }
    catch (e) { flash(e.message); }
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
      <h2>Requests &amp; Shift Approvals</h2>
      <p className="muted">Apply for shift slots, case assignments, leave, off days, or claims. Admin reviews and approves.</p>
      {status && <p className="status">{status}</p>}

      {reviewer && (
        <div className="tabs">
          <button className={tab === 'mine' ? 'on' : ''} onClick={() => setTab('mine')}>👤 My Requests</button>
          <button className={tab === 'all' ? 'on' : ''} onClick={() => setTab('all')}>👥 Everyone (Review &amp; Approve)</button>
        </div>
      )}

      <button className="ghost wide" onClick={() => setOpen(!open)}>
        {open ? '▾ Hide the form' : '＋ Apply for Shift Slot, Leave or Claim'}
      </button>

      {open && (
        <div className="hoform" style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', margin: '10px 0', border: '1px solid #cbd5e1' }}>
          <div className="f"><label>What are you applying for?</label>
            <select value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>
              {TYPES.map(([k, en, zh]) => <option key={k} value={k}>{en} · {zh}</option>)}
            </select>
          </div>

          {needsDates && (
            <div className="grid2">
              <div className="f"><label>Date / Start Date</label>
                <input type="date" value={f.from_date}
                  onChange={(e) => setF({ ...f, from_date: e.target.value })} /></div>
              <div className="f"><label>End Date (Optional for single shift)</label>
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

          <div className="f"><label>Details / Reason / Patient Info</label>
            <textarea rows="3" value={f.reason} onChange={(e) => setF({ ...f, reason: e.target.value })}
              placeholder={f.type === 'slot_request' ? 'e.g. Requesting AM shift for Patient Tan / Available in Bukit Mertajam'
                : f.type === 'case_claim' ? 'e.g. Requesting to take over Case #001 / Living nearby'
                : f.type === 'swap' ? 'Which shift, and who will cover it'
                : 'State your availability or reason'} />
          </div>

          <div className="f"><label>Attach a photo (MC, receipt, note) — optional</label>
            {f.attachment
              ? <div className="prev"><img src={f.attachment} alt="" />
                  <button onClick={() => setF({ ...f, attachment: null })}>✕</button></div>
              : <button className="ghost sm" type="button" onClick={pickFile}>📷 Add photo</button>}
          </div>

          <button className="pri wide" onClick={apply} disabled={busy}>
            {busy ? 'Sending…' : 'Submit Request for Admin Approval'}
          </button>
        </div>
      )}

      {list === null && <p className="muted">Loading…</p>}
      {list && list.length === 0 && <p className="muted">No requests found.</p>}
      {list && list.map((r) => {
        let parsed = null;
        try { parsed = JSON.parse(r.reason); } catch (_) {}

        return (
          <div className={'rec req ' + r.status} key={r.id} style={{ marginBottom: '10px' }}>
            <div className="rec-head">
              <div className="grow">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <b>{LABEL[r.type] || r.type}</b>
                  <span className={'cbadge ' + (r.status === 'approved' ? 'proc'
                    : r.status === 'pending' ? 'lt' : 'off')}>
                    {r.status.toUpperCase()}
                  </span>
                </div>
                <div className="meta" style={{ marginTop: '3px' }}>
                  {tab === 'all' ? `👤 ${r.staff_name} · ` : ''}
                  {r.from_date ? `📅 ${r.from_date}${r.to_date && r.to_date !== r.from_date ? ' → ' + r.to_date : ''}` : ''}
                  {r.days ? ' · ' + r.days + ' day(s)' : ''}
                  {r.type === 'ot' && r.amount ? ' · ' + r.amount + ' hr' : ''}
                  {r.type === 'claim' && r.amount ? ' · RM' + Number(r.amount).toFixed(2) : ''}
                </div>

                {parsed ? (
                  <div className="rreason" style={{ background: '#f1f5f9', padding: '6px 10px', borderRadius: '6px', margin: '6px 0', fontSize: '0.85rem' }}>
                    {parsed.patient_name && <div><b>Patient:</b> {parsed.patient_name}</div>}
                    {parsed.shift && <div><b>Requested Shift:</b> <span className="badge badge-green">{parsed.shift}</span></div>}
                    {parsed.note && <div><b>Note:</b> {parsed.note}</div>}
                  </div>
                ) : r.reason ? (
                  <div className="rreason" style={{ margin: '6px 0', fontSize: '0.85rem' }}>{r.reason}</div>
                ) : null}

                {r.attachment ? <img className="rimg" src={r.attachment} alt=""
                  onClick={() => window.open(r.attachment, '_blank')} style={{ maxHeight: '80px', borderRadius: '6px', cursor: 'pointer' }} /> : null}
                {r.decided_at ? <div className="meta" style={{ color: r.status === 'approved' ? '#166534' : '#991b1b', fontWeight: '700' }}>
                  ✓ {r.status.toUpperCase()} by {r.decided_name}{r.decide_note ? ' — ' + r.decide_note : ''}</div> : null}
              </div>

              <div className="pbtns" style={{ display: 'flex', gap: '6px' }}>
                {r.status === 'pending' && reviewer && r.staff_id !== me.id && <>
                  <button className="pri sm" style={{ background: '#10b981' }} onClick={() => decide(r.id, 'approve')}>
                    ✅ Approve
                  </button>
                  <button className="danger sm" onClick={() => decide(r.id, 'reject')}>
                    ❌ Decline
                  </button>
                </>}
                {r.status === 'pending' && r.staff_id === me.id &&
                  <button className="ghost sm" onClick={() => withdraw(r.id)}>Withdraw</button>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function blank() {
  return { type: 'slot_request', from_date: todayMY(), to_date: '', days: 0, amount: '', reason: '', attachment: null };
}

function todayMY() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
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

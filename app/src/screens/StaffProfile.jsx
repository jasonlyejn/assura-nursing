import { useEffect, useState } from 'react';
import { api } from '../api.js';

const F = [
  ['Personal', [
    ['name', 'Full name', 'text'],
    ['ic', 'IC / passport no', 'text'],
    ['phone', 'Phone', 'tel'],
    ['email', 'Email', 'email'],
    ['address', 'Address', 'text'],
  ]],
  ['Employment', [
    ['staff_no', 'Staff no', 'text'],
    ['started_at', 'Start date', 'date'],
    ['reg_no', 'Nursing reg / licence no', 'text'],
    ['qualification', 'Qualification', 'text'],
  ]],
  ['Emergency contact', [
    ['kin_name', 'Name', 'text'],
    ['kin_phone', 'Phone', 'tel'],
  ]],
  ['Pay (used later for payroll)', [
    ['pay_rate', 'Pay rate (RM)', 'number'],
    ['bank_name', 'Bank', 'text'],
    ['bank_acc', 'Account no', 'text'],
  ]],
];

const PAGES = [
  ['allCases', 'All patients', 'See every case and enquiry, not just their own'],
  ['chart', 'Vitals & alerts', 'MEWS charting, medication, escalations'],
  ['handover', 'Handover & roster', 'Shift reports, their roster, leave requests'],
  ['assign', 'Assign & roster others', 'Set the roster and assign staff to cases'],
  ['quote', 'Quotes', 'Prepare and send quotations'],
  ['bill', 'Billing', 'Raise invoices and record payments'],
  ['rates', 'Rate card', 'Change prices and the item catalogue'],
  ['staff', 'Staff & roles', 'Add staff, change roles, reset PINs'],
];

export default function StaffProfile({ id, roles, onBack, onChanged, meId }) {
  const [s, setS] = useState(null);
  const [stats, setStats] = useState({});
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3200); };
  const load = () => api.getStaffOne(id)
    .then((d) => {
      const st = d.staff || {};
      let perms = null;
      try { const a = JSON.parse(st.perms || 'null'); if (Array.isArray(a)) perms = a; } catch (_) {}
      setS({ ...st, perms });
      setStats(d.stats || {});
    })
    .catch((e) => flash(e.message));
  useEffect(() => { load(); }, [id]);

  if (!s) return <div className="card"><button className="link" onClick={onBack}>← Back</button>
    <p className="muted">Loading…</p></div>;

  const set = (k, v) => setS({ ...s, [k]: v });
  const isMe = s.id === meId;

  async function save() {
    setBusy(true);
    try {
      const body = { ...s };
      delete body.photo; delete body.created_at; delete body.id;
      body.perms = s.perms == null ? null : (s.perms || []);
      if (pin) body.pin = pin;
      await api.updateStaff(id, body);
      setPin(''); flash('✓ Saved'); onChanged && onChanged();
      load();
    } catch (e) { flash(e.message); }
    setBusy(false);
  }

  async function toggleActive() {
    try {
      await api.updateStaff(id, { active: s.active ? false : true });
      flash(s.active ? 'Set to inactive' : 'Reactivated'); onChanged && onChanged(); load();
    } catch (e) { flash(e.message); }
  }

  async function remove() {
    if (!confirm('Delete ' + s.name + ' permanently?\n\nIf they have any case or visit history, '
      + 'set them Inactive instead so records stay intact.')) return;
    try {
      await api.deleteStaff(id);
      onChanged && onChanged(); onBack();
    } catch (e) { flash(e.message); }
  }

  async function pickPhoto() {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'image/*'; inp.capture = 'user';
    inp.onchange = async () => {
      const f = inp.files && inp.files[0]; if (!f) return;
      try {
        const img = await compress(f);
        await api.updateStaff(id, { photo: img });
        setS({ ...s, photo: img }); flash('✓ Photo saved'); onChanged && onChanged();
      } catch (e) { flash('Could not save that photo'); }
    };
    inp.click();
  }

  function compress(file) {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => {
        const im = new Image();
        im.onload = () => {
          const max = 240, sc = Math.min(1, max / Math.max(im.width, im.height));
          const c = document.createElement('canvas');
          c.width = Math.round(im.width * sc); c.height = Math.round(im.height * sc);
          c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
          res(c.toDataURL('image/jpeg', 0.65));
        };
        im.onerror = rej; im.src = fr.result;
      };
      fr.onerror = rej; fr.readAsDataURL(file);
    });
  }

  return (
    <div>
      <div className="case-subbar">
        <button className="case-back-btn" onClick={onBack}>
          <span>←</span> <b>Back to Staff List</b>
        </button>
        <div className="case-subbar-info">
          <span className="case-patient-name">{s.name || 'Staff Member'}</span>
          <span className="case-view-tag">👤 Staff Profile</span>
        </div>
      </div>

      <div className="card">
        {status && <p className="status">{status}</p>}

      <div className="sp-head">
        <button className="sp-photo" onClick={pickPhoto} title="Add a photo">
          {s.photo ? <img src={s.photo} alt="" /> : <span>{(s.name || '?').slice(0, 1)}</span>}
          <span className="cam">＋</span>
        </button>
        <div>
          <h2>{s.name}</h2>
          <p className="muted">
            {(roles.find((r) => r.key === s.role) || {}).label || s.role}
            {s.staff_no ? ' · ' + s.staff_no : ''}
            {stats.cases ? ' · ' + stats.cases + ' case(s)' : ''}
            {s.active ? '' : ' · INACTIVE'}
          </p>
        </div>
      </div>

      <div className="f"><label>Role</label>
        <select value={s.role} disabled={isMe}
          onChange={(e) => set('role', e.target.value)}>
          {roles.map((r) => <option key={r.key} value={r.key}>{r.label} {r.zh}</option>)}
        </select>
        <p className="rdesc">{(roles.find((r) => r.key === s.role) || {}).desc}
          {isMe ? ' — you cannot change your own role.' : ''}</p>
      </div>

      {F.map(([group, fields]) => (
        <div key={group}>
          <h3 className="qh">{group}</h3>
          <div className="grid2">
            {fields.map(([k, label, type]) => (
              <div className="f" key={k}><label>{label}</label>
                <input type={type} value={s[k] || ''} onChange={(e) => set(k, e.target.value)} /></div>
            ))}
          </div>
          {group.startsWith('Pay') && (
            <div className="f"><label>Pay basis</label>
              <select value={s.pay_basis || ''} onChange={(e) => set('pay_basis', e.target.value)}>
                <option value="">—</option>
                <option value="hour">Per hour</option>
                <option value="shift">Per shift</option>
                <option value="day">Per day</option>
                <option value="month">Monthly salary</option>
              </select></div>
          )}
        </div>
      ))}

      <h3 className="qh">Pages this person can open</h3>
      <div className="permbox">
        <label className="chk big">
          <input type="checkbox" checked={s.perms == null}
            onChange={(e) => set('perms', e.target.checked ? null
              : ((roles.find((r) => r.key === s.role) || {}).can || []).slice())} />
          Use the standard {(roles.find((r) => r.key === s.role) || {}).label || s.role} pages
        </label>
        {s.perms != null && (
          <div className="permlist">
            {PAGES.map(([k, label, why]) => (
              <label className="chk" key={k}>
                <input type="checkbox" checked={(s.perms || []).includes(k)}
                  onChange={(e) => {
                    const cur = new Set(s.perms || []);
                    e.target.checked ? cur.add(k) : cur.delete(k);
                    set('perms', [...cur]);
                  }} />
                <span><b>{label}</b><em>{why}</em></span>
              </label>
            ))}
          </div>
        )}
        {isMe && <p className="rdesc">Admins always keep every page — you can't lock yourself out.</p>}
        <p className="rdesc">Changes apply the next time they open the app.</p>
      </div>

      <h3 className="qh">Notes</h3>
      <div className="f"><textarea rows="3" value={s.notes || ''}
        onChange={(e) => set('notes', e.target.value)}
        placeholder="Training, availability, anything worth remembering" /></div>

      <h3 className="qh">Sign-in PIN</h3>
      <div className="f"><label>Set a new PIN (leave blank to keep)</label>
        <input value={pin} onChange={(e) => setPin(e.target.value)}
          placeholder="4–8 digits" inputMode="numeric" /></div>

      <div className="qbtns">
        <button className="pri" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save profile'}</button>
        <button className="ghost" onClick={toggleActive}>{s.active ? 'Set inactive' : 'Reactivate'}</button>
        {!isMe && <button className="danger" onClick={remove}>Delete</button>}
      </div>
      <p className="hint">Inactive staff can't sign in but all their records stay. Delete only works
        for someone with no cases or visits.</p>
    </div>
    </div>
  );
}

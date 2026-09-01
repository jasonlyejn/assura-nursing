import { useEffect, useState } from 'react';
import { api } from '../api.js';
import LangSelector from '../components/LangSelector.jsx';
import { useI18n } from '../i18n.js';

const GROUPS = [
  ['About you', [['name', 'Full name'], ['ic', 'IC / passport no'],
                 ['phone', 'Phone'], ['email', 'Email'], ['address', 'Address']]],
  ['Professional', [['reg_no', 'Nursing reg / licence no'], ['qualification', 'Qualification']]],
  ['Emergency contact', [['kin_name', 'Name'], ['kin_phone', 'Phone']]],
  ['Bank (for pay)', [['bank_name', 'Bank'], ['bank_acc', 'Account no']]],
];
const LABEL = Object.fromEntries(GROUPS.flatMap(([, f]) => f));

export default function MyProfile({ onDone }) {
  const [s, setS] = useState(null);
  const [orig, setOrig] = useState(null);
  const [pending, setPending] = useState([]);
  const [history, setHistory] = useState([]);
  const [note, setNote] = useState('');
  const [pin, setPin] = useState({ current: '', a: '', b: '' });
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3600); };
  const load = () => api.getMyProfile().then((d) => {
    setS(d.staff); setOrig(d.staff); setPending(d.pending || []); setHistory(d.history || []);
  }).catch((e) => flash(e.message));
  useEffect(() => { load(); }, []);

  if (!s) return <div className="card"><p className="muted">Loading…</p></div>;

  const set = (k, v) => setS({ ...s, [k]: v });
  const changed = Object.keys(LABEL).filter((k) => (s[k] || '') !== (orig[k] || ''));

  async function submit() {
    if (!changed.length) { flash('Nothing has changed yet'); return; }
    setBusy(true);
    try {
      const body = { note };
      changed.forEach((k) => { body[k] = s[k] || ''; });
      const r = await api.saveMyProfile(body);
      flash('✓ Sent to admin for approval (' + r.pending + ' change'
        + (r.pending > 1 ? 's' : '') + ')');
      setNote(''); load();
    } catch (e) { flash(e.message); }
    setBusy(false);
  }

  async function changePin() {
    if (pin.a !== pin.b) { flash('The two new PINs do not match'); return; }
    setBusy(true);
    try {
      await api.changeMyPin(pin.current, pin.a);
      setPin({ current: '', a: '', b: '' });
      flash('✓ PIN changed — use the new one next time you sign in');
      load(); onDone && onDone();
    } catch (e) { flash(e.message); }
    setBusy(false);
  }

  async function pickPhoto() {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = 'image/*';
    inp.onchange = async () => {
      const f = inp.files && inp.files[0]; if (!f) return;
      try {
        const img = await compress(f);
        await api.saveMyProfile({ photo: img });
        setS({ ...s, photo: img }); flash('✓ Photo updated');
      } catch (e) { flash('Could not save that photo'); }
    };
    inp.click();
  }

  return (
    <div className="card">
      <h2>My profile</h2>
      <p className="muted">Keep your details up to date. Changes are sent to the admin to check
        before they take effect — your photo and PIN change straight away.</p>
      {status && <p className="status">{status}</p>}

      <div className="sp-head">
        <button className="sp-photo" onClick={pickPhoto} title="Change photo">
          {s.photo ? <img src={s.photo} alt="" /> : <span>{(s.name || '?').slice(0, 1)}</span>}
          <span className="cam">＋</span>
        </button>
        <div>
          <h2 style={{ margin: 0 }}>{s.name}</h2>
          <p className="muted">{s.role}{s.staff_no ? ' · ' + s.staff_no : ''}</p>
        </div>
      </div>

      {s.must_change_pin === 1 &&
        <p className="warnbox">🔐 Please set your own PIN below — the one you were given is temporary.</p>}

      {pending.length > 0 && (
        <div className="pendbox">
          <b>⏳ Waiting for admin approval</b>
          {pending.map((p) => (
            <div key={p.id}>{Object.entries(p.fields).map(([k, v]) =>
              <div className="pline" key={k}>{LABEL[k] || k}: <b>{v || '(cleared)'}</b></div>)}</div>
          ))}
        </div>
      )}

      <div style={{ background: '#f8fafc', border: '1px solid var(--line)', borderRadius: '12px', padding: '14px', margin: '14px 0' }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '0.95rem', color: 'var(--navy)' }}>🌐 Preferred Interface Language (界面首选语言)</h3>
        <p className="muted" style={{ margin: '0 0 10px', fontSize: '0.8rem' }}>
          Select your preferred language for clinical records, navigation, and notifications.
        </p>
        <LangSelector />
      </div>

      {GROUPS.map(([g, fields]) => (
        <div key={g}>
          <h3 className="qh">{g}</h3>
          <div className="grid2">
            {fields.map(([k, label]) => (
              <div className="f" key={k}><label>{label}</label>
                <input value={s[k] || ''} onChange={(e) => set(k, e.target.value)}
                  className={(s[k] || '') !== (orig[k] || '') ? 'edited' : ''} /></div>
            ))}
          </div>
        </div>
      ))}

      {changed.length > 0 && (
        <div className="f"><label>Why the change? (helps admin approve faster)</label>
          <input value={note} onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. changed my phone number" /></div>
      )}

      <button className="pri wide" onClick={submit} disabled={busy || !changed.length}>
        {changed.length ? 'Send ' + changed.length + ' change'
          + (changed.length > 1 ? 's' : '') + ' for approval' : 'No changes yet'}</button>

      <h3 className="qh">Change my PIN</h3>
      <div className="grid2">
        <div className="f"><label>Current PIN</label>
          <input type="password" inputMode="numeric" value={pin.current}
            onChange={(e) => setPin({ ...pin, current: e.target.value.replace(/\D/g, '') })} /></div>
        <div className="f"><label>New PIN</label>
          <input type="password" inputMode="numeric" value={pin.a}
            onChange={(e) => setPin({ ...pin, a: e.target.value.replace(/\D/g, '') })} /></div>
      </div>
      <div className="f"><label>New PIN again</label>
        <input type="password" inputMode="numeric" value={pin.b}
          onChange={(e) => setPin({ ...pin, b: e.target.value.replace(/\D/g, '') })} /></div>
      <button className="ghost wide" onClick={changePin}
        disabled={busy || !pin.current || pin.a.length < 4}>Change PIN</button>

      <div style={{ marginTop: '20px', padding: '16px', background: '#f0f9ff', border: '1.5px solid #0284c7', borderRadius: '12px' }}>
        <h4 style={{ margin: '0 0 4px', color: '#0d3a54', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          📱 Download Assura Staff App &amp; APK (客户端与安装包)
        </h4>
        <p className="muted" style={{ margin: '0 0 12px', fontSize: '0.82rem', lineHeight: 1.45 }}>
          Install Assura directly onto your Android phone or Windows PC for fast offline access, sliding scale charts, and home visits.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px' }}>
          <a
            href="/AssuraStaff.apk"
            download="AssuraStaff.apk"
            className="pri sm"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 800 }}
          >
            🤖 Download Android APK
          </a>
          <a
            href="/download.html"
            target="_blank"
            rel="noopener noreferrer"
            className="sec sm"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 700, background: '#fff', color: '#0369a1', border: '1.5px solid #0284c7' }}
          >
            📖 Download Portal &amp; Guide
          </a>
          <a
            href="/AssuraStaff.exe"
            download="AssuraStaff.exe"
            className="ghost sm"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 700 }}
          >
            💻 Windows PC (.EXE)
          </a>
        </div>
      </div>

      {history.length > 0 && <>
        <h3 className="qh">Past requests</h3>
        {history.slice(0, 5).map((h) => (
          <div className="rec" key={h.id}>
            <div className="rec-head"><div className="grow">
              <b>{Object.keys(h.fields).map((k) => LABEL[k] || k).join(', ')}</b>
              <span className={'cbadge ' + (h.status === 'approved' ? 'proc' : 'off')}>{h.status}</span>
              {h.note ? <div className="meta">{h.note}</div> : null}
            </div></div>
          </div>
        ))}
      </>}
    </div>
  );
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

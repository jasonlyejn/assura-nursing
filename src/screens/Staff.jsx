import { useEffect, useState } from 'react';
import { api } from '../api.js';
import StaffProfile from './StaffProfile.jsx';

const ROLES_FALLBACK = [
  { key: 'admin', label: 'Admin / Owner', zh: '管理员', desc: 'Full control — settings, rate card, staff, all cases, assignment, billing.' },
  { key: 'supervisor', label: 'Supervisor / Nurse Manager', zh: '护理主管', desc: 'Sees every case, assigns staff, quotes and bills.' },
  { key: 'nurse', label: 'Registered Nurse', zh: '注册护士', desc: 'Own assigned cases — vitals, MEWS, escalations, handover.' },
  { key: 'caregiver', label: 'Caregiver / Care Assistant', zh: '护理员', desc: 'Own assigned cases — daily care records and handover.' },
  { key: 'office', label: 'Office / Coordinator', zh: '行政协调', desc: 'Enquiries, quotes and billing. No clinical charting.' },
];

export default function Staff({ me }) {
  const [staff, setStaff] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', pin: '', role: 'nurse' });
  const [ROLES, setRoles] = useState(ROLES_FALLBACK);
  const [openId, setOpenId] = useState(null);
  const [resets, setResets] = useState([]);
  const [issued, setIssued] = useState(null);
  const loadResets = () => api.getPinResets().then((d) => setResets(d.resets || [])).catch(() => {});
  useEffect(() => { loadResets(); }, []);

  async function doReset(r, staffId) {
    try {
      const d = await api.decidePinReset({ id: r.id, action: 'reset', staff_id: staffId });
      setIssued({ name: d.name, pin: d.pin });
      loadResets(); load();
    } catch (e) { alert(e.message); }
  }
  async function ignoreReset(r) {
    try { await api.decidePinReset({ id: r.id, action: 'ignore' }); loadResets(); }
    catch (e) { alert(e.message); }
  }
  useEffect(() => { api.getRoles().then((d) => d.roles && setRoles(d.roles)).catch(() => {}); }, []);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');

  async function load() { setStaff((await api.getStaff()).staff); }
  useEffect(() => { load(); }, []);

  async function add() {
    setErr(''); setOk('');
    if (!form.name.trim()) return setErr('Enter a name.');
    if (!/^\d{4,8}$/.test(form.pin)) return setErr('PIN must be 4–8 digits.');
    setBusy(true);
    try {
      await api.addStaff(form);
      setOk('✓ ' + form.name.trim() + ' added');
      setForm({ name: '', phone: '', pin: '', role: 'nurse' });
      await load();
    } catch (e) { setErr(e.message); } finally { setBusy(false); }
  }

  if (openId) return <StaffProfile id={openId} roles={ROLES} meId={me.id}
    onBack={() => setOpenId(null)} onChanged={load} />;

  return (
    <div className="card">
      <h2>Staff</h2>
      <p className="muted">The people who can sign in. Give everyone their own PIN — that's how work gets attributed to them.</p>
      <div className="miggrid">
        <button className="ghost" onClick={async () => {
          if (!confirm('Bring the database up to date? This is safe to run any time.')) return;
          try {
            const d = await api.runMigrate();
            alert('Database updated.\n\n' + d.summary
              + (d.applied.length ? '\n\nAdded:\n• ' + d.applied.join('\n• ') : '')
              + (d.failed.length ? '\n\nCould not do:\n• ' + d.failed.join('\n• ') : ''));
          } catch (e) { alert(e.message); }
        }}>🔧 Update database</button>
        <span className="muted">Run this after every deploy — it fixes "Request failed (500)".</span>
      </div>

      {issued && (
        <div className="pinissued">
          <b>Temporary PIN for {issued.name}</b>
          <div className="pincode">{issued.pin}</div>
          <p>Give this to them now — it is shown only once. They must set their own PIN
             when they sign in.<br /><span className="zh">请立即告知本人，此密码只显示一次。</span></p>
          <button className="ghost" onClick={() => setIssued(null)}>Done</button>
        </div>
      )}

      {resets.length > 0 && (
        <div className="resetbox">
          <h3 className="dh">🔑 Forgot-PIN requests ({resets.length})</h3>
          {resets.map((r) => (
            <div className="rec" key={r.id}>
              <div className="rec-head">
                <div className="grow"><b>{r.claim_name}</b>
                  {r.staff_name
                    ? <span className="cbadge proc">matched: {r.staff_name}</span>
                    : <span className="cbadge lt">no matching staff — check who this is</span>}
                  <div className="meta">{new Date(r.created_at).toLocaleString()}</div>
                </div>
                <div className="pbtns">
                  {r.staff_id
                    ? <button className="pri sm" onClick={() => doReset(r, r.staff_id)}>Reset PIN</button>
                    : <select className="sm" defaultValue="" onChange={(e) => e.target.value && doReset(r, e.target.value)}>
                        <option value="">Choose staff…</option>
                        {(staff || []).filter((x) => x.active).map((x) =>
                          <option key={x.id} value={x.id}>{x.name}</option>)}
                      </select>}
                  <button className="ghost sm" onClick={() => ignoreReset(r)}>Ignore</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <details className="roleref"><summary>What can each role do?</summary>
        {ROLES.map((r) => (
          <div className="rrow" key={r.key}><b>{r.label}</b> <span className="zh">{r.zh}</span>
            <span>{r.desc}</span></div>
        ))}
      </details>

      <div className="form">
        <div className="grid2">
          <div className="f"><label>Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="f"><label>Phone</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
        </div>
        <div className="grid2">
          <div className="f"><label>PIN (4–8 digits)</label>
            <input type="password" inputMode="numeric" maxLength={8} value={form.pin}
              onChange={(e) => setForm({ ...form, pin: e.target.value.replace(/\D/g, '') })} /></div>
          <div className="f"><label>Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              {ROLES.map((r) => <option key={r.key} value={r.key}>{r.label} {r.zh}</option>)}
            </select>
            <p className="rdesc">{(ROLES.find((r) => r.key === form.role) || {}).desc}</p></div>
        </div>
        {err && <p className="err">{err}</p>}
        {ok && <p className="status">{ok}</p>}
        <button className="pri" disabled={busy} onClick={add}>{busy ? 'Adding…' : 'Add staff'}</button>
      </div>

      {staff === null ? <p className="muted">Loading…</p>
        : staff.map((s) => (
          <div className={'rec staffrow' + (s.active ? '' : ' dim')} key={s.id}>
            <div className="rec-head">
              <button className="sp-avatar" onClick={() => setOpenId(s.id)} title="Open profile">
                {s.photo ? <img src={s.photo} alt="" /> : <span>{(s.name || '?').slice(0, 1)}</span>}
              </button>
              <div className="grow">
                <b>{s.name}</b> <span className={'cbadge ' + (s.role === 'admin' ? 'lt' : s.role === 'supervisor' || s.role === 'office' ? 'off' : 'proc')}>
                {(ROLES.find((r) => r.key === s.role) || {}).label || s.role}</span>
                {!s.active && <span className="cbadge off">inactive</span>}
                <div className="meta">{s.phone || 'no phone'}{s.staff_no ? ' · ' + s.staff_no : ''}
                  {s.reg_no ? ' · reg ' + s.reg_no : ''}</div>
              </div>
              <button className="ghost" onClick={() => setOpenId(s.id)}>Profile →</button>
            </div>
          </div>
        ))}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { waOpen, msg } from '../wa.js';

const blank = { name: '', phone: '', address: '', age: '', sex: '', care_type: 'procedure', minor: false, consent: false, notes: '' };

export default function Intake({ onOpenQuote }) {
  const [cases, setCases] = useState(null);
  const [nurses, setNurses] = useState([]);
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function load() {
    setCases((await api.getCases('status=intake')).cases);
    try { setNurses((await api.getStaff()).staff.filter((s) => s.active && s.role === 'nurse')); } catch (_) {}
  }
  useEffect(() => { load(); }, []);

  async function submit() {
    setErr('');
    if (!form.name.trim()) return setErr('Enter the patient name.');
    setBusy(true);
    try { await api.createIntake(form); setForm(null); await load(); }
    catch (e) { setErr(e.message); } finally { setBusy(false); }
  }
  async function act(c, body, note) {
    await api.caseAction(c.id, body);
    if (note) waOpen(c.phone, note);
    await load();
  }

  return (
    <div className="card">
      <div className="head-row">
        <h2>Intake</h2>
        <button className="ghost" onClick={() => setForm(form ? null : { ...blank })}>
          {form ? 'Cancel' : '+ New enquiry'}</button>
      </div>
      <p className="muted">New enquiries waiting for your decision — take it, assign it, or decline.</p>

      {form && (
        <div className="form">
          <div className="grid2">
            <F label="Patient name" v={form.name} on={(v) => setForm({ ...form, name: v })} />
            <F label="Phone" v={form.phone} on={(v) => setForm({ ...form, phone: v })} />
          </div>
          <F label="Address" v={form.address} on={(v) => setForm({ ...form, address: v })} />
          <div className="grid2">
            <F label="Age" v={form.age} on={(v) => setForm({ ...form, age: v })} />
            <div className="f">
              <label>Care type</label>
              <select value={form.care_type} onChange={(e) => setForm({ ...form, care_type: e.target.value })}>
                <option value="procedure">Procedure / one-off</option>
                <option value="longterm">Long-term / 24h</option>
              </select>
            </div>
          </div>
          <div className="f">
            <label>What they need</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3} placeholder="Wound dressing, catheter change, daily care…" />
          </div>
          <div className="checks">
            <label className="chk"><input type="checkbox" checked={form.minor}
              onChange={(e) => setForm({ ...form, minor: e.target.checked })} /> Patient is a minor</label>
            <label className="chk"><input type="checkbox" checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })} /> Consent to keep records given</label>
          </div>
          {err && <p className="err">{err}</p>}
          <button className="pri" disabled={busy} onClick={submit}>{busy ? 'Saving…' : 'Add to intake'}</button>
        </div>
      )}

      {cases === null ? <p className="muted">Loading…</p>
        : cases.length === 0 ? <p className="empty">No enquiries waiting. 🎉</p>
        : cases.map((c) => (
          <div className="rec" key={c.id}>
            <div className="rec-head">
              <div><b>{c.name}</b> <CareBadge t={c.care_type} /> <WebBadge s={c.source} />
                <div className="meta">{c.phone || 'no phone'}{c.age ? ' · ' + c.age : ''}</div>
                {c.notes && <div className="note">{c.notes}</div>}</div>
            </div>
            <div className="acts">
              <button className="ok" onClick={() => act(c, { action: 'accept' }, msg.confirm(c.name))}>Accept</button>
              {onOpenQuote && <button onClick={() => onOpenQuote(c.id)}>💬 Quote</button>}
              <span className="assign">
                <select defaultValue="" onChange={(e) => e.target.value &&
                  act(c, { action: 'assign', staff_id: e.target.value }, msg.confirm(c.name))}>
                  <option value="">Assign to…</option>
                  {nurses.map((n) => <option key={n.id} value={n.id}>{n.name}</option>)}
                </select>
              </span>
              <button className="danger" onClick={() => {
                const reason = prompt('Reason for declining (optional):') ?? null;
                if (reason === null) return;
                act(c, { action: 'decline', reason }, msg.decline(c.name));
              }}>Decline</button>
            </div>
          </div>
        ))}
    </div>
  );
}

function F({ label, v, on }) {
  return <div className="f"><label>{label}</label>
    <input value={v} onChange={(e) => on(e.target.value)} /></div>;
}
export function CareBadge({ t }) {
  return <span className={'cbadge ' + (t === 'longterm' ? 'lt' : 'proc')}>
    {t === 'longterm' ? '24h / long-term' : 'procedure'}</span>;
}
export function WebBadge({ s }) {
  if (s !== 'web') return null;
  return <span className="wbadge" title="Booked online via the website">🌐 web</span>;
}

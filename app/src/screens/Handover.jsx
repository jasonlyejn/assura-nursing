import { useEffect, useState } from 'react';
import { api } from '../api.js';

// grouped the way a nurse hands over at the door
const GROUPS = [
  ['How the patient is', [
    ['condition', 'Condition this shift', 'Alert, comfortable. No new complaints.'],
    ['vitals_note', 'Vitals', 'BP 128/76 · HR 82 · T 36.8 · SpO₂ 97%'],
    ['ews', 'MEWS total', '0'],
    ['mood', 'Mood / orientation', 'Oriented, cheerful'],
    ['sleep', 'Sleep', 'Slept well, woke twice'],
  ]],
  ['Care given', [
    ['procedures', 'Procedures done', 'Wound dressing changed, catheter care'],
    ['meds_given', 'Medication given', 'Morning meds given as charted'],
    ['meds_due', 'Medication due next', '2pm Metformin, 6pm insulin'],
    ['wound_note', 'Wound', 'Sacral wound — clean, no odour, redressed'],
    ['mobility', 'Mobility / positioning', '2-hourly turning done, sat out 30 min'],
  ]],
  ['Intake & output', [
    ['meals', 'Meals / appetite', 'Ate ¾ of lunch'],
    ['intake', 'Fluid intake', '900 ml'],
    ['output', 'Urine output', '750 ml, clear'],
    ['bowel', 'Bowel', 'BO once, soft'],
  ]],
  ['To pass on', [
    ['concerns', '⚠ Concerns', 'Slight ankle swelling — monitor'],
    ['todo', '➡ Next shift must do', 'Recheck BP at 4pm. Doctor calling this evening.'],
    ['family_note', 'Told the family', 'Daughter updated on wound progress'],
  ]],
];

const SHIFTS = ['AM', 'PM', 'NIGHT'];

export default function Handover({ caseObj, me, onBack }) {
  const caseId = typeof caseObj === 'string' ? caseObj : caseObj.id;
  const [list, setList] = useState(null);
  const [roster, setRoster] = useState([]);
  const [today, setToday] = useState(todayMY());
  const [form, setForm] = useState({ shift: guessShift(), shift_date: todayMY() });
  const [open, setOpen] = useState(true);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3000); };
  const load = () => api.getHandovers(caseId).then((d) => {
    setList(d.handovers || []);
    setRoster(d.roster || []);
    if (d.today) setToday(d.today);
  }).catch((e) => flash(e.message));
  useEffect(() => { load(); }, [caseId]);

  const set = (k, v) => setForm({ ...form, [k]: v });

  async function file() {
    setBusy(true);
    try {
      await api.createHandover(caseId, form);
      setForm({ shift: guessShift(), shift_date: todayMY() });
      setOpen(false);
      flash('✓ Handover filed');
      load();
    } catch (e) { flash(e.message); }
    setBusy(false);
  }

  async function ack(id) {
    try { await api.ackHandover(id); flash('✓ Signed as received'); load(); }
    catch (e) { flash(e.message); }
  }

  function copyOut(h) {
    const L = [`SHIFT HANDOVER — ${h.shift_date} ${h.shift}`,
               `Nurse: ${h.staff_name || ''}`, ''];
    GROUPS.forEach(([g, fields]) => {
      const rows = fields.filter(([k]) => (h[k] || '').trim());
      if (!rows.length) return;
      L.push(g.toUpperCase());
      rows.forEach(([k, label]) => L.push(`  ${label.replace(/^[⚠➡]\s*/, '')}: ${h[k]}`));
      L.push('');
    });
    navigator.clipboard.writeText(L.join('\n')).then(
      () => flash('✓ Copied — paste it anywhere'), () => flash('Could not copy'));
  }

  return (
    <div className="card">
      <button className="link" onClick={onBack}>← Back</button>
      <h2>Shift handover {caseObj && caseObj.name ? '— ' + caseObj.name : ''}</h2>
      <p className="muted">Fill this at the end of your shift so the next nurse knows exactly where things stand.</p>
      {status && <p className="status">{status}</p>}

      {(() => {
        const order = ['AM', 'PM', 'NIGHT'];
        const here = roster.filter((r) => r.status !== 'off');
        const i = order.indexOf(form.shift);
        const next = i >= 0 && i < 2 ? here[i + 1] : here[3];   // NIGHT hands to tomorrow AM
        const prev = i > 0 ? here[i - 1] : null;
        if (!here.length) return (
          <p className="hoduty muted">No one rostered for this patient today —
            ask the office to set the roster so handover shows who takes over.</p>);
        return (
          <div className="hoduty">
            <div className="dutyline"><span>On duty today</span>
              {here.slice(0, 3).map((r, n) => (
                <b key={n} className={r.shift === form.shift ? 'now' : ''}>
                  {r.shift} {r.staff_name}</b>
              ))}
            </div>
            {prev && <div className="dutymsg">You took over from <b>{prev.staff_name}</b> ({prev.shift})</div>}
            {next
              ? <div className="dutymsg hand">➡ You hand over to <b>{next.staff_name}</b> ({next.shift})
                  {next.staff_phone ? <a className="wa sm" target="_blank" rel="noopener"
                    href={'https://wa.me/' + String(next.staff_phone).replace(/[^0-9]/g, '').replace(/^0/, '60')}>
                    message</a> : null}</div>
              : <div className="dutymsg">No one rostered for the next shift yet.</div>}
          </div>
        );
      })()}

      <button className="ghost wide" onClick={() => setOpen(!open)}>
        {open ? '▾ Hide the form' : '＋ Write this shift’s handover'}</button>

      {open && <div className="hoform">
        <div className="grid2">
          <div className="f"><label>Date</label>
            <input type="date" value={form.shift_date} onChange={(e) => set('shift_date', e.target.value)} /></div>
          <div className="f"><label>Shift</label>
            <div className="seg">
              {SHIFTS.map((s) => (
                <button key={s} className={form.shift === s ? 'on' : ''}
                  onClick={() => set('shift', s)}>{s}</button>
              ))}
            </div></div>
        </div>

        {GROUPS.map(([g, fields]) => (
          <div key={g}>
            <h3 className="qh">{g}</h3>
            {fields.map(([k, label, ph]) => (
              <div className="f" key={k}><label>{label}</label>
                {k === 'ews'
                  ? <input inputMode="numeric" value={form[k] || ''} placeholder={ph}
                      onChange={(e) => set(k, e.target.value)} />
                  : <textarea rows="2" value={form[k] || ''} placeholder={ph}
                      onChange={(e) => set(k, e.target.value)} />}
              </div>
            ))}
          </div>
        ))}

        <button className="pri wide" onClick={file} disabled={busy}>
          {busy ? 'Filing…' : '✓ File handover'}</button>
      </div>}

      <h3 className="qh">Previous shifts</h3>
      {list === null && <p className="muted">Loading…</p>}
      {list && list.length === 0 && <p className="muted">No handover filed yet for this patient.</p>}
      {list && list.map((h) => (
        <div className="rec ho" key={h.id}>
          <div className="rec-head">
            <div className="grow">
              <b>{h.shift_date} · {h.shift}</b>
              {h.ews !== '' && h.ews != null && h.ews !== undefined && String(h.ews).trim() !== ''
                ? <span className={'cbadge ' + (Number(h.ews) >= 3 ? 'lt' : 'proc')}>EWS {h.ews}</span> : null}
              {h.concerns ? <span className="cbadge lt">⚠ concern</span> : null}
              <div className="meta">by {h.staff_name || '—'}
                {h.ack_at ? ' · received by ' + (h.ack_name || '') : ' · not yet signed'}</div>
            </div>
            <button className="ghost sm" onClick={() => copyOut(h)}>Copy</button>
            {!h.ack_at && h.staff_id !== (me && me.id) &&
              <button className="pri sm" onClick={() => ack(h.id)}>Sign received</button>}
          </div>
          <div className="hobody">
            {GROUPS.map(([g, fields]) => {
              const rows = fields.filter(([k]) => (h[k] || '').toString().trim());
              if (!rows.length) return null;
              return <div key={g} className="hogrp">
                <div className="hoglabel">{g}</div>
                {rows.map(([k, label]) => (
                  <div className="horow" key={k}>
                    <span className={k === 'concerns' ? 'hok warn' : k === 'todo' ? 'hok todo' : 'hok'}>
                      {label}</span>
                    <span className="hov">{h[k]}</span>
                  </div>
                ))}
              </div>;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function todayMY() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}
function guessShift() {
  const h = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuala_Lumpur',
    hour: '2-digit', hour12: false }).format(new Date()));
  if (h < 12) return 'AM';
  if (h < 20) return 'PM';
  return 'NIGHT';
}

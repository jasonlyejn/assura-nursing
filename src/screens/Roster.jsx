import { useEffect, useState } from 'react';
import { api } from '../api.js';

const SHIFTS = ['AM', 'PM', 'NIGHT'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Roster({ me, canAssign }) {
  const [cases, setCases] = useState([]);
  const [staff, setStaff] = useState([]);
  const [caseId, setCaseId] = useState('');
  const [start, setStart] = useState(mondayOf(todayMY()));
  const [rows, setRows] = useState([]);
  const [mine, setMine] = useState(!canAssign);
  const [status, setStatus] = useState('');

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3200); };
  const week = [...Array(7)].map((_, i) => addDays(start, i));

  useEffect(() => {
    if (canAssign) {
      api.getCases().then((d) => {
        const list = (d.cases || []).filter((c) => ['accepted', 'assigned', 'active'].includes(c.status));
        setCases(list);
        if (!caseId && list.length) setCaseId(list[0].id);
      }).catch(() => {});
      api.getStaff().then((d) => setStaff((d.staff || []).filter((s) => s.active))).catch(() => {});
    }
  }, [canAssign]);

  const load = () => {
    const q = { from: week[0], to: week[6] };
    if (mine) q.mine = 1; else if (caseId) q.case_id = caseId;
    api.getRoster(q).then((d) => setRows(d.roster || [])).catch((e) => flash(e.message));
  };
  useEffect(() => { load(); }, [start, caseId, mine]);

  const at = (date, shift) => rows.find((r) => r.shift_date === date && r.shift === shift);

  async function assign(date, shift, staffId) {
    if (!staffId) {
      const ex = at(date, shift);
      if (ex) { try { await api.clearShift(ex.id); load(); } catch (e) { flash(e.message); } }
      return;
    }
    try {
      const r = await api.setShift({ case_id: caseId, staff_id: staffId, shift_date: date, shift });
      if (r.clash) flash('⚠ Also rostered on ' + r.clash + ' for this shift');
      load();
    } catch (e) { flash(e.message); }
  }

  async function confirmShift(id, st) {
    try { await api.updateShift(id, st); load(); } catch (e) { flash(e.message); }
  }

  return (
    <div className="card">
      <h2>Roster</h2>
      <p className="muted">Who is on which shift. Handover then shows each nurse who they pass over to.</p>
      {status && <p className="status">{status}</p>}

      <div className="rosbar">
        <button className="ghost" onClick={() => setStart(addDays(start, -7))}>◀ Prev</button>
        <b>{fmt(week[0])} – {fmt(week[6])}</b>
        <button className="ghost" onClick={() => setStart(addDays(start, 7))}>Next ▶</button>
        <button className="ghost" onClick={() => setStart(mondayOf(todayMY()))}>This week</button>
        {canAssign && <>
          <select value={mine ? 'mine' : caseId} onChange={(e) => {
            if (e.target.value === 'mine') setMine(true);
            else { setMine(false); setCaseId(e.target.value); }
          }}>
            <option value="mine">My shifts</option>
            {cases.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </>}
      </div>

      {mine ? (
        rows.length === 0
          ? <p className="muted">No shifts rostered for you this week.</p>
          : rows.map((r) => (
            <div className="rec" key={r.id}>
              <div className="rec-head">
                <div className="grow">
                  <b>{fmt(r.shift_date)} · {r.shift}</b>
                  <span className={'cbadge ' + (r.status === 'confirmed' ? 'proc' : r.status === 'done' ? 'off' : 'lt')}>
                    {r.status}</span>
                  <div className="meta">{r.patient_name}{r.start_time ? ' · ' + r.start_time + '–' + r.end_time : ''}</div>
                </div>
                {r.status === 'planned' &&
                  <button className="pri sm" onClick={() => confirmShift(r.id, 'confirmed')}>Confirm</button>}
              </div>
            </div>
          ))
      ) : (
        <div className="rosgrid">
          <table>
            <thead><tr><th></th>{week.map((d) => (
              <th key={d}><span>{DAYS[new Date(d + 'T00:00:00Z').getUTCDay()]}</span>{fmt(d)}</th>
            ))}</tr></thead>
            <tbody>
              {SHIFTS.map((sh) => (
                <tr key={sh}>
                  <th className="shl">{sh}</th>
                  {week.map((d) => {
                    const r = at(d, sh);
                    return <td key={d} className={r ? 'filled' : ''}>
                      <select value={r ? r.staff_id : ''}
                        onChange={(e) => assign(d, sh, e.target.value)}>
                        <option value="">—</option>
                        {staff.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                      {r && <span className={'st ' + r.status}>{r.status}</span>}
                    </td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function todayMY() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}
function addDays(d, n) {
  const t = new Date(d + 'T00:00:00Z'); t.setUTCDate(t.getUTCDate() + n);
  return t.toISOString().slice(0, 10);
}
function mondayOf(d) {
  const t = new Date(d + 'T00:00:00Z');
  const day = (t.getUTCDay() + 6) % 7;      // Mon = 0
  return addDays(d, -day);
}
function fmt(d) { return d.slice(8, 10) + '/' + d.slice(5, 7); }

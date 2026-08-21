import { useEffect, useState } from 'react';
import { api } from '../api.js';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const STATUS = {
  given: { mark: null, label: 'Given', cls: 'g' },          // shows the initial
  refused: { mark: 'R', label: 'Refused', cls: 'r' },
  omitted: { mark: 'O', label: 'Omitted', cls: 'o' },
  unavailable: { mark: 'X', label: 'Not available', cls: 'o' },
  self: { mark: 'S', label: 'Self-administered', cls: 'g' },
};
const SLOTS = ['MORNING', 'NOON', 'EVENING', 'NIGHT'];

export default function Meds({ caseObj, me, onBack }) {
  const caseId = typeof caseObj === 'string' ? caseObj : caseObj.id;
  const [meds, setMeds] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [pt, setPt] = useState({});
  const [myInitials, setMyInitials] = useState('');
  const [week, setWeek] = useState(mondayOf(todayMY()));
  const [tab, setTab] = useState('regular');
  const [adding, setAdding] = useState(false);
  const [f, setF] = useState(blank('regular'));
  const [status, setStatus] = useState('');

  const days = [...Array(7)].map((_, i) => addDays(week, i));
  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3000); };

  const load = () => api.getMeds(caseId, days[0], days[6]).then((d) => {
    setMeds(d.meds || []); setAdmin(d.admin || []); setPt(d.patient || {});
  }).catch((e) => flash(e.message));

  useEffect(() => { load(); }, [caseId, week]);
  useEffect(() => {
    api.getTeam().then((d) => {
      const mine = (d.team || []).find((t) => t.id === d.me);
      setMyInitials(mine ? mine.initials : '');
    }).catch(() => {});
  }, []);

  const at = (medId, date, slot) =>
    admin.find((a) => a.med_id === medId && a.given_date === date && a.slot === slot);

  async function sign(med, date, slot) {
    const ex = at(med.id, date, slot);
    let st = 'given', reason = '';
    if (ex) {                       // tapping again cycles through the outcomes
      const order = ['given', 'refused', 'omitted', 'unavailable', 'self'];
      st = order[(order.indexOf(ex.status) + 1) % order.length];
    }
    if (st !== 'given' && st !== 'self') {
      reason = prompt(STATUS[st].label + ' — why?') || '';
      if (!reason) return;
    }
    try {
      await api.giveMed({ case_id: caseId, med_id: med.id, given_date: date,
        slot, status: st, reason });
      load();
    } catch (e) { flash(e.message); }
  }

  async function addMed() {
    if (!f.name.trim()) { flash('Medication name is needed'); return; }
    try {
      await api.addMed(caseId, { ...f, kind: tab });
      setF(blank(tab)); setAdding(false); flash('✓ Added'); load();
    } catch (e) { flash(e.message); }
  }

  async function stopMed(m) {
    if (!confirm((m.active ? 'Stop' : 'Resume') + ' ' + m.name + '?')) return;
    try { await api.updateMed(m.id, { action: m.active ? 'stop' : 'resume' }); load(); }
    catch (e) { flash(e.message); }
  }

  const list = meds.filter((m) => (m.kind || 'regular') === tab);

  return (
    <div className="card">
      <button className="link" onClick={onBack}>← Back</button>
      <h2>Medication Administration Record</h2>
      <div className="marhead">
        <div className="mh1"><span className="lbl">PATIENT</span><b>{pt.name || '—'}</b></div>
        <div className={'mh1 ' + (pt.allergies ? 'allergy' : '')}>
          <span className="lbl">ALLERGIES</span>
          <b>{pt.allergies || 'NIL KNOWN'}</b></div>
        <div className="mh1"><span className="lbl">CHART</span>
          <b>{tab === 'regular' ? 'REGULAR' : tab === 'stat' ? 'STAT / ONCE ONLY' : 'PRN / WHEN REQUIRED'}</b></div>
      </div>
      {status && <p className="status">{status}</p>}

      <div className="signbar">
        <span className="sigchip">{myInitials}</span>
        <span className="muted">Doses are recorded under your initials.</span>
      </div>

      <div className="tabs">
        <button className={tab === 'regular' ? 'on' : ''} onClick={() => { setTab('regular'); setF(blank('regular')); }}>
          Regular</button>
        <button className={tab === 'stat' ? 'on' : ''} onClick={() => { setTab('stat'); setF(blank('stat')); }}>
          STAT / Once only</button>
        <button className={tab === 'prn' ? 'on' : ''} onClick={() => { setTab('prn'); setF(blank('prn')); }}>
          PRN / When required</button>
      </div>

      {tab === 'regular' && (
        <div className="rosbar">
          <button className="ghost" onClick={() => setWeek(addDays(week, -7))}>◀ Prev</button>
          <b>{fmt(days[0])} – {fmt(days[6])}</b>
          <button className="ghost" onClick={() => setWeek(addDays(week, 7))}>Next ▶</button>
          <button className="ghost" onClick={() => setWeek(mondayOf(todayMY()))}>This week</button>
        </div>
      )}

      <button className="ghost wide" onClick={() => setAdding(!adding)}>
        {adding ? '▾ Cancel' : '＋ Add medication'}</button>

      {adding && (
        <div className="hoform">
          <div className="f"><label>Medication</label>
            <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })}
              placeholder="e.g. Metformin" /></div>
          <div className="grid3">
            <div className="f"><label>Dose</label>
              <input value={f.dose} onChange={(e) => setF({ ...f, dose: e.target.value })} placeholder="500mg" /></div>
            <div className="f"><label>Route</label>
              <input list="routes" value={f.route} onChange={(e) => setF({ ...f, route: e.target.value })} placeholder="PO" />
              <datalist id="routes">{['PO','SC','IM','IV','TOP','PR','SL','NEB','INH','NG','PEG','EYE','EAR']
                .map((r) => <option key={r} value={r} />)}</datalist></div>
            <div className="f"><label>Frequency</label>
              <input list="freqs" value={f.frequency} onChange={(e) => setF({ ...f, frequency: e.target.value })} placeholder="BD" />
              <datalist id="freqs">{['OD','BD','TDS','QID','ON','OM','STAT','PRN','Weekly']
                .map((r) => <option key={r} value={r} />)}</datalist></div>
          </div>
          {tab === 'regular' && (
            <div className="f"><label>Times of day</label>
              <div className="seg">
                {SLOTS.map((s) => {
                  const on = (f.times || '').split(',').filter(Boolean).includes(s);
                  return <button key={s} className={on ? 'on' : ''} onClick={() => {
                    const cur = (f.times || '').split(',').filter(Boolean);
                    setF({ ...f, times: (on ? cur.filter((x) => x !== s) : [...cur, s]).join(',') });
                  }}>{s}</button>;
                })}
              </div></div>
          )}
          {tab === 'prn' && <div className="grid2">
            <div className="f"><label>Indication</label>
              <input value={f.indication} onChange={(e) => setF({ ...f, indication: e.target.value })}
                placeholder="e.g. for pain" /></div>
            <div className="f"><label>Maximum dose</label>
              <input value={f.max_dose} onChange={(e) => setF({ ...f, max_dose: e.target.value })}
                placeholder="e.g. 4g in 24 hours" /></div>
          </div>}
          <div className="f"><label>Instruction / notes</label>
            <textarea rows="2" value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })}
              placeholder="e.g. after food" /></div>
          <button className="pri wide" onClick={addMed}>Add medication</button>
        </div>
      )}

      {list.length === 0 && <p className="muted">No {tab} medication charted.</p>}

      {/* ---- regular: weekly grid ---- */}
      {tab === 'regular' && list.length > 0 && (
        <div className="rosgrid marwrap">
          <table className="mar">
            <thead><tr>
              <th className="mnum">NO</th><th className="mname">PRESCRIBED MEDICATION</th><th className="mslot">TIME</th>
              {days.map((d, i) => <th key={d}><span>{DAYS[i]}</span>{fmt(d)}</th>)}
            </tr></thead>
            <tbody>
              {list.map((m, mi) => {
                const slots = (m.times || '').split(',').filter(Boolean);
                const rows = slots.length ? slots : ['DOSE'];
                return rows.map((slot, si) => (
                  <tr key={m.id + slot} className={m.active ? '' : 'stopped'}>
                    {si === 0 && <td className="mnum" rowSpan={rows.length}>{mi + 1}</td>}
                    {si === 0 && (
                      <td className="mname" rowSpan={rows.length}>
                        <b>{m.name}</b>
                        <span className="mmeta">
                          {m.dose ? <i>{m.dose}</i> : null}
                          {m.route ? <i>{m.route}</i> : null}
                          {m.frequency ? <i>{m.frequency}</i> : null}</span>
                        {m.notes ? <span className="mnote">{m.notes}</span> : null}
                        <button className="link xs" onClick={() => stopMed(m)}>
                          {m.active ? 'stop' : 'resume'}</button>
                      </td>
                    )}
                    <td className="mslot">{slot}</td>
                    {days.map((d) => {
                      const a = at(m.id, d, slot);
                      const S = a ? STATUS[a.status] || STATUS.given : null;
                      return (
                        <td key={d} className={'mcell ' + (S ? S.cls : '')}
                          onClick={() => m.active && sign(m, d, slot)}
                          title={a ? (S.label + (a.reason ? ' — ' + a.reason : '') + ' · ' + a.staff_initial) : 'Tap to sign'}>
                          {a ? (S.mark || a.staff_initial) : ''}
                        </td>
                      );
                    })}
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ---- stat / prn: one row per dose given ---- */}
      {tab !== 'regular' && list.map((m) => {
        const given = admin.filter((a) => a.med_id === m.id)
          .sort((x, y) => y.given_at - x.given_at);
        return (
          <div className={'rec med ' + (m.active ? '' : 'stopped')} key={m.id}>
            <div className="rec-head">
              <div className="grow">
                <b>{m.name}</b>
                <div className="meta">{[m.dose, m.route, m.frequency].filter(Boolean).join(' · ')}</div>
                {m.indication ? <div className="meta">For: {m.indication}</div> : null}
                {m.max_dose ? <div className="meta warn">Max: {m.max_dose}</div> : null}
                {m.notes ? <div className="mnote">{m.notes}</div> : null}
              </div>
              <div className="pbtns">
                {m.active && <button className="pri sm"
                  onClick={() => sign(m, todayMY(), 'dose-' + Date.now())}>Give now</button>}
                <button className="ghost sm" onClick={() => stopMed(m)}>
                  {m.active ? 'Stop' : 'Resume'}</button>
              </div>
            </div>
            {given.length > 0 && (
              <div className="gavelist">
                {given.slice(0, 8).map((a) => (
                  <div className="gave" key={a.id}>
                    <span className="gt">{a.given_date} {timeOf(a.given_at)}</span>
                    <span className={'gs ' + (STATUS[a.status] || STATUS.given).cls}>
                      {(STATUS[a.status] || STATUS.given).label}</span>
                    <span className="gi">{a.staff_initial}</span>
                    {a.reason ? <span className="gr">{a.reason}</span> : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="marlegend">
        <b>CODES</b>
        <span><i>AB</i> initials = administered</span>
        <span><i>R</i> refused</span>
        <span><i>O</i> omitted</span>
        <span><i>X</i> not available</span>
        <span><i>S</i> self-administered</span>
        <em>Tap a box to sign. Tap again to change the code.</em>
      </div>
    </div>
  );
}

function blank(kind) {
  return { name: '', dose: '', route: '', frequency: '', times: kind === 'regular' ? 'MORNING' : '',
           start_date: '', end_date: '', indication: '', max_dose: '', notes: '' };
}
function todayMY() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}
function addDays(d, n) { const t = new Date(d + 'T00:00:00Z'); t.setUTCDate(t.getUTCDate() + n);
  return t.toISOString().slice(0, 10); }
function mondayOf(d) { const t = new Date(d + 'T00:00:00Z');
  return addDays(d, -((t.getUTCDay() + 6) % 7)); }
function fmt(d) { return d.slice(8, 10) + '/' + d.slice(5, 7); }
function timeOf(ts) { return new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuala_Lumpur',
  hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(ts)); }

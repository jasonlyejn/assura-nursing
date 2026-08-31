import { useEffect, useState } from 'react';
import { api } from '../api.js';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const STATUS = {
  given: { mark: null, label: 'Given', cls: 'g', zh: '已给药' },
  self: { mark: 'S', label: 'Self-administered', cls: 'g', zh: '病患自服' },
  refused: { mark: 'R', label: 'Refused', cls: 'r', zh: '病患拒绝' },
  omitted: { mark: 'O', label: 'Omitted', cls: 'o', zh: '遵医嘱省去' },
  unavailable: { mark: 'X', label: 'Not available', cls: 'o', zh: '药物缺货/未备' },
};
const SLOTS = ['08:00 (Morning)', '12:00 (Noon)', '17:00 (Evening)', '21:00 (Night)', 'MORNING', 'NOON', 'EVENING', 'NIGHT'];

const INSULIN_TYPES = [
  'Actrapid (Short-acting Regular)',
  'Novorapid / Aspart (Rapid-acting)',
  'Humalog / Lispro (Rapid-acting)',
  'Lantus / Glargine (Long-acting 24h)',
  'Mixtard 30/70 (Premixed Dual)',
  'Toujeo / Glargine U300 (Ultra-long)',
  'Tresiba / Degludec (Ultra-long)',
  'Humulin N / NPH (Intermediate)',
  'Humulin R (Regular Short-acting)',
];

const INJECTION_SITES = [
  'Abdomen - Right Upper (RUQ)',
  'Abdomen - Left Upper (LUQ)',
  'Abdomen - Right Lower (RLQ)',
  'Abdomen - Left Lower (LLQ)',
  'Right Outer Thigh',
  'Left Outer Thigh',
  'Right Upper Arm (Deltoid)',
  'Left Upper Arm (Deltoid)',
  'Right Buttock / Flank',
  'Left Buttock / Flank',
];

const GLUCOSE_SLOTS = [
  'Fasting (Before Breakfast 7-8am)',
  'Pre-Lunch (11am-12pm)',
  '2h Post-Lunch (2-3pm)',
  'Pre-Dinner (5-6pm)',
  'Bedtime / Night (9-10pm)',
  '2:00 AM (Hypoglycemia check)',
  'Random / PRN (Symptomatic)',
];

// Standard Clinical Sliding Scale Calculation
function calculateSlidingScale(glucoseVal) {
  const g = Number(glucoseVal);
  if (isNaN(g) || g <= 0) return { units: 0, status: 'normal', advice: '' };
  if (g < 4.0) {
    return {
      units: 0,
      status: 'hypo',
      advice: '🚨 HYPOGLYCEMIA! Withhold insulin. Give 15g fast sugar (half cup juice / 3 sweets). Recheck in 15 mins.',
    };
  }
  if (g <= 10.0) {
    return { units: 0, status: 'target', advice: '✓ Target Range (4.0–10.0 mmol/L). Standard maintenance dose only.' };
  }
  if (g <= 13.0) {
    return { units: 4, status: 'mild_high', advice: 'Mild Elevation (10.1–13.0 mmol/L) → Give +4 Units Rapid/Short Insulin.' };
  }
  if (g <= 16.0) {
    return { units: 6, status: 'mod_high', advice: 'Moderate Elevation (13.1–16.0 mmol/L) → Give +6 Units Rapid/Short Insulin.' };
  }
  return {
    units: 8,
    status: 'severe_high',
    advice: '⚠️ Severe Hyperglycemia (>16.0 mmol/L) → Give +8 Units. Ensure hydration, monitor ketones & notify doctor.',
  };
}

export default function Meds({ caseObj, me, onBack }) {
  const caseId = typeof caseObj === 'string' ? caseObj : caseObj.id;
  const [meds, setMeds] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [insulinLogs, setInsulinLogs] = useState([]);
  const [pt, setPt] = useState({});
  const [myInitials, setMyInitials] = useState('');
  const [week, setWeek] = useState(mondayOf(todayMY()));
  const [tab, setTab] = useState('regular'); // 'regular' | 'stat' | 'prn' | 'insulin' | 'print'
  const [adding, setAdding] = useState(false);
  const [f, setF] = useState(blank('regular'));
  const [status, setStatus] = useState('');

  // Dose Administration Time & Status Modal State
  const [signModal, setSignModal] = useState(null);
  // Prescription Edit Modal State
  const [editMed, setEditMed] = useState(null);

  // Insulin Logger Form State
  const [insForm, setInsForm] = useState({
    record_date: todayMY(),
    slot: GLUCOSE_SLOTS[0],
    glucose: '',
    insulin_type: INSULIN_TYPES[0],
    units_given: '',
    injection_site: INJECTION_SITES[0],
    notes: '',
  });

  const days = [...Array(7)].map((_, i) => addDays(week, i));
  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3000); };

  const load = () => {
    Promise.all([
      api.getMeds(caseId, days[0], days[6]).catch(() => ({ meds: [], admin: [], patient: {} })),
      api.getInsulin(caseId).catch(() => ({ records: [] })),
    ]).then(([d, ins]) => {
      setMeds(d.meds || []);
      setAdmin(d.admin || []);
      setPt(d.patient || {});
      setInsulinLogs(ins.records || []);
    }).catch((e) => flash(e.message));
  };

  useEffect(() => { load(); }, [caseId, week]);
  useEffect(() => {
    api.getTeam().then((d) => {
      const mine = (d.team || []).find((t) => t.id === d.me);
      setMyInitials(mine ? mine.initials : (me && me.name ? me.name.split(' ').map(w => w[0]).join('').slice(0, 2) : 'RN'));
    }).catch(() => {});
  }, [me]);

  const at = (medId, date, slot) =>
    admin.find((a) => a.med_id === medId && a.given_date === date && a.slot === slot);

  function openSign(med, date, slot) {
    const ex = at(med.id, date, slot);
    setSignModal({
      med,
      date,
      slot,
      ex: ex || null,
      status: ex ? ex.status : 'given',
      given_date: (ex && ex.given_date) || date,
      given_time: ex && ex.given_at ? formatTimeMY(ex.given_at) : currentTimeMY(),
      staff_initial: (ex && ex.staff_initial) || myInitials || 'RN',
      reason: (ex && ex.reason) || '',
    });
  }

  async function handleSaveDose(e) {
    if (e) e.preventDefault();
    if (!signModal) return;
    const { med, given_date, given_time, slot, status: st, reason, staff_initial } = signModal;
    if (st !== 'given' && st !== 'self' && !reason.trim()) {
      flash('Please state clinical reason why the dose was not given');
      return;
    }
    try {
      await api.giveMed({
        case_id: caseId,
        med_id: med.id,
        given_date,
        given_time,
        slot,
        status: st,
        reason,
        staff_initial,
      });
      flash(`✓ Dose logged as ${st.toUpperCase()} at ${given_time}`);
      setSignModal(null);
      load();
    } catch (err) {
      flash(err.message);
    }
  }

  async function voidDose(adminId) {
    if (!confirm('Are you sure you want to void and delete this dose administration record?')) return;
    try {
      await fetch('/api/meds/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ id: adminId, action: 'void' }),
      });
      flash('✓ Dose record voided');
      setSignModal(null);
      load();
    } catch (e) { flash(e.message); }
  }

  async function voidInsulin(recordId) {
    if (!confirm('Delete this blood glucose / insulin entry?')) return;
    try {
      await fetch('/api/insulin/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ id: recordId, action: 'void' }),
      });
      flash('✓ Entry deleted');
      load();
    } catch (e) { flash(e.message); }
  }

  async function addMed() {
    if (!f.name.trim()) { flash('Medication name is needed'); return; }
    try {
      await api.addMed(caseId, { ...f, kind: tab });
      setF(blank(tab)); setAdding(false); flash('✓ Added medication to chart'); load();
    } catch (e) { flash(e.message); }
  }

  async function handleSaveEditMed() {
    if (!editMed || !editMed.name.trim()) { flash('Medication name is needed'); return; }
    try {
      await api.updateMed(editMed.id, editMed);
      flash('✓ Medication updated');
      setEditMed(null);
      load();
    } catch (e) { flash(e.message); }
  }

  async function stopMed(m) {
    if (!confirm((m.active ? 'Stop' : 'Resume') + ' ' + m.name + '?')) return;
    try { await api.updateMed(m.id, { action: m.active ? 'stop' : 'resume' }); load(); }
    catch (e) { flash(e.message); }
  }

  // Submit Blood Glucose & Insulin log
  async function logInsulin() {
    if (!insForm.glucose || isNaN(Number(insForm.glucose))) {
      flash('Please enter a valid blood glucose reading (mmol/L)');
      return;
    }
    const scale = calculateSlidingScale(insForm.glucose);
    try {
      await api.addInsulin(caseId, {
        record_date: insForm.record_date,
        slot: insForm.slot,
        glucose: Number(insForm.glucose),
        insulin_type: insForm.insulin_type,
        units_recommended: scale.units,
        units_given: Number(insForm.units_given || scale.units),
        injection_site: insForm.injection_site,
        notes: insForm.notes,
      });
      flash('✓ Blood glucose & insulin logged');
      setInsForm((prev) => ({ ...prev, glucose: '', units_given: '', notes: '' }));
      load();
    } catch (e) { flash(e.message); }
  }

  const list = meds.filter((m) => (m.kind || 'regular') === tab);
  const activeScale = calculateSlidingScale(insForm.glucose);

  return (
    <div>
      <div className="case-subbar no-print">
        <button className="case-back-btn" onClick={onBack}>
          <span>←</span> <b>Back to Cases</b>
        </button>
        <div className="case-subbar-info">
          <span className="case-patient-name">{pt.name || caseObj.name || 'Patient'}</span>
          <span className="case-view-tag">💊 Medication &amp; MAR</span>
        </div>
      </div>

      <div className="card">
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
          <b style={{ color: 'var(--navy)', fontSize: '1rem' }}>💊 Medication Administration Record (MAR)</b>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className={tab === 'print' ? 'pri sm' : 'ghost sm'}
              onClick={() => setTab(tab === 'print' ? 'regular' : 'print')}
            >
              🖨️ {tab === 'print' ? 'Back to Digital Chart' : 'Printable Bedside MAR'}
            </button>
          </div>
        </div>

      {/* Patient Allergy & Safety Banner */}
      <div className="marhead">
        <div className="mh1"><span className="lbl">PATIENT</span><b>{pt.name || caseObj.name || '—'}</b></div>
        <div className={'mh1 ' + (pt.allergies || caseObj.allergies ? 'allergy' : '')}>
          <span className="lbl">ALLERGIES</span>
          <b>{pt.allergies || caseObj.allergies || 'NIL KNOWN'}</b>
        </div>
        <div className="mh1">
          <span className="lbl">CHART MODE</span>
          <b>
            {tab === 'regular' ? 'REGULAR MAR' :
             tab === 'stat' ? 'STAT / ONCE ONLY' :
             tab === 'prn' ? 'PRN / WHEN REQUIRED' :
             tab === 'insulin' ? 'INSULIN SLIDING SCALE' : 'PRINT BED SHEET'}
          </b>
        </div>
      </div>
      {status && <p className="status">{status}</p>}

      {tab !== 'print' && (
        <div className="signbar">
          <span className="sigchip">{myInitials}</span>
          <span className="muted">Tap any cell to sign, adjust administration time (HH:mm), or edit notes.</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="tabs no-print">
        <button className={tab === 'regular' ? 'on' : ''} onClick={() => { setTab('regular'); setF(blank('regular')); }}>
          💊 Regular (Weekly)
        </button>
        <button className={tab === 'stat' ? 'on' : ''} onClick={() => { setTab('stat'); setF(blank('stat')); }}>
          ⚡ STAT / Once only
        </button>
        <button className={tab === 'prn' ? 'on' : ''} onClick={() => { setTab('prn'); setF(blank('prn')); }}>
          🩺 PRN / When required
        </button>
        <button className={tab === 'insulin' ? 'on' : ''} onClick={() => { setTab('insulin'); }}>
          💉 Insulin &amp; Glucose Sheet
        </button>
      </div>

      {/* ===================== TAB 1: REGULAR MAR ===================== */}
      {tab === 'regular' && (
        <>
          <div className="rosbar no-print">
            <button className="ghost" onClick={() => setWeek(addDays(week, -7))}>◀ Prev Week</button>
            <b>{fmt(days[0])} – {fmt(days[6])}</b>
            <button className="ghost" onClick={() => setWeek(addDays(week, 7))}>Next Week ▶</button>
            <button className="ghost" onClick={() => setWeek(mondayOf(todayMY()))}>Current Week</button>
          </div>

          <button className="ghost wide no-print" onClick={() => setAdding(!adding)}>
            {adding ? '▾ Cancel' : '＋ Add Regular Medication'}
          </button>

          {adding && (
            <div className="hoform" style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', margin: '10px 0', border: '1px solid #cbd5e1' }}>
              <div className="f"><label>Medication Name &amp; Strength</label>
                <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="e.g. Metformin 500mg tab" /></div>
              <div className="grid3">
                <div className="f"><label>Dose</label>
                  <input value={f.dose} onChange={(e) => setF({ ...f, dose: e.target.value })} placeholder="500mg" /></div>
                <div className="f"><label>Route</label>
                  <input list="routes" value={f.route} onChange={(e) => setF({ ...f, route: e.target.value })} placeholder="PO" />
                  <datalist id="routes">{['PO','SC','IM','IV','TOP','PR','SL','NEB','INH','NG','PEG','EYE','EAR'].map((r) => <option key={r} value={r} />)}</datalist></div>
                <div className="f"><label>Frequency</label>
                  <input list="freqs" value={f.frequency} onChange={(e) => setF({ ...f, frequency: e.target.value })} placeholder="BD" />
                  <datalist id="freqs">{['OD','BD','TDS','QID','ON','OM','STAT','PRN','Weekly'].map((r) => <option key={r} value={r} />)}</datalist></div>
              </div>
              <div className="f"><label>Times of Day / Schedule Slots (comma-separated)</label>
                <input value={f.times} onChange={(e) => setF({ ...f, times: e.target.value })} placeholder="e.g. 08:00, 20:00 or MORNING, NIGHT" />
              </div>
              <div className="f"><label>Special Instructions / Food</label>
                <textarea rows="2" value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} placeholder="e.g. After meals / Check BP before giving" /></div>
              <button className="pri wide" onClick={addMed}>Add Medication to Chart</button>
            </div>
          )}

          {list.length === 0 && <p className="muted">No regular medications charted for this patient.</p>}

          {list.length > 0 && (
            <div className="rosgrid marwrap" style={{ overflowX: 'auto', marginTop: '12px' }}>
              <table className="mar" style={{ width: '100%', minWidth: '700px' }}>
                <thead>
                  <tr>
                    <th className="mnum">NO</th>
                    <th className="mname">PRESCRIBED MEDICATION</th>
                    <th className="mslot">TIME</th>
                    {days.map((d, i) => <th key={d}><span>{DAYS[i]}</span>{fmt(d)}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {list.map((m, mi) => {
                    const slots = (m.times || '').split(',').map((s) => s.trim()).filter(Boolean);
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
                              {m.frequency ? <i>{m.frequency}</i> : null}
                              {m.times ? <i>⏱️ {m.times}</i> : null}
                            </span>
                            {m.notes ? <span className="mnote">{m.notes}</span> : null}
                            <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                              <button className="link xs no-print" onClick={() => setEditMed({ ...m })}>
                                ✏️ edit
                              </button>
                              <button className="link xs no-print" onClick={() => stopMed(m)}>
                                {m.active ? 'stop' : 'resume'}
                              </button>
                            </div>
                          </td>
                        )}
                        <td className="mslot" style={{ fontWeight: '700' }}>{slot}</td>
                        {days.map((d) => {
                          const a = at(m.id, d, slot);
                          const S = a ? STATUS[a.status] || STATUS.given : null;
                          const doseTime = a && a.given_at ? formatTimeMY(a.given_at) : '';
                          return (
                            <td
                              key={d}
                              className={'mcell ' + (S ? S.cls : '')}
                              onClick={() => m.active && openSign(m, d, slot)}
                              style={{ cursor: m.active ? 'pointer' : 'default', padding: '6px 4px', textAlign: 'center' }}
                              title={a ? (`${S.label} at ${doseTime}${a.reason ? ' (' + a.reason + ')' : ''} · Initial: ${a.staff_initial}`) : 'Tap to sign or adjust administer time'}
                            >
                              {a ? (
                                <div style={{ lineHeight: 1.15 }}>
                                  <b style={{ fontSize: '0.85rem' }}>{S.mark || a.staff_initial}</b>
                                  {doseTime && <div style={{ fontSize: '0.66rem', color: '#64748b' }}>{doseTime}</div>}
                                </div>
                              ) : (
                                <span style={{ opacity: 0.25 }}>—</span>
                              )}
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
        </>
      )}

      {/* ===================== TAB 2: STAT / ONCE ONLY ===================== */}
      {tab === 'stat' && (
        <>
          <button className="ghost wide no-print" onClick={() => setAdding(!adding)}>
            {adding ? '▾ Cancel' : '＋ Add STAT / Once-Only Order'}
          </button>
          {adding && (
            <div className="hoform" style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', margin: '10px 0', border: '1px solid #cbd5e1' }}>
              <div className="f"><label>Medication Name</label>
                <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="e.g. Paracetamol 1g PO stat" /></div>
              <div className="grid3">
                <div className="f"><label>Dose</label><input value={f.dose} onChange={(e) => setF({ ...f, dose: e.target.value })} placeholder="1g" /></div>
                <div className="f"><label>Route</label><input value={f.route} onChange={(e) => setF({ ...f, route: e.target.value })} placeholder="PO" /></div>
                <div className="f"><label>Date to give</label><input type="date" value={f.start_date} onChange={(e) => setF({ ...f, start_date: e.target.value })} /></div>
              </div>
              <div className="f"><label>Clinical Indication</label><input value={f.indication} onChange={(e) => setF({ ...f, indication: e.target.value })} placeholder="e.g. Fever > 38.5C" /></div>
              <button className="pri wide" onClick={addMed}>Add STAT Order</button>
            </div>
          )}
          {list.length === 0 && <p className="muted">No STAT / once-only orders charted.</p>}
          {list.map((m) => {
            const a = admin.find((x) => x.med_id === m.id);
            const S = a ? STATUS[a.status] || STATUS.given : null;
            return (
              <div key={m.id} className="rec" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <b>{m.name}</b> {m.dose} {m.route}
                  <div className="meta">Target: {m.start_date || 'Today'} · Indication: {m.indication || '—'}</div>
                </div>
                <div>
                  {a ? (
                    <button className="ghost sm" onClick={() => openSign(m, a.given_date, 'STAT')}>
                      ✓ {S.label} at {formatTimeMY(a.given_at)} ({a.staff_initial})
                    </button>
                  ) : (
                    <button className="pri sm" onClick={() => openSign(m, m.start_date || todayMY(), 'STAT')}>
                      Sign &amp; Give STAT
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* ===================== TAB 3: PRN / AS NEEDED ===================== */}
      {tab === 'prn' && (
        <>
          <button className="ghost wide no-print" onClick={() => setAdding(!adding)}>
            {adding ? '▾ Cancel' : '＋ Add PRN Medication'}
          </button>
          {adding && (
            <div className="hoform" style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', margin: '10px 0', border: '1px solid #cbd5e1' }}>
              <div className="f"><label>Medication Name</label>
                <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="e.g. Tramadol 50mg cap" /></div>
              <div className="grid3">
                <div className="f"><label>Dose</label><input value={f.dose} onChange={(e) => setF({ ...f, dose: e.target.value })} placeholder="50mg" /></div>
                <div className="f"><label>Route</label><input value={f.route} onChange={(e) => setF({ ...f, route: e.target.value })} placeholder="PO" /></div>
                <div className="f"><label>Min Interval</label><input value={f.frequency} onChange={(e) => setF({ ...f, frequency: e.target.value })} placeholder="Q6H PRN" /></div>
              </div>
              <div className="grid2">
                <div className="f"><label>Indication</label><input value={f.indication} onChange={(e) => setF({ ...f, indication: e.target.value })} placeholder="Moderate to severe pain" /></div>
                <div className="f"><label>Max Daily Dose</label><input value={f.max_dose} onChange={(e) => setF({ ...f, max_dose: e.target.value })} placeholder="400mg / 24h" /></div>
              </div>
              <button className="pri wide" onClick={addMed}>Add PRN Medication</button>
            </div>
          )}
          {list.length === 0 && <p className="muted">No PRN medications charted.</p>}
          {list.map((m) => (
            <div key={m.id} className="rec" style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <b>{m.name}</b> {m.dose} {m.route} <span className="badge badge-amber">{m.frequency || 'PRN'}</span>
                  <div className="meta">Indication: {m.indication || '—'} · Max: {m.max_dose || '—'}</div>
                </div>
                <button className="pri sm" onClick={() => openSign(m, todayMY(), 'PRN-' + Date.now().toString(36).slice(-4))}>
                  ＋ Log PRN Dose
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* ===================== TAB 4: INSULIN & GLUCOSE ===================== */}
      {tab === 'insulin' && (
        <div>
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '1.05rem', color: '#0f172a' }}>💉 Log Blood Glucose &amp; Sliding Scale Insulin</h3>
            <div className="grid3" style={{ gap: '10px' }}>
              <div className="f">
                <label>Date</label>
                <input type="date" value={insForm.record_date} onChange={(e) => setInsForm({ ...insForm, record_date: e.target.value })} />
              </div>
              <div className="f">
                <label>Timing / Meal Slot</label>
                <select value={insForm.slot} onChange={(e) => setInsForm({ ...insForm, slot: e.target.value })}>
                  {GLUCOSE_SLOTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="f">
                <label>Blood Glucose (mmol/L) *</label>
                <input
                  type="number"
                  step="0.1"
                  value={insForm.glucose}
                  onChange={(e) => setInsForm({ ...insForm, glucose: e.target.value })}
                  placeholder="e.g. 8.4"
                  style={{ fontWeight: '800', fontSize: '1.05rem', color: '#0369a1' }}
                />
              </div>
            </div>

            {insForm.glucose && (
              <div style={{
                margin: '10px 0', padding: '10px 14px', borderRadius: '8px',
                background: activeScale.status === 'hypo' ? '#fee2e2' : activeScale.status === 'target' ? '#dcfce7' : '#fef3c7',
                border: '1px solid ' + (activeScale.status === 'hypo' ? '#f87171' : activeScale.status === 'target' ? '#4ade80' : '#facc15'),
              }}>
                <b style={{ color: activeScale.status === 'hypo' ? '#991b1b' : activeScale.status === 'target' ? '#166534' : '#854d0e' }}>
                  {activeScale.advice}
                </b>
              </div>
            )}

            <div className="grid3" style={{ gap: '10px', marginTop: '6px' }}>
              <div className="f">
                <label>Insulin Product</label>
                <select value={insForm.insulin_type} onChange={(e) => setInsForm({ ...insForm, insulin_type: e.target.value })}>
                  {INSULIN_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="f">
                <label>Units Administered (IU)</label>
                <input
                  type="number"
                  value={insForm.units_given}
                  onChange={(e) => setInsForm({ ...insForm, units_given: e.target.value })}
                  placeholder={activeScale.units ? `${activeScale.units} (Recommended)` : '0'}
                />
              </div>
              <div className="f">
                <label>Injection Site (Rotation)</label>
                <select value={insForm.injection_site} onChange={(e) => setInsForm({ ...insForm, injection_site: e.target.value })}>
                  {INJECTION_SITES.map((site) => <option key={site} value={site}>{site}</option>)}
                </select>
              </div>
            </div>
            <div className="f" style={{ marginTop: '8px' }}>
              <label>Nurse Clinical Notes</label>
              <input value={insForm.notes} onChange={(e) => setInsForm({ ...insForm, notes: e.target.value })} placeholder="e.g. Given before breakfast, site rotated from LLQ to RUQ" />
            </div>
            <button className="pri wide" onClick={logInsulin} style={{ marginTop: '12px' }}>
              ✓ Save Glucose &amp; Insulin Log
            </button>
          </div>

          <h4 style={{ margin: '18px 0 8px', color: '#0f172a' }}>📋 Glucose &amp; Insulin Administration History</h4>
          {insulinLogs.length === 0 && <p className="muted">No glucose or insulin logs recorded yet.</p>}
          {insulinLogs.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1', textAlign: 'left' }}>
                    <th style={{ padding: '8px' }}>DATE / SLOT</th>
                    <th style={{ padding: '8px' }}>GLUCOSE</th>
                    <th style={{ padding: '8px' }}>INSULIN GIVEN</th>
                    <th style={{ padding: '8px' }}>SITE</th>
                    <th style={{ padding: '8px' }}>NURSE</th>
                    <th style={{ padding: '8px' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {insulinLogs.map((l) => (
                    <tr key={l.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '8px' }}><b>{l.record_date}</b><br /><small className="muted">{l.slot}</small></td>
                      <td style={{ padding: '8px' }}>
                        <b style={{ color: l.glucose < 4 ? '#ef4444' : l.glucose <= 10 ? '#10b981' : '#f59e0b', fontSize: '0.95rem' }}>
                          {l.glucose} mmol/L
                        </b>
                      </td>
                      <td style={{ padding: '8px' }}>
                        <b>{l.units_given ? `${l.units_given} IU` : '0 IU'}</b>
                        <small className="muted" style={{ display: 'block' }}>{l.insulin_type}</small>
                      </td>
                      <td style={{ padding: '8px' }}>{l.injection_site}</td>
                      <td style={{ padding: '8px' }}>
                        <span className="badge badge-green">{l.staff_initial || 'RN'}</span>
                      </td>
                      <td style={{ padding: '8px' }}>
                        <button className="link xs" style={{ color: '#ef4444' }} onClick={() => voidInsulin(l.id)}>
                          🗑️ delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ===================== DOSE ADMIN MODAL & TIME EDITOR ===================== */}
      {signModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px'
        }}>
          <div style={{
            background: '#fff', borderRadius: '16px', maxWidth: '460px', width: '100%',
            padding: '20px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)', border: '1px solid #cbd5e1'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.15rem' }}>
                  💊 {signModal.ex ? 'Edit Dose Administration' : 'Sign & Record Dose'}
                </h3>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  {signModal.med.name} ({signModal.med.dose} · {signModal.med.route})
                </span>
              </div>
              <button className="link" onClick={() => setSignModal(null)} style={{ fontSize: '1.2rem', padding: '0 6px' }}>✕</button>
            </div>

            <form onSubmit={handleSaveDose}>
              {/* Date and Time Pickers */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                    📅 Dose Date (日期)
                  </label>
                  <input
                    type="date"
                    value={signModal.given_date}
                    onChange={(e) => setSignModal({ ...signModal, given_date: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#0284c7', marginBottom: '4px' }}>
                    ⏱️ Administer Time (给药时间)
                  </label>
                  <input
                    type="time"
                    value={signModal.given_time}
                    onChange={(e) => setSignModal({ ...signModal, given_time: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '2px solid #0284c7', fontWeight: '700' }}
                    required
                  />
                </div>
              </div>

              {/* Status Selector */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
                  Dose Status / 给药状态
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '6px' }}>
                  {Object.entries(STATUS).map(([k, s]) => {
                    const active = signModal.status === k;
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setSignModal({ ...signModal, status: k })}
                        style={{
                          padding: '8px 6px', borderRadius: '8px', border: active ? '2px solid #0284c7' : '1px solid #cbd5e1',
                          background: active ? '#e0f2fe' : '#f8fafc', color: active ? '#0369a1' : '#334155',
                          fontWeight: active ? '800' : '600', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'center'
                        }}
                      >
                        {s.label} ({s.zh})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nurse Initials */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                    Initial (护士签名)
                  </label>
                  <input
                    value={signModal.staff_initial}
                    onChange={(e) => setSignModal({ ...signModal, staff_initial: e.target.value.toUpperCase().slice(0, 4) })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: '800' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                    Slot / 班次标签
                  </label>
                  <input
                    value={signModal.slot}
                    onChange={(e) => setSignModal({ ...signModal, slot: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              {/* Clinical Notes / Reason */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                  Clinical Note / Reason (若拒绝/省去请说明原因)
                </label>
                <input
                  value={signModal.reason}
                  onChange={(e) => setSignModal({ ...signModal, reason: e.target.value })}
                  placeholder={signModal.status !== 'given' && signModal.status !== 'self' ? 'Required: reason for non-administration' : 'Optional notes (e.g. given with meal)'}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" className="pri" style={{ flex: 1, padding: '10px' }}>
                  ✓ Save Dose Record / 保存
                </button>
                {signModal.ex && (
                  <button
                    type="button"
                    className="ghost"
                    onClick={() => voidDose(signModal.ex.id)}
                    style={{ color: '#ef4444', borderColor: '#fca5a5' }}
                  >
                    🗑️ Void
                  </button>
                )}
                <button type="button" className="ghost" onClick={() => setSignModal(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== PRESCRIPTION EDIT MODAL ===================== */}
      {editMed && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px'
        }}>
          <div style={{
            background: '#fff', borderRadius: '16px', maxWidth: '500px', width: '100%',
            padding: '20px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)', border: '1px solid #cbd5e1'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.15rem' }}>✏️ Edit Medication Prescription</h3>
              <button className="link" onClick={() => setEditMed(null)}>✕</button>
            </div>

            <div className="f" style={{ marginBottom: '10px' }}>
              <label>Medication Name &amp; Strength</label>
              <input value={editMed.name} onChange={(e) => setEditMed({ ...editMed, name: e.target.value })} />
            </div>

            <div className="grid3" style={{ gap: '10px', marginBottom: '10px' }}>
              <div className="f">
                <label>Dose</label>
                <input value={editMed.dose} onChange={(e) => setEditMed({ ...editMed, dose: e.target.value })} />
              </div>
              <div className="f">
                <label>Route</label>
                <input value={editMed.route} onChange={(e) => setEditMed({ ...editMed, route: e.target.value })} />
              </div>
              <div className="f">
                <label>Frequency</label>
                <input value={editMed.frequency} onChange={(e) => setEditMed({ ...editMed, frequency: e.target.value })} />
              </div>
            </div>

            <div className="f" style={{ marginBottom: '10px' }}>
              <label>Administration Schedule Times (给药时段/时间，用逗号隔开)</label>
              <input
                value={editMed.times || ''}
                onChange={(e) => setEditMed({ ...editMed, times: e.target.value })}
                placeholder="e.g. 08:00, 14:00, 20:00 or MORNING, NIGHT"
                style={{ fontWeight: '700', color: '#0284c7' }}
              />
            </div>

            <div className="f" style={{ marginBottom: '14px' }}>
              <label>Special Instructions / Notes</label>
              <textarea
                rows="2"
                value={editMed.notes || ''}
                onChange={(e) => setEditMed({ ...editMed, notes: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="pri" style={{ flex: 1 }} onClick={handleSaveEditMed}>
                ✓ Save Changes / 保存修改
              </button>
              <button className="ghost" onClick={() => setEditMed(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

function blank(kind) {
  return { name: '', dose: '', route: 'PO', frequency: 'OD', times: kind === 'regular' ? '08:00 (Morning)' : '',
           start_date: '', end_date: '', indication: '', max_dose: '', notes: '' };
}
function todayMY() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}
function currentTimeMY() {
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuala_Lumpur',
    hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
}
function formatTimeMY(ts) {
  if (!ts) return currentTimeMY();
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuala_Lumpur',
    hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(ts));
}
function addDays(d, n) { const t = new Date(d + 'T00:00:00Z'); t.setUTCDate(t.getUTCDate() + n);
  return t.toISOString().slice(0, 10); }
function mondayOf(d) { const t = new Date(d + 'T00:00:00Z');
  return addDays(d, -((t.getUTCDay() + 6) % 7)); }
function fmt(d) { return d.slice(8, 10) + '/' + d.slice(5, 7); }

import { useEffect, useState } from 'react';
import { api } from '../api.js';

// Comprehensive Clinical Presets for Dropdown Selection
export const PRESETS = {
  condition: [
    'Alert, oriented & resting comfortably in bed. No acute distress.',
    'Conscious, stable, pain-free. Tolerating oral fluids well.',
    'Frail & lethargic, requiring maximum assistance with ADLs.',
    'Restless, confused & disoriented to surroundings / time.',
    'Feverish, chills with diaphoresis (sweating). Paracetamol given.',
    'Post-procedure recovery. Vital signs stable, surgical site CDI.',
    'Shortness of breath on minimal exertion. Propped up on 2 pillows.',
  ],
  vitals_note: [
    'Stable vital signs within baseline parameters (MEWS 0).',
    'Elevated blood pressure noted — monitored and family informed.',
    'SpO₂ 95–98% on room air, respiratory effort normal.',
    'Febrile spike recorded — physical cooling & antipyretic given.',
    'Blood glucose within target post-meal range.',
  ],
  mood: [
    'Alert & Oriented x3 (Person, Place, Time), cooperative & cheerful',
    'Calm and pleasant, responsive to instructions and nursing care',
    'Quiet, pleasant, resting comfortably in bed',
    'Anxious and expressing concern about health / pain, reassured',
    'Drowsy but easily rousable by normal voice, oriented',
    'Agitated / restless, attempting to remove lines, calmed down',
    'Withdrawn, minimal verbal response, family at bedside',
  ],
  sleep: [
    'Slept soundly throughout the shift / night (6–8 hours uninterrupted)',
    'Slept well with 1–2 brief awakenings for urination/turning',
    'Restless sleep, required repositioning and verbal reassurance',
    'Difficulty falling asleep due to pain/discomfort, settled later',
    'Day-night sleep reversal noted (slept daytime, awake night)',
  ],
  procedures: [
    'Aseptic wound dressing redressed (Clean, dry & intact)',
    'Urinary catheter care done, peri-care given, drainage bag emptied',
    'Ryle’s / NG tube feeding administered via gravity, flushed 30ml water',
    'Full bed-bath, personal hygiene & complete linen change completed',
    'Vital signs and blood glucose monitoring performed as scheduled',
    'Subcutaneous insulin / IM injection administered as charted',
    'Oral / airway suctioning performed, secretions cleared',
    'Pressure-relieving mattress checked & Q2H positioning maintained',
  ],
  meds_given: [
    'All scheduled routine medications administered and signed on MAR',
    'Morning oral medications taken smoothly with water without difficulty',
    'Evening routine medications & insulin injected per sliding scale',
    'PRN Paracetamol 1g given for mild pain / headache (Relieved)',
    'Medication withheld per physician instruction / low BP / low HR',
    'Family / caregiver assisted and guided on medication administration',
  ],
  meds_due: [
    'Next routine dose scheduled for 2:00 PM (Afternoon shift)',
    'Evening routine medications scheduled for 8:00 PM + Night insulin',
    'PRN pain / fever medication available if needed',
    'No pending medications for the upcoming shift',
    'Family reminded to collect medication prescription refill from hospital/clinic',
  ],
  wound_note: [
    'Wound dressing clean, dry & intact (CDI). No active bleeding or strike-through.',
    'Surgical wound clean, sutures intact, no erythema, warmth or discharge.',
    'Sacral pressure sore dressed with hydrocolloid/foam, healthy granulation bed.',
    'Moderate serous exudate noted on dressing, redressed under sterile technique.',
    'Skin intact, dry and clean. Barrier cream applied over pressure points.',
    'Erythema noted over heels/sacrum, pressure offloading cushions placed.',
  ],
  mobility: [
    '2-Hourly turning schedule strictly maintained (Left-lat / Supine / Right-lat)',
    'Assisted out of bed to wheelchair for 1 hour with good tolerance',
    'Ambulates independently / with walking frame with light standby assist',
    'Total bed-bound, passive range of motion (ROM) exercises performed',
    'High fall risk precautions maintained: Bed in lowest position, side rails up x2',
  ],
  meals: [
    'Tolerated full regular / soft diet well (100% finished, good appetite)',
    'Moderate appetite, consumed 50–75% of served meal',
    'Poor oral intake (<25%), encouraged small frequent sips of fluid',
    'Ryle’s tube enteral feeding: 250ml formula via gravity without reflux/vomiting',
    'Thickened liquids provided, no choking or aspiration symptoms',
    'NPO / Fasting per doctor instruction',
  ],
  intake: [
    'Adequate oral fluid intake ~1200 – 1500 ml',
    'Fluid intake ~800 – 1000 ml',
    'Fluid restriction strictly maintained (<800 ml/day)',
    'Enteral water flush: 300 ml total given after tube feeds',
    'IV Infusion running smoothly at prescribed rate (Normal Saline 80ml/hr)',
  ],
  output: [
    'Passed urine freely, clear light amber ~1000 – 1500 ml',
    'Foley catheter draining clear yellow urine ~800 – 1200 ml (Patent)',
    'Catheter draining concentrated dark amber urine ~500 ml (Encourage fluids)',
    'Incontinent in diapers (x3 wet diapers changed, skin clean & dry)',
    'Urine drainage bag emptied and output recorded',
  ],
  bowel: [
    'Bowels opened once, normal formed soft stool (Bristol Type 4)',
    'Bowels opened twice, loose stool (Monitored, barrier cream applied)',
    'No bowel motion today (Abdomen soft, non-distended, flatus positive)',
    'Constipated — no bowel motion > 3 days (Doctor/family informed for laxative)',
    'Colostomy stoma active, emptied 300ml fecal matter, stoma pink & healthy',
  ],
  concerns: [
    'No acute clinical concerns this shift. Patient stable and comfortable.',
    'Borderline elevated BP noted — please recheck during next shift.',
    'Mild shortness of breath on exertion — keep head of bed elevated 30–45°.',
    'Reduced oral fluid intake — encourage family to offer warm fluids frequently.',
    'New redness noted over sacral area — strictly enforce Q2H turning schedule.',
    'Patient felt mild dizziness upon standing — assist strictly with all transfers.',
  ],
  todo: [
    'Continue routine vital signs and 2-hourly turning schedule.',
    'Check and record fasting blood glucose before breakfast.',
    'Assist patient with morning bed-bath and routine wound redressing.',
    'Attending doctor scheduled to call / visit family today.',
    'Empty and record urinary drainage bag at end of shift.',
    'Monitor temperature Q4H if fever recurs.',
  ],
  family_note: [
    'Family updated on patient’s stable condition, vital signs and care plan.',
    'Educated family on proper NG tube feeding posture (head elevated 45°).',
    'Family reminded on daily fluid goals and regular turning schedule.',
    'Daughter / family member accompanied visit, satisfied with care provided.',
    'Family requested doctor review regarding prescription refill.',
  ],
};

const GROUPS = [
  ['How the patient is', [
    ['condition', 'Condition this shift', 'Alert, comfortable. No new complaints.'],
    ['vitals_note', 'Vitals (Autofilled from MEWS)', 'BP 128/76 · HR 82 · T 36.8 · SpO₂ 97%'],
    ['ews', 'MEWS Total Score', '0'],
    ['mood', 'Mood / orientation', 'Oriented, cheerful'],
    ['sleep', 'Sleep & rest', 'Slept well, woke twice'],
  ]],
  ['Care given', [
    ['procedures', 'Procedures done', 'Wound dressing changed, catheter care'],
    ['meds_given', 'Medication given', 'Morning meds given as charted'],
    ['meds_due', 'Medication due next', '2pm Metformin, 6pm insulin'],
    ['wound_note', 'Wound & skin', 'Sacral wound — clean, no odour, redressed'],
    ['mobility', 'Mobility / positioning', '2-hourly turning done, sat out 30 min'],
  ]],
  ['Intake & output', [
    ['meals', 'Meals / appetite', 'Ate ¾ of lunch'],
    ['intake', 'Fluid intake', '900 ml'],
    ['output', 'Urine output', '750 ml, clear'],
    ['bowel', 'Bowel motion', 'BO once, soft'],
  ]],
  ['To pass on', [
    ['concerns', '⚠ Clinical Concerns', 'Slight ankle swelling — monitor'],
    ['todo', '➡ Next shift must do', 'Recheck BP at 4pm. Doctor calling this evening.'],
    ['family_note', 'Told the family', 'Daughter updated on wound progress'],
  ]],
];

const SHIFTS = ['AM', 'PM', 'NIGHT'];

function extractLatestMews(mewsData) {
  if (!mewsData) return null;
  if (Array.isArray(mewsData.cols)) {
    for (let i = mewsData.cols.length - 1; i >= 0; i--) {
      const col = mewsData.cols[i];
      const r = col.readings || {};
      if (r.sbp || r.hr || r.temp || r.spo2 || r.sugar || r.rr || r.pain !== undefined || r.avpu) {
        const parts = [];
        if (r.sbp && r.dbp) parts.push(`BP ${r.sbp}/${r.dbp} mmHg`);
        else if (r.sbp) parts.push(`SBP ${r.sbp} mmHg`);
        if (r.hr) parts.push(`HR ${r.hr} bpm`);
        if (r.temp) parts.push(`T ${r.temp}°C`);
        if (r.spo2) parts.push(`SpO₂ ${r.spo2}%${r.o2_device && r.o2_device !== 'RA' ? ` (${r.o2_device})` : ' (RA)'}`);
        if (r.rr) parts.push(`RR ${r.rr}/min`);
        if (r.sugar) parts.push(`Sugar ${r.sugar} mmol/L`);
        if (r.pain !== undefined && r.pain !== '') parts.push(`Pain ${r.pain}/10`);
        if (r.avpu) parts.push(`AVPU: ${r.avpu}`);

        return {
          date: col.date,
          time: col.time,
          vitalsStr: parts.join(' · '),
          ews: r.ews !== undefined && r.ews !== null ? String(r.ews) : '0',
          readings: r,
        };
      }
    }
  }
  if (Array.isArray(mewsData.entries) && mewsData.entries.length) {
    const e = mewsData.entries[mewsData.entries.length - 1];
    const parts = [];
    if (e.sbp) parts.push(`BP ${e.sbp}/${e.dbp || ''} mmHg`);
    if (e.hr) parts.push(`HR ${e.hr} bpm`);
    if (e.temp) parts.push(`T ${e.temp}°C`);
    if (e.spo2) parts.push(`SpO₂ ${e.spo2}%`);
    if (e.bsl || e.sugar) parts.push(`Sugar ${e.bsl || e.sugar} mmol/L`);
    return {
      date: 'Recent',
      time: '',
      vitalsStr: parts.join(' · '),
      ews: String(e.score ?? 0),
      readings: e,
    };
  }
  return null;
}

export default function Handover({ caseObj, me, onBack }) {
  const caseId = typeof caseObj === 'string' ? caseObj : caseObj.id;
  const [list, setList] = useState(null);
  const [roster, setRoster] = useState([]);
  const [today, setToday] = useState(todayMY());
  const [form, setForm] = useState({ shift: guessShift(), shift_date: todayMY() });
  const [open, setOpen] = useState(true);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [mewsSyncInfo, setMewsSyncInfo] = useState(null);

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3000); };

  const load = async () => {
    try {
      const [hRes, mewsRes] = await Promise.all([
        api.getHandovers(caseId).catch(() => ({ handovers: [], roster: [] })),
        api.getMews(caseId).catch(() => ({})),
      ]);
      setList(hRes.handovers || []);
      setRoster(hRes.roster || []);
      if (hRes.today) setToday(hRes.today);

      const latestMews = extractLatestMews(mewsRes.data);
      if (latestMews) {
        setMewsSyncInfo(latestMews);
        setForm((prev) => ({
          ...prev,
          vitals_note: prev.vitals_note || latestMews.vitalsStr,
          ews: prev.ews !== undefined && prev.ews !== '' ? prev.ews : latestMews.ews,
        }));
      }
    } catch (e) {
      flash(e.message);
    }
  };

  useEffect(() => { load(); }, [caseId]);

  const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  // Helper when user selects a preset from a dropdown
  const applyPreset = (key, text) => {
    if (!text) return;
    setForm((prev) => {
      const current = (prev[key] || '').trim();
      const updated = current ? `${current}\n• ${text}` : text;
      return { ...prev, [key]: updated };
    });
    flash('✓ Added clinical observation');
  };

  // 1-Tap Sync from MEWS Chart
  const syncMewsNow = async () => {
    try {
      const mewsRes = await api.getMews(caseId);
      const latestMews = extractLatestMews(mewsRes.data);
      if (latestMews) {
        setMewsSyncInfo(latestMews);
        setForm((prev) => ({
          ...prev,
          vitals_note: latestMews.vitalsStr,
          ews: latestMews.ews,
        }));
        flash(`✓ Synced from MEWS chart (${latestMews.date} ${latestMews.time})`);
      } else {
        flash('No vitals records found in MEWS chart yet');
      }
    } catch (e) {
      flash('Could not sync MEWS: ' + e.message);
    }
  };

  // 1-Tap fill standard stable presets
  const applyAllStable = () => {
    setForm((prev) => ({
      ...prev,
      condition: PRESETS.condition[0],
      mood: PRESETS.mood[0],
      sleep: PRESETS.sleep[0],
      procedures: PRESETS.procedures[0],
      meds_given: PRESETS.meds_given[0],
      meds_due: PRESETS.meds_due[0],
      wound_note: PRESETS.wound_note[0],
      mobility: PRESETS.mobility[0],
      meals: PRESETS.meals[0],
      intake: PRESETS.intake[0],
      output: PRESETS.output[0],
      bowel: PRESETS.bowel[0],
      concerns: PRESETS.concerns[0],
      todo: PRESETS.todo[0],
      family_note: PRESETS.family_note[0],
      ...(mewsSyncInfo ? { vitals_note: mewsSyncInfo.vitalsStr, ews: mewsSyncInfo.ews } : {}),
    }));
    flash('✓ Applied standard stable shift template');
  };

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
    <div>
      <div className="case-subbar">
        <button className="case-back-btn" onClick={onBack}>
          <span>←</span> <b>Back to Cases</b>
        </button>
        <div className="case-subbar-info">
          <span className="case-patient-name">{caseObj && caseObj.name ? caseObj.name : 'Patient'}</span>
          <span className="case-view-tag">📋 Shift Handover</span>
        </div>
      </div>

      <div className="card">
        <h2 style={{ margin: '0 0 6px' }}>Shift Handover {caseObj && caseObj.name ? '— ' + caseObj.name : ''}</h2>
        <p className="muted" style={{ margin: '0 0 12px', fontSize: '0.84rem' }}>
          Fill this at the end of your shift. Vitals auto-sync from MEWS chart, and quick dropdowns help you document observations in seconds.
        </p>
        {status && <p className="status">{status}</p>}

      {(() => {
        const order = ['AM', 'PM', 'NIGHT'];
        const here = roster.filter((r) => r.status !== 'off');
        const i = order.indexOf(form.shift);
        const next = i >= 0 && i < 2 ? here[i + 1] : here[3];
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

      <button className="ghost wide" onClick={() => setOpen(!open)} style={{ margin: '12px 0' }}>
        {open ? '▾ Hide the form' : '＋ Write this shift’s handover'}
      </button>

      {open && (
        <div className="hoform" style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8ef' }}>
          {/* Quick Actions Header */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px', alignItems: 'center' }}>
            <button type="button" className="pri sm" onClick={syncMewsNow} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              ⚡ Sync MEWS Chart Vitals
            </button>
            <button type="button" className="ghost sm" onClick={applyAllStable} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              ✨ Fill All with Stable Presets
            </button>
            {mewsSyncInfo && (
              <span style={{ fontSize: '0.76rem', color: 'var(--blue-dark)', background: '#e0effe', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                ✓ Synced MEWS: {mewsSyncInfo.date} {mewsSyncInfo.time} (EWS {mewsSyncInfo.ews})
              </span>
            )}
          </div>

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
            <div key={g} style={{ marginTop: '14px' }}>
              <h3 className="qh" style={{ margin: '8px 0 6px', color: 'var(--navy)' }}>{g}</h3>
              {fields.map(([k, label, ph]) => {
                const presets = PRESETS[k] || [];
                return (
                  <div className="f" key={k} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <label style={{ margin: 0, fontWeight: 700 }}>{label}</label>
                      {presets.length > 0 && (
                        <select
                          value=""
                          onChange={(e) => applyPreset(k, e.target.value)}
                          style={{
                            fontSize: '0.78rem',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            border: '1px solid #cbd5e1',
                            background: '#fff',
                            color: 'var(--navy)',
                            maxWidth: '220px',
                          }}
                        >
                          <option value="">➕ Choose Quick Preset...</option>
                          {presets.map((p, idx) => (
                            <option key={idx} value={p}>{p.slice(0, 45)}...</option>
                          ))}
                        </select>
                      )}
                    </div>

                    {k === 'ews' ? (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          inputMode="numeric"
                          value={form[k] || ''}
                          placeholder={ph}
                          style={{ width: '80px', fontWeight: 800, textAlign: 'center', fontSize: '1rem' }}
                          onChange={(e) => set(k, e.target.value)}
                        />
                        <span style={{ fontSize: '0.76rem', color: Number(form[k]) >= 4 ? '#b42318' : 'var(--muted)' }}>
                          {Number(form[k]) >= 4 ? '🚨 High Risk — Notify Doctor' : '0–3 Low/Normal'}
                        </span>
                      </div>
                    ) : (
                      <textarea
                        rows="2"
                        value={form[k] || ''}
                        placeholder={ph}
                        onChange={(e) => set(k, e.target.value)}
                        style={{ width: '100%', fontFamily: 'inherit', fontSize: '0.86rem', lineHeight: '1.4' }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          <button className="pri wide" onClick={file} disabled={busy} style={{ marginTop: '12px', padding: '12px' }}>
            {busy ? 'Filing…' : '✓ File Handover Report'}
          </button>
        </div>
      )}

      <h3 className="qh" style={{ marginTop: '20px' }}>Previous shifts</h3>
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

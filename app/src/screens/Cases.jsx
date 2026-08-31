import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { waOpen, msg } from '../wa.js';
import { CareBadge, WebBadge } from './Intake.jsx';
import PatientSummaryCard from '../components/PatientSummaryCard.jsx';

const FILTERS = [
  ['active', 'Active & Assigned'], ['intake', 'Intake'],
  ['broadcasts', '📢 Job Broadcasts'],
  ['closed', 'Closed'], ['declined', 'Declined'], ['', 'All'],
];
const STATUS_LABEL = {
  intake: 'Intake', accepted: 'Accepted', assigned: 'Assigned (In Care)',
  active: 'Active (In Care)', closed: 'Closed', declined: 'Declined',
};

export default function Cases({ onOpenMews, onOpenQuote, onOpenHand, onOpenChat, onOpenMeds, onOpenInvoice, onOpenWound, onOpenSummary, onOpenDocs }) {
  const [filter, setFilter] = useState('active');
  const [cases, setCases] = useState(null);
  const [broadcasts, setBroadcasts] = useState([]);
  const [open, setOpen] = useState(null);
  const [bcModalCase, setBcModalCase] = useState(null);
  const [bcForm, setBcForm] = useState({
    title: '', area: '', care_type: '', schedule: '',
    client_payment: '', commission_pct: 20, custom_nurse_wage: '', notes: '',
  });
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3000); };

  async function load() {
    if (filter === 'broadcasts') {
      try {
        const res = await api.getBroadcasts();
        setBroadcasts(res.broadcasts || []);
      } catch (e) { flash(e.message); }
    } else {
      try {
        const res = await api.getCases(filter ? 'status=' + filter : '');
        setCases(res.cases || []);
      } catch (e) { flash(e.message); }
    }
  }

  useEffect(() => { load(); }, [filter]);

  async function act(c, body, note) {
    await api.caseAction(c.id, body);
    if (note) waOpen(c.phone, note);
    await load();
  }

  function openBroadcastModal(c) {
    const defaultTitle = `${c.care_type === 'procedure' ? 'Procedure' : 'Home Nursing'} · ${c.name}`;
    const defaultArea = (c.address || '').split(',').slice(-2).join(', ').trim() || 'Penang';
    setBcModalCase(c);
    setBcForm({
      title: defaultTitle,
      area: defaultArea,
      care_type: c.care_type === 'procedure' ? 'Clinical Procedure / Dressing' : '12hr/24hr Home Nursing',
      schedule: 'Daily Morning / Scheduled Shift',
      client_payment: '150',
      commission_pct: 20,
      custom_nurse_wage: '',
      notes: c.notes || 'Experienced RN / Jururawat required. Follow SOP.',
    });
  }

  async function submitBroadcast() {
    if (!bcModalCase) return;
    setBusy(true);
    try {
      const clientPay = Number(bcForm.client_payment) || 0;
      const commPct = Number(bcForm.commission_pct) || 20;
      const nurseWage = bcForm.custom_nurse_wage
        ? Number(bcForm.custom_nurse_wage)
        : Math.round(clientPay * (1 - commPct / 100) * 100) / 100;

      await api.createBroadcast({
        case_id: bcModalCase.id,
        title: bcForm.title,
        area: bcForm.area,
        care_type: bcForm.care_type,
        schedule: bcForm.schedule,
        client_payment: clientPay,
        commission_pct: commPct,
        custom_nurse_wage: nurseWage,
        notes: bcForm.notes,
      });

      flash(`✓ Broadcasted to all active nurses! Nurse payout offer: RM ${nurseWage.toFixed(2)}`);
      setBcModalCase(null);
      setFilter('broadcasts');
    } catch (e) {
      flash(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function assignApplicant(broadcastId, staffId, staffName) {
    if (!confirm(`Assign this case to ${staffName}? They will receive official confirmation.`)) return;
    setBusy(true);
    try {
      await api.decideBroadcast(broadcastId, staffId);
      flash(`✓ Confirmed! Case assigned to ${staffName}.`);
      await load();
    } catch (e) {
      flash(e.message);
    } finally {
      setBusy(false);
    }
  }

  function copyWaBroadcastText(b) {
    const text = `📢 *[Assura Nursing Care] New Case Available*\n`
      + `📍 *Location:* ${b.area || 'Penang'}\n`
      + `🩺 *Care Type:* ${b.care_type || 'Nursing Care'}\n`
      + `⏰ *Schedule:* ${b.schedule || 'Standard visit'}\n`
      + `💵 *Nurse Payout / 护士实收:* RM ${Number(b.nurse_wage || 0).toFixed(2)}\n`
      + (b.notes ? `📋 *Notes:* ${b.notes}\n` : '')
      + `\n👉 *Interested nurses please apply in Staff App / 意向接单请点击:* https://staff.assuranursing.com/#/my-cases?tab=available`;
    navigator.clipboard.writeText(text);
    alert('✓ Copied WhatsApp group broadcast message to clipboard!');
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <h2 style={{ margin: 0 }}>Case Management</h2>
      </div>

      <div className="tabs" style={{ marginTop: '10px' }}>
        {FILTERS.map(([k, l]) => (
          <button key={k || 'all'} className={'tab' + (filter === k ? ' on' : '')} onClick={() => setFilter(k)}>
            {l}
          </button>
        ))}
      </div>

      {status && <p className="status">{status}</p>}

      {/* BROADCAST MODAL */}
      {bcModalCase && (
        <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#fff', borderRadius: '14px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
            <h3 style={{ margin: '0 0 4px', color: 'var(--navy)' }}>📢 Broadcast Case to Team</h3>
            <p className="muted" style={{ fontSize: '0.8rem', margin: '0 0 14px' }}>
              Publish job notification to all active nurses. System automatically applies your <b>20% company commission shield</b>.
            </p>

            <div className="f"><label>Job Title / Summary</label>
              <input value={bcForm.title} onChange={(e) => setBcForm({ ...bcForm, title: e.target.value })} /></div>

            <div className="grid2">
              <div className="f"><label>Area / Location</label>
                <input value={bcForm.area} placeholder="e.g. Bayan Lepas / Georgetown" onChange={(e) => setBcForm({ ...bcForm, area: e.target.value })} /></div>
              <div className="f"><label>Care / Procedure</label>
                <input value={bcForm.care_type} placeholder="e.g. Wound Dressing" onChange={(e) => setBcForm({ ...bcForm, care_type: e.target.value })} /></div>
            </div>

            <div className="f"><label>Schedule &amp; Timing</label>
              <input value={bcForm.schedule} placeholder="e.g. Daily 10:00 AM / 12hr Day Shift" onChange={(e) => setBcForm({ ...bcForm, schedule: e.target.value })} /></div>

            {/* COMMISSION CALCULATION BOX */}
            <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '10px', padding: '12px', marginBottom: '14px' }}>
              <div style={{ fontWeight: 800, color: '#166534', fontSize: '0.86rem', marginBottom: '8px' }}>
                💰 Commission &amp; Nurse Payout Split (20% Shield)
              </div>
              <div className="grid3">
                <div className="f" style={{ margin: 0 }}>
                  <label style={{ fontSize: '0.72rem', color: '#14532d' }}>Client Total (RM)</label>
                  <input
                    type="number"
                    value={bcForm.client_payment}
                    onChange={(e) => setBcForm({ ...bcForm, client_payment: e.target.value })}
                    style={{ fontWeight: 700 }}
                  />
                </div>
                <div className="f" style={{ margin: 0 }}>
                  <label style={{ fontSize: '0.72rem', color: '#14532d' }}>Commission (%)</label>
                  <input
                    type="number"
                    value={bcForm.commission_pct}
                    onChange={(e) => setBcForm({ ...bcForm, commission_pct: e.target.value })}
                  />
                </div>
                <div className="f" style={{ margin: 0 }}>
                  <label style={{ fontSize: '0.72rem', color: '#14532d' }}>Nurse Sees (RM)</label>
                  <input
                    type="number"
                    placeholder="Auto 80%"
                    value={
                      bcForm.custom_nurse_wage ||
                      (bcForm.client_payment
                        ? (Number(bcForm.client_payment) * (1 - (Number(bcForm.commission_pct) || 20) / 100)).toFixed(2)
                        : '')
                    }
                    onChange={(e) => setBcForm({ ...bcForm, custom_nurse_wage: e.target.value })}
                    style={{ fontWeight: 800, color: '#15803d', background: '#dcfce7' }}
                  />
                </div>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#166534', marginTop: '6px' }}>
                💡 <b>Privacy Guarantee:</b> Nurses only see <b>RM {bcForm.custom_nurse_wage || (Number(bcForm.client_payment || 0) * 0.8).toFixed(2)}</b>. The client rate and commission are completely hidden.
              </div>
            </div>

            <div className="f"><label>Job Requirements / Clinical Notes</label>
              <textarea rows="2" value={bcForm.notes} onChange={(e) => setBcForm({ ...bcForm, notes: e.target.value })} /></div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '14px' }}>
              <button className="ghost" onClick={() => setBcModalCase(null)}>Cancel</button>
              <button className="pri" onClick={submitBroadcast} disabled={busy}>
                📢 Send Broadcast to All Nurses
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: JOB BROADCASTS & APPLICANTS */}
      {filter === 'broadcasts' ? (
        <div>
          <p className="hint">
            Active job recruitment broadcasts. Review applicant nurses below and click <b>Confirm Assignment</b> to lock in the nurse for the case.
          </p>
          {broadcasts.length === 0 ? (
            <p className="empty">No broadcasts posted yet. Open any case below and tap "📢 Broadcast to Team".</p>
          ) : (
            broadcasts.map((b) => (
              <div key={b.id} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '14px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <b style={{ fontSize: '1.05rem', color: 'var(--navy)' }}>{b.title}</b>
                      <span className={'sbadge s-' + (b.status === 'open' ? 'active' : 'assigned')}>{b.status}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '2px' }}>
                      📍 {b.area} · 🩺 {b.care_type} · ⏰ {b.schedule}
                    </div>
                  </div>

                  {/* Financial Breakdown (Admin View) */}
                  <div style={{ display: 'flex', gap: '8px', textAlign: 'right' }}>
                    <div style={{ background: '#f8fafc', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '0.75rem' }}>
                      <span style={{ color: 'var(--muted)', display: 'block' }}>Client Gross</span>
                      <b>RM {Number(b.client_payment || 0).toFixed(2)}</b>
                    </div>
                    <div style={{ background: '#fef3c7', padding: '4px 8px', borderRadius: '6px', border: '1px solid #fde68a', fontSize: '0.75rem' }}>
                      <span style={{ color: '#92400e', display: 'block' }}>Commission ({b.commission_pct}%)</span>
                      <b style={{ color: '#b45309' }}>RM {(Number(b.client_payment || 0) * (Number(b.commission_pct || 20) / 100)).toFixed(2)}</b>
                    </div>
                    <div style={{ background: '#f0fdf4', padding: '4px 8px', borderRadius: '6px', border: '1px solid #bbf7d0', fontSize: '0.75rem' }}>
                      <span style={{ color: '#166534', display: 'block' }}>Nurse Wage (80%)</span>
                      <b style={{ color: '#15803d' }}>RM {Number(b.nurse_wage || 0).toFixed(2)}</b>
                    </div>
                  </div>
                </div>

                {b.notes && (
                  <div style={{ background: '#f8fafc', padding: '6px 10px', borderRadius: '6px', fontSize: '0.8rem', marginTop: '8px' }}>
                    📋 {b.notes}
                  </div>
                )}

                {/* APPLICANT NURSES LIST */}
                <div style={{ marginTop: '12px', borderTop: '1px dashed var(--line)', paddingTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <b style={{ fontSize: '0.86rem', color: 'var(--navy)' }}>
                      👥 Nurse Applicants / 申请接单护士 ({b.applications ? b.applications.length : 0})
                    </b>
                    <button className="ghost xs" onClick={() => copyWaBroadcastText(b)} style={{ margin: 0 }}>
                      📋 Copy WhatsApp Broadcast Text
                    </button>
                  </div>

                  {(!b.applications || b.applications.length === 0) ? (
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic', padding: '6px 0' }}>
                      ⏳ Waiting for nurses to apply from staff app…
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {b.applications.map((app) => (
                        <div
                          key={app.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: app.status === 'selected' ? '#f0fdf4' : '#f8fafc',
                            border: app.status === 'selected' ? '1.5px solid #22c55e' : '1px solid var(--line)',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            flexWrap: 'wrap',
                            gap: '8px',
                          }}
                        >
                          <div>
                            <b>{app.staff_name}</b> <span style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>({app.staff_role || 'Nurse'} · {app.reg_no || 'LJM Reg'})</span>
                            {app.note && <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '2px' }}>💬 "{app.note}"</div>}
                            <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '2px' }}>
                              Applied at {new Date(app.applied_at).toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}
                            </div>
                          </div>

                          <div>
                            {app.status === 'selected' ? (
                              <span style={{ color: '#16a34a', fontWeight: 800, fontSize: '0.82rem' }}>
                                ✓ Assigned &amp; Confirmed
                              </span>
                            ) : b.status === 'open' ? (
                              <button
                                className="pri sm"
                                onClick={() => assignApplicant(b.id, app.staff_id, app.staff_name)}
                                disabled={busy}
                              >
                                ✓ Confirm &amp; Assign
                              </button>
                            ) : (
                              <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>Closed</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* STANDARD CASES LIST */
        cases === null ? <p className="muted">Loading…</p>
          : cases.length === 0 ? <p className="empty">Nothing here.</p>
          : cases.map((c) => (
            <div className="rec" key={c.id}>
              <div className="rec-head" onClick={() => setOpen(open === c.id ? null : c.id)}>
                <div><b>{c.name}</b> <CareBadge t={c.care_type} /> <WebBadge s={c.source} />
                  <div className="meta">
                    <span className={'sbadge s-' + c.status}>{STATUS_LABEL[c.status] || c.status}</span>
                    {c.assigned_name ? ' · Assigned: ' + c.assigned_name : ' · ⚠️ Unassigned'}
                    {c.phone ? ' · ' + c.phone : ''}
                  </div></div>
                <span className="chev">{open === c.id ? '▾' : '▸'}</span>
              </div>

              {open === c.id && (
                <div className="detail">
                  {/* PATIENT BRIEF & SUMMARY CARD (1ST PAGE VIEW) */}
                  <PatientSummaryCard patient={c} caseId={c.id} onUpdated={load} />

                  {c.address && (
                    <div className="row-line" style={{ alignItems: 'flex-start' }}>
                      <span>Address</span>
                      <div>
                        {c.address}
                        <div style={{ marginTop: '6px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          <a
                            href={'https://waze.com/ul?q=' + encodeURIComponent(c.address)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ghost small"
                            style={{ textDecoration: 'none', background: '#eaf6ff', color: '#0d3a54', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            🚗 Waze GPS
                          </a>
                          <a
                            href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(c.address)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ghost small"
                            style={{ textDecoration: 'none', background: '#e8f3ec', color: '#1d6b3f', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            🗺️ Google Maps
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  {c.age && <p className="row-line"><span>Age</span>{c.age}</p>}
                  <p className="row-line"><span>Billing</span>
                    <select value={c.billing_mode}
                      onChange={(e) => act(c, { action: 'billing', billing_mode: e.target.value })}>
                      <option value="per_visit">Per visit (procedures)</option>
                      <option value="weekly">Weekly (long-term)</option>
                    </select></p>

                  <div className="wa-row">
                    <button className="wa" onClick={() => waOpen(c.phone, msg.confirm(c.name))}>WhatsApp: confirm</button>
                    <button className="wa" onClick={() => waOpen(c.phone, msg.followup(c.name))}>follow-up</button>
                  </div>

                  <div className="acts">
                    <button className="pri" onClick={() => openBroadcastModal(c)} style={{ fontWeight: 800 }}>
                      📢 Broadcast Case to Team (-20%)
                    </button>
                    <button onClick={() => onOpenMews(c)}>📈 MEWS chart</button>
                    {onOpenDocs && <button onClick={() => onOpenDocs(c)}>📁 Clinical Docs &amp; Forms</button>}
                    {onOpenWound && <button onClick={() => onOpenWound(c)}>🩹 Wound care</button>}
                    {onOpenSummary && <button onClick={() => onOpenSummary(c)}>📄 Doctor Summary</button>}
                    {onOpenQuote && <button onClick={() => onOpenQuote(c)}>💬 Quote</button>}
                    {onOpenHand && <button onClick={() => onOpenHand(c)}>📋 Handover</button>}
                    {onOpenMeds && <button onClick={() => onOpenMeds(c)}>💊 Medication</button>}
                    {onOpenInvoice && <button onClick={() => onOpenInvoice(c)}>💵 Invoice</button>}
                    {onOpenChat && <button onClick={() => onOpenChat(c)}>💭 Chat</button>}
                    <button onClick={() => askFeedback(c)}>⭐ Ask for feedback</button>
                  </div>
                </div>
              )}
            </div>
          ))
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { waOpen, msg } from '../wa.js';
import { CareBadge } from './Intake.jsx';
import PatientSummaryCard from '../components/PatientSummaryCard.jsx';
import ConsumablesClockOutModal from '../components/ConsumablesClockOutModal.jsx';

export default function MyCases({ me, onOpenMews, onOpenHand, onOpenQuote, onOpenChat, onOpenMeds, onOpenWound, onOpenSummary, onOpenDocs }) {
  const [tab, setTab] = useState('mine');
  const [cases, setCases] = useState(null);
  const [broadcasts, setBroadcasts] = useState(null);
  const [activeVisit, setActiveVisit] = useState(null);
  const [clockOutModalVisit, setClockOutModalVisit] = useState(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [applyingId, setApplyingId] = useState(null);
  const [appNote, setAppNote] = useState('');

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3000); };

  async function load() {
    try {
      const [casesRes, visitRes, bcRes] = await Promise.all([
        api.getCases('mine=1'),
        api.getActiveVisit().catch(() => ({ visit: null })),
        api.getBroadcasts().catch(() => ({ broadcasts: [] })),
      ]);
      setCases(casesRes.cases || []);
      setActiveVisit(visitRes.visit || null);
      setBroadcasts(bcRes.broadcasts || []);
    } catch {}
  }

  useEffect(() => {
    load();
  }, []);

  async function handleClockIn(c) {
    setBusy(true);
    try {
      let lat = null;
      let lng = null;
      if (navigator.geolocation) {
        try {
          const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 4000 });
          });
          lat = pos.coords.latitude;
          lng = pos.coords.longitude;
        } catch {}
      }
      await api.clockIn(c.id, lat, lng);
      await load();
      flash('✓ Clocked in! House visit is now active.');

      if (c.phone) {
        const time = new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' });
        const waText = `👋 *[Assura Nursing Care] Nurse Arrival Notification*\n\n`
          + `Hello! Nurse *${me.name}* has arrived safely at your residence for *${c.name}* at *${time}*.\n`
          + `We are now starting today's clinical home care routine. 🙏`;
        if (confirm('Send arrival notification WhatsApp to family?')) {
          waOpen(c.phone, waText);
        }
      }
    } catch (e) {
      flash(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleClockOutWithConsumables(itemsUsed = []) {
    if (!clockOutModalVisit) return;
    const visitId = clockOutModalVisit.id;
    const caseObj = cases?.find((x) => x.id === clockOutModalVisit.case_id) || {};
    const summary = prompt('Enter nursing care summary / procedures performed:') ?? '';
    setBusy(true);
    try {
      const res = await api.clockOut(visitId, summary);
      setClockOutModalVisit(null);
      await load();
      flash(`✓ Clocked out! Visit duration: ${res.duration_minutes} minutes.`);

      if (caseObj.phone) {
        const waText = `✅ *[Assura Nursing Care] Visit Completed*\n\n`
          + `👤 *Patient:* ${caseObj.name}\n`
          + `👩‍⚕️ *Attending Nurse:* ${me.name}\n`
          + `⏱️ *Duration:* ${res.duration_minutes} minutes\n`
          + `📋 *Summary:* ${summary || 'Routine clinical care completed.'}\n\n`
          + `Patient is resting comfortably. Thank you! 🙏`;
        if (confirm('Send visit completion summary WhatsApp to family?')) {
          waOpen(caseObj.phone, waText);
        }
      }
    } catch (e) {
      flash(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function submitApplication(broadcastId) {
    setBusy(true);
    try {
      await api.applyBroadcast(broadcastId, appNote);
      flash('✓ Application submitted! Admin will confirm assignment.');
      setApplyingId(null);
      setAppNote('');
      await load();
    } catch (e) {
      flash(e.message);
    } finally {
      setBusy(false);
    }
  }

  const openBroadcastCount = (broadcasts || []).filter((b) => b.status === 'open' && !b.my_application).length;

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <h2 style={{ margin: 0 }}>My Cases &amp; Jobs</h2>
        <div className="tabs" style={{ margin: 0 }}>
          <button className={'tab' + (tab === 'mine' ? ' on' : '')} onClick={() => setTab('mine')}>
            My Assigned Cases ({cases ? cases.length : '…'})
          </button>
          <button className={'tab' + (tab === 'available' ? ' on' : '')} onClick={() => setTab('available')}>
            📢 Available Jobs ({openBroadcastCount > 0 ? `🔥 ${openBroadcastCount}` : (broadcasts ? broadcasts.length : '…')})
          </button>
        </div>
      </div>

      <p className="muted" style={{ marginTop: '8px' }}>
        {tab === 'mine'
          ? `Active care cases assigned to ${me.name}. Tap Clock In upon arrival at patient's residence.`
          : 'Open home nursing cases available for pickup. Tap "Apply / 我要接单" to express interest. Final assignment is confirmed by manager.'}
      </p>

      {status && <p className="status">{status}</p>}

      {/* ACTIVE HOME VISIT BANNER */}
      {activeVisit && (
        <div
          style={{
            background: 'linear-gradient(90deg, #0a7f4f, #186084)',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <b>🟢 Active Home Visit in Progress</b>
            <div style={{ fontSize: '0.78rem', opacity: 0.9 }}>
              Started at {new Date(activeVisit.clock_in_at).toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          <button
            onClick={() => handleClockOut(activeVisit.id)}
            disabled={busy}
            style={{
              background: '#fff',
              color: '#0a7f4f',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 14px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            🏁 Finish &amp; Clock Out
          </button>
        </div>
      )}

      {/* TAB 1: MY ASSIGNED CASES */}
      {tab === 'mine' && (
        <>
          {cases === null ? (
            <p className="muted">Loading…</p>
          ) : cases.length === 0 ? (
            <div className="empty" style={{ textAlign: 'center', padding: '30px 10px' }}>
              <p>You have no active cases assigned right now.</p>
              <button className="pri sm" onClick={() => setTab('available')}>
                📢 Browse Available Jobs ({openBroadcastCount} open)
              </button>
            </div>
          ) : (
            cases.map((c) => {
              const isClockedIntoThis = activeVisit && activeVisit.case_id === c.id;
              return (
                <div className="rec" key={c.id}>
                  <div className="rec-head">
                    <div style={{ width: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <b>{c.name}</b>
                        <CareBadge t={c.care_type} />
                      </div>
                      <div className="meta">
                        <span className={'sbadge s-' + c.status}>{c.status}</span>
                        {c.phone ? ' · ' + c.phone : ''}
                      </div>
                      {/* PATIENT BRIEF & SUMMARY CARD (1ST PAGE VIEW) */}
                      <PatientSummaryCard patient={c} caseId={c.id} onUpdated={load} />

                      {c.address && (
                        <div className="note" style={{ marginTop: '6px' }}>
                          📍 {c.address}
                          <div style={{ marginTop: '4px', display: 'flex', gap: '6px' }}>
                            <a
                              href={'https://waze.com/ul?q=' + encodeURIComponent(c.address)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ghost small"
                              style={{ textDecoration: 'none', background: '#eaf6ff', color: '#0d3a54' }}
                            >
                              🚗 Waze
                            </a>
                            <a
                              href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(c.address)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ghost small"
                              style={{ textDecoration: 'none', background: '#e8f3ec', color: '#1d6b3f' }}
                            >
                              🗺️ Google Maps
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="acts" style={{ marginTop: '10px' }}>
                    {!activeVisit && (
                      <button
                        className="ok"
                        onClick={() => handleClockIn(c)}
                        disabled={busy}
                        style={{ fontWeight: 800 }}
                      >
                        📍 Clock In (Arrived)
                      </button>
                    )}
                    {isClockedIntoThis && (
                      <button
                        className="danger"
                        onClick={() => setClockOutModalVisit(activeVisit)}
                        disabled={busy}
                        style={{ fontWeight: 800 }}
                      >
                        🏁 Clock Out (Complete)
                      </button>
                    )}
                    <button onClick={() => onOpenMews(c)}>📈 MEWS chart</button>
                    {onOpenDocs && <button onClick={() => onOpenDocs(c)}>📁 Clinical Docs</button>}
                    {onOpenWound && <button onClick={() => onOpenWound(c)}>🩹 Wound care</button>}
                    {onOpenSummary && <button onClick={() => onOpenSummary(c)}>📄 Summary</button>}
                    {onOpenHand && <button onClick={() => onOpenHand(c)}>📋 Handover</button>}
                    {onOpenMeds && <button onClick={() => onOpenMeds(c)}>💊 Medication</button>}
                    {onOpenChat && <button onClick={() => onOpenChat(c)}>💭 Chat</button>}
                    {c.phone && (
                      <button className="wa" onClick={() => waOpen(c.phone, msg.followup(c.name))}>
                        WhatsApp
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </>
      )}

      {/* TAB 2: AVAILABLE CASES & JOBS (COMMISSION PROTECTED) */}
      {tab === 'available' && (
        <div>
          {broadcasts === null ? (
            <p className="muted">Loading available cases…</p>
          ) : broadcasts.length === 0 ? (
            <p className="empty">No open job broadcasts right now. Check back soon!</p>
          ) : (
            broadcasts.map((b) => {
              const hasApplied = !!b.my_application;
              const isSelected = b.my_application?.status === 'selected';
              const isPending = b.my_application?.status === 'pending';
              const isRejected = b.my_application?.status === 'rejected';

              return (
                <div
                  key={b.id}
                  style={{
                    background: '#fff',
                    border: isSelected ? '2px solid #16a34a' : '1px solid var(--line)',
                    borderRadius: '12px',
                    padding: '14px',
                    marginBottom: '12px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <b style={{ fontSize: '1.05rem', color: 'var(--navy)' }}>{b.title}</b>
                        {b.status === 'assigned' && <span className="sbadge s-assigned">Assigned / 已接单</span>}
                        {b.status === 'open' && <span className="sbadge s-active">🔥 Open for Bidding / 招募中</span>}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '3px' }}>
                        📍 {b.area || 'Penang area'} · 🩺 {b.care_type || 'Nursing Procedure'} {b.schedule ? `· ⏰ ${b.schedule}` : ''}
                      </div>
                    </div>

                    {/* Nurse Take-Home Payout (Net - 20% commission removed) */}
                    <div style={{ textAlign: 'right', background: '#f0fdf4', padding: '6px 12px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>Your Payout / 护士实收</div>
                      <b style={{ fontSize: '1.25rem', color: '#15803d' }}>RM {Number(b.nurse_wage || 0).toFixed(2)}</b>
                    </div>
                  </div>

                  {b.notes && (
                    <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', fontSize: '0.82rem', marginTop: '8px', color: '#334155' }}>
                      📋 <b>Requirements:</b> {b.notes}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>
                      Posted {new Date(b.created_at).toLocaleDateString('en-MY', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>

                    {/* Application Status & Action */}
                    <div>
                      {isSelected && (
                        <span style={{ color: '#16a34a', fontWeight: 800, fontSize: '0.85rem' }}>
                          🎉 You are assigned to this case!
                        </span>
                      )}
                      {isPending && (
                        <span style={{ color: '#d97706', fontWeight: 700, fontSize: '0.82rem', background: '#fef3c7', padding: '4px 8px', borderRadius: '6px' }}>
                          ⏳ Applied · Waiting for Manager confirmation
                        </span>
                      )}
                      {isRejected && (
                        <span style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>
                          Assigned to another team member
                        </span>
                      )}
                      {!hasApplied && b.status === 'open' && (
                        <>
                          {applyingId === b.id ? (
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                              <input
                                placeholder="Your availability / note (optional)"
                                value={appNote}
                                onChange={(e) => setAppNote(e.target.value)}
                                style={{ fontSize: '0.8rem', padding: '4px 8px', width: '200px' }}
                              />
                              <button
                                className="pri sm"
                                onClick={() => submitApplication(b.id)}
                                disabled={busy}
                              >
                                Confirm Apply
                              </button>
                              <button className="ghost sm" onClick={() => setApplyingId(null)}>
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              className="pri sm"
                              onClick={() => { setApplyingId(b.id); setAppNote(''); }}
                              disabled={busy}
                            >
                              🙋 Apply to Take Case (我要接单)
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* CLOCK OUT CONSUMABLES PICKER MODAL */}
      {clockOutModalVisit && (
        <ConsumablesClockOutModal
          onConfirm={(itemsUsed) => handleClockOutWithConsumables(itemsUsed)}
          onSkip={() => handleClockOutWithConsumables([])}
          onClose={() => setClockOutModalVisit(null)}
        />
      )}
    </div>
  );
}

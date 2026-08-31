import { useEffect, useState } from 'react';
import { api } from '../api.js';

const SHIFTS = [
  { id: 'AM', label: 'AM Morning (早班 08:00–14:00)' },
  { id: 'PM', label: 'PM Evening (午班 14:00–20:00)' },
  { id: 'NIGHT', label: 'Night (夜班 20:00–08:00)' },
];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Roster({ me, canAssign }) {
  const [cases, setCases] = useState([]);
  const [staff, setStaff] = useState([]);
  const [viewMode, setViewMode] = useState('all'); // 'all' | 'mine' | caseId
  const [caseId, setCaseId] = useState('');
  const [start, setStart] = useState(mondayOf(todayMY()));
  const [rows, setRows] = useState([]);
  const [pendingReqs, setPendingReqs] = useState([]);
  const [status, setStatus] = useState('');

  // Request Slot Modal State
  const [slotModal, setSlotModal] = useState(null); // { case_id, patient_name, shift_date, shift, note }
  // Admin Decision Modal State for Pending Request
  const [decideModal, setDecideModal] = useState(null); // request object

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3200); };
  const week = [...Array(7)].map((_, i) => addDays(start, i));

  // Load Cases and Staff for all users
  useEffect(() => {
    api.getCases('roster=1').then((d) => {
      const list = (d.cases || []).filter((c) => ['accepted', 'assigned', 'active', 'intake'].includes(c.status));
      setCases(list);
      if (list.length > 0 && !caseId) {
        setCaseId(list[0].id);
      }
    }).catch(() => {});

    api.getStaff().then((d) => {
      setStaff(d.staff || []);
    }).catch(() => {});
  }, []);

  const load = () => {
    const q = { from: week[0], to: week[6] };
    if (viewMode === 'mine') {
      q.mine = 1;
    } else if (viewMode !== 'all' && caseId) {
      q.case_id = caseId;
    }

    api.getRoster(q).then((d) => {
      setRows(d.roster || []);
      setPendingReqs(d.pending_requests || []);
    }).catch((e) => flash(e.message));
  };

  useEffect(() => { load(); }, [start, caseId, viewMode]);

  const atCaseDateShift = (cId, date, shift) =>
    rows.find((r) => r.case_id === cId && r.shift_date === date && r.shift === shift);

  // Find pending request for a specific case, date, and shift
  const findPending = (targetCaseId, date, shift) => {
    return pendingReqs.find((req) => {
      if (req.shift_date !== date) return false;
      try {
        const data = typeof req.reason === 'string' && req.reason.startsWith('{')
          ? JSON.parse(req.reason)
          : {};
        return data.case_id === targetCaseId && data.shift === shift;
      } catch (_) {
        return false;
      }
    });
  };

  async function assign(targetCaseId, date, shift, staffId) {
    if (!staffId) {
      const ex = atCaseDateShift(targetCaseId, date, shift);
      if (ex) {
        try {
          await api.clearShift(ex.id);
          flash('✓ Shift unassigned');
          load();
        } catch (e) {
          flash(e.message);
        }
      }
      return;
    }
    try {
      const r = await api.setShift({ case_id: targetCaseId, staff_id: staffId, shift_date: date, shift });
      if (r.clash) flash('⚠ Warning: Also rostered on ' + r.clash + ' for this shift');
      else flash('✓ Shift scheduled for ' + (staff.find((s) => s.id === staffId)?.name || 'Nurse'));
      load();
    } catch (e) {
      flash(e.message);
    }
  }

  async function confirmShift(id, st) {
    try {
      await api.updateShift(id, st);
      flash('✓ Shift confirmed');
      load();
    } catch (e) {
      flash(e.message);
    }
  }

  // Staff submits slot request
  async function submitSlotRequest(e) {
    e.preventDefault();
    if (!slotModal) return;
    try {
      await api.createRequest({
        type: 'slot_request',
        case_id: slotModal.case_id,
        patient_name: slotModal.patient_name,
        shift_date: slotModal.shift_date,
        shift: slotModal.shift,
        note: slotModal.note || 'Requested via Roster grid',
        reason: slotModal.note || 'Available for this slot',
      });
      flash('✓ Shift request submitted! Sent to Admin for approval.');
      setSlotModal(null);
      load();
    } catch (err) {
      flash(err.message);
    }
  }

  // Admin approves / rejects a pending request
  async function handleAdminDecision(reqId, action) {
    const note = action === 'reject' ? (prompt('Reason for decline (optional):') || '') : '';
    try {
      await api.decideRequest(reqId, action, note);
      flash(action === 'approve' ? '✅ Shift request approved and assigned!' : 'Request rejected');
      setDecideModal(null);
      load();
    } catch (err) {
      flash(err.message);
    }
  }

  const currentCase = cases.find((c) => c.id === caseId) || cases[0] || { id: '', name: 'All Cases' };

  // Helper to render an individual shift cell
  const renderCell = (cId, cName, d, shId) => {
    const r = atCaseDateShift(cId, d, shId);
    const pending = findPending(cId, d, shId);
    const isMyPending = pending && me && (pending.staff_id === me.id || pending.staff_id === me.sid);
    const assignedStaffName = r ? (r.staff_name || staff.find((s) => s.id === r.staff_id)?.name || 'Nurse') : '';

    return (
      <td
        key={d}
        className={r ? 'filled' : pending ? 'pending-slot' : ''}
        style={{
          verticalAlign: 'middle',
          textAlign: 'center',
          padding: '8px 4px',
          background: pending ? '#fef3c7' : r ? '#f0fdf4' : '#fff',
          border: pending ? '1.5px dashed #f59e0b' : '1px solid #e2e8f0',
          minWidth: '105px',
        }}
      >
        {/* 1. If Slot is Confirmed / Assigned */}
        {r ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', width: '100%' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#166534', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                👤 {assignedStaffName}
              </span>
              {canAssign && (
                <button
                  type="button"
                  title="Unassign this shift"
                  style={{
                    background: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c',
                    cursor: 'pointer', padding: '1px 5px', fontSize: '0.72rem', borderRadius: '4px', fontWeight: 'bold'
                  }}
                  onClick={() => assign(cId, d, shId, '')}
                >
                  ✕
                </button>
              )}
            </div>

            <span className={'cbadge ' + (r.status === 'confirmed' ? 'proc' : r.status === 'done' ? 'off' : 'lt')} style={{ fontSize: '0.66rem', padding: '1px 6px' }}>
              {r.status.toUpperCase()}
            </span>

            {canAssign && (
              <select
                value={r.staff_id || ''}
                onChange={(e) => assign(cId, d, shId, e.target.value)}
                style={{
                  width: '100%', fontSize: '0.72rem', padding: '2px 4px',
                  borderRadius: '4px', border: '1px solid #86efac', background: '#ffffff', color: '#15803d', fontWeight: '600', marginTop: '2px'
                }}
              >
                <option value={r.staff_id}>✓ {assignedStaffName}</option>
                <option value="">— Unassign Shift —</option>
                {staff.filter((s) => s.id !== r.staff_id && s.active).map((s) => (
                  <option key={s.id} value={s.id}>{s.name} ({s.role?.toUpperCase()})</option>
                ))}
              </select>
            )}
          </div>
        ) : pending ? (
          /* 2. If Slot has Pending Request */
          <div style={{ padding: '2px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#92400e' }}>
              ⏳ {pending.staff_name}
            </div>
            <div style={{ fontSize: '0.66rem', color: '#b45309', margin: '2px 0' }}>Request Pending</div>
            {canAssign ? (
              <button
                className="pri xs"
                style={{ padding: '2px 6px', fontSize: '0.7rem', background: '#d97706', borderColor: '#b45309' }}
                onClick={() => setDecideModal(pending)}
              >
                Review &amp; Approve
              </button>
            ) : isMyPending ? (
              <span style={{ fontSize: '0.7rem', color: '#0369a1', fontWeight: '700', display: 'block', marginTop: '2px' }}>
                ✓ Your Request
              </span>
            ) : null}
          </div>
        ) : (
          /* 3. Slot is Open / Unassigned */
          <div>
            {canAssign ? (
              <select
                value=""
                onChange={(e) => assign(cId, d, shId, e.target.value)}
                style={{
                  width: '100%', fontSize: '0.75rem', padding: '4px',
                  borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#475569', fontWeight: '600'
                }}
              >
                <option value="">＋ Assign</option>
                {staff.filter((s) => s.active).map((s) => (
                  <option key={s.id} value={s.id}>{s.name} ({s.role?.toUpperCase()})</option>
                ))}
              </select>
            ) : (
              <button
                className="ghost xs"
                style={{ fontSize: '0.74rem', padding: '4px 6px', color: '#0284c7', borderColor: '#bae6fd', fontWeight: '700' }}
                onClick={() => setSlotModal({
                  case_id: cId,
                  patient_name: cName,
                  shift_date: d,
                  shift: shId,
                  note: '',
                })}
              >
                ＋ Request
              </button>
            )}
          </div>
        )}
      </td>
    );
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            📅 Roster &amp; Shift Scheduling (团队排班)
          </h2>
          <p className="muted" style={{ margin: '4px 0 0' }}>
            {canAssign
              ? 'Manage, assign, and approve nurse shifts. Team members can view and request open slots.'
              : 'View team shift schedules across all patient cases and request your preferred work slots.'}
          </p>
        </div>
      </div>
      {status && <p className="status">{status}</p>}

      {/* Roster Controls */}
      <div className="rosbar" style={{ flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
        <button className="ghost sm" onClick={() => setStart(addDays(start, -7))}>◀ Prev Week</button>
        <b style={{ fontSize: '1rem', color: '#0f172a' }}>{fmt(week[0])} – {fmt(week[6])}</b>
        <button className="ghost sm" onClick={() => setStart(addDays(start, 7))}>Next Week ▶</button>
        <button className="ghost sm" onClick={() => setStart(mondayOf(todayMY()))}>This Week</button>

        {/* View Mode Selector */}
        <select
          value={viewMode}
          onChange={(e) => {
            const v = e.target.value;
            setViewMode(v);
            if (v !== 'all' && v !== 'mine') {
              setCaseId(v);
            }
          }}
          style={{
            fontWeight: '700', color: '#0369a1', padding: '6px 12px',
            borderRadius: '8px', border: '1.5px solid #0284c7', background: '#f0f9ff'
          }}
        >
          <option value="all">👥 Full Team Roster (All Cases / 全体团队排班)</option>
          <option value="mine">👤 My Personal Shifts / 我的排班</option>
          <optgroup label="Filter by Patient Case / 单个病患排班">
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                🏥 {c.name} ({c.care_type === 'longterm' ? '24h Long-Term' : 'Procedure / Home Visit'})
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* ===================== VIEW 1: MY SHIFTS ===================== */}
      {viewMode === 'mine' ? (
        <div style={{ marginTop: '14px' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#0f172a', margin: '0 0 10px' }}>
            📋 Your Assigned Shifts for {fmt(week[0])} – {fmt(week[6])}
          </h3>
          {rows.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '28px', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
              <p className="muted" style={{ margin: '0 0 10px' }}>No shifts rostered for you this week.</p>
              <button className="pri sm" onClick={() => setViewMode('all')}>
                🔍 View Full Team Roster to Request Open Slots
              </button>
            </div>
          ) : (
            rows.map((r) => (
              <div className="rec" key={r.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="grow">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <b style={{ fontSize: '1rem', color: '#0f172a' }}>
                      {fmt(r.shift_date)} ({DAYS[new Date(r.shift_date + 'T00:00:00Z').getUTCDay()]})
                    </b>
                    <span className="badge badge-green" style={{ fontWeight: '800' }}>{r.shift} SHIFT</span>
                    <span className={'cbadge ' + (r.status === 'confirmed' ? 'proc' : r.status === 'done' ? 'off' : 'lt')}>
                      {r.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="meta" style={{ marginTop: '4px', fontSize: '0.85rem' }}>
                    👤 <b>{r.patient_name}</b> {r.start_time ? `· ⏰ ${r.start_time}–${r.end_time}` : ''} {r.note ? `· 📝 ${r.note}` : ''}
                  </div>
                </div>
                <div>
                  {r.status === 'planned' && (
                    <button className="pri sm" onClick={() => confirmShift(r.id, 'confirmed')}>
                      ✓ Confirm Shift
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      ) : viewMode === 'all' ? (
        /* ===================== VIEW 2: FULL TEAM ROSTER ACROSS ALL CASES ===================== */
        <div style={{ marginTop: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: '700' }}>
              👥 Full Team Roster Schedule ({cases.length} Active Cases)
            </div>
            {!canAssign && (
              <span style={{ fontSize: '0.78rem', color: '#64748b', background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px' }}>
                💡 Click <b>＋ Request</b> on any open slot to apply
              </span>
            )}
          </div>

          {cases.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
              <p className="muted">No active patient cases found.</p>
            </div>
          ) : (
            cases.map((c) => (
              <div key={c.id} style={{ marginBottom: '20px', background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <b style={{ color: '#0284c7', fontSize: '0.95rem' }}>🏥 {c.name}</b>
                    <span className="badge" style={{ fontSize: '0.72rem' }}>
                      {c.care_type === 'longterm' ? '24h Long-Term' : 'Home Nursing / Visits'}
                    </span>
                    {c.address && <span className="muted" style={{ fontSize: '0.75rem' }}>📍 {c.address}</span>}
                  </div>
                  <button
                    className="ghost xs"
                    style={{ fontSize: '0.72rem' }}
                    onClick={() => {
                      setCaseId(c.id);
                      setViewMode(c.id);
                    }}
                  >
                    Focus Case 🔍
                  </button>
                </div>

                <div className="rosgrid" style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', minWidth: '720px' }}>
                    <thead>
                      <tr>
                        <th style={{ width: '130px' }}>SHIFT</th>
                        {week.map((d) => (
                          <th key={d}>
                            <span>{DAYS[new Date(d + 'T00:00:00Z').getUTCDay()]}</span>
                            {fmt(d)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SHIFTS.map((sh) => (
                        <tr key={sh.id}>
                          <th className="shl" style={{ padding: '8px', verticalAlign: 'middle' }}>
                            <b>{sh.id}</b>
                            <small style={{ display: 'block', fontSize: '0.68rem', color: '#64748b', fontWeight: 'normal' }}>
                              {sh.id === 'AM' ? '08:00–14:00' : sh.id === 'PM' ? '14:00–20:00' : '20:00–08:00'}
                            </small>
                          </th>
                          {week.map((d) => renderCell(c.id, c.name, d, sh.id))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* ===================== VIEW 3: SINGLE CASE MATRIX ===================== */
        <div style={{ marginTop: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ fontSize: '0.9rem', color: '#334155' }}>
              Showing Roster for: <b style={{ color: '#0284c7' }}>{currentCase.name}</b>
            </div>
            {!canAssign && (
              <span style={{ fontSize: '0.78rem', color: '#64748b', background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px' }}>
                💡 Click any open slot (<b>＋ Request</b>) to apply
              </span>
            )}
          </div>

          <div className="rosgrid" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: '720px' }}>
              <thead>
                <tr>
                  <th style={{ width: '140px' }}>SHIFT</th>
                  {week.map((d) => (
                    <th key={d}>
                      <span>{DAYS[new Date(d + 'T00:00:00Z').getUTCDay()]}</span>
                      {fmt(d)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SHIFTS.map((sh) => (
                  <tr key={sh.id}>
                    <th className="shl" style={{ padding: '10px 8px', verticalAlign: 'middle' }}>
                      <b>{sh.id}</b>
                      <small style={{ display: 'block', fontSize: '0.68rem', color: '#64748b', fontWeight: 'normal' }}>
                        {sh.id === 'AM' ? '08:00–14:00' : sh.id === 'PM' ? '14:00–20:00' : '20:00–08:00'}
                      </small>
                    </th>
                    {week.map((d) => renderCell(currentCase.id || caseId, currentCase.name, d, sh.id))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================== MODAL 1: REQUEST SHIFT SLOT ===================== */}
      {slotModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px'
        }}>
          <div style={{
            background: '#fff', borderRadius: '16px', maxWidth: '440px', width: '100%',
            padding: '20px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)', border: '1px solid #cbd5e1'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.15rem' }}>
                🙋 Request Shift Slot (申请排班)
              </h3>
              <button className="link" onClick={() => setSlotModal(null)}>✕</button>
            </div>

            <form onSubmit={submitSlotRequest}>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '12px', fontSize: '0.85rem' }}>
                <div><b>Patient:</b> {slotModal.patient_name}</div>
                <div><b>Date:</b> {slotModal.shift_date} ({DAYS[new Date(slotModal.shift_date + 'T00:00:00Z').getUTCDay()]})</div>
                <div><b>Shift:</b> <span className="badge badge-green">{slotModal.shift}</span> ({slotModal.shift === 'AM' ? '08:00–14:00' : slotModal.shift === 'PM' ? '14:00–20:00' : '20:00–08:00'})</div>
              </div>

              <div className="f" style={{ marginBottom: '14px' }}>
                <label>Nurse Note / Availability (申请附言/可用时间)</label>
                <textarea
                  rows="2"
                  value={slotModal.note}
                  onChange={(e) => setSlotModal({ ...slotModal, note: e.target.value })}
                  placeholder="e.g. Available, living nearby, ready on time"
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" className="pri" style={{ flex: 1 }}>
                  ✓ Submit Request for Approval
                </button>
                <button type="button" className="ghost" onClick={() => setSlotModal(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL 2: ADMIN APPROVE/REJECT PENDING SLOT ===================== */}
      {decideModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px'
        }}>
          <div style={{
            background: '#fff', borderRadius: '16px', maxWidth: '440px', width: '100%',
            padding: '20px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)', border: '1px solid #cbd5e1'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.15rem' }}>
                🛡️ Review Shift Request
              </h3>
              <button className="link" onClick={() => setDecideModal(null)}>✕</button>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '14px', fontSize: '0.85rem' }}>
              <div><b>Nurse Name:</b> {decideModal.staff_name}</div>
              <div><b>Date:</b> {decideModal.shift_date}</div>
              <div><b>Details:</b> {decideModal.reason}</div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="pri"
                style={{ flex: 1, background: '#10b981' }}
                onClick={() => handleAdminDecision(decideModal.id, 'approve')}
              >
                ✅ Approve &amp; Assign to Roster
              </button>
              <button
                className="ghost"
                style={{ color: '#ef4444', borderColor: '#fca5a5' }}
                onClick={() => handleAdminDecision(decideModal.id, 'reject')}
              >
                ❌ Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
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

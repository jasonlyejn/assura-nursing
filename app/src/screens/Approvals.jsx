import { useEffect, useState } from 'react';
import { api } from '../api.js';

const LABEL = { name: 'Full name', ic: 'IC / passport', phone: 'Phone', email: 'Email',
  address: 'Address', reg_no: 'Nursing reg no', qualification: 'Qualification',
  kin_name: 'Emergency contact', kin_phone: 'Emergency phone',
  bank_name: 'Bank', bank_acc: 'Account no', notes: 'Notes' };

export default function Approvals({ onChanged, me }) {
  const [tab, setTab] = useState('consents'); // 'consents' | 'slots' | 'leaves' | 'resets' | 'profiles'
  const [consents, setConsents] = useState(null);
  const [requests, setRequests] = useState(null);
  const [resets, setResets] = useState(null);
  const [profiles, setProfiles] = useState(null);
  const [status, setStatus] = useState('');

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3200); };

  const loadConsents = async () => {
    try {
      const res = await fetch('/api/consents?status=pending_approval', { credentials: 'same-origin' });
      const data = await res.json().catch(() => ({}));
      setConsents(data.consents || []);
    } catch (e) {
      flash(e.message);
    }
  };

  const loadRequests = () => {
    api.getRequests({ status: 'pending' })
      .then((d) => setRequests(d.requests || []))
      .catch((e) => flash(e.message));
  };

  const loadResets = () => {
    api.getPinResets()
      .then((d) => setResets(d.resets || []))
      .catch((e) => flash(e.message));
  };

  const loadProfiles = () => {
    api.getChanges()
      .then((d) => setProfiles(d.changes || []))
      .catch((e) => flash(e.message));
  };

  const loadAll = () => {
    loadConsents();
    loadRequests();
    loadResets();
    loadProfiles();
  };

  useEffect(() => {
    loadAll();
  }, []);

  // 1. Consent Actions
  async function actConsent(id, action) {
    const notes = prompt(action === 'approve' ? 'Consultant / Director Authorization Note (Optional):' : 'Rejection Reason:') || '';
    try {
      const res = await fetch('/api/consents', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ id, action, review_notes: notes }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to review consent');
      flash(action === 'approve' ? '✅ Consent Approved & Legally Activated!' : '❌ Consent Rejected.');
      loadConsents();
      onChanged && onChanged();
    } catch (e) { flash(e.message); }
  }

  // 2. Staff Requests Actions (Shift Slot, Case Claim, Leave, Claims)
  async function actRequest(id, action) {
    const note = action === 'reject' ? (prompt('Reason for rejection:') || '') : '';
    try {
      await api.decideRequest(id, action, note);
      flash(action === 'approve' ? '✅ Request approved & scheduled!' : 'Request rejected');
      loadRequests();
      onChanged && onChanged();
    } catch (e) { flash(e.message); }
  }

  // 3. PIN Reset Actions
  async function actReset(id, action, staffId) {
    if (action === 'ignore') {
      try {
        await api.decidePinReset({ id, action: 'ignore' });
        flash('Request dismissed');
        loadResets();
      } catch (e) { flash(e.message); }
      return;
    }

    const pin = prompt('Set new Temporary PIN for staff (4–8 digits):', '1234');
    if (!pin) return;
    if (!/^\d{4,8}$/.test(pin)) {
      alert('PIN must be 4 to 8 digits.');
      return;
    }

    try {
      await api.decidePinReset({ id, action: 'reset', staff_id: staffId, temp_pin: pin });
      flash(`✅ Temporary PIN set to ${pin}. Staff must change PIN upon login.`);
      loadResets();
      onChanged && onChanged();
    } catch (e) { flash(e.message); }
  }

  // 4. Profile Actions
  async function actProfile(id, action) {
    let note = '';
    if (action === 'reject') { note = prompt('Reason (the staff member will see this):') || ''; }
    try {
      await api.reviewChange(id, action, note);
      flash(action === 'approve' ? '✓ Profile approved and applied' : 'Rejected');
      loadProfiles();
      onChanged && onChanged();
    } catch (e) { flash(e.message); }
  }

  // Subdivided Requests
  const pendingSlots = (requests || []).filter((r) => r.type === 'slot_request' || r.type === 'case_claim');
  const pendingLeaves = (requests || []).filter((r) => r.type !== 'slot_request' && r.type !== 'case_claim');
  const totalPending = (consents?.length || 0) + (requests?.length || 0) + (resets?.length || 0) + (profiles?.length || 0);

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#0d3a54', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🛡️ Central Approvals &amp; Authorizations Hub (审批中心)
          </h2>
          <p className="muted" style={{ margin: '3px 0 0', fontSize: '0.84rem' }}>
            Unified command center to grant director approvals for clinical consents, shift slots, leave, claims, PIN resets, and profiles.
          </p>
        </div>
        <button className="ghost sm" onClick={loadAll} style={{ fontWeight: 700 }}>
          🔄 Refresh Hub ({totalPending} Pending)
        </button>
      </div>

      {status && <p className="status">{status}</p>}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px', borderBottom: '1.5px solid #e2e8f0', paddingBottom: '8px' }}>
        <button
          className={`xs ${tab === 'consents' ? 'pri' : 'ghost'}`}
          onClick={() => setTab('consents')}
          style={{ fontWeight: 700 }}
        >
          ✍️ Clinical Consents &amp; DNR ({consents ? consents.length : '…'})
        </button>

        <button
          className={`xs ${tab === 'slots' ? 'pri' : 'ghost'}`}
          onClick={() => setTab('slots')}
          style={{ fontWeight: 700 }}
        >
          🗓️ Shift Slots &amp; Claims ({requests ? pendingSlots.length : '…'})
        </button>

        <button
          className={`xs ${tab === 'leaves' ? 'pri' : 'ghost'}`}
          onClick={() => setTab('leaves')}
          style={{ fontWeight: 700 }}
        >
          🏖️ Leave &amp; Allowances ({requests ? pendingLeaves.length : '…'})
        </button>

        <button
          className={`xs ${tab === 'resets' ? 'pri' : 'ghost'}`}
          onClick={() => setTab('resets')}
          style={{ fontWeight: 700 }}
        >
          🔑 PIN Resets ({resets ? resets.length : '…'})
        </button>

        <button
          className={`xs ${tab === 'profiles' ? 'pri' : 'ghost'}`}
          onClick={() => setTab('profiles')}
          style={{ fontWeight: 700 }}
        >
          👤 Staff Profiles ({profiles ? profiles.length : '…'})
        </button>
      </div>

      {/* ================= TAB 1: CLINICAL CONSENTS & DNR ================= */}
      {tab === 'consents' && (
        <div>
          {consents === null && <p className="muted">Loading pending clinical consents…</p>}
          {consents && consents.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--muted)', background: '#f8fafc', borderRadius: '10px', border: '1px dashed #cbd5e1' }}>
              <div style={{ fontSize: '2rem', marginBottom: '6px' }}>✓</div>
              <b>No pending consents awaiting review. All clinical consents &amp; DNR directives are authorized.</b>
            </div>
          )}

          {consents && consents.map((c) => (
            <div
              key={c.id}
              style={{
                border: c.is_dnr ? '1.5px solid #f59e0b' : '1px solid #cbd5e1',
                borderRadius: '10px',
                padding: '14px',
                marginBottom: '12px',
                background: c.is_dnr ? '#fffbeb' : '#fff',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <b style={{ color: '#0d3a54', fontSize: '1rem' }}>🏥 {c.patient_name || 'Patient'}</b>
                    <span style={{ fontSize: '0.84rem', color: '#64748b' }}>· {c.procedure_name}</span>
                    {c.is_dnr === 1 && (
                      <span style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #f87171', fontSize: '0.72rem', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                        🕊️ DNR DIRECTIVE
                      </span>
                    )}
                    {c.is_verbal_order === 1 && (
                      <span style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', fontSize: '0.72rem', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                        ⚡ VERBAL ORDER
                      </span>
                    )}
                  </div>
                  <div className="meta" style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '3px' }}>
                    Signed by: <b>{c.signee_name || '—'}</b> ({c.relationship}) · IC: {c.signee_ic || '—'} · Witness: {c.witness_name || 'Nurse'} · {when(c.signed_at)}
                  </div>
                  {c.doctor_name && (
                    <div style={{ fontSize: '0.78rem', color: '#334155', marginTop: '2px' }}>
                      Attending Physician: <b>{c.doctor_name}</b> {c.doctor_mmc ? `(${c.doctor_mmc})` : ''}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    className="pri sm"
                    onClick={() => actConsent(c.id, 'approve')}
                    style={{ fontWeight: 800, background: '#16a34a', borderColor: '#16a34a' }}
                  >
                    ✅ Grant Approval
                  </button>
                  <button
                    className="danger sm"
                    onClick={() => actConsent(c.id, 'reject')}
                    style={{ fontWeight: 700 }}
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>

              {c.signature_data && (
                <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Signature:</span>
                  <img
                    src={c.signature_data}
                    alt="Signature"
                    style={{ height: '32px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '2px' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ================= TAB 2: SHIFT SLOTS & CASE CLAIMS ================= */}
      {tab === 'slots' && (
        <div>
          {requests === null && <p className="muted">Loading shift slot requests…</p>}
          {requests && pendingSlots.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--muted)', background: '#f8fafc', borderRadius: '10px', border: '1px dashed #cbd5e1' }}>
              <div style={{ fontSize: '2rem', marginBottom: '6px' }}>✓</div>
              <b>No pending shift slot or case claim requests. Roster allocations are clear.</b>
            </div>
          )}

          {pendingSlots.map((r) => {
            let details = null;
            try {
              details = typeof r.reason === 'string' && r.reason.startsWith('{') ? JSON.parse(r.reason) : null;
            } catch (_) {}

            return (
              <div className="rec" key={r.id} style={{ marginBottom: '10px', padding: '12px' }}>
                <div className="rec-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div className="grow">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <b style={{ fontSize: '1rem', color: '#0f172a' }}>👤 {r.staff_name}</b>
                      <span className="badge badge-green" style={{ fontWeight: 800 }}>
                        {r.type === 'slot_request' ? '🗓️ SHIFT SLOT REQUEST' : '🙋 CASE CLAIM'}
                      </span>
                      {r.from_date && <span className="muted" style={{ fontSize: '0.8rem' }}>📅 Date: {r.from_date}</span>}
                    </div>

                    {details ? (
                      <div style={{ marginTop: '6px', fontSize: '0.85rem', color: '#334155', background: '#f0f9ff', padding: '8px', borderRadius: '6px', border: '1px solid #bae6fd' }}>
                        <div>🏥 <b>Patient:</b> {details.patient_name || 'Patient'} {details.shift ? `· ⏰ ${details.shift} Shift` : ''}</div>
                        {details.note && <div style={{ marginTop: '3px' }}>📝 <i>“{details.note}”</i></div>}
                      </div>
                    ) : (
                      <div className="meta" style={{ marginTop: '4px' }}>{r.reason}</div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button className="pri sm" style={{ background: '#16a34a', borderColor: '#16a34a', fontWeight: 800 }} onClick={() => actRequest(r.id, 'approve')}>
                      ✅ Approve &amp; Schedule
                    </button>
                    <button className="danger sm" onClick={() => actRequest(r.id, 'reject')}>
                      ✕ Decline
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= TAB 3: LEAVE & EXPENSE CLAIMS ================= */}
      {tab === 'leaves' && (
        <div>
          {requests === null && <p className="muted">Loading leave and claim requests…</p>}
          {requests && pendingLeaves.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--muted)', background: '#f8fafc', borderRadius: '10px', border: '1px dashed #cbd5e1' }}>
              <div style={{ fontSize: '2rem', marginBottom: '6px' }}>✓</div>
              <b>No pending leave or expense claim applications.</b>
            </div>
          )}

          {pendingLeaves.map((r) => (
            <div className="rec" key={r.id} style={{ marginBottom: '10px', padding: '12px' }}>
              <div className="rec-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div className="grow">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <b style={{ fontSize: '1rem', color: '#0f172a' }}>👤 {r.staff_name}</b>
                    <span className="badge" style={{ fontWeight: 800, background: '#e0f2fe', color: '#0369a1' }}>
                      {r.type.toUpperCase()}
                    </span>
                    {r.from_date && (
                      <span className="muted" style={{ fontSize: '0.8rem' }}>
                        📅 {r.from_date} {r.to_date && r.to_date !== r.from_date ? `to ${r.to_date}` : ''} ({r.days} day{r.days > 1 ? 's' : ''})
                      </span>
                    )}
                    {r.amount > 0 && (
                      <span style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.9rem' }}>
                        RM {Number(r.amount).toFixed(2)}
                      </span>
                    )}
                  </div>

                  <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: '#334155' }}>
                    📝 {r.reason}
                  </p>

                  {r.attachment && (
                    <div style={{ marginTop: '8px' }}>
                      <img
                        src={r.attachment}
                        alt="Receipt / Document"
                        style={{ maxHeight: '140px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer' }}
                        onClick={() => window.open(r.attachment, '_blank')}
                        title="Click to view full image"
                      />
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="pri sm" style={{ background: '#16a34a', borderColor: '#16a34a', fontWeight: 800 }} onClick={() => actRequest(r.id, 'approve')}>
                    ✅ Approve
                  </button>
                  <button className="danger sm" onClick={() => actRequest(r.id, 'reject')}>
                    ✕ Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= TAB 4: PIN RESET REQUESTS ================= */}
      {tab === 'resets' && (
        <div>
          {resets === null && <p className="muted">Loading PIN reset requests…</p>}
          {resets && resets.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--muted)', background: '#f8fafc', borderRadius: '10px', border: '1px dashed #cbd5e1' }}>
              <div style={{ fontSize: '2rem', marginBottom: '6px' }}>✓</div>
              <b>No pending PIN reset requests.</b>
            </div>
          )}

          {resets && resets.map((r) => (
            <div className="rec" key={r.id} style={{ marginBottom: '10px', padding: '12px' }}>
              <div className="rec-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div className="grow">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <b style={{ fontSize: '1rem', color: '#0f172a' }}>🔑 {r.claim_name}</b>
                    {r.staff_name ? (
                      <span className="badge badge-green">Matched: {r.staff_name} ({r.staff_role})</span>
                    ) : (
                      <span className="badge badge-amber">Unmatched Staff Name</span>
                    )}
                  </div>
                  <div className="meta" style={{ marginTop: '4px', fontSize: '0.78rem' }}>
                    Requested on: {when(r.created_at)} {r.note ? `· Note: “${r.note}”` : ''}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    className="pri sm"
                    onClick={() => actReset(r.id, 'reset', r.staff_id)}
                    style={{ background: '#0284c7', borderColor: '#0284c7', fontWeight: 800 }}
                  >
                    🔑 Issue Temp PIN
                  </button>
                  <button className="ghost sm" onClick={() => actReset(r.id, 'ignore')}>
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= TAB 5: STAFF PROFILE CHANGES ================= */}
      {tab === 'profiles' && (
        <div>
          {profiles === null && <p className="muted">Loading staff profile updates…</p>}
          {profiles && profiles.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--muted)', background: '#f8fafc', borderRadius: '10px', border: '1px dashed #cbd5e1' }}>
              <div style={{ fontSize: '2rem', marginBottom: '6px' }}>✓</div>
              <b>No pending profile changes. All nurse records are up to date.</b>
            </div>
          )}

          {profiles && profiles.map((c) => (
            <div className="rec" key={c.id} style={{ marginBottom: '10px', padding: '12px' }}>
              <div className="rec-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div className="grow">
                  <b>👤 {c.staff_name}</b>
                  <div className="meta">{when(c.requested_at)}{c.note ? ' · “' + c.note + '”' : ''}</div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="pri sm" style={{ background: '#16a34a', borderColor: '#16a34a', fontWeight: 800 }} onClick={() => actProfile(c.id, 'approve')}>
                    ✅ Approve Changes
                  </button>
                  <button className="danger sm" onClick={() => actProfile(c.id, 'reject')}>
                    ✕ Decline
                  </button>
                </div>
              </div>

              <div className="hobody" style={{ marginTop: '8px' }}>
                {Object.entries(c.fields).map(([k, v]) => (
                  <div className="chg" key={k}>
                    <span className="ck">{LABEL[k] || k}</span>
                    <span className="cold">{(c.before || {})[k] || '—'}</span>
                    <span className="carr">→</span>
                    <span className="cnew">{v || '(cleared)'}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function when(ts) {
  if (!ts) return '—';
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kuala_Lumpur',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date(ts));
  } catch (_) {
    return String(ts);
  }
}

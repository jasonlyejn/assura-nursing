import { useState, useEffect } from 'react';
import SignaturePad from './SignaturePad.jsx';

const PROCEDURES = [
  '🕊️ DNR Consent & Advance Medical Directive (不施行心肺复苏术 / 生前预嘱)',
  '🫁 Nasogastric (Ryles) Tube Insertion & Care (胃管置管术)',
  '💧 Foley Urinary Catheter Insertion & Bladder Washout (导尿管置管术)',
  '🩹 Complex Wound Debridement & Negative Pressure Therapy (复杂创面清创包扎)',
  '🫁 Tracheostomy Care & Cannula Suctioning (气管切开护理与吸痰)',
  '💉 Intravenous (IV) Cannulation & Infusion Therapy (静脉留置针穿刺)',
  '💉 Intramuscular (IM) / Subcutaneous (SC) Injection (肌肉与皮下注射)',
  '🩹 Stoma Colostomy / Ileostomy Appliance Change (造口袋更换与护理)',
  '🩺 General Clinical Home Nursing & Palliative Care (常规居家护理与舒缓关怀)',
];

export default function ConsentModal({ caseId, patientName, defaultDnr = false, initialTab = 'sign', onClose, onSaved, me }) {
  const [tab, setTab] = useState(initialTab); // 'sign', 'vo', 'list'
  const [procedure, setProcedure] = useState(defaultDnr ? PROCEDURES[0] : PROCEDURES[1]);
  const [signeeName, setSigneeName] = useState('');
  const [signeeIc, setSigneeIc] = useState('');
  const [relationship, setRelationship] = useState('self');
  const [doctorName, setDoctorName] = useState('');
  const [doctorMmc, setDoctorMmc] = useState('');
  
  // Emergency Verbal Order State
  const [voDoctor, setVoDoctor] = useState('');
  const [voNotes, setVoNotes] = useState('');
  
  // History & Pending Sign State
  const [history, setHistory] = useState([]);
  const [signingVoId, setSigningVoId] = useState(null);
  const [signingVoTitle, setSigningVoTitle] = useState('');
  
  const [busy, setBusy] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [err, setErr] = useState('');

  const isDnr = procedure.startsWith('🕊️') || procedure.includes('DNR') || procedure.includes('Resuscitate');
  const canApprove = me?.role === 'admin' || me?.role === 'doctor';

  const flash = (m) => { setStatusMsg(m); setTimeout(() => setStatusMsg(''), 3500); };

  async function loadConsents() {
    try {
      const res = await fetch(`/api/consents?case_id=${encodeURIComponent(caseId)}`, { credentials: 'same-origin' });
      const data = await res.json().catch(() => ({}));
      setHistory(data.consents || []);
    } catch (_) {}
  }

  useEffect(() => {
    loadConsents();
  }, [caseId]);

  // Submit standard signed consent (DNR or Procedure)
  async function handleSignatureSave(signatureData) {
    if (!signeeName.trim()) { setErr('Signee / NOK name is required'); return; }
    if (!signeeIc.trim()) { setErr('Signee NRIC / Passport number is required'); return; }
    setBusy(true);
    setErr('');
    try {
      const res = await fetch('/api/consents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          case_id: caseId,
          procedure_name: procedure,
          signee_name: signeeName.trim(),
          signee_ic: signeeIc.trim(),
          relationship,
          doctor_name: doctorName.trim(),
          doctor_mmc: doctorMmc.trim(),
          is_dnr: isDnr ? 1 : 0,
          is_verbal_order: 0,
          signature_data: signatureData,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to save consent');
      flash('✓ Consent signed & submitted for Primary Consultant / Director Authorization.');
      await loadConsents();
      if (onSaved) onSaved(isDnr);
      setTab('list');
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  // Submit Emergency Verbal Order (VO)
  async function submitVerbalOrder() {
    if (!voDoctor.trim()) { setErr('Attending Doctor name who gave the Verbal Order is required'); return; }
    if (!voNotes.trim()) { setErr('Emergency clinical indication / order details required'); return; }
    setBusy(true);
    setErr('');
    try {
      const res = await fetch('/api/consents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          case_id: caseId,
          procedure_name: procedure,
          doctor_name: voDoctor.trim(),
          is_dnr: isDnr ? 1 : 0,
          is_verbal_order: 1,
          verbal_order_dr: voDoctor.trim(),
          verbal_order_notes: voNotes.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to record Verbal Order');
      flash('🚨 Emergency Verbal Order recorded! Written consent must be executed within 24 hours.');
      await loadConsents();
      if (onSaved) onSaved(isDnr);
      setTab('list');
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  // Complete signature on a pending Verbal Order
  async function handleVoSignatureSave(signatureData) {
    if (!signeeName.trim()) { setErr('Signee / NOK name is required'); return; }
    if (!signeeIc.trim()) { setErr('Signee NRIC / Passport is required'); return; }
    setBusy(true);
    setErr('');
    try {
      const res = await fetch('/api/consents', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          id: signingVoId,
          action: 'sign_verbal_order',
          signee_name: signeeName.trim(),
          signee_ic: signeeIc.trim(),
          relationship,
          signature_data: signatureData,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to sign Verbal Order consent');
      flash('✓ Written consent executed for Verbal Order. Submitted for Director Review.');
      setSigningVoId(null);
      await loadConsents();
      if (onSaved) onSaved();
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  // Consultant / Director Approval Action
  async function reviewConsent(consentId, action) {
    const notes = prompt(action === 'approve' ? 'Consultant / Director Authorization Note (Optional):' : 'Rejection Reason:') || '';
    setBusy(true);
    try {
      const res = await fetch('/api/consents', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          id: consentId,
          action,
          review_notes: notes,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to review consent');
      flash(action === 'approve' ? '✅ Consent Approved & Legally Activated!' : '❌ Consent Rejected.');
      await loadConsents();
      if (onSaved) onSaved();
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10,20,40,0.68)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '16px',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '14px',
          padding: '22px',
          width: 'min(620px, 96vw)',
          maxHeight: '94vh',
          overflowY: 'auto',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          border: '1px solid #cbd5e1',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <h3 style={{ margin: 0, color: '#0d3a54', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              ✍️ Informed Consents, DNR &amp; Verbal Orders
            </h3>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '2px' }}>
              Patient: <b>{patientName}</b> · Attending Staff: <b>{me?.name || 'Nurse'}</b>
            </div>
          </div>
          <button className="link" onClick={onClose} style={{ fontSize: '1.2rem', color: '#64748b' }}>✕</button>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '6px', borderBottom: '1.5px solid #e2e8f0', paddingBottom: '8px', marginBottom: '14px' }}>
          <button
            className={`xs ${tab === 'sign' ? 'pri' : 'ghost'}`}
            onClick={() => { setTab('sign'); setSigningVoId(null); }}
            style={{ fontWeight: 700 }}
          >
            ✍️ Sign New Consent / DNR
          </button>
          <button
            className={`xs ${tab === 'vo' ? 'danger' : 'ghost'}`}
            onClick={() => { setTab('vo'); setSigningVoId(null); }}
            style={{ fontWeight: 700 }}
          >
            ⚡ Emergency Verbal Order (VO)
          </button>
          <button
            className={`xs ${tab === 'list' ? 'pri' : 'ghost'}`}
            onClick={() => { setTab('list'); setSigningVoId(null); }}
            style={{ fontWeight: 700 }}
          >
            📋 Records &amp; Status ({history.length})
          </button>
        </div>

        {statusMsg && (
          <p style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#166534', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600, marginBottom: '12px' }}>
            {statusMsg}
          </p>
        )}
        {err && (
          <p style={{ background: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '12px' }}>
            {err}
          </p>
        )}

        {/* ================= TAB 1: SIGN NEW CONSENT (DNR & PROCEDURES) ================= */}
        {tab === 'sign' && (
          <div>
            <div className="f" style={{ marginBottom: '10px' }}>
              <label style={{ fontWeight: 700, fontSize: '0.82rem', color: '#1e293b' }}>
                Select Clinical Consent Type (选择同意书 / 预嘱类型)
              </label>
              <select
                value={procedure}
                onChange={(e) => setProcedure(e.target.value)}
                style={{ fontWeight: 600, borderColor: isDnr ? '#f59e0b' : 'var(--line)' }}
              >
                {PROCEDURES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* Doctor Info */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
              <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#334155', marginBottom: '6px' }}>
                🩺 Attending / Referring Physician Details (主治 / 推荐医生)
              </div>
              <div className="grid2">
                <div className="f">
                  <label style={{ fontSize: '0.74rem', fontWeight: 600 }}>Doctor's Full Name</label>
                  <input
                    value={doctorName}
                    placeholder="e.g. Dr. Wong / Specialist"
                    onChange={(e) => setDoctorName(e.target.value)}
                  />
                </div>
                <div className="f">
                  <label style={{ fontSize: '0.74rem', fontWeight: 600 }}>Doctor MMC Reg No.</label>
                  <input
                    value={doctorMmc}
                    placeholder="e.g. MMC 38291"
                    onChange={(e) => setDoctorMmc(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* NOK & Signee Details */}
            <div className="grid2">
              <div className="f">
                <label style={{ fontWeight: 700, fontSize: '0.82rem' }}>Signee / NOK Full Name (签署人姓名)</label>
                <input value={signeeName} placeholder="e.g. Tan Ah Kow" onChange={(e) => setSigneeName(e.target.value)} />
              </div>
              <div className="f">
                <label style={{ fontWeight: 700, fontSize: '0.82rem' }}>Signee NRIC / Passport (身份证号)</label>
                <input value={signeeIc} placeholder="e.g. 700101-07-1234" onChange={(e) => setSigneeIc(e.target.value)} />
              </div>
            </div>

            <div className="f" style={{ marginBottom: '10px' }}>
              <label style={{ fontWeight: 700, fontSize: '0.82rem' }}>Relationship to Patient (与患者关系)</label>
              <select value={relationship} onChange={(e) => setRelationship(e.target.value)}>
                <option value="self">Patient (Self / 本人)</option>
                <option value="son_daughter">Son / Daughter (子女)</option>
                <option value="spouse">Spouse (配偶)</option>
                <option value="parent">Parent (父母)</option>
                <option value="legal_guardian">Legal Guardian / Next of Kin (法定监护人)</option>
              </select>
            </div>

            {/* Legal Notice */}
            {isDnr ? (
              <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: '8px', padding: '10px', fontSize: '0.75rem', color: '#991b1b', margin: '8px 0 12px', lineHeight: 1.45 }}>
                <b>🕊️ DNR &amp; PALLIATIVE COMFORT DIRECTIVE (生前预嘱):</b><br />
                In the event of cardiac/respiratory arrest, CPR, intubation, and defibrillation shall <b>NOT</b> be initiated. Full palliative comfort care and pain relief will be provided.<br />
                <i>Note: DNR directive takes formal legal effect once authorized by the Nursing Director / Primary Consultant.</i>
              </div>
            ) : (
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px', fontSize: '0.75rem', color: '#334155', margin: '8px 0 12px', lineHeight: 1.4 }}>
                <b>Informed Procedure Consent / 知情同意声明:</b> I authorize Assura Nursing Care to perform the indicated clinical nursing procedure. Risks, benefits, and alternatives have been explained.
              </div>
            )}

            <SignaturePad
              title="Signee Finger / Digital Signature (签署人电子签名)"
              onSave={handleSignatureSave}
              onCancel={() => setTab('list')}
            />
          </div>
        )}

        {/* ================= TAB 2: EMERGENCY VERBAL ORDER (VO) ================= */}
        {tab === 'vo' && (
          <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '10px', padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.4rem' }}>⚡</span>
              <div>
                <b style={{ color: '#92400e', fontSize: '0.95rem' }}>Emergency Verbal Order (紧急口头医嘱记录)</b>
                <div style={{ fontSize: '0.74rem', color: '#b45309' }}>
                  Use when a doctor gives an immediate verbal order via phone or bedside in an acute emergency.
                </div>
              </div>
            </div>

            <div className="f" style={{ marginBottom: '10px' }}>
              <label style={{ fontWeight: 700, fontSize: '0.8rem', color: '#92400e' }}>Clinical Action / Procedure Ordered</label>
              <select value={procedure} onChange={(e) => setProcedure(e.target.value)}>
                {PROCEDURES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className="grid2">
              <div className="f">
                <label style={{ fontWeight: 700, fontSize: '0.8rem', color: '#92400e' }}>Ordering Doctor's Name &amp; Clinic/Hospital</label>
                <input
                  value={voDoctor}
                  placeholder="e.g. Dr. Wong (KPJ / On-call GP)"
                  onChange={(e) => setVoDoctor(e.target.value)}
                />
              </div>
              <div className="f">
                <label style={{ fontWeight: 700, fontSize: '0.8rem', color: '#92400e' }}>Order Mode</label>
                <input value="Emergency Phone / Bedside VO" disabled style={{ background: '#fef3c7' }} />
              </div>
            </div>

            <div className="f" style={{ marginBottom: '12px' }}>
              <label style={{ fontWeight: 700, fontSize: '0.8rem', color: '#92400e' }}>Clinical Indication &amp; Emergency Notes (口头医嘱事由)</label>
              <textarea
                rows={2}
                value={voNotes}
                placeholder="State acute indication (e.g. Urgent catheter blockage, acute respiratory distress, family verbal agreement to hold CPR while awaiting written form)..."
                onChange={(e) => setVoNotes(e.target.value)}
              />
            </div>

            <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', padding: '8px 10px', borderRadius: '6px', fontSize: '0.74rem', color: '#991b1b', marginBottom: '12px' }}>
              ⚠️ <b>Clinical Governance Rule</b>: Recording a Verbal Order triggers a 24-hour reminder on the patient's record to execute and upload the written signed consent form.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="ghost xs" onClick={() => setTab('list')}>Cancel</button>
              <button className="danger xs" disabled={busy} onClick={submitVerbalOrder} style={{ fontWeight: 700 }}>
                {busy ? 'Recording…' : '⚡ Record Emergency Verbal Order'}
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 3: RECORDS & APPROVAL STATUS ================= */}
        {tab === 'list' && (
          <div>
            {/* If currently signing a VO */}
            {signingVoId ? (
              <div style={{ background: '#f8fafc', border: '1.5px solid #3b82f6', borderRadius: '10px', padding: '14px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <b style={{ color: '#1d4ed8', fontSize: '0.9rem' }}>✍️ Sign Written Consent for: {signingVoTitle}</b>
                  <button className="link xs" onClick={() => setSigningVoId(null)}>✕ Cancel</button>
                </div>
                <div className="grid2">
                  <div className="f">
                    <label style={{ fontSize: '0.76rem', fontWeight: 600 }}>Signee / NOK Name</label>
                    <input value={signeeName} placeholder="Name" onChange={(e) => setSigneeName(e.target.value)} />
                  </div>
                  <div className="f">
                    <label style={{ fontSize: '0.76rem', fontWeight: 600 }}>Signee NRIC / Passport</label>
                    <input value={signeeIc} placeholder="NRIC" onChange={(e) => setSigneeIc(e.target.value)} />
                  </div>
                </div>
                <div className="f" style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '0.76rem', fontWeight: 600 }}>Relationship</label>
                  <select value={relationship} onChange={(e) => setRelationship(e.target.value)}>
                    <option value="self">Patient (Self)</option>
                    <option value="son_daughter">Son / Daughter</option>
                    <option value="spouse">Spouse</option>
                    <option value="parent">Parent</option>
                    <option value="legal_guardian">Legal Guardian</option>
                  </select>
                </div>
                <SignaturePad
                  title="Signee Signature"
                  onSave={handleVoSignatureSave}
                  onCancel={() => setSigningVoId(null)}
                />
              </div>
            ) : null}

            {history.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--muted)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '6px' }}>📋</div>
                <b>No consents or verbal orders recorded yet for this patient.</b>
                <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                  Click <b>"✍️ Sign New Consent / DNR"</b> to create the first clinical authorization.
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {history.map((c) => {
                  const isApproved = c.status === 'approved';
                  const isRejected = c.status === 'rejected';
                  const isPendingSign = c.status === 'pending_consent_sign';
                  const isPendingApproval = c.status === 'pending_approval' || (!c.status && c.signature_data);

                  return (
                    <div
                      key={c.id}
                      style={{
                        border: isApproved ? '1.5px solid #86efac' : (isPendingSign ? '2px solid #f87171' : '1px solid #cbd5e1'),
                        background: isApproved ? '#f0fdf4' : (isPendingSign ? '#fff5f5' : '#fff'),
                        borderRadius: '10px',
                        padding: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '6px' }}>
                        <div>
                          <b style={{ color: '#0d3a54', fontSize: '0.92rem' }}>{c.procedure_name}</b>
                          {c.is_dnr === 1 && (
                            <span style={{ marginLeft: '6px', background: '#fef2f2', color: '#b91c1c', border: '1px solid #f87171', fontSize: '0.7rem', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                              🕊️ DNR DIRECTIVE
                            </span>
                          )}
                          {c.is_verbal_order === 1 && (
                            <span style={{ marginLeft: '6px', background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', fontSize: '0.7rem', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                              ⚡ VERBAL ORDER
                            </span>
                          )}
                        </div>

                        {/* Status Badge */}
                        <div>
                          {isApproved && (
                            <span style={{ background: '#dcfce7', color: '#15803d', border: '1px solid #86efac', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '6px', fontWeight: 800 }}>
                              🟢 VALID &amp; APPROVED
                            </span>
                          )}
                          {isPendingApproval && (
                            <span style={{ background: '#fef9c3', color: '#854d0e', border: '1px solid #fde047', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '6px', fontWeight: 800 }}>
                              🟡 PENDING REVIEW &amp; AUTHORIZATION
                            </span>
                          )}
                          {isPendingSign && (
                            <span style={{ background: '#fee2e2', color: '#991b1b', border: '1.5px solid #f87171', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '6px', fontWeight: 800 }}>
                              🚨 VERBAL ORDER · PENDING WRITTEN SIGNATURE
                            </span>
                          )}
                          {isRejected && (
                            <span style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '6px', fontWeight: 800 }}>
                              🔴 REJECTED
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content details */}
                      <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '6px', lineHeight: 1.4 }}>
                        {c.signee_name ? (
                          <div>
                            Signee: <b>{c.signee_name}</b> ({c.relationship}) · IC: {c.signee_ic || '—'} · Witness: {c.witness_name || 'Nurse'} · Date: {when(c.signed_at)}
                          </div>
                        ) : (
                          <div style={{ color: '#b91c1c', fontWeight: 600 }}>
                            ⚡ Verbal Order given by: <b>{c.verbal_order_dr || c.doctor_name || 'Doctor'}</b> on {when(c.verbal_order_at || c.signed_at)} · Reason: “{c.verbal_order_notes || 'Emergency care'}”
                          </div>
                        )}

                        {c.doctor_name && c.signee_name && (
                          <div>Attending Doctor: <b>{c.doctor_name}</b> {c.doctor_mmc ? `(${c.doctor_mmc})` : ''}</div>
                        )}

                        {/* Reviewer / Approval Stamp */}
                        {isApproved && (
                          <div style={{ marginTop: '4px', color: '#166534', fontWeight: 700 }}>
                            ✓ Authorized by: {c.reviewer_name} ({c.reviewer_role}) on {when(c.reviewed_at)} {c.review_notes ? `· “${c.review_notes}”` : ''}
                          </div>
                        )}
                      </div>

                      {/* Signature Thumbnail */}
                      {c.signature_data && (
                        <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Signature:</span>
                          <img
                            src={c.signature_data}
                            alt="Signature"
                            style={{ height: '28px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '2px' }}
                          />
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {isPendingSign && (
                          <button
                            className="pri xs"
                            onClick={() => { setSigningVoId(c.id); setSigningVoTitle(c.procedure_name); }}
                            style={{ fontWeight: 800 }}
                          >
                            ✍️ Sign Written Consent Form
                          </button>
                        )}

                        {canApprove && (isPendingApproval || isPendingSign) && (
                          <>
                            <button
                              className="pri xs"
                              disabled={busy}
                              onClick={() => reviewConsent(c.id, 'approve')}
                              style={{ fontWeight: 800, background: '#16a34a', borderColor: '#16a34a' }}
                            >
                              ✅ Grant Approval (核准生效)
                            </button>
                            <button
                              className="danger xs"
                              disabled={busy}
                              onClick={() => reviewConsent(c.id, 'reject')}
                              style={{ fontWeight: 700 }}
                            >
                              ✕ Reject (驳回)
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
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

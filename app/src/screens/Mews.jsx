// Hosts the cloud-synced MEWS chart (public/mews.html) for one case.
// The chart runs in an iframe on the same origin, so it shares the session
// cookie and reads/writes /api/mews/:caseId itself.
export default function Mews({ caseObj, onBack }) {
  const diagnosis = caseObj.dx || caseObj.medical_history || caseObj.case_brief || caseObj.notes || '';
  const remarks = [
    caseObj.allergies ? `Allergies: ${caseObj.allergies}` : '',
    caseObj.things_to_aware ? `Note: ${caseObj.things_to_aware}` : '',
  ].filter(Boolean).join(' · ');

  const q = new URLSearchParams({
    case: caseObj.id,
    name: caseObj.name || caseObj.patient_name || '',
    ic: caseObj.ic || caseObj.nric || caseObj.patient_ic || '',
    room: caseObj.address || caseObj.patient_address || '',
    dx: diagnosis,
    weight: caseObj.weight || caseObj.patient_weight || '',
    height: caseObj.height || caseObj.patient_height || '',
    remarks: remarks || caseObj.remarks || '',
    page: caseObj.page || '1',
  });
  const src = '/mews.html?' + q.toString();
  return (
    <div>
      <div className="case-subbar">
        <button className="case-back-btn" onClick={onBack}>
          <span>←</span> <b>Back to Cases</b>
        </button>
        <div className="case-subbar-info">
          <span className="case-patient-name">{caseObj.name || caseObj.patient_name || 'Patient'}</span>
          <span className="case-view-tag">📈 MEWS Chart</span>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <iframe
          title="MEWS chart"
          src={src}
          style={{ width: '100%', height: 'calc(100vh - 160px)', minHeight: 560, border: 0, display: 'block' }}
        />
      </div>
    </div>
  );
}

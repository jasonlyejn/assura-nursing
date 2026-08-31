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
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderBottom: '1px solid #e2e8ef' }}>
        <button className="link" onClick={onBack}>← Back to cases</button>
        <b style={{ color: '#0C3054' }}>MEWS chart · {caseObj.name}</b>
      </div>
      <iframe
        title="MEWS chart"
        src={src}
        style={{ width: '100%', height: 'calc(100vh - 150px)', minHeight: 520, border: 0, display: 'block' }}
      />
    </div>
  );
}

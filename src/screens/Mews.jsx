// Hosts the cloud-synced MEWS chart (public/mews.html) for one case.
// The chart runs in an iframe on the same origin, so it shares the session
// cookie and reads/writes /api/mews/:caseId itself.
export default function Mews({ caseObj, onBack }) {
  const q = new URLSearchParams({
    case: caseObj.id,
    name: caseObj.name || '',
    ic: caseObj.ic || caseObj.nric || '',
    room: caseObj.address || '',
    dx: caseObj.notes || '',
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

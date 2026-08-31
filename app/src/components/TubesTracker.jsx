import { useEffect, useState } from 'react';

const TUBE_TYPES = [
  ['ryles_tube', '🥢 NG / Ryles Feeding Tube (鼻胃管)'],
  ['foley_catheter', '🚽 Foley Urinary Catheter (导尿管)'],
  ['tracheostomy', '🫁 Tracheostomy Tube (气管切开套管)'],
  ['peg_tube', '🍲 PEG Gastrostomy Tube (胃造瘘管)'],
  ['stoma_wafer', '🩹 Stoma Colostomy Wafer (造口袋底盘)'],
  ['picc_line', '💉 PICC / Central Line (中心静脉导管)'],
  ['wound_drain', '🩸 Wound Drain / Jackson-Pratt (引流管)'],
  ['other', '📋 Other Line / Catheter (其他管路)'],
];

export default function TubesTracker({ caseId, patientName, me }) {
  const [tubes, setTubes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLog, setShowLog] = useState(false);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const [form, setForm] = useState({
    tube_type: 'foley_catheter',
    brand_size: 'Silicone Fr 16 (Balloon 10ml)',
    insertion_date: new Date().toISOString().split('T')[0],
    due_date: '',
    insertion_notes: '',
  });

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3000); };

  async function load() {
    try {
      const res = await fetch(`/api/tubes?case_id=${encodeURIComponent(caseId)}`, { credentials: 'same-origin' });
      const text = await res.text().catch(() => '');
      let data = {};
      try { data = text ? JSON.parse(text) : {}; } catch (_) {}
      setTubes(data.tubes || []);
    } catch {} finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [caseId]);

  function getDaysUntil(dateStr) {
    if (!dateStr) return 0;
    const diff = new Date(dateStr + 'T00:00:00') - new Date(new Date().toISOString().split('T')[0] + 'T00:00:00');
    return Math.round(diff / 86400000);
  }

  async function submitTube() {
    setBusy(true);
    try {
      const res = await fetch('/api/tubes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ case_id: caseId, ...form }),
      });
      const text = await res.text().catch(() => '');
      let data = {};
      try { data = text ? JSON.parse(text) : {}; } catch (_) {
        data = { error: `Server error (${res.status}): ${text.slice(0, 100) || res.statusText || 'Unable to process'}` };
      }
      if (!res.ok) throw new Error(data.error || 'Failed to log tube insertion');

      flash('✓ Tube replacement logged. Due date tracked.');
      setShowLog(false);
      await load();
    } catch (e) {
      flash(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function markRemoved(id) {
    if (!confirm('Mark this tube as removed / discontinued?')) return;
    try {
      await fetch('/api/tubes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ id, status: 'removed' }),
      });
      flash('Tube marked as removed.');
      await load();
    } catch (e) { flash(e.message); }
  }

  const activeTubes = tubes.filter((t) => t.status === 'active');

  return (
    <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '12px', marginTop: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
        <b style={{ color: '#0d3a54', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>🩻</span> Active Tubes &amp; Lines in-situ (体内管路与更换周期)
        </b>
        <button className="pri xs" onClick={() => setShowLog(!showLog)} style={{ fontWeight: 700 }}>
          {showLog ? '✕ Cancel' : '＋ 🔄 Log Tube Replacement'}
        </button>
      </div>

      {status && <p className="status" style={{ margin: '6px 0' }}>{status}</p>}

      {/* LOG FORM */}
      {showLog && (
        <div style={{ background: '#fff', border: '1.5px solid var(--blue)', borderRadius: '8px', padding: '12px', margin: '10px 0' }}>
          <h4 style={{ margin: '0 0 8px', color: '#0d3a54' }}>Log New / Replaced Tube</h4>
          <div className="grid2">
            <div className="f"><label>Tube Type</label>
              <select value={form.tube_type} onChange={(e) => setForm({ ...form, tube_type: e.target.value })}>
                {TUBE_TYPES.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
              </select></div>
            <div className="f"><label>Brand &amp; French Size</label>
              <input value={form.brand_size} placeholder="e.g. Silicone Fr 16 / Balloon 10ml"
                onChange={(e) => setForm({ ...form, brand_size: e.target.value })} /></div>
            <div className="f"><label>Insertion Date</label>
              <input type="date" value={form.insertion_date}
                onChange={(e) => setForm({ ...form, insertion_date: e.target.value })} /></div>
            <div className="f"><label>Next Change Due Date (Optional auto-calc)</label>
              <input type="date" value={form.due_date} placeholder="Leave blank to auto-calculate"
                onChange={(e) => setForm({ ...form, due_date: e.target.value })} /></div>
          </div>
          <div className="f"><label>Clinical Notes / Observation</label>
            <input value={form.insertion_notes} placeholder="e.g. Smooth insertion on first attempt. Urine clear yellow."
              onChange={(e) => setForm({ ...form, insertion_notes: e.target.value })} /></div>
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button className="ghost sm" onClick={() => setShowLog(false)}>Cancel</button>
            <button className="pri sm" onClick={submitTube} disabled={busy}>💾 Save Tube Record</button>
          </div>
        </div>
      )}

      {/* ACTIVE TUBES LIST */}
      {loading ? (
        <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '6px' }}>Loading tubes…</div>
      ) : activeTubes.length === 0 ? (
        <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '6px', fontStyle: 'italic' }}>
          No active tubes or catheters logged. Tap "＋ 🔄 Log Tube Replacement" above.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
          {activeTubes.map((t) => {
            const daysLeft = getDaysUntil(t.due_date);
            const isOverdue = daysLeft < 0;
            const isDueSoon = daysLeft <= 3 && daysLeft >= 0;
            const badgeColor = isOverdue ? '#dc2626' : isDueSoon ? '#d97706' : '#16a34a';

            return (
              <div
                key={t.id}
                style={{
                  background: isOverdue ? '#fef2f2' : isDueSoon ? '#fffbeb' : '#fff',
                  border: isOverdue ? '1.5px solid #f87171' : isDueSoon ? '1.5px solid #fcd34d' : '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '8px 10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '6px',
                }}
              >
                <div>
                  <b style={{ color: '#0d3a54', fontSize: '0.86rem' }}>
                    {(TUBE_TYPES.find((x) => x[0] === t.tube_type) || [])[1] || t.tube_type}
                  </b>
                  <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '2px' }}>
                    Size: <b>{t.brand_size}</b> · Inserted on <b>{t.insertion_date}</b> by {t.inserted_by_name || 'Staff'}
                  </div>
                  {t.insertion_notes && (
                    <div style={{ fontSize: '0.74rem', color: 'var(--muted)', marginTop: '2px' }}>
                      💬 {t.insertion_notes}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>Next Change Due</div>
                    <b style={{ color: badgeColor, fontSize: '0.86rem' }}>
                      {t.due_date} ({isOverdue ? `⚠️ ${Math.abs(daysLeft)}d OVERDUE` : daysLeft === 0 ? '⚠️ DUE TODAY' : `${daysLeft} days left`})
                    </b>
                  </div>
                  <button className="danger xs" onClick={() => markRemoved(t.id)} title="Mark removed">
                    ✕ Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

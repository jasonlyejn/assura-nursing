import { useState, useEffect } from 'react';
import { api } from '../api.js';

export default function WoundCare({ caseObj, me, onBack }) {
  const [wounds, setWounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState('');

  const [form, setForm] = useState({
    wound_type: 'Pressure Injury (Bedsore)',
    location: 'Sacrum',
    stage: 'Stage 2 (Partial thickness)',
    length_cm: '',
    width_cm: '',
    depth_cm: '',
    exudate: 'Small (Serous)',
    granulation_pct: 70,
    slough_pct: 20,
    necrotic_pct: 0,
    epithelial_pct: 10,
    dressing_used: 'Hydrogel + Foam Dressing',
    notes: '',
    photo_data: '',
  });

  async function load() {
    try {
      setLoading(true);
      const d = await api.getWounds(caseObj.id);
      setWounds(d.wounds || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [caseObj.id]);

  function handlePhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      // Compress/resize image in canvas
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 800;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
        setForm((prev) => ({ ...prev, photo_data: dataUrl }));
      };
      img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  }

  async function submitWound(e) {
    e.preventDefault();
    setSubmitting(true);
    setErr('');
    try {
      await api.addWound(caseObj.id, form);
      setAdding(false);
      setForm({
        wound_type: 'Pressure Injury (Bedsore)',
        location: 'Sacrum',
        stage: 'Stage 2 (Partial thickness)',
        length_cm: '',
        width_cm: '',
        depth_cm: '',
        exudate: 'Small (Serous)',
        granulation_pct: 70,
        slough_pct: 20,
        necrotic_pct: 0,
        epithelial_pct: 10,
        dressing_used: 'Hydrogel + Foam Dressing',
        notes: '',
        photo_data: '',
      });
      await load();
    } catch (e) {
      setErr(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="case-subbar">
        <button className="case-back-btn" onClick={onBack}>
          <span>←</span> <b>Back to Cases</b>
        </button>
        <div className="case-subbar-info">
          <span className="case-patient-name">{caseObj.patient_name || caseObj.name || 'Patient'}</span>
          <span className="case-view-tag">🩹 Wound Care</span>
        </div>
      </div>

      <div className="card">
        <div className="head-row" style={{ marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h2 style={{ margin: 0 }}>🩹 Wound Assessment &amp; Photo Timeline</h2>
            <div className="muted" style={{ fontSize: '0.84rem', marginTop: '2px' }}>
              Patient: <b>{caseObj.patient_name || caseObj.name}</b> · Case #{caseObj.case_no || caseObj.id}
            </div>
          </div>
          <button
            className="pri sm"
            onClick={() => setAdding(!adding)}
            style={{ margin: 0 }}
          >
            {adding ? '✕ Cancel' : '➕ New Assessment'}
          </button>
        </div>

      {err && <div className="err" style={{ marginBottom: '10px' }}>{err}</div>}

      {adding && (
        <form className="form" onSubmit={submitWound} style={{ background: '#fcfdff', borderColor: '#b5d5f5' }}>
          <h3 style={{ marginTop: 0, color: 'var(--navy)', fontSize: '1.05rem' }}>
            Record Clinical Wound Staging & Photo
          </h3>

          <div className="grid2">
            <div className="f">
              <label>Wound Type</label>
              <select
                value={form.wound_type}
                onChange={(e) => setForm({ ...form, wound_type: e.target.value })}
                required
              >
                <option>Pressure Injury (Bedsore)</option>
                <option>Diabetic Foot Ulcer</option>
                <option>Surgical Incision / Dehiscence</option>
                <option>Venous Leg Ulcer</option>
                <option>Arterial Ulcer</option>
                <option>Skin Tear / Laceration</option>
                <option>Burn Wound</option>
                <option>Other / Complex Wound</option>
              </select>
            </div>

            <div className="f">
              <label>Anatomical Location</label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Sacrum, Right Heel, Left Shin"
                required
              />
            </div>
          </div>

          <div className="grid2">
            <div className="f">
              <label>Wound Stage / Classification</label>
              <select
                value={form.stage}
                onChange={(e) => setForm({ ...form, stage: e.target.value })}
                required
              >
                <option>Stage 1 (Non-blanchable erythema)</option>
                <option>Stage 2 (Partial thickness skin loss)</option>
                <option>Stage 3 (Full thickness skin loss)</option>
                <option>Stage 4 (Full thickness tissue loss to bone/muscle)</option>
                <option>Unstageable (Covered by slough/eschar)</option>
                <option>Deep Tissue Pressure Injury</option>
                <option>Clean Surgical Healing (Primary Intention)</option>
              </select>
            </div>

            <div className="f">
              <label>Exudate / Drainage</label>
              <select
                value={form.exudate}
                onChange={(e) => setForm({ ...form, exudate: e.target.value })}
              >
                <option>None (Dry)</option>
                <option>Scant / Minimal</option>
                <option>Small (Serous)</option>
                <option>Moderate (Hemoserous)</option>
                <option>Heavy / Copious (Purulent)</option>
              </select>
            </div>
          </div>

          <div className="f">
            <label>Dimensions (Length × Width × Depth in cm)</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <input
                type="number"
                step="0.1"
                placeholder="Length (cm)"
                value={form.length_cm}
                onChange={(e) => setForm({ ...form, length_cm: e.target.value })}
              />
              <input
                type="number"
                step="0.1"
                placeholder="Width (cm)"
                value={form.width_cm}
                onChange={(e) => setForm({ ...form, width_cm: e.target.value })}
              />
              <input
                type="number"
                step="0.1"
                placeholder="Depth (cm)"
                value={form.depth_cm}
                onChange={(e) => setForm({ ...form, depth_cm: e.target.value })}
              />
            </div>
          </div>

          <div className="f">
            <label>Wound Bed Tissue Composition (%)</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', fontSize: '0.76rem' }}>
              <div>
                <span style={{ color: '#b42318', fontWeight: 700 }}>Granulation %</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.granulation_pct}
                  onChange={(e) => setForm({ ...form, granulation_pct: e.target.value })}
                />
              </div>
              <div>
                <span style={{ color: '#c8891b', fontWeight: 700 }}>Slough %</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.slough_pct}
                  onChange={(e) => setForm({ ...form, slough_pct: e.target.value })}
                />
              </div>
              <div>
                <span style={{ color: '#111', fontWeight: 700 }}>Necrotic/Black %</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.necrotic_pct}
                  onChange={(e) => setForm({ ...form, necrotic_pct: e.target.value })}
                />
              </div>
              <div>
                <span style={{ color: '#0a7f4f', fontWeight: 700 }}>Epithelial %</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.epithelial_pct}
                  onChange={(e) => setForm({ ...form, epithelial_pct: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="f">
            <label>📸 Wound Photo (Camera / Gallery Upload)</label>
            <input type="file" accept="image/*" capture="environment" onChange={handlePhoto} />
            {form.photo_data && (
              <div style={{ marginTop: '8px' }}>
                <img
                  src={form.photo_data}
                  alt="Wound preview"
                  style={{ maxHeight: '180px', borderRadius: '8px', border: '1px solid var(--line)' }}
                />
              </div>
            )}
          </div>

          <div className="f">
            <label>Dressing & Treatment Applied</label>
            <input
              value={form.dressing_used}
              onChange={(e) => setForm({ ...form, dressing_used: e.target.value })}
              placeholder="e.g. Normal saline wash, Silver sulfadiazine, Aquacel Ag, Duoderm"
            />
          </div>

          <div className="f">
            <label>Clinical Notes & Observations</label>
            <textarea
              rows="2"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Signs of infection, odor, periwound maceration, patient pain level..."
            />
          </div>

          <button className="pri" type="submit" disabled={submitting}>
            {submitting ? 'Saving Assessment…' : '✓ Save Wound Assessment'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="center muted">Loading wound records…</div>
      ) : wounds.length === 0 ? (
        <div className="empty">
          <span style={{ fontSize: '2.4rem', display: 'block', marginBottom: '8px' }}>🩹</span>
          <b>No wound assessments recorded yet.</b>
          <p className="muted small">Tap "New Assessment" to photograph and stage the patient's wound.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {wounds.map((w, idx) => {
            const area =
              w.length_cm && w.width_cm ? (Number(w.length_cm) * Number(w.width_cm)).toFixed(1) : null;
            return (
              <div
                key={w.id}
                className="rec"
                style={{
                  borderLeft: '4px solid var(--blue)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <span style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--navy)' }}>
                      {w.wound_type} · {w.location}
                    </span>
                    <span
                      style={{
                        marginLeft: '8px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: '#eef6ff',
                        color: 'var(--blue-dark)',
                        padding: '2px 8px',
                        borderRadius: '999px',
                      }}
                    >
                      {w.stage}
                    </span>
                    <div className="muted" style={{ fontSize: '0.76rem', marginTop: '2px' }}>
                      Assessed on {new Date(w.assessed_at).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} by <b>{w.staff_name}</b>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: w.photo_data ? '140px 1fr' : '1fr', gap: '14px', marginTop: '12px' }}>
                  {w.photo_data && (
                    <div>
                      <img
                        src={w.photo_data}
                        alt="Wound"
                        style={{
                          width: '100%',
                          height: '140px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '1px solid var(--line)',
                        }}
                      />
                    </div>
                  )}

                  <div style={{ fontSize: '0.82rem', lineHeight: '1.5' }}>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                      {(w.length_cm > 0 || w.width_cm > 0) && (
                        <div>
                          <span className="muted">Size: </span>
                          <b>{w.length_cm} × {w.width_cm} {w.depth_cm ? `× ${w.depth_cm}` : ''} cm</b>
                          {area && <span className="muted"> ({area} cm²)</span>}
                        </div>
                      )}
                      <div>
                        <span className="muted">Exudate: </span>
                        <b>{w.exudate}</b>
                      </div>
                    </div>

                    <div style={{ marginBottom: '6px' }}>
                      <span className="muted">Bed: </span>
                      <span style={{ color: '#b42318' }}>Granulation {w.granulation_pct}%</span> ·{' '}
                      <span style={{ color: '#c8891b' }}>Slough {w.slough_pct}%</span> ·{' '}
                      <span style={{ color: '#111' }}>Necrotic {w.necrotic_pct}%</span> ·{' '}
                      <span style={{ color: '#0a7f4f' }}>Epithelial {w.epithelial_pct}%</span>
                    </div>

                    {w.dressing_used && (
                      <div style={{ marginBottom: '4px' }}>
                        <span className="muted">Dressing: </span>
                        <b>{w.dressing_used}</b>
                      </div>
                    )}

                    {w.notes && (
                      <div style={{ background: '#f8fafc', padding: '6px 10px', borderRadius: '6px', marginTop: '4px', fontStyle: 'italic' }}>
                        "{w.notes}"
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { itemIcon } from '../itemIcon.js';

const BASES = [
  ['procedure', 'per procedure 每次'],
  ['session', 'per session 每节'],
  ['hour', 'per hour 每小时'],
  ['tiered', '1st hr + /hr 首小时+续钟'],
  ['day', 'per day 每天'],
  ['week', 'per week 每周'],
];

const BRANDS = [
  'Terumo', 'Terumo Agani', 'BD', 'BD Venflon', 'BD Ultra-Fine', 'BD PosiFlush',
  'Mölnlycke Mepilex', 'ConvaTec Aquacel', 'ConvaTec Kaltostat', 'ConvaTec Duoderm',
  'ConvaTec Sur-Fit', 'Teleflex Rusch', '3M', '3M Tegaderm', '3M Micropore',
  '3M Transpore', '3M Coban', 'Smith & Nephew', 'B. Braun', 'Coloplast',
  'Coloplast SenSura', 'Coloplast Brava', 'Hollister', 'Accu-Chek', 'Ascensia Contour',
  'Ain Medicare', 'Urgo Medical', 'BSN Medical', 'Top Glove', 'Hartalega',
  'Ansell Gammex', 'Bode Sterillium', 'Betadine', 'CaviWipes / Clinell', 'Medtronic Shiley',
];

const UOMS = ['EACH', 'PACK', 'SET', 'BOTTLE', 'ROLL', 'TUBE', 'VIAL', 'TIN', 'PAIR', 'BOX', 'UNIT'];

export default function Rates() {
  const [tab, setTab] = useState('services');
  const [services, setServices] = useState(null);
  const [items, setItems] = useState(null);
  const [settings, setSettings] = useState(null);
  const [status, setStatus] = useState('');
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [bulkEdit, setBulkEdit] = useState(false);
  const [photoModalItem, setPhotoModalItem] = useState(null);
  const [nu, setNu] = useState({
    code: '', category: '', name: '', brand: '', size: '',
    uom: 'EACH', price: '', prepare_by: 'staff', order_ahead: false, spec: '',
  });

  const cats = [...new Set((items || []).map((i) => i.category || 'UNCATEGORISED'))].sort();
  const needle = q.trim().toLowerCase();
  const shown = (items || []).filter((i) =>
    (!cat || (i.category || 'UNCATEGORISED') === cat) &&
    (!needle || (i.code || '').toLowerCase().includes(needle)
             || (i.name || '').toLowerCase().includes(needle)
             || (i.brand || '').toLowerCase().includes(needle)
             || (i.size || '').toLowerCase().includes(needle)
             || (i.category || '').toLowerCase().includes(needle)));
  const groups = [...shown.reduce((m, i) => {
    const k = i.category || 'UNCATEGORISED';
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(i);
    return m;
  }, new Map())];

  // Compress to a small thumbnail so the database stays light.
  function compress(file) {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => {
        const im = new Image();
        im.onload = () => {
          const max = 300;
          const sc = Math.min(1, max / Math.max(im.width, im.height));
          const c = document.createElement('canvas');
          c.width = Math.round(im.width * sc); c.height = Math.round(im.height * sc);
          c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
          res(c.toDataURL('image/jpeg', 0.7));
        };
        im.onerror = rej; im.src = fr.result;
      };
      fr.onerror = rej; fr.readAsDataURL(file);
    });
  }

  function triggerFileInput(id, fromCamera = false) {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = 'image/*';
    if (fromCamera) {
      inp.capture = 'environment';
    }
    inp.onchange = async () => {
      const f = inp.files && inp.files[0];
      if (!f) return;
      try {
        const img = await compress(f);
        await api.putItemImage(id, img);
        setItems((s2) => s2.map((x) => (x.id === id ? { ...x, image: img } : x)));
        flash('✓ Item picture saved successfully');
        setPhotoModalItem(null);
      } catch (e) {
        flash('Could not save that photo');
      }
    };
    inp.click();
  }

  async function clearPhoto(id) {
    try {
      await api.putItemImage(id, null);
      setItems((s2) => s2.map((x) => (x.id === id ? { ...x, image: null } : x)));
      flash('Photo removed');
      setPhotoModalItem(null);
    } catch (e) { flash(e.message); }
  }

  async function addItem() {
    if (!nu.name.trim()) { flash('Item name is needed'); return; }
    try {
      await api.addItem(nu);
      const d = await api.getItems();
      setItems(d.items);
      setNu({ code: '', category: '', name: '', brand: '', size: '', uom: 'EACH', price: '', prepare_by: 'staff', order_ahead: false, spec: '' });
      setAdding(false);
      flash('✓ Item added');
    } catch (e) { flash(e.message); }
  }

  useEffect(() => {
    api.getServices().then((d) => setServices(d.services));
    api.getItems().then((d) => setItems(d.items));
    api.getSettings().then((d) => setSettings(d.settings));
  }, []);

  const flash = (msg) => { setStatus(msg); setTimeout(() => setStatus(''), 2500); };

  function setSvc(id, patch) {
    setServices((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }
  function setItem(id, patch) {
    setItems((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }

  async function saveServices() {
    try { await api.putServices(services); flash('✓ Services saved'); }
    catch (e) { flash(e.message); }
  }
  async function saveItems() {
    try { await api.putItems(items); flash('✓ All items, brands & sizes saved successfully'); }
    catch (e) { flash(e.message); }
  }
  async function saveSettings() {
    try { await api.putSettings(settings); flash('✓ Charges saved'); }
    catch (e) { flash(e.message); }
  }

  return (
    <div className="card">
      <h2>Rate card</h2>
      <p className="muted">Your prices, one place. Everything else in the app quotes and bills from here.</p>

      <div className="tabs">
        {[['services', 'Services'], ['items', 'Items'], ['charges', 'Charges']].map(([k, l]) => (
          <button key={k} className={'tab' + (tab === k ? ' on' : '')} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {status && <p className="status">{status}</p>}

      {/* Datalists for Quick Autocompletion */}
      <datalist id="brandlist">
        {BRANDS.map((b) => <option key={b} value={b} />)}
      </datalist>
      <datalist id="uomlist">
        {UOMS.map((u) => <option key={u} value={u} />)}
      </datalist>
      <datalist id="catlist">
        {cats.map((c) => <option key={c} value={c} />)}
      </datalist>

      {tab === 'services' && (services
        ? <>
            {services.map((s) => (
              <div className="row svc" key={s.id}>
                <div className="row-main">
                  <b>{s.name_en}</b><span className="zh">{s.name_zh}</span>
                </div>
                <label className="chk" title="Check if this rate is a starting rate / quoted upon assessment" style={{ fontSize: '0.78rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input type="checkbox" checked={!!s.plus} onChange={(e) => setSvc(s.id, { plus: e.target.checked ? 1 : 0 })} /> from/起
                </label>
                <select value={s.basis} onChange={(e) => setSvc(s.id, { basis: e.target.value })}>
                  {BASES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
                <span className="rm">RM</span>
                <input className="num" type="number" value={s.rate}
                  onChange={(e) => setSvc(s.id, { rate: e.target.value })} />
                {s.basis === 'tiered' && (
                  <input className="num" type="number" value={s.rate2} title="/hr after first hour"
                    onChange={(e) => setSvc(s.id, { rate2: e.target.value })} />
                )}
              </div>
            ))}
            <button className="pri" onClick={saveServices}>Save services</button>
          </>
        : <p className="muted">Loading…</p>)}

      {tab === 'items' && (items
        ? <>
            <p className="hint">
              Each item has an editable code, brand, size, unit and price. Tap <b>"✏️ Edit Brand &amp; Size"</b> to customize, or tap the picture to upload a product photo.
            </p>

            <div className="itembar" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '12px' }}>
              <input className="search" placeholder="🔍 Search code, name, brand or size…  e.g. Terumo / Mepilex / Fr16 / 21G"
                value={q} onChange={(e) => setQ(e.target.value)} style={{ flex: '1 1 200px' }} />
              <select value={cat} onChange={(e) => setCat(e.target.value)} style={{ flex: '0 0 auto' }}>
                <option value="">All categories ({items.length})</option>
                {cats.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <button
                className={bulkEdit ? 'pri sm' : 'ghost sm'}
                onClick={() => setBulkEdit(!bulkEdit)}
                style={{ flex: '0 0 auto', margin: 0 }}
              >
                {bulkEdit ? '✓ Done Editing Brands' : '✏️ Edit All Brands & Sizes'}
              </button>
              <button className="ghost sm" onClick={() => setAdding((v) => !v)} style={{ flex: '0 0 auto', margin: 0 }}>
                {adding ? 'Cancel' : '＋ New item'}
              </button>
            </div>

            {adding && (
              <div className="newitem" style={{ background: '#f8fafc', border: '1.5px solid var(--blue)', borderRadius: '12px', padding: '14px', marginBottom: '16px' }}>
                <h3 style={{ margin: '0 0 10px', fontSize: '1rem', color: 'var(--navy)' }}>＋ Add New Consumable Item</h3>
                <div className="grid3">
                  <div className="f"><label>Item code</label>
                    <input value={nu.code} placeholder="e.g. WND025"
                      onChange={(e) => setNu({ ...nu, code: e.target.value.toUpperCase() })} /></div>
                  <div className="f"><label>Category</label>
                    <input list="catlist" value={nu.category} placeholder="e.g. ADVANCED WOUND CARE"
                      onChange={(e) => setNu({ ...nu, category: e.target.value.toUpperCase() })} /></div>
                  <div className="f"><label>Unit (UOM)</label>
                    <input list="uomlist" value={nu.uom}
                      onChange={(e) => setNu({ ...nu, uom: e.target.value.toUpperCase() })} /></div>
                </div>
                <div className="f"><label>Item Name (English &amp; 中文)</label>
                  <input value={nu.name} placeholder="e.g. Aquacel Foam Adhesive 银离子泡沫敷料"
                    onChange={(e) => setNu({ ...nu, name: e.target.value })} /></div>
                <div className="grid2">
                  <div className="f"><label>Brand</label>
                    <input list="brandlist" value={nu.brand} placeholder="e.g. ConvaTec / Mölnlycke / Terumo"
                      onChange={(e) => setNu({ ...nu, brand: e.target.value })} /></div>
                  <div className="f"><label>Size / French / Gauge</label>
                    <input value={nu.size} placeholder="e.g. 10x10cm / Fr16 / 21G / 500ml"
                      onChange={(e) => setNu({ ...nu, size: e.target.value })} /></div>
                </div>
                <div className="f"><label>Clinical Specification / Notes (Optional)</label>
                  <input value={nu.spec} placeholder="e.g. For exuding wounds, antibacterial barrier"
                    onChange={(e) => setNu({ ...nu, spec: e.target.value })} /></div>
                <div className="grid3">
                  <div className="f"><label>Price (RM)</label>
                    <input type="number" value={nu.price} placeholder="0.00"
                      onChange={(e) => setNu({ ...nu, price: e.target.value })} /></div>
                  <div className="f"><label>Supplied by</label>
                    <select value={nu.prepare_by}
                      onChange={(e) => setNu({ ...nu, prepare_by: e.target.value })}>
                      <option value="staff">Staff</option><option value="family">Family</option>
                    </select></div>
                  <div className="f"><label>Order ahead</label>
                    <select value={nu.order_ahead ? '1' : '0'}
                      onChange={(e) => setNu({ ...nu, order_ahead: e.target.value === '1' })}>
                      <option value="0">No</option><option value="1">Yes</option>
                    </select></div>
                </div>
                <button className="pri wide" onClick={addItem}>Add item to catalog</button>
              </div>
            )}

            {shown.length === 0 && <p className="muted">No item matches that.</p>}

            {groups.map(([g, list]) => (
              <div key={g} style={{ marginBottom: '18px' }}>
                <div className="catrow" style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--blue-dark)', borderBottom: '2px solid var(--line)', paddingBottom: '4px', marginBottom: '8px' }}>
                  {g} <span>({list.length})</span>
                </div>
                {list.map((it) => {
                  const isEditing = editingId === it.id || bulkEdit;
                  return (
                    <div className={'item-card' + (it.active === 0 ? ' off' : '')} key={it.id}>
                      {/* Top Row: Thumbnail + Code + Name + Edit Toggle */}
                      <div className="item-head">
                        <div className="item-thumb-wrap">
                          <button className="pic-btn" title={it.image ? 'Change photo (Camera / Album)' : 'Add photo (Camera / Album)'}
                            onClick={() => setPhotoModalItem(it)}>
                            {it.image
                              ? <img src={it.image} alt="" className="item-img" />
                              : <span className="ico" dangerouslySetInnerHTML={{ __html: itemIcon(it) }} />}
                            <span className="cam-badge">{it.image ? '↻' : '＋'}</span>
                          </button>
                          {it.image && <button className="rmpic-btn" title="Remove photo"
                            onClick={() => clearPhoto(it.id)}>✕</button>}
                        </div>
                        
                        <div className="item-info">
                          <div className="item-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                              <span className="item-code">{it.code || '—'}</span>
                              {!isEditing ? (
                                <b className="item-name" style={{ marginLeft: '6px' }}>{it.name}</b>
                              ) : (
                                <input
                                  value={it.name}
                                  onChange={(e) => setItem(it.id, { name: e.target.value })}
                                  style={{ marginTop: '4px', width: '100%', fontSize: '0.88rem', fontWeight: 700 }}
                                  placeholder="Item Name"
                                />
                              )}
                            </div>
                            {!bulkEdit && (
                              <button
                                className="link xs"
                                onClick={() => setEditingId(editingId === it.id ? null : it.id)}
                                style={{ color: 'var(--blue)', fontWeight: 700, padding: '2px 6px', margin: 0 }}
                              >
                                {editingId === it.id ? '✓ Done' : '✏️ Edit'}
                              </button>
                            )}
                          </div>

                          {/* Brand & Size Chips (Display Mode) */}
                          {!isEditing ? (
                            <div className="item-chips">
                              {it.brand && (
                                <span className="chip-brand" title="Tap Edit to change brand">
                                  {it.brand}
                                </span>
                              )}
                              {it.size && (
                                <span className="chip-size" title="Tap Edit to change size">
                                  {it.size}
                                </span>
                              )}
                              {!it.brand && !it.size && (
                                <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontStyle: 'italic' }}>
                                  No brand/size specified (Tap ✏️ Edit)
                                </span>
                              )}
                            </div>
                          ) : (
                            /* Inline Brand & Size Inputs (Edit Mode) */
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '6px', marginTop: '6px' }}>
                              <div>
                                <label style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--muted)', display: 'block' }}>Brand (品牌)</label>
                                <input
                                  list="brandlist"
                                  value={it.brand || ''}
                                  placeholder="e.g. Terumo / 3M"
                                  onChange={(e) => setItem(it.id, { brand: e.target.value })}
                                  style={{ fontSize: '0.8rem', padding: '4px 6px' }}
                                />
                              </div>
                              <div>
                                <label style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--muted)', display: 'block' }}>Size (规格/尺寸)</label>
                                <input
                                  value={it.size || ''}
                                  placeholder="e.g. 10x10cm / Fr16"
                                  onChange={(e) => setItem(it.id, { size: e.target.value })}
                                  style={{ fontSize: '0.8rem', padding: '4px 6px' }}
                                />
                              </div>
                              <div>
                                <label style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--muted)', display: 'block' }}>Unit (单位)</label>
                                <input
                                  list="uomlist"
                                  value={it.uom || 'EACH'}
                                  onChange={(e) => setItem(it.id, { uom: e.target.value.toUpperCase() })}
                                  style={{ fontSize: '0.8rem', padding: '4px 6px' }}
                                />
                              </div>
                              <div>
                                <label style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--muted)', display: 'block' }}>Code (编号)</label>
                                <input
                                  value={it.code || ''}
                                  onChange={(e) => setItem(it.id, { code: e.target.value.toUpperCase() })}
                                  style={{ fontSize: '0.8rem', padding: '4px 6px' }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bottom Controls: Price, UOM, Supplied By, Checkboxes */}
                      <div className="item-controls">
                        <div className="price-box">
                          <span className="uom-tag">{it.uom || 'EACH'}</span>
                          <span className="rm-tag">RM</span>
                          <input className="price-input" type="number" step="0.5" value={it.price}
                            onChange={(e) => setItem(it.id, { price: e.target.value })} />
                        </div>
                        <div className="seg-compact">
                          <button className={it.prepare_by !== 'family' ? 'on' : ''}
                            onClick={() => setItem(it.id, { prepare_by: 'staff' })}>Staff</button>
                          <button className={it.prepare_by === 'family' ? 'on' : ''}
                            onClick={() => setItem(it.id, { prepare_by: 'family' })}>Family</button>
                        </div>
                        <div className="item-toggles">
                          <label className="chk-pill" title="Must be ordered / prepared before the visit">
                            <input type="checkbox" checked={!!it.order_ahead}
                              onChange={(e) => setItem(it.id, { order_ahead: e.target.checked })} />
                            <span>ahead</span>
                          </label>
                          <label className="chk-pill" title="Uncheck to hide from billing">
                            <input type="checkbox" checked={it.active !== 0}
                              onChange={(e) => setItem(it.id, { active: e.target.checked ? 1 : 0 })} />
                            <span>on</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            <button className="pri" onClick={saveItems} style={{ position: 'sticky', bottom: '12px', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
              💾 Save All Items, Brands &amp; Sizes
            </button>
          </>
        : <p className="muted">Loading…</p>)}

      {tab === 'charges' && (settings
        ? <>
            <div className="grid2">
              <Field label="Emergency call-out (RM)" k="emergency" s={settings} set={setSettings} />
              <Field label="After-hours (RM)" k="afterHours" s={settings} set={setSettings} />
              <Field label="Sunday / public holiday (RM)" k="publicHol" s={settings} set={setSettings} />
              <Field label="Free travel radius (km)" k="travelFreeKm" s={settings} set={setSettings} />
              <Field label="Travel beyond that (RM/km)" k="travelPerKm" s={settings} set={setSettings} />
            </div>
            <button className="pri" onClick={saveSettings}>Save charges</button>
          </>
        : <p className="muted">Loading…</p>)}

      {/* PHOTO PICKER MODAL (CAMERA OR ALBUM) */}
      {photoModalItem && (
        <div
          className="modal-backdrop"
          onClick={(e) => { if (e.target === e.currentTarget) setPhotoModalItem(null); }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 25, 45, 0.7)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 1200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            boxSizing: 'border-box',
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '400px',
              width: '100%',
              padding: '20px',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              margin: 'auto',
              background: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <b style={{ color: 'var(--navy)', fontSize: '1rem' }}>📷 Item Photo · {photoModalItem.name}</b>
              <button className="ghost" onClick={() => setPhotoModalItem(null)} style={{ fontSize: '16px', padding: '2px 8px' }}>✕</button>
            </div>

            {photoModalItem.image && (
              <div style={{ textAlign: 'center', marginBottom: '14px' }}>
                <img src={photoModalItem.image} alt="" style={{ height: '120px', width: '120px', objectFit: 'cover', borderRadius: '12px', border: '2px solid var(--line)' }} />
              </div>
            )}

            <p style={{ fontSize: '0.84rem', color: 'var(--muted)', margin: '0 0 16px', textAlign: 'center', lineHeight: 1.4 }}>
              Upload item packaging, box, or consumable picture for nurse visual reference during home visits.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                className="pri"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', fontWeight: 700, margin: 0 }}
                onClick={() => triggerFileInput(photoModalItem.id, false)}
              >
                🖼️ Choose from Photo Album / Gallery
              </button>

              <button
                className="sec"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', fontWeight: 700, background: '#f8fafc', border: '1.5px solid #cbd5e1', color: '#0d3a54', borderRadius: '10px', margin: 0 }}
                onClick={() => triggerFileInput(photoModalItem.id, true)}
              >
                📷 Take Photo with Camera
              </button>

              {photoModalItem.image && (
                <button
                  className="ghost"
                  style={{ color: '#dc2626', fontWeight: 700, marginTop: '4px', textAlign: 'center' }}
                  onClick={() => { clearPhoto(photoModalItem.id); setPhotoModalItem(null); }}
                >
                  🗑️ Remove Current Photo
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, k, s, set }) {
  return (
    <div className="f">
      <label>{label}</label>
      <input type="number" value={s[k] ?? ''}
        onChange={(e) => set({ ...s, [k]: e.target.value })} />
    </div>
  );
}

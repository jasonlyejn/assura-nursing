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

export default function Rates() {
  const [tab, setTab] = useState('services');
  const [services, setServices] = useState(null);
  const [items, setItems] = useState(null);
  const [settings, setSettings] = useState(null);
  const [status, setStatus] = useState('');
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [adding, setAdding] = useState(false);
  const [nu, setNu] = useState({ code: '', category: '', name: '', brand: '', size: '',
                                 uom: 'EACH', price: '', prepare_by: 'staff', order_ahead: false });

  const cats = [...new Set((items || []).map((i) => i.category || 'UNCATEGORISED'))].sort();
  const needle = q.trim().toLowerCase();
  const shown = (items || []).filter((i) =>
    (!cat || (i.category || 'UNCATEGORISED') === cat) &&
    (!needle || (i.code || '').toLowerCase().includes(needle)
             || (i.name || '').toLowerCase().includes(needle)
             || (i.brand || '').toLowerCase().includes(needle)
             || (i.size || '').toLowerCase().includes(needle)));
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
          const max = 200;
          const sc = Math.min(1, max / Math.max(im.width, im.height));
          const c = document.createElement('canvas');
          c.width = Math.round(im.width * sc); c.height = Math.round(im.height * sc);
          c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
          res(c.toDataURL('image/jpeg', 0.62));
        };
        im.onerror = rej; im.src = fr.result;
      };
      fr.onerror = rej; fr.readAsDataURL(file);
    });
  }

  async function pickPhoto(id) {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'image/*'; inp.capture = 'environment';
    inp.onchange = async () => {
      const f = inp.files && inp.files[0];
      if (!f) return;
      try {
        const img = await compress(f);
        await api.putItemImage(id, img);
        setItems((s2) => s2.map((x) => (x.id === id ? { ...x, image: img } : x)));
        flash('✓ Photo saved');
      } catch (e) { flash('Could not save that photo'); }
    };
    inp.click();
  }

  async function clearPhoto(id) {
    try {
      await api.putItemImage(id, null);
      setItems((s2) => s2.map((x) => (x.id === id ? { ...x, image: null } : x)));
      flash('Photo removed');
    } catch (e) { flash(e.message); }
  }

  async function addItem() {
    if (!nu.name.trim()) { flash('Item name is needed'); return; }
    try {
      await api.addItem(nu);
      const d = await api.getItems();
      setItems(d.items);
      setNu({ code: '', category: '', name: '', brand: '', size: '', uom: 'EACH', price: '', prepare_by: 'staff', order_ahead: false });
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
    try { await api.putItems(items); flash('✓ Items saved'); }
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

      {tab === 'services' && (services
        ? <>
            {services.map((s) => (
              <div className="row svc" key={s.id}>
                <div className="row-main">
                  <b>{s.name_en}</b><span className="zh">{s.name_zh}</span>
                </div>
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
            <p className="hint">Each item has a code, brand, size and unit. Search any of them. Prices are starting points — edit to match your supplier. Tap a picture to snap a photo of the real product.
               Family-supplied items are never charged.</p>

            <div className="itembar">
              <input className="search" placeholder="🔍 Search code, name, brand or size…  e.g. WND001 / Mepilex / Fr16"
                value={q} onChange={(e) => setQ(e.target.value)} />
              <select value={cat} onChange={(e) => setCat(e.target.value)}>
                <option value="">All categories ({items.length})</option>
                {cats.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <button className="ghost" onClick={() => setAdding((v) => !v)}>
                {adding ? 'Cancel' : '＋ New item'}</button>
            </div>

            {adding && (
              <div className="newitem">
                <div className="grid3">
                  <div className="f"><label>Item code</label>
                    <input value={nu.code} placeholder="e.g. WND012"
                      onChange={(e) => setNu({ ...nu, code: e.target.value.toUpperCase() })} /></div>
                  <div className="f"><label>Category</label>
                    <input list="catlist" value={nu.category} placeholder="e.g. WOUND CARE"
                      onChange={(e) => setNu({ ...nu, category: e.target.value.toUpperCase() })} />
                    <datalist id="catlist">{cats.map((c) => <option key={c} value={c} />)}</datalist></div>
                  <div className="f"><label>Unit</label>
                    <input list="uomlist" value={nu.uom}
                      onChange={(e) => setNu({ ...nu, uom: e.target.value.toUpperCase() })} />
                    <datalist id="uomlist">
                      {['EACH','PACK','SET','BOTTLE','ROLL','TUBE','VIAL','TIN','PAIR','BOX','UNIT']
                        .map((u) => <option key={u} value={u} />)}</datalist></div>
                </div>
                <div className="f"><label>Item name (English 中文)</label>
                  <input value={nu.name} placeholder="e.g. Silver dressing 银离子敷料"
                    onChange={(e) => setNu({ ...nu, name: e.target.value })} /></div>
                <div className="grid2">
                  <div className="f"><label>Brand (optional)</label>
                    <input value={nu.brand} placeholder="e.g. Mepilex"
                      onChange={(e) => setNu({ ...nu, brand: e.target.value })} /></div>
                  <div className="f"><label>Size (optional)</label>
                    <input value={nu.size} placeholder="e.g. 10x10cm / Fr16 / 22G"
                      onChange={(e) => setNu({ ...nu, size: e.target.value })} /></div>
                </div>
                <div className="grid3">
                  <div className="f"><label>Price (RM)</label>
                    <input type="number" value={nu.price}
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
                <button className="pri" onClick={addItem}>Add item</button>
              </div>
            )}

            {shown.length === 0 && <p className="muted">No item matches that.</p>}

            {groups.map(([g, list]) => (
              <div key={g}>
                <div className="catrow">{g} <span>({list.length})</span></div>
                {list.map((it) => (
                  <div className={'row item' + (it.active === 0 ? ' off' : '')} key={it.id}>
                    <button className="pic" title={it.image ? 'Change photo' : 'Add a photo of this item'}
                      onClick={() => pickPhoto(it.id)}>
                      {it.image
                        ? <img src={it.image} alt="" />
                        : <span className="ico" dangerouslySetInnerHTML={{ __html: itemIcon(it) }} />}
                      <span className="cam">{it.image ? '↻' : '＋'}</span>
                    </button>
                    {it.image && <button className="rmpic" title="Remove photo"
                      onClick={() => clearPhoto(it.id)}>✕</button>}
                    <span className="code">{it.code || '—'}</span>
                    <div className="row-main"><b>{it.name}</b>
                      <span className="meta">
                        {it.brand ? <em className="brand">{it.brand}</em> : null}
                        {it.size ? <em className="size">{it.size}</em> : null}
                      </span>
                      {it.spec ? <span className="spec">{it.spec}</span> : null}</div>
                    <span className="uom">{it.uom || 'EACH'}</span>
                    <span className="rm">RM</span>
                    <input className="num" type="number" value={it.price}
                      onChange={(e) => setItem(it.id, { price: e.target.value })} />
                    <div className="seg">
                      <button className={it.prepare_by !== 'family' ? 'on' : ''}
                        onClick={() => setItem(it.id, { prepare_by: 'staff' })}>Staff</button>
                      <button className={it.prepare_by === 'family' ? 'on' : ''}
                        onClick={() => setItem(it.id, { prepare_by: 'family' })}>Family</button>
                    </div>
                    <label className="chk" title="Must be ordered / prepared before the visit">
                      <input type="checkbox" checked={!!it.order_ahead}
                        onChange={(e) => setItem(it.id, { order_ahead: e.target.checked })} /> ahead
                    </label>
                    <label className="chk" title="Uncheck to hide from billing">
                      <input type="checkbox" checked={it.active !== 0}
                        onChange={(e) => setItem(it.id, { active: e.target.checked ? 1 : 0 })} /> on
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <button className="pri" onClick={saveItems}>Save items</button>
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
              <Field label="Long-term deposit (RM)" k="depositLongTerm" s={settings} set={setSettings} />
            </div>
            <button className="pri" onClick={saveSettings}>Save charges</button>
          </>
        : <p className="muted">Loading…</p>)}
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

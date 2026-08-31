import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { itemIcon } from '../itemIcon.js';

const UNIT = { procedure: 'visit', session: 'session', hour: 'hour', day: 'day',
               shift: 'shift', tiered: 'hour', week: 'week' };
const UNIT_ZH = { procedure: '次', session: '节', hour: '小时', day: '天',
                  shift: '班', tiered: '小时', week: '周' };

export default function Quote({ caseId, onBack, mode = 'quote' }) {
  const isInv = mode === 'invoice';
  const [c, setC] = useState(null);
  const [services, setServices] = useState([]);
  const [items, setItems] = useState([]);
  const [settings, setSettings] = useState({});
  const [past, setPast] = useState([]);
  const [picked, setPicked] = useState({});      // serviceId -> qty
  const [pickedItems, setPickedItems] = useState({});
  const [km, setKm] = useState('');
  const [surcharge, setSurcharge] = useState('');
  const [withDeposit, setWithDeposit] = useState(false);
  const [note, setNote] = useState('');
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [saved, setSaved] = useState(null);
  const [cycle, setCycle] = useState('visit');
  const [pFrom, setPFrom] = useState('');
  const [pTo, setPTo] = useState('');
  const [due, setDue] = useState('');

  useEffect(() => {
    api.getCase(caseId).then((d) => setC(d.case || d)).catch(() => {});
    api.getServices().then((d) => setServices((d.services || []).filter((s) => s.active !== 0)));
    api.getItems().then((d) => setItems((d.items || []).filter((i) => i.active !== 0)));
    api.getSettings().then((d) => setSettings(d.settings || {}));
    api.getQuotes(caseId).then((d) => setPast(d.quotes || [])).catch(() => {});
  }, [caseId]);

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 2600); };
  const num = (x) => Number(x) || 0;
  const money = (x) => 'RM' + (Math.round(num(x) * 100) / 100).toFixed(2);

  // ---- lines -------------------------------------------------------------
  const lines = [];
  services.forEach((s) => {
    const qty = num(picked[s.id]);
    if (!qty) return;
    if (s.basis === 'tiered') {
      lines.push({ label: s.name_en + ' — first hour', qty: 1, unit: 'hour',
                   rate: num(s.rate), amount: num(s.rate) });
      if (qty > 1) lines.push({ label: s.name_en + ' — additional', qty: qty - 1, unit: 'hour',
                                rate: num(s.rate2), amount: (qty - 1) * num(s.rate2) });
    } else {
      lines.push({ label: s.name_en + (s.plus ? ' (from)' : ''), qty, unit: UNIT[s.basis] || 'unit',
                   rate: num(s.rate), amount: qty * num(s.rate) });
    }
  });
  items.forEach((it) => {
    const qty = num(pickedItems[it.id]);
    if (!qty || it.prepare_by === 'family') return;
    lines.push({ label: it.name + (it.size ? ' (' + it.size + ')' : ''), qty,
                 unit: (it.uom || 'each').toLowerCase(), rate: num(it.price), amount: qty * num(it.price) });
  });

  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const freeKm = num(settings.travelFreeKm || 25);
  const perKm = num(settings.travelPerKm || 3);
  const extraKm = Math.max(0, num(km) - freeKm);
  const travel = Math.round(extraKm * perKm * 100) / 100;
  const dep = withDeposit ? num(settings.depositLongTerm || 500) : 0;
  const total = subtotal + travel + num(surcharge);
  const anyPlus = services.some((s) => s.plus && num(picked[s.id]));

  // ---- message -----------------------------------------------------------
  function buildMessage() {
    const name = (c && c.name) ? c.name : 'there';
    const L = [];
    L.push(`Hello ${name}, thank you for choosing Assura Nursing Care 🙏`);
    L.push('');
    L.push('Here is your care estimate:');
    L.push('');
    lines.forEach((l) => {
      L.push(`• ${l.label} — ${l.qty} ${l.unit}${l.qty > 1 ? 's' : ''} × RM${l.rate} = ${money(l.amount)}`);
    });
    if (travel > 0) L.push(`• Travel (${extraKm.toFixed(0)} km beyond ${freeKm} km) = ${money(travel)}`);
    if (num(surcharge) > 0) L.push(`• Additional charge = ${money(surcharge)}`);
    L.push('');
    L.push(`*Estimated total: ${money(total)}*`);
    if (dep > 0) L.push(`Refundable deposit: ${money(dep)}`);
    if (anyPlus) {
      L.push('');
      L.push('_Prices marked "from" are a starting rate and may vary with location and how much care is needed. We will confirm before we begin._');
      L.push('_标示「起」的价格会依地点与护理需求而调整，开始前我们会先确认。_');
    }
    if (note.trim()) { L.push(''); L.push(note.trim()); }
    L.push('');
    L.push('Reply *YES* to confirm and we will arrange your nurse or caregiver. 回复 *YES* 即可为您安排专业护士或护理人员。');
    L.push('');
    L.push('Assura Nursing Care · assuranursing.com');
    return L.join('\n');
  }

  async function saveInvoice() {
    if (!lines.length) { flash('Add at least one line first'); return; }
    try {
      const r = await api.createInvoice({
        case_id: caseId, lines, travel, discount: num(surcharge) < 0 ? -num(surcharge) : 0,
        cycle, period_from: pFrom, period_to: pTo, due_date: due, note: note.trim(),
      });
      flash('✓ Invoice ' + r.no + ' raised — ' + money(r.total));
      setTimeout(onBack, 1200);
    } catch (e) { flash(e.message); }
  }

  async function saveQuote() {
    if (!lines.length) { flash('Add at least one service first'); return; }
    try {
      const r = await api.createQuote({
        case_id: caseId, lines, travel, surcharge: num(surcharge),
        deposit: dep, note: note.trim(),
      });
      setSaved(r);
      const d = await api.getQuotes(caseId); setPast(d.quotes || []);
      flash('✓ Quote ' + r.no + ' saved');
      return r;
    } catch (e) { flash(e.message); }
  }

  async function sendWhatsApp() {
    const r = saved || await saveQuote();
    if (!r) return;
    const phone = String((c && c.phone) || '').replace(/[^0-9]/g, '')
      .replace(/^0/, '60');
    const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(buildMessage());
    window.open(url, '_blank', 'noopener');
    try { await api.setQuoteStatus(r.id, 'sent'); const d = await api.getQuotes(caseId); setPast(d.quotes || []); }
    catch (_) {}
  }

  async function markAccepted(id) {
    try {
      await api.setQuoteStatus(id, 'accepted');
      const d = await api.getQuotes(caseId); setPast(d.quotes || []);
      flash('✓ Quote accepted — case moved to Accepted');
    } catch (e) { flash(e.message); }
  }

  async function broadcastJob() {
    if (!c) return;
    const clientPay = total;
    const commPct = 20;
    const nurseWage = Math.round(clientPay * 0.8 * 100) / 100;
    const title = `${c.care_type === 'procedure' ? 'Procedure' : 'Home Care'} · ${c.name}`;
    const area = (c.address || '').split(',').slice(-2).join(', ').trim() || 'Penang';
    try {
      await api.createBroadcast({
        case_id: caseId,
        title,
        area,
        care_type: lines.map((l) => l.label).join(', ') || 'Home Nursing',
        schedule: isInv ? 'Active Care Schedule' : 'Quoted Schedule',
        client_payment: clientPay,
        commission_pct: commPct,
        custom_nurse_wage: nurseWage,
        notes: note || 'Follow clinical nursing SOP.',
      });
      flash(`✓ Broadcasted to team! Nurse Payout: RM ${nurseWage.toFixed(2)} (Client: RM ${clientPay.toFixed(2)} - 20% Comm)`);
    } catch (e) {
      flash(e.message);
    }
  }

  const needle = q.trim().toLowerCase();
  const itemHits = needle
    ? items.filter((i) => i.prepare_by !== 'family' &&
        ((i.code || '').toLowerCase().includes(needle) ||
         (i.name || '').toLowerCase().includes(needle) ||
         (i.brand || '').toLowerCase().includes(needle) ||
         (i.size || '').toLowerCase().includes(needle))).slice(0, 16)
    : [];

  return (
    <div className="card">
      <button className="link" onClick={onBack}>← Back</button>
      <h2>{isInv ? 'Invoice' : 'Quote'} {c ? '— ' + c.name : ''}</h2>
      <p className="muted">{isInv ? 'Tick what was actually done, then raise the invoice.' : 'Tick what the patient needs, then send it on WhatsApp.'}</p>
      {status && <p className="status">{status}</p>}

      <h3 className="qh">Services</h3>
      {services.map((s) => (
        <div className="row qrow" key={s.id}>
          <div className="row-main">
            <b>{s.name_en}</b> <span className="zh">{s.name_zh}</span>
            <span className="rate">
              {s.plus ? 'from ' : ''}RM{s.rate}/{UNIT_ZH[s.basis] || ''} {UNIT[s.basis]}
              {s.basis === 'tiered' ? ` then RM${s.rate2}/hr` : ''}
            </span>
          </div>
          <input className="num" type="number" min="0" placeholder="0"
            value={picked[s.id] || ''}
            onChange={(e) => setPicked({ ...picked, [s.id]: e.target.value })} />
        </div>
      ))}

      <h3 className="qh">Supplies & Consumables (optional)</h3>
      <input className="search" placeholder="🔍 Search item… e.g. Terumo, 30G, 16Fr, Silicone, Aquacel, Mepilex"
        value={q} onChange={(e) => setQ(e.target.value)} />
      {itemHits.map((it) => (
        <div className="row qrow" key={it.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {it.image ? (
            <img src={it.image} alt="" style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '6px', flex: '0 0 auto' }} />
          ) : (
            <span style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eef6ff', borderRadius: '6px', flex: '0 0 auto' }}
              dangerouslySetInnerHTML={{ __html: itemIcon(it) }} />
          )}
          <div className="row-main" style={{ flex: 1, minWidth: 0 }}>
            <b>{it.name}</b>
            <div className="meta" style={{ fontSize: '0.76rem', color: 'var(--muted)', display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
              {it.brand && <span style={{ color: 'var(--blue-dark)', fontWeight: 700 }}>{it.brand}</span>}
              {it.size && <span style={{ background: '#eaf2fb', color: '#0d3a54', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>{it.size}</span>}
              <span>RM{it.price} / {it.uom || 'EACH'}</span>
            </div>
          </div>
          <input className="num" type="number" min="0" placeholder="0"
            value={pickedItems[it.id] || ''}
            onChange={(e) => setPickedItems({ ...pickedItems, [it.id]: e.target.value })} />
        </div>
      ))}
      {Object.entries(pickedItems).filter(([, v]) => num(v) > 0).map(([id, v]) => {
        const it = items.find((x) => x.id === id); if (!it) return null;
        return <div className="row qrow chosen" key={'c' + id}>
          <div className="row-main">
            <b>{it.name}</b>
            <span className="rate">{it.size || it.brand || it.code} · RM{it.price} × {v} = {money(num(it.price) * num(v))}</span>
          </div>
          <input className="num" type="number" min="0"
            value={pickedItems[id] || ''}
            onChange={(e) => setPickedItems({ ...pickedItems, [id]: e.target.value })} />
        </div>;
      })}

      <h3 className="qh">Extras</h3>
      <div className="grid2">
        <div className="f"><label>Distance (km) — first {freeKm} km free</label>
          <input type="number" value={km} onChange={(e) => setKm(e.target.value)} placeholder="0" /></div>
        <div className="f"><label>Additional charge (RM)</label>
          <input type="number" value={surcharge} onChange={(e) => setSurcharge(e.target.value)}
            placeholder="after-hours / holiday" /></div>
      </div>
      <label className="chk"><input type="checkbox" checked={withDeposit}
        onChange={(e) => setWithDeposit(e.target.checked)} />
        Include long-term deposit (RM{settings.depositLongTerm || 500})</label>
      <div className="f"><label>Note to the client (optional)</label>
        <textarea rows="2" value={note} onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Nurse can start Monday morning." /></div>

      <div className="qtotal">
        {lines.map((l, i) => (
          <div className="qline" key={i}><span>{l.label} × {l.qty}</span><b>{money(l.amount)}</b></div>
        ))}
        {travel > 0 && <div className="qline"><span>Travel {extraKm.toFixed(0)} km</span><b>{money(travel)}</b></div>}
        {num(surcharge) > 0 && <div className="qline"><span>Additional</span><b>{money(surcharge)}</b></div>}
        <div className="qline grand"><span>Estimated total</span><b>{money(total)}</b></div>
        {dep > 0 && <div className="qline"><span>Deposit (refundable)</span><b>{money(dep)}</b></div>}
        {anyPlus && <p className="hint">Includes "from" rates — final price confirmed after assessment.</p>}
      </div>

      {isInv && (
        <div className="grid3">
          <div className="f"><label>Billing cycle</label>
            <select value={cycle} onChange={(e) => setCycle(e.target.value)}>
              <option value="visit">Per visit</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select></div>
          <div className="f"><label>Period from</label>
            <input type="date" value={pFrom} onChange={(e) => setPFrom(e.target.value)} /></div>
          <div className="f"><label>Period to</label>
            <input type="date" value={pTo} onChange={(e) => setPTo(e.target.value)} /></div>
        </div>
      )}
      {isInv && (
        <div className="f"><label>Payment due by</label>
          <input type="date" value={due} onChange={(e) => setDue(e.target.value)} /></div>
      )}

      <div className="qbtns">
        {isInv
          ? <button className="pri" onClick={saveInvoice} disabled={!lines.length}>
              💵 Raise invoice</button>
          : <>
              <button className="pri" onClick={sendWhatsApp} disabled={!lines.length}>
                💬 Send quote on WhatsApp</button>
              <button className="ghost" onClick={broadcastJob} disabled={!lines.length} title="Broadcast job notification to all nurses (80% wage / 20% company commission)">
                📢 Broadcast to Nurses (RM {(total * 0.8).toFixed(2)})
              </button>
              <button className="ghost" onClick={saveQuote} disabled={!lines.length}>Save only</button>
            </>}
      </div>

      {past.length > 0 && <>
        <h3 className="qh">Previous quotes</h3>
        {past.map((p) => (
          <div className="row qrow" key={p.id}>
            <div className="row-main"><b>{p.no}</b>
              <span className="rate">{money(p.total)} · {p.status}</span></div>
            {p.status !== 'accepted' &&
              <button className="ghost sm" onClick={() => markAccepted(p.id)}>Mark accepted</button>}
          </div>
        ))}
      </>}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { api } from '../api.js';

const METHODS = [
  ['duitnow', 'DuitNow'], ['transfer', 'Bank transfer'], ['cash', 'Cash'],
  ['ewallet', 'e-Wallet'], ['cheque', 'Cheque'], ['other', 'Other'],
];
const CYCLE = [['visit', 'Per visit'], ['weekly', 'Weekly'], ['monthly', 'Monthly']];
const money = (x) => 'RM' + (Math.round((Number(x) || 0) * 100) / 100).toFixed(2);

export default function Billing({ me }) {
  const [list, setList] = useState(null);
  const [sum, setSum] = useState({});
  const [filter, setFilter] = useState('owing');
  const [open, setOpen] = useState(null);      // invoice being viewed
  const [pay, setPay] = useState(null);        // payment form state
  const [settings, setSettings] = useState({});
  const [status, setStatus] = useState('');

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3200); };
  const load = () => api.getInvoices().then((d) => { setList(d.invoices || []); setSum(d.summary || {}); })
    .catch((e) => flash(e.message));
  useEffect(() => { load(); api.getSettings().then((d) => setSettings(d.settings || {})).catch(() => {}); }, []);

  const shown = (list || []).filter((i) =>
    filter === 'all' ? true
    : filter === 'owing' ? !['paid', 'void'].includes(i.status)
    : filter === 'paid' ? i.status === 'paid'
    : i.overdue);

  async function openInv(id) {
    try { const d = await api.getInvoice(id); setOpen(d); setPay(null); }
    catch (e) { flash(e.message); }
  }

  async function recordPayment() {
    try {
      await api.payInvoice(open.invoice.id, pay);
      flash('✓ Payment recorded');
      const d = await api.getInvoice(open.invoice.id);
      setOpen(d); setPay(null); load();
    } catch (e) { flash(e.message); }
  }

  function whatsappInvoice(inv) {
    const L = [];
    L.push(`*Assura Nursing Care — Invoice ${inv.no}*`);
    L.push(`Patient: ${inv.patient_name}`);
    if (inv.period_start) L.push(`Period: ${inv.period_start} – ${inv.period_end || inv.period_start}`);
    L.push('');
    (inv.lines || []).forEach((l) => {
      L.push(`• ${l.label} — ${l.qty} × RM${l.rate} = ${money(l.amount)}`);
    });
    if (inv.travel > 0) L.push(`• Travel = ${money(inv.travel)}`);
    if (inv.discount > 0) L.push(`• Discount = −${money(inv.discount)}`);
    L.push('');
    L.push(`*Total: ${money(inv.total)}*`);
    if (inv.paid > 0) {
      L.push(`Paid: ${money(inv.paid)}`);
      L.push(`*Balance: ${money(inv.total - inv.paid)}*`);
    }
    if (inv.due_date) L.push(`Please settle by ${inv.due_date}.`);
    L.push('');
    L.push('*How to pay 付款方式*');
    L.push(`${settings.bankName || 'UOB Bank'}  ${settings.bankAcc || '9003219654'}`);
    L.push(`(${settings.bankHolder || 'Ng Lye Tiam'})`);
    if (settings.tngAcc) L.push(`Touch 'n Go eWallet: ${settings.tngAcc}`);
    L.push('DuitNow QR also available — ask us for the QR code.');
    L.push('Cash accepted on the visit. 也可现金付款。');
    L.push('Kindly send the payment slip once done. 付款后请传收据，谢谢。');
    L.push('');
    L.push('Thank you for trusting us with your care. 感谢您的信任。');

    const phone = String(inv.patient_phone || '').replace(/[^0-9]/g, '').replace(/^0/, '60');
    window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(L.join('\n')), '_blank', 'noopener');
    api.markInvoiceSent(inv.id).then(load).catch(() => {});
  }

  // ---- one invoice ----
  if (open) {
    const inv = open.invoice;
    return (
      <div className="card">
        <button className="link" onClick={() => { setOpen(null); load(); }}>← All invoices</button>
        {status && <p className="status">{status}</p>}
        <div className="invhead">
          <div>
            <h2>{inv.no}</h2>
            <p className="muted">{inv.patient_name}
              {inv.period_start ? ' · ' + inv.period_start + ' – ' + (inv.period_end || inv.period_start) : ''}</p>
          </div>
          <span className={'istat ' + inv.status}>{inv.status}</span>
        </div>

        <table className="invtable">
          <tbody>
            {(inv.lines || []).map((l, i) => (
              <tr key={i}><td>{l.label}</td><td className="q">{l.qty} × RM{l.rate}</td>
                <td className="a">{money(l.amount)}</td></tr>
            ))}
            {inv.travel > 0 && <tr><td>Travel</td><td></td><td className="a">{money(inv.travel)}</td></tr>}
            {inv.discount > 0 && <tr><td>Discount</td><td></td><td className="a">−{money(inv.discount)}</td></tr>}
            <tr className="tot"><td>Total</td><td></td><td className="a">{money(inv.total)}</td></tr>
            {inv.paid > 0 && <tr><td>Paid</td><td></td><td className="a">−{money(inv.paid)}</td></tr>}
            {inv.balance > 0 && <tr className="bal"><td>Balance due</td><td></td>
              <td className="a">{money(inv.balance)}</td></tr>}
          </tbody>
        </table>

        {open.payments.length > 0 && (
          <>
            <h3 className="qh">Payments received</h3>
            {open.payments.map((p) => (
              <div className="hrow" key={p.id}>
                <div className="grow"><b>{money(p.amount)}</b>
                  <span className="sh">{(METHODS.find((m) => m[0] === p.method) || [, p.method])[1]}</span>
                  <div className="meta">{p.paid_on} · received by {p.received_name}
                    {p.ref ? ' · ref ' + p.ref : ''}</div></div>
              </div>
            ))}
          </>
        )}

        {inv.balance > 0 && inv.status !== 'void' && (
          !pay
            ? <button className="pri wide" onClick={() => setPay({ amount: inv.balance, method: 'duitnow', ref: '' })}>
                ＋ Record a payment</button>
            : <div className="hoform">
                <div className="grid2">
                  <div className="f"><label>Amount received (RM)</label>
                    <input type="number" step="0.01" value={pay.amount}
                      onChange={(e) => setPay({ ...pay, amount: e.target.value })} /></div>
                  <div className="f"><label>How they paid</label>
                    <select value={pay.method} onChange={(e) => setPay({ ...pay, method: e.target.value })}>
                      {METHODS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                    </select></div>
                </div>
                <div className="f"><label>Reference (optional)</label>
                  <input value={pay.ref} onChange={(e) => setPay({ ...pay, ref: e.target.value })}
                    placeholder="transaction no / slip" /></div>
                <div className="qbtns">
                  <button className="pri" onClick={recordPayment}>Save payment</button>
                  <button className="ghost" onClick={() => setPay(null)}>Cancel</button>
                </div>
              </div>
        )}

        <div className="payinfo">
          <h3 className="qh">How to pay 付款方式</h3>
          <div className="payrow">
            <div className="paytext">
              <div><b>{settings.bankName || 'UOB Bank'}</b> {settings.bankAcc || '9003219654'}</div>
              <div className="muted">{settings.bankHolder || 'Ng Lye Tiam'}</div>
              {settings.tngAcc && <div style={{ marginTop: 6 }}>
                <b>Touch 'n Go eWallet</b> {settings.tngAcc}</div>}
              <div className="muted" style={{ marginTop: 6 }}>
                Cash on the visit · DuitNow QR (scan) · bank transfer</div>
            </div>
            <img className="payqr" src={settings.payQr || '/pay-qr.jpg'} alt="DuitNow QR"
              onClick={() => window.open(settings.payQr || '/pay-qr.jpg', '_blank')} />
          </div>
        </div>

        <div className="qbtns">
          <button className="ghost" onClick={() => whatsappInvoice(inv)}>💬 Send on WhatsApp</button>
          <button className="ghost" onClick={() => window.print()}>🖨 Print</button>
        </div>
      </div>
    );
  }

  // ---- list ----
  return (
    <div className="card">
      <h2>Billing</h2>
      {status && <p className="status">{status}</p>}
      <div className="tiles4">
        <div className="dtile"><b>{money(sum.outstanding || 0)}</b><span>Outstanding</span></div>
        <div className={'dtile ' + (sum.overdue ? 'bad' : '')}><b>{money(sum.overdue || 0)}</b><span>Overdue</span></div>
        <div className="dtile"><b>{money(sum.thisMonth || 0)}</b><span>Invoiced this month</span></div>
        <div className="dtile"><b>{sum.count || 0}</b><span>Invoices</span></div>
      </div>

      <div className="tabs">
        {[['owing', 'Owing'], ['overdue', 'Overdue'], ['paid', 'Paid'], ['all', 'All']].map(([k, l]) => (
          <button key={k} className={filter === k ? 'on' : ''} onClick={() => setFilter(k)}>{l}</button>
        ))}
      </div>

      {list === null && <p className="muted">Loading…</p>}
      {list && shown.length === 0 && <p className="muted">Nothing here.</p>}
      {shown.map((i) => (
        <div className="rec" key={i.id}>
          <div className="rec-head">
            <div className="grow">
              <b>{i.no}</b> <span className={'istat ' + (i.overdue ? 'overdue' : i.status)}>
                {i.overdue ? 'overdue' : i.status}</span>
              <div className="meta">{i.patient_name}
                {i.due_date ? ' · due ' + i.due_date : ''}
                {i.cycle && i.cycle !== 'visit' ? ' · ' + i.cycle : ''}</div>
            </div>
            <div className="pbtns">
              <div className="amt">{money(i.balance > 0 ? i.balance : i.total)}
                {i.balance > 0 && i.paid > 0 ? <span>of {money(i.total)}</span> : null}</div>
              <button className="ghost sm" onClick={() => openInv(i.id)}>Open</button>
            </div>
          </div>
        </div>
      ))}

      <p className="hint">Invoices are raised from a case — open a case and choose 💵 Invoice.
        {settings.bankName ? '' : ' Tip: add your bank details in Rate card → Charges so they appear on every invoice.'}</p>
    </div>
  );
}

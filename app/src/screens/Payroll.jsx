import { useEffect, useState } from 'react';
import { api } from '../api.js';

export default function Payroll({ me }) {
  const [month, setMonth] = useState(getCurrentMonth());
  const [payrollData, setPayrollData] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [activePaySlip, setActivePaySlip] = useState(null);

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 3000); };

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/payroll?month=${month}${selectedStaffId ? '&staff_id=' + selectedStaffId : ''}`, { credentials: 'same-origin' });
      const text = await res.text().catch(() => '');
      let data = {};
      try { data = text ? JSON.parse(text) : {}; } catch (_) {
        data = { error: `Server error (${res.status}): ${text.slice(0, 100) || res.statusText || 'Unable to process'}` };
      }
      if (!res.ok) throw new Error(data.error || 'Failed to fetch payroll');
      setPayrollData(Array.isArray(data.payroll) ? data.payroll : [data.payroll].filter(Boolean));
    } catch (e) {
      flash(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [month, selectedStaffId]);

  function getCurrentMonth() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }

  const grandGross = payrollData.reduce((s, p) => s + (p.total_gross_revenue || 0), 0);
  const grandComm = payrollData.reduce((s, p) => s + (p.company_commission || 0), 0);
  const grandPayout = payrollData.reduce((s, p) => s + (p.net_nurse_payout || 0), 0);

  function sendWhatsAppPaySlip(p) {
    const text = `📄 *[Assura Nursing Care] Monthly Pay Slip / 护士薪资结算单*\n`
      + `👤 *Staff:* ${p.staff.name} (${p.staff.staff_no || p.staff.role})\n`
      + `📅 *Period:* ${p.month}\n`
      + `💳 *Bank:* ${p.staff.bank_name || 'Bank'} · ${p.staff.bank_acc || 'Acc No'}\n\n`
      + `📊 *Completed Visits / Cases:* ${p.total_visits}\n`
      + `💵 *Net Payout Payable / 实发薪资:* RM ${p.net_nurse_payout.toFixed(2)}\n\n`
      + `_Thank you for providing exceptional, compassionate care to our patients._ 🙏`;
    const phone = String(p.staff.phone || '').replace(/[^0-9]/g, '').replace(/^0/, '60');
    if (phone) window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    else { navigator.clipboard.writeText(text); alert('Copied pay slip summary to clipboard!'); }
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h2 style={{ margin: 0 }}>💰 Nurse Payroll &amp; Commission Payouts</h2>
          <p className="muted" style={{ margin: '4px 0 0' }}>
            Automated tiered nurse net payout and company commission reconciliation.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Month:</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={{ fontWeight: 700, padding: '4px 8px' }}
          />
        </div>
      </div>

      {status && <p className="status" style={{ marginTop: '10px' }}>{status}</p>}

      {/* EXECUTIVE FINANCIAL DASHBOARD */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', margin: '16px 0' }}>
        <div style={{ background: '#f8fafc', border: '1px solid var(--line)', borderRadius: '10px', padding: '12px' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--muted)', fontWeight: 700 }}>TOTAL CLIENT REVENUE</div>
          <b style={{ fontSize: '1.3rem', color: 'var(--navy)' }}>RM {grandGross.toFixed(2)}</b>
        </div>
        <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '10px', padding: '12px' }}>
          <div style={{ fontSize: '0.74rem', color: '#92400e', fontWeight: 700 }}>COMPANY COMMISSION (30–35%)</div>
          <b style={{ fontSize: '1.3rem', color: '#b45309' }}>RM {grandComm.toFixed(2)}</b>
        </div>
        <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '10px', padding: '12px' }}>
          <div style={{ fontSize: '0.74rem', color: '#166534', fontWeight: 700 }}>NURSE NET PAYOUT (65–70%)</div>
          <b style={{ fontSize: '1.3rem', color: '#15803d' }}>RM {grandPayout.toFixed(2)}</b>
        </div>
      </div>

      {/* PAYROLL SUMMARY TABLE */}
      {loading ? (
        <p className="muted">Calculating payroll summaries…</p>
      ) : payrollData.length === 0 ? (
        <p className="empty">No completed cases or visits recorded for {month}.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {payrollData.map((p) => (
            <div
              key={p.staff.id}
              style={{
                background: '#fff',
                border: '1px solid var(--line)',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <b style={{ fontSize: '1.1rem', color: 'var(--navy)' }}>{p.staff.name}</b>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '2px' }}>
                    {p.staff.role.toUpperCase()} · LJM: {p.staff.reg_no || 'Registered'} · IC: {p.staff.ic || '—'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#334155', marginTop: '2px' }}>
                    💳 <b>Bank:</b> {p.staff.bank_name || 'Bank Not Set'} — <code>{p.staff.bank_acc || 'No Account'}</code>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 700 }}>NET PAYABLE (80%)</div>
                  <b style={{ fontSize: '1.35rem', color: '#15803d' }}>RM {p.net_nurse_payout.toFixed(2)}</b>
                  <div style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>
                    Visits: {p.total_visits} · Gross: RM {p.total_gross_revenue.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px', borderTop: '1px solid var(--line)', paddingTop: '10px' }}>
                <button
                  className="pri sm"
                  onClick={() => setActivePaySlip(activePaySlip?.staff.id === p.staff.id ? null : p)}
                >
                  {activePaySlip?.staff.id === p.staff.id ? '▾ Hide Pay Slip' : '📄 View Detailed Pay Slip'}
                </button>
                <button className="ghost sm" onClick={() => sendWhatsAppPaySlip(p)}>
                  💬 Send WhatsApp Pay Slip
                </button>
              </div>

              {/* EXPANDED PAY SLIP VIEW */}
              {activePaySlip?.staff.id === p.staff.id && (
                <div
                  id={`payslip-${p.staff.id}`}
                  style={{
                    background: '#f8fafc',
                    border: '1.5px solid var(--primary)',
                    borderRadius: '10px',
                    padding: '16px',
                    marginTop: '12px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid var(--line)', paddingBottom: '8px', marginBottom: '10px' }}>
                    <div>
                      <h3 style={{ margin: 0, color: 'var(--navy)', fontSize: '1.1rem' }}>ASSURA NURSING CARE</h3>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Clinical Home Care &amp; Healthcare Services</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <b style={{ fontSize: '0.95rem' }}>OFFICIAL PAY SLIP</b>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Month: {p.month}</div>
                    </div>
                  </div>

                  <div className="grid2" style={{ fontSize: '0.82rem', marginBottom: '12px' }}>
                    <div><b>Nurse Name:</b> {p.staff.name}</div>
                    <div><b>LJM Reg No:</b> {p.staff.reg_no || 'Registered'}</div>
                    <div><b>Bank Name:</b> {p.staff.bank_name || '—'}</div>
                    <div><b>Account Number:</b> {p.staff.bank_acc || '—'}</div>
                  </div>

                  <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse', marginBottom: '12px' }}>
                    <thead>
                      <tr style={{ background: '#e2e8f0' }}>
                        <th style={{ padding: '6px', textAlign: 'left' }}>Date</th>
                        <th style={{ padding: '6px', textAlign: 'left' }}>Case / Procedure Description</th>
                        <th style={{ padding: '6px', textAlign: 'right' }}>Gross (RM)</th>
                        <th style={{ padding: '6px', textAlign: 'right' }}>Comm 20%</th>
                        <th style={{ padding: '6px', textAlign: 'right' }}>Net Payout (RM)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.lines.length === 0 ? (
                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '8px', color: 'var(--muted)' }}>Hourly shift based visits</td></tr>
                      ) : (
                        p.lines.map((l, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                            <td style={{ padding: '6px' }}>{l.date}</td>
                            <td style={{ padding: '6px' }}>{l.description}</td>
                            <td style={{ padding: '6px', textAlign: 'right' }}>{l.gross_amount.toFixed(2)}</td>
                            <td style={{ padding: '6px', textAlign: 'right', color: '#b45309' }}>- {l.commission_amount.toFixed(2)}</td>
                            <td style={{ padding: '6px', textAlign: 'right', fontWeight: 700, color: '#15803d' }}>{l.net_nurse_payout.toFixed(2)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                    <tfoot>
                      <tr style={{ background: '#f1f5f9', fontWeight: 800 }}>
                        <td colSpan="4" style={{ padding: '8px', textAlign: 'right' }}>TOTAL PAYABLE TO NURSE:</td>
                        <td style={{ padding: '8px', textAlign: 'right', color: '#15803d', fontSize: '1rem' }}>
                          RM {p.net_nurse_payout.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>
                      Verified by Finance &amp; Clinical Management · Generated on {new Date().toLocaleDateString('en-MY')}
                    </div>
                    <button className="pri xs" onClick={() => window.print()}>
                      🖨️ Print / Save as PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

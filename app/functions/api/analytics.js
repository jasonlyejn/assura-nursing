import { json, bad } from './_lib/respond.js';
import { requireUser } from './_lib/auth.js';

export async function onRequestGet(context) {
  const r = await requireUser(context);
  if (r.error) return r.error;
  if (r.user.role !== 'admin' && r.user.role !== 'supervisor' && r.user.role !== 'office') {
    return bad('Forbidden');
  }
  const env = context.env;

  try {
    // Invoices summary
    const invRows = await env.DB.prepare('SELECT total, amount_paid, status, created_at FROM invoices').all();
    const invoices = invRows.results || [];

    let totalInvoiced = 0;
    let totalCollected = 0;
    let totalOutstanding = 0;
    let paidCount = 0;
    let unpaidCount = 0;

    for (const inv of invoices) {
      const tot = Number(inv.total) || 0;
      const paid = Number(inv.amount_paid) || (inv.status === 'paid' ? tot : 0);
      totalInvoiced += tot;
      totalCollected += paid;
      if (inv.status === 'paid') paidCount++;
      else {
        totalOutstanding += Math.max(0, tot - paid);
        unpaidCount++;
      }
    }

    // Active cases & visits
    const caseRows = await env.DB.prepare('SELECT status FROM cases').all();
    const cases = caseRows.results || [];
    const activeCases = cases.filter(c => c.status === 'active' || c.status === 'in_progress' || c.status === 'assigned' || c.status === 'accepted').length;

    const visitRows = await env.DB.prepare('SELECT duration_minutes, created_at FROM visits WHERE clock_out_at IS NOT NULL').all();
    const totalVisits = (visitRows.results || []).length;

    return json({
      revenue: {
        totalInvoiced,
        totalCollected,
        totalOutstanding,
        paidCount,
        unpaidCount,
      },
      stats: {
        totalCases: cases.length,
        activeCases,
        totalVisits,
      }
    });
  } catch (e) {
    return json({
      revenue: { totalInvoiced: 0, totalCollected: 0, totalOutstanding: 0, paidCount: 0, unpaidCount: 0 },
      stats: { totalCases: 0, activeCases: 0, totalVisits: 0 }
    });
  }
}

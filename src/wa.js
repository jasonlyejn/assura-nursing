// WhatsApp deep links — the client's phone sends, so this stays free.
export function waNumber(p) {
  let n = String(p || '').replace(/\D/g, '');
  if (!n) return '';
  if (n.startsWith('0')) n = '60' + n.slice(1);
  else if (!n.startsWith('60')) n = '60' + n;
  return n;
}
export function waOpen(phone, text) {
  const n = waNumber(phone);
  if (!n) { alert('No phone number on this patient.'); return; }
  window.open('https://wa.me/' + n + '?text=' + encodeURIComponent(text), '_blank');
}

const BIZ = 'Assura Nursing Care';
export const msg = {
  confirm: (name) =>
    `Hi${name ? ' ' + name : ''}, this is ${BIZ} 🌿 We're glad to take your case and will confirm the visit details with you shortly. `
    + `\n\n您好${name ? ' ' + name : ''}，这里是 ${BIZ}。我们很乐意为您服务，稍后将与您确认上门详情。`,
  decline: (name) =>
    `Hi${name ? ' ' + name : ''}, thank you for reaching out to ${BIZ}. Unfortunately we're unable to take this case at the moment. `
    + `We're happy to suggest where else you might get help if useful. `
    + `\n\n您好${name ? ' ' + name : ''}，感谢您联系 ${BIZ}。很抱歉，我们目前无法接下此个案。如有需要，我们乐意为您提供其他建议。`,
  followup: (name) =>
    `Hi${name ? ' ' + name : ''}, checking in from ${BIZ} 🌿 How is everything since our last visit? Let us know if you'd like to arrange the next one. `
    + `\n\n您好${name ? ' ' + name : ''}，${BIZ} 关心您。自上次上门后一切可好？如需安排下次探访，请告诉我们。`,
};

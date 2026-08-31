const opts = (method, body) => ({
  method,
  credentials: 'include',
  headers: { 'content-type': 'application/json' },
  ...(body ? { body: JSON.stringify(body) } : {}),
});
async function call(path, method = 'GET', body) {
  const res = await fetch(path, opts(method, body)).catch((err) => {
    throw new Error('Network error: ' + err.message);
  });
  const text = await res.text().catch(() => '');
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch (_) {
    data = { error: `Server error (${res.status}): ${text.slice(0, 120) || res.statusText || 'Invalid JSON response'}` };
  }
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}
export const api = {
  me: () => call('/api/auth/me'),
  setupStatus: () => call('/api/auth/setup'),
  setup: (name, pin) => call('/api/auth/setup', 'POST', { name, pin }),
  login: (pin, email) => call('/api/auth/login', 'POST', { pin, email }),
  logout: () => call('/api/auth/logout', 'POST'),
  // rates
  getServices: () => call('/api/services'),
  putServices: (services) => call('/api/services', 'PUT', { services }),
  getItems: () => call('/api/items'),
  putItems: (items) => call('/api/items', 'PUT', { items }),
  addItem: (item) => call('/api/items', 'POST', item),
  putItemImage: (id, image) => call('/api/items/' + id + '/image', 'PUT', { image }),
  getSettings: () => call('/api/settings'),
  putSettings: (settings) => call('/api/settings', 'PUT', { settings }),
  // cases + patients
  createIntake: (body) => call('/api/intake', 'POST', body),
  getCases: (q = '') => call('/api/cases' + (q ? '?' + q : '')),
  getCase: (id) => call('/api/cases/' + id),
  getRoles: () => call('/api/roles'),
  getDashboard: () => call('/api/dashboard'),
  runMigrate: () => call('/api/migrate', 'POST'),
  getInvoices: (q) => call('/api/invoices' + (q ? '?' + new URLSearchParams(q) : '')),
  getInvoice: (id) => call('/api/invoices/' + id),
  createInvoice: (body) => call('/api/invoices', 'POST', body),
  payInvoice: (id, body) => call('/api/invoices/' + id, 'PATCH', { action: 'pay', ...body }),
  markInvoiceSent: (id) => call('/api/invoices/' + id, 'PATCH', { action: 'sent' }),
  getTeam: () => call('/api/team'),
  getMeds: (caseId, from, to) => call('/api/meds/' + caseId + '?from=' + from + '&to=' + to),
  addMed: (caseId, body) => call('/api/meds/' + caseId, 'POST', body),
  giveMed: (body) => call('/api/meds/give', 'POST', body),
  updateMed: (id, body) => call('/api/meds/item/' + id, 'PATCH', body),
  forgotPin: (name) => call('/api/pinreset', 'POST', { name }),
  getPinResets: () => call('/api/pinreset'),
  decidePinReset: (body) => call('/api/pinreset', 'PATCH', body),
  getRequests: (q) => call('/api/requests?' + new URLSearchParams(q || {}).toString()),
  createRequest: (body) => call('/api/requests', 'POST', body),
  decideRequest: (id, action, note) => call('/api/requests/' + id, 'PATCH', { action, note }),
  getMyProfile: () => call('/api/me/profile'),
  saveMyProfile: (body) => call('/api/me/profile', 'POST', body),
  changeMyPin: (current, pin) => call('/api/me/pin', 'POST', { current, pin }),
  getChanges: () => call('/api/changes'),
  reviewChange: (id, action, note) => call('/api/changes/' + id, 'PATCH', { action, note }),
  getChat: (caseId) => call('/api/chat/' + caseId),
  getFeedback: (caseId) => call('/api/feedback?case_id=' + caseId),
  getAllFeedback: () => call('/api/feedback?all=1'),
  makeFeedbackLink: (caseId) => call('/api/feedback', 'POST', { case_id: caseId }),
  postChat: (caseId, body) => call('/api/chat/' + caseId, 'POST', body),
  getRoster: (q) => call('/api/roster?' + new URLSearchParams(q).toString()),
  setShift: (body) => call('/api/roster', 'POST', body),
  updateShift: (id, status) => call('/api/roster/' + id, 'PATCH', { status }),
  clearShift: (id) => call('/api/roster/' + id, 'DELETE'),
  getHandovers: (caseId) => call('/api/handover/' + caseId),
  createHandover: (caseId, body) => call('/api/handover/' + caseId, 'POST', body),
  ackHandover: (id) => call('/api/handover/entry/' + id, 'PATCH', { action: 'ack' }),
  getStaffOne: (id) => call('/api/staff/' + id),
  updateStaff: (id, body) => call('/api/staff/' + id, 'PATCH', body),
  deleteStaff: (id) => call('/api/staff/' + id, 'DELETE'),
  getQuotes: (caseId) => call('/api/quotes?case_id=' + caseId),
  createQuote: (q) => call('/api/quotes', 'POST', q),
  setQuoteStatus: (id, action) => call('/api/quotes/' + id, 'PATCH', { action }),
  caseAction: (id, body) => call('/api/cases/' + id, 'PATCH', body),
  getPatient: (id) => call('/api/patients/' + id),
  updatePatient: (id, body) => call('/api/patients/' + id, 'PUT', body),
  // staff
  getStaff: () => call('/api/staff'),
  addStaff: (body) => call('/api/staff', 'POST', body),
  setStaffActive: (id, active) => call('/api/staff/' + id, 'PATCH', { active }),
  // MEWS + escalations (Phase 2)
  getMews: (caseId) => call('/api/mews/' + caseId),
  putMews: (caseId, data, rev) => call('/api/mews/' + caseId, 'PUT', { data, rev }),
  getEscalations: (all) => call('/api/escalations' + (all ? '?all=1' : '')),
  ackEscalation: (id) => call('/api/escalations/' + id, 'PATCH', { action: 'ack' }),
  navCounts: () => call('/api/dashboard'),
  // Notifications
  getNotifications: () => call('/api/notifications'),
  markNotificationRead: (id) => call('/api/notifications', 'POST', { id }),
  markNotificationsRead: (idOrAll) => call('/api/notifications', 'POST', typeof idOrAll === 'string' ? { id: idOrAll } : { all: true }),
  // Visits & Clock-In/Out
  getVisits: (caseId) => call('/api/visits' + (caseId ? '?case_id=' + caseId : '')),
  getActiveVisit: () => call('/api/visits?active=1'),
  clockIn: (case_id, lat, lng, notes) => call('/api/visits', 'POST', { action: 'clock_in', case_id, lat, lng, notes }),
  clockOut: (id, care_summary, notes) => call('/api/visits', 'POST', { action: 'clock_out', id, care_summary, notes }),
  // Wound Care
  getWounds: (caseId) => call('/api/wounds/' + caseId),
  addWound: (caseId, body) => call('/api/wounds/' + caseId, 'POST', body),
  deleteWound: (id) => call('/api/wounds/' + id, 'DELETE'),
  // Insulin & Blood Glucose Tracking
  getInsulin: (caseId, from = '', to = '') => call('/api/insulin/' + caseId + (from && to ? `?from=${from}&to=${to}` : '')),
  addInsulin: (caseId, body) => call('/api/insulin/' + caseId, 'POST', body),
  // Analytics
  getAnalytics: () => call('/api/analytics'),
  // Case Broadcasts & Nurse Applications (20% Commission Shield)
  getBroadcasts: (status = '') => call('/api/broadcasts' + (status ? '?status=' + status : '')),
  createBroadcast: (body) => call('/api/broadcasts', 'POST', body),
  applyBroadcast: (broadcast_id, note = '') => call('/api/broadcasts/apply', 'POST', { broadcast_id, note }),
  decideBroadcast: (broadcast_id, staff_id) => call('/api/broadcasts/decide', 'POST', { broadcast_id, staff_id }),
  // Doctor Share Link (72-hour PIN Access)
  createDoctorShare: (case_id, pin, doctor_name = '', doctor_phone = '') => call('/api/share/doctor', 'POST', { case_id, pin, doctor_name, doctor_phone }),
};



import { json, bad } from './_lib/respond.js';
import { getUser, isAdmin } from './_lib/auth.js';

// Runs the same queries each screen uses and reports exactly which one breaks.
const CHECKS = [
  ['sign in',        `SELECT id,name,role,perms,pin_salt,pin_hash,must_change_pin FROM staff WHERE active=1 LIMIT 1`],
  ['dashboard',      `SELECT c.id,p.name,
                        (SELECT h.ews FROM handovers h WHERE h.case_id=c.id LIMIT 1) AS ews
                      FROM cases c JOIN patients p ON p.id=c.patient_id LIMIT 1`],
  ['cases list',     `SELECT c.id,c.status,c.source,p.name,p.care_type FROM cases c
                      JOIN patients p ON p.id=c.patient_id LIMIT 1`],
  ['intake',         `SELECT c.id,c.source FROM cases c WHERE c.status='intake' LIMIT 1`],
  ['staff list',     `SELECT id,name,phone,email,role,active,staff_no,reg_no,photo,perms FROM staff LIMIT 1`],
  ['staff profile',  `SELECT ic,qualification,started_at,kin_name,pay_basis,pay_rate,bank_acc,notes,initials FROM staff LIMIT 1`],
  ['roster',         `SELECT id,case_id,staff_id,shift_date,shift,status FROM roster LIMIT 1`],
  ['handover',       `SELECT id,case_id,shift_date,shift,concerns,todo,ack_at FROM handovers LIMIT 1`],
  ['escalations',    `SELECT id,case_id,level,total_ews,ack_at FROM escalations LIMIT 1`],
  ['MEWS sync',      `SELECT case_id,data,rev FROM mews LIMIT 1`],
  ['chat',           `SELECT id,case_id,kind,body,photo,pinned FROM messages LIMIT 1`],
  ['chat read marks',`SELECT case_id,staff_id,read_at FROM message_reads LIMIT 1`],
  ['medications',    `SELECT id,case_id,kind,name,dose,route,times,max_dose,active FROM medications LIMIT 1`],
  ['medication given',`SELECT id,med_id,given_date,slot,status,staff_initial FROM med_admin LIMIT 1`],
  ['quotes',         `SELECT id,no,case_id,lines,total,status FROM quotes LIMIT 1`],
  ['invoices',       `SELECT id,no,case_id,lines,subtotal,travel,discount,tax,total,paid,due_date,cycle,created_at FROM invoices LIMIT 1`],
  ['payments',       `SELECT id,invoice_id,amount,method,ref,paid_on FROM payments LIMIT 1`],
  ['rate card',      `SELECT id,name_en,basis,rate,plus FROM services LIMIT 1`],
  ['items',          `SELECT id,code,category,name,brand,size,uom,price,image FROM items LIMIT 1`],
  ['leave requests', `SELECT id,staff_id,type,from_date,days,status FROM staff_requests LIMIT 1`],
  ['forgot PIN',     `SELECT id,claim_name,status FROM pin_resets LIMIT 1`],
  ['profile changes',`SELECT id,staff_id,fields,status FROM staff_changes LIMIT 1`],
  ['feedback',       `SELECT id,case_id,token,rating,submitted_at FROM feedback LIMIT 1`],
  ['settings',       `SELECT key,value FROM settings LIMIT 1`],
];

export async function onRequestGet(context) {
  const user = await getUser(context);
  if (!user) return bad('Not signed in', 401);
  if (!isAdmin(user)) return bad('Admin only', 403);

  const ok = [], broken = [];
  for (const [label, sql] of CHECKS) {
    try { await context.env.DB.prepare(sql).all(); ok.push(label); }
    catch (e) { broken.push({ page: label, problem: ((e && e.message) || '').slice(0, 160) }); }
  }
  return json({
    ok, broken,
    healthy: broken.length === 0,
    advice: broken.length
      ? 'Press "Update database", then run this check again.'
      : 'Everything the app needs is present.',
  });
}

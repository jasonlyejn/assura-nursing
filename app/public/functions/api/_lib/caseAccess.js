import { can } from './roles.js';
import { bad } from './respond.js';

// Returns { case } if the signed-in user may touch this case, else { error }.
// Staff with the 'allCases' capability may access any case;
// nurses and caregivers only the case they are assigned to.
export async function caseFor(context, caseId, user) {
  const c = await context.env.DB.prepare(
    'SELECT id, assigned_staff_id, patient_id, status FROM cases WHERE id=?'
  ).bind(caseId).first();
  if (!c) return { error: bad('Case not found', 404) };
  if (!can(user, 'allCases') && c.assigned_staff_id !== user.sid)
    return { error: bad('Not your case', 403) };
  return { case: c };
}

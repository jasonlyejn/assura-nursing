// Roles and what each one is allowed to do.
// Add a new role by adding a line here — nothing else needs changing.
export const ROLES = {
  admin: {
    label: 'Admin / Owner',
    zh: '管理员',
    desc: 'Full control — settings, rate card, staff, all cases, assignment, billing.',
    can: ['settings', 'staff', 'rates', 'allCases', 'assign', 'quote', 'bill', 'chart', 'handover'],
  },
  supervisor: {
    label: 'Supervisor / Nurse Manager',
    zh: '护理主管',
    desc: 'Sees every case, assigns staff, quotes and bills. Cannot change app settings or staff.',
    can: ['allCases', 'assign', 'quote', 'bill', 'chart', 'handover'],
  },
  nurse: {
    label: 'Registered Nurse',
    zh: '注册护士',
    desc: 'Own assigned cases — vitals, MEWS, escalations and shift handover.',
    can: ['chart', 'handover'],
  },
  caregiver: {
    label: 'Caregiver / Care Assistant',
    zh: '护理员',
    desc: 'Own assigned cases — daily care records and shift handover. No billing.',
    can: ['handover'],
  },
  office: {
    label: 'Office / Coordinator',
    zh: '行政协调',
    desc: 'Enquiries, quotes and billing. No clinical charting.',
    can: ['allCases', 'assign', 'quote', 'bill'],
  },
};

export const ROLE_KEYS = Object.keys(ROLES);

// A staff member can be given their own page list, which overrides the role.
// Admins always keep everything, so nobody can lock the owner out.
export function can(user, capability) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  if (Array.isArray(user.perms)) return user.perms.includes(capability);
  const r = ROLES[user.role];
  if (!r) return false;
  return r.can.includes(capability);
}

export const CAPS = ['allCases', 'assign', 'quote', 'bill', 'chart', 'handover', 'rates', 'staff', 'settings'];

export const isAdmin = (user) => !!user && user.role === 'admin';

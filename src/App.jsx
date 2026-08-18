import { useEffect, useState } from 'react';
import { api } from './api.js';
import Setup from './screens/Setup.jsx';
import Login from './screens/Login.jsx';
import Rates from './screens/Rates.jsx';
import Intake from './screens/Intake.jsx';
import Cases from './screens/Cases.jsx';
import Staff from './screens/Staff.jsx';
import MyCases from './screens/MyCases.jsx';
import Mews from './screens/Mews.jsx';
import Quote from './screens/Quote.jsx';
import Handover from './screens/Handover.jsx';
import Roster from './screens/Roster.jsx';
import Dashboard from './screens/Dashboard.jsx';
import Requests from './screens/Requests.jsx';
import Meds from './screens/Meds.jsx';
import Billing from './screens/Billing.jsx';
import Chat from './screens/Chat.jsx';
import MyProfile from './screens/MyProfile.jsx';
import Approvals from './screens/Approvals.jsx';
import Escalations from './screens/Escalations.jsx';

// [key, label, capability needed]  — 'allCases' staff see the office tabs
// Grouped by the stage a case is actually at:
//   enquiry -> care -> money, with the team who do it alongside.
// [key, label, capability, [sub-tabs]]
const GROUPS = [
  ['home', 'Home', 'handover', []],
  ['enquiries', 'Enquiries', 'allCases', [
    ['intake', 'New enquiries', 'allCases'],
  ]],
  ['care', 'Patient care', 'chart', [
    ['cases', 'Cases', 'allCases'],
    ['escalations', 'Alerts', 'chart'],
  ]],
  ['team', 'Team', 'handover', [
    ['roster', 'Roster', 'handover'],
    ['requests', 'Leave & requests', 'handover'],
    ['staff', 'Staff', 'staff'],
    ['approvals', 'Approvals', 'staff'],
  ]],
  ['billing', 'Billing', 'bill', [
    ['invoices', 'Invoices', 'bill'],
    ['rates', 'Rate card', 'rates'],
  ]],
];
const FIRST = { home: 'home', enquiries: 'intake', care: 'cases', team: 'roster', billing: 'invoices' };
const GROUP_OF = {};
GROUPS.forEach(([g, , , subs]) => { GROUP_OF[g] = g; subs.forEach(([k]) => { GROUP_OF[k] = g; }); });

const CAN = {
  admin:      ['settings','staff','rates','allCases','assign','quote','bill','chart','handover'],
  supervisor: ['allCases','assign','quote','bill','chart','handover'],
  office:     ['allCases','assign','quote','bill'],
  nurse:      ['chart','handover'],
  caregiver:  ['handover'],
};
const roleCan = (u, c) => {
  if (!u) return false;
  if (u.role === 'admin') return true;              // the owner always sees everything
  if (Array.isArray(u.perms)) return u.perms.includes(c);
  return (CAN[u.role] || []).includes(c);
};

const PAGE = {
  home: 'Dashboard', requests: 'Leave & requests', intake: 'New enquiries', invoices: 'Invoices & payments', cases: 'Cases', roster: 'Shift Roster', escalations: 'Escalations',
  approvals: 'Profile Approvals', profile: 'My Profile',
  staff: 'Staff & Roles', rates: 'Rate Card',
};
const ROLE_LABEL = {
  admin: 'Admin', supervisor: 'Supervisor', office: 'Office',
  nurse: 'Nurse', caregiver: 'Caregiver',
};

// "Install app" — appears only when the browser offers it
function InstallButton() {
  const [prompt, setPrompt] = useState(null);
  useEffect(() => {
    const h = (e) => { e.preventDefault(); setPrompt(e); };
    window.addEventListener('beforeinstallprompt', h);
    return () => window.removeEventListener('beforeinstallprompt', h);
  }, []);
  if (!prompt) return null;
  return <button className="install" title="Install this app on your device"
    onClick={async () => { prompt.prompt(); await prompt.userChoice; setPrompt(null); }}>⬇ Install</button>;
}

export default function App() {
  const [state, setState] = useState({ loading: true });
  const [view, setView] = useState('home');
  const [mews, setMews] = useState(null);      // case object when a chart is open
  const [quote, setQuote] = useState(null);    // case id when a quote is open
  const [invMode, setInvMode] = useState(false);
  const [hand, setHand] = useState(null);      // case object when handover is open
  const [meds, setMeds] = useState(null);      // case object when the drug chart is open
  const [chat, setChat] = useState(null);      // case object when chat is open
  const [escN, setEscN] = useState(0);         // open-escalation count (badge)

  async function refresh() {
    try { setState({ loading: false, ...(await api.me()) }); }
    catch (e) { setState({ loading: false, authed: false, needsSetup: false, error: e.message }); }
  }
  useEffect(() => { refresh(); }, []);

  // poll open-escalation count for the badge (once signed in)
  useEffect(() => {
    if (!state.authed) return;
    let live = true;
    const tick = async () => {
      try { const d = await api.getEscalations(false); if (live) setEscN((d.escalations || []).length); } catch {}
    };
    tick();
    const t = setInterval(tick, 20000);
    return () => { live = false; clearInterval(t); };
  }, [state.authed]);

  if (state.loading) return <div className="center muted">Loading…</div>;

  if (!state.authed) {
    return (
      <div className="auth-wrap">
        <img className="brand" src="/logo.png" alt="Assura Nursing Care" />
        {state.needsSetup ? <Setup onDone={refresh} /> : <Login onDone={refresh} />}
        {state.error && <p className="err">{state.error}</p>}
      </div>
    );
  }

  const isAdmin = state.user.role === 'admin';
  // anyone with an office capability gets the desk tabs; field staff get My cases
  const hasDesk = roleCan(state.user, 'allCases') || roleCan(state.user, 'staff') || roleCan(state.user, 'rates');
  const openMews = (c) => setMews(c);
  const openQuote = (c) => { setInvMode(false); setQuote(typeof c === 'string' ? c : c.id); };
  const openInvoice = (c) => { setInvMode(true); setQuote(typeof c === 'string' ? c : c.id); };
  const openHand = (c) => setHand(c);
  const openMeds = (c) => setMeds(c);
  const openChat = (c) => setChat(c);

  return (
    <div className="app">
      <header className="topbar">
        <img className="topbar-logo" src="/logo.png" alt="Assura" />
        <div className="topbar-title">
          <b>Assura Case Management</b>
          <span>{PAGE[view] || ''}</span>
        </div>
        <div className="topbar-who">
          <b>{state.user.name}</b><span className="role">{ROLE_LABEL[state.user.role] || state.user.role}</span>
        </div>
        <button className="link" onClick={() => setView('profile')}>My profile</button>
        <InstallButton />
        <button className="link" onClick={async () => { await api.logout(); refresh(); }}>Sign out</button>
      </header>

      {hasDesk && !mews && !quote && !hand && !chat && !meds && (() => {
        const groups = GROUPS.filter(([, , cap, subs]) =>
          roleCan(state.user, cap) || subs.some(([, , c]) => roleCan(state.user, c)));
        const cur = GROUP_OF[view] || 'home';
        const subs = (GROUPS.find(([g]) => g === cur) || [, , , []])[3]
          .filter(([, , c]) => roleCan(state.user, c));
        const badge = (k) =>
          k === 'escalations' && escN > 0 ? escN
          : k === 'approvals' && state.pendingChanges > 0 ? state.pendingChanges : 0;
        const groupBadge = (g) => (GROUPS.find(([x]) => x === g) || [, , , []])[3]
          .reduce((n, [k]) => n + badge(k), 0);
        return (
          <>
            <nav className="nav">
              {groups.map(([g, label]) => (
                <button key={g} className={'navbtn' + (cur === g ? ' on' : '')}
                  onClick={() => setView(FIRST[g] || g)}>
                  {label}{groupBadge(g) ? <span className="badge">{groupBadge(g)}</span> : null}
                </button>
              ))}
            </nav>
            {subs.length > 1 && (
              <nav className="subnav">
                {subs.map(([k, label]) => (
                  <button key={k} className={'subbtn' + (view === k ? ' on' : '')}
                    onClick={() => setView(k)}>
                    {label}{badge(k) ? <span className="badge">{badge(k)}</span> : null}
                  </button>
                ))}
              </nav>
            )}
          </>
        );
      })()}

      <main className="main">
        {meds ? (
          <Meds caseObj={meds} me={state.user} onBack={() => setMeds(null)} />
        ) : chat ? (
          <Chat caseObj={chat} me={state.user} onBack={() => setChat(null)} />
        ) : hand ? (
          <Handover caseObj={hand} me={state.user} onBack={() => setHand(null)} />
        ) : quote ? (
          <Quote caseId={quote} mode={invMode ? 'invoice' : 'quote'} onBack={() => setQuote(null)} />
        ) : mews ? (
          <Mews caseObj={mews} onBack={() => setMews(null)} />
        ) : !hasDesk ? (
          <>
            <nav className="nav">
              <button className={'navbtn' + (view === 'mycases' || !['roster'].includes(view) ? ' on' : '')}
                onClick={() => setView('mycases')}>My cases</button>
              <button className={'navbtn' + (view === 'roster' ? ' on' : '')}
                onClick={() => setView('roster')}>My shifts</button>
              <button className={'navbtn' + (view === 'profile' ? ' on' : '')}
                onClick={() => setView('profile')}>My profile</button>
            </nav>
            {view === 'roster'
              ? <Roster me={state.user} canAssign={false} />
              : view === 'profile'
              ? <MyProfile onDone={refresh} />
              : <MyCases me={state.user} onOpenMews={openMews} onOpenHand={openHand} onOpenChat={openChat}
                  onOpenQuote={roleCan(state.user, 'quote') ? openQuote : null} />}
          </>
        ) : (
          <>
            {view === 'home' && <Dashboard me={state.user} goTo={setView}
              onOpenMews={openMews} onOpenHand={openHand} onOpenChat={openChat} onOpenMeds={openMeds} />}
            {view === 'intake' && <Intake onOpenQuote={roleCan(state.user, 'quote') ? openQuote : null} />}
            {view === 'cases' && <Cases onOpenMews={openMews} onOpenHand={openHand} onOpenMeds={openMeds}
              onOpenInvoice={roleCan(state.user, 'bill') ? openInvoice : null} onOpenChat={openChat}
              onOpenQuote={roleCan(state.user, 'quote') ? openQuote : null} />}
            {view === 'roster' && <Roster me={state.user} canAssign={roleCan(state.user, 'assign')} />}
            {view === 'requests' && <Requests me={state.user} />}
            {view === 'escalations' && <Escalations onOpenMews={openMews} />}
            {view === 'staff' && <Staff me={state.user} />}
            {view === 'approvals' && <Approvals onChanged={refresh} />}
            {view === 'profile' && <MyProfile onDone={refresh} />}
            {view === 'invoices' && <Billing me={state.user} />}
            {view === 'rates' && <Rates />}
          </>
        )}
      </main>

      <footer className="foot muted">Assura Nursing Care · staff app v2 · Phase 2</footer>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { api } from './api.js';
import { useI18n } from './i18n.js';
import LangSelector from './components/LangSelector.jsx';
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
import WoundCare from './screens/WoundCare.jsx';
import ClinicalSummary from './screens/ClinicalSummary.jsx';
import ClinicalDocs from './screens/ClinicalDocs.jsx';
import Payroll from './screens/Payroll.jsx';
import Incidents from './screens/Incidents.jsx';
import MewsPicker from './screens/MewsPicker.jsx';
import Guidelines from './screens/Guidelines.jsx';
import SplashScreen from './components/SplashScreen.jsx';

const FIRST = { home: 'home', enquiries: 'intake', care: 'cases', sops: 'guidelines', team: 'roster', billing: 'invoices' };

const CAN = {
  admin:      ['settings','staff','rates','allCases','assign','quote','bill','chart','handover'],
  supervisor: ['allCases','assign','quote','bill','chart','handover'],
  office:     ['allCases','assign','quote','bill'],
  nurse:      ['chart','handover'],
  caregiver:  ['handover'],
};

const roleCan = (u, c) => {
  if (!u) return false;
  if (u.role === 'admin') return true;
  if (Array.isArray(u.perms)) return u.perms.includes(c);
  return (CAN[u.role] || []).includes(c);
};

const ROLE_LABEL = {
  admin: 'Admin', supervisor: 'Supervisor', office: 'Office',
  nurse: 'Nurse', caregiver: 'Caregiver',
};

function InstallButton() {
  const [modal, setModal] = useState(false);
  const [prompt, setPrompt] = useState(() => window.__assuraInstallPrompt || null);

  useEffect(() => {
    const h = (e) => {
      e.preventDefault();
      window.__assuraInstallPrompt = e;
      setPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', h);
    return () => window.removeEventListener('beforeinstallprompt', h);
  }, []);

  return (
    <>
      <button
        className="install"
        title="Install or Download App on Phone / Windows Desktop"
        onClick={() => {
          if (prompt || window.__assuraInstallPrompt) {
            const p = prompt || window.__assuraInstallPrompt;
            p.prompt();
            p.userChoice.then(() => {
              window.__assuraInstallPrompt = null;
              setPrompt(null);
            });
          } else {
            setModal(true);
          }
        }}
      >
        <span className="inst-icon">📲</span><span className="inst-text"> Install App</span>
      </button>

      {modal && (
        <div
          className="modal-backdrop"
          onClick={(e) => { if (e.target === e.currentTarget) setModal(false); }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 25, 45, 0.7)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 1200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'calc(16px + env(safe-area-inset-top, 0px)) 16px calc(16px + env(safe-area-inset-bottom, 0px)) 16px',
            overflowY: 'auto',
            boxSizing: 'border-box'
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '440px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '20px',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              margin: 'auto',
              background: '#ffffff'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, color: 'var(--navy)', fontSize: '1.1rem', fontWeight: 800 }}>
                📲 Install &amp; Download Staff App
              </h3>
              <button
                className="ghost"
                onClick={() => setModal(false)}
                style={{ fontSize: '16px', padding: '4px 10px', borderRadius: '8px', cursor: 'pointer' }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '16px', lineHeight: 1.4 }}>
              Install the official Assura Staff Portal on your Phone or Windows Desktop PC for fast access without opening a browser tab.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                className="pri"
                style={{ marginTop: 0 }}
                onClick={async () => {
                  if (prompt || window.__assuraInstallPrompt) {
                    const p = prompt || window.__assuraInstallPrompt;
                    p.prompt();
                    await p.userChoice;
                    window.__assuraInstallPrompt = null;
                    setPrompt(null);
                    setModal(false);
                  } else {
                    alert('📱 To install on Phone / Desktop:\n\n• Chrome / Edge: Click the ⊕ or "Install" icon in your browser URL address bar.\n• iPhone / Safari: Tap Share ⎋ → "Add to Home Screen" ➕.');
                  }
                }}
              >
                📲 1-Click Install Web App (PWA)
              </button>

              <a
                href="/AssuraStaff.apk"
                download="AssuraStaff.apk"
                className="sec"
                style={{ textDecoration: 'none', textAlign: 'center', padding: '11px', background: '#eef6ff', color: '#0d3a54', border: '1px solid #b3cfe9', borderRadius: '10px', fontWeight: 700, fontSize: '0.86rem' }}
              >
                🤖 Download Android Mobile App (.APK)
              </a>

              <a
                href="/AssuraStaff.exe"
                download="AssuraStaff.exe"
                className="sec"
                style={{ textDecoration: 'none', textAlign: 'center', padding: '11px', background: '#f8fafc', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '10px', fontWeight: 700, fontSize: '0.86rem' }}
              >
                💻 Download Windows Desktop App (.EXE)
              </a>

              <a
                href="/AssuraStaff-Windows.zip"
                download="AssuraStaff-Windows.zip"
                className="sec"
                style={{ textDecoration: 'none', textAlign: 'center', padding: '11px', background: '#f8fafc', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '10px', fontWeight: 700, fontSize: '0.86rem' }}
              >
                📦 Download Windows App (.ZIP)
              </a>

              <a
                href="/download.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', textAlign: 'center', padding: '8px', color: '#0284c7', fontWeight: 700, fontSize: '0.82rem', marginTop: '4px' }}
              >
                📖 Open Full Download Page &amp; Android Installation Guide ➔
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function timeAgo(ts) {
  if (!ts) return '';
  const diff = Date.now() - Number(ts);
  const s = Math.floor(diff / 1000);
  if (s < 60) return 'Just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function App() {
  const { t } = useI18n();
  const [state, setState] = useState({ loading: true, authed: false, user: null, needsSetup: false });
  const [splashDone, setSplashDone] = useState(false);
  const [view, setView] = useState('home');
  const [mews, setMews] = useState(null);
  const [quote, setQuote] = useState(null);
  const [invMode, setInvMode] = useState(false);
  const [hand, setHand] = useState(null);
  const [meds, setMeds] = useState(null);
  const [chat, setChat] = useState(null);
  const [wound, setWound] = useState(null);
  const [summary, setSummary] = useState(null);
  const [clindocs, setClindocs] = useState(null);
  const [counts, setCounts] = useState({});
  const [notifs, setNotifs] = useState([]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [bannerDismissedId, setBannerDismissedId] = useState(null);

  const GROUPS = [
    ['home', t('home'), 'handover', []],
    ['enquiries', t('enquiries'), 'allCases', [
      ['intake', t('intake'), 'allCases'],
    ]],
    ['care', t('care'), 'chart', [
      ['cases', t('cases'), 'allCases'],
      ['mews', '📈 MEWS Vitals Chart', 'chart'],
      ['escalations', t('escalations'), 'chart'],
      ['incidents', t('incidents'), 'chart'],
    ]],
    ['sops', '📖 SOPs & Guidelines', 'handover', []],
    ['team', t('team'), 'handover', [
      ['roster', t('roster'), 'handover'],
      ['requests', t('requests'), 'handover'],
      ['payroll', t('payroll'), 'staff'],
      ['staff', t('staff'), 'staff'],
      ['approvals', t('approvals'), 'staff'],
    ]],
    ['billing', t('billing'), 'bill', [
      ['invoices', t('invoices'), 'bill'],
      ['rates', t('rates'), 'rates'],
    ]],
  ];

  const GROUP_OF = {};
  GROUPS.forEach(([g, , , subs]) => { GROUP_OF[g] = g; subs.forEach(([k]) => { GROUP_OF[k] = g; }); });

  const PAGE = {
    home: t('home'), requests: t('requests'), intake: t('intake'), invoices: t('invoices'),
    cases: t('cases'), roster: t('roster'), escalations: t('escalations'), incidents: t('incidents'),
    sops: '📖 SOPs & Guidelines', guidelines: '📖 SOPs & Guidelines',
    payroll: t('payroll'), approvals: t('approvals'), profile: t('myProfile'),
    staff: t('staff'), rates: t('rates'), mycases: t('myCases'),
  };

  async function refresh() {
    try {
      const me = await api.me();
      if (!me.authed) {
        const s = await api.setupStatus();
        setState({ loading: false, authed: false, user: null, needsSetup: s.needsSetup });
      } else {
        setState({ loading: false, authed: true, user: me.user, needsSetup: false });
        if (me.user.must_change_pin) setView('profile');
      }
    } catch (e) {
      setState({ loading: false, authed: false, user: null, error: e.message });
    }
  }

  useEffect(() => { refresh(); }, []);

  // Poll badges & notifications
  useEffect(() => {
    if (!state.authed) return;
    let tId;
    const poll = async () => {
      try {
        const c = await api.navCounts();
        setCounts(c || {});
      } catch {}
      try {
        const n = await api.getNotifications();
        setNotifs(n.notifications || []);
      } catch {}
      tId = setTimeout(poll, 30000);
    };
    poll();
    return () => clearTimeout(tId);
  }, [state.authed]);

  const unreadNotifs = notifs.filter((n) => !n.read_at);
  const latestUnread = unreadNotifs[0];

  const handleNotifClick = async (n) => {
    try {
      if (!n.read_at) {
        await api.markNotificationRead(n.id);
        setNotifs((prev) => prev.map((x) => (x.id === n.id ? { ...x, read_at: Date.now() } : x)));
      }
    } catch {}
    setShowNotifs(false);

    // Reset opened modal views so target screen or modal displays cleanly
    const link = n.link || '';
    if (link === 'roster' || link.startsWith('roster:')) {
      setMews(null); setQuote(null); setHand(null); setMeds(null); setWound(null); setChat(null); setSummary(null); setDocs(null);
      setView('roster');
    } else if (link.startsWith('case:')) {
      const cId = link.split(':')[1];
      setMews(null); setQuote(null); setHand(null); setMeds(null); setWound(null); setSummary(null); setDocs(null);
      openChat({ id: cId });
    } else if (link.startsWith('handover:')) {
      const cId = link.split(':')[1];
      setMews(null); setQuote(null); setMeds(null); setWound(null); setChat(null); setSummary(null); setDocs(null);
      openHand({ id: cId });
    } else if (link.startsWith('mews:')) {
      const cId = link.split(':')[1];
      setQuote(null); setHand(null); setMeds(null); setWound(null); setChat(null); setSummary(null); setDocs(null);
      openMews({ id: cId });
    } else if (link.startsWith('meds:') || link.startsWith('med:')) {
      const cId = link.split(':')[1];
      setMews(null); setQuote(null); setHand(null); setWound(null); setChat(null); setSummary(null); setDocs(null);
      openMeds({ id: cId });
    } else if (link.startsWith('wound:')) {
      const cId = link.split(':')[1];
      setMews(null); setQuote(null); setHand(null); setMeds(null); setChat(null); setSummary(null); setDocs(null);
      openWound({ id: cId });
    } else if (link.startsWith('docs:') || link.startsWith('consents:')) {
      const cId = link.split(':')[1];
      setMews(null); setQuote(null); setHand(null); setMeds(null); setWound(null); setChat(null); setSummary(null);
      openDocs(cId);
    } else if (link.startsWith('approval') || link.startsWith('request') || link.startsWith('profile:')) {
      setMews(null); setQuote(null); setHand(null); setMeds(null); setWound(null); setChat(null); setSummary(null); setDocs(null);
      setView(hasDesk ? 'approvals' : 'requests');
    } else if (link.startsWith('escalation')) {
      setMews(null); setQuote(null); setHand(null); setMeds(null); setWound(null); setChat(null); setSummary(null); setDocs(null);
      setView('escalations');
    } else if (link.startsWith('incident')) {
      setMews(null); setQuote(null); setHand(null); setMeds(null); setWound(null); setChat(null); setSummary(null); setDocs(null);
      setView('incidents');
    } else if (PAGE[link]) {
      setMews(null); setQuote(null); setHand(null); setMeds(null); setWound(null); setChat(null); setSummary(null); setDocs(null);
      setView(link);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.markNotificationsRead(true);
      setNotifs((prev) => prev.map((x) => ({ ...x, read_at: Date.now() })));
    } catch {}
  };

  if (state.loading || !splashDone) {
    return <SplashScreen onFinish={() => setSplashDone(true)} minDuration={1000} />;
  }

  if (!state.authed) {
    return (
      <div className="auth-wrap">
        <img className="brand" src="/logo.png?v=8" alt="Assura Nursing Care" />
        <LangSelector style={{ marginBottom: '16px' }} />
        {state.needsSetup ? <Setup onDone={refresh} /> : <Login onDone={refresh} />}
        {state.error && <p className="err">{state.error}</p>}
      </div>
    );
  }

  const hasDesk = roleCan(state.user, 'allCases') || roleCan(state.user, 'staff') || roleCan(state.user, 'rates');
  const openMews = (c) => setMews(c);
  const openQuote = (c) => { setInvMode(false); setQuote(typeof c === 'string' ? c : c.id); };
  const openInvoice = (c) => { setInvMode(true); setQuote(typeof c === 'string' ? c : c.id); };
  const openHand = (c) => setHand(c);
  const openMeds = (c) => setMeds(c);
  const openChat = (c) => setChat(c);
  const openWound = (c) => setWound(c);
  const openSummary = (c) => setSummary(c);
  const openDocs = (c) => setClindocs(c);

  return (
    <div className="app">
      <header className="topbar">
        <div
          className="topbar-brand"
          onClick={() => {
            setView('home');
            setMews(null); setQuote(null); setHand(null); setMeds(null); setChat(null); setWound(null); setSummary(null); setClindocs(null);
          }}
          title="Return to Home Dashboard"
        >
          <div className="topbar-logo-wrap">
            <img className="topbar-logo" src="/logo.png?v=8" alt="Assura" />
          </div>
          <div className="topbar-title">
            <b>{t('appTitle')}</b>
            <span>{PAGE[view] || ''}</span>
          </div>
        </div>

        {/* Luxury Staff User Pill */}
        <div className="topbar-user-pill" title={`Logged in as ${state.user.name} (${ROLE_LABEL[state.user.role] || state.user.role})`}>
          <div className="u-avatar">
            {(state.user.name || 'S').slice(0, 1).toUpperCase()}
          </div>
          <b className="u-name">{state.user.name}</b>
          <span className={`u-role ${state.user.role}`}>
            {ROLE_LABEL[state.user.role] || state.user.role}
          </span>
          <span className="u-status" title="Shift Active" />
        </div>

        {/* Topbar Action Controls */}
        <div className="topbar-actions">
          {/* 4-Language Selector in Topbar */}
          <LangSelector compact />

          {/* Notification Bell Button with Live Badge */}
          <button
            className="notif-bell-btn"
            onClick={() => setShowNotifs(!showNotifs)}
            title={t('notifications')}
            aria-label={t('notifications')}
          >
            <span className="notif-bell-icon">🔔</span>
            {unreadNotifs.length > 0 && (
              <span className="notif-badge">{unreadNotifs.length > 99 ? '99+' : unreadNotifs.length}</span>
            )}
          </button>

          <button className="topbar-btn topbar-btn-profile" onClick={() => setView('profile')} title={t('myProfile')}>
            👤 <span className="btn-label">{t('myProfile')}</span>
          </button>

          <InstallButton />

          <button className="topbar-btn topbar-btn-logout" onClick={async () => { await api.logout(); refresh(); }} title={t('signOut')}>
            🚪 <span className="btn-label">{t('signOut')}</span>
          </button>
        </div>
      </header>

      {/* Top Notification Bar Banner */}
      {latestUnread && bannerDismissedId !== latestUnread.id && !showNotifs && (
        <div className="notif-bar">
          <div className="notif-bar-content" onClick={() => handleNotifClick(latestUnread)}>
            <span>
              <b>{latestUnread.title}:</b> {latestUnread.body}
            </span>
          </div>
          <div className="notif-bar-actions">
            <button className="notif-bar-btn" onClick={() => handleNotifClick(latestUnread)}>
              {t('view')}
            </button>
            <button
              className="notif-bar-close"
              onClick={() => setBannerDismissedId(latestUnread.id)}
              title={t('dismiss')}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Notification Drawer Panel */}
      {showNotifs && (
        <>
          <div className="notif-backdrop" onClick={() => setShowNotifs(false)} />
          <aside className="notif-drawer">
            <div className="notif-drawer-head">
              <h3>
                <span>🔔 {t('notifications')}</span>
                {unreadNotifs.length > 0 && <span className="badge">{unreadNotifs.length} new</span>}
              </h3>
              <div className="notif-drawer-actions">
                {unreadNotifs.length > 0 && (
                  <button className="link" onClick={handleMarkAllRead} style={{ fontSize: '.75rem' }}>
                    {t('markAllRead')}
                  </button>
                )}
                <button
                  className="link"
                  onClick={() => setShowNotifs(false)}
                  style={{ fontSize: '1.2rem', padding: '0 4px' }}
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="notif-drawer-body">
              {notifs.length === 0 ? (
                <div className="notif-empty">
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>🔕</span>
                  <p>{t('noNotifs')}</p>
                </div>
              ) : (
                <div className="notif-list">
                  {notifs.map((n) => (
                    <div
                      key={n.id}
                      className={`notif-item ${!n.read_at ? 'unread' : ''}`}
                      onClick={() => handleNotifClick(n)}
                    >
                      <div className="notif-item-head">
                        <b>{n.title}</b>
                        <span className="notif-time">{timeAgo(n.created_at)}</span>
                      </div>
                      <p className="notif-item-body">{n.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </>
      )}

      {/* Render top navigation */}
      {hasDesk && (() => {
        const groups = GROUPS.filter(([, , cap]) => roleCan(state.user, cap));
        const cur = GROUP_OF[view] || 'home';
        const activeG = GROUPS.find(([g]) => g === cur);
        const subs = (activeG ? activeG[3] : []).filter(([, , cap]) => roleCan(state.user, cap));

        const badge = (k) => {
          if (k === 'intake') return counts.pending_intakes || 0;
          if (k === 'requests') return counts.pending_requests || 0;
          if (k === 'approvals') return counts.pending_approvals || 0;
          if (k === 'invoices') return counts.unpaid_invoices || 0;
          if (k === 'escalations') return counts.active_escalations || 0;
          if (k === 'incidents') return counts.open_incidents || 0;
          return 0;
        };
        const groupBadge = (g) => {
          if (g === 'enquiries') return badge('intake');
          if (g === 'team') return badge('requests') + badge('approvals');
          if (g === 'billing') return badge('invoices');
          if (g === 'care') return badge('escalations') + badge('incidents');
          return 0;
        };

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
        {clindocs ? (
          <ClinicalDocs caseId={clindocs.id || clindocs} me={state.user} onBack={() => setClindocs(null)} />
        ) : wound ? (
          <WoundCare caseObj={wound} me={state.user} onBack={() => setWound(null)} />
        ) : summary ? (
          <ClinicalSummary caseObj={summary} me={state.user} onBack={() => setSummary(null)} />
        ) : meds ? (
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
              <button className={'navbtn' + (view === 'mycases' || !['roster', 'guidelines'].includes(view) ? ' on' : '')}
                onClick={() => setView('mycases')}>{t('myCases')}</button>
              <button className={'navbtn' + (view === 'roster' ? ' on' : '')}
                onClick={() => setView('roster')}>{t('roster')}</button>
              <button className={'navbtn' + (view === 'guidelines' ? ' on' : '')}
                onClick={() => setView('guidelines')}>📖 SOP &amp; 999</button>
              <button className={'navbtn' + (view === 'profile' ? ' on' : '')}
                onClick={() => setView('profile')}>{t('myProfile')}</button>
            </nav>
            {view === 'roster'
              ? <Roster me={state.user} canAssign={false} />
              : view === 'guidelines'
              ? <Guidelines me={state.user} />
              : view === 'profile'
              ? <MyProfile onDone={refresh} />
              : <MyCases me={state.user} onOpenMews={openMews} onOpenHand={openHand} onOpenChat={openChat}
                  onOpenMeds={openMeds} onOpenWound={openWound} onOpenSummary={openSummary} onOpenDocs={openDocs}
                  onOpenQuote={roleCan(state.user, 'quote') ? openQuote : null} />}
          </>
        ) : (
          <>
            {view === 'home' && <Dashboard me={state.user} goTo={setView}
              onOpenMews={openMews} onOpenHand={openHand} onOpenChat={openChat} onOpenMeds={openMeds} />}
            {view === 'intake' && <Intake me={state.user} onOpen={(c) => { setView('cases'); }} />}
            {view === 'cases' && <Cases me={state.user} onOpenMews={openMews} onOpenHand={openHand}
              onOpenQuote={openQuote} onOpenInvoice={openInvoice} onOpenChat={openChat} onOpenMeds={openMeds}
              onOpenWound={openWound} onOpenSummary={openSummary} onOpenDocs={openDocs} />}
            {view === 'mews' && <MewsPicker onOpenMews={openMews} />}
            {view === 'escalations' && <Escalations me={state.user} onOpenCase={(c) => { setMews(c); }} />}
            {view === 'incidents' && <Incidents me={state.user} />}
            {view === 'guidelines' && <Guidelines me={state.user} />}
            {view === 'roster' && <Roster me={state.user} canAssign={roleCan(state.user, 'assign')} />}
            {view === 'requests' && <Requests me={state.user} onApproved={refresh} />}
            {view === 'payroll' && <Payroll me={state.user} />}
            {view === 'staff' && <Staff me={state.user} onUpdated={refresh} />}
            {view === 'approvals' && <Approvals me={state.user} onApproved={refresh} />}
            {view === 'invoices' && <Billing me={state.user} onOpenInvoice={openInvoice} />}
            {view === 'rates' && <Rates me={state.user} />}
            {view === 'profile' && <MyProfile onDone={refresh} />}
          </>
        )}
      </main>

      <footer className="foot muted">
        <span>Assura Case Management · Penang &amp; Northern Region · {t('appTitle')}</span>
      </footer>
    </div>
  );
}

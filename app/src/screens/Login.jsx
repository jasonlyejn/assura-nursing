import { useState } from 'react';
import { api } from '../api.js';
import { useI18n } from '../i18n.js';
import LangSelector from '../components/LangSelector.jsx';

export default function Login({ onDone }) {
  const { t } = useI18n();
  const [useEmail, setUseEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [forgot, setForgot] = useState(false);
  const [fname, setFname] = useState('');
  const [fsent, setFsent] = useState(false);

  async function submit() {
    setErr('');
    if (useEmail && !email.trim()) return setErr('Enter your email or name.');
    if (!pin.trim()) return setErr('Enter your PIN or password.');
    setBusy(true);
    try {
      await api.login(pin, useEmail ? email.trim() : undefined);
      onDone();
    } catch (e) {
      setErr(e.message);
      setBusy(false);
      setPin('');
    }
  }

  return (
    <div className="card auth-card" style={{ maxWidth: '440px', margin: '40px auto', padding: '32px 26px', borderRadius: '24px', boxShadow: '0 20px 40px -10px rgba(12,48,84,0.12)', border: '1px solid rgba(226,232,240,0.9)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img src="/logo.png?v=10" alt="Assura Case Management Logo" style={{ height: '96px', width: 'auto', marginBottom: '10px', objectFit: 'contain' }} />
        <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '1.2px', color: '#0369a1', textTransform: 'uppercase', background: '#e0f2fe', padding: '3px 12px', borderRadius: '20px', border: '1px solid #bae6fd' }}>
          CASE MANAGEMENT PORTAL
        </span>
      </div>

      <div style={{ marginBottom: '18px', display: 'flex', justifyContent: 'center' }}>
        <LangSelector />
      </div>

      <h2 style={{ marginBottom: '4px', fontSize: '1.25rem', color: '#07192d', fontWeight: 800 }}>{t('appTitle')}</h2>
      <p className="muted" style={{ marginTop: '0', fontSize: '0.84rem', color: '#64748b' }}>
        {useEmail ? 'Sign in with your staff email / username and PIN.' : 'Staff & Clinical Sign In · 护士与医护人员登录'}
      </p>

      {useEmail && (
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address (e.g. jason@assuranursing.com)"
          type="email"
          autoFocus
          style={{ marginBottom: '8px' }}
        />
      )}

      <input
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        inputMode={useEmail ? 'text' : 'numeric'}
        type="password"
        maxLength={32}
        placeholder={useEmail ? 'PIN / Password' : `${t('pin')} (4–8 digits)`}
        autoFocus={!useEmail}
      />

      {err && <p className="err">{err}</p>}

      <button className="pri" disabled={busy} onClick={submit}>
        {busy ? `${t('loading')}` : `🔒 ${t('signIn')}`}
      </button>

      <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
        <button
          type="button"
          className="link"
          onClick={() => {
            setUseEmail(!useEmail);
            setErr('');
          }}
          style={{ background: 'none', border: 'none', color: '#0f766e', cursor: 'pointer', padding: 0 }}
        >
          {useEmail ? '🔢 Use Quick PIN instead' : '✉️ Sign in with Email'}
        </button>

        {!forgot && !fsent && (
          <button
            type="button"
            className="link forgot"
            onClick={() => setForgot(true)}
            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 0 }}
          >
            Forgot PIN?
          </button>
        )}
      </div>

      {forgot && !fsent && (
        <div className="forgotbox" style={{ marginTop: '16px' }}>
          <p className="muted">
            Type your name or email and we'll notify the admin to reset it for you.
            <br />
            输入姓名或邮箱，管理员会为您重设密码。
          </p>
          <input
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            placeholder="Your full name or email"
          />
          <div className="row2" style={{ marginTop: '8px' }}>
            <button
              className="pri"
              disabled={busy || fname.trim().length < 2}
              onClick={async () => {
                setBusy(true);
                try {
                  await api.forgotPin(fname);
                  setFsent(true);
                } catch (e) {
                  setErr(e.message);
                }
                setBusy(false);
              }}
            >
              Ask for a reset
            </button>
            <button className="ghost" onClick={() => { setForgot(false); setErr(''); }}>
              {t('cancel')}
            </button>
          </div>
        </div>
      )}

      {fsent && (
        <div className="forgotbox" style={{ marginTop: '16px' }}>
          <p>
            <b>Sent.</b> Your admin will give you a temporary PIN.
            <br />
            <span className="muted">已通知管理员，请联络他领取临时密码。</span>
          </p>
        </div>
      )}

      {/* Staff App Installation & Direct Downloads */}
      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0d3a54', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
          📲 INSTALL STAFF APP (手机与电脑安装)
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
          <button
            type="button"
            className="sec"
            onClick={async () => {
              if (window.__assuraInstallPrompt) {
                window.__assuraInstallPrompt.prompt();
                await window.__assuraInstallPrompt.userChoice;
                window.__assuraInstallPrompt = null;
              } else {
                alert('📱 To install on Phone or Desktop:\n\n• Chrome / Edge: Tap "Install App" or "Add to Home Screen" in your browser address bar/menu.\n• iPhone / Safari: Tap Share ⎋ → "Add to Home Screen" ➕.');
              }
            }}
            style={{ fontSize: '0.8rem', padding: '8px 10px', background: '#0d3a54', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
          >
            📲 1-Click Install App
          </button>

          <a
            href="/AssuraStaff.apk"
            download="AssuraStaff.apk"
            className="sec"
            style={{ textDecoration: 'none', fontSize: '0.8rem', padding: '8px 10px', background: '#eef6ff', color: '#0d3a54', border: '1px solid #b3cfe9', borderRadius: '8px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
          >
            🤖 Android .APK
          </a>

          <a
            href="/AssuraStaff.exe"
            download="AssuraStaff.exe"
            className="sec"
            style={{ textDecoration: 'none', fontSize: '0.8rem', padding: '8px 10px', background: '#f8fafc', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
          >
            💻 Windows .EXE
          </a>

          <a
            href="/AssuraStaff-Windows.zip"
            download="AssuraStaff-Windows.zip"
            className="sec"
            style={{ textDecoration: 'none', fontSize: '0.8rem', padding: '8px 10px', background: '#f8fafc', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
          >
            📦 Windows .ZIP
          </a>
        </div>
      </div>
    </div>
  );
}

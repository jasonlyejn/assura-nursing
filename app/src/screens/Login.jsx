import { useState } from 'react';
import { api } from '../api.js';

export default function Login({ onDone }) {
  const [pin, setPin] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [forgot, setForgot] = useState(false);
  const [fname, setFname] = useState('');
  const [fsent, setFsent] = useState(false);

  async function submit() {
    setErr('');
    if (!/^\d{4,8}$/.test(pin)) return setErr('Enter your PIN.');
    setBusy(true);
    try { await api.login(pin); onDone(); }
    catch (e) { setErr(e.message); setBusy(false); setPin(''); }
  }

  return (
    <div className="card auth-card">
      <h2>Sign in</h2>
      <p className="muted">Enter your PIN. 输入密码。</p>
      <input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        inputMode="numeric" type="password" maxLength={8} placeholder="PIN" autoFocus />
      {err && <p className="err">{err}</p>}
      <button className="pri" disabled={busy} onClick={submit}>
        {busy ? 'Checking…' : 'Sign in'}</button>

      {!forgot && !fsent &&
        <button className="link forgot" onClick={() => setForgot(true)}>
          Forgot your PIN? 忘记密码？</button>}

      {forgot && !fsent && (
        <div className="forgotbox">
          <p className="muted">Type your name and we'll tell the admin to reset it for you.<br />
            输入姓名，管理员会为您重设密码。</p>
          <input value={fname} onChange={(e) => setFname(e.target.value)}
            placeholder="Your full name 姓名" />
          <div className="row2">
            <button className="pri" disabled={busy || fname.trim().length < 2} onClick={async () => {
              setBusy(true);
              try { await api.forgotPin(fname); setFsent(true); }
              catch (e) { setErr(e.message); }
              setBusy(false);
            }}>Ask for a reset</button>
            <button className="ghost" onClick={() => { setForgot(false); setErr(''); }}>Cancel</button>
          </div>
        </div>
      )}

      {fsent && (
        <div className="forgotbox">
          <p><b>Sent.</b> Your admin will give you a temporary PIN.<br />
            <span className="muted">已通知管理员，请联络他领取临时密码。</span></p>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { api } from '../api.js';

export default function Setup({ onDone }) {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [pin2, setPin2] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function submit() {
    setErr('');
    if (!name.trim()) return setErr('Enter your name.');
    if (!/^\d{4,8}$/.test(pin)) return setErr('PIN must be 4–8 digits.');
    if (pin !== pin2) return setErr('The two PINs do not match.');
    setBusy(true);
    try { await api.setup(name.trim(), pin); onDone(); }
    catch (e) { setErr(e.message); setBusy(false); }
  }

  return (
    <div className="card auth-card">
      <h2>Set up the first account</h2>
      <p className="muted">This creates the admin (you). Choose a PIN you'll remember —
        there is no reset, by design. 设置管理员账号与密码。</p>
      <label>Your name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Jason" />
      <label>PIN (4–8 digits)</label>
      <input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
        inputMode="numeric" type="password" maxLength={8} />
      <label>Confirm PIN</label>
      <input value={pin2} onChange={(e) => setPin2(e.target.value.replace(/\D/g, ''))}
        inputMode="numeric" type="password" maxLength={8} />
      {err && <p className="err">{err}</p>}
      <button className="pri" disabled={busy} onClick={submit}>
        {busy ? 'Creating…' : 'Create admin account'}</button>
    </div>
  );
}

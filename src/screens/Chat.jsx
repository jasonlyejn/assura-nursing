import { useEffect, useRef, useState } from 'react';
import { api } from '../api.js';

const TABS = [
  ['team', '👥 Team', 'Notes between staff — the client never sees these.'],
  ['client', '💬 Client', 'What you and the family said to each other.'],
];

export default function Chat({ caseObj, me, onBack }) {
  const caseId = typeof caseObj === 'string' ? caseObj : caseObj.id;
  const [msgs, setMsgs] = useState(null);
  const [tab, setTab] = useState('team');
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const endRef = useRef(null);

  const flash = (m) => { setStatus(m); setTimeout(() => setStatus(''), 2600); };
  const load = () => api.getChat(caseId).then((d) => setMsgs(d.messages || []))
    .catch((e) => flash(e.message));

  useEffect(() => { load(); const t = setInterval(load, 20000); return () => clearInterval(t); }, [caseId]);
  useEffect(() => { endRef.current && endRef.current.scrollIntoView({ block: 'end' }); }, [msgs, tab]);

  const shown = (msgs || []).filter((m) =>
    tab === 'team' ? m.kind === 'team' : m.kind !== 'team');

  async function send(kind) {
    if (!text.trim() && !photo) return;
    setBusy(true);
    try {
      await api.postChat(caseId, { kind, body: text.trim(), photo });
      setText(''); setPhoto(null); load();
    } catch (e) { flash(e.message); }
    setBusy(false);
  }

  // send to the family on WhatsApp and log it in one go
  async function sendToClient() {
    const t = text.trim();
    if (!t) { flash('Write the message first'); return; }
    const phone = String((caseObj && caseObj.phone) || '').replace(/[^0-9]/g, '').replace(/^0/, '60');
    if (phone) window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(t), '_blank', 'noopener');
    await send('client_out');
  }

  async function pickPhoto() {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'image/*'; inp.capture = 'environment';
    inp.onchange = async () => {
      const f = inp.files && inp.files[0]; if (!f) return;
      try { setPhoto(await compress(f)); } catch (_) { flash('Could not read that photo'); }
    };
    inp.click();
  }

  return (
    <div className="card chatcard">
      <button className="link" onClick={onBack}>← Back</button>
      <h2>Chat {caseObj && caseObj.name ? '— ' + caseObj.name : ''}</h2>
      {status && <p className="status">{status}</p>}

      <div className="chattabs">
        {TABS.map(([k, label]) => (
          <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{label}</button>
        ))}
      </div>
      <p className="hint">{(TABS.find((t) => t[0] === tab) || [])[2]}</p>

      <div className="thread">
        {msgs === null && <p className="muted">Loading…</p>}
        {msgs && shown.length === 0 &&
          <p className="muted center">No messages yet. Start the conversation below.</p>}
        {shown.map((m) => {
          const mine = m.staff_id === (me && me.id);
          const inbound = m.kind === 'client_in';
          return (
            <div className={'bub ' + (inbound ? 'in' : mine ? 'me' : 'them')} key={m.id}>
              <div className="bmeta">
                {inbound ? 'Family' : (m.staff_name || 'Staff')}
                {m.kind === 'client_out' ? ' → family' : ''} · {when(m.created_at)}
              </div>
              {m.photo && <img className="bimg" src={m.photo} alt="" />}
              {m.body && <div className="btext">{m.body}</div>}
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {photo && <div className="pending"><img src={photo} alt="" />
        <button className="link" onClick={() => setPhoto(null)}>remove</button></div>}

      <div className="composer">
        <button className="ghost cam" onClick={pickPhoto} title="Attach a photo">📷</button>
        <textarea rows="2" value={text} onChange={(e) => setText(e.target.value)}
          placeholder={tab === 'team' ? 'Note for the team…' : 'Message to the family…'} />
      </div>
      <div className="qbtns">
        {tab === 'team'
          ? <button className="pri" onClick={() => send('team')} disabled={busy}>Post to team</button>
          : <>
              <button className="pri" onClick={sendToClient} disabled={busy}>💬 Send on WhatsApp & log</button>
              <button className="ghost" onClick={() => send('client_in')} disabled={busy}>
                Log what family said</button>
            </>}
      </div>
    </div>
  );
}

function when(ts) {
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuala_Lumpur',
    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })
    .format(new Date(ts));
}

function compress(file) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => {
      const im = new Image();
      im.onload = () => {
        const max = 420, sc = Math.min(1, max / Math.max(im.width, im.height));
        const c = document.createElement('canvas');
        c.width = Math.round(im.width * sc); c.height = Math.round(im.height * sc);
        c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
        res(c.toDataURL('image/jpeg', 0.6));
      };
      im.onerror = rej; im.src = fr.result;
    };
    fr.onerror = rej; fr.readAsDataURL(file);
  });
}

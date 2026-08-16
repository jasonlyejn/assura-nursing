// HMAC-signed session cookies (Web Crypto — runs on the Cloudflare edge).
const enc = new TextEncoder();
const dec = new TextDecoder();

const b64u = (buf) =>
  btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const ub64u = (s) => {
  s = s.replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
};

async function hmacKey(secret) {
  return crypto.subtle.importKey('raw', enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

export async function signSession(payload, secret) {
  const body = b64u(enc.encode(JSON.stringify(payload)));
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(body));
  return body + '.' + b64u(sig);
}

export async function verifySession(token, secret) {
  if (!token || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  const key = await hmacKey(secret);
  let ok = false;
  try { ok = await crypto.subtle.verify('HMAC', key, ub64u(sig), enc.encode(body)); }
  catch { return null; }
  if (!ok) return null;
  try {
    const payload = JSON.parse(dec.decode(ub64u(body)));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch { return null; }
}

export function cookie(token, maxAgeSec) {
  const parts = [`assura_session=${token}`, 'HttpOnly', 'Secure', 'SameSite=Lax', 'Path=/'];
  if (maxAgeSec != null) parts.push(`Max-Age=${maxAgeSec}`);
  return parts.join('; ');
}

export function readCookie(request, name = 'assura_session') {
  const h = request.headers.get('Cookie') || '';
  const m = h.match(new RegExp('(?:^|; )' + name + '=([^;]+)'));
  return m ? m[1] : null;
}

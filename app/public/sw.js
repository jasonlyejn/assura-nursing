// Assura Case Management — offline shell.
// Caches the app itself so it opens without signal; live data still needs a
// connection (the API is never cached, so you never see stale patient data).
const SHELL = 'assura-shell-v12-apk-download-album-photo';
const FILES = ['/', '/index.html', '/app.js?v=12', '/styles.css?v=12', '/logo.png',
               '/download.html', '/apk.html', '/icon-192.png', '/icon-512.png', '/manifest.json', '/manifest.webmanifest'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(FILES)).catch(() => {}));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== SHELL).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;
  // never touch the API or the repair page — these must always hit the network
  if (url.pathname.startsWith('/api/')) return;
  if (url.pathname === '/fix.html') return;

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(SHELL).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then((hit) => hit || caches.match('/index.html')))
  );
});

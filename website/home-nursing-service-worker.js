// Bump this version string EVERY time you publish a change.
// If you don't, phones that already installed the app keep showing the old page.
const CACHE_NAME = 'assura-nursing-v18';

const APP_FILES = [
  './',
  './index.html',
  './book.html',
  './home-nursing.webmanifest',
  './home-nursing-icon-192.png',
  './home-nursing-icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  // Pages: network first, so a republish shows up immediately.
  // Falls back to cache when the phone is offline.
  const isPage = request.mode === 'navigate' ||
                 (request.headers.get('accept') || '').includes('text/html');

  if (isPage) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('./index.html',
  './book.html')))
    );
    return;
  }

  // Icons, manifest: cache first (they rarely change).
  event.respondWith(caches.match(request).then((cached) => cached || fetch(request)));
});

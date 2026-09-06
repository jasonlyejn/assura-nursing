// Assura Nursing Care — Unified Service Worker
// Version: v20 (Full Offline & Push Engine)
const CACHE_NAME = 'assura-nursing-v20';

const APP_FILES = [
  '/',
  '/index.html',
  '/portal.html',
  '/book.html',
  '/doctor.html',
  '/feedback.html',
  '/mews.html',
  '/home-nursing.webmanifest',
  '/home-nursing-icon-192.png',
  '/home-nursing-icon-512.png',
  '/assura-logo.png',
  '/logo.png',
  '/styles.css'
];

// Install: Cache all core application files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES))
  );
  self.skipWaiting();
});

// Activate: Clean up older caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: Network-First with robust offline cache fallback
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

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
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          return caches.match('/index.html');
        })
    );
    return;
  }

  // Static Assets: Cache-First for ultra-fast offline response
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});

// Push Notification Listener: Receive real-time clinical alerts and dispatches
self.addEventListener('push', (event) => {
  let data = {
    title: 'Assura Nursing Care',
    body: 'New care update or case dispatch notification.',
    url: '/'
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: '/home-nursing-icon-192.png',
    badge: '/home-nursing-icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Assura Nursing Care', options)
  );
});

// Notification Click Handler: Deep link to the corresponding portal/case
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

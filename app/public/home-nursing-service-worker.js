// Assura Nursing — Unified Service Worker
// Version: v22 (Modular Multi-Page & Offline Notification Engine)
const CACHE_NAME = 'assura-nursing-v22';

const APP_FILES = [
  '/',
  '/index.html',
  '/services.html',
  '/equipment.html',
  '/emergency.html',
  '/about.html',
  '/careers.html',
  '/download.html',
  '/apk.html',
  '/portal.html',
  '/book.html',
  '/doctor.html',
  '/feedback.html',
  '/card.html',
  '/mews.html',
  '/notifications.js',
  '/home-nursing.webmanifest',
  '/home-nursing-icon-192.png',
  '/home-nursing-icon-512.png',
  '/assura-logo.png',
  '/logo.png',
  '/founder-blazer.jpg'
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

// Message Event: Handle Offline Notifications and Scheduled Background Timers
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SHOW_NOTIFICATION') {
    const { title, options } = event.data;
    self.registration.showNotification(title || 'Assura Nursing', {
      body: options?.body || '',
      icon: options?.icon || '/home-nursing-icon-192.png',
      badge: '/home-nursing-icon-192.png',
      vibrate: [200, 100, 200],
      tag: options?.tag || 'assura-alert',
      data: options?.data || { url: '/' },
      ...options
    });
  } else if (event.data.type === 'SCHEDULE_NOTIFICATION') {
    const { delayMs, title, options } = event.data;
    setTimeout(() => {
      self.registration.showNotification(title || 'Assura Nursing', {
        body: options?.body || '',
        icon: options?.icon || '/home-nursing-icon-192.png',
        badge: '/home-nursing-icon-192.png',
        vibrate: [200, 100, 200],
        tag: options?.tag || 'assura-scheduled',
        data: options?.data || { url: '/' },
        ...options
      });
    }, delayMs || 5000);
  }
});

// Push Notification Listener: Receive real-time clinical alerts and dispatches
self.addEventListener('push', (event) => {
  let data = {
    title: 'Assura Nursing',
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
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Assura Nursing', options)
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

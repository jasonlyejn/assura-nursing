// Assura Nursing — Offline Notification Engine & Service Worker Manager
// Ensures notifications function reliably even when the device is offline

(function() {
  // 1. Register Service Worker with robust offline caching
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/home-nursing-service-worker.js', { scope: '/' })
        .then((reg) => {
          console.log('[Assura] Service Worker registered with scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('[Assura] Service Worker registration failed:', err);
        });
    });
  }

  // 2. Request Notification Permission
  async function requestNotificationPermission() {
    if (!('Notification' in window)) {
      alert('This browser / device does not support Web Notifications.');
      return false;
    }
    if (Notification.permission === 'granted') return true;
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  // 3. Display Notification (Works Online & Offline via Service Worker)
  async function showNotification(title, body, data = {}) {
    const granted = await requestNotificationPermission();
    if (!granted) {
      console.warn('[Assura] Notification permission not granted.');
      return;
    }

    const options = {
      body: body || 'Assura Nursing update',
      icon: '/home-nursing-icon-192.png',
      badge: '/home-nursing-icon-192.png',
      vibrate: [200, 100, 200],
      tag: data.tag || 'assura-alert-' + Date.now(),
      data: { url: data.url || window.location.pathname },
      renotify: true
    };

    // Prefer Service Worker registration (works in background & offline)
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.ready;
        if (reg && reg.showNotification) {
          await reg.showNotification(title || 'Assura Nursing', options);
          return;
        }
      } catch (err) {
        console.warn('[Assura] SW notification failed, falling back to window Notification:', err);
      }
    }

    // Fallback standard Notification
    try {
      new Notification(title || 'Assura Nursing', options);
    } catch (e) {
      console.warn('[Assura] Window notification failed:', e);
    }
  }

  // 4. Schedule Notification (Offline Timer)
  async function scheduleOfflineNotification(title, body, delayMs = 5000, data = {}) {
    const granted = await requestNotificationPermission();
    if (!granted) return;

    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.ready;
        if (reg.active) {
          reg.active.postMessage({
            type: 'SCHEDULE_NOTIFICATION',
            delayMs,
            title,
            options: {
              body,
              icon: '/home-nursing-icon-192.png',
              data: { url: data.url || window.location.pathname }
            }
          });
          return;
        }
      } catch (_) {}
    }

    // Window timer fallback
    setTimeout(() => {
      showNotification(title, body, data);
    }, delayMs);
  }

  // 5. Automatic Offline / Online Event Handlers
  window.addEventListener('offline', () => {
    console.log('[Assura] Device went offline.');
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      showNotification(
        '📡 Assura Offline Mode Active',
        'Emergency hospital GPS, CPR metronome, and local patient charts remain fully accessible offline.'
      );
    }
  });

  window.addEventListener('online', () => {
    console.log('[Assura] Device came back online.');
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      showNotification(
        '🟢 Network Reconnected',
        'Assura Nursing is syncing live clinical rosters and case updates.'
      );
    }
  });

  // 6. Test function for UI buttons
  window.testAssuraOfflineNotification = async function() {
    const granted = await requestNotificationPermission();
    if (!granted) {
      alert('⚠️ Please allow notification permission when prompted to enable offline alerts.');
      return;
    }

    showNotification(
      '🔔 Assura Notification Active!',
      'Offline alerts are working! You will receive scheduled reminders and emergency notices even without internet.'
    );

    scheduleOfflineNotification(
      '⏱️ Offline Background Alert (5s)',
      'This offline alert fired from your background service worker successfully!',
      5000
    );
  };

  window.AssuraNotifications = {
    requestPermission: requestNotificationPermission,
    show: showNotification,
    schedule: scheduleOfflineNotification
  };
})();

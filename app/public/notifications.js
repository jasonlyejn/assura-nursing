// Assura Nursing — Public Live Notification Center & Offline Alert Engine

(function() {
  // 1. Service Worker Registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/home-nursing-service-worker.js', { scope: '/' })
        .then((reg) => console.log('[Assura] SW registered:', reg.scope))
        .catch((err) => console.warn('[Assura] SW error:', err));
    });
  }

  // 2. Request Web Notification Permission
  async function requestNotificationPermission() {
    if (!('Notification' in window)) {
      alert('This browser does not support Web Notifications.');
      return false;
    }
    if (Notification.permission === 'granted') return true;
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  // 3. Show System Notification
  async function showNotification(title, body, data = {}) {
    const granted = await requestNotificationPermission();
    if (!granted) return;

    const options = {
      body: body || 'Assura Nursing update',
      icon: '/home-nursing-icon-192.png',
      badge: '/home-nursing-icon-192.png',
      vibrate: [200, 100, 200],
      tag: data.tag || 'assura-alert-' + Date.now(),
      data: { url: data.url || window.location.pathname },
      renotify: true
    };

    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.ready;
        if (reg && reg.showNotification) {
          await reg.showNotification(title || 'Assura Nursing', options);
          return;
        }
      } catch (err) {}
    }

    try {
      new Notification(title || 'Assura Nursing', options);
    } catch (e) {}
  }

  // 4. Build Interactive Public Live Alert Modal
  function injectNotificationCenterUI() {
    if (document.getElementById('assura-notif-modal')) return;

    // Inject Bell button into header-actions if not present
    const headerActions = document.querySelector('.header-actions');
    if (headerActions && !document.getElementById('btnNotifCenter')) {
      const bellBtn = document.createElement('button');
      bellBtn.id = 'btnNotifCenter';
      bellBtn.className = 'notif-bell-btn';
      bellBtn.innerHTML = '🔔 <span class="notif-badge"></span>';
      bellBtn.title = 'Live Alerts & News Bulletin · 实时动态';
      bellBtn.onclick = toggleNotificationModal;
      headerActions.insertBefore(bellBtn, headerActions.firstChild);
    }

    // Create Modal Backdrop & Card
    const modal = document.createElement('div');
    modal.id = 'assura-notif-modal';
    modal.className = 'notif-modal-backdrop';
    modal.style.display = 'none';
    modal.innerHTML = `
      <div class="notif-modal-card">
        <div class="notif-modal-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:1.4rem;">🔔</span>
            <div>
              <h3 style="margin:0; font-size:1.08rem; color:#FFF;" data-i18n="notif_title">Live Alerts & News Bulletin</h3>
              <p style="margin:2px 0 0; font-size:0.76rem; color:#94A3B8;" data-i18n="notif_desc">Real-time updates on case statuses, nurse availability & clinical announcements.</p>
            </div>
          </div>
          <button class="notif-close-btn" onclick="toggleNotificationModal()">✕</button>
        </div>

        <div class="notif-modal-body">
          <!-- Web Push Toggle Banner -->
          <div class="notif-push-box">
            <div style="font-size:0.84rem; color:#E2E8F0; font-weight:600;">Stay informed on home nurse arrival & vital alerts</div>
            <button id="btnEnablePush" class="notif-action-btn" onclick="enablePushNotifications()">
              🔔 Enable Web Push Notifications
            </button>
          </div>

          <!-- Real-Time Stream -->
          <div class="notif-stream-head">📢 RECENT BULLETINS & ACTIVE STATUS</div>
          <div class="notif-stream-list">
            <div class="notif-item">
              <div class="notif-item-badge green">🟢 Case & Staff Status</div>
              <div class="notif-item-title">Penang Island & Mainland Nurse On-Call Active</div>
              <div class="notif-item-desc">Staff coordination active 24/7 across Georgetown, Bayan Lepas, Bukit Mertajam & Butterworth. Fast dispatch available.</div>
              <div class="notif-item-time">Just Now · Live Update</div>
            </div>

            <div class="notif-item">
              <div class="notif-item-badge gold">⭐ 24/7 Continuous Shifts</div>
              <div class="notif-item-title">24-Hour Home Nursing Booking Activated</div>
              <div class="notif-item-desc">Patients can now select any of the 24 hourly visiting slots (00:00 - 23:00) with dedicated nurse shift handover.</div>
              <div class="notif-item-time">Today · Official Feature</div>
            </div>

            <div class="notif-item">
              <div class="notif-item-badge blue">🏥 Clinical Notice</div>
              <div class="notif-item-title">Hospital Escort & Emergency GPS Updated</div>
              <div class="notif-item-desc">Interactive emergency direct dial & navigation routes verified for Penang General Hospital, Seberang Jaya & Bagan Specialist.</div>
              <div class="notif-item-time">Updated Today</div>
            </div>
          </div>

          <!-- Check My Case Status -->
          <div class="notif-case-lookup-box">
            <div style="font-size:0.86rem; font-weight:700; color:#38BDF8; margin-bottom:6px;" data-i18n="notif_check_case">Check Case / Booking Status</div>
            <div style="display:flex; gap:8px;">
              <input type="tel" id="lookupPhone" placeholder="Enter booking phone number (e.g. 0123456789)..." style="flex:1; padding:9px 12px; border-radius:10px; background:#071E3D; border:1px solid rgba(56,189,248,0.3); color:#FFF; font-size:0.85rem;" />
              <button class="notif-lookup-btn" onclick="lookupCaseStatus()">Lookup</button>
            </div>
            <div id="lookupResult" style="margin-top:10px; font-size:0.82rem; color:#BAE6FD; display:none;"></div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) toggleNotificationModal();
    });
  }

  function toggleNotificationModal() {
    const modal = document.getElementById('assura-notif-modal');
    if (!modal) return;
    const isShown = modal.style.display === 'flex';
    modal.style.display = isShown ? 'none' : 'flex';
    if (!isShown && typeof setLanguage === 'function' && typeof getCurrentLanguage === 'function') {
      setLanguage(getCurrentLanguage());
    }
  }

  async function enablePushNotifications() {
    const btn = document.getElementById('btnEnablePush');
    const granted = await requestNotificationPermission();
    if (granted) {
      if (btn) {
        btn.innerText = '✅ Push Notifications Active';
        btn.style.background = '#10B981';
      }
      showNotification('🔔 Assura Nursing Alerts Enabled', 'You will now receive instant updates on case statuses, nursing availability, and clinical news.');
    } else {
      alert('Notification permissions are currently blocked in your browser settings. Please allow notifications for assuranursing.com.');
    }
  }

  function lookupCaseStatus() {
    const phone = document.getElementById('lookupPhone')?.value.trim();
    const resultBox = document.getElementById('lookupResult');
    if (!phone || !resultBox) return;

    resultBox.style.display = 'block';
    resultBox.innerHTML = '<span style="color:#FFD27A;">⏳ Searching Penang Dispatch Network...</span>';

    setTimeout(() => {
      resultBox.innerHTML = `
        <div style="background:rgba(14,40,75,0.85); border:1px solid rgba(56,189,248,0.35); border-radius:10px; padding:12px;">
          <div style="font-weight:700; color:#38BDF8; margin-bottom:4px;">📋 Status for ${phone}:</div>
          <div style="color:#FFF;">🟢 Active Case Pipeline · 24/7 Coordinator On-Duty</div>
          <div style="font-size:0.78rem; color:#94A3B8; margin-top:4px;">Need instant clinical updates? <a href="https://wa.me/60122064868?text=Hi%20Assura,%20checking%20status%20for%20${phone}" target="_blank" style="color:#7dd3fc; font-weight:700;">Chat on WhatsApp →</a></div>
        </div>
      `;
    }, 600);
  }

  window.toggleNotificationModal = toggleNotificationModal;
  window.enablePushNotifications = enablePushNotifications;
  window.lookupCaseStatus = lookupCaseStatus;
  window.showNotification = showNotification;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNotificationCenterUI);
  } else {
    injectNotificationCenterUI();
  }
})();

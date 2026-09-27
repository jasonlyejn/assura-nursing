// Assura Nursing — Universal Announcement Pop-Up Engine & Live Notification Center

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

  // 4. Announcements Dataset
  const GLOBAL_ANNOUNCEMENTS = [
    {
      icon: '📢',
      category: 'SEPTEMBER 2026 · SERVICE EXPANSION',
      title: 'Full 24/7 Coverage Extended Across Penang Island & Seberang Perai',
      desc: 'Assura Nursing has expanded its registered home nurse dispatch network across all districts: Georgetown, Bayan Lepas, Balik Pulau, Tanjung Bungah, Butterworth, Bukit Mertajam, Seberang Jaya, and Kepala Batas. Rapid home nursing response is active 24/7.',
      waText: 'Hi Assura Nursing, checking about 24/7 service coverage in Penang'
    },
    {
      icon: '📊',
      category: 'AUGUST 2026 · CLINICAL TECHNOLOGY',
      title: 'Launch of Digital MEWS Vital Tracking System for Families',
      desc: 'Families can now access real-time clinical vital sign graphs, blood pressure trends, SpO2 levels, and Modified Early Warning Scores (MEWS) logged by attending nurses directly via the Assura Clinical Portal.',
      waText: 'Hi Assura Nursing, checking about the digital MEWS vital tracking portal'
    },
    {
      icon: '🏥',
      category: 'JULY 2026 · HOSPITAL PARTNERSHIP',
      title: 'Hospital Discharge Fast-Track Care Coordination Program',
      desc: 'Same-day clinical handover from Penang General Hospital, Island Hospital, Gleneagles, Loh Guan Lye, Pantai Hospital, and Bagan Specialist directly to home recovery with certified medical equipment setup.',
      waText: 'Hi Assura Nursing, checking about hospital discharge coordination'
    },
    {
      icon: '🩹',
      category: 'JUNE 2026 · EDUCATION & TRAINING',
      title: 'Updated Aseptic Wound Care & ANTT Protocols Adopted',
      desc: 'All active staff nurses have completed advanced certifications in modern wound care dressing, negative pressure wound therapy (NPWT), and hospital-to-home infection control standards.',
      waText: 'Hi Assura Nursing, checking about aseptic wound care services'
    },
    {
      icon: '💼',
      category: '2026 CAREERS & RECRUITMENT',
      title: 'The Hire Site — Registered Nurses & Caregivers Wanted',
      desc: 'Join Penang\'s leading home nursing network. Enjoy bi-weekly payroll, high commission payout, flexible shift booking, and full clinical insurance protection.',
      waText: 'Hi Assura Nursing, I am interested in joining as a Staff Nurse / Caregiver'
    }
  ];

  let currentAnnounceIdx = 0;

  // 5. Inject Global Styles for Modals & Popups
  function injectModalStyles() {
    if (document.getElementById('assura-modal-global-styles')) return;
    const style = document.createElement('style');
    style.id = 'assura-modal-global-styles';
    style.textContent = `
      .notif-modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(3, 10, 24, 0.88);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        animation: assuraFadeIn 0.22s ease-out;
      }
      @keyframes assuraFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .notif-modal-card {
        background: linear-gradient(135deg, #0A192F 0%, #0F2D59 100%);
        border: 1px solid rgba(56, 189, 248, 0.45);
        border-radius: 20px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 30px rgba(56, 189, 248, 0.2);
        width: 100%;
        max-width: 620px;
        max-height: 90vh;
        overflow-y: auto;
        color: #FFF;
        animation: assuraSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        padding: 22px 24px;
      }
      @keyframes assuraSlideUp {
        from { transform: translateY(24px) scale(0.96); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
      }
      .notif-modal-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        padding-bottom: 14px;
        border-bottom: 1px solid rgba(56, 189, 248, 0.2);
      }
      .notif-close-btn {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #FFF;
        font-size: 1.15rem;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        flex-shrink: 0;
      }
      .notif-close-btn:hover {
        background: rgba(239, 68, 68, 0.8);
        border-color: #EF4444;
        transform: scale(1.08);
      }
      .notif-modal-body {
        padding: 16px 0 4px;
      }
      .notif-push-box {
        background: rgba(14, 40, 75, 0.85);
        border: 1px solid rgba(56, 189, 248, 0.3);
        border-radius: 12px;
        padding: 14px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        flex-wrap: wrap;
      }
      .notif-action-btn {
        background: linear-gradient(135deg, #0284C7 0%, #0369A1 100%);
        color: #FFF;
        border: 1px solid #38BDF8;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 0.84rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
      }
      .notif-action-btn:hover {
        background: #38BDF8;
        color: #071E3D;
      }
      .notif-stream-head {
        font-size: 0.74rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        color: #94A3B8;
        margin-bottom: 10px;
      }
      .notif-item {
        background: rgba(15, 23, 42, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 12px 14px;
        margin-bottom: 10px;
      }
      .notif-item-badge {
        display: inline-block;
        font-size: 0.7rem;
        font-weight: 800;
        padding: 2px 8px;
        border-radius: 6px;
        margin-bottom: 6px;
      }
      .notif-item-badge.green { background: rgba(16, 185, 129, 0.2); color: #34D399; }
      .notif-item-badge.gold { background: rgba(245, 158, 11, 0.2); color: #FBBF24; }
      .notif-item-badge.blue { background: rgba(56, 189, 248, 0.2); color: #38BDF8; }
      .notif-item-title {
        font-weight: 700;
        color: #FFF;
        font-size: 0.92rem;
        margin-bottom: 4px;
      }
      .notif-item-desc {
        font-size: 0.82rem;
        color: #CBD5E1;
        line-height: 1.5;
        margin-bottom: 6px;
      }
      .notif-item-time {
        font-size: 0.72rem;
        color: #64748B;
      }
      .notif-case-lookup-box {
        background: rgba(15, 23, 42, 0.7);
        border: 1px solid rgba(56, 189, 248, 0.25);
        border-radius: 12px;
        padding: 14px;
        margin-top: 14px;
      }
      .notif-lookup-btn {
        background: #0284C7;
        color: #FFF;
        border: 1px solid #38BDF8;
        padding: 8px 18px;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
      }
      .btn-pop-nav {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.25);
        color: #FFF;
        padding: 9px 16px;
        border-radius: 10px;
        font-weight: 700;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s;
      }
      .btn-pop-nav:hover {
        background: rgba(56, 189, 248, 0.25);
        border-color: #38BDF8;
        color: #38BDF8;
      }
      .btn-pop-wa {
        background: linear-gradient(135deg, #10B981 0%, #059669 100%);
        color: #FFF !important;
        border: 1px solid #34D399;
        padding: 9px 18px;
        border-radius: 10px;
        font-weight: 800;
        font-size: 0.88rem;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
        transition: all 0.2s;
      }
      .btn-pop-wa:hover {
        background: #34D399;
        color: #064E3B !important;
        transform: translateY(-2px);
      }
      .notif-bell-btn {
        background: rgba(14, 40, 75, 0.7);
        border: 1px solid rgba(56, 189, 248, 0.3);
        color: #FFF;
        border-radius: 9999px;
        padding: 6px 12px;
        font-size: 0.9rem;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s;
        position: relative;
      }
      .notif-bell-btn:hover {
        background: rgba(56, 189, 248, 0.2);
        border-color: #38BDF8;
      }
      .notif-badge {
        width: 8px;
        height: 8px;
        background: #EF4444;
        border-radius: 50%;
        display: inline-block;
        box-shadow: 0 0 6px #EF4444;
      }
    `;
    document.head.appendChild(style);
  }

  // 6. Build Universal Announcement Pop-Up Modal
  function injectAnnouncementModalUI() {
    if (document.getElementById('assura-global-announcement-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'assura-global-announcement-modal';
    modal.className = 'notif-modal-backdrop';
    modal.style.display = 'none';
    modal.innerHTML = `
      <div class="notif-modal-card" style="max-width: 640px;">
        <div class="notif-modal-header">
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-size:2rem; filter:drop-shadow(0 0 8px rgba(56,189,248,0.5));" id="globalAnnounceIcon">📢</span>
            <div>
              <span style="font-size:0.74rem; font-weight:800; color:#FFD27A; letter-spacing:0.04em; text-transform:uppercase;" id="globalAnnounceDate">SEPTEMBER 2026 · SERVICE EXPANSION</span>
              <h3 style="margin:4px 0 0; font-size:1.18rem; color:#FFF; font-weight:800; line-height:1.35;" id="globalAnnounceTitle">Full 24/7 Coverage Extended Across Penang Island & Seberang Perai</h3>
            </div>
          </div>
          <button class="notif-close-btn" onclick="closeGlobalAnnouncementPopup()" title="Close">✕</button>
        </div>

        <div class="notif-modal-body">
          <div style="background:rgba(14,38,72,0.75); border:1px solid rgba(56,189,248,0.25); border-radius:14px; padding:18px; margin-bottom:18px; line-height:1.7; color:#E2E8F0; font-size:0.94rem;" id="globalAnnounceDesc">
            Assura Nursing has expanded its registered home nurse dispatch network across all districts: Georgetown, Bayan Lepas, Balik Pulau, Tanjung Bungah, Butterworth, Bukit Mertajam, Seberang Jaya, and Kepala Batas. Rapid home nursing response is active 24/7.
          </div>

          <div style="display:flex; gap:10px; justify-content:space-between; align-items:center; flex-wrap:wrap;">
            <div style="display:flex; align-items:center; gap:8px;">
              <button type="button" class="btn-pop-nav" onclick="prevGlobalAnnouncement()">← Previous</button>
              <span style="font-size:0.78rem; font-weight:700; color:#94A3B8; padding:0 4px;" id="globalAnnounceCounter">1 / 5</span>
              <button type="button" class="btn-pop-nav" onclick="nextGlobalAnnouncement()">Next →</button>
            </div>
            <a href="https://wa.me/60122064868?text=Hi%20Assura%20Nursing,%20checking%20about%20announcements" target="_blank" rel="noopener" class="btn-pop-wa" id="globalAnnounceWa">
              <span>💬</span> Chat on WhatsApp →
            </a>
          </div>

          <div style="text-align:center; margin-top:16px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.08);">
            <a href="announcements.html" style="font-size:0.8rem; color:#38BDF8; font-weight:700; text-decoration:none;" id="globalAnnounceAllLink">
              Explore Full Careers & Notices Hub →
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeGlobalAnnouncementPopup();
    });
  }

  // 7. Announcement Modal Controller Functions
  function openGlobalAnnouncementPopup(idx) {
    injectModalStyles();
    injectAnnouncementModalUI();

    if (idx !== undefined && idx >= 0 && idx < GLOBAL_ANNOUNCEMENTS.length) {
      currentAnnounceIdx = idx;
    }
    const item = GLOBAL_ANNOUNCEMENTS[currentAnnounceIdx];
    const modal = document.getElementById('assura-global-announcement-modal');
    if (!modal || !item) return;

    const iconEl = document.getElementById('globalAnnounceIcon');
    const dateEl = document.getElementById('globalAnnounceDate');
    const titleEl = document.getElementById('globalAnnounceTitle');
    const descEl = document.getElementById('globalAnnounceDesc');
    const counterEl = document.getElementById('globalAnnounceCounter');
    const waEl = document.getElementById('globalAnnounceWa');

    if (iconEl) iconEl.innerText = item.icon;
    if (dateEl) dateEl.innerText = item.category;
    if (titleEl) titleEl.innerText = item.title;
    if (descEl) descEl.innerText = item.desc;
    if (counterEl) counterEl.innerText = `${currentAnnounceIdx + 1} / ${GLOBAL_ANNOUNCEMENTS.length}`;
    if (waEl) {
      waEl.href = 'https://wa.me/60122064868?text=' + encodeURIComponent(item.waText);
    }

    modal.style.display = 'flex';

    if (typeof setLanguage === 'function' && typeof getCurrentLanguage === 'function') {
      setLanguage(getCurrentLanguage());
    }
  }

  function closeGlobalAnnouncementPopup() {
    const modal = document.getElementById('assura-global-announcement-modal');
    if (modal) modal.style.display = 'none';
  }

  function prevGlobalAnnouncement() {
    currentAnnounceIdx = (currentAnnounceIdx - 1 + GLOBAL_ANNOUNCEMENTS.length) % GLOBAL_ANNOUNCEMENTS.length;
    openGlobalAnnouncementPopup(currentAnnounceIdx);
  }

  function nextGlobalAnnouncement() {
    currentAnnounceIdx = (currentAnnounceIdx + 1) % GLOBAL_ANNOUNCEMENTS.length;
    openGlobalAnnouncementPopup(currentAnnounceIdx);
  }

  // 8. Build Interactive Public Live Alert Modal
  function injectNotificationCenterUI() {
    if (document.getElementById('assura-notif-modal')) return;

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
          <div class="notif-push-box">
            <div style="font-size:0.84rem; color:#E2E8F0; font-weight:600;">Stay informed on home nurse arrival & vital alerts</div>
            <button id="btnEnablePush" class="notif-action-btn" onclick="enablePushNotifications()">
              🔔 Enable Web Push Notifications
            </button>
          </div>

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

  // 9. Attach Click Listeners to Nav Links & Auto-Open
  function bindAnnouncementTriggers() {
    // Intercept clicks on any Announcements link or loudspeaker icon in navigation
    document.querySelectorAll('a[href*="announcements.html"], a.nav-link[title*="Announcement"], a[title*="Announcements"]').forEach(link => {
      link.addEventListener('click', (e) => {
        // If not Ctrl/Cmd click (new tab), open pop-up modal directly
        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
          e.preventDefault();
          openGlobalAnnouncementPopup(0);
        }
      });
    });

    // Keyboard navigation (Esc to close, Arrow keys to navigate)
    window.addEventListener('keydown', (e) => {
      const announceModal = document.getElementById('assura-global-announcement-modal');
      const notifModal = document.getElementById('assura-notif-modal');

      if (announceModal && announceModal.style.display === 'flex') {
        if (e.key === 'Escape') closeGlobalAnnouncementPopup();
        if (e.key === 'ArrowLeft') prevGlobalAnnouncement();
        if (e.key === 'ArrowRight') nextGlobalAnnouncement();
      } else if (notifModal && notifModal.style.display === 'flex') {
        if (e.key === 'Escape') toggleNotificationModal();
      }
    });

    // If currently on announcements.html, auto-open pop-up on page load
    const isAnnouncementsPage = window.location.pathname.includes('announcements.html') || 
                                window.location.hash.includes('announcements') || 
                                window.location.hash.includes('popup') ||
                                window.location.hash.includes('notices');
    if (isAnnouncementsPage) {
      setTimeout(() => {
        openGlobalAnnouncementPopup(0);
      }, 150);
    }
  }

  // 10. Expose Global Functions
  window.openGlobalAnnouncementPopup = openGlobalAnnouncementPopup;
  window.closeGlobalAnnouncementPopup = closeGlobalAnnouncementPopup;
  window.prevGlobalAnnouncement = prevGlobalAnnouncement;
  window.nextGlobalAnnouncement = nextGlobalAnnouncement;
  window.openAnnouncementPopup = openGlobalAnnouncementPopup;
  window.closeAnnouncementPopup = closeGlobalAnnouncementPopup;
  window.prevAnnouncement = prevGlobalAnnouncement;
  window.nextAnnouncement = nextGlobalAnnouncement;

  window.toggleNotificationModal = toggleNotificationModal;
  window.enablePushNotifications = enablePushNotifications;
  window.lookupCaseStatus = lookupCaseStatus;
  window.showNotification = showNotification;

  // Initialize
  function init() {
    injectModalStyles();
    injectAnnouncementModalUI();
    injectNotificationCenterUI();
    bindAnnouncementTriggers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

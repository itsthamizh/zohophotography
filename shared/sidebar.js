/**
 * Zoho Photography — Shared Sidebar (self-contained)
 * CSS + HTML live in this one file. No external loads needed.
 * Works with file://, http://, and https:// protocols.
 */
(function () {

  /* ── 1a. Inject shared layout.css (alignment + topbar + content standards) ── */
  var _layout = document.createElement('link');
  _layout.rel  = 'stylesheet';
  _layout.href = (function() {
    var scripts = document.querySelectorAll('script[src*="sidebar.js"]');
    var src = scripts[scripts.length - 1] ? scripts[scripts.length - 1].src : '';
    return src.replace('sidebar.js', 'layout.css');
  })();
  document.head.appendChild(_layout);


  /* ── 1c. Inject Phosphor Icons (replaces all emoji icons in UI) ── */
  var _ph = document.createElement('link');
  _ph.rel = 'stylesheet';
  _ph.href = 'https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css';
  document.head.appendChild(_ph);

  var _phf = document.createElement('link');
  _phf.rel = 'stylesheet';
  _phf.href = 'https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css';
  document.head.appendChild(_phf);

  var _phb = document.createElement('link');
  _phb.rel = 'stylesheet';
  _phb.href = 'https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css';
  document.head.appendChild(_phb);

  /* ── 1b. Inject sidebar CSS (self-contained, no external file needed) ── */
  var style = document.createElement('style');
  style.textContent = [
    '.sidebar{width:250px;background:#12141f;position:fixed;top:0;left:0;height:100vh;',
    'display:flex;flex-direction:column;z-index:1000;overflow-y:auto;',
    'font-family:"Inter",-apple-system,BlinkMacSystemFont,sans-serif;}',
    '.sidebar::-webkit-scrollbar{width:0;}',

    '.sidebar-logo{padding:20px 18px 16px;display:flex;align-items:center;gap:11px;',
    'border-bottom:1px solid rgba(255,255,255,.07);flex-shrink:0;}',
    '.logo-icon{width:36px;height:36px;border-radius:9px;',
    'background:linear-gradient(135deg,#2563eb,#60a5fa);',
    'display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}',
    '.logo-name{font-size:17px;font-weight:700;color:#fff;letter-spacing:-.4px;}',
    '.logo-tag{font-size:9.5px;color:rgba(255,255,255,.32);text-transform:uppercase;',
    'letter-spacing:1.4px;margin-top:1px;}',

    '.nav-group{padding:14px 0 6px;}',
    '.nav-group-label{font-size:9.5px;font-weight:600;color:rgba(255,255,255,.28);',
    'text-transform:uppercase;letter-spacing:1.6px;padding:2px 18px 8px;}',

    '.nav-item{display:flex;align-items:center;gap:10px;padding:9.5px 18px;',
    'color:rgba(255,255,255,.52);font-size:13.5px;font-weight:400;',
    'border-left:3px solid transparent;transition:all .14s ease;',
    'cursor:pointer;text-decoration:none;}',
    '.nav-item:hover{color:rgba(255,255,255,.88);background:rgba(255,255,255,.04);}',
    '.nav-item.active{color:#60a5fa;background:rgba(37,99,235,.15);',
    'border-left-color:#2563eb;font-weight:500;}',
    '.nav-item i{font-size:18px;width:20px;text-align:center;flex-shrink:0;}',

    '.nav-badge{margin-left:auto;background:#ef4444;color:#fff;font-size:10px;',
    'font-weight:600;padding:2px 6px;border-radius:10px;min-width:18px;',
    'text-align:center;line-height:1.4;}',

    '.nav-divider{height:1px;background:rgba(255,255,255,.06);margin:6px 0;}',

    '.sidebar-footer{margin-top:auto;padding:14px 18px;',
    'border-top:1px solid rgba(255,255,255,.07);',
    'display:flex;align-items:center;gap:10px;flex-shrink:0;}',
    '.s-avatar{width:33px;height:33px;border-radius:50%;',
    'background:linear-gradient(135deg,#667eea,#764ba2);',
    'display:flex;align-items:center;justify-content:center;',
    'font-size:12px;font-weight:600;color:#fff;flex-shrink:0;}',
    '.s-name{font-size:13px;font-weight:500;color:rgba(255,255,255,.82);}',
    '.s-role{font-size:11px;color:rgba(255,255,255,.32);}',
    '.s-more{margin-left:auto;color:rgba(255,255,255,.3);font-size:17px;cursor:pointer;}',
    '.s-more:hover{color:rgba(255,255,255,.65);}'
  ].join('');
  document.head.appendChild(style);

  /* ── 2. Detect active page and base path ─────────────────── */
  var p = (window.location.pathname + window.location.href).toLowerCase();
  var inSub = (
    p.indexOf('/studiomanager/')      > -1 ||
    p.indexOf('/clientgallery/')      > -1 ||
    p.indexOf('/equipmentinventory/') > -1 ||
    p.indexOf('/shootplanning/')      > -1 ||
    p.indexOf('/flatplan/')           > -1 ||
    p.indexOf('/website/')            > -1 ||
    p.indexOf('/invoices/')           > -1 ||
    p.indexOf('/mobilegalleryapp/')   > -1 ||
    p.indexOf('/settings/')           > -1
  );
  var r = inSub ? '../' : '';

  // Dashboard is active when on index.html OR no sub-folder detected
  var isDashboard = p.indexOf('index.html') > -1 || p.indexOf('dashboard') > -1 || !inSub;

  function a(kw) {
    if (kw === 'dashboard') return isDashboard ? 'nav-item active' : 'nav-item';
    return p.indexOf(kw.toLowerCase()) > -1 ? 'nav-item active' : 'nav-item';
  }

  /* ── 3. Build sidebar HTML ───────────────────────────────── */
  var html =
    '<nav class="sidebar">' +

      '<div class="sidebar-logo">' +
        '<div class="logo-icon"><i class="ph-fill ph-camera" style="color:#fff;font-size:20px;"></i></div>' +
        '<div>' +
          '<div class="logo-name">Zoho Photography</div>' +
          '<div class="logo-tag">Photography Platform</div>' +
        '</div>' +
      '</div>' +

      '<div class="nav-group">' +
        '<div class="nav-group-label">Overview</div>' +
        '<a href="' + r + 'index.html" class="' + a('dashboard') + '" data-roles="super-admin,studio-manager,photographer">' +
          '<i class="ti ti-layout-dashboard"></i> Dashboard' +
        '</a>' +
      '</div>' +

      '<div class="nav-group" id="nav-group-core">' +
        '<div class="nav-group-label">Core Modules</div>' +
        '<a href="' + r + 'StudioManager/StudioManager.html" class="' + a('studiomanager') + '" data-roles="super-admin,studio-manager">' +
          '<i class="ti ti-calendar-event"></i> Studio Desk' +
        '</a>' +
        '<a href="' + r + 'ClientGallery/ClientGallery.html" class="' + a('clientgallery') + '" data-roles="super-admin,studio-manager,photographer">' +
          '<i class="ti ti-photo"></i> Gallery Room' +
        '</a>' +
        '<a href="' + r + 'EquipmentInventory/EquipmentInventory.html" class="' + a('equipmentinventory') + '" data-roles="super-admin,studio-manager,photographer">' +
          '<i class="ti ti-camera"></i> Equipment Inventory' +
        '</a>' +
        '<a href="' + r + 'ShootPlanning/ShootPlanning.html" class="' + a('shootplanning') + '" data-roles="super-admin,studio-manager,photographer">' +
          '<i class="ti ti-users"></i> Shoot Planning' +
        '</a>' +
        '<a href="' + r + 'FlatPlan/FlatPlan.html" class="' + a('flatplan') + '" data-roles="super-admin,studio-manager">' +
          '<i class="ti ti-layout-columns"></i> Client Portal' +
        '</a>' +
        '<a href="' + r + 'Website/Website.html" class="' + a('website') + '" data-roles="super-admin">' +
          '<i class="ti ti-world"></i> Website' +
        '</a>' +
        '<a href="' + r + 'Invoices/Invoices.html" class="' + a('invoices') + '" data-roles="super-admin,studio-manager">' +
          '<i class="ti ti-file-invoice"></i> Invoices' +
        '</a>' +
        '<a href="' + r + 'MobileGalleryApp/MobileGalleryApp.html" class="' + a('mobilegalleryapp') + '" data-roles="super-admin,studio-manager">' +
          '<i class="ti ti-device-mobile"></i> Mobile App' +
        '</a>' +
      '</div>' +

      '<div class="nav-divider"></div>' +

      '<div class="nav-group">' +
        '<div class="nav-group-label">Account</div>' +
        '<a href="' + r + 'Settings/Settings.html" class="' + a('settings') + '" data-roles="super-admin,studio-manager">' +
          '<i class="ti ti-settings"></i> Settings' +
        '</a>' +
      '</div>' +

      '<div class="sidebar-footer" id="sidebar-footer-user">' +
        '<div class="s-avatar" id="sb-avatar" style="background:linear-gradient(135deg,#2563eb,#1d4ed8);">TS</div>' +
        '<div style="flex:1;min-width:0;">' +
          '<div class="s-name" id="sb-name">Thamizh S.</div>' +
          '<div class="s-role" id="sb-role"><span id="sb-role-badge" style="display:inline-block;padding:1px 7px;border-radius:4px;font-size:10px;font-weight:700;background:rgba(37,99,235,.25);color:#93c5fd;letter-spacing:.3px;">Super Admin</span></div>' +
        '</div>' +
        '<i class="ti ti-dots s-more"></i>' +
      '</div>' +

    '</nav>';

  /* ── 4. Inject into placeholder (or prepend to body) ─────── */
  var el = document.getElementById('sidebar-root');
  if (el) {
    el.innerHTML = html;
  } else {
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    document.body.insertBefore(tmp.firstElementChild, document.body.firstChild);
  }

  /* ── 4b. Role-based sidebar access ──────────────────────────── */
  var SIDEBAR_ROLES = {
    'super-admin':    { name:'Thamizh S.',  sub:'Super Admin',      initials:'TS', color:'linear-gradient(135deg,#2563eb,#1d4ed8)', badgeBg:'rgba(37,99,235,.25)',  badgeColor:'#93c5fd' },
    'studio-manager': { name:'Ravi Singh',  sub:'Studio Desk',   initials:'RS', color:'linear-gradient(135deg,#d97706,#b45309)', badgeBg:'rgba(217,119,6,.25)',   badgeColor:'#fcd34d' },
    'photographer':   { name:'Alex Kumar',  sub:'Lead Photographer',initials:'AK', color:'linear-gradient(135deg,#7c3aed,#6d28d9)', badgeBg:'rgba(124,58,237,.25)',  badgeColor:'#c4b5fd' }
  };

  window.applyRoleSidebar = function(role) {
    role = role || localStorage.getItem('zp_role') || 'super-admin';

    /* show / hide nav items */
    document.querySelectorAll('.nav-item[data-roles]').forEach(function(el) {
      var allowed = el.getAttribute('data-roles').split(',');
      el.style.display = allowed.indexOf(role) > -1 ? '' : 'none';
    });

    /* update sidebar footer persona */
    var meta = SIDEBAR_ROLES[role] || SIDEBAR_ROLES['super-admin'];
    var avEl    = document.getElementById('sb-avatar');
    var nameEl  = document.getElementById('sb-name');
    var badgeEl = document.getElementById('sb-role-badge');
    if (avEl)    { avEl.textContent = meta.initials; avEl.style.background = meta.color; }
    if (nameEl)  nameEl.textContent = meta.name;
    if (badgeEl) {
      badgeEl.textContent = meta.sub;
      badgeEl.style.background = meta.badgeBg;
      badgeEl.style.color = meta.badgeColor;
    }
  };

  /* apply on load from stored preference */
  window.applyRoleSidebar(localStorage.getItem('zp_role') || 'super-admin');

  // ── NOTIFICATION SYSTEM ───────────────────────────────────────
  var notifications = [
    { id: 7, type: 'danger', icon: 'ti ti-package-export', title: 'Equipment Return Due', body: 'DJI Mavic 3 Pro Drone — due in 3 days on Jun 20 · SkyRent Drones', time: 'Just now', read: false, action: 'StudioManager/StudioManager.html' },
    { id: 8, type: 'danger', icon: 'ti ti-package-export', title: 'Equipment Return Due', body: 'Canon EF 400mm f/2.8L — due in 11 days on Jun 28 · Pro Gear Rentals NYC', time: '1h ago', read: false, action: 'StudioManager/StudioManager.html' },
    { id: 1, type: 'warning', icon: 'ti ti-file-invoice', title: 'Invoice Overdue', body: 'Sarah Reed — Balance $570 is 5 days past due', time: '2h ago', read: false, action: 'StudioManager/StudioManager.html' },
    { id: 2, type: 'info', icon: 'ti ti-photo-up', title: 'Gallery Uploaded', body: 'Emma & Jake — 347 photos ready for client review', time: '3h ago', read: false, action: 'ClientGallery/ClientGallery.html' },
    { id: 3, type: 'success', icon: 'ti ti-circle-check', title: 'Contract Signed', body: 'Nexus Corp signed their headshot contract via Zoho Sign', time: '5h ago', read: true, action: 'StudioManager/StudioManager.html' },
    { id: 4, type: 'warning', icon: 'ti ti-alert-triangle', title: 'Equipment Due', body: 'Canon EF 400mm f/2.8L — return to Pro Gear Rentals Jun 28', time: '1 day ago', read: false, action: 'StudioManager/StudioManager.html' },
    { id: 5, type: 'info', icon: 'ti ti-user-plus', title: 'New Enquiry', body: 'Martinez Family submitted a booking enquiry for July 4', time: '2 days ago', read: true, action: 'StudioManager/StudioManager.html' },
    { id: 6, type: 'warning', icon: 'ti ti-clock', title: 'Gallery Expiring Soon', body: 'Sarah & Tom Engagement gallery expires in 7 days', time: '2 days ago', read: false, action: 'ClientGallery/ClientGallery.html' }
  ];

  function buildNotifPanel() {
    var unread = notifications.filter(function(n) { return !n.read; }).length;

    // Update badge
    var dot = document.querySelector('.notif-dot, .bell-dot');
    if (dot) dot.style.display = unread > 0 ? '' : 'none';

    var typeColors = { warning: '#f59e0b', info: '#2563eb', success: '#22c55e', danger: '#ef4444' };
    var typeBg = { warning: '#fffbeb', info: '#eff6ff', success: '#f0fdf4', danger: '#fff1f2' };

    var panel = document.getElementById('notif-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'notif-panel';
      panel.style.cssText = 'position:fixed;top:70px;right:16px;width:360px;background:#fff;border:1px solid #e8edf3;border-radius:14px;box-shadow:0 8px 32px rgba(0,0,0,0.14);z-index:9999;overflow:hidden;display:none;font-family:Inter,sans-serif;';
      document.body.appendChild(panel);
    }

    panel.innerHTML =
      '<div style="padding:14px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;">' +
        '<div style="font-size:14.5px;font-weight:700;color:#1a1d2e;">Notifications' + (unread > 0 ? ' <span style="background:#ef4444;color:#fff;font-size:10px;font-weight:700;padding:2px 6px;border-radius:10px;margin-left:4px;">' + unread + '</span>' : '') + '</div>' +
        '<button onclick="markAllRead()" style="font-size:12px;color:#2563eb;background:none;border:none;cursor:pointer;font-family:inherit;">Mark all read</button>' +
      '</div>' +
      '<div style="max-height:380px;overflow-y:auto;">' +
      notifications.map(function(n) {
        return '<div onclick="readNotif(' + n.id + ',this)" style="display:flex;gap:12px;padding:12px 18px;border-bottom:1px solid #f8fafc;cursor:pointer;background:' + (n.read ? '#fff' : '#f8faff') + ';transition:background .13s;" onmouseover="this.style.background=\'#f4f6fb\'" onmouseout="this.style.background=\'' + (n.read ? '#fff' : '#f8faff') + '\'">' +
          '<div style="width:34px;height:34px;border-radius:8px;background:' + typeBg[n.type] + ';display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
            '<i class="' + n.icon + '" style="font-size:16px;color:' + typeColors[n.type] + ';"></i>' +
          '</div>' +
          '<div style="flex:1;min-width:0;">' +
            '<div style="font-size:13px;font-weight:' + (n.read ? '400' : '600') + ';color:#1a1d2e;">' + n.title + '</div>' +
            '<div style="font-size:12px;color:#64748b;margin-top:2px;line-height:1.4;">' + n.body + '</div>' +
            '<div style="font-size:11px;color:#94a3b8;margin-top:4px;">' + n.time + '</div>' +
          '</div>' +
          (!n.read ? '<div style="width:8px;height:8px;background:#2563eb;border-radius:50%;margin-top:4px;flex-shrink:0;"></div>' : '') +
        '</div>';
      }).join('') +
      '</div>' +
      '<div style="padding:10px 18px;border-top:1px solid #f1f5f9;text-align:center;">' +
        '<a style="font-size:12.5px;color:#2563eb;cursor:pointer;">View all notifications →</a>' +
      '</div>';

    return panel;
  }

  function readNotif(id, el) {
    var n = notifications.find(function(x) { return x.id === id; });
    if (n) { n.read = true; el.style.background = '#fff'; buildNotifPanel(); }
  }

  function markAllRead() {
    notifications.forEach(function(n) { n.read = true; });
    buildNotifPanel();
  }

  function toggleNotifPanel(e) {
    if (e) e.stopPropagation();
    var panel = buildNotifPanel();
    var isOpen = panel.style.display === 'block';
    panel.style.display = isOpen ? 'none' : 'block';
  }

  // Wire bell icon click
  document.addEventListener('click', function(e) {
    var bell = e.target.closest('.icon-btn[title="Notifications"], .bell-wrap, .notif-btn');
    if (bell) { toggleNotifPanel(e); return; }
    var panel = document.getElementById('notif-panel');
    if (panel && !panel.contains(e.target)) panel.style.display = 'none';
  });

  /* ── 5. SPA navigation — swap main content, keep sidebar fixed ─────
     When any sidebar nav link is clicked, fetch the target page,
     replace ONLY the main content wrapper, update active state + URL.
     Sidebar never reloads or flickers. ──────────────────────────── */

  function getMainEl() {
    return document.querySelector('.main-wrapper') ||
           document.querySelector('.main-wrap')    ||
           document.querySelector('.main');
  }

  function updateActiveLinks(url) {
    var path = url.toLowerCase();
    document.querySelectorAll('.nav-item').forEach(function(link) {
      link.classList.remove('active');
    });
    var links = document.querySelectorAll('.nav-item[href]');
    links.forEach(function(link) {
      var href = (link.getAttribute('href') || '').toLowerCase();
      // resolve relative href against current path for matching
      if (href && path.indexOf(href.replace(/^(\.\.\/)+/, '').split('/')[0]) > -1) {
        link.classList.add('active');
      }
    });
    // Dashboard special case
    var isDash = path.indexOf('index.html') > -1 || (!path.match(/\/(studiomanager|clientgallery|website|store|mobilegalleryapp|settings)\//));
    if (isDash) {
      var dashLink = document.querySelector('.nav-item[href*="index.html"]');
      if (dashLink) dashLink.classList.add('active');
    }
  }

  function runScripts(container) {
    // Re-execute inline scripts from newly loaded content
    var scripts = container.querySelectorAll('script');
    scripts.forEach(function(s) {
      if (s.src) return; // external scripts already loaded globally
      try { new Function(s.textContent)(); } catch(e) {}
    });
  }

  function navigateTo(url) {
    var mainEl = getMainEl();
    if (!mainEl) { window.location.href = url; return; }

    // Dim content during load
    mainEl.style.opacity = '0.5';
    mainEl.style.transition = 'opacity 0.12s';

    fetch(url)
      .then(function(res) { return res.text(); })
      .then(function(htmlText) {
        var parser  = new DOMParser();
        var newDoc  = parser.parseFromString(htmlText, 'text/html');
        var newMain = newDoc.querySelector('.main-wrapper') ||
                      newDoc.querySelector('.main-wrap')    ||
                      newDoc.querySelector('.main');

        if (!newMain) { window.location.href = url; return; }

        // Swap content
        mainEl.innerHTML = newMain.innerHTML;
        mainEl.className = newMain.className;

        // Load any new CSS that this page needs (link tags in new head)
        newDoc.querySelectorAll('link[rel="stylesheet"]').forEach(function(lnk) {
          var href = lnk.getAttribute('href');
          if (!href || document.querySelector('link[href="' + href + '"]')) return;
          // Skip shared CSS already loaded globally
          if (href.indexOf('shared/') > -1 || href.indexOf('googleapis') > -1 ||
              href.indexOf('tabler') > -1) return;
          var newLink = document.createElement('link');
          newLink.rel = 'stylesheet';
          newLink.href = new URL(href, url).href;
          document.head.appendChild(newLink);
        });

        // Load Chart.js if new page needs it
        if (htmlText.indexOf('chart.umd.js') > -1 && !window.Chart) {
          var cs = document.createElement('script');
          cs.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
          cs.onload = function() { runScripts(mainEl); };
          document.head.appendChild(cs);
        } else {
          runScripts(mainEl);
        }

        // Update browser URL + title
        history.pushState({ url: url }, newDoc.title, url);
        document.title = newDoc.title;

        // Update active nav item
        updateActiveLinks(url);

        // Restore opacity
        mainEl.style.opacity = '1';
        window.scrollTo(0, 0);
      })
      .catch(function() {
        // Network error — fall back to normal navigation
        window.location.href = url;
      });
  }

  // Intercept sidebar nav link clicks
  document.addEventListener('click', function(e) {
    var link = e.target.closest('.nav-item[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || href === '#') return;

    e.preventDefault();

    // Resolve the href relative to the current page
    var absoluteUrl = new URL(href, window.location.href).href;
    navigateTo(absoluteUrl);
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', function(e) {
    if (e.state && e.state.url) {
      navigateTo(e.state.url);
    } else {
      // Fallback: do a real navigation to handle edge cases
      window.location.reload();
    }
  });

  // Store initial page state
  if (!history.state) {
    history.replaceState({ url: window.location.href }, document.title, window.location.href);
  }

  // ── Mobile hamburger menu ─────────────────────────────────────
  (function() {
    var btn = document.createElement('button');
    btn.className = 'hamburger-btn';
    btn.innerHTML = '<i class="ti ti-menu-2"></i>';
    btn.setAttribute('aria-label', 'Open menu');
    document.body.appendChild(btn);

    var overlay = document.createElement('div');
    overlay.className = 'sidebar-mobile-overlay';
    document.body.appendChild(overlay);

    function openSidebar() {
      var s = document.querySelector('.sidebar');
      if (s) s.classList.add('mobile-open');
      overlay.classList.add('active');
    }
    function closeSidebar() {
      var s = document.querySelector('.sidebar');
      if (s) s.classList.remove('mobile-open');
      overlay.classList.remove('active');
    }
    btn.addEventListener('click', openSidebar);
    overlay.addEventListener('click', closeSidebar);
    document.querySelectorAll('.nav-item').forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) closeSidebar();
      });
    });
  })();

})();

/**
 * LensFlow — Shared Sidebar (self-contained)
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
    p.indexOf('/studiomanager/')    > -1 ||
    p.indexOf('/clientgallery/')    > -1 ||
    p.indexOf('/website/')          > -1 ||
    p.indexOf('/store/')            > -1 ||
    p.indexOf('/mobilegalleryapp/') > -1 ||
    p.indexOf('/settings/')         > -1
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
        '<div class="logo-icon">📷</div>' +
        '<div>' +
          '<div class="logo-name">LensFlow</div>' +
          '<div class="logo-tag">Studio Platform</div>' +
        '</div>' +
      '</div>' +

      '<div class="nav-group">' +
        '<div class="nav-group-label">Overview</div>' +
        '<a href="' + r + 'index.html" class="' + a('dashboard') + '">' +
          '<i class="ti ti-layout-dashboard"></i> Dashboard' +
        '</a>' +
      '</div>' +

      '<div class="nav-group">' +
        '<div class="nav-group-label">Core Modules</div>' +
        '<a href="' + r + 'StudioManager/StudioManager.html" class="' + a('studiomanager') + '">' +
          '<i class="ti ti-calendar-event"></i> Studio Manager' +
        '</a>' +
        '<a href="' + r + 'ClientGallery/ClientGallery.html" class="' + a('clientgallery') + '">' +
          '<i class="ti ti-photo"></i> Client Gallery' +
          '<span class="nav-badge">3</span>' +
        '</a>' +
        '<a href="' + r + 'Website/Website.html" class="' + a('website') + '">' +
          '<i class="ti ti-world"></i> Website' +
        '</a>' +
        '<a href="' + r + 'Store/Store.html" class="' + a('/store/') + '">' +
          '<i class="ti ti-shopping-bag"></i> Store' +
          '<span class="nav-badge">7</span>' +
        '</a>' +
        '<a href="' + r + 'MobileGalleryApp/MobileGalleryApp.html" class="' + a('mobilegalleryapp') + '">' +
          '<i class="ti ti-device-mobile"></i> Mobile App' +
        '</a>' +
      '</div>' +

      '<div class="nav-divider"></div>' +

      '<div class="nav-group">' +
        '<div class="nav-group-label">Account</div>' +
        '<a href="' + r + 'Settings/Settings.html" class="' + a('settings') + '">' +
          '<i class="ti ti-settings"></i> Settings' +
        '</a>' +
        '<a href="#" class="nav-item">' +
          '<i class="ti ti-credit-card"></i> Billing' +
        '</a>' +
      '</div>' +

      '<div class="sidebar-footer">' +
        '<div class="s-avatar">SK</div>' +
        '<div>' +
          '<div class="s-name">Sarah Kim</div>' +
          '<div class="s-role">Studio Owner</div>' +
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

})();

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
        '<div class="logo-icon"><i class="ph-fill ph-camera" style="color:#fff;font-size:20px;"></i></div>' +
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
        '</a>' +
        '<a href="' + r + 'Website/Website.html" class="' + a('website') + '">' +
          '<i class="ti ti-world"></i> Website' +
        '</a>' +
        '<a href="' + r + 'Store/Store.html" class="' + a('/store/') + '">' +
          '<i class="ti ti-shopping-bag"></i> Store' +
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
    }
  });

})();

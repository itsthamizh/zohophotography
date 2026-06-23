/**
 * LensFlow — Central Data Store
 * All application data persists here via localStorage.
 * Initialises with realistic sample data on first load.
 */
(function () {
  'use strict';

  var INIT_KEY = 'lf_v2_initialized';

  var defaults = {

    bookings: [
      { id:'BK-001', client:'Emma & Jake Wilson', email:'emma@example.com', source:'Website Form', type:'Wedding',   date:'Jun 15, 2026', budget:'$3,800', status:'confirmed',  followup:'Contract signed',   action:'view' },
      { id:'BK-002', client:'Nexus Corp',          email:'hr@nexus.com',     source:'Social/Referral',type:'Corporate',  date:'Jun 17, 2026', budget:'$1,200', status:'confirmed',  followup:'Deposit due',       action:'view' },
      { id:'BK-003', client:'Liu Family',           email:'liu@example.com',  source:'Walk-in',      type:'Portrait',   date:'Jun 20, 2026', budget:'$650',   status:'confirmed',  followup:'—',                 action:'view' },
      { id:'BK-004', client:'Sarah & Tom Reed',     email:'sarah@example.com',source:'Website Form', type:'Engagement', date:'Jun 22, 2026', budget:'$950',   status:'confirmed',  followup:'—',                 action:'view' },
      { id:'BK-005', client:'Horizon Events',       email:'events@horizon.com',source:'Referral',    type:'Event',      date:'Jun 28, 2026', budget:'$2,400', status:'confirmed',  followup:'Contract sent',     action:'view' },
      { id:'BK-006', client:'Martinez Family',      email:'m@example.com',    source:'Instagram',    type:'Portrait',   date:'Jul 4, 2026',  budget:'$700',   status:'enquiry',    followup:'Call within 24h',   action:'convert' },
      { id:'BK-007', client:'Patel Wedding',        email:'p@example.com',    source:'Website Form', type:'Wedding',    date:'Jul 12, 2026', budget:'$4,200', status:'qualified',  followup:'Ready to convert',  action:'convert' },
      { id:'BK-008', client:'Chen Studio',          email:'c@example.com',    source:'Social/Referral',type:'Commercial',date:'Jul 18, 2026', budget:'$1,800', status:'qualified',  followup:'Awaiting budget',   action:'convert' },
      { id:'BK-009', client:'Thompson Family',      email:'t@example.com',    source:'Walk-in',      type:'Portrait',   date:'May 28, 2026', budget:'$550',   status:'completed',  followup:'Gallery delivered', action:'view' },
      { id:'BK-010', client:'Park Wedding',         email:'pw@example.com',   source:'Referral',     type:'Wedding',    date:'May 10, 2026', budget:'$3,500', status:'completed',  followup:'Review requested',  action:'view' },
      { id:'BK-011', client:'Williams Corp',        email:'wc@example.com',   source:'Website Form', type:'Corporate',  date:'Apr 22, 2026', budget:'$900',   status:'lost',       followup:'Nurture: 30 days',  action:'view' },
      { id:'BK-012', client:'Brown Family',         email:'bf@example.com',   source:'Instagram',    type:'Portrait',   date:'Apr 15, 2026', budget:'$600',   status:'lost',       followup:'Archived',          action:'view' }
    ],

    clients: [
      { name:'Emma & Jake Wilson', email:'emma@example.com',  phone:'(555) 234-5678', types:'Wedding',              sessions:1,  spent:'$3,800', lastSession:'Jun 15, 2026', status:'active' },
      { name:'Nexus Corp',          email:'hr@nexus.com',      phone:'(555) 345-6789', types:'Corporate',            sessions:3,  spent:'$3,600', lastSession:'Jun 17, 2026', status:'active' },
      { name:'Liu Family',          email:'liu@example.com',   phone:'(555) 456-7890', types:'Portrait',             sessions:2,  spent:'$1,300', lastSession:'Jun 20, 2026', status:'active' },
      { name:'Sarah & Tom Reed',    email:'sarah@example.com', phone:'(555) 567-8901', types:'Engagement, Wedding',  sessions:2,  spent:'$5,750', lastSession:'Jun 22, 2026', status:'active' },
      { name:'Rachel Thompson',     email:'rachel@example.com',phone:'(555) 678-9012', types:'Portrait',             sessions:4,  spent:'$2,800', lastSession:'May 28, 2026', status:'active' },
      { name:'Chen Family',         email:'chen@example.com',  phone:'(555) 789-0123', types:'Portrait',             sessions:3,  spent:'$1,950', lastSession:'Apr 12, 2026', status:'inactive' },
      { name:'Horizon Events',      email:'events@horizon.com',phone:'(555) 890-1234', types:'Event, Commercial',    sessions:5,  spent:'$8,400', lastSession:'Jun 28, 2026', status:'active' },
      { name:'Park Family',         email:'park@example.com',  phone:'(555) 901-2345', types:'Wedding, Portrait',    sessions:3,  spent:'$4,200', lastSession:'Mar 10, 2026', status:'inactive' }
    ],

    invoices: [
      { num:'INV-2847', client:'Emma Wilson',    type:'Balance Payment',   issued:'Jun 15', due:'Jun 15', amount:'$2,280', status:'paid',     zoho:'Synced', zohoPending:false },
      { num:'INV-2846', client:'Emma Wilson',    type:'Deposit (50%)',     issued:'May 28', due:'Jun 1',  amount:'$1,520', status:'paid',     zoho:'Synced', zohoPending:false },
      { num:'INV-2845', client:'Nexus Corp',     type:'Deposit (30%)',     issued:'Jun 10', due:'Jun 14', amount:'$360',  status:'paid',     zoho:'Synced', zohoPending:false },
      { num:'INV-2844', client:'Nexus Corp',     type:'Balance',           issued:'Jun 17', due:'Jun 17', amount:'$840',  status:'sent',     zoho:'Synced', zohoPending:false },
      { num:'INV-2843', client:'Horizon Events', type:'Deposit (30%)',     issued:'Jun 8',  due:'Jun 12', amount:'$720',  status:'paid',     zoho:'Synced', zohoPending:false },
      { num:'INV-2842', client:'Horizon Events', type:'Balance',           issued:'Jun 28', due:'Jun 28', amount:'$1,680',status:'sent',     zoho:'Pending',zohoPending:true },
      { num:'INV-2841', client:'Liu Family',     type:'Full Payment',      issued:'Jun 20', due:'Jun 25', amount:'$650',  status:'sent',     zoho:'Synced', zohoPending:false },
      { num:'INV-2840', client:'Martinez Family',type:'Deposit',           issued:'Jun 14', due:'Jun 18', amount:'$210',  status:'draft',    zoho:'Not sent',zohoPending:false },
      { num:'INV-2839', client:'Sarah Reed',     type:'Balance',           issued:'May 22', due:'May 28', amount:'$570',  status:'overdue',  zoho:'Synced', zohoPending:false },
      { num:'INV-2838', client:'Williams Corp',  type:'Full Payment',      issued:'Apr 15', due:'Apr 22', amount:'$900',  status:'overdue',  zoho:'Synced', zohoPending:false }
    ],

    contracts: [
      { num:'CON-2847', client:'Emma & Jake Wilson', type:'Wedding',    sent:'Jun 1',  signed:'Jun 3',  value:'$3,800', status:'signed', zoho:'Completed' },
      { num:'CON-2846', client:'Nexus Corp',          type:'Headshots',  sent:'Jun 8',  signed:'Jun 10', value:'$1,200', status:'signed', zoho:'Completed' },
      { num:'CON-2845', client:'Horizon Events',      type:'Event',      sent:'Jun 9',  signed:'',       value:'$2,400', status:'sent',   zoho:'Awaiting' },
      { num:'CON-2844', client:'Sarah & Tom Reed',    type:'Engagement', sent:'Jun 5',  signed:'Jun 6',  value:'$950',   status:'signed', zoho:'Completed' },
      { num:'CON-2843', client:'Liu Family',          type:'Portrait',   sent:'Jun 12', signed:'Jun 13', value:'$650',   status:'signed', zoho:'Completed' },
      { num:'CON-2842', client:'Patel Wedding',       type:'Wedding',    sent:'Jun 14', signed:'',       value:'$4,200', status:'sent',   zoho:'Awaiting' },
      { num:'CON-2841', client:'Chen Studio',         type:'Commercial', sent:'Jun 14', signed:'',       value:'$1,800', status:'sent',   zoho:'Awaiting' },
      { num:'CON-2840', client:'Martinez Family',     type:'Portrait',   sent:'',       signed:'',       value:'$700',   status:'draft',  zoho:'Not sent' },
      { num:'CON-2839', client:'Park Wedding',        type:'Wedding',    sent:'Mar 1',  signed:'Mar 4',  value:'$3,500', status:'signed', zoho:'Completed' },
      { num:'CON-2838', client:'Thompson Family',     type:'Portrait',   sent:'Apr 10', signed:'Apr 12', value:'$550',   status:'signed', zoho:'Completed' }
    ],

    equipment_status: {}  // key: serial → { status, assignedTo }
  };

  /* ── Public API ────────────────────────────────────────────── */
  window.LFData = {
    _key: function (k) { return 'lf_' + k; },

    init: function () {
      if (localStorage.getItem(INIT_KEY)) return;
      var self = this;
      Object.keys(defaults).forEach(function (k) {
        if (!localStorage.getItem(self._key(k))) {
          localStorage.setItem(self._key(k), JSON.stringify(defaults[k]));
        }
      });
      localStorage.setItem(INIT_KEY, '1');
    },

    get: function (k) {
      try { return JSON.parse(localStorage.getItem(this._key(k))) || defaults[k] || []; }
      catch (e) { return defaults[k] || []; }
    },

    set: function (k, v) {
      localStorage.setItem(this._key(k), JSON.stringify(v));
    },

    add: function (k, item) {
      var arr = this.get(k);
      arr.unshift(item);
      this.set(k, arr);
      return arr;
    },

    update: function (k, matchFn, updFn) {
      var arr = this.get(k);
      arr = arr.map(function (item) { return matchFn(item) ? updFn(item) : item; });
      this.set(k, arr);
      return arr;
    },

    remove: function (k, matchFn) {
      var arr = this.get(k).filter(function (item) { return !matchFn(item); });
      this.set(k, arr);
      return arr;
    },

    /* Filter state helpers */
    saveFilter: function (tabId, values) {
      sessionStorage.setItem('filter_' + tabId, JSON.stringify(values));
    },
    getFilter: function (tabId) {
      try { return JSON.parse(sessionStorage.getItem('filter_' + tabId)) || {}; }
      catch (e) { return {}; }
    }
  };

  window.LFData.init();

})();

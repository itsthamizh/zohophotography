// ══ SHOOT EQUIPMENT LOG & SERVICE TRACKER ══

// ── Staff / Crew Directory ────────────────────────────────────
var STAFF_LIST = [
  { id:'STF-001', name:'Alex Kumar',   role:'Lead Photographer',    phone:'+65 9123 4567', initials:'AK', color:'#2563eb' },
  { id:'STF-002', name:'Priya Nair',   role:'Junior Photographer',  phone:'+65 8765 4321', initials:'PN', color:'#7c3aed' },
  { id:'STF-003', name:'Ravi Singh',   role:'Light Man',            phone:'+65 9876 5432', initials:'RS', color:'#d97706' },
  { id:'STF-004', name:'Maya Chen',    role:'Lighting Assistant',   phone:'+65 9111 2222', initials:'MC', color:'#059669' },
  { id:'STF-005', name:'Thamizh S.',   role:'Studio Manager',       phone:'+65 9000 0001', initials:'TS', color:'#dc2626' },
];

var CAMERAS = [
  { id:'SON-A7RV-001', name:'Sony A7R V (Primary)',   cat:'Camera',   totalShots:45230, shotsSince:12450, svcIntervalShots:50000, lastSvcDate:'2026-01-15', svcIntervalDays:180 },
  { id:'SON-A7RV-002', name:'Sony A7R V (Backup)',    cat:'Camera',   totalShots:28100, shotsSince:28100, svcIntervalShots:50000, lastSvcDate:'2025-10-01', svcIntervalDays:180 },
  { id:'SON-A1-001',   name:'Sony A1',                cat:'Camera',   totalShots:62400, shotsSince:8200,  svcIntervalShots:50000, lastSvcDate:'2026-03-10', svcIntervalDays:180 },
  { id:'PRO-B10X-001', name:'Profoto B10X Plus (1)',  cat:'Lighting', totalShots:0,     shotsSince:0,     svcIntervalShots:0,     lastSvcDate:'2025-09-01', svcIntervalDays:180 },
  { id:'PRO-B10X-002', name:'Profoto B10X Plus (2)',  cat:'Lighting', totalShots:0,     shotsSince:0,     svcIntervalShots:0,     lastSvcDate:'2025-09-01', svcIntervalDays:180 },
  { id:'GOD-600-001',  name:'Godox AD600 Pro',        cat:'Lighting', totalShots:0,     shotsSince:0,     svcIntervalShots:0,     lastSvcDate:'2026-01-01', svcIntervalDays:365 },
];

var GEAR_OPTIONS = [
  { id:'SON-A7RV-001', name:'Sony A7R V (Primary)',   cat:'Camera',    status:'available' },
  { id:'SON-A7RV-002', name:'Sony A7R V (Backup)',    cat:'Camera',    status:'available' },
  { id:'SON-A1-001',   name:'Sony A1',                cat:'Camera',    status:'damaged'   },
  { id:'SON-2470-001', name:'Sony 24-70mm f/2.8 GM', cat:'Lens',      status:'available' },
  { id:'SON-85GM-001', name:'Sony 85mm f/1.4 GM',    cat:'Lens',      status:'service'   },
  { id:'SON-135G-001', name:'Sony 135mm f/1.8 GM',   cat:'Lens',      status:'available' },
  { id:'PRO-B10X-001', name:'Profoto B10X Plus (1)', cat:'Lighting',  status:'available' },
  { id:'PRO-B10X-002', name:'Profoto B10X Plus (2)', cat:'Lighting',  status:'available' },
  { id:'GOD-600-001',  name:'Godox AD600 Pro',        cat:'Lighting',  status:'available' },
  { id:'MAN-055-001',  name:'Manfrotto Tripod',       cat:'Accessory', status:'available' },
  { id:'DJI-RS3-001',  name:'DJI RS3 Pro Gimbal',    cat:'Accessory', status:'available' },
  { id:'SD-256-SET',   name:'SanDisk 256GB (x3)',     cat:'Memory',    status:'available' },
];

var SHOOT_ALLOC = [
  { id:'SA-001', shootName:'Emma & Jake — Wedding',    date:'Jun 15, 2026', type:'Wedding',    status:'completed',
    team:[{staffId:'STF-001',name:'Alex Kumar',role:'Lead Photographer',initials:'AK',color:'#2563eb'},{staffId:'STF-002',name:'Priya Nair',role:'Junior Photographer',initials:'PN',color:'#7c3aed'},{staffId:'STF-003',name:'Ravi Singh',role:'Light Man',initials:'RS',color:'#d97706'},{staffId:'STF-004',name:'Maya Chen',role:'Lighting Assistant',initials:'MC',color:'#059669'}],
    gear:[{id:'SON-A7RV-001',name:'Sony A7R V (Primary)',cat:'Camera'},{id:'SON-A7RV-002',name:'Sony A7R V (Backup)',cat:'Camera'},{id:'PRO-B10X-001',name:'Profoto B10X Plus (1)',cat:'Lighting'},{id:'PRO-B10X-002',name:'Profoto B10X Plus (2)',cat:'Lighting'},{id:'SON-2470-001',name:'Sony 24-70mm f/2.8',cat:'Lens'},{id:'MAN-055-001',name:'Manfrotto Tripod',cat:'Accessory'}],
    usageLog:{'SON-A7RV-001':{shots:847,returned:true,condition:'Excellent',notes:'Battery 40% on return'},'SON-A7RV-002':{shots:412,returned:true,condition:'Good',notes:''}} },
  { id:'SA-002', shootName:'Nexus Corp — Headshots',   date:'Jun 17, 2026', type:'Corporate',  status:'allocated',
    team:[{staffId:'STF-001',name:'Alex Kumar',role:'Lead Photographer',initials:'AK',color:'#2563eb'},{staffId:'STF-003',name:'Ravi Singh',role:'Light Man',initials:'RS',color:'#d97706'}],
    gear:[{id:'SON-A7RV-001',name:'Sony A7R V (Primary)',cat:'Camera'},{id:'PRO-B10X-001',name:'Profoto B10X Plus (1)',cat:'Lighting'},{id:'SON-2470-001',name:'Sony 24-70mm f/2.8',cat:'Lens'}],
    usageLog:{} },
  { id:'SA-003', shootName:'Liu Family — Portrait',    date:'Jun 20, 2026', type:'Portrait',   status:'pending',
    team:[{staffId:'STF-002',name:'Priya Nair',role:'Lead Photographer',initials:'PN',color:'#7c3aed'}],
    gear:[], usageLog:{} },
  { id:'SA-004', shootName:'Sarah & Tom — Engagement', date:'Jun 22, 2026', type:'Engagement', status:'pending',
    team:[],
    gear:[], usageLog:{} },
  { id:'SA-005', shootName:'Horizon Events — Gala',   date:'Jun 28, 2026', type:'Event',      status:'pending',
    team:[{staffId:'STF-001',name:'Alex Kumar',role:'Lead Photographer',initials:'AK',color:'#2563eb'},{staffId:'STF-002',name:'Priya Nair',role:'Junior Photographer',initials:'PN',color:'#7c3aed'},{staffId:'STF-003',name:'Ravi Singh',role:'Light Man',initials:'RS',color:'#d97706'},{staffId:'STF-004',name:'Maya Chen',role:'Lighting Assistant',initials:'MC',color:'#059669'}],
    gear:[], usageLog:{} },
  { id:'SA-006', shootName:'Patel — Wedding',          date:'Jul 1, 2026',  type:'Wedding',    status:'allocated',
    team:[{staffId:'STF-001',name:'Alex Kumar',role:'Lead Photographer',initials:'AK',color:'#2563eb'},{staffId:'STF-002',name:'Priya Nair',role:'Junior Photographer',initials:'PN',color:'#7c3aed'},{staffId:'STF-003',name:'Ravi Singh',role:'Light Man',initials:'RS',color:'#d97706'},{staffId:'STF-004',name:'Maya Chen',role:'Lighting Assistant',initials:'MC',color:'#059669'}],
    gear:[{id:'SON-A7RV-001',name:'Sony A7R V (Primary)',cat:'Camera'},{id:'SON-A7RV-002',name:'Sony A7R V (Backup)',cat:'Camera'},{id:'PRO-B10X-001',name:'Profoto B10X Plus (1)',cat:'Lighting'},{id:'PRO-B10X-002',name:'Profoto B10X Plus (2)',cat:'Lighting'},{id:'SON-2470-001',name:'Sony 24-70mm f/2.8',cat:'Lens'},{id:'SON-135G-001',name:'Sony 135mm f/1.8 GM',cat:'Lens'},{id:'MAN-055-001',name:'Manfrotto Tripod',cat:'Accessory'},{id:'DJI-RS3-001',name:'DJI RS3 Pro Gimbal',cat:'Accessory'},{id:'SD-256-SET',name:'SanDisk 256GB (x3)',cat:'Memory'}],
    usageLog:{} },
];

// ── Status helpers ────────────────────────────────────────────
var STATUS_CLASS = { completed:'completed', allocated:'allocated', pending:'pending', in_progress:'in-progress' };
var STATUS_LBL   = { completed:'Completed', allocated:'Gear Allocated', pending:'Not Allocated', in_progress:'In Progress' };

// ── Render Shoot Allocation Table ─────────────────────────────
function renderShootAllocTable() {
  var tbody = document.getElementById('shoot-alloc-tbody');
  if (!tbody) return;
  tbody.innerHTML = SHOOT_ALLOC.map(function(shoot) {
    var sc    = STATUS_CLASS[shoot.status] || 'pending';
    var sl    = STATUS_LBL[shoot.status]   || 'Not Allocated';
    var badge = '<span class="tbl-badge ' + sc + '"><span class="dot"></span>' + sl + '</span>';

    // Team avatars
    var teamHtml = shoot.team && shoot.team.length
      ? '<div style="display:flex;gap:-4px;align-items:center;">'
        + shoot.team.slice(0,4).map(function(m){
            return '<div title="'+m.name+' — '+m.role+'" style="width:26px;height:26px;border-radius:50%;background:'+m.color+';border:2px solid #fff;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff;margin-left:-6px;flex-shrink:0;">' + m.initials + '</div>';
          }).join('')
        + (shoot.team.length > 4 ? '<div style="width:26px;height:26px;border-radius:50%;background:#e2e8f0;border:2px solid #fff;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#64748b;margin-left:-6px;">+' + (shoot.team.length-4) + '</div>' : '')
        + '</div>'
      : '<span style="color:#94a3b8;font-size:12.5px;">No crew assigned</span>';

    // Gear tags
    var gear = shoot.gear.length === 0
      ? '<span style="color:#94a3b8;font-size:13px;">No gear allocated</span>'
      : shoot.gear.map(function(g){ return '<span style="font-size:12px;background:#f1f5f9;color:#475569;padding:2px 8px;border-radius:4px;font-weight:500;margin-right:3px;">' + g.cat + '</span>'; }).join('') + '<span style="font-size:12px;color:#94a3b8;margin-left:2px;">(' + shoot.gear.length + ')</span>';

    var action = shoot.status === 'completed'
      ? '<button data-fn="usage" data-sid="' + shoot.id + '" onclick="event.stopPropagation()" class="tbl-btn"><i class="ti ti-chart-bar"></i> Usage Report</button>'
      : shoot.status === 'in_progress'
      ? '<button data-fn="end" data-sid="' + shoot.id + '" onclick="event.stopPropagation()" class="tbl-btn success"><i class="ti ti-player-stop"></i> End Shoot</button>'
      : shoot.status === 'allocated'
      ? '<button data-fn="start" data-sid="' + shoot.id + '" onclick="event.stopPropagation()" class="tbl-btn primary" style="margin-right:5px;"><i class="ti ti-player-play"></i> Start</button><button data-fn="log" data-sid="' + shoot.id + '" onclick="event.stopPropagation()" class="tbl-btn"><i class="ti ti-check"></i> Log Shots</button>'
      : '<button data-fn="plan" data-sid="' + shoot.id + '" onclick="event.stopPropagation()" class="tbl-btn primary"><i class="ti ti-users-plus"></i> Plan Shoot</button>';

    return '<tr style="border-bottom:1px solid #f1f5f9;cursor:pointer;" onclick="openShootLogDetail(\'' + shoot.id + '\')" onmouseover="this.style.background=\'#f8fafc\'" onmouseout="this.style.background=\'\'">' +
      '<td style="padding:14px 18px;"><div style="font-size:14px;font-weight:600;color:#1a1d2e;">' + shoot.shootName + '</div><div style="font-size:12px;color:#94a3b8;margin-top:2px;">' + shoot.type + '</div></td>' +
      '<td style="padding:14px 18px;font-size:13.5px;font-weight:500;color:#1a1d2e;">' + shoot.date + '</td>' +
      '<td style="padding:14px 18px;">' + teamHtml + '</td>' +
      '<td style="padding:14px 18px;">' + gear + '</td>' +
      '<td style="padding:14px 18px;">' + badge + '</td>' +
      '<td style="padding:14px 18px;text-align:center;">' + action + '</td>' +
    '</tr>';
  }).join('');
}

// ── Render Service Tracker Table ──────────────────────────────
function renderServiceTable() {
  var tbody = document.getElementById('service-tbody');
  if (!tbody) return;
  var today = new Date('2026-06-26');
  tbody.innerHTML = CAMERAS.map(function(cam) {
    var lastSvc  = new Date(cam.lastSvcDate);
    var calDue   = new Date(lastSvc); calDue.setDate(calDue.getDate() + cam.svcIntervalDays);
    var daysLeft = Math.ceil((calDue - today) / 86400000);
    var pct      = cam.svcIntervalShots > 0 ? Math.min(100, Math.round(cam.shotsSince / cam.svcIntervalShots * 100)) : 0;
    var calSt    = daysLeft < 0 ? 'over' : daysLeft <= 30 ? 'soon' : 'ok';
    var cntSt    = cam.svcIntervalShots > 0 ? (pct >= 100 ? 'over' : pct >= 80 ? 'soon' : 'ok') : 'ok';
    var worst    = (calSt==='over'||cntSt==='over') ? 'over' : (calSt==='soon'||cntSt==='soon') ? 'soon' : 'ok';
    var stClass = {over:'svc-over',soon:'svc-soon',ok:'svc-ok'}[worst];
    var stLbl   = {over:'Service Overdue',soon:'Due Soon',ok:'OK'}[worst];
    var barCol  = pct>=100?'#ef4444':pct>=80?'#f59e0b':'#22c55e';
    var progress = cam.svcIntervalShots > 0
      ? '<div style="display:flex;align-items:center;gap:8px;"><div style="flex:1;height:8px;background:#e8edf3;border-radius:4px;overflow:hidden;min-width:80px;"><div style="width:'+pct+'%;height:100%;background:'+barCol+';border-radius:4px;"></div></div><span style="font-size:12.5px;font-weight:700;color:'+barCol+';">'+pct+'%</span></div><div style="font-size:11.5px;color:#94a3b8;margin-top:3px;">'+(Math.max(0,cam.svcIntervalShots-cam.shotsSince).toLocaleString())+' shots left</div>'
      : '<span style="font-size:12.5px;color:#94a3b8;">N/A</span>';
    var calStr = calDue.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) + '<div style="font-size:11.5px;color:'+({over:'#dc2626',soon:'#d97706',ok:'#94a3b8'}[calSt])+';">'+(daysLeft<0?Math.abs(daysLeft)+' days overdue':daysLeft+' days away')+'</div>';
    return '<tr style="border-bottom:1px solid #f1f5f9;cursor:pointer;" onclick="openServiceDetail(\'' + cam.id + '\')" onmouseover="this.style.background=\'#f8fafc\'" onmouseout="this.style.background=\'\'">' +
      '<td style="padding:15px 18px;"><div style="font-size:14.5px;font-weight:700;color:#1a1d2e;">' + cam.name + '</div><div style="font-size:12.5px;color:#94a3b8;margin-top:3px;">' + cam.id + ' · ' + cam.cat + '</div></td>' +
      '<td style="padding:15px 18px;font-size:16px;font-weight:800;color:#1a1d2e;">' + cam.totalShots.toLocaleString() + '<div style="font-size:12px;font-weight:400;color:#94a3b8;">lifetime</div></td>' +
      '<td style="padding:15px 18px;font-size:16px;font-weight:800;color:'+(cam.shotsSince>40000?'#dc2626':cam.shotsSince>30000?'#d97706':'#1a1d2e')+'">' + (cam.svcIntervalShots>0 ? cam.shotsSince.toLocaleString() : '—') + '<div style="font-size:12px;font-weight:400;color:#94a3b8;">since service</div></td>' +
      '<td style="padding:15px 18px;">' + progress + '</td>' +
      '<td style="padding:15px 18px;font-size:14px;color:#475569;">' + new Date(cam.lastSvcDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) + '</td>' +
      '<td style="padding:15px 18px;font-size:14px;color:#475569;">' + calStr + '</td>' +
      '<td style="padding:13px 18px;"><span class="tbl-badge ' + stClass + '"><span class="dot"></span>' + stLbl + '</span></td>' +
      '<td style="padding:13px 18px;text-align:center;"><button data-fn="svc" data-sid="' + cam.id + '" onclick="event.stopPropagation()" class="tbl-btn"><i class="ti ti-tool"></i> Mark Serviced</button></td>' +
    '</tr>';
  }).join('');
}

// ── Event delegation for all shoot/service buttons ────────────
document.addEventListener('click', function(e) {
  var btn = e.target.closest('[data-fn]');
  if (!btn) return;
  var fn  = btn.dataset.fn;
  var sid = btn.dataset.sid;
  if (!fn || !sid) return;
  if (fn === 'usage') openUsageDetail(sid);
  if (fn === 'alloc') openAllocateModal(sid);
  if (fn === 'plan')  openPlanShootModal(sid);
  if (fn === 'log')   openPostShootLog(sid);
  if (fn === 'svc')   openMarkServiced(sid);
  if (fn === 'start') startShoot(sid);
  if (fn === 'end')   endShoot(sid);
  if (fn === 'team')  openTeamAllocModal(sid);
});

// ── Start Shoot ───────────────────────────────────────────────
function startShoot(shootId) {
  var shoot = SHOOT_ALLOC.find(function(s){ return s.id === shootId; });
  if (!shoot) return;
  shoot.status = 'in_progress';
  shoot.startedAt = new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
  renderShootAllocTable();
  var ov = document.getElementById('eq-detail-overlay');
  if (ov) { ov.remove(); openShootLogDetail(shootId); }
  if (typeof showToast === 'function') showToast('Shoot started — ' + shoot.shootName);
}

// ── End Shoot ─────────────────────────────────────────────────
function endShoot(shootId) {
  var shoot = SHOOT_ALLOC.find(function(s){ return s.id === shootId; });
  if (!shoot) return;
  shoot.status = 'completed';
  shoot.endedAt = new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
  renderShootAllocTable();
  var ov = document.getElementById('eq-detail-overlay');
  if (ov) ov.remove();
  openPostShootLog(shootId);
}

// ── Allocate Gear Modal ───────────────────────────────────────
function openAllocateModal(shootId) {
  var shoot = SHOOT_ALLOC.find(function(s){ return s.id === shootId; });
  if (!shoot) {
    var ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9998;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;';
    ov.addEventListener('click',function(e){if(e.target===ov)ov.remove();});
    var box = document.createElement('div');
    box.style.cssText = 'background:#fff;border-radius:14px;width:420px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.2);padding:24px;';
    box.innerHTML = '<div style="font-size:16px;font-weight:800;color:#1a1d2e;margin-bottom:16px;">Select Shoot</div>';
    var sel = document.createElement('select');
    sel.style.cssText = 'width:100%;border:2px solid #e2e8f0;border-radius:10px;padding:12px 14px;font-size:14px;font-family:inherit;outline:none;';
    sel.innerHTML = '<option value="">— Select a shoot —</option>' +
      SHOOT_ALLOC.filter(function(s){return s.status!=='completed';}).map(function(s){
        return '<option value="'+s.id+'">'+s.shootName+' · '+s.date+'</option>';
      }).join('');
    sel.addEventListener('change',function(){ if(sel.value){ov.remove();openAllocateModal(sel.value);} });
    box.appendChild(sel);
    var cancelBtn = document.createElement('button');
    cancelBtn.textContent='Cancel';
    cancelBtn.style.cssText='margin-top:14px;width:100%;padding:11px;border:1.5px solid #e2e8f0;border-radius:9px;background:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;color:#475569;';
    cancelBtn.addEventListener('click',function(){ov.remove();});
    box.appendChild(cancelBtn);
    ov.appendChild(box); document.body.appendChild(ov);
    return;
  }

  var ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9998;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;padding:20px;';
  ov.addEventListener('click',function(e){if(e.target===ov)ov.remove();});
  var box = document.createElement('div');
  box.style.cssText = 'background:#fff;border-radius:16px;width:640px;max-width:100%;max-height:90vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.2);';
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:20px 24px;border-bottom:1px solid #f1f5f9;background:#eff6ff;flex-shrink:0;display:flex;justify-content:space-between;align-items:center;';
  hdr.innerHTML = '<div><div style="font-size:17px;font-weight:800;color:#1e40af;">Allocate Equipment</div><div style="font-size:13px;color:#2563eb;margin-top:3px;">'+shoot.shootName+' · '+shoot.date+'</div></div>';
  var xBtn=document.createElement('button');xBtn.innerHTML='&#x2715;';xBtn.style.cssText='background:none;border:none;font-size:22px;cursor:pointer;color:#94a3b8;';xBtn.addEventListener('click',function(){ov.remove();});hdr.appendChild(xBtn);box.appendChild(hdr);
  var body=document.createElement('div');body.style.cssText='flex:1;overflow-y:auto;padding:20px 24px;';
  ['Camera','Lens','Lighting','Accessory','Memory'].forEach(function(cat){
    var items=GEAR_OPTIONS.filter(function(g){return g.cat===cat;});
    if(!items.length)return;
    var catHdr=document.createElement('div');catHdr.style.cssText='font-size:11.5px;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:.7px;margin:14px 0 8px;';catHdr.textContent=cat+'s';body.appendChild(catHdr);
    items.forEach(function(gear){
      var isAlloc=shoot.gear.some(function(g){return g.id===gear.id;});
      var isUnavail=gear.status!=='available'&&!isAlloc;
      var lbl=document.createElement('label');
      lbl.style.cssText='display:flex;align-items:center;gap:12px;padding:11px 14px;border:1.5px solid '+(isAlloc?'#bfdbfe':'#e2e8f0')+';border-radius:9px;margin-bottom:6px;cursor:'+(isUnavail?'not-allowed':'pointer')+';background:'+(isAlloc?'#eff6ff':isUnavail?'#f9fafb':'#fff')+';';
      var cb=document.createElement('input');cb.type='checkbox';cb.checked=isAlloc;cb.disabled=isUnavail;cb.dataset.gid=gear.id;cb.style.cssText='width:18px;height:18px;accent-color:#2563eb;flex-shrink:0;cursor:pointer;';
      var info=document.createElement('div');info.style.cssText='flex:1;';
      info.innerHTML='<div style="font-size:14px;font-weight:600;color:'+(isUnavail?'#94a3b8':'#1a1d2e')+';">'+gear.name+'</div><div style="font-size:12px;color:#94a3b8;margin-top:2px;">'+gear.id+(isUnavail?' · <span style="color:#dc2626;font-weight:600;">'+gear.status.toUpperCase()+'</span>':'')+'</div>';
      lbl.appendChild(cb);lbl.appendChild(info);
      if(isAlloc){var b2=document.createElement('span');b2.textContent='Allocated';b2.style.cssText='font-size:11.5px;font-weight:700;background:#bfdbfe;color:#1d4ed8;padding:2px 8px;border-radius:4px;';lbl.appendChild(b2);}
      body.appendChild(lbl);
    });
  });
  box.appendChild(body);
  var ftr=document.createElement('div');ftr.style.cssText='padding:16px 24px;border-top:1px solid #f1f5f9;display:flex;justify-content:flex-end;gap:10px;background:#fafbfc;flex-shrink:0;';
  var cancel=document.createElement('button');cancel.textContent='Cancel';cancel.style.cssText='padding:10px 20px;border:1.5px solid #e2e8f0;border-radius:9px;background:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;color:#475569;';cancel.addEventListener('click',function(){ov.remove();});
  var save=document.createElement('button');save.innerHTML='<i class="ti ti-check"></i> Save Allocation';save.style.cssText='padding:10px 20px;border:none;border-radius:9px;background:#2563eb;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;color:#fff;display:flex;align-items:center;gap:7px;';
  save.addEventListener('click',function(){
    shoot.gear=Array.from(body.querySelectorAll('input[type=checkbox]:checked')).map(function(cb){var g=GEAR_OPTIONS.find(function(x){return x.id===cb.dataset.gid;});return g||{id:cb.dataset.gid,name:cb.dataset.gid,cat:'Equipment'};});
    if(shoot.gear.length>0&&shoot.status==='pending')shoot.status='allocated';
    renderShootAllocTable();ov.remove();showToast('Equipment allocated for '+shoot.shootName);
  });
  ftr.appendChild(cancel);ftr.appendChild(save);box.appendChild(ftr);ov.appendChild(box);document.body.appendChild(ov);
}

// ── Team Allocation Modal ─────────────────────────────────────
function openTeamAllocModal(shootId) {
  var shoot = SHOOT_ALLOC.find(function(s){ return s.id === shootId; });
  if (!shoot) return;
  var ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9998;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;padding:20px;';
  ov.addEventListener('click', function(e){ if(e.target===ov) ov.remove(); });
  var box = document.createElement('div');
  box.style.cssText = 'background:#fff;border-radius:16px;width:520px;max-width:100%;max-height:88vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.22);';
  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:18px 24px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;';
  hdr.innerHTML = '<div><div style="font-size:16px;font-weight:700;color:#111827;">Assign Crew</div><div style="font-size:12.5px;color:#6b7280;margin-top:2px;">' + shoot.shootName + ' · ' + shoot.date + '</div></div>';
  var xBtn = document.createElement('button'); xBtn.innerHTML = '&#x2715;';
  xBtn.style.cssText = 'background:none;border:none;font-size:20px;cursor:pointer;color:#94a3b8;';
  xBtn.addEventListener('click', function(){ ov.remove(); }); hdr.appendChild(xBtn); box.appendChild(hdr);
  var body = document.createElement('div'); body.style.cssText = 'flex:1;overflow-y:auto;padding:18px 24px;';
  var roleOpts = ['Lead Photographer','Junior Photographer','Light Man','Lighting Assistant','Videographer','Drone Operator','Studio Manager','Assistant'];
  STAFF_LIST.forEach(function(staff) {
    var isAssigned = shoot.team && shoot.team.some(function(m){ return m.staffId === staff.id; });
    var assignedMember = shoot.team && shoot.team.find(function(m){ return m.staffId === staff.id; });
    var lbl = document.createElement('div');
    lbl.style.cssText = 'display:flex;align-items:center;gap:14px;padding:12px 14px;border:1.5px solid ' + (isAssigned?'#bfdbfe':'#e2e8f0') + ';border-radius:10px;margin-bottom:8px;background:' + (isAssigned?'#eff6ff':'#fff') + ';';
    lbl.innerHTML = '<div style="width:36px;height:36px;border-radius:50%;background:' + staff.color + ';display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0;">' + staff.initials + '</div>'
      + '<div style="flex:1;"><div style="font-size:13.5px;font-weight:600;color:#111827;">' + staff.name + '</div><div style="font-size:12px;color:#9ca3af;">' + staff.phone + '</div></div>'
      + '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">'
      + '<select data-sid="' + staff.id + '" style="border:1.5px solid #e2e8f0;border-radius:7px;padding:5px 10px;font-size:12.5px;font-family:inherit;outline:none;background:#fff;min-width:160px;">'
        + '<option value="">— Not assigned —</option>'
        + roleOpts.map(function(r){ return '<option value="' + r + '"' + ((assignedMember && assignedMember.role===r)?' selected':'') + '>' + r + '</option>'; }).join('')
      + '</select></div>';
    lbl.querySelector('select').addEventListener('change', function(e){
      lbl.style.borderColor = e.target.value ? '#bfdbfe' : '#e2e8f0';
      lbl.style.background  = e.target.value ? '#eff6ff' : '#fff';
    });
    body.appendChild(lbl);
  });
  box.appendChild(body);
  var ftr = document.createElement('div'); ftr.style.cssText = 'padding:14px 24px;border-top:1px solid #f1f5f9;display:flex;justify-content:flex-end;gap:10px;background:#fafbfc;flex-shrink:0;';
  var cancel = document.createElement('button'); cancel.textContent = 'Cancel';
  cancel.style.cssText = 'padding:9px 18px;border:1.5px solid #e2e8f0;border-radius:8px;background:#fff;font-size:13.5px;font-weight:500;cursor:pointer;font-family:inherit;color:#475569;';
  cancel.addEventListener('click', function(){ ov.remove(); });
  var save = document.createElement('button'); save.innerHTML = '<i class="ti ti-check" style="font-size:13px;margin-right:5px;"></i>Save Crew';
  save.style.cssText = 'padding:9px 18px;border:none;border-radius:8px;background:#2563eb;font-size:13.5px;font-weight:600;cursor:pointer;font-family:inherit;color:#fff;display:flex;align-items:center;';
  save.addEventListener('click', function(){
    shoot.team = [];
    body.querySelectorAll('select[data-sid]').forEach(function(sel){
      if (!sel.value) return;
      var staff = STAFF_LIST.find(function(s){ return s.id === sel.dataset.sid; });
      if (staff) shoot.team.push({ staffId:staff.id, name:staff.name, role:sel.value, initials:staff.initials, color:staff.color, phone:staff.phone });
    });
    if (shoot.team.length > 0 && shoot.status === 'pending') shoot.status = 'allocated';
    renderShootAllocTable(); ov.remove();
    showToast('Crew assigned for ' + shoot.shootName);
  });
  ftr.appendChild(cancel); ftr.appendChild(save); box.appendChild(ftr); ov.appendChild(box); document.body.appendChild(ov);
}

// ── Plan Shoot Modal (Crew + Gear together) ───────────────────
function openPlanShootModal(shootId) {
  // Plan Shoot just opens crew assignment first, then equipment
  var shoot = SHOOT_ALLOC.find(function(s){ return s.id === shootId; });
  if (!shoot) return;
  // Open team modal; after save it changes status to allocated and re-renders
  openTeamAllocModal(shootId);
}

// ── Post-Shoot Log Modal ──────────────────────────────────────
function openPostShootLog(shootId) {
  var shoot=SHOOT_ALLOC.find(function(s){return s.id===shootId;});
  if(!shoot||!shoot.gear.length){showToast('Allocate equipment first before logging usage.');return;}
  var ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9998;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;padding:20px;';
  ov.addEventListener('click',function(e){if(e.target===ov)ov.remove();});
  var box=document.createElement('div');box.style.cssText='background:#fff;border-radius:16px;width:620px;max-width:100%;max-height:90vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.2);';
  var hdr=document.createElement('div');hdr.style.cssText='padding:20px 24px;border-bottom:1px solid #f1f5f9;background:#f0fdf4;flex-shrink:0;display:flex;justify-content:space-between;align-items:center;';
  hdr.innerHTML='<div><div style="font-size:17px;font-weight:800;color:#15803d;">Post-Shoot Usage Log</div><div style="font-size:13px;color:#22c55e;margin-top:3px;">'+shoot.shootName+' · '+shoot.date+'</div></div>';
  var xBtn2=document.createElement('button');xBtn2.innerHTML='&#x2715;';xBtn2.style.cssText='background:none;border:none;font-size:22px;cursor:pointer;color:#94a3b8;';xBtn2.addEventListener('click',function(){ov.remove();});hdr.appendChild(xBtn2);box.appendChild(hdr);
  var body2=document.createElement('div');body2.style.cssText='flex:1;overflow-y:auto;padding:20px 24px;';
  var intro=document.createElement('div');intro.style.cssText='background:#fefce8;border:1px solid #fde68a;border-radius:9px;padding:12px 16px;margin-bottom:16px;font-size:13.5px;color:#92400e;';intro.innerHTML='<strong>After the shoot:</strong> Enter shots taken per camera, confirm items returned, and note any issues.';body2.appendChild(intro);
  shoot.gear.forEach(function(gear){
    var log=shoot.usageLog[gear.id]||{};var isCamera=gear.cat==='Camera';
    var card=document.createElement('div');card.style.cssText='border:1.5px solid #e2e8f0;border-radius:10px;padding:16px;margin-bottom:12px;';
    card.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">' +
      '<div><div style="font-size:14px;font-weight:700;color:#1a1d2e;">'+gear.name+'</div><div style="font-size:12px;color:#94a3b8;margin-top:2px;">'+gear.id+' · '+gear.cat+'</div></div>' +
      '<label style="display:flex;align-items:center;gap:7px;font-size:14px;font-weight:600;color:#475569;cursor:pointer;"><input type="checkbox" id="ret-'+gear.id.replace(/\W/g,'_')+'" '+(log.returned?'checked':'')+' style="width:17px;height:17px;accent-color:#22c55e;cursor:pointer;"> Returned</label>' +
    '</div>' +
    '<div style="display:grid;grid-template-columns:'+(isCamera?'1fr 1fr':'1fr')+';gap:12px;">' +
      (isCamera?'<div><label style="font-size:12px;font-weight:700;color:#64748b;display:block;margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px;">Shots Taken This Shoot</label><input type="number" id="shots-'+gear.id.replace(/\W/g,'_')+'" value="'+(log.shots||'')+'" placeholder="e.g. 847" style="width:100%;border:1.5px solid #e2e8f0;border-radius:8px;padding:10px 12px;font-size:15px;font-family:inherit;outline:none;box-sizing:border-box;"></div>':'') +
      '<div><label style="font-size:12px;font-weight:700;color:#64748b;display:block;margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px;">Condition on Return</label><select id="cond-'+gear.id.replace(/\W/g,'_')+'" style="width:100%;border:1.5px solid #e2e8f0;border-radius:8px;padding:10px 12px;font-size:14px;font-family:inherit;outline:none;background:#fff;box-sizing:border-box;"><option '+(log.condition==='Excellent'?'selected':'')+'>Excellent</option><option '+(log.condition==='Good'?'selected':'')+'>Good</option><option '+(log.condition==='Fair'?'selected':'')+'>Fair</option><option '+(log.condition==='Damaged'?'selected':'')+'>Damaged</option></select></div>' +
    '</div>' +
    '<div style="margin-top:10px;"><label style="font-size:12px;font-weight:700;color:#64748b;display:block;margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px;">Notes</label><input type="text" id="notes-'+gear.id.replace(/\W/g,'_')+'" value="'+(log.notes||'')+'" placeholder="e.g. battery 40% on return, sensor dust noted" style="width:100%;border:1.5px solid #e2e8f0;border-radius:8px;padding:10px 12px;font-size:13.5px;font-family:inherit;outline:none;box-sizing:border-box;"></div>';
    body2.appendChild(card);
  });
  box.appendChild(body2);
  var ftr2=document.createElement('div');ftr2.style.cssText='padding:16px 24px;border-top:1px solid #f1f5f9;display:flex;justify-content:flex-end;gap:10px;background:#fafbfc;flex-shrink:0;';
  var cancel2=document.createElement('button');cancel2.textContent='Cancel';cancel2.style.cssText='padding:10px 20px;border:1.5px solid #e2e8f0;border-radius:9px;background:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;color:#475569;';cancel2.addEventListener('click',function(){ov.remove();});
  var save2=document.createElement('button');save2.innerHTML='<i class="ti ti-check"></i> Save Usage Log';save2.style.cssText='padding:10px 22px;border:none;border-radius:9px;background:#22c55e;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;color:#fff;display:flex;align-items:center;gap:7px;';
  save2.addEventListener('click',function(){
    shoot.gear.forEach(function(gear){
      var sid2=gear.id.replace(/\W/g,'_');
      var shots=parseInt((document.getElementById('shots-'+sid2)||{value:'0'}).value)||0;
      shoot.usageLog[gear.id]={shots:shots,returned:(document.getElementById('ret-'+sid2)||{checked:true}).checked,condition:(document.getElementById('cond-'+sid2)||{value:'Good'}).value,notes:(document.getElementById('notes-'+sid2)||{value:''}).value};
      if(gear.cat==='Camera'&&shots>0){var cam=CAMERAS.find(function(c){return c.id===gear.id;});if(cam){cam.totalShots+=shots;cam.shotsSince+=shots;}}
    });
    shoot.status='completed';renderShootAllocTable();renderServiceTable();ov.remove();
    showToast('Usage logged for '+shoot.shootName+'. Shutter counts updated.');
  });
  ftr2.appendChild(cancel2);ftr2.appendChild(save2);box.appendChild(ftr2);ov.appendChild(box);document.body.appendChild(ov);
}

// ── Usage Detail ──────────────────────────────────────────────
function openUsageDetail(shootId){
  var shoot=SHOOT_ALLOC.find(function(s){return s.id===shootId;});
  if(!shoot)return;
  var lines=shoot.gear.map(function(g){var lg=shoot.usageLog[g.id]||{};return g.name+': '+(lg.shots?lg.shots+' shots':'—')+' | '+(lg.condition||'Good')+(lg.notes?' | '+lg.notes:'');});
  showToast('<strong>'+shoot.shootName+'</strong> ('+shoot.date+')<br>'+lines.join('<br>'));
}

// ── Mark Serviced ─────────────────────────────────────────────
function openMarkServiced(camId){
  var cam=CAMERAS.find(function(c){return c.id===camId;});if(!cam)return;
  var today2=new Date().toISOString().split('T')[0];
  var ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9998;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;';
  ov.addEventListener('click',function(e){if(e.target===ov)ov.remove();});
  var box=document.createElement('div');box.style.cssText='background:#fff;border-radius:16px;width:460px;max-width:95vw;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.2);';
  box.innerHTML='<div style="padding:20px 24px;border-bottom:1px solid #f1f5f9;background:#fdf4ff;"><div style="font-size:17px;font-weight:800;color:#7c3aed;">Mark as Serviced</div><div style="font-size:13px;color:#8b5cf6;margin-top:3px;">'+cam.name+'</div></div>' +
    '<div style="padding:24px;display:flex;flex-direction:column;gap:14px;">' +
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;text-align:center;background:#f8fafc;border-radius:9px;padding:14px;">' +
        '<div><div style="font-size:18px;font-weight:800;color:#1a1d2e;">'+cam.totalShots.toLocaleString()+'</div><div style="font-size:11.5px;color:#94a3b8;margin-top:2px;">Total Shots</div></div>' +
        '<div><div style="font-size:18px;font-weight:800;color:#dc2626;">'+cam.shotsSince.toLocaleString()+'</div><div style="font-size:11.5px;color:#94a3b8;margin-top:2px;">Since Last Service</div></div>' +
        '<div><div style="font-size:18px;font-weight:800;color:#8b5cf6;">'+new Date(cam.lastSvcDate).toLocaleDateString('en-GB',{day:'numeric',month:'short'})+'</div><div style="font-size:11.5px;color:#94a3b8;margin-top:2px;">Last Serviced</div></div>' +
      '</div>' +
      '<div><label style="font-size:13px;font-weight:700;color:#64748b;display:block;margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px;">Service Date</label><input id="svc-date" type="date" value="'+today2+'" style="width:100%;border:2px solid #e2e8f0;border-radius:9px;padding:11px 14px;font-size:14px;font-family:inherit;outline:none;box-sizing:border-box;"></div>' +
      '<div><label style="font-size:13px;font-weight:700;color:#64748b;display:block;margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px;">Service Centre</label><input id="svc-centre" type="text" placeholder="e.g. Sony Authorized Service" style="width:100%;border:2px solid #e2e8f0;border-radius:9px;padding:11px 14px;font-size:14px;font-family:inherit;outline:none;box-sizing:border-box;"></div>' +
      '<div><label style="font-size:13px;font-weight:700;color:#64748b;display:block;margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px;">Notes</label><input id="svc-notes" type="text" placeholder="e.g. Sensor cleaned, shutter tested" style="width:100%;border:2px solid #e2e8f0;border-radius:9px;padding:11px 14px;font-size:14px;font-family:inherit;outline:none;box-sizing:border-box;"></div>' +
    '</div>';
  var ftr3=document.createElement('div');ftr3.style.cssText='padding:16px 24px;border-top:1px solid #f1f5f9;display:flex;gap:10px;justify-content:flex-end;background:#fafbfc;';
  var c3=document.createElement('button');c3.textContent='Cancel';c3.style.cssText='padding:10px 20px;border:1.5px solid #e2e8f0;border-radius:9px;background:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;color:#475569;';c3.addEventListener('click',function(){ov.remove();});
  var s3=document.createElement('button');s3.innerHTML='<i class="ti ti-tool"></i> Confirm Serviced';s3.style.cssText='padding:10px 22px;border:none;border-radius:9px;background:#8b5cf6;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;color:#fff;display:flex;align-items:center;gap:7px;';
  s3.addEventListener('click',function(){
    cam.lastSvcDate=(document.getElementById('svc-date')||{value:today2}).value;
    cam.shotsSince=0;renderServiceTable();ov.remove();
    showToast(cam.name+' marked as serviced. Shot counter reset to 0.');
  });
  ftr3.appendChild(c3);ftr3.appendChild(s3);box.appendChild(ftr3);ov.appendChild(box);document.body.appendChild(ov);
}

// ── Auto-render on load ───────────────────────────────────────
(function() {
  renderShootAllocTable();
  renderServiceTable();
})();

// ── Shoot Log Detail Overlay ──────────────────────────────────
function openShootLogDetail(shootId) {
  var shoot = SHOOT_ALLOC.find(function(s){ return s.id === shootId; });
  if (!shoot) return;

  var sc = { completed:'#15803d', allocated:'#1d4ed8', pending:'#475569', in_progress:'#d97706' }[shoot.status] || '#475569';
  var statusLbl = STATUS_LBL[shoot.status] || 'Not Allocated';
  var catIcons = { Camera:'ti-camera', Lens:'ti-adjustments', Lighting:'ti-bolt', Memory:'ti-database', Accessory:'ti-tool' };

  var ex = document.getElementById('eq-detail-overlay'); if (ex) ex.remove();
  var ov = document.createElement('div');
  ov.id = 'eq-detail-overlay';
  ov.style.cssText = 'position:fixed;top:0;left:250px;right:0;bottom:0;background:#fff;z-index:9990;overflow-y:auto;font-family:Inter,sans-serif;';
  function closeOv() { ov.remove(); }

  /* Top bar */
  var tb = document.createElement('div');
  tb.style.cssText = 'background:#fff;border-bottom:1px solid #e2e8f0;padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:60px;position:sticky;top:0;z-index:2;';
  var tLeft = document.createElement('div'); tLeft.style.cssText = 'display:flex;align-items:center;gap:12px;';
  var backBtn = document.createElement('button');
  backBtn.innerHTML = '<i class="ti ti-arrow-left" style="font-size:14px;"></i> Back';
  backBtn.style.cssText = 'background:#f1f5f9;border:none;border-radius:8px;padding:8px 14px;cursor:pointer;color:#374151;font-size:13px;font-weight:600;font-family:Inter,sans-serif;display:flex;align-items:center;gap:6px;';
  backBtn.addEventListener('click', closeOv);
  var titleDiv = document.createElement('div');
  titleDiv.innerHTML = '<div style="font-size:16px;font-weight:700;color:#111827;">' + shoot.shootName + '</div>'
    + '<div style="font-size:13px;color:#9ca3af;margin-top:1px;">' + shoot.date + ' · ' + shoot.type + '</div>';
  tLeft.appendChild(backBtn); tLeft.appendChild(titleDiv);
  var tRight = document.createElement('div'); tRight.style.cssText = 'display:flex;align-items:center;gap:10px;';
  var badge = document.createElement('span');
  badge.textContent = statusLbl;
  badge.style.cssText = 'font-size:13px;font-weight:600;color:' + sc + ';border:1px solid ' + sc + ';padding:5px 12px;border-radius:6px;';
  var closeB = document.createElement('button');
  closeB.innerHTML = '<i class="ti ti-x" style="font-size:15px;"></i>';
  closeB.style.cssText = 'padding:8px 10px;border:none;border-radius:8px;background:#f1f5f9;cursor:pointer;color:#6b7280;display:flex;align-items:center;';
  closeB.addEventListener('click', closeOv);
  tRight.appendChild(badge); tRight.appendChild(closeB);
  tb.appendChild(tLeft); tb.appendChild(tRight);
  ov.appendChild(tb);

  var cw = document.createElement('div'); cw.style.cssText = 'padding:0 0 40px;';
  ov.appendChild(cw);

  function mkSection(title) {
    var sec = document.createElement('div'); sec.style.cssText = 'padding:0 28px 20px;border-bottom:1px solid #edf0f5;';
    var sh = document.createElement('div'); sh.style.cssText = 'padding:18px 0 10px;border-bottom:2px solid #e2e8f0;margin-bottom:4px;';
    sh.innerHTML = '<span style="font-size:11px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.8px;">' + title + '</span>';
    sec.appendChild(sh); return sec;
  }
  function mkGrid(sec) { var w = document.createElement('div'); w._rc = 0; sec.appendChild(w); return w; }
  function addRow(w, label, value, valCol) {
    if (w._rc % 2 === 0) { var row = document.createElement('div'); row.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;column-gap:40px;padding:13px 0;border-bottom:1px solid #f0f2f5;'; w.appendChild(row); }
    w._rc++;
    var cell = document.createElement('div');
    cell.innerHTML = '<div style="font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:5px;">' + label + '</div>'
      + '<div style="font-size:14px;color:' + (valCol||'#111827') + ';">' + (value||'—') + '</div>';
    w.lastElementChild.appendChild(cell);
  }
  function mkBtn(lbl, ico, primary, cb) {
    var btn = document.createElement('button');
    btn.innerHTML = '<i class="ti ' + ico + '" style="font-size:14px;"></i><span>' + lbl + '</span>';
    btn.style.cssText = 'padding:9px 18px;background:' + (primary?'#2563eb':'#fff') + ';color:' + (primary?'#fff':'#374151') + ';border:1px solid ' + (primary?'#2563eb':'#d1d5db') + ';border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;font-family:Inter,sans-serif;display:inline-flex;align-items:center;gap:7px;';
    btn.addEventListener('click', cb); return btn;
  }

  /* Section 1: Shoot Details */
  var c1 = mkSection('Shoot Details');
  var g1 = mkGrid(c1);
  addRow(g1, 'Shoot / Event', shoot.shootName);
  addRow(g1, 'Date',          shoot.date);
  addRow(g1, 'Type',          shoot.type);
  addRow(g1, 'Status',        statusLbl, sc);
  if (shoot.startedAt) addRow(g1, 'Started At',  shoot.startedAt);
  if (shoot.endedAt)   addRow(g1, 'Ended At',    shoot.endedAt);
  cw.appendChild(c1);

  /* Section 2: Crew / Team */
  var teamCount = (shoot.team && shoot.team.length) ? shoot.team.length : 0;
  var c2 = mkSection('Crew — ' + teamCount + ' member' + (teamCount !== 1 ? 's' : '') + ' assigned');
  if (!shoot.team || shoot.team.length === 0) {
    var empTeam = document.createElement('div'); empTeam.style.cssText = 'padding:14px 0;font-size:14px;color:#9ca3af;';
    empTeam.innerHTML = 'No crew assigned yet. <button onclick="openTeamAllocModal(\'' + shoot.id + '\')" style="background:none;border:none;color:#2563eb;font-size:14px;cursor:pointer;font-family:inherit;padding:0;text-decoration:underline;">Assign crew</button>';
    c2.appendChild(empTeam);
  } else {
    shoot.team.forEach(function(m) {
      var r2 = document.createElement('div');
      r2.style.cssText = 'display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid #f0f2f5;';
      r2.innerHTML = '<div style="width:32px;height:32px;border-radius:50%;background:' + m.color + ';display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0;">' + m.initials + '</div>'
        + '<div style="flex:1;"><div style="font-size:14px;font-weight:500;color:#111827;">' + m.name + '</div>'
        + '<div style="font-size:12px;color:#9ca3af;margin-top:1px;">' + m.role + '</div></div>'
        + (m.phone ? '<div style="font-size:12px;color:#6b7280;">' + m.phone + '</div>' : '');
      c2.appendChild(r2);
    });
  }
  cw.appendChild(c2);

  /* Section 3: Allocated Equipment */
  var c3 = mkSection('Allocated Equipment (' + shoot.gear.length + ' items)');
  if (shoot.gear.length === 0) {
    var emp = document.createElement('div'); emp.style.cssText = 'padding:14px 0;font-size:14px;color:#9ca3af;';
    emp.textContent = 'No equipment allocated yet.'; c3.appendChild(emp);
  } else {
    shoot.gear.forEach(function(g) {
      var log = shoot.usageLog[g.id] || {};
      var usage = '';
      if (shoot.status === 'completed' && log.shots !== undefined) {
        usage = (log.shots ? log.shots + ' shots' : '') + (log.condition ? ' · ' + log.condition : '') + (log.notes ? ' · ' + log.notes : '');
      }
      var r = document.createElement('div');
      r.style.cssText = 'display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #f0f2f5;';
      r.innerHTML = '<div style="width:30px;height:30px;background:#f1f5f9;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">'
        + '<i class="ti ' + (catIcons[g.cat]||'ti-package') + '" style="color:#6b7280;font-size:14px;"></i></div>'
        + '<div style="flex:1;"><div style="font-size:14px;font-weight:500;color:#111827;">' + g.name + '</div>'
        + '<div style="font-size:12px;color:#9ca3af;margin-top:1px;">' + g.id + ' · ' + g.cat + (usage ? ' · ' + usage : '') + '</div></div>'
        + (shoot.status === 'completed' && log.returned ? '<span style="font-size:12px;font-weight:500;color:#15803d;">Returned</span>' : '');
      c3.appendChild(r);
    });
  }
  cw.appendChild(c3);

  /* Section 4: Actions */
  var c4 = mkSection('Actions');
  var actBody = document.createElement('div'); actBody.style.cssText = 'padding-top:14px;display:flex;flex-wrap:wrap;gap:10px;';
  if (shoot.status === 'pending')     actBody.appendChild(mkBtn('Plan Shoot (Crew + Gear)', 'ti-users-plus', true, function(){ closeOv(); openPlanShootModal(shoot.id); }));
  if (shoot.status === 'allocated') {
    var startB = mkBtn('Start Shoot', 'ti-player-play', false, function(){ startShoot(shoot.id); });
    startB.style.background='#16a34a'; startB.style.borderColor='#16a34a'; startB.style.color='#fff';
    actBody.appendChild(startB);
  }
  if (shoot.status === 'in_progress') {
    var endB = mkBtn('End Shoot', 'ti-player-stop', false, function(){ endShoot(shoot.id); });
    endB.style.background='#dc2626'; endB.style.borderColor='#dc2626'; endB.style.color='#fff';
    actBody.appendChild(endB);
  }
  if (shoot.status !== 'completed' && shoot.status !== 'pending') actBody.appendChild(mkBtn('Edit Crew',     'ti-users', false, function(){ closeOv(); openTeamAllocModal(shoot.id); }));
  if (shoot.status !== 'completed') actBody.appendChild(mkBtn('Edit Equipment', 'ti-plus', false, function(){ closeOv(); openAllocateModal(shoot.id); }));
  if (shoot.status === 'allocated' || shoot.status === 'in_progress') actBody.appendChild(mkBtn('Log Shots', 'ti-check', false, function(){ closeOv(); openPostShootLog(shoot.id); }));
  if (shoot.status === 'completed')  actBody.appendChild(mkBtn('View Usage Report', 'ti-chart-bar', true, function(){ closeOv(); openUsageDetail(shoot.id); }));
  c4.appendChild(actBody);
  cw.appendChild(c4);

  document.body.appendChild(ov);
}

// ── Service Due Tracker Detail Overlay ───────────────────────
function openServiceDetail(camId) {
  var cam = CAMERAS.find(function(c){ return c.id === camId; });
  if (!cam) return;

  var today   = new Date('2026-06-26');
  var lastSvc = new Date(cam.lastSvcDate);
  var calDue  = new Date(lastSvc); calDue.setDate(calDue.getDate() + cam.svcIntervalDays);
  var daysLeft= Math.ceil((calDue - today) / 86400000);
  var pct     = cam.svcIntervalShots > 0 ? Math.min(100, Math.round(cam.shotsSince / cam.svcIntervalShots * 100)) : 0;
  var calSt   = daysLeft < 0 ? 'over' : daysLeft <= 30 ? 'soon' : 'ok';
  var cntSt   = cam.svcIntervalShots > 0 ? (pct >= 100 ? 'over' : pct >= 80 ? 'soon' : 'ok') : 'ok';
  var worst   = (calSt==='over'||cntSt==='over') ? 'over' : (calSt==='soon'||cntSt==='soon') ? 'soon' : 'ok';
  var stLbl   = {over:'Service Overdue', soon:'Due Soon', ok:'Up to Date'}[worst];
  var stCol   = {over:'#dc2626', soon:'#d97706', ok:'#15803d'}[worst];
  var dueStr  = calDue.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
  var lastStr = new Date(cam.lastSvcDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});

  var ex = document.getElementById('eq-detail-overlay'); if (ex) ex.remove();
  var ov = document.createElement('div');
  ov.id = 'eq-detail-overlay';
  ov.style.cssText = 'position:fixed;top:0;left:250px;right:0;bottom:0;background:#fff;z-index:9990;overflow-y:auto;font-family:Inter,sans-serif;';
  function closeOv() { ov.remove(); }

  /* Top bar */
  var tb = document.createElement('div');
  tb.style.cssText = 'background:#fff;border-bottom:1px solid #e2e8f0;padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:60px;position:sticky;top:0;z-index:2;';
  var tLeft = document.createElement('div'); tLeft.style.cssText = 'display:flex;align-items:center;gap:12px;';
  var backBtn = document.createElement('button');
  backBtn.innerHTML = '<i class="ti ti-arrow-left" style="font-size:14px;"></i> Back';
  backBtn.style.cssText = 'background:#f1f5f9;border:none;border-radius:8px;padding:8px 14px;cursor:pointer;color:#374151;font-size:13px;font-weight:600;font-family:Inter,sans-serif;display:flex;align-items:center;gap:6px;';
  backBtn.addEventListener('click', closeOv);
  var titleDiv = document.createElement('div');
  titleDiv.innerHTML = '<div style="font-size:16px;font-weight:700;color:#111827;">' + cam.name + '</div>'
    + '<div style="font-size:13px;color:#9ca3af;margin-top:1px;">' + cam.id + ' · ' + cam.cat + '</div>';
  tLeft.appendChild(backBtn); tLeft.appendChild(titleDiv);
  var tRight = document.createElement('div'); tRight.style.cssText = 'display:flex;align-items:center;gap:10px;';
  var badge = document.createElement('span');
  badge.textContent = stLbl;
  badge.style.cssText = 'font-size:13px;font-weight:600;color:' + stCol + ';border:1px solid ' + stCol + ';padding:5px 12px;border-radius:6px;';
  var closeB = document.createElement('button');
  closeB.innerHTML = '<i class="ti ti-x" style="font-size:15px;"></i>';
  closeB.style.cssText = 'padding:8px 10px;border:none;border-radius:8px;background:#f1f5f9;cursor:pointer;color:#6b7280;display:flex;align-items:center;';
  closeB.addEventListener('click', closeOv);
  tRight.appendChild(badge); tRight.appendChild(closeB);
  tb.appendChild(tLeft); tb.appendChild(tRight);
  ov.appendChild(tb);

  var cw = document.createElement('div'); cw.style.cssText = 'padding:0 0 40px;';
  ov.appendChild(cw);

  function mkSection(title) {
    var sec = document.createElement('div'); sec.style.cssText = 'padding:0 28px 20px;border-bottom:1px solid #edf0f5;';
    var sh = document.createElement('div'); sh.style.cssText = 'padding:18px 0 10px;border-bottom:2px solid #e2e8f0;margin-bottom:4px;';
    sh.innerHTML = '<span style="font-size:11px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.8px;">' + title + '</span>';
    sec.appendChild(sh); return sec;
  }
  function mkGrid(sec) { var w = document.createElement('div'); w._rc = 0; sec.appendChild(w); return w; }
  function addRow(w, label, value, valCol) {
    if (w._rc % 2 === 0) { var row = document.createElement('div'); row.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;column-gap:40px;padding:13px 0;border-bottom:1px solid #f0f2f5;'; w.appendChild(row); }
    w._rc++;
    var cell = document.createElement('div');
    cell.innerHTML = '<div style="font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:5px;">' + label + '</div>'
      + '<div style="font-size:14px;color:' + (valCol||'#111827') + ';">' + (value||'—') + '</div>';
    w.lastElementChild.appendChild(cell);
  }
  function mkBtn(lbl, ico, primary, cb) {
    var btn = document.createElement('button');
    btn.innerHTML = '<i class="ti ' + ico + '" style="font-size:14px;"></i><span>' + lbl + '</span>';
    btn.style.cssText = 'padding:9px 18px;background:' + (primary?'#2563eb':'#fff') + ';color:' + (primary?'#fff':'#374151') + ';border:1px solid ' + (primary?'#2563eb':'#d1d5db') + ';border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;font-family:Inter,sans-serif;display:inline-flex;align-items:center;gap:7px;';
    btn.addEventListener('click', cb); return btn;
  }

  /* Section 1: Equipment Details */
  var c1 = mkSection('Equipment Details');
  var g1 = mkGrid(c1);
  addRow(g1, 'Equipment Name',   cam.name);
  addRow(g1, 'Serial / ID',      cam.id);
  addRow(g1, 'Category',         cam.cat);
  addRow(g1, 'Owned / Rented',   'Owned');
  addRow(g1, 'Service Location', 'Sony Authorised Service Centre');
  addRow(g1, 'Estimated Cost',   'S$120 per service');
  cw.appendChild(c1);

  /* Section 2: Service Schedule */
  var c2 = mkSection('Service Schedule');
  var g2 = mkGrid(c2);
  addRow(g2, 'Calendar Interval',   cam.svcIntervalDays + ' days (' + Math.round(cam.svcIntervalDays/30) + ' months)');
  addRow(g2, 'Shot Count Interval', cam.svcIntervalShots > 0 ? cam.svcIntervalShots.toLocaleString() + ' shots' : 'N/A');
  addRow(g2, 'Last Serviced',       lastStr);
  addRow(g2, 'Next Service Due',    dueStr, worst==='over'?'#dc2626':worst==='soon'?'#d97706':'#111827');
  addRow(g2, 'Days Remaining',      daysLeft < 0 ? Math.abs(daysLeft)+' days overdue' : daysLeft+' days away', worst==='over'?'#dc2626':worst==='soon'?'#d97706':'#111827');
  addRow(g2, 'Service Status',      stLbl, stCol);
  cw.appendChild(c2);

  /* Section 3: Shutter Counter */
  if (cam.svcIntervalShots > 0) {
    var c3 = mkSection('Shutter Counter');
    var g3 = mkGrid(c3);
    addRow(g3, 'Total Shots (Lifetime)',      cam.totalShots.toLocaleString());
    addRow(g3, 'Shots Since Last Service',    cam.shotsSince.toLocaleString(), pct>=100?'#dc2626':pct>=80?'#d97706':'#111827');
    addRow(g3, 'Shots Remaining to Service',  Math.max(0, cam.svcIntervalShots - cam.shotsSince).toLocaleString());
    addRow(g3, 'Counter Progress',            pct + '% used', pct>=100?'#dc2626':pct>=80?'#d97706':'#111827');
    cw.appendChild(c3);
  }

  /* Section 4: Service History */
  var c4 = mkSection('Service History');
  var svcHistory = [
    { date: lastStr,      event:'Serviced',  detail:'Regular service · Sony Authorised Service Centre' },
    { date:'15 Jul 2025', event:'Serviced',  detail:'Sensor cleaning + calibration'                    },
    { date:'Jan 2025',    event:'Purchased', detail:'New unit commissioned into inventory'              },
  ];
  svcHistory.forEach(function(lg) {
    var r = document.createElement('div');
    r.style.cssText = 'display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid #f0f2f5;';
    r.innerHTML = '<div style="width:7px;height:7px;border-radius:50%;background:#d1d5db;flex-shrink:0;margin-top:6px;"></div>'
      + '<div style="flex:1;"><div style="display:flex;justify-content:space-between;">'
      + '<span style="font-size:14px;font-weight:500;color:#111827;">' + lg.event + '</span>'
      + '<span style="font-size:12px;color:#9ca3af;">' + lg.date + '</span></div>'
      + '<div style="font-size:13px;color:#6b7280;margin-top:2px;">' + lg.detail + '</div></div>';
    c4.appendChild(r);
  });
  cw.appendChild(c4);

  /* Section 5: Actions */
  var c5 = mkSection('Actions');
  var actBody = document.createElement('div'); actBody.style.cssText = 'padding-top:14px;display:flex;flex-wrap:wrap;gap:10px;';
  actBody.appendChild(mkBtn('Mark as Serviced',      'ti-tool',     true,  function(){ closeOv(); openMarkServiced(cam.id); }));
  actBody.appendChild(mkBtn('Export Service Record', 'ti-download', false, function(){ if(typeof showToast==='function') showToast('Service record exported for: '+cam.name); }));
  c5.appendChild(actBody);
  cw.appendChild(c5);

  document.body.appendChild(ov);
}

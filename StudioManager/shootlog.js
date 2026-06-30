// ══ SHOOT EQUIPMENT LOG & SERVICE TRACKER ══

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
    gear:[{id:'SON-A7RV-001',name:'Sony A7R V (Primary)',cat:'Camera'},{id:'SON-A7RV-002',name:'Sony A7R V (Backup)',cat:'Camera'},{id:'PRO-B10X-001',name:'Profoto B10X Plus (1)',cat:'Lighting'},{id:'PRO-B10X-002',name:'Profoto B10X Plus (2)',cat:'Lighting'},{id:'SON-2470-001',name:'Sony 24-70mm f/2.8',cat:'Lens'},{id:'MAN-055-001',name:'Manfrotto Tripod',cat:'Accessory'}],
    usageLog:{'SON-A7RV-001':{shots:847,returned:true,condition:'Excellent',notes:'Battery 40% on return'},'SON-A7RV-002':{shots:412,returned:true,condition:'Good',notes:''}} },
  { id:'SA-002', shootName:'Nexus Corp — Headshots',   date:'Jun 17, 2026', type:'Corporate',  status:'allocated',
    gear:[{id:'SON-A7RV-001',name:'Sony A7R V (Primary)',cat:'Camera'},{id:'PRO-B10X-001',name:'Profoto B10X Plus (1)',cat:'Lighting'},{id:'SON-2470-001',name:'Sony 24-70mm f/2.8',cat:'Lens'}],
    usageLog:{} },
  { id:'SA-003', shootName:'Liu Family — Portrait',    date:'Jun 20, 2026', type:'Portrait',   status:'pending', gear:[], usageLog:{} },
  { id:'SA-004', shootName:'Sarah & Tom — Engagement', date:'Jun 22, 2026', type:'Engagement', status:'pending', gear:[], usageLog:{} },
  { id:'SA-005', shootName:'Horizon Events — Gala',   date:'Jun 28, 2026', type:'Event',      status:'pending', gear:[], usageLog:{} },
];

// ── Render Shoot Allocation Table ─────────────────────────────
function renderShootAllocTable() {
  var tbody = document.getElementById('shoot-alloc-tbody');
  if (!tbody) return;
  var BTN = 'padding:7px 16px;border-radius:7px;font-size:13px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;display:inline-flex;align-items:center;gap:6px;';
  tbody.innerHTML = SHOOT_ALLOC.map(function(shoot) {
    var dot = { completed:'#22c55e', allocated:'#2563eb', pending:'#94a3b8' }[shoot.status] || '#94a3b8';
    var lbl = { completed:'Completed', allocated:'Allocated', pending:'Not Allocated' }[shoot.status] || '';
    var badge = '<span style="display:inline-flex;align-items:center;gap:6px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:5px 11px;font-size:13px;font-weight:600;color:#1a1d2e;"><span style="width:8px;height:8px;border-radius:50%;background:' + dot + ';"></span>' + lbl + '</span>';
    var gear = shoot.gear.length === 0
      ? '<span style="color:#94a3b8;font-size:13px;">No equipment allocated yet</span>'
      : shoot.gear.map(function(g){ return '<span style="font-size:12px;background:#f1f5f9;color:#475569;padding:2px 8px;border-radius:4px;font-weight:600;margin-right:3px;">' + g.cat + '</span>'; }).join('') + '<span style="font-size:12px;color:#94a3b8;"> (' + shoot.gear.length + ' items)</span>';
    var action = shoot.status === 'completed'
      ? '<button data-fn="usage" data-sid="' + shoot.id + '" style="' + BTN + 'border:1.5px solid #e2e8f0;background:#fff;color:#475569;"><i class="ti ti-chart-bar"></i> Usage Report</button>'
      : shoot.status === 'allocated'
      ? '<button data-fn="alloc" data-sid="' + shoot.id + '" style="' + BTN + 'border:1.5px solid #e2e8f0;background:#fff;color:#475569;"><i class="ti ti-edit"></i> Edit</button> <button data-fn="log" data-sid="' + shoot.id + '" style="' + BTN + 'border:1.5px solid #22c55e;background:#f0fdf4;color:#15803d;"><i class="ti ti-check"></i> Log Shots</button>'
      : '<button data-fn="alloc" data-sid="' + shoot.id + '" style="' + BTN + 'border:1.5px solid #2563eb;background:#eff6ff;color:#2563eb;"><i class="ti ti-plus"></i> Allocate Gear</button>';
    return '<tr style="border-bottom:1px solid #f1f5f9;" onmouseover="this.style.background=\'#f8fafc\'" onmouseout="this.style.background=\'\'">' +
      '<td style="padding:14px 18px;"><div style="font-size:14px;font-weight:700;color:#1a1d2e;">' + shoot.shootName + '</div><div style="font-size:12px;color:#94a3b8;margin-top:2px;">' + shoot.type + '</div></td>' +
      '<td style="padding:14px 18px;font-size:13.5px;font-weight:600;color:#1a1d2e;">' + shoot.date + '</td>' +
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
    var dot = {over:'#ef4444',soon:'#f59e0b',ok:'#22c55e'}[worst];
    var stLbl = {over:'Service Overdue',soon:'Due Soon',ok:'OK'}[worst];
    var stBg  = {over:'#fff1f2',soon:'#fefce8',ok:'#f0fdf4'}[worst];
    var stCol = {over:'#dc2626',soon:'#a16207',ok:'#15803d'}[worst];
    var barCol = pct>=100?'#ef4444':pct>=80?'#f59e0b':'#22c55e';
    var progress = cam.svcIntervalShots > 0
      ? '<div style="display:flex;align-items:center;gap:8px;"><div style="flex:1;height:8px;background:#e8edf3;border-radius:4px;overflow:hidden;min-width:80px;"><div style="width:'+pct+'%;height:100%;background:'+barCol+';border-radius:4px;"></div></div><span style="font-size:12.5px;font-weight:700;color:'+barCol+';">'+pct+'%</span></div><div style="font-size:11.5px;color:#94a3b8;margin-top:3px;">'+(Math.max(0,cam.svcIntervalShots-cam.shotsSince).toLocaleString())+' shots left</div>'
      : '<span style="font-size:12.5px;color:#94a3b8;">N/A</span>';
    var calStr = calDue.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) + '<div style="font-size:11.5px;color:'+({over:'#dc2626',soon:'#d97706',ok:'#94a3b8'}[calSt])+';">'+(daysLeft<0?Math.abs(daysLeft)+' days overdue':daysLeft+' days away')+'</div>';
    return '<tr style="border-bottom:1px solid #f1f5f9;" onmouseover="this.style.background=\'#f8fafc\'" onmouseout="this.style.background=\'\'">' +
      '<td style="padding:13px 18px;"><div style="font-size:14px;font-weight:700;color:#1a1d2e;">' + cam.name + '</div><div style="font-size:12px;color:#94a3b8;margin-top:2px;">' + cam.id + ' · ' + cam.cat + '</div></td>' +
      '<td style="padding:13px 18px;font-size:16px;font-weight:800;color:#1a1d2e;">' + cam.totalShots.toLocaleString() + '<div style="font-size:11.5px;font-weight:400;color:#94a3b8;">lifetime</div></td>' +
      '<td style="padding:13px 18px;font-size:16px;font-weight:800;color:'+(cam.shotsSince>40000?'#dc2626':cam.shotsSince>30000?'#d97706':'#1a1d2e')+'">' + (cam.svcIntervalShots>0 ? cam.shotsSince.toLocaleString() : '—') + '<div style="font-size:11.5px;font-weight:400;color:#94a3b8;">since service</div></td>' +
      '<td style="padding:13px 18px;">' + progress + '</td>' +
      '<td style="padding:13px 18px;font-size:13.5px;color:#475569;">' + new Date(cam.lastSvcDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) + '</td>' +
      '<td style="padding:13px 18px;font-size:13.5px;color:#475569;">' + calStr + '</td>' +
      '<td style="padding:13px 18px;"><span style="display:inline-flex;align-items:center;gap:6px;background:'+stBg+';color:'+stCol+';font-size:13px;font-weight:700;padding:5px 12px;border-radius:6px;border:1px solid '+dot+'33;"><span style="width:8px;height:8px;border-radius:50%;background:'+dot+';"></span>' + stLbl + '</span></td>' +
      '<td style="padding:13px 18px;text-align:center;"><button data-fn="svc" data-sid="' + cam.id + '" style="padding:7px 14px;border:1.5px solid #e2e8f0;border-radius:7px;background:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;color:#475569;display:inline-flex;align-items:center;gap:5px;"><i class="ti ti-tool"></i> Mark Serviced</button></td>' +
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
  if (fn === 'log')   openPostShootLog(sid);
  if (fn === 'svc')   openMarkServiced(sid);
});

// ── Allocate Gear Modal ───────────────────────────────────────
function openAllocateModal(shootId) {
  var shoot = SHOOT_ALLOC.find(function(s){ return s.id === shootId; });
  if (!shoot) {
    // Show shoot selector
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
  var msg='<strong>'+shoot.shootName+'</strong> ('+shoot.date+')<br>'+lines.join('<br>');
  showToast(msg);
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

// ── Auto-render when Equipment tab is active ──────────────────
(function() {
  if (typeof switchTab === 'function' && !switchTab._shootHooked) {
    var _prev = switchTab;
    switchTab = function(name, btn) {
      _prev(name, btn);
      if (name === 'equipment') { setTimeout(renderShootAllocTable,30); setTimeout(renderServiceTable,30); }
    };
    switchTab._shootHooked = true;
  }
  // Render immediately
  renderShootAllocTable();
  renderServiceTable();
})();

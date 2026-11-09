const C=window.IAEM;
const KEY='iaem-'+C.slug;
let st={};try{st=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const deck=document.getElementById('deck');
function sec(cls,html,style){const s=document.createElement('section');s.className='s '+(cls||'');if(style)s.setAttribute('style',style);s.innerHTML='<div class="in">'+html+'</div>';deck.appendChild(s);return s}
function lbl(t){return t?'<div class="lb">'+t+'</div>':''}
C.screens.forEach(sc=>{
 const d=sc.dark?'dk':'';
 if(sc.type==='cover'){sec('cover','<div class="brand">'+sc.brand+'</div><h1>'+sc.title+'</h1><p>'+sc.text+'</p><div class="by">'+sc.by+'</div>',"background-image:url('"+sc.img+"')")}
 else if(sc.type==='text'){sec(d,lbl(sc.label)+'<h2>'+sc.title+'</h2>'+sc.paras.map(p=>'<p style="margin-bottom:.8rem">'+p+'</p>').join('')+(sc.sig?'<div class="sig">'+sc.sig+'</div>':''))}
 else if(sc.type==='list'){sec(d,lbl(sc.label)+'<h2>'+sc.title+'</h2>'+(sc.intro?'<p class="sm" style="margin-bottom:.6rem">'+sc.intro+'</p>':'')+'<ul class="li">'+sc.items.map((it,i)=>'<li><span class="k">'+(sc.numbered?i+1:'·')+'</span><div><b>'+it[0]+'</b>'+(it[1]?'<span class="t">'+it[1]+'</span>':'')+'</div></li>').join('')+'</ul>'+(sc.outro?'<p class="sm" style="margin-top:.7rem">'+sc.outro+'</p>':''))}
 else if(sc.type==='cards'){sec(d,lbl(sc.label)+'<h2>'+sc.title+'</h2>'+(sc.intro?'<p class="sm" style="margin-bottom:.7rem">'+sc.intro+'</p>':'')+sc.items.map(it=>'<div class="card">'+(it[2]?'<span class="tag">'+it[2]+'</span>':'')+'<b>'+it[0]+'</b><span>'+it[1]+'</span></div>').join('')+(sc.outro?'<p class="sm">'+sc.outro+'</p>':''))}
 else if(sc.type==='gallery'){sec(d,lbl(sc.label)+'<h2>'+sc.title+'</h2>'+(sc.intro?'<p class="sm">'+sc.intro+'</p>':'')+'<div class="gal">'+sc.imgs.map(g=>'<figure class="'+(g.wide?'wide':'')+'"><img loading="lazy" src="'+g.src+'" alt="'+esc(g.cap)+'"'+(g.pos?' style="object-position:'+g.pos+'"':'')+'><figcaption class="'+(g.ia?'ia':'')+'">'+g.cap+'</figcaption></figure>').join('')+'</div>'+(sc.outro?'<p class="sm">'+sc.outro+'</p>':''))}
 else if(sc.type==='video'){sec(d,lbl(sc.label)+'<h2>'+sc.title+'</h2>'+(sc.intro?'<p class="sm">'+sc.intro+'</p>':'')+'<div class="vid"'+(sc.ratio?' style="aspect-ratio:'+sc.ratio+';width:'+(sc.w||'min(58%,27vh)')+'"':'')+'><video src="'+sc.src+'" poster="'+(sc.poster||'')+'" autoplay muted loop playsinline preload="metadata"></video>'+(sc.nocap?'':'<span class="vtag">'+(sc.cap||'Fait par IA')+'</span>')+'</div>'+(sc.items?'<ul class="dots">'+sc.items.map(t=>'<li>'+t+'</li>').join('')+'</ul>':''))}
 else if(sc.type==='dash'){sec(d,lbl(sc.label)+'<h2>'+sc.title+'</h2>'+(sc.intro?'<p class="sm">'+sc.intro+'</p>':'')+'<div class="dash"><div class="dh"><b>'+sc.app+'</b><span>'+(sc.badge||'Exemple · chiffres fictifs')+'</span></div><div class="kp">'+sc.kpis.map(k=>'<div><em>'+k[1]+'</em><span>'+k[0]+'</span></div>').join('')+'</div><div class="br"><span class="bt">'+sc.bars.title+'</span>'+(()=>{const m=Math.max(...sc.bars.items.map(x=>x[1]));return sc.bars.items.map(x=>'<div class="b"><i style="height:'+Math.round(x[1]/m*100)+'%"></i><span>'+x[0]+'</span></div>').join('')})()+'</div><ul class="rw">'+sc.rows.map(r=>'<li><b>'+r[0]+'</b><span>'+r[1]+'</span>'+(r[2]?'<i>'+r[2]+'</i>':'')+'</li>').join('')+'</ul></div>'+(sc.outro?'<p class="sm">'+sc.outro+'</p>':''))}
 else if(sc.type==='live'){sec(d,lbl(sc.label)+'<h2>'+sc.title+'</h2>'+(sc.intro?'<p class="sm">'+sc.intro+'</p>':'')+'<div class="iso"><div class="plan">'+sc.rooms.map(r=>'<div class="rm '+(r.s||'')+'" style="left:'+r.x+'%;top:'+r.y+'%;width:'+r.w+'%;height:'+r.h+'%"><b>'+r.n+'</b>'+(r.who?'<span>'+r.who+'</span>':'')+(r.s==='occ'?'<i class="dot"></i>':'')+'</div>').join('')+'</div></div><div class="lg"><span><i class="occ"></i>En soin</span><span><i class="free"></i>Libre</span><span><i class="prep"></i>Préparation</span></div>'+(sc.outro?'<p class="sm">'+sc.outro+'</p>':''))}
 else if(sc.type==='dash2'){sec(d,lbl(sc.label)+'<h2>'+sc.title+'</h2><div class="dash"><div class="dh"><b>'+sc.app+'</b><span>'+(sc.badge||'Exemple')+'</span></div><div class="kp k4">'+sc.kpis.map(k=>'<div><em>'+k[1]+'</em><span>'+k[0]+'</span>'+(k[2]?'<small class="'+(k[2][0]==='-'?'dn':'up')+'">'+k[2]+'</small>':'')+'</div>').join('')+'</div><div class="sx">'+sc.social.map(s=>'<div><b>'+s[0]+'</b><em>'+s[1]+'</em><span>'+s[2]+'</span></div>').join('')+'</div><div class="tm"><span class="bt2">'+sc.teamTitle+'</span>'+sc.team.map(t=>'<div><i>'+t[0].slice(0,1)+'</i><b>'+t[0]+'</b><span>'+t[1]+'</span><u class="'+t[3]+'">'+t[2]+'</u></div>').join('')+'</div></div>'+(sc.outro?'<p class="sm">'+sc.outro+'</p>':''))}
 else if(sc.type==='genie'){sec(d,lbl(sc.label)+'<h2>'+sc.title+'</h2>'+(sc.intro?'<p class="sm">'+sc.intro+'</p>':'')+'<div class="gn"><img src="'+sc.img+'" alt="'+esc(sc.name)+'"><div class="ch"><div class="chh"><b>'+sc.name+'</b><span>en ligne · répond 24h/24</span></div>'+sc.msgs.map(m=>'<p class="'+(m[0]==='c'?'me':'bot')+'">'+m[1]+'</p>').join('')+'</div></div>'+(sc.items?'<ul class="dots">'+sc.items.map(t=>'<li>'+t+'</li>').join('')+'</ul>':''))}
 else if(sc.type==='catalog'){sec(d,lbl(sc.label)+'<h2>'+sc.title+'</h2>'+(sc.intro?'<p class="sm" style="margin-bottom:.5rem">'+sc.intro+'</p>':'')+sc.groups.map(g=>'<div class="grp"><span class="tag'+(g.alt?' alt':'')+'">'+g.tag+'</span><ul class="dots">'+g.items.map(t=>'<li>'+t+'</li>').join('')+'</ul></div>').join('')+(sc.outro?'<p class="sm">'+sc.outro+'</p>':''))}
 else if(sc.type==='price'){sec(d,lbl(sc.label)+'<h2>'+sc.title+'</h2>'+sc.items.map(it=>'<div class="card">'+(it.tag?'<span class="tag">'+it.tag+'</span>':'')+'<div class="price"><b>'+it.name+'</b><em>'+it.price+'</em></div><span>'+it.sub+'</span></div>').join('')+(sc.outro?'<p class="sm">'+sc.outro+'</p>':''))}
 else if(sc.type==='multi'){const s=sec('',lbl(sc.label)+'<h2>'+sc.title+'</h2><p class="sm">'+sc.intro+'</p><div class="chips">'+sc.options.map(o=>'<button class="chip" data-q="'+sc.id+'" data-v="'+esc(o)+'">'+o+'</button>').join('')+'</div><input type="text" data-other="'+sc.id+'" placeholder="Autre chose ? Écris-le ici"><p class="hint">Coche tout ce qui te parle. Recliquer décoche.</p>');
   s.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{const a=st[sc.id]=st[sc.id]||[];const v=b.dataset.v;const i=a.indexOf(v);i<0?a.push(v):a.splice(i,1);if(sc.id===C.top3From&&st.top3)st.top3=st.top3.filter(x=>a.includes(x));save();paint()});
   const o=s.querySelector('[data-other]');o.value=st[sc.id+'_autre']||'';o.oninput=()=>{st[sc.id+'_autre']=o.value;save()}}
 else if(sc.type==='top3'){const s=sec('',lbl(sc.label)+'<h2>'+sc.title+'</h2><p class="sm">'+sc.intro+'</p><div class="chips" id="t3"></div><p class="hint" id="t3h"></p>');s.dataset.top3=1}
 else if(sc.type==='open'){const s=sec('',lbl(sc.label)+'<h2>'+sc.title+'</h2>'+(sc.intro?'<p class="sm">'+sc.intro+'</p>':'')+'<div class="mic"><span aria-hidden="true">🎙️</span>Sur ton téléphone, appuie sur le micro du clavier et parle : ça s\'écrit tout seul.</div><textarea data-open="'+sc.id+'" placeholder="'+esc(sc.ph||'Ta réponse…')+'"></textarea>');const t=s.querySelector('textarea');t.value=st[sc.id]||'';t.oninput=()=>{st[sc.id]=t.value;save()}}
 else if(sc.type==='final'){const s=sec('dk',lbl(sc.label)+'<h2>'+sc.title+'</h2><p class="sm" style="margin-bottom:.8rem">'+sc.intro+'</p><input type="text" id="prenom" placeholder="Ton prénom" autocomplete="given-name"><div class="err" id="perr" hidden>Indique ton prénom pour que je sache que c\'est toi.</div><button class="btn" id="send">Envoyer mes réponses à '+C.owner+'</button><div class="ok" id="sok" hidden></div><button class="btn ghost" id="copy" style="color:var(--acc);border-color:var(--acc)">Copier mes réponses</button><pre class="blk" id="blk" hidden></pre><p class="sm" style="margin-top:.9rem;font-size:.78rem">'+sc.legal+'</p>');
   const p=s.querySelector('#prenom');p.value=st.prenom||'';p.oninput=()=>{st.prenom=p.value;save();s.querySelector('#perr').hidden=true}}
});
const slides=[...deck.children];
function paint(){
 document.querySelectorAll('.chip[data-q]').forEach(b=>b.classList.toggle('on',(st[b.dataset.q]||[]).includes(b.dataset.v)));
 const t3=document.getElementById('t3');if(t3){const src=st[C.top3From]||[];const top=st.top3||[];
  t3.innerHTML=src.length?src.map(v=>{const r=top.indexOf(v);return '<button class="chip'+(r>=0?' on':'')+'" data-t="'+esc(v)+'">'+(r>=0?'<span class="r">'+(r+1)+'</span> ':'')+v+'</button>'}).join(''):'<p class="sm">Reviens un écran en arrière et coche d\'abord ce que tu voudrais.</p>';
  document.getElementById('t3h').textContent=src.length?(top.length+' / 3 choisies · touche dans l\'ordre : 1, 2, 3. Recliquer retire.'):'';
  t3.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{const v=b.dataset.t;const a=st.top3=st.top3||[];const i=a.indexOf(v);if(i>=0)a.splice(i,1);else if(a.length<3)a.push(v);save();paint()})}
}
paint();
function bloc(){const L=['Réponses de '+(st.prenom||'?')+' — '+C.client];
 C.screens.forEach(sc=>{if(sc.type==='multi'){const a=st[sc.id]||[];L.push('',sc.short+' : '+(a.length?a.join(', '):'—')+(st[sc.id+'_autre']?' / autre : '+st[sc.id+'_autre'].replace(/\s*\n\s*/g,' / '):''))}
  else if(sc.type==='top3'){L.push('',sc.short+' : '+((st.top3||[]).map((v,i)=>(i+1)+'. '+v).join('  ')||'—'))}
  else if(sc.type==='open'){L.push('',sc.short+' : '+((st[sc.id]||'').trim().replace(/\s*\n\s*/g,' / ')||'—'))}});
 return L.join('\n')}
function payload(){const r={};C.screens.forEach(sc=>{if(sc.type==='multi'){r[sc.id]=st[sc.id]||[];if(st[sc.id+'_autre'])r[sc.id+'_autre']=st[sc.id+'_autre']}else if(sc.type==='top3')r.top3=st.top3||[];else if(sc.type==='open')r[sc.id]=st[sc.id]||''});return r}
const sendB=document.getElementById('send');
if(sendB)sendB.onclick=async()=>{const pr=(st.prenom||'').trim();const s=sendB.closest('.s');if(!pr){s.querySelector('#perr').hidden=false;s.querySelector('#prenom').focus();return}
 sendB.disabled=true;sendB.textContent='Envoi…';
 try{const DB=(C.db&&C.db.url)?C.db:(window.IAEM_DB||{});if(!DB.url)throw new Error('nodb');
  const r=await fetch(DB.url+'/rest/v1/'+DB.table,{method:'POST',headers:{'apikey':DB.key,'Authorization':'Bearer '+DB.key,'Content-Type':'application/json','Prefer':'return=minimal'},body:JSON.stringify({slug:C.slug,prenom:pr,reponses:payload(),bloc:bloc(),agent:navigator.userAgent.slice(0,200)})});
  if(!r.ok)throw new Error('http '+r.status);
  st.sent=new Date().toISOString();save();
  try{if(window.IAEM_NOTIFY)fetch(window.IAEM_NOTIFY,{method:'POST',mode:'no-cors',body:new URLSearchParams({slug:C.slug,prenom:pr,bloc:bloc()})}).catch(()=>{})}catch(e){}
  document.getElementById('thxName').textContent='Merci '+pr+' !';document.getElementById('thxTxt').textContent=C.thanks;
  const t=document.getElementById('thx');t.offsetHeight;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),4500);
  sendB.textContent='Envoyé ✓ (tu peux renvoyer si tu modifies)';sendB.disabled=false;
 }catch(e){sendB.disabled=false;sendB.textContent='Envoyer mes réponses à '+C.owner;const o=s.querySelector('#sok');o.hidden=false;o.style.color='#e8a08f';o.textContent='L\'envoi n\'est pas passé. Appuie sur « Copier mes réponses » et envoie-les-moi sur WhatsApp.'}};
const copyB=document.getElementById('copy');
if(copyB)copyB.onclick=async()=>{const txt=bloc();const s=copyB.closest('.s');const pre=s.querySelector('#blk');let ok=false;
 try{await navigator.clipboard.writeText(txt);ok=true}catch(e){try{const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();ok=document.execCommand('copy');ta.remove()}catch(e2){}}
 pre.hidden=false;pre.textContent=ok?txt:'Sélectionne ce texte à la main et copie-le :\n\n'+txt;copyB.textContent=ok?'Copié ✓ — colle-le sur WhatsApp':'Copie impossible : sélectionne le texte ci-dessous';pre.scrollIntoView({behavior:'smooth',block:'nearest'})};
let cur=0;const fi=document.getElementById('fi'),cnt=document.getElementById('cnt'),prev=document.getElementById('prev'),next=document.getElementById('next');
function go(i){i=Math.max(0,Math.min(slides.length-1,i));deck.scrollTo({left:i*deck.clientWidth,behavior:'smooth'})}
function upd(){cur=Math.round(deck.scrollLeft/deck.clientWidth);fi.style.width=((cur+1)/slides.length*100)+'%';cnt.textContent=(cur+1)+' / '+slides.length;prev.style.visibility=cur?'visible':'hidden';next.textContent=cur===slides.length-1?'Début ↺':'Suivant →';if(slides[cur]&&slides[cur].dataset.top3)paint()}
deck.addEventListener('scroll',()=>{clearTimeout(window._t);window._t=setTimeout(upd,60)});
prev.onclick=()=>go(cur-1);next.onclick=()=>go(cur===slides.length-1?0:cur+1);
document.addEventListener('keydown',e=>{if(e.target.matches('textarea,input'))return;if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)});
window.addEventListener('resize',()=>deck.scrollTo({left:cur*deck.clientWidth}));
upd();

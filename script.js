const KEY='mohit_editable_v1';
let S={};
try{S=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){S={};localStorage.removeItem(KEY)}
const $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function save(){localStorage.setItem(KEY,JSON.stringify(S))}
function apply(){
 document.body.className=(S.theme?'theme-'+S.theme:'')+' no-zoom '+(S.light?'light-mode ':'');
 document.querySelectorAll('[data-name]').forEach(e=>e.textContent=S.name||'Mohit');
 document.querySelectorAll('[data-tagline]').forEach(e=>e.textContent=S.tagline||'Gamer • Creator • Student • 5x_gamerr');
 if(S.photo){$('#profilePhoto').src=S.photo;$('#navPhoto').src=S.photo;document.querySelectorAll('.mini-profile').forEach(e=>e.src=S.photo)}
 $('#aboutText').textContent=S.about||'Welcome to my personal gaming portfolio. Explore my gaming world, gallery, challenges and history.';
 $('#gamingNameText').textContent=(S.gamingName||S.name||'Mohit')+' • '+(S.gamingUser||'5x_gamerr');
 $('#gamingGameText').textContent=S.gamingGame||'FREE FIRE';$('#gamingUidText').textContent=S.uid?S.uid:'UID not set';$('#gamingIgText').textContent=S.gamingIg||'@5x_gamerr';$('#gamingIgText').href='https://instagram.com/'+String(S.gamingIg||'@5x_gamerr').replace(/^@/,'');$('#statusText').textContent=S.status||'ONLINE';
}
window.addEventListener('load',()=>setTimeout(()=>$('#loader')?.style.setProperty('display','none'),650));
const settingsEl=$('#settings');
if($('.close'))$('.close').onclick=()=>settingsEl.classList.remove('open'); if($('.backdrop'))$('.backdrop').onclick=()=>settingsEl.classList.remove('open');
$('#themeBtn').onclick=()=>{S.light=!S.light;save();apply()};
$('#themeSelect').onchange=e=>{S.theme=e.target.value;save();apply()};
function ownerOpen(){const entered=prompt('Owner Settings PIN:');if(entered==='7568'){settingsEl.classList.add('open');$('#themeSelect').value=S.theme||'cyan'}else if(entered!==null)alert('Wrong PIN. Settings केवल Owner PIN से खुलेगी।')}
$('#settingsBtn').onclick=ownerOpen; $('#ownerUnlock').onclick=ownerOpen;
let ownerTaps=0,ownerTimer;$('.brand').addEventListener('click',e=>{ownerTaps++;clearTimeout(ownerTimer);ownerTimer=setTimeout(()=>ownerTaps=0,1000);if(ownerTaps>=5){ownerTaps=0;e.preventDefault();ownerOpen()}});
document.addEventListener('keydown',e=>{if(e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()==='s'){e.preventDefault();ownerOpen()}});
$('#editAboutBtn').onclick=()=>{const entered=prompt('Owner PIN for About Edit:');if(entered==='7568'){const v=prompt('About Text:',S.about||'Welcome to my personal gaming portfolio. Explore my gaming world, gallery, challenges and history.');if(v!==null){S.about=v.trim();save();apply()}}else if(entered!==null)alert('Wrong PIN. About Edit केवल Owner PIN से खुलेगा।')};
$('#changePhotoBtn').onclick=()=>{const entered=prompt('Owner PIN for Profile Photo:');if(entered==='7568')$('#profilePhotoInput').click();else if(entered!==null)alert('Wrong PIN. Profile Photo केवल Owner PIN से बदली जा सकती है।')};
$('#profilePhotoInput').onchange=e=>{const f=e.target.files[0];if(!f)return;if(f.size>4e6)return alert('Photo 4MB से कम रखें');const r=new FileReader();r.onload=()=>{S.photo=r.result;save();apply()};r.readAsDataURL(f)};
$('#editGamingProfileBtn').onclick=()=>{const entered=prompt('Owner PIN for Gaming Profile Edit:');if(entered!=='7568'){if(entered!==null)alert('Wrong PIN. Profile Edit केवल Owner PIN से खुलेगा।');return}const uid=prompt('Game UID:',S.uid||'');if(uid!==null){S.uid=uid.trim();save();apply();alert('UID save हो गया।')}};
$('#shareBtn').onclick=share;
async function share(){const url='https://mohitbishnoi7568-alt.github.io/';if(navigator.share){try{await navigator.share({title:'Mohit Gaming Portfolio',text:'Check my gaming website!',url})}catch(e){}}else{try{await navigator.clipboard.writeText(url);alert('Website link copied!')}catch(e){prompt('Copy website link:',url)}}}
function prepareForm(form,subject){if(!form)return;form.onsubmit=e=>{S.email='mohitbishnoi7568@gmail.com';save();const btn=form.querySelector('button[type="submit"]');if(btn){btn.disabled=true;btn.classList.add('sending');btn.dataset.old=btn.textContent;btn.textContent='SENDING •••'}form.action='https://formsubmit.co/'+encodeURIComponent(S.email);form.method='POST';form.enctype='application/x-www-form-urlencoded';form.querySelectorAll('input[data-auto]').forEach(x=>x.remove());const add=(name,value)=>{const x=document.createElement('input');x.type='hidden';x.name=name;x.value=value;x.dataset.auto='1';form.appendChild(x)};add('_next',new URL('thank-you.html',location.href).href);add('_subject',subject);add('_captcha','false');add('_template','table');if(subject.startsWith('New Gaming Profile')){const vals=[['Name',form.name?.value],['UID',form.uid?.value],['Username',form.username?.value],['Instagram',form.instagram?.value],['Message',form.message?.value]];const textMsg='New Gaming Profile\n'+vals.map(([k,v])=>k+': '+(v||'')).join('\n');add('_whatsapp_message',textMsg);setTimeout(()=>{const wa='https://wa.me/917568206887?text='+encodeURIComponent(textMsg);window.open(wa,'_blank','noopener');},120);}else if(subject.startsWith('New Contact Details')){const vals=[['Name',form.name?.value],['WhatsApp',form.whatsapp?.value],['Email',form.email?.value],['Message',form.message?.value]];const textMsg='New Contact Details\n'+vals.map(([k,v])=>k+': '+(v||'')).join('\n');add('_whatsapp_message',textMsg);setTimeout(()=>{const wa='https://wa.me/917568206887?text='+encodeURIComponent(textMsg);window.open(wa,'_blank','noopener');},120);}setTimeout(()=>btn&&btn.classList.add('send-ready'),250)}}
prepareForm($('#challengeForm'),'New Gaming Profile Details - 5x_gamerr');prepareForm($('#contactForm'),'New Contact Details - 5x_gamerr');prepareForm($('#mainContactForm'),'New Contact Message - 5x_gamerr');
function updateClock(){const now=new Date();const time=new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true}).format(now);const date=new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',weekday:'long',day:'2-digit',month:'long',year:'numeric'}).format(now);$('#liveTime').textContent=time;$('#liveDate').textContent=date}
updateClock();setInterval(updateClock,1000);
const weatherCodes={0:['☀️','Clear sky'],1:['🌤️','Mainly clear'],2:['⛅','Partly cloudy'],3:['☁️','Overcast'],45:['🌫️','Fog'],48:['🌫️','Rime fog'],51:['🌦️','Light drizzle'],53:['🌦️','Drizzle'],55:['🌧️','Heavy drizzle'],61:['🌧️','Light rain'],63:['🌧️','Rain'],65:['🌧️','Heavy rain'],71:['🌨️','Light snow'],73:['❄️','Snow'],75:['❄️','Heavy snow'],80:['🌦️','Rain showers'],81:['🌧️','Rain showers'],82:['⛈️','Heavy showers'],95:['⛈️','Thunderstorm'],96:['⛈️','Thunderstorm + hail'],99:['⛈️','Thunderstorm + hail']};
async function loadWeather(lat=26.9124,lon=75.7873,place='Jaipur, India'){try{const u=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`;const r=await fetch(u);if(!r.ok)throw Error('weather');const d=await r.json();const code=d.current.weather_code;const meta=weatherCodes[code]||['🌡️','Live weather'];$('#weatherIcon').textContent=meta[0];$('#weatherTemp').textContent=Math.round(d.current.temperature_2m)+'°C';$('#weatherText').textContent=meta[1]+' • Wind '+Math.round(d.current.wind_speed_10m)+' km/h';$('#weatherPlace').textContent=place+' • LIVE';}catch(e){$('#weatherText').textContent='Weather unavailable';$('#weatherPlace').textContent=place}}
function detectWeather(){if(navigator.geolocation){navigator.geolocation.getCurrentPosition(pos=>loadWeather(pos.coords.latitude,pos.coords.longitude,'Your location'),()=>loadWeather(),{enableHighAccuracy:false,timeout:7000,maximumAge:300000})}else loadWeather()}
$('#weatherLocate').onclick=detectWeather;detectWeather();setInterval(detectWeather,600000);
// lightweight particle background
const pc=$('#particles'),ctx=pc.getContext('2d');let pts=[];function resize(){pc.width=innerWidth;pc.height=innerHeight;pts=Array.from({length:Math.min(65,Math.floor(innerWidth/18))},()=>({x:Math.random()*pc.width,y:Math.random()*pc.height,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:Math.random()*1.5+.4}))}function draw(){ctx.clearRect(0,0,pc.width,pc.height);ctx.fillStyle='rgba(0,234,255,.65)';for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>pc.width)p.vx*=-1;if(p.y<0||p.y>pc.height)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}requestAnimationFrame(draw)}addEventListener('resize',resize);resize();draw();
addEventListener('pointermove',e=>{const g=$('#cursorGlow');if(innerWidth<700){g.style.opacity=0;return}g.style.opacity=1;g.style.transform=`translate(${e.clientX-90}px,${e.clientY-90}px)`});
function renderW(){let a=S.winners||[];$('#winnerGrid').innerHTML=a.map((x,i)=>`<article class="winner-card"><img src="${x.img}" alt="Winner shot"><b>${esc(x.cap)}</b></article>`).join('')||'<p class="muted">Winner shots coming soon.</p>'}
const winnerPublicBtn=$('#addWinnerPublic'),winnerGalleryInput=$('#winnerGalleryInput');if(winnerPublicBtn&&winnerGalleryInput){winnerPublicBtn.onclick=()=>{const entered=prompt('Owner PIN for Winner Shot:');if(entered==='7568')winnerGalleryInput.click();else if(entered!==null)alert('Wrong PIN. Winner Shot केवल Owner PIN से add होगा।')};winnerGalleryInput.onchange=e=>{const f=e.target.files[0];if(!f)return;if(f.size>4e6){alert('Photo 4MB से कम रखें');winnerGalleryInput.value='';return}const r=new FileReader();r.onload=()=>{const cap=prompt('Winner caption:', 'Winner Shot');if(cap===null){winnerGalleryInput.value='';return}S.winners=S.winners||[];S.winners.push({img:r.result,cap:cap.trim()||'Winner Shot'});save();renderW();winnerGalleryInput.value='';};r.readAsDataURL(f)}}function renderH(){let a=S.history||[];$('#historyGrid').innerHTML=a.map(x=>`<article class="history-card"><b>${esc(x.game)}</b><p>UID: ${esc(x.uid)}</p><p>Username: ${esc(x.user)}</p></article>`).join('')||'<p class="muted">Gaming history will appear here.</p>'}
apply();renderW();renderH();

// Owner-only gallery photo replacement: choose any photo for each of the 3 slots.
(function(){
  const btn=$('#editGalleryBtn');
  if(!btn)return;
  const slots=[['#galleryImg1','#galleryInput1'],['#galleryImg2','#galleryInput2'],['#galleryImg3','#galleryInput3']];
  btn.onclick=()=>{
    const entered=prompt('Owner PIN for Gallery Photos:');
    if(entered!=='7568'){if(entered!==null)alert('Wrong PIN. Gallery Photos केवल Owner PIN से बदल सकते हैं।');return;}
    const n=prompt('कौन-सी फोटो बदलनी है? 1, 2 या 3','1');
    const i=Number(n)-1;
    if(!Number.isInteger(i)||i<0||i>2)return;
    const input=$(slots[i][1]);
    input.onchange=e=>{
      const f=e.target.files&&e.target.files[0]; if(!f)return;
      if(f.size>5e6){alert('Photo 5MB से कम रखें');input.value='';return;}
      const r=new FileReader();
      r.onload=()=>{
        $(slots[i][0]).src=r.result;
        try{localStorage.setItem('mohit_gallery_'+(i+1),r.result)}catch(err){alert('Photo बहुत बड़ी है, दूसरी photo चुनें।')}
        input.value='';
      };
      r.readAsDataURL(f);
    };
    input.click();
  };
  slots.forEach((x,i)=>{const saved=localStorage.getItem('mohit_gallery_'+(i+1));if(saved)$(x[0]).src=saved;});
})();

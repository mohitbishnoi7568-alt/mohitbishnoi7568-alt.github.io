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


// Owner-only gallery photo replacement: each of the 3 gallery photos has its own button.
(function(){
  const slots=[
    ['#editGallery1Btn','#galleryInput1','#galleryImg1'],
    ['#editGallery2Btn','#galleryInput2','#galleryImg2'],
    ['#editGallery3Btn','#galleryInput3','#galleryImg3']
  ];
  slots.forEach((slot,i)=>{
    const btn=$(slot[0]), input=$(slot[1]), img=$(slot[2]);
    if(!btn||!input||!img)return;
    btn.onclick=()=>{
      const entered=prompt('Owner PIN for Gallery Photo '+(i+1)+':');
      if(entered!=='7568'){if(entered!==null)alert('Wrong PIN. Gallery Photo केवल Owner PIN से बदली जा सकती है।');return;}
      input.onchange=e=>{
        const f=e.target.files&&e.target.files[0]; if(!f)return;
        if(f.size>5e6){alert('Photo 5MB से कम रखें');input.value='';return;}
        const r=new FileReader();
        r.onload=()=>{try{localStorage.setItem('mohit_gallery_'+(i+1),r.result);img.src=r.result;alert('Gallery Photo '+(i+1)+' save हो गई।')}catch(err){alert('Photo बहुत बड़ी है, दूसरी photo चुनें।')}input.value='';};
        r.readAsDataURL(f);
      };
      input.click();
    };
    const saved=localStorage.getItem('mohit_gallery_'+(i+1));
    if(saved)img.src=saved;
  });
})();

// Owner-only full gaming profile editor: name, game, UID, Instagram and status.
(function(){
  const btn=$('#editGamingProfileBtn');
  if(!btn)return;
  btn.onclick=()=>{
    const entered=prompt('Owner PIN for Gaming Profile:');
    if(entered!=='7568'){if(entered!==null)alert('Wrong PIN. Profile Edit केवल Owner PIN से खुलेगा।');return;}
    const name=prompt('Gaming Name:',S.gamingName||S.name||'Mohit'); if(name===null)return;
    const game=prompt('Game:',S.gamingGame||'FREE FIRE'); if(game===null)return;
    const uid=prompt('Game UID:',S.uid||''); if(uid===null)return;
    const ig=prompt('Instagram username:',S.gamingIg||'@5x_gamerr'); if(ig===null)return;
    const status=prompt('Status:',S.status||'ONLINE'); if(status===null)return;
    S.gamingName=name.trim()||'Mohit'; S.gamingGame=game.trim()||'FREE FIRE'; S.uid=uid.trim(); S.gamingIg=ig.trim()||'@5x_gamerr'; S.status=status.trim()||'ONLINE';
    save();apply();alert('Gaming Profile save हो गया।');
  };
})();

/* ================= VOICE CONTROL ================= */
(()=>{
 const btn=$('#voiceBtn'), panel=$('#voicePanel'), status=$('#voiceStatus'), hint=$('#voiceHint'), close=$('#voiceClose');
 if(!btn||!panel)return;
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 let rec=null, active=false, restarting=false;
 const say=(text)=>{try{window.speechSynthesis?.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=/[\u0900-\u097F]/.test(text)?'hi-IN':'en-IN';u.rate=.95;window.speechSynthesis?.speak(u)}catch(e){}};
 const norm=s=>String(s||'').toLowerCase().replace(/[.,!?]/g,' ').replace(/\s+/g,' ').trim();
 function setUI(on,msg){active=on;btn.classList.toggle('voice-active',on);panel.classList.add('open');status.textContent=on?'Voice Control ON':'Voice Control OFF';hint.textContent=msg||'Tap the mic and speak a command';}
 function go(id){const el=$(id);if(el){el.scrollIntoView({behavior:'smooth',block:'start'});return true}return false}
 function theme(t){
   const map={cyan:'cyan',purple:'ultraviolet',ultraviolet:'ultraviolet',pink:'pink',blue:'ice',green:'green',matrix:'green',gold:'gold',orange:'cyber-orange',cyber:'cyber-orange',electric:'electric',laser:'laser',hologram:'hologram',plasma:'plasma',toxic:'toxic',chrome:'chrome',red:'red'};
   const key=Object.keys(map).find(k=>t.includes(k)); if(!key)return false;S.theme=map[key];save();apply();if($('#themeSelect'))$('#themeSelect').value=S.theme;say('Theme changed');return true;
 }
 function fillField(field,value){if(!field)return false;field.focus();field.value=value;field.dispatchEvent(new Event('input',{bubbles:true}));return true}
 function command(raw){
   const q=norm(raw); if(!q)return;
   hint.textContent='Heard: '+raw;
   if(/\b(stop|बंद|बन्द|रुको|रोक दो|voice off|वॉइस बंद)\b/.test(q)){stop();say('Voice control off');return}
   if(/\b(home|होम|मुख्य पेज|घर)\b/.test(q)){go('#home');say('Home');return}
   if(/\b(about|अबाउट|मेरे बारे में)\b/.test(q)){go('#about');say('About');return}
   if(/\b(gaming|game|गेमिंग|गेम प्रोफाइल)\b/.test(q)){go('#gaming');say('Gaming profile');return}
   if(/\b(gallery|गैलरी|फोटो)\b/.test(q)){go('#gallery');say('Gallery');return}
   if(/\b(challenge|चैलेंज|डिटेल्स|details)\b/.test(q)){go('#challenge');say('Challenge section');return}
   if(/\b(contact|कॉन्टैक्ट|संपर्क)\b/.test(q)){go('#contact');say('Contact');return}
   if(/\b(winner|winners|विनर|विनर्स)\b/.test(q)){go('#winners');say('Winner shots');return}
   if(/\b(history|हिस्ट्री|इतिहास)\b/.test(q)){go('#history');say('Gaming history');return}
   if(/\b(settings|setting|सेटिंग|थीम)\b/.test(q) && !/theme|थीम/.test(q)){ownerOpen();return}
   if(/\b(share|शेयर|साझा)\b/.test(q)){share();say('Share opened');return}
   if(/\b(top|ऊपर|शुरू में)\b/.test(q)){window.scrollTo({top:0,behavior:'smooth'});say('Going up');return}
   if(/\b(bottom|नीचे|अंत में)\b/.test(q)){window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'});say('Going down');return}
   if(/\b(scroll down|नीचे स्क्रॉल|आगे)\b/.test(q)){window.scrollBy({top:innerHeight*.8,behavior:'smooth'});return}
   if(/\b(scroll up|ऊपर स्क्रॉल|पीछे)\b/.test(q)){window.scrollBy({top:-innerHeight*.8,behavior:'smooth'});return}
   const tm=q.match(/(?:theme|थीम)\s+(.+)/); if(tm&&theme(tm[1]))return;
   if(/\b(edit about|अबाउट एडिट|about बदलो)\b/.test(q)){go('#about');$('#editAboutBtn')?.click();return}
   if(/\b(change photo|profile photo|फोटो बदलो|प्रोफाइल फोटो बदलो)\b/.test(q)){go('#gaming');$('#changePhotoBtn')?.click();return}
   if(/\b(edit profile|प्रोफाइल एडिट|गेमिंग प्रोफाइल बदलो)\b/.test(q)){go('#gaming');$('#editGamingProfileBtn')?.click();return}
   if(/\b(add winner|winner shot जोड़ो|विनर फोटो जोड़ो)\b/.test(q)){go('#winners');$('#addWinnerPublic')?.click();return}
   // Voice dictation: if a form field is focused, spoken text is inserted there.
   const el=document.activeElement;
   if(el&&(el.matches('input,textarea')||el.isContentEditable)){fillField(el,raw);return}
   hint.textContent='Command not recognized — try “Gaming”, “Gallery”, “Theme electric”, or “Contact”';
   say('Command not recognized');
 }
 function start(){
   if(!SR){setUI(false,'Voice recognition is not supported in this browser. Try Chrome on Android.');alert('Voice Control के लिए Chrome/Android browser में microphone permission दें।');return}
   if(rec){try{rec.stop()}catch(e){}}
   rec=new SR();rec.lang='hi-IN';rec.continuous=true;rec.interimResults=false;rec.maxAlternatives=1;
   rec.onstart=()=>setUI(true,'Listening… Hindi + English commands supported');
   rec.onresult=e=>{for(let i=e.resultIndex;i<e.results.length;i++)if(e.results[i].isFinal)command(e.results[i][0].transcript)};
   rec.onerror=e=>{if(e.error==='not-allowed'||e.error==='service-not-allowed'){setUI(false,'Microphone permission is required');active=false;return}hint.textContent='Mic error: '+e.error};
   rec.onend=()=>{if(active&&!restarting){restarting=true;setTimeout(()=>{restarting=false;if(active)try{rec.start()}catch(e){}},250)}};
   active=true;try{rec.start()}catch(e){active=false;setUI(false,'Could not start microphone')}
 }
 function stop(){active=false;if(rec){try{rec.stop()}catch(e){}}setUI(false,'Tap the mic and speak a command')}
 btn.onclick=()=>active?stop():start();close.onclick=()=>panel.classList.remove('open');
})();


/* ================= MOHIT AI ASSISTANT ================= */
(()=>{
 const panel=$('#aiPanel'), openBtn=$('#aiBtn'), closeBtn=$('#aiClose'), input=$('#aiText'), send=$('#aiSend'), mic=$('#aiMic'), messages=$('#aiMessages');
 if(!panel||!openBtn)return;
 const add=(text,who='bot')=>{const d=document.createElement('div');d.className='ai-msg '+(who==='user'?'ai-user':'ai-bot');d.textContent=text;messages.appendChild(d);messages.scrollTop=messages.scrollHeight};
 const speak=(text)=>{try{window.speechSynthesis?.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=/[\u0900-\u097F]/.test(text)?'hi-IN':'en-IN';u.rate=.94;window.speechSynthesis?.speak(u)}catch(e){}};
 const clean=s=>String(s||'').toLowerCase().replace(/[.,!?]/g,' ').replace(/\s+/g,' ').trim();
 function respond(raw){
   const q=clean(raw); if(!q)return;
   add(raw,'user');
   let reply='';
   const go=(id,name)=>{document.querySelector(id)?.scrollIntoView({behavior:'smooth',block:'start'});reply=`${name} खोल दिया है।`};
   if(/\b(hello|hi|hey|नमस्ते|हेलो|हाय)\b/.test(q)){reply='नमस्ते Mohit! मैं तैयार हूँ। तुम website में क्या करवाना चाहते हो?';}
   else if(/\b(home|होम|घर)\b/.test(q)){go('#home','Home')}
   else if(/\b(about|अबाउट|मेरे बारे में)\b/.test(q)){go('#about','About')}
   else if(/\b(gaming|game|गेमिंग|गेम प्रोफाइल)\b/.test(q)){go('#gaming','Gaming Profile')}
   else if(/\b(gallery|गैलरी|फोटो)\b/.test(q)){go('#gallery','Gallery')}
   else if(/\b(challenge|चैलेंज|details|डिटेल्स)\b/.test(q)){go('#challenge','Challenge')}
   else if(/\b(contact|कॉन्टैक्ट|संपर्क)\b/.test(q)){go('#contact','Contact')}
   else if(/\b(winner|winners|विनर|विनर्स)\b/.test(q)){go('#winners','Winner Shots')}
   else if(/\b(history|हिस्ट्री|इतिहास)\b/.test(q)){go('#history','Gaming History')}
   else if(/\b(share|शेयर|साझा)\b/.test(q)){share();reply='Share option खोल दिया है।'}
   else if(/\b(scroll down|नीचे स्क्रॉल|नीचे जाओ|आगे)\b/.test(q)){window.scrollBy({top:innerHeight*.8,behavior:'smooth'});reply='नीचे जा रहा हूँ।'}
   else if(/\b(scroll up|ऊपर स्क्रॉल|ऊपर जाओ|पीछे)\b/.test(q)){window.scrollBy({top:-innerHeight*.8,behavior:'smooth'});reply='ऊपर जा रहा हूँ।'}
   else if(/\b(change photo|profile photo|फोटो बदलो|प्रोफाइल फोटो बदलो)\b/.test(q)){document.querySelector('#gaming')?.scrollIntoView({behavior:'smooth'});$('#changePhotoBtn')?.click();reply='Profile photo बदलने का option खोल रहा हूँ।'}
   else if(/\b(edit profile|प्रोफाइल एडिट|गेमिंग प्रोफाइल बदलो)\b/.test(q)){document.querySelector('#gaming')?.scrollIntoView({behavior:'smooth'});$('#editGamingProfileBtn')?.click();reply='Gaming profile editor खोल रहा हूँ।'}
   else if(/\b(edit about|about बदलो|अबाउट एडिट)\b/.test(q)){document.querySelector('#about')?.scrollIntoView({behavior:'smooth'});$('#editAboutBtn')?.click();reply='About editor खोल रहा हूँ।'}
   else if(/\b(add winner|winner photo जोड़ो|विनर फोटो जोड़ो)\b/.test(q)){document.querySelector('#winners')?.scrollIntoView({behavior:'smooth'});$('#addWinnerPublic')?.click();reply='Winner Shot जोड़ने का option खोल रहा हूँ।'}
   else if(/\b(light mode|लाइट मोड|दिन वाला मोड)\b/.test(q)){S.light=true;save();apply();reply='Light mode on कर दिया।'}
   else if(/\b(dark mode|डार्क मोड|नाइट मोड)\b/.test(q)){S.light=false;save();apply();reply='Dark neon mode on कर दिया।'}
   else {const tm=q.match(/(?:theme|थीम)\s+(.+)/); if(tm){const val=tm[1];const maps={red:'red',लाल:'red',pink:'pink',laser:'laser',green:'green',हरा:'green',gold:'gold',orange:'cyber-orange',electric:'electric',hologram:'hologram',plasma:'plasma',toxic:'toxic',chrome:'chrome',ice:'ice',blue:'ice',purple:'ultraviolet',violet:'ultraviolet',cyan:'cyan'};let key=Object.keys(maps).find(k=>val.includes(k));if(key){S.theme=maps[key];save();apply();if($('#themeSelect'))$('#themeSelect').value=S.theme;reply='Theme '+maps[key]+' कर दिया।';}else reply='यह theme मुझे नहीं मिली। Electric, Red, Pink, Green, Gold, Hologram, Plasma, Toxic या Chrome बोलो।'}else reply='मैंने command नहीं समझी। तुम बोल सकते हो: “Gaming खोलो”, “Gallery खोलो”, “Theme electric कर दो”, “Photo बदलो” या “Home पर जाओ”।'}
   add(reply);speak(reply);
 }
 function submit(){const v=input.value.trim();if(v){input.value='';respond(v)}}
 openBtn.onclick=()=>{panel.classList.add('open');panel.setAttribute('aria-hidden','false');input.focus()}; closeBtn.onclick=()=>{panel.classList.remove('open');panel.setAttribute('aria-hidden','true');window.speechSynthesis?.cancel()}; send.onclick=submit; input.addEventListener('keydown',e=>{if(e.key==='Enter')submit()});
 panel.querySelectorAll('[data-ai]').forEach(b=>b.onclick=()=>respond(b.dataset.ai));
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;let r=null,listening=false;
 if(SR){r=new SR();r.lang='hi-IN';r.interimResults=false;r.continuous=false;r.onstart=()=>{listening=true;panel.classList.add('ai-listening');mic.textContent='⏹'};r.onend=()=>{listening=false;panel.classList.remove('ai-listening');mic.textContent='🎙️'};r.onerror=()=>{listening=false;panel.classList.remove('ai-listening');mic.textContent='🎙️';add('Microphone permission या browser speech support check करो।')};r.onresult=e=>respond(e.results[0][0].transcript);mic.onclick=()=>{if(listening){try{r.stop()}catch(e){}}else{try{r.start()}catch(e){}}}}else mic.onclick=()=>add('इस browser में voice recognition available नहीं है। Android Chrome try करो।');
})();

/* MOHIT AI Android bridge */
window.mohitSpeak = function(text){ try { if ('speechSynthesis' in window) { speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang=/[\u0900-\u097F]/.test(text)?'hi-IN':'en-IN'; speechSynthesis.speak(u); } } catch(e){} };
window.mohitVoiceState = function(state){ document.body.classList.toggle('voice-listening',state==='listening'); document.body.classList.toggle('voice-processing',state==='processing'); };
window.mohitVoiceCommand = function(raw){
  const q=(raw||'').toLowerCase().trim();
  const say=(t)=>{ window.mohitSpeak(t); const box=document.querySelector('#aiChatLog'); if(box){ const p=document.createElement('div'); p.className='ai-msg assistant'; p.textContent=t; box.appendChild(p); box.scrollTop=box.scrollHeight; } };
  if(!q) return;
  if(/whatsapp/.test(q)){ Android.openApp('whatsapp'); say('ठीक है, WhatsApp खोल रहा हूँ।'); return; }
  if(/youtube/.test(q)){ Android.openApp('youtube'); say('ठीक है, YouTube खोल रहा हूँ।'); return; }
  if(/instagram/.test(q)){ Android.openApp('instagram'); say('ठीक है, Instagram खोल रहा हूँ।'); return; }
  if(/chrome|browser/.test(q)){ Android.openApp('chrome'); say('ठीक है, Chrome खोल रहा हूँ।'); return; }
  if(/camera|कैमरा/.test(q)){ Android.openApp('camera'); say('कैमरा खोल रहा हूँ।'); return; }
  if(/call|कॉल|फोन लग/.test(q)){ Android.call('+917568206887'); say('कॉल शुरू कर रहा हूँ।'); return; }
  if(/home|होम/.test(q)){ document.querySelector('#home')?.scrollIntoView({behavior:'smooth'}); say('होम खोल दिया।'); return; }
  if(/gallery|गैलरी/.test(q)){ document.querySelector('#gallery')?.scrollIntoView({behavior:'smooth'}); say('गैलरी खोल दी।'); return; }
  if(/gaming|गेमिंग|profile|प्रोफाइल/.test(q)){ document.querySelector('#gaming')?.scrollIntoView({behavior:'smooth'}); say('Gaming Profile खोल दिया।'); return; }
  if(/contact|कॉन्टैक्ट/.test(q)){ document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'}); say('Contact खोल दिया।'); return; }
  if(/about|अबाउट/.test(q)){ document.querySelector('#about')?.scrollIntoView({behavior:'smooth'}); say('About खोल दिया।'); return; }
  if(/share|शेयर/.test(q)){ document.querySelector('#shareBtn')?.click(); say('Share option खोल रहा हूँ।'); return; }
  say('मैंने सुना: '+raw+'। इस command को अभी नहीं समझ पाया, लेकिन मैं इसे सीखने के लिए तैयार हूँ।');
};

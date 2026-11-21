const APP_NAME="cygna_clinpath201",ADMIN_NAME="Olamide George",ADMIN_EMAIL="olamgeorg9@gmail.com";
const app=document.querySelector('#app'),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sb=window.supabase?supabase.createClient(CFG.URL,CFG.KEY):null;
const LS=(k,v)=>v===undefined?JSON.parse(localStorage.getItem(k)||'null'):localStorage.setItem(k,JSON.stringify(v));
const sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
let user=null,isAdmin=false,Q,tm,S={sel:new Set(),mode:'practice',n:'10'};
function ui(){const u=LS('ui')||{theme:'light',bg:'plain',font:'16px'};document.body.dataset.theme=u.theme;document.body.dataset.bg=u.bg;document.documentElement.style.setProperty('--f',u.font);return u}
function settings(){const u=ui(),o=(a,v)=>a.map(x=>`<option ${x==v?'selected':''}>${x}</option>`).join('');
app.innerHTML=`<div class=card><h3>Settings</h3>Theme <select id=th>${o(['light','dark','green','blue','purple','pink','orange','amoled'],u.theme)}</select><br>Background <select id=bg>${o(['plain','gradient','pattern','image'],u.bg)}</select><br>Font <select id=fs>${o(['14px','16px','19px'],u.font)}</select><br><button class=p onclick="LS('ui',{theme:th.value,bg:bg.value,font:fs.value});ui();user?home():authView()">Save</button></div>`}
function authView(m='login'){app.innerHTML=`<div class="card auth"><h2>${m=='login'?'Login':m=='signup'?'Sign up':'Reset password'}</h2>${m=='signup'?'<input id=nm placeholder="Full name">':''}<input id=em type=email placeholder=Email>${m!='forgot'?'<input id=pw type=password placeholder=Password>':''}<button class=p onclick="doAuth('${m}')">Go</button><p><a href=# onclick="authView('login');return false">Login</a> | <a href=# onclick="authView('signup');return false">Sign up</a> | <a href=# onclick="authView('forgot');return false">Forgot password?</a></p></div>`}
async function doAuth(m){if(!sb)return alert('Supabase not loaded (offline?)');const e=em.value.trim(),p=window.pw?pw.value:'';let r;
if(m=='forgot'){r=await sb.auth.resetPasswordForEmail(e,{redirectTo:location.origin});return alert(r.error?r.error.message:'Reset link sent to your email')}
if(m=='signup'){if(!nm.value.trim())return alert('Enter your name');r=await sb.auth.signUp({email:e,password:p,options:{data:{full_name:nm.value.trim(),app_name:APP_NAME}}});if(r.error)return alert(r.error.message);if(!r.data.session)return alert('Check your email to confirm, then login.')}
else{r=await sb.auth.signInWithPassword({email:e,password:p});if(r.error)return alert(r.error.message)}
if(await afterLogin((r.data.session||r.data).user||r.data.user))home()}
async function afterLogin(u){isAdmin=u.email.toLowerCase()===ADMIN_EMAIL.toLowerCase();let{data:p}=await sb.from('profiles').select('*').eq('id',u.id).maybeSingle();
if(!isAdmin&&p&&p.app_name!==APP_NAME){await sb.auth.signOut();alert('This account is not for CLINPATH 201');authView();return false}
if(!p)await sb.from('profiles').insert({id:u.id,full_name:u.user_metadata.full_name||'',email:u.email,role:isAdmin?'admin':'student',app_name:APP_NAME});
user={id:u.id,email:u.email,name:isAdmin?ADMIN_NAME:(p&&p.full_name)||u.user_metadata.full_name||u.email};return true}
async function logout(){clearInterval(tm);if(sb)await sb.auth.signOut();user=null;authView()}
const topics=()=>TP.map(t=>[t,QB.filter(q=>q.topic==t).length]);
function home(){const T=topics(),H=LS('res_'+user.id)||[],avg=H.length?Math.round(H.reduce((a,r)=>a+r.percentage,0)/H.length):0,best=H.length?Math.max(...H.map(r=>r.percentage)):0,ts={};
H.forEach(r=>Object.entries(r.topic_stats||{}).forEach(([k,v])=>{ts[k]=ts[k]||[0,0];ts[k][0]+=v[0];ts[k][1]+=v[1]}));
app.innerHTML=`<div class=card><h2>Welcome, ${esc(user.name)}</h2>Clinical Pathology 201 <button onclick=logout()>Logout</button>${isAdmin?'<a href=admin.html>Admin Dashboard</a>':''}</div>
<div class=card><h3>Topics</h3><button onclick=selAll(1)>Select All</button><button onclick=selAll(0)>Clear All</button>${T.map(([t,c],i)=>`<label class=row><input type=checkbox ${S.sel.has(t)?'checked':''} onchange="tg(${i})">${t} (${c} questions)</label>`).join('')}</div>
<div class=card>Mode <select onchange="S.mode=this.value"><option value=practice ${S.mode=='practice'?'selected':''}>Practice</option><option value=exam ${S.mode=='exam'?'selected':''}>Exam</option><option value=timed ${S.mode=='timed'?'selected':''}>Timed (60s/question)</option></select> Questions <select onchange="S.n=this.value">${['10','20','30','50','100','All'].map(x=>`<option ${x==S.n?'selected':''}>${x}</option>`).join('')}</select><br><button class=p onclick=start()>Start Quiz</button></div>
<div class=card><h3>My Scores</h3>Quizzes: ${H.length} | Average: ${avg}% | Best: ${best}% | Last: ${H[0]?H[0].percentage+'%':'-'}${Object.entries(ts).map(([k,v])=>{const p=Math.round(v[0]/v[1]*100);return`<p>${k}: ${p}% ${p>=50?'(strong)':'(weak)'}<div class=bar><i style="width:${p}%"></i></div></p>`}).join('')}
<div class=wrap><table><tr><th>Date<th>Topics<th>Mode<th>Score<th>Time</tr>${H.map(r=>`<tr><td>${new Date(r.created_at).toLocaleDateString()}<td>${esc(r.topics)}<td>${r.mode}<td>${r.score}/${r.total_questions}<td>${r.time_used}s</tr>`).join('')}</table></div><button onclick=clr()>Clear History</button></div>`}
function tg(i){const t=TP[i];S.sel.has(t)?S.sel.delete(t):S.sel.add(t)}
function selAll(a){S.sel=new Set(a?TP:[]);home()}
async function clr(){if(!confirm('Clear history?'))return;LS('res_'+user.id,[]);if(sb)await sb.from('results').delete().eq('user_id',user.id);home()}
function start(){const pool=QB.filter(q=>S.sel.has(q.topic));if(!pool.length)return alert('Select at least one topic');let l=sh(pool);if(S.n!='All')l=l.slice(0,+S.n);
l=l.map(q=>{const o=sh(q.options.map((x,i)=>[x,i==q.correctAnswer]));return{...q,options:o.map(x=>x[0]),correctAnswer:o.findIndex(x=>x[1])}});
Q={l,i:0,a:l.map(()=>null),mode:S.mode,t0:Date.now(),left:S.mode=='exam'?l.length*45:60,paused:false};clearInterval(tm);tm=setInterval(tick,1000);qv()}
function tick(){if(Q.paused||Q.mode=='practice')return;Q.left--;const e=document.querySelector('#tmr');if(e)e.textContent=Q.left+'s';if(Q.left<=0){Q.mode=='exam'?submit():nx(1)}}
function qv(){const q=Q.l[Q.i],a=Q.a[Q.i],rev=Q.mode=='practice'&&a!=null;
app.innerHTML=`<div class=card>Question ${Q.i+1}/${Q.l.length} <b id=tmr style="float:right">${Q.mode=='practice'?'':Q.left+'s'}</b><div class=bar><i style="width:${(Q.i+1)/Q.l.length*100}%"></i></div>${Q.mode!='practice'?`<button onclick="Q.paused=!Q.paused;this.textContent=Q.paused?'Resume':'Pause'">Pause</button>`:''}<h3>${esc(q.question)}</h3><small>${q.topic} - ${q.difficulty}</small>
${q.options.map((o,j)=>`<button class="opt ${rev?(j==q.correctAnswer?'ok':j==a?'no':''):a==j?'sel':''}" onclick="pick(${j})">${'ABCD'[j]}. ${esc(o)}</button>`).join('')}${rev?`<p><b>Explanation:</b> ${esc(q.explanation)}</p>`:''}
<button onclick="Q.i>0&&(Q.i--,Q.left=60,qv())">Previous</button><button onclick="nx()">Skip</button><button class=p onclick="nx()">${Q.i==Q.l.length-1?'':'Next'}</button><button onclick="confirm('Submit now?')&&submit()">Submit</button></div>`}
function pick(j){if(Q.mode=='practice'&&Q.a[Q.i]!=null)return;Q.a[Q.i]=j;qv()}
function nx(){if(Q.i<Q.l.length-1){Q.i++;if(Q.mode=='timed')Q.left=60;qv()}else submit()}
async function submit(){clearInterval(tm);let c=0,w=0,s=0,ts={};Q.l.forEach((q,i)=>{ts[q.topic]=ts[q.topic]||[0,0];ts[q.topic][1]++;if(Q.a[i]==null)s++;else if(Q.a[i]==q.correctAnswer){c++;ts[q.topic][0]++}else w++});
const n=Q.l.length,pct=Math.round(c/n*100),g=pct>=70?'A':pct>=60?'B':pct>=50?'C':pct>=45?'D':'F';
const r={topics:[...new Set(Q.l.map(q=>q.topic))].join(', '),mode:Q.mode,score:c,total_questions:n,percentage:pct,grade:g,pass_fail:pct>=50?'Pass':'Fail',time_used:Math.round((Date.now()-Q.t0)/1000),topic_stats:ts,created_at:new Date().toISOString()};
const H=LS('res_'+user.id)||[];H.unshift(r);LS('res_'+user.id,H);
if(sb)try{await sb.from('results').insert({...r,user_id:user.id,full_name:user.name,email:user.email,app_name:APP_NAME})}catch(e){}
app.innerHTML=`<div class=card style="text-align:center"><div class=ring style="background:conic-gradient(var(--p) ${pct*3.6}deg,#8883 0)"><span>${pct}%</span></div><h2>${c}/${n} - Grade ${g} - ${r.pass_fail}</h2>Correct ${c} | Wrong ${w} | Skipped ${s}<br><button class=p onclick=start()>Retake</button><button onclick=home()>New Quiz</button><button onclick=home()>Go Home</button></div>
${Q.l.map((q,i)=>`<div class=card><b>${i+1}. ${esc(q.question)}</b><br>Your answer: ${Q.a[i]==null?'Skipped':esc(q.options[Q.a[i]])}<br>Correct: ${esc(q.options[q.correctAnswer])}<br><small>${esc(q.explanation)}</small></div>`).join('')}`}
let dp;addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;const b=document.querySelector('#inst');b.hidden=false;b.onclick=()=>dp.prompt()});
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
(async()=>{ui();if(sb){sb.auth.onAuthStateChange(async(e)=>{if(e=='PASSWORD_RECOVERY'){const p=prompt('Enter new password');if(p)await sb.auth.updateUser({password:p})}});
const{data}=await sb.auth.getSession();if(data.session&&await afterLogin(data.session.user))return home()}authView()})();

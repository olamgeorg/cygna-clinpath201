const APP_NAME="cygna_clinpath201",ADMIN_NAME="Olamide George",ADMIN_EMAIL="olamgeorg9@gmail.com";
const sb=supabase.createClient(CFG.URL,CFG.KEY),$=i=>document.getElementById(i),esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));let R=[],P=[],F=[];
(async()=>{const{data}=await sb.auth.getSession(),u=data.session&&data.session.user;if(!u||u.email.toLowerCase()!==ADMIN_EMAIL.toLowerCase())return location.replace('index.html');load()})();
async function load(){R=(await sb.from('results').select('*').eq('app_name',APP_NAME).order('created_at',{ascending:false})).data||[];P=(await sb.from('profiles').select('*').eq('app_name',APP_NAME).order('created_at')).data||[];draw()}
function draw(){const s=$('q').value.toLowerCase(),t=$('tp').value.toLowerCase(),m=$('md').value,d=$('dt').value;
F=R.filter(r=>(r.full_name+r.email).toLowerCase().includes(s)&&(r.topics||'').toLowerCase().includes(t)&&(!m||r.mode==m)&&(!d||r.created_at.startsWith(d)));
$('st').innerHTML=`Welcome ${ADMIN_NAME} | Students: ${P.length} | Quizzes taken: ${R.length}`;const ts={};
F.forEach(r=>Object.entries(r.topic_stats||{}).forEach(([k,v])=>{ts[k]=ts[k]||[0,0];ts[k][0]+=v[0];ts[k][1]+=v[1]}));
$('wk').innerHTML='<h3>Topic strength (filtered, all students)</h3>'+Object.entries(ts).map(([k,v])=>{const p=Math.round(v[0]/v[1]*100);return`${esc(k)}: ${p}% ${p>=50?'strong':'WEAK'}<div class=bar><i style="width:${p}%"></i></div>`}).join('');
$('tb').innerHTML='<h3>Scores</h3><table><tr><th>Name<th>Email<th>Topics<th>Mode<th>Score<th>%<th>Grade<th>Date<th>Time<th></tr>'+F.map(r=>`<tr><td>${esc(r.full_name)}<td>${esc(r.email)}<td>${esc(r.topics)}<td>${r.mode}<td>${r.score}/${r.total_questions}<td>${r.percentage}<td>${r.grade}<td>${new Date(r.created_at).toLocaleString()}<td>${r.time_used}s<td><button onclick="delR('${r.id}')">Delete</button></tr>`).join('')+'</table>';
$('ps').innerHTML='<h3>Students</h3><table><tr><th>Name<th>Email<th>Joined<th>Weak topics<th></tr>'+P.map(p=>{const w={};R.filter(r=>r.user_id==p.id).forEach(r=>Object.entries(r.topic_stats||{}).forEach(([k,v])=>{w[k]=w[k]||[0,0];w[k][0]+=v[0];w[k][1]+=v[1]}));
return`<tr><td>${esc(p.full_name)}<td>${esc(p.email)}<td>${new Date(p.created_at).toLocaleDateString()}<td>${Object.entries(w).filter(([k,v])=>v[0]/v[1]<.5).map(x=>esc(x[0])).join(', ')||'-'}<td><button onclick="delP('${p.id}')">Delete</button></tr>`}).join('')+'</table>'}
async function delR(id){if(confirm('Delete score?')){await sb.from('results').delete().eq('id',id);load()}}
async function delP(id){if(confirm('Delete student and scores?')){await sb.from('results').delete().eq('user_id',id);await sb.from('profiles').delete().eq('id',id);load()}}
function csv(){const rows=[['Name','Email','Topics','Mode','Score','Total','Percent','Grade','Date','TimeUsed']].concat(F.map(r=>[r.full_name,r.email,r.topics,r.mode,r.score,r.total_questions,r.percentage,r.grade,r.created_at,r.time_used]));
const b=new Blob([rows.map(r=>r.map(c=>'"'+String(c??'').replace(/"/g,'""')+'"').join(',')).join('\n')],{type:'text/csv'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='clinpath201_scores.csv';a.click()}

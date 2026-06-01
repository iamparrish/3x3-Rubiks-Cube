let cube={};
let moves=0,secs=0,ticking=false,tickId=null;

const C_BG={
  R:'linear-gradient(145deg,#fb7185,#dc2626)',
  O:'linear-gradient(145deg,#fdba74,#ea580c)',
  Y:'linear-gradient(145deg,#fde047,#ca8a04)',
  G:'linear-gradient(145deg,#4ade80,#15803d)',
  B:'linear-gradient(145deg,#7dd3fc,#1d4ed8)',
  W:'linear-gradient(145deg,#ffffff,#cbd5e1)',
};
const C_SOLID={R:'#f87171',O:'#fb923c',Y:'#fbbf24',G:'#34d399',B:'#60a5fa',W:'#f1f5f9'};
const C_BG_DARK={R:'#200808',O:'#200e04',Y:'#1e1800',G:'#041408',B:'#04101e',W:'#14141e'};

function initCube(){
  cube={F:Array(9).fill('R'),B:Array(9).fill('O'),U:Array(9).fill('W'),
        D:Array(9).fill('Y'),L:Array(9).fill('G'),R:Array(9).fill('B')};
}

const FACE_INFO=[
  {key:'U',name:'U — Up',     color:'W',desc:'Top face'},
  {key:'D',name:'D — Down',   color:'Y',desc:'Bottom face'},
  {key:'R',name:'R — Right',  color:'B',desc:'Right face'},
  {key:'L',name:'L — Left',   color:'G',desc:'Left face'},
  {key:'F',name:'F — Front',  color:'R',desc:'Face towards you'},
  {key:'B',name:'B — Back',   color:'O',desc:'Face away from you'},
];

const MOVE_DESC={
  'U':"Up — top row slides right","U'":"Up — top row slides left",'U2':"Up — top row flips 180°",
  'D':"Down — bottom row slides left","D'":"Down — bottom row slides right",'D2':"Down — 180°",
  'R':"Right — right column goes up","R'":"Right — right column goes down",'R2':"Right — 180°",
  'L':"Left — left column goes down","L'":"Left — left column goes up",'L2':"Left — 180°",
  'F':"Front — face turns clockwise","F'":"Front — face turns counter-CW",'F2':"Front — 180°",
  'B':"Back — face turns clockwise","B'":"Back — face turns counter-CW",'B2':"Back — 180°",
};

const cw=f=>{const x=cube[f];return[x[6],x[3],x[0],x[7],x[4],x[1],x[8],x[5],x[2]];};
const ccw=f=>{const x=cube[f];return[x[2],x[5],x[8],x[1],x[4],x[7],x[0],x[3],x[6]];};

const MOVES={
  'U':()=>{cube.U=cw('U');const t=[cube.F[0],cube.F[1],cube.F[2]];[cube.F[0],cube.F[1],cube.F[2]]=[cube.R[0],cube.R[1],cube.R[2]];[cube.R[0],cube.R[1],cube.R[2]]=[cube.B[0],cube.B[1],cube.B[2]];[cube.B[0],cube.B[1],cube.B[2]]=[cube.L[0],cube.L[1],cube.L[2]];[cube.L[0],cube.L[1],cube.L[2]]=t;},
  "U'":()=>{cube.U=ccw('U');const t=[cube.F[0],cube.F[1],cube.F[2]];[cube.F[0],cube.F[1],cube.F[2]]=[cube.L[0],cube.L[1],cube.L[2]];[cube.L[0],cube.L[1],cube.L[2]]=[cube.B[0],cube.B[1],cube.B[2]];[cube.B[0],cube.B[1],cube.B[2]]=[cube.R[0],cube.R[1],cube.R[2]];[cube.R[0],cube.R[1],cube.R[2]]=t;},
  'U2':()=>{MOVES['U']();MOVES['U']();},
  'D':()=>{cube.D=cw('D');const t=[cube.F[6],cube.F[7],cube.F[8]];[cube.F[6],cube.F[7],cube.F[8]]=[cube.L[6],cube.L[7],cube.L[8]];[cube.L[6],cube.L[7],cube.L[8]]=[cube.B[6],cube.B[7],cube.B[8]];[cube.B[6],cube.B[7],cube.B[8]]=[cube.R[6],cube.R[7],cube.R[8]];[cube.R[6],cube.R[7],cube.R[8]]=t;},
  "D'":()=>{cube.D=ccw('D');const t=[cube.F[6],cube.F[7],cube.F[8]];[cube.F[6],cube.F[7],cube.F[8]]=[cube.R[6],cube.R[7],cube.R[8]];[cube.R[6],cube.R[7],cube.R[8]]=[cube.B[6],cube.B[7],cube.B[8]];[cube.B[6],cube.B[7],cube.B[8]]=[cube.L[6],cube.L[7],cube.L[8]];[cube.L[6],cube.L[7],cube.L[8]]=t;},
  'D2':()=>{MOVES['D']();MOVES['D']();},
  'R':()=>{cube.R=cw('R');const t=[cube.F[2],cube.F[5],cube.F[8]];[cube.F[2],cube.F[5],cube.F[8]]=[cube.D[2],cube.D[5],cube.D[8]];[cube.D[2],cube.D[5],cube.D[8]]=[cube.B[6],cube.B[3],cube.B[0]];[cube.B[6],cube.B[3],cube.B[0]]=[cube.U[2],cube.U[5],cube.U[8]];[cube.U[2],cube.U[5],cube.U[8]]=t;},
  "R'":()=>{cube.R=ccw('R');const t=[cube.F[2],cube.F[5],cube.F[8]];[cube.F[2],cube.F[5],cube.F[8]]=[cube.U[2],cube.U[5],cube.U[8]];[cube.U[2],cube.U[5],cube.U[8]]=[cube.B[6],cube.B[3],cube.B[0]];[cube.B[6],cube.B[3],cube.B[0]]=[cube.D[2],cube.D[5],cube.D[8]];[cube.D[2],cube.D[5],cube.D[8]]=t;},
  'R2':()=>{MOVES['R']();MOVES['R']();},
  'L':()=>{cube.L=cw('L');const t=[cube.F[0],cube.F[3],cube.F[6]];[cube.F[0],cube.F[3],cube.F[6]]=[cube.U[0],cube.U[3],cube.U[6]];[cube.U[0],cube.U[3],cube.U[6]]=[cube.B[8],cube.B[5],cube.B[2]];[cube.B[8],cube.B[5],cube.B[2]]=[cube.D[0],cube.D[3],cube.D[6]];[cube.D[0],cube.D[3],cube.D[6]]=t;},
  "L'":()=>{cube.L=ccw('L');const t=[cube.F[0],cube.F[3],cube.F[6]];[cube.F[0],cube.F[3],cube.F[6]]=[cube.D[0],cube.D[3],cube.D[6]];[cube.D[0],cube.D[3],cube.D[6]]=[cube.B[8],cube.B[5],cube.B[2]];[cube.B[8],cube.B[5],cube.B[2]]=[cube.U[0],cube.U[3],cube.U[6]];[cube.U[0],cube.U[3],cube.U[6]]=t;},
  'L2':()=>{MOVES['L']();MOVES['L']();},
  'F':()=>{cube.F=cw('F');const t=[cube.U[6],cube.U[7],cube.U[8]];[cube.U[6],cube.U[7],cube.U[8]]=[cube.L[8],cube.L[5],cube.L[2]];[cube.L[8],cube.L[5],cube.L[2]]=[cube.D[2],cube.D[1],cube.D[0]];[cube.D[2],cube.D[1],cube.D[0]]=[cube.R[0],cube.R[3],cube.R[6]];[cube.R[0],cube.R[3],cube.R[6]]=t;},
  "F'":()=>{cube.F=ccw('F');const t=[cube.U[6],cube.U[7],cube.U[8]];[cube.U[6],cube.U[7],cube.U[8]]=[cube.R[0],cube.R[3],cube.R[6]];[cube.R[0],cube.R[3],cube.R[6]]=[cube.D[2],cube.D[1],cube.D[0]];[cube.D[2],cube.D[1],cube.D[0]]=[cube.L[8],cube.L[5],cube.L[2]];[cube.L[8],cube.L[5],cube.L[2]]=t;},
  'F2':()=>{MOVES['F']();MOVES['F']();},
  'B':()=>{cube.B=cw('B');const t=[cube.U[0],cube.U[1],cube.U[2]];[cube.U[0],cube.U[1],cube.U[2]]=[cube.R[2],cube.R[5],cube.R[8]];[cube.R[2],cube.R[5],cube.R[8]]=[cube.D[8],cube.D[7],cube.D[6]];[cube.D[8],cube.D[7],cube.D[6]]=[cube.L[0],cube.L[3],cube.L[6]];[cube.L[0],cube.L[3],cube.L[6]]=t;},
  "B'":()=>{cube.B=ccw('B');const t=[cube.U[0],cube.U[1],cube.U[2]];[cube.U[0],cube.U[1],cube.U[2]]=[cube.L[0],cube.L[3],cube.L[6]];[cube.L[0],cube.L[3],cube.L[6]]=[cube.D[8],cube.D[7],cube.D[6]];[cube.D[8],cube.D[7],cube.D[6]]=[cube.R[2],cube.R[5],cube.R[8]];[cube.R[2],cube.R[5],cube.R[8]]=t;},
  'B2':()=>{MOVES['B']();MOVES['B']();},
};
const ALL_MOVES=Object.keys(MOVES);

function doMove(m,silent=false){
  if(!MOVES[m])return;
  const prev={};for(const k in cube)prev[k]=[...cube[k]];
  MOVES[m]();
  if(!silent){
    moves++;
    const chip=document.getElementById('chip-moves');
    document.getElementById('mc').textContent=moves;
    chip.classList.remove('pulse');void chip.offsetWidth;chip.classList.add('pulse');
    if(!ticking)startTick();
    updateLastMove(m);
    flashCard(m);
  }
  render3D();renderNet(prev);
  if(!silent)checkWin();
}

/* ── RENDER 3D ── */
function render3D(){
  const map={ff:'F',fb:'B',fr:'R',fl:'L',fu:'U',fd:'D'};
  for(const[id,fk]of Object.entries(map)){
    const el=document.getElementById(id);
    el.innerHTML='';
    cube[fk].forEach(c=>{
      const s=document.createElement('span');
      s.className='stk c'+c;el.appendChild(s);
    });
  }
}

/* ── RENDER NET ── */
function renderNet(prev=null){
  ['F','B','U','D','L','R'].forEach(fk=>{
    const grid=document.getElementById('ng-'+fk);
    if(!grid)return;
    const cells=cube[fk];const pCells=prev?prev[fk]:null;
    const ex=grid.querySelectorAll('.ns');
    if(ex.length===9){
      cells.forEach((c,i)=>{
        ex[i].style.background=C_BG[c];
        if(pCells&&pCells[i]!==c){
          ex[i].classList.remove('pop');void ex[i].offsetWidth;ex[i].classList.add('pop');
          setTimeout(()=>ex[i].classList.remove('pop'),250);
        }
      });
    }else{
      grid.innerHTML='';
      cells.forEach(c=>{
        const s=document.createElement('span');s.className='ns';s.style.background=C_BG[c];grid.appendChild(s);
      });
    }
  });
}

/* ── BUILD NET ── */
const NET_INFO={U:{label:'U Top',color:'W'},L:{label:'L Left',color:'G'},F:{label:'F Front',color:'R'},
                R:{label:'R Right',color:'B'},B:{label:'B Back',color:'O'},D:{label:'D Bottom',color:'Y'}};
const SZ=74;

function buildNet(){
  function makeNF(fk){
    const d=document.createElement('div');d.className='net-face';d.id='nface-'+fk;
    d.style.cssText=`width:${SZ}px;flex-shrink:0;`;
    const inf=NET_INFO[fk];
    const h=document.createElement('div');h.className='nf-head';
    const dot=document.createElement('span');dot.className='nf-dot';dot.style.background=C_SOLID[inf.color];
    h.appendChild(dot);h.appendChild(document.createTextNode(inf.label));d.appendChild(h);
    const g=document.createElement('div');g.className='nf-grid';g.id='ng-'+fk;
    g.style.height=(SZ-18)+'px';d.appendChild(g);return d;
  }
  function makeSP(){const d=document.createElement('div');d.className='net-sp';d.style.width=SZ+'px';return d;}
  const gap=3;
  ['nr1','nr2','nr3'].forEach(id=>document.getElementById(id).style.gap=gap+'px');
  const r1=document.getElementById('nr1');
  r1.appendChild(makeSP());r1.appendChild(makeNF('U'));r1.appendChild(makeSP());r1.appendChild(makeSP());
  const r2=document.getElementById('nr2');
  ['L','F','R','B'].forEach(fk=>r2.appendChild(makeNF(fk)));
  const r3=document.getElementById('nr3');
  r3.appendChild(makeSP());r3.appendChild(makeNF('D'));r3.appendChild(makeSP());r3.appendChild(makeSP());
}

function flashNetFaces(m){
  const base=m.replace("'","").replace("2","");
  const aff={U:['U','F','R','B','L'],D:['D','F','R','B','L'],
             R:['R','F','U','B','D'],L:['L','F','U','B','D'],
             F:['F','U','R','D','L'],B:['B','U','R','D','L']};
  (aff[base]||[]).forEach(fk=>{
    const el=document.getElementById('nface-'+fk);if(!el)return;
    el.classList.add('lit');setTimeout(()=>el.classList.remove('lit'),450);
  });
}

/* ── BUILD MOVE CARDS ── */
function buildMoveCards(){
  const col=document.getElementById('ctrl-col');
  const lastBox=document.getElementById('last-box');
  FACE_INFO.forEach(fi=>{
    const card=document.createElement('div');
    card.className='move-card';card.id='mc-'+fi.key;

    // thumb
    const thumb=document.createElement('div');
    thumb.className='mc-thumb';
    thumb.style.background=C_BG_DARK[fi.color];
    for(let i=0;i<9;i++){
      const s=document.createElement('span');
      s.style.background=C_SOLID[fi.color];
      s.style.opacity=i===4?'1':'0.65';
      thumb.appendChild(s);
    }

    const info=document.createElement('div');info.className='mc-info';
    info.innerHTML=`<div class="mc-name">${fi.name}</div><div class="mc-sub">${fi.desc}</div>`;

    const btns=document.createElement('div');btns.className='mc-btns';

    const mkBtn=(cls,icon,move,tip)=>{
      const b=document.createElement('button');b.className='mc-btn '+cls;b.title=tip;
      b.innerHTML=icon;
      b.addEventListener('click',e=>{addRipple(b,e);doMove(move);});
      return b;
    };

    btns.appendChild(mkBtn('cw','↻',fi.key,fi.key+' — Clockwise'));
    btns.appendChild(mkBtn('ccw','↺',fi.key+"'",fi.key+"' — Counter-CW"));
    btns.appendChild(mkBtn('d180','180°',fi.key+'2',fi.key+'2 — 180°'));

    card.appendChild(thumb);card.appendChild(info);card.appendChild(btns);
    col.insertBefore(card,lastBox);
  });
}

/* ripple effect */
function addRipple(btn,e){
  const r=document.createElement('span');r.className='ripple';
  const rect=btn.getBoundingClientRect();
  const sz=Math.max(rect.width,rect.height);
  r.style.cssText=`width:${sz}px;height:${sz}px;left:${e.clientX-rect.left-sz/2}px;top:${e.clientY-rect.top-sz/2}px;`;
  btn.appendChild(r);setTimeout(()=>r.remove(),500);
}

/* ── UPDATE UI ── */
function updateLastMove(m){
  const base=m.replace("'","").replace("2","");
  const fi=FACE_INFO.find(f=>f.key===base);
  document.getElementById('lm-b').textContent=m;
  document.getElementById('lm-n').textContent=fi?fi.name:m;
  document.getElementById('lm-d').textContent=MOVE_DESC[m]||'';
  flashNetFaces(m);
  const box=document.getElementById('last-box');
  box.classList.remove('bump');void box.offsetWidth;box.classList.add('bump');
}

function flashCard(m){
  const base=m.replace("'","").replace("2","");
  const card=document.getElementById('mc-'+base);if(!card)return;
  card.classList.add('active');setTimeout(()=>card.classList.remove('active'),600);
}

/* ── WIN ── */
function checkWin(){
  if(!Object.values(cube).every(f=>f.every(c=>c===f[0])))return;
  stopTick();
  setTimeout(()=>{
    document.getElementById('win-stats').textContent=`${moves} moves · ${fmt(secs)}`;
    document.getElementById('win-overlay').classList.remove('hidden');
  },350);
}

/* ── TIMER ── */
function startTick(){ticking=true;tickId=setInterval(()=>{secs++;document.getElementById('tc').textContent=fmt(secs);},1000);}
function stopTick(){clearInterval(tickId);tickId=null;ticking=false;}
function fmt(s){return`${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;}

/* ── SCRAMBLE / SOLVE / RESET ── */
function resetStats(){
  moves=0;secs=0;stopTick();ticking=false;
  document.getElementById('mc').textContent='0';
  document.getElementById('tc').textContent='0:00';
  document.getElementById('lm-b').textContent='—';
  document.getElementById('lm-n').textContent='Make a move!';
  document.getElementById('lm-d').textContent='Tap a button or press a key';
}
function scramble(){
  initCube();
  for(let i=0;i<22+~~(Math.random()*8);i++)MOVES[ALL_MOVES[~~(Math.random()*ALL_MOVES.length)]]();
  resetStats();render3D();renderNet();toast('🔀 Scrambled — Good luck!');
}
function solve(){
  initCube();resetStats();render3D();renderNet();toast('✨ Showing solved state');
}
function reset(){
  initCube();resetStats();render3D();renderNet();toast('↺ Reset!');
}

/* ── TOAST ── */
let toastT;
function toast(msg){
  const el=document.getElementById('toast');
  el.textContent=msg;el.classList.add('show');
  clearTimeout(toastT);toastT=setTimeout(()=>el.classList.remove('show'),2400);
}

/* ── 3D DRAG ── */
let rotX=-22,rotY=30,drag=false,lx=0,ly=0,autoR=true,autoId;
const scene=document.getElementById('cscene');
const cwrap=document.getElementById('cwrap');
function applyRot(){scene.style.transform=`rotateX(${rotX}deg) rotateY(${rotY}deg)`;}
cwrap?.addEventListener('mousedown',e=>{drag=true;lx=e.clientX;ly=e.clientY;autoR=false;clearInterval(autoId);e.preventDefault();});
window.addEventListener('mousemove',e=>{if(!drag)return;rotY+=(e.clientX-lx)*.48;rotX-=(e.clientY-ly)*.48;rotX=Math.max(-80,Math.min(80,rotX));lx=e.clientX;ly=e.clientY;applyRot();});
window.addEventListener('mouseup',()=>drag=false);
cwrap?.addEventListener('touchstart',e=>{drag=true;lx=e.touches[0].clientX;ly=e.touches[0].clientY;autoR=false;clearInterval(autoId);e.preventDefault();},{passive:true});
window.addEventListener('touchmove',e=>{if(!drag)return;rotY+=(e.touches[0].clientX-lx)*.38;rotX-=(e.touches[0].clientY-ly)*.38;rotX=Math.max(-80,Math.min(80,rotX));lx=e.touches[0].clientX;ly=e.touches[0].clientY;applyRot();},{passive:true});
window.addEventListener('touchend',()=>drag=false);
function startAuto(){autoId=setInterval(()=>{if(autoR){rotY+=.18;applyRot();}},16);}

/* ── KEYBOARD ── */
document.addEventListener('keydown',e=>{
  if(document.getElementById('game').classList.contains('hidden'))return;
  const km={'u':'U','U':"U'",'d':'D','D':"D'",'r':'R','R':"R'",'l':'L','L':"L'",'f':'F','F':"F'",'b':'B','B':"B'"};
  if(km[e.key])doMove(km[e.key]);
});

/* ── PARTICLES ── */
function buildParticles(){
  const container=document.getElementById('particles');
  const colors=['#a78bfa','#67e8f9','#34d399','#fbbf24','#f87171','#60a5fa'];
  for(let i=0;i<22;i++){
    const p=document.createElement('div');p.className='particle';
    const sz=2+Math.random()*5;
    p.style.cssText=`
      width:${sz}px;height:${sz}px;
      left:${Math.random()*100}%;
      background:${colors[~~(Math.random()*colors.length)]};
      animation-duration:${6+Math.random()*10}s;
      animation-delay:${Math.random()*8}s;
    `;
    container.appendChild(p);
  }
}

/* ── SPLASH CUBE ── */
function buildSplashCube(){
  const fc={'sp-f':'#f87171','sp-b':'#fb923c','sp-r':'#60a5fa','sp-l':'#34d399','sp-u':'#f1f5f9','sp-d':'#fbbf24'};
  document.querySelectorAll('.sp-face').forEach(face=>{
    const cls=[...face.classList].find(c=>fc[c]);
    const color=fc[cls]||'#888';
    for(let i=0;i<9;i++){
      const s=document.createElement('span');
      s.style.background=color;
      face.appendChild(s);
    }
  });
}

/* ── BUTTON RIPPLES for act-pills ── */
document.querySelectorAll('.act-pill').forEach(btn=>{
  btn.addEventListener('click',e=>{
    const r=document.createElement('span');r.className='ripple';
    const rect=btn.getBoundingClientRect();
    const sz=Math.max(rect.width,rect.height)*2;
    r.style.cssText=`width:${sz}px;height:${sz}px;left:${e.clientX-rect.left-sz/2}px;top:${e.clientY-rect.top-sz/2}px;`;
    btn.appendChild(r);setTimeout(()=>r.remove(),500);
  });
});

/* ── SPLASH → GAME ── */
document.getElementById('btn-start')?.addEventListener('click',e=>{
  addRipple(e.currentTarget,e);
  document.getElementById('splash').classList.add('out');
  setTimeout(()=>{
    document.getElementById('splash').style.display='none';
    document.getElementById('game').classList.remove('hidden');
    buildNet();buildMoveCards();
    initCube();render3D();renderNet();
    applyRot();autoR=true;startAuto();
  },700);
});

document.getElementById('qscramble')?.addEventListener('click',scramble);
document.getElementById('qsolve')?.addEventListener('click',solve);
document.getElementById('qreset')?.addEventListener('click',reset);
document.getElementById('win-again')?.addEventListener('click',()=>{document.getElementById('win-overlay').classList.add('hidden');scramble();});
document.getElementById('win-close')?.addEventListener('click',()=>document.getElementById('win-overlay').classList.add('hidden'));

/* BOOT */
buildParticles();
buildSplashCube();
initCube();
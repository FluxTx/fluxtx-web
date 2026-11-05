// @ts-nocheck
// globe
export function startGlobe(canvas){const c=canvas,x=c.getContext('2d'),W=1000,R=380,cx=500,cy=500;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const P=(la,lo,r)=>{const a=la*Math.PI/180,o=lo*Math.PI/180;return[r*Math.cos(a)*Math.sin(o),-r*Math.sin(a),r*Math.cos(a)*Math.cos(o)]};
const nodes=[[40,-74],[51,0],[35,139],[1,103],[-23,-46],[25,55],[-33,151],[55,37],[19,73],[9,8],[37,-122],[-26,28]];
const links=[[0,1],[1,2],[2,3],[0,4],[1,5],[5,8],[3,6],[7,1],[9,1],[10,0],[11,9],[8,3],[10,2]];
let rot=0,t=0;
function rotY(p,a){const s=Math.sin(a),k=Math.cos(a);return[p[0]*k+p[2]*s,p[1],-p[0]*s+p[2]*k]}
function draw(){x.clearRect(0,0,W,W);
const g=x.createRadialGradient(cx-120,cy-140,40,cx,cy,R);g.addColorStop(0,'#14485a');g.addColorStop(.6,'#0B2935');g.addColorStop(1,'#061923');
x.fillStyle=g;x.beginPath();x.arc(cx,cy,R,0,7);x.fill();
x.strokeStyle='rgba(105,219,200,.16)';x.lineWidth=1.5;
for(let la=-60;la<=60;la+=30){x.beginPath();let f=1;for(let lo=-180;lo<=180;lo+=6){const p=rotY(P(la,lo,R),rot);if(p[2]<0){f=1;continue}x[f?'moveTo':'lineTo'](cx+p[0],cy+p[1]);f=0}x.stroke()}
for(let lo=-180;lo<180;lo+=30){x.beginPath();let f=1;for(let la=-90;la<=90;la+=6){const p=rotY(P(la,lo,R),rot);if(p[2]<0){f=1;continue}x[f?'moveTo':'lineTo'](cx+p[0],cy+p[1]);f=0}x.stroke()}
x.fillStyle='rgba(141,235,221,.35)';
for(let la=-70;la<=70;la+=7)for(let lo=-180;lo<180;lo+=7){const h=Math.sin(la*.13+lo*.07)+Math.cos(lo*.05-la*.09);if(h<.7)continue;const p=rotY(P(la,lo,R),rot);if(p[2]<0)continue;x.fillRect(cx+p[0]-1.5,cy+p[1]-1.5,3,3)}
const N3=nodes.map(n=>rotY(P(n[0],n[1],R),rot));
links.forEach(([a,b],i)=>{const A=N3[a],B=N3[b];if(A[2]<0||B[2]<0)return;
const m=[(A[0]+B[0])/2,(A[1]+B[1])/2,(A[2]+B[2])/2],d=Math.hypot(m[0],m[1],m[2])||1,k=(R*1.18)/d;
x.strokeStyle='rgba(105,219,200,.55)';x.lineWidth=1.8;x.beginPath();x.moveTo(cx+A[0],cy+A[1]);x.quadraticCurveTo(cx+m[0]*k,cy+m[1]*k,cx+B[0],cy+B[1]);x.stroke();
const u=(t*.4+i*.17)%1,q=1-u,px=q*q*A[0]+2*q*u*m[0]*k+u*u*B[0],py=q*q*A[1]+2*q*u*m[1]*k+u*u*B[1];
x.fillStyle='#EAF5F4';x.beginPath();x.arc(cx+px,cy+py,3.5,0,7);x.fill()});
N3.forEach((p,i)=>{if(p[2]<0)return;const pulse=6+3*Math.sin(t*2+i);
x.fillStyle='rgba(105,219,200,.18)';x.beginPath();x.arc(cx+p[0],cy+p[1],pulse+8,0,7);x.fill();
x.fillStyle='#8DEBDD';x.beginPath();x.arc(cx+p[0],cy+p[1],5,0,7);x.fill()});
// rim light + orbits
const rg=x.createRadialGradient(cx,cy,R*.85,cx,cy,R*1.02);rg.addColorStop(0,'rgba(105,219,200,0)');rg.addColorStop(1,'rgba(105,219,200,.35)');
x.fillStyle=rg;x.beginPath();x.arc(cx,cy,R*1.02,0,7);x.fill();
[[1.28,.28,-.35],[1.42,.2,.5]].forEach(([s,e,r],i)=>{x.save();x.translate(cx,cy);x.rotate(r);x.strokeStyle='rgba(141,235,221,.28)';x.lineWidth=1.5;x.beginPath();x.ellipse(0,0,R*s,R*s*e,0,0,7);x.stroke();
const a=t*(i?-.6:.5);x.fillStyle='#69DBC8';x.beginPath();x.arc(Math.cos(a)*R*s,Math.sin(a)*R*s*e,5,0,7);x.fill();x.restore()});
}
function loop(){if(!reduce){rot+=.0035;t+=.016}draw();if(!document.hidden)requestAnimationFrame(loop)}
draw();if(!reduce)requestAnimationFrame(loop);
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!reduce)requestAnimationFrame(loop)});
}

import {T,mat,mesh,box,cyl,ring,texture,noiseTexture,tube,createStage,cameraAt,span,mix,initUI} from './core.js?v=identity-7'
initUI()
const s=createStage({staticProgress:1,narrowFov:48,narrowFrameOffset:.03,background:'#e9e4d8',exposure:1.13}),{scene,camera}=s
const product=new T.Group();scene.add(product);product.rotation.y=-.14
const woodMap=texture((c,w,h)=>{c.fillStyle='#69402e';c.fillRect(0,0,w,h);for(let i=0;i<600;i++){c.strokeStyle=`rgba(${i%3?27:222},${i%3?12:155},${i%3?6:90},${.04+(i%7)*.01})`;c.lineWidth=.6+(i%4)*.4;c.beginPath();for(let x=0;x<w;x+=8){let y=i/600*h+Math.sin(x*.013+i*2)*3+Math.sin(x*.037+i)*1.5;if(!x)c.moveTo(x,y);else c.lineTo(x,y)}c.stroke()}})
woodMap.wrapS=woodMap.wrapT=T.RepeatWrapping
const wood=mat('#91634b',.36,0,{map:woodMap}),silver=mat('#cbd0cb',.22,.9),dark=mat('#131713',.32,.25),rubber=mat('#1b1c19',.87),bronze=mat('#c58b3a',.25,.8),red=mat('#d55632',.5)
const base=box(5.9,.62,4.1,wood,product,[0,.12,0],.12)
box(5.78,.055,3.98,mat('#2c3029',.4,.6),product,[0,.46,0],.03)
box(5.6,.028,3.78,mat('#3a3c35',.48,.45),product,[0,.5,0],.02)
const feet=[]
for(const x of [-2.4,2.4])for(const z of [-1.55,1.55]){const f=new T.Group();product.add(f);f.position.set(x,-.24,z);cyl(.3,.18,dark,f);for(let i=0;i<4;i++)cyl(.28,.035,rubber,f,[0,-.12+i*.045,0]);feet.push(f)}
const axis=[-.73,.56,.02],drive=new T.Group();drive.position.set(...axis);product.add(drive)
cyl(.64,.16,dark,drive,[0,.05,0]);cyl(.48,.15,bronze,drive,[0,.14,0]);for(let i=0;i<12;i++)ring(.23+i*.019,.012,bronze,drive,[0,.23,0]);cyl(.12,.46,silver,drive,[0,.3,0]);
const platter=new T.Group();platter.position.set(...axis);product.add(platter)
cyl(1.7,.17,silver,platter,[0,.13,0]);for(let i=0;i<7;i++)ring(1.695,.011,i%2?silver:dark,platter,[0,.06+i*.025,0]);cyl(1.65,.045,rubber,platter,[0,.24,0]);
const record=new T.Group();record.position.set(...axis);product.add(record)
const vinylTex=texture((c,w,h)=>{c.fillStyle='#111310';c.fillRect(0,0,w,h);for(let i=55;i<252;i+=1.4){c.beginPath();c.arc(w/2,h/2,i,0,Math.PI*2);c.strokeStyle=i%3<1?'#35372f':'#1c1e19';c.lineWidth=.6;c.stroke()}const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,'#ffffff00');g.addColorStop(.3,'#a6ae9a1a');g.addColorStop(.5,'#ffffff00');g.addColorStop(.8,'#ffffff22');g.addColorStop(1,'#ffffff00');c.fillStyle=g;c.fillRect(0,0,w,h)})
const vinyl=mat('#2d322b',.3,.52,{map:vinylTex})
const disc=mesh(new T.CylinderGeometry(1.66,1.66,.035,128),[dark,vinyl,dark],record,[0,.285,0]);
const labelTex=texture((c,w,h)=>{c.fillStyle='#d95f36';c.fillRect(0,0,w,h);c.fillStyle='#eadfcd';c.textAlign='center';c.font='500 56px sans-serif';c.fillText('AURALIS',w/2,190);c.font='20px sans-serif';c.fillText('C I R C L E S',w/2,330);c.font='14px sans-serif';c.fillText('SIDE A   ·   33⅓ RPM',w/2,365);c.beginPath();c.arc(256,256,19,0,Math.PI*2);c.fillStyle='#171c16';c.fill()},512,512)
cyl(.48,.007,mat('#ffffff',.6,0,{map:labelTex}),record,[0,.309,0]);cyl(.045,.12,silver,record,[0,.35,0]);
const arm=new T.Group();arm.position.set(1.85,.55,-1.15);product.add(arm)
cyl(.34,.12,silver,arm,[0,.04,0]);cyl(.21,.38,dark,arm,[0,.2,0]);cyl(.1,.42,silver,arm,[0,.38,0]);
const pivot=new T.Group();pivot.position.y=.5;arm.add(pivot)
tube([[0,0,-.45],[0,0,0],[-.1,0,.7],[-.48,-.04,1.45],[-.7,-.08,1.62]],.046,silver,pivot)
const counter=cyl(.19,.35,silver,pivot,[0,0,-.4]);counter.rotation.x=Math.PI/2;ring(.18,.025,dark,counter)
box(.25,.12,.5,dark,pivot,[-.73,-.09,1.6],.025);box(.12,.11,.18,red,pivot,[-.77,-.18,1.75],.015);tube([[-.77,-.2,1.75],[-.81,-.35,1.81]],.012,bronze,pivot)
box(.08,.18,.3,silver,product,[1.74,.65,.38],.02)
const knob=cyl(.18,.09,silver,product,[2.34,.57,1.4]);ring(.14,.008,dark,product,[2.34,.62,1.4]);box(.04,.005,.07,red,product,[2.34,.626,1.3],.002)
for(let i=0;i<4;i++)cyl(.035,.009,silver,product,[-2.63+i*.17,.527,1.68],.035,16)
const badge=texture((c,w,h)=>{c.fillStyle='#272c26';c.fillRect(0,0,w,h);c.fillStyle='#d7cdb8';c.font='35px sans-serif';c.textAlign='center';c.fillText('A U R A L I S',w/2,75);c.font='18px sans-serif';c.fillText('AR / 01',w/2,115)},512,160)
const badgePlane=mesh(new T.PlaneGeometry(1.13,.35),mat('#ffffff',.6,.1,{map:badge}),product,[1.65,.11,2.061]);badgePlane.castShadow=false
// The album jacket and disc make a physical loading ritual rather than a floating exploded view.
const sleeveArt=texture((c,w,h)=>{c.fillStyle='#26352e';c.fillRect(0,0,w,h);c.strokeStyle='#d9623e';c.lineWidth=2;for(let r=45;r<235;r+=9){c.beginPath();c.arc(w*.72,h*.58,r,0,Math.PI*2);c.stroke()}c.fillStyle='#eee3cb';c.font='500 54px sans-serif';c.fillText('CIRCLES',30,83);c.font='18px sans-serif';c.fillText('A U R A L I S   /   S I D E  A',32,126);c.font='14px sans-serif';c.fillText('MAKE ROOM FOR THE WHOLE RECORD.',30,474)})
const sleeve=box(3.62,.065,3.62,mat('#ffffff',.82,0,{map:sleeveArt}),product,[-.73,1.35,-1.2],.015)
const sleevePocket=texture((c,w,h)=>{c.fillStyle='#26352e';c.fillRect(0,0,w,h);c.fillStyle='#eee3cb';c.font='500 40px sans-serif';c.fillText('CIRCLES',26,65);c.font='16px sans-serif';c.fillText('A U R A L I S  /  S I D E  A',28,110);c.strokeStyle='#d9623e';c.lineWidth=2;for(let r=70;r<220;r+=10){c.beginPath();c.arc(w*.8,h*1.2,r,0,Math.PI*2);c.stroke()}},512,256)
const pocket=box(3.62,.025,1.8,mat('#ffffff',.85,0,{map:sleevePocket}),sleeve,[0,.38,.92],.008)
const soundRings=[];for(let i=0;i<4;i++){const m=mat('#b7734c',1,0,{transparent:true,opacity:.2});const r=ring(1,.006,m,scene,[0,-.375,0]);r.castShadow=false;soundRings.push(r)}
let playing=false,rotation=0,armPose=0
const playButtons=document.querySelectorAll('[data-play]')
function togglePlay(){playing=!playing;playButtons.forEach(b=>{b.setAttribute('aria-pressed',String(playing));b.innerHTML=playing?'Stop the record <span>Ⅱ</span>':'Drop the needle <span>↗</span>'});document.querySelector('[data-record-state]').textContent=playing?'PLAYING · 33⅓ RPM':'READY · 33⅓ RPM';s.wake()}
playButtons.forEach(b=>b.addEventListener('click',togglePlay))
const ray=new T.Raycaster(),mouse=new T.Vector2();let hit=false,storyProgress=0,recordHover=0
function overRecord(e){mouse.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);ray.setFromCamera(mouse,camera);return storyProgress>.82&&ray.intersectObject(disc).length>0}
s.canvas.addEventListener('pointermove',e=>{hit=overRecord(e);s.canvas.style.cursor=hit?'pointer':'';s.wake()})
s.canvas.addEventListener('pointerleave',()=>{hit=false;s.canvas.style.cursor='';s.wake()})
s.canvas.addEventListener('click',e=>{if(overRecord(e))togglePlay()})
document.querySelectorAll('[data-finish]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-finish]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));wood.color.set(b.dataset.color);document.querySelectorAll('[data-finish-name]').forEach(x=>x.textContent=b.dataset.finish);s.wake()}))
const shots=[{p:0,pos:[7.4,10,11],target:[0,.8,0],frame:[.74,.58],mobile:[9,13,18],mobileTarget:[0,.8,0],mobileFrame:[.5,.77]},{p:.33,pos:[5.7,7.9,11.8],target:[0,.8,0],frame:[.74,.58],mobile:[7,12,20],mobileTarget:[0,.8,0],mobileFrame:[.5,.77]},{p:.67,pos:[3,4.4,11.6],target:[0,.8,0],frame:[.74,.58],mobile:[4,6.8,21],mobileTarget:[0,.8,0],mobileFrame:[.5,.77]},{p:1,pos:[1.1,3.1,11.9],target:[0,.8,0],frame:[.74,.58],mobile:[1.8,5.2,21.5],mobileTarget:[0,.8,0],mobileFrame:[.5,.77]}]
s.update(({p,time,dt,mobile,activeMotion})=>{
 storyProgress=p;cameraAt(camera,p,shots,mobile)
 const pull=span(p,.015,.18),seat=span(p,.2,.39),putAside=span(p,.25,.46)
 record.position.set(axis[0],mix(2.3+pull*1.25,axis[1],seat),mix(-1.05-pull*.65,axis[2],seat));record.rotation.x=(1-seat)*1.08;record.position.y-=Math.cos(record.rotation.x)*.285*(1-seat);record.position.z-=Math.sin(record.rotation.x)*.285*(1-seat)
 sleeve.position.set(-.73-putAside*2,1.9-span(putAside,.6,1)*2.24,-1.2-putAside*4.2);sleeve.rotation.x=mix(1.08,0,putAside);pocket.position.y=mix(.38,.05,putAside)
 platter.position.y=axis[1];drive.position.y=axis[1];arm.position.y=.55;product.rotation.y=-.14
 const demonstrate=span(p,.43,.51)*(1-span(p,.7,.8))
 if(activeMotion){if(playing)rotation+=dt*3.49;armPose=mix(armPose,playing?-.29:-.29*demonstrate,1-Math.exp(-dt*6));recordHover=mix(recordHover,hit?1:0,1-Math.exp(-dt*12))}else{armPose=playing?-.29:0;recordHover=0}
 record.rotation.y=rotation+span(p,.43,.78)*Math.PI*6;pivot.rotation.y=armPose;pivot.rotation.z=mix(-.035,0,Math.max(demonstrate,playing?1:0))
 vinyl.emissive.set('#bd7146');vinyl.emissiveIntensity=recordHover*.11
 for(let i=0;i<soundRings.length;i++){const r=soundRings[i],q=(time*.28+i*.25)%1;r.scale.setScalar(2.3+q*3);r.material.opacity=(1-q)*.14*Math.max(demonstrate,playing?1:0)*seat}
 s.host.dataset.recordPose=[...record.position.toArray(),record.rotation.x].map(v=>v.toFixed(2)).join(',');s.host.dataset.ritual=seat<.99?(pull<.99?'withdrawing record':'lowering to spindle'):demonstrate>.1?'needle demonstration':'ready to play'
})

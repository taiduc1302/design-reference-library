const slides = [...document.querySelectorAll('.slide')];
let current = 0;
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const counter = document.querySelector('#counter');
function display(index) {
  current = Math.max(0,Math.min(slides.length-1,index));
  slides.forEach((s,i) => { s.hidden=i!==current; s.classList.toggle('current',i===current); });
  counter.textContent = `${String(current+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
  prev.disabled=current===0;
  next.disabled=current===slides.length-1;
}
prev.addEventListener('click',()=>display(current-1));
next.addEventListener('click',()=>display(current+1));
document.addEventListener('keydown',e=>{
  if (e.target && ['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;
  if (e.key==='ArrowRight'||e.key==='PageDown') { e.preventDefault(); display(current+1); }
  if (e.key==='ArrowLeft'||e.key==='PageUp') { e.preventDefault(); display(current-1); }
});
display(0);

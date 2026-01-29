// script.js
// Vanilla JS for prompt chips, input focus, and UI-only image generation simulation

document.addEventListener('DOMContentLoaded', function(){
  const input = document.getElementById('prompt-input');
  const tags = document.querySelectorAll('.tag');
  const generateBtn = document.getElementById('generate-btn');
  const imageGrid = document.getElementById('image-grid');

  // Fill input when a tag is clicked
  tags.forEach(t => t.addEventListener('click', () => {
    input.value = t.textContent;
    input.focus();
  }));

  // Generate image (UI-only simulation): adds a skeleton, then replaces with a placeholder
  function simulateGenerate(){
    const prompt = input.value.trim();
    if(!prompt) {
      // subtle shake animation
      input.classList.add('shake');
      setTimeout(()=>input.classList.remove('shake'),300);
      return;
    }

    // create a skeleton card at the start
    const card = document.createElement('div');
    card.className = 'img-card skeleton';
    imageGrid.prepend(card);

    // limit gallery to 12 items UI-only
    while(imageGrid.children.length > 12) imageGrid.removeChild(imageGrid.lastChild);

    // after a short delay, replace skeleton with a generated look (gradient placeholder)
    setTimeout(()=>{
      card.classList.remove('skeleton');
      card.style.background = `linear-gradient(135deg, rgba(124,58,237,0.18), rgba(6,182,212,0.14)), url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="%230b1220"/><text x="50%" y="50%" font-size="28" fill="%23bcd" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(prompt).slice(0,40)}</text></svg>') center/cover no-repeat`;
      card.style.transition = 'transform .4s,box-shadow .35s';
    }, 1100 + Math.random()*800);

    // clear input (optional)
    // input.value = '';
  }

  generateBtn.addEventListener('click', simulateGenerate);
  // allow Enter key to generate
  input.addEventListener('keydown', (e) => { if(e.key === 'Enter'){ e.preventDefault(); simulateGenerate(); }});

  // small accessibility: focus glow
  input.addEventListener('focus', ()=> input.parentElement.classList.add('focus'));
  input.addEventListener('blur', ()=> input.parentElement.classList.remove('focus'));

  // optional: add shake style dynamically
  const style = document.createElement('style');
  style.textContent = `@keyframes shake{0%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}100%{transform:translateX(0)}} .shake{animation:shake .32s}`;
  document.head.appendChild(style);
});

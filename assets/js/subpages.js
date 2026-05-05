/* ────────────────────────────────────────────
   subpages.js – közös interakciók aloldalakhoz
   ──────────────────────────────────────────── */

/* NAV scroll állapot + burger menü */
(function(){
  const nav = document.getElementById('nav');
  if(nav){
    window.addEventListener('scroll',()=>{
      if(window.scrollY>40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    },{passive:true});
  }
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if(burger && mobileMenu){
    burger.addEventListener('click',()=>{
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click',()=>{
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }
})();

/* Reveal on scroll */
(function(){
  const reveals = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    reveals.forEach(r=>r.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -60px 0px'});
  reveals.forEach(r=>io.observe(r));
})();

/* LANG toggle vizuális visszajelzés */
document.querySelectorAll('.nav-lang .lang-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.nav-lang .lang-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* FAQ accordion */
document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const item = q.closest('.faq-item');
    item.classList.toggle('open');
  });
});

/* Newsletter – dummy */
const nlForm = document.getElementById('nlForm');
if(nlForm){
  nlForm.addEventListener('submit',e=>{
    e.preventDefault();
    const input = nlForm.querySelector('input[type=email]');
    const btn = nlForm.querySelector('.newsletter-btn');
    if(input && btn){
      btn.textContent='Köszönjük! ✓';
      btn.style.background='linear-gradient(135deg,var(--g1),var(--g2))';
      input.value='';
      setTimeout(()=>{btn.textContent='Feliratkozás';btn.style.background=''},2800);
    }
  });
}

/* Contact form – dummy */
const cForm = document.getElementById('contactForm');
if(cForm){
  cForm.addEventListener('submit',e=>{
    e.preventDefault();
    const btn = cForm.querySelector('.form-submit');
    const orig = btn.textContent;
    btn.textContent = 'Üzenet elküldve ✓';
    btn.style.background = 'linear-gradient(135deg,#2E8B2E,#4CAF4C)';
    cForm.reset();
    setTimeout(()=>{btn.textContent=orig;btn.style.background=''},3200);
  });
}

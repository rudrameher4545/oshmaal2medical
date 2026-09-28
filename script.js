const header=document.querySelector('.site-header');
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');

window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>10),{passive:true});

toggle.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded',String(open));
  document.body.classList.toggle('menu-open',open);
  toggle.querySelectorAll('span')[0].style.transform=open?'translateY(4.5px) rotate(45deg)':'';
  toggle.querySelectorAll('span')[1].style.transform=open?'translateY(-4.5px) rotate(-45deg)':'';
});

nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
  toggle.setAttribute('aria-expanded','false');
  toggle.querySelectorAll('span').forEach(s=>s.style.transform='');
}));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.09,rootMargin:'0px 0px -35px 0px'});
document.querySelectorAll('.section-reveal').forEach(el=>revealObserver.observe(el));

const features=[...document.querySelectorAll('.feature-item')];
const visual=document.querySelector('.seo-visual');
features.forEach((item,index)=>{
  item.addEventListener('click',()=>{
    features.forEach(x=>{x.classList.remove('active');x.querySelector('.plus').textContent='+'});
    item.classList.add('active');
    item.querySelector('.plus').textContent='−';
    visual.dataset.panel=String(index);
    const image=visual.querySelector('.seo-generated-img');
    const pill=visual.querySelector('.rank-pill');
    const labels=['#1','CMS','BLOG','UX','BOOK'];
    const sub=['Local search visibility','Easy content updates','Patient education','Modern responsive design','Appointment conversion'];
    if(image){
      const rotations=[-.5,.8,-.7,.9,-1];
      image.style.transform='translateY(-8px) rotate('+rotations[index]+'deg) scale(1.015)';
      setTimeout(()=>image.style.transform='',320);
    }
    if(pill){
      pill.firstChild.textContent=labels[index]+' ';
      pill.querySelector('span').textContent=sub[index];
    }
  });
});

const art=document.querySelector('.hero-art');
if(art && matchMedia('(pointer:fine)').matches){
  const image=art.querySelector('.hero-generated-img');
  const halos=[...art.querySelectorAll('.hero-image-halo')];
  art.addEventListener('mousemove',e=>{
    const r=art.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    if(image) image.style.transform='translate('+(x*8)+'px,'+(y*8)+'px) rotate('+(x*.6)+'deg)';
    halos.forEach((h,i)=>h.style.transform='translate('+(x*(i? -12:15))+'px,'+(y*(i? -12:15))+'px)');
  });
  art.addEventListener('mouseleave',()=>{
    if(image) image.style.transform='';
    halos.forEach(h=>h.style.transform='');
  });
}

document.querySelectorAll('.solution-card,.case-card,.benefit-card').forEach(card=>{
  card.addEventListener('mouseenter',()=>card.style.transform='translateY(-5px)');
  card.addEventListener('mouseleave',()=>card.style.transform='');
  card.style.transition='transform .28s ease, box-shadow .28s ease';
});
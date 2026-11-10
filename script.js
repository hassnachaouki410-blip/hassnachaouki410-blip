/* =========================================================
   EDIT YOUR CONTENT HERE — the page builds itself from this.
   ========================================================= */
const interests = ['Cybersecurity','Computer Science','Artificial Intelligence','Programming','Computer Networks','Data Protection','Technology & Innovation'];

// Honest levels: "learning" / "exploring". Update as you progress.
const skills = {
  'Programming':      [['Programming fundamentals','learning']],
  'Web Development':  [['HTML','learning'],['CSS','learning'],['JavaScript','learning']],
  'Computer Science': [['Core CS concepts','learning']],
  'Networking':       [['Computer networks basics','exploring']],
  'Cybersecurity':    [['Data protection','exploring'],['Digital privacy','exploring']],
  'Artificial Intelligence': [['AI concepts','exploring']]
};

const projects = [
  {title:'This portfolio', desc:'My personal website, designed and coded from scratch.', tech:['HTML','CSS','JavaScript'], image:'tech-illustration.jpeg', alt:'Pink illustration of a laptop surrounded by technology icons', link:'#home', cta:'View site'}
];

const journey = [
  {date:'Now', title:'Computer Science Preparatory Cycle, year 1', text:'HESTIM School, Casablanca, Morocco.'},
  {date:'Ongoing', title:'Self-directed learning', text:'Personal experiments in programming, networks and cybersecurity.'},
  {date:'Next', title:'Add your next milestone', text:'A course, a project, a competition, a certification you earn.'}
];

/* ---------- Rendering helpers ---------- */
const $ = s => document.querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; };
const esc = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- Portfolio title assembly ---------- */
const title = $('.title');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (title) {
  [...'Portfolio'].forEach((letter, i) => {
    const span = document.createElement('span');
    span.className = 'ch';
    span.textContent = letter;
    if (!reducedMotion) {
      const rnd = (min, max) => Math.random() * (max - min) + min;
      span.style.transform = `translate(${rnd(-60, 60)}vw, ${rnd(-50, 50)}vh) rotate(${rnd(-120, 120)}deg) scale(${rnd(.4, 1.8)})`;
      span.style.filter = 'blur(14px)';
      span.style.transitionDelay = `${i * 0.12}s`;
    }
    title.append(span);
  });

  if (!reducedMotion) {
    addEventListener('load', () => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          title.querySelectorAll('.ch').forEach(span => {
            span.classList.add('in');
            span.style.transform = 'translate(0, 0) rotate(0) scale(1)';
            span.style.filter = 'blur(0)';
          });
        }, 150);
      });
    });
  }
}

interests.forEach(i => $('#interests').append(el('li', '', esc(i))));

Object.entries(skills).forEach(([cat, items]) => {
  const box = el('article', 'skill reveal', `<h3>${esc(cat)}</h3><ul>${items.map(([n,l]) => `<li>${esc(n)}<span>${esc(l)}</span></li>`).join('')}</ul>`);
  $('#skillsGrid').append(box);
});

projects.forEach(p => {
  $('#projectGrid').append(el('article', 'proj reveal',
    `<i class="tape"></i><img class="ph sm" src="${esc(p.image)}" alt="${esc(p.alt)}">
     <h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p><p class="tags">${p.tech.map(esc).join(' / ')}</p>
     <a class="ul" href="${p.link}">${esc(p.cta)}</a>`));
});

journey.forEach(j => $('#timeline').append(el('li', 'reveal', `<time>${esc(j.date)}</time><h3>${esc(j.title)}</h3><p>${esc(j.text)}</p>`)));
$('#yr').textContent = new Date().getFullYear();

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.15});
document.querySelectorAll('.reveal').forEach(n => io.observe(n));

/* ---------- Folder navigation: scroll-spy + mobile menu ---------- */
const links = [...document.querySelectorAll('.folders a')];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
}), {rootMargin:'-40% 0px -55% 0px'});
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

const btn = $('.menu-btn'), nav = $('#folders');
btn.addEventListener('click', () => { const o = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', o); });
links.forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); btn.setAttribute('aria-expanded', false); }));

/* ---------- Custom cursor (mouse only, lightweight) ---------- */
const cur = $('.cursor');
if (matchMedia('(hover:hover)').matches) {
  addEventListener('mousemove', e => { cur.classList.add('on'); cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'; });
  document.querySelectorAll('a,button,.polaroid,.proj,.skill').forEach(n => {
    n.addEventListener('mouseenter', () => cur.classList.add('big'));
    n.addEventListener('mouseleave', () => cur.classList.remove('big'));
  });
}
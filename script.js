AOS.init();

/* ===============================
         HEADER LINE  
================================== */

const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');
const underline = document.querySelector('.underline-nav'); // S'assure que cet élément existe dans votre HTML/CSS

function updateUnderline(link) {
  if (!underline) return;
  const linkRect = link.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();

  underline.style.width = `${linkRect.width}px`;
  underline.style.left = `${linkRect.left - navRect.left}px`;
}

// Au chargement de la page → place la ligne sous le lien actif
const activeLink = document.querySelector('.nav a.active');
if (activeLink) {
  updateUnderline(activeLink);
}

// Quand on clique sur un lien
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    updateUnderline(link);
  });
});

// Bonus : si la fenêtre est redimensionnée, on recalcule la position
window.addEventListener('resize', () => {
  const currentActive = document.querySelector('.nav a.active');
  if (currentActive) {
    updateUnderline(currentActive);
  }
});


/* ===============================
         TIMELINE CAROUSEL  
================================== */

const timelineData = [
  {
    year: "2020",
    title: "Stage de découverte informatique",
    description: "J'ai pu réaliser un stage en informatique",
    tags: ["VirtualBox", "Périphériques", "Réseaux", "Caméra"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
         <circle cx="9" cy="7" r="4"/>
         <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
         <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
         <path d="M19 8v4"/>
         <path d="M17 10h4"/>
       </svg>`
  },
  {
    year: "2021-24",
    title: "Baccalauréat Scientifique STI2D",
    description: "Obtention du bac, spécialité Mathématiques & Physique",
    tags: ["Mathématiques", "Physique", "Dev durable", "Programmation"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
             <path d="M6 12v5c3 3 9 3 12 0v-5"/>
           </svg>`
  },
  {
    year: "2024-25",
    title: "Assistance informatique et logistique",
    description: "Suite à ma sortie de bac j'ai eu la chance de travailler chez PC Root, pendant la fac",
    tags: ["RJ-45", "Système & Réseaux", "Dépannage", "Système caméra", "Réparation & Démontage"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <rect x="2" y="7" width="20" height="14" rx="2"/>
         <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
         <path d="M12 12v.01"/>
         <path d="M8 12h.01"/>
         <path d="M16 12h.01"/>
       </svg>`
  },
  {
    year: "2025",
    title: "Licence L1 - LLCER",
    description: "Licence d'une durée de 2 ans suite à une décision de retourner en informatique, avec sortie de niveau C1",
    tags: ["Anglais", "Informatique Anglais", "Grammaire"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
         <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
         <path d="M8 7h8"/>
         <path d="M8 11h6"/>
       </svg>`
  },
  {
    year: "2026",
    title: "Formation Développeur web",
    description: "Obtention de certificat de jeune développeur web front-end et UI/UX designer",
    tags: ["HTML5", "CSS3", "JavaScript", "Figma", "GitHub", "Vue.js", "Workflow"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <polyline points="16 18 22 12 16 6"/>
             <polyline points="8 6 2 12 8 18"/>
           </svg>`
  },
  {
    year: "2024",
    title: "Aujourd'hui",
    description: "À la recherche d'une alternance pour un BTS SIO option SISR",
    tags: ["Système", "Réseaux", "Cloud"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
             <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
             <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
             <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
           </svg>`
  }
];

const timelineTrack = document.getElementById('timelineTrack');
const timelineDotsContainer = document.getElementById('timelineDots');
const timelinePrevBtn = document.getElementById('timelinePrev');
const timelineNextBtn = document.getElementById('timelineNext');

let timelineIndex = 0;
const timelineCardWidth = 368; // 340px + 28px gap

if (timelineTrack && timelineDotsContainer) {
  timelineData.forEach((item, index) => {
    const slide = document.createElement('div');
    const positionClass = index % 2 === 0 ? 'top' : 'bottom';
    slide.className = `timeline-slide ${positionClass}`;
    
    slide.innerHTML = `
      <article class="timeline-card">
        <div class="timeline-card-header">
          <div class="timeline-card-icon">${item.icon}</div>
          <div class="timeline-card-info">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </div>
        <div class="timeline-card-tags">
          ${item.tags.map(tag => `<span class="timeline-tag">${tag}</span>`).join('')}
        </div>
      </article>

      <div class="timeline-year-marker">
        <div class="timeline-year-text">${item.year}</div>
        <div class="timeline-year-dot"></div>
      </div>
    `;
    
    timelineTrack.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'timeline-dot';
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTimelineSlide(index));
    timelineDotsContainer.appendChild(dot);
  });

  const timelineDots = document.querySelectorAll('.timeline-dot');

  function updateTimelineCarousel() {
    timelineTrack.style.transform = `translateX(-${timelineIndex * timelineCardWidth}px)`;
    timelineDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === timelineIndex);
    });
  }

  function goToTimelineSlide(index) {
    timelineIndex = index;
    if (timelineIndex < 0) timelineIndex = timelineData.length - 1;
    if (timelineIndex >= timelineData.length) timelineIndex = 0;
    updateTimelineCarousel();
  }

  if (timelinePrevBtn) {
    timelinePrevBtn.addEventListener('click', () => goToTimelineSlide(timelineIndex - 1));
  }
  if (timelineNextBtn) {
    timelineNextBtn.addEventListener('click', () => goToTimelineSlide(timelineIndex + 1));
  }

  updateTimelineCarousel();
}


/* ===============================
         CARROUSEL PROJECTS  
================================== */

const track = document.getElementById('carouselTrack');
const cards = document.querySelectorAll('.project-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');
const toggleBtn = document.getElementById('toggleAutoScroll');

let currentIndex = 0;
let autoScroll = true;
let autoScrollInterval = null;
const cardWidth = 444; // 420px + 24px gap

if (dotsContainer) {
  cards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
}

const dots = document.querySelectorAll('.carousel-dot');

function updateCarousel() {
  if (track) {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = index;
  if (currentIndex < 0) currentIndex = cards.length - 1;
  if (currentIndex >= cards.length) currentIndex = 0;
  updateCarousel();
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    resetAutoScroll();
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
    resetAutoScroll();
  });
}

// Auto-scroll
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    goToSlide(currentIndex + 1);
  }, 3500);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

function resetAutoScroll() {
  if (autoScroll) {
    stopAutoScroll();
    startAutoScroll();
  }
}

if (track) {
  track.addEventListener('mouseenter', stopAutoScroll);
  track.addEventListener('mouseleave', () => {
    if (autoScroll) startAutoScroll();
  });
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    autoScroll = !autoScroll;
    toggleBtn.classList.toggle('paused', !autoScroll);

    if (autoScroll) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }
  });
}

// Démarrer
startAutoScroll();
updateCarousel();


/* ===============================
         MENU BURGER & OBSERVER  
================================== */

const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

function setMenu(open) {
  if (!menu || !burger) return;
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
}

if (burger && menu) {
  burger.addEventListener('click', () => {
    setMenu(!menu.classList.contains('open'));
  });

  // Ferme le menu après un clic sur un lien ou avec Échap
  const menuLinks = menu.querySelectorAll('a');
  
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  // Lien actif selon la section visible
  const sections = [...menuLinks]
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          menuLinks.forEach((a) =>
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id)
          );
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  
  sections.forEach((s) => observer.observe(s));
}







// FONCTION POUR LA SPHERE AVEC IMAGE DANS LE HERO 

    const container2 = document.getElementById('orbContainer');
    const photo = document.getElementById('photo');

    // Si la photo est introuvable, on garde les initiales
    photo.addEventListener('error', () => { photo.style.display = 'none'; });

    /* ---------- Ouverture / fermeture ---------- */
    let opened = false;
    function toggle() {
      opened = !opened;
      container2.classList.toggle('opened', opened);
      container2.setAttribute('aria-pressed', String(opened));
    }
    container2.addEventListener('click', toggle);
    container2.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });

    /* ---------- Ralentissement / reprise fluide de l'animation ---------- */
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const BASE_RATE = reduce ? 0.25 : 1;
    let rate = BASE_RATE;
    let sphereAnims = [];

    window.addEventListener('load', () => {
      sphereAnims = document.getAnimations().filter(a =>
        typeof CSSAnimation !== 'undefined' &&
        a instanceof CSSAnimation &&
        a.effect && a.effect.target &&
        a.effect.target.closest('.sphere')
      );
    });

    let last = performance.now();
    function frame(now) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const target = opened ? 0 : BASE_RATE;
      rate += (target - rate) * Math.min(1, dt * 3.2);
      if (opened && rate < 0.004) rate = 0;
      if (!opened && Math.abs(rate - BASE_RATE) < 0.004) rate = BASE_RATE;

      for (const a of sphereAnims) a.playbackRate = rate;

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);



    

// FONCTION ?
const container = document.getElementById('sceneContainer');
const stage = document.getElementById('stage3d');

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

window.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  mouseX = (e.clientX - cx) / (rect.width / 2);
  mouseY = (e.clientY - cy) / (rect.height / 2);
});

function animateParallax() {
  currentX += (mouseX - currentX) * 0.07;
  currentY += (mouseY - currentY) * 0.07;
  const rotY = currentX * 16;
  const rotX = -currentY * 16;
  stage.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  requestAnimationFrame(animateParallax);
}
animateParallax();
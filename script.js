AOS.init();

/* ===============================
         HEADER LINE  
================================== */

const nav = document.querySelector('.nav');
const links = document.querySelectorAll('.nav-link');
const underline = document.querySelector('.underline-nav');

function updateUnderline(link) {
  const linkRect = link.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();

  underline.style.width = `${linkRect.width}px`;
  underline.style.left = `${linkRect.left - navRect.left}px`;
}

// Au chargement de la page → place la ligne sous le lien actif
const activeLink = document.querySelector('.nav-link.active');
if (activeLink) {
  updateUnderline(activeLink);
}

// Quand on clique sur un lien
links.forEach(link => {
  link.addEventListener('click', (e) => {
    // Enlève la classe active de tous les liens
    links.forEach(l => l.classList.remove('active'));
    
    // Ajoute la classe active au lien cliqué
    link.classList.add('active');
    
    // Déplace la ligne
    updateUnderline(link);
  });
});

// Bonus : si la fenêtre est redimensionnée, on recalcule la position
window.addEventListener('resize', () => {
  const currentActive = document.querySelector('.nav-link.active');
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
    description: "j'ai pus realiser un stage en informatique",
    tags: ["virtual box", "Peripheriques", "Réseaux", "Camera"],
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
    tags: ["Mathématiques", "Physique", "Dev durable", "Programtion"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
             <path d="M6 12v5c3 3 9 3 12 0v-5"/>
           </svg>`
  },
  {
    year: "2024-25",
    title: "Assistance informatique et logistique",
    description: "suite a ma sortie de bac j'ai eu la chance de travailer chez pc root, pendant la fac",
    tags: ["RG-45", "Systéme & Réseaux", "Dépannage","Systeme camera","Réparation & Démontage"],
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
    description: "licence d'une durée de 2 ans suite a une descision de retourner en informatique, avec sortie de niveau c1",
    tags: ["Anglais", "Informatique Anglais", "Gramaire"],
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
    description: "Obtention de certificat de jeune developpeur web front-end et UI/UX designer",
    tags: ["HTML5", "CSS3", "javascript","Figma","Github","Vue.js" ,"workflow"],
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <polyline points="16 18 22 12 16 6"/>
             <polyline points="8 6 2 12 8 18"/>
           </svg>`
  },
  {
    year: "2024",
    title: "Aujourd'hui",
    description: "A la recherche d'un alternance pour un BTS SIO option SISR",
    tags: ["Systéme", "Réseaux", "Cloud"],
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

  // Génération des slides avec alternance
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

    // Dot navigation en bas
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

// Créer les dots
cards.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.classList.add('carousel-dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.carousel-dot');

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

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

prevBtn.addEventListener('click', () => {
  goToSlide(currentIndex - 1);
  resetAutoScroll();
});

nextBtn.addEventListener('click', () => {
  goToSlide(currentIndex + 1);
  resetAutoScroll();
});

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

toggleBtn.addEventListener('click', () => {
  autoScroll = !autoScroll;
  toggleBtn.classList.toggle('paused', !autoScroll);

  if (autoScroll) {
    startAutoScroll();
  } else {
    stopAutoScroll();
  }
});

// Pause au survol
track.addEventListener('mouseenter', stopAutoScroll);
track.addEventListener('mouseleave', () => {
  if (autoScroll) startAutoScroll();
});

// Démarrer
startAutoScroll();
updateCarousel();


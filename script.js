AOS.init();


/* ===============================
         TIMELINE CAROUSEL  
================================== */

const timelineData = [
  {
    year: "2018",
    title: "Baccalauréat Scientifique",
    description: "Obtention du bac avec mention, spécialité Mathématiques & Physique",
    tags: ["Mathématiques", "Physique", "Sciences"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
             <path d="M6 12v5c3 3 9 3 12 0v-5"/>
           </svg>`
  },
  {
    year: "2019",
    title: "Licence Informatique",
    description: "Début des études en informatique, découverte de la programmation et des algorithmes",
    tags: ["C", "Python", "Algorithmique"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <polyline points="16 18 22 12 16 6"/>
             <polyline points="8 6 2 12 8 18"/>
           </svg>`
  },
  {
    year: "2021",
    title: "Premier Stage",
    description: "Stage de 3 mois en startup, développement d'applications web et travail en équipe",
    tags: ["React", "Node.js", "Git"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
             <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
           </svg>`
  },
  {
    year: "2023",
    title: "Diplôme obtenu",
    description: "Validation de la licence informatique et projet de fin d'études full-stack",
    tags: ["Full-stack", "Projet", "TypeScript"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <circle cx="12" cy="8" r="7"/>
             <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
           </svg>`
  },
  {
    year: "2024",
    title: "Aujourd'hui",
    description: "Master / Alternance, focus sur les technologies modernes et side projects",
    tags: ["Next.js", "TypeScript", "Cloud"],
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


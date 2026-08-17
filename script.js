AOS.init();

/* ========================
   TIMELINE CARROUSEL
   ======================== */

const timelineWrapper = document.getElementById('timelineWrapper');
const timelineContainer = document.querySelector('.timeline-container');
const timelinePrevBtn = document.getElementById('timelinePrev');
const timelineNextBtn = document.getElementById('timelineNext');

if (timelineWrapper && timelineContainer && timelinePrevBtn && timelineNextBtn) {
    
    // Valeur du scroll pour chaque click (largeur d'une carte + gap)
    const scrollAmount = 390; // 350px (largeur) + 40px (gap)
    
    // Fonction pour mettre à jour l'état des boutons
    function updateButtonStates() {
        const maxScroll = timelineContainer.scrollWidth - timelineWrapper.clientWidth;
        
        if (timelineWrapper.scrollLeft <= 0) {
            timelinePrevBtn.classList.add('disabled');
        } else {
            timelinePrevBtn.classList.remove('disabled');
        }
        
        if (timelineWrapper.scrollLeft >= maxScroll - 5) { // -5 pour la tolérance
            timelineNextBtn.classList.add('disabled');
        } else {
            timelineNextBtn.classList.remove('disabled');
        }
    }
    
    // Bouton précédent
    timelinePrevBtn.addEventListener('click', () => {
        timelineWrapper.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
        setTimeout(updateButtonStates, 300);
    });
    
    // Bouton suivant
    timelineNextBtn.addEventListener('click', () => {
        timelineWrapper.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
        setTimeout(updateButtonStates, 300);
    });
    
    // Mettre à jour les états au scroll
    timelineWrapper.addEventListener('scroll', updateButtonStates);
    
    // Initialiser les états au chargement
    setTimeout(updateButtonStates, 100);
    
    // Support du scroll à la souris (pour mobile et tactile)
    let isScrolling = false;
    let scrollStart = 0;
    
    timelineWrapper.addEventListener('mousedown', (e) => {
        isScrolling = true;
        scrollStart = e.pageX - timelineWrapper.offsetLeft;
        scrollStart = scrollStart - timelineWrapper.scrollLeft;
    });
    
    timelineWrapper.addEventListener('mouseleave', () => {
        isScrolling = false;
    });
    
    timelineWrapper.addEventListener('mouseup', () => {
        isScrolling = false;
    });
    
    timelineWrapper.addEventListener('mousemove', (e) => {
        if (!isScrolling) return;
        const x = e.pageX - timelineWrapper.offsetLeft;
        const scroll = x - scrollStart;
        timelineWrapper.scrollLeft = timelineWrapper.scrollLeft - scroll;
    });
}


const nav = document.querySelector('.nav');
const links = document.querySelectorAll('.nav-link');
const underline = document.querySelector('.underline');

function updateUnderline(link) {
  const rect = link.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();

  underline.style.width = `${rect.width}px`;
  underline.style.left = `${rect.left - navRect.left}px`;
}

// Position initiale (sur Accueil)
window.addEventListener('load', () => {
  const active = document.querySelector('.nav-link.active');
  if (active) updateUnderline(active);
});

// Au clic
links.forEach(link => {
  link.addEventListener('click', (e) => {
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    updateUnderline(link);
  });
});

// Recalcul si on redimensionne la fenêtre
window.addEventListener('resize', () => {
  const active = document.querySelector('.nav-link.active');
  if (active) updateUnderline(active);
});












































/* scroll automatique avec la molette 
function scrollTimeline(event) {
    event.preventDefault();

    timeline.scrollLeft += event.deltaY;
}

timeline.addEventListener("wheel", scrollTimeline);*/
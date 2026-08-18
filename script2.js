(function () {
  const IMG_W = 2204, IMG_H = 464;
  const container = document.getElementById('qualities');
  const pieces = Array.from(container.children); // 7 crops, in order

  function layout() {
    const totalOriginalW = 2154; // sum of all crop widths (50 -> 2204)
    const containerW = container.parentElement.clientWidth || container.clientWidth || 1400;
    const displayW = Math.min(containerW, 1400);
    const scale = displayW / totalOriginalW;
    const displayH = IMG_H * scale;

    container.style.height = displayH + 'px';

    pieces.forEach(piece => {
      const x = parseFloat(piece.dataset.x);
      const w = parseFloat(piece.dataset.w);
      piece.style.width = (w * scale) + 'px';
      piece.style.backgroundSize = (IMG_W * scale) + 'px ' + (IMG_H * scale) + 'px';
      piece.style.backgroundPosition = (-(x * scale)) + 'px 0px';
    });
  }

  window.addEventListener('resize', layout);
  layout();

  // speed streaks for the runner (Dynamique)
  const speedLayer = document.getElementById('speedLayer');
  function spawnStreak() {
    if (!speedLayer) return;
    const s = document.createElement('div');
    s.className = 'speed-streak';
    s.style.width = (18 + Math.random() * 26) + 'px';
    s.style.top = (10 + Math.random() * 70) + '%';
    s.style.left = '55%';
    s.style.animationDuration = (0.55 + Math.random() * 0.35) + 's';
    speedLayer.appendChild(s);
    setTimeout(() => s.remove(), 900);
  }
  setInterval(spawnStreak, 150);

  // twinkling sparkles around the pen (Créative)
  const sparkleLayer = document.getElementById('sparkleLayer');
  function spawnSparkle() {
    if (!sparkleLayer) return;
    const sp = document.createElement('div');
    sp.className = 'sparkle';
    sp.style.left = (20 + Math.random() * 60) + '%';
    sp.style.top = (10 + Math.random() * 55) + '%';
    sp.style.animationDuration = (0.7 + Math.random() * 0.6) + 's';
    sparkleLayer.appendChild(sp);
    setTimeout(() => sp.remove(), 1400);
  }
  setInterval(spawnSparkle, 220);
})();

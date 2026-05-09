/* =============================================
   Zampier Soccer — script.js
   - Garrafas Antártica em SVG
   - Scroll reveal
   - Smooth price counter
   ============================================= */

// ── Garrafa Antártica SVG ──────────────────────
function createAntarticaBottle(isBonus = false) {
  const opacity = isBonus ? '1' : '1';
  const glowColor = isBonus ? '#3ddc5f' : 'none';

  return `
  <svg width="52" height="140" viewBox="0 0 52 140" xmlns="http://www.w3.org/2000/svg" style="opacity:${opacity}">
    <defs>
      <linearGradient id="bottleGrad${isBonus ? 'B' : 'N'}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="#0d2a5e"/>
        <stop offset="30%"  stop-color="#1a4a9a"/>
        <stop offset="60%"  stop-color="#1e55b0"/>
        <stop offset="100%" stop-color="#0d2a5e"/>
      </linearGradient>
      <linearGradient id="capGrad${isBonus ? 'B' : 'N'}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#d4a800"/>
        <stop offset="100%" stop-color="#8a6c00"/>
      </linearGradient>
      <linearGradient id="labelGrad${isBonus ? 'B' : 'N'}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#1550a8"/>
        <stop offset="100%" stop-color="#0c3578"/>
      </linearGradient>
      <filter id="glow${isBonus ? 'B' : 'N'}">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Tampa (cap) -->
    <rect x="18" y="0" width="16" height="4" rx="2"
          fill="url(#capGrad${isBonus ? 'B' : 'N'})"/>

    <!-- Gargalo -->
    <rect x="20" y="4" width="12" height="18" rx="3"
          fill="url(#bottleGrad${isBonus ? 'B' : 'N'})"/>
    <!-- Brilho gargalo -->
    <rect x="22" y="5" width="3" height="14" rx="1"
          fill="rgba(255,255,255,0.12)"/>

    <!-- Ombro (transição) -->
    <path d="M16 22 Q10 26 8 34 L44 34 Q42 26 36 22 Z"
          fill="url(#bottleGrad${isBonus ? 'B' : 'N'})"/>

    <!-- Corpo -->
    <rect x="8" y="34" width="36" height="90" rx="3"
          fill="url(#bottleGrad${isBonus ? 'B' : 'N'})"/>
    <!-- Brilho lateral esquerdo -->
    <rect x="10" y="36" width="5" height="86" rx="2"
          fill="rgba(255,255,255,0.07)"/>
    <!-- Brilho lateral direito (reflexo) -->
    <rect x="38" y="36" width="3" height="86" rx="1"
          fill="rgba(255,255,255,0.04)"/>

    <!-- Base -->
    <path d="M8 124 Q8 130 14 130 L38 130 Q44 130 44 124 Z"
          fill="#0a2050"/>

    <!-- Rótulo fundo -->
    <rect x="10" y="42" width="32" height="70" rx="4"
          fill="url(#labelGrad${isBonus ? 'B' : 'N'})"/>
    <!-- Borda rótulo -->
    <rect x="10" y="42" width="32" height="70" rx="4"
          fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>

    <!-- Faixa vermelha topo rótulo -->
    <rect x="10" y="42" width="32" height="8" rx="4"
          fill="#c0392b"/>
    <rect x="10" y="46" width="32" height="4"
          fill="#c0392b"/>

    <!-- Texto ANTÁRTICA -->
    <text x="26" y="60" text-anchor="middle"
          font-family="Arial Black, sans-serif"
          font-size="5.5" font-weight="900"
          fill="white" letter-spacing="0.3">ANTÁRTICA</text>

    <!-- Emblema central (dois círculos concêntricos) -->
    <circle cx="26" cy="82" r="13"
            fill="#1a55b0" stroke="white" stroke-width="1.2"/>
    <circle cx="26" cy="82" r="10"
            fill="#0d3d8a" stroke="rgba(255,255,255,0.4)" stroke-width="0.6"/>
    <!-- Letra A estilizada -->
    <text x="26" y="86" text-anchor="middle"
          font-family="Arial Black, sans-serif"
          font-size="12" font-weight="900"
          fill="white">A</text>

    <!-- Texto 1L -->
    <text x="26" y="107" text-anchor="middle"
          font-family="Arial, sans-serif"
          font-size="7" font-weight="700"
          fill="rgba(255,255,255,0.8)">1L</text>

    <!-- Faixa dourada inferior -->
    <rect x="10" y="108" width="32" height="4" rx="2"
          fill="url(#capGrad${isBonus ? 'B' : 'N'})"/>

    ${isBonus ? `
    <!-- Glow verde para garrafa bônus -->
    <rect x="8" y="34" width="36" height="90" rx="3"
          fill="none" stroke="#3ddc5f" stroke-width="1.5"
          opacity="0.7"/>
    <!-- Estrela / badge bônus -->
    <circle cx="26" cy="20" r="7" fill="#3ddc5f"/>
    <text x="26" y="24" text-anchor="middle"
          font-family="Arial Black, sans-serif"
          font-size="7" font-weight="900"
          fill="#030804">+1</text>
    ` : ''}
  </svg>`;
}

// ── Renderiza as 5 garrafas ──────────────────────
function renderBottles() {
  const container = document.getElementById('beerBottles');
  if (!container) return;

  let html = '';
  for (let i = 0; i < 4; i++) {
    html += createAntarticaBottle(false);
  }
  // 5ª garrafa = bônus (grátis)
  html += createAntarticaBottle(true);

  container.innerHTML = html;
}

// ── Scroll Reveal ──────────────────────────────
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.price-card, .food-card, .beer-promo, .birthday-box, .feature-chip, .section-header'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
}

// ── Stagger delay para chips de features ──────────
function staggerFeatures() {
  const chips = document.querySelectorAll('.feature-chip');
  chips.forEach((chip, i) => {
    chip.style.transitionDelay = `${i * 60}ms`;
  });
}

// ── Stagger delay para price cards ────────────────
function staggerPriceCards() {
  const cards = document.querySelectorAll('.price-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 100}ms`;
  });
}

// ── Smooth scroll para links âncora ───────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Hover 3D leve nos price cards ─────────────────
function initCardTilt() {
  document.querySelectorAll('.price-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `
        translateY(-6px)
        rotateX(${-y * 6}deg)
        rotateY(${x * 6}deg)
      `;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ── Init ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderBottles();
  staggerPriceCards();
  staggerFeatures();
  initScrollReveal();
  initSmoothScroll();
  initCardTilt();
});

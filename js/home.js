/* ============================================================
   OTAKUPH — home.js
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  spawnSakura();
  renderTrending();
});

// ─── Sakura petals ────────────────────────────────────────────
function spawnSakura() {
  const container = document.getElementById('sakuraContainer');
  if (!container) return;
  const petals = ['🌸', '🌺', '✿', '❀', '🌷'];
  for (let i = 0; i < 14; i++) {
    const petal = document.createElement('span');
    petal.className = 'sakura-petal';
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];
    petal.style.left = Math.random() * 100 + '%';
    petal.style.fontSize = (0.7 + Math.random() * 1) + 'rem';
    petal.style.opacity = 0.3 + Math.random() * 0.5;
    petal.style.animationDuration = (7 + Math.random() * 10) + 's';
    petal.style.animationDelay = (Math.random() * 8) + 's';
    container.appendChild(petal);
  }
}

// ─── Trending Grid ────────────────────────────────────────────
function renderTrending() {
  const grid = document.getElementById('trendingGrid');
  if (!grid) return;

  const all = getAllAnime();
  const trending = [...all]
    .sort((a, b) => b.views - a.views)
    .slice(0, 8);

  grid.innerHTML = '';
  trending.forEach(anime => {
    const card = makeAnimeCard(anime, () => {
      window.location.href = `browse.html?watch=${anime.id}`;
    });
    grid.appendChild(card);
  });
}

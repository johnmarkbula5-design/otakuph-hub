/* ============================================================
   OTAKUPH — browse.js
   ============================================================ */

'use strict';

const PAGE_SIZE = 12;
let currentPage = 1;
let filteredAnime = [];

document.addEventListener('DOMContentLoaded', () => {
  filteredAnime = getAllAnime();
  applyFilters();
  bindEvents();

  // Auto-open watch modal if ?watch=id in URL
  const params = new URLSearchParams(window.location.search);
  const watchId = params.get('watch');
  if (watchId) {
    const anime = getAllAnime().find(a => String(a.id) === watchId);
    if (anime) setTimeout(() => openWatchModal(anime), 400);
  }
});

// ─── Events ───────────────────────────────────────────────────
function bindEvents() {
  document.getElementById('searchBtn').addEventListener('click', () => {
    currentPage = 1; applyFilters();
  });
  document.getElementById('searchInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') { currentPage = 1; applyFilters(); }
  });
  document.getElementById('filterGenre').addEventListener('change', () => { currentPage = 1; applyFilters(); });
  document.getElementById('filterStatus').addEventListener('change', () => { currentPage = 1; applyFilters(); });
  document.getElementById('filterSort').addEventListener('change', () => { currentPage = 1; applyFilters(); });
  document.getElementById('clearFilters').addEventListener('click', clearFilters);
  document.getElementById('loadMoreBtn').addEventListener('click', loadMore);
  document.getElementById('closeModal').addEventListener('click', closeWatchModal);
  document.getElementById('watchModal').addEventListener('click', e => {
    if (e.target === document.getElementById('watchModal')) closeWatchModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeWatchModal();
  });
}

// ─── Filters ──────────────────────────────────────────────────
function applyFilters() {
  const query  = document.getElementById('searchInput').value.toLowerCase().trim();
  const genre  = document.getElementById('filterGenre').value;
  const status = document.getElementById('filterStatus').value;
  const sort   = document.getElementById('filterSort').value;

  let list = getAllAnime();

  if (query) {
    list = list.filter(a =>
      a.title.toLowerCase().includes(query) ||
      a.genre.toLowerCase().includes(query) ||
      (a.tags && a.tags.some(t => t.toLowerCase().includes(query))) ||
      (a.desc && a.desc.toLowerCase().includes(query))
    );
  }
  if (genre)  list = list.filter(a => a.genre === genre);
  if (status) list = list.filter(a => a.status === status);

  switch (sort) {
    case 'rating':  list.sort((a, b) => b.rating  - a.rating);  break;
    case 'newest':  list.sort((a, b) => b.year    - a.year);    break;
    case 'az':      list.sort((a, b) => a.title.localeCompare(b.title)); break;
    default:        list.sort((a, b) => b.views   - a.views);   break;
  }

  filteredAnime = list;
  renderGrid();

  const info = document.getElementById('resultsInfo');
  info.textContent = `Showing ${Math.min(currentPage * PAGE_SIZE, list.length)} of ${list.length} anime${query ? ` for "${query}"` : ''}`;
}

function clearFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('filterGenre').value = '';
  document.getElementById('filterStatus').value = '';
  document.getElementById('filterSort').value = 'popular';
  currentPage = 1;
  applyFilters();
}

// ─── Grid Rendering ───────────────────────────────────────────
function renderGrid() {
  const grid = document.getElementById('browseGrid');
  grid.innerHTML = '';
  const slice = filteredAnime.slice(0, currentPage * PAGE_SIZE);

  if (slice.length === 0) {
    grid.innerHTML = '<p class="empty-msg" style="grid-column:1/-1">No anime found. Try different filters!</p>';
    document.getElementById('loadMoreBtn').style.display = 'none';
    return;
  }

  slice.forEach(anime => {
    const card = makeAnimeCard(anime, () => openWatchModal(anime));
    grid.appendChild(card);
  });

  const loadMoreBtn = document.getElementById('loadMoreBtn');
  loadMoreBtn.style.display = slice.length < filteredAnime.length ? 'inline-flex' : 'none';
}

function loadMore() {
  currentPage++;
  renderGrid();
  const info = document.getElementById('resultsInfo');
  info.textContent = `Showing ${Math.min(currentPage * PAGE_SIZE, filteredAnime.length)} of ${filteredAnime.length} anime`;
}

// ─── Watch Modal ──────────────────────────────────────────────
function openWatchModal(anime) {
  const modal   = document.getElementById('watchModal');
  const content = document.getElementById('modalContent');
  const user    = getCurrentUser();

  // Track watch count
  if (user) {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx].watchCount = (users[idx].watchCount || 0) + 1;
      saveUsers(users);
      setCurrentUser(users[idx], !!localStorage.getItem('otakuph_current'));
    }
  }

  const embedUrl = toEmbedUrl(anime.videoUrl);
  const coverHtml = anime.cover
    ? `<div class="watch-modal-cover"><img src="${anime.cover}" alt="${anime.title}" onerror="this.parentElement.innerHTML='<span style=\\'font-size:3rem\\'>${anime.emoji || '🎌'}</span>'"></div>`
    : `<div class="watch-modal-cover"><span style="font-size:3rem">${anime.emoji || '🎌'}</span></div>`;

  const playerHtml = embedUrl
    ? `<iframe src="${embedUrl}" allowfullscreen allow="autoplay; encrypted-media"></iframe>`
    : `<div class="watch-player-placeholder">
        <span>${anime.emoji || '🎌'}</span>
        <p style="color:var(--text3);font-size:0.9rem">No stream available for this title.</p>
        <p style="color:var(--text3);font-size:0.8rem">Link: <a href="${anime.videoUrl || '#'}" target="_blank" style="color:var(--accent)">Open External →</a></p>
       </div>`;

  const tagsHtml = (anime.tags || []).map(t =>
    `<span class="anime-genre-tag">${t}</span>`
  ).join('');

  content.innerHTML = `
    <div class="watch-modal-header">
      ${coverHtml}
      <div class="watch-modal-meta">
        <div class="watch-modal-title">${anime.title}</div>
        <div class="watch-modal-tags">
          <span class="anime-genre-tag" style="color:${genreColor(anime.genre)}">${anime.genre}</span>
          <span class="anime-genre-tag badge-${anime.status === 'Ongoing' ? 'ongoing' : 'completed'}" style="color:${anime.status === 'Ongoing' ? '#2ecc71' : '#4361ee'}">${anime.status}</span>
          ${tagsHtml}
        </div>
        <p class="watch-modal-desc">${anime.desc}</p>
        <div class="watch-modal-info-row">
          <div class="watch-info-item"><b>Studio</b>${anime.studio || '—'}</div>
          <div class="watch-info-item"><b>Episodes</b>${anime.episodes || '?'}</div>
          <div class="watch-info-item"><b>Year</b>${anime.year || '?'}</div>
          <div class="watch-info-item"><b>Rating</b>★ ${anime.rating.toFixed(1)}</div>
          <div class="watch-info-item"><b>Views</b>${formatViews(anime.views)}</div>
        </div>
      </div>
    </div>
    <div class="watch-player">${playerHtml}</div>
    <div class="watch-actions">
      <button class="btn btn-ghost" onclick="shareAnime('${anime.title}')">🔗 Share</button>
      <a href="community.html" class="btn btn-ghost">💬 Discuss</a>
    </div>
    <div class="watch-uploader">Uploaded by <b>${anime.uploader || 'OtakuPH_Admin'}</b></div>
  `;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeWatchModal() {
  const modal = document.getElementById('watchModal');
  modal.style.display = 'none';
  document.body.style.overflow = '';
  // Stop video
  const iframe = modal.querySelector('iframe');
  if (iframe) { const src = iframe.src; iframe.src = ''; iframe.src = src; }
}

function toEmbedUrl(url) {
  if (!url) return null;
  // YouTube watch → embed
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  // Already an embed URL
  if (url.includes('/embed/')) return url;
  return null;
}

function shareAnime(title) {
  const text = `Check out "${title}" on OtakuPH! 🎌`;
  if (navigator.share) {
    navigator.share({ title, text, url: window.location.href }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text + ' ' + window.location.href)
      .then(() => alert('Link copied to clipboard!'))
      .catch(() => alert('Share: ' + text));
  }
}

/* ============================================================
   OTAKUPH — auth.js  (Shared Auth Logic)
   ============================================================ */

'use strict';

// ─── User Storage ─────────────────────────────────────────────
function getUsers() {
  return JSON.parse(localStorage.getItem('otakuph_users') || '[]');
}
function saveUsers(users) {
  localStorage.setItem('otakuph_users', JSON.stringify(users));
}
function getCurrentUser() {
  const raw = sessionStorage.getItem('otakuph_current') || localStorage.getItem('otakuph_current');
  return raw ? JSON.parse(raw) : null;
}
function setCurrentUser(user, remember) {
  const data = JSON.stringify(user);
  sessionStorage.setItem('otakuph_current', data);
  if (remember) localStorage.setItem('otakuph_current', data);
}
function clearCurrentUser() {
  sessionStorage.removeItem('otakuph_current');
  localStorage.removeItem('otakuph_current');
}
function isLoggedIn() {
  return getCurrentUser() !== null;
}

// ─── Navbar Rendering ─────────────────────────────────────────
function renderNavAuth() {
  const user = getCurrentUser();
  const navAuth = document.getElementById('navAuth');
  const navUser = document.getElementById('navUser');
  const userAvatar = document.getElementById('userAvatar');
  const dropdownName = document.getElementById('dropdownName');
  const uploadNavLink = document.getElementById('uploadNavLink');

  if (user) {
    if (navAuth) navAuth.style.display = 'none';
    if (navUser) navUser.style.display = 'flex';
    if (userAvatar) userAvatar.textContent = user.username.charAt(0).toUpperCase();
    if (dropdownName) dropdownName.textContent = user.username;
    if (uploadNavLink) uploadNavLink.style.display = 'inline-flex';
  } else {
    if (navAuth) navAuth.style.display = 'flex';
    if (navUser) navUser.style.display = 'none';
    if (uploadNavLink) uploadNavLink.style.display = 'none';
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      clearCurrentUser();
      window.location.href = 'index.html';
    });
  }
}

// ─── Navbar Scroll Effect ─────────────────────────────────────
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ─── Avatar click toggle ──────────────────────────────────────
function initAvatarToggle() {
  const avatar = document.getElementById('userAvatar');
  const dropdown = document.getElementById('userDropdown');
  if (!avatar || !dropdown) return;
  avatar.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });
  document.addEventListener('click', () => dropdown.classList.remove('open'));
}

// ─── Eye toggle buttons ───────────────────────────────────────
function initEyeToggles() {
  document.querySelectorAll('.eye-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      target.type = target.type === 'password' ? 'text' : 'password';
      btn.textContent = target.type === 'password' ? '👁' : '🙈';
    });
  });
}

// ─── Init on every page ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderNavAuth();
  initNavbarScroll();
  initAvatarToggle();
  initEyeToggles();
});

/* ============================================================
   OTAKUPH — profile.js
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const user = getCurrentUser();
  const gate = document.getElementById('profileGate');
  const page = document.getElementById('profilePage');

  if (!user) {
    if (gate) gate.style.display = 'flex';
    if (page) page.style.display = 'none';
    return;
  }

  if (gate) gate.style.display = 'none';
  if (page) page.style.display = 'block';

  renderProfileHeader(user);
  renderStats(user);
  renderMyUploads(user);
  renderMyPosts(user);
  populateSettings(user);
  initTabs();
  initSettings(user);
});

// ─── Header ───────────────────────────────────────────────────
function renderProfileHeader(user) {
  document.getElementById('profileAvatarLg').textContent = user.username.charAt(0).toUpperCase();
  document.getElementById('profileUsername').textContent = user.username;
  document.getElementById('profileEmail').textContent    = user.email;
  document.getElementById('profileGenreBadge').textContent = (user.genre || 'Anime') + ' Fan';

  // Random banner gradient per user
  const colors = [
    ['#1a0512', '#0d0d12', '#0a0a1a'],
    ['#0a1a12', '#0d0d12', '#0a0a1a'],
    ['#0a0a1a', '#0d0d12', '#1a0a12']
  ];
  const c = colors[user.username.charCodeAt(0) % colors.length];
  const banner = document.getElementById('bannerBg');
  if (banner) {
    banner.style.background = `linear-gradient(135deg, ${c[0]}, ${c[1]}, ${c[2]})`;
  }
}

// ─── Stats ────────────────────────────────────────────────────
function renderStats(user) {
  const myUploads = getUserUploads().filter(a => a.uploader === user.username);
  const myPosts   = COMMUNITY_POSTS.filter(p => p.author === user.username);

  document.getElementById('statUploads').textContent = myUploads.length;
  document.getElementById('statPosts').textContent   = myPosts.length;
  document.getElementById('statWatched').textContent = user.watchCount || 0;
  document.getElementById('statJoined').textContent  = new Date(user.joined || Date.now()).toLocaleDateString('en-PH', { month: 'short', year: 'numeric' });
}

// ─── My Uploads ───────────────────────────────────────────────
function renderMyUploads(user) {
  const grid = document.getElementById('myUploadsGrid');
  if (!grid) return;

  const uploads = getUserUploads().filter(a => a.uploader === user.username);
  if (uploads.length === 0) {
    grid.innerHTML = '<p class="empty-msg">You haven\'t uploaded any anime yet. <a href="upload.html" class="link-accent">Upload now →</a></p>';
    return;
  }

  grid.innerHTML = '';
  uploads.forEach(anime => {
    const card = makeAnimeCard(anime, () => {
      window.location.href = `browse.html?watch=${anime.id}`;
    });
    // Add delete button
    const del = document.createElement('button');
    del.className = 'btn btn-danger';
    del.style.cssText = 'width:100%;margin-top:4px;font-size:0.78rem;padding:6px';
    del.textContent = '🗑️ Delete';
    del.addEventListener('click', e => {
      e.stopPropagation();
      if (!confirm(`Delete "${anime.title}"?`)) return;
      const list = getUserUploads();
      const idx = list.findIndex(u => u.id === anime.id);
      if (idx !== -1) { list.splice(idx, 1); saveUserUploads(list); }
      renderMyUploads(user);
      renderStats(user);
    });
    card.appendChild(del);
    grid.appendChild(card);
  });
}

// ─── My Posts ─────────────────────────────────────────────────
function renderMyPosts(user) {
  const feed = document.getElementById('myPostsFeed');
  if (!feed) return;

  const myPosts = COMMUNITY_POSTS.filter(p => p.author === user.username);
  if (myPosts.length === 0) {
    feed.innerHTML = '<p class="empty-msg">You haven\'t posted anything yet. <a href="community.html" class="link-accent">Join the community →</a></p>';
    return;
  }

  feed.innerHTML = '';
  myPosts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
      <div class="post-header">
        <div class="post-avatar">${post.author.charAt(0).toUpperCase()}</div>
        <div class="post-author-info">
          <div class="post-author">${post.author}</div>
          <div class="post-time">${timeAgo(post.time)}</div>
        </div>
      </div>
      <div class="post-body">${post.text}</div>
      <div class="post-footer">
        <span class="post-action">❤️ ${post.likes}</span>
        <span class="post-action">💬 ${post.comments.length}</span>
        <button class="post-delete" data-id="${post.id}">🗑️ Delete</button>
      </div>
    `;
    feed.appendChild(card);
  });

  feed.querySelectorAll('.post-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!confirm('Delete this post?')) return;
      const id  = parseInt(btn.dataset.id);
      const idx = COMMUNITY_POSTS.findIndex(p => p.id === id);
      if (idx !== -1) { COMMUNITY_POSTS.splice(idx, 1); savePosts(); }
      renderMyPosts(user);
      renderStats(user);
    });
  });
}

// ─── Tabs ─────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.ptab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.ptab-content').forEach(c => c.style.display = 'none');
      const target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.style.display = 'block';
    });
  });
}

// ─── Settings ─────────────────────────────────────────────────
function populateSettings(user) {
  const u = document.getElementById('settingsUsername');
  const e = document.getElementById('settingsEmail');
  const g = document.getElementById('settingsGenre');
  const b = document.getElementById('settingsBio');
  if (u) u.value = user.username;
  if (e) e.value = user.email;
  if (g) g.value = user.genre || '';
  if (b) b.value = user.bio  || '';
}

function initSettings(user) {
  const saveBtn   = document.getElementById('saveSettingsBtn');
  const deleteBtn = document.getElementById('deleteAccountBtn');
  const successEl = document.getElementById('settingsSuccess');

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const newUsername = document.getElementById('settingsUsername').value.trim();
      const newEmail    = document.getElementById('settingsEmail').value.trim();
      const newGenre    = document.getElementById('settingsGenre').value;
      const newBio      = document.getElementById('settingsBio').value.trim();

      if (!newUsername || !newEmail) return alert('Username and email are required.');
      if (!/^[a-zA-Z0-9_]{3,20}$/.test(newUsername)) return alert('Invalid username format.');

      const users = getUsers();
      const idx   = users.findIndex(u => u.id === user.id);
      if (idx !== -1) {
        users[idx].username = newUsername;
        users[idx].email    = newEmail;
        users[idx].genre    = newGenre;
        users[idx].bio      = newBio;
        saveUsers(users);
        setCurrentUser(users[idx], !!localStorage.getItem('otakuph_current'));
        successEl.style.display = 'block';
        setTimeout(() => successEl.style.display = 'none', 3000);
        renderProfileHeader(users[idx]);
      }
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      if (!confirm('Are you sure you want to delete your account? This cannot be undone.')) return;
      const users = getUsers().filter(u => u.id !== user.id);
      saveUsers(users);
      clearCurrentUser();
      alert('Your account has been deleted. Goodbye, Otaku-san! 👋');
      window.location.href = 'index.html';
    });
  }
}

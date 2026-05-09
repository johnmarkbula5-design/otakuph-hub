/* ============================================================
   OTAKUPH — community.js
   ============================================================ */

'use strict';

let activeFilter = 'all';
let selectedTag  = '';

document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  renderFeed();
  initComposer();
  initFeedFilters();
});

// ─── Sidebar ──────────────────────────────────────────────────
function renderSidebar() {
  // Tags
  const tags = ['#Discuss', '#Review', '#Recom', '#Meme', '#AoT', '#DemonSlayer', '#OnePiece', '#Isekai', '#Romance'];
  const tagCloud = document.getElementById('tagCloud');
  if (tagCloud) {
    tagCloud.innerHTML = tags.map(t =>
      `<span class="tag-pill" data-tag="${t}">${t}</span>`
    ).join('');
    tagCloud.querySelectorAll('.tag-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.getElementById('searchInput') && (document.getElementById('searchInput').value = pill.dataset.tag);
        selectedTag = pill.dataset.tag;
      });
    });
  }

  // Members
  const sampleMembers = [
    { name: 'SakuraChan_PH', online: true },
    { name: 'NarutoFan_Iloilo', online: true },
    { name: 'MangaReader_Cebu', online: false },
    { name: 'WeeabooKing_Manila', online: true },
    { name: 'AnimeKing_Dagupan', online: false }
  ];
  const membersList = document.getElementById('membersList');
  if (membersList) {
    membersList.innerHTML = sampleMembers.map(m => `
      <div class="member-item">
        <div class="member-avatar">${m.name.charAt(0)}</div>
        <div>
          <div class="member-name">${m.name}</div>
          ${m.online ? '<div class="member-online">Online</div>' : ''}
        </div>
      </div>
    `).join('');
  }
}

// ─── Composer ─────────────────────────────────────────────────
function initComposer() {
  const user = getCurrentUser();
  const locked = document.getElementById('composerLocked');
  const form   = document.getElementById('composerForm');
  const avatar = document.getElementById('composerAvatar');

  if (user) {
    if (locked) locked.style.display = 'none';
    if (form)   form.style.display = 'block';
    if (avatar) avatar.textContent = user.username.charAt(0).toUpperCase();
  } else {
    if (locked) locked.style.display = 'block';
    if (form)   form.style.display = 'none';
  }

  const textarea  = document.getElementById('postText');
  const charCount = document.getElementById('charCount');
  const submitBtn = document.getElementById('submitPost');
  const tagBtns   = document.querySelectorAll('.tag-btn');
  let chosenTag   = '';

  if (textarea) {
    textarea.addEventListener('input', () => {
      charCount.textContent = textarea.value.length + '/500';
    });
  }

  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tagBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      chosenTag = btn.dataset.tag;
    });
  });

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const text = textarea.value.trim();
      if (!text) return;
      if (!user) return;

      const post = {
        id: Date.now(),
        author: user.username,
        text: text + (chosenTag ? ' ' + chosenTag : ''),
        tag: chosenTag || '',
        time: Date.now(),
        likes: 0,
        likedBy: [],
        comments: []
      };

      COMMUNITY_POSTS.unshift(post);
      savePosts();
      textarea.value = '';
      charCount.textContent = '0/500';
      tagBtns.forEach(b => b.classList.remove('selected'));
      chosenTag = '';
      renderFeed();
    });
  }
}

// ─── Feed Filters ─────────────────────────────────────────────
function initFeedFilters() {
  document.querySelectorAll('.feed-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.feed-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderFeed();
    });
  });
}

// ─── Feed Rendering ───────────────────────────────────────────
function renderFeed() {
  const feed = document.getElementById('postsFeed');
  if (!feed) return;

  let posts = [...COMMUNITY_POSTS];
  if (activeFilter !== 'all') {
    posts = posts.filter(p => p.text.includes(activeFilter) || p.tag === activeFilter);
  }

  feed.innerHTML = '';
  if (posts.length === 0) {
    feed.innerHTML = '<p class="empty-msg">No posts yet. Be the first to post!</p>';
    return;
  }

  const user = getCurrentUser();
  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.dataset.id = post.id;

    const liked = user && post.likedBy && post.likedBy.includes(user.id);
    const isOwner = user && post.author === user.username;
    const tagMatch = post.text.match(/#\w+/g) || [];
    const mainTag = post.tag || (tagMatch.length ? tagMatch[tagMatch.length - 1] : '');

    card.innerHTML = `
      <div class="post-header">
        <div class="post-avatar">${post.author.charAt(0).toUpperCase()}</div>
        <div class="post-author-info">
          <div class="post-author">${post.author}</div>
          <div class="post-time">${timeAgo(post.time)}</div>
        </div>
        ${mainTag ? `<span class="post-tag-badge">${mainTag}</span>` : ''}
      </div>
      <div class="post-body">${escapeHtml(post.text)}</div>
      <div class="post-footer">
        <button class="post-action like-btn ${liked ? 'liked' : ''}" data-id="${post.id}">
          ${liked ? '❤️' : '🤍'} ${post.likes}
        </button>
        <button class="post-action comment-btn" data-id="${post.id}">
          💬 ${post.comments.length} Comment${post.comments.length !== 1 ? 's' : ''}
        </button>
        ${isOwner ? `<button class="post-delete" data-id="${post.id}" title="Delete">🗑️</button>` : ''}
      </div>
    `;

    feed.appendChild(card);
  });

  // Like
  feed.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const user = getCurrentUser();
      if (!user) { alert('Please log in to like posts!'); return; }
      const id   = parseInt(btn.dataset.id);
      const post = COMMUNITY_POSTS.find(p => p.id === id);
      if (!post) return;
      if (!post.likedBy) post.likedBy = [];
      const idx = post.likedBy.indexOf(user.id);
      if (idx === -1) { post.likedBy.push(user.id); post.likes++; }
      else            { post.likedBy.splice(idx, 1); post.likes--; }
      savePosts();
      renderFeed();
    });
  });

  // Comment
  feed.querySelectorAll('.comment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id   = parseInt(btn.dataset.id);
      const post = COMMUNITY_POSTS.find(p => p.id === id);
      if (post) openCommentModal(post);
    });
  });

  // Delete
  feed.querySelectorAll('.post-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!confirm('Delete this post?')) return;
      const id = parseInt(btn.dataset.id);
      const idx = COMMUNITY_POSTS.findIndex(p => p.id === id);
      if (idx !== -1) { COMMUNITY_POSTS.splice(idx, 1); savePosts(); renderFeed(); }
    });
  });
}

// ─── Comment Modal ────────────────────────────────────────────
function openCommentModal(post) {
  const modal   = document.getElementById('commentModal');
  const content = document.getElementById('commentModalContent');
  const user    = getCurrentUser();

  content.innerHTML = `
    <div class="comment-modal-body">
      <div class="comment-modal-post">
        <div class="post-header" style="margin-bottom:10px">
          <div class="post-avatar">${post.author.charAt(0).toUpperCase()}</div>
          <div class="post-author-info">
            <div class="post-author">${post.author}</div>
            <div class="post-time">${timeAgo(post.time)}</div>
          </div>
        </div>
        <div class="post-body">${escapeHtml(post.text)}</div>
      </div>
      <h4 style="margin-bottom:14px;font-family:var(--font-title);font-size:1rem">💬 Comments (${post.comments.length})</h4>
      <div class="comments-list" id="commentsList">
        ${post.comments.length
          ? post.comments.map(c => `
              <div class="comment-item">
                <div class="comment-avatar">${c.author.charAt(0).toUpperCase()}</div>
                <div class="comment-bubble">
                  <div class="comment-author">${c.author}</div>
                  <div class="comment-text">${escapeHtml(c.text)}</div>
                </div>
              </div>
            `).join('')
          : '<p class="empty-msg" style="padding:16px 0">No comments yet. Be the first!</p>'
        }
      </div>
      ${user
        ? `<div class="comment-form">
            <input type="text" class="comment-input" id="commentInput" placeholder="Write a comment..." maxlength="300"/>
            <button class="btn btn-primary" id="submitComment">Send</button>
           </div>`
        : `<p style="color:var(--text3);font-size:0.88rem;text-align:center"><a href="login.html" class="link-accent">Log in</a> to comment.</p>`
      }
    </div>
  `;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  if (user) {
    const input  = document.getElementById('commentInput');
    const submit = document.getElementById('submitComment');
    submit.addEventListener('click', () => {
      const text = input.value.trim();
      if (!text) return;
      post.comments.push({ author: user.username, text, time: Date.now() });
      savePosts();
      openCommentModal(post); // refresh
    });
    input.addEventListener('keydown', e => { if (e.key === 'Enter') submit.click(); });
    input.focus();
  }
}

document.getElementById('closeCommentModal').addEventListener('click', () => {
  document.getElementById('commentModal').style.display = 'none';
  document.body.style.overflow = '';
  renderFeed();
});
document.getElementById('commentModal').addEventListener('click', e => {
  if (e.target === document.getElementById('commentModal')) {
    document.getElementById('commentModal').style.display = 'none';
    document.body.style.overflow = '';
    renderFeed();
  }
});

// ─── Helpers ──────────────────────────────────────────────────
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

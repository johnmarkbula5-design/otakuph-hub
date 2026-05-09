/* ============================================================
   OTAKUPH — upload.js
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const user      = getCurrentUser();
  const gate      = document.getElementById('uploadGate');
  const container = document.getElementById('uploadContainer');

  if (!user) {
    if (gate)      gate.style.display = 'flex';
    if (container) container.style.display = 'none';
    return;
  }

  if (gate)      gate.style.display = 'none';
  if (container) container.style.display = 'block';

  // Cover preview
  const coverInput   = document.getElementById('upCoverUrl');
  const coverPreview = document.getElementById('coverPreview');
  if (coverInput) {
    coverInput.addEventListener('input', () => {
      const url = coverInput.value.trim();
      if (url) {
        coverPreview.innerHTML = `<img src="${url}" alt="Cover" onerror="this.parentElement.innerHTML='<div class=\\'cover-placeholder\\'><span>❌</span><p>Image not found</p></div>'">`;
      } else {
        coverPreview.innerHTML = `<div class="cover-placeholder"><span>🎌</span><p>Cover preview</p></div>`;
      }
    });
  }

  // Desc char count
  const descArea  = document.getElementById('upDesc');
  const descCount = document.getElementById('descCount');
  if (descArea) {
    descArea.addEventListener('input', () => {
      descCount.textContent = descArea.value.length;
    });
  }

  // Submit
  const submitBtn    = document.getElementById('submitUploadBtn');
  const alertBox     = document.getElementById('uploadAlert');
  const successBox   = document.getElementById('uploadSuccess');

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const title    = document.getElementById('upTitle').value.trim();
      const desc     = document.getElementById('upDesc').value.trim();
      const genre    = document.getElementById('upGenre').value;
      const status   = document.getElementById('upStatus').value;
      const episodes = document.getElementById('upEpisodes').value;
      const year     = document.getElementById('upYear').value;
      const studio   = document.getElementById('upStudio').value.trim();
      const videoUrl = document.getElementById('upVideoUrl').value.trim();
      const cover    = document.getElementById('upCoverUrl').value.trim();
      const tagsRaw  = document.getElementById('upTags').value.trim();
      const rating   = document.getElementById('upRating').value;

      alertBox.style.display   = 'none';
      successBox.style.display = 'none';

      if (!title)    return showUploadAlert('Please enter an anime title.');
      if (!desc)     return showUploadAlert('Please add a description.');
      if (!genre)    return showUploadAlert('Please select a genre.');
      if (!videoUrl) return showUploadAlert('Please provide a video or embed URL.');

      const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];
      const emojis = { Action:'⚔️', Romance:'💕', Comedy:'😂', Horror:'💀', Fantasy:'✨', 'Sci-Fi':'🚀', 'Slice of Life':'☕', Sports:'⚽', Isekai:'🌀', Mecha:'🤖', Mystery:'🔍' };

      const newAnime = {
        id: Date.now(),
        title, desc, genre, status,
        episodes: parseInt(episodes) || 0,
        year: parseInt(year) || new Date().getFullYear(),
        studio, videoUrl, cover,
        tags, rating,
        emoji: emojis[genre] || '🎌',
        views: 0,
        rating: 0,
        uploader: user.username,
        uploadedAt: Date.now()
      };

      const uploads = getUserUploads();
      uploads.unshift(newAnime);
      saveUserUploads(uploads);

      successBox.style.display = 'block';
      submitBtn.disabled = true;
      submitBtn.textContent = '✅ Published!';

      // Reset form after 2s
      setTimeout(() => {
        document.getElementById('upTitle').value    = '';
        document.getElementById('upDesc').value     = '';
        document.getElementById('upGenre').value    = '';
        document.getElementById('upVideoUrl').value = '';
        document.getElementById('upCoverUrl').value = '';
        document.getElementById('upTags').value     = '';
        coverPreview.innerHTML = `<div class="cover-placeholder"><span>🎌</span><p>Cover preview</p></div>`;
        descCount.textContent = '0';
        submitBtn.disabled = false;
        submitBtn.textContent = '🚀 Publish Anime';
        successBox.style.display = 'none';
      }, 3000);
    });
  }

  function showUploadAlert(msg) {
    alertBox.textContent    = msg;
    alertBox.style.display  = 'block';
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});

/* ============================================================
   OTAKUPH — data.js  (Shared Data Store)
   ============================================================ */

'use strict';

// ─── Anime Library ────────────────────────────────────────────
const ANIME_DATA = [
  {
    id: 1, title: 'Attack on Titan', genre: 'Action', status: 'Completed',
    episodes: 87, year: 2013, studio: 'Wit Studio / MAPPA',
    rating: 9.0, views: 158000,
    desc: 'Humanity lives inside cities surrounded by enormous walls due to Titans – gigantic humanoid creatures who devour humans seemingly without reason.',
    cover: '', emoji: '⚔️',
    videoUrl: 'https://www.youtube.com/embed/MGRm4IzK1SQ',
    tags: ['shonen', 'dark', 'war'], uploader: 'OtakuPH_Admin'
  },
  {
    id: 2, title: 'Demon Slayer', genre: 'Action', status: 'Ongoing',
    episodes: 44, year: 2019, studio: 'ufotable',
    rating: 8.7, views: 142000,
    desc: 'A young boy becomes a demon slayer after his family is slaughtered and his sister is turned into a demon.',
    cover: '', emoji: '🌸',
    videoUrl: 'https://www.youtube.com/embed/VQGCKyvzIM4',
    tags: ['shonen', 'supernatural', 'swords'], uploader: 'OtakuPH_Admin'
  },
  {
    id: 3, title: 'Naruto Shippuden', genre: 'Action', status: 'Completed',
    episodes: 500, year: 2007, studio: 'Studio Pierrot',
    rating: 8.5, views: 200000,
    desc: 'Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage.',
    cover: '', emoji: '🍥',
    videoUrl: 'https://www.youtube.com/embed/YZUVSL6_5kQ',
    tags: ['shonen', 'ninja', 'classic'], uploader: 'OtakuPH_Admin'
  },
  {
    id: 4, title: 'Dragon Ball Z', genre: 'Action', status: 'Completed',
    episodes: 291, year: 1989, studio: 'Toei Animation',
    rating: 8.8, views: 220000,
    desc: 'The adventures of Goku and his friends as they battle increasingly powerful enemies to defend the Earth.',
    cover: '', emoji: '👊',
    videoUrl: 'https://www.youtube.com/embed/jM_9vxaTiyk',
    tags: ['classic', 'shonen', 'power'], uploader: 'OtakuPH_Admin'
  },
  {
    id: 5, title: 'One Piece', genre: 'Action', status: 'Ongoing',
    episodes: 1100, year: 1999, studio: 'Toei Animation',
    rating: 9.0, views: 230000,
    desc: 'Follows Monkey D. Luffy and his pirate crew in their search for the world\'s ultimate treasure.',
    cover: '', emoji: '🏴‍☠️',
    videoUrl: 'https://www.youtube.com/embed/S8_YwFLCh4U',
    tags: ['shonen', 'pirate', 'adventure'], uploader: 'OtakuPH_Admin'
  },
  {
    id: 6, title: 'Jujutsu Kaisen', genre: 'Action', status: 'Ongoing',
    episodes: 47, year: 2020, studio: 'MAPPA',
    rating: 8.6, views: 130000,
    desc: 'A boy swallows a cursed talisman – the finger of a demon – and becomes cursed himself. He enters a shaman school.',
    cover: '', emoji: '💀',
    videoUrl: 'https://www.youtube.com/embed/4A_X-Dvl0ws',
    tags: ['shonen', 'cursed', 'supernatural'], uploader: 'OtakuPH_Admin'
  },
  {
    id: 7, title: 'Your Lie in April', genre: 'Romance', status: 'Completed',
    episodes: 22, year: 2014, studio: 'A-1 Pictures',
    rating: 9.1, views: 88000,
    desc: 'A piano prodigy who lost his ability to hear the piano meets a free-spirited violinist who helps him return to music.',
    cover: '', emoji: '🎹',
    videoUrl: 'https://www.youtube.com/embed/uY0fNSdp05k',
    tags: ['music', 'drama', 'tears'], uploader: 'OtakuPH_Admin'
  },
  {
    id: 8, title: 'Sword Art Online', genre: 'Fantasy', status: 'Completed',
    episodes: 96, year: 2012, studio: 'A-1 Pictures',
    rating: 7.8, views: 115000,
    desc: 'In the near future, players become trapped in a virtual reality MMORPG where death in-game means real death.',
    cover: '', emoji: '⚔️',
    videoUrl: 'https://www.youtube.com/embed/6ohYYtxfDCg',
    tags: ['isekai', 'game', 'vr'], uploader: 'OtakuPH_Admin'
  },
  {
    id: 9, title: 'Fullmetal Alchemist: Brotherhood', genre: 'Fantasy', status: 'Completed',
    episodes: 64, year: 2009, studio: 'Bones',
    rating: 9.2, views: 180000,
    desc: 'Two brothers search for a Philosopher\'s Stone after an attempt to revive their dead mother goes wrong.',
    cover: '', emoji: '⚗️',
    videoUrl: 'https://www.youtube.com/embed/--IcmZkvL0Q',
    tags: ['shonen', 'alchemy', 'adventure'], uploader: 'OtakuPH_Admin'
  },
  {
    id: 10, title: 'Re:Zero', genre: 'Isekai', status: 'Ongoing',
    episodes: 50, year: 2016, studio: 'White Fox',
    rating: 8.4, views: 99000,
    desc: 'Suddenly transported to another world, Subaru discovers his only ability is to reset time upon death.',
    cover: '', emoji: '🔁',
    videoUrl: 'https://www.youtube.com/embed/PpE_ko6PMKA',
    tags: ['isekai', 'dark', 'time-loop'], uploader: 'OtakuPH_Admin'
  },
  {
    id: 11, title: 'Haikyuu!!', genre: 'Sports', status: 'Completed',
    episodes: 85, year: 2014, studio: 'Production I.G',
    rating: 8.7, views: 110000,
    desc: 'A high school volleyball player aiming to be the best despite his short height joins his school\'s volleyball team.',
    cover: '', emoji: '🏐',
    videoUrl: 'https://www.youtube.com/embed/zuTqECRbCdI',
    tags: ['sports', 'volleyball', 'teamwork'], uploader: 'OtakuPH_Admin'
  },
  {
    id: 12, title: 'Spy x Family', genre: 'Comedy', status: 'Ongoing',
    episodes: 37, year: 2022, studio: 'Wit Studio / CloverWorks',
    rating: 8.5, views: 95000,
    desc: 'A spy has to form a fake family with a telepathic girl and an assassin woman to complete his mission.',
    cover: '', emoji: '🕵️',
    videoUrl: 'https://www.youtube.com/embed/GHjzbzhwgtU',
    tags: ['comedy', 'family', 'spy'], uploader: 'OtakuPH_Admin'
  },
  {
    id: 13, title: 'Death Note', genre: 'Mystery', status: 'Completed',
    episodes: 37, year: 2006, studio: 'Madhouse',
    rating: 9.0, views: 175000,
    desc: 'A high school student discovers a supernatural notebook that allows him to kill anyone whose name he writes.',
    cover: '', emoji: '📓',
    videoUrl: 'https://www.youtube.com/embed/NlJZ-YgAt-c',
    tags: ['thriller', 'psychological', 'dark'], uploader: 'OtakuPH_Admin'
  },
  {
    id: 14, title: 'Steins;Gate', genre: 'Sci-Fi', status: 'Completed',
    episodes: 24, year: 2011, studio: 'White Fox',
    rating: 9.1, views: 89000,
    desc: 'A self-proclaimed mad scientist accidentally discovers time travel through a modified microwave.',
    cover: '', emoji: '⏱️',
    videoUrl: 'https://www.youtube.com/embed/ycXDEBHqFzM',
    tags: ['sci-fi', 'time-travel', 'thriller'], uploader: 'OtakuPH_Admin'
  },
  {
    id: 15, title: 'Chainsaw Man', genre: 'Action', status: 'Ongoing',
    episodes: 12, year: 2022, studio: 'MAPPA',
    rating: 8.4, views: 108000,
    desc: 'A young devil hunter merges with his devil dog to become the Chainsaw Man and hunts devils for a living.',
    cover: '', emoji: '🪚',
    videoUrl: 'https://www.youtube.com/embed/q4MHnjPkP1M',
    tags: ['dark', 'action', 'devil'], uploader: 'OtakuPH_Admin'
  },
  {
    id: 16, title: 'Violet Evergarden', genre: 'Slice of Life', status: 'Completed',
    episodes: 13, year: 2018, studio: 'Kyoto Animation',
    rating: 8.9, views: 72000,
    desc: 'A former soldier becomes an Auto Memory Doll to understand the words "I love you" left by the major she served.',
    cover: '', emoji: '✉️',
    videoUrl: 'https://www.youtube.com/embed/0CJeDetA45Q',
    tags: ['drama', 'war', 'emotional'], uploader: 'OtakuPH_Admin'
  }
];

// ─── Community Posts ───────────────────────────────────────────
let COMMUNITY_POSTS = JSON.parse(localStorage.getItem('otakuph_posts') || 'null') || [
  {
    id: 1001,
    author: 'SakuraChan_PH',
    text: 'GRABE ANG DEMON SLAYER SEASON 3!!! 🔥🔥 Ang ganda ng animation ni ufotable, sobrang overwhelming ng fight scenes! Sino pa nag-watch? #Discuss',
    tag: '#Discuss',
    time: Date.now() - 3600000,
    likes: 42,
    likedBy: [],
    comments: [
      { author: 'AnimeKing_Dagupan', text: 'Oo pre! Yung Upper Moon battles grabe talaga! 😭', time: Date.now() - 3000000 },
      { author: 'OtakuBabe_CDO', text: 'Nakaka-iiyak yung Tanjiro arc noh 🌸', time: Date.now() - 1800000 }
    ]
  },
  {
    id: 1002,
    author: 'NarutoFan_Iloilo',
    text: 'Top 5 Isekai na dapat nyo panoorin:\n1. Re:Zero\n2. Sword Art Online\n3. Overlord\n4. That Time I Got Reincarnated as a Slime\n5. Konosuba\n\nAno pa pwede idagdag? 🎌 #Recom',
    tag: '#Recom',
    time: Date.now() - 7200000,
    likes: 78,
    likedBy: [],
    comments: [
      { author: 'IsekaiLord_PH', text: 'Wala pa No Game No Life? Legit na legit yun!', time: Date.now() - 6000000 }
    ]
  },
  {
    id: 1003,
    author: 'MangaReader_Cebu',
    text: 'One Piece is honestly the greatest story ever told. 25 years of manga and Oda still delivers. The Egghead arc is insane! 🏴‍☠️ #Review',
    tag: '#Review',
    time: Date.now() - 14400000,
    likes: 95,
    likedBy: [],
    comments: []
  },
  {
    id: 1004,
    author: 'WeeabooKing_Manila',
    text: 'POV: You're watching Death Note at 2AM and your mom walks in while you're narrating how to write people\'s names 💀📓 #Meme',
    tag: '#Meme',
    time: Date.now() - 86400000,
    likes: 211,
    likedBy: [],
    comments: [
      { author: 'LightYagami_PH', text: 'HAHAHA ito na yung pinaka-relatable post dito 😂', time: Date.now() - 80000000 },
      { author: 'SakuraChan_PH', text: 'AHHH same!! My mom thought I became a murderer 😂😂', time: Date.now() - 70000000 }
    ]
  }
];

// Save posts helper
function savePosts() {
  localStorage.setItem('otakuph_posts', JSON.stringify(COMMUNITY_POSTS));
}

// ─── User Uploads (persisted) ─────────────────────────────────
function getUserUploads() {
  return JSON.parse(localStorage.getItem('otakuph_uploads') || '[]');
}
function saveUserUploads(list) {
  localStorage.setItem('otakuph_uploads', JSON.stringify(list));
}
function getAllAnime() {
  const uploads = getUserUploads();
  return [...ANIME_DATA, ...uploads];
}

// ─── Helpers ──────────────────────────────────────────────────
function timeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  return Math.floor(diff / 86400) + 'd ago';
}

function formatViews(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
  return n;
}

function genreColor(genre) {
  const map = {
    'Action': '#e63946', 'Romance': '#e91e8c', 'Comedy': '#f7b731',
    'Horror': '#6c3483', 'Fantasy': '#4361ee', 'Sci-Fi': '#00b4d8',
    'Slice of Life': '#2ecc71', 'Sports': '#f39c12', 'Isekai': '#9b59b6',
    'Mecha': '#1abc9c', 'Mystery': '#e74c3c'
  };
  return map[genre] || '#6060a0';
}

function makeAnimeCard(anime, onclick) {
  const card = document.createElement('div');
  card.className = 'anime-card';
  card.innerHTML = `
    <div class="anime-thumb">
      ${anime.cover
        ? `<img src="${anime.cover}" alt="${anime.title}" onerror="this.style.display='none'">`
        : ''}
      <span class="anime-thumb-emoji">${anime.emoji || '🎌'}</span>
      <span class="anime-badge badge-${anime.status === 'Ongoing' ? 'ongoing' : 'completed'}">${anime.status}</span>
    </div>
    <div class="anime-info">
      <div class="anime-title-card">${anime.title}</div>
      <div class="anime-meta">
        <span class="anime-genre-tag" style="border-color:${genreColor(anime.genre)}20;color:${genreColor(anime.genre)}">${anime.genre}</span>
        <span class="anime-rating">★ ${anime.rating.toFixed(1)}</span>
      </div>
    </div>
  `;
  if (onclick) card.addEventListener('click', onclick);
  return card;
}

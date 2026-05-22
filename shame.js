'use strict';
/* ═══════════════════════════════════════════════════════════════
   ДОСКА ПОЗОРА — shame.js
   ═══════════════════════════════════════════════════════════════ */

/* ── YEAR ─────────────────────────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── STAT COUNTERS ────────────────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1200;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.stat-card__value[data-count]').forEach(animateCounter);
      observer.disconnect();
    }
  });
}, { threshold: 0.3 });
const heroSection = document.querySelector('.hero');
if (heroSection) observer.observe(heroSection);

/* ── TOXICITY BARS ANIMATION ──────────────────────────────────── */
function animateBars() {
  document.querySelectorAll('.toxicity-bar__fill').forEach(bar => {
    const w = bar.style.getPropertyValue('--w');
    bar.style.setProperty('--w', '0%');
    setTimeout(() => bar.style.setProperty('--w', w), 200);
  });
  document.querySelectorAll('.top-bar-fill').forEach(bar => {
    const w = bar.style.getPropertyValue('--w');
    bar.style.setProperty('--w', '0%');
    setTimeout(() => bar.style.setProperty('--w', w), 300);
  });
}
window.addEventListener('load', animateBars);


/* ── FILTERS ──────────────────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.v-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const show = filter === 'all' || card.dataset.status === filter;
      card.style.display = show ? '' : 'none';
    });
  });
});

/* ── SORT ─────────────────────────────────────────────────────── */
const sortSelect = document.getElementById('sortSelect');
sortSelect && sortSelect.addEventListener('change', () => {
  const grid = document.getElementById('cardsGrid');
  const cardArr = Array.from(grid.querySelectorAll('.v-card'));
  cardArr.sort((a, b) => {
    if (sortSelect.value === 'toxic')   return parseInt(b.dataset.toxic) - parseInt(a.dataset.toxic);
    if (sortSelect.value === 'reports') return parseInt(b.dataset.reports) - parseInt(a.dataset.reports);
    return new Date(b.dataset.date) - new Date(a.dataset.date); // newest
  });
  cardArr.forEach(c => grid.appendChild(c));
});

/* ── LIGHTBOX ─────────────────────────────────────────────────── */
function openLightbox(src, title) {
  document.getElementById('lbImg').src = src;
  document.getElementById('lbTitle').textContent = title;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeLightbox(); closeAllModals(); }
});

/* ── MODALS ───────────────────────────────────────────────────── */
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
function closeAllModals() {
  document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}

document.getElementById('btnReport').addEventListener('click', () => openModal('reportModal'));
document.getElementById('btnModPanel') && document.getElementById('btnModPanel').addEventListener('click', () => openModal('modModal'));
document.getElementById('btnTop') && document.getElementById('btnTop').addEventListener('click', () => {
  document.getElementById('topViolators').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

/* ── REPORT MODAL OPEN FROM CARD ──────────────────────────────── */
function reportUser(btn) {
  const card = btn.closest('.v-card');
  const nick = card ? card.querySelector('.v-card__nick').textContent : '';
  const input = document.getElementById('reportNick');
  if (input) input.value = nick;
  openModal('reportModal');
}

/* ── DETAIL MODAL ─────────────────────────────────────────────── */
function openDetail(btn) {
  const card = btn.closest('.v-card');
  const nick = card ? card.querySelector('.v-card__nick').textContent : 'Пользователь';
  showToast(`Открытие дела: ${nick}`, 'success');
}

/* ── SUBMIT REPORT ────────────────────────────────────────────── */
function submitReport() {
  const nick = document.getElementById('reportNick').value.trim();
  const desc = document.getElementById('reportDesc').value.trim();
  if (!nick) {
    showToast('Укажите никнейм нарушителя', 'error'); return;
  }
  if (!desc) {
    showToast('Опишите нарушение', 'error'); return;
  }
  closeModal('reportModal');
  showToast(`✓ Жалоба на ${nick} отправлена. Рассмотрим в течение 24ч.`, 'success');
  // Add to live feed
  addFeedItem(nick, 'получил жалобу', 'red');
  document.getElementById('reportNick').value = '';
  document.getElementById('reportDesc').value = '';
}


/* ── TOAST ────────────────────────────────────────────────────── */
let toastTimer = null;
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast toast--show' + (type ? ' toast--' + type : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    t.classList.remove('toast--show');
  }, 3500);
}

/* ── LIVE FEED ────────────────────────────────────────────────── */
function addFeedItem(user, action, color) {
  const feed = document.getElementById('liveFeed');
  if (!feed) return;
  const now = new Date();
  const time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
  const item = document.createElement('div');
  item.className = 'feed-item';
  item.style.opacity = '0';
  item.style.transform = 'translateX(-10px)';
  item.style.transition = 'all 0.3s ease';
  item.innerHTML = `
    <span class="feed-item__time mono">${time}</span>
    <span class="feed-item__user feed-item__user--${color}">${user}</span>
    <span class="feed-item__action">${action}</span>
  `;
  feed.prepend(item);
  setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateX(0)'; }, 50);
  // Remove oldest if too many
  const items = feed.querySelectorAll('.feed-item');
  if (items.length > 8) items[items.length - 1].remove();
}

/* ── SIMULATED LIVE FEED ──────────────────────────────────────── */
const FAKE_USERS  = ['d4rk_lord', 'SKULL_X', 'pH4nt0m', 'cr4ck3r', 'voidzone', 'NEON_K1LL', 'z3r0_day'];
const FAKE_COLORS = ['red', 'orange', 'purple', 'red', 'orange'];
const FAKE_ACTS   = ['получил жалобу', 'добавлен в реестр', 'предупреждение', 'новое нарушение', 'жалоба подтверждена'];
let feedInterval = null;
function startFeedSim() {
  feedInterval = setInterval(() => {
    const u = FAKE_USERS[Math.floor(Math.random() * FAKE_USERS.length)];
    const c = FAKE_COLORS[Math.floor(Math.random() * FAKE_COLORS.length)];
    const a = FAKE_ACTS[Math.floor(Math.random() * FAKE_ACTS.length)];
    addFeedItem(u, a, c);
  }, 6000);
}
startFeedSim();

/* ── ONLINE COUNT SIMULATION ──────────────────────────────────── */
function jitter(n, d) { return n + Math.floor(Math.random() * d * 2) - d; }
setInterval(() => {
  const el = document.getElementById('onlineCount');
  if (el) el.textContent = jitter(247, 8);
}, 8000);

/* ── CHAT ─────────────────────────────────────────────────────── */
const chatNicks = ['Kr1pT0n','void_walker','cyber_mod','xXxGhost','echo_null','N3ON_RAT','ZER0_X'];
const chatColors = ['#ff3b5c','#a855f7','#4f8fff','#f97316','#22c55e','#ffd700','#4db8f0'];
const chatMsgs = [
  'ещё один токсик в реестре 💀',
  'добавьте кнопку экспорта',
  'знаю этого, реальный скамер',
  'когда обновление системы?',
  'хорошая работа мод-команды',
  'NULL_TOXIN стилерщик, будьте осторожны',
  'реестр реально помогает 🔥',
  'когда мобильная версия?',
  'кто-то знает этого персонажа?',
];

function addChatMsg(nick, color, text) {
  const box = document.getElementById('chatMessages');
  if (!box) return;
  const msg = document.createElement('div');
  msg.className = 'chat-msg';
  msg.style.opacity = '0';
  msg.style.transform = 'translateY(6px)';
  msg.style.transition = 'all 0.25s ease';
  msg.innerHTML = `<span class="chat-msg__nick" style="color:${color}">${nick}</span><span class="chat-msg__text">${text}</span>`;
  box.appendChild(msg);
  setTimeout(() => { msg.style.opacity = '1'; msg.style.transform = 'translateY(0)'; }, 50);
  box.scrollTop = box.scrollHeight;
  // Trim to 20 messages
  while (box.children.length > 20) box.removeChild(box.firstChild);
}

setInterval(() => {
  const i = Math.floor(Math.random() * chatNicks.length);
  const j = Math.floor(Math.random() * chatMsgs.length);
  addChatMsg(chatNicks[i], chatColors[i], chatMsgs[j]);
}, 9000);

document.getElementById('chatSend') && document.getElementById('chatSend').addEventListener('click', sendChat);
document.getElementById('chatInput') && document.getElementById('chatInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') sendChat();
});
function sendChat() {
  const inp = document.getElementById('chatInput');
  const txt = inp.value.trim();
  if (!txt) return;
  addChatMsg('Вы', '#e8ecf4', txt);
  inp.value = '';
}


/* ── CUSTOM CURSOR WITH RED TRAIL ─────────────────────────────── */
(function() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cursor = document.getElementById('custom-cursor');
  const canvas = document.getElementById('cursor-trail-canvas');
  if (!cursor || !canvas) return;
  const ctx = canvas.getContext('2d');

  let mouseX = -200, mouseY = -200;
  let cursorX = -200, cursorY = -200;
  let visible = false;
  const LERP = 0.22;
  const TRAIL = 20;
  const trail = [];

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    if (!visible) {
      visible = true;
      cursor.style.opacity = '1';
      cursorX = mouseX; cursorY = mouseY;
    }
  });
  document.addEventListener('mouseleave', () => {
    visible = false;
    cursor.style.opacity = '0';
  });
  window.addEventListener('resize', resize);
  resize();

  function tick() {
    cursorX += (mouseX - cursorX) * LERP;
    cursorY += (mouseY - cursorY) * LERP;
    cursor.style.transform = `translate3d(${cursorX}px,${cursorY}px,0)`;
    trail.push({ x: cursorX + 4, y: cursorY + 4 });
    if (trail.length > TRAIL) trail.shift();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (trail.length > 2 && visible) {
      for (let i = 1; i < trail.length; i++) {
        const t = i / trail.length;
        const prev = trail[i - 1], curr = trail[i];
        const speed = Math.hypot(curr.x - prev.x, curr.y - prev.y);
        const alpha = Math.min(1, speed * 0.1) * t * 0.65;
        if (alpha < 0.01) continue;
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(curr.x, curr.y);
        ctx.lineWidth = 1.2 + t * 2.5;
        ctx.strokeStyle = `rgba(255,59,92,${alpha})`;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

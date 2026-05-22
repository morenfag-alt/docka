'use strict';

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const CARDS_DATA = [
  {
    id: 1, nick: 'xX_Slayer_Xx', uid: '#00412', letter: 'X',
    avColor: '#ff3b6b', status: 'active',
    reason: 'п. 3.1 — массовый спам и флуд',
    desc: '<strong>Массовый спам в чате.</strong> Участник разместил 14 идентичных сообщений в общем чате за 3 минуты, засоряя канал и нарушая общение других участников.',
    toxic: 9, reports: 47, date: '12 мая 2026',
    moderator: 'AdminRoot', modRole: 'admin',
    discord: 'xX_Slayer_Xx#0001', telegram: null,
    img: 'screenshots/placeholder-1.svg',
  },
  {
    id: 2, nick: 'TrollMaster3000', uid: '#00389', letter: 'T',
    avColor: '#f0a500', status: 'warning',
    reason: 'п. 2.4 — провокация и оффтоп',
    desc: '<strong>Систематическая провокация.</strong> Повторное нарушение за 7 дней: намеренное уклонение от темы и разжигание конфликтов между участниками.',
    toxic: 7, reports: 23, date: '10 мая 2026',
    moderator: 'Mod_Alpha', modRole: 'mod',
    discord: 'TrollMaster#2244', telegram: '@trollmaster',
    img: 'screenshots/placeholder-3.svg',
  },
  {
    id: 3, nick: 'user_ghost_99', uid: '#00201', letter: 'U',
    avColor: '#8b5cf6', status: 'resolved',
    reason: 'п. 5.2 — запрещённый контент',
    desc: '<strong>Публикация запрещённых материалов.</strong> Участник разместил контент, нарушающий правила ресурса. Нарушение признано, санкция применена, дело закрыто.',
    toxic: 5, reports: 11, date: '28 апреля 2026',
    moderator: 'Mod_Alpha', modRole: 'mod',
    discord: null, telegram: '@ghost99',
    img: 'screenshots/placeholder-2.svg',
  },
  {
    id: 4, nick: 'DarkHexer', uid: '#00555', letter: 'D',
    avColor: '#4f8fff', status: 'active',
    reason: 'п. 4.3 — мошенничество',
    desc: '<strong>Мошенничество при обмене.</strong> Участник присвоил ценности другого пользователя при договорном обмене, игнорирует запросы о возврате.',
    toxic: 10, reports: 89, date: '15 мая 2026',
    moderator: 'AdminRoot', modRole: 'admin',
    discord: 'DarkHexer#6660', telegram: null,
    img: 'screenshots/placeholder-1.svg',
  },
  {
    id: 5, nick: 'n00b_destroyer', uid: '#00678', letter: 'N',
    avColor: '#0fba81', status: 'warning',
    reason: 'п. 1.1 — оскорбления и угрозы',
    desc: '<strong>Угрозы и оскорбления.</strong> Систематически оскорбляет новых участников сообщества, угрожает личными расправами в личных сообщениях.',
    toxic: 8, reports: 34, date: '8 мая 2026',
    moderator: 'Mod_Beta', modRole: 'mod',
    discord: 'n00b_destroyer#1337', telegram: '@noobdes',
    img: 'screenshots/placeholder-3.svg',
  },
  {
    id: 6, nick: 'ShadowNinja_X', uid: '#00101', letter: 'S',
    avColor: '#ff3b6b', status: 'resolved',
    reason: 'п. 2.1 — систематический оффтоп',
    desc: '<strong>Многократный оффтоп.</strong> Несмотря на предупреждения, продолжал засорять тематические каналы нерелевантными сообщениями. Дело закрыто после устного предупреждения.',
    toxic: 3, reports: 8, date: '2 апреля 2026',
    moderator: 'Mod_Alpha', modRole: 'mod',
    discord: null, telegram: '@shadowninja',
    img: 'screenshots/placeholder-2.svg',
  },
];

const CHAT_SEED = [
  { nick: 'Phantom_X', color: '#ff3b6b',  text: 'DarkHexer реально самый токсик лол' },
  { nick: 'gr1m_reaper', color: '#4f8fff', text: 'уже 89 жалоб на него, скоро перман' },
  { nick: 'void_walker', color: '#8b5cf6', text: 'xX_Slayer_Xx спамил у меня в дм 💀' },
  { nick: 'SysAdmin', color: '#0fba81',    text: 'обрабатываем все жалобы, спасибо за отчёты' },
  { nick: 'тролляшка', color: '#f0a500',   text: 'доска работает, жалобы принимаются 24/7' },
  { nick: 'Cipher_99', color: '#ff6b35',   text: 'наконец-то нормальная система модерации' },
  { nick: 'zero_cool', color: '#ff3b6b',   text: 'кто ещё видел TrollMaster в дс??' },
];

const FEED_SEED = [
  { nick: 'Phantom_X',   action: 'подал жалобу на',  target: 'DarkHexer',      time: '2 мин назад' },
  { nick: 'gr1m_reaper', action: 'пожаловался на',    target: 'xX_Slayer_Xx',   time: '5 мин назад' },
  { nick: 'void_walker', action: 'подал жалобу на',   target: 'TrollMaster3000',time: '9 мин назад' },
  { nick: 'Cipher_99',   action: 'пожаловался на',    target: 'n00b_destroyer', time: '14 мин назад' },
  { nick: 'zero_cool',   action: 'подал жалобу на',   target: 'DarkHexer',      time: '18 мин назад' },
  { nick: 'SysAdmin',    action: 'закрыл дело по',    target: 'ShadowNinja_X',  time: '32 мин назад' },
  { nick: 'тролляшка',   action: 'добавил запись на', target: 'user_ghost_99',  time: '1 ч назад' },
];

const NICK_COLORS = ['#ff3b6b','#4f8fff','#8b5cf6','#0fba81','#f0a500','#ff6b35','#00d4ff'];
const RANDOM_NICKS = ['Phantom_X','gr1m_reaper','void_walker','Cipher_99','zero_cool','NightCrawler','ByteBreaker','GlitchHunter','NeON_X','CyberRat'];
const RANDOM_ACTIONS = [
  'подал жалобу на','пожаловался на','сообщил о нарушении от','зафиксировал токсик от'
];

let allCards = [...CARDS_DATA];
let activeFilter = 'all';
let currentSearch = '';
let currentSort = 'date-desc';


/* ═══════════════════════════════════════════════
   UTILS
═══════════════════════════════════════════════ */
function toxColor(v) {
  if (v >= 9) return '#ff3b6b';
  if (v >= 7) return '#ff6b35';
  if (v >= 5) return '#f0a500';
  if (v >= 3) return '#8b5cf6';
  return '#0fba81';
}

function toxLabel(v) {
  if (v >= 9) return 'КРИТИЧЕСКАЯ';
  if (v >= 7) return 'ВЫСОКАЯ';
  if (v >= 5) return 'СРЕДНЯЯ';
  if (v >= 3) return 'НИЗКАЯ';
  return 'МИНИМАЛЬНАЯ';
}

function statusBadge(s) {
  if (s === 'active')   return '<span class="badge badge--active">● Активно</span>';
  if (s === 'warning')  return '<span class="badge badge--warning">⚠ Предупреждение</span>';
  if (s === 'resolved') return '<span class="badge badge--resolved">✓ Закрыто</span>';
  return '';
}

function modBadge(role) {
  const cls = role === 'admin' ? 'admin' : 'mod';
  const label = role === 'admin' ? 'Администратор' : 'Модератор';
  return `<span class="v-card__role-badge v-card__role-badge--${cls}">${label}</span>`;
}

const discordSvg = `<svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>`;
const telegramSvg = `<svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`;

function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast toast--${type} show`;
  setTimeout(() => t.className = 'toast', 3000);
}

function animateCount(el, target, duration = 900) {
  let start = 0, step = target / (duration / 16);
  const tick = () => {
    start = Math.min(start + step, target);
    el.textContent = Math.round(start);
    if (start < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}


/* ═══════════════════════════════════════════════
   RENDER CARD
═══════════════════════════════════════════════ */
function renderCard(c) {
  const toxPct = (c.toxic / 10) * 100;
  const tags = [
    c.discord  ? `<a class="tag tag--discord"  href="https://discord.com/users/0" target="_blank" rel="noopener">${discordSvg} ${c.discord}</a>`  : '',
    c.telegram ? `<a class="tag tag--telegram" href="https://t.me/${c.telegram.replace('@','')}" target="_blank" rel="noopener">${telegramSvg} ${c.telegram}</a>` : '',
  ].join('');

  return `
  <article class="v-card" data-status="${c.status}" data-id="${c.id}">
    <div class="v-card__shot" onclick="openLightbox('${c.img}','${c.nick}')">
      <img src="${c.img}" alt="Доказательство" loading="lazy">
      <div class="v-card__shot-overlay">
        <span class="v-card__shot-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="10" height="10"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
          Доказательство
        </span>
        <span class="v-card__zoom-hint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="10" height="10"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>
          Увеличить
        </span>
      </div>
    </div>
    <div class="v-card__body">
      <div class="v-card__header-row">
        ${statusBadge(c.status)}
        <span class="v-card__date">${c.date}</span>
      </div>
      <div class="v-card__section-label">Нарушитель</div>
      <div class="v-card__user">
        <div class="v-card__avatar" style="--av-color:${c.avColor}">${c.letter}</div>
        <div>
          <div class="v-card__nick">${c.nick}</div>
          <div class="v-card__uid">${c.uid}</div>
        </div>
      </div>
      <div class="v-card__tox">
        <span class="v-card__tox-label">ТОКСИЧНОСТЬ</span>
        <div class="v-card__tox-bar">
          <div class="v-card__tox-fill" style="width:${toxPct}%;background:${toxColor(c.toxic)}"></div>
        </div>
        <span class="v-card__tox-val" style="color:${toxColor(c.toxic)}">${c.toxic}/10</span>
      </div>
      ${tags ? `<div class="v-card__section-label">Контакты</div><div class="v-card__tags">${tags}</div>` : ''}
      <div class="v-card__section-label">Нарушение</div>
      <p class="v-card__desc">${c.desc}</p>
      <div class="v-card__meta">
        <span class="v-card__reports">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/></svg>
          ${c.reports} жалоб
        </span>
        <div class="v-card__actions">
          <button class="btn-card btn-card--detail" onclick="openDetail(${c.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="12" height="12"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            Подробнее
          </button>
          <button class="btn-card btn-card--report" onclick="openReport('${c.nick}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="12" height="12"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/></svg>
            Жалоба
          </button>
        </div>
      </div>
    </div>
  </article>`;
}


/* ═══════════════════════════════════════════════
   RENDER ALL CARDS
═══════════════════════════════════════════════ */
function getFilteredCards() {
  let list = allCards.filter(c => {
    if (activeFilter !== 'all' && c.status !== activeFilter) return false;
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      if (!c.nick.toLowerCase().includes(q) && !c.reason.toLowerCase().includes(q) && !c.desc.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  list.sort((a, b) => {
    if (currentSort === 'toxic-desc')   return b.toxic   - a.toxic;
    if (currentSort === 'reports-desc') return b.reports - a.reports;
    if (currentSort === 'date-asc')     return a.id - b.id;
    return b.id - a.id; // date-desc default
  });
  return list;
}

function renderCards() {
  const grid = document.getElementById('cardsGrid');
  const list = getFilteredCards();
  document.getElementById('cardsCount').textContent = `${list.length} записей`;
  if (!list.length) {
    grid.innerHTML = `<div class="empty-state"><div class="big">🔍</div>Ничего не найдено</div>`;
    return;
  }
  grid.innerHTML = list.map((c, i) => {
    const html = renderCard(c);
    // inject delay via regex to avoid re-DOM
    return html.replace('animation:fadeUp 0.5s ease both', `animation:fadeUp 0.5s ${i * 0.07}s ease both`);
  }).join('');
}

/* ═══════════════════════════════════════════════
   TOP TABLE
═══════════════════════════════════════════════ */
function renderTopTable() {
  const sorted = [...allCards].sort((a, b) => b.reports - a.reports).slice(0, 5);
  const body = document.getElementById('topTableBody');
  body.innerHTML = sorted.map((c, i) => {
    const toxPct = (c.toxic / 10) * 100;
    const rankClass = i < 3 ? `tr-rank--${i+1}` : '';
    const rankEmoji = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i+1}`;
    return `
    <div class="top-table-row">
      <span class="tr-rank ${rankClass}">${rankEmoji}</span>
      <div class="tr-player">
        <div class="tr-avatar" style="--av-color:${c.avColor};background:color-mix(in srgb,${c.avColor} 12%,var(--bg2));color:${c.avColor};border-color:color-mix(in srgb,${c.avColor} 30%,transparent)">${c.letter}</div>
        <div>
          <div class="tr-nick">${c.nick}</div>
          <div style="font-size:0.68rem;color:var(--text2)">${c.uid}</div>
        </div>
      </div>
      <div class="tr-tox">
        <div class="tox-bar"><div class="tox-fill" style="width:${toxPct}%;background:${toxColor(c.toxic)}"></div></div>
        <span class="tr-tox-num" style="color:${toxColor(c.toxic)}">${c.toxic}</span>
      </div>
      <span class="tr-reports">${c.reports}</span>
      ${statusBadge(c.status)}
    </div>`;
  }).join('');
}

/* ═══════════════════════════════════════════════
   HERO STATS
═══════════════════════════════════════════════ */
function renderHeroStats() {
  const total   = allCards.length;
  const active  = allCards.filter(c => c.status === 'active').length;
  const reports = allCards.reduce((s, c) => s + c.reports, 0);
  const warn    = allCards.filter(c => c.status === 'warning').length;
  animateCount(document.getElementById('totalCount'),  total, 800);
  animateCount(document.getElementById('activeCount'), active, 800);
  animateCount(document.getElementById('reportCount'), reports, 1200);
  animateCount(document.getElementById('warnCount'),   warn, 800);
}

/* ═══════════════════════════════════════════════
   TOXICITY CHART
═══════════════════════════════════════════════ */
function renderToxChart() {
  const sorted = [...allCards].sort((a,b) => b.toxic - a.toxic).slice(0, 6);
  const max = sorted[0]?.toxic || 10;
  document.getElementById('toxChart').innerHTML = sorted.map(c => `
    <div class="tox-row">
      <span class="tox-row-label">${c.nick}</span>
      <div class="tox-row-bar"><div class="tox-row-fill" style="width:${(c.toxic/max)*100}%;background:${toxColor(c.toxic)}"></div></div>
      <span class="tox-row-val" style="color:${toxColor(c.toxic)}">${c.toxic}</span>
    </div>`).join('');
}


/* ═══════════════════════════════════════════════
   LIVE FEED
═══════════════════════════════════════════════ */
function renderFeed() {
  const feed = document.getElementById('liveFeed');
  feed.innerHTML = FEED_SEED.map(f => `
    <div class="feed-item">
      <span class="feed-nick">${f.nick}</span>
      <span class="feed-action"> ${f.action} </span>
      <span class="feed-nick">${f.target}</span>
      <div class="feed-time">${f.time}</div>
    </div>`).join('');
}

function pushFeedItem() {
  const nick   = RANDOM_NICKS[Math.floor(Math.random() * RANDOM_NICKS.length)];
  const action = RANDOM_ACTIONS[Math.floor(Math.random() * RANDOM_ACTIONS.length)];
  const target = allCards[Math.floor(Math.random() * allCards.length)].nick;
  const feed = document.getElementById('liveFeed');
  const el = document.createElement('div');
  el.className = 'feed-item feed-item--new';
  el.innerHTML = `<span class="feed-nick">${nick}</span><span class="feed-action"> ${action} </span><span class="feed-nick">${target}</span><div class="feed-time">только что</div>`;
  feed.prepend(el);
  // Remove oldest if too many
  const items = feed.querySelectorAll('.feed-item');
  if (items.length > 10) items[items.length - 1].remove();
  // Remove --new class after animation
  setTimeout(() => el.classList.remove('feed-item--new'), 1200);

  // Also bump report count on the card
  const card = allCards.find(c => c.nick === target);
  if (card) {
    card.reports++;
    renderCards();
    renderTopTable();
  }
}

/* ═══════════════════════════════════════════════
   CHAT
═══════════════════════════════════════════════ */
let chatMsgs = [...CHAT_SEED];
let chatColorIndex = 0;

function renderChat() {
  const box = document.getElementById('chatMessages');
  box.innerHTML = chatMsgs.map(m => {
    const color = m.color || NICK_COLORS[chatColorIndex++ % NICK_COLORS.length];
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
    return `
    <div class="chat-msg">
      <div class="chat-msg-head">
        <span class="chat-msg-nick" style="color:${color}">${m.nick}</span>
        <span class="chat-msg-time">${time}</span>
      </div>
      <div class="chat-msg-text">${m.text}</div>
    </div>`;
  }).join('');
  box.scrollTop = box.scrollHeight;
}

function sendChatMsg(text) {
  if (!text.trim()) return;
  chatMsgs.push({ nick: 'Вы', color: '#4f8fff', text: text.trim() });
  renderChat();
}

function setupChat() {
  const input = document.getElementById('chatInput');
  const btn   = document.getElementById('chatSend');
  btn.addEventListener('click', () => {
    sendChatMsg(input.value);
    input.value = '';
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMsg(input.value);
      input.value = '';
    }
  });

  // Simulate random chat messages
  const botMsgs = [
    'ого DarkHexer 89 жалоб 💀','кто-то видел xX_Slayer_Xx сегодня?',
    'система модерации огонь','реально полезная доска',
    'TrollMaster опять активен','когда перманент дадут?',
    'топ система 🔥','уже 5 нарушителей поймали',
  ];
  setInterval(() => {
    const nick = RANDOM_NICKS[Math.floor(Math.random() * RANDOM_NICKS.length)];
    const color = NICK_COLORS[Math.floor(Math.random() * NICK_COLORS.length)];
    const text = botMsgs[Math.floor(Math.random() * botMsgs.length)];
    chatMsgs.push({ nick, color, text });
    if (chatMsgs.length > 50) chatMsgs.shift();
    renderChat();
    const online = 240 + Math.floor(Math.random() * 30);
    document.getElementById('chatOnline').textContent = `● ${online}`;
    document.getElementById('onlineCount').textContent = `${online} онлайн`;
  }, 6000);
}


/* ═══════════════════════════════════════════════
   MODALS
═══════════════════════════════════════════════ */
function openDetail(id) {
  const c = allCards.find(x => x.id === id);
  if (!c) return;
  document.getElementById('modalTitle').textContent = `${c.nick} — подробное дело`;

  const segs = Array.from({length:10}, (_,i) =>
    `<div class="md-tox-seg ${i < c.toxic ? 'lit' : ''}" style="${i < c.toxic ? `background:${toxColor(c.toxic)}` : ''}"></div>`
  ).join('');

  const tags = [
    c.discord  ? `<a class="tag tag--discord"  href="https://discord.com/users/0" target="_blank" rel="noopener">${discordSvg} ${c.discord}</a>`  : '',
    c.telegram ? `<a class="tag tag--telegram" href="https://t.me/${c.telegram.replace('@','')}" target="_blank" rel="noopener">${telegramSvg} ${c.telegram}</a>` : '',
  ].join('');

  document.getElementById('modalBody').innerHTML = `
  <div class="modal-detail">
    <div class="md-grid2">
      <div class="md-section">
        <div class="md-label">Нарушитель</div>
        <div class="md-user">
          <div class="md-avatar" style="background:color-mix(in srgb,${c.avColor} 12%,var(--bg2));color:${c.avColor};border-color:color-mix(in srgb,${c.avColor} 35%,transparent)">${c.letter}</div>
          <div>
            <div class="md-nick">${c.nick}</div>
            <div class="md-uid">${c.uid}</div>
          </div>
        </div>
      </div>
      <div class="md-section">
        <div class="md-label">Статус и дата</div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-top:4px">
          ${statusBadge(c.status)}
          <span style="font-size:0.82rem;color:var(--text2)">${c.date}</span>
          <span style="font-size:0.78rem;color:var(--text2)">Жалоб: <strong style="color:var(--accent);font-family:'Unbounded',sans-serif">${c.reports}</strong></span>
        </div>
      </div>
    </div>

    <div class="md-section">
      <div class="md-label">Уровень токсичности</div>
      <div class="md-tox-big">
        <div class="md-tox-number">${c.toxic}</div>
        <div class="md-tox-bars">
          <div class="md-tox-row">${segs}</div>
          <div class="md-tox-desc" style="color:${toxColor(c.toxic)}">${toxLabel(c.toxic)}</div>
        </div>
      </div>
    </div>

    <div class="md-section">
      <div class="md-label">Причина нарушения</div>
      <div class="md-box"><p class="md-text"><strong>${c.reason}</strong></p></div>
    </div>

    <div class="md-section">
      <div class="md-label">Подробное описание</div>
      <div class="md-box"><p class="md-text">${c.desc}</p></div>
    </div>

    ${tags ? `
    <div class="md-section">
      <div class="md-label">Контакты нарушителя</div>
      <div class="v-card__tags">${tags}</div>
    </div>` : ''}

    <div class="md-section">
      <div class="md-label">Выставил на доску</div>
      <div class="md-box" style="display:flex;align-items:center;gap:10px">
        <div class="v-card__avatar v-card__avatar--sm" style="--av-color:#4f8fff">${c.moderator[0]}</div>
        <div>
          <div style="font-weight:600;font-size:0.9rem;color:var(--text)">${c.moderator}</div>
          ${modBadge(c.modRole)}
        </div>
      </div>
    </div>

    <div class="md-section" style="margin-top:4px">
      <button class="rf-submit" style="width:100%" onclick="openReport('${c.nick}');closeModal('modalOverlay')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/></svg>
        Подать жалобу на ${c.nick}
      </button>
    </div>
  </div>`;

  document.getElementById('modalOverlay').classList.add('open');
}

function openReport(nick) {
  document.getElementById('reportNick').value = nick || '';
  document.getElementById('reportOverlay').classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

/* lightbox */
let lbOpen = false;
function openLightbox(src, title) {
  // simple full-screen image preview
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9000;display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(8px);animation:overlayIn 0.2s ease';
  overlay.innerHTML = `<img src="${src}" alt="${title}" style="max-width:92vw;max-height:90vh;object-fit:contain;border-radius:10px;border:1px solid rgba(255,59,107,0.2)">`;
  overlay.onclick = () => document.body.removeChild(overlay);
  document.body.appendChild(overlay);
}


/* ═══════════════════════════════════════════════
   ADD CARD
═══════════════════════════════════════════════ */
function setupAddCard() {
  const rangeEl = document.getElementById('addToxic');
  const valEl   = document.getElementById('addToxicVal');
  rangeEl.addEventListener('input', () => {
    valEl.textContent = rangeEl.value;
    valEl.style.color = toxColor(+rangeEl.value);
  });

  document.getElementById('addSubmit').addEventListener('click', () => {
    const nick   = document.getElementById('addNick').value.trim();
    const reason = document.getElementById('addReason').value.trim();
    const status = document.getElementById('addStatus').value;
    const toxic  = +document.getElementById('addToxic').value;
    if (!nick || !reason) { showToast('Заполните обязательные поля', 'error'); return; }

    const newCard = {
      id: Date.now(), nick, uid: `#${String(Math.floor(Math.random()*99999)).padStart(5,'0')}`,
      letter: nick[0].toUpperCase(), avColor: NICK_COLORS[Math.floor(Math.random()*NICK_COLORS.length)],
      status, reason, desc: `<strong>${reason}.</strong> Нарушение зафиксировано и добавлено на доску позора.`,
      toxic, reports: 0, date: new Date().toLocaleDateString('ru-RU', {day:'numeric',month:'long',year:'numeric'}),
      moderator: 'Вы', modRole: 'mod', discord: null, telegram: null,
      img: 'screenshots/placeholder-1.svg',
    };
    allCards.unshift(newCard);
    closeModal('addOverlay');
    renderCards(); renderTopTable(); renderHeroStats(); renderToxChart();
    document.getElementById('addNick').value = '';
    document.getElementById('addReason').value = '';
    document.getElementById('addToxic').value = 5;
    valEl.textContent = '5';
    showToast(`✓ Запись добавлена: ${nick}`, 'success');
  });
}

/* ═══════════════════════════════════════════════
   FILTERS & SEARCH & SORT
═══════════════════════════════════════════════ */
function setupFilters() {
  document.querySelectorAll('.pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderCards();
    });
  });

  document.getElementById('searchInput').addEventListener('input', e => {
    currentSearch = e.target.value;
    renderCards();
  });

  document.getElementById('sortSelect').addEventListener('change', e => {
    currentSort = e.target.value;
    renderCards();
  });
}

/* ═══════════════════════════════════════════════
   MODAL SETUP
═══════════════════════════════════════════════ */
function setupModals() {
  document.getElementById('modalClose').addEventListener('click',  () => closeModal('modalOverlay'));
  document.getElementById('reportClose').addEventListener('click', () => closeModal('reportOverlay'));
  document.getElementById('rfCancel').addEventListener('click',    () => closeModal('reportOverlay'));
  document.getElementById('addClose').addEventListener('click',    () => closeModal('addOverlay'));
  document.getElementById('addCancel').addEventListener('click',   () => closeModal('addOverlay'));
  document.getElementById('addCardBtn').addEventListener('click',  () => document.getElementById('addOverlay').classList.add('open'));

  // close on overlay click
  ['modalOverlay','reportOverlay','addOverlay'].forEach(id => {
    document.getElementById(id).addEventListener('click', e => {
      if (e.target.id === id) closeModal(id);
    });
  });

  // report submit
  document.getElementById('rfSubmit').addEventListener('click', () => {
    const nick = document.getElementById('reportNick').value.trim();
    const desc = document.getElementById('reportDesc').value.trim();
    if (!nick) { showToast('Укажите ник нарушителя', 'error'); return; }
    closeModal('reportOverlay');
    // increment reports on the card
    const c = allCards.find(x => x.nick === nick);
    if (c) { c.reports++; renderCards(); renderTopTable(); }
    // add to feed
    FEED_SEED.unshift({ nick: 'Вы', action: 'подали жалобу на', target: nick, time: 'только что' });
    renderFeed();
    document.getElementById('reportNick').value = '';
    document.getElementById('reportDesc').value = '';
    showToast('✓ Жалоба отправлена. Спасибо!', 'success');
  });
}


/* ═══════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════ */
function setupCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cursor = document.getElementById('custom-cursor');
  const canvas = document.getElementById('cursor-trail-canvas');
  if (!cursor || !canvas) return;
  const ctx = canvas.getContext('2d');

  let mx = -200, my = -200, cx = -200, cy = -200, visible = false;
  const trail = [];
  const TRAIL_LEN = 20;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width  = window.innerWidth  + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!visible) { visible = true; cursor.style.opacity = '1'; cx = mx; cy = my; }
  });
  document.addEventListener('mouseleave', () => { visible = false; cursor.style.opacity = '0'; });

  function hexToRgba(hex, a) {
    hex = hex.replace('#','');
    if (hex.length === 3) hex = hex.split('').map(c => c+c).join('');
    const n = parseInt(hex,16);
    return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;
  }

  function tick() {
    cx += (mx - cx) * 0.22;
    cy += (my - cy) * 0.22;
    cursor.style.transform = `translate3d(${cx}px,${cy}px,0)`;

    trail.push({ x: cx+4, y: cy+4 });
    if (trail.length > TRAIL_LEN) trail.shift();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (trail.length > 2 && visible) {
      const accent = '#ff3b6b';
      for (let i = 1; i < trail.length; i++) {
        const t = i / trail.length;
        const speed = Math.hypot(trail[i].x - trail[i-1].x, trail[i].y - trail[i-1].y);
        const alpha = Math.min(1, speed * 0.06) * t * 0.55;
        if (alpha < 0.01) continue;
        ctx.beginPath();
        ctx.moveTo(trail[i-1].x, trail[i-1].y);
        ctx.lineTo(trail[i].x, trail[i].y);
        ctx.lineWidth = 1 + t * 2.5;
        ctx.strokeStyle = hexToRgba(accent, alpha);
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ═══════════════════════════════════════════════
   THEME BUTTON
═══════════════════════════════════════════════ */
function setupThemeBtn() {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  function updateIcon() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.innerHTML = dark
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }
  updateIcon();
  btn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    updateIcon();
  });
}

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

  document.getElementById('year').textContent = new Date().getFullYear();

  renderHeroStats();
  renderTopTable();
  renderCards();
  renderFeed();
  renderChat();
  renderToxChart();
  setupChat();
  setupFilters();
  setupModals();
  setupAddCard();
  setupCursor();
  setupThemeBtn();

  // Realtime feed simulation
  setInterval(pushFeedItem, 8000);
});

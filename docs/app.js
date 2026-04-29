/* =========================================================
   XCEREBRO AGENTS — INTERACTIVE LAYER
   Search, filters, favorites, modal, copy, install tabs
   ========================================================= */

// State
const state = {
  agents: [],
  divisions: [],
  filteredAgents: [],
  activeDivision: 'all',
  searchQuery: '',
  favorites: new Set(JSON.parse(localStorage.getItem('xcerebro_favorites') || '[]')),
  showOnlyFavorites: false,
};

// Elements
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const els = {
  grid: $('#agents-grid'),
  search: $('#search'),
  chips: $('#filter-chips'),
  resultsCount: $('#results-count'),
  clearFilters: $('#clear-filters'),
  emptyState: $('#empty-state'),
  emptyClear: $('#empty-clear'),
  favoritesBtn: $('#favorites-btn'),
  favCount: $('#fav-count'),
  divisionsGrid: $('#divisions-grid'),
  installCode: $('#install-code'),
  installTabs: $$('.install-tab'),
  modal: $('#agent-modal'),
  modalContent: $('#modal-content'),
  toast: $('#toast'),
};

// =========================================================
// BOOT
// =========================================================
async function init() {
  try {
    const res = await fetch('agents.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    state.agents = data.agents;
    state.divisions = data.divisions;
  } catch (err) {
    console.error('Failed to load agents.json', err);
    els.grid.innerHTML = `<div class="empty-state">
      <div class="empty-icon">⚠</div>
      <h3>Could not load agents</h3>
      <p>Make sure <code>agents.json</code> is alongside this page. ${err.message}</p>
    </div>`;
    return;
  }

  renderDivisions();
  renderDivisionChips();
  applyFilters();
  updateFavCount();
  bindEvents();
}

// =========================================================
// RENDERING
// =========================================================
function renderDivisionChips() {
  // The "All" chip is in HTML; append division chips
  const fragments = state.divisions.map(d => `
    <button class="chip" data-division="${d.id}" role="tab" aria-selected="false">
      <span>${d.icon} ${d.name}</span>
      <span class="chip-count">${d.count}</span>
    </button>
  `).join('');
  els.chips.insertAdjacentHTML('beforeend', fragments);
}

function renderDivisions() {
  els.divisionsGrid.innerHTML = state.divisions.map(d => `
    <button class="division-card" data-division-jump="${d.id}">
      <div class="division-icon">${d.icon}</div>
      <div class="division-meta">
        <div class="division-name">${d.name}</div>
        <div class="division-tagline">${d.tagline}</div>
      </div>
      <span class="division-count">${d.count}</span>
    </button>
  `).join('');
}

function applyFilters() {
  let result = state.agents;

  // Favorites filter
  if (state.showOnlyFavorites) {
    result = result.filter(a => state.favorites.has(a.id));
  }

  // Division filter
  if (state.activeDivision !== 'all') {
    result = result.filter(a => a.division === state.activeDivision);
  }

  // Search filter
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    result = result.filter(a => {
      const haystack = [
        a.name,
        a.division_name,
        a.who,
        a.vibe || '',
        ...(a.what || []),
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }

  state.filteredAgents = result;
  renderGrid();
  updateMeta();
}

function renderGrid() {
  if (state.filteredAgents.length === 0) {
    els.grid.innerHTML = '';
    els.emptyState.hidden = false;
    return;
  }
  els.emptyState.hidden = true;

  const html = state.filteredAgents.map((a, i) => `
    <article class="agent-card" data-agent="${a.id}" tabindex="0" role="button"
             aria-label="View ${a.name}" style="animation-delay:${Math.min(i * 12, 240)}ms">
      <button class="agent-fav-btn" data-fav="${a.id}"
              aria-label="${state.favorites.has(a.id) ? 'Remove from' : 'Add to'} favorites"
              data-favorited="${state.favorites.has(a.id)}">
        ${favIconSvg(state.favorites.has(a.id))}
      </button>
      <div class="agent-card-head">
        <div class="agent-emoji">${a.emoji}</div>
        <div class="agent-name-block">
          <h3 class="agent-name">${escapeHtml(a.name)}</h3>
          <div class="agent-division-tag">${escapeHtml(a.division_name)}</div>
        </div>
      </div>
      <p class="agent-vibe">${escapeHtml(truncate(a.vibe || a.who, 140))}</p>
      <div class="agent-card-foot">
        <span></span>
        <span class="agent-cta">View →</span>
      </div>
    </article>
  `).join('');

  els.grid.innerHTML = html;
}

function updateMeta() {
  const total = state.agents.length;
  const shown = state.filteredAgents.length;
  let msg;

  if (state.showOnlyFavorites) {
    msg = shown === 1 ? `1 favorite` : `${shown} favorite${shown === 0 ? 's — pick some agents to save here' : 's'}`;
  } else if (state.searchQuery || state.activeDivision !== 'all') {
    msg = `Showing ${shown} of ${total} agents`;
  } else {
    msg = `Showing all ${total} agents`;
  }

  els.resultsCount.textContent = msg;
  const hasFilters = state.searchQuery || state.activeDivision !== 'all' || state.showOnlyFavorites;
  els.clearFilters.hidden = !hasFilters;
}

function updateFavCount() {
  const n = state.favorites.size;
  els.favCount.textContent = n;
  els.favCount.dataset.zero = n === 0 ? 'true' : 'false';
}

// =========================================================
// MODAL
// =========================================================
function openModal(agentId) {
  const a = state.agents.find(x => x.id === agentId);
  if (!a) return;

  els.modalContent.innerHTML = `
    <div class="modal-head">
      <div class="modal-emoji">${a.emoji}</div>
      <div class="modal-titles">
        <h2 class="modal-title" id="modal-title">${escapeHtml(a.name)}</h2>
        <div class="modal-subtitle">${escapeHtml(a.division_name)}${a.subdivision ? ` · ${escapeHtml(a.subdivision)}` : ''}</div>
      </div>
    </div>

    <div class="modal-section">
      <h4>Who they are</h4>
      <p>${escapeHtml(a.who)}</p>
      ${a.vibe && a.vibe !== a.who ? `<p style="margin-top:8px;font-style:italic;color:var(--text-muted)">${escapeHtml(a.vibe)}</p>` : ''}
    </div>

    ${a.what && a.what.length ? `
    <div class="modal-section">
      <h4>What they do</h4>
      <ul>${a.what.map(w => `<li>${escapeHtml(stripMd(w))}</li>`).join('')}</ul>
    </div>` : ''}

    ${a.non_negotiables && a.non_negotiables.length ? `
    <div class="modal-section">
      <h4>Non-negotiables</h4>
      <ul>${a.non_negotiables.map(r => `<li>${escapeHtml(stripMd(r))}</li>`).join('')}</ul>
    </div>` : ''}

    <div class="modal-section">
      <h4>When to call this agent</h4>
      <p>${escapeHtml(a.when)}</p>
    </div>

    <div class="modal-section">
      <h4>Sample prompts — click to copy</h4>
      <div class="modal-prompts">
        ${a.prompts.map((p, i) => `
          <button class="modal-prompt" data-copy-prompt="${i}" type="button">
            ${escapeHtml(p)}
            <span class="modal-prompt-copy" aria-label="Copy prompt">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </span>
          </button>
        `).join('')}
      </div>
    </div>

    ${a.pairings && a.pairings.length ? `
    <div class="modal-section">
      <h4>Pairs well with</h4>
      <div class="modal-pairings">
        ${a.pairings.map(p => {
          const pair = state.agents.find(x => x.name === p);
          return pair
            ? `<button class="pairing-chip" data-jump="${pair.id}">${escapeHtml(p)}</button>`
            : `<span class="pairing-chip" style="cursor:default">${escapeHtml(p)}</span>`;
        }).join('')}
      </div>
    </div>` : ''}

    ${a.metrics && a.metrics.length ? `
    <div class="modal-section">
      <h4>Success looks like</h4>
      <ul>${a.metrics.map(m => `<li>${escapeHtml(stripMd(m))}</li>`).join('')}</ul>
    </div>` : ''}

    <div class="modal-section">
      <div class="modal-activate-label">Activation phrase</div>
      <div class="modal-activate"><span class="activate-text">Activate ${escapeHtml(a.name)}</span> and [your specific request].</div>
    </div>
  `;

  // Wire up prompt copy buttons
  els.modalContent.querySelectorAll('[data-copy-prompt]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.copyPrompt, 10);
      copyText(a.prompts[idx]);
      const copyEl = btn.querySelector('.modal-prompt-copy');
      if (copyEl) {
        copyEl.dataset.copied = 'true';
        copyEl.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
        setTimeout(() => {
          copyEl.dataset.copied = 'false';
          copyEl.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
        }, 1500);
      }
      showToast('Prompt copied');
    });
  });

  // Wire up pairing jumps
  els.modalContent.querySelectorAll('[data-jump]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.jump));
  });

  els.modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Focus management
  setTimeout(() => $('.modal-close')?.focus(), 50);
}

function closeModal() {
  els.modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// =========================================================
// FAVORITES
// =========================================================
function toggleFavorite(agentId) {
  if (state.favorites.has(agentId)) {
    state.favorites.delete(agentId);
    showToast('Removed from favorites');
  } else {
    state.favorites.add(agentId);
    showToast('Added to favorites');
  }
  localStorage.setItem('xcerebro_favorites', JSON.stringify([...state.favorites]));
  updateFavCount();
  // Re-render so the star reflects state
  applyFilters();
}

// =========================================================
// CLIPBOARD
// =========================================================
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch {}
    document.body.removeChild(ta);
    return true;
  }
}

let toastTimer;
function showToast(msg) {
  els.toast.textContent = msg;
  els.toast.dataset.show = 'true';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    els.toast.dataset.show = 'false';
  }, 1800);
}

// =========================================================
// INSTALL TABS
// =========================================================
const INSTALL_COMMANDS = {
  'claude-code': `<span class="cmt"># 1. Clone the repo</span>
git clone https://github.com/Deftones420x/Xcerebro-Agents.git
cd Xcerebro-Agents

<span class="cmt"># 2. Make scripts executable (macOS)</span>
chmod +x scripts/*.sh

<span class="cmt"># 3. Install for Claude Code</span>
./scripts/install.sh --tool claude-code`,
  'cursor': `<span class="cmt"># 1. Clone</span>
git clone https://github.com/Deftones420x/Xcerebro-Agents.git
cd Xcerebro-Agents

<span class="cmt"># 2. Make scripts executable</span>
chmod +x scripts/*.sh

<span class="cmt"># 3. Install for Cursor (run from your project directory)</span>
cd /path/to/your/project
/path/to/Xcerebro-Agents/scripts/install.sh --tool cursor`,
  'copilot': `<span class="cmt"># 1. Clone</span>
git clone https://github.com/Deftones420x/Xcerebro-Agents.git
cd Xcerebro-Agents

<span class="cmt"># 2. Make scripts executable</span>
chmod +x scripts/*.sh

<span class="cmt"># 3. Install for GitHub Copilot</span>
./scripts/install.sh --tool copilot`,
  'aider': `<span class="cmt"># 1. Clone</span>
git clone https://github.com/Deftones420x/Xcerebro-Agents.git
cd Xcerebro-Agents

<span class="cmt"># 2. Convert + install (project-scoped)</span>
chmod +x scripts/*.sh
./scripts/convert.sh --tool aider
cd /path/to/your/project
/path/to/Xcerebro-Agents/scripts/install.sh --tool aider`,
  'windsurf': `<span class="cmt"># 1. Clone</span>
git clone https://github.com/Deftones420x/Xcerebro-Agents.git
cd Xcerebro-Agents

<span class="cmt"># 2. Convert + install (project-scoped)</span>
chmod +x scripts/*.sh
./scripts/convert.sh --tool windsurf
cd /path/to/your/project
/path/to/Xcerebro-Agents/scripts/install.sh --tool windsurf`,
};

const INSTALL_PLAIN = {
  'claude-code': `git clone https://github.com/Deftones420x/Xcerebro-Agents.git
cd Xcerebro-Agents
chmod +x scripts/*.sh
./scripts/install.sh --tool claude-code`,
  'cursor': `git clone https://github.com/Deftones420x/Xcerebro-Agents.git
cd Xcerebro-Agents
chmod +x scripts/*.sh
cd /path/to/your/project
/path/to/Xcerebro-Agents/scripts/install.sh --tool cursor`,
  'copilot': `git clone https://github.com/Deftones420x/Xcerebro-Agents.git
cd Xcerebro-Agents
chmod +x scripts/*.sh
./scripts/install.sh --tool copilot`,
  'aider': `git clone https://github.com/Deftones420x/Xcerebro-Agents.git
cd Xcerebro-Agents
chmod +x scripts/*.sh
./scripts/convert.sh --tool aider
cd /path/to/your/project
/path/to/Xcerebro-Agents/scripts/install.sh --tool aider`,
  'windsurf': `git clone https://github.com/Deftones420x/Xcerebro-Agents.git
cd Xcerebro-Agents
chmod +x scripts/*.sh
./scripts/convert.sh --tool windsurf
cd /path/to/your/project
/path/to/Xcerebro-Agents/scripts/install.sh --tool windsurf`,
};

let activeInstall = 'claude-code';

function setInstallTab(tool) {
  activeInstall = tool;
  els.installTabs.forEach(t => {
    const isActive = t.dataset.tool === tool;
    t.classList.toggle('install-tab-active', isActive);
    t.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
  els.installCode.innerHTML = `<code>${INSTALL_COMMANDS[tool]}</code>`;
}

// =========================================================
// EVENT BINDING
// =========================================================
function bindEvents() {
  // Search with debounce
  let searchTimer;
  els.search.addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.searchQuery = e.target.value.trim();
      // Disable favorites-only mode when user starts typing
      if (state.searchQuery && state.showOnlyFavorites) {
        state.showOnlyFavorites = false;
        els.favoritesBtn.classList.remove('chip-active');
      }
      applyFilters();
    }, 120);
  });

  // "/" hotkey to focus search
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
      e.preventDefault();
      els.search.focus();
    }
    if (e.key === 'Escape') {
      if (els.modal.getAttribute('aria-hidden') === 'false') closeModal();
    }
  });

  // Division chips
  els.chips.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    state.activeDivision = chip.dataset.division;
    state.showOnlyFavorites = false;
    els.favoritesBtn.classList.remove('chip-active');
    els.chips.querySelectorAll('.chip').forEach(c => {
      c.classList.toggle('chip-active', c === chip);
      c.setAttribute('aria-selected', c === chip ? 'true' : 'false');
    });
    applyFilters();
  });

  // Division card jumps
  els.divisionsGrid.addEventListener('click', e => {
    const card = e.target.closest('[data-division-jump]');
    if (!card) return;
    const div = card.dataset.divisionJump;
    state.activeDivision = div;
    state.showOnlyFavorites = false;
    els.favoritesBtn.classList.remove('chip-active');
    els.chips.querySelectorAll('.chip').forEach(c => {
      const isMatch = c.dataset.division === div;
      c.classList.toggle('chip-active', isMatch);
      c.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });
    applyFilters();
    document.getElementById('agents').scrollIntoView({ behavior: 'smooth' });
  });

  // Favorites button (top nav)
  els.favoritesBtn.addEventListener('click', () => {
    state.showOnlyFavorites = !state.showOnlyFavorites;
    els.favoritesBtn.classList.toggle('chip-active', state.showOnlyFavorites);
    if (state.showOnlyFavorites) {
      // Reset search & division when entering favorites view
      state.searchQuery = '';
      els.search.value = '';
      state.activeDivision = 'all';
      els.chips.querySelectorAll('.chip').forEach(c => {
        const isAll = c.dataset.division === 'all';
        c.classList.toggle('chip-active', isAll);
        c.setAttribute('aria-selected', isAll ? 'true' : 'false');
      });
    }
    applyFilters();
    document.getElementById('agents').scrollIntoView({ behavior: 'smooth' });
  });

  // Clear filters
  function clearAll() {
    state.searchQuery = '';
    state.activeDivision = 'all';
    state.showOnlyFavorites = false;
    els.search.value = '';
    els.favoritesBtn.classList.remove('chip-active');
    els.chips.querySelectorAll('.chip').forEach(c => {
      const isAll = c.dataset.division === 'all';
      c.classList.toggle('chip-active', isAll);
      c.setAttribute('aria-selected', isAll ? 'true' : 'false');
    });
    applyFilters();
  }
  els.clearFilters.addEventListener('click', clearAll);
  els.emptyClear.addEventListener('click', clearAll);

  // Card clicks (event delegation)
  els.grid.addEventListener('click', e => {
    const fav = e.target.closest('[data-fav]');
    if (fav) {
      e.stopPropagation();
      toggleFavorite(fav.dataset.fav);
      return;
    }
    const card = e.target.closest('[data-agent]');
    if (card) openModal(card.dataset.agent);
  });

  // Card keyboard accessibility
  els.grid.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('[data-agent]');
    if (card) {
      e.preventDefault();
      openModal(card.dataset.agent);
    }
  });

  // Modal close
  $$('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));

  // Install tabs
  els.installTabs.forEach(t => {
    t.addEventListener('click', () => setInstallTab(t.dataset.tool));
  });

  // Copy install command
  $('[data-copy-code]').addEventListener('click', async () => {
    await copyText(INSTALL_PLAIN[activeInstall]);
    showToast('Install commands copied');
  });
}

// =========================================================
// HELPERS
// =========================================================
function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function stripMd(str) {
  if (!str) return '';
  return String(str)
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/`/g, '')
    .replace(/\\\*/g, '*')
    .trim();
}

function truncate(str, n) {
  if (!str) return '';
  if (str.length <= n) return str;
  return str.slice(0, n).replace(/\s+\S*$/, '') + '…';
}

function favIconSvg(filled) {
  return filled
    ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
}

// Boot
init();

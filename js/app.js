/* ==========================================
   app.js — State Machine, UI Rendering, Event Handling
   ========================================== */

'use strict';

/* ─── App State ─── */
const PLAID_WORKER_URL = 'https://benefitmaxxer-plaid.benefitmaxxer.workers.dev';

const state = {
  step: 1,
  selectedCardIds: new Set(),
  issuerFilter: 'All',
  searchQuery: '',
  parsedCSVs: [],        // [{ bankName, filename, transactions, dateRange, topCategories }, ...]
  overlaps: [],          // output of detectOverlaps()
  recommendations: [],   // output of generateRecommendations()
  manualBenefits: {},    // { "cardId::benefitName": true } — user-claimed non-trackable benefits
  benefitYear: new Date().getFullYear(),
  cardResults: null,     // output of correlateBenefits()
  summary: null,
  plaid: {
    connected: false,
    transactions: null,  // normalized transactions from Plaid — held in memory only
  },
};

/* ─── DOM refs ─── */
const $ = id => document.getElementById(id);

/* ─────────────────────────────────────────────
   STEP NAVIGATION
───────────────────────────────────────────── */
function goToStep(n) {
  state.step = n;
  document.querySelectorAll('.wizard-panel').forEach((el, i) => {
    el.classList.toggle('active', i + 1 === n);
  });
  // Update nav indicators
  for (let i = 1; i <= 3; i++) {
    const el = $(`nav-step-${i}`);
    el.classList.remove('active', 'done');
    if (i === n) el.classList.add('active');
    else if (i < n) el.classList.add('done');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─────────────────────────────────────────────
   STEP 1 — CARD SELECTION
───────────────────────────────────────────── */
/* ─────────────────────────────────────────────
   PLAID INTEGRATION
───────────────────────────────────────────── */
function initPlaid() {
  $('plaid-connect-btn').addEventListener('click', startPlaidConnect);
  $('plaid-step2-connect-btn').addEventListener('click', startPlaidConnect);
  $('plaid-disconnect-btn').addEventListener('click', disconnectPlaid);
  $('plaid-reimport-btn').addEventListener('click', startPlaidConnect);
}

function startPlaidConnect() {
  const btn = document.activeElement;
  if (btn) btn.disabled = true;

  plaidConnect(
    PLAID_WORKER_URL,
    state.benefitYear,
    ({ accounts, transactions }) => {
      // Normalize dates (Plaid returns strings)
      state.plaid.transactions = transactions.map(t => ({
        ...t,
        date: new Date(t.date + 'T00:00:00'),
      }));
      state.plaid.connected = true;
      onPlaidConnected(accounts);
      if (btn) btn.disabled = false;
    },
    (errMsg) => {
      alert(`Plaid connection failed: ${errMsg}`);
      if (btn) btn.disabled = false;
    }
  );
}

function onPlaidConnected(accounts) {
  // Auto-select matched cards
  const matchedIds = plaidMatchCards(accounts);
  for (const id of matchedIds) state.selectedCardIds.add(id);
  renderCardGrid();
  updateStep1Bar();

  // Update Step 1 UI
  $('plaid-banner').style.display = 'none';
  $('plaid-connected-bar').style.display = 'flex';
  const label = matchedIds.length > 0
    ? `Plaid connected — ${matchedIds.length} card${matchedIds.length !== 1 ? 's' : ''} auto-selected`
    : `Plaid connected — ${accounts.length} account${accounts.length !== 1 ? 's' : ''} found, select cards manually`;
  $('plaid-connected-label').textContent = label;

  // Update Step 2 UI
  $('plaid-step2-prompt').style.display = 'none';
  $('plaid-import-panel').style.display = 'block';
  const count = state.plaid.transactions.length;
  $('plaid-import-summary').textContent =
    `${count.toLocaleString()} transactions imported for ${state.benefitYear}.`;

  // Plaid transactions are enough to proceed — enable Analyze
  $('step2-next').disabled = false;
}

function disconnectPlaid() {
  state.plaid.connected    = false;
  state.plaid.transactions = null;
  $('plaid-banner').style.display = 'flex';
  $('plaid-connected-bar').style.display = 'none';
  $('plaid-import-panel').style.display = 'none';
  $('plaid-step2-prompt').style.display = 'none';
  $('step2-next').disabled = state.parsedCSVs.length === 0;
}

function initStep1() {
  renderIssuerFilters();
  renderCardGrid();
  updateStep1Bar();

  // Single persistent delegated listener — no re-render on every click
  $('card-grid').addEventListener('click', e => {
    const tile = e.target.closest('.card-tile');
    if (!tile) return;
    const id = tile.dataset.cardId;
    if (state.selectedCardIds.has(id)) {
      state.selectedCardIds.delete(id);
    } else {
      state.selectedCardIds.add(id);
    }
    const selected = state.selectedCardIds.has(id);
    tile.classList.toggle('selected', selected);
    tile.querySelector('.card-check').style.display = selected ? 'flex' : 'none';
    updateStep1Bar();
  });

  $('card-search').addEventListener('input', e => {
    state.searchQuery = e.target.value.toLowerCase();
    renderCardGrid();
  });

  $('step1-next').addEventListener('click', () => {
    if (state.selectedCardIds.size > 0) {
      goToStep(2);
    }
  });

  $('clear-selection').addEventListener('click', () => {
    state.selectedCardIds.clear();
    // Clear selected state visually without a full re-render
    $('card-grid').querySelectorAll('.card-tile.selected').forEach(tile => {
      tile.classList.remove('selected');
      tile.querySelector('.card-check').style.display = 'none';
    });
    updateStep1Bar();
  });
}

function renderIssuerFilters() {
  const container = $('issuer-filters');
  const issuers = ['All', ...ISSUERS];
  container.innerHTML = issuers.map(issuer => `
    <button class="issuer-btn ${issuer === state.issuerFilter ? 'active' : ''}"
            data-issuer="${issuer}">${issuer}</button>
  `).join('');

  container.addEventListener('click', e => {
    const btn = e.target.closest('.issuer-btn');
    if (!btn) return;
    state.issuerFilter = btn.dataset.issuer;
    container.querySelectorAll('.issuer-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.issuer === state.issuerFilter)
    );
    renderCardGrid();
  });
}

function renderCardGrid() {
  const grid = $('card-grid');
  let cards = CARDS;

  // Filter by issuer
  if (state.issuerFilter !== 'All') {
    cards = cards.filter(c => c.issuer === state.issuerFilter);
  }
  // Filter by search query
  if (state.searchQuery) {
    const q = state.searchQuery;
    cards = cards.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.issuer.toLowerCase().includes(q) ||
      c.network.toLowerCase().includes(q)
    );
  }
  // Sort: popular first, then alphabetical
  cards = [...cards].sort((a, b) => {
    if (b.popular !== a.popular) return b.popular ? 1 : -1;
    return a.name.localeCompare(b.name);
  });

  if (cards.length === 0) {
    grid.innerHTML = '<p class="no-cards-msg">No cards match your search.</p>';
    return;
  }

  grid.innerHTML = cards.map(card => {
    const selected = state.selectedCardIds.has(card.id);
    const trackableBenefits = card.benefits.filter(b => b.trackable).length;
    const feeStr = card.annualFee === 0 ? 'No annual fee' : `$${card.annualFee}/yr`;
    return `
      <div class="card-tile ${selected ? 'selected' : ''}" data-card-id="${card.id}">
        <div class="card-tile-accent" style="background:${card.color}"></div>
        <div class="card-check" style="display:${selected ? 'flex' : 'none'}">&#10003;</div>
        <div class="card-issuer">${card.issuer}</div>
        <div class="card-name">${card.name}</div>
        <div class="card-meta">
          <span class="card-fee">${feeStr}</span>
          <span class="card-benefit-count">${trackableBenefits} trackable benefit${trackableBenefits !== 1 ? 's' : ''}</span>
        </div>
        ${card.popular ? '<div class="popular-badge">Popular</div>' : ''}
      </div>
    `;
  }).join('');
  // Listener lives on #card-grid permanently (attached once in initStep1)
}

function updateStep1Bar() {
  const n = state.selectedCardIds.size;
  const btn = $('step1-next');
  btn.disabled = n === 0;
  btn.textContent = n === 0 ? 'Continue →' : `Continue with ${n} card${n > 1 ? 's' : ''} →`;

  const countEl = $('selected-count');
  if (n > 0) {
    countEl.style.display = 'flex';
    $('selected-count-text').textContent = `${n} card${n > 1 ? 's' : ''} selected`;
  } else {
    countEl.style.display = 'none';
  }
}

/* ─────────────────────────────────────────────
   STEP 2 — UPLOAD
───────────────────────────────────────────── */
function initStep2() {
  populateYearSelector();

  const zone = $('upload-zone');
  const fileInput = $('file-input');

  // Drag-and-drop (supports multiple files dropped at once)
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    handleFiles(Array.from(e.dataTransfer.files));
  });

  // Click to upload (multiple attribute on input allows multi-select)
  zone.addEventListener('click', e => {
    if (!e.target.closest('.file-label')) fileInput.click();
  });
  fileInput.addEventListener('change', e => {
    handleFiles(Array.from(e.target.files));
    fileInput.value = ''; // reset so same file can be re-added after removal
  });

  // Year change
  $('benefit-year').addEventListener('change', e => {
    state.benefitYear = parseInt(e.target.value);
  });

  // Navigation
  $('step2-back').addEventListener('click', () => goToStep(1));
  $('step2-next').addEventListener('click', () => {
    if (state.plaid.transactions || state.parsedCSVs.length > 0) runAnalysis();
  });

  // Show Plaid prompt in Step 2 if not already connected
  if (!state.plaid.connected) {
    $('plaid-step2-prompt').style.display = 'block';
  }
}

function populateYearSelector() {
  const sel = $('benefit-year');
  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= currentYear - 4; y--) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y === currentYear ? `${y} (current)` : y;
    if (y === state.benefitYear) opt.selected = true;
    sel.appendChild(opt);
  }
}

function handleFiles(files) {
  const csvFiles = files.filter(f => f.name.toLowerCase().endsWith('.csv'));
  if (csvFiles.length < files.length) {
    showError(`${files.length - csvFiles.length} file(s) skipped — only CSV files are supported.`);
  }
  csvFiles.forEach(file => {
    // Skip duplicate filenames already loaded
    if (state.parsedCSVs.some(p => p.filename === file.name)) {
      showError(`"${file.name}" is already uploaded. Remove it first to replace it.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const parsed = parseCSV(e.target.result, file.name);
        parsed.filename = file.name;
        state.parsedCSVs.push(parsed);
        renderUploadedFiles();
        $('step2-next').disabled = false;
      } catch (err) {
        showError(`${file.name}: ${err.message}`);
      }
    };
    reader.readAsText(file);
  });
}

function removeUploadedFile(filename) {
  state.parsedCSVs = state.parsedCSVs.filter(p => p.filename !== filename);
  renderUploadedFiles();
  $('step2-next').disabled = (state.parsedCSVs.length === 0);
}

function renderUploadedFiles() {
  const list = $('uploaded-files-list');
  if (state.parsedCSVs.length === 0) {
    list.innerHTML = '';
    return;
  }

  list.innerHTML = state.parsedCSVs.map(parsed => {
    const dateStr = parsed.dateRange.start && parsed.dateRange.end
      ? `${formatDate(parsed.dateRange.start)} – ${formatDate(parsed.dateRange.end)}`
      : 'Unknown range';
    const topCats = parsed.topCategories.slice(0, 3).map(c => c.category).join(', ') || 'N/A';
    return `
      <div class="upload-file-row">
        <div class="upload-file-row-header">
          <span class="upload-result-icon">&#10003;</span>
          <div>
            <div class="upload-filename">${escapeHtml(parsed.filename)}</div>
            <div class="upload-bank">Detected format: ${parsed.bankName}</div>
          </div>
          <button class="btn-icon" data-remove="${escapeHtml(parsed.filename)}" title="Remove file">&#10005;</button>
        </div>
        <div class="upload-stats">
          <div class="stat-item">
            <span class="stat-label">Transactions</span>
            <span class="stat-value">${parsed.transactions.length.toLocaleString()}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Date Range</span>
            <span class="stat-value">${dateStr}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Top Categories</span>
            <span class="stat-value" style="font-size:.8rem">${escapeHtml(topCats)}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Wire remove buttons
  list.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => removeUploadedFile(btn.dataset.remove));
  });
}

function showError(msg) {
  const zone = $('upload-zone');
  const errDiv = document.createElement('div');
  errDiv.style.cssText = 'margin-top:.75rem;padding:.6rem 1rem;background:#fee2e2;color:#991b1b;border-radius:8px;font-size:.85rem;';
  errDiv.textContent = '\u26A0 ' + msg;
  zone.parentNode.insertBefore(errDiv, zone.nextSibling);
  setTimeout(() => errDiv.remove(), 6000);
}

/* ─────────────────────────────────────────────
   ANALYSIS
───────────────────────────────────────────── */
function runAnalysis() {
  const selectedCards = CARDS.filter(c => state.selectedCardIds.has(c.id));
  const allTransactions = state.plaid.transactions
    ?? state.parsedCSVs.flatMap(p => p.transactions);
  state.cardResults    = correlateBenefits(selectedCards, allTransactions, state.benefitYear);
  state.summary        = calcSummary(state.cardResults);
  state.overlaps       = detectOverlaps(state.cardResults);
  state.recommendations = generateRecommendations(state.cardResults, state.overlaps, state.manualBenefits);
  renderDashboard();
  goToStep(3);
}

/* ─────────────────────────────────────────────
   STEP 3 — DASHBOARD
───────────────────────────────────────────── */
function renderDashboard() {
  renderSummaryBar();
  renderOverlapPanel();
  renderCardSections();

  $('step3-back').addEventListener('click', () => goToStep(2));
  $('step3-restart').addEventListener('click', () => {
    state.selectedCardIds.clear();
    state.parsedCSVs      = [];
    state.cardResults     = null;
    state.summary         = null;
    state.overlaps        = [];
    state.recommendations = [];
    state.manualBenefits  = {};
    renderUploadedFiles();
    $('step2-next').disabled = true;
    renderCardGrid();
    updateStep1Bar();
    goToStep(1);
  });
}

/* ─────────────────────────────────────────────
   OVERLAP PANEL
───────────────────────────────────────────── */
function renderOverlapPanel() {
  const panel = $('overlap-panel');
  const overlaps = state.overlaps;
  const recs     = state.recommendations;

  // Nothing to show for a single card
  if (state.cardResults.length < 2 || (overlaps.length === 0 && recs.length === 0)) {
    panel.innerHTML = '';
    return;
  }

  panel.innerHTML = `
    ${recs.length > 0 ? buildRecommendationsHtml(recs) : ''}
    ${overlaps.length > 0 ? buildOverlapsHtml(overlaps) : ''}
  `;
}

function buildRecommendationsHtml(recs) {
  const rows = recs.map(rec => {
    const cfg = {
      keep:   { cls: 'keep',   icon: '&#10003;', label: 'Keep' },
      review: { cls: 'review', icon: '&#9432;',  label: 'Review' },
      cancel: { cls: 'cancel', icon: '&#10005;', label: 'Consider Canceling' },
    }[rec.verdict];

    const stats = [
      rec.card.annualFee > 0 ? `${fmtDollar(rec.card.annualFee)}/yr fee` : 'No annual fee',
      `${fmtDollar(rec.uniqueValue)} unique benefit value`,
      rec.cashback > 0 ? `${fmtDollar(rec.cashback)} est. cashback` : null,
      `${fmtDollarSigned(rec.netUniqueValue)} net`
    ].filter(Boolean).join(' · ');

    return `
      <div class="rec-card rec-${cfg.cls}">
        <div class="rec-header">
          <span class="rec-icon rec-icon-${cfg.cls}">${cfg.icon}</span>
          <div class="rec-title">
            <span class="rec-verdict">${cfg.label}</span>
            <span class="rec-card-name">${escapeHtml(rec.card.issuer)} ${escapeHtml(rec.card.name)}</span>
          </div>
        </div>
        <div class="rec-stats">${escapeHtml(stats)}</div>
        <div class="rec-reason">${escapeHtml(rec.reason)}</div>
        ${rec.duplicatedBenefits.size > 0 ? `
          <div class="rec-dupes">
            Duplicated by other cards:
            ${[...rec.duplicatedBenefits].map(b => `<span class="rec-dupe-tag">${escapeHtml(b.name)}</span>`).join('')}
          </div>` : ''}
      </div>
    `;
  }).join('');

  return `
    <div class="overlap-section">
      <h3 class="overlap-section-title">&#128204; Card Recommendations</h3>
      <p class="overlap-section-sub">Based on benefit overlap with your other selected cards.</p>
      <div class="rec-list">${rows}</div>
    </div>
  `;
}

function buildOverlapsHtml(overlaps) {
  const rows = overlaps.map(ovl => {
    const stackNote = ovl.stackable
      ? '<span class="overlap-tag stack">Stackable — both credits can be redeemed</span>'
      : '<span class="overlap-tag nostack">Non-stackable — only one provides value</span>';

    const entries = ovl.entries.map(e => {
      const valStr = e.benefit.type === 'monthly_credit'
        ? `${fmtDollar(e.benefit.monthlyValue)}/mo`
        : e.annualValue ? `${fmtDollar(e.annualValue)}/yr` : '';
      return `<div class="overlap-entry">
        <span class="overlap-entry-dot" style="background:${e.card.color}"></span>
        <span class="overlap-entry-card">${escapeHtml(e.card.issuer)} ${escapeHtml(e.card.name)}</span>
        <span class="overlap-entry-benefit">${escapeHtml(e.benefit.name)}${valStr ? ' · ' + valStr : ''}</span>
      </div>`;
    }).join('');

    return `
      <div class="overlap-item">
        <div class="overlap-item-header">
          <span class="overlap-label">${escapeHtml(ovl.label)}</span>
          ${stackNote}
        </div>
        <div class="overlap-entries">${entries}</div>
      </div>
    `;
  }).join('');

  return `
    <div class="overlap-section">
      <h3 class="overlap-section-title">&#9888; Duplicate Benefits</h3>
      <p class="overlap-section-sub">These benefits appear on multiple cards you hold.</p>
      <div class="overlap-list">${rows}</div>
    </div>
  `;
}

function fmtDollarSigned(n) {
  const abs = Math.abs(n || 0);
  const str = '$' + abs.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  return (n < 0 ? '−' : '+') + str;
}

function calcManualTotals() {
  let manualValue = 0;
  if (!state.cardResults) return manualValue;
  for (const cr of state.cardResults) {
    for (const br of cr.benefitResults) {
      if (!br.trackable && br.benefit.annualValue) {
        if (state.manualBenefits[manualKey(cr.card.id, br.benefit.name)]) {
          manualValue += br.benefit.annualValue;
        }
      }
    }
  }
  return manualValue;
}

function manualKey(cardId, benefitName) {
  return `${cardId}::${benefitName}`;
}

function renderSummaryBar() {
  const s          = state.summary;
  const manualUsed = calcManualTotals();
  const totalValue    = s.totalValue + manualUsed;
  const totalUsed     = s.totalUsed  + manualUsed;
  const totalRemaining = Math.max(0, totalValue - totalUsed);
  const netValue      = totalUsed + s.totalCashback - s.totalAnnualFee;

  $('summary-bar').innerHTML = `
    <div class="summary-tile"
         data-tooltip="The maximum dollar value your cards could deliver this year — all trackable statement credits, monthly and quarterly credits, plus any memberships you&apos;ve marked as using.">
      <div class="summary-label">Total Potential Value</div>
      <div class="summary-value indigo">${fmtDollar(totalValue)}</div>
    </div>
    <div class="summary-tile"
         data-tooltip="How much benefit value you&apos;ve actually redeemed this year, based on transactions matched in your spending data. Memberships you&apos;ve manually marked as &apos;using&apos; are included here too.">
      <div class="summary-label">Benefits Used</div>
      <div class="summary-value green">${fmtDollar(totalUsed)}</div>
    </div>
    <div class="summary-tile summary-tile-btn" id="remaining-tile" role="button" tabindex="0"
         data-tooltip="Benefits you haven&apos;t redeemed yet this year — credits not fully spent and unclaimed memberships. Click to see the full list.">
      <div class="summary-label">Benefits Remaining <span class="tile-hint">&#8599;</span></div>
      <div class="summary-value amber">${fmtDollar(totalRemaining)}</div>
    </div>
    <div class="summary-tile"
         data-tooltip="Benefits Used plus estimated cashback earned, minus your total annual fees. Unlike &apos;Benefits Used,&apos; this tells you whether your cards are actually paying for themselves after costs. Positive = you&apos;re ahead.">
      <div class="summary-label">Est. Net Card Value</div>
      <div class="summary-value ${netValue >= 0 ? 'green' : 'red'}">${fmtDollar(netValue)}</div>
    </div>
    <div class="summary-tile"
         data-tooltip="The combined annual fees across all your selected cards. Compare this to Est. Net Card Value to judge whether your card lineup is worth the cost.">
      <div class="summary-label">Total Card Fees</div>
      <div class="summary-value red">${fmtDollar(s.totalAnnualFee)}</div>
    </div>
  `;

  const tile = $('remaining-tile');
  tile.addEventListener('click', openRemainingModal);
  tile.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openRemainingModal(); });
}

function renderCardSections() {
  const container = $('dashboard-cards');
  container.innerHTML = '';

  for (const cr of state.cardResults) {
    container.appendChild(buildCardSection(cr));
  }
}

function buildCardSection(cr) {
  const section = document.createElement('div');
  section.className = 'dashboard-card-section';

  // Header
  const feeStr = cr.card.annualFee === 0 ? 'No annual fee' : `$${cr.card.annualFee}/yr annual fee`;
  const trackable = cr.benefitResults.filter(b => b.trackable && b.benefit.type !== 'cashback');
  const usedPct = cr.totalValue > 0 ? (cr.totalUsed / cr.totalValue * 100).toFixed(0) : 0;

  section.innerHTML = `
    <div class="dashboard-card-header">
      <div class="card-header-accent" style="background:${cr.card.color}"></div>
      <div class="card-header-info">
        <div class="card-header-name">${cr.card.issuer} ${cr.card.name}</div>
        <div class="card-header-fee">${feeStr}</div>
      </div>
      <div class="card-header-summary">
        <span><strong>${fmtDollar(cr.totalUsed)}</strong> used of ${fmtDollar(cr.totalValue)}</span>
        <span>${usedPct}% redeemed</span>
      </div>
    </div>
    <div class="benefit-list" id="benefit-list-${cr.card.id}"></div>
  `;

  const benefitList = section.querySelector(`#benefit-list-${cr.card.id}`);

  for (const br of cr.benefitResults) {
    benefitList.appendChild(buildBenefitRow(br, cr.card.id));
  }

  return section;
}

function buildBenefitRow(br, cardId) {
  const row = document.createElement('div');
  row.className = 'benefit-row';

  if (!br.trackable) {
    const key    = manualKey(cardId, br.benefit.name);
    const marked = !!state.manualBenefits[key];

    row.innerHTML = `
      <div class="benefit-row-top">
        <div class="benefit-name">${escapeHtml(br.benefit.name)}</div>
        <span class="badge badge-info">${labelForType(br.benefit.type)}</span>
      </div>
      <div class="benefit-desc">${escapeHtml(br.benefit.description || '')}</div>
      ${br.benefit.annualValue ? `
        <div class="membership-toggle-row">
          <button class="membership-toggle ${marked ? 'is-active' : ''}" data-key="${escapeHtml(key)}">
            ${marked
              ? '<span class="mtoggle-check">&#10003;</span> I have &amp; use this benefit'
              : '+ Mark as using this benefit'}
          </button>
          <span class="membership-value">Est. value: ${fmtDollar(br.benefit.annualValue)}/yr</span>
        </div>` : ''}
    `;

    if (br.benefit.annualValue) {
      row.querySelector('.membership-toggle').addEventListener('click', function () {
        state.manualBenefits[key] = !state.manualBenefits[key];
        const active = state.manualBenefits[key];
        this.classList.toggle('is-active', active);
        this.innerHTML = active
          ? '<span class="mtoggle-check">&#10003;</span> I have &amp; use this benefit'
          : '+ Mark as using this benefit';
        renderSummaryBar();
        state.recommendations = generateRecommendations(state.cardResults, state.overlaps, state.manualBenefits);
        renderOverlapPanel();
      });
    }
    return row;
  }

  if (br.benefit.type === 'cashback') {
    return buildCashbackRow(br);
  }

  // Trackable credit benefit
  const pct = Math.min(100, (br.pct || 0) * 100);
  const fillClass = br.status === 'full' ? 'full' : br.status === 'partial' ? 'partial' : 'unused';
  const badgeClass = `badge-${fillClass}`;
  const badgeLabel = br.status === 'full' ? 'Fully Used' : br.status === 'partial' ? 'Partially Used' : 'Unused';

  row.innerHTML = `
    <div class="benefit-row-top">
      <div class="benefit-name">${br.benefit.name}</div>
      <div class="benefit-amounts">${fmtDollar(br.used)} / ${fmtDollar(br.benefit.annualValue)}</div>
      <span class="badge ${badgeClass}">${badgeLabel}</span>
    </div>
    <div class="progress-bar-wrap">
      <div class="progress-bar-fill ${fillClass}" style="width:${pct}%"></div>
    </div>
    <div class="benefit-desc">${br.benefit.description || ''}</div>
    ${buildExtraBreakdown(br)}
    ${br.matchedTxns && br.matchedTxns.length > 0 ? buildTxnToggle(br) : ''}
  `;

  // Wire up toggle
  const toggle = row.querySelector('.txn-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const list = row.querySelector('.txn-list');
      list.classList.toggle('open');
      toggle.textContent = list.classList.contains('open')
        ? `Hide ${br.matchedTxns.length} transaction${br.matchedTxns.length !== 1 ? 's' : ''}`
        : `Show ${br.matchedTxns.length} transaction${br.matchedTxns.length !== 1 ? 's' : ''}`;
    });
  }

  return row;
}

function buildCashbackRow(br) {
  const row = document.createElement('div');
  row.className = 'benefit-row';

  const topCats = (br.topCategories || []).slice(0, 4);
  const catsHtml = topCats.map(c => `
    <div class="txn-row">
      <span class="txn-date">${(c.rate * 100).toFixed(1)}%</span>
      <span class="txn-desc">${c.category}</span>
      <span class="txn-amt">${fmtDollar(c.earned)} earned (${fmtDollar(c.spent)} spent)</span>
    </div>
  `).join('');

  row.innerHTML = `
    <div class="benefit-row-top">
      <div class="benefit-name">${br.benefit.name}</div>
      <div class="benefit-amounts">Est. ${fmtDollar(br.estimatedEarnings || 0)} earned</div>
      <span class="badge badge-cashback">Cashback</span>
    </div>
    <div class="benefit-desc">${br.benefit.description || ''}</div>
    ${topCats.length > 0 ? `
      <div class="txn-list open" style="margin-top:.4rem">
        <div class="txn-row" style="font-weight:600;background:var(--gray-100)">
          <span class="txn-date">Rate</span>
          <span class="txn-desc">Category</span>
          <span class="txn-amt">Earned / Spent</span>
        </div>
        ${catsHtml}
      </div>
    ` : ''}
  `;
  return row;
}

function buildExtraBreakdown(br) {
  if (br.benefit.type === 'monthly_credit' && br.monthlyBreakdown) {
    return buildPeriodGrid(br.monthlyBreakdown.map(m => ({
      label: m.month,
      used: m.used,
      cap: m.cap,
      txnCount: m.txns.length,
      future: isFuturePeriod('month', m.monthIndex)
    })));
  }

  if (br.benefit.type === 'semi_annual_credit' && br.semiAnnualBreakdown) {
    return buildPeriodGrid(br.semiAnnualBreakdown.map((h, i) => ({
      label: h.period,
      used: h.used,
      cap: h.cap,
      txnCount: h.txns.length,
      future: isFuturePeriod('half', i)
    })));
  }

  if (br.benefit.type === 'quarterly_credit' && br.quarterlyBreakdown) {
    return buildPeriodGrid(br.quarterlyBreakdown.map((q, i) => ({
      label: q.label,
      used: q.used,
      cap: q.cap,
      txnCount: q.txns.length,
      future: isFuturePeriod('quarter', i)
    })));
  }

  return '';
}

function buildPeriodGrid(periods) {
  const cells = periods.map(p => {
    let cls, icon;
    if (p.future) {
      cls = 'future'; icon = '–';
    } else if (p.used >= p.cap - 0.005) {
      cls = 'full';    icon = '&#10003;';
    } else if (p.used > 0) {
      cls = 'partial'; icon = '~';
    } else {
      cls = 'unused';  icon = '&#10007;';
    }
    const amtStr = p.future ? '' : `${fmtDollar(p.used)}/${fmtDollar(p.cap)}`;
    const tip = p.future
      ? 'Future period'
      : `${p.txnCount} transaction${p.txnCount !== 1 ? 's' : ''} · ${fmtDollar(p.used)} of ${fmtDollar(p.cap)}`;
    return `
      <div class="period-cell ${cls}" title="${tip}">
        <span class="period-label">${p.label}</span>
        <span class="period-icon">${icon}</span>
        <span class="period-amount">${amtStr}</span>
      </div>`;
  }).join('');
  return `<div class="period-grid">${cells}</div>`;
}

function isFuturePeriod(type, index) {
  const now = new Date();
  const analyzedYear = state.benefitYear;
  if (analyzedYear < now.getFullYear()) return false; // past year — nothing is future
  if (analyzedYear > now.getFullYear()) return false; // future year — assume all are past for display
  const currentMonth = now.getMonth(); // 0-based
  if (type === 'month')   return index > currentMonth;
  if (type === 'quarter') return index > Math.floor(currentMonth / 3);
  if (type === 'half')    return index > (currentMonth >= 6 ? 1 : 0);
  return false;
}

function buildTxnToggle(br) {
  const txns = br.matchedTxns.slice(0, 50); // cap display
  const label = `Show ${txns.length} transaction${txns.length !== 1 ? 's' : ''}`;
  const rows = txns.map(t => `
    <div class="txn-row">
      <span class="txn-date">${formatDateShort(t.date)}</span>
      <span class="txn-desc">${escapeHtml(t.description)}</span>
      <span class="txn-amt">${fmtDollar(t.amount)}</span>
    </div>
  `).join('');

  return `
    <button class="txn-toggle">${label}</button>
    <div class="txn-list">
      ${rows}
    </div>
  `;
}

/* ─────────────────────────────────────────────
   REMAINING BENEFITS MODAL
───────────────────────────────────────────── */
function openRemainingModal() {
  // Collect everything with remaining value, grouped by card
  const sections = [];

  for (const cr of state.cardResults) {
    const items = [];

    for (const br of cr.benefitResults) {
      if (br.benefit.type === 'cashback') continue;

      if (br.trackable) {
        if ((br.remaining || 0) <= 0) continue;

        // Build a human-readable sub-label for period-based credits
        let periodNote = '';
        if (br.benefit.type === 'monthly_credit' && br.monthlyBreakdown) {
          const unusedMonths = br.monthlyBreakdown.filter(
            m => !isFuturePeriod('month', m.monthIndex) && m.used < m.cap - 0.005
          ).length;
          if (unusedMonths) periodNote = `${unusedMonths} month${unusedMonths !== 1 ? 's' : ''} unused`;
        } else if (br.benefit.type === 'quarterly_credit' && br.quarterlyBreakdown) {
          const unusedQ = br.quarterlyBreakdown.filter(
            (q, i) => !isFuturePeriod('quarter', i) && q.used < q.cap - 0.005
          ).length;
          if (unusedQ) periodNote = `${unusedQ} quarter${unusedQ !== 1 ? 's' : ''} unused`;
        } else if (br.benefit.type === 'semi_annual_credit' && br.semiAnnualBreakdown) {
          const unusedH = br.semiAnnualBreakdown.filter(
            (h, i) => !isFuturePeriod('half', i) && h.used < h.cap - 0.005
          ).length;
          if (unusedH) periodNote = `${unusedH} half-year period${unusedH !== 1 ? 's' : ''} unused`;
        }

        items.push({
          name: br.benefit.name,
          remaining: br.remaining,
          total: br.benefit.annualValue,
          status: br.status,
          periodNote,
          trackable: true
        });
      } else {
        // Non-trackable: show if not yet manually claimed and has a value
        if (!br.benefit.annualValue) continue;
        const key = manualKey(cr.card.id, br.benefit.name);
        if (state.manualBenefits[key]) continue; // already claimed

        items.push({
          name: br.benefit.name,
          remaining: br.benefit.annualValue,
          total: br.benefit.annualValue,
          status: 'not_claimed',
          periodNote: '',
          trackable: false
        });
      }
    }

    if (items.length) sections.push({ card: cr.card, items });
  }

  // Build and inject modal
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const allGone = sections.length === 0;
  overlay.innerHTML = `
    <div class="modal-dialog" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h3 class="modal-title">Benefits Remaining</h3>
        <button class="btn-icon modal-close" aria-label="Close">&#10005;</button>
      </div>
      <div class="modal-body">
        ${allGone
          ? `<div class="modal-empty">&#127881; You've redeemed every benefit! Nothing left to claim.</div>`
          : sections.map(sec => `
              <div class="modal-section">
                <div class="modal-section-header">
                  <span class="modal-card-dot" style="background:${sec.card.color}"></span>
                  <span class="modal-card-name">${escapeHtml(sec.card.issuer)} ${escapeHtml(sec.card.name)}</span>
                </div>
                ${sec.items.map(item => {
                  const pctUsed = item.total > 0 ? Math.round((item.total - item.remaining) / item.total * 100) : 0;
                  const cls     = item.status === 'not_claimed' ? 'not-claimed' : item.status === 'unused' ? 'unused' : 'partial';
                  return `
                    <div class="modal-benefit-row modal-benefit-${cls}">
                      <div class="modal-benefit-left">
                        <div class="modal-benefit-name">${escapeHtml(item.name)}</div>
                        ${item.periodNote
                          ? `<div class="modal-benefit-note">${escapeHtml(item.periodNote)}</div>`
                          : item.status === 'not_claimed'
                            ? `<div class="modal-benefit-note">Not yet claimed — not trackable from spending data</div>`
                            : item.status === 'partial'
                              ? `<div class="modal-benefit-note">${pctUsed}% used so far</div>`
                              : ''}
                      </div>
                      <div class="modal-benefit-remaining">${fmtDollar(item.remaining)}</div>
                    </div>`;
                }).join('')}
              </div>
            `).join('')
        }
      </div>
      ${!allGone ? `<div class="modal-footer">
        Total unredeemed value: <strong>${fmtDollar(sections.reduce((s, sec) => s + sec.items.reduce((ss, i) => ss + i.remaining, 0), 0))}</strong>
      </div>` : ''}
    </div>
  `;

  document.body.appendChild(overlay);

  const close = () => overlay.remove();
  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
  });
}

/* ─────────────────────────────────────────────
   UTILITY
───────────────────────────────────────────── */
function fmtDollar(n) {
  if (n === null || n === undefined || isNaN(n)) return '$0';
  return '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function formatDate(d) {
  if (!d) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatDateShort(d) {
  if (!d) return '';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function escapeHtml(str) {
  return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function labelForType(type) {
  return {
    membership:       'Membership',
    free_night:       'Free Night',
    companion_cert:   'Companion Cert',
    statement_credit: 'Statement Credit',
    monthly_credit:   'Monthly Credit',
    semi_annual_credit: 'Semi-Annual',
    cashback:         'Cash Back'
  }[type] || type;
}

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initPlaid();
  initStep1();
  initStep2();
});

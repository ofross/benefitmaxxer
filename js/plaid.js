/* ==========================================
   plaid.js — Plaid Link client helpers
   All sensitive operations (token exchange, access_token)
   happen inside the Cloudflare Worker — never in this file.
   ========================================== */

'use strict';

/**
 * Ask the Worker to create a Plaid Link token, then open Plaid Link.
 * On success, calls onSuccess({ accounts, transactions }).
 * On error, calls onError(errorMessage).
 */
/**
 * Convert a raw fetch/network error into a message a human can act on.
 */
function humanizeWorkerError(rawMsg, workerUrl) {
  const isNetworkError =
    rawMsg === 'Failed to fetch' ||
    rawMsg.includes('NetworkError') ||
    rawMsg.includes('network') ||
    rawMsg.includes('ERR_NAME_NOT_RESOLVED') ||
    rawMsg.includes('ERR_CONNECTION_REFUSED');

  if (isNetworkError) {
    return (
      'Cannot reach the BenefitMaxxer proxy — the Cloudflare Worker is not responding.\n\n' +
      'To fix this, deploy the worker:\n' +
      '  cd ~/benefitmaxxer/worker\n' +
      '  wrangler deploy\n\n' +
      `Worker URL: ${workerUrl}\n` +
      'After deploying, refresh this page and try again.\n\n' +
      `(Technical detail: ${rawMsg})`
    );
  }

  if (rawMsg.includes('not configured') || rawMsg.includes('PLAID_CLIENT_ID')) {
    return 'The Plaid worker is running but missing credentials. Run: wrangler secret put PLAID_CLIENT_ID and wrangler secret put PLAID_SECRET';
  }

  return rawMsg;
}

async function plaidConnect(workerUrl, year, onSuccess, onError) {
  // 1. Get a link token from our Worker
  let linkToken;
  try {
    const res = await fetch(`${workerUrl}/link-token`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ user_id: plaidAnonUserId() }),
    });
    if (!res.ok) {
      let errMsg;
      try { const d = await res.json(); errMsg = d.error || `Worker error ${res.status}`; }
      catch { errMsg = `Worker returned HTTP ${res.status}`; }
      throw new Error(errMsg);
    }
    const data = await res.json();
    linkToken = data.link_token;
  } catch (err) {
    onError(humanizeWorkerError(err.message, workerUrl));
    return;
  }

  // 2. Open Plaid Link
  const handler = Plaid.create({
    token: linkToken,

    onSuccess: async (publicToken, metadata) => {
      // 3. Send public_token to Worker — it exchanges & fetches, returns transactions
      try {
        const res = await fetch(`${workerUrl}/exchange`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ public_token: publicToken, year }),
        });
        if (!res.ok) {
          let errMsg;
          try { const d = await res.json(); errMsg = d.error || `Worker error ${res.status}`; }
          catch { errMsg = `Worker returned HTTP ${res.status}`; }
          throw new Error(errMsg);
        }
        const data = await res.json();
        onSuccess(data); // { accounts, transactions }
      } catch (err) {
        onError(humanizeWorkerError(err.message, workerUrl));
      }
    },

    onExit: (err) => {
      if (err) onError(err.display_message || err.error_message || 'Plaid Link closed with an error.');
      // If err is null the user just closed the dialog — no action needed
    },
  });

  handler.open();
}

/**
 * Match Plaid credit accounts to cards in the CARDS database.
 * Returns an array of card IDs confidently matched.
 *
 * Plaid account names (official_name) are typically descriptive:
 *   "Chase Sapphire Reserve Credit Card"
 *   "American Express Gold Card"
 *   "Prime Visa"
 */
function plaidMatchCards(accounts) {
  const ISSUER_ALIASES = {
    'american express': 'Amex',
    'amex':             'Amex',
    'chase':            'Chase',
    'citi':             'Citi',
    'citibank':         'Citi',
    'bank of america':  'BofA',
    'bofa':             'BofA',
    'capital one':      'Capital One',
    'wells fargo':      'Wells Fargo',
    'us bank':          'US Bank',
    'u.s. bank':        'US Bank',
    'discover':         'Discover',
    'barclays':         'Barclays',
    'goldman sachs':    'Goldman Sachs',
    'apple':            'Goldman Sachs',
    'navy federal':     'Navy Federal',
    'penfed':           'PenFed',
    'synchrony':        'Synchrony',
    'amazon':           'Chase',   // Prime Visa is issued by Chase
  };

  // Generic noise words
  const SKIP_WORDS = new Set([
    'card', 'credit', 'the', 'and', 'plus', 'back',
    'select', 'world', 'elite', 'visa', 'mastercard', 'signature',
  ]);

  // Issuer words — matched separately via ISSUER_ALIASES, skip in keywords
  const ISSUER_WORDS = new Set([
    'chase', 'amex', 'american', 'express', 'citi', 'citibank',
    'capital', 'bank', 'america', 'wells', 'fargo', 'discover',
    'barclays', 'goldman', 'sachs', 'navy', 'federal', 'penfed',
    'synchrony', 'hsbc', 'bilt',
  ]);

  const matched = new Set();
  const lowAccounts = accounts.map(a => ({
    ...a,
    nameLow: (a.name || '').toLowerCase(),
  }));

  for (const card of CARDS) {
    const cardNameLow = card.name.toLowerCase();

    const cardKeywords = cardNameLow
      .split(/[\s®™\-]+/)
      .filter(w => w.length > 3 && !SKIP_WORDS.has(w) && !ISSUER_WORDS.has(w));

    if (cardKeywords.length === 0) continue;

    for (const acct of lowAccounts) {
      // Plaid already filtered to credit accounts, but double-check
      if (acct.type && acct.type !== 'credit') continue;

      // Resolve issuer from account name
      let resolvedIssuer = null;
      for (const [alias, issuer] of Object.entries(ISSUER_ALIASES)) {
        if (acct.nameLow.includes(alias)) { resolvedIssuer = issuer; break; }
      }
      if (resolvedIssuer && resolvedIssuer !== card.issuer) continue;

      // All distinctive keywords must appear in the account name
      const hits = cardKeywords.filter(kw => acct.nameLow.includes(kw)).length;
      if (hits === cardKeywords.length) {
        matched.add(card.id);
        break;
      }
    }
  }

  return [...matched];
}

/**
 * Generate or retrieve a stable anonymous user ID for this browser.
 * Stored in sessionStorage only — never sent to any server other than
 * the Worker's /link-token endpoint where it is used as a Plaid
 * client_user_id (required by Plaid, but carries no PII).
 */
function plaidAnonUserId() {
  const KEY = 'bm_anon_uid';
  let id = sessionStorage.getItem(KEY);
  if (!id) {
    id = 'anon-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(KEY, id);
  }
  return id;
}

/* ==========================================
   copilot.js — Copilot Money API Client
   Communicates through the user-deployed CORS proxy.
   The JWT token is held in memory only — never written to
   localStorage, sessionStorage, or any server.
   ========================================== */

'use strict';

/* ─── GraphQL Queries ─── */

const GQL = {

  USER: `query User {
    user { id }
  }`,

  ACCOUNTS: `query Accounts {
    accounts {
      id name type
    }
  }`,

  CATEGORIES: `query Categories {
    categories { id name }
  }`,

  TAGS: `query Tags {
    tags { id name colorName }
  }`,

  // Paginated — call repeatedly until hasNextPage is false
  TRANSACTIONS: `query Transactions($first: Int, $after: String, $filter: TransactionFilter) {
    transactions(first: $first, after: $after, filter: $filter) {
      edges {
        cursor
        node {
          id date name amount type categoryId accountId isPending
        }
      }
      pageInfo { hasNextPage endCursor }
    }
  }`,

  CREATE_TAG: `mutation CreateTag($name: String!, $colorName: String!) {
    createTag(name: $name, colorName: $colorName) { id name colorName }
  }`,

  EDIT_TRANSACTION: `mutation EditTransaction($id: ID!, $changes: TransactionChanges!) {
    editTransaction(id: $id, changes: $changes) { id tags { id name } }
  }`,
};

/* ─── Core request helper ─── */

async function copilotQuery(proxyUrl, token, query, variables = {}) {
  const res = await fetch(proxyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  // Read body once so we can inspect it regardless of status
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = null; }

  if (res.status === 401 ||
      (json?.errors?.[0]?.extensions?.code === 'UNAUTHENTICATED') ||
      (json?.errors?.[0]?.message || '').toLowerCase().includes('not authenticated')) {
    throw new Error('TOKEN_EXPIRED');
  }

  if (!res.ok) {
    const detail = json?.errors?.[0]?.message || text.slice(0, 200);
    throw new Error(`Copilot API returned HTTP ${res.status}: ${detail}`);
  }

  if (json?.errors && json.errors.length > 0) {
    const msg = json.errors[0].message || 'Unknown GraphQL error';
    if (msg.toLowerCase().includes('unauthenticated') || msg.toLowerCase().includes('unauthorized')) {
      throw new Error('TOKEN_EXPIRED');
    }
    throw new Error(msg);
  }

  return json.data;
}

/* ─── Public API ─── */

/**
 * Validate connection by fetching the current user.
 * Returns { id, email, name } or throws.
 */
async function copilotVerify(proxyUrl, token) {
  const data = await copilotQuery(proxyUrl, token, GQL.USER);
  return data.user;
}

/**
 * Fetch all (non-hidden, non-closed) accounts.
 * Returns raw Copilot account objects.
 */
async function copilotFetchAccounts(proxyUrl, token) {
  const data = await copilotQuery(proxyUrl, token, GQL.ACCOUNTS);
  return data.accounts || [];
}

/**
 * Fetch all categories and return a Map: id → name.
 */
async function copilotFetchCategories(proxyUrl, token) {
  const data = await copilotQuery(proxyUrl, token, GQL.CATEGORIES);
  const map = new Map();
  for (const c of data.categories || []) map.set(c.id, c.name);
  return map;
}

/**
 * Fetch all transactions for a given year, handling pagination.
 * Returns normalized { date, description, category, amount } objects.
 */
async function copilotFetchTransactions(proxyUrl, token, year, categoryMap) {
  const allTxns = [];
  let after    = null;
  let hasMore  = true;

  const filter = {
    dates: {
      from: `${year}-01-01`,
      to:   `${year}-12-31`,
    },
  };

  while (hasMore) {
    const vars = { first: 200, filter };
    if (after) vars.after = after;

    const data = await copilotQuery(proxyUrl, token, GQL.TRANSACTIONS, vars);
    const page = data.transactions;

    for (const edge of page.edges || []) {
      const t = edge.node;

      // Skip pending transactions — they haven't cleared yet
      if (t.isPending) continue;

      // Copilot amounts: negative = expense (money out), positive = income
      // We only care about expenses for benefit matching
      const raw = parseFloat(t.amount);
      if (isNaN(raw) || raw >= 0) continue; // skip income/zero

      allTxns.push({
        _copilotId: t.id,
        date:        new Date(t.date + 'T00:00:00'),
        description: t.name || '',
        category:    categoryMap.get(t.categoryId) || '',
        amount:      Math.abs(raw),
      });
    }

    hasMore = page.pageInfo.hasNextPage;
    after   = page.pageInfo.endCursor;
  }

  return allTxns;
}

/**
 * Match Copilot accounts to cards in our CARDS database.
 * Returns an array of card IDs that were confidently matched.
 *
 * Matching strategy (in order of confidence):
 *  1. Exact card name substring match (e.g. "Sapphire Reserve" in account name)
 *  2. Issuer name match + partial card name match
 *  3. Issuer-only match as a fallback (lower confidence, not auto-selected)
 */
function copilotMatchCards(accounts) {
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
    'discover':         'Discover',
    'barclays':         'Barclays',
    'goldman sachs':    'Goldman Sachs',
    'apple':            'Goldman Sachs',
    'navy federal':     'Navy Federal',
    'penfed':           'PenFed',
    'synchrony':        'Synchrony',
  };

  const matched = new Set();
  const lowAccounts = accounts.map(a => ({
    ...a,
    nameLow: (a.name || '').toLowerCase(),
  }));

  for (const card of CARDS) {
    const cardNameLow   = card.name.toLowerCase();
    const cardIssuerLow = card.issuer.toLowerCase();

    // Generic words that add no matching signal
    const SKIP_WORDS = new Set(['card', 'credit', 'the', 'and', 'plus', 'back',
                                'select', 'world', 'elite', 'visa', 'mastercard']);
    // Issuer names — already handled by the alias check above, strip from keywords
    // so cards match even when the account name omits the issuer (e.g. "Sapphire Reserve")
    const ISSUER_WORDS = new Set(['chase', 'amex', 'american', 'express', 'citi', 'citibank',
                                  'capital', 'bank', 'america', 'wells', 'fargo', 'discover',
                                  'barclays', 'goldman', 'sachs', 'navy', 'federal', 'penfed',
                                  'synchrony', 'hsbc', 'bilt']);
    const cardKeywords = cardNameLow
      .split(/[\s®™]+/)
      .filter(w => w.length > 3 && !SKIP_WORDS.has(w) && !ISSUER_WORDS.has(w));

    for (const acct of lowAccounts) {
      // Must be a credit card account type
      if (acct.type && !['credit', 'loan'].includes(acct.type.toLowerCase())) continue;

      // Resolve issuer alias from account name
      let resolvedIssuer = null;
      for (const [alias, issuer] of Object.entries(ISSUER_ALIASES)) {
        if (acct.nameLow.includes(alias)) { resolvedIssuer = issuer; break; }
      }
      if (resolvedIssuer && resolvedIssuer !== card.issuer) continue;

      // All distinctive keywords must appear in the account name
      if (cardKeywords.length === 0) continue;
      const hits = cardKeywords.filter(kw => acct.nameLow.includes(kw)).length;
      if (hits === cardKeywords.length) {
        matched.add(card.id);
        break;
      }
    }
  }

  return [...matched];
}

/* ─── Copilot write-back: tag matched transactions ─── */

const BENEFITMAXXER_TAG_NAME  = 'BenefitMaxxer';
const BENEFITMAXXER_TAG_COLOR = 'green';

/**
 * Ensure the BenefitMaxxer tag exists in Copilot; return its id.
 */
async function copilotEnsureTag(proxyUrl, token) {
  const data = await copilotQuery(proxyUrl, token, GQL.TAGS);
  const existing = (data.tags || []).find(
    t => t.name.toLowerCase() === BENEFITMAXXER_TAG_NAME.toLowerCase()
  );
  if (existing) return existing.id;

  const created = await copilotQuery(proxyUrl, token, GQL.CREATE_TAG, {
    name:      BENEFITMAXXER_TAG_NAME,
    colorName: BENEFITMAXXER_TAG_COLOR,
  });
  return created.createTag.id;
}

/**
 * Tag all matched transactions in Copilot with the BenefitMaxxer tag.
 * Returns the number of transactions successfully tagged.
 */
async function copilotTagTransactions(proxyUrl, token, cardResults) {
  const tagId = await copilotEnsureTag(proxyUrl, token);

  // Collect all unique copilotIds from matched transactions across all benefits
  const txnIds = new Set();
  for (const cr of cardResults) {
    for (const br of cr.benefitResults) {
      if (!br.matchedTxns) continue;
      for (const t of br.matchedTxns) {
        if (t._copilotId) txnIds.add(t._copilotId);
      }
    }
  }

  let tagged = 0;
  for (const id of txnIds) {
    try {
      await copilotQuery(proxyUrl, token, GQL.EDIT_TRANSACTION, {
        id,
        changes: { tagIds: [tagId] },
      });
      tagged++;
    } catch {
      // Best-effort — skip individual failures
    }
  }

  return tagged;
}

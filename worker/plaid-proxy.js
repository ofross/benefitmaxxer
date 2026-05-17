/**
 * BenefitMaxxer — Plaid Proxy (Cloudflare Worker)
 *
 * Keeps your Plaid client_id + secret off the browser entirely.
 * The access_token obtained from Plaid is used immediately to fetch
 * transactions, then discarded — it is never returned to or stored
 * by the browser.
 *
 * Environment variables (set via `wrangler secret put`):
 *   PLAID_CLIENT_ID   — from dashboard.plaid.com → Team Settings → Keys
 *   PLAID_SECRET      — sandbox / development / production secret
 *   PLAID_ENV         — "sandbox", "development", or "production"
 *
 * Endpoints:
 *   POST /link-token  — create a Plaid Link token to initialize Link UI
 *   POST /exchange    — swap public_token → access_token, fetch transactions & accounts
 *   OPTIONS *         — CORS preflight
 */

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

function plaidUrl(env, path) {
  const host = env === 'production'  ? 'production.plaid.com'
             : env === 'development' ? 'development.plaid.com'
             :                         'sandbox.plaid.com';
  return `https://${host}${path}`;
}

async function plaidPost(env, clientId, secret, path, body) {
  const res = await fetch(plaidUrl(env, path), {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ client_id: clientId, secret, ...body }),
  });
  const data = await res.json();
  if (!res.ok) {
    const msg = data?.error_message || data?.display_message || `Plaid error ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }
    if (request.method !== 'POST') {
      return json({ error: 'Only POST requests are accepted.' }, 405);
    }

    const { PLAID_CLIENT_ID: clientId, PLAID_SECRET: secret, PLAID_ENV: plaidEnv = 'sandbox' } = env;
    if (!clientId || !secret) {
      return json({ error: 'Worker not configured — set PLAID_CLIENT_ID and PLAID_SECRET secrets.' }, 500);
    }

    const url  = new URL(request.url);
    let body;
    try   { body = await request.json(); }
    catch { return json({ error: 'Request body must be valid JSON.' }, 400); }

    try {
      // ── /link-token ──────────────────────────────────────────────────────────
      if (url.pathname === '/link-token') {
        const userId = (body.user_id || 'anon').slice(0, 64);
        const data = await plaidPost(plaidEnv, clientId, secret, '/link/token/create', {
          user:          { client_user_id: userId },
          client_name:   'BenefitMaxxer',
          products:      ['transactions'],
          country_codes: ['US'],
          language:      'en',
        });
        return json({ link_token: data.link_token });
      }

      // ── /exchange ─────────────────────────────────────────────────────────────
      // Swap public_token → access_token, fetch accounts + transactions, discard token.
      if (url.pathname === '/exchange') {
        const { public_token, year } = body;
        if (!public_token) return json({ error: 'Missing public_token.' }, 400);

        const targetYear = parseInt(year) || new Date().getFullYear();
        const startDate  = `${targetYear}-01-01`;
        const endDate    = `${targetYear}-12-31`;

        // Exchange public_token for access_token — never leaves this Worker
        const { access_token } = await plaidPost(
          plaidEnv, clientId, secret, '/item/public_token/exchange', { public_token }
        );

        // Fetch accounts and transactions in parallel
        const [acctData, txnData] = await Promise.all([
          plaidPost(plaidEnv, clientId, secret, '/accounts/get', { access_token }),
          plaidPost(plaidEnv, clientId, secret, '/transactions/get', {
            access_token,
            start_date: startDate,
            end_date:   endDate,
            options:    { count: 500, offset: 0 },
          }),
        ]);

        // Paginate if there are more than 500 transactions
        let allTxns = txnData.transactions || [];
        const total = txnData.total_transactions || 0;

        while (allTxns.length < total) {
          const page = await plaidPost(plaidEnv, clientId, secret, '/transactions/get', {
            access_token,
            start_date: startDate,
            end_date:   endDate,
            options:    { count: 500, offset: allTxns.length },
          });
          allTxns = allTxns.concat(page.transactions || []);
        }

        // Normalize to BenefitMaxxer's internal format before returning
        const transactions = allTxns.map(t => ({
          date:        t.date,
          description: t.name || t.merchant_name || '',
          category:    (t.personal_finance_category?.primary ||
                        (t.category || []).join(' > ') || ''),
          amount:      Math.abs(t.amount), // Plaid: positive = money out for credit cards
        }));

        // Normalize accounts for card matching
        const accounts = (acctData.accounts || [])
          .filter(a => a.type === 'credit')
          .map(a => ({
            id:           a.account_id,
            name:         a.official_name || a.name || '',
            type:         a.type,
            subtype:      a.subtype,
            mask:         a.mask,
          }));

        // access_token intentionally not included in response
        return json({ accounts, transactions });
      }

      return json({ error: `Unknown endpoint: ${url.pathname}` }, 404);

    } catch (err) {
      return json({ error: err.message }, 500);
    }
  },
};

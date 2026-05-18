/**
 * BenefitMaxxer — Plaid Proxy (Cloudflare Worker)
 *
 * Keeps your Plaid client_id + secret off the browser entirely.
 * The access_token obtained from Plaid is used immediately to fetch
 * transactions, then discarded — it is never returned to or stored
 * by the browser.
 *
 * Environment variables (set via `wrangler secret put`):
 *   PLAID_CLIENT_ID      — from dashboard.plaid.com → Team Settings → Keys
 *   PLAID_SECRET         — sandbox / development / production secret
 *   PLAID_ENV            — "sandbox", "development", or "production"
 *   MAILCHANNELS_API_KEY — from mailchannels.com dashboard (for email alerts)
 *
 * KV binding (set via wrangler.toml):
 *   USAGE_KV — stores per-IP rate limit windows and daily call counts
 *
 * Endpoints:
 *   POST /link-token  — create a Plaid Link token to initialize Link UI
 *   POST /exchange    — swap public_token → access_token, fetch transactions & accounts
 *   OPTIONS *         — CORS preflight
 *
 * Rate limiting: max 10 Plaid API calls per client IP per 2-hour window.
 * When exceeded, an alert email is sent to oof@oof.org.
 * A nightly usage summary is emailed at 8 AM UTC via the scheduled cron.
 */

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const ALERT_EMAIL     = 'oof@oof.org';
const RATE_LIMIT_MAX  = 10;
const RATE_WINDOW_SEC = 2 * 60 * 60; // 2 hours in seconds

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
    const err = new Error(data?.error_message || data?.display_message || `Plaid error ${res.status}`);
    err.plaidCode = data?.error_code || '';
    throw err;
  }
  return data;
}

// Plaid requires a short wait after token exchange before transactions are ready.
// Retry up to maxAttempts times with a delay between each.
async function plaidPostWithRetry(env, clientId, secret, path, body, maxAttempts = 8, delayMs = 3000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await plaidPost(env, clientId, secret, path, body);
    } catch (err) {
      if (err.plaidCode === 'PRODUCT_NOT_READY' && attempt < maxAttempts) {
        console.log(`[benefitmaxxer] PRODUCT_NOT_READY on ${path}, attempt ${attempt}/${maxAttempts}, retrying in ${delayMs}ms`);
        await new Promise(r => setTimeout(r, delayMs));
        continue;
      }
      throw err;
    }
  }
}

/* ─── Rate limiting ─────────────────────────────────────────────────────────
   Key: rate:<ip>  →  { count: number, windowStart: unix-seconds }
   TTL = RATE_WINDOW_SEC so KV auto-expires stale entries.
   Returns { allowed: boolean, count: number, isNewWindow: boolean }
─────────────────────────────────────────────────────────────────────────── */
async function checkRateLimit(kv, ip) {
  if (!kv) return { allowed: true, count: 1, isNewWindow: true }; // KV not configured → open

  const key  = `rate:${ip}`;
  const now  = Math.floor(Date.now() / 1000);
  const data = await kv.get(key, 'json');

  if (!data || now - data.windowStart >= RATE_WINDOW_SEC) {
    await kv.put(key, JSON.stringify({ count: 1, windowStart: now }), { expirationTtl: RATE_WINDOW_SEC });
    return { allowed: true, count: 1, isNewWindow: true };
  }

  if (data.count >= RATE_LIMIT_MAX) {
    return { allowed: false, count: data.count, isNewWindow: false };
  }

  data.count += 1;
  await kv.put(key, JSON.stringify(data), { expirationTtl: RATE_WINDOW_SEC });
  return { allowed: true, count: data.count, isNewWindow: false };
}

/* ─── Daily usage tracking ───────────────────────────────────────────────────
   Key: daily:<YYYY-MM-DD>:<ip>  →  count
   TTL = 8 days so the previous day is always available for the cron.
─────────────────────────────────────────────────────────────────────────── */
async function recordDailyCall(kv, ip) {
  if (!kv) return;
  const date = new Date().toISOString().slice(0, 10);
  const key  = `daily:${date}:${ip}`;
  const prev = (await kv.get(key, 'json')) || 0;
  await kv.put(key, prev + 1, { expirationTtl: 8 * 24 * 3600 });
}

/* ─── Email via MailChannels ─────────────────────────────────────────────────
   Requires MAILCHANNELS_API_KEY secret.
   If not set, email is skipped but everything else still works.
─────────────────────────────────────────────────────────────────────────── */
async function sendEmail(apiKey, subject, text) {
  if (!apiKey) {
    console.warn('[benefitmaxxer] MAILCHANNELS_API_KEY not set — skipping:', subject);
    return;
  }
  try {
    const res = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token':  apiKey,
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: ALERT_EMAIL }] }],
        from:    { email: 'alerts@benefitmaxxer.workers.dev', name: 'BenefitMaxxer Alerts' },
        subject,
        content: [{ type: 'text/plain', value: text }],
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error('[benefitmaxxer] MailChannels send failed:', res.status, body);
    } else {
      console.log('[benefitmaxxer] Email sent:', subject);
    }
  } catch (err) {
    console.error('[benefitmaxxer] MailChannels error:', err.message);
  }
}

/* ─── Error alerting ─────────────────────────────────────────────────────────
   Call this whenever something unexpected goes wrong. Logs to Workers Logs
   and emails oof@oof.org if MAILCHANNELS_API_KEY is set.
─────────────────────────────────────────────────────────────────────────── */
async function alertError(env, context, errorMsg, extraDetails = '') {
  const ip  = context?.ip  || 'unknown';
  const path = context?.path || 'unknown';
  const ts  = new Date().toISOString();

  const logLine = `[benefitmaxxer] ERROR ${ts} | path=${path} ip=${ip} | ${errorMsg}${extraDetails ? '\n' + extraDetails : ''}`;
  console.error(logLine);

  // Fire-and-forget email — don't let email failure mask the real error
  sendEmail(
    env.MAILCHANNELS_API_KEY,
    `BenefitMaxxer worker error: ${errorMsg.slice(0, 80)}`,
    `BenefitMaxxer Plaid Worker — Error Alert\n\nTime:    ${ts}\nPath:    ${path}\nClient:  ${ip}\nError:   ${errorMsg}${extraDetails ? '\n\nDetails:\n' + extraDetails : ''}\n\nCheck Cloudflare Workers Logs for the full trace.`
  );
}

/* ─── Nightly cron handler ─────────────────────────────────────────────────── */
async function handleNightlySummary(env) {
  const kv     = env.USAGE_KV;
  const apiKey = env.MAILCHANNELS_API_KEY;

  if (!kv) {
    console.warn('USAGE_KV not configured — skipping nightly summary');
    return;
  }

  // Summarise yesterday's calls
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const { keys }  = await kv.list({ prefix: `daily:${yesterday}:` });

  if (keys.length === 0) {
    await sendEmail(apiKey,
      `BenefitMaxxer Daily Summary: ${yesterday}`,
      `No Plaid API calls recorded on ${yesterday}.`
    );
    return;
  }

  const entries = await Promise.all(
    keys.map(async k => {
      const count = (await kv.get(k.name, 'json')) || 0;
      const ip    = k.name.split(':').slice(2).join(':'); // handles IPv6 colons
      return { ip, count };
    })
  );
  entries.sort((a, b) => b.count - a.count);

  const total = entries.reduce((s, e) => s + e.count, 0);
  const lines = entries.map(e => `  ${e.ip}: ${e.count} call${e.count !== 1 ? 's' : ''}`).join('\n');

  await sendEmail(apiKey,
    `BenefitMaxxer Daily Summary: ${yesterday} — ${total} Plaid calls`,
    `BenefitMaxxer Plaid API usage for ${yesterday}\n\nTotal calls:    ${total}\nUnique clients: ${entries.length}\n\nBreakdown by client IP:\n${lines}`
  );
}

/* ─── Main fetch handler ────────────────────────────────────────────────────── */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const ip  = request.headers.get('CF-Connecting-IP') || 'unknown';
    const ctx = { ip, path: url.pathname };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    // ── /health — quick liveness check (GET or POST) ─────────────────────────
    if (url.pathname === '/health') {
      const { PLAID_CLIENT_ID: clientId, PLAID_SECRET: secret, PLAID_ENV: plaidEnv = 'sandbox' } = env;
      return json({
        ok:            true,
        plaid_env:     plaidEnv,
        plaid_creds:   !!(clientId && secret),
        kv_bound:      !!env.USAGE_KV,
        email_bound:   !!env.MAILCHANNELS_API_KEY,
        ts:            new Date().toISOString(),
      });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Only POST requests are accepted.' }, 405);
    }

    const { PLAID_CLIENT_ID: clientId, PLAID_SECRET: secret, PLAID_ENV: plaidEnv = 'sandbox' } = env;
    if (!clientId || !secret) {
      const msg = 'Worker not configured — PLAID_CLIENT_ID and/or PLAID_SECRET secrets are missing.';
      console.error('[benefitmaxxer]', msg);
      alertError(env, ctx, msg);
      return json({ error: msg }, 500);
    }

    // Rate limit check
    const rl = await checkRateLimit(env.USAGE_KV, ip);
    if (!rl.allowed) {
      const msg = `Rate limit exceeded (${RATE_LIMIT_MAX} calls / 2 hrs)`;
      console.warn(`[benefitmaxxer] ${msg} — ip=${ip}`);
      sendEmail(env.MAILCHANNELS_API_KEY,
        `BenefitMaxxer rate limit exceeded by ${ip}`,
        `Client IP ${ip} exceeded the limit of ${RATE_LIMIT_MAX} Plaid API calls per 2-hour window.\n\nThe call was blocked. If this is unexpected, consider blocking the IP in your Cloudflare dashboard.`
      );
      return json({ error: 'Rate limit exceeded. You may make up to 10 Plaid API calls per 2-hour window.' }, 429);
    }

    // Record this call in daily stats (fire-and-forget)
    recordDailyCall(env.USAGE_KV, ip);

    let body;
    try   { body = await request.json(); }
    catch { return json({ error: 'Request body must be valid JSON.' }, 400); }

    console.log(`[benefitmaxxer] ${url.pathname} ip=${ip}`);

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
        console.log(`[benefitmaxxer] /link-token OK ip=${ip}`);
        return json({ link_token: data.link_token });
      }

      // ── /exchange ─────────────────────────────────────────────────────────────
      if (url.pathname === '/exchange') {
        const { public_token, year } = body;
        if (!public_token) return json({ error: 'Missing public_token.' }, 400);

        const targetYear = parseInt(year) || new Date().getFullYear();
        const startDate  = `${targetYear}-01-01`;
        const endDate    = `${targetYear}-12-31`;

        const { access_token } = await plaidPost(
          plaidEnv, clientId, secret, '/item/public_token/exchange', { public_token }
        );

        // Fetch accounts immediately; transactions may need retries on first connection
        const [acctData, txnData] = await Promise.all([
          plaidPost(plaidEnv, clientId, secret, '/accounts/get', { access_token }),
          plaidPostWithRetry(plaidEnv, clientId, secret, '/transactions/get', {
            access_token,
            start_date: startDate,
            end_date:   endDate,
            options:    { count: 500, offset: 0 },
          }),
        ]);

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

        const transactions = allTxns.map(t => ({
          date:        t.date,
          description: t.name || t.merchant_name || '',
          category:    (t.personal_finance_category?.primary ||
                        (t.category || []).join(' > ') || ''),
          amount:      Math.abs(t.amount),
        }));

        const accounts = (acctData.accounts || [])
          .filter(a => a.type === 'credit')
          .map(a => ({
            id:      a.account_id,
            name:    a.official_name || a.name || '',
            type:    a.type,
            subtype: a.subtype,
            mask:    a.mask,
          }));

        console.log(`[benefitmaxxer] /exchange OK ip=${ip} txns=${transactions.length} accounts=${accounts.length}`);
        return json({ accounts, transactions });
      }

      return json({ error: `Unknown endpoint: ${url.pathname}` }, 404);

    } catch (err) {
      // Plaid API errors and unexpected exceptions both land here
      await alertError(env, ctx, err.message);
      return json({ error: err.message }, 500);
    }
  },

  async scheduled(event, env) {
    console.log('[benefitmaxxer] Running nightly summary cron');
    await handleNightlySummary(env);
  },
};

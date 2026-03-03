/**
 * BenefitMaxxer — Copilot Money CORS Proxy
 * Cloudflare Worker that relays GraphQL requests to app.copilot.money.
 *
 * Deploy:  cd worker && wrangler deploy
 *
 * Design constraints:
 *   - Stateless: no logs, no storage, no database
 *   - The worker never sees credentials — only a Bearer JWT the user
 *     generated themselves in their own Copilot session
 *   - The JWT is forwarded as-is and immediately discarded after the
 *     upstream response is returned
 */

const COPILOT_API = 'https://app.copilot.money/api/graphql';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request) {
    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    if (request.method !== 'POST') {
      return new Response('Only POST requests are accepted.', { status: 405, headers: CORS });
    }

    // Require a Bearer token — the user's own Copilot JWT
    const auth = request.headers.get('Authorization') || '';
    if (!auth.startsWith('Bearer ')) {
      return new Response('Missing Authorization: Bearer <token> header.', { status: 401, headers: CORS });
    }

    // Validate the body is JSON before forwarding
    let body;
    try {
      body = await request.text();
      JSON.parse(body);
    } catch {
      return new Response('Request body must be valid JSON.', { status: 400, headers: CORS });
    }

    // Forward to Copilot — mimic a browser request so the API accepts it
    const upstream = await fetch(COPILOT_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Origin': 'https://app.copilot.money',
        'Referer': 'https://app.copilot.money/',
      },
      body,
    });

    const text = await upstream.text();

    // Return Copilot's response verbatim — we do not inspect or store it
    return new Response(text, {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json', ...CORS },
    });
  },
};

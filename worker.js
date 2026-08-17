/**
 * Relay HTTPS per a emissores que només emeten per http.
 *
 * Una pàgina servida per https no pot reproduir un stream http (mixed content).
 * Aquest Worker fa de pont: el navegador li demana la ràdio per https i ell
 * la va a buscar per http, retornant el flux tal qual.
 *
 * Ús:  https://EL-TEU-WORKER.workers.dev/?url=http%3A%2F%2F...
 *
 * Desplegament:
 *   npm create cloudflare@latest radio-relay -- --type=hello-world
 *   (substitueix src/index.js per aquest fitxer)
 *   npx wrangler deploy
 *
 * Enganxa la URL resultant al botó ⚙ de l'aplicació.
 */

// Només deixem passar àudio i llistes de reproducció, per no convertir això
// en un proxy obert de propòsit general.
const ALLOWED_TYPES = /^(audio\/|application\/(ogg|x-mpegurl|vnd\.apple\.mpegurl|octet-stream)|video\/mp2t)/i;

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors() });
    }

    const target = new URL(request.url).searchParams.get('url');
    if (!target) return new Response('Falta el paràmetre ?url=', { status: 400, headers: cors() });

    let upstreamUrl;
    try {
      upstreamUrl = new URL(target);
    } catch {
      return new Response('URL invàlida', { status: 400, headers: cors() });
    }
    if (upstreamUrl.protocol !== 'http:' && upstreamUrl.protocol !== 'https:') {
      return new Response('Esquema no permès', { status: 400, headers: cors() });
    }

    const headers = { 'User-Agent': 'RadioRelay/1.0', 'Icy-MetaData': '0' };
    const range = request.headers.get('Range');
    if (range) headers.Range = range;

    let upstream;
    try {
      upstream = await fetch(upstreamUrl.toString(), { headers, redirect: 'follow' });
    } catch (e) {
      return new Response('No s\'ha pogut connectar amb l\'emissora', { status: 502, headers: cors() });
    }

    const type = upstream.headers.get('Content-Type') || '';
    if (type && !ALLOWED_TYPES.test(type)) {
      return new Response('Tipus de contingut no permès: ' + type, { status: 415, headers: cors() });
    }

    const out = cors();
    if (type) out['Content-Type'] = type;
    const len = upstream.headers.get('Content-Length');
    if (len) out['Content-Length'] = len;
    const acceptRanges = upstream.headers.get('Accept-Ranges');
    if (acceptRanges) out['Accept-Ranges'] = acceptRanges;
    out['Cache-Control'] = 'no-store';

    return new Response(upstream.body, { status: upstream.status, headers: out });
  }
};

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Range',
    'Access-Control-Expose-Headers': 'Content-Length, Content-Range, Accept-Ranges'
  };
}

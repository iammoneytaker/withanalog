import { stats } from './stats.js';

// Cloudflare Worker: 정적 사이트(out/) 서빙 + 제휴 링크 클릭 기록 + 옛 키보드 사이트 주소 410 처리
const GONE = [
  /^\/keyboards(\/|$)/,
  /^\/guides(\/|$)/,
  /^\/typing-practice/,
  /^\/methodology/,
  /^\/adminsangwon/,
  /^\/contact/,
  /^\/recommendations/,
  /^\/reviews/,
  /^\/projects/,
  /^\/household-items/,
  /^\/story/,
  /^\/contribute/,
  /^\/blog(\/|$)/,
  /^\/community(\/|$)/,
  /^\/tools\/?$/,
  /^\/tools\/(?!club-fit)/,
  /^\/compare\/.+/,
];

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

export default {
  // 예약 발행: Cloudflare 크론이 정해진 시각에 GitHub Actions 빌드를 요청합니다(GitHub 자체 예약은 몇 시간씩 늦어짐).
  async scheduled(event, env, ctx) {
    if (!env.GH_DISPATCH_TOKEN) return;
    ctx.waitUntil(
      fetch('https://api.github.com/repos/iammoneytaker/withanalog/actions/workflows/deploy.yml/dispatches', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.GH_DISPATCH_TOKEN}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'withanalog-scheduler',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ref: 'main' }),
      }),
    );
  },

  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === 'withanalog.com') {
      url.hostname = 'www.withanalog.com';
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === '/stats' || url.pathname === '/stats/') {
      return stats(request, env);
    }

    if (url.pathname.startsWith('/editorial-policy')) {
      return Response.redirect(`${url.origin}/about/`, 301);
    }

    if (url.pathname === '/api/click') {
      if (request.method !== 'POST') return new Response(null, { status: 405 });
      try {
        const body = await request.json();
        const pid = String(body.pid || '').slice(0, 40);
        const path = String(body.path || '').slice(0, 200);
        if (pid && env.DB) {
          await env.DB.prepare('INSERT INTO clicks (ts, pid, path, country) VALUES (?, ?, ?, ?)')
            .bind(new Date().toISOString(), pid, path, (request.cf && request.cf.country) || '')
            .run();
        }
      } catch (e) {
        // 기록 실패는 사용자 경험에 영향 주지 않음
      }
      return new Response(null, { status: 204 });
    }

    if (GONE.some((r) => r.test(url.pathname))) {
      return new Response('이 페이지는 사이트 개편으로 삭제되었습니다. https://www.withanalog.com/', {
        status: 410,
        headers: { 'content-type': 'text/plain; charset=utf-8', 'x-robots-tag': 'noindex' },
      });
    }

    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) out.headers.set(k, v);
    if (res.ok && (/\.(jpg|jpeg|png|webp|svg|css|js|woff2)$/.test(url.pathname) || url.pathname.startsWith('/_next/static/'))) {
      out.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
    return out;
  },
};

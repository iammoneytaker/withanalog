// /stats : 운영자용 클릭 통계 (Basic 인증, 비밀번호는 Worker secret STATS_PASSWORD)
import products from '../data/products.json';

const NAME = new Map(products.items.map((p) => [p.id, `${p.brand} · ${p.name}`]));
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function unauthorized() {
  return new Response('로그인이 필요합니다', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="withanalog stats", charset="UTF-8"' } });
}

export async function stats(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const [scheme, b64] = auth.split(' ');
  if (!env.STATS_PASSWORD || scheme !== 'Basic' || !b64) return unauthorized();
  let user = '', pass = '';
  try { [user, pass] = atob(b64).split(':'); } catch { return unauthorized(); }
  if (user !== 'admin' || pass !== env.STATS_PASSWORD) return unauthorized();

  const url = new URL(request.url);
  const days = Math.min(90, Math.max(1, Number(url.searchParams.get('days')) || 7));
  const since = new Date(Date.now() - days * 86400000).toISOString();
  const q = (sql, ...b) => env.DB.prepare(sql).bind(...b).all().then((r) => r.results || []);
  const [total, byDay, byPath, byProduct, byCountry] = await Promise.all([
    q('SELECT COUNT(*) n FROM clicks WHERE ts >= ?', since),
    q("SELECT substr(datetime(ts, '+9 hours'),1,10) d, COUNT(*) n FROM clicks WHERE ts >= ? GROUP BY d ORDER BY d DESC", since),
    q('SELECT path, COUNT(*) n FROM clicks WHERE ts >= ? GROUP BY path ORDER BY n DESC LIMIT 30', since),
    q('SELECT pid, COUNT(*) n FROM clicks WHERE ts >= ? GROUP BY pid ORDER BY n DESC LIMIT 30', since),
    q('SELECT country, COUNT(*) n FROM clicks WHERE ts >= ? GROUP BY country ORDER BY n DESC', since),
  ]);
  const table = (head, rows) => `<table><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
  const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>클릭 통계</title>
<style>body{font-family:-apple-system,'Apple SD Gothic Neo',sans-serif;max-width:900px;margin:0 auto;padding:16px;font-size:16px;color:#1b1f1d}h1{font-size:22px}h2{font-size:18px;margin-top:28px}table{border-collapse:collapse;width:100%;font-size:14px}th,td{border-bottom:1px solid #dfe5e1;padding:6px 8px;text-align:left;vertical-align:top}th{background:#eaf5ee}.big{font-size:32px;font-weight:800;color:#1f6f43}.nav a{margin-right:10px}</style></head><body>
<h1>withanalog 제휴 링크 클릭 통계</h1>
<p class="nav">기간: ${[1, 7, 30, 90].map((d) => `<a href="?days=${d}">${d}일</a>`).join('')} · 현재 ${days}일 · 운영자 본인 클릭(?me=1 기기)은 제외</p>
<p class="big">${total[0]?.n ?? 0}회</p>
<h2>날짜별</h2>${table(['날짜(KST)', '클릭'], byDay.map((r) => [r.d, r.n]))}
<h2>글별</h2>${table(['페이지', '클릭'], byPath.map((r) => [`<a href="${esc(r.path)}">${esc(r.path)}</a>`, r.n]))}
<h2>상품별</h2>${table(['상품', '클릭'], byProduct.map((r) => [esc(NAME.get(r.pid) || r.pid), r.n]))}
<h2>국가</h2>${table(['국가', '클릭'], byCountry.map((r) => [esc(r.country || '-'), r.n]))}
<h2>다른 통계</h2><ul>
<li><a href="https://dash.cloudflare.com/d81a9a24fbc4b590008a46a0ccdb12f8/web-analytics/overview/visits?siteTag~in=022bd7e232ab4b16acf2d4ad192e244c&excludeBots=Yes">방문·유입 경로 (Cloudflare Web Analytics)</a></li>
<li><a href="https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Awithanalog.com">구글 검색어 (서치콘솔 실적)</a></li>
<li><a href="https://searchadvisor.naver.com/console/board">네이버 검색어 (서치어드바이저, ksj 계정)</a></li>
<li><a href="https://brandconnect.naver.com/855201947815104/affiliate/products-link">판매 실적 (브랜드커넥트, ksj 계정)</a></li></ul>
</body></html>`;
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' } });
}

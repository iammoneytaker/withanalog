// 최근 3시간 안에 공개된 글을 IndexNow(빙·네이버)로 알립니다.
import fs from 'node:fs';
import path from 'node:path';
const HOST = 'www.withanalog.com';
const KEY = 'a59741a29948d6a9c3ec392fdcd68242';
const dir = path.join(process.cwd(), 'content', 'posts');
const now = Date.now();
const urls = [];
for (const f of fs.existsSync(dir) ? fs.readdirSync(dir) : []) {
  if (!f.endsWith('.md')) continue;
  const head = fs.readFileSync(path.join(dir, f), 'utf8').split('\n---')[0];
  const pa = head.match(/publishAt:\s*"?([^"\n]+)"?/);
  const sl = head.match(/slug:\s*"?([^"\n]+)"?/);
  if (!pa || !sl) continue;
  const t = new Date(pa[1].trim()).getTime();
  if (t <= now && now - t < 3 * 3600 * 1000) urls.push(`https://${HOST}/posts/${sl[1].trim()}/`);
}
if (!urls.length) { console.log('새로 공개된 글 없음'); process.exit(0); }
urls.push(`https://${HOST}/`, `https://${HOST}/sitemap.xml`);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log('IndexNow', res.status, urls.length);

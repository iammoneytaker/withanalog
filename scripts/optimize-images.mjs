// 빌드 전에 실행: public/images 의 JPG를 WebP(480/800/1200px)로 만들고, AI 생성 이미지라는 XMP 메타데이터를 넣습니다.
// 결과 파일 이름: /images/posts/<slug>/<slug>-<원본이름>-<폭>.webp  (git에는 올리지 않음)
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.join(process.cwd(), 'public', 'images');
const WIDTHS = [480, 800, 1200];
const XMP = `<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?><x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" xmlns:dc="http://purl.org/dc/elements/1.1/"><Iptc4xmpExt:DigitalSourceType>http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia</Iptc4xmpExt:DigitalSourceType><dc:rights><rdf:Alt><rdf:li xml:lang="x-default">위드아날로그 파크골프 (AI 생성 이미지)</rdf:li></rdf:Alt></dc:rights></rdf:Description></rdf:RDF></x:xmpmeta><?xpacket end="w"?>`;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : /\.(jpe?g|png)$/i.test(d.name) ? [p] : [];
  });
}

export function variantBase(file) {
  const rel = path.relative(ROOT, file).split(path.sep);
  const name = path.basename(file).replace(/\.(jpe?g|png)$/i, '');
  if (rel[0] === 'posts' && rel.length === 3) return path.join(ROOT, 'posts', rel[1], `${rel[1]}-${name}`);
  return path.join(path.dirname(file), name);
}

let made = 0;
for (const file of walk(ROOT)) {
  const base = variantBase(file);
  const src = sharp(file);
  const meta = await src.metadata();
  for (const w of WIDTHS) {
    if (meta.width && w > meta.width && w !== WIDTHS[0]) continue;
    const out = `${base}-${w}.webp`;
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(file).mtimeMs) continue;
    let pipe = sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 });
    if (typeof pipe.withXmp === 'function') pipe = pipe.withXmp(XMP);
    await pipe.toFile(out);
    made += 1;
  }
}
console.log(`optimize-images: ${made} webp files`);

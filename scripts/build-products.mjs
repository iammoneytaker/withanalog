// CSV(비공개, 수수료 포함) -> data/products.json (공개용, 수수료 제외)
import fs from 'node:fs';
const src = process.argv[2];
const text = fs.readFileSync(src, 'utf8').replace(/^\ufeff/, '');
const rows = [];
let cur = [], field = '', q = false;
for (let i = 0; i < text.length; i++) {
  const c = text[i];
  if (q) { if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; } else field += c; }
  else if (c === '"') q = true;
  else if (c === ',') { cur.push(field); field = ''; }
  else if (c === '\n') { cur.push(field.replace(/\r$/, '')); rows.push(cur); cur = []; field = ''; }
  else field += c;
}
if (field || cur.length) { cur.push(field); rows.push(cur); }
const head = rows.shift();
const idx = Object.fromEntries(head.map((h, i) => [h, i]));
const BRANDS = [['히토미혼마','히토미혼마'],['부쿠로혼마','부쿠로혼마'],['혼마','혼마'],['데이비드','데이비드'],['프라임','프라임'],['피닉스','피닉스'],['미즈노','미즈노'],['렌스메이트','렌스메이트'],['루키','루키루키'],['브라마','브라마'],['판테온','판테온'],['아트스윙','피닉스'],['킹스타','킹스타'],['세븐스타','세븐스타'],['IMP','IMP'],['볼빅','볼빅'],['까스텔바작','까스텔바작'],['바로스포츠','바로스포츠'],['프로샷','프로샷'],['카이어슨','카이어슨'],['오렌지','오렌지'],['아식스','아식스'],['뉴월드','뉴월드'],['다이아코어','다이아코어'],['고인돌','고인돌'],['산토','산토'],['위너','위너'],['MG01','미즈노'],['PG01','미즈노']];
function brandOf(name, store) { for (const [k, v] of BRANDS) if (name.includes(k)) return v; return store.replace(/\s+/g,'').replace(/^루키루키$/,'루키루키').replace(/(공식|스토어|몰|샵|코리아)$/,'').trim() || store; }
function typeOf(cat, name) {
  if (cat === '가방') return 'bag';
  if (cat === '공') return 'ball';
  if (/풀세트|세트|구성/.test(name) && /채|클럽|파크볼채/.test(name)) return 'fullset';
  if (/채|클럽|파크볼채|드라이버/.test(name)) return 'club';
  if (/공|볼/.test(name)) return 'ball';
  if (/가방|백|파우치|힙색|케이스/.test(name)) return 'bag';
  return 'gear';
}
const out = rows.filter(r => r.length > 5).map(r => {
  const g = k => r[idx[k]] ?? '';
  const name = g('name'), store = g('store');
  const rv = g('reviewText').match(/([0-9.]+)\s*리뷰\s*([0-9,]+)/);
  const gender = /여성|레이디|LADY|우먼|WOMEN/i.test(name) ? 'women' : /남성|MEN\b|맨즈/i.test(name) ? 'men' : 'all';
  return {
    id: g('bcId'), name, store, brand: brandOf(name, store), type: typeOf(g('cat'), name), gender,
    price: Number(g('price')) || null, listPrice: Number(g('orig')) || null,
    rating: rv ? Number(rv[1]) : null, reviews: rv ? Number(rv[2].replace(/,/g, '')) : 0,
    url: g('url'),
    thumb: g('thumb') || null,
  };
});
fs.writeFileSync('data/products.json', JSON.stringify({ checkedAt: process.argv[3] || new Date().toISOString().slice(0,10), items: out }, null, 1));
const t = {}; out.forEach(p => t[p.type] = (t[p.type] || 0) + 1);
console.log(out.length, JSON.stringify(t));
const b = {}; out.forEach(p => b[p.brand] = (b[p.brand] || 0) + 1); console.log(JSON.stringify(b));

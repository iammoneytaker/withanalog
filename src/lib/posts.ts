import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { getProduct, productCardHtml } from './products';
import { SITE } from './site';
import { pictureizeHtml } from './img';

export type Faq = { q: string; a: string };
export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  keyword: string;
  publishAt: string;
  updatedAt: string;
  hero: string;
  heroAlt: string;
  heroAi: boolean;
  faq: Faq[];
  summary: string[];
};
export type Post = PostMeta & { html: string; toc: { id: string; text: string }[]; readMin: number; images: string[] };

/** 메타·FAQ 같은 일반 텍스트에서 마크다운 강조 기호 제거 */
function plain(t: string): string {
  return t.replace(/\*\*([^*]+?)\*\*/g, '$1').replace(/\*\*/g, '');
}

const DIR = path.join(process.cwd(), 'content', 'posts');
const NOW = Date.now();

function readAll(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(DIR, f), 'utf8');
      const { data, content } = matter(raw);
      const slug = String(data.slug || f.replace(/\.md$/, ''));
      const meta: PostMeta = {
        slug,
        title: plain(String(data.title || slug)),
        description: plain(String(data.description || '')),
        category: String(data.category || 'guide'),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        keyword: String(data.keyword || ''),
        publishAt: new Date(data.publishAt || '2026-10-24T00:00:00+09:00').toISOString(),
        updatedAt: new Date(data.updatedAt || data.publishAt || '2026-10-24T00:00:00+09:00').toISOString(),
        hero: String(data.hero || ''),
        heroAlt: String(data.heroAlt || ''),
        heroAi: data.heroAi !== false,
        summary: Array.isArray(data.summary) ? data.summary.map((x: unknown) => plain(String(x))) : [],
        faq: Array.isArray(data.faq) ? data.faq.map((x: { q: unknown; a: unknown }) => ({ q: plain(String(x.q)), a: plain(String(x.a)) })) : [],
      };
      return { ...meta, ...render(content), };
    })
    .filter((p) => new Date(p.publishAt).getTime() <= NOW)
    .sort((a, b) => b.publishAt.localeCompare(a.publishAt));
}

function render(md: string): { html: string; toc: { id: string; text: string }[]; readMin: number; images: string[] } {
  let cardCount = 0;
  const withCards = md.replace(/^\{\{product:([0-9A-Za-z_-]+)\}\}\s*$/gm, (_m, id: string) => {
    const p = getProduct(id);
    if (p && cardCount >= SITE.maxProductsPerPost) return '';
    if (p) cardCount += 1;
    return p ? '\n' + productCardHtml(p) + '\n' : '';
  });
  // 한국어 조사 바로 앞의 **굵게** 가 CommonMark 규칙상 풀리지 않는 문제를 막기 위해 먼저 <strong>으로 바꿉니다.
  const withBold = withCards.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>');
  let html = marked.parse(withBold, { async: false, gfm: true }) as string;
  const toc: { id: string; text: string }[] = [];
  let n = 0;
  html = html.replace(/<h2>(.*?)<\/h2>/g, (_m, inner: string) => {
    n += 1;
    const id = `s${n}`;
    toc.push({ id, text: inner.replace(/<[^>]+>/g, '') });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  html = html
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>')
    .replace(/<img /g, '<img loading="lazy" decoding="async" ');
  html = pictureizeHtml(html);
  const chars = md.replace(/\s+/g, '').length;
  const images = [...md.matchAll(/!\[[^\]]*\]\((\/images\/[^)\s]+)\)/g)].map((m) => m[1]);
  return { html, toc, readMin: Math.max(2, Math.round(chars / 600)), images };
}

let cache: Post[] | null = null;
export function getPosts(): Post[] {
  if (!cache) cache = readAll();
  return cache;
}
export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}
export function getPostsByCategory(cat: string): Post[] {
  return getPosts().filter((p) => p.category === cat);
}
export function relatedPosts(post: Post, n = 4, exclude: string[] = []): Post[] {
  const same = getPosts().filter((p) => p.slug !== post.slug && !exclude.includes(p.slug) && p.category === post.category);
  const others = getPosts().filter((p) => p.slug !== post.slug && !exclude.includes(p.slug) && p.category !== post.category && p.category !== 'brands');
  return [...same, ...others].slice(0, n);
}
export function fmtDate(iso: string): string {
  const d = new Date(new Date(iso).getTime() + 9 * 3600 * 1000);
  return `${d.getUTCFullYear()}.${String(d.getUTCMonth() + 1).padStart(2, '0')}.${String(d.getUTCDate()).padStart(2, '0')}`;
}

const TOPICS: [string, RegExp][] = [
  ['certified', /공인|협회|대회|규정|규격/], ['length', /길이|키 |cm/], ['weight', /무게|가벼|경량/],
  ['ball', /공|볼/], ['bag', /가방|파우치|힙색|백팩|하프백|스탠드백|홀더/], ['tee', /티잉|티 사용|고무티|파크골프 티/],
  ['grip', /그립|장갑/], ['head', /헤드|감나무|단풍|흑단|원목/], ['women', /여성|부부|엄마|어머니/], ['left', /좌타|왼손/],
  ['gift', /선물|환갑|칠순|부모/], ['winter', /겨울|방한|추위/], ['starter', /입문|처음|초보|준비물|규칙|치는 법|동호회/],
  ['price', /가격|만원|만 원|예산|가성비|저렴/], ['set', /세트|풀세트|단품/], ['care', /관리|보관|중고|렌탈|대여/],
];
function topicsOf(p: PostMeta): Set<string> {
  const text = [p.title, p.keyword, ...(p.tags || [])].join(' ');
  return new Set(TOPICS.filter(([, re]) => re.test(text)).map(([k]) => k));
}
/** 정보 글(guide)에서는 장비 글로, 장비 글에서는 규칙·정보 글로 이어 주는 링크 */
export function crossLinks(post: Post, n = 3): { kind: 'gear' | 'info'; posts: Post[] } {
  const isGuide = post.category === 'guide';
  const mine = topicsOf(post);
  const pool = getPosts().filter((p) => p.slug !== post.slug && p.category !== 'brands' && (isGuide ? p.category !== 'guide' : p.category === 'guide'));
  const scored = pool
    .map((p) => { let s = 0; topicsOf(p).forEach((k) => { if (mine.has(k)) s++; }); return { p, s }; })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || b.p.publishAt.localeCompare(a.p.publishAt));
  return { kind: isGuide ? 'gear' : 'info', posts: scored.slice(0, isGuide ? n : 2).map((x) => x.p) };
}

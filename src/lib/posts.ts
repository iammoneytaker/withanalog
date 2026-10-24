import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { getProduct, productCardHtml } from './products';
import { SITE } from './site';

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
};
export type Post = PostMeta & { html: string; toc: { id: string; text: string }[]; readMin: number };

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
        title: String(data.title || slug),
        description: String(data.description || ''),
        category: String(data.category || 'guide'),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        keyword: String(data.keyword || ''),
        publishAt: new Date(data.publishAt || '2026-10-24T00:00:00+09:00').toISOString(),
        updatedAt: new Date(data.updatedAt || data.publishAt || '2026-10-24T00:00:00+09:00').toISOString(),
        hero: String(data.hero || ''),
        heroAlt: String(data.heroAlt || ''),
        heroAi: data.heroAi !== false,
        faq: Array.isArray(data.faq) ? data.faq.map((x: { q: unknown; a: unknown }) => ({ q: String(x.q), a: String(x.a) })) : [],
      };
      return { ...meta, ...render(content), };
    })
    .filter((p) => new Date(p.publishAt).getTime() <= NOW)
    .sort((a, b) => b.publishAt.localeCompare(a.publishAt));
}

function render(md: string): { html: string; toc: { id: string; text: string }[]; readMin: number } {
  let cardCount = 0;
  const withCards = md.replace(/^\{\{product:([0-9A-Za-z_-]+)\}\}\s*$/gm, (_m, id: string) => {
    const p = getProduct(id);
    if (p && cardCount >= SITE.maxProductsPerPost) return '';
    if (p) cardCount += 1;
    return p ? '\n' + productCardHtml(p) + '\n' : '';
  });
  let html = marked.parse(withCards, { async: false, gfm: true }) as string;
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
  const chars = md.replace(/\s+/g, '').length;
  return { html, toc, readMin: Math.max(2, Math.round(chars / 600)) };
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
export function relatedPosts(post: Post, n = 4): Post[] {
  const same = getPosts().filter((p) => p.slug !== post.slug && p.category === post.category);
  const others = getPosts().filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...same, ...others].slice(0, n);
}
export function fmtDate(iso: string): string {
  const d = new Date(new Date(iso).getTime() + 9 * 3600 * 1000);
  return `${d.getUTCFullYear()}.${String(d.getUTCMonth() + 1).padStart(2, '0')}.${String(d.getUTCDate()).padStart(2, '0')}`;
}

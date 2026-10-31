import type { MetadataRoute } from 'next';
import { getPosts, getPostsByCategory } from '@/lib/posts';
import { CATEGORIES, SITE } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const latest = posts[0]?.updatedAt ?? new Date().toISOString();
  return [
    { url: `${SITE.url}/`, lastModified: latest, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE.url}/compare/`, lastModified: latest, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE.url}/tools/club-fit/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/guide/rules/`, lastModified: latest, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE.url}/guide/terms/`, lastModified: latest, changeFrequency: 'weekly', priority: 0.9 },
    ...CATEGORIES.filter((c) => getPostsByCategory(c.slug).length > 0).map((c) => ({ url: `${SITE.url}/category/${c.slug}/`, lastModified: latest, changeFrequency: 'daily' as const, priority: 0.8 })),
    ...posts.map((p) => ({ url: `${SITE.url}/posts/${p.slug}/`, lastModified: p.updatedAt, changeFrequency: 'monthly' as const, priority: 0.8, images: [p.hero, ...p.images].filter(Boolean).map((i) => `${SITE.url}${i}`) })),
    ...['about', 'disclosure'].map((s) => ({ url: `${SITE.url}/${s}/`, changeFrequency: 'yearly' as const, priority: 0.3 })),
  ];
}

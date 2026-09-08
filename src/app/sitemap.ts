import type { MetadataRoute } from 'next';
import { SITE_URL, VERIFIED_DATE } from '@/lib/seo';
import { keyboards } from '@/lib/keyboards';
import { guides } from '@/lib/guides';
import { toolCatalog } from '@/lib/tool-catalog';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/keyboards', '/compare', '/compare/aula-f75-vs-aula-f99', '/guides', '/methodology', '/tools', ...toolCatalog.map(tool => tool.path), '/tools/2f4712ba-2e77-4e5c-a418-c4f6d3a03787', ...keyboards.map(product => `/keyboards/${product.slug}`), ...guides.map(guide => `/guides/${guide.slug}`)];
  return Array.from(new Set(paths)).map(path => ({ url: `${SITE_URL}${path === '/' ? '' : path}`, ...(path.startsWith('/keyboards') || path.startsWith('/guides') || path === '/methodology' ? { lastModified: VERIFIED_DATE } : {}) }));
}

import { getPosts } from '@/lib/posts';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

const x = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c] as string);

export function GET() {
  const items = getPosts()
    .slice(0, 50)
    .map(
      (p) => `<item><title>${x(p.title)}</title><link>${SITE.url}/posts/${p.slug}/</link><guid>${SITE.url}/posts/${p.slug}/</guid><pubDate>${new Date(p.publishAt).toUTCString()}</pubDate><description>${x(p.description)}</description></item>`,
    )
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${x(SITE.name)}</title><link>${SITE.url}/</link><description>${x(SITE.description)}</description><language>ko</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}

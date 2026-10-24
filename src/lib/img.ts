/** /images/... JPG 경로에 대응하는 WebP 변형 경로(빌드 때 scripts/optimize-images.mjs 가 생성) */
const WIDTHS = [480, 800, 1200];

function base(src: string): string | null {
  const m = src.match(/^\/images\/posts\/([^/]+)\/([^/]+)\.(jpe?g|png)$/i);
  if (m) return `/images/posts/${m[1]}/${m[1]}-${m[2]}`;
  const m2 = src.match(/^(\/images\/[^?]+)\.(jpe?g|png)$/i);
  return m2 ? m2[1] : null;
}

export function webpSrcSet(src: string, max = 1200): string | null {
  const b = base(src);
  if (!b) return null;
  return WIDTHS.filter((w) => w <= max).map((w) => `${b}-${w}.webp ${w}w`).join(', ');
}

/** 본문 HTML의 <img src="/images/...jpg"> 를 <picture>로 감쌉니다. */
export function pictureizeHtml(html: string): string {
  return html.replace(/<img ([^>]*?)src="(\/images\/[^"]+\.(?:jpe?g|png))"([^>]*)>/g, (all, pre: string, src: string, post: string) => {
    const set = webpSrcSet(src);
    if (!set) return all;
    return `<picture><source type="image/webp" srcset="${set}" sizes="(max-width: 760px) 100vw, 760px"><img ${pre}src="${src}"${post} width="1200" height="675"></picture>`;
  });
}

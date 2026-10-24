import data from '../../data/products.json';

export type Product = {
  id: string;
  name: string;
  store: string;
  brand: string;
  type: 'club' | 'fullset' | 'bag' | 'ball' | 'gear';
  gender: 'men' | 'women' | 'all';
  price: number | null;
  listPrice: number | null;
  rating: number | null;
  reviews: number;
  url: string;
};

export const PRODUCTS: Product[] = (data as { items: Product[] }).items;
export const PRODUCTS_CHECKED_AT: string = (data as { checkedAt: string }).checkedAt;

const byId = new Map(PRODUCTS.map((p) => [p.id, p]));
export function getProduct(id: string): Product | undefined {
  return byId.get(id);
}

export function won(n: number | null | undefined): string {
  if (!n) return '-';
  return n.toLocaleString('ko-KR') + '원';
}

export const TYPE_LABEL: Record<Product['type'], string> = {
  club: '파크골프채',
  fullset: '풀세트',
  bag: '가방·파우치',
  ball: '공',
  gear: '용품',
};

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

/** 본문 마크다운의 {{product:ID}} 를 상품 카드 HTML로 바꿉니다. 링크는 발급받은 원본 그대로 사용합니다. */
export function productCardHtml(p: Product): string {
  const discount = p.listPrice && p.price && p.listPrice > p.price ? Math.round((1 - p.price / p.listPrice) * 100) : 0;
  return `<div class="pcard">
<div class="pcard-body">
<p class="pcard-brand">${esc(p.brand)} · ${esc(TYPE_LABEL[p.type])}</p>
<p class="pcard-name">${esc(p.name)}</p>
<p class="pcard-price">${discount ? `<span class="pcard-off">${discount}%</span> ` : ''}<strong>${won(p.price)}</strong>${discount ? ` <del>${won(p.listPrice)}</del>` : ''}</p>
<p class="pcard-meta">${p.rating ? `평점 ${p.rating} · ` : ''}리뷰 ${p.reviews.toLocaleString('ko-KR')}개 · ${esc(PRODUCTS_CHECKED_AT)} 기준</p>
</div>
<a class="pcard-btn" href="${esc(p.url)}" target="_blank" rel="sponsored nofollow noopener" data-pid="${esc(p.id)}">네이버에서 가격 확인하기</a>
</div>`;
}

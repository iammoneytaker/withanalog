import data from '../../data/products.json';
import specData from '../../data/specs.json';
import { SITE } from './site';

export type Spec = {
  weightG?: number | string;
  lengthCm?: number | string;
  head?: string;
  shaft?: string;
  certified?: string;
  leftHanded?: boolean;
  madeIn?: string;
  setItems?: string;
  level?: string;
  pieces?: number;
  glow?: boolean;
  bagType?: string;
  clubCapacity?: number | string;
  features?: string[];
  conflicts?: string;
};

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
  thumb?: string | null;
  spec?: Spec;
};

const SPECS = ((specData as { items?: Record<string, Spec> }).items ?? {}) as Record<string, Spec>;
export const SPECS_CHECKED_AT: string = (specData as { checkedAt?: string }).checkedAt ?? '';

export const PRODUCTS: Product[] = (data as { items: Product[] }).items.map((p) => ({ ...p, spec: SPECS[p.id] }));
export const PRODUCTS_CHECKED_AT: string = (data as { checkedAt: string }).checkedAt;

const byId = new Map(PRODUCTS.map((p) => [p.id, p]));
export function getProduct(id: string): Product | undefined {
  return byId.get(id);
}

/** 상품 썸네일 주소. 판매 페이지 이미지는 저장하지 않고 네이버 이미지 서버에서 작은 크기로 불러옵니다. */
export function productImage(p: Pick<Product, 'thumb' | 'type'>): { src: string; external: boolean } {
  if (SITE.productImages && p.thumb) return { src: `${p.thumb}?type=f300`, external: true };
  return { src: `/images/types/${p.type}.jpg`, external: false };
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

/** 표시용 스펙 요약 (확인된 값만) */
export function specChips(s?: Spec): string[] {
  if (!s) return [];
  const out: string[] = [];
  if (s.head) out.push(`헤드 ${s.head}`);
  if (s.weightG) out.push(`${s.weightG}g`);
  if (s.lengthCm) out.push(`${s.lengthCm}cm`);
  if (s.shaft) out.push(`샤프트 ${s.shaft}`);
  if (s.pieces) out.push(`${s.pieces}피스`);
  if (s.bagType) out.push(s.bagType);
  if (s.certified && s.certified !== '확인 필요') out.push(s.certified);
  if (s.leftHanded) out.push('좌타 가능');
  if (s.glow) out.push('야광/LED');
  if (s.madeIn) out.push(`${s.madeIn} 제조`);
  return out;
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

/** 본문 마크다운의 {{product:ID}} 를 상품 카드 HTML로 바꿉니다. 링크는 발급받은 원본 그대로 사용합니다. */
export function productCardHtml(p: Product): string {
  const discount = p.listPrice && p.price && p.listPrice > p.price ? Math.round((1 - p.price / p.listPrice) * 100) : 0;
  const img = productImage(p);
  const chips = specChips(p.spec).slice(0, 5);
  return `<div class="pcard">
<div class="pcard-top">
<img class="pcard-img" src="${esc(img.src)}" alt="${esc(p.name)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" width="96" height="96">
<div class="pcard-body">
<p class="pcard-brand">${esc(p.brand)} · ${esc(TYPE_LABEL[p.type])}</p>
<p class="pcard-name">${esc(p.name)}</p>
<p class="pcard-price">${discount ? `<span class="pcard-off">${discount}%</span> ` : ''}<strong>${won(p.price)}</strong>${discount ? ` <del>${won(p.listPrice)}</del>` : ''}</p>
</div>
</div>
${chips.length ? `<p class="chips">${chips.map((c) => `<span>${esc(c)}</span>`).join('')}</p>` : ''}
<p class="pcard-meta">${p.rating ? `평점 ${p.rating} · ` : ''}리뷰 ${p.reviews.toLocaleString('ko-KR')}개 · ${esc(PRODUCTS_CHECKED_AT)} 기준${img.external ? ` · ${esc(SITE.imageCredit)}` : ' · 이미지는 종류 예시(AI)'}</p>
<a class="pcard-btn" href="${esc(p.url)}" target="_blank" rel="sponsored nofollow noopener" data-pid="${esc(p.id)}">네이버에서 가격 확인하기</a>
<p class="pcard-ad">제휴 링크 · 구매 시 판매 수수료를 받을 수 있습니다</p>
</div>`;
}

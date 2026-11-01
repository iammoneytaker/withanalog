import type { Metadata } from 'next';
import CompareTable, { type TopPick } from './CompareTable';
import JsonLd from '@/components/JsonLd';
import { PRODUCTS, PRODUCTS_CHECKED_AT, productImage } from '@/lib/products';
import { getPosts } from '@/lib/posts';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: '파크골프채 비교표 (가격·무게·헤드 소재·공인 여부)',
  description: `파크골프채·풀세트·가방·공 ${PRODUCTS.length}개를 가격뿐 아니라 무게, 길이, 헤드 소재, 협회 공인, 좌타 여부로 걸러 보고 최대 3개를 나란히 비교할 수 있습니다.`,
  alternates: { canonical: '/compare/' },
};

/** 실제 제휴 링크 클릭이 많은 모델 (D1 클릭 기록 기준, 주 1회 갱신) */
const TOP: TopPick[] = [
  { id: '815083101011363', who: '처음 사는 분' },
  { id: '854343229139456', who: '가벼운 채 찾는 여성' },
  { id: '998105383942816', who: '국산·30만 원대' },
  { id: '808018435177763', who: '감나무 헤드 원하는 분' },
  { id: '920154102660128', who: '왼손잡이·국산' },
];

const NOISE = [/\[[^\]]*\]/g, /\([^)]*\)/g, /협회\s*공인\s*인증|협회공인인증|공인인증|협회\s*공인/g, /파크볼채|파크골프채|파크 골프채|파크골프/g, /국산|최고급|프리미엄|초경량|고급|정품|신상품|입문자용|입문용|선물용|남녀공용|남\/여|남여/g, /\s{2,}/g];
function shortName(name: string, brand: string): string {
  let s = name;
  for (const re of NOISE) s = s.replace(re, ' ');
  s = s.replace(/\s+/g, ' ').trim();
  if (brand && !s.includes(brand)) s = `${brand} ${s}`;
  if (s.length > 30) s = s.slice(0, 30).replace(/\s\S*$/, '') + '…';
  return s || name.slice(0, 30);
}

export default function ComparePage() {
  const posts = getPosts();
  const postFor = (id: string, brand = '') => {
    const has = posts.filter((p) => p.html.includes(`data-pid="${id}"`));
    const hit = has.find((p) => brand && p.title.includes(brand) && p.category !== 'guide') || has.find((p) => p.category !== 'guide') || has[0];
    return hit ? { slug: hit.slug, title: hit.title.split('｜')[0] } : undefined;
  };
  const items = PRODUCTS.map((p) => {
    const img = productImage(p);
    const { store: _s, thumb: _t, ...rest } = p;
    return { ...rest, store: '', img: img.src, external: img.external, short: shortName(p.name, p.brand), post: postFor(p.id, p.brand) };
  });
  const top = [...PRODUCTS].filter((p) => p.type === 'club').sort((a, b) => b.reviews - a.reviews).slice(0, 10);
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: '리뷰 많은 파크골프채',
          itemListElement: top.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name })),
        }}
      />
      <h1 className="section-title" style={{ marginTop: 10, marginBottom: 2 }}>파크골프 비교표</h1>
      <p className="disclosure cg-disc">{SITE.disclosure}</p>
      <p className="cg-sub">
        {PRODUCTS.length}개 상품 · 칩을 눌러 바로 걸러 보세요 · 키에 맞는 길이는 <a href="/tools/club-fit/">채 길이 계산기</a>
      </p>
      <CompareTable items={items} top={TOP} checkedAt={PRODUCTS_CHECKED_AT} imageCredit={SITE.imageCredit} />
    </>
  );
}

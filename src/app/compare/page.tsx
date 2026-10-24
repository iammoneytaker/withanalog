import type { Metadata } from 'next';
import CompareTable from './CompareTable';
import JsonLd from '@/components/JsonLd';
import { PRODUCTS, PRODUCTS_CHECKED_AT, productImage } from '@/lib/products';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: '파크골프채 비교표 (가격·무게·헤드 소재·공인 여부)',
  description: `파크골프채·풀세트·가방·공 ${PRODUCTS.length}개를 가격뿐 아니라 무게, 길이, 헤드 소재, 협회 공인, 좌타 여부로 걸러 보고 최대 3개를 나란히 비교할 수 있습니다.`,
  alternates: { canonical: '/compare/' },
};

export default function ComparePage() {
  const items = PRODUCTS.map((p) => {
    const img = productImage(p);
    return { ...p, img: img.src, external: img.external };
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
      <h1 className="section-title" style={{ marginTop: 10 }}>파크골프 비교표</h1>
      <p className="disclosure">{SITE.disclosure}</p>
      <p>
        네이버에서 판매 중인 파크골프채, 풀세트, 가방, 공 {PRODUCTS.length}개를 모았습니다. 가격만이 아니라 헤드 소재, 무게, 길이, 협회
        공인, 좌타 여부로 걸러 볼 수 있고, 마음에 드는 상품을 최대 3개 담으면 표로 나란히 비교됩니다. 키에 맞는 길이는{' '}
        <a href="/tools/club-fit/">채 길이 계산기</a>에서 먼저 확인해 보세요.
      </p>
      <CompareTable items={items} checkedAt={PRODUCTS_CHECKED_AT} imageCredit={SITE.imageCredit} />
    </>
  );
}

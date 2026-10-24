import type { Metadata } from 'next';
import CompareTable from './CompareTable';
import JsonLd from '@/components/JsonLd';
import { PRODUCTS, PRODUCTS_CHECKED_AT } from '@/lib/products';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: '파크골프채 가격 비교표 (브랜드·예산·남녀별)',
  description: `파크골프채·풀세트·가방·공 ${PRODUCTS.length}개 상품의 할인가와 리뷰 수를 브랜드, 예산, 남녀별로 걸러 볼 수 있는 비교표입니다.`,
  alternates: { canonical: '/compare/' },
};

export default function ComparePage() {
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
      <h1 className="section-title" style={{ marginTop: 10 }}>파크골프 가격 비교표</h1>
      <p>
        네이버에서 판매 중인 파크골프채, 풀세트, 가방, 공 {PRODUCTS.length}개를 한곳에 모았습니다. 브랜드와 예산, 남녀를 고르면 해당
        상품만 남습니다. 리뷰가 많다고 무조건 좋은 건 아니니, 무게와 길이는 <a href="/tools/club-fit/">채 길이 계산기</a>로 한 번 더
        확인해 보세요.
      </p>
      <p className="disclosure">{SITE.disclosure}</p>
      <CompareTable items={PRODUCTS} checkedAt={PRODUCTS_CHECKED_AT} />
    </>
  );
}

import type { Metadata } from 'next';
export const metadata: Metadata = { title: '이용약관 | 위드아날로그 파크골프', description: '위드아날로그 파크골프 이용약관입니다. 사이트 정보의 성격, 가격·구성 변동, 저작권, 주문과 환불 책임 범위를 안내합니다.', alternates: { canonical: '/terms/' } };
export default function Page() {
  return (
    <article className="article prose">
      <h1>이용약관</h1>
      <ol>
        <li>이 사이트의 정보는 구매 판단을 돕기 위한 참고 자료이며, 최종 구매 결정과 책임은 이용자에게 있습니다.</li>
        <li>가격, 구성, 재고, 배송 조건은 판매처에서 정하며 언제든 바뀔 수 있습니다. 구매 전 판매 페이지를 꼭 확인해 주세요.</li>
        <li>글과 직접 만든 표·이미지의 저작권은 위드아날로그 파크골프에 있습니다. 출처를 밝힌 짧은 인용은 허용합니다.</li>
        <li>상품 주문, 결제, 교환, 환불은 해당 판매처와 네이버의 정책을 따릅니다.</li>
      </ol>
      <p>시행일: 2026년 10월 24일</p>
    </article>
  );
}

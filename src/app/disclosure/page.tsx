import type { Metadata } from 'next';
export const metadata: Metadata = { title: '제휴 고지 (네이버 쇼핑 커넥트)', description: '위드아날로그 파크골프의 네이버 쇼핑 커넥트 제휴 링크와 수수료 안내입니다. 링크로 사도 가격은 같고, 수수료는 추천 순서에 영향을 주지 않습니다.', alternates: { canonical: '/disclosure/' } };
export default function Page() {
  return (
    <article className="article prose">
      <h1>제휴 고지</h1>
      <p>이 사이트의 글과 비교표에 있는 “네이버에서 가격 확인하기” 버튼은 네이버 쇼핑 커넥트 제휴 링크입니다.</p>
      <blockquote><p>이 포스팅은 네이버 쇼핑 커넥트 활동의 일환으로, 판매 발생 시 수수료를 제공받습니다.</p></blockquote>
      <ul>
        <li>링크를 통해 상품을 사셔도 구매자가 내는 가격은 같습니다.</li>
        <li>수수료는 글의 추천 순서나 평가에 영향을 주지 않습니다. 비교 기준은 가격, 무게, 소재, 구성, 리뷰 수처럼 확인 가능한 정보입니다.</li>
        <li>판매자에게 제품을 무상으로 받거나 원고료를 받고 쓴 글은 없습니다. 그런 글이 생기면 글 맨 위에 따로 밝힙니다.</li>
      </ul>
    </article>
  );
}

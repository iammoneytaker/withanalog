import type { Metadata } from 'next';
export const metadata: Metadata = { title: '작성 원칙', description: '위드아날로그 파크골프가 글을 쓰고 고치는 기준입니다.', alternates: { canonical: '/editorial-policy/' } };
export default function Page() {
  return (
    <article className="article prose">
      <h1>작성 원칙</h1>
      <ol>
        <li>판매 페이지, 제조사 자료, 협회 규정처럼 확인할 수 있는 근거만 씁니다.</li>
        <li>가격에는 확인 날짜를 붙이고, 바뀐 사실을 알게 되면 글을 고친 뒤 수정 날짜를 남깁니다.</li>
        <li>“최고”, “무조건” 같은 근거 없는 단정과 건강 효과를 단정하는 표현은 쓰지 않습니다.</li>
        <li>판매 페이지끼리 숫자가 다르면 둘 다 적고 구매 전 확인을 권합니다.</li>
        <li>사진 대신 직접 만든 표와 AI 장면 이미지를 쓰며, AI 이미지는 표시합니다.</li>
        <li>틀린 내용을 발견하시면 ksj2618159@naver.com 으로 알려 주세요.</li>
      </ol>
    </article>
  );
}

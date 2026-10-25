import type { Metadata } from 'next';
export const metadata: Metadata = { title: '개인정보처리방침', description: '위드아날로그 파크골프의 개인정보 처리 기준입니다. 회원가입 없이 운영하며 제휴 링크 클릭 기록만 개인 식별 없이 저장합니다.', robots: { index: false, follow: true }, alternates: { canonical: '/privacy/' } };
export default function Page() {
  return (
    <article className="article prose">
      <h1>개인정보처리방침</h1>
      <p>이 사이트는 회원가입이 없으며 이름, 연락처 같은 개인정보를 받지 않습니다.</p>
      <h2>수집하는 정보</h2>
      <ul>
        <li>제휴 링크 클릭 기록: 어떤 글에서 어떤 상품 버튼을 눌렀는지(페이지 주소, 상품 번호, 시각, 국가). 개인을 알아볼 수 있는 정보는 저장하지 않습니다.</li>
        <li>서버 접속 기록: 보안과 장애 대응을 위해 호스팅 업체(Cloudflare)가 일시적으로 처리합니다.</li>
        <li>방문 통계: Google 애널리틱스(Google 태그 관리자)와 Cloudflare Web Analytics로 방문 페이지, 유입 경로, 기기 종류 같은 통계를 개인을 알아볼 수 없는 형태로 수집합니다. Google 애널리틱스는 쿠키를 사용하며, 브라우저 설정에서 쿠키를 거부할 수 있습니다.</li>
      </ul>
      <h2>외부 서비스</h2>
      <p>제휴 링크를 누르면 네이버로 이동하며, 이후에는 네이버의 개인정보처리방침이 적용됩니다.</p>
      <h2>문의</h2>
      <p>withanalog.com@gmail.com</p>
      <p>시행일: 2026년 10월 24일</p>
    </article>
  );
}

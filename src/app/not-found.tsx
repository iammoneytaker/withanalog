import Link from 'next/link';
export default function NotFound() {
  return (
    <div style={{ padding: '40px 0' }}>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>주소가 바뀌었거나 삭제된 페이지입니다.</p>
      <p><Link href="/">홈으로 가기</Link> · <Link href="/compare/">가격 비교표</Link></p>
    </div>
  );
}

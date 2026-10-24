import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p className="footer-disclosure">{SITE.disclosure}</p>
        <p>
          가격·구성은 판매처 상황에 따라 바뀔 수 있습니다. 구매 전 판매 페이지에서 최신 정보를 꼭 확인해 주세요.
        </p>
        <nav className="footer-links" aria-label="사이트 정보">
          <Link href="/about/">소개</Link>
          <Link href="/disclosure/">제휴 고지</Link>
          <Link href="/privacy/">개인정보처리방침</Link>
          <Link href="/terms/">이용약관</Link>
          <a href="/rss.xml">RSS</a>
        </nav>
        <p className="copy">© {new Date().getFullYear()} {SITE.name} · 문의 {SITE.email}</p>
      </div>
    </footer>
  );
}

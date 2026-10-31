import Link from 'next/link';
import { CATEGORIES, SITE } from '@/lib/site';

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href="/" className="logo" aria-label={`${SITE.name} 홈`}>
          <span className="logo-mark" aria-hidden>⛳</span>
          <span>{SITE.name}</span>
        </Link>
      </div>
      <nav className="wrap nav" aria-label="카테고리">
        {CATEGORIES.filter((c) => c.slug !== 'brands').map((c) => (
          <Link key={c.slug} href={`/category/${c.slug}/`}>
            {c.name}
          </Link>
        ))}
        <Link href="/guide/rules/">규칙·용어</Link>
        <Link href="/compare/">가격 비교표</Link>
        <Link href="/tools/club-fit/">채 길이 계산기</Link>
      </nav>
    </header>
  );
}

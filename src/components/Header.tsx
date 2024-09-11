import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 sticky top-0 z-10">
      <nav className="flex justify-center space-x-4">
        <Link href="/" className="hover:text-blue-400 transition-colors">
          홈
        </Link>
        <Link href="/blog" className="hover:text-blue-400 transition-colors">
          블로그
        </Link>
      </nav>
    </header>
  );
}

'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminHeader() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/adminsangwon/login');
      router.refresh();
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 relative z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/adminsangwon/projects"
              className="text-white text-lg font-semibold"
            >
              관리자 대시보드
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors"
              target="_blank"
            >
              사이트 보기
            </Link>
            <Link
              href="/adminsangwon/blog"
              className="text-gray-300 hover:text-white transition-colors"
            >
              블로그
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

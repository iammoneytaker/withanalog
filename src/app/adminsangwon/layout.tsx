import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { headers } from 'next/headers';
import { ReactNode } from 'react';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const headersList = headers();
  const referer = headersList.get('referer');
  let pathname = '/adminsangwon/login'; // 기본값 설정

  if (referer) {
    try {
      const url = new URL(referer);
      pathname = url.pathname;
    } catch (error) {
      console.error('Invalid referer URL:', error);
    }
  }

  // 로그인 페이지일 때는 세션 체크를 하지 않고 바로 렌더링
  if (pathname === '/adminsangwon/login') {
    return <div className="min-h-screen bg-gray-900">{children}</div>;
  }

  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return <RedirectToLogin />;
  }

  return <div className="min-h-screen bg-gray-900">{children}</div>;
}

function RedirectToLogin() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0; url=/adminsangwon/login" />
      </head>
      <body></body>
    </html>
  );
}

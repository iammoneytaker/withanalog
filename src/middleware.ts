import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // /admin/login 페이지는 체크하지 않음
  if (
    req.nextUrl.pathname.startsWith('/adminsangwon') &&
    !req.nextUrl.pathname.startsWith('/adminsangwon/login')
  ) {
    if (!session) {
      return NextResponse.redirect(new URL('/adminsangwon/login', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: '/adminsangwon/:path*',
};

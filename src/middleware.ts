import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return res;
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // /admin/login 페이지는 체크하지 않음
  if (
    req.nextUrl.pathname.startsWith('/adminsangwon') &&
    !req.nextUrl.pathname.startsWith('/adminsangwon/login')
  ) {
    if (!user) {
      return NextResponse.redirect(new URL('/adminsangwon/login', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: '/adminsangwon/:path*',
};

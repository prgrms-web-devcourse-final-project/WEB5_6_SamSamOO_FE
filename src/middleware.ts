import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 쿠키에서 인증 토큰 확인
  const token = request.cookies.get('accessToken');
  // 로그인 페이지는 체크 안 함
  if (request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.next();
  }
  // 인증되지 않은 경우
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    // alert 메시지를 위한 파라미터 추가
    loginUrl.searchParams.set('message', 'login-required');
    // 로그인 후 돌아갈 페이지 저장
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/mypage/:path*', '/advice/:path*', '/chat/:path*', '/vote/:path*'],
};

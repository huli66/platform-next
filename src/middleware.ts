import { NextResponse } from 'next/server';

export function middleware(request: any) {
  // TODO：通过 user 进行鉴权
  console.log('middleware', request.url);
  return NextResponse.redirect(new URL('/test-route', request.url));
}

export const config = {
  matcher: ['/about/:path*']
}

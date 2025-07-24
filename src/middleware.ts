import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const splashCookie = req.cookies.get("splash-loaded");

  // Redirect ONLY first-time visitors
  if (!splashCookie && req.nextUrl.pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/splash';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
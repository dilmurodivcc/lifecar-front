import { NextRequest, NextResponse } from 'next/server';

const locales = ['uz', 'ru'];
const defaultLocale = 'uz';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/img')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const hasLocale = locales.some(locale => 
    pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // If no locale, redirect to default locale
  if (!hasLocale) {
    const url = new URL(`/${defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|icons|img|.*\\.).*)',
  ],
};

import { NextRequest, NextResponse } from 'next/server';

const locales = ['uz', 'ru'];
const defaultLocale = 'uz';

// Get the preferred locale from Accept-Language header
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  let locale = defaultLocale;

  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => locales.includes(lang.split('-')[0]));

    if (preferredLocale) {
      locale = preferredLocale.split('-')[0];
    }
  }

  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Only redirect if there's no locale and it's not a static file
  if (!pathnameHasLocale && pathname !== '/' && !pathname.startsWith('/_next') && !pathname.startsWith('/api') && !pathname.includes('.')) {
    const locale = getLocale(request);
    const url = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(url);
  }

  // Handle root path redirect
  if (pathname === '/') {
    const locale = getLocale(request);
    const url = new URL(`/${locale}`, request.url);
    return NextResponse.redirect(url);
  }

  // Add locale to headers for use in layout
  const locale = pathname.split('/')[1];
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);
  requestHeaders.set('x-locale', locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    // Only match paths that don't start with _next, api, or contain file extensions
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|icons|img|.*\\.).*)',
  ],
};

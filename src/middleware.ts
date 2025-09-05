import { NextRequest, NextResponse } from 'next/server';

const locales = ['uz', 'ru'];
const defaultLocale = 'uz';

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest): string {
  // Get locale from Accept-Language header
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
  
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    const url = new URL(`/${locale}${pathname}`, request.url);
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
    // Skip all internal paths (_next), static files, and API routes
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|icons|img|.*\\.).*)',
  ],
};

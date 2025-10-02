// import { NextRequest, NextResponse } from 'next/server';

// const locales = ['uz', 'ru'];
// const defaultLocale = 'uz';

// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   if (
//     pathname.startsWith('/_next') ||
//     pathname.startsWith('/api') ||
//     pathname.includes('.') ||
//     pathname.startsWith('/favicon') ||
//     pathname.startsWith('/robots') ||
//     pathname.startsWith('/sitemap') ||
//     pathname.startsWith('/icons') ||
//     pathname.startsWith('/img')
//   ) {
//     return NextResponse.next();
//   }

//   const hasLocale = locales.some(locale =>
//     pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
//   );

//   if (!hasLocale) {
//     const url = new URL(`/${defaultLocale}${pathname}`, request.url);
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|icons|img|.*\\.).*)',
//   ],
// };

import "./../scss/main.scss";
import { Exo_2, Nunito, Geist } from "next/font/google";
import type { Metadata } from "next";
import I18nProvider from "../components/providers/I18nProvider";
import { getSEOConfig } from "../utils/seo";
import QueryProvider from "../components/providers/QueryProvider";

const exo2 = Exo_2({
  subsets: ["latin", "cyrillic"],
  variable: "--font-exo2",
  display: "swap",
  preload: true,
});

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  variable: "--font-nunito",
  display: "swap",
  preload: true,
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  preload: true,
});

function getLocale(): string {
  return "uz";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale();
  const seoConfig = getSEOConfig(locale, "home");

  return {
    metadataBase: new URL("https://lifecar.uz"),
    title: {
      default: seoConfig.title,
      template: `%s | Lifecar`,
    },
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    authors: [{ name: "Lifecar Team" }],
    creator: "Lifecar",
    publisher: "Lifecar",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: locale === "uz" ? "uz_UZ" : "ru_UZ",
      url: seoConfig.canonical,
      title: seoConfig.openGraphTitle,
      description: seoConfig.openGraphDescription,
      siteName: "Lifecar",
      images: [
        {
          url: "/icons/lifecar.webp",
          width: 1200,
          height: 630,
          alt: "Lifecar Auto Tuning",
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@lifecar",
      creator: "@lifecar",
      title: seoConfig.openGraphTitle,
      description: seoConfig.openGraphDescription,
      images: ["/icons/lifecar.webp"],
    },
    icons: {
      icon: [
        { url: "/icons/lifecar.ico", sizes: "16x16 32x32 48x48" },
        { url: "/icons/lifecar.webp", type: "image/webp", sizes: "192x192" },
        { url: "/icons/lifecar.webp", type: "image/webp", sizes: "512x512" },
      ],
      shortcut: "/icons/lifecar.ico",
      apple: [
        { url: "/icons/lifecar.webp", sizes: "180x180", type: "image/webp" },
      ],
      other: [
        {
          rel: "icon",
          url: "/icons/lifecar.ico",
          sizes: "16x16",
          type: "image/x-icon",
        },
        {
          rel: "icon",
          url: "/icons/lifecar.webp",
          sizes: "192x192",
          type: "image/webp",
        },
        {
          rel: "icon",
          url: "/icons/lifecar.webp",
          sizes: "512x512",
          type: "image/webp",
        },
      ],
    },
    alternates: {
      canonical: seoConfig.canonical,
      languages: {
        uz: "https://lifecar.uz/uz",
        ru: "https://lifecar.uz/ru",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "kHld5O7aSSfDHveNMffBr_uIj38NVCC1FYxJSYCEf7w",
      yandex: "1234567890",
    },
    category: "automotive",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getLocale();

  const schemaConfig = {
    uz: {
      name: "Lifecar",
      description:
        "Lifecar – Avto tuning, auto parts, auto accessories va professional avto ustalar xizmatlari O'zbekistonda.",
      addressLocality: "Toshkent",
      services: [
        "Avto Tuning",
        "Ehtiyot Qismlar",
        "Avto Ta'mirlash",
        "Aksessuarlar",
      ],
    },
    ru: {
      name: "Lifecar",
      description:
        "Lifecar - авто тюнинг, автозапчасти, авто аксессуары и профессиональные услуги авто мастеров в Узбекистане.",
      addressLocality: "Ташкент",
      services: ["Авто Тюнинг", "Запчасти", "Ремонт Автомобилей", "Аксессуары"],
    },
  };

  const config =
    schemaConfig[locale as keyof typeof schemaConfig] || schemaConfig.uz;

  return (
    <html
      lang={locale}
      className={`${exo2.variable} ${nunito.variable} ${geist.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: config.name,
              url: `https://lifecar.uz/${locale}`,
              logo: "https://lifecar.uz/icons/lifecar.webp",
              description: config.description,
              address: {
                "@type": "PostalAddress",
                addressLocality: config.addressLocality,
                addressCountry: "UZ",
                addressRegion: "Toshkent viloyati",
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+998337852222",
                  contactType: "customer service",
                  availableLanguage: ["Uzbek", "Russian"],
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+998901234567",
                  contactType: "sales",
                  availableLanguage: ["Uzbek", "Russian"],
                },
              ],
              openingHours: "Mo-Sa 09:00-18:00",
              priceRange: "$$",
              paymentAccepted: "Cash, Credit Card, Bank Transfer",
              currenciesAccepted: "UZS, USD",
              areaServed: {
                "@type": "Country",
                name: "Uzbekistan",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Avto Tuning Xizmatlari",
                itemListElement: config.services.map((service) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: service,
                  },
                })),
              },
              sameAs: [
                "https://t.me/LIFECARUZB",
                "https://instagram.com/life_car.uzb",
                "https://youtube.com/@LIFECARUZB",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "150",
              },
            }),
          }}
        />

        <meta name="theme-color" content="#1a1a1a" />
        <meta name="msapplication-TileColor" content="#1a1a1a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
        />

        <link rel="icon" href="/icons/lifecar.ico" type="image/x-icon" />
        <link
          rel="shortcut icon"
          href="/icons/lifecar.ico"
          type="image/x-icon"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/lifecar.webp"
          sizes="180x180"
        />
        <link
          rel="icon"
          href="/icons/lifecar.webp"
          type="image/webp"
          sizes="192x192"
        />
        <link
          rel="icon"
          href="/icons/lifecar.webp"
          type="image/webp"
          sizes="512x512"
        />

        {/* PWA and mobile optimization */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Lifecar" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

        {/* Cache control */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        <QueryProvider>
          <I18nProvider>{children}</I18nProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

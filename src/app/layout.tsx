import "./../scss/main.scss";
import { Exo_2, Nunito, Geist } from "next/font/google";
import type { Metadata } from "next";
import { headers } from "next/headers";
import I18nProvider from "../components/providers/I18nProvider";

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

// Function to get current locale from headers
async function getLocale(): Promise<string> {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const segments = pathname.split("/");
  const locale = segments[1];

  if (["uz", "ru"].includes(locale)) {
    return locale;
  }

  return "uz"; // Default fallback
}

// Dynamic metadata generation
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  const metadataConfig = {
    uz: {
      title: "Lifecar | Avto Tuning Xizmatlari O'zbekistonda",
      description:
        "Lifecar – Avto tuning, auto parts, auto accessories va professional avto ustalar xizmatlari O'zbekistonda. Professional avto sozlash va ta'mirlash xizmatlari.",
      keywords:
        "Lifecar, lifecar tuning, lifecar tyuning, lifecar uz, auto tuning, avtotuning, автотюнинг, avto usta, avto ustalar, avto ehtiyot qismlar, avto aksessuarlar",
      openGraphTitle: "Lifecar | Avto Tuning Xizmatlari",
      openGraphDescription:
        "Professional avto tuning, ehtiyot qismlar va aksessuarlar O'zbekistonda",
    },
    ru: {
      title: "Lifecar | Авто Тюнинг Услуги в Узбекистане",
      description:
        "Lifecar - авто тюнинг, автозапчасти, авто аксессуары и профессиональные услуги авто мастеров в Узбекистане. Профессиональные услуги по настройке и ремонту автомобилей.",
      keywords:
        "Lifecar, lifecar tuning, lifecar tyuning, lifecar uz, auto tuning, avtotuning, автотюнинг, avto usta, avto ustalar, автозапчасти, авто аксессуары",
      openGraphTitle: "Lifecar | Авто Тюнинг Услуги",
      openGraphDescription:
        "Профессиональный авто тюнинг, запчасти и аксессуары в Узбекистане",
    },
  };

  const config =
    metadataConfig[locale as keyof typeof metadataConfig] || metadataConfig.uz;

  return {
    metadataBase: new URL("https://lifecar.uz"),
    title: {
      default: config.title,
      template: `%s | Lifecar`,
    },
    description: config.description,
    keywords: config.keywords,
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
      url: `https://lifecar.uz/${locale}`,
      title: config.openGraphTitle,
      description: config.openGraphDescription,
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
      title: config.openGraphTitle,
      description: config.openGraphDescription,
      images: ["/icons/lifecar.webp"],
    },
    icons: {
      icon: [
        { url: "/icons/lifecar.ico", sizes: "any" },
        { url: "/icons/lifecar.webp", type: "image/webp" },
      ],
      shortcut: "/icons/lifecar.ico",
      apple: "/icons/lifecar.webp",
    },
    alternates: {
      canonical: `https://lifecar.uz/${locale}`,
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  // JSON-LD Schema configuration for both languages
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
        {/* JSON-LD Schema (SEO uchun) */}
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

        {/* Additional meta tags for better SEO */}
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="msapplication-TileColor" content="#1a1a1a" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}

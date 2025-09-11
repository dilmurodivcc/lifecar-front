interface StructuredDataProps {
  locale: string;
  page: string;
}

export default function StructuredData({ locale, page }: StructuredDataProps) {
  const baseUrl = "https://lifecar.uz";
  const currentUrl = `${baseUrl}/${locale}${page !== "home" ? `/${page}` : ""}`;

  const getStructuredData = () => {
    const commonData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Lifecar",
      url: currentUrl,
      logo: `${baseUrl}/icons/lifecar.webp`,
      address: {
        "@type": "PostalAddress",
        addressLocality: locale === "uz" ? "Toshkent" : "Ташкент",
        addressCountry: "UZ",
        addressRegion:
          locale === "uz" ? "Toshkent viloyati" : "Ташкентская область",
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
          telephone: "+998998146565",
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
    };

    switch (page) {
      case "home":
        return {
          ...commonData,
          description:
            locale === "uz"
              ? "Lifecar - O'zbekistondagi eng yaxshi avto tuning xizmatlari. Professional avto ustalar, original ehtiyot qismlar, tuning aksessuarlar va avto ta'mirlash xizmatlari."
              : "Lifecar - лучшие услуги авто тюнинга в Узбекистане. Профессиональные авто мастера, оригинальные запчасти, тюнинг аксессуары и ремонт автомобилей.",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name:
              locale === "uz"
                ? "Avto Tuning Xizmatlari"
                : "Услуги Авто Тюнинга",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: locale === "uz" ? "Avto Tuning" : "Авто Тюнинг",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: locale === "uz" ? "Ehtiyot Qismlar" : "Запчасти",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name:
                    locale === "uz" ? "Avto Ta'mirlash" : "Ремонт Автомобилей",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: locale === "uz" ? "Aksessuarlar" : "Аксессуары",
                },
              },
            ],
          },
        };

      case "services":
        return {
          ...commonData,
          description:
            locale === "uz"
              ? "Professional avto tuning xizmatlari: kuzov ta'miri, dvigatel sozlash, interyer tuning, eksterier modifikatsiya. O'zbekistondagi eng tajribali avto ustalar bilan ishlang."
              : "Профессиональные услуги авто тюнинга: ремонт кузова, настройка двигателя, тюнинг интерьера, модификация экстерьера. Работайте с самыми опытными авто мастерами в Узбекистане.",
          "@type": "Service",
          serviceType: "Авто Тюнинг",
          provider: {
            "@type": "LocalBusiness",
            name: "Lifecar",
          },
        };

      case "shop":
        return {
          ...commonData,
          description:
            locale === "uz"
              ? "Original avto ehtiyot qismlar, tuning aksessuarlar va avto modifikatsiya uchun barcha kerakli narsalar. Barcha mashina turlari uchun ehtiyot qismlar."
              : "Оригинальные автозапчасти, тюнинг аксессуары и все необходимое для модификации автомобилей. Запчасти для всех типов автомобилей в Узбекистане.",
          "@type": "Store",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: locale === "uz" ? "Avto Ehtiyot Qismlar" : "Автозапчасти",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Product",
                  name:
                    locale === "uz"
                      ? "Tuning Aksessuarlar"
                      : "Тюнинг Аксессуары",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Product",
                  name:
                    locale === "uz" ? "Avto Ehtiyot Qismlar" : "Автозапчасти",
                },
              },
            ],
          },
        };

      case "about":
        return {
          ...commonData,
          description:
            locale === "uz"
              ? "Lifecar - O'zbekistondagi eng yirik avto tuning kompaniyasi. 10+ yillik tajriba, professional avto ustalar va zamonaviy texnologiyalar. Bizning missiyamiz va tariximiz."
              : "Lifecar - крупнейшая компания авто тюнинга в Узбекистане. 10+ лет опыта, профессиональные авто мастера и современные технологии. Наша миссия и история.",
          foundingDate: "2014",
          numberOfEmployees: "25-50",
          slogan:
            locale === "uz"
              ? "Professional Avto Tuning Xizmatlari"
              : "Профессиональные Услуги Авто Тюнинга",
        };

      case "contact":
        return {
          ...commonData,
          description:
            locale === "uz"
              ? "Lifecar bilan bog'laning. Toshkentdagi avto tuning markazimizga tashrif buyuring. Telefon, manzil va ish vaqtlari. Professional konsultatsiya oling."
              : "Свяжитесь с Lifecar. Посетите наш авто тюнинг центр в Ташкенте. Телефон, адрес и часы работы. Получите профессиональную консультацию.",
          telephone: "+998337852222",
          email: "info@lifecar.uz",
        };

      default:
        return commonData;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}

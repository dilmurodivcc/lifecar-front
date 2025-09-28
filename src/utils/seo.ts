export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  openGraphTitle: string;
  openGraphDescription: string;
  canonical: string;
}

export const seoConfig: Record<string, Record<string, SEOConfig>> = {
  uz: {
    home: {
      title:
        "Lifecar | Avto Tuning Xizmatlari O'zbekistonda | Professional Avto Ustalar",
      description:
        "Lifecar - O'zbekistondagi eng yaxshi avto tuning xizmatlari. Professional avto ustalar, original ehtiyot qismlar, tuning aksessuarlar va avto ta'mirlash xizmatlari. Toshkentda avto tuning markazi.",
      keywords:
        "lifecar, life car, Life Car, Life Car Uzbekistan, lifecar uz, lifecar tuning, avto tuning, автотюнинг, avto usta, avto ustalar, avto ehtiyot qismlar, avto aksessuarlar, tuning, avto ta'mirlash, toshkent avto tuning, professional avto ustalar, original ehtiyot qismlar, avto modifikatsiya, avto sozlash, mashina tuning, avto servis, avto markaz, tuning markaz, avto ustaxona, mashina ta'mirlash, avto tuning xizmatlari, tuning aksessuarlar, avto tuning toshkent, lifecar toshkent, avto tuning o'zbekiston",
      openGraphTitle: "Lifecar | Professional Avto Tuning Xizmatlari",
      openGraphDescription:
        "O'zbekistondagi eng yaxshi avto tuning markazi. Professional xizmatlar va original ehtiyot qismlar.",
      canonical: "https://lifecar.uz/uz",
    },
    services: {
      title: "Avto Tuning Xizmatlari | Lifecar | Professional Avto Ustalar",
      description:
        "Professional avto tuning xizmatlari: kuzov ta'miri, dvigatel sozlash, interyer tuning, eksterier modifikatsiya. O'zbekistondagi eng tajribali avto ustalar bilan ishlang.",
      keywords:
        "avto tuning xizmatlari, kuzov ta'miri, dvigatel sozlash, interyer tuning, eksterier modifikatsiya, avto usta, professional tuning, avto ta'mirlash, tuning markazi, lifecar services, avto tuning toshkent, mashina tuning, avto servis, tuning xizmatlari, avto modifikatsiya, mashina ta'mirlash, avto ustaxona, tuning aksessuarlar, avto tuning markaz, professional avto ustalar",
      openGraphTitle: "Professional Avto Tuning Xizmatlari | Lifecar",
      openGraphDescription:
        "Kuzov ta'miri, dvigatel sozlash va boshqa professional avto tuning xizmatlari.",
      canonical: "https://lifecar.uz/uz/services",
    },
    shop: {
      title: "Avto Ehtiyot Qismlar va Aksessuarlar | Lifecar Shop",
      description:
        "Original avto ehtiyot qismlar, tuning aksessuarlar va avto modifikatsiya uchun barcha kerakli narsalar. Barcha mashina turlari uchun ehtiyot qismlar.",
      keywords:
        "avto ehtiyot qismlar, tuning aksessuarlar, avto modifikatsiya, original ehtiyot qismlar, avto shop, lifecar shop, avto tuning parts, avto aksessuarlar, mashina ehtiyot qismlari, avto tuning toshkent, tuning aksessuarlar toshkent, avto ehtiyot qismlar toshkent, mashina ehtiyot qismlari, avto tuning shop, tuning magazin, avto magazin, lifecar magazin, avto tuning aksessuarlar",
      openGraphTitle: "Avto Ehtiyot Qismlar va Aksessuarlar | Lifecar",
      openGraphDescription:
        "Original ehtiyot qismlar va tuning aksessuarlar barcha mashina turlari uchun.",
      canonical: "https://lifecar.uz/uz/products",
    },

    contact: {
      title: "Bog'lanish | Telefon | Manzil | Lifecar | Avto Tuning Xizmatlari",
      description:
        "Lifecar bilan bog'laning. Toshkentdagi avto tuning markazimizga tashrif buyuring. Telefon, manzil va ish vaqtlari. Professional konsultatsiya oling.",
      keywords:
        "lifecar bog'lanish, avto tuning telefon, toshkent tuning markaz, lifecar manzil, avto tuning konsultatsiya, lifecar kontakt, avto tuning toshkent, tuning markaz toshkent, lifecar telefon, avto tuning manzil, tuning xizmatlari telefon, avto ustaxona toshkent, tuning markaz manzil, lifecar kontakt ma'lumotlari",
      openGraphTitle: "Lifecar bilan Bog'lanish | Avto Tuning Xizmatlari",
      openGraphDescription:
        "Professional avto tuning xizmatlari uchun biz bilan bog'laning. Toshkentdagi markazimizga tashrif buyuring.",
      canonical: "https://lifecar.uz/uz/contact",
    },
  },
  ru: {
    home: {
      title:
        "Lifecar | Авто Тюнинг Услуги в Узбекистане | Профессиональные Авто Мастера",
      description:
        "Lifecar - лучшие услуги авто тюнинга в Узбекистане. Профессиональные авто мастера, оригинальные запчасти, тюнинг аксессуары и ремонт автомобилей. Авто тюнинг центр в Ташкенте.",
      keywords:
        "lifecar, lifecar tuning, lifecar uz, авто тюнинг, автозапчасти, авто аксессуары, тюнинг, ремонт автомобилей, ташкент авто тюнинг, профессиональные авто мастера, оригинальные запчасти, авто модификация, авто настройка, lifecar узбекистан",
      openGraphTitle: "Lifecar | Профессиональные Услуги Авто Тюнинга",
      openGraphDescription:
        "Лучший авто тюнинг центр в Узбекистане. Профессиональные услуги и оригинальные запчасти.",
      canonical: "https://lifecar.uz/ru",
    },
    services: {
      title: "Услуги Авто Тюнинга | Lifecar | Профессиональные Авто Мастера",
      description:
        "Профессиональные услуги авто тюнинга: ремонт кузова, настройка двигателя, тюнинг интерьера, модификация экстерьера. Работайте с самыми опытными авто мастерами в Узбекистане.",
      keywords:
        "услуги авто тюнинга, ремонт кузова, настройка двигателя, тюнинг интерьера, модификация экстерьера, авто мастер, профессиональный тюнинг, ремонт автомобилей, тюнинг центр, lifecar услуги, авто тюнинг ташкент",
      openGraphTitle: "Профессиональные Услуги Авто Тюнинга | Lifecar",
      openGraphDescription:
        "Ремонт кузова, настройка двигателя и другие профессиональные услуги авто тюнинга.",
      canonical: "https://lifecar.uz/ru/services",
    },
    shop: {
      title: "Автозапчасти и Аксессуары | Lifecar Shop | Тюнинг Магазин",
      description:
        "Оригинальные автозапчасти, тюнинг аксессуары и все необходимое для модификации автомобилей. Запчасти для всех типов автомобилей в Узбекистане.",
      keywords:
        "автозапчасти, тюнинг аксессуары, авто модификация, оригинальные запчасти, авто магазин, lifecar shop, тюнинг запчасти, авто аксессуары, запчасти для автомобилей, lifecar магазин",
      openGraphTitle: "Автозапчасти и Аксессуары | Lifecar",
      openGraphDescription:
        "Оригинальные запчасти и тюнинг аксессуары для всех типов автомобилей.",
      canonical: "https://lifecar.uz/ru/products",
    },

    contact: {
      title: "Контакты | Lifecar | Услуги Авто Тюнинга",
      description:
        "Свяжитесь с Lifecar. Посетите наш авто тюнинг центр в Ташкенте. Телефон, адрес и часы работы. Получите профессиональную консультацию.",
      keywords:
        "lifecar контакты, авто тюнинг телефон, ташкент тюнинг центр, lifecar адрес, авто тюнинг консультация, lifecar контакт, авто тюнинг ташкент",
      openGraphTitle: "Контакты Lifecar | Услуги Авто Тюнинга",
      openGraphDescription:
        "Свяжитесь с нами для профессиональных услуг авто тюнинга. Посетите наш центр в Ташкенте.",
      canonical: "https://lifecar.uz/ru/contact",
    },
  },
};

export function getSEOConfig(locale: string, page: string): SEOConfig {
  return seoConfig[locale]?.[page] || seoConfig.uz.home;
}

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export const useSafeTranslation = () => {
  const { t, i18n } = useTranslation();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const safeT = (key: string, options?: Record<string, unknown>): string => {
    if (!isHydrated || !i18n.isInitialized) {
      const fallbacks: Record<string, string> = {
        "hero.title": "Lifecar - Avto Tuning Xizmatlari",
        "hero.subtitle":
          "Professional avto tuning, ehtiyot qismlar va aksessuarlar O'zbekistonda",
        "hero.cta": "Xizmatlarimizni ko'rish",
        "hero.learnMore": "Batafsil ma'lumot",
        "shopSec.title": "Avtotuning ehtiyot qismlari do'koni",
        "shopSec.subtitle":
          "Biz barcha rusum va modellardagi avtomobillar uchun tuning detallari keng assortimentini taklif etamiz.",
        "shopSec.viewAll": "Barcha mahsulotlarni ko'rish",
        "servicesSec.title": "Bizning Xizmatlar",
        "servicesSec.cta": "Xizmatlarimizni ko'rish",
        "servicesSec.Boglanish": "Boglanish",
      };
      return fallbacks[key] || key;
    }

    return t(key, options) as string;
  };

  return {
    t: safeT,
    i18n,
    isHydrated,
  };
};

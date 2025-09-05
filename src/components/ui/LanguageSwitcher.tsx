"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { i18n, ready } = useTranslation();
  const [currentLocale, setCurrentLocale] = useState("uz");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !ready || !i18n) return;

    // Get current locale from pathname
    const segments = pathname.split("/");
    const locale = segments[1];
    if (["uz", "ru"].includes(locale)) {
      setCurrentLocale(locale);
      i18n.changeLanguage(locale);
    }
  }, [pathname, i18n, ready, isClient]);

  const changeLanguage = (locale: string) => {
    if (!i18n) return;

    const segments = pathname.split("/");
    const newPath = `/${locale}${segments.slice(2).join("/")}`;

    // Update i18n language
    i18n.changeLanguage(locale);

    // Navigate to new locale
    router.push(newPath);
  };

  if (!isClient || !ready) {
    return (
      <div className="language-switcher">
        <select disabled>
          <option>Loading...</option>
        </select>
      </div>
    );
  }

  const languages = [
    { code: "uz", name: "O'zbek", flag: "🇺🇿" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
  ];

  return (
    <div className="language-switcher">
      <select
        value={currentLocale}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;

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

    const segments = pathname.split("/");
    const locale = segments[1];
    if (["uz", "ru"].includes(locale)) {
      setCurrentLocale(locale);
      i18n.changeLanguage(locale);
    }

    const savedScrollPosition = sessionStorage.getItem("scrollPosition");
    if (savedScrollPosition) {
      try {
        const { x, y, timestamp } = JSON.parse(savedScrollPosition);
        if (Date.now() - timestamp < 5000) {
          const restoreScroll = () => {
            window.scrollTo({
              top: y,
              left: x,
              behavior: "instant",
            });
          };

          restoreScroll();
          setTimeout(restoreScroll, 10);

          setTimeout(restoreScroll, 100);

          requestAnimationFrame(() => {
            setTimeout(restoreScroll, 10);
          });

          sessionStorage.removeItem("scrollPosition");
        }
      } catch {
        sessionStorage.removeItem("scrollPosition");
      }
    }
  }, [pathname, i18n, ready, isClient]);

  const changeLanguage = (locale: string) => {
    if (!i18n) return;

    const currentScrollY = window.scrollY;
    const currentScrollX = window.scrollX;
    sessionStorage.setItem(
      "scrollPosition",
      JSON.stringify({
        x: currentScrollX,
        y: currentScrollY,
        timestamp: Date.now(),
      })
    );

    const segments = pathname.split("/");
    const newPath = `/${locale}${segments.slice(2).join("/")}`;

    i18n.changeLanguage(locale);

    router.replace(newPath);
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

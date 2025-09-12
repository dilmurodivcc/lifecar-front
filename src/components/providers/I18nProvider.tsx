"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import "../../utils/i18n"; // Initialize i18n

interface I18nProviderProps {
  children: React.ReactNode;
}

const I18nProvider = ({ children }: I18nProviderProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { i18n } = useTranslation();
  const pathname = usePathname();

  useEffect(() => {
    // Mark as hydrated after the first render
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || !i18n) return;

    const segments = pathname.split("/");
    const locale = segments[1];

    if (["uz", "ru"].includes(locale) && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [pathname, i18n, isHydrated]);

  // Always render children, but i18n will be handled by the safe translation hook
  return <>{children}</>;
};

export default I18nProvider;

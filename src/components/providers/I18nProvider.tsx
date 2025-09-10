"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import "../../utils/i18n"; // Initialize i18n

interface I18nProviderProps {
  children: React.ReactNode;
}

const I18nProvider = ({ children }: I18nProviderProps) => {
  const [isClient, setIsClient] = useState(false);
  const { i18n } = useTranslation();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !i18n) return;

    const segments = pathname.split("/");
    const locale = segments[1];

    if (["uz", "ru"].includes(locale) && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [pathname, i18n, isClient]);

  if (!isClient) {
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default I18nProvider;

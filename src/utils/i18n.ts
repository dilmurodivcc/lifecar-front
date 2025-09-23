import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ru from "./locales/ru.json";
import uz from "./locales/uz.json";

const resources = {
  uz: { translation: uz },
  ru: { translation: ru },
};

const isServer = typeof window === "undefined";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "uz",
    supportedLngs: ["uz", "ru"],
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: isServer
        ? []
        : ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: isServer ? [] : ["localStorage", "cookie"],
    },
    react: {
      useSuspense: false,
    },
    lng: isServer ? "uz" : undefined,
    initImmediate: false,
  });

export default i18n;

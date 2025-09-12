import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ru from "./locales/ru.json";
import uz from "./locales/uz.json";

const resources = {
  uz: { translation: uz },
  ru: { translation: ru },
};

// Check if we're on the server side
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
    // Ensure consistent behavior between server and client
    lng: isServer ? "uz" : undefined,
    // Add this to prevent hydration mismatches
    initImmediate: false,
  });

export default i18n;

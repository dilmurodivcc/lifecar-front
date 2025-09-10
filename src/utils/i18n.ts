import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ru from "./locales/ru.json";
import uz from "./locales/uz.json";

const resources = {
  uz: { translation: uz },
  ru: { translation: ru },
};

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
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },
    react: {
      useSuspense: false, 
    },
  });

export default i18n;

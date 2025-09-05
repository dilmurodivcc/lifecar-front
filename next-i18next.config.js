module.exports = {
  i18n: {
    defaultLocale: "uz",
    locales: ["uz", "ru"],
    localeDetection: true,
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};

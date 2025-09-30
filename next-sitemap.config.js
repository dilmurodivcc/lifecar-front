/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: "https://lifecar.uz",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin/*", "/api/*"],
  additionalPaths: async (config) => [
    await config.transform(config, "/uz"),
    await config.transform(config, "/ru"),
    await config.transform(config, "/uz/services"),
    await config.transform(config, "/ru/services"),
    await config.transform(config, "/uz/products"),
    await config.transform(config, "/ru/products"),
    await config.transform(config, "/uz/about"),
    await config.transform(config, "/ru/about"),
    await config.transform(config, "/uz/contact"),
    await config.transform(config, "/ru/contact"),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    additionalSitemaps: ["https://lifecar.uz/sitemap.xml"],
  },
  transform: async (config, path) => {
    // Custom transform for different locales
    const locales = ["uz", "ru"];
    const results = [];

    for (const locale of locales) {
      const localizedPath = locale === "uz" ? path : `/${locale}${path}`;
      results.push({
        loc: localizedPath,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: locales.map((loc) => ({
          href: `https://lifecar.uz/${loc === "uz" ? "" : loc}${path}`,
          hreflang: loc,
        })),
      });
    }

    return results;
  },
};

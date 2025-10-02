/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: "https://lifecar.uz",
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin/*", "/api/*"],
  additionalPaths: async () => [
    "/uz",
    "/ru",
    "/uz/services",
    "/ru/services",
    "/uz/products",
    "/ru/products",
    "/uz/about",
    "/ru/about",
    "/uz/contact",
    "/ru/contact",
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
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: [
        {
          href: `https://lifecar.uz/uz${path}`,
          hreflang: "uz",
        },
        {
          href: `https://lifecar.uz/ru${path}`,
          hreflang: "ru",
        },
      ],
    };
  },
};

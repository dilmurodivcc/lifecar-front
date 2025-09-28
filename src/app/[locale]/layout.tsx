import { Metadata } from "next";
import { getSEOConfig } from "@/utils/seo";
import StructuredData from "@/components/seo/StructuredData";

const locales = ["uz", "ru"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seoConfig = getSEOConfig(locale, "home");

  return {
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    openGraph: {
      title: seoConfig.openGraphTitle,
      description: seoConfig.openGraphDescription,
      url: seoConfig.canonical,
      type: "website",
      locale: locale === "uz" ? "uz_UZ" : "ru_UZ",
    },
    twitter: {
      card: "summary_large_image",
      title: seoConfig.openGraphTitle,
      description: seoConfig.openGraphDescription,
    },
    alternates: {
      canonical: seoConfig.canonical,
      languages: {
        uz: "https://lifecar.uz/uz",
        ru: "https://lifecar.uz/ru",
        "x-default": "https://lifecar.uz/uz",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <StructuredData locale={locale} page="home" />
      {children}
    </>
  );
}

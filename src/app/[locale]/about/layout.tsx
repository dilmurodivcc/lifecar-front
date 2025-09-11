import { Metadata } from "next";
import { getSEOConfig } from "@/utils/seo";
import StructuredData from "@/components/seo/StructuredData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seoConfig = getSEOConfig(locale, "about");

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
    },
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData locale="uz" page="about" />
      {children}
    </>
  );
}

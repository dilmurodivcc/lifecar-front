"use client";

// import { useTranslation } from 'react-i18next';
import ClientLayout from "../../components/layout/ClientLayout";
import Hero from "@/components/home/Hero";
import ServicesSec from "@/components/home/ServicesSec";
import ShopSec from "@/components/home/ShopSec";
// i18n is initialized in I18nProvider

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function HomePage({}: HomePageProps) {
  // const { t } = useTranslation();

  return (
    <ClientLayout showHeader={true} showFooter={true}>
      <main className="home">
        <Hero />
        <ShopSec />
        <ServicesSec />
      </main>
    </ClientLayout>
  );
}

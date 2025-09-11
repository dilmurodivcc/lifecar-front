"use client";
import ClientLayout from "../../components/layout/ClientLayout";
import Hero from "@/app/[locale]/home/Hero";
import ServicesSec from "@/app/[locale]/home/ServicesSec";
import ShopSec from "@/app/[locale]/home/ShopSec";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function HomePage({}: HomePageProps) {
  return (
    <ClientLayout showHeader={true} showFooter={true}>
      <main className="home">
        <Hero />
        <ShopSec />
        {/* <ContactSec /> */}
        <ServicesSec />
      </main>
    </ClientLayout>
  );
}

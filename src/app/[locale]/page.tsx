"use client";
import ClientLayout from "../../components/layout/ClientLayout";
import ServicesSec from "@/app/[locale]/home/ServicesSec";
import ShopSec from "@/app/[locale]/home/ShopSec";
import ContactSec from "@/app/[locale]/home/ContactSec";
import AboutSec from "@/app/[locale]/home/AboutSec";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function HomePage({}: HomePageProps) {
  return (
    <ClientLayout showHeader={true} showFooter={true}>
      <main className="home">
        <ServicesSec />
        <ContactSec />
        <ShopSec />
        <AboutSec />
      </main>
    </ClientLayout>
  );
}

"use client";

import "../i18n";
import ClientLayout from "../components/layout/ClientLayout";
import Hero from "@/components/home/Hero";
import ServicesSec from "@/components/home/ServicesSec";

export default function Home() {
  return (
    <ClientLayout showHeader={true} showFooter={true}>
      <main className="home">
        <Hero />
        <ServicesSec />
      </main>
    </ClientLayout>
  );
}

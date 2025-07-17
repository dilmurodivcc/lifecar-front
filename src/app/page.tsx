"use client";

import "../i18n";
import { useTranslation } from "react-i18next";
import ClientLayout from "../components/layout/ClientLayout";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <ClientLayout showHeader={true} showFooter={true}>
      <main className="home">
        <Hero />
      </main>
    </ClientLayout>
  );
}

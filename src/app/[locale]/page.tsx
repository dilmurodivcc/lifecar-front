"use client";
import { useState, useEffect } from "react";
// import ClientLayout from "../../components/layout/ClientLayout";
// import ServicesSec from "@/app/[locale]/home/ServicesSec";
// import ShopSec from "@/app/[locale]/home/ShopSec";
// import ContactSec from "@/app/[locale]/home/ContactSec";
// import AboutSec from "@/app/[locale]/home/AboutSec";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function HomePage({ params }: HomePageProps) {
  const [locale, setLocale] = useState("uz");

  useEffect(() => {
    params.then((resolvedParams) => {
      setLocale(resolvedParams.locale);
    });
  }, [params]);

  return (
    <div>
      <h1>Lifecar</h1>
      <p>Welcome to Lifecar - {locale}</p>
    </div>
  );
}

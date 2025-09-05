"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import ClientLayout from "../../../components/layout/ClientLayout";
// i18n is initialized in I18nProvider

interface ServicesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function ServicesPage({}: ServicesPageProps) {
  const { t, ready } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !ready) {
    return (
      <ClientLayout showHeader={true} showFooter={true}>
        <main className="services-page">
          <div className="container">
            <h1>Loading...</h1>
          </div>
        </main>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout showHeader={true} showFooter={true}>
      <main className="services-page">
        <div className="container">
          <h1>{t("services.title")}</h1>
          <h2>{t("services.subtitle")}</h2>

          <div className="services-grid">
            <div className="service-card">
              <h3>{t("services.tuning.title")}</h3>
              <p>{t("services.tuning.description")}</p>
            </div>
            <div className="service-card">
              <h3>{t("services.parts.title")}</h3>
              <p>{t("services.parts.description")}</p>
            </div>
            <div className="service-card">
              <h3>{t("services.repair.title")}</h3>
              <p>{t("services.repair.description")}</p>
            </div>
            <div className="service-card">
              <h3>{t("services.accessories.title")}</h3>
              <p>{t("services.accessories.description")}</p>
            </div>
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}

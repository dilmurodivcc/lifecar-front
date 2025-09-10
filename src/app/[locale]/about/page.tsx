"use client";

import { useTranslation } from "react-i18next";
import ClientLayout from "../../../components/layout/ClientLayout";

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function AboutPage({}: AboutPageProps) {
  const { t } = useTranslation();

  return (
    <ClientLayout showHeader={true} showFooter={true}>
      <main className="about-page">
        <div className="container">
          <h1>{t("about.title")}</h1>
          <h2>{t("about.subtitle")}</h2>
          <p>{t("about.description")}</p>

          <div className="stats">
            <div className="stat">
              <h3>10+</h3>
              <p>{t("about.experience")}</p>
            </div>
            <div className="stat">
              <h3>500+</h3>
              <p>{t("about.clients")}</p>
            </div>
            <div className="stat">
              <h3>1000+</h3>
              <p>{t("about.projects")}</p>
            </div>
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}

"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import ClientLayout from "../../../components/layout/ClientLayout";
// i18n is initialized in I18nProvider

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function ContactPage({}: ContactPageProps) {
  const { t, ready } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !ready) {
    return (
      <ClientLayout showHeader={true} showFooter={true}>
        <main className="contact-page">
          <div className="container">
            <h1>Loading...</h1>
          </div>
        </main>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout showHeader={true} showFooter={true}>
      <main className="contact-page">
        <div className="container">
          <h1>{t("contact.title")}</h1>
          <h2>{t("contact.subtitle")}</h2>

          <div className="contact-info">
            <div className="contact-item">
              <h3>{t("contact.phone")}</h3>
              <p>+998 33 785 22 22</p>
              <p>+998 90 123 45 67</p>
            </div>

            <div className="contact-item">
              <h3>{t("contact.address")}</h3>
              <p>Toshkent shahar, Chilonzor tumani</p>
            </div>

            <div className="contact-item">
              <h3>{t("contact.workingHours")}</h3>
              <p>Dushanba - Shanba: 09:00 - 18:00</p>
              <p>Yakshanba: Dam olish</p>
            </div>
          </div>

          <div className="contact-form">
            <h3>{t("contact.sendMessage")}</h3>
            <form>
              <div className="form-group">
                <label>{t("contact.name")}</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>{t("contact.message")}</label>
                <textarea rows={5} required></textarea>
              </div>
              <button type="submit">{t("contact.send")}</button>
            </form>
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}

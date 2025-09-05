"use client";

import { useTranslation } from "react-i18next";
import ClientLayout from "../../../components/layout/ClientLayout";
// i18n is initialized in I18nProvider

interface ShopPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function ShopPage({}: ShopPageProps) {
  const { t } = useTranslation();

  return (
    <ClientLayout showHeader={true} showFooter={true}>
      <main className="shop-page">
        <div className="container">
          <h1>{t("shop.title")}</h1>
          <h2>{t("shop.subtitle")}</h2>

          <div className="shop-grid">
            <div className="product-card">
              <h3>Avto Ehtiyot Qismlar</h3>
              <p>Original va sifatli avto ehtiyot qismlari</p>
              <button>{t("shop.addToCart")}</button>
            </div>
            <div className="product-card">
              <h3>Tuning Aksessuarlar</h3>
              <p>Zamonaviy tuning aksessuarlari</p>
              <button>{t("shop.addToCart")}</button>
            </div>
            <div className="product-card">
              <h3>Avto Kichik Qismlar</h3>
              <p>Barcha turdagi avto kichik qismlari</p>
              <button>{t("shop.addToCart")}</button>
            </div>
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}

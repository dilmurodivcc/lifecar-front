"use client";

import "../i18n";
import { useTranslation } from "react-i18next";
import ClientLayout from "../components/layout/ClientLayout";

export default function Home() {
  const { t } = useTranslation();
  return (
    <ClientLayout showHeader={true} showFooter={true}>
       <div className="container">
        <main className="home">

        </main>
        
       </div>
    </ClientLayout>
  );
}

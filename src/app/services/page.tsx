"use client";
import ClientLayout from "@/components/layout/ClientLayout";
import { useState } from "react";

export default function Services() {
  const [isGrid, setIsGrid] = useState(false);
  return (
    <ClientLayout showHeader={true} showFooter={true}>
      <main className="services">
        <div className="container">
          <div className="services-header">
            <div className="left">
              <button className="layout-changer grid"> grid </button>
            </div>
            <div className="right">
              <input
                type="text"
                className="services-search "
                placeholder="Search the service...."
              />
            </div>
          </div>

          <section className="services-content grid"></section>
        </div>
      </main>
    </ClientLayout>
  );
}

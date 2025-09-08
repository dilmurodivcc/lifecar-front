"use client";

import { useTranslation } from "react-i18next";
import ClientLayout from "../../../components/layout/ClientLayout";
import {
  FaClock,
  FaFilter,
  FaList,
  FaSearch,
  FaSort,
  FaTags,
  FaTh,
  FaThLarge,
} from "react-icons/fa";
import Card from "@/components/layout/Card";
import { useState } from "react";
import { PiListBold } from "react-icons/pi";

interface ServicesPageProps {
  params: Promise<{
    locale: string;
  }>;
}
const services = [
  {
    id: 1,
    img: "/img/tint.webp",
    title: "Kuzov Ta'miri",
    desc: "Kichik avariya sonrası kuzovni tiklash.",
    price: "400$",
    time: "10 soat",
    type: "service",
  },
  {
    id: 2,
    img: "/img/tint.webp",
    title: "Kuzov Ta'miri",
    desc: "Kichik avariya sonrası kuzovni tiklash.",
    price: "400$",
    time: "10 soat",
    type: "service",
  },
  {
    id: 3,
    img: "/img/tint.webp",
    title: "Kuzov Ta'miri",
    desc: "Kichik avariya sonrası kuzovni tiklash.",
    price: "400$",
    time: "10 soat",
    type: "service",
  },
  {
    id: 4,
    img: "/img/tint.webp",
    title: "Kuzov Ta'miri",
    desc: "Kichik avariya sonrası kuzovni tiklash.",
    price: "400$",
    time: "10 soat",
    type: "service",
  },
  {
    id: 5,
    img: "/img/tint.webp",
    title: "Kuzov Ta'miri",
    desc: "Kichik avariya sonrası kuzovni tiklash.",
    price: "400$",
    time: "10 soat",
    type: "service",
  },
  {
    id: 6,
    img: "/img/tint.webp",
    title: "Kuzov Ta'miri",
    desc: "Kichik avariya sonrası kuzovni tiklash.",
    price: "400$",
    time: "10 soat",
    type: "service",
  },
  {
    id: 7,
    img: "/img/tint.webp",
    title: "Kuzov Ta'miri",
    desc: "Kichik avariya sonrası kuzovni tiklash.",
    price: "400$",
    time: "10 soat",
    type: "service",
  },
  {
    id: 8,
    img: "/img/tint.webp",
    title: "Kuzov Ta'miri",
    desc: "Kichik avariya sonrası kuzovni tiklash.",
    price: "400$",
    time: "10 soat",
    type: "service",
  },
  {
    id: 9,
    img: "/img/tint.webp",
    title: "Kuzov Ta'miri",
    desc: "Kichik avariya sonrası kuzovni tiklash.",
    price: "400$",
    time: "10 soat",
    type: "service",
  },
];

export default function ServicesPage({}: ServicesPageProps) {
  const { t } = useTranslation();
  const [layout, setLayout] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  // Calculate pagination
  const totalPages = Math.ceil(services.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentServices = services.slice(startIndex, endIndex);

  // Debug info (remove in production)
  console.log("Pagination Debug:", {
    totalServices: services.length,
    cardsPerPage,
    totalPages,
    currentPage,
    startIndex,
    endIndex,
    currentServicesCount: currentServices.length,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ClientLayout showHeader={true} showFooter={true}>
      <main className="services">
        <div className="container">
          <div className="services-header">
            <div className="left">
              <button
                className="layout-changer"
                onClick={() => setLayout(layout === "grid" ? "list" : "grid")}
              >
                {layout === "grid" ? <FaThLarge /> : <PiListBold />}
              </button>
              <button className="duration-selector">
                <FaClock />
              </button>
              <button className="price-selector">
                <FaSort />
              </button>
              <button className="type-selector">
                <FaTags />
              </button>
            </div>
            <div className="right">
              <input
                type="text"
                className="input-search-services"
                placeholder="Qidirish"
              />
              <button className="search-button">
                <FaSearch />
              </button>
            </div>
          </div>

          <section className={`services ${layout}`}>
            {currentServices.map((service) => (
              <Card
                key={service.id}
                img={service.img}
                title={service.title}
                desc={service.desc}
                price={service.price}
                time={service.time}
                layout={layout}
                type={service.type}
              />
            ))}
          </section>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={`pagination-number ${
                        currentPage === page ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                      aria-label={`Go to page ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </ClientLayout>
  );
}

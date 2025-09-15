"use client";

import ClientLayout from "../../../components/layout/ClientLayout";
import { FaSearch, FaThLarge } from "react-icons/fa";
import Card from "@/components/layout/Card";
import Pagination from "@/components/ui/Pagination";
import { useState, useRef, useEffect } from "react";
import { PiListBold } from "react-icons/pi";
import { useTranslation } from "react-i18next";
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
  const [layout, setLayout] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const [filterBy, setFilterBy] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const cardsPerPage = 8;
  const { t } = useTranslation();

  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortOptions = [
    { value: "default", label: t("sort.title") },
    { value: "price-low", label: t("sort.priceLow") },
    { value: "price-high", label: t("sort.priceHigh") },
  ];

  const filterOptions = [
    { value: "all", label: t("services.filter.all") },
    { value: "service", label: t("services.filter.service") },
    { value: "repair", label: t("services.filter.repair") },
    { value: "maintenance", label: t("services.filter.maintenance") },
  ];

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === "all" || service.type === filterBy;
    return matchesSearch && matchesFilter;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseInt(a.price) - parseInt(b.price);
      case "price-high":
        return parseInt(b.price) - parseInt(a.price);
      case "time-low":
        return parseInt(a.time) - parseInt(b.time);
      case "time-high":
        return parseInt(b.time) - parseInt(a.time);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedServices.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentServices = sortedServices.slice(startIndex, endIndex);

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
    <ClientLayout showHeader={true} showFooter={true} showSpace={true}>
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

              <div
                className="filter-dropdown"
                ref={sortRef}
                data-open={isSortOpen}
              >
                <button
                  className="dropdown-button"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                >
                  <span>
                    {sortOptions.find((option) => option.value === sortBy)?.label}
                  </span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="m6 8 4 4 4-4"
                    />
                  </svg>
                </button>
                <div className="dropdown-menu">
                  {sortOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`dropdown-item ${
                        sortBy === option.value ? "active" : ""
                      }`}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="filter-dropdown"
                ref={filterRef}
                data-open={isFilterOpen}
              >
                <button
                  className="dropdown-button filter"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <span>
                    {
                    filterOptions.find((option) => option.value === filterBy)
                      ?.label
                  }
                  </span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="m6 8 4 4 4-4"
                    />
                  </svg>
                </button>
                <div className="dropdown-menu">
                  {filterOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`dropdown-item ${
                        filterBy === option.value ? "active" : ""
                      }`}
                      onClick={() => {
                        setFilterBy(option.value);
                        setIsFilterOpen(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="right">
              <input
                type="text"
                className="input-search-services"
                placeholder={t("common.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-button">
                <FaSearch />
              </button>
            </div>
          </div>

          <section className={`cards-grid ${layout}`}>
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </ClientLayout>
  );
}

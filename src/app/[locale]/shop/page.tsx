"use client";

import ClientLayout from "../../../components/layout/ClientLayout";
import { FaSearch, FaThLarge } from "react-icons/fa";
import Card from "@/components/layout/Card";
import Pagination from "@/components/ui/Pagination";
import { useState, useRef, useEffect } from "react";
import { PiListBold } from "react-icons/pi";
import { useTranslation } from "react-i18next";
interface ShopPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const products = [
  {
    id: 1,
    img: "/img/7700.png",
    title: "Avto Ehtiyot Qismlar",
    desc: "Original va sifatli avto ehtiyot qismlari. Barcha mashina turlari uchun.",
    price: "150$",
    category: "parts",
  },
  {
    id: 2,
    img: "/img/malibu.png",
    title: "Tuning Aksessuarlar",
    desc: "Zamonaviy tuning aksessuarlari va modifikatsiya qismlari.",
    price: "200$",
    category: "accessories",
  },
  {
    id: 3,
    img: "/img/zimmer.png",
    title: "Avto Kichik Qismlar",
    desc: "Barcha turdagi avto kichik qismlari va detallar.",
    price: "80$",
    category: "parts",
  },
  {
    id: 4,
    img: "/img/7700.png",
    title: "Motor Qismlari",
    desc: "Motor uchun barcha kerakli qismlar va komponentlar.",
    price: "300$",
    category: "engine",
  },
  {
    id: 5,
    img: "/img/malibu.png",
    title: "Tormoz Tizimi",
    desc: "Tormoz disklari, kolodkalar va tormoz suyuqligi.",
    price: "120$",
    category: "brake",
  },
  {
    id: 6,
    img: "/img/zimmer.png",
    title: "Suspension Qismlari",
    desc: "Amortizatorlar, prujinalar va suspension komponentlari.",
    price: "250$",
    category: "suspension",
  },
  {
    id: 7,
    img: "/img/7700.png",
    title: "Elektronika",
    desc: "Avtomobil elektronikasi va sensorlar.",
    price: "180$",
    category: "electronics",
  },
  {
    id: 8,
    img: "/img/malibu.png",
    title: "Kuzov Qismlari",
    desc: "Kuzov detallari va kapot, eshiklar.",
    price: "400$",
    category: "body",
  },
  {
    id: 9,
    img: "/img/zimmer.png",
    title: "Interior Aksessuarlar",
    desc: "Salon uchun barcha kerakli aksessuarlar.",
    price: "90$",
    category: "interior",
  },
  {
    id: 10,
    img: "/img/7700.png",
    title: "Shinalar va Jantlar",
    desc: "Barcha o'lchamdagi shinalar va jantlar.",
    price: "350$",
    category: "wheels",
  },
  {
    id: 11,
    img: "/img/malibu.png",
    title: "Yog' va Filtrlar",
    desc: "Motor yog'i, havo filtri va boshqa filtrlar.",
    price: "60$",
    category: "maintenance",
  },
  {
    id: 12,
    img: "/img/zimmer.png",
    title: "Yoritish Tizimi",
    desc: "Faralar, chiroqlar va yoritish qismlari.",
    price: "140$",
    category: "lighting",
  },
];

export default function ShopPage({}: ShopPageProps) {
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
    { value: "all", label: t("shop.filter.all") },
    { value: "parts", label: t("shop.filter.parts") },
    { value: "accessories", label: t("shop.filter.accessories") },
    { value: "engine", label: t("shop.filter.engine") },
    { value: "brake", label: t("shop.filter.brake") },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === "all" || product.category === filterBy;
    return matchesSearch && matchesFilter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseInt(a.price) - parseInt(b.price);
      case "price-high":
        return parseInt(b.price) - parseInt(a.price);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ClientLayout showHeader={true} showFooter={true} showSpace={true}>
      <main className="shop">
        <div className="container">
          <div className="shop-header">
            <div className="left">
              <button
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
                className="input-search-shop"
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
            {currentProducts.map((product) => (
              <Card
                key={product.id}
                img={product.img}
                title={product.title}
                desc={product.desc}
                price={product.price}
                layout={layout}
                type={product.category}
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

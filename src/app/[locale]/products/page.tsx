"use client";

import ClientLayout from "../../../components/layout/ClientLayout";
import { FaSearch, FaThLarge } from "react-icons/fa";
import Card from "@/components/layout/Card";
import Pagination from "@/components/ui/Pagination";
import { useState, useRef, useEffect } from "react";
import { PiListBold } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import {
  useProducts,
  useProductCategories,
  type Product,
} from "@/hooks/useProducts";
import SkeletonCard from "@/components/ui/SkeletonCard";
interface ShopPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function ShopPage({ params }: ShopPageProps) {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const [filterBy, setFilterBy] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showFeaturedOnly] = useState(false);
  const [locale, setLocale] = useState("uz");
  const [isHydrated, setIsHydrated] = useState(false);
  const cardsPerPage = 8;
  const { t } = useTranslation();
  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Load saved preferences from localStorage after hydration
  useEffect(() => {
    if (!isHydrated) return;

    try {
      const savedLayout = localStorage.getItem("shop-layout");
      const savedSortBy = localStorage.getItem("shop-sortBy");
      const savedFilterBy = localStorage.getItem("shop-filterBy");

      if (savedLayout && (savedLayout === "grid" || savedLayout === "list")) {
        setLayout(savedLayout);
      }
      if (savedSortBy) {
        setSortBy(savedSortBy);
      }
      if (savedFilterBy) {
        setFilterBy(savedFilterBy);
      }
    } catch {}
  }, [isHydrated]);

  // Save layout preference to localStorage
  const handleLayoutChange = (newLayout: "grid" | "list") => {
    setLayout(newLayout);
    if (isHydrated) {
      try {
        localStorage.setItem("shop-layout", newLayout);
      } catch {}
    }
  };

  // Save sort preference to localStorage
  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    if (isHydrated) {
      try {
        localStorage.setItem("shop-sortBy", newSortBy);
      } catch {}
    }
  };

  // Save filter preference to localStorage
  const handleFilterChange = (newFilterBy: string) => {
    setFilterBy(newFilterBy);
    if (isHydrated) {
      try {
        localStorage.setItem("shop-filterBy", newFilterBy);
      } catch {}
    }
  };

  // Get locale from params
  useEffect(() => {
    params.then((resolvedParams) => {
      setLocale(resolvedParams.locale);
    });
  }, [params]);

  // Reset current page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, filterBy]);

  // Use API hooks
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts(locale, {
    search: searchTerm,
    categoryId: filterBy,
    sortBy: sortBy,
    page: currentPage,
    pageSize: cardsPerPage,
    featured: showFeaturedOnly || undefined,
  });

  const { data: categoriesData } = useProductCategories(locale);

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
  // Sort options
  const sortOptions = [
    { value: "default", label: t("sort.title") },
    { value: "price-low", label: t("sort.priceLow") },
    { value: "price-high", label: t("sort.priceHigh") },
  ];

  // Filter options from API
  const filterOptions = [
    { value: "all", label: t("shop.filter.all") },
    ...(categoriesData?.data?.data?.map((category: any) => ({
      value: category.id.toString(),
      label: category.name,
    })) || []),
  ];

  // Get products from API
  const products = productsData?.data?.data || [];
  const totalPages = productsData?.data?.meta?.pagination?.pageCount || 1;
  const currentProducts = products;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show loading state during hydration to prevent mismatch
  if (!isHydrated) {
    return (
      <ClientLayout showHeader={true} showFooter={true} showSpace={true}>
        <main className="shop">
          <div className="container">
            <div className="shop-header">
              <div className="left">
                <button disabled>
                  <FaThLarge />
                </button>
                <div className="filter-dropdown">
                  <button className="dropdown-button" disabled>
                    <span>{t("sort.title")}</span>
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
                </div>
                <div className="filter-dropdown">
                  <button className="dropdown-button filter" disabled>
                    <span>{t("shop.filter.all")}</span>
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
                </div>
              </div>
              <div className="right">
                <input
                  type="text"
                  className="input-search-shop"
                  placeholder={t("common.search")}
                  disabled
                />
                <button className="search-button" disabled>
                  <FaSearch />
                </button>
              </div>
            </div>
            <section className="cards-grid grid">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} layout="grid" showImage={true} />
              ))}
            </section>
          </div>
        </main>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout showHeader={true} showFooter={true} showSpace={true}>
      <main className="shop">
        <div className="container">
          <div className="shop-header">
            <div className="left">
              <button
                className="layout-changer"
                onClick={() =>
                  handleLayoutChange(layout === "grid" ? "list" : "grid")
                }
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
                    {
                      sortOptions.find((option) => option.value === sortBy)
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
                  {sortOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`dropdown-item ${
                        sortBy === option.value ? "active" : ""
                      }`}
                      onClick={() => {
                        handleSortChange(option.value);
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
                        handleFilterChange(option.value);
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
            {productsLoading ? (
              // Show skeleton loading cards
              Array.from({ length: cardsPerPage }).map((_, index) => (
                <SkeletonCard
                  key={index}
                  layout={layout as "grid" | "list"}
                  showImage={true}
                />
              ))
            ) : productsError ? (
              <div className="error-message">
                {t("common.error")}: {productsError.message}
              </div>
            ) : currentProducts.length === 0 ? (
              <div className="no-products">{t("shop.noProducts")}</div>
            ) : (
              currentProducts.map((product: Product) => {
                // Use the best available image format
                const imageUrl =
                  product.image?.formats?.large?.url ||
                  product.image?.formats?.medium?.url ||
                  product.image?.formats?.small?.url ||
                  product.image?.url ||
                  "/img/7700.png";

                return (
                  <Card
                    key={product.id}
                    img={imageUrl}
                    title={product.title}
                    desc={product.description}
                    price={product.price}
                    layout={layout}
                    type={product.product_categroy?.name || "product"}
                    slug={product.slug}
                  />
                );
              })
            )}
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

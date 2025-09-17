"use client";

import ClientLayout from "../../../components/layout/ClientLayout";
import { FaSearch, FaThLarge } from "react-icons/fa";
import Card from "@/components/layout/Card";
import Pagination from "@/components/ui/Pagination";
import { useState, useRef, useEffect } from "react";
import { PiListBold } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import { useServices, useServiceCategories } from "@/hooks/useServices";

interface Service {
  id: number;
  title: string;
  description: string;
  price_from: string;
  categoryId?: number;
  categoryName?: string;
  image?: {
    data?: {
      attributes?: {
        url: string;
      };
    };
    url?: string;
  };
  service_categories?: {
    data?: {
      id?: number;
      attributes?: {
        name: string;
      };
    };
    id?: number;
    name?: string;
  };
}

interface Category {
  id: number;
  name: string;
  services?: Service[];
}

interface ServicesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function ServicesPage({ params }: ServicesPageProps) {
  const [layout, setLayout] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const [filterBy, setFilterBy] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cardsPerPage = 8;
  const { t } = useTranslation();

  const [locale, setLocale] = useState("uz");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, filterBy, sortBy]);

  useEffect(() => {
    const getLocale = async () => {
      try {
        const resolvedParams = await params;
        setLocale(resolvedParams.locale);
        setError(null);
      } catch (err) {
        console.error("Error getting locale:", err);
        setError("Failed to load locale");
        setLocale("uz");
      }
    };
    getLocale();
  }, [params]);

  // Client-side filtering will be applied to categories data

  const {
    data: services,
    isLoading: servicesLoading,
    error: servicesError,
  } = useServices(locale);

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useServiceCategories(locale);

  useEffect(() => {
    if (servicesError) {
      console.error("Services API error:", servicesError);
      setError("Failed to load services");
    } else if (categoriesError) {
      console.error("Categories API error:", categoriesError);
      setError("Failed to load categories");
    } else {
      setError(null);
    }
  }, [servicesError, categoriesError]);

  console.log("Services loading:", servicesLoading);
  console.log("Services error:", servicesError);
  console.log("Categories loading:", categoriesLoading);
  console.log("Categories error:", categoriesError);

  console.log("services", services);
  console.log("categories", categories);

  if (categories?.data?.data) {
    console.log("Categories structure:", categories.data.data);
    console.log("First category:", categories.data.data[0]);
    console.log(
      "First category keys:",
      Object.keys(categories.data.data[0] || {})
    );
    if (categories.data.data[0]?.services) {
      console.log(
        "First service structure:",
        categories.data.data[0].services[0]
      );
    } else {
      console.log("No services found in first category");
    }
  }

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

  interface FilterOption {
    value: string;

    label: string;
  }

  const filterOptions: FilterOption[] = [
    { value: "all", label: t("services.filter.all") },
    ...(Array.isArray(categories?.data?.data)
      ? categories.data.data.map((category: Category) => ({
          value: category.id.toString(),
          label: category.name,
        }))
      : []),
  ];

  console.log("Filter options:", filterOptions);
  console.log("Categories for filters:", categories?.data?.data);

  // Try to get services from both sources
  const servicesFromCategories = Array.isArray(categories?.data?.data)
    ? categories.data.data.flatMap((category: Category) => {
        console.log(
          "Processing category:",
          category.name,
          "Services:",
          category.services
        );
        return (
          category.services?.map((service: Service) => ({
            ...service,
            categoryId: category.id,
            categoryName: category.name,
          })) || []
        );
      })
    : [];

  const servicesFromDirect = Array.isArray(services?.data?.data)
    ? services.data.data.map((service: Service) => ({
        ...service,
        categoryId:
          service.service_categories?.data?.id ||
          service.service_categories?.id,
        categoryName:
          service.service_categories?.data?.attributes?.name ||
          service.service_categories?.name ||
          "Service",
      }))
    : [];

  const allServices =
    servicesFromCategories.length > 0
      ? servicesFromCategories
      : servicesFromDirect;

  console.log("Services from categories:", servicesFromCategories);
  console.log("Services from direct:", servicesFromDirect);
  console.log("All services after processing:", allServices);

  const filteredServices = allServices.filter((service: Service) => {
    const matchesSearch =
      !debouncedSearchTerm ||
      service.title
        ?.toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
      service.description
        ?.toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());

    const matchesFilter =
      filterBy === "all" || service.categoryId === parseInt(filterBy);

    return matchesSearch && matchesFilter;
  });

  const sortedServices = [...filteredServices].sort(
    (a: Service, b: Service) => {
      switch (sortBy) {
        case "price-low":
          const aPrice = parseInt(a.price_from?.replace(/[^\d]/g, "") || "0");
          const bPrice = parseInt(b.price_from?.replace(/[^\d]/g, "") || "0");
          return aPrice - bPrice;
        case "price-high":
          const aPriceHigh = parseInt(
            a.price_from?.replace(/[^\d]/g, "") || "0"
          );
          const bPriceHigh = parseInt(
            b.price_from?.replace(/[^\d]/g, "") || "0"
          );
          return bPriceHigh - aPriceHigh;
        default:
          return 0;
      }
    }
  );

  const totalPages = Math.ceil(sortedServices.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentServices = sortedServices.slice(startIndex, endIndex);

  if (!Array.isArray(currentServices)) {
    console.error("currentServices is not an array:", currentServices);
  }

  console.log("Services data structure:", {
    categories,
    allServices,
    filteredServices,
    currentServices,
    totalPages,
    categoriesLoading,
    categoriesError,
  });

  console.log("Debug - Categories data:", categories?.data);
  console.log("Debug - All services:", allServices);
  console.log("Debug - Filtered services:", filteredServices);
  console.log("Debug - Current services:", currentServices);
  console.log("Debug - Categories loading:", categoriesLoading);
  console.log("Debug - Categories error:", categoriesError);

  console.log("Pagination Debug:", {
    totalServices: allServices.length,
    filteredServices: filteredServices.length,
    cardsPerPage,
    totalPages,
    currentPage,
    currentServicesCount: currentServices.length,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <ClientLayout showHeader={true} showFooter={true} showSpace={true}>
        <main className="services">
          <div className="container">
            <div className="error-state">
              <h2>Something went wrong</h2>
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          </div>
        </main>
      </ClientLayout>
    );
  }

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
                      // Show selected category label, fallback to "All"
                      filterBy === "all"
                        ? t("services.filter.all")
                        : categories?.data?.data?.find(
                            (cat: Category) =>
                              String(cat.id) === String(filterBy)
                          )?.name || t("services.filter.all")
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
                  {/* Always show "All" option */}
                  <div
                    key="all"
                    className={`dropdown-item ${
                      filterBy === "all" ? "active" : ""
                    }`}
                    onClick={() => {
                      setFilterBy("all");
                      setIsFilterOpen(false);
                    }}
                  >
                    {t("services.filter.all")}
                  </div>
                  {/* Render categories from API */}
                  {categories?.data?.data &&
                  Array.isArray(categories.data.data) &&
                  categories.data.data.length > 0 ? (
                    categories.data.data.map((cat: Category) => (
                      <div
                        key={cat.id}
                        className={`dropdown-item ${
                          String(filterBy) === String(cat.id) ? "active" : ""
                        }`}
                        onClick={() => {
                          setFilterBy(String(cat.id));
                          setIsFilterOpen(false);
                        }}
                      >
                        {cat.name}
                      </div>
                    ))
                  ) : categoriesLoading ? (
                    <div className="dropdown-item disabled">
                      {t("common.loading")}
                    </div>
                  ) : categoriesError ? (
                    <div className="dropdown-item error">
                      {t("common.error")}
                    </div>
                  ) : null}
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
            {servicesLoading || categoriesLoading ? (
              <div className="loading">Loading services...</div>
            ) : servicesError || categoriesError ? (
              <div className="error">
                Error loading services:{" "}
                {servicesError?.message ||
                  categoriesError?.message ||
                  "Unknown error"}
                <br />
                <small>Please check the console for more details.</small>
              </div>
            ) : !currentServices || currentServices.length === 0 ? (
              <div className="no-services">No services found</div>
            ) : (
              currentServices.map((service: unknown, index: number) => {
                try {
                  if (!service || typeof service !== "object") {
                    console.error("Invalid service object:", service);
                    return (
                      <div key={`error-${index}`} className="error-card">
                        Invalid service data
                      </div>
                    );
                  }

                  if (Array.isArray(service)) {
                    console.error(
                      "Service is an array, expected object:",
                      service
                    );
                    return (
                      <div key={`array-error-${index}`} className="error-card">
                        Invalid service data (array)
                      </div>
                    );
                  }

                  const typedService = service as {
                    id: number;
                    title: string;
                    description: string;
                    price_from: string;
                    categoryId?: number;
                    categoryName?: string;
                    image?: {
                      data?: {
                        attributes?: {
                          url: string;
                        };
                      };
                      url?: string;
                    };
                    service_categories?: {
                      data?: {
                        attributes?: {
                          name: string;
                        };
                      };
                      name?: string;
                    };
                  };
                  const getImageUrl = () => {
                    const imageUrl =
                      typedService.image?.data?.attributes?.url ||
                      typedService.image?.url ||
                      typedService.image;

                    if (
                      imageUrl &&
                      typeof imageUrl === "string" &&
                      imageUrl.startsWith("http")
                    ) {
                      return imageUrl;
                    }

                    return "/img/placeholder.jpg";
                  };

                  const categoryName = typedService.categoryName || "Service";

                  return (
                    <Card
                      key={typedService.id || index}
                      img={getImageUrl()}
                      title={typedService.title || "Service"}
                      desc={
                        typedService.description || "No description available"
                      }
                      price={typedService.price_from || "Price on request"}
                      time={undefined}
                      layout={layout}
                      type={categoryName}
                    />
                  );
                } catch (error) {
                  console.error(
                    "Error rendering service card:",
                    error,
                    service
                  );
                  return (
                    <div key={index} className="error-card">
                      Error loading service
                    </div>
                  );
                }
              })
            )}
          </section>

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

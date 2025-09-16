import React from "react";
import Image from "next/image";
import { useSafeTranslation } from "@/hooks/useSafeTranslation";
import Link from "next/link";
import { MdMiscellaneousServices } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import useServices from "@/hooks/useServices";

// TypeScript interfaces
interface ServiceImage {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

interface ServiceLocalization {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price_from: string;
  slug: string;
  locale: string;
}

interface Service {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price_from: string;
  slug: string;
  locale: string;
  image?: ServiceImage;
  localizations?: ServiceLocalization[];
}

interface ProcessedService {
  id: string | number;
  title: string;
  description: string;
  price: string;
  image: string;
  slug: string;
}

// Helper function to get the correct service data based on locale
const getServiceData = (
  service: Service,
  locale: string
): ProcessedService | null => {
  // Safety checks
  if (!service || typeof service !== "object") {
    return null;
  }

  // If current locale matches, use the service data directly
  if (service.locale === locale) {
    return {
      id: service.id || "unknown",
      title: service.title || "Untitled Service",
      description: service.description || "No description available",
      price: service.price_from || "Price on request",
      image: service.image?.url || "/img/tint.webp",
      slug: service.slug || "unknown-slug",
    };
  }

  // Otherwise, find the localization for the current locale
  const localization = service.localizations?.find(
    (loc: ServiceLocalization) => loc && loc.locale === locale
  );
  if (localization) {
    return {
      id: service.id || "unknown",
      title: localization.title || "Untitled Service",
      description: localization.description || "No description available",
      price: localization.price_from || "Price on request",
      image: service.image?.url || "/img/tint.webp",
      slug: localization.slug || "unknown-slug",
    };
  }

  // Fallback to the original service data
  return {
    id: service.id || "unknown",
    title: service.title || "Untitled Service",
    description: service.description || "No description available",
    price: service.price_from || "Price on request",
    image: service.image?.url || "/img/tint.webp",
    slug: service.slug || "unknown-slug",
  };
};

const ServicesSec = () => {
  const { t } = useSafeTranslation();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const locale = segments[1] || "uz";
  const { data, isLoading, error } = useServices();

  // Process API data with safety checks
  const services = React.useMemo(() => {
    // The actual services are in data.data.data (axios response structure)
    const servicesArray = data?.data?.data;

    if (!servicesArray || !Array.isArray(servicesArray)) {
      return [];
    }

    const processedServices = servicesArray
      .map((service: Service) => {
        try {
          return getServiceData(service, locale);
        } catch (error) {
          console.error("Error processing service:", service, error);
          return null;
        }
      })
      .filter((service): service is ProcessedService => service !== null); // Remove any null values

    return processedServices;
  }, [data, locale]);

  // Create infinite carousel effect by duplicating services
  const numColumns = 5;
  const columns = React.useMemo(() => {
    const cols = Array.from(
      { length: numColumns },
      (): ProcessedService[] => []
    );

    // Only process if we have services
    if (services.length > 0) {
      // Create a much longer array of repeated services for seamless infinite scroll
      // We need many more repetitions to make the loop invisible
      const repeatedServices: ProcessedService[] = [];
      const repetitions = 25; // Repeat services 25 times for very smooth infinite effect

      for (let i = 0; i < repetitions; i++) {
        // Shuffle services occasionally to make repetition less noticeable
        const shuffledServices =
          i % 3 === 0
            ? [...services].sort(() => Math.random() - 0.5)
            : services;
        repeatedServices.push(...shuffledServices);
      }

      // Distribute the repeated services across columns
      repeatedServices.forEach((service, i) => {
        if (service) {
          cols[i % numColumns].push(service);
        }
      });
    } else {
      // Fallback: Create empty columns if no services
      console.log("No services available, creating empty columns");
    }

    return cols;
  }, [services, numColumns]);

  // Show loading state
  if (isLoading) {
    return (
      <section className="ServicesSec">
        <div className="container">
          <div className="servicesCenterTitle">
            <h1>Lifecar | Auto Tuning</h1>
            <div className="btns">
              <Link href={`/${locale}/services`} prefetch={true}>
                <button className="toServices">
                  <MdMiscellaneousServices /> {t("hero.cta")}
                </button>
              </Link>
              <Link href={`/${locale}/contact`} prefetch={true}>
                <button className="toContact">
                  <FaPhoneAlt /> {t("servicesSec.Boglanish")}
                </button>
              </Link>
            </div>
          </div>
          <div className="loading-state">
            <p>Xizmatlar yuklanmoqda...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="ServicesSec">
        <div className="container">
          <div className="servicesCenterTitle">
            <h1>Lifecar | Auto Tuning</h1>
            <div className="btns">
              <Link href={`/${locale}/services`} prefetch={true}>
                <button className="toServices">
                  <MdMiscellaneousServices /> {t("hero.cta")}
                </button>
              </Link>
              <Link href={`/${locale}/contact`} prefetch={true}>
                <button className="toContact">
                  <FaPhoneAlt /> {t("servicesSec.Boglanish")}
                </button>
              </Link>
            </div>
          </div>
          <div className="error-state">
            <p>Xizmatlar yuklanmadi. Iltimos, qaytadan urinib ko&apos;ring.</p>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no services
  if (services.length === 0) {
    return (
      <section className="ServicesSec">
        <div className="container">
          <div className="servicesCenterTitle">
            <h1>Lifecar | Auto Tuning</h1>
            <div className="btns">
              <Link href={`/${locale}/services`} prefetch={true}>
                <button className="toServices">
                  <MdMiscellaneousServices /> {t("hero.cta")}
                </button>
              </Link>
              <Link href={`/${locale}/contact`} prefetch={true}>
                <button className="toContact">
                  <FaPhoneAlt /> {t("servicesSec.Boglanish")}
                </button>
              </Link>
            </div>
          </div>
          <div className="loading-state">
            <p>Hozircha xizmatlar mavjud emas.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ServicesSec">
      <div className="container">
        <div className="servicesCenterTitle">
          <h1>Lifecar | Auto Tuning</h1>
          <div className="btns">
            <Link href={`/${locale}/services`} prefetch={true}>
              <button className="toServices">
                <MdMiscellaneousServices /> {t("hero.cta")}
              </button>
            </Link>
            <Link href={`/${locale}/contact`} prefetch={true}>
              <button className="toContact">
                <FaPhoneAlt /> {t("servicesSec.Boglanish")}
              </button>
            </Link>
          </div>
        </div>
        <div className="services-carousel-wrapper">
          <div className="services-carousel">
            {columns.map((column, colIndex) => (
              <div className="carousel-column" key={colIndex}>
                {column.map((service, cardIndex) => {
                  if (!service) return null;
                  return (
                    <div
                      className="card-home"
                      key={`${service.id}-${cardIndex}`}
                    >
                      <div className="img-wrapper">
                        <Image
                          src={service.image || "/img/tint.webp"}
                          alt={service.title || "Service"}
                          width={400}
                          height={180}
                          priority={cardIndex < 10} // Prioritize first 10 images
                          onError={(e) => {
                            console.error("Image load error:", e);
                            // Fallback to default image on error
                            e.currentTarget.src = "/img/tint.webp";
                          }}
                          unoptimized={false}
                        />
                      </div>
                      <div className="card-content">
                        <h4 className="title">
                          {service.title || "Untitled Service"}
                        </h4>
                        <div className="card-bottom">
                          <p className="description">
                            {service.description || "No description available"}
                          </p>
                          <h4 className="price">
                            {service.price || "Price on request"}
                          </h4>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="carousel-fade"></div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSec;

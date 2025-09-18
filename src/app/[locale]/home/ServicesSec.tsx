import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSafeTranslation } from "@/hooks/useSafeTranslation";
import Link from "next/link";
import { MdMiscellaneousServices } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useServices } from "@/hooks/useServices";
import SkeletonCard from "@/components/ui/SkeletonCard";

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

const getServiceData = (
  service: Service,
  locale: string
): ProcessedService | null => {
  if (!service || typeof service !== "object") {
    return null;
  }

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
  const { data, isLoading } = useServices();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const services = React.useMemo(() => {
    const servicesArray = data?.data?.data;

    if (!servicesArray || !Array.isArray(servicesArray)) {
      return [];
    }

    const processedServices = servicesArray
      .map((service: Service) => {
        try {
          return getServiceData(service, locale);
        } catch {
          return null;
        }
      })
      .filter((service): service is ProcessedService => service !== null); // Remove any null values

    return processedServices;
  }, [data?.data?.data, locale]);

  const numColumns = 5;
  const columns = React.useMemo(() => {
    const cols = Array.from(
      { length: numColumns },
      (): ProcessedService[] => []
    );

    if (services.length > 0) {
      // We need many more repetitions to make the loop invisible
      const repeatedServices: ProcessedService[] = [];
      const repetitions = 25; // Repeat services 25 times for very smooth infinite effect

      for (let i = 0; i < repetitions; i++) {
        // Use a stable shuffle based on service IDs to prevent infinite re-renders
        const shuffledServices =
          i % 3 === 0
            ? [...services].sort((a, b) => {
                const aId = typeof a.id === "string" ? a.id : a.id.toString();
                const bId = typeof b.id === "string" ? b.id : b.id.toString();
                return aId.localeCompare(bId);
              })
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
    }

    return cols;
  }, [services, numColumns]);

  // Show loading state with skeleton cards
  if (isLoading || !isClient) {
    return (
      <section className="ServicesSec">
        <div className="container">
          <div className="servicesCenterTitle">
            <h1>{t("hero.title")}</h1>
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
              {Array.from({ length: 5 }, (_, colIndex) => (
                <div className="carousel-column" key={colIndex}>
                  {Array.from({ length: 3 }, (_, cardIndex) => (
                    <SkeletonCard key={`skeleton-${colIndex}-${cardIndex}`} />
                  ))}
                </div>
              ))}
            </div>
            <div className="carousel-fade"></div>
          </div>
        </div>
      </section>
    );
  }

  // Show skeleton if no services (hide empty state from user)
  if (services.length === 0) {
    return (
      <section className="ServicesSec">
        <div className="container">
          <div className="servicesCenterTitle">
            <h1>{t("hero.title")}</h1>
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
              {Array.from({ length: 5 }, (_, colIndex) => (
                <div className="carousel-column" key={colIndex}>
                  {Array.from({ length: 3 }, (_, cardIndex) => (
                    <SkeletonCard key={`skeleton-${colIndex}-${cardIndex}`} />
                  ))}
                </div>
              ))}
            </div>
            <div className="carousel-fade"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ServicesSec">
      <div className="container">
        <div className="servicesCenterTitle">
          <h1>{t("hero.title")}</h1>
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

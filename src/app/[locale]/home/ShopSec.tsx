import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSafeTranslation } from "@/hooks/useSafeTranslation";
import { useProducts, type Product } from "@/hooks/useProducts";
import Link from "next/link";

interface ShopSecProps {
  locale?: string;
}

const ShopSec = ({ locale = "uz" }: ShopSecProps) => {
  const { t } = useSafeTranslation();
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentLocale, setCurrentLocale] = useState("uz");

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
    setCurrentLocale(locale);
  }, [locale]);

  // Fetch featured products (limit to 3 for home page)
  const {
    data: productsData,
    isLoading,
    error,
  } = useProducts(currentLocale, {
    page: 1,
    pageSize: 3,
    sortBy: "default", // Show newest products
    featured: true, // Only show featured products
  });

  const products = productsData?.data?.data || [];

  // Show loading state during hydration to prevent mismatch
  if (!isHydrated) {
    return (
      <section className="ShopSec">
        <div className="container">
          <div className="ShopSec-header">
            <div className="left">
              <h2 className="ShopSec-title">{t("shopSec.title")}</h2>
              <p className="ShopSec-description">{t("shopSec.subtitle")}</p>
            </div>

            <Link href="/shop" className="ShopSec-button primary-btn">
              <span>{t("shopSec.viewAll")}</span>
            </Link>
          </div>
          <div className="shop-cards">
            {Array.from({ length: 3 }).map((_, index) => (
              <div className="shop-card" key={index}>
                <div className="skeleton-img">
                  <div className="skeleton-shimmer"></div>
                </div>
                <div className="card-content">
                  <div className="top">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-desc"></div>
                    <div className="skeleton-desc"></div>
                  </div>
                  <div className="bottom">
                    <div className="skeleton-price"></div>
                    <div
                      className="skeleton-price"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ShopSec">
      <div className="container">
        <div className="ShopSec-header">
          <div className="left">
            <h2 className="ShopSec-title">{t("shopSec.title")}</h2>
            <p className="ShopSec-description">{t("shopSec.subtitle")}</p>
          </div>

          <Link href="/shop" className="ShopSec-button primary-btn">
            <span>{t("shopSec.viewAll")}</span>
          </Link>
        </div>
        <div className="shop-cards">
          {isLoading ? (
            // Show skeleton loading cards
            Array.from({ length: 3 }).map((_, index) => (
              <div className="shop-card" key={index}>
                <div className="skeleton-img">
                  <div className="skeleton-shimmer"></div>
                </div>
                <div className="card-content">
                  <div className="top">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-desc"></div>
                    <div className="skeleton-desc"></div>
                  </div>
                  <div className="bottom">
                    <div className="skeleton-price"></div>
                    <div
                      className="skeleton-price"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="error-message">Error loading products</div>
          ) : products.length === 0 ? (
            <div className="no-products">No products available</div>
          ) : (
            products.map((product: Product) => {
              // Use the best available image format
              const imageUrl =
                product.image?.formats?.large?.url ||
                product.image?.formats?.medium?.url ||
                product.image?.formats?.small?.url ||
                product.image?.url ||
                "/img/7700.png";

              return (
                <div className="shop-card" key={product.id}>
                  <Image
                    src={imageUrl}
                    alt={product.title}
                    width={400}
                    height={400}
                    onError={(e) => {
                      e.currentTarget.src = "/img/7700.png";
                    }}
                  />
                  <div className="card-content">
                    <div className="top">
                      <div className="title">{product.title}</div>
                      <div className="description">{product.description}</div>
                    </div>
                    <div className="bottom">
                      <h5 className="price">{product.price}</h5>
                      <Link
                        href={`/shop/${product.slug}`}
                        className="primary-btn"
                      >
                        More info
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default ShopSec;

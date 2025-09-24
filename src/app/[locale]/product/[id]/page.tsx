"use client";
import ClientLayout from "@/components/layout/ClientLayout";
import { useEffect, useState, useRef } from "react";
import { useProductBySlug, type Product } from "@/hooks/useProducts";
import { useSafeTranslation } from "@/hooks/useSafeTranslation";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { FaArrowLeft, FaArrowRight, FaPhone, FaTelegram } from "react-icons/fa";

interface ProductDetailProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetail = ({ params }: ProductDetailProps) => {
  const [slug, setSlug] = useState("");
  const [locale, setLocale] = useState("uz");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const contactDropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useSafeTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    params.then((resolvedParams) => {
      setSlug(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (!mounted) return;

    const pathname = window.location.pathname;
    const localeMatch = pathname.match(/^\/([a-z]{2})\//);
    if (localeMatch) {
      setLocale(localeMatch[1]);
    }
  }, [mounted]);

  const { data: productData, isLoading } = useProductBySlug(slug, locale);
  const product = productData?.data?.data?.[0] as Product | undefined;

  useEffect(() => {
    if (!mounted || !product?.detail?.full_info) return;

    const checkOverflow = () => {
      const contentElement = document.querySelector(".detail-content");
      if (contentElement) {
        const isOverflowing =
          contentElement.scrollHeight > contentElement.clientHeight;
        setShowExpandButton(isOverflowing);
      }
    };

    const timeoutId = setTimeout(checkOverflow, 100);

    window.addEventListener("resize", checkOverflow);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [mounted, product?.detail?.full_info]);

  // Click outside to close dropdown
  useEffect(() => {
    if (!mounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        contactDropdownRef.current &&
        !contactDropdownRef.current.contains(event.target as Node)
      ) {
        setIsContactDropdownOpen(false);
      }
    };

    if (isContactDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mounted, isContactDropdownOpen]);

  if (isLoading) {
    return (
      <ClientLayout showHeader={true} showFooter={false} showSpace={true}>
        <div className="product-detail-loading">
          <div className="container" style={{ minHeight: "80vh" }}>
            <div className="loading-content" style={{ marginTop: "100px" }}>
              <LoadingSpinner size="large" />
            </div>
          </div>
        </div>
      </ClientLayout>
    );
  }

  if (!product) {
    return (
      <ClientLayout showHeader={true} showFooter={true} showSpace={true}>
        <div className="product-detail-error">
          <div className="container">
            <div className="error-content">
              <h2>{t("common.notFound.title")}</h2>
              <p>{t("common.notFound.message")}</p>
              <Link href="/shop" className="primary-btn">
                {t("common.notFound.backToShop")}
              </Link>
            </div>
          </div>
        </div>
      </ClientLayout>
    );
  }

  const getImageUrl = (img: any) => {
    return (
      img?.formats?.large?.url ||
      img?.formats?.medium?.url ||
      img?.formats?.small?.url ||
      img?.url ||
      "/img/7700.png"
    );
  };

  const mainImageUrl = getImageUrl(product?.image);
  const detailImages = product?.detail?.img || [];

  const galleryImages = [
    mainImageUrl,
    ...detailImages.map((img) => getImageUrl(img)),
  ].filter(Boolean);

  return (
    <ClientLayout showHeader={true} showFooter={true} showSpace={true}>
      <div className="product-detail">
        <div className="container">
          <div className="product-content">
            <div className="product-gallery">
              <div className="main-image">
                <Image
                  src={galleryImages[currentImageIndex]}
                  alt={product.title}
                  width={600}
                  height={400}
                  onError={(e) => {
                    e.currentTarget.src = "/img/7700.png";
                  }}
                />
                <div className="image-navigation">
                  <button
                    className="nav-btn prev"
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? galleryImages.length - 1 : prev - 1
                      )
                    }
                  >
                    <FaArrowLeft />
                  </button>
                  <button
                    className="nav-btn next"
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === galleryImages.length - 1 ? 0 : prev + 1
                      )
                    }
                  >
                    <FaArrowRight />
                  </button>
                </div>
                <div className="image-counter">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
              </div>

              <div className="thumbnail-gallery">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${
                      index === currentImageIndex ? "active" : ""
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      width={80}
                      height={80}
                      onError={(e) => {
                        e.currentTarget.src = "/img/7700.png";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="product-info">
              <div className="product-header">
                <div className="category-badge">
                  {product.product_categroy.name}
                </div>
                <h1 className="product-title">{product.title}</h1>
                <p className="product-description">{product.description}</p>
              </div>

              <div className="product-pricing">
                <div className="price-container">
                  <span className="current-price">{product.price}</span>
                  {product.old_price && (
                    <span className="old-price">{product.old_price}</span>
                  )}
                </div>
                {product.old_price && (
                  <div className="discount-badge">
                    {Math.round(
                      ((parseFloat(product.old_price.replace(/[^\d]/g, "")) -
                        parseFloat(product.price.replace(/[^\d]/g, ""))) /
                        parseFloat(product.old_price.replace(/[^\d]/g, ""))) *
                        100
                    )}
                    % {t("productDetail.discount")}
                  </div>
                )}
              </div>
              <div className="get-product" ref={contactDropdownRef}>
                <button
                  className="primary-btn get-products-contact"
                  onClick={() =>
                    setIsContactDropdownOpen(!isContactDropdownOpen)
                  }
                >
                  Sotib olish | Buyurtma berish
                </button>
                <div
                  className={`contact-dropdown ${
                    isContactDropdownOpen ? "open" : ""
                  }`}
                >
                  <div className="contact-item">
                    <a href="tel:+998337852222" className="contact-link phone">
                      <FaPhone className="contact-icon" />
                      <span className="contact-text">+998 33 785 22 22</span>
                    </a>
                  </div>
                  <div className="contact-item">
                    <a href="tel:+998946188848" className="contact-link phone">
                      <FaPhone className="contact-icon" />
                      <span className="contact-text">+998 94 618 88 48</span>
                    </a>
                  </div>
                  <div className="contact-item">
                    <a
                      href="https://t.me/TuningLifeCar"
                      className="contact-link telegram"
                    >
                      <FaTelegram className="contact-icon" />
                      <span className="contact-text">Telegram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-details">
            <div className="container">
              {product.detail && (
                <>
                  <div className="detail-section">
                    <h3>{t("productDetail.fullInfo.title")}</h3>
                    <div
                      className={`detail-content ${
                        isDescriptionExpanded ? "expanded" : ""
                      }`}
                    >
                      {product.detail.full_info
                        .split("\n")
                        .map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      {mounted && showExpandButton && (
                        <button
                          className="expand-btn"
                          onClick={() =>
                            setIsDescriptionExpanded(!isDescriptionExpanded)
                          }
                        >
                          {isDescriptionExpanded
                            ? t("productDetail.fullInfo.showLess")
                            : t("productDetail.fullInfo.showMore")}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="product-specs">
                    <div className="spec-item">
                      <span className="spec-label">
                        {t("productDetail.specs.brand")}:
                      </span>
                      <span className="spec-value">{product.detail.brand}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">
                        {t("productDetail.specs.warranty")}:
                      </span>
                      <span className="spec-value">
                        {product.detail.waranty}
                      </span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">
                        {t("productDetail.specs.date")}:
                      </span>
                      <span className="spec-value">{product.detail.date}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">
                        {t("productDetail.specs.delivery")}:
                      </span>
                      <span className="spec-value">
                        {product.detail.delivary
                          ? t("productDetail.specs.available")
                          : t("productDetail.specs.notAvailable")}
                      </span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">
                        {t("productDetail.specs.quantity")}:
                      </span>
                      <span className="spec-value">
                        {product.detail.quantity}{" "}
                        {t("productDetail.specs.pieces")}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ProductDetail;

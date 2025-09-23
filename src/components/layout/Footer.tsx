"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaYoutube,
  FaPhone,
  FaTelegram,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa6";
import { TbBrandYandex } from "react-icons/tb";
import { IoMdArrowRoundUp } from "react-icons/io";
import YandexMap from "../ui/YandexMap";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import {
  useProductCategories,
  type ProductCategory,
} from "@/hooks/useProducts";

const Footer = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const locale = segments[1] || "uz";
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  const { data: categoriesData, isLoading: categoriesLoading } =
    useProductCategories(locale);
  const categories = categoriesData?.data?.data || [];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark") || "dark";
    setTheme(savedTheme);

    const handleStorageChange = () => {
      const currentTheme =
        (localStorage.getItem("theme") as "light" | "dark") || "dark";
      setTheme(currentTheme);
    };
    window.addEventListener("storage", handleStorageChange);

    const observer = new MutationObserver(() => {
      const currentTheme =
        (document.documentElement.getAttribute("data-theme") as
          | "light"
          | "dark") || "dark";
      setTheme(currentTheme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      observer.disconnect();
    };
  }, [mounted]);

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-contact">
          <div className="footer-col-title">{t("footer.social.title")}</div>
          <div className="footer-social">
            <a href="https://t.me/lifecar_uz" aria-label="X" target="_blank">
              <FaTelegram />
            </a>
            <a href="https://instagram.com/life_car.uzb" aria-label="GitHub" target="_blank">
              <FaInstagram />
            </a>
            <a href="https://youtube.com/@LIFECARUZB" aria-label="Reddit" target="_blank">
              <FaYoutube />
            </a>
            <a href="https://yandex.uz/maps/-/CLqABUnb" aria-label="YouTube" target="_blank">
              <TbBrandYandex />
            </a>
            <a href="https://tiktok.com/@life_car.uzb" aria-label="TikTok" target="_blank">
              <FaTiktok />
            </a>
          </div>
          <div className="footer-col-title">{t("footer.contact.title")}</div>
          <div className="footer-contact-info">
            <a href="tel:+998 33 785 22 22">
              {" "}
              <FaPhone /> +998 33 785 22 22
            </a>
            <a href="tel:+998 94 618 88 48">
              {" "}
              <FaPhone /> +998 94 618 88 48
            </a>
            <a href="https://t.me/TuningLifeCar">
              {" "}
              <FaTelegram /> @TuningLifeCar
            </a>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <div className="footer-col-title">{t("footer.links.title")}</div>
            <Link href={`/${locale}`}>{t("navigation.home")}</Link>
            <Link href={`/${locale}/services`}>{t("navigation.services")}</Link>
            <Link href={`/${locale}/products`}>{t("navigation.shop")}</Link>
            <Link href={`/${locale}/contact`}>{t("navigation.contact")}</Link>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">{t("footer.shop.title")}</div>
            <Link href={`/${locale}/products`}>
              {t("footer.shop.allProducts")}
            </Link>
            {!mounted || categoriesLoading ? (
              <div>Loading...</div>
            ) : (
              categories.slice(0, 4).map((category: ProductCategory) => (
                <Link
                  key={category.id}
                  href={`/${locale}/products?category=${category.id}`}
                >
                  {category.name}
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="footer-map">
          <div className="footer-col-title">{t("footer.map.title")}</div>
          {mounted && <YandexMap theme={theme} />}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          © 2024 {t("footer.bottom.copyright")}
        </div>
        <div
          className="footer-backToTop"
          style={{ cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {t("footer.bottom.backToTop")} <IoMdArrowRoundUp />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

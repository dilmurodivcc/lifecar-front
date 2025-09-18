"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaYoutube, FaPhone, FaTelegram, FaInstagram } from "react-icons/fa6";
import { TbBrandYandex } from "react-icons/tb";
import { IoMdArrowRoundUp } from "react-icons/io";
import YandexMap from "../ui/YandexMap";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

const Footer = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const locale = segments[1] || "uz";
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

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
            <a href="https://t.me/lifecar_uz" aria-label="X">
              <FaTelegram />
            </a>
            <a href="https://instagram.com/life_car.uzb" aria-label="GitHub">
              <FaInstagram />
            </a>
            <a href="https://youtube.com/@LIFECARUZB" aria-label="Reddit">
              <FaYoutube />
            </a>
            <a href="https://yandex.com/@lifecar_uz" aria-label="YouTube">
              <TbBrandYandex />
            </a>
          </div>
          <div className="footer-col-title">{t("footer.contact.title")}</div>
          <div className="footer-contact-info">
            <a href="tel:+998 33 785 22 22">
              {" "}
              <FaPhone /> +998 33 785 22 22
            </a>
            <a href="tel:+998 99 814 65 65">
              {" "}
              <FaPhone /> +998 99 814 65 65
            </a>
            <a href="https://t.me/lifecar_uz">
              {" "}
              <FaTelegram /> @lifecar_uz
            </a>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <div className="footer-col-title">{t("footer.links.title")}</div>
            <Link href={`/${locale}`}>{t("navigation.home")}</Link>
            <Link href={`/${locale}/services`}>{t("navigation.services")}</Link>
            <Link href={`/${locale}/shop`}>{t("navigation.shop")}</Link>
            <Link href={`/${locale}/contact`}>{t("navigation.contact")}</Link>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">{t("footer.shop.title")}</div>
            <Link href={`/${locale}/shop`}>{t("footer.shop.allProducts")}</Link>
            <Link href={`/${locale}/shop`}>
              {t("footer.shop.steeringWheels")}
            </Link>
            <Link href={`/${locale}/shop`}>
              {t("footer.shop.radarDetectors")}
            </Link>
            <Link href={`/${locale}/shop`}>{t("footer.shop.tanirofka")}</Link>
            <Link href={`/${locale}/shop`}>
              {t("footer.shop.carAccessories")}
            </Link>
          </div>
        </div>

        <div className="footer-map">
          <div className="footer-col-title">{t("footer.map.title")}</div>
          <YandexMap theme={theme} />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          © {new Date().getFullYear()} {t("footer.bottom.copyright")}
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

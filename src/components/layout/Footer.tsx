"use client";

import React, { useState, useEffect } from "react";
import { FaYoutube, FaPhone, FaTelegram, FaInstagram } from "react-icons/fa6";
import { TbBrandYandex } from "react-icons/tb";
import { IoMdArrowRoundUp } from "react-icons/io";
import YandexMap from "../ui/YandexMap";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
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

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-contact">
            <div className="footer-col-title">Social Media</div>
            <div className="footer-social">
              <a href="#" aria-label="X">
                <FaTelegram />
              </a>
              <a href="#" aria-label="GitHub">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Reddit">
                <FaYoutube />
              </a>
              <a href="#" aria-label="YouTube">
                <TbBrandYandex />
              </a>
            </div>
            <div className="footer-col-title">Contact</div>
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
              <div className="footer-col-title">Links</div>
              <a href="#">Home</a>
              <a href="#">Contact</a>
              <a href="#">Services</a>
              <a href="#">Shop</a>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Shop</div>
              <a href="#">All Products</a>
              <a href="#">Steering Wheels</a>
              <a href="#">Radar Detectors</a>
              <a href="#">Tanirofka</a>
              <a href="#">Car Accessories</a>
            </div>
          </div>

          <div className="footer-map">
            <div className="footer-col-title">Map</div>
            <YandexMap theme="dark" />
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Lifecar Auto Tuning
          </div>
          <div
            className="footer-backToTop"
            style={{ cursor: "pointer" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top <IoMdArrowRoundUp />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-contact">
          <div className="footer-col-title">{t("footer.social.title")}</div>
          <div className="footer-social">
            <a href="#" aria-label="X">
              <FaTelegram />
            </a>
            <a href="#" aria-label="GitHub">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Reddit">
              <FaYoutube />
            </a>
            <a href="#" aria-label="YouTube">
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
            <a href="#">{t("navigation.home")}</a>
            <a href="#">{t("navigation.services")}</a>
            <a href="#">{t("navigation.shop")}</a>
            <a href="#">{t("navigation.contact")}</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">{t("footer.shop.title")}</div>
            <a href="#"> {t("footer.shop.allProducts")}</a>
            <a href="#">{t("footer.shop.steeringWheels")}</a>
            <a href="#">{t("footer.shop.radarDetectors")}</a>
            <a href="#">{t("footer.shop.tanirofka")}</a>
            <a href="#">{t("footer.shop.carAccessories")}</a>
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

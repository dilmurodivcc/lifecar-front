"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { HiSun, HiMoon, HiChevronDown } from "react-icons/hi";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/providers/ThemeProvider";

const languages = [
  { label: "O'zbek", value: "uz", img: "/icons/uz.avif" },
  { label: "Русский", value: "ru", img: "/icons/ru.png" },
];

const Header = () => {
  const [mounted, setMounted] = useState(false);

  // useTheme now handles SSR gracefully
  const themeContext = useTheme();
  const [language, setLanguage] = useState("uz");
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const segments = pathname.split("/");
  const locale = segments[1] || "uz";

  // Function to check if a link is active
  const isActiveLink = (href: string) => {
    const cleanHref = href.replace(`/${locale}`, "") || "/";
    const cleanPathname = pathname.replace(`/${locale}`, "") || "/";

    // Exact match for home page
    if (cleanHref === "/" && cleanPathname === "/") {
      return true;
    }

    // For other pages, check if pathname starts with the href
    if (cleanHref !== "/" && cleanPathname.startsWith(cleanHref)) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    setMounted(true);
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const segments = pathname.split("/");
    const locale = segments[1];
    if (["uz", "ru"].includes(locale)) {
      setLanguage(locale);
      if (i18n) {
        i18n.changeLanguage(locale);
      }
    }
  }, [pathname, i18n, isClient]);

  useEffect(() => {
    if (!isClient) return;

    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node))
        setLangOpen(false);
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      )
        setMobileMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isClient]);

  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      if (window.scrollY > 30) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  const changeLanguage = (newLanguage: string) => {
    if (!i18n || !isClient) return;

    const currentScrollY = window.scrollY;

    setLanguage(newLanguage);
    setLangOpen(false);

    i18n.changeLanguage(newLanguage);

    const segments = pathname.split("/");
    const newPath = `/${newLanguage}/${segments.slice(2).join("/")}`;

    router.replace(newPath);

    // Prevent horizontal scroll and maintain vertical position
    setTimeout(() => {
      window.scrollTo({
        top: currentScrollY,
        left: 0,
        behavior: "instant",
      });
    }, 50);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <header className="shrink">
        <div className="logo">
          <Image
            src="/icons/lifecar.webp"
            alt="Lifecar Logo"
            width={50}
            height={50}
          />
          <Link className="logoName" href={`/${locale}`}>
            Lifecar
          </Link>
        </div>

        <nav className="desktop-nav">
          <Link href={`/${locale}`} prefetch={true}>
            {t("navigation.home")}
          </Link>
          <Link href={`/${locale}/services`} prefetch={true}>
            {t("navigation.services")}
          </Link>
          <Link href={`/${locale}/products`} prefetch={true}>
            {t("navigation.shop")}
          </Link>
          <Link href={`/${locale}/contact`} prefetch={true}>
            {t("navigation.contact")}
          </Link>
        </nav>

        <div className="actions desktop-actions">
          <div className="dropdown" ref={langRef} data-open={false}>
            <button className="language">
              {t("header.languages.uz")}
              <HiChevronDown />
            </button>
          </div>
          <button className="theme-toggle" onClick={themeContext.toggleTheme}>
            <HiSun />
          </button>
        </div>

        <button
          className={`mobile-menu-btn ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </header>
    );
  }

  return (
    <header className={shrink ? "shrink" : ""}>
      <Link href={`/${locale}`}>
        <div className="logo">
          <Image
            src="/icons/lifecar.webp"
            alt="Lifecar Logo"
            width={50}
            height={50}
          />
          <span className="logoName">Lifecar</span>
        </div>
      </Link>

      <nav className="desktop-nav">
        <Link
          href={`/${locale}`}
          className={`nav-link ${isActiveLink(`/${locale}`) ? "active" : ""}`}
          prefetch={true}
        >
          {t("navigation.home")}
        </Link>
        <Link
          href={`/${locale}/services`}
          className={`nav-link ${
            isActiveLink(`/${locale}/services`) ? "active" : ""
          }`}
          prefetch={true}
        >
          {t("navigation.services")}
        </Link>
        <Link
          href={`/${locale}/products`}
          className={`nav-link ${
            isActiveLink(`/${locale}/products`) ? "active" : ""
          }`}
          prefetch={true}
        >
          {t("navigation.shop")}
        </Link>
        <Link
          href={`/${locale}/contact`}
          className={`nav-link ${
            isActiveLink(`/${locale}/contact`) ? "active" : ""
          }`}
          prefetch={true}
        >
          {t("navigation.contact")}
        </Link>
      </nav>

      <div className="actions desktop-actions">
        <div className="dropdown" ref={langRef} data-open={langOpen}>
          <button className="language" onClick={() => setLangOpen((v) => !v)}>
            {languages.find((l) => l.value === language)?.label}
            <HiChevronDown />
          </button>
          <ul className="dropdown-menu lang">
            {languages.map((l) => (
              <li
                key={l.value}
                onClick={() => changeLanguage(l.value)}
                className={language === l.value ? "active" : ""}
              >
                <Image
                  src={l.img}
                  alt={l.label}
                  className="lang-img"
                  width={18}
                  height={18}
                />
                <span>{l.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <button className="theme-toggle" onClick={themeContext.toggleTheme}>
          {themeContext.theme === "light" ? <HiMoon /> : <HiSun />}
        </button>
      </div>

      <button
        className={`mobile-menu-btn ${mobileMenuOpen ? "active" : ""}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        onTouchEnd={(e) => {
          // Prevent double-tap zoom on mobile
          e.preventDefault();
          setMobileMenuOpen(!mobileMenuOpen);
        }}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div
        className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}
        ref={mobileMenuRef}
      >
        <nav className="mobile-nav">
          <Link
            href={`/${locale}`}
            className={`nav-link ${isActiveLink(`/${locale}`) ? "active" : ""}`}
            prefetch={true}
            onClick={() => {
              setMobileMenuOpen(false);
              // Prevent horizontal scroll
              setTimeout(() => {
                window.scrollTo({ left: 0, behavior: "instant" });
              }, 10);
            }}
          >
            {t("navigation.home")}
          </Link>
          <Link
            href={`/${locale}/services`}
            className={`nav-link ${
              isActiveLink(`/${locale}/services`) ? "active" : ""
            }`}
            prefetch={true}
            onClick={() => {
              setMobileMenuOpen(false);
              // Prevent horizontal scroll
              setTimeout(() => {
                window.scrollTo({ left: 0, behavior: "instant" });
              }, 10);
            }}
          >
            {t("navigation.services")}
          </Link>
          <Link
            href={`/${locale}/products`}
            className={`nav-link ${
              isActiveLink(`/${locale}/products`) ? "active" : ""
            }`}
            prefetch={true}
            onClick={() => {
              setMobileMenuOpen(false);
              // Prevent horizontal scroll
              setTimeout(() => {
                window.scrollTo({ left: 0, behavior: "instant" });
              }, 10);
            }}
          >
            {t("navigation.shop")}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className={`nav-link ${
              isActiveLink(`/${locale}/contact`) ? "active" : ""
            }`}
            prefetch={true}
            onClick={() => {
              setMobileMenuOpen(false);
              // Prevent horizontal scroll
              setTimeout(() => {
                window.scrollTo({ left: 0, behavior: "instant" });
              }, 10);
            }}
          >
            {t("navigation.contact")}
          </Link>
        </nav>

        <div className="mobile-actions">
          <div className="dropdown" ref={langRef} data-open={langOpen}>
            <button className="language" onClick={() => setLangOpen((v) => !v)}>
              {languages.find((l) => l.value === language)?.label}
              <HiChevronDown />
            </button>
            <ul className="dropdown-menu lang">
              {languages.map((l) => (
                <li
                  key={l.value}
                  onClick={() => changeLanguage(l.value)}
                  className={language === l.value ? "active" : ""}
                >
                  <Image
                    src={l.img}
                    alt={l.label}
                    className="lang-img"
                    width={18}
                    height={18}
                  />
                  <span>{l.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <button className="theme-toggle" onClick={themeContext.toggleTheme}>
            {themeContext.theme === "light" ? <HiMoon /> : <HiSun />}
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;

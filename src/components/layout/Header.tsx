"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { HiSun, HiMoon, HiChevronDown, HiMenu, HiX } from "react-icons/hi";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const languages = [
  { label: "O'zbek", value: "uz", img: "/icons/uz.avif" },
  { label: "Русский", value: "ru", img: "/icons/ru.png" },
];

const Header = () => {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("uz");
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [mounted, setMounted] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const segments = pathname.split("/");
  const locale = segments[1] || "uz";

  useEffect(() => {
    setMounted(true);
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme, isClient]);

  useEffect(() => {
    if (!isClient) return;

    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
  }, [isClient]);

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

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const changeLanguage = (newLanguage: string) => {
    if (!i18n || !isClient) return;

    // Save current scroll position
    const currentScrollY = window.scrollY;

    setLanguage(newLanguage);
    setLangOpen(false);

    i18n.changeLanguage(newLanguage);

    const segments = pathname.split("/");
    const newPath = `/${newLanguage}/${segments.slice(2).join("/")}`;

    // Use replace instead of push to prevent layout shift
    router.replace(newPath);

    // Restore scroll position after a short delay
    setTimeout(() => {
      window.scrollTo({
        top: currentScrollY,
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

        {/* Desktop Navigation - Hidden on mobile by CSS */}
        <nav className="desktop-nav">
          <Link href={`/${locale}`} prefetch={true}>
            Home
          </Link>
          <Link href={`/${locale}/services`} prefetch={true}>
            Services
          </Link>
          <Link href={`/${locale}/shop`} prefetch={true}>
            Shop
          </Link>
          <Link href={`/${locale}/contact`} prefetch={true}>
            Contact
          </Link>
        </nav>

        {/* Desktop Actions - Hidden on mobile by CSS */}
        <div className="actions desktop-actions">
          <div className="dropdown" ref={langRef} data-open={false}>
            <button className="language">
              O&apos;zbek
              <HiChevronDown />
            </button>
          </div>
          <button className="theme-toggle">
            <HiSun />
          </button>
        </div>

        {/* Mobile Menu Button - Hidden on desktop by CSS */}
        <button className="mobile-menu-btn">
          <HiMenu />
        </button>
      </header>
    );
  }

  return (
    <header className={shrink ? "shrink" : ""}>
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
        <Link href={`/${locale}/shop`} prefetch={true}>
          {t("navigation.shop")}
        </Link>

        <Link href={`/${locale}/contact`} prefetch={true}>
          {t("navigation.contact")}
        </Link>
      </nav>

      <div className="actions desktop-actions">
        <div className="dropdown" ref={langRef} data-open={langOpen}>
          <button className="language" onClick={() => setLangOpen((v) => !v)}>
            {languages.find((l) => l.value === language)?.label}
            <HiChevronDown />
          </button>
          <ul className="dropdown-menu">
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
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? <HiMoon /> : <HiSun />}
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}
        ref={mobileMenuRef}
      >
        <nav className="mobile-nav">
          <Link
            href={`/${locale}`}
            prefetch={true}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("navigation.home")}
          </Link>
          <Link
            href={`/${locale}/services`}
            prefetch={true}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("navigation.services")}
          </Link>
          <Link
            href={`/${locale}/shop`}
            prefetch={true}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("navigation.shop")}
          </Link>

          <Link
            href={`/${locale}/contact`}
            prefetch={true}
            onClick={() => setMobileMenuOpen(false)}
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
            <ul className="dropdown-menu">
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
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? <HiMoon /> : <HiSun />}
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;

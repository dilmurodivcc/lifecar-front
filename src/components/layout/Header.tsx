"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { HiSun, HiMoon, HiChevronDown } from "react-icons/hi";
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
  const langRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Get current locale from pathname
      const segments = pathname.split("/");
      const locale = segments[1];
      if (["uz", "ru"].includes(locale)) {
        setLanguage(locale);
        if (i18n) {
          i18n.changeLanguage(locale);
        }
      }
    }
  }, [pathname, i18n]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node))
        setLangOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const changeLanguage = (newLanguage: string) => {
    if (!i18n) return;

    setLanguage(newLanguage);
    setLangOpen(false);

    // Update i18n language
    i18n.changeLanguage(newLanguage);

    // Navigate to new locale
    const segments = pathname.split("/");
    const newPath = `/${newLanguage}${segments.slice(2).join("/")}`;
    router.push(newPath);
  };

  return (
    <header className={shrink ? "shrink" : ""}>
      <div className="logo">
        <Image
          src="/icons/lifecar.webp"
          alt="Lifecar Logo"
          width={50}
          height={50}
        />
        <Link className="logoName" href="/">
          Lifecar
        </Link>
      </div>
      <nav>
        <Link href="/" prefetch={true}>
          Home
        </Link>
        <Link href="/services" prefetch={true}>
          Services
        </Link>
        <Link href="/shop" prefetch={true}>
          Shop
        </Link>
        <Link href="/about" prefetch={true}>
          About Us
        </Link>
        <Link href="/contact" prefetch={true}>
          Contact
        </Link>
      </nav>
      <div className="actions">
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
    </header>
  );
};
export default Header;

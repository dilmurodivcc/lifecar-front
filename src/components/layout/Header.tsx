"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { HiSun, HiMoon, HiChevronDown } from "react-icons/hi";
import { GrSystem } from "react-icons/gr";

const themes = [
  { label: "Light", value: "light", icon: HiSun },
  { label: "Dark", value: "dark", icon: HiMoon },
  { label: "System", value: "system", icon: GrSystem },
];
const languages = [
  { label: "English", value: "en", img: "/icons/en.jpg" },
  { label: "O'zbek", value: "uz", img: "/icons/uz.avif" },
  { label: "Русский", value: "ru", img: "/icons/ru.png" },
];

const Header = () => {
  const getSystemTheme = () => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "dark";
  };

  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const systemThemeMedia =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;

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
    if (typeof window === "undefined") return;
    if (theme !== "system") return;
    const handler = (e: MediaQueryListEvent) => {
      document.documentElement.setAttribute(
        "data-theme",
        e.matches ? "dark" : "light"
      );
    };
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", handler);
    document.documentElement.setAttribute(
      "data-theme",
      mq.matches ? "dark" : "light"
    );
    return () => {
      mq.removeEventListener("change", handler);
    };
  }, [theme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language");
      if (savedLang) setLanguage(savedLang);
    }
  }, []);

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

  return (
    <header className={shrink ? "shrink" : ""}>
      <div className="logo">
        <img src="/icons/lifecar.webp" alt="" />
        <Link className="logoName" href="/">
          Lifecar
        </Link>
      </div>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/">Services</Link>
        <Link href="/">Shop</Link>
        <Link href="/">About Us</Link>
        <Link href="/">Contact</Link>
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
                onClick={() => {
                  setLanguage(l.value);
                  setLangOpen(false);
                }}
              >
                <img src={l.img} alt="" className="lang-img" />
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

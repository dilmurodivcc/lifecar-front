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
  { label: "English", value: "en" },
  { label: "O'zbek", value: "uz" },
  { label: "Русский", value: "ru" },
];

const Header = () => {
  const getSystemTheme = () => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  };

  const [theme, setTheme] = useState("light");
  const [themeOpen, setThemeOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [langOpen, setLangOpen] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const systemThemeMedia =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;

  // Set theme to DOM
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "system") {
        const sysTheme = getSystemTheme();
        document.documentElement.setAttribute("data-theme", sysTheme);
      } else {
        document.documentElement.setAttribute("data-theme", theme);
      }
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
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
    // Set initial
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
      if (themeRef.current && !themeRef.current.contains(e.target as Node))
        setThemeOpen(false);
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
                {l.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="dropdown" ref={themeRef} data-open={themeOpen}>
          <button className="theme" onClick={() => setThemeOpen((v) => !v)}>
            {(() => {
              const Icon = themes.find((t) => t.value === theme)?.icon;
              return Icon ? <Icon /> : null;
            })()}
            <HiChevronDown />
          </button>
          <ul className="dropdown-menu">
            {themes.map((t) => (
              <li
                key={t.value}
                onClick={() => {
                  setTheme(t.value);
                  setThemeOpen(false);
                }}
              >
                <t.icon /> {t.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};
export default Header;

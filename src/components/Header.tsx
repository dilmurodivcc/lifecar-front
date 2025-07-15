"use client"

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { HiSun, HiMoon, HiChevronDown } from "react-icons/hi";

const themes = [
  { label: "Light", value: "light", icon: <HiSun /> },
  { label: "Dark", value: "dark", icon: <HiMoon /> },
];
const languages = [
  { label: "English", value: "en" },
  { label: "O'zbek", value: "uz" },
  { label: "Русский", value: "ru" },
];

const Header = () => {
  const [theme, setTheme] = useState("light");
  const [themeOpen, setThemeOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [langOpen, setLangOpen] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) setTheme(savedTheme);
      const savedLang = localStorage.getItem("language");
      if (savedLang) setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
    }
  }, [language]);

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

  return (
    <header>
      
      <div className="logo">
        <Link href="/">Lifecar</Link>
      </div>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/">Services</Link>
        <Link href="/">Shop</Link>
        <Link href="/">About Us</Link>
        <Link href="/">Contact</Link>
      </nav>
      <div className="actions">
        <div className="dropdown" ref={themeRef}>
          <button className="theme" onClick={() => setThemeOpen((v) => !v)}>
            {themes.find((t) => t.value === theme)?.icon}
            <HiChevronDown />
          </button>
          {themeOpen && (
            <ul className="dropdown-menu">
              {themes.map((t) => (
                <li
                  key={t.value}
                  onClick={() => {
                    setTheme(t.value);
                    setThemeOpen(false);
                  }}
                >
                  {t.icon} {t.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="dropdown" ref={langRef}>
          <button className="language" onClick={() => setLangOpen((v) => !v)}>
            {languages.find((l) => l.value === language)?.label}
            <HiChevronDown />
          </button>
          {langOpen && (
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
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;

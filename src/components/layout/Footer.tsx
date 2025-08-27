"use client";

import React, { useState, useEffect } from "react";
import {
  FaXTwitter,
  FaGithub,
  FaRedditAlien,
  FaYoutube,
} from "react-icons/fa6";
import { IoMdArrowRoundUp } from "react-icons/io";

const Footer = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Get current theme
    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark") || "dark";
    setTheme(savedTheme);

    // Listen for localStorage theme change
    const handleStorageChange = () => {
      const currentTheme =
        (localStorage.getItem("theme") as "light" | "dark") || "dark";
      setTheme(currentTheme);
    };
    window.addEventListener("storage", handleStorageChange);

    // Listen for attribute changes on <html data-theme="">
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
  }, []);

  // ✅ Google Maps embed URLs
  const lightMapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.123456789!2d69.240073!3d41.299495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b123456789%3A0xabcdef123456789!2sLifecar%20Service!5e0!3m2!1suz!2s!4v1710000000000!5m2!1suz!2s";

  const darkMapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.123456789!2d69.240073!3d41.299495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b123456789%3A0xabcdef123456789!2sLifecar%20Service!5e0!3m2!1suz!2s!4v1710000000000!5m2!1suz!2s";

  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Social links */}
        <div className="footer-contact">
          <div className="footer-col-title">Social links</div>
          <div className="footer-social">
            <a href="#" aria-label="X">
              <FaXTwitter />
            </a>
            <a href="#" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="#" aria-label="Reddit">
              <FaRedditAlien />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links-grid">
          <div className="footer-col">
            <div className="footer-col-title">Pages</div>
            <a href="#">Home</a>
            <a href="#">Contact</a>
            <a href="#">Services</a>
            <a href="#">Shop</a>
            <a href="#">About Us</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Shop</div>
            <a href="#">All products</a>
            <a href="#">Steering wheels</a>
            <a href="#">Radar detectors</a>
            <a href="#">Tanirofka</a>
            <a href="#">Car accessories</a>
          </div>
        </div>

        {/* Map */}
        <div className="footer-map">
          <div className="footer-col-title">Bizning manzil</div>
          <iframe
            src={theme === "dark" ? darkMapUrl : lightMapUrl}
            width="400"
            height="250"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bizning manzil"
          ></iframe>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="footer-copyright">
          © {new Date().getFullYear()} Made by Lifecar
        </div>
        <div
          className="footer-backToTop"
          style={{ cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back To Top <IoMdArrowRoundUp />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

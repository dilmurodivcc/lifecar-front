"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  FaPhone,
  FaTelegram,
  FaInstagram,
  FaYoutube,
  FaYandex,
  FaGoogle,
} from "react-icons/fa";

const ContactSec = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { t } = useTranslation();

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const openYandexMaps = () => {
    window.open("https://yandex.com/maps/?text=Lifecar Auto Tuning", "_blank");
  };

  const openGoogleMaps = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=Lifecar Auto Tuning",
      "_blank"
    );
  };

  // Show loading state during hydration to prevent mismatch
  if (!isHydrated) {
    return (
      <section className="contactSec">
        <div className="container">
          <aside className="left">
            <h2>Loading...</h2>
            <ul className="working-hours">
              {Array.from({ length: 7 }).map((_, index) => (
                <li key={index}>
                  <b>Loading...</b>
                  <p>Loading...</p>
                </li>
              ))}
            </ul>
            <h2>Loading...</h2>
            <ul className="contact-info">
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index}>
                  <b>Loading...</b>
                  <a href="#">Loading...</a>
                </li>
              ))}
            </ul>
            <h2>Loading...</h2>
            <ul className="social-links">
              {Array.from({ length: 4 }).map((_, index) => (
                <li key={index}>
                  <a href="#" className="loading-link">
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        background: "#ccc",
                      }}
                    ></div>
                  </a>
                </li>
              ))}
            </ul>
            <div className="map-buttons">
              <button className="map-button yandex-map-button" disabled>
                <FaYandex />
                Loading...
              </button>
              <button className="map-button google-map-button" disabled>
                <FaGoogle />
                Loading...
              </button>
            </div>
          </aside>
          <div
            style={{ width: "650px", height: "650px", background: "#f0f0f0" }}
          ></div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="contactSec">
        <div className="container">
          <aside className="left">
            <h2>{t("contact.ourWorkingHours")}</h2>
            <ul className="working-hours">
              <li>
                <b>{t("contact.weeks.monday")}:</b>{" "}
                <p>
                  09:00 <span>-</span> 20:00
                </p>
              </li>
              <li>
                <b>{t("contact.weeks.tuesday")}:</b>{" "}
                <p>
                  09:00 <span>-</span> 20:00
                </p>
              </li>
              <li>
                <b>{t("contact.weeks.wednesday")}:</b>{" "}
                <p>
                  09:00 <span>-</span> 20:00
                </p>
              </li>
              <li>
                <b>{t("contact.weeks.thursday")}:</b>{" "}
                <p>
                  09:00 <span>-</span> 20:00
                </p>
              </li>
              <li>
                <b>{t("contact.weeks.friday")}:</b>{" "}
                <p>
                  09:00 <span>-</span> 20:00
                </p>
              </li>
              <li>
                <b>{t("contact.weeks.saturday")}:</b>{" "}
                <p>
                  09:00 <span>-</span> 20:00
                </p>
              </li>
              <li>
                <b>{t("contact.weeks.sunday")}:</b>{" "}
                <span>{t("contact.weeks.closed")}</span>
              </li>
            </ul>
            <h2>{t("contact.ourContacts")}</h2>
            <ul className="contact-info">
              <li>
                <b>
                  {" "}
                  <FaPhone></FaPhone> {t("contact.telephone")}:
                </b>{" "}
                <a href="tel:+998 33 785 22 22">+998 33 785 22 22</a>
              </li>
              <li>
                <b>
                  {" "}
                  <FaPhone></FaPhone> {t("contact.telephone")}:
                </b>{" "}
                <a href="tel:+998 99 814 65 65">+998 99 814 65 65</a>
              </li>
              <li>
                <b>
                  {" "}
                  <FaTelegram></FaTelegram> {t("contact.telegram")}:
                </b>{" "}
                <a href="https://t.me/lifecar_uz">@lifecar_uz</a>
              </li>
            </ul>
            <h2>{t("contact.ourSocial")}</h2>
            <ul className="social-links">
              <li>
                <a
                  className="telegram-map-button"
                  href="https://t.me/lifecar_uz"
                >
                  <FaTelegram></FaTelegram>
                </a>
              </li>
              <li>
                <a
                  className="instagram-map-button"
                  href="https://instagram.com/lifecar_uz"
                >
                  <FaInstagram></FaInstagram>
                </a>
              </li>
              <li>
                <a
                  className="youtube-map-button"
                  href="https://youtube.com/@lifecar_uz"
                >
                  <FaYoutube></FaYoutube>
                </a>
              </li>
              <li>
                <a
                  className="yandex-map-button"
                  href="https://youtube.com/@lifecar_uz"
                >
                  <FaYandex></FaYandex>
                </a>
              </li>
            </ul>
            <div className="map-buttons">
              <button
                onClick={openYandexMaps}
                className="map-button yandex-map-button"
              >
                <FaYandex />
                {t("contact.yandexButton")}
              </button>
              <button
                onClick={openGoogleMaps}
                className="map-button google-map-button"
              >
                <FaGoogle />
                {t("contact.googleButton")}
              </button>
            </div>
          </aside>
          <Image
            className="img"
            src="/img/logoWithPointer.png"
            alt="Map with pointer"
            width={650}
            height={650}
          />
        </div>
      </section>
    </>
  );
};

export default ContactSec;

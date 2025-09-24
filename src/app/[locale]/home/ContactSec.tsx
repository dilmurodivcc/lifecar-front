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
  FaTiktok,
} from "react-icons/fa";

const ContactSec = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { t } = useTranslation();

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

  if (!isHydrated) {
    return (
      <section className="contactSec">
        <div className="container">
          <aside className="left">
            <h2>{t("common.loading")}</h2>
            <ul className="working-hours">
              {Array.from({ length: 7 }).map((_, index) => (
                <li key={index}>
                  <b>{t("common.loading")}</b>
                  <p>{t("common.loading")}</p>
                </li>
              ))}
            </ul>
            <h2>{t("common.loading")}</h2>
            <ul className="contact-info">
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index}>
                  <b>{t("common.loading")}</b>
                  <a href="#">{t("common.loading")}</a>
                </li>
              ))}
            </ul>
            <h2>{t("common.loading")}</h2>
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
                {t("common.loading")}
              </button>
              <button className="map-button google-map-button" disabled>
                <FaGoogle />
                {t("common.loading")}
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
                <b>{t("contact.weeks.mondayToSaturday")}:</b>{" "}
                <p>
                  09:00 <span>-</span> 20:00
                </p>
              </li>
              <li>
                <b>{t("contact.weeks.sundayOnly")}:</b>{" "}
                <span>{t("contact.weeks.closed")}</span>
              </li>
              <li>
                <b>{t("contact.weeks.publicHolidays")}:</b>{" "}
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
                <a href="https://t.me/TuningLifeCar">@TuningLifeCar</a>
              </li>
            </ul>
            <h2>{t("contact.ourSocial")}</h2>
            <ul className="social-links">
              <li>
                <a
                  className="telegram-map-button"
                  href="https://t.me/TuningLifeCar"
                >
                  <FaTelegram></FaTelegram>
                </a>
              </li>
              <li>
                <a
                  className="instagram-map-button"
                  href="https://instagram.com/life_car.uzb"
                >
                  <FaInstagram></FaInstagram>
                </a>
              </li>
              <li>
                <a
                  className="youtube-map-button"
                  href="https://youtube.com/@LIFECARUZB"
                >
                  <FaYoutube></FaYoutube>
                </a>
              </li>
              <li>
                <a
                  className="yandex-map-button"
                  href="https://yandex.uz/maps/-/CLqABUnb"
                >
                  <FaYandex></FaYandex>
                </a>
              </li>
              <li>
                <a
                  className="tiktok-map-button"
                  href="https://tiktok.com/@life_car.uzb"
                >
                  <FaTiktok></FaTiktok>
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

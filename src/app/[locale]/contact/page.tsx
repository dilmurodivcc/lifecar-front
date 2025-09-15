"use client";

import ClientLayout from "../../../components/layout/ClientLayout";
import YandexMap from "@/components/ui/YandexMap";
import {
  FaGoogle,
  FaInstagram,
  FaPhone,
  FaYandex,
  FaYoutube,
} from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function ContactPage({}: ContactPageProps) {
  const openYandexMaps = () => {
    window.open("https://yandex.com/maps/?text=Lifecar Auto Tuning", "_blank");
  };

  const openGoogleMaps = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=Lifecar Auto Tuning",
      "_blank"
    );
  };
  const { t } = useTranslation();

  return (
    <ClientLayout showHeader={true} showFooter={false} showSpace={true}>
      <main className="contact-page">
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
          </aside>
          <aside className="right">
            <h2>{t("contact.ourAddress")}</h2>
            <div className="map">
              <YandexMap theme={"light"} />
            </div>
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
        </div>
      </main>
    </ClientLayout>
  );
}

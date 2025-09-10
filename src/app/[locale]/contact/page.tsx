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

  return (
    <ClientLayout showHeader={true} showFooter={false}>
      <main className="contact-page">
        <div className="container">
          <aside className="left">
            <h2>Bizning Ish Vaqtimiz.</h2>
            <ul className="working-hours">
              <li>
                <b>Dushanba:</b>{" "}
                <p>
                  09:00 <span>-</span> 20:00
                </p>
              </li>
              <li>
                <b>Seshanba:</b>{" "}
                <p>
                  09:00 <span>-</span> 20:00
                </p>
              </li>
              <li>
                <b>Chorshanba:</b>{" "}
                <p>
                  09:00 <span>-</span> 20:00
                </p>
              </li>
              <li>
                <b>Payshanba:</b>{" "}
                <p>
                  09:00 <span>-</span> 20:00
                </p>
              </li>
              <li>
                <b>Juma:</b>{" "}
                <p>
                  09:00 <span>-</span> 20:00
                </p>
              </li>
              <li>
                <b>Shanba:</b>{" "}
                <p>
                  09:00 <span>-</span> 20:00
                </p>
              </li>
              <li>
                <b>Yakshanba:</b> <span>Dam olish</span>
              </li>
            </ul>
            <h2>Bizning Kontaktlarimiz.</h2>
            <ul className="contact-info">
              <li>
                <b>
                  {" "}
                  <FaPhone></FaPhone> Telefon:
                </b>{" "}
                <a href="tel:+998 33 785 22 22">+998 33 785 22 22</a>
              </li>
              <li>
                <b>
                  {" "}
                  <FaPhone></FaPhone> Telefon:
                </b>{" "}
                <a href="tel:+998 99 814 65 65">+998 99 814 65 65</a>
              </li>
              <li>
                <b>
                  {" "}
                  <FaTelegram></FaTelegram> Telegram:
                </b>{" "}
                <a href="https://t.me/lifecar_uz">@lifecar_uz</a>
              </li>
            </ul>
            <h2>Bizning Ijtimoiy Tarmoqlarimiz.</h2>
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
            <h2>Bizning Manzilimiz.</h2>
            <div className="map">
              <YandexMap theme={"light"} />
            </div>
            <div className="map-buttons">
              <button
                onClick={openYandexMaps}
                className="map-button yandex-map-button"
              >
                <FaYandex />
                Yandex Karta Mashrut
              </button>
              <button
                onClick={openGoogleMaps}
                className="map-button google-map-button"
              >
                <FaGoogle />
                Google Karta Mashrut
              </button>
            </div>
          </aside>
        </div>
      </main>
    </ClientLayout>
  );
}

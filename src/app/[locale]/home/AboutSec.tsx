"use client";
import React from "react";
import Image from "next/image";
import { FaTools, FaCar, FaCheckCircle, FaSmile } from "react-icons/fa";
import { Trans, useTranslation } from "react-i18next";

const AboutSec = () => {
  const { t } = useTranslation();

  return (
    <section className="about-sec">
      <div className="container">
        <div className="about-content">
          <div className="about-image">
            <Image
              src="/img/tint.webp"
              alt="Lifecar ustalar avtomobil tuning ishlayapti"
              width={600}
              height={400}
              className="about-img"
              priority={false}
            />
          </div>

          <div className="about-text">
            <h2 className="about-title">{t("aboutSection.title")}</h2>

            <p className="about-description">{t("aboutSection.description")}</p>

            <div className="about-features">
              <div className="feature-item">
                <FaTools className="feature-icon" />
                <span className="feature-text">
                  <Trans
                    i18nKey="aboutSection.features.experience.rich"
                    components={{ 0: <span className="highlight" /> }}
                  />
                </span>
              </div>

              <div className="feature-item">
                <FaCar className="feature-icon" />
                <span className="feature-text">
                  <Trans
                    i18nKey="aboutSection.features.company.rich"
                    components={{ 0: <span className="highlight" /> }}
                  />
                </span>
              </div>

              <div className="feature-item">
                <FaCheckCircle className="feature-icon" />
                <span className="feature-text">
                  {t("aboutSection.features.guarantee.text")}
                </span>
              </div>

              <div className="feature-item">
                <FaSmile className="feature-icon" />
                <span className="feature-text">
                  <Trans
                    i18nKey="aboutSection.features.clients.rich"
                    components={{ 0: <span className="highlight" /> }}
                  />
                </span>
              </div>
            </div>

            <p className="about-closing">{t("aboutSection.closing")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSec;

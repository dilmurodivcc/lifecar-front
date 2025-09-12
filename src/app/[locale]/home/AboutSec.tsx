"use client";
import React from "react";
import Image from "next/image";
import { useSafeTranslation } from "@/hooks/useSafeTranslation";
import { FaTools, FaCar, FaCheckCircle, FaSmile } from "react-icons/fa";

const AboutSec = () => {
  const { t } = useSafeTranslation();

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
            <h2 className="about-title">Biz haqimizda</h2>

            <p className="about-description">
              Bizning kompaniyamiz 20 yildan ortiq tajribaga ega ustalar bilan
              ishlaydi va avtomobil tuning xizmatlarida o'zining ishonchliligi
              bilan mashhur.
            </p>

            <div className="about-features">
              <div className="feature-item">
                <FaTools className="feature-icon" />
                <span className="feature-text">
                  <span className="highlight">20+ yil</span> tajriba – malakali
                  va tajribali masterlar jamoasi
                </span>
              </div>

              <div className="feature-item">
                <FaCar className="feature-icon" />
                <span className="feature-text">
                  <span className="highlight">10+ yil</span> kompaniya faoliyati
                  – ishonchli tuning servis
                </span>
              </div>

              <div className="feature-item">
                <FaCheckCircle className="feature-icon" />
                <span className="feature-text">
                  Har bir ishga <span className="highlight">kafolat</span> –
                  sifat va ishonch bizning ustuvorligimiz
                </span>
              </div>

              <div className="feature-item">
                <FaSmile className="feature-icon" />
                <span className="feature-text">
                  Kuniga <span className="highlight">10+ mamnun mijoz</span> –
                  mijozlarimiz bizga qayta-qayta murojaat qiladi
                </span>
              </div>
            </div>

            <p className="about-closing">
              Bizning maqsadimiz – sizning avtomobilingizni yanada mukammal
              qilish va yuqori sifat bilan xizmat ko'rsatishdir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSec;

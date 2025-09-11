"use client";
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { RiArrowDownDoubleLine } from "react-icons/ri";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

const Hero = () => {
  const { t } = useTranslation();
  const pathname = usePathname();

  const segments = pathname.split("/");
  const locale = segments[1] || "uz";

  return (
    <>
      <div className="hero-shadow">
        <section className="hero">
          <div className="content">
            <h1>{t("hero.title")}</h1>
            <p>{t("hero.subtitle")}</p>
            <div className="btns">
              <Link href={`/${locale}/services`} prefetch={true}>
                <button className="toServices">
                  <MdMiscellaneousServices /> {t("hero.cta")}
                </button>
              </Link>
              <Link href={`/${locale}/contact`} prefetch={true}>
                <button className="toContact">
                  <FaPhoneAlt /> {t("contact.title")}
                </button>
              </Link>
            </div>
          </div>

          <div className="hero-inset-shadow"></div>
          <div className="scroll-down-indicator">
            <RiArrowDownDoubleLine />
          </div>
        </section>
      </div>
    </>
  );
};

export default Hero;

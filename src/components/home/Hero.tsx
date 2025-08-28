"use client";
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { RiArrowDownDoubleLine } from "react-icons/ri";
import Link from "next/link";
const Hero = () => {
  return (
    <>
      <div className="hero-shadow">
        <section className="hero">
          <div className="content">
            <h1> Lifecar Auto Tuning</h1>
            <p>
              Chip tuning, audio sistemalar, detailing, tanirofka, gps, va
              boshqalar – barchasi bir joyda.
            </p>
            <div className="btns">
              <Link href="/services"  >
                <button className="toServices">
                  {" "}
                  <MdMiscellaneousServices /> Xizmatlarimiz
                </button>
              </Link>
              <Link href="/contact">
              
                <button className="toContact">
                  <FaPhoneAlt /> Biz bilan boglanish
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

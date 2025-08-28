"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { RiArrowDownDoubleLine } from "react-icons/ri";
const Hero = () => {
  const router = useRouter();
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
              <button
                onClick={() => {
                  router.push("/services");
                }}
                className="toServices"
              >
                {" "}
                <MdMiscellaneousServices /> Xizmatlarimiz
              </button>
              <button
                onClick={() => {
                  router.push("/contact");
                }}
                className="toContact"
              >
                <FaPhoneAlt /> Biz bilan boglanish
              </button>
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

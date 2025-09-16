"use client";

import Link from "next/link";
import { FaHome, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div
      className="not-found"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        color: "var(--text)",
        height: "100vh",
      }}
    >
      <div
        className="not-found-container"
        style={{
          textAlign: "center",
          maxWidth: "600px",
          padding: "60px 40px",
          background: "var(--glass-bg)",
          borderRadius: "20px",
          border: "1px solid var(--border-color)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div
          className="error-code"
          style={{
            fontSize: "8rem",
            fontWeight: "900",
            color: "var(--black)",
            lineHeight: "1",
            marginBottom: "20px",
            textShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          404
        </div>
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "16px",
            color: "var(--text)",
            fontWeight: "700",
          }}
        >
          Sahifa topilmadi
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "40px",
            color: "var(--text-secondary)",
            lineHeight: "1.6",
          }}
        >
          Kechirasiz, qidirilayotgan sahifa mavjud emas yoki o&apos;chirilgan
          bo&apos;lishi mumkin.
        </p>
        <div
          className="not-found-actions"
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            className="btn-primary"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "10px",
              fontSize: "1rem",
              fontWeight: "600",
              textDecoration: "none",
              transition: "all 0.3s ease",
              background: "var(--black)",
              color: "var(--white)",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg-sec)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 25px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--black)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <FaHome />
            Bosh sahifaga qaytish
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "10px",
              fontSize: "1rem",
              fontWeight: "600",
              textDecoration: "none",
              transition: "all 0.3s ease",
              background: "var(--glass-bg)",
              color: "var(--text)",
              border: "1px solid var(--border-color)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--glass-bg-hover)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--glass-bg)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <FaArrowLeft />
            Orqaga qaytish
          </button>
        </div>
      </div>
    </div>
  );
}

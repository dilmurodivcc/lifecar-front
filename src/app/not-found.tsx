"use client";

import Link from "next/link";
import { FaHome, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-container">
        <div className="error-code">404</div>
        <h1>Sahifa topilmadi</h1>
        <p>
          Kechirasiz, qidirilayotgan sahifa mavjud emas yoki o&apos;chirilgan
          bo&apos;lishi mumkin.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="btn-primary">
            <FaHome />
            Bosh sahifaga qaytish
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary"
          >
            <FaArrowLeft />
            Orqaga qaytish
          </button>
        </div>
      </div>
    </div>
  );
}

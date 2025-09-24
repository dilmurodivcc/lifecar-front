"use client";

import Link from "next/link";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import { useSafeTranslation } from "@/hooks/useSafeTranslation";

export default function NotFound() {
  const { t } = useSafeTranslation();
  return (
    <div className="not-found">
      <div className="not-found-container">
        <div className="error-code">404</div>
        <h1>{t("common.notFound")}</h1>
        <div className="not-found-actions">
          <Link href="/" className="primary-btn">
            <FaHome />
            {t("common.backToHome")}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="primary-btn back"
          >
            <FaArrowLeft />
            {t("common.back")}
          </button>
        </div>
      </div>
    </div>
  );
}

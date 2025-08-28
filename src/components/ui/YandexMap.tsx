"use client";

import React, { useEffect, useRef, useState } from "react";

interface YandexMapProps {
  theme: "light" | "dark";
  className?: string;
}

declare global {
  interface Window {
    ymaps: any;
  }
}

const YandexMap: React.FC<YandexMapProps> = ({ theme, className = "" }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadYandexMaps = () => {
      if (window.ymaps) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://api-maps.yandex.ru/2.1/?apikey=505bbdc0-1128-4609-b1d2-62df54e109ed&lang=ru_RU";
      script.async = true;
      script.onload = () => {
        window.ymaps.ready(() => setIsLoaded(true));
      };
      script.onerror = () => {
        setError("Yandex Maps yuklanmadi");
      };
      document.head.appendChild(script);
    };

    loadYandexMaps();
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    try {
      window.ymaps.ready(() => {
        const coordinates = [41.294102, 69.173356]; // Tashkent

        const mapInstance = new window.ymaps.Map(
          mapRef.current,
          {
            center: coordinates,
            zoom: 15,
            controls: ["zoomControl", "fullscreenControl"],
            type: "yandex#map", // faqat oddiy map
          },
          {
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true,
          }
        );

        const placemark = new window.ymaps.Placemark(
          coordinates,
          {
            balloonContent: "Lifecar Auto Tuning",
            hintContent: "Lifecar Auto Tuning",
          },
          {
            preset: "islands#redDotIcon",
            iconColor: "#ff0000",
          }
        );

        mapInstance.geoObjects.add(placemark);
        setMap(mapInstance);
      });
    } catch (err) {
      console.error("Yandex Maps xatolik:", err);
      setError("Xarita yaratishda xatolik");
    }
  }, [isLoaded, map]);

  if (error) {
    return (
      <div
        className={`w-full h-[250px] rounded-xl bg-gray-100 flex items-center justify-center ${className}`}
      >
        <div className="text-center">
          <p className="text-red-500 font-medium">❌ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      style={{ minHeight: "250px", width: "100%" }}
    >
      {/* Dark mode CSS overlay */}
      {theme === "dark" && (
        <div className="absolute inset-0 bg-black/40 pointer-events-none mix-blend-multiply" />
      )}
    </div>
  );
};

export default YandexMap;

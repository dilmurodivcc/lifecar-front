"use client";

import React, { useEffect, useRef, useState } from "react";

interface YandexMapProps {
  theme: "light" | "dark";
  className?: string;
}

declare global {
  interface Window {
    ymaps: {
      ready: (callback: () => void) => void;
      Map: new (
        element: HTMLElement,
        options: unknown,
        settings?: unknown
      ) => unknown;
      Placemark: new (
        coordinates: number[],
        properties: unknown,
        options?: unknown
      ) => unknown;
    };
  }
}

const YandexMap: React.FC<YandexMapProps> = ({ theme, className = "" }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<unknown>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string>("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ESC key handler for fullscreen exit
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
        document.body.style.overflow = "";
      }
    };

    if (isFullscreen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

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
        const coordinates = [41.294102, 69.173356];

        const mapInstance = new window.ymaps.Map(
          mapRef.current!,
          {
            center: coordinates,
            zoom: 15,
            controls: ["zoomControl", "fullscreenControl"],
            type: "yandex#map",
          },
          {
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true,
          }
        ) as {
          geoObjects: { add: (placemark: unknown) => void };
          events: {
            add: (type: string, callback: (event: unknown) => void) => void;
          };
        };

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

        // Fullscreen event handlers
        mapInstance.events.add("fullscreenenter", () => {
          setIsFullscreen(true);
          document.body.style.overflow = "hidden";
        });

        mapInstance.events.add("fullscreenexit", () => {
          setIsFullscreen(false);
          document.body.style.overflow = "";
        });

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
      className={`yandex-map-container ${className} ${
        isFullscreen ? "yandex-map-fullscreen" : ""
      }`}
      style={{
        minHeight: isFullscreen ? "100vh" : "250px",
        width: isFullscreen ? "100vw" : "100%",
        maxWidth: isFullscreen ? "100vw" : "100%",
        minWidth: isFullscreen ? "100vw" : "300px",
        borderRadius: isFullscreen ? "0" : "10px",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Dark mode CSS overlay */}
      {theme === "dark" && !isFullscreen && (
        <div className="absolute inset-0 bg-black/40 pointer-events-none mix-blend-multiply" />
      )}
    </div>
  );
};

export default YandexMap;

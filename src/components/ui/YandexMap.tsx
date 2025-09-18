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
  const [mounted, setMounted] = useState(false);

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
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const loadYandexMaps = () => {
      if (window.ymaps) {
        setIsLoaded(true);
        return;
      }

      const existingScript = document.querySelector(
        'script[src*="api-maps.yandex.ru"]'
      );
      if (existingScript) {
        existingScript.addEventListener("load", () => {
          if (window.ymaps) {
            window.ymaps.ready(() => setIsLoaded(true));
          }
        });
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://api-maps.yandex.ru/2.1/?apikey=505bbdc0-1128-4609-b1d2-62df54e109ed&lang=ru_RU";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        try {
          if (window.ymaps) {
            window.ymaps.ready(() => {
              setIsLoaded(true);
              setError("");
            });
          } else {
            setError("Yandex Maps API not available");
          }
        } catch {
          setError("Yandex Maps yuklanmadi");
        }
      };

      script.onerror = () => {
        setError("Yandex Maps yuklanmadi");
      };

      document.head.appendChild(script);
    };

    loadYandexMaps();
  }, [mounted]);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    const initializeMap = () => {
      try {
        if (!window.ymaps) {
          setError("Yandex Maps API not loaded");
          return;
        }

        window.ymaps.ready(() => {
          try {
            const coordinates = [41.294102, 69.173356];

            const mapInstance = new window.ymaps.Map(
              mapRef.current!,
              {
                center: coordinates,
                zoom: 15,
                controls: ["zoomControl", "fullscreenControl"],
                type: theme === "dark" ? "yandex#satellite" : "yandex#map",
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

            (mapInstance as any).geoObjects.add(placemark);

            (mapInstance as any).events.add("fullscreenenter", () => {
              setIsFullscreen(true);
              document.body.style.overflow = "hidden";
            });

            (mapInstance as any).events.add("fullscreenexit", () => {
              setIsFullscreen(false);
              document.body.style.overflow = "";
            });

            setMap(mapInstance);
            setError("");
          } catch {
            setError("Xarita yaratishda xatolik");
          }
        });
      } catch {
        setError("Yandex Maps xatolik");
      }
    };

    const timeoutId = setTimeout(initializeMap, 100);

    return () => clearTimeout(timeoutId);
  }, [isLoaded, map, theme]);

  useEffect(() => {
    if (map && typeof (map as any).setType === "function") {
      if (theme === "dark") {
        (map as any).setType("yandex#satellite");
      } else {
        (map as any).setType("yandex#map");
      }
    }
  }, [theme, map]);

  useEffect(() => {
    return () => {
      if (map && typeof map === "object" && "destroy" in map) {
        try {
          (map as { destroy: () => void }).destroy();
        } catch (err) {
          console.warn("Error destroying map:", err);
        }
      }
    };
  }, [map]);

  if (!mounted) {
    return (
      <div
        className={`w-full h-[250px] rounded-xl bg-gray-100 flex items-center justify-center ${className}`}
      >
        <div className="text-center">
          <p className="text-gray-500 font-medium">Loading map...</p>
        </div>
      </div>
    );
  }

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
      className={`relative yandex-map-container ${className} ${
        isFullscreen ? "yandex-map-fullscreen" : ""
      }`}
      style={{
        minHeight: isFullscreen ? "100vh" : "250px",
        width: isFullscreen ? "100vw" : "100%",
        maxWidth: isFullscreen ? "100vw" : "100%",
        borderRadius: isFullscreen ? "0" : "10px",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {theme === "dark" && !isFullscreen && (
        <div className="absolute inset-0 bg-black/30 pointer-events-none mix-blend-multiply" />
      )}
    </div>
  );
};

export default YandexMap;

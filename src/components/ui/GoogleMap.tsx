"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface GoogleMapProps {
  theme: "light" | "dark";
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ theme, className = "" }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey:
          process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE",
        version: "weekly",
        libraries: ["places"],
      });

      try {
        const google = await loader.load();

        if (mapRef.current && !map) {
          // Lifecar manzili (Tashkent, Uzbekistan)
          const position = { lat: 41.2995, lng: 69.2401 };

          const mapInstance = new google.maps.Map(mapRef.current, {
            center: position,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            // Theme-based styling
            styles: theme === "dark" ? darkMapStyle : lightMapStyle,
          });

          // Marker qo'shamiz
          new google.maps.Marker({
            position: position,
            map: mapInstance,
            title: "Lifecar Auto Tuning",
            icon: {
              url: "/icons/lifecar.webp",
              scaledSize: new google.maps.Size(40, 40),
            },
          });

          setMap(mapInstance);
        }
      } catch (error) {
        console.error("Google Maps yuklanishida xatolik:", error);
      }
    };

    initMap();
  }, [map, theme]);

  // Theme o'zgarganda map style ni yangilash
  useEffect(() => {
    if (map) {
      map.setOptions({
        styles: theme === "dark" ? darkMapStyle : lightMapStyle,
      });
    }
  }, [theme, map]);

  return (
    <div
      ref={mapRef}
      className={`w-full h-[250px] rounded-xl ${className}`}
      style={{ minHeight: "250px" }}
    />
  );
};

// Dark theme uchun map style
const darkMapStyle: google.maps.MapTypeStyle[] = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#242f3e" }],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#242f3e" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

// Light theme uchun map style (default)
const lightMapStyle: google.maps.MapTypeStyle[] = [];

export default GoogleMap;

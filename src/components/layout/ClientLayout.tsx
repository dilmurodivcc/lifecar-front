"use client";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { useEffect } from "react";

export default function ClientLayout({
  children,
  showHeader = true,
  showFooter = true,
  showSpace = true,
}: {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showSpace?: boolean;
}) {
  useEffect(() => {
    // Prevent zoom and pinch-to-zoom
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const preventDoubleClickZoom = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Add event listeners
    document.addEventListener("touchstart", preventZoom, { passive: false });
    document.addEventListener("touchmove", preventZoom, { passive: false });
    document.addEventListener("dblclick", preventDoubleClickZoom, {
      passive: false,
    });

    // Prevent context menu
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    // Cleanup
    return () => {
      document.removeEventListener("touchstart", preventZoom);
      document.removeEventListener("touchmove", preventZoom);
      document.removeEventListener("dblclick", preventDoubleClickZoom);
      document.removeEventListener("contextmenu", (e) => e.preventDefault());
    };
  }, []);

  return (
    <ThemeProvider>
      {showSpace && <div className="space" style={{ height: "110px" }}></div>}
      {showHeader && <Header />}
      {children}
      {showFooter && <Footer />}
    </ThemeProvider>
  );
}

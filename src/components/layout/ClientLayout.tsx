"use client";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

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
  return (
    <ThemeProvider>
      {showSpace && <div className="space" style={{ height: "110px" }}></div>}
      {showHeader && <Header />}
      {children}
      {showFooter && <Footer />}
    </ThemeProvider>
  );
}

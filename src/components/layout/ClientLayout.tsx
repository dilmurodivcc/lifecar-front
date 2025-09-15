"use client";
import Header from "./Header";
import Footer from "./Footer";

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
    <>
      {showSpace && <div className="space" style={{ height: "110px" }}></div>}
      {showHeader && <Header />}
      {children}
      {showFooter && <Footer />}
    </>
  );
}

import "./../scss/main.scss";
import { Exo_2, Nunito, Geist } from "next/font/google";

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata = {
  title: "Lifecar | Auto Tuning",
  description:  
    "Lifecar | Auto Tuning | Auto Parts | Auto Accessories | Auto Maintenance",
  keywords:
    "Lifecar, Auto Tuning, Auto Parts, Auto Accessories, Auto Maintenance",
  openGraph: {
    title: "Lifecar | Auto Tuning",
    description:
      "Lifecar | Auto Tuning | Auto Parts | Auto Accessories | Auto Maintenance",
    images: ["/icons/lifecar.webp"],
  },
  icons: {
    icon: "/icons/lifecar.ico",
  },
  alternates: {
    canonical: "https://lifecar.uz",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "kHld5O7aSSfDHveNMffBr_uIj38NVCC1FYxJSYCEf7w",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${exo2.variable} ${nunito.variable} ${geist.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

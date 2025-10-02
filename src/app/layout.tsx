// import "./../scss/main.scss";
// import { Exo_2, Nunito, Geist } from "next/font/google";
import type { Metadata } from "next";
// import I18nProvider from "../components/providers/I18nProvider";
// import QueryProvider from "../components/providers/QueryProvider";

// const exo2 = Exo_2({
//   subsets: ["latin", "cyrillic"],
//   variable: "--font-exo2",
//   display: "swap",
//   preload: true,
// });

// const nunito = Nunito({
//   subsets: ["latin", "cyrillic"],
//   variable: "--font-nunito",
//   display: "swap",
//   preload: true,
// });

// const geist = Geist({
//   subsets: ["latin"],
//   variable: "--font-geist",
//   display: "swap",
//   preload: true,
// });

function getLocale(): string {
  return "uz";
}

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: "Lifecar | Avto Tuning",
//     description: "Professional avto tuning services in Uzbekistan",
//   };
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getLocale();

  return (
    <html lang={locale}>
      <head>
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

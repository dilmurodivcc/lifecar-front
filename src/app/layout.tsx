import "../scss/main.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/public/lifecar.png" type="image/x-icon" />
        <title>Lifecar | Auto Tuning</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

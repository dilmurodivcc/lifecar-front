// import { notFound } from 'next/navigation';

const locales = ["uz", "ru"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Validate that the incoming `locale` parameter is valid
  // Note: In Next.js 15, params is now a Promise, so we need to handle it differently
  // For now, we'll skip the validation in the layout and handle it in the middleware

  return children;
}

import "./globals.scss";
import { Analytics } from "@vercel/analytics/react";
import { mulish } from "@/fonts/fonts";
import { availableLocales } from "@/utiltaire/i18n";
import { getDictionary } from "./dictionaries";

export async function generateMetadata({ params }) {
  const meta = await getDictionary(params.locale);
  return {
    title: meta.document.title,
    description: meta.document.description,
    icons: {
      icon: "/david-launay-icon.svg",
      shortcut: "/favicon.ico",
      android: "/android-chrome-icon-192x192.png",
      apple: "/apple-touch-icon-180x180.png",
    },
    openGraph: {
      title: meta.document.title,
      description: meta.document.description,
      url: `${process.env.HOST}`,
      type: "website",
      locale: params.locale,
      images: {
        url: `${process.env.HOST}/david-launay-reseau-sociaux.webp`,
      },
    },
    manifest: `/manifest.json`,
  };
}

export function generateStaticParams() {
  return availableLocales.map((locale) => ({
    locale,
  }));
}
export default async function RootLayout({ children, params }) {
  return (
    <html lang={params.locale}>
      <body className={mulish.variable}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

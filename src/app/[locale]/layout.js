import "./globals.scss";
import { Analytics } from "@vercel/analytics/react";
import { mulish } from "@/fonts/fonts";
import { availableLocales } from "@/utiltaire/i18n";
import { getDictionary } from "./dictionaries";

export async function generateMetadata({ params }) {
  const meta = await getDictionary(params.locale);
  const manifest = {
    short_name: meta.document.short_name,
    name: meta.document.name,
    description: meta.document.manifest_description,
    prefer_related_applications: false,
    lang: meta.document.lang,
    author: "David Launay",
    manifestVersion: 4,
    icons: [
      {
        src: "favicon.ico",
        rel: "shortcut icon",
        type: "image/x-icon",
        sizes: "32x32",
        alt: "favion curriculum vitae",
      },
      {
        src: "android-chrome-icon-192x192.png",
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        alt: "favion curriculum vitae",
      },
      {
        src: "android-chrome-icon-512x512.png",
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        alt: "favion curriculum vitae",
      },
      {
        src: "david-launay-icon.svg",
        rel: "icon",
        type: "image/svg+xml",
        sizes: "any",
        alt: "favion curriculum vitae",
      },
      {
        src: "/david-launay-reseau-sociaux.webp",
        type: "image/webp",
        sizes: "1200x628",
        alt: "David Launay|Entrepreneur|Mon cv pour les réseaux sociaux",
      },
    ],
    categories: [
      "business",
      "design",
      "developer",
      "developer tools",
      "development",
      "education",
      "graphics",
      "graphics & design",
      "network",
      "productivity",
    ],
    start_url: `${process.env.HOST}`,
    display: "standalone",
    theme_color: "#000000",
    background_color: "#ffffff",
  };

  const manifestContent = JSON.stringify(manifest, null, 2);
  const fs = require("fs");
  fs.writeFileSync("public/manifest.json", manifestContent);

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
    manifest: "/manifest.json",
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

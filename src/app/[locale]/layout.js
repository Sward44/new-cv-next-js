import "../../style/main.scss";
import { availableLocales } from "@/utiltaire/i18n";
import { getDictionary } from "./dictionaries";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const meta = await getDictionary(locale);

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
      locale: meta.document.lang,
      images: {
        url: `${process.env.HOST}/david-launay-reseau-sociaux.webp`,
      },
    },
    manifest: `/manifest.json?locale=${locale}`,
  };
}

export function generateStaticParams() {
  return availableLocales.map((locale) => ({
    locale,
  }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body style={{ fontFamily: "var(--font-mulish)" }}>{children}</body>
    </html>
  );
}

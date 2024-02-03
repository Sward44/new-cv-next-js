import Head from "next/head";

const faviconLinks = [
  {
    rel: "shortcut icon",
    type: "image/x-icon",
    sizes: "32x32",
    href: "/favicon.ico",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "192x192",
    href: "/android-chrome-icon-192x192.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "512x512",
    href: "/android-chrome-icon-512x512.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/apple-touch-icon-180x180.png",
  },
  {
    rel: "icon",
    type: "image/svg+xml",
    sizes: "any",
    href: "/david-launay-icon.svg",
  },
];

const Favicons = () => {
  return (
    <Head>
      {faviconLinks.map((favicon, index) => (
        <link key={index} {...favicon} />
      ))}
      <link rel="manifest" href="/manifest.json" />
    </Head>
  );
};

export default Favicons;

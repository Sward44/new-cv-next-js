import { NextResponse } from "next/server";
import { getLocaleUrlToRedirect } from "./utiltaire/i18n";

export function middleware(request) {
  const newLocaleUrl = getLocaleUrlToRedirect(request);

  if (newLocaleUrl) {
    return NextResponse.redirect(newLocaleUrl);
  }
}

export const config = {
  matcher:
    "/((?!_app.js|_next|favicon.ico|android-chrome-icon-192x192.png|android-chrome-icon-512x512.png|apple-touch-icon-180x180.png|david-launay-icon.svg|david-launay-reseau-sociaux.webp|favicon-16x16.png|favicon-32x32.png|manifest.json|sitemap.xml|img|api|manifest).*)",
};

// src/app/manifest/route.js
import { NextResponse } from "next/server";
import { connectMongoose } from "../../utiltaire/Mongoose";
import { LogModel } from "../../models/index";
import { getPreferredLocale } from "../../utiltaire/i18n";
import { getDictionary } from "../[locale]/dictionaries";

// Cache en mémoire pour les traductions
const translationCache = {};

export async function GET(req) {
  // Gérer les requêtes OPTIONS pour CORS
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    await connectMongoose();

    // Récupérer l'IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip || "unknown";
    console.log(`IP: ${ip}`);

    // Récupérer la locale
    const urlLocale = req.nextUrl.searchParams.get("locale");
    const pathnameLocale = req.nextUrl.pathname.split("/")[1]; // Ex: 'fr' dans '/fr/...'
    const locale =
      urlLocale && ["en", "fr", "pt"].includes(urlLocale)
        ? urlLocale
        : pathnameLocale && ["en", "fr", "pt"].includes(pathnameLocale)
        ? pathnameLocale
        : getPreferredLocale(req);

    // Vérifier les logs précédents pour cette IP
    const ipSearch = await LogModel.find({ ip })
      .sort({ createdAt: -1 })
      .limit(1) // Récupérer le dernier log seulement
      .exec();

    // Utiliser la locale du dernier log si disponible, sinon la locale déterminée
    const finalLocale =
      ipSearch.length > 0 && ipSearch[0].locale ? ipSearch[0].locale : locale;

    // Charger les traductions (avec cache)
    if (!translationCache[finalLocale]) {
      translationCache[finalLocale] = await getDictionary(finalLocale);
      console.log(`Traductions pour ${finalLocale} chargées dans le cache`);
    }
    const meta = translationCache[finalLocale];

    // Enregistrer le log
    const url = req.url;
    await new LogModel({ ip, locale: finalLocale, url }).save();

    // Construire le manifest
    const manifest = {
      start_url: "/",
      display: "standalone",
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
          set: "all",
        },
        {
          src: "android-chrome-icon-192x192.png",
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          alt: "favion curriculum vitae",
          set: "all",
        },
        {
          src: "android-chrome-icon-512x512.png",
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          alt: "favion curriculum vitae",
          set: "all",
        },
        {
          src: "david-launay-icon.svg",
          rel: "icon",
          type: "image/svg+xml",
          sizes: "any",
          alt: "favion curriculum vitae",
          set: "all",
        },
        {
          src: "/david-launay-reseau-sociaux.webp",
          type: "image/webp",
          sizes: "1200x628",
          alt: "David Launay|Entrepreneur|Mon cv pour les réseaux sociaux",
          set: "all",
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
      theme_color: "#000000",
      background_color: "#ffffff",
    };

    return new Response(JSON.stringify(manifest, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/manifest+json",
        "Cache-Control": "public, max-age=3600", // Cache pour 1 heure
      },
    });
  } catch (error) {
    console.error("Erreur dans la route manifest:", error);
    return NextResponse.json(
      { error: "Erreur de serveur" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

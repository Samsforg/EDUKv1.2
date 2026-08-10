import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin",
          "/prof",
          "/_next/",
          "/accueil-",
          "/maquettes-orphelines",
        ],
      },
    ],
    sitemap: "https://edukora.net/sitemap.xml",
    host: "https://edukora.net",
  };
}

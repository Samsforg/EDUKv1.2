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
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL || "https://edukora.net"}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_APP_URL || "https://edukora.net",
  };
}

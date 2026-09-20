import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/espace-admin",
          "/espace-prof",
          "/espace-parent",
          "/espace-eleve",
          "/admin",
          "/prof",
          "/_next/",
          "/accueil-",
          "/maquettes-orphelines",
          "/mon-abonnement",
          "/notifications",
          "/reglages-rappels",
          "/profil",
          "/planning",
          "/mes-classes",
          "/ma-bibliotheque",
          "/favoris",
          "/param-tres-de-confidentialit-edukora",
          "/bienvenue-enseignant",
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL || "https://edukora.net"}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_APP_URL || "https://edukora.net",
  };
}

import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://edukora.net";

const publicRoutes = [
  { url: "/", changeFrequency: "weekly" as const, priority: 1 },
  { url: "/blog", changeFrequency: "weekly" as const, priority: 0.9 },
  { url: "/fonctionnalites", changeFrequency: "monthly" as const, priority: 0.8 },
  { url: "/resultats", changeFrequency: "monthly" as const, priority: 0.8 },
  { url: "/tarifs", changeFrequency: "weekly" as const, priority: 0.9 },
  { url: "/plans-d-abonnement-edukora-1", changeFrequency: "weekly" as const, priority: 0.8 },
  { url: "/tuteur-ia-edukora", changeFrequency: "monthly" as const, priority: 0.7 },
  { url: "/simulateur-d-examen-bac-bepc", changeFrequency: "monthly" as const, priority: 0.7 },
  { url: "/inscription-1-2-edukora", changeFrequency: "monthly" as const, priority: 0.6 },
  { url: "/inscription-parent-edukora", changeFrequency: "monthly" as const, priority: 0.5 },
  { url: "/parrainage", changeFrequency: "monthly" as const, priority: 0.7 },
  { url: "/connexion-edukora", changeFrequency: "yearly" as const, priority: 0.3 },
  { url: "/mentions-l-gales", changeFrequency: "yearly" as const, priority: 0.2 },
  { url: "/conditions-g-n-rales-d-utilisation", changeFrequency: "yearly" as const, priority: 0.2 },
  { url: "/conditions-g-n-rales-de-vente-paiements", changeFrequency: "yearly" as const, priority: 0.2 },
  { url: "/politique-de-confidentialit", changeFrequency: "yearly" as const, priority: 0.2 },
  { url: "/pr-f-rences-de-cookies-et-donn-es", changeFrequency: "yearly" as const, priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = publicRoutes.map((r) => ({
    url: `${BASE_URL}${r.url}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const blogPosts = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...routes, ...blogPosts];
}

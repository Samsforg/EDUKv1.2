import type { MetadataRoute } from "next";
import { queryOne, query } from "@/lib/db";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://edukora.net";

interface PaperRow {
  category: string;
  series_code: string | null;
  subject_code: string;
  year: number;
}

interface LessonRow {
  id: number;
  title: string;
  updated_at: string | null;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/fonctionnalites`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/resultats`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/tarifs`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/simulateur-d-examen-bac-bepc`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tuteur-ia-edukora`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/annales`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/parrainage`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/mentions-l-gales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/conditions-g-n-rales-d-utilisation`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/conditions-g-n-rales-de-vente-paiements`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/politique-de-confidentialit`, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Blog posts (static source)
  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic entries from DB (papers + lessons)
  let dbEntries: MetadataRoute.Sitemap = [];
  try {
    const papers = await query<PaperRow>(
      `SELECT p.category, s.code AS series_code, sub.code AS subject_code, p.year
       FROM exam_papers p
       LEFT JOIN series s ON s.id = p.series_id
       JOIN subjects sub ON sub.id = p.subject_id
       WHERE p.status = 'approved'
       ORDER BY p.year DESC`
    );
    const paperEntries: MetadataRoute.Sitemap = papers.map((p) => ({
      url: `${BASE_URL}/annales/${p.category.toLowerCase()}/${slugify(p.series_code ?? "general")}/${slugify(p.subject_code)}-${p.year}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    const lessons = await query<LessonRow>(
      `SELECT id, title, updated_at FROM lessons WHERE is_premium = 0 ORDER BY id`
    );
    const lessonEntries: MetadataRoute.Sitemap = lessons.map((l) => ({
      url: `${BASE_URL}/fiches/${l.id}`,
      lastModified: l.updated_at ? new Date(l.updated_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    dbEntries = [...paperEntries, ...lessonEntries];
  } catch {
    // DB indisponible au build : on garde les routes statiques + blog
  }

  return [...staticEntries, ...blogEntries, ...dbEntries];
}

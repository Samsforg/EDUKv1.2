import type { Metadata } from "next";
import Link from "next/link";
import MarketingHeader from "@/components/MarketingHeader";
import MarketingFooter from "@/components/MarketingFooter";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Annales BAC & BEPC Côte d'Ivoire — Sujets corrigés par année",
  description:
    "Toutes les annales du BAC et BEPC de Côte d'Ivoire : sujets par série, matière et année avec correction détaillée et simulateur chronométré sur Edukora.",
  alternates: { canonical: "/annales" },
};

interface PaperRow {
  category: string;
  series_code: string | null;
  subject_name: string;
  subject_code: string;
  year: number;
  count: number;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function AnnalesIndexPage() {
  let papers: PaperRow[] = [];
  try {
    papers = await query<PaperRow>(
      `SELECT p.category, s.code AS series_code, sub.name AS subject_name, sub.code AS subject_code,
              p.year, COUNT(*) AS count
       FROM exam_papers p
       LEFT JOIN series s ON s.id = p.series_id
       JOIN subjects sub ON sub.id = p.subject_id
       WHERE p.status = 'approved'
       GROUP BY p.category, s.code, sub.name, sub.code, p.year
       ORDER BY p.year DESC, p.category, sub.name`
    );
  } catch {
    papers = [];
  }

  const byCategory: Record<string, PaperRow[]> = {};
  for (const p of papers) {
    (byCategory[p.category] ??= []).push(p);
  }

  return (
    <div className="bg-background text-on-background min-h-screen font-body">
      <MarketingHeader />
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-label-xs font-bold mb-4">
          <span className="material-symbols-outlined text-[16px]">history_edu</span>
          ANNALES OFFICIELLES
        </div>
        <h1 className="text-[32px] md:text-[44px] font-extrabold text-primary leading-tight mb-4">
          Annales BAC &amp; BEPC — Côte d&apos;Ivoire
        </h1>
        <p className="text-body-lg text-on-surface-variant mb-10 max-w-2xl">
          Entraîne-toi sur les vrais sujets des années passées, corrigés et notés sur 20,
          dans notre simulateur en conditions réelles. Gratuit pour commencer.
        </p>

        {papers.length === 0 ? (
          <p className="text-on-surface-variant">Les annales arrivent bientôt.</p>
        ) : (
          Object.entries(byCategory).map(([category, rows]) => (
            <section key={category} className="mb-10">
              <h2 className="text-[24px] md:text-[30px] font-extrabold text-primary mb-4">
                {category === "BAC" ? "Baccalauréat (BAC)" : "BEPC"}
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {rows.map((r) => {
                  const seriePart = r.series_code ? slugify(r.series_code) : "general";
                  const href = `/annales/${r.category.toLowerCase()}/${seriePart}/${slugify(r.subject_code)}-${r.year}`;
                  const label = `${r.subject_name} ${r.year}${r.series_code ? ` — Série ${r.series_code}` : ""}`;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className="bg-white/80 backdrop-blur-md border border-outline-variant rounded-2xl p-5 flex items-center gap-4 hover:border-primary transition-colors"
                    >
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">description</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-label-md font-bold text-on-surface truncate">{label}</p>
                        <p className="font-label-xs text-on-surface-variant">
                          {r.count} sujet{Number(r.count) > 1 ? "s" : ""} · corrigé inclus
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-primary shrink-0">chevron_right</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))
        )}

        <section className="bg-primary rounded-[28px] p-8 text-center text-white mt-12">
          <h2 className="text-[26px] md:text-[34px] font-extrabold mb-4">Réussis ton examen avec Edukora</h2>
          <p className="text-on-primary-container mb-6 max-w-xl mx-auto">
            Fiches certifiées MENAET, tuteur IA Kora 24h/24 et simulateur chronométré :
            tout ce qu&apos;il faut pour décrocher ton BAC ou ton BEPC.
          </p>
          <Link
            href="/inscription-1-2-edukora"
            className="inline-block bg-white text-primary font-bold px-8 py-4 rounded-2xl"
          >
            Créer mon compte gratuit
          </Link>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}

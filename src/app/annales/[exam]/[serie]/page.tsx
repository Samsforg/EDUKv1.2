import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarketingHeader from "@/components/MarketingHeader";
import MarketingFooter from "@/components/MarketingFooter";
import { queryOne, query } from "@/lib/db";

export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ exam: string; serie: string; subject: string }>;
}

// Page SEO par matière (sans année) : liste toutes les années disponibles.
async function resolveSubject(exam: string, serie: string, subjectSlug: string) {
  const category = exam.toUpperCase() === "BAC" ? "BAC" : exam.toUpperCase() === "BEPC" ? "BEPC" : null;
  if (!category) return null;
  const subject = await queryOne<{ id: number; name: string; code: string }>(
    "SELECT id, name, code FROM subjects WHERE LOWER(code) = ? LIMIT 1",
    subjectSlug
  );
  if (!subject) return null;
  const papers = await query<{ id: number; year: number; title: string }>(
    `SELECT p.id, p.year, p.title FROM exam_papers p
     WHERE p.category = ? AND p.subject_id = ? AND p.status = 'approved'
     ORDER BY p.year DESC`,
    category,
    subject.id
  );
  return { subject, papers, category };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { exam, serie, subject } = await params;
  const data = await resolveSubject(exam, serie, subject);
  if (!data) return { title: "Annales introuvables | Edukora" };
  const examLabel = data.category === "BAC" ? "BAC" : "BEPC";
  const title = `Annales ${examLabel} ${data.subject.name} — Tous les sujets par année | Edukora`;
  const description = `Toutes les annales de ${data.subject.name} au ${examLabel} en Côte d'Ivoire : sujets officiels ${data.papers.map((p) => p.year).join(", ")} avec corrections détaillées et simulateur chronométré gratuit sur Edukora.`;
  return {
    title,
    description,
    alternates: { canonical: `/annales/${exam}/${serie}/${subject}` },
    openGraph: { title, description },
  };
}

export default async function AnnalesSubjectPage({ params }: Params) {
  const { exam, serie, subject } = await params;
  const data = await resolveSubject(exam, serie, subject);
  if (!data) notFound();
  const { subject: subj, papers, category } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Annales ${category} ${subj.name}`,
    itemListElement: papers.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${subj.name} ${category} ${p.year}`,
      url: `https://edukora.net/simulateur/${p.id}`,
    })),
  };

  return (
    <div className="bg-background text-on-background min-h-screen font-body">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingHeader />
      <main className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        <nav className="text-label-sm text-on-surface-variant mb-3 flex gap-1.5 items-center">
          <Link href="/annales" className="hover:text-primary">Annales</Link>
          <span>/</span>
          <span className="text-primary">{category}</span>
          <span>/</span>
          <span className="text-primary">{subj.name}</span>
        </nav>
        <h1 className="text-[30px] md:text-[40px] font-extrabold text-primary leading-tight mb-4">
          Annales {category} {subj.name} — Côte d&apos;Ivoire
        </h1>
        <p className="text-body-lg text-on-surface-variant mb-8">
          Retrouvez tous les sujets officiels de {subj.name} au {category}, corrigés et notés sur 20.
          Choisissez une année pour vous entraîner en conditions réelles sur Edukora.
        </p>

        {papers.length === 0 ? (
          <p className="text-on-surface-variant">Aucun sujet disponible pour cette matière pour le moment.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {papers.map((p) => (
              <Link
                key={p.id}
                href={`/simulateur/${p.id}`}
                className="bg-white border border-outline-variant rounded-2xl p-5 flex items-center gap-4 hover:border-primary transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 font-extrabold">
                  {String(p.year).slice(2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-label-md font-bold text-on-surface">{subj.name} {category} {p.year}</p>
                  <p className="font-label-xs text-on-surface-variant">Sujet + correction · simulation chronométrée</p>
                </div>
                <span className="material-symbols-outlined text-primary shrink-0">play_circle</span>
              </Link>
            ))}
          </div>
        )}

        <section className="bg-primary rounded-[28px] p-8 text-center text-white">
          <h2 className="text-[24px] font-extrabold mb-3">Prépare ton {category} avec Kora IA</h2>
          <p className="text-on-primary-container text-sm mb-6 max-w-md mx-auto">
            Fiches de cours, quiz illimités et tuteur IA disponible 24h/24 pour répondre à toutes tes questions.
          </p>
          <Link href="/inscription-1-2-edukora" className="inline-block bg-white text-primary font-bold px-8 py-4 rounded-2xl">
            Commencer gratuitement
          </Link>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}

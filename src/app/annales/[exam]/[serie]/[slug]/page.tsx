import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarketingHeader from "@/components/MarketingHeader";
import MarketingFooter from "@/components/MarketingFooter";
import { queryOne, query } from "@/lib/db";

export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ exam: string; serie: string; slug: string }>;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function resolvePaper(exam: string, serie: string, slug: string) {
  const m = /^(.+)-(\d{4})$/.exec(slug);
  if (!m) return null;
  const [, subjectSlug, yearStr] = m;
  const year = Number(yearStr);
  const category = exam.toUpperCase() === "BAC" ? "BAC" : exam.toUpperCase() === "BEPC" ? "BEPC" : null;
  if (!category) return null;

  const paper = await queryOne<{
    id: number;
    title: string;
    duration_minutes: number;
    subject_name: string;
    series_code: string | null;
    year: number;
    question_count: number;
  }>(
    `SELECT p.id, p.title, p.duration_minutes, sub.name AS subject_name, s.code AS series_code, p.year,
            (SELECT COUNT(*) FROM questions q WHERE q.paper_id = p.id) AS question_count
     FROM exam_papers p
     JOIN subjects sub ON sub.id = p.subject_id
     LEFT JOIN series s ON s.id = p.series_id
     WHERE p.category = ? AND p.year = ? AND LOWER(sub.code) = ? AND p.status = 'approved'
     ORDER BY p.id LIMIT 1`,
    category,
    year,
    subjectSlug
  );
  return paper ?? null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { exam, serie, slug } = await params;
  const paper = await resolvePaper(exam, serie, slug);
  if (!paper) return { title: "Annales introuvables | Edukora" };
  const serieLabel = paper.series_code ? ` Série ${paper.series_code}` : "";
  const title = `Annales ${exam}${serieLabel} ${paper.subject_name} ${paper.year} — Sujet + Correction | Edukora`;
  const description = `Sujet officiel ${exam} ${paper.year} de ${paper.subject_name}${serieLabel} : ${paper.question_count} questions, correction détaillée et simulation chronométrée (${paper.duration_minutes} min) gratuite sur Edukora.`;
  return {
    title,
    description,
    alternates: { canonical: `/annales/${exam}/${serie}/${slug}` },
    openGraph: { title, description },
  };
}

export default async function AnnalesLandingPage({ params }: Params) {
  const { exam, serie, slug } = await params;
  const paper = await resolvePaper(exam, serie, slug);
  if (!paper) notFound();

  const serieLabel = paper.series_code ? ` Série ${paper.series_code}` : "";
  const related = await query<{ id: number; title: string; year: number; subject_name: string }>(
    `SELECT p.id, p.title, p.year, sub.name AS subject_name
     FROM exam_papers p JOIN subjects sub ON sub.id = p.subject_id
     WHERE p.category = (CASE WHEN UPPER(?) = 'BAC' THEN 'BAC' ELSE 'BEPC' END)
       AND p.status = 'approved' AND p.id != ?
     ORDER BY p.year DESC LIMIT 6`,
    exam,
    paper.id
  );

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Où trouver le sujet de ${paper.subject_name} au ${exam} ${paper.year}${serieLabel} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Le sujet officiel est disponible gratuitement sur Edukora avec la correction détaillée des ${paper.question_count} questions.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment réviser l'${exam} ${paper.subject_name} efficacement ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Entraîne-toi en conditions réelles avec le simulateur Edukora : ${paper.duration_minutes} minutes chronométrées, notation sur 20 et correction instantanée.`,
        },
      },
    ],
  };

  return (
    <div className="bg-background text-on-background min-h-screen font-body">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <MarketingHeader />
      <main className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        <p className="text-label-sm font-bold text-primary uppercase tracking-wider mb-2">
          Annales {exam}{serieLabel}
        </p>
        <h1 className="text-[30px] md:text-[42px] font-extrabold text-primary leading-tight mb-4">
          {paper.subject_name} — {exam} {paper.year}
          {serieLabel && <span className="block text-[22px] md:text-[28px] text-on-surface-variant mt-1">{serieLabel}</span>}
        </h1>
        <p className="text-body-lg text-on-surface-variant mb-8">
          Le sujet officiel de {paper.year} avec ses <strong>{paper.question_count} questions</strong>,
          corrigé et noté sur 20. Entraîne-toi en conditions réelles ({paper.duration_minutes} min)
          et découvre immédiatement tes points faibles grâce à la correction détaillée.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: "quiz", label: "Questions", value: String(paper.question_count) },
            { icon: "timer", label: "Durée", value: `${paper.duration_minutes} min` },
            { icon: "grade", label: "Notation", value: "/20" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-outline-variant rounded-2xl p-4 text-center">
              <span className="material-symbols-outlined text-primary">{s.icon}</span>
              <p className="font-title-md font-bold text-on-surface mt-1">{s.value}</p>
              <p className="text-xs text-on-surface-variant">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary rounded-3xl p-8 text-center text-white mb-12">
          <h2 className="text-[24px] font-extrabold mb-3">Passer ce sujet en conditions réelles</h2>
          <p className="text-on-primary-container mb-6 text-sm max-w-md mx-auto">
            Chrono lancé, aucune aide : comme le jour J. Correction instantanée à la fin.
          </p>
          <Link
            href={`/simulateur/${paper.id}`}
            className="inline-block bg-white text-primary font-extrabold px-10 py-4 rounded-2xl active:scale-95 transition-transform"
          >
            Commencer la simulation gratuite
          </Link>
          <p className="text-xs text-on-primary-container mt-3">Aucune carte bancaire requise.</p>
        </div>

        <section className="mb-10">
          <h2 className="text-[22px] font-extrabold text-primary mb-4">Comment est notée l&apos;épreuve ?</h2>
          <ul className="space-y-3 text-body-md text-on-surface-variant">
            <li className="flex gap-3"><span className="material-symbols-outlined text-tertiary">check_circle</span>Chaque question vaut 1 point, total ramené sur 20.</li>
            <li className="flex gap-3"><span className="material-symbols-outlined text-tertiary">check_circle</span>La barre d&apos;admissibilité indicative est à 10/20.</li>
            <li className="flex gap-3"><span className="material-symbols-outlined text-tertiary">check_circle</span>Après la remise, chaque erreur reçoit une explication pédagogique générée par notre tuteur IA Kora.</li>
          </ul>
        </section>

        {related.length > 0 && (
          <section>
            <h2 className="text-[22px] font-extrabold text-primary mb-4">Autres annales {exam}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {related.map((r) => (
                <Link key={r.id} href={`/annales/${exam.toLowerCase()}/${slugify(r.title)}/${r.id}`} className="bg-white border border-outline-variant rounded-xl p-4 hover:border-primary transition-colors">
                  <p className="font-label-md font-semibold text-on-surface truncate">{r.subject_name} {r.year}</p>
                  <p className="text-xs text-on-surface-variant">Voir le sujet →</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <MarketingFooter />
    </div>
  );
}

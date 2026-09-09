import type { Metadata } from "next";

const SUBJECT_MAP: Record<string, { name: string; desc: string }> = {
  "1": { name: "Mathématiques", desc: "Cours, exercices et quiz de mathématiques pour le BAC et BEPC en Côte d'Ivoire. Équations, fonctions, géométrie et probabilités." },
  "2": { name: "Physique-Chimie", desc: "Cours de physique-chimie interactifs : mécanique, électricité, chimie organique et inorganique pour les séries S et T." },
  "3": { name: "Français", desc: "Littérature française, grammaire, conjugaison et rédaction. Prépare ton BAC français avec des fiches complètes." },
  "4": { name: "SVT", desc: "Sciences de la Vie et de la Terre : biologie, géologie, écologie. Cours et quiz pour le BAC SVT." },
  "5": { name: "Histoire-Géographie", desc: "Histoire du monde, géographie physique et humaine. Révise l'Histoire-Géo pour le BAC et BEPC." },
  "6": { name: "Anglais", desc: "Anglais général et scientifique : grammaire, vocabulaire, compréhension et expression écrite et orale." },
  "7": { name: "Philosophie", desc: "Dissertation, analyse de textes et grands auteurs. Prépare tonoral de philo pour le BAC." },
  "8": { name: "Informatique", desc: "Programmation, algorithmique, bases de données et systèmes d'information. Informatique pour le BAC STI2D." },
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const sub = SUBJECT_MAP[id];
  const name = sub?.name ?? "Matière";
  const desc = sub?.desc ?? `Cours, exercices et quiz de ${name} pour le BAC et BEPC en Côte d'Ivoire.`;

  return {
    title: `${name} — Cours, Quiz et Exercices | Edukora`,
    description: desc,
    keywords: [name, "cours", "quiz", "exercices", "BAC", "BEPC", "Côte d'Ivoire", "Edukora", "révision"],
    openGraph: {
      title: `${name} — Cours et Quiz | Edukora`,
      description: desc,
      type: "website",
      siteName: "Edukora",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — Cours et Quiz | Edukora`,
      description: desc,
    },
  };
}

export default function MatiereLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Cours en ligne — Edukora",
            "description": "Plateforme de cours, quiz et exercices pour les élèves de Côte d'Ivoire.",
            "provider": {
              "@type": "Organization",
              "name": "Edukora",
              "url": "https://edukora.net",
            },
            "educationalLevel": "Lycée / Collège",
            "inLanguage": "fr",
            "country": "CI",
          }),
        }}
      />
    </>
  );
}

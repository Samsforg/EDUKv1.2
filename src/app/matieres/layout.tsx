import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toutes les matières — Cours, Quiz et Exercices | Edukora",
  description: "Découvre toutes les matières disponibles sur Edukora : Mathématiques, Physique-Chimie, Français, SVT, Histoire-Géo et plus. Cours, quiz et exercices pour le BAC et BEPC en Côte d'Ivoire.",
  keywords: ["matières", "cours en ligne", "quiz", "exercices", "BAC", "BEPC", "Côte d'Ivoire", "Edukora", "Mathématiques", "Physique-Chimie", "Français", "SVT"],
  openGraph: {
    title: "Toutes les matières — Cours et Quiz | Edukora",
    description: "Découvre toutes les matières disponibles sur Edukora : Mathématiques, Physique-Chimie, Français, SVT et plus.",
    type: "website",
    siteName: "Edukora",
  },
};

export default function MatieresLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Matières Edukora",
            "description": "Toutes les matières disponibles sur la plateforme Edukora",
            "numberOfItems": 8,
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Mathématiques" },
              { "@type": "ListItem", "position": 2, "name": "Physique-Chimie" },
              { "@type": "ListItem", "position": 3, "name": "Français" },
              { "@type": "ListItem", "position": 4, "name": "SVT" },
              { "@type": "ListItem", "position": 5, "name": "Histoire-Géographie" },
              { "@type": "ListItem", "position": 6, "name": "Anglais" },
              { "@type": "ListItem", "position": 7, "name": "Philosophie" },
              { "@type": "ListItem", "position": 8, "name": "Informatique" },
            ],
          }),
        }}
      />
    </>
  );
}

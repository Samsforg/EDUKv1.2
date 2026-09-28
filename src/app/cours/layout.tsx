import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cours BAC & BEPC par matière et classe | Edukora",
  description:
    "Cours complets du programme ivoirien par matière et par classe : Mathématiques, Physique-Chimie, Français, SVT, Comptabilité et plus, de la 6ème à la Terminale.",
  alternates: { canonical: "/cours" },
  openGraph: {
    title: "Cours BAC & BEPC par matière et classe | Edukora",
    description:
      "Cours complets du programme ivoirien par matière et par classe, de la 6ème à la Terminale.",
    type: "website",
    siteName: "Edukora",
  },
};

export default function CoursLayout({ children }: { children: React.ReactNode }) {
  return children;
}

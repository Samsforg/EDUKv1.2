import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiches de révision BAC & BEPC | Edukora",
  description:
    "Fiches de révision synthétiques pour le BAC et le BEPC en Côte d'Ivoire : définitions, points clés, exemples et exercices par matière et par classe.",
  alternates: { canonical: "/fiches" },
  openGraph: {
    title: "Fiches de révision BAC & BEPC | Edukora",
    description:
      "Fiches synthétiques par matière et par classe pour réviser efficacement le BAC et le BEPC.",
    type: "website",
    siteName: "Edukora",
  },
};

export default function FichesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz BAC & BEPC corrigés | Edukora",
  description:
    "Quiz corrigés pour le BAC et le BEPC en Côte d'Ivoire : teste tes connaissances par matière, reçois un corrigé détaillé et gagne de l'XP.",
  alternates: { canonical: "/quiz" },
  openGraph: {
    title: "Quiz BAC & BEPC corrigés | Edukora",
    description:
      "Teste tes connaissances par matière avec corrigés détaillés et gagne de l'XP.",
    type: "website",
    siteName: "Edukora",
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}

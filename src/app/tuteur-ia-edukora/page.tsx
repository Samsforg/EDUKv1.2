import TutorDemoPage from "@/components/TutorDemoPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tuteur IA Kora",
  description:
    "Kora, le tuteur IA d'Edukora : questions-réponses avec quota selon le plan (5 questions/mois gratuit, 30/mois Réussite, 100/trimestre Trimestriel), explications pas à pas et remédiation ciblée pour progresser au BAC et au BEPC.",
  alternates: { canonical: "/tuteur-ia-edukora" },
};

export default function Page() {
  return <TutorDemoPage />;
}

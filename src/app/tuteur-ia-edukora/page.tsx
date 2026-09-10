import TutorDemoPageWrapper from "@/components/TutorDemoPageWrapper";
import { SoftwareApplicationJsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tuteur IA Kora",
  description:
    "Kora, le tuteur IA d'Edukora : questions-réponses avec quota selon le plan (5 questions/mois gratuit, 30/mois Réussite, 100/trimestre Trimestriel), explications pas à pas et remédiation ciblée pour progresser au BAC et au BEPC.",
  alternates: { canonical: "/tuteur-ia-edukora" },
};

export default function Page() {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="Kora — Tuteur IA Edukora"
        description="Tuteur IA intelligent pour réviser le BAC et le BEPC en Côte d'Ivoire. Questions-réponses, explications pas à pas et remédiation ciblée."
        url="https://edukora.net/tuteur-ia-edukora"
        applicationCategory="EducationalApplication"
        operatingSystem="Web"
      />
      <TutorDemoPageWrapper />
    </>
  );
}
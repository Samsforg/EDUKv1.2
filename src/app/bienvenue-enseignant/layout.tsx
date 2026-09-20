import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bienvenue enseignant",
  description: "Espace d'onboarding pour les enseignants Edukora.",
  robots: { index: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

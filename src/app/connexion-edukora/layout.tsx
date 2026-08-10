import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",
  description:
    "Connecte-toi à ton espace Edukora pour continuer tes révisions : cours, quiz, simulateurs d'examen et suivi de progression.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
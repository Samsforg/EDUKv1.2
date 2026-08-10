import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
  description:
    "Réinitialise ton mot de passe Edukora et retrouve l'accès à tes cours, tes quiz et ton tuteur IA.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
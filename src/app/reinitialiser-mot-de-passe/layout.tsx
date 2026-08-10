import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réinitialiser le mot de passe",
  description:
    "Définis un nouveau mot de passe pour ton compte Edukora et retrouve l'accès à ton espace de révision.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
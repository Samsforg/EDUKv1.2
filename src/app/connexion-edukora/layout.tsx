import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",
  description:
    "Connectez-vous à votre compte Edukora pour retrouver vos fiches, votre progression et votre tuteur IA Kora.",
  alternates: { canonical: "/connexion-edukora" },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

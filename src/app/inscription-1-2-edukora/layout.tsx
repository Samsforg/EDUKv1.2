import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription gratuite",
  description:
    "Crée ton compte gratuit Edukora en 2 minutes et accède aux fiches certifiées, au tuteur IA Kora et aux simulateurs BAC & BEPC.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
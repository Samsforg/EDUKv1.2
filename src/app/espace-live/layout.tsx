import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace Live",
  description:
    "Cours en direct et sessions interactives Edukora : participez aux lives de révision avec le tuteur IA Kora.",
  robots: { index: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

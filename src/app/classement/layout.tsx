import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classement général",
  description:
    "Classement général des élèves Edukora : progressez dans les ligues académiques en complétant des quiz et des fiches de révision.",
  alternates: { canonical: "/classement" },
  openGraph: {
    title: "Classement général Edukora",
    description: "Progressez dans les ligues académiques en complétant des quiz et des fiches.",
    url: "https://edukora.net/classement",
    siteName: "Edukora",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

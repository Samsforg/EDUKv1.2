import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription Parents",
  description:
    "Espace parents Edukora : suivez les résultats et la progression de votre enfant, accédez aux bulletins et communiquez avec ses professeurs.",
  alternates: { canonical: "/inscription-parent-edukora" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

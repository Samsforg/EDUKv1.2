import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace parent",
  description:
    "Inscris-toi en tant que parent et suis les progrès de ton enfant sur Edukora : résultats, assiduité et temps de révision.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
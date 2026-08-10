import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription",
  description:
    "Créez votre compte Edukora gratuitement et commencez à réviser pour le BAC et le BEPC avec des fiches certifiées.",
  alternates: { canonical: "/inscription-1-2-edukora" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

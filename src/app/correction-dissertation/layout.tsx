import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Correction de dissertation",
  description:
    "Service de correction de dissertations par IA sur Edukora : receivez une analyse détaillée de votre copie avec des conseils personnalisés.",
  robots: { index: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forum d'entraide BAC & BEPC | Edukora",
  description:
    "Forum d'entraide des élèves ivoiriens : pose tes questions en maths, physique, français et plus, entraide-toi avec la communauté BAC et BEPC.",
  alternates: { canonical: "/forum" },
  openGraph: {
    title: "Forum d'entraide BAC & BEPC | Edukora",
    description:
      "Pose tes questions et entraide-toi avec la communauté des élèves ivoiriens.",
    type: "website",
    siteName: "Edukora",
  },
};

export default function ForumLayout({ children }: { children: React.ReactNode }) {
  return children;
}

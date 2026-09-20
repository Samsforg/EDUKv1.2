import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parrainage Edukora",
  description:
    "Invitez vos amis à rejoindre Edukora avec votre code de parrainage. Gagnez +150 XP par filleul inscrit et grimpez dans le classement Ambassadeurs.",
  alternates: { canonical: "/parrainage" },
  openGraph: {
    title: "Parrainage Edukora",
    description: "Invitez vos amis, gagnez +150 XP par filleul et grimpez dans le classement.",
    url: "https://edukora.net/parrainage",
    siteName: "Edukora",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

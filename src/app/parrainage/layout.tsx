import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parrainage",
  description:
    "Invite tes amis et camarades à rejoindre Edukora avec ton code personnel et grimpe dans le classement Ambassadeurs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
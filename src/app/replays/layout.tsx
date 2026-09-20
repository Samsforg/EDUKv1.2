import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Replays",
  description:
    "Replays des sessions live Edukora : visionnez les cours enregistrés et révisez à votre rythme.",
  robots: { index: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

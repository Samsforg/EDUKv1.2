import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Statistiques d'impact - Professeur" };

export default function Page() {
  redirect("/espace-prof/classes");
}
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Tableau de bord des quiz - Professeur" };

export default function Page() {
  redirect("/espace-prof/classes");
}
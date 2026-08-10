import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Edukora Admin - Validation des contenus" };

export default function Page() {
  redirect("/espace-admin/approbation");
}
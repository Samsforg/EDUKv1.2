import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Edukora - Mes classes" };

export default function Page() {
  redirect("/espace-prof/classes");
}
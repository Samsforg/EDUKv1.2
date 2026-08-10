import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdsManager } from "@/components/admin/AdsManager";

export const metadata: Metadata = { title: "Edukora Admin - Espace pub" };

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  return (
    <AdminShell active="ads">
      <section className="mb-6">
        <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">
          Espace publicitaire
        </h2>
        <p className="text-on-surface-variant font-body mt-1">
          Gérez les bannières publicitaires affichées sur la page d&apos;accueil publique du site.
          Seules les pubs activées sont affichées, triées par ordre.
        </p>
      </section>

      <AdsManager />
    </AdminShell>
  );
}
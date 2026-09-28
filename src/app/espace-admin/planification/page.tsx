import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import PlanificationTable from "./PlanificationTable";

export const dynamic = "force-dynamic";

export default async function PlanificationPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  return (
    <AdminShell active="content">
      <section className="mb-6">
        <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">
          Planification des chapitres par classe
        </h2>
        <p className="text-on-surface-variant font-body mt-1">
          Associez des chapitres à des classes d'enseignants avec une date de programmation et un statut.
          Cela permet aux enseignants de voir leur progression pédagogique planifiée.
        </p>
      </section>

      <PlanificationTable />
    </AdminShell>
  );
}
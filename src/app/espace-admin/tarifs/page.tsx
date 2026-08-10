import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getPremiumPlans } from "@/lib/plans";
import { AdminShell } from "@/components/admin/AdminShell";
import { TariffsManager } from "@/components/admin/TariffsManager";

export const metadata: Metadata = { title: "Edukora Admin - Tarifs" };

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  const plans = await getPremiumPlans();

  return (
    <AdminShell active="tarifs">
      <section className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">
            Gestion des tarifs
          </h2>
          <p className="text-on-surface-variant font-body mt-1">
            Modifiez les plans d'accès aux cours. Les changements sont reflétés sur la page{" "}
            <Link href="/tarifs" className="text-primary hover:underline">Tarifs</Link> du site et utilisés par le
            paiement à l&apos;inscription.
          </p>
        </div>
      </section>

      <TariffsManager initialPlans={plans} />
    </AdminShell>
  );
}

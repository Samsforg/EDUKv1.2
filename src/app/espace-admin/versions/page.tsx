import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import ContentVersionTable from "./ContentVersionTable";

export const dynamic = "force-dynamic";

export default async function ContentVersionsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  return (
    <AdminShell active="content">
      <section className="mb-6">
        <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">
          Historique des versions de contenu
        </h2>
        <p className="text-on-surface-variant font-body mt-1">
          Consultez l'historique des modifications apportées aux chapitres, leçons, quiz et sujets d'examen.
          Chaque version conserve un snapshot complet du contenu au moment de la modification.
        </p>
      </section>

      <ContentVersionTable />
    </AdminShell>
  );
}
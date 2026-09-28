import { getCurricula } from "@/lib/admin-content";
import { getGrades } from "@/lib/admin-content";
import { getSubjects } from "@/lib/admin-content";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import CurriculumTable from "./CurriculumTable";

export const dynamic = "force-dynamic";

export default async function CurriculumPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  const [curricula, grades, subjects] = await Promise.all([
    getCurricula(),
    getGrades(),
    getSubjects(),
  ]);

  const activeCount = curricula.filter((c) => c.status === "active").length;
  const draftCount = curricula.filter((c) => c.status === "draft").length;
  const archivedCount = curricula.filter((c) => c.status === "archived").length;

  return (
    <AdminShell active="content">
      <section className="mb-6">
        <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">
          Gestion des programmes officiels
        </h2>
        <p className="text-on-surface-variant font-body mt-1">
          Définissez les programmes officiels par niveau × matière. Chaque curriculum relie une classe (grade)
          à une matière avec sa référence officielle et son année.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <div className="text-on-surface-variant font-label-md">Total</div>
          <div className="font-display text-3xl font-bold text-on-surface mt-1">{curricula.length}</div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <div className="text-on-surface-variant font-label-md">Actifs</div>
          <div className="font-display text-3xl font-bold text-tertiary mt-1">{activeCount}</div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <div className="text-on-surface-variant font-label-md">Brouillons</div>
          <div className="font-display text-3xl font-bold text-warning mt-1">{draftCount}</div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <div className="text-on-surface-variant font-label-md">Archivés</div>
          <div className="font-display text-3xl font-bold text-outline mt-1">{archivedCount}</div>
        </div>
      </section>

      <CurriculumTable curricula={curricula} grades={grades} subjects={subjects} />
    </AdminShell>
  );
}
import { getSubjectGrades } from "@/lib/admin-content";
import { getGrades } from "@/lib/admin-content";
import { getSubjects } from "@/lib/admin-content";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import CoefficientsTable from "./CoefficientsTable";

export const dynamic = "force-dynamic";

export default async function CoefficientsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  const [subjectGrades, grades, subjects] = await Promise.all([
    getSubjectGrades(),
    getGrades(),
    getSubjects(),
  ]);

  return (
    <AdminShell active="content">
      <section className="mb-6">
        <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">
          Coefficients par matière et niveau
        </h2>
        <p className="text-on-surface-variant font-body mt-1">
          Gérez les coefficients officiels par matière × niveau. Ces coefficients remplacent l'ancien champ
          <code>coefficient_json</code> et sont utilisés pour le calcul des moyennes et classements.
        </p>
      </section>

      <CoefficientsTable subjectGrades={subjectGrades} grades={grades} subjects={subjects} />
    </AdminShell>
  );
}
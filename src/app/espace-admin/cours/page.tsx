import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getContentOverview, getPendingCourses } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import Link from "next/link";

export const metadata: Metadata = { title: "Edukora Admin - Contenu pédagogique" };

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  const { subjects, totals } = getContentOverview();
  const pending = getPendingCourses();

  const kpis = [
    { icon: "menu_book", label: "Leçons", value: totals.lessons },
    { icon: "folder_copy", label: "Chapitres", value: totals.chapters },
    { icon: "quiz", label: "Quiz", value: totals.quizzes },
    { icon: "description", label: "Sujets d'examen", value: totals.papers },
    { icon: "help", label: "Questions", value: totals.questions },
  ];

  return (
    <AdminShell active="content">
      <section className="mb-6">
        <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">Contenu pédagogique</h2>
        <p className="text-on-surface-variant font-body mt-1">Inventaire des ressources disponibles sur la plateforme.</p>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl flex flex-col items-center text-center">
            <span className="p-2 bg-primary-container text-on-primary-container rounded-lg material-symbols-outlined mb-2">{k.icon}</span>
            <h3 className="text-headline-md font-bold text-primary">{k.value}</h3>
            <p className="text-on-surface-variant text-label-sm font-medium">{k.label}</p>
          </div>
        ))}
      </section>

      {pending.length > 0 && (
        <Link
          href="/espace-admin/approbation"
          className="mb-6 flex items-center justify-between gap-4 bg-secondary-container/40 border border-secondary-container rounded-xl p-4 hover:bg-secondary-container/60 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary">approval</span>
            <div>
              <p className="font-semibold text-on-surface">
                {pending.length} contenu{pending.length > 1 ? "s" : ""} en attente d&apos;approbation
              </p>
              <p className="text-xs text-on-surface-variant">Créé{pending.length > 1 ? "s" : ""} par des professeurs — invisible pour les élèves tant que non validé.</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
        </Link>
      )}

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-high/60 text-label-xs uppercase tracking-wider text-on-surface-variant">
              <tr>
                <th className="px-6 py-3">Matière</th>
                <th className="px-6 py-3">Chapitres</th>
                <th className="px-6 py-3">Leçons</th>
                <th className="px-6 py-3">Quiz</th>
                <th className="px-6 py-3">Sujets BAC/BEPC</th>
                <th className="px-6 py-3">Questions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {subjects.map((s) => (
                <tr key={s.subject_id} className="hover:bg-surface-container transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center material-symbols-outlined text-base" style={{ backgroundColor: `${s.color}18`, color: s.color }}>
                        {s.icon}
                      </span>
                      <span className="font-semibold text-on-surface">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{s.chapters}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{s.lessons}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{s.quizzes}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{s.papers}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{s.questions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}

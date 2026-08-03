import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getPendingCourses } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { ApproveButton } from "@/components/admin/ApproveButton";

export const metadata: Metadata = { title: "Edukora Admin - Approbation des cours" };

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  const pending = getPendingCourses();
  const quizzes = pending.filter((p) => p.kind === "quiz");
  const papers = pending.filter((p) => p.kind === "paper");

  return (
    <AdminShell active="approval">
      <section className="mb-6">
        <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">Approbation des cours</h2>
        <p className="text-on-surface-variant font-body mt-1">
          {pending.length} contenu{pending.length > 1 ? "s" : ""} créé{pending.length > 1 ? "s" : ""} par des professeurs en attente de validation.
          Tant qu&apos;un contenu n&apos;est pas approuvé, il est invisible pour les élèves.
        </p>
      </section>

      {pending.length === 0 && (
        <div className="bg-surface-container-lowest border border-outline-variant p-10 rounded-xl text-center">
          <span className="material-symbols-outlined text-5xl text-tertiary mb-3">task_alt</span>
          <h3 className="font-headline text-headline-md font-bold text-on-surface">Aucun contenu en attente</h3>
          <p className="text-sm text-on-surface-variant mt-1">Tous les contenus des professeurs ont été traités.</p>
        </div>
      )}

      {quizzes.length > 0 && (
        <section className="mb-6">
          <h3 className="font-headline text-headline-md font-semibold text-on-surface mb-3">
            Quiz en attente ({quizzes.length})
          </h3>
          <div className="space-y-3">
            {quizzes.map((q) => (
              <div key={`quiz-${q.id}`} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-10 h-10 rounded-lg flex items-center justify-center material-symbols-outlined shrink-0" style={{ backgroundColor: `${q.subject_color}18`, color: q.subject_color }}>
                      {q.subject_icon}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-on-surface truncate">{q.title}</p>
                      <p className="text-xs text-on-surface-variant">
                        {q.subject_name} • par {q.creator} • {q.relative}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">help</span>
                      {q.question_count} question{q.question_count > 1 ? "s" : ""}
                    </span>
                    <ApproveButton kind="quiz" id={q.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {papers.length > 0 && (
        <section>
          <h3 className="font-headline text-headline-md font-semibold text-on-surface mb-3">
            Sujets d&apos;examen en attente ({papers.length})
          </h3>
          <div className="space-y-3">
            {papers.map((p) => (
              <div key={`paper-${p.id}`} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-10 h-10 rounded-lg flex items-center justify-center material-symbols-outlined shrink-0" style={{ backgroundColor: `${p.subject_color}18`, color: p.subject_color }}>
                      {p.subject_icon}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-on-surface truncate">{p.title}</p>
                      <p className="text-xs text-on-surface-variant">
                        {p.category} {p.year} • {p.subject_name} • par {p.creator} • {p.relative}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">help</span>
                      {p.question_count} question{p.question_count > 1 ? "s" : ""}
                    </span>
                    <ApproveButton kind="paper" id={p.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </AdminShell>
  );
}

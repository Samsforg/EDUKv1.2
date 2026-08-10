import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getSubject, getChapters, getQuizzes, getPapers, getGrades, getSeries } from "@/lib/admin-content";
import { AdminShell } from "@/components/admin/AdminShell";
import { ChapterList } from "@/components/admin/content/ChapterList";
import { QuizManager } from "@/components/admin/content/QuizManager";
import { PaperManager } from "@/components/admin/content/PaperManager";

export const metadata: Metadata = { title: "Edukora Admin - Gestion matière" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  const { id } = await params;
  const subjectId = Number(id);
  const subject = await getSubject(subjectId);
  if (!subject) redirect("/espace-admin/cours");

  const [chapters, quizzes, papers, grades, series] = await Promise.all([
    getChapters(subjectId),
    getQuizzes(subjectId),
    getPapers(subjectId),
    getGrades(),
    getSeries(),
  ]);

  const lessonCount = chapters.reduce((acc, c) => acc + c.lessons.length, 0);

  return (
    <AdminShell active="content">
      <div className="mb-6 flex items-center gap-2 text-sm text-on-surface-variant">
        <Link href="/espace-admin/cours" className="flex items-center gap-1 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Contenu
        </Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-on-surface">{subject.name}</span>
      </div>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <span className="w-14 h-14 rounded-xl flex items-center justify-center material-symbols-outlined text-2xl" style={{ backgroundColor: `${subject.color}18`, color: subject.color }}>
            {subject.icon}
          </span>
          <div className="flex-1">
            <h2 className="font-display text-2xl font-bold text-on-surface">{subject.name}</h2>
            <p className="text-sm text-on-surface-variant">Code : {subject.code} — Matière n° {subject.id}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-5">
          <div className="bg-surface-container rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-primary">{chapters.length}</p>
            <p className="text-xs text-on-surface-variant">Chapitres</p>
          </div>
          <div className="bg-surface-container rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-primary">{lessonCount}</p>
            <p className="text-xs text-on-surface-variant">Leçons</p>
          </div>
          <div className="bg-surface-container rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-primary">{quizzes.length}</p>
            <p className="text-xs text-on-surface-variant">Quiz</p>
          </div>
          <div className="bg-surface-container rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-primary">{papers.length}</p>
            <p className="text-xs text-on-surface-variant">Sujets</p>
          </div>
          <div className="bg-surface-container rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-primary">
              {quizzes.reduce((a, q) => a + q.question_count, 0) + papers.reduce((a, p) => a + p.question_count, 0)}
            </p>
            <p className="text-xs text-on-surface-variant">Questions</p>
          </div>
        </div>
      </section>

      <div className="mb-8">
        <ChapterList subjectId={subjectId} initialChapters={chapters} grades={grades} />
      </div>

      <div className="mb-8">
        <QuizManager subjectId={subjectId} initialQuizzes={quizzes} chapters={chapters.map((c) => ({ id: c.id, title: c.title }))} />
      </div>

      <PaperManager subjectId={subjectId} initialPapers={papers} series={series} />
    </AdminShell>
  );
}
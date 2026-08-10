import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { resolveUserGradeIds, gradeInClause } from "@/lib/level";

const PER_DAY_LESSON_MINUTES = 10;

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " et ")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const gradeIds = await resolveUserGradeIds(user.serie_id, user.class_level);
  const gradeClause = gradeIds ? gradeInClause(gradeIds) : null;

  const subjects = await query<{
    id: number;
    name: string;
    icon: string;
    color: string;
    code: string;
  }>("SELECT id, name, icon, color, code FROM subjects ORDER BY id");

  const chapters = await query<{ id: number; subject_id: number; title: string; position: number }>(
    `SELECT id, subject_id, title, position FROM chapters WHERE status = 'approved' ${
      gradeClause ? `AND ${gradeClause.clause}` : ""
    } ORDER BY subject_id, position`,
    ...(gradeClause?.params ?? []),
  );

  const lessons = await query<{
    id: number;
    chapter_id: number;
    title: string;
    position: number;
    read: number;
  }>(
    `SELECT l.id, l.chapter_id, l.title, l.position,
            (SELECT COUNT(*) FROM lesson_reads lr WHERE lr.lesson_id = l.id AND lr.user_id = ?) AS read
     FROM lessons l WHERE l.status = 'approved'
       ${gradeClause ? `AND l.chapter_id IN (SELECT id FROM chapters WHERE ${gradeClause.clause})` : ""}
     ORDER BY l.chapter_id, l.position`,
    user.id,
    ...(gradeClause?.params ?? []),
  );

  const chapterIds = new Set(chapters.map((c) => c.id));
  const quizChapterClause =
    chapterIds.size > 0
      ? `(q.chapter_id IS NULL OR q.chapter_id IN (${[...chapterIds].map(() => "?").join(",")}))`
      : "(q.chapter_id IS NULL)";

  const quizRows = await query<{
    id: number;
    subject_id: number;
    chapter_id: number | null;
    title: string;
    best: number | null;
    attempts: number;
  }>(
    `SELECT q.id, q.subject_id, q.chapter_id, q.title,
            (SELECT MAX(a.score * 100.0 / a.max_score) FROM quiz_attempts a WHERE a.quiz_id = q.id AND a.user_id = ?) AS best,
            (SELECT COUNT(*) FROM quiz_attempts a WHERE a.quiz_id = q.id AND a.user_id = ?) AS attempts
     FROM quizzes q WHERE ${quizChapterClause}
     ORDER BY q.subject_id, q.id`,
    user.id,
    user.id,
    ...chapterIds,
  );

  type Status = "not_started" | "in_progress" | "needs_revision" | "mastered";
  type ChapterPlan = {
    id: number;
    subject_id: number;
    title: string;
    position: number;
    status: Status;
    status_label: string;
    lessons_total: number;
    lessons_read: number;
    progress: number;
    best_percent: number | null;
    attempts: number;
    next_lesson: { id: number; title: string } | null;
    quiz: { id: number; title: string } | null;
    first_lesson: { id: number; title: string } | null;
  };

  const lessonsByChapter = new Map<number, { id: number; title: string; read: boolean }[]>();
  for (const l of lessons) {
    const arr = lessonsByChapter.get(l.chapter_id) ?? [];
    arr.push({ id: l.id, title: l.title, read: l.read > 0 });
    lessonsByChapter.set(l.chapter_id, arr);
  }

  const REVIEW_AFTER_DAYS = 14;
  const reviewRows = await query<{ chapter_id: number; last_read: string }>(
    `SELECT l.chapter_id, MAX(lr.read_at) AS last_read
     FROM lesson_reads lr JOIN lessons l ON l.id = lr.lesson_id
     WHERE lr.user_id = ? GROUP BY l.chapter_id`,
    user.id,
  );
  const lastReadDays: Record<number, number> = {};
  const now = Date.now();
  for (const r of reviewRows) {
    const raw = r.last_read.includes("T") ? r.last_read : `${r.last_read}Z`;
    const age = now - new Date(raw).getTime();
    lastReadDays[r.chapter_id] = Math.max(0, Math.floor(age / 86400000));
  }

  const quizzesBySubject = new Map<number, { id: number; title: string; best: number | null; attempts: number }[]>();
  for (const q of quizRows) {
    const arr = quizzesBySubject.get(q.subject_id) ?? [];
    arr.push({ id: q.id, title: q.title, best: q.best, attempts: q.attempts });
    quizzesBySubject.set(q.subject_id, arr);
  }

  const subjectPlan: Record<
    number,
    { id: number; name: string; icon: string; color: string; chapters: ChapterPlan[] }
  > = {};
  const queue: {
    id: string;
    type: "lesson" | "quiz";
    priority: number;
    reason: string;
    href: string;
    subject_id: number;
    subject_name: string;
    subject_icon: string;
    subject_color: string;
    chapter_title: string;
    lesson_title?: string;
    quiz_title?: string;
  }[] = [];

  for (const s of subjects) {
    subjectPlan[s.id] = { id: s.id, name: s.name, icon: s.icon, color: s.color, chapters: [] };
  }

  for (const c of chapters) {
    const chLessons = lessonsByChapter.get(c.id) ?? [];
    const lessonsTotal = chLessons.length;
    const lessonsRead = chLessons.filter((l) => l.read).length;
    const unread = chLessons.filter((l) => !l.read);

    const subjQuizzes = quizzesBySubject.get(c.subject_id) ?? [];
    const subjectQuizCount = subjQuizzes.length;
    const subjectBest = subjQuizzes.reduce<number | null>((m, q) => (q.best != null && (m === null || q.best > m) ? q.best : m), null);
    const subjectAttempts = subjQuizzes.reduce((a, q) => a + q.attempts, 0);

    const chapterQuiz =
      subjQuizzes.find(
        (q) => q.title && normalize(c.title).length > 2 && normalize(q.title).includes(normalize(c.title)),
      ) ?? null;

    let status: Status;
    let status_label: string;
    if (lessonsTotal === 0) {
      status = "not_started";
      status_label = "À commencer";
    } else if (lessonsRead === 0) {
      status = "not_started";
      status_label = "À commencer";
    } else if (lessonsRead < lessonsTotal) {
      status = "in_progress";
      status_label = "En cours";
    } else if (subjectQuizCount > 0 && (subjectBest === null || subjectBest < 70)) {
      status = "needs_revision";
      status_label = "À renforcer";
    } else if ((lastReadDays[c.id] ?? 0) >= REVIEW_AFTER_DAYS) {
      status = "needs_revision";
      status_label = "À revoir";
    } else {
      status = "mastered";
      status_label = "Maîtrisé";
    }

    const nextLesson = unread[0] ?? null;
    const bestPercent =
      chapterQuiz !== null
        ? chapterQuiz.best
        : subjectBest !== null
          ? subjectBest
          : null;
    const attempts = chapterQuiz !== null ? chapterQuiz.attempts : subjectAttempts;

    subjectPlan[c.subject_id].chapters.push({
      id: c.id,
      subject_id: c.subject_id,
      title: c.title,
      position: c.position,
      status,
      status_label,
      lessons_total: lessonsTotal,
      lessons_read: lessonsRead,
      progress: lessonsTotal > 0 ? Math.round((lessonsRead / lessonsTotal) * 100) : 0,
      best_percent: bestPercent !== null ? Math.round(bestPercent) : null,
      attempts,
      next_lesson: nextLesson ?? null,
      quiz: chapterQuiz ?? null,
      first_lesson: chLessons[0] ?? null,
    });
  }

  for (const s of subjects) {
    const sp = subjectPlan[s.id];
    sp.chapters.sort((a, b) => a.position - b.position);
    const order = { not_started: 0, in_progress: 1, needs_revision: 2, mastered: 3 } as const;

    const unreadInNotStarted: { chapter: ChapterPlan; lesson: { id: number; title: string } }[] = [];
    const unreadInProgress: { chapter: ChapterPlan; lesson: { id: number; title: string } }[] = [];
    const reviseChapters: ChapterPlan[] = [];

    for (const ch of [...sp.chapters].sort((a, b) => order[a.status] - order[b.status] || a.position - b.position)) {
      if (ch.status === "not_started" && ch.next_lesson) {
        unreadInNotStarted.push({ chapter: ch, lesson: ch.next_lesson });
      } else if (ch.status === "in_progress" && ch.next_lesson) {
        unreadInProgress.push({ chapter: ch, lesson: ch.next_lesson });
      } else if (ch.status === "needs_revision") {
        reviseChapters.push(ch);
      }
    }

    for (const item of unreadInNotStarted) {
      queue.push({
        id: `l-${item.lesson.id}`,
        type: "lesson",
        priority: 0,
        reason: `Chapitre "${item.chapter.title}" pas commencé`,
        href: `/fiches/${item.lesson.id}`,
        subject_id: s.id,
        subject_name: s.name,
        subject_icon: s.icon,
        subject_color: s.color,
        chapter_title: item.chapter.title,
        lesson_title: item.lesson.title,
      });
    }
    for (const item of unreadInProgress) {
      queue.push({
        id: `l-${item.lesson.id}`,
        type: "lesson",
        priority: 1,
        reason: `Continuer le chapitre "${item.chapter.title}"`,
        href: `/fiches/${item.lesson.id}`,
        subject_id: s.id,
        subject_name: s.name,
        subject_icon: s.icon,
        subject_color: s.color,
        chapter_title: item.chapter.title,
        lesson_title: item.lesson.title,
      });
    }
    for (const ch of reviseChapters) {
      const isStale = ch.status_label === "À revoir";
      const daysAgo = lastReadDays[ch.id] ?? 0;
      if (isStale) {
        // relecture espacée : on relit la première fiche du chapitre
        if (ch.first_lesson) {
          queue.push({
            id: `r-${ch.id}`,
            type: "lesson",
            priority: -1,
            reason: `Relire "${ch.title}" (dernière lecture il y a ${daysAgo} jours)`,
            href: `/fiches/${ch.first_lesson.id}`,
            subject_id: s.id,
            subject_name: s.name,
            subject_icon: s.icon,
            subject_color: s.color,
            chapter_title: ch.title,
            lesson_title: ch.first_lesson.title,
          });
        }
        continue;
      }
      const q = ch.quiz;
      if (q) {
        queue.push({
          id: `q-${q.id}`,
          type: "quiz",
          priority: 2,
          reason: ch.best_percent === null ? "Valider le chapitre avec un quiz" : `Revoir pour dépasser ${ch.best_percent}%`,
          href: `/quiz/${q.id}`,
          subject_id: s.id,
          subject_name: s.name,
          subject_icon: s.icon,
          subject_color: s.color,
          chapter_title: ch.title,
          quiz_title: q.title,
        });
      } else if (ch.attempts === 0) {
        queue.push({
          id: `q-subject-${s.id}-${ch.id}`,
          type: "quiz",
          priority: 2,
          reason: "Tester tes connaissances sur cette matière",
          href: "/quiz",
          subject_id: s.id,
          subject_name: s.name,
          subject_icon: s.icon,
          subject_color: s.color,
          chapter_title: ch.title,
          quiz_title: "Un quiz de la matière",
        });
      }
    }
    for (const ch of [...sp.chapters].filter((c) => c.lessons_total === 0)) {
      const q = ch.quiz;
      if (q) {
        queue.push({
          id: `q0-${q.id}`,
          type: "quiz",
          priority: 2,
          reason: ch.best_percent === null ? `Découvrir "${ch.title}" avec un quiz` : `Revoir pour dépasser ${ch.best_percent}%`,
          href: `/quiz/${q.id}`,
          subject_id: s.id,
          subject_name: s.name,
          subject_icon: s.icon,
          subject_color: s.color,
          chapter_title: ch.title,
          quiz_title: q.title,
        });
      } else if ((quizzesBySubject.get(s.id) ?? []).length > 0) {
        queue.push({
          id: `q0-subject-${s.id}-${ch.id}`,
          type: "quiz",
          priority: 2,
          reason: `Progresser sur "${ch.title}" avec les quiz de ${s.name}`,
          href: "/quiz",
          subject_id: s.id,
          subject_name: s.name,
          subject_icon: s.icon,
          subject_color: s.color,
          chapter_title: ch.title,
          quiz_title: "Un quiz de la matière",
        });
      }
    }
  }

  queue.sort((a, b) => a.priority - b.priority);

  let lessonsTotal = 0;
  let lessonsRead = 0;
  let chaptersTotal = 0;
  const statusCounts: Record<Status, number> = { not_started: 0, in_progress: 0, needs_revision: 0, mastered: 0 };
  for (const s of subjects) {
    for (const c of subjectPlan[s.id].chapters) {
      lessonsTotal += c.lessons_total;
      lessonsRead += c.lessons_read;
      chaptersTotal++;
      statusCounts[c.status]++;
    }
  }

  const overallPct = lessonsTotal > 0 ? Math.round((lessonsRead / lessonsTotal) * 100) : 0;
  const lessonsRemaining = lessonsTotal - lessonsRead;
  const days = Math.max(1, Math.ceil(lessonsRemaining / 3));

  const visibleSubjects = Object.values(subjectPlan)
    .sort((a, b) => a.id - b.id)
    .map((s) => ({ ...s }))
    .filter((s) => !gradeIds || s.chapters.length > 0);

  return NextResponse.json({
    generated_at: new Date().toISOString(),
    summary: {
      lessons_read: lessonsRead,
      lessons_total: lessonsTotal,
      lessons_remaining: lessonsRemaining,
      overall_pct: overallPct,
      chapters_total: chaptersTotal,
      status_counts: statusCounts,
      subjects_total: visibleSubjects.length,
      quizzes_taken: quizRows.reduce((a, q) => a + q.attempts, 0),
      plan: {
        per_day_lessons: lessonsRemaining > 0 ? Math.ceil(lessonsRemaining / days) : 0,
        days,
        daily_minutes: lessonsRemaining > 0 ? Math.ceil(lessonsRemaining / days) * PER_DAY_LESSON_MINUTES : 0,
      },
    },
    queue,
    subjects: visibleSubjects,
  });
}

export const GET = guardApi("GET /api/parcours", GETHandler);

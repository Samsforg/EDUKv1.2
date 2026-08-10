import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { resolveUserGradeIds, gradeInClause } from "@/lib/level";

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

const SLOTS = [
  { time: "09:00", period: "Matin" },
  { time: "14:00", period: "Après-midi" },
  { time: "18:00", period: "Soir" },
];

const DAY_KEYS = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];

function durationMinutes(type: string) {
  return type === "exam" ? 120 : 30;
}

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const gradeClause = await (async () => {
    const ids = await resolveUserGradeIds(user.serie_id, user.class_level);
    return ids ? gradeInClause(ids) : null;
  })();

  const subjects = await query<{ id: number; name: string; icon: string; color: string }>(
    "SELECT id, name, icon, color FROM subjects ORDER BY id",
  );

  const chapters = await query<{ id: number; subject_id: number; title: string; position: number }>(
    `SELECT id, subject_id, title, position FROM chapters WHERE status = 'approved' ${
      gradeClause ? `AND ${gradeClause.clause}` : ""
    } ORDER BY subject_id, position`,
    ...(gradeClause?.params ?? []),
  );

  const lessons = await query<{ id: number; chapter_id: number; title: string; read: number }>(
    `SELECT l.id, l.chapter_id, l.title,
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
     FROM quizzes q WHERE ${quizChapterClause} ORDER BY q.subject_id, q.id`,
    user.id,
    user.id,
    ...chapterIds,
  );

  const lessonsByChapter = new Map<number, { id: number; title: string; read: boolean }[]>();
  for (const l of lessons) {
    const arr = lessonsByChapter.get(l.chapter_id) ?? [];
    arr.push({ id: l.id, title: l.title, read: l.read > 0 });
    lessonsByChapter.set(l.chapter_id, arr);
  }

  const quizzesBySubject = new Map<number, { id: number; title: string; best: number | null; attempts: number }[]>();
  for (const q of quizRows) {
    const arr = quizzesBySubject.get(q.subject_id) ?? [];
    arr.push({ id: q.id, title: q.title, best: q.best, attempts: q.attempts });
    quizzesBySubject.set(q.subject_id, arr);
  }

  type ChapterInfo = {
    id: number;
    title: string;
    lessons_total: number;
    lessons_read: number;
    next_lesson: { id: number; title: string } | null;
    status: "not_started" | "in_progress" | "needs_revision" | "mastered";
    status_label: string;
    quiz: { id: number; title: string; best: number | null } | null;
  };

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
    lastReadDays[r.chapter_id] = Math.max(0, Math.floor((now - new Date(raw).getTime()) / 86400000));
  }

  const subjectChapters = new Map<number, ChapterInfo[]>();
  const subjectStats = new Map<number, { unread: number; revise: number }>();

  for (const c of chapters) {
    const chLessons = lessonsByChapter.get(c.id) ?? [];
    const total = chLessons.length;
    const read = chLessons.filter((l) => l.read).length;
    const unread = chLessons.filter((l) => !l.read);

    const subjQuizzes = quizzesBySubject.get(c.subject_id) ?? [];
    const chapterQuiz =
      subjQuizzes.find((q) => q.title && normalize(c.title).length > 2 && normalize(q.title).includes(normalize(c.title))) ??
      null;

    let status: ChapterInfo["status"] = "not_started";
    let status_label = "À commencer";
    if (total > 0 && read > 0 && read < total) {
      status = "in_progress";
      status_label = "En cours";
    } else if (total > 0 && read === total) {
      if (subjQuizzes.length > 0 && (chapterQuiz?.best ?? null) !== null && (chapterQuiz?.best ?? 0) >= 70) {
        if ((lastReadDays[c.id] ?? 0) >= REVIEW_AFTER_DAYS) {
          status = "needs_revision";
          status_label = "À revoir";
        } else {
          status = "mastered";
          status_label = "Maîtrisé";
        }
      } else {
        status = "needs_revision";
        status_label = "À renforcer";
      }
    }

    const arr = subjectChapters.get(c.subject_id) ?? [];
    arr.push({
      id: c.id,
      title: c.title,
      lessons_total: total,
      lessons_read: read,
      next_lesson: unread[0] ?? chLessons[0] ?? null,
      status,
      status_label,
      quiz: chapterQuiz ?? null,
    });
    subjectChapters.set(c.subject_id, arr);

    const st = subjectStats.get(c.subject_id) ?? { unread: 0, revise: 0 };
    st.unread += total - read;
    if (status === "needs_revision") st.revise++;
    subjectStats.set(c.subject_id, st);
  }

  const papers = await query<{ id: number; subject_id: number; title: string }>(
    "SELECT id, subject_id, title FROM exam_papers ORDER BY subject_id, year DESC",
  );

  type SubjectRow = { id: number; name: string; icon: string; color: string };
  type Task = { type: string; title: string; subtitle: string; href: string; priority: number };
  type SequenceItem = { subject: SubjectRow; task: Task };

  // File d'actions par matière, priorité : révision → en cours → pas commencé
  const tasksBySubject = new Map<number, Task[]>();
  for (const s of subjects) {
    const chaptersList = subjectChapters.get(s.id) ?? [];
    const tasks: Task[] = [];

    for (const ch of [...chaptersList].sort((a, b) => a.lessons_read - b.lessons_read)) {
      if (ch.status === "needs_revision") {
        if (ch.status_label === "À revoir" && ch.next_lesson) {
          tasks.push({
            type: "lesson",
            title: ch.title,
            subtitle: `Relire (dernière lecture il y a ${lastReadDays[ch.id] ?? ""} jours)`,
            href: `/fiches/${ch.next_lesson.id}`,
            priority: -1,
          });
          continue;
        }
        const q = ch.quiz;
        if (q) {
          tasks.push({
            type: "quiz",
            title: ch.title,
            subtitle: q.best != null ? `Repasser au-dessus de ${Math.round(q.best)}%` : "Valider le chapitre",
            href: `/quiz/${q.id}`,
            priority: 0,
          });
        } else {
          tasks.push({ type: "quiz", title: ch.title, subtitle: "QCM de synthèse", href: "/quiz", priority: 0 });
        }
      } else if (ch.status === "in_progress" && ch.next_lesson) {
        tasks.push({
          type: "lesson",
          title: ch.title,
          subtitle: ch.next_lesson.title,
          href: `/fiches/${ch.next_lesson.id}`,
          priority: 1,
        });
      } else if (ch.status === "not_started" && ch.next_lesson) {
        tasks.push({
          type: "lesson",
          title: ch.title,
          subtitle: ch.next_lesson.title,
          href: `/fiches/${ch.next_lesson.id}`,
          priority: 2,
        });
      }
    }
    tasksBySubject.set(s.id, tasks.sort((a, b) => a.priority - b.priority));
  }

  const subjectsWithTasks = subjects.filter((s) => (tasksBySubject.get(s.id) ?? []).length > 0);

  // Focus : matière la plus à réviser puis la plus en retard (parmi les matières du niveau)
  const focusCandidates = (gradeClause ? subjects.filter((s) => (subjectStats.get(s.id)?.unread ?? 0) > 0) : subjects) as typeof subjects;
  const focusSubject = [...focusCandidates]
    .sort((a, b) => {
      const sa = subjectStats.get(a.id) ?? { unread: 0, revise: 0 };
      const sb = subjectStats.get(b.id) ?? { unread: 0, revise: 0 };
      return sb.revise - sa.revise || sb.unread - sa.unread;
    })[0] ?? subjects[0];

  // Interleaving round-robin entre matières
  const sequence: SequenceItem[] = [];
  const pointers = new Map<number, number>();
  let added = true;
  while (added) {
    added = false;
    for (const s of subjectsWithTasks) {
      const tasks = tasksBySubject.get(s.id) ?? [];
      const i = pointers.get(s.id) ?? 0;
      if (i < tasks.length) {
        sequence.push({ subject: s, task: tasks[i] });
        pointers.set(s.id, i + 1);
        added = true;
      }
    }
  }

  const paperForFocus = papers.find((p) => p.subject_id === focusSubject.id);
  if (paperForFocus) {
    sequence.push({
      subject: focusSubject,
      task: {
        type: "exam",
        title: "Examen blanc",
        subtitle: paperForFocus.title,
        href: `/simulateur/${paperForFocus.id}`,
        priority: -1,
      },
    });
  }

  // Répartition dans la semaine
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monday = new Date(today);
  const day = (today.getDay() + 6) % 7;
  monday.setDate(today.getDate() - day);

  const days = DAY_KEYS.map((k, di) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + di);
    const slots = SLOTS.map((slot, si) => {
      const item = sequence[di * 3 + si];
      if (!item) return null;
      return {
        time: slot.time,
        period: slot.period,
        type: item.task.type,
        title: item.task.title,
        subtitle: item.task.subtitle,
        href: item.task.href,
        subject: { id: item.subject.id, name: item.subject.name, icon: item.subject.icon, color: item.subject.color },
      };
    }).filter((s): s is NonNullable<typeof s> => s !== null);

    const isToday = di === day;
    return {
      day: k,
      label: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"][di],
      date: date.toISOString().slice(0, 10),
      is_today: isToday,
      slots,
    };
  });

  const sessionCount = days.reduce((a, d) => a + d.slots.length, 0);
  const intensityHours = days.reduce((a, d) => a + d.slots.reduce((x, s) => x + durationMinutes(s.type), 0), 0) / 60;

  return NextResponse.json({
    week_start: monday.toISOString().slice(0, 10),
    focus: {
      id: focusSubject.id,
      name: focusSubject.name,
      icon: focusSubject.icon,
      color: focusSubject.color,
    },
    summary: {
      sessions: sessionCount,
      intensity_hours: Math.round(intensityHours * 10) / 10,
      unread: [...subjectStats.values()].reduce((a, s) => a + s.unread, 0),
      to_revise: [...subjectStats.values()].reduce((a, s) => a + s.revise, 0),
    },
    days,
  });
}

export const GET = guardApi("GET /api/planning", GETHandler);

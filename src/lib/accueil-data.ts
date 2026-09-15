import { cache } from "react";
import { cookies } from "next/headers";
import { createHash, timingSafeEqual, createHmac } from "node:crypto";
import { query, queryOne } from "./db";
import { getDueReviews } from "./spaced-repetition";
import { resolveUserGradeIds, gradeInClause } from "./level";

const COOKIE_NAME = "edukora_session";
const SESSION_DAYS = 30;
const TOKEN_VERSION = "v1";

function sessionSecret(): string | null {
  const secret = process.env.SESSION_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV !== "production") return "edukora-session-secret-v1-demo";
  console.error("[session] SESSION_SECRET non défini en production");
  return null;
}

function signSessionToken(payload: string): string {
  const secret = sessionSecret();
  if (!secret) throw new Error("SESSION_SECRET manquant en production");
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function signPayload(userId: number, exp: number): string {
  const payload = Buffer.from(JSON.stringify({ uid: userId, exp })).toString("base64url");
  return `${TOKEN_VERSION}.${payload}.${signSessionToken(payload)}`;
}

function verifySessionToken(token: string): { uid: number; exp: number } | null {
  const secret = sessionSecret();
  if (!secret) return null;
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== TOKEN_VERSION) return null;
  const [, payload, sig] = parts;
  const expected = signSessionToken(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      uid: number;
      exp: number;
    };
    if (typeof data.uid !== "number" || typeof data.exp !== "number") return null;
    if (data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  const session = verifySessionToken(token);
  if (!session) return null;

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const revoked = await queryOne<{ token_hash: string }>(
    "SELECT token_hash FROM revoked_sessions WHERE token_hash = ?",
    tokenHash,
  );
  if (revoked) return null;

  const user = await queryOne<SessionUser>(
    `SELECT id, role, email, phone, first_name, last_name, serie_id, class_level,
            xp, streak, referral_code, commune, gender, avatar_url, blocked, goal
     FROM users WHERE id = ?`,
    session.uid,
  );
  if (!user) return null;
  if (user.blocked) return null;
  return user;
});

export interface SessionUser {
  id: number;
  role: string;
  email: string | null;
  phone: string | null;
  first_name: string;
  last_name: string;
  serie_id: number | null;
  class_level: string | null;
  xp: number;
  streak: number;
  referral_code: string | null;
  commune: string | null;
  gender: string | null;
  avatar_url: string | null;
  blocked: number;
  goal: string | null;
}

export interface ProgressData {
  xp: number;
  streak: number;
  global_score: number | null;
  per_subject: {
    subject_id: number;
    name: string;
    icon: string;
    color: string;
    best_percent: number | null;
    total_attempts: number;
  }[];
  exams: { best: number | null; count: number };
  recent_quizzes: { id: number; title: string; score: number; max_score: number; completed_at: string }[];
  badges: { code: string; name: string; icon: string; description: string; earned_at: string }[];
}

export interface ReReadItem {
  id: string;
  reason: string;
  href: string;
  subject_name: string;
  subject_icon: string;
  subject_color: string;
  chapter_title: string;
  subject_id?: number;
  type?: "lesson" | "quiz";
  priority?: number;
  lesson_title?: string;
  quiz_title?: string;
}

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

export async function getProgressData(userId: number): Promise<ProgressData> {
  const me = (await queryOne<{ xp: number; streak: number; role: string }>(
    "SELECT xp, streak, role FROM users WHERE id = ?",
    userId,
  ))!;

  const quizStats = await query<{
    subject_id: number;
    name: string;
    icon: string;
    color: string;
    best_percent: number | null;
    total_attempts: number;
  }>(
    `SELECT s.id AS subject_id, s.name, s.icon, s.color,
            MAX(a.score * 100.0 / a.max_score) AS best_percent,
            COUNT(a.id) AS total_attempts
     FROM subjects s
     LEFT JOIN quizzes q ON q.subject_id = s.id
     LEFT JOIN quiz_attempts a ON a.quiz_id = q.id AND a.user_id = ?
     GROUP BY s.id ORDER BY s.id`,
    userId,
  );

  const examBest = await queryOne<{ best: number | null; count: number }>(
    `SELECT MAX(score_over_20) AS best, COUNT(*) AS count FROM exam_attempts WHERE user_id = ?`,
    userId,
  );

  const recentQuizzes = await query<{
    id: number;
    title: string;
    score: number;
    max_score: number;
    completed_at: string;
  }>(
    `SELECT q.id, q.title, a.score, a.max_score, a.completed_at
     FROM quiz_attempts a JOIN quizzes q ON q.id = a.quiz_id
     WHERE a.user_id = ? ORDER BY a.completed_at DESC LIMIT 5`,
    userId,
  );

  const badges = await query<{ code: string; name: string; icon: string; description: string; earned_at: string }>(
    `SELECT b.code, b.name, b.icon, b.description, ub.earned_at
     FROM user_badges ub JOIN badges b ON b.id = ub.badge_id
     WHERE ub.user_id = ? ORDER BY ub.earned_at DESC`,
    userId,
  );

  const totalPossible = quizStats.reduce((acc, s) => acc + s.total_attempts, 0);
  const globalScore =
    quizStats.length === 0
      ? 0
      : Math.round(
          (quizStats.reduce((acc, s) => acc + (s.best_percent ?? 0), 0) /
            Math.max(1, quizStats.filter((s) => s.best_percent !== null).length)) *
            100,
        ) / 100;

  return {
    xp: me.xp,
    streak: me.streak,
    global_score: totalPossible > 0 ? Math.round(globalScore * 100) / 100 : null,
    per_subject: quizStats.map((s) => ({
      ...s,
      best_percent: s.best_percent !== null ? Math.round(s.best_percent) : null,
    })),
    exams: {
      best: examBest?.best ?? null,
      count: examBest?.count ?? 0,
    },
    recent_quizzes: recentQuizzes,
    badges,
  };
}

export async function getReReads(userId: number): Promise<ReReadItem[]> {
  const gradeIds = await resolveUserGradeIds(
    (await queryOne<{ serie_id: number | null; class_level: string | null }>(
      "SELECT serie_id, class_level FROM users WHERE id = ?",
      userId,
    ))?.serie_id ?? null,
    (await queryOne<{ class_level: string | null }>("SELECT class_level FROM users WHERE id = ?", userId))?.class_level ?? null,
  );
  const gradeClause = gradeIds ? gradeInClause(gradeIds) : null;

  const subjects = await query<{ id: number; name: string; icon: string; color: string; code: string }>(
    "SELECT id, name, icon, color, code FROM subjects ORDER BY id",
  );

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
    userId,
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
    userId,
    userId,
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
    userId,
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

  const subjectPlan: Record<number, { id: number; name: string; icon: string; color: string; chapters: ChapterPlan[] }> = {};
  const queue: ReReadItem[] = [];

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
    const bestPercent = chapterQuiz !== null ? chapterQuiz.best : subjectBest !== null ? subjectBest : null;
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
  }

  queue.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));

  return queue.filter((q) => q.type === "lesson" && q.reason.startsWith("Relire")).map((q) => ({
    id: q.id,
    reason: q.reason,
    href: q.href,
    subject_name: q.subject_name,
    subject_icon: q.subject_icon,
    subject_color: q.subject_color,
    chapter_title: q.chapter_title,
  }));
}

export async function getUnreadNotificationsCount(userId: number): Promise<number> {
  const result = await queryOne<{ count: number }>(
    "SELECT COUNT(*) AS count FROM notifications WHERE user_id = ? AND read = 0",
    userId,
  );
  return result?.count ?? 0;
}

export async function getDailyQuiz(userId: number): Promise<DailyQuiz | null> {
  const { getDailyQuiz: getDailyQuizLib } = await import("./daily");
  return getDailyQuizLib(userId);
}

export interface DailyQuiz {
  id: number;
  title: string;
  done_today: boolean;
  bonus_xp: number;
}

export async function getStreakInfo(userId: number): Promise<StreakInfo | null> {
  const { getStreakInfo: getStreakInfoLib } = await import("./streak");
  return getStreakInfoLib(userId);
}

export interface StreakInfo {
  current: number;
  isTodayDone: boolean;
  nextMilestone: number | null;
  bonusXp: number;
}

export async function getRevisionDueCount(userId: number): Promise<number> {
  const due = await getDueReviews(userId, 20);
  return due.length;
}

export function examCycleOfClassLevel(raw: string | null): "BAC" | "BEPC" | null {
  if (!raw) return null;
  const key = raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
  const star = key.match(/^(6eme|5eme|4eme|3eme|2nde|1ere|terminale)/)?.[1];
  const CYCLE_BY_CLASS_KEY: Record<string, "BAC" | "BEPC"> = {
    "6eme": "BEPC",
    "5eme": "BEPC",
    "4eme": "BEPC",
    "3eme": "BEPC",
    "2nde": "BAC",
    "1ere": "BAC",
    "terminale": "BAC",
  };
  return CYCLE_BY_CLASS_KEY[star ?? key] ?? null;
}
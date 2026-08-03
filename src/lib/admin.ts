import { query, queryOne, run } from "./db";
import { notify } from "./session";
import { hashPassword } from "./auth";
import { logAudit } from "./audit";

const ROLES = ["student", "teacher", "admin", "parent", "expert"] as const;
export type AdminRole = (typeof ROLES)[number];

export interface AdminStats {
  users: { total: number; students: number; teachers: number; parents: number; admins: number; experts: number };
  online_today: number;
  new_week: number;
  content: { lessons: number; chapters: number; quizzes: number; papers: number; questions: number };
  attempts: { quiz: number; exam: number };
  engagement: { avg_quiz_percent: number | null; avg_exam_over_20: number | null; total_xp: number };
  forum: { posts: number; replies: number };
  parent_links: number;
}

export interface ActivityItem {
  kind: "quiz" | "exam" | "registration" | "forum";
  id: number;
  user_name: string;
  label: string;
  detail: string;
  created_at: string;
  relative: string;
}

export function getAdminStats(): AdminStats {
  const roles = query<{ role: string; c: number }>("SELECT role, COUNT(*) AS c FROM users GROUP BY role");
  const count = (role: string) => roles.find((r) => r.role === role)?.c ?? 0;
  const today = new Date().toISOString().slice(0, 10);

  const online_today = queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM users WHERE last_active >= ?",
    today,
  )?.c ?? 0;

  const new_week = queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM users WHERE created_at >= datetime('now', '-7 days')",
  )?.c ?? 0;

  const content = {
    lessons: queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM lessons")?.c ?? 0,
    chapters: queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM chapters")?.c ?? 0,
    quizzes: queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM quizzes")?.c ?? 0,
    papers: queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM exam_papers")?.c ?? 0,
    questions: queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM questions")?.c ?? 0,
  };

  const attempts = {
    quiz: queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM quiz_attempts")?.c ?? 0,
    exam: queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM exam_attempts")?.c ?? 0,
  };

  const engagement = {
    avg_quiz_percent: queryOne<{ v: number | null }>(
      "SELECT ROUND(AVG(score * 100.0 / max_score)) AS v FROM quiz_attempts",
    )?.v ?? null,
    avg_exam_over_20: queryOne<{ v: number | null }>(
      "SELECT ROUND(AVG(score_over_20), 1) AS v FROM exam_attempts",
    )?.v ?? null,
    total_xp: queryOne<{ v: number }>("SELECT COALESCE(SUM(xp), 0) AS v FROM users")?.v ?? 0,
  };

  const forum = {
    posts: queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM forum_posts")?.c ?? 0,
    replies: queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM forum_replies")?.c ?? 0,
  };

  const parent_links = queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM parent_child")?.c ?? 0;

  return {
    users: {
      total: count("student") + count("teacher") + count("admin") + count("parent") + count("expert"),
      students: count("student"),
      teachers: count("teacher"),
      parents: count("parent"),
      admins: count("admin"),
      experts: count("expert"),
    },
    online_today,
    new_week,
    content,
    attempts,
    engagement,
    forum,
    parent_links,
  };
}

function relativeTime(iso: string): string {
  const then = new Date(iso.replace(" ", "T") + (iso.includes("Z") ? "" : "Z"));
  const diff = Math.max(0, Date.now() - then.getTime());
  const min = Math.floor(diff / 60000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const hours = Math.floor(min / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `il y a ${days} j`;
  return then.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

export function getActivityFeed(limit = 10): ActivityItem[] {
  const quiz = query<{
    id: number;
    user_name: string;
    title: string;
    subject_name: string;
    score: number;
    max_score: number;
    created_at: string;
  }>(
    `SELECT a.id, u.first_name || ' ' || u.last_name AS user_name, q.title,
            s.name AS subject_name, a.score, a.max_score, a.completed_at AS created_at
     FROM quiz_attempts a
     JOIN users u ON u.id = a.user_id
     JOIN quizzes q ON q.id = a.quiz_id
     LEFT JOIN subjects s ON s.id = q.subject_id
     ORDER BY a.completed_at DESC LIMIT ?`,
    limit,
  );

  const exam = query<{
    id: number;
    user_name: string;
    title: string;
    subject_name: string;
    score_over_20: number;
    created_at: string;
  }>(
    `SELECT a.id, u.first_name || ' ' || u.last_name AS user_name, p.title,
            s.name AS subject_name, a.score_over_20, a.completed_at AS created_at
     FROM exam_attempts a
     JOIN users u ON u.id = a.user_id
     JOIN exam_papers p ON p.id = a.paper_id
     LEFT JOIN subjects s ON s.id = p.subject_id
     ORDER BY a.completed_at DESC LIMIT ?`,
    limit,
  );

  const forum = query<{
    id: number;
    user_name: string;
    title: string;
    created_at: string;
  }>(
    `SELECT p.id, u.first_name || ' ' || u.last_name AS user_name, p.title, p.created_at
     FROM forum_posts p JOIN users u ON u.id = p.user_id
     ORDER BY p.created_at DESC LIMIT ?`,
    limit,
  );

  const items: ActivityItem[] = [
    ...quiz.map((q) => ({
      kind: "quiz" as const,
      id: q.id,
      user_name: q.user_name,
      label: `${q.title}`,
      detail: `${q.subject_name ?? "Quiz"} • ${q.score}/${q.max_score}`,
      created_at: q.created_at,
      relative: relativeTime(q.created_at),
    })),
    ...exam.map((e) => ({
      kind: "exam" as const,
      id: e.id,
      user_name: e.user_name,
      label: `${e.title}`,
      detail: `${e.subject_name ?? "Examen"} • ${e.score_over_20}/20`,
      created_at: e.created_at,
      relative: relativeTime(e.created_at),
    })),
    ...forum.map((f) => ({
      kind: "forum" as const,
      id: f.id,
      user_name: f.user_name,
      label: f.title,
      detail: "Nouveau sujet sur le forum",
      created_at: f.created_at,
      relative: relativeTime(f.created_at),
    })),
  ];

  return items
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
    .slice(0, limit);
}

export interface SubjectStats {
  subject_id: number;
  name: string;
  icon: string;
  color: string;
  quizzes: number;
  papers: number;
  quiz_attempts: number;
  exam_attempts: number;
  avg_quiz_percent: number | null;
  avg_exam_over_20: number | null;
}

export function getSubjectStats(): SubjectStats[] {
  return query<SubjectStats>(
    `SELECT s.id AS subject_id, s.name, s.icon, s.color,
            (SELECT COUNT(*) FROM quizzes x WHERE x.subject_id = s.id) AS quizzes,
            (SELECT COUNT(*) FROM exam_papers p WHERE p.subject_id = s.id) AS papers,
            (SELECT COUNT(*) FROM quiz_attempts a JOIN quizzes q ON q.id = a.quiz_id WHERE q.subject_id = s.id) AS quiz_attempts,
            (SELECT COUNT(*) FROM exam_attempts a JOIN exam_papers p ON p.id = a.paper_id WHERE p.subject_id = s.id) AS exam_attempts,
            (SELECT ROUND(AVG(a.score * 100.0 / a.max_score)) FROM quiz_attempts a JOIN quizzes q ON q.id = a.quiz_id WHERE q.subject_id = s.id) AS avg_quiz_percent,
            (SELECT ROUND(AVG(a.score_over_20), 1) FROM exam_attempts a JOIN exam_papers p ON p.id = a.paper_id WHERE p.subject_id = s.id) AS avg_exam_over_20
     FROM subjects s ORDER BY s.id`,
  );
}

export interface AdminUserRow {
  id: number;
  role: string;
  blocked: number;
  email: string | null;
  phone: string | null;
  first_name: string;
  last_name: string;
  class_level: string | null;
  serie_name: string | null;
  xp: number;
  streak: number;
  last_active: string | null;
  online: boolean;
  created_at: string;
  quiz_attempts: number;
  exam_attempts: number;
  forum_posts: number;
}

export function getAdminUsers(): AdminUserRow[] {
  const today = new Date().toISOString().slice(0, 10);
  return query<AdminUserRow>(
    `SELECT u.id, u.role, u.blocked, u.email, u.phone, u.first_name, u.last_name, u.class_level,
            s.name AS serie_name, u.xp, u.streak, u.last_active, u.created_at,
            (SELECT COUNT(*) FROM quiz_attempts a WHERE a.user_id = u.id) AS quiz_attempts,
            (SELECT COUNT(*) FROM exam_attempts a WHERE a.user_id = u.id) AS exam_attempts,
            (SELECT COUNT(*) FROM forum_posts p WHERE p.user_id = u.id) AS forum_posts
     FROM users u LEFT JOIN series s ON s.id = u.serie_id
     ORDER BY u.id`,
  ).map((u) => ({ ...u, online: !!u.last_active && u.last_active.slice(0, 10) === today }));
}

export interface UserListFilters {
  q?: string;
  role?: string;
  status?: "all" | "active" | "blocked";
  page?: number;
  pageSize?: number;
}

export interface UserListResult {
  users: AdminUserRow[];
  total: number;
  page: number;
  pages: number;
  pageSize: number;
}

export function getAdminUsersPage(filters: UserListFilters = {}): UserListResult {
  const today = new Date().toISOString().slice(0, 10);
  const q = filters.q?.trim() ?? "";
  const role = filters.role ?? "all";
  const status = filters.status ?? "all";
  const pageSize = filters.pageSize ?? 20;

  const where: string[] = [];
  const params: (string | number)[] = [];
  if (q) {
    where.push(
      "(u.first_name LIKE ? OR u.last_name LIKE ? OR u.email LIKE ? OR u.phone LIKE ? OR u.class_level LIKE ?)",
    );
    for (let i = 0; i < 5; i++) params.push(`%${q}%`);
  }
  if (role && role !== "all") {
    where.push("u.role = ?");
    params.push(role);
  }
  if (status === "active") where.push("u.blocked = 0");
  if (status === "blocked") where.push("u.blocked = 1");
  const whereSql = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  const total =
    queryOne<{ c: number }>(`SELECT COUNT(*) AS c FROM users u ${whereSql}`, ...params)?.c ?? 0;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, filters.page ?? 1), pages);

  const users = query<AdminUserRow>(
    `SELECT u.id, u.role, u.blocked, u.email, u.phone, u.first_name, u.last_name, u.class_level,
            s.name AS serie_name, u.xp, u.streak, u.last_active, u.created_at,
            (SELECT COUNT(*) FROM quiz_attempts a WHERE a.user_id = u.id) AS quiz_attempts,
            (SELECT COUNT(*) FROM exam_attempts a WHERE a.user_id = u.id) AS exam_attempts,
            (SELECT COUNT(*) FROM forum_posts p WHERE p.user_id = u.id) AS forum_posts
     FROM users u LEFT JOIN series s ON s.id = u.serie_id
     ${whereSql}
     ORDER BY u.id LIMIT ? OFFSET ?`,
    ...params,
    pageSize,
    (page - 1) * pageSize,
  ).map((u) => ({ ...u, online: !!u.last_active && u.last_active.slice(0, 10) === today }));

  return { users, total, page, pages, pageSize };
}

export function changeUserRole(targetId: number, role: string, actorId: number): { ok: true } | { error: string } {
  if (!ROLES.includes(role as AdminRole)) return { error: "Rôle invalide" };
  if (targetId === actorId) return { error: "Vous ne pouvez pas modifier votre propre rôle" };

  const target = queryOne<{ id: number; role: string; first_name: string; last_name: string }>(
    "SELECT id, role, first_name, last_name FROM users WHERE id = ?",
    targetId,
  );
  if (!target) return { error: "Utilisateur introuvable" };

  if (target.role === "admin" && role !== "admin") {
    const admins = queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM users WHERE role = 'admin'");
    if (!admins || admins.c <= 1) return { error: "Impossible de rétrograder le dernier administrateur" };
  }

  run("UPDATE users SET role = ? WHERE id = ?", role, targetId);
  logAudit(
    actorId,
    "role",
    `Rôle de ${target.first_name} ${target.last_name} (#${targetId}) changé en « ${role} »`,
  );
  return { ok: true };
}

export interface ContentSubject {
  subject_id: number;
  name: string;
  icon: string;
  color: string;
  chapters: number;
  lessons: number;
  quizzes: number;
  papers: number;
  questions: number;
}

export function getContentOverview(): { subjects: ContentSubject[]; totals: AdminStats["content"] } {
  const subjects = query<ContentSubject>(
    `SELECT s.id AS subject_id, s.name, s.icon, s.color,
            (SELECT COUNT(*) FROM chapters c WHERE c.subject_id = s.id) AS chapters,
            (SELECT COUNT(*) FROM lessons l JOIN chapters c ON c.id = l.chapter_id WHERE c.subject_id = s.id) AS lessons,
            (SELECT COUNT(*) FROM quizzes q WHERE q.subject_id = s.id) AS quizzes,
            (SELECT COUNT(*) FROM exam_papers p WHERE p.subject_id = s.id) AS papers,
            (SELECT COUNT(*) FROM questions x JOIN quizzes q ON q.id = x.quiz_id WHERE q.subject_id = s.id) AS questions
     FROM subjects s ORDER BY s.id`,
  );

  const totals = {
    lessons: subjects.reduce((a, b) => a + b.lessons, 0),
    chapters: subjects.reduce((a, b) => a + b.chapters, 0),
    quizzes: subjects.reduce((a, b) => a + b.quizzes, 0),
    papers: subjects.reduce((a, b) => a + b.papers, 0),
    questions: queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM questions")?.c ?? 0,
  };

  return { subjects, totals };
}

export interface ForumPostRow {
  id: number;
  category_name: string;
  category_icon: string;
  category_color: string;
  author: string;
  title: string;
  content: string;
  replies: number;
  votes: number;
  created_at: string;
  relative: string;
}

export function getForumPosts(): ForumPostRow[] {
  const rows = query<Omit<ForumPostRow, "relative">>(
    `SELECT p.id, c.name AS category_name, c.icon AS category_icon, c.color AS category_color,
            u.first_name || ' ' || u.last_name AS author, p.title, p.content, p.created_at,
            (SELECT COUNT(*) FROM forum_replies r WHERE r.post_id = p.id) AS replies,
            (SELECT COUNT(*) FROM forum_votes v WHERE v.post_id = p.id) AS votes
     FROM forum_posts p
     JOIN forum_categories c ON c.id = p.category_id
     JOIN users u ON u.id = p.user_id
     ORDER BY p.created_at DESC`,
  );
  return rows.map((r) => ({ ...r, relative: relativeTime(r.created_at) }));
}

export function deleteForumPost(postId: number): { ok: true } | { error: string } {
  const post = queryOne<{ id: number }>("SELECT id FROM forum_posts WHERE id = ?", postId);
  if (!post) return { error: "Sujet introuvable" };
  run("DELETE FROM forum_posts WHERE id = ?", postId);
  return { ok: true };
}

export interface PendingCourse {
  kind: "quiz" | "paper";
  id: number;
  title: string;
  subject_name: string;
  subject_icon: string;
  subject_color: string;
  creator: string;
  question_count: number;
  category?: string;
  year?: number;
  created_at: string;
  relative: string;
}

export function getPendingCourses(): PendingCourse[] {
  const quizzes = query<{
    id: number;
    title: string;
    subject_name: string;
    subject_icon: string;
    subject_color: string;
    creator: string;
    question_count: number;
    created_at: string;
  }>(
    `SELECT q.id, q.title, s.name AS subject_name, s.icon AS subject_icon, s.color AS subject_color,
            u.first_name || ' ' || u.last_name AS creator, q.created_at,
            (SELECT COUNT(*) FROM questions x WHERE x.quiz_id = q.id) AS question_count
     FROM quizzes q
     JOIN subjects s ON s.id = q.subject_id
     LEFT JOIN users u ON u.id = q.created_by
     WHERE q.status = 'pending'
     ORDER BY q.created_at DESC`,
  );
  const papers = query<{
    id: number;
    title: string;
    subject_name: string;
    subject_icon: string;
    subject_color: string;
    creator: string;
    question_count: number;
    category: string;
    year: number;
    created_at: string;
  }>(
    `SELECT p.id, p.title, s.name AS subject_name, s.icon AS subject_icon, s.color AS subject_color,
            u.first_name || ' ' || u.last_name AS creator, p.created_at,
            (SELECT COUNT(*) FROM questions x WHERE x.paper_id = p.id) AS question_count,
            p.category, p.year
     FROM exam_papers p
     JOIN subjects s ON s.id = p.subject_id
     LEFT JOIN users u ON u.id = p.created_by
     WHERE p.status = 'pending'
     ORDER BY p.created_at DESC`,
  );

  const items: PendingCourse[] = [
    ...quizzes.map((q) => ({ ...q, kind: "quiz" as const, relative: relativeTime(q.created_at) })),
    ...papers.map((p) => ({ ...p, kind: "paper" as const, relative: relativeTime(p.created_at) })),
  ];
  return items.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}

export function setCourseStatus(
  kind: string,
  id: number,
  status: string,
  actorId: number | null = null,
): { ok: true } | { error: string } {
  if (kind !== "quiz" && kind !== "paper") return { error: "Type de contenu invalide" };
  if (status !== "approved" && status !== "rejected") return { error: "Statut invalide" };
  const table = kind === "quiz" ? "quizzes" : "exam_papers";
  const row = queryOne<{ id: number; created_by: number | null; title: string }>(
    `SELECT id, created_by, title FROM ${table} WHERE id = ?`,
    id,
  );
  if (!row) return { error: "Contenu introuvable" };
  run(`UPDATE ${table} SET status = ? WHERE id = ?`, status, id);

  if (status === "approved" || status === "rejected") {
    const typeLabel = kind === "quiz" ? "quiz" : "sujet d'examen";
    logAudit(
      actorId,
      status === "approved" ? "approbation" : "rejet",
      `${typeLabel === "quiz" ? "Quiz" : "Sujet"} « ${row.title} » ${status === "approved" ? "approuvé" : "rejeté"}`,
    );
    if (row.created_by) {
      notify(
        row.created_by,
        status === "approved" ? "Contenu approuvé" : "Contenu rejeté",
        status === "approved"
          ? `Votre ${typeLabel} « ${row.title} » a été approuvé et est maintenant visible par les élèves.`
          : `Votre ${typeLabel} « ${row.title} » a été rejeté. Modifiez-le et soumettez-le à nouveau.`,
        status === "approved" ? "fact_check" : "cancel",
      );
    }
  }
  return { ok: true };
}

export interface TrendDay {
  date: string;
  label: string;
  registrations: number;
  quiz_attempts: number;
  exam_attempts: number;
}

export function getTrends(days = 14): TrendDay[] {
  const dayStr = (offset: number) => {
    const d = new Date(Date.now() - offset * 86400000);
    return d.toISOString().slice(0, 10);
  };
  const start = dayStr(days - 1);

  const regs = query<{ day: string; c: number }>(
    "SELECT substr(created_at, 1, 10) AS day, COUNT(*) AS c FROM users WHERE created_at >= ? GROUP BY day",
    `${start} 00:00:00`,
  );
  const quiz = query<{ day: string; c: number }>(
    "SELECT substr(completed_at, 1, 10) AS day, COUNT(*) AS c FROM quiz_attempts WHERE completed_at >= ? GROUP BY day",
    `${start} 00:00:00`,
  );
  const exam = query<{ day: string; c: number }>(
    "SELECT substr(completed_at, 1, 10) AS day, COUNT(*) AS c FROM exam_attempts WHERE completed_at >= ? GROUP BY day",
    `${start} 00:00:00`,
  );
  const regMap = new Map(regs.map((r) => [r.day, r.c]));
  const quizMap = new Map(quiz.map((r) => [r.day, r.c]));
  const examMap = new Map(exam.map((r) => [r.day, r.c]));

  return Array.from({ length: days }, (_, i) => {
    const date = dayStr(days - 1 - i);
    const d = new Date(`${date}T12:00:00Z`);
    return {
      date,
      label: d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }),
      registrations: regMap.get(date) ?? 0,
      quiz_attempts: quizMap.get(date) ?? 0,
      exam_attempts: examMap.get(date) ?? 0,
    };
  });
}

export function setUserBlocked(
  targetId: number,
  blocked: boolean,
  actorId: number,
): { ok: true } | { error: string } {
  if (targetId === actorId) return { error: "Vous ne pouvez pas bloquer votre propre compte" };
  const target = queryOne<{ id: number; role: string; first_name: string; last_name: string }>(
    "SELECT id, role, first_name, last_name FROM users WHERE id = ?",
    targetId,
  );
  if (!target) return { error: "Utilisateur introuvable" };
  if (blocked && target.role === "admin") {
    return { error: "Impossible de bloquer un administrateur" };
  }
  run("UPDATE users SET blocked = ? WHERE id = ?", blocked ? 1 : 0, targetId);
  if (blocked) run("DELETE FROM sessions WHERE user_id = ?", targetId);
  logAudit(
    actorId,
    blocked ? "blocage" : "deblocage",
    `Compte « ${target.first_name} ${target.last_name} » (#${targetId}) ${blocked ? "bloqué" : "débloqué"}`,
  );
  return { ok: true };
}

export function deleteUser(targetId: number, actorId: number): { ok: true } | { error: string } {
  if (targetId === actorId) return { error: "Vous ne pouvez pas supprimer votre propre compte" };
  const target = queryOne<{ id: number; role: string; first_name: string; last_name: string }>(
    "SELECT id, role, first_name, last_name FROM users WHERE id = ?",
    targetId,
  );
  if (!target) return { error: "Utilisateur introuvable" };
  if (target.role === "admin") {
    const admins = queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM users WHERE role = 'admin'");
    if (!admins || admins.c <= 1) return { error: "Impossible de supprimer le dernier administrateur" };
  }
  run("DELETE FROM users WHERE id = ?", targetId);
  logAudit(actorId, "suppression", `Compte « ${target.first_name} ${target.last_name} » (#${targetId}) supprimé`);
  return { ok: true };
}

export function sendNotification(
  actorId: number,
  target: number | "all",
  title: string,
  body: string,
): { ok: true; count: number } | { error: string } {
  if (!title || !title.trim()) return { error: "Titre requis" };
  if (!body || !body.trim()) return { error: "Message requis" };

  const cleanTitle = title.trim().slice(0, 80);
  const cleanBody = body.trim().slice(0, 300);

  if (target === "all") {
    const users = query<{ id: number }>("SELECT id FROM users WHERE role IN ('student', 'teacher', 'parent')");
    users.forEach((u) => notify(u.id, cleanTitle, cleanBody, "campaign"));
    logAudit(actorId, "notification", `Campagne « ${cleanTitle} » envoyée à ${users.length} utilisateurs`);
    return { ok: true, count: users.length };
  }

  const user = queryOne<{ id: number }>("SELECT id FROM users WHERE id = ?", Number(target));
  if (!user) return { error: "Utilisateur introuvable" };
  notify(user.id, cleanTitle, cleanBody, "campaign");
  logAudit(actorId, "notification", `Notification « ${cleanTitle} » envoyée à #${user.id}`);
  return { ok: true, count: 1 };
}

export interface UserBadge {
  id: number;
  name: string;
  icon: string;
  description: string;
  earned_at: string;
  relative: string;
}

export interface UserAttempt {
  id: number;
  kind: "quiz" | "exam";
  title: string;
  subject_name: string;
  subject_icon: string;
  subject_color: string;
  score: number;
  max_score: number | null;
  score_over_20: number | null;
  pct: number | null;
  duration_seconds: number;
  completed_at: string;
  relative: string;
}

export interface UserNotif {
  id: number;
  title: string;
  body: string;
  icon: string;
  read: number;
  created_at: string;
  relative: string;
}

export interface UserDetail {
  user: AdminUserRow | null;
  badges: UserBadge[];
  attempts: UserAttempt[];
  notifications: UserNotif[];
  totals: {
    quizzes: number;
    exams: number;
    forum_posts: number;
    badges: number;
    notifications_unread: number;
  };
}

export function getUserDetail(userId: number): UserDetail {
  const today = new Date().toISOString().slice(0, 10);
  const user = queryOne<AdminUserRow>(
    `SELECT u.id, u.role, u.blocked, u.email, u.phone, u.first_name, u.last_name, u.class_level,
            s.name AS serie_name, u.xp, u.streak, u.last_active, u.created_at,
            (SELECT COUNT(*) FROM quiz_attempts a WHERE a.user_id = u.id) AS quiz_attempts,
            (SELECT COUNT(*) FROM exam_attempts a WHERE a.user_id = u.id) AS exam_attempts,
            (SELECT COUNT(*) FROM forum_posts p WHERE p.user_id = u.id) AS forum_posts
     FROM users u LEFT JOIN series s ON s.id = u.serie_id
     WHERE u.id = ?`,
    userId,
  );

  const badges = query<UserBadge>(
    `SELECT b.id, b.name, b.icon, b.description, ub.earned_at
     FROM user_badges ub JOIN badges b ON b.id = ub.badge_id
     WHERE ub.user_id = ? ORDER BY ub.earned_at DESC`,
    userId,
  ).map((b) => ({ ...b, relative: relativeTime(b.earned_at) }));

  const quiz = query<{
    id: number;
    title: string;
    subject_name: string;
    subject_icon: string;
    subject_color: string;
    score: number;
    max_score: number;
    completed_at: string;
  }>(
    `SELECT a.id, q.title, COALESCE(s.name, 'Quiz') AS subject_name, COALESCE(s.icon, 'quiz') AS subject_icon,
            COALESCE(s.color, '#0047ab') AS subject_color, a.score, a.max_score, a.completed_at
     FROM quiz_attempts a JOIN quizzes q ON q.id = a.quiz_id
     LEFT JOIN subjects s ON s.id = q.subject_id
     WHERE a.user_id = ? ORDER BY a.completed_at DESC LIMIT 40`,
    userId,
  );
  const exam = query<{
    id: number;
    title: string;
    subject_name: string;
    subject_icon: string;
    subject_color: string;
    score_over_20: number;
    duration_seconds: number;
    completed_at: string;
  }>(
    `SELECT a.id, p.title, COALESCE(s.name, 'Examen') AS subject_name, COALESCE(s.icon, 'school') AS subject_icon,
            COALESCE(s.color, '#7c3aed') AS subject_color, a.score_over_20, a.duration_seconds, a.completed_at
     FROM exam_attempts a JOIN exam_papers p ON p.id = a.paper_id
     LEFT JOIN subjects s ON s.id = p.subject_id
     WHERE a.user_id = ? ORDER BY a.completed_at DESC LIMIT 40`,
    userId,
  );

  const attempts: UserAttempt[] = [
    ...quiz.map((a) => ({
      id: a.id,
      kind: "quiz" as const,
      title: a.title,
      subject_name: a.subject_name,
      subject_icon: a.subject_icon,
      subject_color: a.subject_color,
      score: a.score,
      max_score: a.max_score,
      score_over_20: null,
      pct: a.max_score > 0 ? Math.round((a.score * 100) / a.max_score) : null,
      duration_seconds: 0,
      completed_at: a.completed_at,
      relative: relativeTime(a.completed_at),
    })),
    ...exam.map((a) => ({
      id: a.id,
      kind: "exam" as const,
      title: a.title,
      subject_name: a.subject_name,
      subject_icon: a.subject_icon,
      subject_color: a.subject_color,
      score: 0,
      max_score: null,
      score_over_20: a.score_over_20,
      pct: Math.round((a.score_over_20 / 20) * 100),
      duration_seconds: a.duration_seconds,
      completed_at: a.completed_at,
      relative: relativeTime(a.completed_at),
    })),
  ].sort((a, b) => (a.completed_at < b.completed_at ? 1 : -1));

  const notifications = query<UserNotif>(
    `SELECT id, title, body, icon, read, created_at FROM notifications
     WHERE user_id = ? ORDER BY created_at DESC LIMIT 40`,
    userId,
  ).map((n) => ({ ...n, relative: relativeTime(n.created_at) }));

  const totals = {
    quizzes: queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM quiz_attempts WHERE user_id = ?", userId)?.c ?? 0,
    exams: queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM exam_attempts WHERE user_id = ?", userId)?.c ?? 0,
    forum_posts: user?.forum_posts ?? 0,
    badges: badges.length,
    notifications_unread: queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM notifications WHERE user_id = ? AND read = 0", userId)?.c ?? 0,
  };

  return { user: user ? { ...user, online: !!user.last_active && user.last_active.slice(0, 10) === today } : null, badges, attempts, notifications, totals };
}

export function resetUserPassword(
  targetId: number,
  newPassword: string,
  actorId: number,
): { ok: true } | { error: string } {
  if (!newPassword || newPassword.length < 6) {
    return { error: "Le mot de passe doit contenir au moins 6 caractères" };
  }
  if (targetId === actorId) return { error: "Vous ne pouvez pas réinitialiser votre propre mot de passe" };
  const target = queryOne<{ id: number; first_name: string; last_name: string }>(
    "SELECT id, first_name, last_name FROM users WHERE id = ?",
    targetId,
  );
  if (!target) return { error: "Utilisateur introuvable" };
  run("UPDATE users SET password_hash = ? WHERE id = ?", hashPassword(newPassword), targetId);
  run("DELETE FROM sessions WHERE user_id = ?", targetId);
  logAudit(actorId, "mot_de_passe", `Mot de passe de « ${target.first_name} ${target.last_name} » (#${targetId}) réinitialisé`);
  return { ok: true };
}

export interface ReferrerRow {
  user_id: number;
  name: string;
  referral_code: string;
  count: number;
  active_week: number;
  xp: number;
}

export interface ReferredRow {
  user_id: number;
  name: string;
  email: string | null;
  class_level: string | null;
  referrer_name: string;
  referrer_code: string;
  created_at: string;
  relative: string;
  online: boolean;
  last_active: string | null;
}

export function getReferralStats(): {
  totals: { referrers: number; referred: number; active_week: number };
  top: ReferrerRow[];
  list: ReferredRow[];
} {
  const today = new Date().toISOString().slice(0, 10);
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);

  const top = query<ReferrerRow>(
    `SELECT r.id AS user_id, r.first_name || ' ' || r.last_name AS name, r.referral_code,
            COUNT(u.id) AS count,
            SUM(CASE WHEN u.last_active >= ? THEN 1 ELSE 0 END) AS active_week,
            r.xp
     FROM users r JOIN users u ON u.referred_by = r.id
     WHERE r.referral_code IS NOT NULL
     GROUP BY r.id
     ORDER BY count DESC LIMIT 10`,
    weekAgo,
  );

  const list = query<ReferredRow>(
    `SELECT u.id AS user_id, u.first_name || ' ' || u.last_name AS name, u.email, u.class_level,
            r.first_name || ' ' || r.last_name AS referrer_name, r.referral_code,
            u.created_at, u.last_active
     FROM users u JOIN users r ON r.id = u.referred_by
     ORDER BY u.id`,
  ).map((u) => ({
    ...u,
    relative: relativeTime(u.created_at),
    online: !!u.last_active && u.last_active.slice(0, 10) === today,
  }));

  return {
    totals: {
      referrers: queryOne<{ c: number }>(
        "SELECT COUNT(DISTINCT referred_by) AS c FROM users WHERE referred_by IS NOT NULL",
      )?.c ?? 0,
      referred: list.length,
      active_week: list.filter((u) => u.last_active && u.last_active.slice(0, 10) >= weekAgo).length,
    },
    top,
    list,
  };
}

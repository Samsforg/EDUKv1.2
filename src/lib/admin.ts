import { query, queryOne, run } from "./db";
import { notify } from "./session";
import { hashPassword } from "./auth";
import { logAudit } from "./audit";
import { getAdminChallenges, getAdminLeagueChallenges } from "./admin-content";

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

export async function getAdminStats(): Promise<AdminStats> {
  const roles = await query<{ role: string; c: number }>("SELECT role, COUNT(*) AS c FROM users GROUP BY role");
  const count = (role: string) => roles.find((r) => r.role === role)?.c ?? 0;
  const today = new Date().toISOString().slice(0, 10);

  const online_today =
    (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM users WHERE last_active >= ?", today))?.c ?? 0;

  const new_week =
    (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM users WHERE created_at >= datetime('now', '-7 days')"))?.c ?? 0;

  const content = {
    lessons: (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM lessons"))?.c ?? 0,
    chapters: (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM chapters"))?.c ?? 0,
    quizzes: (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM quizzes"))?.c ?? 0,
    papers: (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM exam_papers"))?.c ?? 0,
    questions: (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM questions"))?.c ?? 0,
  };

  const attempts = {
    quiz: (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM quiz_attempts"))?.c ?? 0,
    exam: (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM exam_attempts"))?.c ?? 0,
  };

  const engagement = {
    avg_quiz_percent:
      (await queryOne<{ v: number | null }>("SELECT ROUND(AVG(score * 100.0 / max_score)) AS v FROM quiz_attempts"))?.v ?? null,
    avg_exam_over_20:
      (await queryOne<{ v: number | null }>("SELECT ROUND(AVG(score_over_20), 1) AS v FROM exam_attempts"))?.v ?? null,
    total_xp: (await queryOne<{ v: number }>("SELECT COALESCE(SUM(xp), 0) AS v FROM users"))?.v ?? 0,
  };

  const forum = {
    posts: (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM forum_posts"))?.c ?? 0,
    replies: (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM forum_replies"))?.c ?? 0,
  };

  const parent_links = (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM parent_child"))?.c ?? 0;

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

export async function getActivityFeed(limit = 10): Promise<ActivityItem[]> {
  const quiz = await query<{
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

  const exam = await query<{
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

  const forum = await query<{
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

export async function getSubjectStats(): Promise<SubjectStats[]> {
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
  serie_id: number | null;
  serie_name: string | null;
  gender: string | null;
  commune: string | null;
  xp: number;
  streak: number;
  last_active: string | null;
  online: boolean;
  created_at: string;
  quiz_attempts: number;
  exam_attempts: number;
  forum_posts: number;
}

export async function getAdminUsers(): Promise<AdminUserRow[]> {
  const today = new Date().toISOString().slice(0, 10);
  const rows = await query<Omit<AdminUserRow, "online">>(
    `SELECT u.id, u.role, u.blocked, u.email, u.phone, u.first_name, u.last_name, u.class_level,
            u.serie_id, s.name AS serie_name, u.gender, u.commune, u.xp, u.streak, u.last_active, u.created_at,
            (SELECT COUNT(*) FROM quiz_attempts a WHERE a.user_id = u.id) AS quiz_attempts,
            (SELECT COUNT(*) FROM exam_attempts a WHERE a.user_id = u.id) AS exam_attempts,
            (SELECT COUNT(*) FROM forum_posts p WHERE p.user_id = u.id) AS forum_posts
     FROM users u LEFT JOIN series s ON s.id = u.serie_id
     ORDER BY u.id`,
  );
  return rows.map((u) => ({ ...u, online: !!u.last_active && u.last_active.slice(0, 10) === today }));
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

export async function getAdminUsersPage(filters: UserListFilters = {}): Promise<UserListResult> {
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
    (await queryOne<{ c: number }>(`SELECT COUNT(*) AS c FROM users u ${whereSql}`, ...params))?.c ?? 0;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, filters.page ?? 1), pages);

  const rows = await query<Omit<AdminUserRow, "online">>(
    `SELECT u.id, u.role, u.blocked, u.email, u.phone, u.first_name, u.last_name, u.class_level,
            u.serie_id, s.name AS serie_name, u.gender, u.commune, u.xp, u.streak, u.last_active, u.created_at,
            (SELECT COUNT(*) FROM quiz_attempts a WHERE a.user_id = u.id) AS quiz_attempts,
            (SELECT COUNT(*) FROM exam_attempts a WHERE a.user_id = u.id) AS exam_attempts,
            (SELECT COUNT(*) FROM forum_posts p WHERE p.user_id = u.id) AS forum_posts
     FROM users u LEFT JOIN series s ON s.id = u.serie_id
     ${whereSql}
     ORDER BY u.id LIMIT ? OFFSET ?`,
    ...params,
    pageSize,
    (page - 1) * pageSize,
  );
  const users = rows.map((u) => ({ ...u, online: !!u.last_active && u.last_active.slice(0, 10) === today }));

  return { users, total, page, pages, pageSize };
}

export async function changeUserRole(
  targetId: number,
  role: string,
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  if (!ROLES.includes(role as AdminRole)) return { error: "Rôle invalide" };
  if (targetId === actorId) return { error: "Vous ne pouvez pas modifier votre propre rôle" };

  const target = await queryOne<{ id: number; role: string; first_name: string; last_name: string }>(
    "SELECT id, role, first_name, last_name FROM users WHERE id = ?",
    targetId,
  );
  if (!target) return { error: "Utilisateur introuvable" };

  if (target.role === "admin" && role !== "admin") {
    const admins = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM users WHERE role = 'admin'");
    if (!admins || admins.c <= 1) return { error: "Impossible de rétrograder le dernier administrateur" };
  }

  await run("UPDATE users SET role = ? WHERE id = ?", role, targetId);
  await logAudit(
    actorId,
    "role",
    `Rôle de ${target.first_name} ${target.last_name} (#${targetId}) changé en « ${role} »`,
  );
  return { ok: true };
}

export async function updateUser(
  targetId: number,
  fields: Record<string, unknown>,
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  if (targetId === actorId) return { error: "Vous ne pouvez pas modifier votre propre compte via cette route" };

  const allowed = ["first_name", "last_name", "email", "phone", "serie_id", "class_level", "gender", "commune"] as const;
  const updates: string[] = [];
  const params: (string | number | null)[] = [];

  for (const [key, value] of Object.entries(fields)) {
    if (!allowed.includes(key as (typeof allowed)[number])) continue;
    if (key === "email" && value) {
      const exists = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ? AND id != ?", String(value), targetId);
      if (exists) return { error: "Cet email est déjà utilisé" };
    }
    if (key === "phone" && value) {
      const exists = await queryOne<{ id: number }>("SELECT id FROM users WHERE phone = ? AND id != ?", String(value), targetId);
      if (exists) return { error: "Ce numéro est déjà utilisé" };
    }
    updates.push(`${key} = ?`);
    params.push(value as string | number | null);
  }

  if (updates.length === 0) return { error: "Aucun champ valide à mettre à jour" };

  params.push(targetId);
  await run(`UPDATE users SET ${updates.join(", ")} WHERE id = ?`, ...params);

  await logAudit(
    actorId,
    "profile",
    `Profil de l'utilisateur #${targetId} mis à jour : ${Object.keys(fields).join(", ")}`,
  );
  return { ok: true };
}

export interface ContentSubject {
  subject_id: number;
  code: string;
  name: string;
  icon: string;
  color: string;
  chapters: number;
  lessons: number;
  quizzes: number;
  papers: number;
  questions: number;
}

export async function getContentOverview(): Promise<{ subjects: ContentSubject[]; totals: AdminStats["content"] }> {
  const subjects = await query<ContentSubject>(
    `SELECT s.id AS subject_id, s.code, s.name, s.icon, s.color,
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
    questions: (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM questions"))?.c ?? 0,
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

export async function getForumPosts(): Promise<ForumPostRow[]> {
  const rows = await query<Omit<ForumPostRow, "relative">>(
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

export async function deleteForumPost(postId: number): Promise<{ ok: true } | { error: string }> {
  const post = await queryOne<{ id: number }>("SELECT id FROM forum_posts WHERE id = ?", postId);
  if (!post) return { error: "Sujet introuvable" };
  await run("DELETE FROM forum_posts WHERE id = ?", postId);
  return { ok: true };
}

export interface PendingCourse {
  kind: "quiz" | "paper" | "chapter" | "lesson";
  id: number;
  title: string;
  subject_name: string;
  subject_icon: string;
  subject_color: string;
  creator: string;
  question_count: number;
  category?: string;
  year?: number;
  grade_name?: string;
  created_at: string;
  relative: string;
}

export async function getPendingCourses(): Promise<PendingCourse[]> {
  const quizzes = await query<{
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
  const papers = await query<{
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
  const chapters = await query<{
    id: number;
    title: string;
    subject_name: string;
    subject_icon: string;
    subject_color: string;
    creator: string;
    question_count: number;
    grade_name: string;
    created_at: string;
  }>(
    `SELECT c.id, c.title, s.name AS subject_name, s.icon AS subject_icon, s.color AS subject_color,
            u.first_name || ' ' || u.last_name AS creator, g.name AS grade_name, c.created_at,
            (SELECT COUNT(*) FROM lessons l WHERE l.chapter_id = c.id) AS question_count
     FROM chapters c
     JOIN subjects s ON s.id = c.subject_id
     LEFT JOIN users u ON u.id = c.created_by
     LEFT JOIN grades g ON g.id = c.grade_id
     WHERE c.status = 'pending'
     ORDER BY c.created_at DESC`,
  );
  const lessons = await query<{
    id: number;
    title: string;
    subject_name: string;
    subject_icon: string;
    subject_color: string;
    creator: string;
    question_count: number;
    grade_name: string;
    created_at: string;
  }>(
    `SELECT l.id, l.title, s.name AS subject_name, s.icon AS subject_icon, s.color AS subject_color,
            u.first_name || ' ' || u.last_name AS creator, g.name AS grade_name, l.created_at,
            (SELECT COUNT(*) FROM exercises e WHERE e.lesson_id = l.id) AS question_count
     FROM lessons l
     JOIN chapters c ON c.id = l.chapter_id
     JOIN subjects s ON s.id = c.subject_id
     LEFT JOIN users u ON u.id = l.created_by
     LEFT JOIN grades g ON g.id = c.grade_id
     WHERE l.status = 'pending'
     ORDER BY l.created_at DESC`,
  );

  const items: PendingCourse[] = [
    ...quizzes.map((q) => ({ ...q, kind: "quiz" as const, relative: relativeTime(q.created_at) })),
    ...papers.map((p) => ({ ...p, kind: "paper" as const, relative: relativeTime(p.created_at) })),
    ...chapters.map((c) => ({ ...c, kind: "chapter" as const, relative: relativeTime(c.created_at) })),
    ...lessons.map((l) => ({ ...l, kind: "lesson" as const, relative: relativeTime(l.created_at) })),
  ];
  return items.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}

export async function setCourseStatus(
  kind: string,
  id: number,
  status: string,
  actorId: number | null = null,
): Promise<{ ok: true } | { error: string }> {
  if (!["quiz", "paper", "chapter", "lesson"].includes(kind)) return { error: "Type de contenu invalide" };
  if (status !== "approved" && status !== "rejected") return { error: "Statut invalide" };
  const table = { quiz: "quizzes", paper: "exam_papers", chapter: "chapters", lesson: "lessons" }[kind as "quiz" | "paper" | "chapter" | "lesson"];
  const row = await queryOne<{ id: number; created_by: number | null; title: string }>(
    `SELECT id, created_by, title FROM ${table} WHERE id = ?`,
    id,
  );
  if (!row) return { error: "Contenu introuvable" };
  await run(`UPDATE ${table} SET status = ? WHERE id = ?`, status, id);

  if (status === "approved" || status === "rejected") {
    const typeLabel =
      kind === "quiz" ? "quiz" : kind === "paper" ? "sujet d'examen" : kind === "chapter" ? "chapitre" : "leçon";
    await logAudit(
      actorId,
      status === "approved" ? "approbation" : "rejet",
      `${typeLabel[0].toUpperCase() + typeLabel.slice(1)} « ${row.title} » ${status === "approved" ? "approuvé" : "rejeté"}`,
    );
    if (row.created_by) {
      await notify(
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

export async function getTrends(days = 14): Promise<TrendDay[]> {
  const dayStr = (offset: number) => {
    const d = new Date(Date.now() - offset * 86400000);
    return d.toISOString().slice(0, 10);
  };
  const start = dayStr(days - 1);

  const regs = await query<{ day: string; c: number }>(
    "SELECT substr(created_at, 1, 10) AS day, COUNT(*) AS c FROM users WHERE created_at >= ? GROUP BY day",
    `${start} 00:00:00`,
  );
  const quiz = await query<{ day: string; c: number }>(
    "SELECT substr(completed_at, 1, 10) AS day, COUNT(*) AS c FROM quiz_attempts WHERE completed_at >= ? GROUP BY day",
    `${start} 00:00:00`,
  );
  const exam = await query<{ day: string; c: number }>(
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

export async function setUserBlocked(
  targetId: number,
  blocked: boolean,
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  if (targetId === actorId) return { error: "Vous ne pouvez pas bloquer votre propre compte" };
  const target = await queryOne<{ id: number; role: string; first_name: string; last_name: string }>(
    "SELECT id, role, first_name, last_name FROM users WHERE id = ?",
    targetId,
  );
  if (!target) return { error: "Utilisateur introuvable" };
  if (blocked && target.role === "admin") {
    return { error: "Impossible de bloquer un administrateur" };
  }
  await run("UPDATE users SET blocked = ? WHERE id = ?", blocked ? 1 : 0, targetId);
  if (blocked) await run("DELETE FROM sessions WHERE user_id = ?", targetId);
  await logAudit(
    actorId,
    blocked ? "blocage" : "deblocage",
    `Compte « ${target.first_name} ${target.last_name} » (#${targetId}) ${blocked ? "bloqué" : "débloqué"}`,
  );
  return { ok: true };
}

export async function deleteUser(targetId: number, actorId: number): Promise<{ ok: true } | { error: string }> {
  if (targetId === actorId) return { error: "Vous ne pouvez pas supprimer votre propre compte" };
  const target = await queryOne<{ id: number; role: string; first_name: string; last_name: string }>(
    "SELECT id, role, first_name, last_name FROM users WHERE id = ?",
    targetId,
  );
  if (!target) return { error: "Utilisateur introuvable" };
  if (target.role === "admin") {
    const admins = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM users WHERE role = 'admin'");
    if (!admins || admins.c <= 1) return { error: "Impossible de supprimer le dernier administrateur" };
  }
  await run("DELETE FROM users WHERE id = ?", targetId);
  await logAudit(actorId, "suppression", `Compte « ${target.first_name} ${target.last_name} » (#${targetId}) supprimé`);
  return { ok: true };
}

export async function sendNotification(
  actorId: number,
  target: number | "all",
  title: string,
  body: string,
): Promise<{ ok: true; count: number } | { error: string }> {
  if (!title || !title.trim()) return { error: "Titre requis" };
  if (!body || !body.trim()) return { error: "Message requis" };

  const cleanTitle = title.trim().slice(0, 80);
  const cleanBody = body.trim().slice(0, 300);

  if (target === "all") {
    const users = await query<{ id: number }>("SELECT id FROM users WHERE role IN ('student', 'teacher', 'parent')");
    for (const u of users) await notify(u.id, cleanTitle, cleanBody, "campaign");
    await logAudit(actorId, "notification", `Campagne « ${cleanTitle} » envoyée à ${users.length} utilisateurs`);
    return { ok: true, count: users.length };
  }

  const user = await queryOne<{ id: number }>("SELECT id FROM users WHERE id = ?", Number(target));
  if (!user) return { error: "Utilisateur introuvable" };
  await notify(user.id, cleanTitle, cleanBody, "campaign");
  await logAudit(actorId, "notification", `Notification « ${cleanTitle} » envoyée à #${user.id}`);
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

export async function getUserDetail(userId: number): Promise<UserDetail> {
  const today = new Date().toISOString().slice(0, 10);
  const user = await queryOne<Omit<AdminUserRow, "online">>(
    `SELECT u.id, u.role, u.blocked, u.email, u.phone, u.first_name, u.last_name, u.class_level,
            u.serie_id, s.name AS serie_name, u.gender, u.commune, u.xp, u.streak, u.last_active, u.created_at,
            (SELECT COUNT(*) FROM quiz_attempts a WHERE a.user_id = u.id) AS quiz_attempts,
            (SELECT COUNT(*) FROM exam_attempts a WHERE a.user_id = u.id) AS exam_attempts,
            (SELECT COUNT(*) FROM forum_posts p WHERE p.user_id = u.id) AS forum_posts
     FROM users u LEFT JOIN series s ON s.id = u.serie_id
     WHERE u.id = ?`,
    userId,
  );

  const badges = (
    await query<UserBadge>(
      `SELECT b.id, b.name, b.icon, b.description, ub.earned_at
       FROM user_badges ub JOIN badges b ON b.id = ub.badge_id
       WHERE ub.user_id = ? ORDER BY ub.earned_at DESC`,
      userId,
    )
  ).map((b) => ({ ...b, relative: relativeTime(b.earned_at) }));

  const quiz = await query<{
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
  const exam = await query<{
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

  const notifications = (
    await query<UserNotif>(
      `SELECT id, title, body, icon, read, created_at FROM notifications
       WHERE user_id = ? ORDER BY created_at DESC LIMIT 40`,
      userId,
    )
  ).map((n) => ({ ...n, relative: relativeTime(n.created_at) }));

  const totals = {
    quizzes: (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM quiz_attempts WHERE user_id = ?", userId))?.c ?? 0,
    exams: (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM exam_attempts WHERE user_id = ?", userId))?.c ?? 0,
    forum_posts: user?.forum_posts ?? 0,
    badges: badges.length,
    notifications_unread:
      (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM notifications WHERE user_id = ? AND read = 0", userId))?.c ?? 0,
  };

  return {
    user: user ? { ...user, online: !!user.last_active && user.last_active.slice(0, 10) === today } : null,
    badges,
    attempts,
    notifications,
    totals,
  };
}

export async function resetUserPassword(
  targetId: number,
  newPassword: string,
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  if (!newPassword || newPassword.length < 6) {
    return { error: "Le mot de passe doit contenir au moins 6 caractères" };
  }
  if (targetId === actorId) return { error: "Vous ne pouvez pas réinitialiser votre propre mot de passe" };
  const target = await queryOne<{ id: number; first_name: string; last_name: string }>(
    "SELECT id, first_name, last_name FROM users WHERE id = ?",
    targetId,
  );
  if (!target) return { error: "Utilisateur introuvable" };
  await run("UPDATE users SET password_hash = ? WHERE id = ?", hashPassword(newPassword), targetId);
  await run("DELETE FROM sessions WHERE user_id = ?", targetId);
  await logAudit(actorId, "mot_de_passe", `Mot de passe de « ${target.first_name} ${target.last_name} » (#${targetId}) réinitialisé`);
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

export async function getReferralStats(): Promise<{
  totals: { referrers: number; referred: number; active_week: number };
  top: ReferrerRow[];
  list: ReferredRow[];
}> {
  const today = new Date().toISOString().slice(0, 10);
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);

  const top = await query<ReferrerRow>(
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

  const rows = await query<Omit<ReferredRow, "relative" | "online">>(
    `SELECT u.id AS user_id, u.first_name || ' ' || u.last_name AS name, u.email, u.class_level,
            r.first_name || ' ' || r.last_name AS referrer_name, r.referral_code,
            u.created_at, u.last_active
     FROM users u JOIN users r ON r.id = u.referred_by
     ORDER BY u.id`,
  );
  const list = rows.map((u) => ({
    ...u,
    relative: relativeTime(u.created_at),
    online: !!u.last_active && u.last_active.slice(0, 10) === today,
  }));

  return {
    totals: {
      referrers:
        (await queryOne<{ c: number }>(
          "SELECT COUNT(DISTINCT referred_by) AS c FROM users WHERE referred_by IS NOT NULL",
        ))?.c ?? 0,
      referred: list.length,
      active_week: list.filter((u) => u.last_active && u.last_active.slice(0, 10) >= weekAgo).length,
    },
    top,
    list,
  };
}

export async function getDefisOverview(): Promise<{
  challenges: Awaited<ReturnType<typeof getAdminChallenges>>;
  league_challenges: Awaited<ReturnType<typeof getAdminLeagueChallenges>>;
  totals: { challenges: number; league_challenges: number; active_challenges: number; upcoming_challenges: number };
}> {
  const [challenges, league_challenges] = await Promise.all([getAdminChallenges(), getAdminLeagueChallenges()]);
  return {
    challenges,
    league_challenges,
    totals: {
      challenges: challenges.length,
      league_challenges: league_challenges.length,
      active_challenges: challenges.filter((c) => c.status === "active").length,
      upcoming_challenges: challenges.filter((c) => c.status === "upcoming").length,
    },
  };
}

export const SUB_STATUSES = ["incomplete", "trial", "active", "past_due", "cancelled", "unpaid"] as const;
export type SubscriptionStatus = (typeof SUB_STATUSES)[number];

export interface SubscriptionRow {
  id: number;
  user_id: number;
  user_name: string;
  email: string;
  phone: string;
  class_level: string | null;
  plan_id: number;
  plan_name: string;
  interval: string;
  price_cents: number;
  provider: string;
  provider_subscription_id: string | null;
  status: string;
  started_at: string | null;
  end_at: string | null;
  cancel_at_period_end: number;
  created_at: string | null;
}

export interface SubscriptionListResult {
  subs: SubscriptionRow[];
  total: number;
  page: number;
  pages: number;
  pageSize: number;
  stats: {
    total: number;
    active: number;
    past_due: number;
    cancelled: number;
    expiring_30d: number;
    monthly_recurring: number;
  };
}

export async function getSubscriptionsPage(filters: {
  q?: string;
  status?: string;
  page?: number;
  pageSize?: number;
} = {}): Promise<SubscriptionListResult> {
  const q = filters.q?.trim() ?? "";
  const status = filters.status ?? "all";
  const pageSize = filters.pageSize ?? 20;
  const today = new Date().toISOString().slice(0, 10);
  const in30 = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);

  const where: string[] = [];
  const params: (string | number)[] = [];
  if (q) {
    where.push("(u.first_name LIKE ? OR u.last_name LIKE ? OR u.email LIKE ? OR u.phone LIKE ?)");
    for (let i = 0; i < 4; i++) params.push(`%${q}%`);
  }
  if (status && status !== "all") {
    where.push("s.status = ?");
    params.push(status);
  }
  const whereSql = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  const base = `
    FROM subscriptions s
    JOIN users u ON u.id = s.user_id
    JOIN subscription_plans p ON p.id = s.plan_id
  `;

  const total =
    Number((await queryOne<{ c: number }>(`SELECT COUNT(*) AS c ${base} ${whereSql}`, ...params))?.c ?? 0);
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, filters.page ?? 1), pages);

  const rows = await query<SubscriptionRow>(
    `SELECT s.id, s.user_id, s.plan_id, s.provider, s.provider_subscription_id, s.status,
            s.started_at, s.end_at, s.cancel_at_period_end, s.created_at,
            u.first_name || ' ' || u.last_name AS user_name, u.email, u.phone, u.class_level,
            p.name AS plan_name, p.interval, COALESCE(s.price_cents, p.price_cents) AS price_cents
     ${base}
     ${whereSql}
     ORDER BY s.id DESC LIMIT ? OFFSET ?`,
    ...params,
    pageSize,
    (page - 1) * pageSize,
  );
  const subs = rows.map((r) => ({ ...r }));

  const counts = await query<{ status: string; c: number }>(
    "SELECT s.status, COUNT(*) AS c FROM subscriptions s GROUP BY s.status",
  );
  const countOf = (st: string) => Number(counts.find((x) => x.status === st)?.c ?? 0);

  const expiring_30d =
    Number((await queryOne<{ c: number }>(
      `SELECT COUNT(*) AS c FROM subscriptions s WHERE s.status = 'active' AND s.end_at IS NOT NULL AND s.end_at >= ? AND s.end_at < ?`,
      `${today}T00:00:00`,
      `${in30}T23:59:59`,
    ))?.c ?? 0);

  const activePlans = await query<{ interval: string; price_cents: number }>(
    `SELECT p.interval, COALESCE(s.price_cents, p.price_cents) AS price_cents FROM subscriptions s JOIN subscription_plans p ON p.id = s.plan_id WHERE s.status = 'active'`,
  );
  const monthlyRecurring = activePlans.reduce((sum, p) => {
    const divisor = p.interval === "year" ? 12 : p.interval === "quarter" ? 3 : 1;
    return sum + Math.round(p.price_cents / divisor);
  }, 0);

  return {
    subs,
    total,
    page,
    pages,
    pageSize,
    stats: {
      total,
      active: countOf("active"),
      past_due: countOf("past_due") + countOf("unpaid"),
      cancelled: countOf("cancelled"),
      expiring_30d,
      monthly_recurring: monthlyRecurring,
    },
  };
}

export async function setSubscriptionStatus(
  subId: number,
  status: string,
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  if (!SUB_STATUSES.includes(status as SubscriptionStatus)) return { error: "Statut invalide" };

  const sub = await queryOne<{ id: number; status: string; plan_name: string; user_name: string }>(
    `SELECT s.id, s.status, p.name AS plan_name, u.first_name || ' ' || u.last_name AS user_name
     FROM subscriptions s JOIN subscription_plans p ON p.id = s.plan_id JOIN users u ON u.id = s.user_id
     WHERE s.id = ?`,
    subId,
  );
  if (!sub) return { error: "Abonnement introuvable" };

  if (status === sub.status) return { ok: true };

  const now = new Date().toISOString();
  await run("UPDATE subscriptions SET status = ?, updated_at = ? WHERE id = ?", status, now, subId);
  await logAudit(
    actorId,
    "abonnement",
    `Abonnement #${subId} (${sub.user_name}, plan « ${sub.plan_name} ») : statut « ${sub.status} » → « ${status} »`,
  );
  return { ok: true };
}

export async function extendSubscription(
  subId: number,
  days: number,
  actorId: number,
): Promise<{ ok: true; end_at: string } | { error: string }> {
  const d = Math.round(Number(days));
  if (!Number.isFinite(d) || d < 1 || d > 3650) return { error: "Durée invalide" };

  const sub = await queryOne<{ id: number; status: string; plan_name: string; user_name: string; end_at: string | null }>(
    `SELECT s.id, s.status, s.end_at, p.name AS plan_name, u.first_name || ' ' || u.last_name AS user_name
     FROM subscriptions s JOIN subscription_plans p ON p.id = s.plan_id JOIN users u ON u.id = s.user_id
     WHERE s.id = ?`,
    subId,
  );
  if (!sub) return { error: "Abonnement introuvable" };

  const base = sub.end_at && sub.end_at > new Date().toISOString() ? new Date(sub.end_at).getTime() : Date.now();
  const endAt = new Date(base + d * 86400000).toISOString();
  const now = new Date().toISOString();

  await run(
    "UPDATE subscriptions SET status = 'active', end_at = ?, updated_at = ? WHERE id = ?",
    endAt,
    now,
    subId,
  );
  await logAudit(
    actorId,
    "abonnement",
    `Abonnement #${subId} (${sub.user_name}, plan « ${sub.plan_name} ») prolongé de ${d} jours (fin : ${endAt.slice(0, 10)})`,
  );
  return { ok: true, end_at: endAt };
}

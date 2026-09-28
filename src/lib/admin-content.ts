import { query, queryOne, run } from "./db";
import { logAudit } from "./audit";

export const EXERCISE_TYPES = ["qcm", "ouvert", "calcul", "dissertation", "vrai_faux"] as const;
export type ExerciseType = (typeof EXERCISE_TYPES)[number];

export interface GradeRow {
  id: number;
  code: string;
  name: string;
  cycle: string;
  order_index: number;
}

export interface SerieRow {
  id: number;
  code: string;
  name: string;
}

export interface AdminQuestion {
  id: number;
  question: string;
  options: string[];
  answer_index: number;
  explanation: string | null;
  points: number;
  position: number;
}

export interface AdminLesson {
  id: number;
  title: string;
  summary: string;
  content_md: string;
  video_url: string;
  duration_min: number;
  difficulty: number;
  is_premium: number;
  position: number;
  status: string;
  exercises: AdminExercise[];
}

export interface AdminExercise {
  id: number;
  type: string;
  question_md: string;
  answer_md: string;
  explanation_md: string;
  difficulty: number;
  points: number;
}

export interface AdminChapter {
  id: number;
  code: string;
  title: string;
  description: string;
  grade_id: number | null;
  grade_name: string | null;
  order_index: number;
  position: number;
  status: string;
  lessons: AdminLesson[];
}

export interface AdminQuiz {
  id: number;
  title: string;
  level: string;
  status: string;
  chapter_id: number | null;
  chapter_title: string | null;
  question_count: number;
  attempts: number;
  avg_percent: number | null;
}

export interface AdminPaper {
  id: number;
  title: string;
  category: string;
  series_id: number | null;
  series_name: string | null;
  year: number;
  duration_minutes: number;
  status: string;
  question_count: number;
  attempts: number;
}

const DEFAULT_GRADES: [number, string, string, string, number][] = [
  [1, "6eme", "Sixième", "college", 1],
  [2, "5eme", "Cinquième", "college", 2],
  [3, "4eme", "Quatrième", "college", 3],
  [4, "3eme", "Troisième", "college", 4],
  [5, "2nde", "Seconde", "lycee", 5],
  [6, "1ere_s", "Première S", "lycee", 6],
  [7, "1ere_l", "Première L", "lycee", 6],
  [8, "1ere_es", "Première ES", "lycee", 6],
  [9, "term_s", "Terminale S", "lycee", 7],
  [10, "term_l", "Terminale L", "lycee", 7],
  [11, "term_es", "Terminale ES", "lycee", 7],
];

export async function ensureGrades(): Promise<GradeRow[]> {
  const existing = await query<GradeRow>("SELECT id, code, name, cycle, order_index FROM grades ORDER BY order_index, id");
  if (existing.length > 0) return existing;
  for (const [id, code, name, cycle, order] of DEFAULT_GRADES) {
    await run("INSERT INTO grades (id, code, name, cycle, order_index) VALUES (?, ?, ?, ?, ?)", id, code, name, cycle, order);
  }
  return query<GradeRow>("SELECT id, code, name, cycle, order_index FROM grades ORDER BY order_index, id");
}

export async function getGrades(): Promise<GradeRow[]> {
  return ensureGrades();
}

export async function getSeries(): Promise<SerieRow[]> {
  return query<SerieRow>("SELECT id, code, name FROM series ORDER BY id");
}

export async function getSubject(id: number): Promise<{ id: number; code: string; name: string; icon: string; color: string } | undefined> {
  return queryOne<{ id: number; code: string; name: string; icon: string; color: string }>(
    "SELECT id, code, name, icon, color FROM subjects WHERE id = ?",
    id,
  );
}

export async function getSubjects(): Promise<{ id: number; code: string; name: string; icon: string; color: string }[]> {
  return query<{ id: number; code: string; name: string; icon: string; color: string }>(
    "SELECT id, code, name, icon, color FROM subjects ORDER BY id",
  );
}

export async function createSubject(
  input: { code: string; name: string; icon?: string; color?: string },
  actorId: number,
): Promise<{ ok: true; id: number } | { error: string }> {
  const code = input.code.trim().toUpperCase();
  const name = input.name.trim();
  if (!code || !name) return { error: "Code et nom sont requis" };
  const exists = await queryOne<{ id: number }>("SELECT id FROM subjects WHERE code = ?", code);
  if (exists) return { error: "Ce code de matière existe déjà" };

  const result = await run(
    "INSERT INTO subjects (code, name, icon, color) VALUES (?, ?, ?, ?)",
    code,
    name,
    input.icon?.trim() || "book",
    input.color?.trim() || "#1976d2",
  );
  const id = Number(result.lastInsertRowid);
  await logAudit(actorId, "content", `Matière « ${name} » (${code}) créée`);
  return { ok: true, id };
}

export async function updateSubject(
  id: number,
  input: { code: string; name: string; icon: string; color: string },
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ code: string; name: string }>("SELECT code, name FROM subjects WHERE id = ?", id);
  if (!row) return { error: "Matière introuvable" };

  const code = input.code.trim().toUpperCase();
  const name = input.name.trim();
  if (!code || !name) return { error: "Code et nom sont requis" };
  if (code !== row.code) {
    const exists = await queryOne<{ id: number }>("SELECT id FROM subjects WHERE code = ? AND id != ?", code, id);
    if (exists) return { error: "Ce code de matière existe déjà" };
  }

  await run(
    "UPDATE subjects SET code = ?, name = ?, icon = ?, color = ? WHERE id = ?",
    code,
    name,
    input.icon.trim() || "book",
    input.color.trim() || "#1976d2",
    id,
  );
  await logAudit(actorId, "content", `Matière « ${row.name} » modifiée`);
  return { ok: true };
}

export async function deleteSubject(id: number, actorId: number): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ name: string }>("SELECT name FROM subjects WHERE id = ?", id);
  if (!row) return { error: "Matière introuvable" };

  const papers = await query<{ id: number }>("SELECT id FROM exam_papers WHERE subject_id = ?", id);
  for (const p of papers) await run("DELETE FROM exam_papers WHERE id = ?", p.id);
  const quizzes = await query<{ id: number }>("SELECT id FROM quizzes WHERE subject_id = ?", id);
  for (const q of quizzes) await run("DELETE FROM quizzes WHERE id = ?", q.id);

  await run("DELETE FROM subjects WHERE id = ?", id);
  await logAudit(actorId, "content", `Matière « ${row.name} » supprimée (avec tout son contenu)`);
  return { ok: true };
}

export async function getChapters(subjectId: number): Promise<AdminChapter[]> {
  const chapters = await query<Omit<AdminChapter, "lessons"> & { grade_name: string | null }>(
    `SELECT c.id, c.code, c.title, c.description, c.grade_id, g.name AS grade_name, c.order_index, c.position, c.status
     FROM chapters c LEFT JOIN grades g ON g.id = c.grade_id
     WHERE c.subject_id = ? ORDER BY c.order_index, c.position, c.id`,
    subjectId,
  );
  const lessons = await query<{
    id: number;
    chapter_id: number;
    title: string;
    summary: string;
    content_md: string;
    video_url: string;
    duration_min: number;
    difficulty: number;
    is_premium: number;
    position: number;
    status: string;
  }>(
    `SELECT l.id, l.chapter_id, l.title, l.summary, l.content_md, l.video_url, l.duration_min, l.difficulty, l.is_premium, l.position, l.status
     FROM lessons l JOIN chapters c ON c.id = l.chapter_id
     WHERE c.subject_id = ? ORDER BY l.position, l.id`,
    subjectId,
  );
  const exercises = await query<AdminExercise & { lesson_id: number }>(
    `SELECT e.id, e.lesson_id, e.type, e.question_md, e.answer_md, e.explanation_md, e.difficulty, e.points
     FROM exercises e JOIN lessons l ON l.id = e.lesson_id JOIN chapters c ON c.id = l.chapter_id
     WHERE c.subject_id = ? ORDER BY e.id`,
    subjectId,
  );
  const byLesson = new Map<number, AdminExercise[]>();
  for (const ex of exercises) {
    const list = byLesson.get(ex.lesson_id) ?? [];
    list.push({ id: ex.id, type: ex.type, question_md: ex.question_md, answer_md: ex.answer_md, explanation_md: ex.explanation_md, difficulty: ex.difficulty, points: ex.points });
    byLesson.set(ex.lesson_id, list);
  }
  const byChapter = new Map<number, AdminLesson[]>();
  for (const l of lessons) {
    const lesson: AdminLesson = {
      id: l.id,
      title: l.title,
      summary: l.summary,
      content_md: l.content_md,
      video_url: l.video_url,
      duration_min: l.duration_min,
      difficulty: l.difficulty,
      is_premium: l.is_premium,
      position: l.position,
      status: l.status,
      exercises: byLesson.get(l.id) ?? [],
    };
    const list = byChapter.get(l.chapter_id) ?? [];
    list.push(lesson);
    byChapter.set(l.chapter_id, list);
  }
  return chapters.map((c) => ({ ...c, lessons: byChapter.get(c.id) ?? [] }));
}

export async function createChapter(
  subjectId: number,
  input: { grade_id: number | null; code: string; title: string; description?: string; order_index: number; position: number },
  actorId: number,
): Promise<{ ok: true; id: number } | { error: string }> {
  const subject = await queryOne<{ id: number }>("SELECT id FROM subjects WHERE id = ?", subjectId);
  if (!subject) return { error: "Matière introuvable" };
  const title = input.title.trim();
  if (!title) return { error: "Titre requis" };
  if (!input.grade_id) {
    const grades = await ensureGrades();
    if (grades.length === 0) return { error: "Aucune classe disponible, ajoutez d'abord des classes" };
    input.grade_id = grades[0].id;
  }

  const result = await run(
    "INSERT INTO chapters (subject_id, grade_id, code, title, description, order_index, position, created_by, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'approved')",
    subjectId,
    input.grade_id ?? null,
    input.code.trim() || "CH",
    title,
    input.description?.trim() ?? "",
    input.order_index ?? 0,
    input.position ?? 0,
    actorId,
  );
  const id = Number(result.lastInsertRowid);
  await logAudit(actorId, "content", `Chapitre « ${title} » créé`);
  return { ok: true, id };
}

export async function updateChapter(
  id: number,
  input: Partial<{ grade_id: number | null; code: string; title: string; description: string; order_index: number; position: number }>,
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ title: string }>("SELECT title FROM chapters WHERE id = ?", id);
  if (!row) return { error: "Chapitre introuvable" };

  const updates: string[] = [];
  const params: (string | number | null)[] = [];
  if (input.title !== undefined) {
    if (!input.title.trim()) return { error: "Titre requis" };
    updates.push("title = ?");
    params.push(input.title.trim());
  }
  if (input.code !== undefined) {
    updates.push("code = ?");
    params.push(input.code.trim());
  }
  if (input.description !== undefined) {
    updates.push("description = ?");
    params.push(input.description.trim());
  }
  if (input.grade_id !== undefined) {
    let gradeId = input.grade_id;
    if (!gradeId) {
      const grades = await ensureGrades();
      if (grades.length === 0) return { error: "Aucune classe disponible" };
      gradeId = grades[0].id;
    }
    updates.push("grade_id = ?");
    params.push(gradeId);
  }
  if (input.order_index !== undefined) {
    updates.push("order_index = ?");
    params.push(input.order_index);
  }
  if (input.position !== undefined) {
    updates.push("position = ?");
    params.push(input.position);
  }
  if (updates.length === 0) return { error: "Aucun champ à mettre à jour" };

  params.push(id);
  await run(`UPDATE chapters SET ${updates.join(", ")} WHERE id = ?`, ...params);
  await logAudit(actorId, "content", `Chapitre « ${row.title} » modifié`);
  return { ok: true };
}

export async function deleteChapter(id: number, actorId: number): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ title: string }>("SELECT title FROM chapters WHERE id = ?", id);
  if (!row) return { error: "Chapitre introuvable" };

  await run("DELETE FROM chapters WHERE id = ?", id);
  await logAudit(actorId, "content", `Chapitre « ${row.title} » supprimé (avec ses leçons)`);
  return { ok: true };
}

export async function createLesson(
  chapterId: number,
  input: { title: string; summary?: string; content_md?: string; video_url?: string; duration_min: number; difficulty: number; is_premium: number; position: number },
  actorId: number,
): Promise<{ ok: true; id: number } | { error: string }> {
  const chapter = await queryOne<{ id: number }>("SELECT id FROM chapters WHERE id = ?", chapterId);
  if (!chapter) return { error: "Chapitre introuvable" };
  const title = input.title.trim();
  if (!title) return { error: "Titre requis" };

  const result = await run(
    "INSERT INTO lessons (chapter_id, title, summary, content_md, video_url, duration_min, difficulty, is_premium, position, created_by, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'approved')",
    chapterId,
    title,
    input.summary?.trim() ?? "",
    input.content_md ?? "",
    input.video_url?.trim() ?? "",
    Math.max(1, input.duration_min ?? 15),
    Math.min(3, Math.max(1, input.difficulty ?? 1)),
    input.is_premium ? 1 : 0,
    input.position ?? 0,
    actorId,
  );
  const id = Number(result.lastInsertRowid);
  await logAudit(actorId, "content", `Leçon « ${title} » créée`);
  return { ok: true, id };
}

export async function updateLesson(
  id: number,
  input: Partial<{ title: string; summary: string; content_md: string; video_url: string; duration_min: number; difficulty: number; is_premium: number; position: number }>,
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ title: string }>("SELECT title FROM lessons WHERE id = ?", id);
  if (!row) return { error: "Leçon introuvable" };

  const updates: string[] = [];
  const params: (string | number | null)[] = [];
  if (input.title !== undefined) {
    if (!input.title.trim()) return { error: "Titre requis" };
    updates.push("title = ?");
    params.push(input.title.trim());
  }
  if (input.summary !== undefined) {
    updates.push("summary = ?");
    params.push(input.summary.trim());
  }
  if (input.content_md !== undefined) {
    updates.push("content_md = ?");
    params.push(input.content_md);
  }
  if (input.video_url !== undefined) {
    updates.push("video_url = ?");
    params.push(input.video_url.trim());
  }
  if (input.duration_min !== undefined) {
    updates.push("duration_min = ?");
    params.push(Math.max(1, input.duration_min));
  }
  if (input.difficulty !== undefined) {
    updates.push("difficulty = ?");
    params.push(Math.min(3, Math.max(1, input.difficulty)));
  }
  if (input.is_premium !== undefined) {
    updates.push("is_premium = ?");
    params.push(input.is_premium ? 1 : 0);
  }
  if (input.position !== undefined) {
    updates.push("position = ?");
    params.push(input.position);
  }
  if (updates.length === 0) return { error: "Aucun champ à mettre à jour" };

  params.push(id);
  await run(`UPDATE lessons SET ${updates.join(", ")} WHERE id = ?`, ...params);
  await logAudit(actorId, "content", `Leçon « ${row.title} » modifiée`);
  return { ok: true };
}

export async function deleteLesson(id: number, actorId: number): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ title: string }>("SELECT title FROM lessons WHERE id = ?", id);
  if (!row) return { error: "Leçon introuvable" };

  await run("DELETE FROM lessons WHERE id = ?", id);
  await logAudit(actorId, "content", `Leçon « ${row.title} » supprimée`);
  return { ok: true };
}

function validateQuestion(q: { question?: unknown; options?: unknown; answerIndex?: unknown; points?: unknown }): string | null {
  if (typeof q.question !== "string" || !q.question.trim()) return "Question vide";
  if (!Array.isArray(q.options) || q.options.length < 2) return "Au moins 2 options requises";
  if (!Number.isInteger(q.answerIndex) || (q.answerIndex as number) < 0 || (q.answerIndex as number) >= q.options.length) {
    return "Bonne réponse invalide";
  }
  return null;
}

function cleanOptions(options: unknown[]): string[] {
  return options.map((o) => String(o).trim()).filter(Boolean);
}

export async function saveQuizQuestions(
  quizId: number,
  questions: { question: string; options: string[]; answerIndex: number; explanation?: string; points?: number }[],
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  const quiz = await queryOne<{ title: string }>("SELECT title FROM quizzes WHERE id = ?", quizId);
  if (!quiz) return { error: "Quiz introuvable" };
  if (!Array.isArray(questions) || questions.length === 0) return { error: "Au moins une question requise" };

  const rows: { question: string; options: string[]; answerIndex: number; explanation: string | null; points: number }[] = [];
  for (const q of questions) {
    const err = validateQuestion(q);
    if (err) return { error: `Question « ${String(q.question).slice(0, 40)} » : ${err}` };
    const options = cleanOptions(q.options);
    if (options.length < 2) return { error: "Les options doivent être non vides" };
    rows.push({
      question: String(q.question).trim(),
      options,
      answerIndex: q.answerIndex as number,
      explanation: typeof q.explanation === "string" && q.explanation.trim() ? q.explanation.trim() : null,
      points: Math.max(1, Number(q.points) || 1),
    });
  }

  await run("DELETE FROM questions WHERE quiz_id = ?", quizId);
  for (let i = 0; i < rows.length; i++) {
    await run(
      "INSERT INTO questions (quiz_id, question, options, answer_index, explanation, points, position) VALUES (?, ?, ?, ?, ?, ?, ?)",
      quizId,
      rows[i].question,
      JSON.stringify(rows[i].options),
      rows[i].answerIndex,
      rows[i].explanation,
      rows[i].points,
      i,
    );
  }
  await logAudit(actorId, "content", `Questions du quiz « ${quiz.title} » mises à jour (${rows.length} questions)`);
  return { ok: true };
}

export async function savePaperQuestions(
  paperId: number,
  questions: { question: string; options: string[]; answerIndex: number; explanation?: string; points?: number }[],
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  const paper = await queryOne<{ title: string }>("SELECT title FROM exam_papers WHERE id = ?", paperId);
  if (!paper) return { error: "Sujet introuvable" };
  if (!Array.isArray(questions) || questions.length === 0) return { error: "Au moins une question requise" };

  const rows: { question: string; options: string[]; answerIndex: number; explanation: string | null; points: number }[] = [];
  for (const q of questions) {
    const err = validateQuestion(q);
    if (err) return { error: `Question « ${String(q.question).slice(0, 40)} » : ${err}` };
    const options = cleanOptions(q.options);
    if (options.length < 2) return { error: "Les options doivent être non vides" };
    rows.push({
      question: String(q.question).trim(),
      options,
      answerIndex: q.answerIndex as number,
      explanation: typeof q.explanation === "string" && q.explanation.trim() ? q.explanation.trim() : null,
      points: Math.max(1, Number(q.points) || 1),
    });
  }

  await run("DELETE FROM questions WHERE paper_id = ?", paperId);
  for (let i = 0; i < rows.length; i++) {
    await run(
      "INSERT INTO questions (paper_id, question, options, answer_index, explanation, points, position) VALUES (?, ?, ?, ?, ?, ?, ?)",
      paperId,
      rows[i].question,
      JSON.stringify(rows[i].options),
      rows[i].answerIndex,
      rows[i].explanation,
      rows[i].points,
      i,
    );
  }
  await logAudit(actorId, "content", `Questions du sujet « ${paper.title} » mises à jour (${rows.length} questions)`);
  return { ok: true };
}

export async function saveLessonExercises(
  lessonId: number,
  exercises: { type: string; question_md: string; answer_md: string; explanation_md?: string; difficulty: number; points: number }[],
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  const lesson = await queryOne<{ title: string }>("SELECT title FROM lessons WHERE id = ?", lessonId);
  if (!lesson) return { error: "Leçon introuvable" };

  const rows: { type: string; question_md: string; answer_md: string; explanation_md: string; difficulty: number; points: number }[] = [];
  for (const ex of exercises) {
    if (!EXERCISE_TYPES.includes(ex.type as ExerciseType)) return { error: "Type d'exercice invalide" };
    if (!ex.question_md || !ex.question_md.trim()) return { error: "Enoncé d'exercice vide" };
    if (!ex.answer_md || !ex.answer_md.trim()) return { error: "Réponse d'exercice vide" };
    rows.push({
      type: ex.type,
      question_md: ex.question_md.trim(),
      answer_md: ex.answer_md.trim(),
      explanation_md: ex.explanation_md?.trim() ?? "",
      difficulty: Math.min(3, Math.max(1, Number(ex.difficulty) || 1)),
      points: Math.max(1, Number(ex.points) || 1),
    });
  }

  await run("DELETE FROM exercises WHERE lesson_id = ?", lessonId);
  for (const r of rows) {
    await run(
      "INSERT INTO exercises (lesson_id, type, question_md, answer_md, explanation_md, difficulty, points) VALUES (?, ?, ?, ?, ?, ?, ?)",
      lessonId,
      r.type,
      r.question_md,
      r.answer_md,
      r.explanation_md,
      r.difficulty,
      r.points,
    );
  }
  await logAudit(actorId, "content", `Exercices de la leçon « ${lesson.title} » mis à jour (${rows.length} exercices)`);
  return { ok: true };
}

export async function getQuizzes(subjectId: number): Promise<AdminQuiz[]> {
  return query<AdminQuiz>(
    `SELECT q.id, q.title, q.level, q.status, q.chapter_id, c.title AS chapter_title,
            (SELECT COUNT(*) FROM questions x WHERE x.quiz_id = q.id) AS question_count,
            (SELECT COUNT(*) FROM quiz_attempts a WHERE a.quiz_id = q.id) AS attempts,
            (SELECT ROUND(AVG(a.score * 100.0 / a.max_score)) FROM quiz_attempts a WHERE a.quiz_id = q.id) AS avg_percent
     FROM quizzes q LEFT JOIN chapters c ON c.id = q.chapter_id
     WHERE q.subject_id = ? ORDER BY q.id DESC`,
    subjectId,
  );
}

export async function createQuiz(
  subjectId: number,
  input: { title: string; level: string; chapter_id: number | null },
  actorId: number,
): Promise<{ ok: true; id: number } | { error: string }> {
  const subject = await queryOne<{ id: number }>("SELECT id FROM subjects WHERE id = ?", subjectId);
  if (!subject) return { error: "Matière introuvable" };
  const title = input.title.trim();
  if (!title) return { error: "Titre requis" };

  const lastPos = await queryOne<{ p: number }>("SELECT MAX(position) AS p FROM quizzes");
  const result = await run(
    "INSERT INTO quizzes (subject_id, chapter_id, title, level, position, created_by, status) VALUES (?, ?, ?, ?, ?, ?, 'approved')",
    subjectId,
    input.chapter_id ?? null,
    title,
    input.level?.trim() || "Terminale",
    (lastPos?.p ?? 0) + 1,
    actorId,
  );
  const id = Number(result.lastInsertRowid);
  await logAudit(actorId, "content", `Quiz « ${title} » créé`);
  return { ok: true, id };
}

export async function updateQuiz(
  id: number,
  input: { title: string; level: string; chapter_id: number | null },
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ title: string }>("SELECT title FROM quizzes WHERE id = ?", id);
  if (!row) return { error: "Quiz introuvable" };
  const title = input.title.trim();
  if (!title) return { error: "Titre requis" };

  await run("UPDATE quizzes SET title = ?, level = ?, chapter_id = ? WHERE id = ?", title, input.level?.trim() || "Terminale", input.chapter_id ?? null, id);
  await logAudit(actorId, "content", `Quiz « ${row.title} » modifié`);
  return { ok: true };
}

export async function deleteQuiz(id: number, actorId: number): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ title: string }>("SELECT title FROM quizzes WHERE id = ?", id);
  if (!row) return { error: "Quiz introuvable" };

  await run("DELETE FROM quizzes WHERE id = ?", id);
  await logAudit(actorId, "content", `Quiz « ${row.title} » supprimé (avec ses questions et résultats)`);
  return { ok: true };
}

export async function getPapers(subjectId: number): Promise<AdminPaper[]> {
  return query<AdminPaper>(
    `SELECT p.id, p.title, p.category, p.series_id, s.name AS series_name, p.year, p.duration_minutes, p.status,
            (SELECT COUNT(*) FROM questions x WHERE x.paper_id = p.id) AS question_count,
            (SELECT COUNT(*) FROM exam_attempts a WHERE a.paper_id = p.id) AS attempts
     FROM exam_papers p LEFT JOIN series s ON s.id = p.series_id
     WHERE p.subject_id = ? ORDER BY p.year DESC, p.id DESC`,
    subjectId,
  );
}

export async function createPaper(
  subjectId: number,
  input: { title: string; category: string; series_id: number | null; year: number; duration_minutes: number },
  actorId: number,
): Promise<{ ok: true; id: number } | { error: string }> {
  const subject = await queryOne<{ id: number }>("SELECT id FROM subjects WHERE id = ?", subjectId);
  if (!subject) return { error: "Matière introuvable" };
  const title = input.title.trim();
  if (!title) return { error: "Titre requis" };
  if (input.category !== "BAC" && input.category !== "BEPC") return { error: "Catégorie invalide" };

  const result = await run(
    "INSERT INTO exam_papers (category, series_id, subject_id, year, title, duration_minutes, created_by, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'approved')",
    input.category,
    input.series_id ?? null,
    subjectId,
    Math.max(2000, Math.min(2100, Number(input.year) || new Date().getFullYear())),
    title,
    Math.max(10, Number(input.duration_minutes) || 120),
    actorId,
  );
  const id = Number(result.lastInsertRowid);
  await logAudit(actorId, "content", `Sujet d'examen « ${title} » créé`);
  return { ok: true, id };
}

export async function updatePaper(
  id: number,
  input: { title: string; category: string; series_id: number | null; year: number; duration_minutes: number },
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ title: string }>("SELECT title FROM exam_papers WHERE id = ?", id);
  if (!row) return { error: "Sujet introuvable" };
  const title = input.title.trim();
  if (!title) return { error: "Titre requis" };
  if (input.category !== "BAC" && input.category !== "BEPC") return { error: "Catégorie invalide" };

  await run(
    "UPDATE exam_papers SET title = ?, category = ?, series_id = ?, year = ?, duration_minutes = ? WHERE id = ?",
    title,
    input.category,
    input.series_id ?? null,
    Math.max(2000, Math.min(2100, Number(input.year) || new Date().getFullYear())),
    Math.max(10, Number(input.duration_minutes) || 120),
    id,
  );
  await logAudit(actorId, "content", `Sujet « ${row.title} » modifié`);
  return { ok: true };
}

export async function deletePaper(id: number, actorId: number): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ title: string }>("SELECT title FROM exam_papers WHERE id = ?", id);
  if (!row) return { error: "Sujet introuvable" };

  await run("DELETE FROM exam_papers WHERE id = ?", id);
  await logAudit(actorId, "content", `Sujet « ${row.title} » supprimé (avec ses questions et résultats)`);
  return { ok: true };
}

export async function getQuizQuestions(quizId: number): Promise<AdminQuestion[]> {
  return query<AdminQuestion>("SELECT id, question, options, answer_index, explanation, points, position FROM questions WHERE quiz_id = ? ORDER BY position, id", quizId).then((rows) =>
    rows.map((r) => ({ ...r, options: JSON.parse(r.options as unknown as string) as string[] })),
  );
}

export async function getPaperQuestions(paperId: number): Promise<AdminQuestion[]> {
  return query<AdminQuestion>("SELECT id, question, options, answer_index, explanation, points, position FROM questions WHERE paper_id = ? ORDER BY position, id", paperId).then((rows) =>
    rows.map((r) => ({ ...r, options: JSON.parse(r.options as unknown as string) as string[] })),
  );
}

export async function getAdminChallenges(): Promise<AdminChallenge[]> {
  return query<AdminChallenge>(
    `SELECT c.id, c.name, c.category, c.commune_a, c.commune_b, c.description, c.reward_desc, c.status, c.starts_at, c.ends_at,
            COALESCE(a.xp, 0) AS a_xp, COALESCE(a.participants, 0) AS a_participants,
            COALESCE(b.xp, 0) AS b_xp, COALESCE(b.participants, 0) AS b_participants,
            COALESCE(t.total, 0) AS total_contributions
     FROM challenges c
     LEFT JOIN (
       SELECT challenge_id, SUM(xp) AS xp, COUNT(DISTINCT user_id) AS participants
       FROM challenge_contributions WHERE side = 'a' GROUP BY challenge_id
     ) a ON a.challenge_id = c.id
     LEFT JOIN (
       SELECT challenge_id, SUM(xp) AS xp, COUNT(DISTINCT user_id) AS participants
       FROM challenge_contributions WHERE side = 'b' GROUP BY challenge_id
     ) b ON b.challenge_id = c.id
     LEFT JOIN (
       SELECT challenge_id, COUNT(*) AS total FROM challenge_contributions GROUP BY challenge_id
     ) t ON t.challenge_id = c.id
     ORDER BY CASE c.status WHEN 'active' THEN 0 WHEN 'upcoming' THEN 1 ELSE 2 END, c.ends_at`,
  );
}

export async function getAdminLeagueChallenges(): Promise<AdminLeagueChallenge[]> {
  return query<AdminLeagueChallenge>(
    `SELECT lc.id, lc.ligue,
            CASE lc.ligue
              WHEN 'bronze' THEN 'Ligue Bronze'
              WHEN 'argent' THEN 'Ligue Argent'
              WHEN 'or' THEN 'Ligue Or'
              WHEN 'diamant' THEN 'Ligue Diamant'
              WHEN 'maitre' THEN 'Ligue Maître'
            END AS ligue_name,
            lc.title, lc.icon, lc.color, lc.description, lc.goal_type, lc.goal_value,
            lc.reward_type, lc.reward_label, lc.reward_value,
            COALESCE(p.completed, 0) AS completed_count,
            COALESCE(p.attempted, 0) AS attempted_count
     FROM league_challenges lc
     LEFT JOIN (
       SELECT challenge_id,
              COUNT(*) FILTER (WHERE completed = 1) AS completed,
              COUNT(*) AS attempted
       FROM league_challenge_progress
       GROUP BY challenge_id
     ) p ON p.challenge_id = lc.id
     ORDER BY
       CASE lc.ligue WHEN 'bronze' THEN 1 WHEN 'argent' THEN 2 WHEN 'or' THEN 3 WHEN 'diamant' THEN 4 WHEN 'maitre' THEN 5 END,
       lc.id`,
  );
}

export const LIGUE_KEYS = ["bronze", "argent", "or", "diamant", "maitre"] as const;
export const CHALLENGE_CATEGORIES = ["National", "Défi de la Semaine", "Série Scientifique", "Spécial BAC", "Communal"] as const;
export const GOAL_TYPES = ["quiz_done", "quiz_perfect", "forum_replies", "xp_total"] as const;
export const REWARD_TYPES = ["xp", "badge"] as const;
export const CHALLENGE_STATUSES = ["upcoming", "active", "ended"] as const;

export interface AdminChallenge {
  id: number;
  name: string;
  category: string;
  commune_a: string;
  commune_b: string;
  description: string;
  reward_desc: string;
  status: string;
  starts_at: string;
  ends_at: string;
  a_xp: number;
  a_participants: number;
  b_xp: number;
  b_participants: number;
  total_contributions: number;
}

export interface AdminLeagueChallenge {
  id: number;
  ligue: string;
  ligue_name: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  goal_type: string;
  goal_value: number;
  reward_type: string;
  reward_label: string;
  reward_value: string;
  completed_count: number;
  attempted_count: number;
}

export async function createChallenge(
  input: { name: string; category: string; commune_a: string; commune_b: string; description: string; reward_desc: string; status: string; starts_at: string; ends_at: string },
  actorId: number,
): Promise<{ ok: true; id: number } | { error: string }> {
  const name = input.name.trim();
  if (!name) return { error: "Nom requis" };
  if (!input.commune_a.trim() || !input.commune_b.trim()) return { error: "Deux communes requises" };
  if (!CHALLENGE_STATUSES.includes(input.status as any)) return { error: "Statut invalide" };
  if (!input.starts_at || !input.ends_at) return { error: "Dates de début et fin requises" };
  const start = new Date(input.starts_at).getTime();
  const end = new Date(input.ends_at).getTime();
  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return { error: "Dates invalides (fin après début)" };

  const result = await run(
    `INSERT INTO challenges (name, category, commune_a, commune_b, description, reward_desc, status, starts_at, ends_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    name,
    input.category.trim() || "National",
    input.commune_a.trim(),
    input.commune_b.trim(),
    input.description.trim(),
    input.reward_desc.trim(),
    input.status,
    input.starts_at,
    input.ends_at,
  );
  const id = Number(result.lastInsertRowid);
  await logAudit(actorId, "content", `Défi « ${name} » créé (${input.commune_a} vs ${input.commune_b})`);
  return { ok: true, id };
}

export async function updateChallenge(
  id: number,
  input: { name: string; category: string; commune_a: string; commune_b: string; description: string; reward_desc: string; status: string; starts_at: string; ends_at: string },
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ name: string }>("SELECT name FROM challenges WHERE id = ?", id);
  if (!row) return { error: "Défi introuvable" };
  const name = input.name.trim();
  if (!name) return { error: "Nom requis" };
  if (!input.commune_a.trim() || !input.commune_b.trim()) return { error: "Deux communes requises" };
  if (!CHALLENGE_STATUSES.includes(input.status as any)) return { error: "Statut invalide" };
  if (!input.starts_at || !input.ends_at) return { error: "Dates de début et fin requises" };
  const start = new Date(input.starts_at).getTime();
  const end = new Date(input.ends_at).getTime();
  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return { error: "Dates invalides (fin après début)" };

  await run(
    `UPDATE challenges SET name = ?, category = ?, commune_a = ?, commune_b = ?, description = ?, reward_desc = ?, status = ?, starts_at = ?, ends_at = ? WHERE id = ?`,
    name,
    input.category.trim() || "National",
    input.commune_a.trim(),
    input.commune_b.trim(),
    input.description.trim(),
    input.reward_desc.trim(),
    input.status,
    input.starts_at,
    input.ends_at,
    id,
  );
  await logAudit(actorId, "content", `Défi « ${row.name} » modifié`);
  return { ok: true };
}

export async function deleteChallenge(id: number, actorId: number): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ name: string }>("SELECT name FROM challenges WHERE id = ?", id);
  if (!row) return { error: "Défi introuvable" };
  await run("DELETE FROM challenges WHERE id = ?", id);
  await logAudit(actorId, "content", `Défi « ${row.name} » supprimé (avec ses contributions)`);
  return { ok: true };
}

export async function createLeagueChallenge(
  input: { ligue: string; title: string; icon: string; color: string; description: string; goal_type: string; goal_value: number; reward_type: string; reward_label: string; reward_value: string },
  actorId: number,
): Promise<{ ok: true; id: number } | { error: string }> {
  if (!LIGUE_KEYS.includes(input.ligue as any)) return { error: "Ligue invalide" };
  const title = input.title.trim();
  if (!title) return { error: "Titre requis" };
  if (!GOAL_TYPES.includes(input.goal_type as any)) return { error: "Type d'objectif invalide" };
  if (!REWARD_TYPES.includes(input.reward_type as any)) return { error: "Type de récompense invalide" };
  const goalValue = Math.max(1, Number(input.goal_value) || 1);
  if (input.reward_type === "xp") {
    const val = Number(input.reward_value);
    if (Number.isNaN(val) || val < 1) return { error: "Valeur XP invalide (entier >= 1)" };
  }
  if (!input.reward_label.trim()) return { error: "Libellé de récompense requis" };
  if (!input.reward_value.trim()) return { error: "Valeur de récompense requise" };

  const result = await run(
    `INSERT INTO league_challenges (ligue, title, icon, color, description, goal_type, goal_value, reward_type, reward_label, reward_value)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    input.ligue,
    title,
    input.icon.trim() || "flag",
    input.color.trim() || "primary",
    input.description.trim(),
    input.goal_type,
    goalValue,
    input.reward_type,
    input.reward_label.trim(),
    input.reward_value.trim(),
  );
  const id = Number(result.lastInsertRowid);
  await logAudit(actorId, "content", `Défi de ligue « ${title} » créé (${input.ligue})`);
  return { ok: true, id };
}

export async function updateLeagueChallenge(
  id: number,
  input: { ligue: string; title: string; icon: string; color: string; description: string; goal_type: string; goal_value: number; reward_type: string; reward_label: string; reward_value: string },
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ title: string }>("SELECT title FROM league_challenges WHERE id = ?", id);
  if (!row) return { error: "Défi introuvable" };
  if (!LIGUE_KEYS.includes(input.ligue as any)) return { error: "Ligue invalide" };
  const title = input.title.trim();
  if (!title) return { error: "Titre requis" };
  if (!GOAL_TYPES.includes(input.goal_type as any)) return { error: "Type d'objectif invalide" };
  if (!REWARD_TYPES.includes(input.reward_type as any)) return { error: "Type de récompense invalide" };
  const goalValue = Math.max(1, Number(input.goal_value) || 1);
  if (input.reward_type === "xp") {
    const val = Number(input.reward_value);
    if (Number.isNaN(val) || val < 1) return { error: "Valeur XP invalide (entier >= 1)" };
  }
  if (!input.reward_label.trim()) return { error: "Libellé de récompense requis" };
  if (!input.reward_value.trim()) return { error: "Valeur de récompense requise" };

  await run(
    `UPDATE league_challenges SET ligue = ?, title = ?, icon = ?, color = ?, description = ?, goal_type = ?, goal_value = ?, reward_type = ?, reward_label = ?, reward_value = ? WHERE id = ?`,
    input.ligue,
    title,
    input.icon.trim() || "flag",
    input.color.trim() || "primary",
    input.description.trim(),
    input.goal_type,
    goalValue,
    input.reward_type,
    input.reward_label.trim(),
    input.reward_value.trim(),
    id,
  );
  await logAudit(actorId, "content", `Défi de ligue « ${row.title} » modifié`);
  return { ok: true };
}

export async function deleteLeagueChallenge(id: number, actorId: number): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ title: string }>("SELECT title FROM league_challenges WHERE id = ?", id);
  if (!row) return { error: "Défi introuvable" };
  await run("DELETE FROM league_challenges WHERE id = ?", id);
  await logAudit(actorId, "content", `Défi de ligue « ${row.title} » supprimé`);
  return { ok: true };
}

// ============================================
// CURRICULUM (programme officiel grade x subject)
// ============================================

export interface CurriculumRow {
  id: number;
  grade_id: number;
  grade_name: string;
  grade_code: string;
  subject_id: number;
  subject_name: string;
  subject_code: string;
  official_ref: string | null;
  year: number | null;
  status: string;
  created_at: string;
}

export async function getCurricula(filters?: { grade_id?: number; subject_id?: number; status?: string }): Promise<CurriculumRow[]> {
  const where: string[] = [];
  const params: (string | number)[] = [];
  if (filters?.grade_id) { where.push("c.grade_id = ?"); params.push(filters.grade_id); }
  if (filters?.subject_id) { where.push("c.subject_id = ?"); params.push(filters.subject_id); }
  if (filters?.status) { where.push("c.status = ?"); params.push(filters.status); }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  return query<CurriculumRow>(
    `SELECT c.id, c.grade_id, g.name AS grade_name, g.code AS grade_code,
            c.subject_id, s.name AS subject_name, s.code AS subject_code,
            c.official_ref, c.year, c.status, c.created_at
     FROM curricula c
     JOIN grades g ON g.id = c.grade_id
     JOIN subjects s ON s.id = c.subject_id
     ${whereSql}
     ORDER BY g.order_index, s.id, c.year DESC`,
    ...params,
  );
}

export async function createCurriculum(
  input: { grade_id: number; subject_id: number; official_ref?: string; year?: number; status?: string },
  actorId: number,
): Promise<{ ok: true; id: number } | { error: string }> {
  if (!input.grade_id || !input.subject_id) return { error: "grade_id et subject_id requis" };
  const exists = await queryOne<{ id: number }>("SELECT id FROM curricula WHERE grade_id = ? AND subject_id = ? AND year = ?",
    input.grade_id, input.subject_id, input.year ?? new Date().getFullYear());
  if (exists) return { error: "Ce curriculum existe déjà pour cette année" };
  const year = input.year ?? new Date().getFullYear();
  const status = input.status ?? "active";
  const result = await run(
    "INSERT INTO curricula (grade_id, subject_id, official_ref, year, status) VALUES (?, ?, ?, ?, ?)",
    input.grade_id, input.subject_id, input.official_ref?.trim() ?? null, year, status,
  );
  await logAudit(actorId, "content", `Curriculum créé (grade=${input.grade_id}, subject=${input.subject_id}, year=${year})`);
  return { ok: true, id: Number(result.lastInsertRowid) };
}

export async function updateCurriculum(
  id: number,
  input: { grade_id?: number; subject_id?: number; official_ref?: string; year?: number; status?: string },
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ id: number }>("SELECT id FROM curricula WHERE id = ?", id);
  if (!row) return { error: "Curriculum introuvable" };
  const updates: string[] = [];
  const params: (string | number | null)[] = [];
  if (input.grade_id !== undefined) { updates.push("grade_id = ?"); params.push(input.grade_id); }
  if (input.subject_id !== undefined) { updates.push("subject_id = ?"); params.push(input.subject_id); }
  if (input.official_ref !== undefined) { updates.push("official_ref = ?"); params.push(input.official_ref?.trim() ?? null); }
  if (input.year !== undefined) { updates.push("year = ?"); params.push(input.year); }
  if (input.status !== undefined) { updates.push("status = ?"); params.push(input.status); }
  if (updates.length === 0) return { error: "Aucun champ à mettre à jour" };
  params.push(id);
  await run(`UPDATE curricula SET ${updates.join(", ")} WHERE id = ?`, ...params);
  await logAudit(actorId, "content", `Curriculum #${id} modifié`);
  return { ok: true };
}

export async function deleteCurriculum(id: number, actorId: number): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ id: number }>("SELECT id FROM curricula WHERE id = ?", id);
  if (!row) return { error: "Curriculum introuvable" };
  await run("DELETE FROM curricula WHERE id = ?", id);
  await logAudit(actorId, "content", `Curriculum #${id} supprimé`);
  return { ok: true };
}

// ============================================
// SUBJECT_GRADE (coefficients normalisés)
// ============================================

export interface SubjectGradeRow {
  subject_id: number;
  subject_name: string;
  subject_code: string;
  grade_id: number;
  grade_name: string;
  grade_code: string;
  coefficient: number;
}

export async function getSubjectGrades(filters?: { subject_id?: number; grade_id?: number }): Promise<SubjectGradeRow[]> {
  const where: string[] = [];
  const params: (string | number)[] = [];
  if (filters?.subject_id) { where.push("sg.subject_id = ?"); params.push(filters.subject_id); }
  if (filters?.grade_id) { where.push("sg.grade_id = ?"); params.push(filters.grade_id); }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  return query<SubjectGradeRow>(
    `SELECT sg.subject_id, s.name AS subject_name, s.code AS subject_code,
            sg.grade_id, g.name AS grade_name, g.code AS grade_code,
            sg.coefficient
     FROM subject_grades sg
     JOIN subjects s ON s.id = sg.subject_id
     JOIN grades g ON g.id = sg.grade_id
     ${whereSql}
     ORDER BY g.order_index, s.id`,
    ...params,
  );
}

export async function upsertSubjectGrade(
  input: { subject_id: number; grade_id: number; coefficient: number },
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  if (!input.subject_id || !input.grade_id || input.coefficient === undefined) return { error: "subject_id, grade_id, coefficient requis" };
  const coeff = Math.max(0, Number(input.coefficient) || 0);
  await run(
    "INSERT INTO subject_grades (subject_id, grade_id, coefficient) VALUES (?, ?, ?) ON CONFLICT(subject_id, grade_id) DO UPDATE SET coefficient = excluded.coefficient",
    input.subject_id, input.grade_id, coeff,
  );
  await logAudit(actorId, "content", `Coefficient mis à jour (subject=${input.subject_id}, grade=${input.grade_id}, coeff=${coeff})`);
  return { ok: true };
}

export async function deleteSubjectGrade(subject_id: number, grade_id: number, actorId: number): Promise<{ ok: true } | { error: string }> {
  await run("DELETE FROM subject_grades WHERE subject_id = ? AND grade_id = ?", subject_id, grade_id);
  await logAudit(actorId, "content", `Coefficient supprimé (subject=${subject_id}, grade=${grade_id})`);
  return { ok: true };
}

// ============================================
// CONTENT_VERSIONS (versioning chapters/lessons)
// ============================================

export interface ContentVersionRow {
  id: number;
  entity_type: string;
  entity_id: number;
  payload_json: string;
  created_by: number;
  creator_name: string;
  created_at: string;
}

export async function getContentVersions(entityType: string, entityId: number): Promise<ContentVersionRow[]> {
  return query<ContentVersionRow>(
    `SELECT cv.id, cv.entity_type, cv.entity_id, cv.payload_json, cv.created_by,
            u.first_name || ' ' || u.last_name AS creator_name, cv.created_at
     FROM content_versions cv
     JOIN users u ON u.id = cv.created_by
     WHERE cv.entity_type = ? AND cv.entity_id = ?
     ORDER BY cv.created_at DESC`,
    entityType, entityId,
  );
}

export async function createContentVersion(
  entityType: string,
  entityId: number,
  payload: Record<string, unknown>,
  actorId: number,
): Promise<{ ok: true; id: number } | { error: string }> {
  if (!["chapter", "lesson", "quiz", "exam_paper"].includes(entityType)) return { error: "Type d'entité invalide" };
  const result = await run(
    "INSERT INTO content_versions (entity_type, entity_id, payload_json, created_by) VALUES (?, ?, ?, ?)",
    entityType, entityId, JSON.stringify(payload), actorId,
  );
  await logAudit(actorId, "content", `Version créée (${entityType}#${entityId})`);
  return { ok: true, id: Number(result.lastInsertRowid) };
}

// ============================================
// CLASS_CHAPTERS (scheduling chapters for teacher classes)
// ============================================

export interface ClassChapterRow {
  class_id: number;
  class_name: string;
  chapter_id: number;
  chapter_title: string;
  chapter_code: string;
  subject_name: string;
  grade_name: string;
  scheduled_at: string | null;
  status: string;
}

export async function getClassChapters(classId: number): Promise<ClassChapterRow[]> {
  return query<ClassChapterRow>(
    `SELECT cc.class_id, cl.name AS class_name,
            cc.chapter_id, c.title AS chapter_title, c.code AS chapter_code,
            s.name AS subject_name, g.name AS grade_name,
            cc.scheduled_at, cc.status
     FROM class_chapters cc
     JOIN classes cl ON cl.id = cc.class_id
     JOIN chapters c ON c.id = cc.chapter_id
     JOIN subjects s ON s.id = c.subject_id
     JOIN grades g ON g.id = c.grade_id
     WHERE cc.class_id = ?
     ORDER BY cc.scheduled_at, c.order_index`,
    classId,
  );
}

export async function upsertClassChapter(
  input: { class_id: number; chapter_id: number; scheduled_at?: string; status?: string },
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  if (!input.class_id || !input.chapter_id) return { error: "class_id et chapter_id requis" };
  const status = input.status ?? "planned";
  await run(
    `INSERT INTO class_chapters (class_id, chapter_id, scheduled_at, status)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(class_id, chapter_id) DO UPDATE SET scheduled_at = excluded.scheduled_at, status = excluded.status`,
    input.class_id, input.chapter_id, input.scheduled_at?.trim() ?? null, status,
  );
  await logAudit(actorId, "content", `Chapitre planifié pour classe (class=${input.class_id}, chapter=${input.chapter_id}, status=${status})`);
  return { ok: true };
}

export async function deleteClassChapter(class_id: number, chapter_id: number, actorId: number): Promise<{ ok: true } | { error: string }> {
  await run("DELETE FROM class_chapters WHERE class_id = ? AND chapter_id = ?", class_id, chapter_id);
  await logAudit(actorId, "content", `Chapitre retiré de la classe (class=${class_id}, chapter=${chapter_id})`);
  return { ok: true };
}

// ============================================
// REORDER HELPERS
// ============================================

export async function reorderEntities(
  entityType: "chapter" | "lesson",
  orderedIds: number[],
  actorId: number,
): Promise<{ ok: true } | { error: string }> {
  if (!orderedIds.length) return { error: "Liste vide" };
  const table = entityType === "chapter" ? "chapters" : "lessons";
  const column = entityType === "chapter" ? "order_index" : "position";
  for (let i = 0; i < orderedIds.length; i++) {
    await run(`UPDATE ${table} SET ${column} = ? WHERE id = ?`, i + 1, orderedIds[i]);
  }
  await logAudit(actorId, "content", `Réordonnancement ${entityType}s (${orderedIds.length} éléments)`);
  return { ok: true };
}

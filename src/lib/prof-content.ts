import { query, queryOne, run } from "./db";
import { EXERCISE_TYPES, type ExerciseType } from "./admin-content";

export interface ProfChapter {
  id: number;
  subject_id: number;
  subject_code: string;
  subject_name: string;
  subject_icon: string;
  subject_color: string;
  grade_id: number | null;
  grade_name: string | null;
  code: string;
  title: string;
  description: string;
  order_index: number;
  status: string;
  lesson_count: number;
  created_at: string;
}

export interface ProfLesson {
  id: number;
  chapter_id: number;
  chapter_title: string;
  subject_id: number;
  subject_code: string;
  subject_name: string;
  subject_icon: string;
  subject_color: string;
  grade_name: string | null;
  title: string;
  summary: string;
  content_md: string;
  video_url: string;
  duration_min: number;
  difficulty: number;
  is_premium: number;
  position: number;
  status: string;
  exercise_count: number;
  created_at: string;
}

export interface ProfExercise {
  id: number;
  type: string;
  question_md: string;
  answer_md: string;
  explanation_md: string;
  difficulty: number;
  points: number;
}

export async function getProfChapters(teacherId: number): Promise<ProfChapter[]> {
  return query<ProfChapter>(
    `SELECT c.id, c.subject_id, s.code AS subject_code, s.name AS subject_name, s.icon AS subject_icon,
            s.color AS subject_color, c.grade_id, g.name AS grade_name, c.code, c.title, c.description,
            c.order_index, c.status, c.created_at,
            (SELECT COUNT(*) FROM lessons l WHERE l.chapter_id = c.id) AS lesson_count
     FROM chapters c
     JOIN subjects s ON s.id = c.subject_id
     LEFT JOIN grades g ON g.id = c.grade_id
     WHERE c.created_by = ?
     ORDER BY c.id DESC`,
    teacherId,
  );
}

export async function getSelectableProfChapters(teacherId: number): Promise<ProfChapter[]> {
  return query<ProfChapter>(
    `SELECT c.id, c.subject_id, s.code AS subject_code, s.name AS subject_name, s.icon AS subject_icon,
            s.color AS subject_color, c.grade_id, g.name AS grade_name, c.code, c.title, c.description,
            c.order_index, c.status, c.created_at,
            (SELECT COUNT(*) FROM lessons l WHERE l.chapter_id = c.id) AS lesson_count
     FROM chapters c
     JOIN subjects s ON s.id = c.subject_id
     LEFT JOIN grades g ON g.id = c.grade_id
     WHERE c.created_by = ? OR c.status = 'approved'
     ORDER BY s.name, c.order_index, c.id`,
    teacherId,
  );
}

export async function getProfLessons(teacherId: number): Promise<ProfLesson[]> {
  return query<ProfLesson>(
    `SELECT l.id, l.chapter_id, c.title AS chapter_title, s.id AS subject_id, s.code AS subject_code,
            s.name AS subject_name, s.icon AS subject_icon, s.color AS subject_color, g.name AS grade_name,
            l.title, l.summary, l.content_md, l.video_url, l.duration_min, l.difficulty, l.is_premium,
            l.position, l.status, l.created_at,
            (SELECT COUNT(*) FROM exercises e WHERE e.lesson_id = l.id) AS exercise_count
     FROM lessons l
     JOIN chapters c ON c.id = l.chapter_id
     JOIN subjects s ON s.id = c.subject_id
     LEFT JOIN grades g ON g.id = c.grade_id
     WHERE l.created_by = ?
     ORDER BY l.id DESC`,
    teacherId,
  );
}

export async function getProfChapter(teacherId: number, id: number): Promise<ProfChapter | undefined> {
  return queryOne<ProfChapter>(
    `SELECT c.id, c.subject_id, s.code AS subject_code, s.name AS subject_name, s.icon AS subject_icon,
            s.color AS subject_color, c.grade_id, g.name AS grade_name, c.code, c.title, c.description,
            c.order_index, c.status, c.created_at,
            (SELECT COUNT(*) FROM lessons l WHERE l.chapter_id = c.id) AS lesson_count
     FROM chapters c
     JOIN subjects s ON s.id = c.subject_id
     LEFT JOIN grades g ON g.id = c.grade_id
     WHERE c.id = ? AND c.created_by = ?`,
    id,
    teacherId,
  );
}

export async function getProfLesson(teacherId: number, id: number): Promise<ProfLesson | undefined> {
  return queryOne<ProfLesson>(
    `SELECT l.id, l.chapter_id, c.title AS chapter_title, s.id AS subject_id, s.code AS subject_code,
            s.name AS subject_name, s.icon AS subject_icon, s.color AS subject_color, g.name AS grade_name,
            l.title, l.summary, l.content_md, l.video_url, l.duration_min, l.difficulty, l.is_premium,
            l.position, l.status, l.created_at,
            (SELECT COUNT(*) FROM exercises e WHERE e.lesson_id = l.id) AS exercise_count
     FROM lessons l
     JOIN chapters c ON c.id = l.chapter_id
     JOIN subjects s ON s.id = c.subject_id
     LEFT JOIN grades g ON g.id = c.grade_id
     WHERE l.id = ? AND l.created_by = ?`,
    id,
    teacherId,
  );
}

export async function getProfLessonExercises(lessonId: number): Promise<ProfExercise[]> {
  return query<ProfExercise>(
    "SELECT id, type, question_md, answer_md, explanation_md, difficulty, points FROM exercises WHERE lesson_id = ? ORDER BY id",
    lessonId,
  );
}

export async function createProfChapter(
  teacherId: number,
  input: { subject_id: number; grade_id: number | null; code?: string; title: string; description?: string; order_index?: number },
): Promise<{ ok: true; id: number } | { error: string }> {
  const subject = await queryOne<{ id: number }>("SELECT id FROM subjects WHERE id = ?", input.subject_id);
  if (!subject) return { error: "Matière introuvable" };
  const title = input.title.trim();
  if (!title) return { error: "Titre requis" };
  if (input.grade_id) {
    const grade = await queryOne<{ id: number }>("SELECT id FROM grades WHERE id = ?", input.grade_id);
    if (!grade) return { error: "Classe introuvable" };
  }
  const gradeId = input.grade_id ?? null;

  const existing = await queryOne<{ id: number; status: string; title: string }>(
    "SELECT id, status, title FROM chapters WHERE subject_id = ? AND grade_id IS ? AND code = ?",
    input.subject_id,
    gradeId,
    input.code?.trim() || "CH",
  );
  if (existing) {
    if (existing.status === "approved") {
      return { error: "Un chapitre officiel de cette matière et de cette classe porte déjà ce code" };
    }
    if (existing.status === "pending") {
      return { error: "Un chapitre est déjà en attente de validation avec ce code" };
    }
    await run(
      "UPDATE chapters SET title = ?, description = ?, grade_id = ?, status = 'pending', created_by = ? WHERE id = ?",
      title,
      input.description?.trim() ?? "",
      gradeId,
      teacherId,
      existing.id,
    );
    return { ok: true, id: existing.id };
  }

  const conceptual = await queryOne<{ id: number }>(
    `SELECT id FROM chapters
     WHERE subject_id = ? AND grade_id IS ?
       AND (title = ? OR title LIKE '%' || ? || '%' OR ? LIKE '%' || title || '%')
     LIMIT 1`,
    input.subject_id,
    gradeId,
    title,
    title,
    title,
  );
  if (conceptual) {
    const lastOrder = await queryOne<{ m: number | null }>(
      "SELECT MAX(order_index) AS m FROM chapters WHERE subject_id = ? AND grade_id IS ?",
      input.subject_id,
      gradeId,
    );
    const order = (lastOrder?.m ?? 0) + 1;
    const result = await run(
      "INSERT INTO chapters (subject_id, grade_id, code, title, description, order_index, position, created_by, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')",
      input.subject_id,
      gradeId,
      input.code?.trim() || "CH",
      title,
      input.description?.trim() ?? "",
      order,
      order,
      teacherId,
    );
    return { ok: true, id: Number(result.lastInsertRowid) };
  }

  const lastOrder = await queryOne<{ m: number | null }>(
    "SELECT MAX(order_index) AS m FROM chapters WHERE subject_id = ? AND grade_id IS ?",
    input.subject_id,
    gradeId,
  );
  const order = input.order_index !== undefined && Number.isInteger(input.order_index)
    ? Number(input.order_index)
    : (lastOrder?.m ?? 0) + 1;

  const result = await run(
    "INSERT INTO chapters (subject_id, grade_id, code, title, description, order_index, position, created_by, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')",
    input.subject_id,
    gradeId,
    input.code?.trim() || "CH",
    title,
    input.description?.trim() ?? "",
    order,
    order,
    teacherId,
  );
  return { ok: true, id: Number(result.lastInsertRowid) };
}

export async function updateProfChapter(
  teacherId: number,
  id: number,
  input: Partial<{ grade_id: number | null; code: string; title: string; description: string; order_index: number }>,
): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ id: number; title: string }>(
    "SELECT id, title FROM chapters WHERE id = ? AND created_by = ?",
    id,
    teacherId,
  );
  if (!row) return { error: "Chapitre introuvable (ou pas le vôtre)" };

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
    const gradeId = input.grade_id ?? null;
    if (gradeId) {
      const grade = await queryOne<{ id: number }>("SELECT id FROM grades WHERE id = ?", gradeId);
      if (!grade) return { error: "Classe introuvable" };
    }
    updates.push("grade_id = ?");
    params.push(gradeId);
  }
  if (input.order_index !== undefined) {
    updates.push("order_index = ?");
    params.push(input.order_index);
  }
  if (updates.length === 0) return { error: "Aucun champ à mettre à jour" };

  updates.push("status = 'pending'");
  params.push(id);
  await run(`UPDATE chapters SET ${updates.join(", ")} WHERE id = ?`, ...params);
  return { ok: true };
}

export async function deleteProfChapter(teacherId: number, id: number): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ id: number }>("SELECT id FROM chapters WHERE id = ? AND created_by = ?", id, teacherId);
  if (!row) return { error: "Chapitre introuvable (ou pas le vôtre)" };
  await run("DELETE FROM chapters WHERE id = ?", id);
  return { ok: true };
}

export async function createProfLesson(
  teacherId: number,
  input: { chapter_id: number; title: string; summary?: string; content_md?: string; video_url?: string; duration_min?: number; difficulty?: number; is_premium?: number; position?: number },
): Promise<{ ok: true; id: number } | { error: string }> {
  const chapter = await queryOne<{ id: number; is_premium: number }>("SELECT id, is_premium FROM chapters WHERE id = ?", input.chapter_id);
  if (!chapter) return { error: "Chapitre introuvable" };
  const title = input.title.trim();
  if (!title) return { error: "Titre requis" };

  const existing = await queryOne<{ id: number; status: string }>(
    "SELECT id, status FROM lessons WHERE chapter_id = ? AND title = ?",
    input.chapter_id,
    title,
  );
  if (existing) {
    return { error: "Une leçon de ce chapitre porte déjà ce titre" };
  }

  const lastPos = await queryOne<{ p: number | null }>(
    "SELECT MAX(position) AS p FROM lessons WHERE chapter_id = ?",
    input.chapter_id,
  );
  const position = input.position !== undefined && Number.isInteger(input.position)
    ? Number(input.position)
    : (lastPos?.p ?? 0) + 1;

  const result = await run(
    "INSERT INTO lessons (chapter_id, title, summary, content_md, video_url, duration_min, difficulty, is_premium, position, created_by, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')",
    input.chapter_id,
    title,
    input.summary?.trim() ?? "",
    input.content_md ?? "",
    input.video_url?.trim() ?? "",
    Math.max(1, input.duration_min ?? 15),
    Math.min(3, Math.max(1, input.difficulty ?? 1)),
    input.is_premium !== undefined ? (input.is_premium ? 1 : 0) : chapter.is_premium,
    position,
    teacherId,
  );
  return { ok: true, id: Number(result.lastInsertRowid) };
}

export async function updateProfLesson(
  teacherId: number,
  id: number,
  input: Partial<{ title: string; summary: string; content_md: string; video_url: string; duration_min: number; difficulty: number; is_premium: number; position: number }>,
): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ id: number; title: string }>(
    "SELECT id, title FROM lessons WHERE id = ? AND created_by = ?",
    id,
    teacherId,
  );
  if (!row) return { error: "Leçon introuvable (ou pas la vôtre)" };

  const updates: string[] = [];
  const params: (string | number | null)[] = [];
  if (input.title !== undefined) {
    const newTitle = input.title.trim();
    if (!newTitle) return { error: "Titre requis" };
    if (newTitle !== row.title) {
      const clash = await queryOne<{ id: number }>(
        "SELECT id FROM lessons WHERE chapter_id = (SELECT chapter_id FROM lessons WHERE id = ?) AND title = ? AND id != ?",
        id,
        newTitle,
        id,
      );
      if (clash) return { error: "Une leçon de ce chapitre porte déjà ce titre" };
    }
    updates.push("title = ?");
    params.push(newTitle);
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

  updates.push("status = 'pending'");
  params.push(id);
  await run(`UPDATE lessons SET ${updates.join(", ")} WHERE id = ?`, ...params);
  return { ok: true };
}

export async function deleteProfLesson(teacherId: number, id: number): Promise<{ ok: true } | { error: string }> {
  const row = await queryOne<{ id: number }>("SELECT id FROM lessons WHERE id = ? AND created_by = ?", id, teacherId);
  if (!row) return { error: "Leçon introuvable (ou pas la vôtre)" };
  await run("DELETE FROM lessons WHERE id = ?", id);
  return { ok: true };
}

export async function saveProfLessonExercises(
  teacherId: number,
  lessonId: number,
  exercises: { type: string; question_md: string; answer_md: string; explanation_md?: string; difficulty: number; points: number }[],
): Promise<{ ok: true } | { error: string }> {
  const lesson = await queryOne<{ id: number; title: string }>(
    "SELECT id, title FROM lessons WHERE id = ? AND created_by = ?",
    lessonId,
    teacherId,
  );
  if (!lesson) return { error: "Leçon introuvable (ou pas la vôtre)" };

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
  await run("UPDATE lessons SET status = 'pending' WHERE id = ?", lessonId);
  return { ok: true };
}

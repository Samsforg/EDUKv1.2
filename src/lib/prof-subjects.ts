import { query, run } from "@/lib/db";

export interface ProfSubject {
  subject_id: number;
  code: string;
  name: string;
  icon: string | null;
  color: string | null;
}

export type TeachResult = "ok" | "first" | "no";

async function backfillTeacherSubjects(userId: number): Promise<void> {
  await run(
    `INSERT INTO teacher_subjects (user_id, subject_id)
     SELECT DISTINCT c.teacher_id, c.subject_id FROM classes c
     WHERE c.teacher_id = ? AND c.subject_id IS NOT NULL
     ON CONFLICT DO NOTHING`,
    userId,
  );
}

export async function getProfSubjectIds(userId: number): Promise<number[]> {
  const rows = await query<{ subject_id: number }>(
    "SELECT subject_id FROM teacher_subjects WHERE user_id = ?",
    userId,
  );
  return rows.map((r) => r.subject_id);
}

export async function getProfSubjects(userId: number, withBackfill = true): Promise<ProfSubject[]> {
  if (withBackfill) await backfillTeacherSubjects(userId);
  const rows = await query<ProfSubject & { assigned_at: string }>(
    `SELECT ts.subject_id, s.code, s.name, s.icon, s.color, ts.assigned_at
     FROM teacher_subjects ts
     JOIN subjects s ON s.id = ts.subject_id
     WHERE ts.user_id = ?
     ORDER BY s.name`,
    userId,
  );
  return rows;
}

export async function ensureProfSubject(userId: number, subjectId: number): Promise<void> {
  await run(
    "INSERT INTO teacher_subjects (user_id, subject_id) VALUES (?, ?) ON CONFLICT DO NOTHING",
    userId,
    subjectId,
  );
}

export async function canTeachSubject(userId: number, subjectId: number): Promise<TeachResult> {
  const ids = await getProfSubjectIds(userId);
  if (ids.length === 0) return "first";
  return ids.includes(subjectId) ? "ok" : "no";
}

export interface ProfGrade {
  grade_id: number;
  name: string;
}

async function backfillTeacherGrades(userId: number): Promise<void> {
  await run(
    `INSERT INTO teacher_grades (user_id, grade_id)
     SELECT DISTINCT c.teacher_id, c.grade_id FROM classes c
     WHERE c.teacher_id = ? AND c.grade_id IS NOT NULL
     ON CONFLICT DO NOTHING`,
    userId,
  );
}

export async function getProfGradeIds(userId: number): Promise<number[]> {
  const rows = await query<{ grade_id: number }>(
    "SELECT grade_id FROM teacher_grades WHERE user_id = ?",
    userId,
  );
  return rows.map((r) => r.grade_id);
}

export async function getProfGrades(userId: number, withBackfill = true): Promise<ProfGrade[]> {
  if (withBackfill) await backfillTeacherGrades(userId);
  const rows = await query<ProfGrade & { assigned_at: string }>(
    `SELECT tg.grade_id, g.name, tg.assigned_at
     FROM teacher_grades tg
     JOIN grades g ON g.id = tg.grade_id
     WHERE tg.user_id = ?
     ORDER BY g.name`,
    userId,
  );
  return rows;
}

export async function ensureProfGrade(userId: number, gradeId: number): Promise<void> {
  await run(
    "INSERT INTO teacher_grades (user_id, grade_id) VALUES (?, ?) ON CONFLICT DO NOTHING",
    userId,
    gradeId,
  );
}

export async function canTeachGrade(userId: number, gradeId: number): Promise<TeachResult> {
  const ids = await getProfGradeIds(userId);
  if (ids.length === 0) return "first";
  return ids.includes(gradeId) ? "ok" : "no";
}
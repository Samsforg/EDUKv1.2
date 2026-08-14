import { query } from "../db";

export interface RecentLesson {
  lessonId: number;
  title: string;
  chapterId: number | null;
  subjectId: number | null;
  subjectName: string | null;
}

export interface StudentMemory {
  recentLessons: RecentLesson[];
  inProgress: RecentLesson[];
  favoriteSubjectIds: number[];
  favoriteSubjectNames: string[];
}

interface LessonRow {
  lesson_id: number;
  title: string;
  chapter_id: number | null;
  subject_id: number | null;
  subject_name: string | null;
}

interface SubjectRow {
  subject_id: number;
  subject_name: string;
}

function mapLessons(rows: LessonRow[]): RecentLesson[] {
  return rows.map((r) => ({
    lessonId: r.lesson_id,
    title: r.title,
    chapterId: r.chapter_id,
    subjectId: r.subject_id,
    subjectName: r.subject_name,
  }));
}

export async function buildStudentMemory(userId: number): Promise<StudentMemory> {
  const [recent, inProgress, subjects] = await Promise.all([
    query<LessonRow>(
      `SELECT l.id AS lesson_id, l.title, l.chapter_id, c.subject_id, s.name AS subject_name
       FROM lesson_reads lr
       JOIN lessons l ON l.id = lr.lesson_id
       JOIN chapters c ON c.id = l.chapter_id
       LEFT JOIN subjects s ON s.id = c.subject_id
       WHERE lr.user_id = ?
       ORDER BY lr.read_at DESC
       LIMIT 5`,
      userId,
    ),
    query<LessonRow>(
      `SELECT l.id AS lesson_id, l.title, l.chapter_id, c.subject_id, s.name AS subject_name
       FROM user_progress up
       JOIN lessons l ON l.id = up.lesson_id
       JOIN chapters c ON c.id = l.chapter_id
       LEFT JOIN subjects s ON s.id = c.subject_id
       WHERE up.user_id = ? AND up.completed = 0
       ORDER BY up.time_spent_min DESC, up.completed_at DESC
       LIMIT 3`,
      userId,
    ),
    query<SubjectRow>(
      `SELECT c.subject_id, s.name AS subject_name, COUNT(*) AS n
       FROM lesson_reads lr
       JOIN lessons l ON l.id = lr.lesson_id
       JOIN chapters c ON c.id = l.chapter_id
       JOIN subjects s ON s.id = c.subject_id
       WHERE lr.user_id = ?
       GROUP BY c.subject_id, s.name
       ORDER BY n DESC
       LIMIT 3`,
      userId,
    ),
  ]);

  return {
    recentLessons: mapLessons(recent),
    inProgress: mapLessons(inProgress),
    favoriteSubjectIds: subjects.map((s) => s.subject_id),
    favoriteSubjectNames: subjects.map((s) => s.subject_name),
  };
}

export function buildMemoryPromptBlock(memory: StudentMemory): string {
  const parts: string[] = [];
  if (memory.recentLessons.length > 0) {
    parts.push(
      `- Dernières leçons consultées : ${memory.recentLessons
        .map((l) => `« ${l.title} »${l.subjectName ? ` (${l.subjectName})` : ""}`)
        .join(", ")}.`,
    );
  }
  if (memory.inProgress.length > 0) {
    parts.push(
      `- Leçons en cours (à renforcer) : ${memory.inProgress
        .map((l) => `« ${l.title} »${l.subjectName ? ` (${l.subjectName})` : ""}`)
        .join(", ")}.`,
    );
  }
  if (memory.favoriteSubjectNames.length > 0) {
    parts.push(`- Matières de prédilection : ${memory.favoriteSubjectNames.join(", ")}.`);
  }
  if (parts.length === 0) return "";

  return `Mémoire pédagogique de l'élève :
${parts.join("\n")}

Règles d'utilisation de cette mémoire :
- Ancre tes explications dans les leçons que l'élève a vues récemment.
- Renforce les leçons en cours avec des exemples et des exercices adaptés.
- Privilégie les matières de prédilection quand c'est pertinent.
- Ne mentionne jamais cette « mémoire » ni le mot « profil » à l'élève.`;
}

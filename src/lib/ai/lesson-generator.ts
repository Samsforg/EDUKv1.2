import { query, queryOne, run } from "@/lib/db";
import { generateWithGateway, getProviderChain } from "@/lib/ai/gateway";
import type { AIGenerateOptions } from "@/lib/ai/types";

export interface ChapterSeed {
  id: number;
  title: string;
  description: string | null;
  subject_name: string;
  grade_name: string | null;
  grade_code: string | null;
  cycle: string | null;
}

interface GeneratedLesson {
  title: string;
  summary: string;
  content_md: string;
  position: number;
  is_premium: number;
}

// Chaque appel IA est borné à 2000 caractères par le gateway : on génère
// la leçon par sections indépendantes puis on les concatène en markdown.
const SECTION_MAX = 1900;

export function isContentAIConfigured(): boolean {
  return getProviderChain().length > 0;
}

async function generateSections(course: ChapterSeed, kind: "course" | "exercises"): Promise<string> {
  const sections: string[] = [];

  const flags = kind === "course"
    ? [
        { title: "Introduction et définition", instruct: "Rédige une introduction pédagogique (2-3 phrases) et les objectifs d'apprentissage en une liste à puces. Commence par un titre de niveau 2 '## Introduction'." },
        { title: "Développement du cours", instruct: "Rédige le cœur du cours : les notions, formules (si maths/physique), définitions et points clés, organisés avec des titres de niveau 2 et des listes à puces. Solaire, conforme au programme ivoirien." },
        { title: "Exemple résolu", instruct: "Donne UN exemple concret entièrement résolu pas-à-pas pour illustrer le cours. Commence par un titre '## Exemple résolu'." },
      ]
    : [
        { title: "Exercice 1 corrigé", instruct: "Rédige un exercice d'application n°1 avec son énoncé puis son corrigé détaillé pas-à-pas (titre '## Exercice 1')."},
        { title: "Exercice 2 corrigé", instruct: "Rédige un exercice d'application n°2 avec son énoncé puis son corrigé détaillé pas-à-pas (titre '## Exercice 2')."},
        { title: "Exercice 3 corrigé", instruct: "Rédige un exercice d'approfondissement n°3 avec son énoncé puis son corrigé détaillé (titre '## Exercice 3')."},
      ];

  for (let i = 0; i < flags.length; i++) {
    const system = buildSectionSystemPrompt(course, kind, flags[i].instruct);
    const options: AIGenerateOptions = {
      messages: [
        { role: "system", content: system },
        { role: "user", content: `Chapitre : ${course.title}. Rédige la section « ${flags[i].title} ».` },
      ],
      maxTokens: 700,
      temperature: 0.6,
      timeoutMs: 60000,
    };

    const completion = await generateWithGateway(options);
    if (completion) {
      sections.push(completion.text.trim());
    }
  }

  // Si au moins une section a été générée, on retourne le début du cours.
  const markdown = sections.join("\n\n");
  if (markdown.trim().length === 0) return "";

  // Franchi la limite de caractères par section (sécurité)
  const trimmed: string[] = [];
  for (const s of sections) {
    trimmed.push(s.length > SECTION_MAX ? `${s.slice(0, SECTION_MAX).trimEnd()}\n` : s);
  }
  return trimmed.join("\n\n");
}

function buildSectionSystemPrompt(course: ChapterSeed, kind: "course" | "exercises", instruct: string): string {
  const cycle = course.cycle === "lycee" ? "lycée" : "collège";
  return [
    "Tu es Kora, enseignante experte du système éducatif ivoirien (programme officiel DPFC / MENA).",
    `Tu prépares une leçon de ${course.subject_name} pour la classe de ${course.grade_name ?? course.grade_code ?? ""} (${cycle}).`,
    `Thème du chapitre : ${course.title}${course.description ? ` — ${course.description}` : ""}.`,
    "Règles :",
    "- Rédige en français, de façon exacte, claire et adaptée au niveau de l'élève.",
    "- Utilise du Markdown : titres '##', listes '- ' et '1.', **gras** pour les mots importants.",
    "- Pas d'introduction générale du chapitre en dehors de la section demandée.",
    `Tâche : ${instruct}`,
  ].join("\n");
}

export async function chapterHasAIGeneratedLessons(chapterId: number): Promise<boolean> {
  const row = await queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM lessons WHERE chapter_id = ? AND ai_generated = 1",
    chapterId,
  );
  return Boolean(row && Number(row.c) > 0);
}

export async function loadChapterSeed(chapterId: number): Promise<ChapterSeed | null> {
  const row = await queryOne<ChapterSeed>(
    `SELECT c.id, c.title, c.description,
            COALESCE(s.name, 'Cours') AS subject_name,
            g.name AS grade_name, g.code AS grade_code, g.cycle
     FROM chapters c
     JOIN subjects s ON s.id = c.subject_id
     LEFT JOIN grades g ON g.id = c.grade_id
     WHERE c.id = ?`,
    chapterId,
  );
  return row ?? null;
}

function summarize(md: string): string {
  const clean = md
    .replace(/[#*`>_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return clean.slice(0, 140) || "Cours généré par IA";
}

export async function generateChapterLessons(
  chapterId: number,
  opts: { force?: boolean; premiumOverride?: boolean } = {},
): Promise<{ ok: boolean; created: number; reason?: string }> {
  const chapter = await loadChapterSeed(chapterId);
  if (!chapter) return { ok: false, created: 0, reason: "chapter_not_found" };

  if (!opts.force && (await chapterHasAIGeneratedLessons(chapterId))) {
    return { ok: false, created: 0, reason: "already_generated" };
  }

  if (!isContentAIConfigured()) {
    return { ok: false, created: 0, reason: "ai_not_configured" };
  }

  // 2 leçons : cours + exercices corrigés
  const premium = opts.premiumOverride === false ? 0 : 1;
  const courseMd = await generateSections(chapter, "course");
  let created = 0;
  if (courseMd.trim().length > 0) {
    await insertLesson(chapter, {
      title: `${chapter.title} : cours détaillé`,
      summary: summarize(courseMd),
      content_md: courseMd,
      position: 1,
      is_premium: premium,
    });
    created++;
  }

  const exercisesMd = await generateSections(chapter, "exercises");
  if (exercisesMd.trim().length > 0) {
    await insertLesson(chapter, {
      title: `${chapter.title} : exercices corrigés`,
      summary: summarize(exercisesMd),
      content_md: exercisesMd,
      position: 2,
      is_premium: premium,
    });
    created++;
  }

  return { ok: created > 0, created };
}

async function insertLesson(chapter: ChapterSeed, lesson: GeneratedLesson): Promise<void> {
  await run(
    `INSERT INTO lessons (chapter_id, title, summary, content_md, duration_min, difficulty, is_premium, position, created_by, status, ai_generated)
     VALUES (?, ?, ?, ?, ?, 2, ?, ?, NULL, 'approved', 1)`,
    chapter.id,
    lesson.title,
    lesson.summary,
    lesson.content_md,
    15,
    lesson.is_premium ? 1 : 0,
    lesson.position,
  );
}

export async function generateLessonsForChapters(
  chapterIds: number[],
  opts: { force?: boolean; limit?: number } = {},
): Promise<{ ok: boolean; processed: number; created: number; errors: { chapterId: number; reason: string }[] }> {
  const limit = opts.limit ?? chapterIds.length;
  const slice = chapterIds.slice(0, limit);
  const errors: { chapterId: number; reason: string }[] = [];
  let created = 0;

  for (const cid of slice) {
    try {
      const res = await generateChapterLessons(cid, opts);
      if (res.ok) created += res.created;
      else if (res.reason) errors.push({ chapterId: cid, reason: res.reason });
    } catch (err) {
      errors.push({ chapterId: cid, reason: err instanceof Error ? err.message : String(err) });
    }
  }

  return { ok: errors.length === 0, processed: slice.length, created, errors };
}

import { buildTutorSystemPrompt } from "./ai/prompts";
import { generateWithGateway, getProviderChain } from "./ai/gateway";
import { buildTutorRAGContext } from "./ai/rag";
import { buildMemoryPromptBlock, buildStudentMemory } from "./ai/memory";
import { queryOne } from "./db";
import type { AIChatMessage, LessonPedagogyContext, TutorReplyContext } from "./ai/types";

export type { TutorHistoryItem, TutorReplyContext, LessonPedagogyContext } from "./ai/types";

const MAX_HISTORY = 8;

export function isTutorAIConfigured(): boolean {
  return getProviderChain().length > 0;
}

/**
 * Contexte pédagogique d'une leçon : métadonnées uniquement (titres, résumé,
 * prérequis), sans le contenu du cours — aucun risque de fuite premium.
 * Retourne null si la leçon ou son chapitre n'est pas approuvé.
 */
export async function getLessonPedagogyContext(
  lessonId: number,
): Promise<LessonPedagogyContext | null> {
  try {
    const row = await queryOne<{
      gradeName: string | null;
      subjectName: string | null;
      chapterTitle: string | null;
      lessonTitle: string | null;
      lessonSummary: string | null;
      prerequisites: string | null;
    }>(
      `SELECT g.name AS gradeName, s.name AS subjectName, c.title AS chapterTitle,
              l.title AS lessonTitle, l.summary AS lessonSummary, l.prerequisites AS prerequisites
       FROM lessons l
       JOIN chapters c ON c.id = l.chapter_id
       JOIN subjects s ON s.id = c.subject_id
       LEFT JOIN grades g ON g.id = c.grade_id
       WHERE l.id = ? AND l.status = 'approved' AND c.status = 'approved'`,
      lessonId,
    );
    if (!row) return null;
    return {
      gradeName: row.gradeName,
      subjectName: row.subjectName,
      chapterTitle: row.chapterTitle,
      lessonTitle: row.lessonTitle,
      lessonSummary: row.lessonSummary?.trim() ? row.lessonSummary : null,
      prerequisites: row.prerequisites?.trim() ? row.prerequisites : null,
    };
  } catch {
    return null;
  }
}

export async function generateTutorReply(
  ctx: TutorReplyContext,
): Promise<string | null> {
  try {
    const lessonId = ctx.lessonId ?? null;
    let favoriteSubjectIds: number[] = [];
    let memoryBlock = "";

    if (ctx.userId) {
      try {
        const memory = await buildStudentMemory(ctx.userId);
        favoriteSubjectIds = memory.favoriteSubjectIds;
        memoryBlock = buildMemoryPromptBlock(memory);
      } catch {
        memoryBlock = "";
      }
    }

    const ragContext = await buildTutorRAGContext(
      ctx.message,
      favoriteSubjectIds,
      lessonId,
      ctx.gradeId ?? null,
    );
    const systemPrompt = `${buildTutorSystemPrompt(ctx)}${
      ragContext ? `\n\n${ragContext}` : ""
    }${memoryBlock ? `\n\n${memoryBlock}` : ""}`;
    const messages: AIChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...ctx.history
        .slice(-MAX_HISTORY)
        .map((h) => ({ role: h.role, content: h.content })),
      { role: "user", content: ctx.message },
    ];
    const completion = await generateWithGateway({
      messages,
      maxTokens: 500,
      temperature: 0.7,
    });
    if (!completion) return null;
    return completion.text;
  } catch {
    return null;
  }
}

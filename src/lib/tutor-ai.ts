import { buildTutorSystemPrompt } from "./ai/prompts";
import { generateWithGateway, getProviderChain } from "./ai/gateway";
import { buildTutorRAGContext } from "./ai/rag";
import { buildMemoryPromptBlock, buildStudentMemory } from "./ai/memory";
import type { AIChatMessage, TutorReplyContext } from "./ai/types";

export type { TutorHistoryItem, TutorReplyContext } from "./ai/types";

const MAX_HISTORY = 8;

export function isTutorAIConfigured(): boolean {
  return getProviderChain().length > 0;
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

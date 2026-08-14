import { fetchWithTimeout, sanitizeText } from "./base";
import type { AICompletion, AIProvider, AIGenerateOptions } from "../types";

const DEFAULT_MODEL = "gpt-4o-mini";
const DEFAULT_TIMEOUT_MS = 30000;

export class OpenAIProvider implements AIProvider {
  readonly name = "openai";

  isAvailable(): boolean {
    return Boolean(process.env.OPENAI_API_KEY);
  }

  async generateResponse(options: AIGenerateOptions): Promise<AICompletion> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY manquante");

    const model = process.env.OPENAI_TUTOR_MODEL ?? DEFAULT_MODEL;
    const res = await fetchWithTimeout(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: options.messages,
          max_tokens: options.maxTokens ?? 500,
          temperature: options.temperature ?? 0.7,
        }),
      },
      options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    );

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`OpenAI ${res.status}: ${body.slice(0, 200)}`);
    }
    const data = await res.json();
    const text = sanitizeText(data.choices?.[0]?.message?.content);
    if (!text) throw new Error("OpenAI: réponse vide");
    return { text, provider: this.name, model };
  }
}

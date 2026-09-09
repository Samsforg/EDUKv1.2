import { fetchWithTimeout, sanitizeText } from "./base";
import type { AICompletion, AIProvider, AIGenerateOptions } from "../types";

const DEFAULT_MODEL = "openai/gpt-4o-mini";
const DEFAULT_TIMEOUT_MS = 30000;

export class OpenRouterProvider implements AIProvider {
  readonly name = "openrouter";

  isAvailable(): boolean {
    return Boolean(process.env.OPENROUTER_API_KEY);
  }

  async generateResponse(options: AIGenerateOptions): Promise<AICompletion> {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error("OPENROUTER_API_KEY manquante");

    const model = process.env.OPENROUTER_TUTOR_MODEL ?? DEFAULT_MODEL;
    const res = await fetchWithTimeout(
      "https://openrouter.ai/api/v1/chat/completions",
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
      throw new Error(`OpenRouter ${res.status}: ${body.slice(0, 200)}`);
    }
    const data = await res.json();
    const text = sanitizeText(data.choices?.[0]?.message?.content);
    if (!text) throw new Error("OpenRouter: réponse vide");
    return { text, provider: this.name, model };
  }
}

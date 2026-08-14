import { fetchWithTimeout, sanitizeText } from "./base";
import type { AICompletion, AIProvider, AIGenerateOptions } from "../types";

const DEFAULT_MODEL = "@cf/meta/llama-3.1-8b-instruct";
const DEFAULT_TIMEOUT_MS = 30000;

export class CloudflareProvider implements AIProvider {
  readonly name = "cloudflare";

  isAvailable(): boolean {
    return Boolean(
      process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN,
    );
  }

  async generateResponse(options: AIGenerateOptions): Promise<AICompletion> {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    if (!accountId || !apiToken) throw new Error("CLOUDFLARE_* manquants");

    const model = process.env.CLOUDFLARE_MODEL ?? DEFAULT_MODEL;
    const res = await fetchWithTimeout(
      `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${encodeURIComponent(model)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({ messages: options.messages }),
      },
      options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    );

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Cloudflare ${res.status}: ${body.slice(0, 200)}`);
    }
    const data = await res.json();
    const text = sanitizeText(data?.result?.response);
    if (!text) throw new Error("Cloudflare: réponse vide");
    return { text, provider: this.name, model };
  }
}

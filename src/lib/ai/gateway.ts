import { GroqProvider } from "./providers/groq";
import { HuggingFaceProvider } from "./providers/huggingface";
import { CloudflareProvider } from "./providers/cloudflare";
import { CerebrasProvider } from "./providers/cerebras";
import { GeminiProvider } from "./providers/gemini";
import { OpenRouterProvider } from "./providers/openrouter";
import { OpenAIProvider } from "./providers/openai";
import { logAI } from "./logger";
import type { AICompletion, AIGenerateOptions, AIProvider } from "./types";

const MAX_RESPONSE_CHARS = 2000;

const GATEWAY_CHAIN: (() => AIProvider)[] = [
  () => new GroqProvider(),
  () => new HuggingFaceProvider(),
  () => new CloudflareProvider(),
  () => new CerebrasProvider(),
  () => new GeminiProvider(),
  () => new OpenRouterProvider(),
  () => new OpenAIProvider(),
];

const LEGACY_CHAIN: (() => AIProvider)[] = [
  () => new OpenAIProvider(),
  () => new GeminiProvider(),
];

export function isGatewayEnabled(): boolean {
  const flag = process.env.AI_GATEWAY_ENABLED;
  if (flag !== undefined) return flag === "true";
  return Boolean(
    process.env.GROQ_API_KEY ||
      process.env.HF_API_KEY ||
      process.env.CLOUDFLARE_API_TOKEN,
  );
}

export function getProviderChain(): AIProvider[] {
  const factories = isGatewayEnabled() ? GATEWAY_CHAIN : LEGACY_CHAIN;
  const chain = factories.map((f) => f()).filter((p) => p.isAvailable());

  const primary = process.env.AI_PRIMARY_PROVIDER;
  if (primary) {
    const idx = chain.findIndex((p) => p.name === primary);
    if (idx > 0) {
      const [moved] = chain.splice(idx, 1);
      chain.unshift(moved);
    }
  }
  return chain;
}

export async function generateWithGateway(
  options: AIGenerateOptions,
): Promise<AICompletion | null> {
  const chain = getProviderChain();
  if (chain.length === 0) return null;

  let lastError: string | null = null;
  for (let i = 0; i < chain.length; i++) {
    const provider = chain[i];
    if (!provider.isAvailable()) continue;

    const start = Date.now();
    logAI({
      provider: provider.name,
      model: "",
      status: "attempt",
      index: i + 1,
      total: chain.length,
    });

    try {
      const completion = await provider.generateResponse(options);
      if (completion.text.length > MAX_RESPONSE_CHARS) {
        completion.text = completion.text.slice(0, MAX_RESPONSE_CHARS).trimEnd();
      }
      logAI({
        provider: provider.name,
        model: completion.model,
        status: "success",
        latencyMs: Date.now() - start,
        index: i + 1,
        total: chain.length,
      });
      return completion;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      lastError = message;
      logAI({
        provider: provider.name,
        model: "",
        status: "failure",
        latencyMs: Date.now() - start,
        error: message,
        index: i + 1,
        total: chain.length,
      });
    }
  }

  if (lastError) {
    logAI({
      provider: "gateway",
      model: "",
      status: "failure",
      error: lastError,
    });
  }
  return null;
}

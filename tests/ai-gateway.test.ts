import { GroqProvider } from "@/lib/ai/providers/groq";
import { HuggingFaceProvider } from "@/lib/ai/providers/huggingface";
import { CloudflareProvider } from "@/lib/ai/providers/cloudflare";
import { GeminiProvider } from "@/lib/ai/providers/gemini";
import { OpenAIProvider } from "@/lib/ai/providers/openai";
import {
  generateWithGateway,
  getProviderChain,
  isGatewayEnabled,
} from "@/lib/ai/gateway";
import { generateTutorReply, isTutorAIConfigured } from "@/lib/tutor-ai";

const RUN = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const realEnv: Record<string, string | undefined> = { ...process.env };
const managedKeys = new Set<string>();

function setEnv(values: Record<string, string | undefined>) {
  for (const key of managedKeys) delete process.env[key];
  managedKeys.clear();
  for (const [k, v] of Object.entries(values)) {
    managedKeys.add(k);
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
}

function jsonResponse(body: unknown, ok = true, status = 200): Response {
  return {
    ok,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

describe("AI Gateway", () => {
  afterEach(() => {
    setEnv(realEnv);
    jest.restoreAllMocks();
  });

  describe("isGatewayEnabled", () => {
    it("should be disabled without keys and without flag", () => {
      setEnv({});
      expect(isGatewayEnabled()).toBe(false);
    });

    it("should auto-enable when a new provider key is present", () => {
      setEnv({ GROQ_API_KEY: "gsk_1" });
      expect(isGatewayEnabled()).toBe(true);
    });

    it("should respect explicit AI_GATEWAY_ENABLED=false", () => {
      setEnv({ GROQ_API_KEY: "gsk_1", AI_GATEWAY_ENABLED: "false" });
      expect(isGatewayEnabled()).toBe(false);
    });
  });

  describe("getProviderChain", () => {
    it("should return legacy chain (OpenAI, Gemini) when gateway disabled", () => {
      setEnv({ OPENAI_API_KEY: "sk_1", GEMINI_API_KEY: "AI_1", AI_GATEWAY_ENABLED: "false" });
      const chain = getProviderChain();
      expect(chain.map((p) => p.name)).toEqual(["openai", "gemini"]);
    });

    it("should return gateway chain when enabled", () => {
      setEnv({
        GROQ_API_KEY: "gsk_1",
        HF_API_KEY: "hf_1",
        GEMINI_API_KEY: "AI_1",
        AI_GATEWAY_ENABLED: "true",
      });
      const chain = getProviderChain();
      expect(chain.map((p) => p.name)).toEqual(["groq", "huggingface", "gemini"]);
    });

    it("should respect AI_PRIMARY_PROVIDER ordering", () => {
      setEnv({
        GROQ_API_KEY: "gsk_1",
        HF_API_KEY: "hf_1",
        GEMINI_API_KEY: "AI_1",
        AI_GATEWAY_ENABLED: "true",
        AI_PRIMARY_PROVIDER: "huggingface",
      });
      const chain = getProviderChain();
      expect(chain.map((p) => p.name)).toEqual(["huggingface", "groq", "gemini"]);
    });

    it("should return empty chain without any key", () => {
      setEnv({});
      expect(getProviderChain()).toEqual([]);
    });
  });

  describe("providers availability", () => {
    it("groq available only with GROQ_API_KEY", () => {
      setEnv({});
      expect(new GroqProvider().isAvailable()).toBe(false);
      setEnv({ GROQ_API_KEY: "gsk_1" });
      expect(new GroqProvider().isAvailable()).toBe(true);
    });

    it("huggingface available only with HF_API_KEY", () => {
      setEnv({});
      expect(new HuggingFaceProvider().isAvailable()).toBe(false);
      setEnv({ HF_API_KEY: "hf_1" });
      expect(new HuggingFaceProvider().isAvailable()).toBe(true);
    });

    it("cloudflare requires account id and token", () => {
      setEnv({ CLOUDFLARE_ACCOUNT_ID: "acc" });
      expect(new CloudflareProvider().isAvailable()).toBe(false);
      setEnv({ CLOUDFLARE_ACCOUNT_ID: "acc", CLOUDFLARE_API_TOKEN: "tok" });
      expect(new CloudflareProvider().isAvailable()).toBe(true);
    });

    it("gemini available only with GEMINI_API_KEY", () => {
      setEnv({});
      expect(new GeminiProvider().isAvailable()).toBe(false);
      setEnv({ GEMINI_API_KEY: "AI_1" });
      expect(new GeminiProvider().isAvailable()).toBe(true);
    });

    it("openai available only with OPENAI_API_KEY", () => {
      setEnv({});
      expect(new OpenAIProvider().isAvailable()).toBe(false);
      setEnv({ OPENAI_API_KEY: "sk_1" });
      expect(new OpenAIProvider().isAvailable()).toBe(true);
    });
  });

  describe("generateWithGateway", () => {
    it("should return null with empty chain", async () => {
      setEnv({});
      const result = await generateWithGateway({
        messages: [{ role: "user", content: "Bonjour" }],
      });
      expect(result).toBeNull();
    });

    it("should succeed with first provider (groq)", async () => {
      setEnv({
        GROQ_API_KEY: "gsk_1",
        HF_API_KEY: "hf_1",
        AI_GATEWAY_ENABLED: "true",
      });
      const fetchMock = jest
        .spyOn(global, "fetch")
        .mockImplementation(async () =>
          jsonResponse({
            choices: [{ message: { content: "Réponse Groq" } }],
          }),
        );

      const result = await generateWithGateway({
        messages: [{ role: "user", content: "Bonjour" }],
      });
      expect(result?.provider).toBe("groq");
      expect(result?.text).toBe("Réponse Groq");
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it("should fall back to next provider when previous fails", async () => {
      setEnv({
        GROQ_API_KEY: "gsk_1",
        HF_API_KEY: "hf_1",
        AI_GATEWAY_ENABLED: "true",
      });
      const fetchMock = jest
        .spyOn(global, "fetch")
        .mockImplementation(async (url) => {
          if (String(url).includes("groq")) {
            return jsonResponse({}, false, 429);
          }
          return jsonResponse({
            choices: [{ message: { content: "Réponse HF" } }],
          });
        });

      const result = await generateWithGateway({
        messages: [{ role: "user", content: "Bonjour" }],
      });
      expect(result?.provider).toBe("huggingface");
      expect(result?.text).toBe("Réponse HF");
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("should return null when all providers fail", async () => {
      setEnv({
        GROQ_API_KEY: "gsk_1",
        HF_API_KEY: "hf_1",
        AI_GATEWAY_ENABLED: "true",
      });
      jest.spyOn(global, "fetch").mockImplementation(async () => jsonResponse({}, false, 500));

      const result = await generateWithGateway({
        messages: [{ role: "user", content: "Bonjour" }],
      });
      expect(result).toBeNull();
    });

    it("should skip empty provider response and try next", async () => {
      setEnv({
        GROQ_API_KEY: "gsk_1",
        HF_API_KEY: "hf_1",
        AI_GATEWAY_ENABLED: "true",
      });
      const fetchMock = jest
        .spyOn(global, "fetch")
        .mockImplementation(async (url) => {
          if (String(url).includes("groq")) {
            return jsonResponse({ choices: [{ message: { content: "   " } }] });
          }
          return jsonResponse({
            choices: [{ message: { content: "Réponse HF" } }],
          });
        });

      const result = await generateWithGateway({
        messages: [{ role: "user", content: "Bonjour" }],
      });
      expect(result?.provider).toBe("huggingface");
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("should truncate long responses to 2000 chars", async () => {
      setEnv({ GROQ_API_KEY: "gsk_1", AI_GATEWAY_ENABLED: "true" });
      jest.spyOn(global, "fetch").mockImplementation(async () =>
        jsonResponse({
          choices: [{ message: { content: "a".repeat(5000) } }],
        }),
      );
      const result = await generateWithGateway({
        messages: [{ role: "user", content: "x" }],
      });
      expect(result?.text?.length).toBe(2000);
    });
  });

  describe("tutor-ai integration", () => {
    it("isTutorAIConfigured false without keys", () => {
      setEnv({});
      expect(isTutorAIConfigured()).toBe(false);
    });

    it("isTutorAIConfigured true with gemini key (legacy)", () => {
      setEnv({ GEMINI_API_KEY: "AI_1", AI_GATEWAY_ENABLED: "false" });
      expect(isTutorAIConfigured()).toBe(true);
    });

    it("generateTutorReply returns null when no provider", async () => {
      setEnv({});
      const reply = await generateTutorReply({
        message: "Bonjour",
        history: [],
        studentName: null,
        serieName: null,
        classLevel: null,
      });
      expect(reply).toBeNull();
    });

    it("generateTutorReply uses gateway with legacy config", async () => {
      setEnv({
        GEMINI_API_KEY: "AI_1",
        GEMINI_TUTOR_MODEL: "gemini-3.1-flash-lite",
        AI_GATEWAY_ENABLED: "false",
      });
      const fetchMock = jest.spyOn(global, "fetch").mockImplementation(async (url) => {
        expect(String(url)).toContain("generativelanguage.googleapis.com");
        return jsonResponse({
          candidates: [{ content: { parts: [{ text: "Réponse Kora" }] } }],
        });
      });

      const reply = await generateTutorReply({
        message: "Explique la dérivée",
        history: [{ role: "user", content: "Salut" }],
        studentName: "Aya",
        serieName: "C",
        classLevel: "Terminale",
      });
      expect(reply).toBe("Réponse Kora");

      const body = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
      expect(body.systemInstruction.parts[0].text).toContain("Kora");
      expect(body.systemInstruction.parts[0].text).toContain("Aya");
      expect(body.systemInstruction.parts[0].text).toContain("Terminale");
      expect(body.contents).toHaveLength(2);
    });

    it("generateTutorReply falls back to local null path when all providers fail", async () => {
      setEnv({ GEMINI_API_KEY: "AI_1", AI_GATEWAY_ENABLED: "false" });
      jest.spyOn(global, "fetch").mockImplementation(async () => jsonResponse({}, false, 500));
      const reply = await generateTutorReply({
        message: "Salut",
        history: [],
        studentName: null,
        serieName: null,
        classLevel: null,
      });
      expect(reply).toBeNull();
    });
  });
});

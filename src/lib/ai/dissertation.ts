import { generateWithGateway, getProviderChain } from "./gateway";
import type { AIGenerateOptions } from "./types";

export interface DissertationCriteria {
  criterion: string;
  score: number;
  max: number;
  comment: string;
}

export interface DissertationCorrection {
  note: number;
  noteMax: number;
  summary: string;
  criteria: DissertationCriteria[];
  strengths: string[];
  improvements: string[];
  modelAnswer: string;
  raw: string | null;
}

const EXAM_LABELS: Record<string, string> = {
  BAC: "BAC (séries A-C-D uniquement)",
  BEPC: "BEPC",
};

const SUBJECT_RULES: Record<string, { hours: string; expectation: string }> = {
  "Français": {
    hours: "2 heures",
    expectation:
      "au barème BEPC/BAC de français : compréhension du sujet (4 points), argumentation et plan (4 points), développement et exemples (6 points), langue et expression (6 points). Chaque paragraphe doit développer une idée avec des exemples précis.",
  },
  "Philosophie": {
    hours: "4 heures",
    expectation:
      "au barème du BAC de philosophie : compréhension de la consigne et du sujet (3 points), problématisation (4 points), construction de l'argumentation et de la réflexion (7 points), culture philosophique et exemples (3 points), rédaction et intégration des auteurs (3 points).",
  },
  "Histoire-Géographie": {
    hours: "2 heures",
    expectation:
      "au barème BAC/BEPC d'histoire-géographie : introduction avec problématique (2 points), maîtrise des connaissances et dates (8 points), organisation du développement (5 points), expression et conclusion (5 points).",
  },
};

function buildSystemPrompt(exam: string, subject: string, wordCount: number): string {
  const rules = SUBJECT_RULES[subject] ?? SUBJECT_RULES["Français"];
  return [
    "Tu es Kora, correctrice experte de dissertations pour le système éducatif ivoirien.",
    `Tu corriges une dissertation de ${subject} (${EXAM_LABELS[exam] ?? exam}), durée officielle ${rules.hours}.`,
    "Tu notes sur 20 " + rules.expectation,
    `La copie à corriger contient environ ${wordCount} mots. Le candidat peut gagner ou perdre des points selon la présence d'une introduction et d'une conclusion.`,
    "RÈGLES STRICTES :",
    "- Réponds UNIQUEMENT avec un objet JSON valide, sans texte avant ni après, sans balise ```json.",
    "- La note doit être un entier entre 2 et 20 (comme un correcteur exigeant mais bienveillant).",
    "- Le champ criteria doit contenir EXACTEMENT la liste de critères du barème (chacun sur son maximum).",
    "- Chaque commentaire de critère : 1 à 2 phrases précises, constructives, en français.",
    "- strengths : 2 à 4 points forts CONCRETS issus du texte (cite un passage ou une idée).",
    "- improvements : 2 à 4 pistes d'amélioration CONCRÈTES et actionnables (structure, fautes, arguments manquants).",
    "- modelAnswer : un plan de corrigé type de 4 à 6 lignes (introduction, axes, conclusion) très structuré.",
    `FORMAT JSON ATTENDU : {"note": 14, "noteMax": 20, "summary": "résumé de correction en 2-3 phrases", "criteria": [{"criterion": "Compréhension du sujet", "score": 3, "max": 4, "comment": "..."}], "strengths": ["..."], "improvements": ["..."], "modelAnswer": "..."}`,
  ].join("\n");
}

export async function correctDissertation(input: {
  text: string;
  exam: string;
  subject: string;
}): Promise<DissertationCorrection | null> {
  const text = input.text.trim();
  if (text.length < 200) return null;

  const wordCount = Math.round(text.split(/\s+/).length);
  const options: AIGenerateOptions = {
    messages: [
      { role: "system", content: buildSystemPrompt(input.exam, input.subject, wordCount) },
      { role: "user", content: `Voici ma copie :\n\n${text}` },
    ],
    maxTokens: 1600,
    temperature: 0.4,
    timeoutMs: 90000,
  };

  const completion = await generateWithGateway(options);
  if (!completion) return null;

  return parseCorrection(completion.text, completion.provider);
}

export function parseCorrection(raw: string, provider: string): DissertationCorrection {
  const base: DissertationCorrection = {
    note: 0,
    noteMax: 20,
    summary: "",
    criteria: [],
    strengths: [],
    improvements: [],
    modelAnswer: "",
    raw,
  };

  let json = raw.trim();
  const fence = json.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) json = fence[1].trim();
  const start = json.indexOf("{");
  const end = json.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    return { ...base, summary: raw.slice(0, 400) };
  }

  try {
    const parsed = JSON.parse(json.slice(start, end + 1));
    return {
      note: clampNote(Number(parsed.note)),
      noteMax: 20,
      summary: String(parsed.summary ?? "").slice(0, 600) || raw.slice(0, 400),
      criteria: Array.isArray(parsed.criteria)
        ? parsed.criteria
            .filter((c: unknown): c is DissertationCriteria =>
              typeof c === "object" && c !== null && typeof (c as DissertationCriteria).criterion === "string",
            )
            .map((c: DissertationCriteria) => ({
              criterion: String(c.criterion).slice(0, 80),
              score: clampScore(Number(c.score)),
              max: clampScore(Number(c.max)),
              comment: String(c.comment ?? "").slice(0, 400),
            }))
        : [],
      strengths: Array.isArray(parsed.strengths)
        ? parsed.strengths.map((s: unknown) => String(s).slice(0, 300))
        : [],
      improvements: Array.isArray(parsed.improvements)
        ? parsed.improvements.map((s: unknown) => String(s).slice(0, 300))
        : [],
      modelAnswer: String(parsed.modelAnswer ?? "").slice(0, 1200),
      raw,
    };
  } catch {
    return { ...base, summary: raw.slice(0, 400) };
  }
}

function clampScore(v: number): number {
  if (!Number.isFinite(v)) return 0;
  return Math.min(20, Math.max(0, Math.round(v)));
}

function clampNote(v: number): number {
  if (!Number.isFinite(v)) return 0;
  return Math.min(20, Math.max(2, Math.round(v)));
}

export function isDissertationAIConfigured(): boolean {
  return getProviderChain().length > 0;
}
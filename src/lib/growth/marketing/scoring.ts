import type { Content } from "@/lib/growth/ai/types";

interface ScoreResult {
  score: number;
  breakdown: {
    hook: number;
    clarity: number;
    cta: number;
    length: number;
    hashtags: number;
  };
}

export function calculateContentScore(content: Content): ScoreResult {
  const text = content.text.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);

  // Hook score (0-25): first line engagement
  let hook = 10;
  const hookWords = ["urgence", "exclusive", "nouveau", "gratuit", "offre", "découvre", "rejoins", "résultat", "note", "examen", "100%", "secret", "astuce", "erreur", "échec", "réussi"];
  if (hookWords.some((w) => text.startsWith(w) || text.includes(w))) hook += 8;
  if (text.includes("!") || text.includes("🔥") || text.includes("💯")) hook += 4;
  if (text.split("\n")[0]?.length ?? 0 < 80) hook += 3;
  hook = Math.min(hook, 25);

  // Clarity score (0-25): simple language
  let clarity = 15;
  if (words.length >= 20 && words.length <= 150) clarity += 5;
  if (!text.includes("etc") && !text.includes("-format")) clarity += 3;
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const avgSentenceLen = words.length / Math.max(sentences.length, 1);
  if (avgSentenceLen <= 15) clarity += 2;
  clarity = Math.min(clarity, 25);

  // CTA score (0-25)
  let cta = 5;
  if (content.cta) cta += 10;
  const ctaWords = ["rejoins", "télécharge", "inscris", "clique", "partage", "envoie", "appelle", "visite", "découvre", "essaie"];
  if (ctaWords.some((w) => text.includes(w) || (content.cta?.toLowerCase().includes(w) ?? false))) cta += 7;
  if (content.cta && content.cta.length < 50) cta += 3;
  cta = Math.min(cta, 25);

  // Length score (0-15)
  let length = 0;
  if (content.platform === "tiktok") {
    length = words.length <= 100 ? 15 : words.length <= 150 ? 10 : 5;
  } else if (content.platform === "whatsapp") {
    length = words.length <= 80 ? 15 : words.length <= 120 ? 10 : 5;
  } else {
    length = words.length <= 300 ? 15 : words.length <= 400 ? 10 : 5;
  }

  // Hashtag score (0-10)
  const hashtagCount = content.hashtags.length;
  let hashtags = 0;
  if (hashtagCount >= 2 && hashtagCount <= 8) hashtags = 10;
  else if (hashtagCount >= 1) hashtags = 6;
  else if (hashtagCount > 8) hashtags = 5;

  const score = hook + clarity + cta + length + hashtags;

  return {
    score: Math.min(score, 100),
    breakdown: { hook, clarity, cta, length, hashtags },
  };
}

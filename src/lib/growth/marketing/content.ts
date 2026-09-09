import { getAIProvider } from "@/lib/growth/ai/provider";
import type { Content, ContentPlatform } from "@/lib/growth/ai/types";

const PLATFORM_SYSTEM: Record<ContentPlatform, string> = {
  facebook: `Tu es le directeur Growth d'Edukora sur Facebook.
OBJECTIF : conversions (inscriptions + Premium), PAS likes.
Cible : parents d'élèves BAC/BEPC + lycéens 15-20 ans en CI.
Ton : direct, preuve sociale, urgence.
Format : max 250 mots. Hook fort ligne 1. CTA clair.
Ne JAMAIS optimiser pour les likes. Chaque post doit pousser à l'action.`,
  tiktok: `Tu es le directeur Growth d'Edukora sur TikTok.
OBJECTIF : inscriptions depuis TikTok, PAS vues.
Cible : 15-22 ans en Côte d'Ivoire,핼备 BAC/BEPC.
Ton : viral, authentique, tendance, hook choquant.
Format : 50-80 mots. Hook choquant ligne 1. Démonstration rapide.
TikTok =켠 conversion virale, pas du divertissement gratuit.`,
  whatsapp: `Tu es le directeur Growth d'Edukora sur WhatsApp.
OBJECTIF : activation et rétention, PAS envoi de masse.
Cible : élèves/étudiants déjà inscrits + prospects chauds.
Ton : personnel, urgent, conversationnel.
Format : 30-60 mots. Pas de hashtag. Emoji stratégiques.
WhatsApp = réactivation et bouche-à-oreille, pas du spam.`,
};

export async function generateContent(
  platform: ContentPlatform,
  strategyId: string,
  topic?: string,
): Promise<Content> {
  const provider = getAIProvider();
  const topicPart = topic ? `\nSujet : ${topic}` : "";

  const result = await provider.generate({
    system: PLATFORM_SYSTEM[platform],
    prompt: `Crée un post ${platform.toUpperCase()} pour Edukora.
${topicPart}

RÈGLE ABSOLUE : ce post doit générer des INSCRIPTIONS ou des ABONNEMENTS, pas des likes.

Réponds en JSON avec :
- text : texte du post (conversion-focused, pas engagement-focused)
- hashtags : 3-5 hashtags ciblés (pas plus)
- cta : call-to-action qui pousse à l'inscription ou au Premium (ex: "Inscris-toi gratuitement maintenant" PAS "Like si tu es d'accord")
- visualPrompt : description d'image pour accompagner le post (montrant un résultat concret, pas un logo)`,
    temperature: 0.75,
  });

  const parsed = parseJSON(result);
  const content: Content = {
    id: `content-${platform}-${Date.now()}`,
    strategyId,
    platform,
    text: String(parsed.text ?? ""),
    hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags.map(String) : [],
    cta: String(parsed.cta ?? ""),
    visualPrompt: parsed.visualPrompt ? String(parsed.visualPrompt) : undefined,
    status: "draft",
    createdAt: new Date().toISOString(),
  };

  return content;
}

function parseJSON(text: string): Record<string, unknown> {
  const match = text.match(/```json\s*([\s\S]*?)```/) ?? text.match(/\{[\s\S]*\}/);
  if (!match) return {};
  try {
    return JSON.parse(match[1] ?? match[0]);
  } catch {
    return {};
  }
}

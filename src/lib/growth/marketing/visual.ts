import { getAIProvider } from "@/lib/growth/ai/provider";

export async function generateVisualPrompt(context: string): Promise<string> {
  const provider = getAIProvider();

  const result = await provider.generate({
    system: `Tu es un directeur artistique spécialisé dans les visuels éducatifs pour l'Afrique de l'Ouest.
Style : coloré, moderne, accessible, sans texte dans l'image.
Éléments : jeunes Africains, couleurs Edukora (navy, bleu, orange, blanc).
Format : description concise (2-3 phrases) pour un générateur d'images IA.`,
    prompt: `Génère un prompt visuel pour : ${context}
Donne uniquement la description, pas d'explication.`,
    maxTokens: 200,
    temperature: 0.9,
  });

  return result.trim();
}

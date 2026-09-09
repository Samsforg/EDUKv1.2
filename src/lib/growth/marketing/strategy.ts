import { getAIProvider } from "@/lib/growth/ai/provider";
import type { GrowthStrategy, Recommendation } from "@/lib/growth/ai/types";
import { getStore } from "@/lib/growth/data/store";

const GROWTH_DIRECTOR = `Tu es le directeur Growth d'Edukora, une app éducative ivoirienne (BAC/BEPC).

PRIORITÉS (jamais d'optimisation likes) :
1. Chiffre d'affaires
2. Abonnements Premium
3. Inscriptions
4. Activation (première action utilisateur)
5. Visiteurs
6. Engagement

RÈGLES ABSOLUES :
- Une campagne avec beaucoup de vues mais peu d'inscriptions = FAIBLE.
- Une campagne avec peu de vues mais beaucoup d'inscriptions = INTÉRESSANTE.
- Chaque recommandation doit être une EXPÉRIENCE MESURABLE.
- Jamais optimiser uniquement les likes ou la portée.
- Toujours proposer un test A/B ou une hypothèse à valider.

MÉTRIQUES ANALYSÉES :
- Visiteurs, inscriptions, activation, utilisateurs actifs
- Utilisation Kora (tuteur IA), quiz, simulations
- Pages tarifs, checkout, abonnements Premium, désabonnements
- Parrainages
- Performance Facebook, TikTok, WhatsApp

FORMAT DE RÉPONSE : JSON strict.`;

export async function generateStrategy(date?: string): Promise<GrowthStrategy> {
  const today = date ?? new Date().toISOString().split("T")[0];
  const existing = await (await getStore()).getStrategy(today);
  if (existing) return existing;

  const provider = getAIProvider();
  const result = await provider.generate({
    system: GROWTH_DIRECTOR,
    prompt: `Stratégie Growth du ${today}.

Analyse le funnel complet et propose UNE action prioritaire qui maximise le CA.

Réponds en JSON avec :
- objective : objectif principal mesurable du jour (ex: "+15 abonnements Premium")
- audience : segment cible précis (ex: "Élèves Terminale S/ES qui ont fait 3+ quiz mais jamais payé")
- hook : accroche percutante pour la publication principale
- strategy : plan d'action détaillé (3-5 étapes concrètes)
- kpis : 3 KPIs mesurables avec cible (ex: ["CTR > 3%", "15 inscriptions", "5 abonnements"])
- platform : plateforme prioritaire (facebook|tiktok|whatsapp)
- experiment : hypothèse à tester cette semaine`,
    temperature: 0.7,
  });

  const parsed = parseJSON(result);
  const strategy: GrowthStrategy = {
    id: `strat-${today}-${Date.now()}`,
    date: today,
    objective: String(parsed.objective ?? "Croissance CA"),
    audience: String(parsed.audience ?? "Élèves BAC/BEPC CI"),
    hook: String(parsed.hook ?? ""),
    strategy: String(parsed.strategy ?? ""),
    kpis: Array.isArray(parsed.kpis) ? parsed.kpis.map(String) : [],
    status: "draft",
    createdAt: new Date().toISOString(),
  };

  await (await getStore()).saveStrategy(strategy);
  return strategy;
}

export async function generateRecommendation(): Promise<Recommendation> {
  const provider = getAIProvider();
  const metrics = await (await getStore()).getLatestMetrics();

  const result = await provider.generate({
    system: GROWTH_DIRECTOR,
    prompt: `Métriques actuelles d'Edukora :
${JSON.stringify(metrics, null, 2)}

Analyse le funnel et propose LA recommandation prioritaire qui maximise le CA.

Chaque recommandation DOIT répondre à ces 8 questions :
1. Quoi faire ? (action concrète)
2. Pourquoi ? (données qui justifient)
3. Pour qui ? (segment précis)
4. Sur quelle plateforme ? (facebook|tiktok|whatsapp)
5. Quel message ? (accroche + corps)
6. Quel CTA ? (call-to-action précis)
7. Quel KPI ? (métrique mesurable avec cible)
8. Quelle hypothèse tester ? (test A/B ou expérience)

Réponds en JSON avec :
- type : "content" | "campaign" | "audience" | "timing"
- title : titre court de l'action
- description : réponse complète aux 8 questions (structurée)
- priority : "high" | "medium" | "low"
- estimatedImpact : impact sur le CA estimé (ex: "+10 abonnements Premium/mois")`,
    temperature: 0.6,
  });

  const parsed = parseJSON(result);
  const rec: Recommendation = {
    id: `rec-${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
    type: (["content", "campaign", "audience", "timing"].includes(String(parsed.type)) ? parsed.type : "content") as Recommendation["type"],
    title: String(parsed.title ?? "Optimiser le funnel Premium"),
    description: String(parsed.description ?? ""),
    priority: (["high", "medium", "low"].includes(String(parsed.priority)) ? parsed.priority : "medium") as Recommendation["priority"],
    estimatedImpact: String(parsed.estimatedImpact ?? ""),
    createdAt: new Date().toISOString(),
  };

  await (await getStore()).saveRecommendation(rec);
  return rec;
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

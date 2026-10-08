import type {
  GrowthData,
  GrowthOpportunity,
  GrowthRecommendation,
  OpportunityType,
} from "./types";

/**
 * P2.1 — Opportunité → Recommandation + Action proposée (§7, §8).
 *
 * Chaque recommandation répond au contrat WHAT / WHY / FOR WHOM / WHEN /
 * EXPECTED IMPACT / CONFIDENCE. `expected_impact` décrit la cible
 * documentée à rejoindre — jamais une promesse chiffrée fabriquée.
 * L'action est toujours `mode: "PROPOSED"` : aucun envoi, aucune
 * publication, aucune automatisation en P2.1.
 */

interface PlaybookEntry {
  what: string;
  when: GrowthRecommendation["when"];
  expectedImpact: (opp: GrowthOpportunity, data: GrowthData) => string;
  actionType: GrowthRecommendation["action"]["type"];
  actionNote: string;
}

const PLAYBOOK: Record<OpportunityType, PlaybookEntry> = {
  ACTIVATION_BOTTLENECK: {
    what: "Simplifier le parcours signup → premier cours (étapes, temps, clarté de la première action).",
    when: "immediately",
    expectedImpact: (opp) =>
      `Rapprocher le taux d'activation du seuil documenté ${opp.evidence.match(/seuil ([0-9.]+)/)?.[1] ?? "0.3"} sans changer la collecte d'événements.`,
    actionType: "IMPROVE_ONBOARDING",
    actionNote: "Proposition : retravailler l'onboarding inscrits non activés. Exécution humaine uniquement.",
  },
  CHECKOUT_DROPOFF: {
    what: "Renforcer la confiance au moment du paiement (prix affiché, moyens de paiement, garantie, rappel de valeur).",
    when: "immediately",
    expectedImpact: (opp) =>
      `Réduire l'abandon de checkout au-dessus du seuil documenté (${opp.evidence}) — impact sur les conversions Premium.`,
    actionType: "PROMOTE_SUBSCRIPTION",
    actionNote: "Proposition : ajuster l'offre/prix perçus à l'étape checkout. Exécution humaine uniquement.",
  },
  MONETIZATION_OPPORTUNITY: {
    what: "Faire vivre la valeur Premium à des utilisateurs déjà activés (cours vedettes, annales, quotas) avant de proposer l'abonnement.",
    when: "this_week",
    expectedImpact: (opp) =>
      `Transformer une partie des ${opp.evidence.match(/activated = (\d+)/)?.[1] ?? "utilisateurs"} activations sans paiement en premiers abonnés.`,
    actionType: "PROMOTE_COURSE",
    actionNote: "Proposition : mise en avant contenu déclencheur vers utilisateurs activés non payants. Exécution humaine uniquement.",
  },
  RETENTION_OPPORTUNITY: {
    what: "Relancer les visiteurs peu susceptibles de revenir (message de reprise, contenu nouveau, rappel d'objectif).",
    when: "this_week",
    expectedImpact: (opp) =>
      `Relever le taux de retour vers le seuil documenté 0.2 (${opp.evidence}).`,
    actionType: "REACTIVATE_USER",
    actionNote: "Proposition : campagne de réactivation. Exécution humaine uniquement, aucun envoi automatique.",
  },
  ACQUISITION_WEAKNESS: {
    what: "Optimiser la landing (accroche, promesse, preuve sociale, CTA) pour convertir davantage de visiteurs.",
    when: "immediately",
    expectedImpact: (opp) =>
      `Relever le taux visiteur → inscription vers le seuil documenté 0.1 (${opp.evidence}).`,
    actionType: "OPTIMIZE_LANDING",
    actionNote: "Proposition : variantes de landing à valider par un humain. Aucun déploiement automatique.",
  },
  ACQUISITION_STRENGTH: {
    what: "Amplifier le canal d'acquisition qui convertit déjà au-dessus du seuil (budget, contenu, relais).",
    when: "next_cycle",
    expectedImpact: (opp) =>
      `Maintenir un taux signup au-dessus du seuil haut 0.3 (${opp.evidence}) en augmentant le volume de trafic qualifié.`,
    actionType: "RUN_CAMPAIGN",
    actionNote: "Proposition : campagne d'amplification à lancer manuellement. Aucune campagne automatique en P2.1.",
  },
  // ── P2.2 — extension du playbook (§15) ─────────────────────────────
  CHANNEL_ACTIVATION_GAP: {
    what: "Retracer le parcours d'activation des inscrits du canal dominant pour comprendre où ils décrochent.",
    when: "this_week",
    expectedImpact: (opp) =>
      `Rapprocher l'activation du canal du seuil working ${opp.evidence.match(/seuil ([0-9.]+)/)?.[1] ?? "0.3"} sans modifier l'acquisition.`,
    actionType: "IMPROVE_ONBOARDING",
    actionNote: "Proposition : analyse puis ajustement de l'onboarding pour ce canal. Exécution humaine uniquement.",
  },
  REFERRAL_ACTIVATION_GAP: {
    what: "Accompagner les filleuls nouvellement parrainés jusqu'à leur première action utile (guide, objectif, premier cours).",
    when: "this_week",
    expectedImpact: (opp) =>
      `Rapprocher l'activation des filleuls du seuil working ${opp.evidence.match(/seuil ([0-9.]+)/)?.[1] ?? "0.3"}.`,
    actionType: "IMPROVE_REFERRAL_LOOP",
    actionNote: "Proposition : améliorer l'accompagnement post-parrainage. Aucun envoi automatique.",
  },
  ATTRIBUTION_GAP: {
    what: "Compléter la collecte d'attribution (paramètres d'acquisition) sur les parcours d'inscription sans signal.",
    when: "next_cycle",
    expectedImpact: (opp) =>
      `Relever la couverture d'attribution vers la borne 1.0 (${opp.evidence}) pour fiabiliser les décisions par canal.`,
    actionType: "IMPROVE_ATTRIBUTION",
    actionNote: "Proposition : étendre la capture d'attribution aux parcours manquants. Aucune donnée personnelle ajoutée.",
  },
};

export function buildRecommendation(
  opp: GrowthOpportunity,
  data: GrowthData,
): GrowthRecommendation {
  const entry = PLAYBOOK[opp.type];
  const period = `${data.period.from}/${data.period.to}`;
  return {
    id: `rec_${opp.type}#${period}`,
    what: entry.what,
    why: `${opp.type} — ${opp.evidence}`,
    for_whom: opp.segment,
    when: entry.when,
    expected_impact: entry.expectedImpact(opp, data),
    confidence: opp.confidence,
    priority: opp.priority,
    priority_score: opp.priority_score,
    opportunity_type: opp.type,
    evidence: opp.evidence,
    urgency: opp.urgency,
    action: {
      type: entry.actionType,
      mode: "PROPOSED",
      segment: opp.segment,
      note: entry.actionNote,
    },
    status: opp.status,
    created_at: data.created_at,
  };
}

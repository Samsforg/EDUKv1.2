/**
 * P2.3 — Growth Action Engine (cahier §§1-22).
 *
 * Blocs : mapping opportunity → recommandation → plan · actionnabilité ·
 * priorité P0-P3 · horizons/buckets · dédoublonnage · plan de mesure
 * (baseline/cible/calibration) · evidence factuelle · security (scan du
 * module, route admin read-only, UI PROPOSED) · performance (0 requête
 * supplémentaire) · idempotence.
 *
 * Régression : les suites P2.1/P2.2 restent vertes (§21) — le moteur
 * reste PUR : fixtures synthétiques sur GrowthData, aucune écriture.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { runDecisionLayer } from "@/lib/growth/decision";
import {
  ACTION_CONFIDENCE_FLOOR,
  ACTION_SCORE_BUCKETS,
  actionPlanId,
  buildActionPlan,
  buildActionPlans,
  buildActionQueue,
  computeActionability,
  computeActionPriority,
  horizonForPriority,
} from "@/lib/growth/decision/action-plans";
import { computeCoverage } from "@/lib/growth/decision/attribution";
import { computeMetrics, evaluateRules } from "@/lib/growth/decision/rules";
import { buildRecommendation } from "@/lib/growth/decision/recommend";
import { computeGrowthData } from "@/lib/growth/decision/data";
import type {
  GrowthActionPlan,
  GrowthData,
  GrowthIntelligenceData,
  GrowthOpportunity,
  GrowthRecommendation,
  SegmentKey,
} from "@/lib/growth/decision/types";
import * as db from "@/lib/db";

const NOW = "1999-01-08T12:00:00.000Z";
const PERIOD = { from: "1999-01-01", to: "1999-01-07", days: 7 };
const PREV = { from: "1998-12-25", to: "1998-12-31", days: 7 };
const PERIOD_LABEL = `${PERIOD.from}/${PERIOD.to}`;

const EMPTY_SEGMENTS: Record<SegmentKey, number> = {
  NEW_VISITOR: 0,
  REGISTERED_NOT_ACTIVATED: 0,
  ACTIVATED_NOT_PAID: 0,
  PAID_USER: 0,
  RETURNING_USER: 0,
  HIGH_INTENT: 0,
  DORMANT_USER: 0,
};

function emptyIntel(): GrowthIntelligenceData {
  return {
    channels: [],
    referrals: [],
    attribution: {
      coverage: computeCoverage(0, 0),
      sources: {
        by_type: { utm: 0, paid_click: 0, referral: 0, unknown: 0 },
        unknown_rate: null,
        status: "INSUFFICIENT_DATA",
      },
      top_source: null,
      source: "test",
    },
    available: true,
  };
}

function makeIntel(over: Partial<GrowthIntelligenceData> = {}): GrowthIntelligenceData {
  return { ...emptyIntel(), ...over };
}

function makeData(over: Partial<GrowthData> = {}): GrowthData {
  return {
    period: { ...PERIOD },
    previous_period: { ...PREV },
    funnel: {},
    previous_funnel: {},
    segments: { ...EMPTY_SEGMENTS },
    segments_available: true,
    revenue: { mrr_cents: 4900, active_subs: 12, available: true, source: "test" },
    retention: { available: false, value: null, status: "INSUFFICIENT_DATA" },
    created_at: NOW,
    ...over,
  };
}

/** Jeu A — 7 types : faiblesses funnel + canal + parrainage + attribution. */
function dataSetA(over: Partial<GrowthData> = {}): GrowthData {
  return makeData({
    funnel: {
      page_view: 1000,
      signup_completed: 60,
      activated: 12,
      begin_checkout: 40,
      purchase: 0,
      return_visit: 100,
    },
    previous_funnel: {
      page_view: 1000,
      signup_completed: 60,
      activated: 12,
      begin_checkout: 40,
      purchase: 0,
      return_visit: 100,
    },
    intelligence: makeIntel({
      channels: [
        { channel: "facebook", signups: 40, activated: 8, subscriptions: 1, revenue_cents: 4900 },
      ],
      referrals: [{ referral: "P", signups: 30, activated: 5, subscriptions: 0, revenue_cents: 0 }],
      attribution: {
        coverage: computeCoverage(12, 18),
        sources: {
          by_type: { utm: 12, paid_click: 0, referral: 0, unknown: 18 },
          unknown_rate: 0.6,
          status: "VALID",
        },
        top_source: "facebook",
        source: "test",
      },
    }),
    ...over,
  });
}

/** Jeu B — ACQUISITION_STRENGTH (taux signup au-dessus du seuil haut). */
function dataSetB(): GrowthData {
  return makeData({
    funnel: {
      page_view: 100,
      signup_completed: 40,
      activated: 0,
      begin_checkout: 0,
      purchase: 0,
      return_visit: 0,
    },
    previous_funnel: {
      page_view: 100,
      signup_completed: 40,
      activated: 4,
      begin_checkout: 0,
      purchase: 0,
      return_visit: 0,
    },
  });
}

/** Jeu C — MONETIZATION_OPPORTUNITY (activés ≥ min, achats = 0). */
function dataSetC(): GrowthData {
  return makeData({
    funnel: {
      page_view: 200,
      signup_completed: 70,
      activated: 35,
      begin_checkout: 0,
      purchase: 0,
      return_visit: 0,
    },
    previous_funnel: {
      page_view: 200,
      signup_completed: 70,
      activated: 35,
      begin_checkout: 0,
      purchase: 0,
      return_visit: 0,
    },
  });
}

function allPlans(queue: ReturnType<typeof buildActionPlans>): GrowthActionPlan[] {
  return [...queue.now, ...queue.this_week, ...queue.backlog, ...queue.blocked];
}

function findPlan(
  queue: ReturnType<typeof buildActionPlans>,
  type: string,
): GrowthActionPlan | undefined {
  return allPlans(queue).find((p) => p.opportunity_type === type);
}

describe("P2.3 §5 — mapping opportunité → recommandation → plan d'action", () => {
  const bundleA = runDecisionLayer(dataSetA());
  const bundleB = runDecisionLayer(dataSetB());
  const bundleC = runDecisionLayer(dataSetC());

  it("les 9 types d'opportunité produisent chacun un plan", () => {
    const union = new Set<string>();
    for (const q of [bundleA.actions, bundleB.actions, bundleC.actions]) {
      for (const p of allPlans(q)) union.add(p.opportunity_type);
    }
    expect([...union].sort()).toEqual(
      [
        "ACQUISITION_STRENGTH",
        "ACQUISITION_WEAKNESS",
        "ACTIVATION_BOTTLENECK",
        "ATTRIBUTION_GAP",
        "CHANNEL_ACTIVATION_GAP",
        "CHECKOUT_DROPOFF",
        "MONETIZATION_OPPORTUNITY",
        "REFERRAL_ACTIVATION_GAP",
        "RETENTION_OPPORTUNITY",
      ].sort(),
    );
  });

  it("chaque plan référence sa recommandation et son opportunité", () => {
    for (const bundle of [bundleA, bundleB, bundleC]) {
      for (const plan of allPlans(bundle.actions)) {
        const opp = bundle.opportunities.find((o) => o.type === plan.opportunity_type);
        const reco = bundle.recommendations.find((r) => r.opportunity_type === plan.opportunity_type);
        expect(opp).toBeDefined();
        expect(reco).toBeDefined();
        expect(plan.opportunity_id).toBe(opp!.id);
        expect(plan.recommendation_id).toBe(reco!.id);
        expect(plan.action_type).toBe(reco!.action.type);
        expect(plan.objective).toBe(reco!.what);
        expect(plan.target_segment).toBe(opp!.segment);
        expect(plan.priority_score).toBe(opp!.priority_score);
        expect(plan.evidence[0]).toBe(opp!.evidence);
      }
    }
  });

  it("ids déterministes au format action_<type>#<période>#<segment>", () => {
    for (const plan of allPlans(bundleA.actions)) {
      expect(plan.id).toBe(
        actionPlanId(plan.opportunity_type, PERIOD_LABEL, plan.target_segment),
      );
      expect(plan.id).toContain(`#${PERIOD_LABEL}#`);
      expect(plan.created_at).toBe(NOW);
    }
    // segment null → « global ».
    expect(actionPlanId("ATTRIBUTION_GAP", PERIOD_LABEL, null)).toBe(
      `action_ATTRIBUTION_GAP#${PERIOD_LABEL}#global`,
    );
  });

  it("plans 100 % PROPOSED : mode, status, meta actions_executed", () => {
    for (const bundle of [bundleA, bundleB, bundleC]) {
      expect(bundle.meta.actions_executed).toBe(false);
      for (const plan of allPlans(bundle.actions)) {
        expect(plan.mode).toBe("PROPOSED");
        expect(plan.status).toBe("PROPOSED");
      }
    }
  });

  it("contenu minimal : titre, objectif, étapes, garde-fous, mesure", () => {
    for (const plan of allPlans(bundleA.actions)) {
      expect(plan.title.length).toBeGreaterThan(10);
      expect(plan.objective.length).toBeGreaterThan(10);
      expect(plan.steps.length).toBeGreaterThanOrEqual(3);
      expect(plan.guardrails.length).toBeGreaterThanOrEqual(3);
      expect(plan.success_metrics.length).toBeGreaterThanOrEqual(1);
      expect(["LOW", "MEDIUM", "HIGH"]).toContain(plan.effort);
      expect(["LOW", "MEDIUM", "HIGH"]).toContain(plan.expected_impact);
      expect(["LOW", "MEDIUM", "HIGH"]).toContain(plan.urgency);
    }
  });
});

describe("P2.3 §6 — actionnabilité (HIGH/MEDIUM/LOW/BLOCKED)", () => {
  const base = { status: "VALID" as const, confidence: 90, priority_score: 80 };

  it("statut de la recommandation non VALID → BLOCKED", () => {
    expect(computeActionability({ status: "INSUFFICIENT_DATA" }, { ...base })).toBe("BLOCKED");
    expect(computeActionability({ status: "UNAVAILABLE" }, { ...base })).toBe("BLOCKED");
  });

  it("statut de l'opportunité non VALID → BLOCKED", () => {
    expect(
      computeActionability({ status: "VALID" }, { ...base, status: "INSUFFICIENT_DATA" }),
    ).toBe("BLOCKED");
  });

  it("confiance sous le plancher (couverture d'attribution) → BLOCKED", () => {
    expect(
      computeActionability({ status: "VALID" }, { ...base, confidence: ACTION_CONFIDENCE_FLOOR - 1 }),
    ).toBe("BLOCKED");
    expect(
      computeActionability({ status: "VALID" }, { ...base, confidence: ACTION_CONFIDENCE_FLOOR }),
    ).toBe("HIGH");
  });

  it("bandes par score : ≥60 HIGH · ≥40 MEDIUM · sinon LOW", () => {
    const at = (score: number) =>
      computeActionability({ status: "VALID" }, { ...base, priority_score: score });
    expect(at(ACTION_SCORE_BUCKETS.high)).toBe("HIGH");
    expect(at(ACTION_SCORE_BUCKETS.high - 1)).toBe("MEDIUM");
    expect(at(ACTION_SCORE_BUCKETS.medium)).toBe("MEDIUM");
    expect(at(ACTION_SCORE_BUCKETS.medium - 1)).toBe("LOW");
    expect(at(0)).toBe("LOW");
  });

  it("intégration : canal sous couverture faible rejoint le bucket blocked", () => {
    // couverture 12/100 = 0.12 → plafond de confiance du canal = 12 < 40.
    const bundle = runDecisionLayer(
      dataSetA({
        intelligence: makeIntel({
          channels: [
            { channel: "facebook", signups: 40, activated: 8, subscriptions: 1, revenue_cents: 4900 },
          ],
          referrals: [{ referral: "P", signups: 30, activated: 5, subscriptions: 0, revenue_cents: 0 }],
          attribution: {
            coverage: computeCoverage(12, 88),
            sources: {
              by_type: { utm: 12, paid_click: 0, referral: 0, unknown: 88 },
              unknown_rate: 0.88,
              status: "VALID",
            },
            top_source: "facebook",
            source: "test",
          },
        }),
      }),
    );
    const blocked = bundle.actions.blocked;
    expect(blocked.length).toBeGreaterThanOrEqual(1);
    const channelPlan = blocked.find((p) => p.opportunity_type === "CHANNEL_ACTIVATION_GAP");
    expect(channelPlan).toBeDefined();
    expect(channelPlan!.actionability).toBe("BLOCKED");
    expect(channelPlan!.horizon).toBe("BACKLOG");
    expect(channelPlan!.experiment_ready).toBe(false);
    // Aucun plan BLOCKED n'apparaît dans un horizon.
    const inHorizons = [...bundle.actions.now, ...bundle.actions.this_week, ...bundle.actions.backlog];
    expect(inHorizons.some((p) => p.actionability === "BLOCKED")).toBe(false);
  });

  it("recommandation brute non VALID → plan BLOCKED (synthèse directe)", () => {
    const data = makeData();
    const opp: GrowthOpportunity = {
      id: "opp_X",
      type: "ACTIVATION_BOTTLENECK",
      segment: null,
      evidence: "signup_completed = 40 · activated = 0",
      impact: 80,
      confidence: 90,
      urgency: 50,
      priority_score: 36,
      priority: "LOW",
      status: "VALID",
      created_at: NOW,
    };
    const reco: GrowthRecommendation = {
      id: "rec_X",
      what: "Simplifier le parcours d'activation.",
      why: "test",
      for_whom: null,
      when: "immediately",
      expected_impact: "test",
      confidence: 90,
      priority: "LOW",
      priority_score: 36,
      opportunity_type: "ACTIVATION_BOTTLENECK",
      evidence: opp.evidence,
      urgency: 50,
      action: { type: "IMPROVE_ONBOARDING", mode: "PROPOSED", segment: null, note: "n" },
      status: "INSUFFICIENT_DATA",
      created_at: NOW,
    };
    const plan = buildActionPlan(reco, opp, {
      data,
      recommendations: [reco],
      opportunities: [opp],
      metrics: computeMetrics(data),
    });
    expect(plan.actionability).toBe("BLOCKED");
    expect(plan.action_priority).toBe("P3");
    expect(plan.status).toBe("PROPOSED");
  });
});

describe("P2.3 §7-§8 — priorité P0-P3 et horizons", () => {
  it("matrice complète computeActionPriority", () => {
    expect(computeActionPriority("BLOCKED", "CRITICAL")).toBe("P3");
    expect(computeActionPriority("BLOCKED", "LOW")).toBe("P3");
    expect(computeActionPriority("HIGH", "CRITICAL")).toBe("P0");
    expect(computeActionPriority("HIGH", "HIGH")).toBe("P1");
    expect(computeActionPriority("HIGH", "MEDIUM")).toBe("P2");
    expect(computeActionPriority("MEDIUM", "CRITICAL")).toBe("P2");
    expect(computeActionPriority("MEDIUM", "LOW")).toBe("P2");
    expect(computeActionPriority("LOW", "CRITICAL")).toBe("P2");
    expect(computeActionPriority("LOW", "HIGH")).toBe("P2");
    expect(computeActionPriority("LOW", "MEDIUM")).toBe("P2");
    expect(computeActionPriority("LOW", "LOW")).toBe("P3");
    expect(computeActionPriority("LOW", "IGNORE")).toBe("P3");
  });

  it("horizons : P0/P1 → NOW · P2 → THIS_WEEK · P3 → BACKLOG", () => {
    expect(horizonForPriority("P0")).toBe("NOW");
    expect(horizonForPriority("P1")).toBe("NOW");
    expect(horizonForPriority("P2")).toBe("THIS_WEEK");
    expect(horizonForPriority("P3")).toBe("BACKLOG");
  });

  it("buckets cohérents et disjoints sur les jeux réels", () => {
    const bundles = [runDecisionLayer(dataSetA()), runDecisionLayer(dataSetB()), runDecisionLayer(dataSetC())];
    for (const bundle of bundles) {
      const q = bundle.actions;
      expect(Object.keys(q)).toEqual(["now", "this_week", "backlog", "blocked"]);
      const all = allPlans(q);
      expect(new Set(all.map((p) => p.id)).size).toBe(all.length);
      for (const p of q.now) {
        expect(["P0", "P1"]).toContain(p.action_priority);
        expect(p.horizon).toBe("NOW");
      }
      for (const p of q.this_week) {
        expect(p.action_priority).toBe("P2");
        expect(p.horizon).toBe("THIS_WEEK");
      }
      for (const p of q.backlog) {
        expect(p.action_priority).toBe("P3");
        expect(p.horizon).toBe("BACKLOG");
        expect(p.actionability).not.toBe("BLOCKED");
      }
      for (const p of q.blocked) expect(p.actionability).toBe("BLOCKED");
      // Chaque plan non bloqué est exactement dans un horizon.
      for (const p of all.filter((x) => x.actionability !== "BLOCKED")) {
        const buckets = [q.now, q.this_week, q.backlog].filter((b) => b.some((x) => x.id === p.id));
        expect(buckets.length).toBe(1);
      }
    }
  });

  it("jeu dégradé (activated 0, tendance en baisse) → plan P0 en NOW", () => {
    const bundle = runDecisionLayer(
      dataSetA({
        previous_funnel: {
          page_view: 1000,
          signup_completed: 60,
          activated: 12,
          begin_checkout: 40,
          purchase: 0,
          return_visit: 100,
        },
        funnel: {
          page_view: 1000,
          signup_completed: 60,
          activated: 0,
          begin_checkout: 40,
          purchase: 0,
          return_visit: 100,
        },
      }),
    );
    const plan = findPlan(bundle.actions, "ACTIVATION_BOTTLENECK");
    expect(plan).toBeDefined();
    expect(plan!.actionability).toBe("HIGH");
    expect(plan!.action_priority).toBe("P0");
    expect(plan!.horizon).toBe("NOW");
    expect(bundle.actions.now.map((p) => p.id)).toContain(plan!.id);
  });
});

describe("P2.3 §10 — dédoublonnage et déterminisme", () => {
  it("recommandations dupliquées → un seul plan, score le plus haut conservé", () => {
    const data = dataSetA();
    const { metrics, opportunities } = evaluateRules(data);
    const recos = opportunities.map((o) => buildRecommendation(o, data));
    const queue = buildActionPlans({
      data,
      recommendations: [...recos, ...recos],
      opportunities: [...opportunities, ...opportunities],
      metrics,
    });
    const all = allPlans(queue);
    expect(all.length).toBe(opportunities.length);
    expect(new Set(all.map((p) => p.id)).size).toBe(all.length);
    for (const plan of all) {
      const opp = opportunities.find((o) => o.type === plan.opportunity_type)!;
      expect(plan.priority_score).toBe(opp.priority_score);
    }
  });

  it("tri déterministe : score décroissant puis id croissant", () => {
    const queue = buildActionQueue(
      allPlans(runDecisionLayer(dataSetA()).actions)
        .concat(allPlans(runDecisionLayer(dataSetB()).actions)),
    );
    for (const bucket of [queue.now, queue.this_week, queue.backlog, queue.blocked]) {
      const expected = [...bucket]
        .sort((a, b) => b.priority_score - a.priority_score || a.id.localeCompare(b.id))
        .map((p) => p.id);
      expect(bucket.map((p) => p.id)).toEqual(expected);
    }
  });
});

describe("P2.3 §12-§13 — plan de mesure : baseline, cible, calibration", () => {
  const bundleA = runDecisionLayer(dataSetA());

  it("taux à seuil documenté → THRESHOLD_BASED avec la cible de thresholds.ts", () => {
    const activation = findPlan(bundleA.actions, "ACTIVATION_BOTTLENECK")!;
    expect(activation.success_metrics[0]).toEqual({
      metric: "activation_rate",
      baseline: 0.2,
      target: 0.3,
      direction: "UP",
      minimum_sample: 30,
      target_calibration: "THRESHOLD_BASED",
    });
    const checkout = findPlan(bundleA.actions, "CHECKOUT_DROPOFF")!;
    expect(checkout.success_metrics[0]).toEqual({
      metric: "checkout_dropoff",
      baseline: 1,
      target: 0.5,
      direction: "DOWN",
      minimum_sample: 10,
      target_calibration: "THRESHOLD_BASED",
    });
    const retention = findPlan(bundleA.actions, "RETENTION_OPPORTUNITY")!;
    expect(retention.success_metrics[0]).toEqual({
      metric: "return_visit_rate",
      baseline: 0.1,
      target: 0.2,
      direction: "UP",
      minimum_sample: 30,
      target_calibration: "THRESHOLD_BASED",
    });
    const weakness = findPlan(bundleA.actions, "ACQUISITION_WEAKNESS")!;
    expect(weakness.success_metrics[0]).toEqual({
      metric: "signup_rate",
      baseline: 0.06,
      target: 0.1,
      direction: "UP",
      minimum_sample: 30,
      target_calibration: "THRESHOLD_BASED",
    });
  });

  it("seuil haut pour une force d'acquisition, couverture pour l'attribution", () => {
    const strength = findPlan(runDecisionLayer(dataSetB()).actions, "ACQUISITION_STRENGTH")!;
    expect(strength.success_metrics[0].metric).toBe("signup_rate");
    expect(strength.success_metrics[0].target).toBe(0.3);
    const gap = findPlan(bundleA.actions, "ATTRIBUTION_GAP")!;
    expect(gap.success_metrics[0]).toEqual({
      metric: "attribution_coverage",
      baseline: 0.4,
      target: 1,
      direction: "UP",
      minimum_sample: 30,
      target_calibration: "THRESHOLD_BASED",
    });
  });

  it("canaux et parrainage : baseline propre au canal / à l'agrégat filleuls", () => {
    const channel = findPlan(bundleA.actions, "CHANNEL_ACTIVATION_GAP")!;
    expect(channel.channel).toBe("facebook");
    expect(channel.success_metrics[0].baseline).toBeCloseTo(0.2, 10);
    const referral = findPlan(bundleA.actions, "REFERRAL_ACTIVATION_GAP")!;
    expect(referral.success_metrics[0].baseline).toBeCloseTo(5 / 30, 10);
    expect(referral.success_metrics[0].target).toBe(0.3);
  });

  it("sans seuil documenté → target null + TARGET_NOT_CALIBRATED", () => {
    const monetization = findPlan(runDecisionLayer(dataSetC()).actions, "MONETIZATION_OPPORTUNITY")!;
    expect(monetization.success_metrics[0]).toEqual({
      metric: "subscription_count",
      baseline: 0,
      target: null,
      direction: "UP",
      minimum_sample: 30,
      target_calibration: "TARGET_NOT_CALIBRATED",
    });
    expect(monetization.experiment_ready).toBe(true);
  });

  it("baseline nulle → cible non calibrée et experiment_ready false", () => {
    const data = makeData(); // funnel vide : activationRate null
    const opp: GrowthOpportunity = {
      id: "opp_X",
      type: "ACTIVATION_BOTTLENECK",
      segment: null,
      evidence: "signup_completed = 0 · activated = 0",
      impact: 50,
      confidence: 90,
      urgency: 50,
      priority_score: 23,
      priority: "LOW",
      status: "VALID",
      created_at: NOW,
    };
    const reco: GrowthRecommendation = {
      id: "rec_X",
      what: "Simplifier le parcours d'activation.",
      why: "test",
      for_whom: null,
      when: "immediately",
      expected_impact: "test",
      confidence: 90,
      priority: "LOW",
      priority_score: 23,
      opportunity_type: "ACTIVATION_BOTTLENECK",
      evidence: opp.evidence,
      urgency: 50,
      action: { type: "IMPROVE_ONBOARDING", mode: "PROPOSED", segment: null, note: "n" },
      status: "VALID",
      created_at: NOW,
    };
    const plan = buildActionPlan(reco, opp, {
      data,
      recommendations: [reco],
      opportunities: [opp],
      metrics: computeMetrics(data),
    });
    expect(plan.success_metrics[0].baseline).toBeNull();
    expect(plan.success_metrics[0].target).toBeNull();
    expect(plan.success_metrics[0].target_calibration).toBe("TARGET_NOT_CALIBRATED");
    expect(plan.experiment_ready).toBe(false);
  });
});

describe("P2.3 §14 — evidence factuelle, aucun qualitatif inventé", () => {
  const FORBIDDEN = [
    /excellent/i,
    /\bbon\b/i,
    /\bmauvais\b/i,
    /\bfaible\b/i,
    /moyenne/i,
    /ivoirien/i,
    /meilleur/i,
    /\bpire\b/i,
    /benchmark edtech/i,
    /au-dessus de la moyenne/i,
  ];

  it("evidence = données calculées + score/confiance/actionnabilité", () => {
    const bundle = runDecisionLayer(dataSetA());
    for (const plan of allPlans(bundle.actions)) {
      expect(plan.evidence.length).toBeGreaterThanOrEqual(2);
      expect(plan.evidence[0]).toBe(
        bundle.opportunities.find((o) => o.type === plan.opportunity_type)!.evidence,
      );
      expect(plan.evidence[1]).toContain(`score ${plan.priority_score}`);
      expect(plan.evidence[1]).toContain(`actionnabilité ${plan.actionability}`);
      expect(plan.evidence[0]).toMatch(/\d/);
    }
  });

  it("aucun qualitatif hors seuils dans les textes des plans", () => {
    const bundles = [runDecisionLayer(dataSetA()), runDecisionLayer(dataSetB()), runDecisionLayer(dataSetC())];
    const texts: string[] = [];
    for (const b of bundles) {
      for (const p of allPlans(b.actions)) {
        texts.push(p.title, p.objective, p.evidence.join(" | "));
        texts.push(...p.steps, ...p.guardrails);
      }
    }
    const corpus = texts.join(" | ");
    for (const pattern of FORBIDDEN) {
      expect({ pattern: pattern.source, match: corpus.match(pattern)?.[0] ?? null }).toEqual({
        pattern: pattern.source,
        match: null,
      });
    }
  });

  it("module action-plans.ts : zéro appel réseau/LLM/secret/écriture", () => {
    const root = process.cwd();
    const dir = join(root, "src/lib/growth/decision");
    const files = readdirSync(dir).filter((f) => f.endsWith(".ts"));
    expect(files.length).toBeGreaterThanOrEqual(8);
    const forbidden =
      /(fetch\s*\(|axios|generateWithGateway|getAIProvider|generateStrategy|generateRecommendation|openai|anthropic|n8n|whatsapp|mailer|sendBrevo|process\.env|DATABASE_URL|Bearer\s|INSERT INTO|UPDATE\s+\w+\s+SET|DELETE FROM)/i;
    for (const f of ["action-plans.ts", "types.ts", "index.ts"]) {
      const content = readFileSync(join(dir, f), "utf8");
      expect({ file: f, match: content.match(forbidden)?.[0] ?? null }).toEqual({
        file: f,
        match: null,
      });
    }
  });
});

describe("P2.3 §19-§20 — security : admin, read-only, UI PROPOSED", () => {
  const root = process.cwd();

  it("route insights : admin, GET seul, aucune mutation, aucune action externe", () => {
    const content = readFileSync(
      join(root, "src/app/api/admin/growth/insights/route.ts"),
      "utf8",
    );
    expect(content).toContain("requireAdmin");
    expect(content).toContain("guardApi");
    expect(content).toContain("runDecisionLayer");
    expect(content).toContain("read-only");
    expect(content).not.toMatch(/export const POST/);
    expect(content).not.toMatch(/INSERT INTO|UPDATE\s+\w+\s+SET|DELETE FROM/);
    expect(content).not.toMatch(/generateStrategy|generateRecommendation|n8n|whatsapp|mailer/i);
  });

  it("dossier api/admin/growth : une seule route, lecture seule", () => {
    const dir = join(root, "src/app/api/admin/growth");
    const files = (readdirSync(dir, { recursive: true }) as string[]).map((f) =>
      f.replace(/\\/g, "/"),
    );
    expect(files.filter((f) => f.endsWith("route.ts"))).toEqual(["insights/route.ts"]);
  });

  it("panneau UI : file d'actions affichée, PROPOSED, aucune action exposée", () => {
    const content = readFileSync(
      join(root, "src/app/espace-admin/growth/GrowthInsightsPanel.tsx"),
      "utf8",
    );
    expect(content).toContain('fetch("/api/admin/growth/insights")');
    expect(content).toContain("Actions recommandées");
    expect(content).toContain("À faire maintenant");
    expect(content).toContain("Cette semaine");
    expect(content).toContain("À surveiller");
    expect(content).toContain("Bloquées par les données");
    expect(content).toContain("PROPOSED");
    expect(content).not.toMatch(/fetch\((?!["'`])|POST\s*\{|\.post\(/);
    expect(content).not.toMatch(/draggable|onDrop|Kanban/i);
  });

  it("aucune dépendance ajoutée", () => {
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    };
    for (const dep of [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)]) {
      expect(dep).not.toMatch(/openai|anthropic|gemini|cohere|mistral/i);
    }
  });

  it("réponse sans PII : aucun email/téléphone dans le bundle", () => {
    const corpus = JSON.stringify(runDecisionLayer(dataSetA()));
    expect(corpus).not.toMatch(/@edukora\.net|@test\.ci|\+225\s?\d/);
  });
});

describe("P2.3 §18 — performance : 0 requête supplémentaire", () => {
  it("runDecisionLayer (bundle avec actions) n'exécute aucune requête", () => {
    const origQuery = db.query;
    const origQueryOne = db.queryOne;
    const spyQ = jest.spyOn(db, "query");
    const spyQO = jest.spyOn(db, "queryOne");
    runDecisionLayer(dataSetA());
    expect(spyQ.mock.calls.length).toBe(0);
    expect(spyQO.mock.calls.length).toBe(0);
    spyQ.mockRestore();
    spyQO.mockRestore();
    expect(typeof origQuery).toBe("function");
    expect(typeof origQueryOne).toBe("function");
  });

  it("computeGrowthData inchangé : bornes 51..53 (P2.3 n'ajoute rien)", async () => {
    const anchor = "2099-03-01";
    await computeGrowthData({ anchorDate: anchor, days: 7, now: new Date(NOW) });

    const origQuery = db.query;
    const origQueryOne = db.queryOne;
    const spyQ = jest
      .spyOn(db, "query")
      .mockImplementation((async (sql: string, ...args: unknown[]) =>
        (origQuery as any)(sql, ...args)) as never);
    const spyQO = jest
      .spyOn(db, "queryOne")
      .mockImplementation((async (sql: string, ...args: unknown[]) =>
        (origQueryOne as any)(sql, ...args)) as never);
    await computeGrowthData({ anchorDate: anchor, days: 7, now: new Date(NOW) });
    const count = spyQ.mock.calls.length + spyQO.mock.calls.length;
    spyQ.mockRestore();
    spyQO.mockRestore();

    // P2.1 (51) + P2.2 (2) = 53 : P2.3 est 100 % calcul pur → 0 ajout.
    expect(count).toBeGreaterThanOrEqual(51);
    expect(count).toBeLessThanOrEqual(53);
  }, 30000);
});

describe("P2.3 §15 — idempotence : même input → même plans", () => {
  it("deux exécutions successives : actions strictement identiques", () => {
    const a = runDecisionLayer(dataSetA());
    const b = runDecisionLayer(dataSetA());
    expect(a.actions).toStrictEqual(b.actions);
    expect(a).toStrictEqual(b);
  });

  it("le bundle P2.3 garde les 6 métriques d'insights P2.1 (contrat inchangé)", () => {
    const bundle = runDecisionLayer(dataSetA());
    expect(bundle.insights.map((i) => i.metric)).toEqual([
      "signup_rate",
      "activation_rate",
      "checkout_dropoff",
      "purchase_rate",
      "return_visit_rate",
      "retention_d7",
    ]);
    expect(bundle.health.length).toBe(5);
    expect(bundle.meta).toEqual({
      engine: "deterministic",
      external_calls: false,
      test_users_excluded: true,
      actions_executed: false,
    });
  });
});

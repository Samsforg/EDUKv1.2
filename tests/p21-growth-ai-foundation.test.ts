/**
 * P2.1 — Growth AI Decision Layer (cahier §§4-19).
 *
 * Blocs : signaux · segments · opportunités · recommandations · rule
 * engine · safety (test users, aucun insight fabriqué, aucun appel
 * externe) · idempotence · contrat §13 · santé §17.
 *
 * Le moteur est pur : fixtures synthétiques sur GrowthData. La couche
 * data (SQL réel, SQLite locale) est couverte par deux tests orientés
 * exclusion des comptes de test et comptages DISTINCT.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  computeHealth,
  computeMetrics,
  runDecisionLayer,
} from "@/lib/growth/decision";
import { evaluateRules } from "@/lib/growth/decision/rules";
import { SEGMENT_KEYS, SEGMENT_SOURCES, buildSegments } from "@/lib/growth/decision/segments";
import { buildRecommendation } from "@/lib/growth/decision/recommend";
import {
  clampScore,
  computeConfidence,
  computeImpact,
  computePriorityScore,
  computeUrgency,
  gapSeverity,
  scoreBucket,
  trendPct,
} from "@/lib/growth/decision/scoring";
import {
  MIN_SAMPLE,
  PRIORITY_BUCKETS,
  SCORE_SCALE,
  THRESHOLDS,
  URGENCY,
} from "@/lib/growth/decision/thresholds";
import { computeGrowthData } from "@/lib/growth/decision/data";
import type { GrowthData, SegmentKey } from "@/lib/growth/decision/types";
import { queryOne, run } from "@/lib/db";
import { ensureAnalyticsTable } from "@/lib/analytics-db";

const NOW = "1999-01-08T12:00:00.000Z";
const PERIOD = { from: "1999-01-01", to: "1999-01-07", days: 7 };
const PREV = { from: "1998-12-25", to: "1998-12-31", days: 7 };

const EMPTY_SEGMENTS: Record<SegmentKey, number> = {
  NEW_VISITOR: 0,
  REGISTERED_NOT_ACTIVATED: 0,
  ACTIVATED_NOT_PAID: 0,
  PAID_USER: 0,
  RETURNING_USER: 0,
  HIGH_INTENT: 0,
  DORMANT_USER: 0,
};

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

/** Fixture « toutes règles » : R1+R2+R3+R4+R5(low) déclenchées ensemble. */
function allRulesData(over: Partial<GrowthData> = {}): GrowthData {
  return makeData({
    funnel: {
      page_view: 2000,
      signup_completed: 150,
      activated: 35,
      begin_checkout: 40,
      purchase: 0,
      return_visit: 50,
    },
    ...over,
  });
}

describe("P2.1 §9 — score de priorité et seuils constants", () => {
  it("échelle bornée 0-100", () => {
    expect(SCORE_SCALE).toBe(100);
    expect(clampScore(-5)).toBe(0);
    expect(clampScore(150)).toBe(100);
    expect(clampScore(Number.NaN)).toBe(0);
    expect(clampScore(42.4)).toBe(42);
  });

  it.each([
    [100, "CRITICAL"],
    [80, "CRITICAL"],
    [79, "HIGH"],
    [60, "HIGH"],
    [59, "MEDIUM"],
    [40, "MEDIUM"],
    [39, "LOW"],
    [20, "LOW"],
    [19, "IGNORE"],
    [0, "IGNORE"],
  ])("scoreBucket(%i) = %s", (score, label) => {
    expect(scoreBucket(score)).toBe(label);
  });

  it("PRIORITY_BUCKETS couvre exactement 0-100 sans trou", () => {
    expect(PRIORITY_BUCKETS).toHaveLength(5);
    for (const b of PRIORITY_BUCKETS) {
      expect(b.min).toBeLessThanOrEqual(b.max);
      expect(scoreBucket(b.min)).toBe(b.label);
      expect(scoreBucket(b.max)).toBe(b.label);
    }
    expect(PRIORITY_BUCKETS.map((b) => b.label)).toEqual([
      "CRITICAL",
      "HIGH",
      "MEDIUM",
      "LOW",
      "IGNORE",
    ]);
  });

  it("formule priority_score = round(impact × confidence × urgency / 10000)", () => {
    expect(computePriorityScore(100, 100, 100)).toBe(100);
    expect(computePriorityScore(0, 100, 100)).toBe(0);
    expect(computePriorityScore(50, 50, 50)).toBe(13);
    expect(computePriorityScore(80, 90, 70)).toBe(50);
    expect(computePriorityScore(-10, 200, 50)).toBe(0);
  });

  it("confidence linéaire jusqu'au min sample puis 100", () => {
    expect(computeConfidence(0, MIN_SAMPLE.traffic_rate)).toBe(0);
    expect(computeConfidence(15, MIN_SAMPLE.traffic_rate)).toBe(50);
    expect(computeConfidence(30, MIN_SAMPLE.traffic_rate)).toBe(100);
    expect(computeConfidence(120, MIN_SAMPLE.traffic_rate)).toBe(100);
    expect(computeConfidence(29, MIN_SAMPLE.traffic_rate)).toBeLessThan(100);
  });

  it("impact = écart relatif saturé à 100", () => {
    expect(computeImpact(0.3, 0.3)).toBe(0);
    expect(computeImpact(0.15, 0.3)).toBe(50);
    expect(computeImpact(0.6, 0.3)).toBe(100);
    expect(computeImpact(1, 0)).toBe(100);
  });

  it("urgence : table constante (neutre sans trend, hausse = 40, chute = plafond)", () => {
    expect(computeUrgency(null)).toBe(URGENCY.NO_TREND);
    expect(computeUrgency(0)).toBe(URGENCY.STABLE);
    expect(computeUrgency(25)).toBe(URGENCY.STABLE);
    expect(computeUrgency(-10)).toBe(70);
    expect(computeUrgency(-40)).toBe(100);
    expect(computeUrgency(-90)).toBe(100);
  });

  it("gravité selon l'écart au seuil", () => {
    expect(gapSeverity(0.28, 0.3)).toBe("low");
    expect(gapSeverity(0.2, 0.3)).toBe("medium");
    expect(gapSeverity(0.1, 0.3)).toBe("high");
  });

  it("trendPct : variation relative, null sans base", () => {
    expect(trendPct(50, 100)).toBe(-50);
    expect(trendPct(100, 50)).toBe(100);
    expect(trendPct(5, 0)).toBeNull();
  });

  it("seuils du rule engine fixes et documentés", () => {
    expect(THRESHOLDS.activation_rate.min).toBe(0.3);
    expect(THRESHOLDS.signup_rate.min).toBe(0.1);
    expect(THRESHOLDS.signup_rate.high).toBe(0.3);
    expect(THRESHOLDS.checkout_dropoff.max).toBe(0.5);
    expect(THRESHOLDS.return_visit_rate.min).toBe(0.2);
    expect(MIN_SAMPLE.traffic_rate).toBe(30);
    expect(MIN_SAMPLE.checkout_rate).toBe(10);
    expect(MIN_SAMPLE.monetization).toBe(30);
    expect(MIN_SAMPLE.retention).toBe(30);
  });
});

describe("P2.1 §4 — signaux", () => {
  it("signal valide : activation faible sur échantillon suffisant", () => {
    const data = makeData({ funnel: { signup_completed: 100, activated: 25 } });
    const { signals } = evaluateRules(data);
    const sig = signals.find((s) => s.type === "activation_rate_low");
    expect(sig).toBeDefined();
    expect(sig!.status).toBe("VALID");
    expect(sig!.value).toBeCloseTo(0.25, 10);
    expect(sig!.threshold).toBe(THRESHOLDS.activation_rate.min);
    expect(sig!.severity).toBe("low");
    expect(sig!.created_at).toBe(NOW);
  });

  it("signal insuffisant : échantillon < 30 → INSUFFICIENT_DATA, aucune opportunité", () => {
    const data = makeData({ funnel: { signup_completed: 10, activated: 2 } });
    const { signals, opportunities } = evaluateRules(data);
    const sig = signals.find((s) => s.type === "activation_rate_low");
    expect(sig).toBeDefined();
    expect(sig!.status).toBe("INSUFFICIENT_DATA");
    expect(sig!.severity).toBe("info");
    expect(opportunities).toHaveLength(0);
  });

  it("frontière exacte du seuil : 0.30 n'est PAS « low »", () => {
    const data = makeData({ funnel: { signup_completed: 100, activated: 30 } });
    const { signals } = evaluateRules(data);
    expect(signals.find((s) => s.type === "activation_rate_low")).toBeUndefined();
  });

  it("période du signal = fenêtre analysée", () => {
    const data = makeData({ funnel: { signup_completed: 100, activated: 25 } });
    const { signals } = evaluateRules(data);
    const sig = signals.find((s) => s.type === "activation_rate_low")!;
    expect(sig.period).toBe("1999-01-01/1999-01-07");
    expect(sig.id).toBe(`sig_activation_rate#${sig.period}`);
  });

  it("checkout dropoff valide au-dessus du seuil 0.50", () => {
    const data = makeData({ funnel: { begin_checkout: 40, purchase: 10 } });
    const { signals } = evaluateRules(data);
    const sig = signals.find((s) => s.type === "checkout_dropoff_high");
    expect(sig!.status).toBe("VALID");
    expect(sig!.value).toBeCloseTo(0.75, 10);
    expect(sig!.threshold).toBe(THRESHOLDS.checkout_dropoff.max);
  });

  it("checkout dropoff sous le seuil → aucun signal", () => {
    const data = makeData({ funnel: { begin_checkout: 40, purchase: 25 } });
    const { signals } = evaluateRules(data);
    expect(signals.find((s) => s.type === "checkout_dropoff_high")).toBeUndefined();
  });

  it("checkout dropoff : sample < 10 → INSUFFICIENT_DATA sans opportunité", () => {
    const data = makeData({ funnel: { begin_checkout: 5, purchase: 0 } });
    const { signals, opportunities } = evaluateRules(data);
    const sig = signals.find((s) => s.type === "checkout_dropoff_high");
    expect(sig!.status).toBe("INSUFFICIENT_DATA");
    expect(opportunities.filter((o) => o.type === "CHECKOUT_DROPOFF")).toHaveLength(0);
  });

  it("signal signup_rate_high sur acquisition performante", () => {
    const data = makeData({ funnel: { page_view: 100, signup_completed: 40 } });
    const { signals } = evaluateRules(data);
    const sig = signals.find((s) => s.type === "signup_rate_high");
    expect(sig).toBeDefined();
    expect(sig!.status).toBe("VALID");
    expect(sig!.value).toBeCloseTo(0.4, 10);
    expect(sig!.threshold).toBe(THRESHOLDS.signup_rate.high);
  });

  it("signal retention_unavailable toujours présent (état officiel rapporté)", () => {
    const { signals } = evaluateRules(makeData());
    const sig = signals.find((s) => s.type === "retention_unavailable")!;
    expect(sig.status).toBe("INSUFFICIENT_DATA");
    expect(sig.value).toBeNull();
    expect(sig.metric).toBe("retention_d7");
  });
});

describe("P2.1 §5 — segments", () => {
  it("les 7 segments déterministes du cahier, aucune classe interdite", () => {
    expect([...SEGMENT_KEYS]).toEqual([
      "NEW_VISITOR",
      "REGISTERED_NOT_ACTIVATED",
      "ACTIVATED_NOT_PAID",
      "PAID_USER",
      "RETURNING_USER",
      "HIGH_INTENT",
      "DORMANT_USER",
    ]);
    for (const forbidden of ["HIGH_VALUE_USER", "PARENT", "STUDENT", "TEACHER"]) {
      expect(SEGMENT_KEYS).not.toContain(forbidden);
    }
  });

  it("NEW_VISITOR = pages vues réelles de la période", () => {
    const segments = buildSegments(
      makeData({ funnel: { page_view: 1234 }, segments: { ...EMPTY_SEGMENTS, NEW_VISITOR: 1234 } }),
    );
    const nv = segments.find((s) => s.key === "NEW_VISITOR")!;
    expect(nv.count).toBe(1234);
    expect(nv.status).toBe("VALID");
    expect(nv.source).not.toBe("");
  });

  it("segment sous le min sample → INSUFFICIENT_DATA mais comptage réel conservé", () => {
    const segments = buildSegments(
      makeData({ segments: { ...EMPTY_SEGMENTS, PAID_USER: 5 } }),
    );
    const paid = segments.find((s) => s.key === "PAID_USER")!;
    expect(paid.count).toBe(5);
    expect(paid.sample_size).toBe(5);
    expect(paid.status).toBe("INSUFFICIENT_DATA");
  });

  it("segment vide → count 0 réel, jamais de valeur fabriquée", () => {
    const segments = buildSegments(makeData());
    for (const s of segments) {
      expect(s.count).toBe(0);
      expect(s.status).not.toBe("VALID");
    }
  });

  it("sources documentées pour chaque segment", () => {
    for (const key of SEGMENT_KEYS) {
      expect(SEGMENT_SOURCES[key]).toBeTruthy();
    }
    const segments = buildSegments(makeData());
    expect(segments.every((s) => s.source.length > 10)).toBe(true);
  });

  it("segments indisponibles (table absente) → UNAVAILABLE, pas de faux 0 exploitable", () => {
    const segments = buildSegments(makeData({ segments_available: false }));
    for (const s of segments) expect(s.status).toBe("UNAVAILABLE");
    expect(segments.find((s) => s.key === "NEW_VISITOR")!.count).toBe(0);
  });

  it("inscrits non activés : comptage réel du fixture", () => {
    const segments = buildSegments(
      makeData({ segments: { ...EMPTY_SEGMENTS, REGISTERED_NOT_ACTIVATED: 42 } }),
    );
    const seg = segments.find((s) => s.key === "REGISTERED_NOT_ACTIVATED")!;
    expect(seg.count).toBe(42);
    expect(seg.status).toBe("VALID");
  });

  it("dormant : comptage réel du fixture", () => {
    const segments = buildSegments(
      makeData({ segments: { ...EMPTY_SEGMENTS, DORMANT_USER: 30 } }),
    );
    expect(segments.find((s) => s.key === "DORMANT_USER")!.status).toBe("VALID");
  });
});

describe("P2.1 §6 — opportunités", () => {
  it("création : ACTIVATION_BOTTLENECK avec preuve chiffrée et segment", () => {
    const { opportunities } = evaluateRules(
      makeData({ funnel: { signup_completed: 100, activated: 28 } }),
    );
    expect(opportunities).toHaveLength(1);
    const opp = opportunities[0];
    expect(opp.type).toBe("ACTIVATION_BOTTLENECK");
    expect(opp.segment).toBe("REGISTERED_NOT_ACTIVATED");
    expect(opp.evidence).toContain("signup_completed = 100");
    expect(opp.evidence).toContain("activated = 28");
    expect(opp.status).toBe("VALID");
    expect(opp.id).toBe("opp_ACTIVATION_BOTTLENECK#1999-01-01/1999-01-07");
  });

  it("priority_score dans l'échelle et bucket cohérent", () => {
    const { opportunities } = evaluateRules(
      makeData({ funnel: { signup_completed: 100, activated: 10 } }),
    );
    const opp = opportunities[0];
    expect(opp.priority_score).toBeGreaterThanOrEqual(0);
    expect(opp.priority_score).toBeLessThanOrEqual(100);
    expect(opp.priority).toBe(scoreBucket(opp.priority_score));
    expect(opp.impact).toBe(computeImpact(0.1, 0.3));
    expect(opp.urgency).toBe(computeUrgency(null));
  });

  it("confidence pilotée par la taille d'échantillon", () => {
    const small = evaluateRules(makeData({ funnel: { signup_completed: 30, activated: 5 } }));
    const large = evaluateRules(makeData({ funnel: { signup_completed: 300, activated: 50 } }));
    expect(small.opportunities[0].confidence).toBeLessThanOrEqual(large.opportunities[0].confidence);
    expect(large.opportunities[0].confidence).toBe(100);
  });

  it("sample size : 29 inscrits → AUCUNE opportunité (min 30)", () => {
    const { opportunities } = evaluateRules(
      makeData({ funnel: { signup_completed: 29, activated: 5 } }),
    );
    expect(opportunities).toHaveLength(0);
  });

  it("monétisation : ≥30 activations sans achat → MONETIZATION_OPPORTUNITY", () => {
    const { opportunities } = evaluateRules(
      makeData({ funnel: { activated: 35, purchase: 0 } }),
    );
    const opp = opportunities.find((o) => o.type === "MONETIZATION_OPPORTUNITY");
    expect(opp).toBeDefined();
    expect(opp!.segment).toBe("ACTIVATED_NOT_PAID");
    expect(opp!.evidence).toContain("purchase = 0");
  });

  it("monétisation : 29 activations → INSUFFICIENT_DATA, aucune opportunité", () => {
    const { signals, opportunities } = evaluateRules(
      makeData({ funnel: { activated: 29, purchase: 0 } }),
    );
    expect(signals.find((s) => s.type === "purchase_rate_low")!.status).toBe("INSUFFICIENT_DATA");
    expect(opportunities).toHaveLength(0);
  });

  it("opportunités triées par priority_score décroissant", () => {
    const bundle = runDecisionLayer(allRulesData());
    const scores = bundle.opportunities.map((o) => o.priority_score);
    expect(scores.length).toBeGreaterThanOrEqual(3);
    expect([...scores].sort((a, b) => b - a)).toEqual(scores);
  });
});

describe("P2.1 §7/§8 — recommandations et actions proposées", () => {
  const bundle = runDecisionLayer(allRulesData());

  it.each([
    "ACTIVATION_BOTTLENECK",
    "CHECKOUT_DROPOFF",
    "MONETIZATION_OPPORTUNITY",
    "RETENTION_OPPORTUNITY",
    "ACQUISITION_WEAKNESS",
  ] as const)("%s → recommandation complète", (type) => {
    const rec = bundle.recommendations.find((r) => r.opportunity_type === type);
    expect(rec).toBeDefined();
    expect(rec!.what.length).toBeGreaterThan(10);
    expect(rec!.why.length).toBeGreaterThan(10);
    expect(rec!.for_whom).toBeTruthy();
    expect(["immediately", "this_week", "next_cycle"]).toContain(rec!.when);
    expect(rec!.expected_impact.length).toBeGreaterThan(10);
    expect(rec!.confidence).toBeGreaterThanOrEqual(0);
    expect(rec!.confidence).toBeLessThanOrEqual(100);
    expect(rec!.priority).toBe(scoreBucket(rec!.priority_score));
  });

  it("chaque action est une PROPOSITION, jamais une exécution", () => {
    expect(bundle.recommendations.length).toBeGreaterThan(0);
    for (const rec of bundle.recommendations) {
      expect(rec.action.mode).toBe("PROPOSED");
      expect(rec.action.note).toContain("humain");
    }
  });

  it("ACQUISITION_STRENGTH → action RUN_CAMPAIGN proposée uniquement", () => {
    const { opportunities } = evaluateRules(
      makeData({ funnel: { page_view: 100, signup_completed: 40 } }),
    );
    const strength = opportunities.find((o) => o.type === "ACQUISITION_STRENGTH")!;
    const rec = buildRecommendation(strength, makeData());
    expect(rec.action.type).toBe("RUN_CAMPAIGN");
    expect(rec.action.mode).toBe("PROPOSED");
  });

  it("les 8 types d'action du cahier existent dans la taxonomy", async () => {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const content = await fs.readFile(
      path.join(process.cwd(), "src/lib/growth/decision/types.ts"),
      "utf8",
    );
    for (const action of [
      "OPTIMIZE_LANDING",
      "IMPROVE_ONBOARDING",
      "PROMOTE_COURSE",
      "IMPROVE_KORA_ENTRY",
      "REACTIVATE_USER",
      "PROMOTE_SUBSCRIPTION",
      "CREATE_CONTENT",
      "RUN_CAMPAIGN",
    ]) {
      expect(content).toContain(`"${action}"`);
    }
  });

  it("WHY reprend la preuve chiffrée de l'opportunité", () => {
    const rec = bundle.recommendations.find((r) => r.opportunity_type === "ACTIVATION_BOTTLENECK")!;
    const opp = bundle.opportunities.find((o) => o.type === "ACTIVATION_BOTTLENECK")!;
    expect(rec.why).toContain(opp.evidence);
  });
});

describe("P2.1 §11 — rule engine", () => {
  it("R1 activation bottleneck : IF taux < 0.30 THEN opportunité", () => {
    const { opportunities } = evaluateRules(
      makeData({ funnel: { signup_completed: 200, activated: 40 } }),
    );
    expect(opportunities.some((o) => o.type === "ACTIVATION_BOTTLENECK")).toBe(true);
  });

  it("R2 checkout dropoff : IF abandon > 0.50 THEN opportunité", () => {
    const { opportunities } = evaluateRules(
      makeData({ funnel: { begin_checkout: 50, purchase: 10 } }),
    );
    expect(opportunities.some((o) => o.type === "CHECKOUT_DROPOFF")).toBe(true);
  });

  it("R3 monetization : IF activés ≥ 30 AND achats = 0 THEN opportunité", () => {
    const { opportunities } = evaluateRules(
      makeData({ funnel: { activated: 32, purchase: 0 } }),
    );
    expect(opportunities.some((o) => o.type === "MONETIZATION_OPPORTUNITY")).toBe(true);
  });

  it("R4 retention : IF taux retour < 0.20 THEN opportunité ; la rétention D7 ne produit rien", () => {
    const { opportunities, signals } = evaluateRules(
      makeData({ funnel: { page_view: 100, return_visit: 5 } }),
    );
    expect(opportunities.some((o) => o.type === "RETENTION_OPPORTUNITY")).toBe(true);
    expect(signals.find((s) => s.type === "retention_unavailable")!.status).toBe("INSUFFICIENT_DATA");
    expect(opportunities.some((o) => o.evidence.includes("retention"))).toBe(false);
  });

  it("R5 acquisition : faible THEN ACQUISITION_WEAKNESS, haute THEN ACQUISITION_STRENGTH", () => {
    const weak = evaluateRules(makeData({ funnel: { page_view: 500, signup_completed: 20 } }));
    expect(weak.opportunities.some((o) => o.type === "ACQUISITION_WEAKNESS")).toBe(true);
    const strong = evaluateRules(makeData({ funnel: { page_view: 100, signup_completed: 40 } }));
    expect(strong.opportunities.some((o) => o.type === "ACQUISITION_STRENGTH")).toBe(true);
  });

  it("tendances calculées sur la période précédente", () => {
    const data = makeData({
      funnel: { page_view: 100, signup_completed: 10 },
      previous_funnel: { page_view: 100, signup_completed: 20 },
    });
    const m = computeMetrics(data);
    expect(m.previousSignupRate).toBeCloseTo(0.2, 10);
    expect(m.signupTrend).toBeCloseTo(-50, 5);
  });

  it("aucune règle déclenchée sur données vides → zéro opportunité", () => {
    const { signals, opportunities } = evaluateRules(makeData());
    expect(opportunities).toHaveLength(0);
    expect(signals.filter((s) => s.status === "VALID")).toHaveLength(0);
  });
});

describe("P2.1 §17 — Growth Health", () => {
  it("5 étapes présentes dans l'ordre du cahier", () => {
    const bundle = runDecisionLayer(makeData());
    expect(bundle.health.map((h) => h.stage)).toEqual([
      "acquisition",
      "activation",
      "conversion",
      "retention",
      "revenue",
    ]);
  });

  it("échantillon insuffisant → INSUFFICIENT_DATA, jamais de rating fabriqué", () => {
    const bundle = runDecisionLayer(makeData());
    for (const h of bundle.health) {
      if (h.stage === "revenue") continue;
      expect(h.rating).toBe("INSUFFICIENT_DATA");
    }
  });

  it("activation sous seuil → rating HIGH ; conforme → GOOD", () => {
    const bad = runDecisionLayer(makeData({ funnel: { signup_completed: 100, activated: 10 } }));
    expect(bad.health.find((h) => h.stage === "activation")!.rating).toBe("HIGH");
    const good = runDecisionLayer(makeData({ funnel: { signup_completed: 100, activated: 60 } }));
    expect(good.health.find((h) => h.stage === "activation")!.rating).toBe("GOOD");
  });

  it("retention toujours INSUFFICIENT_DATA (aucune rétention alternative)", () => {
    const bundle = runDecisionLayer(allRulesData());
    const retention = bundle.health.find((h) => h.stage === "retention")!;
    expect(retention.rating).toBe("INSUFFICIENT_DATA");
    expect(retention.value).toBeNull();
  });

  it("revenue : gradation par abonnés actifs réels", () => {
    const zero = runDecisionLayer(makeData({ revenue: { mrr_cents: 0, active_subs: 0, available: true, source: "t" } }));
    expect(zero.health.find((h) => h.stage === "revenue")!.rating).toBe("HIGH");
    const mid = runDecisionLayer(makeData({ revenue: { mrr_cents: 0, active_subs: 15, available: true, source: "t" } }));
    expect(mid.health.find((h) => h.stage === "revenue")!.rating).toBe("LOW");
    const ok = runDecisionLayer(makeData({ revenue: { mrr_cents: 49000, active_subs: 40, available: true, source: "t" } }));
    expect(ok.health.find((h) => h.stage === "revenue")!.rating).toBe("GOOD");
    const unavailable = runDecisionLayer(makeData({ revenue: { mrr_cents: 0, active_subs: 0, available: false, source: "t" } }));
    expect(unavailable.health.find((h) => h.stage === "revenue")!.rating).toBe("INSUFFICIENT_DATA");
  });

  it("computeHealth est déterministe pour un même input", () => {
    const data = allRulesData();
    expect(computeHealth(computeMetrics(data), data)).toEqual(
      computeHealth(computeMetrics(data), data),
    );
  });
});

describe("P2.1 §13 — contrat Growth Insight", () => {
  const bundle = runDecisionLayer(allRulesData());

  it("6 métriques dans le contrat, champs complets", () => {
    expect(bundle.insights.map((i) => i.metric)).toEqual([
      "signup_rate",
      "activation_rate",
      "checkout_dropoff",
      "purchase_rate",
      "return_visit_rate",
      "retention_d7",
    ]);
    for (const i of bundle.insights) {
      expect(i).toHaveProperty("metric");
      expect(i).toHaveProperty("period");
      expect(i).toHaveProperty("sample_size");
      expect(i).toHaveProperty("value");
      expect(i).toHaveProperty("benchmark");
      expect(i).toHaveProperty("status");
      expect(i).toHaveProperty("signal");
      expect(i).toHaveProperty("opportunity");
      expect(i).toHaveProperty("recommendation");
      expect(i).toHaveProperty("priority");
      expect(i).toHaveProperty("confidence");
      expect(["VALID", "INSUFFICIENT_DATA", "UNAVAILABLE"]).toContain(i.status);
      expect(i.period).toBe("1999-01-01/1999-01-07");
    }
  });

  it("purchase_rate : aucun benchmark inventé", () => {
    const purchase = bundle.insights.find((i) => i.metric === "purchase_rate")!;
    expect(purchase.benchmark).toBeNull();
    expect(purchase.value).toBe(0);
  });

  it("retention_d7 : value null + status INSUFFICIENT_DATA (n=1, §12)", () => {
    const retention = bundle.insights.find((i) => i.metric === "retention_d7")!;
    expect(retention.value).toBeNull();
    expect(retention.sample_size).toBe(0);
    expect(retention.status).toBe("INSUFFICIENT_DATA");
    expect(retention.recommendation).toBeNull();
  });

  it("insight sous sample → status INSUFFICIENT_DATA et pas de recommandation forte", () => {
    const small = runDecisionLayer(makeData({ funnel: { signup_completed: 5, activated: 1 } }));
    const activation = small.insights.find((i) => i.metric === "activation_rate")!;
    expect(activation.status).toBe("INSUFFICIENT_DATA");
    expect(activation.recommendation).toBeNull();
    expect(activation.opportunity).toBeNull();
  });

  it("meta : moteur déterministe, 0 appel externe, 0 action exécutée", () => {
    expect(bundle.meta).toEqual({
      engine: "deterministic",
      external_calls: false,
      test_users_excluded: true,
      actions_executed: false,
    });
  });

  it("meta toujours conforme sur données vides", () => {
    expect(runDecisionLayer(makeData()).meta.external_calls).toBe(false);
    expect(runDecisionLayer(makeData()).meta.actions_executed).toBe(false);
  });
});

describe("P2.1 §18 — safety : aucun appel externe, aucune écriture", () => {
  const root = process.cwd();

  it("src/lib/growth/decision : zéro import/réseau/LLM/secrets", () => {
    const dir = join(root, "src/lib/growth/decision");
    const files = readdirSync(dir).filter((f) => f.endsWith(".ts"));
    expect(files.length).toBeGreaterThanOrEqual(7);
    const forbidden =
      /(fetch\s*\(|axios|generateWithGateway|getAIProvider|generateStrategy|generateRecommendation|openai|anthropic|n8n|whatsapp|mailer|sendBrevo|process\.env|DATABASE_URL|Bearer\s|INSERT INTO|UPDATE\s+\w+\s+SET)/i;
    for (const f of files) {
      const content = readFileSync(join(dir, f), "utf8");
      expect({ file: f, match: content.match(forbidden)?.[0] ?? null }).toEqual({
        file: f,
        match: null,
      });
    }
  });

  it("route insights : admin, read-only, GET seul, aucune action externe", () => {
    const content = readFileSync(
      join(root, "src/app/api/admin/growth/insights/route.ts"),
      "utf8",
    );
    expect(content).toContain("requireAdmin");
    expect(content).toContain("guardApi");
    expect(content).toContain("computeGrowthData");
    expect(content).toContain("runDecisionLayer");
    expect(content).not.toMatch(/export const POST/);
    expect(content).not.toMatch(/INSERT INTO|UPDATE\s+\w+\s+SET|DELETE FROM/);
    expect(content).not.toMatch(/generateStrategy|generateRecommendation|whatsapp|mailer|n8n/);
  });

  it("panneau UI : lecture seule de la route admin, aucune action exposée", () => {
    const content = readFileSync(
      join(root, "src/app/espace-admin/growth/GrowthInsightsPanel.tsx"),
      "utf8",
    );
    expect(content).toContain('fetch("/api/admin/growth/insights")');
    expect(content).toContain("PROPOSED");
    expect(content).not.toMatch(/fetch\((?!["'`])|POST\s*\{|\.post\(/);
  });

  it("aucun nouveau fournisseur LLM ni dépendance ajoutée", () => {
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
      dependencies: Record<string, string>;
    };
    for (const dep of Object.keys(pkg.dependencies)) {
      expect(dep).not.toMatch(/openai|anthropic|gemini|cohere|mistral/i);
    }
  });
});

describe("P2.1 §12 — protection fabrications et data trust", () => {
  it("aucune métrique fabriquée sur données vides : taux null, pas de 0 bidon", () => {
    const bundle = runDecisionLayer(makeData());
    const signup = bundle.insights.find((i) => i.metric === "signup_rate")!;
    expect(signup.value).toBeNull();
    expect(signup.status).toBe("INSUFFICIENT_DATA");
    expect(bundle.opportunities).toHaveLength(0);
    expect(bundle.recommendations).toHaveLength(0);
  });

  it("taux avec dénominateur nul → null et status INSUFFICIENT_DATA", () => {
    const m = computeMetrics(makeData({ funnel: { signup_completed: 10 } }));
    expect(m.signupRate).toBeNull();
    expect(m.checkoutDropoff).toBeNull();
    expect(m.returnVisitRate).toBeNull();
    expect(m.activationRate).toBe(0);
  });

  it("signaux INSUFFICIENT_DATA ne déclenchent jamais de recommandation", () => {
    const data = makeData({ funnel: { signup_completed: 12, activated: 1 } });
    const bundle = runDecisionLayer(data);
    expect(bundle.signals.some((s) => s.status === "INSUFFICIENT_DATA")).toBe(true);
    expect(bundle.recommendations).toHaveLength(0);
    expect(bundle.opportunities).toHaveLength(0);
  });

  it("les comptages de segments ne sont jamais synthétisés (0 réel)", () => {
    const bundle = runDecisionLayer(makeData());
    for (const s of bundle.segments) expect(s.count).toBe(0);
  });
});

describe("P2.1 §18 — idempotence", () => {
  it("deux exécutions avec mêmes données → même output exact", () => {
    const a = runDecisionLayer(allRulesData());
    const b = runDecisionLayer(allRulesData());
    expect(a).toStrictEqual(b);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  it("ids et timestamps stables entre exécutions", () => {
    const a = runDecisionLayer(allRulesData());
    const b = runDecisionLayer(allRulesData());
    expect(a.signals.map((s) => s.id)).toEqual(b.signals.map((s) => s.id));
    expect(a.opportunities.map((o) => o.id)).toEqual(b.opportunities.map((o) => o.id));
    expect(a.recommendations.map((r) => r.id)).toEqual(b.recommendations.map((r) => r.id));
    expect(a.generated_at).toBe(NOW);
  });

  it("évaluation des règles stable", () => {
    const data = allRulesData();
    expect(evaluateRules(data).opportunities).toStrictEqual(
      evaluateRules(data).opportunities,
    );
  });
});

describe("P2.1 — couche data SQL (test users exclus, comptages réels)", () => {
  const ANCHOR = "1999-01-05";
  const createdUserIds: number[] = [];

  beforeAll(async () => {
    // CI shard 2 : aucune suite antérieure du shard n'appelle ensureAnalyticsTable,
    // la table n'existe donc pas dans la SQLite vierge. Celui-ci garantit le DDL
    // (CREATE TABLE IF NOT EXISTS, idempotent).
    await ensureAnalyticsTable();
  });

  async function makeFixtureUser(isTest: boolean): Promise<number> {
    const suffix = `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    const email = isTest ? `${suffix}@test.ci` : `p21.reel.${suffix}@edukora.net`;
    await run(
      `INSERT INTO users (role, email, password_hash, first_name, last_name, is_test)
       VALUES ('student', ?, 'x', 'P21', 'Fixture', ?)`,
      email,
      isTest ? 1 : 0,
    );
    const u = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ?", email);
    const id = u!.id;
    createdUserIds.push(id);
    return id;
  }

  afterAll(async () => {
    for (const id of createdUserIds) {
      await run("DELETE FROM analytics_events WHERE user_id = ?", id);
      await run("DELETE FROM subscriptions WHERE user_id = ?", id);
      await run("DELETE FROM users WHERE id = ?", id);
    }
  });

  it("REGISTERED_NOT_ACTIVATED et HIGH_INTENT excluent les comptes de test", async () => {
    const testUser = await makeFixtureUser(true);
    const realUser = await makeFixtureUser(false);
    const ts = `${ANCHOR} 12:00:00`;
    for (const uid of [testUser, realUser]) {
      await run(
        "INSERT INTO analytics_events (user_id, session_id, event, props, url, created_at) VALUES (?, NULL, 'pageview', NULL, NULL, ?)",
        uid,
        ts,
      );
      await run(
        "INSERT INTO analytics_events (user_id, session_id, event, props, url, created_at) VALUES (?, NULL, 'signup_completed', NULL, NULL, ?)",
        uid,
        ts,
      );
      await run(
        "INSERT INTO analytics_events (user_id, session_id, event, props, url, created_at) VALUES (?, NULL, 'begin_checkout', NULL, NULL, ?)",
        uid,
        ts,
      );
    }

    const data = await computeGrowthData({ anchorDate: ANCHOR, days: 1, now: new Date(NOW) });
    expect(data.segments.REGISTERED_NOT_ACTIVATED).toBe(1);
    expect(data.segments.HIGH_INTENT).toBe(1);
    // P1.0 : le compte de test est exclu du funnel officiel → 1 pageview
    // et 1 signup réels comptés (celui du compte @test.ci est filtré).
    expect(data.segments.NEW_VISITOR).toBe(1);
    expect(data.funnel["signup_completed"]).toBe(1);
    expect(data.created_at).toBe(NOW);
    expect(data.retention.available).toBe(false);
  });

  it("funnel agrégé sur fenêtre glissante : jours courant + précédent", async () => {
    const data = await computeGrowthData({ anchorDate: ANCHOR, days: 2, now: new Date(NOW) });
    expect(data.period.from).toBe("1999-01-04");
    expect(data.period.to).toBe(ANCHOR);
    expect(data.previous_period.to).toBe("1999-01-03");
    expect(data.previous_period.from).toBe("1999-01-02");
  });
});

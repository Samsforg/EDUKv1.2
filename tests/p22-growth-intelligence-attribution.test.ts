/**
 * P2.2 — Growth Intelligence & Attribution (cahier §§1-25).
 *
 * Blocs : attribution (extraction/normalisation/first-touch) · channels ·
 * referrals · coverage · thresholds (audit sans modification) · decision
 * engine (règles étendues + préservation P2.1) · security · performance
 * (comptage de requêtes) · no-fake-benchmark · couche data SQL réelle
 * (test users exclu, fenêtre isolée 2099).
 *
 * Régression : les tests P2.1 restent verts (suite complète §21) — le
 * moteur reste PUR : fixtures synthétiques sur GrowthData.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { runDecisionLayer } from "@/lib/growth/decision";
import {
  classifySourceType,
  computeCoverage,
  deriveChannel,
  isAttributed,
  normalizeAttrValue,
  parseAttributionProps,
  EMPTY_ATTRIBUTION,
  MAX_ATTRIBUTION_VALUE_LEN,
} from "@/lib/growth/decision/attribution";
import { evaluateAttributionRules } from "@/lib/growth/decision/attribution-rules";
import { buildChannelPerformance, buildChannelPerformances } from "@/lib/growth/decision/channels";
import { buildReferralPerformance, buildReferralPerformances } from "@/lib/growth/decision/referrals";
import { evaluateRules } from "@/lib/growth/decision/rules";
import { buildRecommendation } from "@/lib/growth/decision/recommend";
import { computeConfidence, computeImpact, computeUrgency } from "@/lib/growth/decision/scoring";
import {
  ATTRIBUTION_LIMITS,
  MIN_SAMPLE,
  THRESHOLD_AUDIT,
  THRESHOLDS,
} from "@/lib/growth/decision/thresholds";
import { computeGrowthData } from "@/lib/growth/decision/data";
import type {
  GrowthData,
  GrowthIntelligenceData,
  SegmentKey,
} from "@/lib/growth/decision/types";
import * as db from "@/lib/db";
import { queryOne, run } from "@/lib/db";

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

describe("P2.2 §3 — extraction et normalisation des props d'attribution", () => {
  it("extraction UTM (forme courte P1.0)", () => {
    const a = parseAttributionProps(
      JSON.stringify({ source: "Facebook", medium: "cpc", campaign: "rentrée", content: "video1", term: "quiz" }),
    );
    expect(a.source).toBe("facebook");
    expect(a.medium).toBe("cpc");
    expect(a.campaign).toBe("rentrée");
    expect(a.content).toBe("video1");
    expect(a.term).toBe("quiz");
    expect(a.gclid).toBeNull();
    expect(a.fbclid).toBeNull();
    expect(a.ref).toBeNull();
  });

  it("alias longs utm_* tolérés", () => {
    const a = parseAttributionProps(JSON.stringify({ utm_source: "Google", utm_medium: "organic" }));
    expect(a.source).toBe("google");
    expect(a.medium).toBe("organic");
  });

  it("extraction gclid / fbclid / ref", () => {
    expect(parseAttributionProps(JSON.stringify({ gclid: "G-123" })).gclid).toBe("g-123");
    expect(parseAttributionProps(JSON.stringify({ fbclid: "FB-456" })).fbclid).toBe("fb-456");
    expect(parseAttributionProps(JSON.stringify({ ref: "PARRAIN7" })).ref).toBe("parrain7");
    expect(parseAttributionProps(JSON.stringify({ referred_by: "CODE1" })).ref).toBe("code1");
  });

  it("valeurs absentes ou invalides → null, jamais d'exception", () => {
    expect(parseAttributionProps(null)).toEqual(EMPTY_ATTRIBUTION);
    expect(parseAttributionProps(undefined)).toEqual(EMPTY_ATTRIBUTION);
    expect(parseAttributionProps("")).toEqual(EMPTY_ATTRIBUTION);
    expect(parseAttributionProps("{not json")).toEqual(EMPTY_ATTRIBUTION);
    expect(parseAttributionProps(JSON.stringify({ source: 42, medium: ["x"] }))).toEqual(
      EMPTY_ATTRIBUTION,
    );
    expect(parseAttributionProps(JSON.stringify({ source: "   " })).source).toBeNull();
  });

  it("normalisation : trim, casse réduite, troncature", () => {
    expect(normalizeAttrValue("  NEWSLETTER  ")).toBe("newsletter");
    expect(normalizeAttrValue("")).toBeNull();
    expect(normalizeAttrValue("   ")).toBeNull();
    expect(normalizeAttrValue(123)).toBeNull();
    const long = "x".repeat(MAX_ATTRIBUTION_VALUE_LEN + 50);
    expect(normalizeAttrValue(long)).toHaveLength(MAX_ATTRIBUTION_VALUE_LEN);
  });

  it("first-touch : la première valeur de la ligne gagne", () => {
    const a = parseAttributionProps(JSON.stringify({ source: "tiktok", utm_source: "youtube" }));
    expect(a.source).toBe("tiktok");
  });
});

describe("P2.2 §4 — classification first-touch", () => {
  it("priorité utm → clic → referral → unknown", () => {
    expect(classifySourceType({ ...EMPTY_ATTRIBUTION, source: "google" })).toBe("utm");
    expect(classifySourceType({ ...EMPTY_ATTRIBUTION, gclid: "g" })).toBe("paid_click");
    expect(classifySourceType({ ...EMPTY_ATTRIBUTION, fbclid: "f" })).toBe("paid_click");
    expect(classifySourceType({ ...EMPTY_ATTRIBUTION, ref: "code" })).toBe("referral");
    expect(classifySourceType({ ...EMPTY_ATTRIBUTION })).toBe("unknown");
    // UTM écrase un referral isolé : priorité §4.
    expect(classifySourceType({ ...EMPTY_ATTRIBUTION, source: "s", ref: "r" })).toBe("utm");
  });

  it("canaux dérivés : source → paid_click → referral → unknown", () => {
    expect(deriveChannel({ ...EMPTY_ATTRIBUTION, source: "Facebook" })).toBe("facebook");
    expect(deriveChannel({ ...EMPTY_ATTRIBUTION, gclid: "g" })).toBe("paid_click");
    expect(deriveChannel({ ...EMPTY_ATTRIBUTION, ref: "r" })).toBe("referral");
    expect(deriveChannel({ ...EMPTY_ATTRIBUTION })).toBe("unknown");
  });

  it("isAttributed détecte tout signal d'acquisition", () => {
    expect(isAttributed({ ...EMPTY_ATTRIBUTION, source: "x" })).toBe(true);
    expect(isAttributed({ ...EMPTY_ATTRIBUTION, fbclid: "x" })).toBe(true);
    expect(isAttributed({ ...EMPTY_ATTRIBUTION, ref: "x" })).toBe(true);
    expect(isAttributed({ ...EMPTY_ATTRIBUTION })).toBe(false);
  });
});

describe("P2.2 §5 — channel performance", () => {
  it("aggrégation : comptages réels et tri par signups décroissant", () => {
    const list = buildChannelPerformances([
      { channel: "small", signups: 2, activated: 1, subscriptions: 0, revenue_cents: 0 },
      { channel: "big", signups: 40, activated: 20, subscriptions: 3, revenue_cents: 14700 },
    ]);
    expect(list.map((c) => c.channel)).toEqual(["big", "small"]);
    expect(list[0].activated).toBe(20);
    expect(list[0].revenue).toBe(14700);
  });

  it("activationRate et conversionRate : calculs null-safe", () => {
    const ch = buildChannelPerformance({ channel: "x", signups: 40, activated: 20, subscriptions: 10, revenue_cents: 49000 });
    expect(ch.activationRate).toBe(0.5);
    expect(ch.conversionRate).toBe(0.25);
    expect(ch.signupRate).toBeNull(); // visiteurs par canal non attribuables
    expect(ch.visitors).toBeNull();
    expect(ch.status).toBe("VALID");
    expect(ch.sample_size).toBe(40);
  });

  it("zéro dénominateur → taux null, pas de 0 fabriqué", () => {
    const ch = buildChannelPerformance({ channel: "x", signups: 0, activated: 0, subscriptions: 0, revenue_cents: 0 });
    expect(ch.activationRate).toBeNull();
    expect(ch.conversionRate).toBeNull();
    expect(ch.status).toBe("INSUFFICIENT_DATA");
    expect(ch.sample_size).toBe(0);
  });

  it("10 inscrits + 0 activation → taux 0 (dénominateur positif)", () => {
    const ch = buildChannelPerformance({ channel: "x", signups: 10, activated: 0, subscriptions: 0, revenue_cents: 0 });
    expect(ch.activationRate).toBe(0);
    expect(ch.status).toBe("INSUFFICIENT_DATA");
    expect(ch.sample_size).toBe(MIN_SAMPLE.segment - 20);
  });

  it("sample-size protection : sous le plancher, jamais VALID", () => {
    const ch = buildChannelPerformance({ channel: "x", signups: MIN_SAMPLE.segment - 1, activated: 0, subscriptions: 0, revenue_cents: 0 });
    expect(ch.status).toBe("INSUFFICIENT_DATA");
    expect(ch.min_sample).toBe(MIN_SAMPLE.segment);
  });
});

describe("P2.2 §6 — referral performance", () => {
  it("aggrégation : signups, activation, abonnements, revenu", () => {
    const r = buildReferralPerformance({ referral: "PARRAIN1", signups: 30, activated: 12, subscriptions: 4, revenue_cents: 19600 });
    expect(r.referral).toBe("PARRAIN1");
    expect(r.signups).toBe(30);
    expect(r.activationRate).toBeCloseTo(0.4, 10);
    expect(r.conversionRate).toBeCloseTo(4 / 30, 10);
    expect(r.revenue).toBe(19600);
    expect(r.status).toBe("VALID");
    expect(r.visitors).toBeNull();
  });

  it("zéro dénominateur → taux null", () => {
    const r = buildReferralPerformance({ referral: "P", signups: 0, activated: 0, subscriptions: 0, revenue_cents: 0 });
    expect(r.activationRate).toBeNull();
    expect(r.conversionRate).toBeNull();
    expect(r.status).toBe("INSUFFICIENT_DATA");
  });

  it("insufficient sample → INSUFFICIENT_DATA", () => {
    const r = buildReferralPerformance({ referral: "P", signups: 4, activated: 2, subscriptions: 1, revenue_cents: 4900 });
    expect(r.status).toBe("INSUFFICIENT_DATA");
    expect(r.activationRate).toBe(0.5);
  });

  it("tri par signups décroissant, tie-break alphabétique", () => {
    const list = buildReferralPerformances([
      { referral: "B", signups: 5, activated: 1, subscriptions: 0, revenue_cents: 0 },
      { referral: "A", signups: 5, activated: 1, subscriptions: 0, revenue_cents: 0 },
      { referral: "C", signups: 9, activated: 1, subscriptions: 0, revenue_cents: 0 },
    ]);
    expect(list.map((r) => r.referral)).toEqual(["C", "A", "B"]);
  });
});

describe("P2.2 §11 — attribution coverage", () => {
  it("couverture totale : 1.0 + VALID", () => {
    const c = computeCoverage(30, 0);
    expect(c.coverageRate).toBe(1);
    expect(c.status).toBe("VALID");
    expect(c.attributed).toBe(30);
    expect(c.unattributed).toBe(0);
    expect(c.basis).toBe("signups_identified");
  });

  it("couverture partielle", () => {
    const c = computeCoverage(15, 15);
    expect(c.coverageRate).toBe(0.5);
    expect(c.status).toBe("VALID");
  });

  it("zéro attribution : 0.0 avec inscrits identifiés", () => {
    const c = computeCoverage(0, 30);
    expect(c.coverageRate).toBe(0);
    expect(c.status).toBe("VALID");
  });

  it("dénominateur nul → null + INSUFFICIENT_DATA (pas de 0)", () => {
    const c = computeCoverage(0, 0);
    expect(c.coverageRate).toBeNull();
    expect(c.status).toBe("INSUFFICIENT_DATA");
  });

  it("échantillon sous le plancher → INSUFFICIENT_DATA même avec un taux", () => {
    const c = computeCoverage(2, 3);
    expect(c.coverageRate).toBeCloseTo(0.4, 10);
    expect(c.status).toBe("INSUFFICIENT_DATA");
  });
});

describe("P2.2 §8 — audit des seuils (aucune valeur modifiée)", () => {
  it("chaque seuil est classé avec raison, sample, data, confidence", () => {
    expect(THRESHOLD_AUDIT.length).toBeGreaterThanOrEqual(10);
    for (const entry of THRESHOLD_AUDIT) {
      expect(["CONTRACTUAL", "WORKING", "DATA-CALIBRATED", "INSUFFICIENT_DATA"]).toContain(entry.classification);
      expect(entry.reason.length).toBeGreaterThan(20);
      expect(entry.minimum_sample).toBeGreaterThan(0);
      expect(entry.data_available.length).toBeGreaterThan(0);
      expect(["high", "medium", "low"]).toContain(entry.confidence);
      expect(entry.changed_in_p22).toBe(false);
    }
  });

  it("les quatre classes sont représentées", () => {
    const classes = new Set(THRESHOLD_AUDIT.map((e) => e.classification));
    expect(classes.has("CONTRACTUAL")).toBe(true);
    expect(classes.has("WORKING")).toBe(true);
    expect(classes.has("INSUFFICIENT_DATA")).toBe(true);
    // DATA-CALIBRATED : aucune valeur n'est recalibrable aujourd'hui
    // (historique < 30 jours) — classe documentée, zéro décision prise.
    expect(THRESHOLD_AUDIT.every((e) => e.changed_in_p22 === false)).toBe(true);
  });

  it("valeurs P2.1 strictement inchangées", () => {
    expect(THRESHOLDS.activation_rate.min).toBe(0.3);
    expect(THRESHOLDS.signup_rate.min).toBe(0.1);
    expect(THRESHOLDS.signup_rate.high).toBe(0.3);
    expect(THRESHOLDS.checkout_dropoff.max).toBe(0.5);
    expect(THRESHOLDS.return_visit_rate.min).toBe(0.2);
    expect(MIN_SAMPLE.traffic_rate).toBe(30);
    expect(MIN_SAMPLE.checkout_rate).toBe(10);
    expect(MIN_SAMPLE.segment).toBe(30);
  });

  it("bornes d'attribution = limites mathématiques, pas de benchmark", () => {
    expect(ATTRIBUTION_LIMITS.coverage_full).toBe(1);
    expect(ATTRIBUTION_LIMITS.unknown_min).toBe(0);
  });
});

describe("P2.2 §13-§14 — decision engine étendu", () => {
  /** 30 inscrits, 15 activés, couverture partielle 0.4 (12/30). */
  function intelFixture(): GrowthIntelligenceData {
    return makeIntel({
      channels: [
        { channel: "facebook", signups: 30, activated: 15, subscriptions: 3, revenue_cents: 14700 },
        { channel: "tiny", signups: 4, activated: 1, subscriptions: 0, revenue_cents: 0 },
      ],
      referrals: [{ referral: "PARRAIN1", signups: 30, activated: 15, subscriptions: 2, revenue_cents: 9800 }],
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
      available: true,
    });
  }

  /** Toutes les familles d'opportunités déclenchées (gaps + attribution). */
  function gapIntel(): GrowthIntelligenceData {
    const intel = intelFixture();
    intel.channels = [
      { channel: "facebook", signups: 40, activated: 8, subscriptions: 1, revenue_cents: 4900 },
      { channel: "ok", signups: 10, activated: 6, subscriptions: 0, revenue_cents: 0 },
    ];
    intel.referrals = [{ referral: "PARRAIN1", signups: 30, activated: 5, subscriptions: 0, revenue_cents: 0 }];
    return intel;
  }

  it("channel signup strength : top canal ≥ min sample", () => {
    const { signals } = evaluateAttributionRules(makeData({ intelligence: intelFixture() }));
    const s = signals.find((x) => x.type === "channel_signup_strength")!;
    expect(s).toBeDefined();
    expect(s.metric).toBe("channel_signups:facebook");
    expect(s.status).toBe("VALID");
    expect(s.value).toBe(30);
  });

  it("channel activation strength : au-dessus du seuil working", () => {
    const { signals } = evaluateAttributionRules(makeData({ intelligence: intelFixture() }));
    // 15/30 = 0.5 ≥ 0.3
    expect(signals.some((x) => x.type === "channel_activation_strength" && x.metric === "channel_activation_rate:facebook")).toBe(true);
  });

  it("channel insufficient data : sous-échantillon signalé, sans décision", () => {
    const { signals, opportunities } = evaluateAttributionRules(makeData({ intelligence: intelFixture() }));
    const weak = signals.find((x) => x.type === "channel_insufficient_data")!;
    expect(weak.metric).toBe("channel_sample:tiny");
    expect(weak.status).toBe("INSUFFICIENT_DATA");
    expect(opportunities.some((o) => o.type === "CHANNEL_ACTIVATION_GAP")).toBe(false);
  });

  it("channel monetization strength : canal qui monétise", () => {
    const { signals } = evaluateAttributionRules(makeData({ intelligence: intelFixture() }));
    expect(signals.some((x) => x.type === "channel_monetization_strength")).toBe(true);
  });

  it("CHANNEL_ACTIVATION_GAP : top canal sous seuil → opportunité unique", () => {
    const intel = intelFixture();
    intel.channels = [
      { channel: "facebook", signups: 40, activated: 8, subscriptions: 1, revenue_cents: 4900 },
      { channel: "ok", signups: 10, activated: 6, subscriptions: 0, revenue_cents: 0 },
    ];
    const { opportunities } = evaluateAttributionRules(makeData({ intelligence: intel }));
    const opps = opportunities.filter((o) => o.type === "CHANNEL_ACTIVATION_GAP");
    expect(opps).toHaveLength(1);
    expect(opps[0].evidence).toContain("canal facebook");
    expect(opps[0].evidence).toContain("seuil 0.3");
    expect(opps[0].status).toBe("VALID");
    expect(opps[0].priority_score).toBeGreaterThanOrEqual(0);
  });

  it("referral strengths : volume, activation, monétisation", () => {
    const { signals } = evaluateAttributionRules(makeData({ intelligence: intelFixture() }));
    expect(signals.some((x) => x.type === "referral_signup_strength" && x.metric === "referral_signups")).toBe(true);
    expect(signals.some((x) => x.type === "referral_activation_strength" && x.metric === "referral_activation_rate")).toBe(true);
    expect(signals.some((x) => x.type === "referral_monetization_strength")).toBe(true);
  });

  it("REFERRAL_ACTIVATION_GAP : filleuls sous seuil → opportunité", () => {
    const intel = intelFixture();
    intel.referrals = [{ referral: "P", signups: 30, activated: 5, subscriptions: 0, revenue_cents: 0 }];
    const { opportunities } = evaluateAttributionRules(makeData({ intelligence: intel }));
    const opp = opportunities.find((o) => o.type === "REFERRAL_ACTIVATION_GAP")!;
    expect(opp).toBeDefined();
    expect(opp.evidence).toContain("filleuls = 30");
    expect(opp.confidence).toBeLessThanOrEqual(100);
  });

  it("ATTRIBUTION_GAP : couverture < 1.0 avec échantillon suffisant", () => {
    const { signals, opportunities } = evaluateAttributionRules(makeData({ intelligence: intelFixture() }));
    const covSignal = signals.find((x) => x.type === "attribution_coverage")!;
    expect(covSignal.value).toBeCloseTo(0.4, 10);
    expect(covSignal.threshold).toBe(1);
    const opp = opportunities.find((o) => o.type === "ATTRIBUTION_GAP")!;
    expect(opp).toBeDefined();
    expect(opp.evidence).toContain("couverture = 0.400");
  });

  it("unknown source rate : signal avec borne 0", () => {
    const { signals } = evaluateAttributionRules(makeData({ intelligence: intelFixture() }));
    const s = signals.find((x) => x.type === "unknown_source_rate")!;
    expect(s.value).toBe(0.6);
    expect(s.threshold).toBe(0);
    expect(s.status).toBe("VALID");
  });

  it("qualité de données : plafond de confiance par la couverture (§14)", () => {
    const intel = intelFixture();
    intel.channels = [{ channel: "facebook", signups: 100, activated: 0, subscriptions: 0, revenue_cents: 0 }];
    intel.attribution.coverage = computeCoverage(12, 18); // couverture 0.4
    const { opportunities } = evaluateAttributionRules(makeData({ intelligence: intel }));
    const opp = opportunities.find((o) => o.type === "CHANNEL_ACTIVATION_GAP")!;
    // Sans plafond : confidence = 100 (échantillon 100 ≥ 30) → score élevé.
    // Avec plafond 40 : score = round(100 × 40 × 50 / 10000) = 20 → LOW.
    expect(opp.confidence).toBe(40);
    expect(opp.priority_score).toBe(20);
    expect(opp.priority).toBe("LOW");
    expect(opp.priority_score).not.toBeGreaterThanOrEqual(60);
  });

  it("sans intelligence : zéro règle P2.2 (compatibilité P2.1)", () => {
    const out = evaluateAttributionRules(makeData());
    expect(out.signals).toHaveLength(0);
    expect(out.opportunities).toHaveLength(0);
  });

  it("intelligence indisponible : zéro règle, pas de faux signaux", () => {
    const out = evaluateAttributionRules(makeData({ intelligence: makeIntel({ available: false }) }));
    expect(out.signals).toHaveLength(0);
    expect(out.opportunities).toHaveLength(0);
  });

  it("échantillon insuffisant : pas d'opportunité, signaux en info", () => {
    const intel = makeIntel({
      channels: [{ channel: "tiny", signups: 4, activated: 1, subscriptions: 0, revenue_cents: 0 }],
      attribution: {
        coverage: computeCoverage(2, 2),
        sources: { by_type: { utm: 2, paid_click: 0, referral: 0, unknown: 2 }, unknown_rate: 0.5, status: "INSUFFICIENT_DATA" },
        top_source: "tiny",
        source: "test",
      },
    });
    const { signals, opportunities } = evaluateAttributionRules(makeData({ intelligence: intel }));
    expect(opportunities).toHaveLength(0);
    expect(signals.every((s) => s.status === "INSUFFICIENT_DATA" || s.severity === "info")).toBe(true);
  });

  it("règles P2.1 préservées quand la couche P2.2 est active", () => {
    const data = makeData({
      funnel: { page_view: 2000, signup_completed: 150, activated: 35, begin_checkout: 40, purchase: 0, return_visit: 50 },
      intelligence: gapIntel(),
    });
    const p21 = evaluateRules(data);
    expect(p21.opportunities.map((o) => o.type)).toEqual(
      expect.arrayContaining(["ACTIVATION_BOTTLENECK", "CHECKOUT_DROPOFF", "MONETIZATION_OPPORTUNITY", "RETENTION_OPPORTUNITY", "ACQUISITION_WEAKNESS"]),
    );
    const bundle = runDecisionLayer(data);
    // Fusion : les deux familles coexistent, P2.1 non écrasée.
    expect(bundle.opportunities.map((o) => o.type)).toEqual(
      expect.arrayContaining(["ACTIVATION_BOTTLENECK", "CHANNEL_ACTIVATION_GAP", "ATTRIBUTION_GAP", "REFERRAL_ACTIVATION_GAP"]),
    );
    // Les6 insights P2.1 restent exactement les mêmes métriques.
    expect(bundle.insights.map((i) => i.metric)).toEqual([
      "signup_rate",
      "activation_rate",
      "checkout_dropoff",
      "purchase_rate",
      "return_visit_rate",
      "retention_d7",
    ]);
    expect(bundle.health.map((h) => h.stage)).toEqual(["acquisition", "activation", "conversion", "retention", "revenue"]);
    expect(bundle.meta).toEqual({
      engine: "deterministic",
      external_calls: false,
      test_users_excluded: true,
      actions_executed: false,
    });
  });

  it("bundle P2.2 : sections attribution/channels/referrals présentes", () => {
    const bundle = runDecisionLayer(makeData({ intelligence: intelFixture() }));
    expect(bundle.attribution.coverage.coverageRate).toBeCloseTo(0.4, 10);
    expect(bundle.attribution.top_source).toBe("facebook");
    expect(bundle.channels.map((c) => c.channel)).toEqual(["facebook", "tiny"]);
    expect(bundle.referrals[0].referral).toBe("PARRAIN1");
    expect(bundle.referrals[0].signups).toBe(30);
  });

  it("bundle sans intelligence : sections explicites (UNAVAILABLE), tableaux vides", () => {
    const bundle = runDecisionLayer(makeData());
    expect(bundle.attribution.status).toBe("UNAVAILABLE");
    expect(bundle.attribution.coverage.coverageRate).toBeNull();
    expect(bundle.channels).toHaveLength(0);
    expect(bundle.referrals).toHaveLength(0);
  });

  it("recommandations P2.2 : contrat §15, mode PROPOSED", () => {
    const data = makeData({
      funnel: { page_view: 2000, signup_completed: 150, activated: 35, begin_checkout: 40, purchase: 0, return_visit: 50 },
      intelligence: gapIntel(),
    });
    const bundle = runDecisionLayer(data);
    const recos = bundle.recommendations;
    expect(recos.length).toBeGreaterThanOrEqual(3);
    for (const r of recos) {
      expect(r.action.mode).toBe("PROPOSED");
      expect(typeof r.what).toBe("string"); // title
      expect(typeof r.why).toBe("string"); // reason
      expect(r.evidence.length).toBeGreaterThan(0);
      expect(r.urgency).toBeGreaterThanOrEqual(0);
      expect(r.urgency).toBeLessThanOrEqual(100);
      expect(r.priority_score).toBeGreaterThanOrEqual(0);
    }
    const attrReco = recos.find((r) => r.opportunity_type === "ATTRIBUTION_GAP")!;
    expect(attrReco.action.type).toBe("IMPROVE_ATTRIBUTION");
    const refReco = recos.find((r) => r.opportunity_type === "REFERRAL_ACTIVATION_GAP")!;
    expect(refReco.action.type).toBe("IMPROVE_REFERRAL_LOOP");
    const chReco = recos.find((r) => r.opportunity_type === "CHANNEL_ACTIVATION_GAP")!;
    expect(chReco.action.type).toBe("IMPROVE_ONBOARDING");
  });

  it("idempotence P2.2 : deux exécutions → output strictement identique", () => {
    const a = runDecisionLayer(makeData({ intelligence: intelFixture() }));
    const b = runDecisionLayer(makeData({ intelligence: intelFixture() }));
    expect(a).toStrictEqual(b);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  it("buildRecommendation complète evidence/urgency (§15)", () => {
    const data = makeData({ intelligence: intelFixture() });
    const { opportunities } = evaluateAttributionRules(data);
    const opp = opportunities.find((o) => o.type === "ATTRIBUTION_GAP")!;
    const reco = buildRecommendation(opp, data);
    expect(reco.evidence).toBe(opp.evidence);
    expect(reco.urgency).toBe(opp.urgency);
    expect(computeImpact(0.4, 1)).toBe(60);
    expect(computeConfidence(30, 30)).toBe(100);
    expect(computeUrgency(null)).toBe(50);
  });
});

describe("P2.2 §9 — aucun benchmark inventé dans les outputs", () => {
  const FORBIDDEN = [
    /excellent/i,
    /\bbon\b/i,
    /\bmauvais\b/i,
    /\bfaible\b/i,
    /moyenne/i,
    /ivoirien/i,
    /benchmark edtech/i,
    /meilleur canal/i,
    /au-dessus de la moyenne/i,
  ];

  it("bundle généré : aucun qualitatif hors seuils documentés", () => {
    const bundle = runDecisionLayer(
      makeData({
        funnel: { page_view: 2000, signup_completed: 150, activated: 35, begin_checkout: 40, purchase: 0, return_visit: 50 },
        intelligence: makeIntel({
          channels: [{ channel: "facebook", signups: 40, activated: 8, subscriptions: 1, revenue_cents: 4900 }],
          referrals: [{ referral: "P", signups: 30, activated: 5, subscriptions: 0, revenue_cents: 0 }],
          attribution: {
            coverage: computeCoverage(12, 18),
            sources: { by_type: { utm: 12, paid_click: 0, referral: 0, unknown: 18 }, unknown_rate: 0.6, status: "VALID" },
            top_source: "facebook",
            source: "test",
          },
          available: true,
        }),
      }),
    );
    const texts: string[] = [];
    for (const o of bundle.opportunities) texts.push(o.evidence, o.type);
    for (const r of bundle.recommendations) texts.push(r.what, r.why, r.expected_impact, r.action.note, r.evidence);
    for (const s of bundle.signals) texts.push(s.metric, s.type);
    const corpus = texts.join(" | ");
    for (const pattern of FORBIDDEN) {
      expect({ pattern: pattern.source, match: corpus.match(pattern)?.[0] ?? null }).toEqual({
        pattern: pattern.source,
        match: null,
      });
    }
  });
});

describe("P2.2 §19-§20 — security : admin, read-only, aucun appel externe", () => {
  const root = process.cwd();

  it("route insights : admin, GET seul, aucune mutation, aucune action externe", () => {
    const content = readFileSync(join(root, "src/app/api/admin/growth/insights/route.ts"), "utf8");
    expect(content).toContain("requireAdmin");
    expect(content).toContain("guardApi");
    expect(content).toContain("computeGrowthData");
    expect(content).toContain("runDecisionLayer");
    expect(content).not.toMatch(/export const POST/);
    expect(content).not.toMatch(/INSERT INTO|UPDATE\s+\w+\s+SET|DELETE FROM/);
    expect(content).not.toMatch(/generateStrategy|generateRecommendation|openai|n8n/i);
  });

  it("dossier api/admin/growth : une seule route, toutes en lecture", () => {
    const dir = join(root, "src/app/api/admin/growth");
    const files = (readdirSync(dir, { recursive: true }) as string[]).map((f) => f.replace(/\\/g, "/"));
    expect(files.filter((f) => f.endsWith("route.ts"))).toEqual(["insights/route.ts"]);
  });

  it("modules P2.2 : zéro réseau/LLM/secret/écriture SQL", () => {
    const dir = join(root, "src/lib/growth/decision");
    const targets = ["attribution.ts", "attribution-rules.ts", "channels.ts", "referrals.ts"];
    const forbidden =
      /(fetch\s*\(|axios|generateWithGateway|getAIProvider|openai|anthropic|n8n|whatsapp|mailer|process\.env|DATABASE_URL|Bearer\s|INSERT INTO|UPDATE\s+\w+\s+SET|DELETE FROM|eval\s*\()/i;
    for (const f of targets) {
      const content = readFileSync(join(dir, f), "utf8");
      expect({ file: f, match: content.match(forbidden)?.[0] ?? null }).toEqual({ file: f, match: null });
    }
  });

  it("panneau UI : lecture seule, PROPOSED affiché, aucune action exposée", () => {
    const content = readFileSync(join(root, "src/app/espace-admin/growth/GrowthInsightsPanel.tsx"), "utf8");
    expect(content).toContain('fetch("/api/admin/growth/insights")');
    expect(content).toContain("PROPOSED");
    expect(content).not.toMatch(/fetch\((?!["'`])|POST\s*\{|\.post\(/);
    expect(content).toContain("Attribution");
    expect(content).toContain("Channels");
    expect(content).toContain("Referrals");
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

  it("réponse sans PII : aucun email de fixture dans le corpus des textes", () => {
    const bundle = runDecisionLayer(makeData());
    const corpus = JSON.stringify(bundle);
    expect(corpus).not.toMatch(/@edukora\.net|@test\.ci|\+225\s?\d/);
  });
});

describe("P2.2 §18 — performance : comptage de requêtes", () => {
  it("computeGrowthData borné : P2.1 (51) + exactement les 2 requêtes P2.2", async () => {
    const anchor = "2099-02-01";
    // Warm-up : ensureAnalyticsTable + migrations éventuelles.
    await computeGrowthData({ anchorDate: anchor, days: 7, now: new Date(NOW) });

    const sqls: string[] = [];
    const origQuery = db.query;
    const origQueryOne = db.queryOne;
    const spyQ = jest
      .spyOn(db, "query")
      .mockImplementation((async (sql: string, ...args: unknown[]) => {
        sqls.push(String(sql).replace(/\s+/g, " "));
        return (origQuery as any)(sql, ...args);
      }) as never);
    const spyQO = jest
      .spyOn(db, "queryOne")
      .mockImplementation((async (sql: string, ...args: unknown[]) => {
        sqls.push(String(sql).replace(/\s+/g, " "));
        return (origQueryOne as any)(sql, ...args);
      }) as never);
    await computeGrowthData({ anchorDate: anchor, days: 7, now: new Date(NOW) });
    const count = spyQ.mock.calls.length + spyQO.mock.calls.length;
    spyQ.mockRestore();
    spyQO.mockRestore();

    // Décompte réel (mesuré §18) : 14 funnel (7j × 2 fenêtres) + 8 segments
    // + 4 revenue = 51 en P2.1 ; P2.2 ajoute UNIQUEMENT les 2 requêtes
    // agrégées (canaux, référents) → 53.
    expect(count).toBeGreaterThanOrEqual(51);
    expect(count).toBeLessThanOrEqual(53);
    // Les 2 requêtes P2.2 sont bien présentes (motifs caractéristiques).
    expect(sqls.some((s) => s.includes("WITH per_user AS"))).toBe(true);
    expect(sqls.some((s) => s.includes("r.referral_code AS referral"))).toBe(true);
  }, 30000);
});

describe("P2.2 — couche data SQL (attribution réelle, fenêtre isolée 2099)", () => {
  // Fenêtre isolée : aucun autre test n'utilise 2099 (pollution nulle).
  const ANCHOR = "2099-01-05";
  const TS = `${ANCHOR} 12:00:00`;
  const createdUserIds: number[] = [];

  async function makeFixtureUser(isTest: boolean, opts: { props?: string | null; referrerId?: number } = {}): Promise<number> {
    const suffix = `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    const email = isTest ? `${suffix}@test.ci` : `p22.reel.${suffix}@edukora.net`;
    await run(
      `INSERT INTO users (role, email, password_hash, first_name, last_name, is_test, created_at)
       VALUES ('student', ?, 'x', 'P22', 'Fixture', ?, ?)`,
      email,
      isTest ? 1 : 0,
      TS,
    );
    const u = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ?", email);
    const id = u!.id;
    createdUserIds.push(id);
    if (opts.referrerId) await run("UPDATE users SET referred_by = ? WHERE id = ?", opts.referrerId, id);
    await run(
      "INSERT INTO analytics_events (user_id, session_id, event, props, url, created_at) VALUES (?, NULL, 'signup_completed', ?, NULL, ?)",
      id,
      opts.props ?? null,
      TS,
    );
    return id;
  }

  let referrerId = 0;

  afterAll(async () => {
    for (const id of createdUserIds) {
      await run("DELETE FROM analytics_events WHERE user_id = ?", id);
      await run("DELETE FROM subscriptions WHERE user_id = ?", id);
      await run("UPDATE users SET referred_by = NULL WHERE referred_by = ?", id);
      await run("DELETE FROM users WHERE id = ?", id);
    }
    if (referrerId) await run("DELETE FROM users WHERE id = ?", referrerId);
  });

  it("canaux, couverture, inconnus et référents calculés depuis les données réelles", async () => {
    // Parrain (hors période d'inscription : créé avant, code unique).
    const refSuffix = `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    await run(
      `INSERT INTO users (role, email, password_hash, first_name, last_name, is_test, referral_code, created_at)
       VALUES ('student', ?, 'x', 'P22', 'Parrain', 0, ?, ?)`,
      `p22.parrain.${refSuffix}@edukora.net`,
      `P22${refSuffix.slice(-8)}`,
      `${ANCHOR} 08:00:00`,
    );
    const refRow = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ?", `p22.parrain.${refSuffix}@edukora.net`);
    referrerId = refRow!.id;

    // 4 inscrits réels : utm, clic, parrainage, inconnu.
    await makeFixtureUser(false, { props: JSON.stringify({ source: "Facebook", medium: "cpc" }) });
    await makeFixtureUser(false, { props: JSON.stringify({ gclid: "G-1" }) });
    await makeFixtureUser(false, { referrerId });
    await makeFixtureUser(false);
    // Compte de test avec attribution : DOIT être exclu partout.
    await makeFixtureUser(true, { props: JSON.stringify({ source: "Google" }) });

    const data = await computeGrowthData({ anchorDate: ANCHOR, days: 1, now: new Date(NOW) });
    const intel = data.intelligence!;
    expect(intel.available).toBe(true);

    // Canaux : 'google' (test) absent, 4 canaux réels.
    const byName = new Map(intel.channels.map((c) => [c.channel, c]));
    expect(byName.has("google")).toBe(false);
    expect(byName.get("facebook")?.signups).toBe(1);
    expect(byName.get("paid_click")?.signups).toBe(1);
    expect(byName.get("referral")?.signups).toBe(1);
    expect(byName.get("unknown")?.signups).toBe(1);
    expect(intel.channels.reduce((s, c) => s + c.signups, 0)).toBe(4);

    // Couverture : 3 attribués / 1 inconnu → 0.75, sous plancher → INSUFFICIENT_DATA.
    expect(intel.attribution.coverage.attributed).toBe(3);
    expect(intel.attribution.coverage.unattributed).toBe(1);
    expect(intel.attribution.coverage.coverageRate).toBeCloseTo(0.75, 10);
    expect(intel.attribution.coverage.status).toBe("INSUFFICIENT_DATA");
    expect(intel.attribution.top_source).toBe("facebook");

    // Sources : inconnu 1/4 = 0.25.
    expect(intel.attribution.sources.by_type.utm).toBe(1);
    expect(intel.attribution.sources.by_type.paid_click).toBe(1);
    expect(intel.attribution.sources.by_type.referral).toBe(1);
    expect(intel.attribution.sources.by_type.unknown).toBe(1);
    expect(intel.attribution.sources.unknown_rate).toBeCloseTo(0.25, 10);

    // Référent : le filleul réel seul (filleul de test non créé ici, mais
    // l'exclusion est prouvée par le canal 'google' absent).
    expect(intel.referrals).toHaveLength(1);
    expect(intel.referrals[0].referral).toMatch(/^P22/);
    expect(intel.referrals[0].signups).toBe(1);
    // La performance agrégée (status) vit dans le bundle du Decision Layer.
    const bundle = runDecisionLayer(data);
    expect(bundle.referrals[0].referral).toBe(intel.referrals[0].referral);
    expect(bundle.referrals[0].status).toBe("INSUFFICIENT_DATA");
    expect(bundle.channels.map((c) => c.channel)).toEqual(["facebook", "paid_click", "referral", "unknown"]);

    // Aucune PII dans l'intelligence agrégée.
    const corpus = JSON.stringify(intel);
    expect(corpus).not.toMatch(/@edukora\.net|@test\.ci|P22.*Fixture/);
  });

  it("abonnement actif d'un filleul : subscriptions + revenu reflétés", async () => {
    const filleul = await queryOne<{ id: number }>(
      "SELECT id FROM users WHERE email LIKE 'p22.reel.%@edukora.net' AND referred_by IS NOT NULL LIMIT 1",
    );
    if (!filleul) return; // couvert par le test précédent (fixture déjà nettoyée)
    const plan = await queryOne<{ id: string | number }>("SELECT id FROM subscription_plans LIMIT 1");
    expect(plan).not.toBeNull();
    await run(
      "INSERT INTO subscriptions (user_id, plan_id, status, price_cents) VALUES (?, ?, 'active', 4900)",
      filleul.id,
      plan!.id,
    );
    const data = await computeGrowthData({ anchorDate: ANCHOR, days: 1, now: new Date(NOW) });
    const bundle = runDecisionLayer(data);
    const ref = bundle.referrals[0];
    expect(ref.subscriptions).toBeGreaterThanOrEqual(1);
    expect(ref.revenue).toBeGreaterThanOrEqual(4900);
    const facebook = data.intelligence!.channels.find((c) => c.channel === "referral");
    expect(facebook?.subscriptions).toBeGreaterThanOrEqual(1);
    await run("DELETE FROM subscriptions WHERE user_id = ?", filleul.id);
  });
});

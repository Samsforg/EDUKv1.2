/**
 * P2.4 — Growth Measurement & Experimentation (cahier Étapes A-H).
 *
 * Blocs :
 *  1. entonnoir mesurable (dénominateurs, minimums, statuts, NOT_APPLICABLE) ;
 *  2. évolution par période (comparabilité, deltas, périodes manquantes) ;
 *  3. couverture (jours observés, attribution ≠ données manquantes) ;
 *  4. préparation d'expériences (DRAFT/BLOCKED, volume, jauge) ;
 *  5. validation stricte des déclarations (whitelist de props) ;
 *  6. mesure avant/après des actions (états, plafond, confiance) ;
 *  7. couche SQL réelle (fenêtre isolée 2099-03, test users exclus) ;
 *  8. routes (contrôle d'accès, idempotence, bundle `measurement`) ;
 *  9. scans source (lecture seule, contrat préservé, doc §13) ;
 * 10. performance bornée + idempotence du calcul.
 *
 * Aucun test existant n'est modifié ; aucune donnée n'est fabriquée en
 * production ; les fixtures SQL vivent dans une fenêtre isolée (2099-03)
 * et sont nettoyées en afterAll.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { POST as declarePOST } from "@/app/api/growth/actions/declare/route";
import { GET as insightsGET } from "@/app/api/admin/growth/insights/route";
import { runDecisionLayer } from "@/lib/growth/decision";
import { computeCoverage } from "@/lib/growth/decision/attribution";
import type {
  GrowthActionPlan,
  GrowthActionQueue,
  GrowthData,
  GrowthInsightBundle,
  SegmentKey,
} from "@/lib/growth/decision/types";
import {
  DECLARATION_WINDOW_CAP,
  buildActionMeasurement,
  dedupeDeclarations,
  processableDeclarations,
} from "@/lib/growth/measure/actions";
import { buildCoverageMeasurement } from "@/lib/growth/measure/coverage";
import { buildExperimentSection } from "@/lib/growth/measure/experiments";
import { buildFunnelMeasurement } from "@/lib/growth/measure/funnel";
import { buildTrendMeasurement } from "@/lib/growth/measure/trend";
import { computeMeasurement } from "@/lib/growth/measure";
import {
  ACTION_ID_RE,
  DECLARATION_EVENT,
  DEFAULT_WINDOW_DAYS,
  MAX_WINDOW_DAYS,
  MIN_WINDOW_DAYS,
  parseDeclarationPayload,
} from "@/lib/growth/measure/declaration";
import {
  hasDeclaration,
  loadCoverage,
  loadDeclarations,
  loadWindowAggregates,
  type DeclarationsLoad,
  type WindowAggregate,
} from "@/lib/growth/measure/data";
import { dayStart } from "@/lib/growth/measure/dates";
import type { ActionDeclaration, GrowthMeasurement } from "@/lib/growth/measure";
import { hashPassword } from "@/lib/auth";
import { createSession } from "@/lib/session";
import * as db from "@/lib/db";
import { query, queryOne, run } from "@/lib/db";

process.env.SESSION_SECRET = "p24-unit-test-session-secret-0123456789";

const mockCookies = new Map<string, string>();
jest.mock("next/headers", () => ({
  cookies: async () => ({
    get: (n: string) =>
      mockCookies.has(n) ? { name: n, value: mockCookies.get(n) } : undefined,
  }),
}));

const STAMP = `${process.pid}${Date.now()}`;
const SEG_SUFFIX = `seg${STAMP}`.slice(0, 40);
const FIXTURE_URL = "p24-fixture";

// Fenêtre d'action isolée : déclaration le 2099-03-05, fenêtres 14 j.
const DECL_DAY = "2099-03-05";
const OLDER_TS = `${DECL_DAY} 09:00:00`;
const NEWER_TS = "2099-03-06 09:00:00";
const TODAY = "2099-03-20";

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
    period: { from: "1999-01-01", to: "1999-01-07", days: 7 },
    previous_period: { from: "1998-12-25", to: "1998-12-31", days: 7 },
    funnel: {},
    previous_funnel: {},
    segments: EMPTY_SEGMENTS,
    segments_available: true,
    revenue: { mrr_cents: 4900, active_subs: 12, available: true, source: "test" },
    retention: { available: false, value: null, status: "INSUFFICIENT_DATA" },
    created_at: "1999-01-08T12:00:00.000Z",
    ...over,
  };
}

/** Jeu intégration 2099 : plans P2.3 réels + périodes alignées fixtures. */
function data2099(over: Partial<GrowthData> = {}): GrowthData {
  return makeData({
    period: { from: "2099-03-14", to: "2099-03-20", days: 7 },
    previous_period: { from: "2099-03-07", to: "2099-03-13", days: 7 },
    funnel: {
      page_view: 1000,
      signup_started: 200,
      signup_completed: 60,
      activated: 12,
      begin_checkout: 40,
      purchase: 0,
      return_visit: 100,
      _active_users: 5,
    },
    previous_funnel: {
      page_view: 900,
      signup_started: 180,
      signup_completed: 54,
      activated: 14,
      begin_checkout: 30,
      purchase: 0,
      return_visit: 90,
      _active_users: 4,
    },
    created_at: `${TODAY}T00:00:00.000Z`,
    ...over,
  });
}

const ATTRIBUTION: GrowthInsightBundle["attribution"] = {
  coverage: computeCoverage(12, 18),
  sources: {
    by_type: { utm: 12, paid_click: 0, referral: 0, unknown: 18 },
    unknown_rate: 0.6,
    status: "VALID",
  },
  top_source: "facebook",
  status: "VALID",
};

const PLAN: GrowthActionPlan = {
  id: `action_OPTIMIZE_LANDING#2099-03-14/2099-03-20#${SEG_SUFFIX}`,
  opportunity_id: "opp_p24",
  recommendation_id: "rec_p24",
  opportunity_type: "ACQUISITION_WEAKNESS",
  action_type: "OPTIMIZE_LANDING",
  title: "Action P24 sous mesure",
  objective: "Mesurer l'avant/après d'une action déclarée",
  target_segment: "NEW_VISITOR",
  channel: null,
  priority_score: 60,
  action_priority: "P1",
  actionability: "HIGH",
  urgency: "cette semaine",
  effort: "LOW",
  expected_impact: "MEDIUM",
  mode: "PROPOSED",
  status: "PROPOSED",
  horizon: "NOW",
  experiment_ready: true,
  steps: ["Étape proposée"],
  success_metrics: [],
  guardrails: [],
  evidence: [],
  created_at: "2099-03-14T00:00:00.000Z",
};

const QUEUE: GrowthActionQueue = {
  now: [PLAN],
  this_week: [],
  backlog: [],
  blocked: [],
};

function declOf(actionId: string, declaredAt: string, windowDays = 14): ActionDeclaration {
  return { action_id: actionId, declared_at: declaredAt, declared_by: 1, window_days: windowDays };
}

function declLoad(rows: ActionDeclaration[], over: Partial<DeclarationsLoad> = {}): DeclarationsLoad {
  return { rows, total: rows.length, invalid: 0, source: "ok", ...over };
}

function fullAggregate(): WindowAggregate {
  return {
    before: {
      page_view: 40,
      signup_started: 12,
      signup_completed: 8,
      activated: 6,
      begin_checkout: 5,
      purchase: 1,
      return_visit: 12,
    },
    after: {
      page_view: 50,
      signup_started: 15,
      signup_completed: 10,
      activated: 8,
      begin_checkout: 7,
      purchase: 2,
      return_visit: 15,
    },
    source: "ok",
  };
}

function callRoute<H>(handler: H, req: Request): Promise<Response> {
  return (handler as unknown as (r: Request) => Promise<Response>)(req);
}

function declareRequest(body: unknown): Request {
  return new Request("http://localhost/api/growth/actions/declare", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

// ---------------------------------------------------------------------------
// Fixtures SQL — fenêtre isolée 2099-03 (aucun autre test n'utilise 2099-03)
// ---------------------------------------------------------------------------

const createdUserIds: number[] = [];

async function insertUser(role: string, isTest: number, email: string): Promise<number> {
  await run(
    `INSERT INTO users (role, email, password_hash, first_name, last_name, is_test, created_at)
     VALUES (?, ?, ?, 'P24', 'Fixture', ?, '2099-03-01 00:00:00')`,
    role,
    email,
    hashPassword("secret123"),
    isTest,
  );
  const row = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ?", email);
  createdUserIds.push(row!.id);
  return row!.id;
}

async function insertEvent(
  event: string,
  props: unknown,
  userId: number | null,
  ts: string,
  url = FIXTURE_URL,
): Promise<void> {
  await run(
    "INSERT INTO analytics_events (user_id, session_id, event, props, url, created_at) VALUES (?, NULL, ?, ?, ?, ?)",
    userId,
    event,
    JSON.stringify(props ?? {}),
    url,
    ts,
  );
}

let realAdminId = 0;
let testAdminId = 0;
let testUserId = 0;
let studentId = 0;

const TEST_ADMIN_ACTION = `action_PROMOTE_COURSE#2099-03-14/2099-03-20#test${STAMP}`.slice(0, 120);
const EXTRA_ACTION = (n: number) =>
  `action_RUN_CAMPAIGN#2099-03-14/2099-03-20#extra${n}${STAMP}`.slice(0, 120);

beforeAll(async () => {
  realAdminId = await insertUser("admin", 0, `p24.admin.${STAMP}@edukora.net`);
  testAdminId = await insertUser("admin", 1, `p24.testadmin.${STAMP}@test.ci`);
  testUserId = await insertUser("student", 1, `p24.testuser.${STAMP}@test.ci`);
  studentId = await insertUser("student", 0, `p24.student.${STAMP}@edukora.net`);

  // Fenêtre avant [2099-02-19, 2099-03-05) : 2 jours réels + 1 jour de test.
  for (let i = 0; i < 40; i += 1) {
    await insertEvent("pageview", {}, null, "2099-02-25 10:00:00", `${FIXTURE_URL}-before`);
  }
  for (let i = 0; i < 8; i += 1) {
    await insertEvent("signup_completed", {}, realAdminId, "2099-03-01 08:00:00", `${FIXTURE_URL}-before`);
  }
  // 500 pages vues d'un compte de test dans la fenêtre avant : exclues.
  for (let i = 0; i < 500; i += 1) {
    await insertEvent("pageview", {}, testUserId, "2099-02-26 10:00:00", `${FIXTURE_URL}-testbefore`);
  }

  // Fenêtre après [2099-03-05, 2099-03-19) : 50 pages vues + 10 inscriptions.
  for (let i = 0; i < 50; i += 1) {
    await insertEvent("pageview", {}, null, "2099-03-06 10:00:00", `${FIXTURE_URL}-after`);
  }
  for (let i = 0; i < 10; i += 1) {
    await insertEvent("signup_completed", {}, realAdminId, "2099-03-06 11:00:00", `${FIXTURE_URL}-after`);
  }
  // 500 pages vues de test sur un jour AUTRE que le jour réel : ce jour ne
  // doit pas compter dans la couverture (exclusion test users).
  for (let i = 0; i < 500; i += 1) {
    await insertEvent("pageview", {}, testUserId, "2099-03-07 10:00:00", `${FIXTURE_URL}-testafter`);
  }

  // Déclarations : 1 valide (ancienne) + doublon + 3 invalides + test-admin.
  await insertEvent(
    DECLARATION_EVENT,
    { action_id: PLAN.id, window_days: 14 },
    realAdminId,
    OLDER_TS,
  );
  await insertEvent(
    DECLARATION_EVENT,
    { action_id: PLAN.id, window_days: 14 },
    realAdminId,
    NEWER_TS,
  );
  await insertEvent(DECLARATION_EVENT, { action_id: "oops" }, realAdminId, "2099-03-05 08:00:00");
  await insertEvent(
    DECLARATION_EVENT,
    { action_id: EXTRA_ACTION(90), window_days: 999 },
    realAdminId,
    "2099-03-05 08:30:00",
  );
  await insertEvent(
    DECLARATION_EVENT,
    { action_id: EXTRA_ACTION(91), window_days: 14, note: "texte libre" },
    realAdminId,
    "2099-03-05 08:45:00",
  );
  await insertEvent(
    DECLARATION_EVENT,
    { action_id: TEST_ADMIN_ACTION, window_days: 14 },
    testAdminId,
    "2099-03-05 07:00:00",
  );
  // 5 déclarations valides supplémentaires → plafond de fenêtres atteint.
  for (let n = 1; n <= 5; n += 1) {
    await insertEvent(
      DECLARATION_EVENT,
      { action_id: EXTRA_ACTION(n), window_days: 14 },
      realAdminId,
      `2099-03-05 10:0${n}:00`,
    );
  }
}, 60000);

afterAll(async () => {
  for (const key of Array.from(mockCookies.keys())) mockCookies.delete(key);
  await run("DELETE FROM analytics_events WHERE url LIKE ?", `${FIXTURE_URL}%`);
  await run(
    "DELETE FROM analytics_events WHERE event = ? AND props LIKE ?",
    DECLARATION_EVENT,
    `%${SEG_SUFFIX}%`,
  );
  for (const id of createdUserIds) {
    await run("DELETE FROM analytics_events WHERE user_id = ?", id);
    await run("DELETE FROM users WHERE id = ?", id);
  }
});

// ---------------------------------------------------------------------------
// 1. Entonnoir mesurable
// ---------------------------------------------------------------------------

describe("P2.4 — 1 · entonnoir de conversion mesurable", () => {
  const FULL = {
    page_view: 1000,
    signup_started: 200,
    signup_completed: 60,
    activated: 45,
    begin_checkout: 40,
    purchase: 4,
    return_visit: 100,
    _active_users: 5,
  };

  it("chaque taux affiche dénominateur libellé, minimum d'échantillon et statut", () => {
    const m = buildFunnelMeasurement(makeData({ funnel: FULL }));
    expect(m.source_available).toBe(true);
    expect(m.status).toBe("VALID");
    expect(m.steps.map((s) => s.key)).toEqual([
      "page_view",
      "signup_started",
      "signup_completed",
      "activated",
      "begin_checkout",
      "purchase",
    ]);
    expect(m.rates).toHaveLength(5);
    for (const r of m.rates) {
      expect(r.denominator_label.length).toBeGreaterThan(0);
      expect(r.min_sample).toBeGreaterThan(0);
      expect(r.denominator).toBeGreaterThan(0);
      expect(r.value).not.toBeNull();
      expect(r.value).toBeCloseTo(r.numerator / r.denominator, 10);
      expect(r.status).toBe("VALID");
    }
    const checkout = m.rates.find((r) => r.key === "checkout_to_purchase")!;
    expect(checkout.denominator_key).toBe("begin_checkout");
    expect(checkout.denominator_label).toBe("checkouts débutés");
  });

  it("dénominateur nul → valeur null + INSUFFICIENT_DATA (jamais un faux 0)", () => {
    const m = buildFunnelMeasurement(makeData({ funnel: { _active_users: 0 } }));
    expect(m.source_available).toBe(true);
    for (const r of m.rates) {
      expect(r.value).toBeNull();
      expect(r.status).toBe("INSUFFICIENT_DATA");
    }
    // Les comptages réels à 0 restent des 0 (steps), jamais des taux.
    const pv = m.steps.find((s) => s.key === "page_view")!;
    expect(pv.count).toBe(0);
    expect(pv.status).toBe("VALID");
  });

  it("échantillon sous le minimum → valeur calculée + INSUFFICIENT_DATA", () => {
    const m = buildFunnelMeasurement(
      makeData({ funnel: { page_view: 10, signup_started: 10, signup_completed: 3, _active_users: 1 } }),
    );
    const r = m.rates.find((x) => x.key === "visit_to_signup_start")!;
    expect(r.value).toBeCloseTo(1, 10);
    expect(r.denominator).toBe(10);
    expect(r.status).toBe("INSUFFICIENT_DATA");
    expect(m.status).toBe("INSUFFICIENT_DATA");
  });

  it("table absente → MISSING_DATA partout, source_available false", () => {
    const m = buildFunnelMeasurement(makeData({ funnel: {} }));
    expect(m.source_available).toBe(false);
    expect(m.status).toBe("MISSING_DATA");
    for (const s of m.steps) expect(s.status).toBe("MISSING_DATA");
    for (const r of m.rates) {
      expect(r.status).toBe("MISSING_DATA");
      expect(r.value).toBeNull();
    }
  });

  it("étapes inexistants du produit documentés (NOT_APPLICABLE + raisons)", () => {
    const m = buildFunnelMeasurement(makeData({ funnel: FULL }));
    const keys = m.not_applicable.map((n) => n.key);
    expect(keys).toEqual([
      "preinscription_started",
      "preinscription_completed",
      "unique_visitors",
      "retention_d7",
    ]);
    for (const na of m.not_applicable) expect(na.reason.length).toBeGreaterThan(20);
  });
});

// ---------------------------------------------------------------------------
// 2. Évolution par période
// ---------------------------------------------------------------------------

describe("P2.4 — 2 · évolution entre périodes", () => {
  it("périodes de longueurs différentes → incomparables (NOT_APPLICABLE)", () => {
    const m = buildTrendMeasurement(
      makeData({
        period: { from: "1999-01-01", to: "1999-01-07", days: 7 },
        previous_period: { from: "1999-01-01", to: "1999-01-05", days: 5 },
        funnel: { page_view: 100, _active_users: 1 },
        previous_funnel: { page_view: 80, _active_users: 1 },
      }),
    );
    expect(m.comparable).toBe(false);
    expect(m.status).toBe("NOT_APPLICABLE");
    for (const p of m.points) {
      expect(p.status).toBe("NOT_APPLICABLE");
      expect(p.delta).toBeNull();
      expect(p.delta_pct).toBeNull();
    }
  });

  it("comparaison valide : deltas exacts, variation nulle si base nulle", () => {
    const m = buildTrendMeasurement(
      makeData({
        funnel: { page_view: 100, signup_completed: 10, _active_users: 1 },
        previous_funnel: { page_view: 40, signup_completed: 0, _active_users: 1 },
      }),
    );
    expect(m.comparable).toBe(true);
    expect(m.status).toBe("VALID");
    const pv = m.points.find((p) => p.key === "page_view")!;
    expect(pv.delta).toBe(60);
    expect(pv.delta_pct).toBeCloseTo(60 / 40, 10);
    const sr = m.points.find((p) => p.key === "signup_start_to_complete")!;
    expect(sr.status).toBe("INSUFFICIENT_DATA");
    expect(sr.delta_pct).toBeNull(); // base précédente nulle → pas de division
  });

  it("source absente sur la période précédente → MISSING_DATA, deltas null", () => {
    const m = buildTrendMeasurement(
      makeData({
        funnel: { page_view: 100, _active_users: 1 },
        previous_funnel: {},
      }),
    );
    expect(m.status).toBe("MISSING_DATA");
    expect(m.comparable).toBe(false);
    for (const p of m.points) {
      expect(p.status).toBe("MISSING_DATA");
      expect(p.delta).toBeNull();
    }
  });
});

// ---------------------------------------------------------------------------
// 3. Couverture des données
// ---------------------------------------------------------------------------

describe("P2.4 — 3 · couverture : jours observés ≠ attribution", () => {
  it("couverture calculée, attribution inconnue suivie séparément", () => {
    const m = buildCoverageMeasurement(
      makeData({
        period: { from: "2099-03-14", to: "2099-03-20", days: 7 },
        created_at: `${TODAY}T00:00:00.000Z`,
      }),
      { current_days_with_data: 5, previous_days_with_data: 3 },
      ATTRIBUTION,
    );
    expect(m.current.days_with_data).toBe(5);
    expect(m.current.rate).toBeCloseTo(5 / 7, 10);
    expect(m.current.status).toBe("VALID");
    expect(m.previous.days_with_data).toBe(3);
    // L'attribution inconnue est un volume observé, pas une donnée manquante.
    expect(m.unattributed).toBe(18);
    expect(m.unattributed_status).toBe("VALID");
    expect(m.includes_partial_today).toBe(true);
  });

  it("requête de couverture échouée → null + MISSING_DATA (jamais 0)", () => {
    const m = buildCoverageMeasurement(
      makeData(),
      { current_days_with_data: null, previous_days_with_data: null },
      ATTRIBUTION,
    );
    expect(m.current.days_with_data).toBeNull();
    expect(m.current.rate).toBeNull();
    expect(m.current.status).toBe("MISSING_DATA");
    expect(m.previous.status).toBe("MISSING_DATA");
  });
});

// ---------------------------------------------------------------------------
// 4. Préparation des expérimentations
// ---------------------------------------------------------------------------

describe("P2.4 — 4 · expériences : DRAFT/BLOCKED, jamais lancées", () => {
  it("3 expériences définies : état DRAFT, lancement BLOCKED, 0 lancée", () => {
    const s = buildExperimentSection(data2099());
    expect(s.experiments.map((x) => x.id)).toEqual([
      "exp_acquisition_cta",
      "exp_activation_premier_cours",
      "exp_checkout_preuve_paiement",
    ]);
    expect(s.assignment_mechanism).toBe("ABSENT");
    expect(s.consent_link).toBe("ABSENT");
    expect(s.launched_count).toBe(0);
    for (const x of s.experiments) {
      expect(x.state).toBe("DRAFT");
      expect(x.launch_state).toBe("BLOCKED");
      expect(x.hypothesis.length).toBeGreaterThan(20);
      expect(x.min_observations).toBeGreaterThan(0);
      expect(x.stop_criteria.length).toBeGreaterThanOrEqual(1);
      expect(x.guardrail_metrics.length).toBeGreaterThanOrEqual(1);
      expect(x.blocking_reasons.length).toBeGreaterThanOrEqual(2);
      expect(x.blocking_reasons[0]).toMatch(/Affectation/);
      expect(x.blocking_reasons[1]).toMatch(/Consentement/);
    }
  });

  it("baseline et volume mesurés sur la période courante", () => {
    const s = buildExperimentSection(data2099());
    const cta = s.experiments[0];
    expect(cta.primary_metric).toBe("signup_rate");
    expect(cta.baseline).toBeCloseTo(60 / 1000, 10);
    expect(cta.baseline_denominator).toBe(1000);
    expect(cta.baseline_status).toBe("VALID");
    expect(cta.daily_volume).toBeGreaterThan(0);
    expect(cta.estimated_days_to_min_sample).not.toBeNull();
    expect(cta.volume_status).toBe("VALID");
  });

  it("dénominateur nul → volume non calculable + frein explicite", () => {
    const s = buildExperimentSection(makeData({ funnel: { _active_users: 0 } }));
    for (const x of s.experiments) {
      expect(x.baseline).toBeNull();
      expect(x.daily_volume).toBeNull();
      expect(x.estimated_days_to_min_sample).toBeNull();
      expect(x.volume_status).toBe("INSUFFICIENT_DATA");
      expect(x.blocking_reasons.join(" ")).toMatch(/Volume primaire nul/);
    }
  });

  it("volume sous l'horizon 90 j → INSUFFICIENT_DATA (jauge affichée)", () => {
    const s = buildExperimentSection(
      data2099({ funnel: { page_view: 7, signup_completed: 1, _active_users: 1 } }),
    );
    const cta = s.experiments[0];
    expect(cta.daily_volume).toBeCloseTo(1, 10); // 7 / 7 jours
    expect(cta.estimated_days_to_min_sample).toBe(100); // 100 observations / 1 par jour
    expect(cta.volume_status).toBe("INSUFFICIENT_DATA");
    expect(cta.blocking_reasons.join(" ")).toMatch(/horizon 90 j/);
  });
});

// ---------------------------------------------------------------------------
// 5. Validation stricte des déclarations
// ---------------------------------------------------------------------------

describe("P2.4 — 5 · payload de déclaration : whitelist stricte", () => {
  it("props valides : défaut 14 j, bornes 7 et 30 acceptées", () => {
    const id = `action_OPTIMIZE_LANDING#2099-03-14/2099-03-20#${SEG_SUFFIX}`;
    const def = parseDeclarationPayload({ action_id: id });
    expect(def.ok).toBe(true);
    if (def.ok) expect(def.value.window_days).toBe(DEFAULT_WINDOW_DAYS);
    for (const w of [MIN_WINDOW_DAYS, 30, 14]) {
      const r = parseDeclarationPayload({ action_id: id, window_days: w });
      expect(r.ok).toBe(true);
    }
    expect(MAX_WINDOW_DAYS).toBe(30);
  });

  it("clés inconnues, corps non-objet, formats invalides → rejet", () => {
    const id = `action_OPTIMIZE_LANDING#2099-03-14/2099-03-20#${SEG_SUFFIX}`;
    expect(parseDeclarationPayload(null).ok).toBe(false);
    expect(parseDeclarationPayload([]).ok).toBe(false);
    expect(parseDeclarationPayload("texte").ok).toBe(false);
    expect(parseDeclarationPayload({ action_id: id, note: "libre" }).ok).toBe(false);
    expect(parseDeclarationPayload({ action_id: id, email: "x@y.z" }).ok).toBe(false);
    expect(parseDeclarationPayload({}).ok).toBe(false);
    expect(parseDeclarationPayload({ action_id: "" }).ok).toBe(false);
    expect(parseDeclarationPayload({ action_id: "oops" }).ok).toBe(false);
    expect(parseDeclarationPayload({ action_id: id, window_days: 6 }).ok).toBe(false);
    expect(parseDeclarationPayload({ action_id: id, window_days: 31 }).ok).toBe(false);
    expect(parseDeclarationPayload({ action_id: id, window_days: 14.5 }).ok).toBe(false);
    expect(parseDeclarationPayload({ action_id: id, window_days: "14" }).ok).toBe(false);
  });

  it("ACTION_ID_RE : format P2.3 accepté, variantes dangereuses rejetées", () => {
    expect(ACTION_ID_RE.test(`action_CHECKOUT_DROPOFF#2099-03-14/2099-03-20#NEW_VISITOR`)).toBe(true);
    expect(ACTION_ID_RE.test(`action_RUN_CAMPAIGN#2099-03-14/2099-03-20#global`)).toBe(true);
    expect(ACTION_ID_RE.test(`action_lower#2099-03-14/2099-03-20#seg`)).toBe(false);
    expect(ACTION_ID_RE.test(`action_X#2099-03-14/2099-03-20#seg' OR 1=1`)).toBe(false);
    expect(ACTION_ID_RE.test(`action_X#not-a-date/2099-03-20#seg`)).toBe(false);
    expect(ACTION_ID_RE.test(`action_X#2099-03-14/2099-03-20#${"a".repeat(41)}`)).toBe(false);
  });

  it("dédoublonnage : la déclaration la plus ancienne gagne", () => {
    const rows = [
      declOf(PLAN.id, NEWER_TS),
      declOf(PLAN.id, OLDER_TS),
      declOf(EXTRA_ACTION(1), NEWER_TS),
    ];
    const { distinct, duplicates } = dedupeDeclarations(rows);
    expect(distinct).toHaveLength(2);
    expect(duplicates).toBe(1);
    expect(distinct[0].declared_at).toBe(OLDER_TS);
  });

  it("plafond : 5 fenêtres mesurées par appel, surcharge non traitée", () => {
    const rows: ActionDeclaration[] = [];
    for (let n = 1; n <= 7; n += 1) rows.push(declOf(EXTRA_ACTION(n), OLDER_TS));
    const load = declLoad(rows);
    const processable = processableDeclarations(load);
    expect(processable).toHaveLength(DECLARATION_WINDOW_CAP);
    expect(DECLARATION_WINDOW_CAP).toBe(5);
  });
});

// ---------------------------------------------------------------------------
// 6. Mesure avant/après (pur)
// ---------------------------------------------------------------------------

describe("P2.4 — 6 · mesure des actions déclarées", () => {
  it("sans déclaration → NOT_DECLARED + NOT_APPLICABLE (statut P2.3 inchangé)", () => {
    const m = buildActionMeasurement(QUEUE, declLoad([]), new Map(), TODAY);
    expect(m.load_status).toBe("VALID");
    expect(m.declared_valid).toBe(0);
    expect(m.entries).toHaveLength(1);
    const e = m.entries[0];
    expect(e.plan_status).toBe("PROPOSED");
    expect(e.implementation).toBe("NOT_DECLARED");
    expect(e.result).toBe("NOT_APPLICABLE");
    expect(e.confidence).toBe("NONE");
    expect(e.interpretation).toMatch(/aucune exécution n'est déduite/);
    expect(e.metrics).toHaveLength(0);
  });

  it("déclarée + échantillons suffisants → OBSERVED (corrélation, pas causalité)", () => {
    const aggregates = new Map([[PLAN.id, fullAggregate()]]);
    const m = buildActionMeasurement(
      QUEUE,
      declLoad([declOf(PLAN.id, `${DECL_DAY} 09:00:00`, 14)]),
      aggregates,
      TODAY,
    );
    const e = m.entries[0];
    expect(e.implementation).toBe("DECLARED_REALIZED");
    expect(e.result).toBe("OBSERVED");
    expect(e.result_status).toBe("VALID");
    expect(e.after_complete).toBe(true);
    expect(e.confidence).toBe("MEDIUM");
    expect(e.interpretation).toMatch(/corrélation temporelle uniquement/);
    expect(e.interpretation).toMatch(/aucune preuve causale/);
    expect(e.before_window).toEqual({ from: "2099-02-19", to_exclusive: DECL_DAY });
    expect(e.after_window).toEqual({ from: DECL_DAY, to_exclusive: "2099-03-19" });
    const signup = e.metrics.find((x) => x.metric === "signup_rate")!;
    expect(signup.before).toBeCloseTo(8 / 40, 10);
    expect(signup.after).toBeCloseTo(10 / 50, 10);
    expect(signup.before_status).toBe("VALID");
    expect(signup.after_status).toBe("VALID");
    expect(signup.delta).toBeCloseTo(0, 10);
    expect(signup.evolution).toBe("STABLE");
    expect(e.volume.before_events).toBe(40 + 12 + 8 + 6 + 5 + 1 + 12);
    expect(e.volume.after_events).toBe(50 + 15 + 10 + 8 + 7 + 2 + 15);
  });

  it("fenêtre postérieure incomplète → OBSERVED mais confiance LOW", () => {
    const m = buildActionMeasurement(
      QUEUE,
      declLoad([declOf(PLAN.id, `${DECL_DAY} 09:00:00`, 14)]),
      new Map([[PLAN.id, fullAggregate()]]),
      "2099-03-10", // avant la fin de la fenêtre [03-05, 03-19)
    );
    const e = m.entries[0];
    expect(e.after_complete).toBe(false);
    expect(e.result).toBe("OBSERVED");
    expect(e.confidence).toBe("LOW");
    expect(e.interpretation).toMatch(/encore en cours/);
    expect(e.interpretation).toMatch(/provisoire/);
  });

  it("échantillons insuffisants → INDETERMINATE, jamais OBSERVED", () => {
    const small: WindowAggregate = {
      before: { page_view: 5, signup_completed: 1, activated: 1, begin_checkout: 2, purchase: 0, return_visit: 0 },
      after: { page_view: 5, signup_completed: 1, activated: 1, begin_checkout: 2, purchase: 0, return_visit: 0 },
      source: "ok",
    };
    const m = buildActionMeasurement(
      QUEUE,
      declLoad([declOf(PLAN.id, `${DECL_DAY} 09:00:00`)]),
      new Map([[PLAN.id, small]]),
      TODAY,
    );
    const e = m.entries[0];
    expect(e.result).toBe("INDETERMINATE");
    expect(e.result_status).toBe("INSUFFICIENT_DATA");
    expect(e.confidence).toBe("NONE");
    expect(e.interpretation).toMatch(/non concluant/);
    for (const x of e.metrics.filter((y) => y.measured)) {
      expect(["INSUFFICIENT_DATA", "MISSING_DATA"]).toContain(x.status);
    }
  });

  it("métriques non mesurables explicites (rationnel écrit)", () => {
    const m = buildActionMeasurement(
      QUEUE,
      declLoad([declOf(PLAN.id, `${DECL_DAY} 09:00:00`)]),
      new Map([[PLAN.id, fullAggregate()]]),
      TODAY,
    );
    const metrics = m.entries[0].metrics;
    expect(metrics).toHaveLength(8);
    for (const key of ["attribution_coverage", "conversion_rate"]) {
      const x = metrics.find((y) => y.metric === key)!;
      expect(x.measured).toBe(false);
      expect(x.status).toBe("NOT_APPLICABLE");
      expect(x.not_measured_reason).toBeTruthy();
      expect(x.before).toBeNull();
      expect(x.after).toBeNull();
    }
    expect(metrics.map((x) => x.metric)).toEqual([
      "signup_rate",
      "activation_rate",
      "checkout_dropoff",
      "purchase_rate",
      "return_visit_rate",
      "subscription_count",
      "attribution_coverage",
      "conversion_rate",
    ]);
  });

  it("évolutions factuelles HAUSSE/BAISSE/STABLE, aucun jugement de qualité", () => {
    const agg = fullAggregate();
    // signup_rate : 10/100 = 0.10 < 8/40 = 0.20 → BAISSE ; return_visit : 15/100 < 12/40 → BAISSE.
    agg.after.page_view = 100;
    const m = buildActionMeasurement(
      QUEUE,
      declLoad([declOf(PLAN.id, `${DECL_DAY} 09:00:00`)]),
      new Map([[PLAN.id, agg]]),
      TODAY,
    );
    const metrics = m.entries[0].metrics;
    const signup = metrics.find((x) => x.metric === "signup_rate")!;
    expect(signup.evolution).toBe("BAISSE");
    const ret = metrics.find((x) => x.metric === "return_visit_rate")!;
    expect(ret.evolution).toBe("BAISSE"); // 15/100 = 0.15 < 12/40 = 0.30
    const corpus = JSON.stringify(m);
    expect(corpus).not.toMatch(/amélioration|amélioré|pire que/);
  });

  it("source des déclarations indisponible → tous UNKNOWN (jamais NOT_DECLARED)", () => {
    const m = buildActionMeasurement(
      QUEUE,
      { rows: [], total: 0, invalid: 0, source: "unavailable" },
      new Map(),
      TODAY,
    );
    expect(m.load_status).toBe("MISSING_DATA");
    for (const e of m.entries) {
      expect(e.implementation).toBe("UNKNOWN");
      expect(e.result).toBe("INDETERMINATE");
      expect(e.interpretation).toMatch(/jamais converti en non déclarée/);
    }
  });

  it("déclarée mais hors plafond → INDETERMINATE sans faux état", () => {
    const m = buildActionMeasurement(
      QUEUE,
      declLoad([declOf(PLAN.id, `${DECL_DAY} 09:00:00`)]),
      new Map(), // aucune agrégation chargée (plafond / échec)
      TODAY,
    );
    const e = m.entries[0];
    expect(e.implementation).toBe("DECLARED_REALIZED");
    expect(e.result).toBe("INDETERMINATE");
    expect(e.result_status).toBe("MISSING_DATA");
    expect(e.interpretation).toMatch(/Plafond de fenêtres atteint/);
  });

  it("vocabulaire d'états strict (aucun état d'exécution inventé)", () => {
    const m = buildActionMeasurement(
      QUEUE,
      declLoad([declOf(PLAN.id, `${DECL_DAY} 09:00:00`)]),
      new Map([[PLAN.id, fullAggregate()]]),
      TODAY,
    );
    const implStates = new Set(m.entries.map((e) => e.implementation));
    const results = new Set(m.entries.map((e) => e.result));
    const confidences = new Set(m.entries.map((e) => e.confidence));
    for (const s of implStates) {
      expect(["NOT_DECLARED", "DECLARED_REALIZED", "UNKNOWN"]).toContain(s);
    }
    for (const r of results) expect(["NOT_APPLICABLE", "INDETERMINATE", "OBSERVED"]).toContain(r);
    for (const c of confidences) expect(["NONE", "LOW", "MEDIUM"]).toContain(c);
    const corpus = JSON.stringify(m);
    expect(corpus).not.toMatch(/EXECUTED|ACCEPTED|LAUNCHED|VALIDATED/);
  });

  it("échantillons insuffisants sur comptage → subscription_count INSUFFICIENT_DATA", () => {
    const m = buildActionMeasurement(
      QUEUE,
      declLoad([declOf(PLAN.id, `${DECL_DAY} 09:00:00`)]),
      new Map([[PLAN.id, fullAggregate()]]),
      TODAY,
    );
    const count = m.entries[0].metrics.find((x) => x.metric === "subscription_count")!;
    expect(count.before).toBe(1);
    expect(count.after).toBe(2);
    expect(count.before_status).toBe("INSUFFICIENT_DATA");
    expect(count.delta).toBe(1);
    expect(count.evolution).toBe("HAUSSE");
  });
});

// ---------------------------------------------------------------------------
// 7. Couche SQL réelle (fenêtre isolée 2099-03)
// ---------------------------------------------------------------------------

describe("P2.4 — 7 · SQL réel : registre, fenêtres, couverture", () => {
  it("registre : admin réel uniquement, props invalides comptées", async () => {
    const load = await loadDeclarations();
    expect(load.source).toBe("ok");
    expect(load.rows.some((r) => r.action_id === PLAN.id)).toBe(true);
    expect(load.rows.some((r) => r.action_id === TEST_ADMIN_ACTION)).toBe(false);
    expect(load.invalid).toBeGreaterThanOrEqual(3); // id invalide + fenêtre 999 + clé libre
    expect(load.total).toBeGreaterThanOrEqual(load.rows.length + 3);
    const planRow = load.rows.find((r) => r.action_id === PLAN.id)!;
    expect(planRow.declared_at).toBe(OLDER_TS); // doublon le plus récent ignoré
    expect(planRow.window_days).toBe(14);
    expect(planRow.declared_by).toBe(realAdminId);
    const processable = processableDeclarations(load);
    expect(processable).toHaveLength(DECLARATION_WINDOW_CAP);
  }, 30000);

  it("fenêtres : bornes exactes, test users exclus, pageview réconcilié", async () => {
    const agg = await loadWindowAggregates(
      dayStart("2099-02-19"),
      dayStart(DECL_DAY),
      dayStart(DECL_DAY),
      dayStart("2099-03-19"),
    );
    expect(agg.source).toBe("ok");
    expect(agg.before.page_view).toBe(40); // 500 pages de test exclues
    expect(agg.after.page_view).toBe(50);
    expect(agg.before.signup_completed).toBe(8);
    expect(agg.after.signup_completed).toBe(10);
    expect(agg.before.pageview).toBe(40); // événement réel conservé
  }, 30000);

  it("couverture SQL : jours distincts réels, jour de test exclu", async () => {
    const cov = await loadCoverage(
      dayStart(DECL_DAY),
      dayStart("2099-03-19"),
      dayStart("2099-02-19"),
      dayStart(DECL_DAY),
    );
    // Après : 2099-03-05 (déclarations admin réelles) et 2099-03-06
    // (événements funnel) ; 2099-03-07 = jour de test seul → exclu.
    expect(cov.current_days_with_data).toBe(2);
    // Avant : 2099-02-25 (pages vues) et 2099-03-01 (inscriptions).
    expect(cov.previous_days_with_data).toBe(2);
  }, 30000);

  it("hasDeclaration : vrai positif/négatif sur le registre", async () => {
    expect(await hasDeclaration(PLAN.id)).toBe(true);
    expect(await hasDeclaration(EXTRA_ACTION(90))).toBe(false); // props invalides
    expect(await hasDeclaration(TEST_ADMIN_ACTION)).toBe(false); // admin de test
    expect(await hasDeclaration(`action_PROMOTE_SUBSCRIPTION#2099-01-01/2099-01-07#jamais`)).toBe(false);
  }, 30000);

  it("intégration : computeMeasurement complet, déterministe, sans PII", async () => {
    const data = data2099();
    const bundle = runDecisionLayer(data);
    const m1 = await computeMeasurement(data, bundle.actions, ATTRIBUTION);
    const m2 = await computeMeasurement(data, bundle.actions, ATTRIBUTION);
    expect(JSON.stringify(m1)).toBe(JSON.stringify(m2));
    assertMeasurementShape(m1);
    expect(m1.actions.processed).toBe(DECLARATION_WINDOW_CAP);
    // Le plan fixture est synthétique (absent du moteur) : file QUEUE portant
    // exactement le plan déclaré → la déclaration est mesurée sur la vraie file.
    const mq = await computeMeasurement(data, QUEUE, ATTRIBUTION);
    const entry = mq.actions.entries.find((e) => e.action_id === PLAN.id);
    expect(entry).toBeDefined();
    expect(entry!.implementation).toBe("DECLARED_REALIZED");
    expect(entry!.result).toBe("OBSERVED");
    expect(entry!.confidence).toBe("MEDIUM");
    expect(m1.experiments.launched_count).toBe(0);
    expect(m1.coverage.includes_partial_today).toBe(true);
    const corpus = JSON.stringify(m1);
    expect(corpus).not.toMatch(/@edukora\.net|@test\.ci|password|first_name|last_name/);
  }, 60000);

  it("performance : requêtes bornées (2 couverture + 1 registre + ≤5 fenêtres)", async () => {
    const origQuery = db.query;
    const origQueryOne = db.queryOne;
    const spyQ = jest
      .spyOn(db, "query")
      .mockImplementation((async (sql: string, ...args: unknown[]) =>
        (origQuery as unknown as (s: string, ...a: unknown[]) => Promise<unknown>)(sql, ...args)) as never);
    const spyQO = jest
      .spyOn(db, "queryOne")
      .mockImplementation((async (sql: string, ...args: unknown[]) =>
        (origQueryOne as unknown as (s: string, ...a: unknown[]) => Promise<unknown>)(sql, ...args)) as never);
    try {
      const data = data2099();
      const bundle = runDecisionLayer(data);
      await computeMeasurement(data, bundle.actions, ATTRIBUTION);
      const count = spyQ.mock.calls.length + spyQO.mock.calls.length;
      expect(count).toBeGreaterThanOrEqual(3);
      expect(count).toBeLessThanOrEqual(8);
    } finally {
      spyQ.mockRestore();
      spyQO.mockRestore();
    }
  }, 60000);
});

function assertMeasurementShape(m: GrowthMeasurement): void {
  expect(m.meta).toEqual({
    engine: "deterministic",
    source: "analytics_events (test users excluded)",
    test_users_excluded: true,
    causal_claims: false,
    executed_actions: false,
  });
  expect(m.funnel.rates).toHaveLength(5);
  expect(m.trend.points.length).toBe(6 + 5);
  expect(m.coverage.current).toBeDefined();
  expect(m.actions.window_cap).toBe(DECLARATION_WINDOW_CAP);
  expect(m.experiments.experiments).toHaveLength(3);
}

// ---------------------------------------------------------------------------
// 8. Routes : contrôle d'accès, idempotence, bundle
// ---------------------------------------------------------------------------

describe("P2.4 — 8 · routes", () => {
  it("POST declare : 401 sans session, 403 pour un student", async () => {
    mockCookies.delete("edukora_session");
    const res401 = await callRoute(declarePOST, declareRequest({ action_id: PLAN.id }));
    expect(res401.status).toBe(401);

    mockCookies.set("edukora_session", await createSession(studentId));
    const res403 = await callRoute(declarePOST, declareRequest({ action_id: PLAN.id }));
    expect(res403.status).toBe(403);
    mockCookies.delete("edukora_session");
  }, 30000);

  it("POST declare : 400 sur corps ou props hors whitelist", async () => {
    mockCookies.set("edukora_session", await createSession(realAdminId));
    const cases: unknown[] = [
      "{not json",
      { action_id: PLAN.id, note: "libre" },
      { action_id: "oops" },
      { action_id: PLAN.id, window_days: 99 },
    ];
    for (const body of cases) {
      const res = await callRoute(declarePOST, declareRequest(body));
      expect(res.status).toBe(400);
      const json = (await res.json()) as { error: string };
      expect(["corps_invalide", "champ_inconnu", "action_id_invalide", "window_days_invalide"]).toContain(
        json.error,
      );
      // Aucun reflet de la valeur soumise dans le message d'erreur.
      expect(JSON.stringify(json)).not.toMatch(/libre|oops|99/);
    }
    mockCookies.delete("edukora_session");
  }, 30000);

  it("POST declare : 201 puis 200 already_declared, une seule ligne écrite", async () => {
    mockCookies.set("edukora_session", await createSession(realAdminId));
    const actionId = `action_REACTIVATE_USER#2099-03-14/2099-03-20#${SEG_SUFFIX}`;
    const countRows = async () =>
      query<{ id: number }>(
        "SELECT id FROM analytics_events WHERE event = ? AND props LIKE ? AND url = ?",
        DECLARATION_EVENT,
        `%${SEG_SUFFIX}%`,
        "/api/growth/actions/declare",
      );

    const before = await countRows();
    const res1 = await callRoute(
      declarePOST,
      declareRequest({ action_id: actionId, window_days: 21 }),
    );
    expect(res1.status).toBe(201);
    const body1 = (await res1.json()) as { status: string; action_id: string; window_days: number };
    expect(body1).toEqual({ status: "declared", action_id: actionId, window_days: 21 });

    const res2 = await callRoute(
      declarePOST,
      declareRequest({ action_id: actionId, window_days: 21 }),
    );
    expect(res2.status).toBe(200);
    const body2 = (await res2.json()) as { status: string };
    expect(body2.status).toBe("already_declared");

    const after = await countRows();
    expect(after.length).toBe(before.length + 1);
    expect(await hasDeclaration(actionId)).toBe(true);
    mockCookies.delete("edukora_session");
  }, 30000);

  it("GET insights : admin → bundle + measurement ; student → 403", async () => {
    mockCookies.set("edukora_session", await createSession(realAdminId));
    const res = await callRoute(
      insightsGET,
      new Request("http://localhost/api/admin/growth/insights", { method: "GET" }),
    );
    expect(res.status).toBe(200);
    const body = (await res.json()) as GrowthInsightBundle & { measurement?: GrowthMeasurement };
    // Contrat P2.1/P2.2/P2.3 : meta inchangée, clés du bundle préservées.
    expect(body.meta).toEqual({
      engine: "deterministic",
      external_calls: false,
      test_users_excluded: true,
      actions_executed: false,
    });
    expect(body.measurement).toBeDefined();
    assertMeasurementShape(body.measurement!);
    expect(body.measurement!.meta.executed_actions).toBe(false);

    mockCookies.set("edukora_session", await createSession(studentId));
    const res403 = await callRoute(
      insightsGET,
      new Request("http://localhost/api/admin/growth/insights", { method: "GET" }),
    );
    expect(res403.status).toBe(403);
    mockCookies.delete("edukora_session");
  }, 60000);
});

// ---------------------------------------------------------------------------
// 9. Scans source : lecture seule, contrat préservé, doc
// ---------------------------------------------------------------------------

const ROOT = join(__dirname, "..");
const readSrc = (...parts: string[]) => readFileSync(join(ROOT, ...parts), "utf8");

describe("P2.4 — 9 · scans source et documentation", () => {
  it("route declare : admin-only, whitelist, aucune requête réseau/env", () => {
    const src = readSrc("src", "app", "api", "growth", "actions", "declare", "route.ts");
    expect(src).toContain("requireAdmin");
    expect(src).toContain("guardApi");
    expect(src).toContain("parseDeclarationPayload");
    expect(src).toContain("trackDb");
    expect(src).not.toMatch(/process\.env|fetch\s*\(|axios|INSERT INTO|UPDATE \w+ SET|DELETE FROM/);
    expect(src).not.toContain("export const GET");
  });

  it("route insights : contraintes P2.1-P2.3 préservées + P2.4 ajouté", () => {
    const src = readSrc("src", "app", "api", "admin", "growth", "insights", "route.ts");
    for (const required of ["requireAdmin", "guardApi", "runDecisionLayer", "read-only", "computeMeasurement"]) {
      expect(src).toContain(required);
    }
    expect(src).not.toMatch(
      /export const POST|INSERT INTO|UPDATE \w+ SET|DELETE FROM|generateStrategy|generateRecommendation|n8n|whatsapp|mailer/,
    );
  });

  it("module mesure : SELECT uniquement, zéro écriture, zéro réseau, zéro secret", () => {
    const dir = join(ROOT, "src", "lib", "growth", "measure");
    const files = readdirSync(dir).filter((f) => f.endsWith(".ts"));
    expect(files.length).toBeGreaterThanOrEqual(8);
    for (const f of files) {
      const src = readFileSync(join(dir, f), "utf8");
      expect({ file: f, match: src.match(/INSERT INTO|UPDATE \w+ SET|DELETE FROM|fetch\s*\(|axios|process\.env|Bearer\s|openai|anthropic|generateWithGateway/)?.[0] ?? null }).toEqual({
        file: f,
        match: null,
      });
    }
  });

  it("panneau : 100 % lecture seule, sections P2.4, champs P2.1-P2.3 intacts", () => {
    const src = readSrc("src", "app", "espace-admin", "growth", "GrowthInsightsPanel.tsx");
    expect(src).toContain('fetch("/api/admin/growth/insights")');
    expect(src).not.toMatch(/fetch\((?!["'`])|POST\s*\{|\.post\(/);
    for (const required of [
      "PROPOSED",
      "Actions recommandées",
      "À faire maintenant",
      "Cette semaine",
      "À surveiller",
      "Bloquées par les données",
      "Entonnoir de conversion (P2.4)",
      // Représentation JSX réelle : entité &amp; dans la source.
      "Évolution &amp; couverture (P2.4)",
      "Mesure des actions déclarées (P2.4)",
      "Préparation d",
      "corrélation temporelle uniquement",
    ]) {
      expect(src).toContain(required);
    }
    // Aucun appel à l'API d'écriture (déclaration) depuis le panneau.
    expect(src).not.toContain("/api/growth/actions/declare");
  });

  it("doc contrat : §13 documente l'événement serveur, taxonomie intacte", () => {
    const doc = readSrc("docs", "analytics-data-contract.md");
    expect(doc).toContain("growth_action_implemented");
    expect(doc).toContain("## 13.");
    expect(doc).toContain("43 noms");
    expect(doc).toContain("44 noms");
    expect(doc).toContain("`pageview`");
    // Aucun mot de qualité non étayé dans les textes produits P2.4.
    const section = buildExperimentSection(data2099());
    const corpus = [
      section.note,
      ...section.experiments.flatMap((x) => [
        x.hypothesis,
        ...x.blocking_reasons,
        x.eligible_population,
      ]),
      "Échantillon insuffisant ou source incomplète sur l'une des fenêtres : résultat non concluant.",
    ].join(" ");
    expect(corpus).not.toMatch(
      /\bexcellent\b|\bmeilleur\b|\bpire\b|ivoirien|benchmark edtech|moyenne ivoirienne/i,
    );
  });
});

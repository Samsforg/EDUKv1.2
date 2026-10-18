/**
 * P2 — GROWTH FOUNDATION : fondations mesurables (audit préalable).
 *
 * Ce fichier exécute, sur le code réel, le contrat décrit dans
 * `P2_GROWTH_FOUNDATION_FINAL.md` :
 *
 *  §1 taxonomie d'événements (33 EVENTS + 3 hors EVENTS = 36)
 *  §2 chaque événement du contrat a au moins un producteur
 *  §3 les 3 événements hors EVENTS ont la bonne source (client vs serveur)
 *  §4 funnel canonique : étapes, producteurs, lecteurs dédiés
 *  §5 garde-fous de la route d'ingestion /api/analytics/track
 *  §6 idempotence des writers serveur (activated, purchase, webhook)
 *  §7 rétention et KPI jamais fabriqués (pas de faux 0, pas d'invention)
 *  §8 contrat KPI §16 : chaque KPI livré a une source dans le code
 *  §9 tables growth : état réel + dettes G1/G2 documentées (tripwires)
 *
 * Règles P2 respectées : aucun refactor, aucune migration, aucune route
 * nouvelle, aucune donnée de rétention rétrofabriquée. Les dettes G1/G2
 * sont **caractérisées** (verrou), pas corrigées : si un futur commit les
 * corrige, ces tests échouent volontairement pour forcer la mise à jour du
 * rapport P2 et du verrou.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { EVENTS } from "@/lib/analytics";
import { getStore } from "@/lib/growth/data/store";
import { queryOne, run } from "@/lib/db";

const ROOT = join(__dirname, "..");
const read = (...p: string[]) => readFileSync(join(ROOT, ...p), "utf8");

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return walk(p);
    return /\.(ts|tsx)$/.test(f) ? [p] : [];
  });
}

// Index mémoire unique : les suites it.each (33+ clés) le relisent sans
// re-toucher le disque (lecture unique au chargement du module).
const SRC = walk(join(ROOT, "src")).map((p) => ({
  rel: p.slice(ROOT.length + 1).replace(/\\/g, "/"),
  content: readFileSync(p, "utf8"),
}));
const ANALYTICS_REL = "src/lib/analytics.ts";

const trackRouteSrc = read("src", "app", "api", "analytics", "track", "route.ts");
const analyticsDbSrc = read("src", "lib", "analytics-db.ts");
const webhookSrc = read("src", "app", "api", "premium", "webhook", "route.ts");
const growthRouteSrc = read("src", "app", "api", "growth", "metrics", "route.ts");
const storeSrc = read("src", "lib", "growth", "data", "store.ts");
const businessMetricsSrc = read("src", "lib", "business-metrics.ts");
const conversionReportSrc = read("src", "lib", "conversion-report.ts");
const adminAnalyticsSrc = read("src", "app", "espace-admin", "analytics", "page.tsx");
const revenueSrc = read("src", "app", "espace-admin", "revenus", "page.tsx");
const eduAnalyticsSrc = read("src", "components", "EdukoraAnalytics.tsx");
const typesSrc = read("src", "lib", "growth", "ai", "types.ts");
const dbSrc = read("src", "lib", "db.ts");
const contractDoc = read("docs", "analytics-data-contract.md");

const SIGNUP_STEP2_REL = "src/app/inscription-2-2-d-tails-acad-miques/page.tsx";

/** Producteurs possibles d'un nom d'événement : constantes EVENTS, littéral dans un call site, ou writer serveur (activated/purchase/signup_completed). */
function producerFiles(ev: string): string[] {
  if (ev === "activated") {
    return SRC.filter(
      (f) => /maybeRecordActivation\(/.test(f.content) || /'activated'/.test(f.content),
    )
      .filter((f) => f.rel === "src/lib/analytics-db.ts" || f.rel === "src/app/api/analytics/track/route.ts")
      .map((f) => f.rel);
  }
  if (ev === "purchase") {
    return SRC.filter((f) => /recordPurchase\(/.test(f.content))
      .filter((f) => f.rel === "src/lib/analytics-db.ts" || f.rel === "src/app/api/premium/webhook/route.ts")
      .map((f) => f.rel);
  }
  // P2.5.2/P2.5.4 : signup_completed est un writer serveur (P2.3/P2.5.4) —
  // émis via maybeRecordSignup (idempotent) appelé par /api/auth/register ;
  // le littéral 'signup_completed' vit dans le SQL de analytics-db.ts.
  if (ev === "signup_completed") {
    return SRC.filter(
      (f) => /maybeRecordSignup\(/.test(f.content) || /'signup_completed'/.test(f.content),
    )
      .filter((f) => f.rel === "src/lib/analytics-db.ts" || f.rel === "src/app/api/auth/register/route.ts")
      .map((f) => f.rel);
  }
  // P2.7.6 — demo_signup_clicked est deprecated : déclaré dans EVENTS
  // mais non émis (remplacé par cta_clicked {cta_id}). Le contrat
  // documente la dépréciation ; le producteur est la doc elle-même.
  if (ev === "demo_signup_clicked") {
    return contractDoc.includes("DEPRECATED") ? ["docs/analytics-data-contract.md"] : [];
  }
  const key = Object.keys(EVENTS).find((k) => EVENTS[k as keyof typeof EVENTS] === ev);
  const emitterRe = /(trackEvent\(|edukoraTrack\()/;
  return SRC.filter((f) => {
    if (f.rel === ANALYTICS_REL) return false;
    if (!emitterRe.test(f.content)) return false;
    if (key && new RegExp(`EVENTS\\.${key}\\b`).test(f.content)) return true;
    return new RegExp(`['"]${ev}['"]`).test(f.content);
  }).map((f) => f.rel);
}

// ------------------------------------------------------------------
// §1 — Taxonomie
// ------------------------------------------------------------------
describe("P2 §1 — taxonomie d'evenements (contrat KPI)", () => {
  it("EVENTS compte exactement 43 cles, valeurs uniques, snake_case", () => {
    const keys = Object.keys(EVENTS);
    const values = Object.values(EVENTS);
    expect(keys).toHaveLength(43);
    expect(new Set(values).size).toBe(43);
    for (const v of values) expect(v).toMatch(/^[a-z][a-z0-9_]*$/);
  });

  it("le script inline T3 reste synchronise avec EVENTS (signup_step_2_completed)", () => {
    const inline = read(SIGNUP_STEP2_REL);
    expect(inline).toContain(`window.edukoraTrack('${EVENTS.signupStep2Completed}'`);
  });

  it("la taxonomie de growth/ai/types.ts reste marquee perimee (jamais utilisee comme reference)", () => {
    // écart E5 du contrat : `page_view` n'est jamais écrit tel quel en base.
    expect(typesSrc).toContain('"page_view"');
    expect(contractDoc).toMatch(/p[ée]rim[ée]e/);
    expect(growthRouteSrc).not.toMatch(/growth\/ai\/types/);
  });
});

// ------------------------------------------------------------------
// §2 — Producteurs
// ------------------------------------------------------------------
describe("P2 §2 — chaque evenement du contrat a un producteur", () => {
  it.each(Object.entries(EVENTS))("producteur present pour %s (%s)", (_key, ev) => {
    expect(producerFiles(ev).length).toBeGreaterThan(0);
  });
});

// ------------------------------------------------------------------
// §3 — Les 3 hors EVENTS : client vs serveur
// ------------------------------------------------------------------
describe("P2 §3 — les 3 evenements hors EVENTS ont la bonne source", () => {
  it("pageview : emis uniquement par EdukoraAnalytics (T2, client)", () => {
    const emitters = SRC.filter((f) => /event:\s*"pageview"/.test(f.content)).map((f) => f.rel);
    expect(emitters).toEqual(["src/components/EdukoraAnalytics.tsx"]);
    expect(eduAnalyticsSrc).toContain("/api/analytics/track");
  });

  it("activated : jamais emis cote client — writer serveur seulement", () => {
    const client = SRC.filter((f) => /(trackEvent|edukoraTrack)\(\s*['"]activated['"]/.test(f.content));
    expect(client.map((f) => f.rel)).toEqual([]);
    expect(analyticsDbSrc).toMatch(/maybeRecordActivation/);
    expect(trackRouteSrc).toMatch(/maybeRecordActivation\(userId, sessionId, url\)/);
  });

  it("purchase : jamais emis cote client — writer serveur webhook seulement", () => {
    const client = SRC.filter((f) => /(trackEvent|edukoraTrack)\(\s*['"]purchase['"]/.test(f.content));
    expect(client.map((f) => f.rel)).toEqual([]);
    expect(analyticsDbSrc).toMatch(/export async function recordPurchase/);
    expect(webhookSrc).toMatch(/recordPurchase\(/);
  });
});

// ------------------------------------------------------------------
// §4 — Funnel canonique
// ------------------------------------------------------------------
const STAGES: Record<string, string[]> = {
  VISIT: ["pageview"],
  ACQUISITION: ["landing_viewed", "cta_clicked", "referral_clicked"],
  SIGNUP: ["signup_started", "signup_step_2_completed", "signup_completed", "login_completed"],
  ENGAGEMENT: ["course_opened", "lesson_started", "lesson_completed", "quiz_completed"],
  ACTIVATION: ["activated"],
  CONVERSION: ["begin_checkout", "add_payment_info", "subscription_started", "purchase"],
  RETENTION: ["return_visit", "login_completed"],
};

/** Événements KPI avec lecteur dédié `funnel["…"]` dans /api/growth/metrics. */
const DEDICATED_READERS = [
  "pageview",
  "page_view",
  "signup_started",
  "signup_completed",
  "login_completed",
  "course_opened",
  "lesson_started",
  "lesson_completed",
  "quiz_started",
  "quiz_completed",
  "fiche_opened",
  "simulateur_started",
  "simulateur_completed",
  "begin_checkout",
  "add_payment_info",
  "subscription_started",
  "purchase",
  "activated",
  "quota_exceeded",
  "ai_tutor_opened",
  "ai_question_sent",
  "referral_link_shared",
  "referral_code_copied",
];

describe("P2 §4 — funnel canonique : etapes, producteurs, lecteurs", () => {
  it.each(Object.entries(STAGES))("etape %s : chaque evenement a un producteur", (_stage, events) => {
    for (const ev of events) {
      expect({ ev, producers: producerFiles(ev) }).toEqual({ ev, producers: expect.arrayContaining([expect.any(String)]) });
    }
  });

  it.each(DEDICATED_READERS)("growth/metrics lit %s (lecteur KPI dedie)", (ev) => {
    expect(growthRouteSrc).toContain(`funnel["${ev}"]`);
  });

  it("les etapes sans KPI dedie restent couvertes par le flux brut admin (GROUP BY event)", () => {
    expect(adminAnalyticsSrc).toMatch(/GROUP BY event/);
    expect(adminAnalyticsSrc).toMatch(/getAnalyticsDashboard7d/);
  });

  it("aucun comptage KPI eparpille : growth/metrics ne lit pas les evenements d'acquisition bruts", () => {
    // Le rapport P2 déclare ces KPI « stockés, lecteur générique seulement » :
    // les lire ici créerait un deuxième comptage sans définition contractuelle.
    for (const ev of ["landing_viewed", "cta_clicked", "return_visit", "referral_clicked"]) {
      expect(growthRouteSrc).not.toContain(`funnel["${ev}"]`);
    }
  });

  it("ACTIVATION : derivation serveur sur la 1re lesson_started identifiee (jamais depuis le corps)", () => {
    expect(trackRouteSrc).toMatch(/event === "lesson_started" && userId !== null/);
    expect(growthRouteSrc).toContain('funnel["activated"]');
  });

  it("CONVERSION : purchase compte un evenement — jamais de somme financiere dans growth/metrics", () => {
    expect(growthRouteSrc).toContain('premiumConversions: funnel["purchase"]');
    expect(growthRouteSrc).not.toMatch(/price_cents|\bMRR\b/i);
    expect(growthRouteSrc).not.toMatch(/(?:FROM|JOIN)\s+subscriptions/i);
  });
});

// ------------------------------------------------------------------
// §5 — Route d'ingestion
// ------------------------------------------------------------------
describe("P2 §5 — garde-fous de /api/analytics/track", () => {
  it("route protegee par guardApi (rate limit, pas de route publique nue)", () => {
    expect(trackRouteSrc).toContain('guardApi("POST /api/analytics/track"');
  });

  it("evenement tronque a 80 car. et url a 500 car. (bornes du contrat)", () => {
    expect(trackRouteSrc).toMatch(/slice\(0, 80\)/);
    expect(trackRouteSrc).toMatch(/slice\(0, 500\)/);
  });

  it("identite toujours serveur, session toujours hachee sha256", () => {
    expect(trackRouteSrc).toMatch(/getCurrentUser\(\)/);
    expect(trackRouteSrc).not.toMatch(/body\.user_id|body\.userId/);
    expect(trackRouteSrc).toMatch(/createHash\("sha256"\)/);
  });

  it("un evenement sans nom est rejete (400) — jamais stocke vide", () => {
    expect(trackRouteSrc).toMatch(/if \(!event\) return NextResponse\.json\(\{ ok: false \}, \{ status: 400 \}\)/);
  });
});

// ------------------------------------------------------------------
// §6 — Idempotence des writers serveur
// ------------------------------------------------------------------
describe("P2 §6 — idempotence des writers serveur", () => {
  it("activated : index unique partiel cree + insertion ON CONFLICT DO NOTHING", () => {
    expect(analyticsDbSrc).toMatch(
      /CREATE UNIQUE INDEX IF NOT EXISTS idx_analytics_activated ON analytics_events\(user_id\) WHERE event = 'activated'/,
    );
    expect(analyticsDbSrc).toMatch(/ON CONFLICT DO NOTHING/);
  });

  it("purchase : insertion conditionnelle NOT EXISTS sur transaction_id (LIKE echappe '!')", () => {
    expect(analyticsDbSrc).toMatch(/WHERE NOT EXISTS \(/);
    expect(analyticsDbSrc).toMatch(/ESCAPE '!'/);
  });

  it("webhook : rejeu d'un meme eventId ignore (dedup webhook_events avant traitement)", () => {
    expect(webhookSrc).toMatch(/INSERT INTO webhook_events/);
    expect(webhookSrc).toMatch(/duplicate: true/);
  });

  it("purchase n'atteint jamais Business Metrics (frontiere couche A / couche C)", () => {
    expect(businessMetricsSrc).not.toContain("analytics_events");
    expect(conversionReportSrc).not.toContain("analytics_events");
  });
});

// ------------------------------------------------------------------
// §7 — Rétention et KPI jamais fabriqués
// ------------------------------------------------------------------
describe("P2 §7 — retention et KPI jamais fabriques", () => {
  it("retention D7 : etat non disponible explicite (null + statut), jamais un faux 0", () => {
    expect(growthRouteSrc).toMatch(/retention: null/);
    expect(growthRouteSrc).toContain('retentionStatus: "non_disponible:_retention_d7_historique_insuffisant"');
    expect(contractDoc).toContain("non_disponible:_retention_d7_historique_insuffisant");
  });

  it("aucune retention D1/D30 codée en dur dans src (elles exigeront des donnees suffisantes)", () => {
    const offenders = SRC.filter((f) => /retention_?d(?:1|30)|retentionD(?:1|30)/i.test(f.content));
    expect(offenders.map((f) => f.rel)).toEqual([]);
  });

  it("ARR n'est jamais calcule dans src (derivation MRR x 12 = rapport uniquement)", () => {
    const offenders = SRC.filter((f) => /\bARR\b/.test(f.content));
    expect(offenders.map((f) => f.rel)).toEqual([]);
  });

  it("ARPU vient exclusivement de la couche Business (subscriptions, hors test, jamais analytics)", () => {
    expect(revenueSrc).toMatch(/arpu/);
    expect(revenueSrc).toMatch(/testUsersWhere/);
    expect(revenueSrc).not.toContain("analytics_events");
  });

  it("les KPI sans source dediee (landing_views, unique_sessions, activation_rate) ne sont pas fabriques", () => {
    for (const kpi of ["landing_views", "unique_sessions", "activation_rate"]) {
      expect(growthRouteSrc).not.toContain(kpi);
      expect(conversionReportSrc).not.toContain(kpi);
    }
  });
});

// ------------------------------------------------------------------
// §8 — Contrat KPI : chaque KPI livré a une source
// ------------------------------------------------------------------
describe("P2 §8 — contrat KPI : sources codees dans le projet", () => {
  it("visitors ← page_view (normalisation E1 conservee)", () => {
    expect(growthRouteSrc).toMatch(/visitors: funnel\["page_view"\]/);
  });

  it("signups ← signup_completed (couche A, comptes test exclus au comptage)", () => {
    expect(growthRouteSrc).toMatch(/signups: funnel\["signup_completed"\]/);
    expect(analyticsDbSrc).toMatch(/testUsersWhere/);
  });

  it("activation ← activated (derive serveur) et checkout ← begin_checkout", () => {
    expect(growthRouteSrc).toMatch(/activation: funnel\["activated"\]/);
    expect(growthRouteSrc).toMatch(/checkoutStarted: funnel\["begin_checkout"\]/);
  });

  it("conversion payee ← purchase (evenement) + getConversionStats (couche C)", () => {
    expect(growthRouteSrc).toMatch(/purchase: funnel\["purchase"\]/);
    expect(conversionReportSrc).toMatch(/conversion_rate/);
    expect(conversionReportSrc).toMatch(/testUsersWhere/);
  });

  it("MRR ← getCanonicalMRR : SUM(price_cents) actif hors comptes test, sans analytics_events", () => {
    expect(businessMetricsSrc).toMatch(/SUM\(s\.price_cents\)/);
    expect(businessMetricsSrc).toMatch(/status = 'active'/);
    expect(businessMetricsSrc).toMatch(/testUsersWhere/);
    expect(businessMetricsSrc).not.toContain("analytics_events");
  });

  it("revenu ← getBusinessRevenue (couche C) relue par le tableau admin analytics", () => {
    expect(adminAnalyticsSrc).toMatch(/getBusinessRevenue/);
    expect(businessMetricsSrc).toMatch(/getBusinessRevenue/);
  });
});

// ------------------------------------------------------------------
// §9 — Tables growth, dettes G1/G2
// ------------------------------------------------------------------
describe("P2 §9 — tables growth : etat reel + dettes G1/G2 verrouillees", () => {
  it("le store declare exactement les 4 tables growth (strategies, contents, metrics, recommendations)", () => {
    const tables = [...storeSrc.matchAll(/CREATE TABLE IF NOT EXISTS (\w+)/g)].map((m) => m[1]);
    expect(tables.sort()).toEqual([
      "growth_contents",
      "growth_metrics",
      "growth_recommendations",
      "growth_strategies",
    ]);
  });

  it("growth_metrics est fonctionnelle : ecriture + lecture d'une date figee", async () => {
    const DATE = "1999-03-03"; // jamais « latest » pour getLatestMetrics()
    const store = await getStore();
    await run("DELETE FROM growth_metrics WHERE date = ?", DATE).catch(() => {});
    await store.saveMetrics({
      date: DATE,
      signups: 7,
      activeUsers: 1,
      premiumConversions: 0,
      referralCount: 0,
      quizCompletions: 0,
      koraInteractions: 0,
      pageViews: 42,
      utm: {},
    });
    const row = await queryOne<{ page_views: number }>(
      "SELECT page_views FROM growth_metrics WHERE date = ?",
      DATE,
    );
    expect(Number(row?.page_views)).toBe(42);
    await run("DELETE FROM growth_metrics WHERE date = ?", DATE).catch(() => {});
  });

  it("G1 — lecture growth_strategies : soit la table repond, soit son absence = dette G1 connue", async () => {
    // Caractérisation : le DDL hybride (syntaxe PG + catch silencieux) peut
    // avoir échoué en dev SQLite. Une ERREUR AUTRE que « table absente »
    // signalerait une régression neuve et doit échouer ici.
    const store = await getStore();
    try {
      const row = await store.getStrategy("1999-01-01");
      expect(row).toBeNull();
    } catch (e) {
      expect(String(e instanceof Error ? e.message : e)).toMatch(/no such table|does not exist/i);
    }
  });

  it("G1 — signature de la dette toujours presente dans store.ts (corriger = mettre a jour P2 + ce test)", () => {
    expect(storeSrc).toMatch(/if \(_init\) return;\s*_init = true;/);
    expect((storeSrc.match(/\.catch\(\(\) => \{\}\)/g) ?? []).length).toBeGreaterThanOrEqual(4);
    // le flag est posé AVANT les CREATE : un échec silencieux n'est jamais retenté
    expect(storeSrc.indexOf("_init = true;")).toBeLessThan(
      storeSrc.indexOf("CREATE TABLE IF NOT EXISTS growth_strategies"),
    );
    // P2.12.1 B3 — le DDL des tables growth utilise désormais `DEFAULT
    // (datetime('now'))`, portable SQLite/PG (run() traduit datetime('now') →
    // now()/to_char côté PG). L'ancienne signature `DEFAULT now()` (syntaxe PG
    // seule, causait l'erreur 42804 sur PG pour une colonne TEXT) a disparu :
    // il ne doit plus y avoir AUCUNE occurrence résiduelle.
    expect((storeSrc.match(/DEFAULT now\(\)/g) ?? []).length).toBe(0);
    expect((storeSrc.match(/DEFAULT \(datetime\('now'\)\)/g) ?? []).length).toBeGreaterThanOrEqual(3);
  });

  it("G2 — aucune lecture SQL de referrals/courses, jamais creees dans le schema", () => {
    const offenders = SRC.filter((f) =>
      /\b(?:FROM|JOIN|INTO|UPDATE)\s+(?:referrals|courses)\b/i.test(f.content),
    );
    expect(offenders.map((f) => f.rel)).toEqual([]);
    expect(dbSrc).not.toMatch(/CREATE TABLE (?:IF NOT EXISTS )?(?:referrals|courses)\b/i);
  });

  it("les noms growth_cohorts / growth_funnel / growth_attribution n'existent nulle part (noms supposes)", () => {
    const all = SRC.map((f) => f.content).join("\n");
    expect(all).not.toMatch(/growth_cohorts|growth_funnel|growth_attribution/);
  });
});

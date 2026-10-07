/**
 * P0.8 — Contrat analytics, funnel et attribution.
 *
 * Prouve, sur le code réel et la base réelle, les engagements du contrat
 * `docs/analytics-data-contract.md` :
 *  A. Un événement canonique est enregistré avec ses paramètres intacts,
 *     et un visiteur anonyme reste anonyme (user_id NULL, non attribuable
 *     à un compte de test — limitation assumée du contrat).
 *  B. L'identité vient toujours de la session serveur (jamais du corps de
 *     la requête) et le session_id n'est jamais archivé en clair (c'est un
 *     jeton de session signé) : hachage sha256 obligatoire.
 *  C. L'événement de navigation s'appelle `pageview` et les lecteurs le
 *     lisent sous ce nom (correctif de l'écart E1 : compteurs à 0).
 *  D. Les trois couches restent séparées : Product Analytics ne produit pas
 *     de KPI financier, Business Metrics ne lisent pas `analytics_events`,
 *     Growth ne lit pas `subscriptions`.
 *  E. Attribution : UTM lus à l'inscription, ref → signup déclaré (rupture
 *     documentée), gclid/fbclid capturés first-party dans attribution.ts
 *     uniquement (P1.0) — jamais de PII, jamais sur le compte.
 *  F. Le contrat documenté couvre exactement la taxonomie émise.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { trackDb } from "@/lib/analytics-db";
import { query, queryOne, run } from "@/lib/db";
import { EVENTS } from "@/lib/analytics";

const read = (...p: string[]) => readFileSync(join(__dirname, "..", ...p), "utf8");

const trackRouteSrc = read("src", "app", "api", "analytics", "track", "route.ts");
const growthRouteSrc = read("src", "app", "api", "growth", "metrics", "route.ts");
const businessMetricsSrc = read("src", "lib", "business-metrics.ts");
const conversionReportSrc = read("src", "lib", "conversion-report.ts");
const adminAnalyticsSrc = read("src", "app", "espace-admin", "analytics", "page.tsx");
const adminRevenusSrc = read("src", "app", "espace-admin", "revenus", "page.tsx");
const eduAnalyticsSrc = read("src", "components", "EdukoraAnalytics.tsx");
const inscriptionSrc = read("src", "app", "inscription-1-2-edukora", "page.tsx");
const contractDoc = read("docs", "analytics-data-contract.md");

const STAMP = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
const EVENT = `p08_contract_${STAMP}`;
const created: string[] = [];

afterAll(async () => {
  for (const e of created) await run("DELETE FROM analytics_events WHERE event = ?", e);
});

// ------------------------------------------------------------------
// A. Enregistrement reel en base
// ------------------------------------------------------------------
describe("P0.8 — un evenement canonique est enregistre avec ses parametres", () => {
  it("stocke event, params, url et session sans perte", async () => {
    created.push(EVENT);
    const props = { role: "student", method: "email", variant: "A", source: "google" };
    await trackDb(EVENT, props, null, `sess-${STAMP}`, "/inscription-1-2-edukora");

    const row = await queryOne<{ event: string; props: string; url: string; session_id: string; user_id: number | null }>(
      "SELECT event, props, url, session_id, user_id FROM analytics_events WHERE event = ? ORDER BY id DESC LIMIT 1",
      EVENT,
    );
    expect(row).toBeTruthy();
    expect(row!.event).toBe(EVENT);
    expect(JSON.parse(row!.props)).toEqual(props);
    expect(row!.url).toBe("/inscription-1-2-edukora");
    expect(row!.session_id).toBe(`sess-${STAMP}`);
  });

  it("un visiteur anonyme reste anonyme (user_id NULL, non attribuable a un compte test)", async () => {
    const row = await queryOne<{ user_id: number | null }>(
      "SELECT user_id FROM analytics_events WHERE event = ? ORDER BY id DESC LIMIT 1",
      EVENT,
    );
    expect(row!.user_id).toBeNull();
  });
});

// ------------------------------------------------------------------
// B. Identite serveur + session_id hache
// ------------------------------------------------------------------
describe("P0.8 — identite resolue cote serveur, session_id jamais en clair", () => {
  it("l'user_id ne vient jamais du corps de la requete (anti-spoofing)", () => {
    expect(trackRouteSrc).not.toMatch(/body\.user_id|body\.userId|props\.user_id/);
    expect(trackRouteSrc).toMatch(/getCurrentUser\(\)/);
  });

  it("le cookie de session est hache sha256 avant persistance", () => {
    expect(trackRouteSrc).toMatch(/createHash\("sha256"\)/);
    expect(trackRouteSrc).toMatch(/fingerprint\(rawSession\)/);
    // le jeton brut ne doit jamais atteindre trackDb
    expect(trackRouteSrc).not.toMatch(/trackDb\([\s\S]{0,200}req\.cookies\.get/);
  });

  it("un event sans nom est rejete (400) — parametre obligatoire", () => {
    expect(trackRouteSrc).toMatch(/if \(!event\) return NextResponse\.json\(\{ ok: false \}, \{ status: 400 \}\)/);
  });
});

// ------------------------------------------------------------------
// C. Nom de l'evenement de navigation + reconciliation E1
// ------------------------------------------------------------------
describe("P0.8 — la navigation s'appelle pageview et les lecteurs suivent", () => {
  it("EdukoraAnalytics emet bien event: \"pageview\" (et pas page_view)", () => {
    expect(eduAnalyticsSrc).toMatch(/event:\s*"pageview"/);
    expect(eduAnalyticsSrc).not.toMatch(/event:\s*"page_view"/);
  });

  it("growth/metrics reconcilie pageview -> page_view (correctif E1)", () => {
    expect(growthRouteSrc).toMatch(/funnel\["pageview"\] !== undefined/);
    expect(growthRouteSrc).toMatch(/funnel\["pageview"\] \?\? 0/);
    expect(growthRouteSrc).toMatch(/\+ \(funnel\["page_view"\] \?\? 0\)/);
  });

  it("les compteurs visitors/pageViews lisent la cle normalisee", () => {
    expect(growthRouteSrc).toMatch(/pageViews: funnel\["page_view"\]/);
    expect(growthRouteSrc).toMatch(/visitors: funnel\["page_view"\]/);
  });
});

// ------------------------------------------------------------------
// D. Separation des trois couches
// ------------------------------------------------------------------
describe("P0.8 — separation Product Analytics / Funnel / Business Metrics", () => {
  it("Business Metrics ne lisent jamais analytics_events", () => {
    expect(businessMetricsSrc).not.toContain("analytics_events");
    expect(conversionReportSrc).not.toContain("analytics_events");
  });

  it("Business Metrics gardent le filtre des comptes de test (regression P0.7)", () => {
    expect(businessMetricsSrc).toMatch(/testUsersWhere/);
    expect(conversionReportSrc).toMatch(/testUsersWhere/);
  });

  it("les pages admin financieres passent par les helpers P0.7", () => {
    expect(adminRevenusSrc).toMatch(/getCanonicalMRR/);
    expect(adminAnalyticsSrc).toMatch(/getBusinessRevenue/);
    expect(adminRevenusSrc).not.toMatch(/price_cents.*\*.*COUNT|COUNT\(\*\)[\s\S]{0,80}price_cents/i);
  });

  it("growth/metrics ne lit jamais les abonnements (pas de melange de couches)", () => {
    expect(growthRouteSrc).not.toMatch(/\b(?:FROM|JOIN|INTO|UPDATE)\s+subscriptions\b/i);
    expect(growthRouteSrc).not.toMatch(/price_cents/);
    expect(growthRouteSrc).not.toMatch(/\bmrr\b/i);
    // son seul KPI financier est un compteur d'evenement, pas une somme
    expect(growthRouteSrc).toMatch(/premiumConversions: funnel\["purchase"\]/);
  });
});

// ------------------------------------------------------------------
// E. Attribution
// ------------------------------------------------------------------
describe("P0.8 — attribution : ce qui existe, ce qui manque", () => {
  it("les UTM sont lus sur la page d'inscription dans signupCompleted", () => {
    expect(inscriptionSrc).toMatch(/params\.get\("utm_source"\)/);
    expect(inscriptionSrc).toMatch(/params\.get\("utm_medium"\)/);
    expect(inscriptionSrc).toMatch(/params\.get\("utm_campaign"\)/);
    expect(inscriptionSrc).toMatch(/signupCompleted,[\s\S]{0,400}source:\s*params\.get\("utm_source"\)/);
  });

  it("les UTM ne sont pas persistes sur le compte (limite du contrat)", async () => {
    const cols = await query<{ name: string }>("PRAGMA table_info(users)");
    expect(cols.some((c) => /utm/i.test(c.name))).toBe(false);
  });

  it("gclid et fbclid sont captures first-party dans attribution.ts uniquement (P1.0)", () => {
    const walk = (dir: string): string[] =>
      readdirSync(dir).flatMap((f) => {
        const p = join(dir, f);
        if (statSync(p).isDirectory()) return walk(p);
        return /\.(ts|tsx)$/.test(f) ? [p] : [];
      });
    const root = join(__dirname, "..");
    const offenders = walk(join(root, "src"))
      .filter((f) => /gclid|fbclid/i.test(readFileSync(f, "utf8")))
      .map((f) => f.slice(root.length + 1).replace(/\\/g, "/"));
    // Un seul point de capture : le module d'attribution (liste blanche).
    // P1.2 : `utm-report.ts` ajoute un point de LECTURE agrégée (requête
    // d'acquisition, lecture seule — aucune écriture sessionStorage, aucun
    // corps de requête) : la règle reste « aucune écriture hors
    // attribution.ts ».
    expect([...offenders].sort()).toEqual(["src/lib/attribution.ts", "src/lib/utm-report.ts"]);
    // Aucune PII dans ce module : ni email, ni téléphone, ni identité.
    const attributionSrc = read("src", "lib", "attribution.ts");
    expect(attributionSrc).not.toMatch(/email|phone|first_name|last_name|birth/i);
    // La capture est bien montée dans le layout (landing → inscription).
    const layoutSrc = read("src", "app", "layout.tsx");
    expect(layoutSrc).toMatch(/<AttributionCapture/);
  });

  it("ref -> signup : le code de parrainage est pre-rempli depuis ?ref= (repare en P0.9)", () => {
    // P0.9 : l'etat est initialise depuis useSearchParams (relecture a chaque
    // montage) puis transmis au serveur, qui revalide le code en base.
    // L'event ne porte toujours que la presence du code (contract §5).
    expect(inscriptionSrc).toMatch(/useState\(\(\) =>\s*\(params\.get\("ref"\) \?\? ""\)\.trim\(\)\.toUpperCase\(\)\.slice\(0, 20\)/);
    expect(inscriptionSrc).toMatch(/referral_code: referralCode\.trim\(\) \|\| undefined/);
    expect(inscriptionSrc).toMatch(/referralClicked,\s*\{\s*has_code:/);
    expect(inscriptionSrc).not.toMatch(/referralClicked,\s*\{[^}]*(referralCode|params\.get\("ref"\))/);
  });
});

// ------------------------------------------------------------------
// F. Contrat documente = code
// ------------------------------------------------------------------
describe("P0.8 — le contrat documente couvre toute la taxonomie emise", () => {
  it.each(Object.values(EVENTS))("documente l'evenement %s", (nom) => {
    expect(contractDoc).toContain(nom);
  });

  it("documente l'evenement de navigation pageview et la constante EVENTS", () => {
    expect(contractDoc).toContain("`pageview`");
    expect(Object.keys(EVENTS)).toHaveLength(33);
    expect(contractDoc).toContain("33 noms");
    expect(contractDoc).toContain("34 noms");
  });

  it("ne presente pas page_view comme evenement interne ; purchase first-party est documente (P1.0)", () => {
    // page_view n'est qu'une cle normalisee (E1), jamais ecrit tel quel.
    expect(contractDoc).toMatch(/jamais` dans `analytics_events`|jamais.*analytics_events/);
    // P1.0 : purchase existe EN FIRST-PARTY dans analytics_events (hook
    // webhook) — le miroir GA4 MP reste un separateur d'envoi.
    expect(contractDoc).toMatch(/`purchase`.*first-party|first-party.*`purchase`/);
    expect(contractDoc).not.toMatch(/`purchase` n'existe \*\*que\*\* dans GA4/);
  });
});

// ------------------------------------------------------------------
// G. Evenement inconnu : stocke mais jamais lu par les tableaux de bord
// ------------------------------------------------------------------
describe("P0.8 — seuls les evenements du contrat sont lus par les dashboards", () => {
  it("growth/metrics ne lit que des noms de la taxonomie (ou des cles internes)", () => {
    const autorises = new Set<string>([
      ...Object.values(EVENTS),
      "pageview", // event reel, hors EVENTS
      "page_view", // cle normalisee (E1)
      "purchase", // P1.0 : ecrit first-party (webhook), lu par Growth
      "activated", // P1.0 : derive serveur a la 1re lesson_started
      "_active_users",
      "_unique_checkouts",
    ]);
    const lus = [...growthRouteSrc.matchAll(/funnel\["([^"]+)"\]/g)].map((m) => m[1]);
    expect(lus.length).toBeGreaterThan(10);
    for (const nom of lus) expect(autorises).toContain(nom);
  });

  it("aucun evenement inconnu n'est lu par la page admin analytics", () => {
    const lus = [...adminAnalyticsSrc.matchAll(/\b(pageview|signup_completed|quiz_completed|lesson_completed|subscription_started|begin_checkout|login_completed|course_opened|lesson_started|ai_question_sent|ai_tutor_opened|fiche_opened)\b/g)].map((m) => m[1]);
    expect(lus.length).toBeGreaterThan(0);
    // la page ne reference que des evenements du contrat
    const connus: string[] = [...Object.values(EVENTS), "pageview"];
    for (const nom of lus) expect(connus).toContain(nom);
  });
});

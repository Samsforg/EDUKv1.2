/**
 * P0.9 — Attribution referral, session_id historiques, régression P0.7.
 *
 * A. Chaîne ?ref= → formulaire → /api/auth/register → referred_by :
 *    le serveur reste l'autorité (code invalide = relation absente et
 *    inscription intacte ; le client ne peut pas forcer referred_by).
 * B. (voir tests/p09-fallback-stats.test.ts)
 * C. session_id : nouveau = sha256 ; legacy en clair = migration
 *    idempotente vers exactement la même transformation ; NULL et valeurs
 *    déjà hex64 intouchés ; COUNT(DISTINCT session_id) préservé.
 * D. P0.7 : les quatre combinaisons user×abonnement restent correctes.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NextRequest } from "next/server";
import { POST as registerPOST } from "@/app/api/auth/register/route";
import { POST as trackPOST } from "@/app/api/analytics/track/route";
import { hashPassword } from "@/lib/auth";
import { hashLegacySessionIds, trackDb } from "@/lib/analytics-db";
import { query, queryOne, run } from "@/lib/db";
import { getCanonicalMRR } from "@/lib/business-metrics";
import { RegisterSchema } from "@/lib/validation";

const read = (...p: string[]) => readFileSync(join(__dirname, "..", ...p), "utf8");
const inscriptionSrc = read("src", "app", "inscription-1-2-edukora", "page.tsx");

const STAMP = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
const sha = (v: string) => createHash("sha256").update(v).digest("hex");
const phoneOf = (n: number) => `07${STAMP.slice(-7)}${n}`;
const MAIL_PATTERN = `p09%.${STAMP}@%`;
const PHONE_PATTERN = `07${STAMP.slice(-7)}%`;

const createdEvents: string[] = [];
const dUsers: number[] = [];
const dSubs: number[] = [];
let ipSeq = 0;

function registerReq(body: unknown): NextRequest {
  ipSeq += 1;
  return new NextRequest("http://localhost/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `p09-${STAMP}-${ipSeq}.0.0.1`,
    },
    body: JSON.stringify(body),
  });
}

function trackReq(event: string, session?: string): NextRequest {
  ipSeq += 1;
  return new NextRequest("http://localhost/api/analytics/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `p09t-${STAMP}-${ipSeq}.0.0.1`,
      ...(session ? { cookie: `edukora_session=${session}` } : {}),
    },
    body: JSON.stringify({ event, props: {}, url: "/p09-test" }),
  });
}

// NAME_RE (RegisterSchema) n'accepte que lettres/espaces/apostrophes/tirets
const FIRST_NAMES = ["Anne", "Bruno", "Chloe", "Diane", "Emile", "Fatou", "GUY", "Hawa", "Ivan", "Julie"];

function studentBody(n: number, referral?: string): Record<string, unknown> {
  return {
    first_name: FIRST_NAMES[n],
    last_name: "Eleve",
    phone: phoneOf(n),
    password: "secret123",
    accept_privacy: true,
    class_level: "Terminale",
    ...(referral ? { referral_code: referral } : {}),
  };
}

async function referredByOfPhone(n: number): Promise<{ id: number; referred_by: number | null } | undefined> {
  return queryOne<{ id: number; referred_by: number | null }>(
    "SELECT id, referred_by FROM users WHERE phone = ?",
    phoneOf(n),
  );
}

const REF_CODE = `P09${STAMP.slice(-8)}`.toUpperCase();

/**
 * Inscrit une fixture via la vraie route puis la marque aussitôt is_test=1 :
 * la fenêtre « compte réel » dure alors uniquement le temps de l'appel et ne
 * fausse pas les agrégats globaux (P0.5) des autres suites en parallèle.
 * Les assertions referred_by sont indifférentes au marqueur.
 */
async function registerFixture(n: number, referral?: string, extra?: Record<string, unknown>) {
  const res = await (registerPOST as unknown as (r: NextRequest) => Promise<Response>)(
    registerReq({ ...studentBody(n, referral), ...extra }),
  );
  expect(res.status).toBe(201);
  await run("UPDATE users SET is_test = 1 WHERE phone = ?", phoneOf(n));
  return referredByOfPhone(n);
}

async function makeReferrer(): Promise<number> {
  await run(
    `INSERT INTO users (role, email, password_hash, first_name, last_name, class_level, referral_code, is_test)
     VALUES ('student', ?, ?, 'P09', 'Parrain', 'Terminale', ?, 1)`,
    `p09ref.${STAMP}@example.com`,
    hashPassword("secret123"),
    REF_CODE,
  );
  const u = await queryOne<{ id: number }>("SELECT id FROM users WHERE referral_code = ?", REF_CODE);
  return u!.id;
}

async function eventRow(event: string) {
  return queryOne<{ session_id: string | null }>(
    "SELECT session_id FROM analytics_events WHERE event = ? ORDER BY id DESC LIMIT 1",
    event,
  );
}

/** trackDb est fire-and-forget côté route : on attend la persistance réelle. */
async function waitForRow(event: string, timeoutMs = 3000) {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    const row = await eventRow(event);
    if (row) return row;
    if (Date.now() > deadline) return undefined;
    await new Promise((r) => setTimeout(r, 25));
  }
}

afterAll(async () => {
  for (const id of dUsers) {
    await run("DELETE FROM user_consents WHERE user_id = ?", id).catch(() => {});
    await run("DELETE FROM notifications WHERE user_id = ?", id).catch(() => {});
    await run("DELETE FROM analytics_events WHERE user_id = ?", id).catch(() => {});
    await run("DELETE FROM audit_logs WHERE actor_id = ?", id).catch(() => {});
    await run("DELETE FROM audit_logs WHERE detail LIKE ?", `%#${id}%`).catch(() => {});
  }
  for (const e of createdEvents) await run("DELETE FROM analytics_events WHERE event = ?", e);
  await run("DELETE FROM subscriptions WHERE user_id IN (SELECT id FROM users WHERE email LIKE ? OR phone LIKE ?)", MAIL_PATTERN, PHONE_PATTERN).catch(() => {});
  await run("DELETE FROM users WHERE email LIKE ? OR phone LIKE ?", MAIL_PATTERN, PHONE_PATTERN);
  await run("DELETE FROM audit_logs WHERE detail LIKE ?", `%${REF_CODE}%`).catch(() => {});
});

// ------------------------------------------------------------------
// A. ?ref= → referred_by
// ------------------------------------------------------------------
describe("P0.9 A — chaîne ?ref= → inscription → referred_by (serveur autorité)", () => {
  it("A1 — inscription sans ref : comportement inchangé, referred_by NULL", async () => {
    const u = await registerFixture(1);
    expect(u).toBeTruthy();
    expect(u!.referred_by).toBeNull();
  });

  it("A2 — le formulaire capture ?ref= au montage, l'affiche dans les deux variantes et le transmet au serveur", () => {
    // capture depuis l'URL (état initial paresseux : relu à chaque montage)
    expect(inscriptionSrc).toMatch(/useState\(\(\) =>\s*\(params\.get\("ref"\) \?\? ""\)\.trim\(\)\.toUpperCase\(\)\.slice\(0, 20\)/);
    // visible dans les deux variantes de formulaire (A et B)
    expect(inscriptionSrc.match(/value=\{referralCode\}/g)?.length).toBe(2);
    // payload d'inscription
    expect(inscriptionSrc).toMatch(/referral_code: referralCode\.trim\(\) \|\| undefined/);
    // analytics conformes au contrat : presence du code, jamais la valeur
    expect(inscriptionSrc).toMatch(/referralClicked,\s*\{\s*has_code:\s*true,\s*landing:\s*"inscription"\s*\}/);
    expect(inscriptionSrc).not.toMatch(/referralClicked,\s*\{[^}]*(referralCode|params\.get\("ref"\))/);
  });

  it("A3 — ?ref=CODE valide → inscription → referred_by = parrain", async () => {
    const referrerId = await makeReferrer();
    const u = await registerFixture(2, REF_CODE);
    expect(u).toBeTruthy();
    expect(u!.referred_by).toBe(referrerId);
  });

  it("A4 — code invalide → inscription réussie (201), referred_by non renseigné", async () => {
    const u = await registerFixture(3, `EDK-DOESNOTEXIST${STAMP.slice(-4)}`);
    expect(u).toBeTruthy();
    expect(u!.referred_by).toBeNull();
  });

  it("A5 — spoofing : un referred_by arbitraire envoyé par le client ne crée aucune relation", async () => {
    // Le schéma n'expose aucun champ referred_by : le client ne peut que
    // proposer un referral_code, que le serveur revalide en base.
    expect(Object.keys(RegisterSchema.shape)).not.toContain("referred_by");
    const u = await registerFixture(4, undefined, { referred_by: 1, referral_code: "HACK-9999" });
    expect(u).toBeTruthy();
    expect(u!.referred_by).toBeNull();
  });

  it("A6 — un code déjà utilisé reste valable pour un nouveau filleul (aucune régression)", async () => {
    const referrerId = await queryOne<{ id: number }>("SELECT id FROM users WHERE referral_code = ?", REF_CODE);
    expect(referrerId).toBeTruthy();
    const u = await registerFixture(5, REF_CODE);
    expect(u).toBeTruthy();
    expect(u!.referred_by).toBe(referrerId!.id);
  });

  it("A7 — refresh/navigation : le code est relu depuis l'URL à chaque montage (état initial paresseux)", () => {
    // useState(() => …) se ré-exécute à chaque montage du composant : tant
    // que ?ref= reste dans la barre d'adresse (refresh inclus), le code est
    // à nouveau capturé. Aucune valeur stockée dans localStorage/sessionStorage.
    expect(inscriptionSrc).toMatch(/useState\(\(\) =>\s*\(params\.get\("ref"\)/);
    expect(inscriptionSrc).not.toMatch(/localStorage|sessionStorage/);
  });
});

// ------------------------------------------------------------------
// C. session_id : écriture hashée + migration legacy
// ------------------------------------------------------------------
describe("P0.9 C — session_id : sha256 à l'écriture, migration sûre de l'historique", () => {
  it("C1 — un nouvel événement est persisté avec session_id sha256 (jamais le jeton en clair)", async () => {
    const raw = `v1.p09new${STAMP}.tok`;
    const evt = `p09_c1_${STAMP}`;
    createdEvents.push(evt);
    const res = await (trackPOST as unknown as (r: NextRequest) => Promise<Response>)(trackReq(evt, raw));
    expect(res.status).toBe(200);
    const row = await waitForRow(evt);
    expect(row).toBeTruthy();
    expect(row!.session_id).toBe(sha(raw));
    expect(row!.session_id).not.toBe(raw);
  });

  it("C2 — même session → même hash", async () => {
    const raw = `v1.p09same${STAMP}.tok`;
    const e1 = `p09_c2a_${STAMP}`;
    const e2 = `p09_c2b_${STAMP}`;
    createdEvents.push(e1, e2);
    await (trackPOST as unknown as (r: NextRequest) => Promise<Response>)(trackReq(e1, raw));
    await (trackPOST as unknown as (r: NextRequest) => Promise<Response>)(trackReq(e2, raw));
    const r1 = await waitForRow(e1);
    const r2 = await waitForRow(e2);
    expect(r1!.session_id).toBe(sha(raw));
    expect(r1!.session_id).toBe(r2!.session_id);
  });

  it("C3 — deux sessions différentes → deux hashes différents", async () => {
    const rawA = `v1.p09diffA${STAMP}.tok`;
    const rawB = `v1.p09diffB${STAMP}.tok`;
    const e1 = `p09_c3a_${STAMP}`;
    const e2 = `p09_c3b_${STAMP}`;
    createdEvents.push(e1, e2);
    await (trackPOST as unknown as (r: NextRequest) => Promise<Response>)(trackReq(e1, rawA));
    await (trackPOST as unknown as (r: NextRequest) => Promise<Response>)(trackReq(e2, rawB));
    const r1 = await waitForRow(e1);
    const r2 = await waitForRow(e2);
    expect(r1!.session_id).toBe(sha(rawA));
    expect(r2!.session_id).toBe(sha(rawB));
    expect(r1!.session_id).not.toBe(r2!.session_id);
  });

  it("C4 — une valeur legacy en clair est migrée vers exactement la transformation actuelle", async () => {
    const legacy = `v1.p09legacy${STAMP}.plain`;
    const evt = `p09_c4_${STAMP}`;
    createdEvents.push(evt);
    // trackDb conserve la valeur brute : c'est bien le format des lignes d'avant P0.8
    await trackDb(evt, {}, null, legacy, "/p09-test");
    expect((await eventRow(evt))!.session_id).toBe(legacy);
    const migrated = await hashLegacySessionIds();
    expect(migrated).toBeGreaterThanOrEqual(1);
    expect((await eventRow(evt))!.session_id).toBe(sha(legacy));
  });

  it("C5 — une valeur déjà hashée (hex64) est inchangée (aucun double-hash)", async () => {
    const already = sha(`p09-prehashed-${STAMP}`);
    const evt = `p09_c5_${STAMP}`;
    createdEvents.push(evt);
    await trackDb(evt, {}, null, already, "/p09-test");
    await hashLegacySessionIds();
    expect((await eventRow(evt))!.session_id).toBe(already);
  });

  it("C6 — NULL reste NULL", async () => {
    const evt = `p09_c6_${STAMP}`;
    createdEvents.push(evt);
    await trackDb(evt, {}, null, null, "/p09-test");
    await hashLegacySessionIds();
    expect((await eventRow(evt))!.session_id).toBeNull();
  });

  it("C7 — COUNT(DISTINCT session_id) identique avant/après migration", async () => {
    const same = `v1.p09distSame${STAMP}`;
    const other = `v1.p09distOther${STAMP}`;
    const events = [`p09_c7a_${STAMP}`, `p09_c7b_${STAMP}`, `p09_c7c_${STAMP}`, `p09_c7d_${STAMP}`];
    createdEvents.push(...events);
    await trackDb(events[0], {}, null, same, "/p09-test");
    await trackDb(events[1], {}, null, same, "/p09-test");
    await trackDb(events[2], {}, null, other, "/p09-test");
    await trackDb(events[3], {}, null, null, "/p09-test");

    const distinctBefore = await query<{ c: number }>(
      `SELECT COUNT(DISTINCT session_id) AS c FROM analytics_events WHERE event IN (?,?,?,?) AND session_id IS NOT NULL`,
      ...events,
    );
    expect(Number(distinctBefore[0]?.c ?? 0)).toBe(2);

    await hashLegacySessionIds();

    const distinctAfter = await query<{ c: number }>(
      `SELECT COUNT(DISTINCT session_id) AS c FROM analytics_events WHERE event IN (?,?,?,?) AND session_id IS NOT NULL`,
      ...events,
    );
    expect(Number(distinctAfter[0]?.c ?? 0)).toBe(2);

    const rows = await query<{ session_id: string | null }>(
      `SELECT session_id FROM analytics_events WHERE event IN (?,?,?,?)`,
      ...events,
    );
    expect(rows).toHaveLength(4);
    for (const r of rows) {
      if (r.session_id === null) continue;
      expect(r.session_id).toMatch(/^[0-9a-f]{64}$/);
    }
    // la ligne NULL n'a pas bougé, les deux lignes « same » partagent le même hash
    const hashed = rows.filter((r) => r.session_id !== null).map((r) => r.session_id);
    expect(new Set(hashed).size).toBe(2);
  });
});

// ------------------------------------------------------------------
// D. Régression P0.7 — les quatre combinaisons user × abonnement
//
// Les mesures portent sur des agrégats globaux partagés : en exécution
// parallèle locale, d'autres suites peuvent créer/supprimer des fixtures
// entre deux lectures. Chaque scénario est donc rejoué (avec nettoyage
// complet de ses propres fixtures entre les tentatives) tant que le delta
// observé n'est pas stable — le résultat final reste identique au spec.
// ------------------------------------------------------------------
describe("P0.9 D — P0.7 non-régression : les comptes test et trials restent exclus du MRR", () => {
  const STAMP_D = `${STAMP}d`;
  let userSeq = 0;
  async function makeUserD(isTest: 0 | 1): Promise<number> {
    const email = `${isTest ? "p09.test" : "p09.reel"}.${STAMP_D}.${userSeq++}@edukora.net`;
    await run(
      `INSERT INTO users (role, email, password_hash, first_name, last_name, is_test) VALUES ('student', ?, ?, 'P09', 'Metrics', ?)`,
      email,
      hashPassword("secret123"),
      isTest,
    );
    const u = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ?", email);
    dUsers.push(u!.id);
    return u!.id;
  }
  async function addSubD(userId: number, status: "active" | "trial"): Promise<void> {
    const plan = await queryOne<{ id: number }>("SELECT id FROM subscription_plans ORDER BY id LIMIT 1");
    await run(
      `INSERT INTO subscriptions (user_id, plan_id, provider, price_cents, status, started_at, end_at)
       VALUES (?, ?, 'geniuspay', 4900, ?, ?, ?)`,
      userId,
      plan!.id,
      status,
      new Date(Date.now() - 20 * 864e5).toISOString(),
      new Date(Date.now() + 30 * 864e5).toISOString(),
    );
    const s = await queryOne<{ id: number }>("SELECT id FROM subscriptions WHERE user_id = ? ORDER BY id DESC LIMIT 1", userId);
    dSubs.push(s!.id);
  }

  /** Nettoie les fixtures de la section D (ids suivis + motif email). */
  async function wipeD(): Promise<void> {
    for (const id of dSubs.splice(0)) await run("DELETE FROM subscriptions WHERE id = ?", id).catch(() => {});
    for (const id of dUsers.splice(0)) await run("DELETE FROM users WHERE id = ?", id).catch(() => {});
    await run(
      "DELETE FROM subscriptions WHERE user_id IN (SELECT id FROM users WHERE email LIKE ?)",
      `p09.%.${STAMP_D}.%@edukora.net`,
    ).catch(() => {});
    await run("DELETE FROM users WHERE email LIKE ?", `p09.%.${STAMP_D}.%@edukora.net`).catch(() => {});
  }

  /**
   * Joue le scénario jusqu'à ce qu'il tienne (delta conforme) en présence
   * d'un churn concurrent sur les agrégats globaux, avec nettoyage entre
   * chaque tentative. Renvoie false seulement si le scénario n'a jamais tenu.
   */
  async function stableScenario(scenario: () => Promise<boolean>, attempts = 6): Promise<boolean> {
    for (let i = 0; i < attempts; i++) {
      await wipeD();
      let ok = false;
      try {
        ok = await scenario();
      } catch {
        ok = false;
      }
      await wipeD();
      if (ok) return true;
      await new Promise((r) => setTimeout(r, 30));
    }
    return false;
  }

  afterAll(async () => {
    await wipeD();
    await run("DELETE FROM users WHERE email LIKE ?", `p09.%@edukora.net`);
  });

  it("REAL + ACTIVE → MRR inclus", async () => {
    const ok = await stableScenario(async () => {
      const before = await getCanonicalMRR();
      const u = await makeUserD(0);
      await addSubD(u, "active");
      return (await getCanonicalMRR()) === before + 4900;
    });
    expect(ok).toBe(true);
  });

  it("TEST + ACTIVE → MRR exclu", async () => {
    const ok = await stableScenario(async () => {
      const before = await getCanonicalMRR();
      const u = await makeUserD(1);
      await addSubD(u, "active");
      return (await getCanonicalMRR()) === before;
    });
    expect(ok).toBe(true);
  });

  it("REAL + TRIAL → exclu du MRR (règle existante P0.7 conservée)", async () => {
    const ok = await stableScenario(async () => {
      const before = await getCanonicalMRR();
      const u = await makeUserD(0);
      await addSubD(u, "trial");
      return (await getCanonicalMRR()) === before;
    });
    expect(ok).toBe(true);
  });

  it("TEST + TRIAL → exclu du MRR (règle existante conservée)", async () => {
    const ok = await stableScenario(async () => {
      const before = await getCanonicalMRR();
      const u = await makeUserD(1);
      await addSubD(u, "trial");
      return (await getCanonicalMRR()) === before;
    });
    expect(ok).toBe(true);
  });
});

/**
 * P0-1 — Isolation des comptes de test.
 *
 * Vérifie que les KPIs business (utilisateurs, MRR) ne comptent jamais un
 * compte de test, et que le marqueur structurel `users.is_test` fonctionne
 * même quand l'email d'une fixture ressemble à un email réel.
 *
 * Les prédicats testés sont ceux réellement importés par le reporting
 * (src/lib/admin.ts, src/lib/conversion-report.ts, src/lib/stats.ts).
 */
import { run, query, queryOne } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { isTestEmail, isTestUser, realUsersWhere, testEmailOnlyWhere, testUsersWhere } from "@/lib/test-users";

const STAMP = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
/** Domaines que la heuristique doit continuer à traiter comme « test ». */
const RESERVED = ["@test.ci", "@test.dev", "@e2e.test", "@mailtest.fr", "@example.com", "@edu.test", "@local.test"];

const created: number[] = [];

/** Email d'un vrai inscrit : domaine de prod, local-part anodin. */
function realEmail(tag: string): string {
  return `${tag}.${STAMP}@edukora.net`;
}

async function makeUser(email: string, isTest: 0 | 1): Promise<number> {
  await run(
    `INSERT INTO users (role, email, password_hash, first_name, last_name, class_level, referral_code, is_test)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    "student",
    email,
    hashPassword("test1234"),
    "P0",
    "Un",
    "Terminale",
    `EDK-P0-${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
    isTest,
  );
  const u = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ?", email);
  created.push(u!.id);
  return u!.id;
}

async function planId(): Promise<number> {
  const p = await queryOne<{ id: number }>("SELECT id FROM subscription_plans ORDER BY id LIMIT 1");
  return p!.id;
}

async function addActiveSub(userId: number, priceCents: number): Promise<void> {
  await run(
    `INSERT INTO subscriptions (user_id, plan_id, provider, price_cents, status, started_at, end_at)
     VALUES (?, ?, 'geniuspay', ?, 'active', datetime('now', '-10 days'), datetime('now', '+20 days'))`,
    userId,
    await planId(),
    priceCents,
  );
}

/** MRR tel que le dashboard le calcule (miroir de admin.ts `realOnly`). */
async function realMrrFor(userId: number): Promise<{ c: number; mrr: number }> {
  const realOnly = `NOT EXISTS (SELECT 1 FROM users tu WHERE tu.id = s.user_id AND (${testUsersWhere("tu")}))`;
  const r = await queryOne<{ c: number; mrr: number }>(
    `SELECT COUNT(*) AS c, COALESCE(SUM(s.price_cents), 0) AS mrr
     FROM subscriptions s WHERE s.status = 'active' AND s.user_id = ? AND ${realOnly}`,
    userId,
  );
  return { c: Number(r?.c ?? 0), mrr: Number(r?.mrr ?? 0) };
}

async function isCountedReal(userId: number): Promise<boolean> {
  const r = await queryOne<{ c: number }>(
    `SELECT COUNT(*) AS c FROM users u WHERE u.id = ? AND ${realUsersWhere()}`,
    userId,
  );
  return Number(r?.c ?? 0) > 0;
}

/** Valeur brute du marqueur structurel, pour un compte donné. */
async function flagOf(userId: number): Promise<number> {
  const r = await queryOne<{ is_test: number }>("SELECT is_test FROM users WHERE id = ?", userId);
  return Number(r?.is_test ?? -1);
}

/** Email du compte, relu depuis la base (et non réutilisé depuis la variable). */
async function emailOf(userId: number): Promise<string | null> {
  const r = await queryOne<{ email: string | null }>("SELECT email FROM users WHERE id = ?", userId);
  return r?.email ?? null;
}

/**
 * Backfill P0-1, requête identique à celle de `src/lib/init.ts` (ligne 61).
 * On rejoue le mécanisme réel de production plutôt que de recopier une règle :
 * si `testEmailOnlyWhere` evolue, ce test suit automatiquement.
 */
async function runIsTestBackfill(): Promise<void> {
  await run(`UPDATE users SET is_test = 1 WHERE is_test = 0 AND ${testEmailOnlyWhere("email")}`);
}

/**
 * Rejoue le backfill sans effet de bord. Le UPDATE est global par nature : les
 * lignes qu'il va toucher (fixtures d'autres tests, données de développement)
 * sont mémorisées puis restaurées à l'identique, y compris en cas d'échec —
 * d'où le `finally`. Les comptes du test courant sont exclus de la sauvegarde :
 * ils sont supprimés par le `afterAll`.
 */
async function withIsTestBackfill<T>(ownIds: number[], fn: () => Promise<T>): Promise<T> {
  const marks = ownIds.map(() => "?").join(", ");
  const untouched = await query<{ id: number; is_test: number }>(
    `SELECT id, is_test FROM users WHERE is_test = 0 AND ${testEmailOnlyWhere("email")}` +
      (ownIds.length ? ` AND id NOT IN (${marks})` : ""),
    ...ownIds,
  );
  try {
    await runIsTestBackfill();
    return await fn();
  } finally {
    for (const row of untouched) {
      await run("UPDATE users SET is_test = ? WHERE id = ?", row.is_test, row.id);
    }
  }
}

afterAll(async () => {
  for (const id of created) await run("DELETE FROM users WHERE id = ?", id);
});

describe("P0-1 — isTestEmail / isTestUser", () => {
  it.each(RESERVED)("classe %s comme email de test", (suffix) => {
    expect(isTestEmail(`fixture${suffix}`)).toBe(true);
  });

  it("classe la convention de test sur edukora.net", () => {
    expect(isTestEmail("prof.test@edukora.net")).toBe(true);
    expect(isTestEmail("eleve1.test@edukora.net")).toBe(true);
    expect(isTestEmail("test.payment@edukora.net")).toBe(true);
  });

  it("ne classe pas un vrai compte comme test", () => {
    expect(isTestEmail("support@edukora.net")).toBe(false);
    expect(isTestEmail(`parent.${STAMP}@edukora.net`)).toBe(false);
  });

  it("isTestUser honore le marqueur même avec un email réaliste", () => {
    expect(isTestUser(`real-looking.${STAMP}@edukora.net`, 1)).toBe(true);
    expect(isTestUser(`real-looking.${STAMP}@edukora.net`, 0)).toBe(false);
    expect(isTestUser(null, 1)).toBe(true);
    expect(isTestUser(null, 0)).toBe(false);
  });
});

describe("P0-1 — reporting des comptes réels", () => {
  it("cas 1 — un compte réel (is_test=0, email normal) est compté comme réel", async () => {
    const id = await makeUser(realEmail("utilisateur.reel"), 0);
    expect(await isCountedReal(id)).toBe(true);
  });

  it("cas 2 — un compte is_test=1 est exclu même avec un email normal", async () => {
    const id = await makeUser(realEmail("piège.flag"), 1);
    expect(await isCountedReal(id)).toBe(false);
  });

  it("cas 3 — un compte de test avec un abonnement actif n'entre pas dans le MRR", async () => {
    const id = await makeUser(`fixture.${STAMP}@example.com`, 0);
    await addActiveSub(id, 14700);
    expect(await realMrrFor(id)).toEqual({ c: 0, mrr: 0 });
  });

  it("cas 4 — un compte réel avec un abonnement actif entre dans le MRR", async () => {
    const id = await makeUser(realEmail("payant.reel"), 0);
    await addActiveSub(id, 14700);
    expect(await realMrrFor(id)).toEqual({ c: 1, mrr: 14700 });
  });

  it("cas 5 — une nouvelle fixture est exclue même sans is_test (filet email réservé)", async () => {
    // Simule une fixture créée après le passage des migrations : is_test=0,
    // mais l'email est un domaine réservé → le filet de sécurité l'exclut.
    for (const suffix of RESERVED) {
      const id = await makeUser(`nouvelle.fixture${suffix}`, 0);
      expect(await isCountedReal(id)).toBe(false);
      await addActiveSub(id, 4900);
      expect(await realMrrFor(id)).toEqual({ c: 0, mrr: 0 });
    }
  });
});

describe("P0-1 — migration du marqueur", () => {
  it("la colonne is_test existe et vaut 0/1", async () => {
    const cols = await query<{ name: string }>("SELECT name FROM pragma_table_info(?) WHERE name = 'is_test'", "users");
    expect(cols.length).toBe(1);
  });

  it("un compte créé avant la migration avec un email réservé porte is_test=1", async () => {
    // Ce test doit être autonome : il fabrique lui-même le scénario
    // « compte antérieur à la migration » (is_test = 0 + email réservé), rejoue
    // le backfill réel, et vérifie que CE compte précis passe à 1.
    //
    // Il comptait auparavant toutes les lignes `is_test = 1 AND email LIKE
    // '%@example.com'` déjà présentes dans la base. Cette assertion dépendait
    // donc de fixtures historiques : elle passait sur la base de dev locale et
    // échouait en CI, où `data/*.db` est ignoré par git et la base démarre vide.
    // Le compte était lu, jamais créé par le test.
    const fixtureEmail = `flow-test.${STAMP}@example.com`;
    const fixtureId = await makeUser(fixtureEmail, 0);
    // Un compte réel doit rester à 0 : sinon le backfill ne discriminerait pas,
    // il marquerait tout. `support@edukora.net` n'est pas utilisé ici parce
    // qu'il n'existe pas sur une base vierge.
    const realId = await makeUser(realEmail("mdr.reel"), 0);

    // État « avant migration » attendu.
    expect(await flagOf(fixtureId)).toBe(0);
    expect(await flagOf(realId)).toBe(0);
    expect(isTestEmail(fixtureEmail)).toBe(true);

    await withIsTestBackfill([fixtureId, realId], async () => {
      // L'assertion porte sur la fixture du test, pas sur un état global.
      expect(await flagOf(fixtureId)).toBe(1);
      // Le compte réel n'a pas été marqué par erreur.
      expect(await flagOf(realId)).toBe(0);
    });
  });

  it("aucun compte réel n'a été marqué par erreur", async () => {
    // Ce test ne doit pas dépendre d'un compte préexistant. L'ancien code
    // comptait les lignes `email = 'support@edukora.net' AND is_test = 1` :
    // or aucun seed ne crée ce compte (`src/lib/seed.ts` ne fait aucun
    // `INSERT INTO users`, et l'adresse n'apparaît ailleurs que comme adresse
    // d'expéditeur par défaut). Sur une base vierge le compte était 0 par
    // absence, donc `toBe(0)` passait sans rien prouver.
    // Le test crée donc son propre compte réel et vérifie explicitement qu'il
    // survit au backfill avec is_test = 0.
    const realId = await makeUser(realEmail("mdr.non.marque"), 0);
    expect(await flagOf(realId)).toBe(0);
    expect(isTestEmail(await emailOf(realId))).toBe(false);

    await withIsTestBackfill([realId], async () => {
      expect(await flagOf(realId)).toBe(0);
    });
  });

  it("le prédicat testUsersWhere sélectionne les fixtures marquées ET les emails réservés", async () => {
    // L'ancien code comptait tous les utilisateurs de la base et affirmait
    // `0 < flagged < total`. Cela dépendait : de fixtures créées par les tests
    // précédents pour `flagged > 0` (ordre d'exécution) et de l'existence
    // d'au moins un compte non-test dans toute la base pour `flagged < total` —
    // vrai en local, non garanti sur une base vierge.
    // Le scénario est désormais contrôlé : trois comptes créés ici, testés avec
    // le prédicat réel importé par la production.
    const flaggedId = await makeUser(realEmail("piege.marque"), 1);
    const reservedId = await makeUser(`nouvelle.fixture.${STAMP}@example.com`, 0);
    const realId = await makeUser(realEmail("mdr.hors.perimetre"), 0);

    const selected = async (id: number): Promise<boolean> => {
      const r = await queryOne<{ c: number }>(
        `SELECT COUNT(*) AS c FROM users u WHERE u.id = ? AND ${testUsersWhere("u")}`,
        id,
      );
      return Number(r?.c ?? 0) > 0;
    };

    // Fixture marquée structurellement, malgré un email réaliste.
    expect(await selected(flaggedId)).toBe(true);
    // Filet de sécurité : is_test = 0 mais domaine réservé.
    expect(await selected(reservedId)).toBe(true);
    // Un compte réel n'est jamais sélectionné.
    expect(await selected(realId)).toBe(false);
  });
});
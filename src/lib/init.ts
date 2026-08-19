import { initDb, queryOne, run, query, IS_PG, setInsideInit, toPgSchema } from "./db";
import { seedIfEmpty } from "./seed";
import { ensureBadges } from "./badges";
import { hashPassword, verifyPassword } from "./auth";
import { seedProgressionMENAET } from "./progression-menaet";
import { seedCollegeContent, seedCollegeQuizzes } from "./college-content";
import { resolveUserGradeIds } from "./level";
import { ensureRentreePromo } from "./promo";

let readyPromise: Promise<void> | null = null;

async function safeAsync(name: string, fn: () => Promise<unknown>) {
  try {
    await fn();
  } catch (err) {
    console.error(`[init] ${name} a échoué (ignoré) :`, err);
  }
}

export async function ensureReady() {
  if (!readyPromise) {
    readyPromise = doInit();
  }
  return readyPromise;
}

async function doInit() {
  if (process.env.NEXT_PHASE === "phase-production-build") return;
  setInsideInit(true);
  try {
    await safeAsync("initDb", initDb);
    await safeAsync("seedIfEmpty", seedIfEmpty);
    await safeAsync("migrations", async () => {
    await migrate("tutor_messages", "chat_id");
    await migrate("quizzes", "created_by");
    await migrate("exam_papers", "created_by");
    await migrate("lessons", "content", "TEXT");
    await migrate("quizzes", "status", "TEXT");
    await migrate("exam_papers", "status", "TEXT");
    await migrate("quizzes", "created_at", "TEXT");
    await migrate("exam_papers", "created_at", "TEXT");
    await migrate("users", "blocked", "INTEGER");
    await migrate("users", "commune");
    await migrate("users", "gender", "TEXT");
    await migrate("users", "goal", "TEXT");
    await migrate("users", "seen_onboarding", "INTEGER");
    await migrate("challenge_contributions", "side", "TEXT");
    await migrate("live_sessions", "created_by", "INTEGER");
    await migrate("live_sessions", "chat_paused", "INTEGER");
    await migrate("live_messages", "role", "TEXT");
    await migrate("live_questions", "pinned", "INTEGER");
    await migrate("chapters", "position", "INTEGER");
    await migrate("chapters", "grade_id", "INTEGER");
    await migrate("chapters", "code", "TEXT");
    await migrate("chapters", "description", "TEXT");
    await migrate("chapters", "officiel_ref", "TEXT");
    await migrate("chapters", "created_by", "INTEGER");
    await migrate("chapters", "status", "TEXT");
    await migrate("chapters", "created_at", "TEXT");
    await migrate("lessons", "status", "TEXT");
    await migrate("lessons", "summary", "TEXT");
    await migrate("lessons", "position", "INTEGER");
    await migrate("lessons", "content_md", "TEXT");
    await migrate("lessons", "content_html", "TEXT");
    await migrate("lessons", "video_url", "TEXT");
    await migrate("lessons", "duration_min", "INTEGER");
    await migrate("lessons", "difficulty", "INTEGER");
    await migrate("lessons", "prerequisites", "TEXT");
    await migrate("lessons", "is_premium", "INTEGER");
    await migrate("lessons", "created_by", "INTEGER");
    await migrate("lessons", "created_at", "TEXT");
    await migrate("subjects", "coefficient_json", "TEXT");
    await migrate("users", "grade_id", "INTEGER");
    await migrate("push_subscriptions", "user_id", "INTEGER");
    await migrate("push_subscriptions", "endpoint", "TEXT");
    await migrate("push_subscriptions", "p256dh", "TEXT");
    await migrate("push_subscriptions", "auth", "TEXT");
    await migrate("push_subscriptions", "created_at", "TEXT");
    await migrate("subscriptions", "provider", "TEXT");
    await migrate("subscriptions", "provider_subscription_id", "TEXT");
    await migrate("subscriptions", "provider_customer_id", "TEXT");
    await migrate("subscriptions", "price_cents", "INTEGER");
    await migrate("subscriptions", "ga_client_id", "TEXT");
    await migrate("subscriptions", "reminder_sent_at", "TEXT");
    await migrate("notifications", "type", "TEXT");
  });
  await safeAsync("backfillUserGrades", backfillUserGrades);
  await safeAsync("normalizeDefaults", normalizeDefaults);
  await safeAsync("fixMojibake", fixMojibake);
  // Le compte admin est créé EN PREMIER : même si un seed échoue,
  // l'administrateur existe toujours sur une base fraîche.
  await safeAsync("ensureAdminDemo", ensureAdminDemo);
  await safeAsync("seedDemoUsers", seedDemoUsers);
  await safeAsync("seedForum", seedForum);
  await safeAsync("ensureBadges", ensureBadges);
  await safeAsync("ensureReminderTable", ensureReminderTable);
  await safeAsync("ensureUserConsentsTable", ensureUserConsentsTable);
  await safeAsync("ensureParentTables", ensureParentTables);
  await safeAsync("ensureParentDemo", ensureParentDemo);
  await safeAsync("seedReferrals", seedReferrals);
  await safeAsync("seedPromoCodes", seedPromoCodes);
  await safeAsync("seedDisputes", seedDisputes);
  await safeAsync("seedAuditLogs", seedAuditLogs);
  await safeAsync("seedProctoring", seedProctoring);
  await safeAsync("seedRankings", seedRankings);
  await safeAsync("seedChallenges", seedChallenges);
  await safeAsync("seedLive", seedLive);
  await safeAsync("seedLigueChallenges", seedLigueChallenges);
  await safeAsync("seedMENAET", seedMENAET);
  await safeAsync("seedProgressionMENAET", seedProgressionMENAET);
  await safeAsync("seedCollegeContent", seedCollegeContent);
  await safeAsync("seedCollegeQuizzes", () => seedCollegeQuizzes(["philo"]));
  await safeAsync("seedSubscriptionPlans", ensureSubscriptionPlans);
  } finally {
    setInsideInit(false);
  }
}

async function fixMojibake() {
  const R = "\uFFFD";
  const fixes: [string, string, string, string][] = [
    ["users", "first_name", `In${R}s`, "Inès"],
    ["users", "last_name", `Diabat${R}`, "Diabaté"],
    ["users", "last_name", `Kouam${R}`, "Kouamé"],
    ["users", "last_name", `Kon${R}`, "Koné"],
    ["users", "last_name", `Ciss${R}`, "Cissé"],
    ["users", "last_name", `${R}l${R}ve`, "Élève"],
    ["users", "last_name", `El${R}ve`, "Élève"],
    ["quizzes", "title", `Quiz de chimie ${R} Les r${R}actions`, "Quiz de chimie — Les réactions"],
    ["quizzes", "title", `Quiz SVT ${R} G${R}n${R}tique`, "Quiz SVT — Génétique"],
    ["exam_papers", "title", `BAC SVT 2024 ${R} V${R}rification`, "BAC SVT 2024 — Vérification"],
    ["forum_replies", "content", `Bonne id${R}e, je suis partant !`, "Bonne idée, je suis partant !"],
  ];
  for (const [table, column, corrupted, fixed] of fixes) {
    await run(`UPDATE ${table} SET ${column} = ? WHERE ${column} = ?`, fixed, corrupted);
  }
}

async function ensureAdminDemo() {
  const existing = await queryOne<{ id: number }>(
    "SELECT id FROM users WHERE role = 'admin' ORDER BY id LIMIT 1",
  );

  const envEmail = process.env.ADMIN_EMAIL?.trim();
  const envPassword = process.env.ADMIN_PASSWORD;

  if (existing) {
    // Bootstrap de production : si ADMIN_EMAIL/ADMIN_PASSWORD sont définis,
    // on force les identifiants admin (email + mot de passe) à chaque démarrage.
    const currentHash = await queryOne<{ password_hash: string }>(
      "SELECT password_hash FROM users WHERE id = ?",
      existing.id,
    );
    if (envEmail) await run("UPDATE users SET email = ? WHERE id = ?", envEmail, existing.id);
    if (envPassword && currentHash && !verifyPassword(envPassword, currentHash.password_hash)) {
      await run("UPDATE users SET password_hash = ? WHERE id = ?", hashPassword(envPassword), existing.id);
      await run("DELETE FROM sessions WHERE user_id = ?", existing.id);
    }
    return;
  }

  // En production, exiger ADMIN_EMAIL/ADMIN_PASSWORD : ne jamais créer
  // de compte admin avec des identifiants connus par défaut (backdoor).
  if (process.env.NODE_ENV === "production" && (!envEmail || !envPassword)) {
    console.warn("[init] ADMIN_EMAIL/ADMIN_PASSWORD non définis en production — aucun admin créé.");
    return;
  }

  const email = envEmail || "admin@test.ci";
  const password = envPassword || "admin123";

  await run(
    `INSERT INTO users (role, email, password_hash, first_name, last_name, class_level, referral_code)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    "admin",
    email,
    hashPassword(password),
    "Awa",
    "Koné",
    null,
    `EDK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
  );
}

async function seedDemoUsers() {
  const demo: [string, string, string, string, string][] = [
    ["yao@test.ci", "Yao", "Kouassi", "student", "test123"],
    ["nadia@test.ci", "Nadia", "Diabaté", "student", "test123"],
    ["ines@test.ci", "Inès", "Kouamé", "student", "test123"],
    ["mariam@test.ci", "Mariam", "Cissé", "student", "test123"],
    ["kofi8@test.ci", "Kofi", "Brou", "student", "test123"],
    ["aya8@test.ci", "Aya", "N'Guessan", "student", "test123"],
    ["luc@test.ci", "Luc", "Tanoh", "student", "test123"],
    ["awa@test.ci", "Awa", "Traoré", "student", "test123"],
    ["prof@test.ci", "Jean", "Koffi", "teacher", "prof123"],
  ];
  for (const [email, first, last, role, password] of demo) {
    const exists = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ?", email);
    if (exists) {
      // Ne JAMAIS réécrire le mot de passe d'un compte existant :
      // un utilisateur réel qui aurait pris cet email garderait le sien.
      continue;
    }
    await run(
      `INSERT INTO users (role, email, password_hash, first_name, last_name, class_level, referral_code)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      role,
      email,
      hashPassword(password),
      first,
      last,
      role === "student" ? "Terminale" : null,
      `EDK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    );
  }
}

async function ensureReminderTable() {
  await run(
    `CREATE TABLE IF NOT EXISTS reminder_settings (
       user_id INTEGER PRIMARY KEY,
       enabled INTEGER NOT NULL DEFAULT 0,
       frequency TEXT NOT NULL DEFAULT 'daily',
       hour TEXT NOT NULL DEFAULT '18:30',
       subjects TEXT,
       last_reminder_date TEXT,
       updated_at TEXT NOT NULL DEFAULT (datetime('now'))
     )`,
  );
}

async function ensureUserConsentsTable() {
  const pgSql = (sql: string) => (IS_PG ? toPgSchema(sql) : sql);
  await run(
    pgSql(`CREATE TABLE IF NOT EXISTS user_consents (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
       type TEXT NOT NULL,
       ip TEXT,
       user_agent TEXT,
       created_at TEXT NOT NULL DEFAULT (datetime('now'))
     )`),
  );
}

async function ensureParentTables() {
  const pgSql = (sql: string) => (IS_PG ? toPgSchema(sql) : sql);
  await run(
    pgSql(`CREATE TABLE IF NOT EXISTS parent_child (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       parent_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
       child_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
       created_at TEXT NOT NULL DEFAULT (datetime('now')),
       UNIQUE (parent_id, child_id)
     )`),
  );
  await run(
    pgSql(`CREATE TABLE IF NOT EXISTS pairing_codes (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
       code TEXT NOT NULL UNIQUE,
       created_at TEXT NOT NULL DEFAULT (datetime('now')),
       expires_at TEXT
     )`),
  );
  await run(
    `CREATE TABLE IF NOT EXISTS parent_notification_settings (
       user_id INTEGER PRIMARY KEY,
       academic_alerts INTEGER NOT NULL DEFAULT 1,
       score_drop INTEGER NOT NULL DEFAULT 1,
       results_alert INTEGER NOT NULL DEFAULT 1,
       weekly_report INTEGER NOT NULL DEFAULT 1,
       encouragement INTEGER NOT NULL DEFAULT 1,
       updated_at TEXT NOT NULL DEFAULT (datetime('now'))
     )`,
  );
}

async function ensureParentDemo() {
  const existing = await queryOne<{ id: number }>(
    "SELECT id FROM users WHERE role = 'parent' ORDER BY id LIMIT 1",
  );
  if (existing) return;

  const parentId = Number(
    (await run(
      `INSERT INTO users (role, email, password_hash, first_name, last_name, class_level, referral_code)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      "parent",
      "parent@test.ci",
      hashPassword("parent123"),
      "Kouassi",
      "Konan",
      null,
      `EDK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    )).lastInsertRowid,
  );

  const children = await query<{ id: number }>(
    "SELECT id FROM users WHERE role = 'student' ORDER BY id LIMIT 2",
  );
  for (const c of children) {
    await run(
      "INSERT INTO parent_child (parent_id, child_id) VALUES (?, ?)",
      parentId,
      c.id,
    );
  }

  const kids = await query<{ id: number; first_name: string }>(
    "SELECT id, first_name FROM users WHERE role = 'student' ORDER BY id",
  );
  for (const kid of kids) {
    const code = `${kid.first_name.slice(0, 4).toUpperCase().padEnd(4, "X")}${String(kid.id).padStart(2, "0")}`.slice(0, 6);
    const taken = await queryOne<{ id: number }>("SELECT id FROM pairing_codes WHERE code = ?", code);
    if (taken) continue;
    await run(
      "INSERT INTO pairing_codes (user_id, code, expires_at) VALUES (?, ?, datetime('now', '+30 days'))",
      kid.id,
      code,
    );
  }
}

async function migrate(table: string, column: string, type = "INTEGER") {
  const col = await queryOne<{ c: number }>(
    IS_PG
      ? `SELECT COUNT(*) AS c FROM information_schema.columns WHERE table_name = ? AND column_name = ?`
      : `SELECT COUNT(*) AS c FROM pragma_table_info(?) WHERE name = ?`,
    table,
    column,
  );
  if (!col || Number(col.c) === 0) await run(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`);
}

async function backfillUserGrades() {
  const rows = await query<{ id: number; serie_id: number | null; class_level: string | null }>(
    "SELECT id, serie_id, class_level FROM users WHERE role = 'student' AND grade_id IS NULL",
  );
  for (const r of rows) {
    try {
      const ids = await resolveUserGradeIds(r.serie_id, r.class_level);
      if (ids && ids.length > 0) {
        await run("UPDATE users SET grade_id = ? WHERE id = ?", ids[0], r.id);
      }
    } catch {
      // échec isolé : on passe à l'utilisateur suivant
    }
  }
}

async function normalizeDefaults() {
  await run("UPDATE quizzes SET status = 'approved' WHERE status IS NULL OR status = ''");
  await run("UPDATE exam_papers SET status = 'approved' WHERE status IS NULL OR status = ''");
  await run("UPDATE chapters SET status = 'approved' WHERE status IS NULL OR status = ''");
  await run("UPDATE lessons SET status = 'approved' WHERE status IS NULL OR status = ''");
  await run("UPDATE quizzes SET created_at = datetime('now') WHERE created_at IS NULL");
  await run("UPDATE exam_papers SET created_at = datetime('now') WHERE created_at IS NULL");
  await run("UPDATE users SET blocked = 0 WHERE blocked IS NULL");
  await run(
    "UPDATE subscriptions SET price_cents = (SELECT price_cents FROM subscription_plans WHERE subscription_plans.id = subscriptions.plan_id) WHERE price_cents IS NULL OR price_cents = 0",
  );
}

async function seedForum() {
  const existing = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM forum_categories");
  if (!existing || existing.c > 0) return;

  const subjects = await query<{ id: number; name: string; icon: string; color: string }>(
    "SELECT id, name, icon, color FROM subjects ORDER BY id",
  );

  const generalId = Number(
    (await run(
      "INSERT INTO forum_categories (name, icon, color, description, position) VALUES (?, ?, ?, ?, ?)",
      "Discussions générales",
      "forum",
      "#0047ab",
      "Échange libre entre élèves de toute la Côte d'Ivoire",
      0,
    )).lastInsertRowid,
  );

  const categoryIds: number[] = [generalId];
  for (const [i, s] of subjects.entries()) {
    const id = Number(
      (await run(
        "INSERT INTO forum_categories (name, icon, color, description, position) VALUES (?, ?, ?, ?, ?)",
        `Forum ${s.name}`,
        s.icon,
        s.color,
        `Pose tes questions en ${s.name} et entraide-toi`,
        i + 1,
      )).lastInsertRowid,
    );
    categoryIds.push(id);
  }

  const students = await query<{ id: number; first_name: string }>(
    "SELECT id, first_name FROM users WHERE role = 'student' ORDER BY id LIMIT 4",
  );
  if (students.length === 0) return;

  const [u1, u2, u3, u4] = [
    students[0],
    students[1] ?? students[0],
    students[2] ?? students[0],
    students[3] ?? students[0],
  ];

  const mathsId = categoryIds[1];

  const posts: [number, number, string, string][] = [
    [
      mathsId,
      u1.id,
      "Qui est chaud pour une session de maths ?",
      "Je bloque sur les fonctions exponentielles... Est-ce que quelqu'un peut m'expliquer la dérivée de e^u ? Je passe le BAC en fin d'année et ça m'angoisse. 🙏",
    ],
    [
      categoryIds[4],
      u2.id,
      "Aide en SVT : la photosynthèse",
      "Quelqu'un peut m'expliquer simplement la phase claire et la phase sombre ? J'ai lu la fiche mais je mélange tout entre le chloroplaste et les réactions.",
    ],
    [
      generalId,
      u3.id,
      "Comment rester motivé pendant les révisions ?",
      "On est à 2 mois du BAC, je révise 3h par jour mais parfois j'ai vraiment la flemme. Des astuces ? Vous faites comment pour tenir la cadence ?",
    ],
    [
      categoryIds[1],
      u4.id,
      "Astuce : le théorème de Rolle expliqué simplement",
      "Je partage une astuce qui m'a sauvé : pour montrer qu'une équation a une solution, pense au TVI avant de te lancer dans les calculs. Ça m'a débloqué plein d'exercices.",
    ],
  ];

  const postIds: number[] = [];
  for (let i = 0; i < posts.length; i++) {
    const [cat, author, title, content] = posts[i];
    const id = Number(
      (await run(
        "INSERT INTO forum_posts (category_id, user_id, title, content, created_at) VALUES (?, ?, ?, ?, datetime('now', '-' || ? || ' hours'))",
        cat, author, title, content, i + 1,
      )).lastInsertRowid,
    );
    postIds.push(id);
  }

  await run(
    "INSERT INTO forum_replies (post_id, user_id, content, created_at) VALUES (?, ?, ?, datetime('now', '-2 hours'))",
    postIds[0], u2.id, "Bien sûr ! Rappelle-toi : (e^u)' = u'·e^u. Si u(x)=2x+1 alors la dérivée est 2·e^(2x+1). Je t'envoie un exercice guidé !",
  );
  await run(
    "INSERT INTO forum_replies (post_id, user_id, content, created_at) VALUES (?, ?, ?, datetime('now', '-1 hours'))",
    postIds[0], u3.id, "Merci pour l'astuce ! J'étais perdu aussi. On fait une session de groupe ce soir ?",
  );
  await run(
    "INSERT INTO forum_replies (post_id, user_id, content, created_at) VALUES (?, ?, ?, datetime('now', '-3 hours'))",
    postIds[1], u4.id, "Phase claire = lumière + chlorophylle dans les thylakoïdes. Phase sombre = cycle de Calvin dans le stroma. C'est là que se fait la fixation du CO2.",
  );
  await run(
    "INSERT INTO forum_replies (post_id, user_id, content, created_at) VALUES (?, ?, ?, datetime('now', '-5 hours'))",
    postIds[2], u1.id, "Pomodoro 25/5 et le plus important : éteins ton téléphone. Personnellement je révise le matin quand je suis frais.",
  );

  for (const pid of postIds) {
    await run("INSERT INTO forum_votes (user_id, post_id) VALUES (?, ?)", u1.id, pid);
  }
  await run("INSERT INTO forum_votes (user_id, post_id) VALUES (?, ?)", u2.id, postIds[0]);
  await run("INSERT INTO forum_votes (user_id, post_id) VALUES (?, ?)", u3.id, postIds[0]);
}

async function seedReferrals() {
  const linked = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM users WHERE referred_by IS NOT NULL");
  if (linked && linked.c > 0) return;
  const referrals: [string, number][] = [
    ["EDK-1JZWZ3", 5],
    ["EDK-1JZWZ3", 6],
    ["EDK-1JZWZ3", 7],
    ["EDK-ZZ3WRB", 9],
    ["EDK-CYL39L", 11],
    ["EDK-CYL39L", 12],
  ];
  for (const [code, userId] of referrals) {
    const referrer = await queryOne<{ id: number }>("SELECT id FROM users WHERE referral_code = ?", code);
    if (referrer && referrer.id !== userId) {
      await run("UPDATE users SET referred_by = ? WHERE id = ? AND referred_by IS NULL", referrer.id, userId);
    }
  }
}

async function seedPromoCodes() {
  await ensureRentreePromo();
  const count = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM promo_codes");
  if (count && count.c > 0) return;
  const adminId = await queryOne<{ id: number }>("SELECT id FROM users WHERE role = 'admin' ORDER BY id LIMIT 1");
  const by = adminId?.id ?? null;
  const codes: [string, string, number, number, string | null, string | null][] = [
    ["RENTREE25", "percent", 25, 1000, null, null],
    ["EXAM20", "percent", 20, 500, null, null],
    ["PREMIUM10K", "fixed", 10000, 200, null, null],
  ];
  for (const [code, type, value, maxUses, start, end] of codes) {
    await run(
      "INSERT INTO promo_codes (code, discount_type, discount_value, max_uses, starts_at, expires_at, active, created_by) VALUES (?, ?, ?, ?, ?, ?, 1, ?)",
      code, type, value, maxUses, start, end, by,
    );
  }
}

async function seedDisputes() {
  const count = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM disputes");
  if (count && count.c > 0) return;
  const students = await query<{ id: number; first_name: string }>(
    "SELECT id, first_name FROM users WHERE role = 'student' ORDER BY id",
  );
  if (students.length < 3) return;
  const adminId = await queryOne<{ id: number }>("SELECT id FROM users WHERE role = 'admin' ORDER BY id LIMIT 1");
  await run(
    "INSERT INTO disputes (user_id, subject, description, status, created_at) VALUES (?, ?, ?, 'open', datetime('now', '-2 days'))",
    students[0].id,
    "Erreur dans la correction du BAC Maths",
    "À la question 3 de l'épreuve, ma réponse est bonne mais elle est comptée fausse. Le corrigé indique la réponse B alors que la réponse A est la bonne. Merci de vérifier.",
  );
  await run(
    "INSERT INTO disputes (user_id, subject, description, status, created_at) VALUES (?, ?, ?, 'open', datetime('now', '-1 days'))",
    students[1].id,
    "Score quiz non enregistré",
    "J'ai terminé le quiz sur la génétique hier soir et ma tentative n'apparaît plus dans mon historique. J'avais pourtant obtenu 8/10.",
  );
  await run(
    "INSERT INTO disputes (user_id, subject, description, status, resolution, resolved_by, created_at, resolved_at) VALUES (?, ?, ?, 'resolved', ?, ?, datetime('now', '-4 days'), datetime('now', '-3 days'))",
    students[2].id,
    "Note d'examen blanc modifiée",
    "Ma note au BAC SVT est passée de 14 à 11 sans explication.",
    "Vérification effectuée : une erreur de saisie a été corrigée, la note de 14/20 a été restaurée.",
    adminId?.id ?? null,
  );
}

async function seedAuditLogs() {
  const count = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM audit_logs");
  if (count && count.c > 0) return;
  const adminId = await queryOne<{ id: number }>("SELECT id FROM users WHERE role = 'admin' ORDER BY id LIMIT 1");
  const by = adminId?.id ?? null;
  const adminName = adminId
    ? (await queryOne<{ n: string }>("SELECT first_name || ' ' || last_name AS n FROM users WHERE id = ?", adminId.id))?.n ?? "Admin"
    : "Admin";
  const entries: [string, string, string][] = [
    ["approbation", "Quiz « Quiz de chimie — Les réactions » approuvé", "datetime('now', '-3 days')"],
    ["approbation", "Sujet « BAC SVT 2024 — Vérification » approuvé", "datetime('now', '-2 days')"],
    ["notification", "Campagne « Maintenance de la plateforme » envoyée à 18 utilisateurs", "datetime('now', '-1 days')"],
    ["litige", "Litige « Note d'examen blanc modifiée » résolu par " + adminName, "datetime('now', '-3 days')"],
    ["blocage", "Compte « Kevin Brou » bloqué", "datetime('now', '-5 days')"],
    ["systeme", "Sauvegarde de la base de données effectuée", "datetime('now', '-7 days')"],
  ];
  for (const [action, detail, ts] of entries) {
    await run(
      "INSERT INTO audit_logs (actor_id, action, detail, created_at) VALUES (?, ?, ?, ?)",
      action === "blocage" || action === "systeme" ? null : by,
      action,
      detail,
      ts,
    );
  }
}

async function seedProctoring() {
  const count = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM proctoring_sessions");
  if (count && count.c > 0) return;
  const students = await query<{ id: number; first_name: string }>(
    "SELECT id, first_name FROM users WHERE role = 'student' ORDER BY id",
  );
  const papers = await query<{ id: number; title: string }>(
    "SELECT id, title FROM exam_papers ORDER BY id",
  );
  if (students.length < 2 || papers.length < 2) return;

  const s1 = Number(
    (await run(
      "INSERT INTO proctoring_sessions (user_id, paper_id, status, started_at) VALUES (?, ?, 'active', datetime('now', '-12 minutes'))",
      students[0].id,
      papers[0].id,
    )).lastInsertRowid,
  );
  await run(
    "INSERT INTO proctoring_events (session_id, event_type, detail, created_at) VALUES (?, 'tab_switch', ?, datetime('now', '-4 minutes'))",
    s1,
    "3 changements d'onglet détectés",
  );
  await run(
    "INSERT INTO proctoring_events (session_id, event_type, detail, created_at) VALUES (?, 'warning', ?, datetime('now', '-2 minutes'))",
    s1,
    "Fenêtre hors focus pendant 45 secondes",
  );

  const s2 = Number(
    (await run(
      "INSERT INTO proctoring_sessions (user_id, paper_id, status, started_at, ended_at) VALUES (?, ?, 'ended', datetime('now', '-3 days', '-2 hours'), datetime('now', '-3 days', '-20 minutes'))",
      students[1].id,
      papers[1].id,
    )).lastInsertRowid,
  );
  await run(
    "INSERT INTO proctoring_events (session_id, event_type, detail, created_at) VALUES (?, 'submission', 'Épreuve soumise — 14/20', datetime('now', '-3 days', '-20 minutes'))",
    s2,
  );
}

async function seedRankings() {
  const students = await query<{ id: number; email: string }>(
    "SELECT id, email FROM users WHERE role = 'student' AND commune IS NULL ORDER BY id",
  );

  const profiles: Record<string, [string, number, number]> = {
    "yao@test.ci": ["Cocody", 5280, 42],
    "nadia@test.ci": ["Cocody", 3860, 25],
    "ines@test.ci": ["Yopougon", 2460, 18],
    "mariam@test.ci": ["Abobo", 2150, 12],
    "kofi8@test.ci": ["Cocody", 1520, 9],
    "Aya@test.ci": ["Marcory", 1330, 7],
    "aya8@test.ci": ["Cocody", 940, 5],
    "luc@test.ci": ["Yopougon", 820, 4],
    "Fatou@test.ci": ["Abobo", 640, 3],
    "awa@test.ci": ["Treichville", 480, 2],
    "Aya.q8@test.ci": ["Koumassi", 210, 1],
    "Fatou.q8@test.ci": ["Port-Bouët", 120, 1],
  };

  for (const s of students) {
    const p = profiles[s.email];
    if (p) {
      await run("UPDATE users SET commune = ?, xp = ?, streak = ? WHERE id = ?", p[0], p[1], p[2], s.id);
    }
  }

  const extrasExist = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = 'binta@test.ci'");
  if (extrasExist) return;
  const extra: [string, string, string, number, number, string][] = [
    ["Binta", "Traoré", "binta@test.ci", 1780, 10, "Plateau"],
    ["Serge", "Kouamé", "serge@test.ci", 1210, 6, "Yopougon"],
    ["Adjoua", "N'Guessan", "adjoua@test.ci", 560, 2, "Abobo"],
    ["Yves", "Kacou", "yves@test.ci", 1490, 8, "Cocody"],
    ["Moussa", "Fofana", "moussa@test.ci", 890, 4, "Marcory"],
  ];
  const parrains: [string, string][] = [
    ["binta@test.ci", "EDK-1JZWZ3"],
    ["serge@test.ci", "EDK-1JZWZ3"],
    ["adjoua@test.ci", "EDK-1JZWZ3"],
    ["yves@test.ci", "EDK-CYL39L"],
    ["moussa@test.ci", "EDK-ZZ3WRB"],
  ];
  for (const [first, last, email, xp, streak, commune] of extra) {
    const exists = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ?", email);
    if (exists) continue;
    const serie = await queryOne<{ id: number }>("SELECT id FROM series WHERE code = 'C' ORDER BY id LIMIT 1");
    const id = Number(
      (await run(
        "INSERT INTO users (role, email, password_hash, first_name, last_name, serie_id, class_level, xp, streak, commune, created_at) VALUES ('student', ?, ?, ?, ?, ?, 'Terminale', ?, ?, ?, datetime('now', '-30 days'))",
        email,
        hashPassword("test123"),
        first,
        last,
        serie?.id ?? null,
        xp,
        streak,
        commune,
      )).lastInsertRowid,
    );
    const pair = parrains.find((p) => p[0] === email);
    if (pair) {
      const referrer = await queryOne<{ id: number }>("SELECT id FROM users WHERE referral_code = ?", pair[1]);
      if (referrer) await run("UPDATE users SET referred_by = ? WHERE id = ?", referrer.id, id);
    }
  }
}

function splitTotal(total: number, n: number, salt = 0): number[] {
  const out: number[] = [];
  let remaining = total;
  for (let i = 0; i < n; i++) {
    const partsLeft = n - i;
    const jitter = ((i + 1) * 7919 + salt * 104729) % 47;
    const base = Math.floor(remaining / partsLeft);
    let part = i < n - 1 ? Math.max(15, Math.round(base * (0.55 + (jitter / 47) * 0.9))) : base;
    part = Math.min(part, remaining - (partsLeft - 1));
    out.push(part);
    remaining -= part;
  }
  out[out.length - 1] += remaining;
  return out;
}

async function seedChallengeContribs(challengeId: number, emails: string[], total: number, partsPerStudent: number, side: "a" | "b") {
  const students = await query<{ id: number; email: string }>(
    "SELECT id, email FROM users WHERE role = 'student' AND email IN (" + emails.map(() => "?").join(",") + ") ORDER BY id",
    ...emails,
  );
  if (students.length === 0) return;
  const parts = splitTotal(total, students.length * partsPerStudent, challengeId);
  let i = 0;
  for (const s of students) {
    for (let k = 0; k < partsPerStudent; k++) {
      if (i >= parts.length) break;
      const hoursAgo = ((s.id * 31 + k * 7) % 71) % 72 + 1;
      await run(
        "INSERT INTO challenge_contributions (challenge_id, user_id, side, xp, created_at) VALUES (?, ?, ?, ?, ?)",
        challengeId,
        s.id,
        side,
        parts[i],
        new Date(Date.now() - hoursAgo * 3_600_000).toISOString(),
      );
      i++;
    }
  }
}

async function seedChallenges() {
  const count = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM challenges");
  if (count && count.c > 0) return;

  const weekly = Number(
    (await run(
      `INSERT INTO challenges (name, category, commune_a, commune_b, description, reward_desc, status, starts_at, ends_at)
       VALUES (?, ?, ?, ?, ?, ?, 'active', datetime('now', '-3 days'), datetime('now', '+2 days', '+14 hours'))`,
      "Défi de la Semaine : Cocody vs Abobo",
      "Défi de la Semaine",
      "Cocody",
      "Abobo",
      "Les deux communes se défient toute la semaine : chaque quiz et chaque examen simulé fait gagner des points à ta commune. Que la meilleure gagne !",
      "+20% Boost XP pendant 3 jours pour tous les participants de la commune gagnante.",
    )).lastInsertRowid,
  );
  await seedChallengeContribs(weekly, ["yao@test.ci", "nadia@test.ci", "kofi8@test.ci", "aya8@test.ci", "yves@test.ci"], 45000, 4, "a");
  await seedChallengeContribs(weekly, ["mariam@test.ci", "Fatou@test.ci", "adjoua@test.ci"], 42300, 5, "b");

  const serie = Number(
    (await run(
      `INSERT INTO challenges (name, category, commune_a, commune_b, description, reward_desc, status, starts_at, ends_at)
       VALUES (?, ?, ?, ?, ?, ?, 'active', datetime('now', '-1 days'), datetime('now', '+1 days', '+8 hours'))`,
      "Série Scientifique : Plateau vs Treichville",
      "Série Scientifique",
      "Plateau",
      "Treichville",
      "Défi réservé aux candidats des séries scientifiques. Les sujets du BAC C et D sont au programme.",
      "+500 XP bonus pour les 3 meilleurs contributeurs de la commune gagnante.",
    )).lastInsertRowid,
  );
  await seedChallengeContribs(serie, ["binta@test.ci"], 8500, 5, "a");
  await seedChallengeContribs(serie, ["awa@test.ci"], 7400, 5, "b");

  const national = Number(
    (await run(
      `INSERT INTO challenges (name, category, commune_a, commune_b, description, reward_desc, status, starts_at, ends_at)
       VALUES (?, ?, ?, ?, ?, ?, 'active', datetime('now', '-2 days'), datetime('now', '+3 days'))`,
      "Défi National : Bouaké vs Yamoussoukro",
      "National",
      "Bouaké",
      "Yamoussoukro",
      "Le grand défi national ouvert à tous les élèves de Côte d'Ivoire. La fierté de la ville est en jeu !",
      "+15% Boost XP pour toute la commune gagnante pendant 2 jours.",
    )).lastInsertRowid,
  );
  const allStudents = await query<{ id: number; email: string }>(
    "SELECT id, email FROM users WHERE role = 'student' ORDER BY id",
  );
  const sideA = allStudents.filter((_, i) => i % 2 === 0).map((s) => s.email);
  const sideB = allStudents.filter((_, i) => i % 2 === 1).map((s) => s.email);
  if (sideA.length > 0) await seedChallengeContribs(national, sideA, 27800, 2, "a");
  if (sideB.length > 0) await seedChallengeContribs(national, sideB, 26200, 2, "b");

  await run(
    `INSERT INTO challenges (name, category, commune_a, commune_b, description, reward_desc, status, starts_at, ends_at)
     VALUES (?, ?, ?, ?, ?, ?, 'upcoming', datetime('now', '+12 hours'), datetime('now', '+5 days'))`,
    "Défi Académique Spécial BAC",
    "Spécial BAC",
    "Yopougon",
    "Koumassi",
    "Déverrouillage dans 12h. Le grand défi de préparation au BAC : 5 jours pour dominer ta commune.",
    "Badge exclusif « Champion de commune » + 1000 XP bonus.",
  );
}

async function seedLive() {
  await run("UPDATE live_sessions SET chat_paused = 0 WHERE chat_paused IS NULL");
  await run("UPDATE live_messages SET role = 'student' WHERE role IS NULL");
  await run("UPDATE live_questions SET pinned = 0 WHERE pinned IS NULL");

  const prof = await queryOne<{ id: number; first_name: string }>("SELECT id, first_name FROM users WHERE email = 'prof@test.ci'");
  if (prof && prof.first_name === "Jean") {
    await run("UPDATE users SET first_name = 'Dr.', last_name = 'Koffi Kouassi' WHERE id = ?", prof.id);
  }
  const liveNow = prof ? await queryOne<{ id: number }>("SELECT id FROM live_sessions WHERE status = 'live' ORDER BY id LIMIT 1") : null;
  if (prof && liveNow) {
    await run("UPDATE live_sessions SET created_by = ? WHERE id = ? AND created_by IS NULL", prof.id, liveNow.id);
    await run(
      "INSERT INTO live_registrations (session_id, user_id) SELECT ?, id FROM users WHERE role = 'student' ORDER BY id LIMIT 6 ON CONFLICT DO NOTHING",
      liveNow.id,
    );
    const qCount = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM live_questions WHERE session_id = ?", liveNow.id);
    if (qCount && Number(qCount.c) === 0) {
      const students = await query<{ id: number }>("SELECT id FROM users WHERE role = 'student' ORDER BY id LIMIT 3");
      const qs: [number, string, number][] = [
        [0, "Monsieur, la règle de L'Hôpital est-elle autorisée au BAC cette année ?", 1],
        [1, "Pouvez-vous réexpliquer l'intégration par parties ? Le choix de u et v me bloque.", 0],
        [2, "L'épreuve portera-t-elle sur les intégrales généralisées ?", 0],
      ];
      for (const [who, question, pinned] of qs) {
        const st = students[who % students.length];
        await run(
          "INSERT INTO live_questions (session_id, user_id, question, pinned, created_at) VALUES (?, ?, ?, ?, datetime('now', '-5 minutes'))",
          liveNow.id,
          st.id,
          question,
          pinned,
        );
      }
    }
  }

  const count = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM live_sessions");
  if (count && count.c > 0) return;

  const liveId = Number(
    (await run(
      `INSERT INTO live_sessions (title, subject_name, tagline, description, category, animator_name, animator_title, status, starts_at, duration_minutes, viewers, gradient)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'live', datetime('now', '-18 minutes'), 45, 1240, 'from-primary to-secondary')`,
      "Mathématiques : Maîtriser les Intégrales Complexes",
      "Mathématiques",
      "Révision Intensive BAC",
      "Session animée par le Dr. Koffi. Astuces pour réussir l'épreuve de mathématiques et résolution de sujets types.",
      "Sciences",
      "Dr. Koffi Kouassi",
      "Expert Mathématiques BAC",
    )).lastInsertRowid,
  );
  const liveStudents = await query<{ id: number; first_name: string; last_name: string }>(
    "SELECT id, first_name, last_name FROM users WHERE role = 'student' ORDER BY id LIMIT 6",
  );
  const chatSeed: [number, string, number][] = [
    [0, "Monsieur, est-ce que l'intégration par parties sera au BAC cette année ?", 2],
    [1, "Super clair le rappel sur les primitives de ln(x) ! Merci.", 1],
    [0, "Pouvez-vous réexpliquer la borne supérieure dans l'intégrale de Chasles ?", 1],
    [2, "+1 j'ai aussi un doute sur ce point là.", 0],
    [3, "Le corrigé du BAC 2023 est disponible quelque part ?", 0],
  ];
  for (let i = 0; i < liveStudents.length; i++) {
    const [who, body, min] = chatSeed[i % chatSeed.length];
    await run(
      "INSERT INTO live_messages (session_id, user_id, body, priority, created_at) VALUES (?, ?, ?, ?, datetime('now', '-' || ? || ' minutes'))",
      liveId,
      liveStudents[who % liveStudents.length].id,
      body,
      min > 1 ? 1 : 0,
      (i + 1) * 2,
    );
  }

  const up1 = Number(
    (await run(
      `INSERT INTO live_sessions (title, subject_name, tagline, description, category, animator_name, animator_title, status, starts_at, duration_minutes, gradient)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'upcoming', datetime('now', '+2 hours', '+15 minutes'), 60, 'from-secondary to-tertiary')`,
      "L'art de l'introduction et de la conclusion",
      "Français",
      "Français - Dissertation",
      "Maîtrisez les techniques d'ouverture et de clôture de dissertation pour impressionner le correcteur.",
      "Littérature",
      "Mme. Yao",
      "Professeure de Lettres Modernes",
    )).lastInsertRowid,
  );
  await run(
    "INSERT INTO live_resources (session_id, title, file_type, size_mb) VALUES (?, ?, 'PDF', 2.4)",
    up1,
    "Fiche méthode - Dissertation",
  );
  await run(
    "INSERT INTO live_resources (session_id, title, file_type, size_mb) VALUES (?, ?, 'PDF', 1.2)",
    up1,
    "Sujets blancs corrigés",
  );

  await run(
    `INSERT INTO live_sessions (title, subject_name, tagline, description, category, animator_name, animator_title, status, starts_at, duration_minutes, gradient)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'upcoming', datetime('now', '+4 hours', '+30 minutes'), 90, 'from-tertiary to-primary')`,
    "Réactions Acido-Basiques et pH-métrie",
    "Physique-Chimie",
    "Physique-Chimie",
    "Des rappels de cours aux exercices de BAC : la pH-métrie n'aura plus de secrets pour toi.",
    "Physique",
    "M. Traoré",
    "Agrégé de Sciences Physiques",
  );

  await run(
    `INSERT INTO live_sessions (title, subject_name, tagline, description, category, animator_name, animator_title, status, starts_at, duration_minutes, gradient)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'upcoming', datetime('now', '+1 days', '+9 hours'), 45, 'from-secondary to-primary')`,
    "Perfecting Your Speaking Skills for BAC",
    "Anglais",
    "Anglais - LV1",
    "Oral practice, common mistakes and tips to score high on the English exam.",
    "Langues",
    "Mr. Smith",
    "English Teacher",
  );

  const replay1 = Number(
    (await run(
      `INSERT INTO live_sessions (title, subject_name, tagline, description, category, animator_name, animator_title, status, starts_at, duration_minutes, viewers, gradient)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'ended', datetime('now', '-6 days', '-2 hours'), 60, 1240, 'from-primary to-tertiary')`,
      "Révision Intensive : Fonctions Logarithmes & Exponentielles",
      "Mathématiques",
      "Mathématiques",
      "Cette session de révision intensive couvre l'intégralité du programme sur les fonctions logarithmes et exponentielles pour le BAC. Nous abordons les propriétés fondamentales, les limites usuelles, et nous résolvons ensemble trois exercices types.",
      "Sciences",
      "Prof. Kouassi",
      "Professeur de Mathématiques",
    )).lastInsertRowid,
  );
  await run(
    "INSERT INTO live_resources (session_id, title, file_type, size_mb) VALUES (?, ?, 'PDF', 2.4)",
    replay1,
    "Support_Cours_Maths_S12.pdf",
  );
  await run(
    "INSERT INTO live_resources (session_id, title, file_type, size_mb) VALUES (?, ?, 'PDF', 1.8)",
    replay1,
    "Exercices_Corriges_S12.pdf",
  );
  const moments1: [string, string][] = [
    ["02:00", "Introduction et rappel du plan de session"],
    ["15:30", "Résolution Problème 1 : Étude de fonction ln(x)"],
    ["28:45", "Astuces pour les limites de l'exponentielle"],
    ["40:10", "Q&A en direct : Réponses aux questions complexes"],
  ];
  for (const [t, label] of moments1) {
    await run("INSERT INTO live_moments (session_id, time_label, label) VALUES (?, ?, ?)", replay1, t, label);
  }
  const q1students = await query<{ id: number }>("SELECT id FROM users WHERE role = 'student' ORDER BY id LIMIT 3");
  const qs1: [number, string, string][] = [
    [0, "Comment dériver une fonction avec une puissance fractionnaire ?", "Utilise la formule (u^n)' = n·u'·u^(n-1) même pour n fractionnaire, en écrivant n = p/q."],
    [1, "La limite de x·e^(-x) en +∞ est bien 0 ?", "Oui : c'est une forme indéterminée levée par croissance comparée. e^(-x) l'emporte sur x."],
    [2, "Peut-on vérifier le tableau de variations avec la calculatrice ?", "Oui, mais le correcteur attend la démarche. La calculatrice sert de contrôle, pas de preuve."],
  ];
  for (let i = 0; i < q1students.length; i++) {
    const [who, q, a] = qs1[i % qs1.length];
    await run(
      "INSERT INTO live_questions (session_id, user_id, question, answer) VALUES (?, ?, ?, ?)",
      replay1,
      q1students[who % q1students.length].id,
      q,
      a,
    );
  }

  const replay2 = Number(
    (await run(
      `INSERT INTO live_sessions (title, subject_name, tagline, description, category, animator_name, animator_title, status, starts_at, duration_minutes, viewers, gradient)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'ended', datetime('now', '-12 days', '-3 hours'), 55, 860, 'from-tertiary to-secondary')`,
      "SVT : La Génétique pas à pas",
      "SVT",
      "SVT",
      "Codominance, groupes sanguins, arbres généalogiques : la génétique enfin simple, avec des exercices du BEPC et du BAC.",
      "SVT",
      "Mme. Diabaté",
      "Professeure de SVT",
    )).lastInsertRowid,
  );
  await run(
    "INSERT INTO live_resources (session_id, title, file_type, size_mb) VALUES (?, ?, 'PDF', 3.1)",
    replay2,
    "Fiche_Genetique_BAC.pdf",
  );
  const moments2: [string, string][] = [
    ["01:30", "Les lois de Mendel en 5 minutes"],
    ["12:10", "Échiquier de croisement : méthode pas à pas"],
    ["25:00", "Exercice type BAC : groupes sanguins"],
    ["38:40", "Pièges classiques à éviter"],
  ];
  for (const [t, label] of moments2) {
    await run("INSERT INTO live_moments (session_id, time_label, label) VALUES (?, ?, ?)", replay2, t, label);
  }
}

async function seedLigueChallenges() {
  const defs: [string, string, string, string, string, string, number, string, string, string][] = [
    ["bronze", "Premiers Pas", "flag", "primary", "Termine 3 quiz pour lancer ta progression dans la ligue.", "quiz_done", 3, "xp", "50 XP", "50"],
    ["bronze", "Sans Faute", "workspace_premium", "impact-emerald", "Réussis un quiz avec un score parfait de 100 %.", "quiz_perfect", 1, "xp", "100 XP", "100"],
    ["argent", "Marathon de Maths", "functions", "primary", "Réalise 10 quiz d'un coup sans faire de pause pour prouver ton endurance.", "quiz_done", 10, "xp", "200 XP", "200"],
    ["argent", "Expert en Français", "translate", "expert-purple", "Réussis 3 quiz avec un score parfait de 100 %.", "quiz_perfect", 3, "badge", "Trophée Bronze", "ligue_expert"],
    ["argent", "Aide aux Novices", "groups", "impact-emerald", "Aide 5 étudiants dans le forum communautaire en répondant à leurs questions.", "forum_replies", 5, "badge", "Badge Spécial", "ligue_mentor"],
    ["or", "Maître de l'Analyse", "calculate", "validation-amber", "Réussis 5 quiz parfaits pour dominer la Ligue Or.", "quiz_perfect", 5, "badge", "Badge Maître", "ligue_master"],
    ["or", "Légende de la Ligue", "emoji_events", "primary", "Cumule 800 XP pendant ton temps en Ligue Or.", "xp_total", 800, "xp", "500 XP", "500"],
    ["diamant", "Élite Intellectuelle", "diamond", "expert-purple", "Cumule 1 500 XP pendant ton temps en Ligue Diamant.", "xp_total", 1500, "xp", "750 XP", "750"],
    ["maitre", "Légende Éternelle", "workspace_premium", "validation-amber", "Cumule 3 000 XP au sommet de la hiérarchie académique.", "xp_total", 3000, "xp", "1 500 XP", "1500"],
  ];
  for (const [ligue, title, icon, color, description, goalType, goalValue, rewardType, rewardLabel, rewardValue] of defs) {
    const exists = await queryOne<{ c: number }>(
      "SELECT COUNT(*) AS c FROM league_challenges WHERE ligue = ? AND title = ?",
      ligue,
      title,
    );
    if (exists && exists.c > 0) continue;
    await run(
      "INSERT INTO league_challenges (ligue, title, icon, color, description, goal_type, goal_value, reward_type, reward_label, reward_value) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      ligue, title, icon, color, description, goalType, goalValue, rewardType, rewardLabel, rewardValue,
    );
  }
}

async function seedMENAET() {
  const count = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM subjects");
  if (count && count.c > 0) return;

  const grades: [string, string, string, number][] = [
    ["6eme", "Sixième", "college", 1],
    ["5eme", "Cinquième", "college", 2],
    ["4eme", "Quatrième", "college", 3],
    ["3eme", "Troisième", "college", 4],
    ["2nde", "Seconde", "lycee", 5],
    ["1ere_s", "Première S", "lycee", 6],
    ["1ere_l", "Première L", "lycee", 6],
    ["1ere_es", "Première ES", "lycee", 6],
    ["term_s", "Terminale S", "lycee", 7],
    ["term_l", "Terminale L", "lycee", 7],
    ["term_es", "Terminale ES", "lycee", 7],
  ];
  for (const [code, name, cycle, order] of grades) {
    await run("INSERT INTO grades (code, name, cycle, order_index) VALUES (?, ?, ?, ?)", code, name, cycle, order);
  }

  const subjects: [string, string, string, string, string][] = [
    ["maths", "Mathématiques", "functions", "#1976d2", '{"6eme":2,"5eme":2,"4eme":2,"3eme":3,"2nde":4,"1ere_s":5,"term_s":6}'],
    ["pc", "Physique-Chimie", "science", "#d32f2f", '{"3eme":2,"2nde":3,"1ere_s":4,"term_s":5}'],
    ["svt", "SVT", "biotech", "#388e3c", '{"3eme":2,"2nde":2,"1ere_s":3,"term_s":4}'],
    ["francais", "Français", "menu_book", "#7b1fa2", '{"6eme":3,"5eme":3,"4eme":3,"3eme":4,"2nde":4,"1ere_s":3,"1ere_l":5,"term_s":2,"term_l":5}'],
    ["hg", "Histoire-Géo", "public", "#f57c00", '{"6eme":2,"5eme":2,"4eme":2,"3eme":3,"2nde":3,"1ere_s":2,"1ere_l":3,"term_s":2,"term_l":4}'],
    ["anglais", "Anglais", "translate", "#00796b", '{"6eme":2,"5eme":2,"4eme":2,"3eme":3,"2nde":3,"1ere_s":2,"1ere_l":3,"term_s":2,"term_l":3}'],
    ["philo", "Philosophie", "psychology", "#5d4037", '{"term_s":2,"term_l":7,"term_es":4}'],
  ];
  for (const [code, name, icon, color, coeff] of subjects) {
    await run("INSERT INTO subjects (code, name, icon, color, coefficient_json) VALUES (?, ?, ?, ?, ?)", code, name, icon, color, coeff);
  }

  const mathsId = (await queryOne<{id:number}>("SELECT id FROM subjects WHERE code='maths'"))!.id;
  const pcId = (await queryOne<{id:number}>("SELECT id FROM subjects WHERE code='pc'"))!.id;
  const svtId = (await queryOne<{id:number}>("SELECT id FROM subjects WHERE code='svt'"))!.id;
  const frId = (await queryOne<{id:number}>("SELECT id FROM subjects WHERE code='francais'"))!.id;
  const hgId = (await queryOne<{id:number}>("SELECT id FROM subjects WHERE code='hg'"))!.id;
  const enId = (await queryOne<{id:number}>("SELECT id FROM subjects WHERE code='anglais'"))!.id;
  const phId = (await queryOne<{id:number}>("SELECT id FROM subjects WHERE code='philo'"))!.id;

  const chapters: [number, string, string, string, string, number][] = [
    [mathsId, "term_s", "suites", "Suites numériques", "Suites arithmétiques, géométriques, limite, convergence", 1],
    [mathsId, "term_s", "fonctions", "Fonctions usuelles", "Exponentielle, logarithme, trigonométriques, dérivées", 2],
    [mathsId, "term_s", "derivees", "Dérivées et études de fonctions", "Règles de dérivation, variations, tangentes", 3],
    [mathsId, "term_s", "integrales", "Intégrales", "Primitives, intégrales définies, intégration par parties", 4],
    [mathsId, "term_s", "probabilites", "Probabilités", "Loi binomiale, loi normale, variables aléatoires", 5],
    [mathsId, "1ere_s", "derivees", "Dérivation", "Nombre dérivé, dérivée, opérations", 1],
    [mathsId, "1ere_s", "suites", "Suites", "Arithmético-géométriques, convergence", 2],
    [mathsId, "1ere_s", "fonctions", "Fonctions de référence", "Carré, inverse, racine, exponentielle", 3],
    [mathsId, "1ere_s", "probabilites", "Probabilités conditionnelles", "Arbre, loi binomiale, indépendance", 4],
    [pcId, "term_s", "chimie", "Chimie organique", "Fonctions carbonylées, esters, acides, polymères", 1],
    [pcId, "term_s", "electrochimie", "Électrochimie", "Piles, électrolyse, équation de Nernst", 2],
    [pcId, "term_s", "mecanique", "Mécanique", "Cinématique, dynamique, énergie, oscillateurs", 3],
    [pcId, "1ere_s", "chimie", "Transformations chimiques", "Vitesse, équilibre, quotient de réaction", 1],
    [pcId, "1ere_s", "ondes", "Ondes mécaniques", "Ondes progressives, stationnaires, interférences", 2],
    [svtId, "term_s", "genetique", "Génétique", "Méiose, croisements, groupes sanguins, arbres", 1],
    [svtId, "term_s", "evolution", "Évolution", "Sélection naturelle, spéciation, phylogénie", 2],
    [svtId, "term_s", "geologie", "Géologie interne", "Plaques, séismes, volcanisme, structure Terre", 3],
    [svtId, "1ere_s", "cellule", "Cellule et métabolisme", "Respiration, photosynthèse, division cellulaire", 1],
    [frId, "term_s", "litterature", "Littérature XIXe-XXIe", "Romantisme, réalisme, surréalisme, contemporain", 1],
    [frId, "term_s", "dissertation", "Méthodologie dissertation", "Analyse sujet, plan, introduction, développement", 2],
    [frId, "term_l", "litterature", "Littérature approfondie", "Études d'œuvres intégrales, commentaires", 1],
    [hgId, "term_s", "monde", "Le monde depuis 1945", "Guerre froide, décolonisation, mondialisation", 1],
    [hgId, "term_l", "monde", "Histoire du XXe siècle", "Totalitarismes, guerres, construction européenne", 1],
    [enId, "term_s", "expression", "Expression écrite/oraire", "Essay, summary, oral presentation", 1],
    [phId, "term_s", "sujet", "Sujet, conscience, liberté", "Cogito, inconscient, déterminisme", 1],
    [phId, "term_l", "verite", "Vérité, savoir, croyance", "Critères de vérité, scientificité", 1],
  ];
  for (const [subjectId, gradeCode, code, title, desc, order] of chapters) {
    const gradeId = (await queryOne<{id:number}>("SELECT id FROM grades WHERE code=?", gradeCode))!.id;
    await run(
      "INSERT INTO chapters (subject_id, grade_id, code, title, description, order_index, officiel_ref) VALUES (?, ?, ?, ?, ?, ?, ?)",
      subjectId, gradeId, code, title, desc, order, `BO MENAET 2023 - ${subjectId}-${gradeCode}`
    );
  }

  console.log("MENAET seed completed: grades, subjects, chapters inserted");
}

async function ensureSubscriptionPlans() {
  const DECOUVERTE_FEATURES = [
    "Accès à 10 fiches de révision / mois",
    "5 questions par mois à Kora IA",
    "Simulateur d'examen (Accès limité)",
  ].join("\n");
  const REUSSITE_FEATURES = [
    "Accès illimité à toutes les fiches",
    "30 questions par mois à Kora IA",
    "Simulateur complet + Correction détaillée",
    "Support prioritaire par nos professeurs",
  ].join("\n");
  const REUSSITE_QUARTER_FEATURES = [
    "Accès illimité à toutes les fiches",
    "100 questions par trimestre à Kora IA",
    "Simulateur complet + Correction détaillée",
    "Support prioritaire par nos professeurs",
  ].join("\n");

  const legacyMonthly = await queryOne<{ id: number }>(
    "SELECT id FROM subscription_plans WHERE name = 'Pass Premium Mensuel'",
  );
  const legacyQuarter = await queryOne<{ id: number }>(
    "SELECT id FROM subscription_plans WHERE name = 'Pass Premium Trimestriel'",
  );

  let reussite = legacyMonthly;
  if (legacyMonthly) {
    await run(
      "UPDATE subscription_plans SET name = 'Réussite', interval = 'month', price_cents = 4900, currency = 'XOF', features = ?, sort_order = 1 WHERE id = ?",
      REUSSITE_FEATURES,
      legacyMonthly.id,
    );
  } else {
    reussite = await queryOne<{ id: number }>("SELECT id FROM subscription_plans WHERE name = 'Réussite'");
    if (reussite) {
      await run(
        "UPDATE subscription_plans SET interval = 'month', price_cents = 4900, currency = 'XOF', features = ?, sort_order = 1 WHERE id = ?",
        REUSSITE_FEATURES,
        reussite.id,
      );
    } else {
      await run(
        "INSERT INTO subscription_plans (name, interval, price_cents, currency, features, sort_order) VALUES (?, 'month', 4900, 'XOF', ?, 1)",
        "Réussite",
        REUSSITE_FEATURES,
      );
    }
  }

  // Déduplication : retire les doublons mal-encodés du plan mensuel
  // (ex: « Réussite é ») pour ne garder qu'UN plan « Réussite » canonique.
  const canonicalReussiteId = reussite?.id ?? legacyMonthly?.id;
  if (canonicalReussiteId) {
    const dupes = await query<{ id: number; name: string }>(
      "SELECT id, name FROM subscription_plans WHERE interval = 'month' AND price_cents = 4900 AND sort_order = 1 AND id != ?",
      canonicalReussiteId,
    );
    for (const d of dupes) {
      await run("UPDATE subscriptions SET plan_id = ? WHERE plan_id = ?", canonicalReussiteId, d.id);
      await run("DELETE FROM subscription_plans WHERE id = ?", d.id);
      console.log(`[init] plan doublon supprimé (${d.id}: ${JSON.stringify(d.name)}) — ré-orienté vers « Réussite » (#${canonicalReussiteId})`);
    }
  }

  let quarter: { id: number } | null = legacyQuarter ?? null;
  if (legacyQuarter) {
    const refs = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM subscriptions WHERE plan_id = ?", legacyQuarter.id);
    if (!refs || Number(refs.c) === 0) {
      await run("DELETE FROM subscription_plans WHERE id = ?", legacyQuarter.id);
      quarter = null;
    } else {
      await run(
        "UPDATE subscription_plans SET name = 'Réussite Trimestriel', interval = 'quarter', price_cents = 14700, currency = 'XOF', features = ?, sort_order = 2 WHERE id = ?",
        REUSSITE_QUARTER_FEATURES,
        legacyQuarter.id,
      );
    }
  }
  if (!quarter) {
    const existingQuarter = await queryOne<{ id: number }>("SELECT id FROM subscription_plans WHERE name = 'Réussite Trimestriel'");
    if (existingQuarter) {
      await run(
        "UPDATE subscription_plans SET interval = 'quarter', price_cents = 14700, currency = 'XOF', features = ?, sort_order = 2 WHERE id = ?",
        REUSSITE_QUARTER_FEATURES,
        existingQuarter.id,
      );
    } else {
      await run(
        "INSERT INTO subscription_plans (name, interval, price_cents, currency, features, sort_order) VALUES (?, 'quarter', 14700, 'XOF', ?, 2)",
        "Réussite Trimestriel",
        REUSSITE_QUARTER_FEATURES,
      );
    }
  }

  const decouverte = await queryOne<{ id: number }>("SELECT id FROM subscription_plans WHERE name = 'Découverte'");
  if (decouverte) {
    await run(
      "UPDATE subscription_plans SET interval = 'month', price_cents = 0, currency = 'XOF', features = ?, sort_order = 0 WHERE id = ?",
      DECOUVERTE_FEATURES,
      decouverte.id,
    );
  } else {
    await run(
      "INSERT INTO subscription_plans (name, interval, price_cents, currency, features, sort_order) VALUES (?, 'month', 0, 'XOF', ?, 0)",
      "Découverte",
      DECOUVERTE_FEATURES,
    );
  }

  console.log("Subscription plans ensured: Découverte (0 FCFA), Réussite (4 900 FCFA/mois, 30 questions IA), Réussite Trimestriel (14 700 FCFA/trimestre, 100 questions IA)");
}

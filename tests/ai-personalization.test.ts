import { checkAIRateLimit, getAIMaxDaily, getAIMaxPerMinute } from "@/lib/ai/rate-limit";
import { buildMemoryPromptBlock, buildStudentMemory, type StudentMemory } from "@/lib/ai/memory";
import { run, queryOne } from "@/lib/db";

const realEnv: Record<string, string | undefined> = { ...process.env };
const managedKeys = new Set<string>();

function setEnv(values: Record<string, string | undefined>) {
  for (const key of managedKeys) delete process.env[key];
  managedKeys.clear();
  for (const [k, v] of Object.entries(values)) {
    managedKeys.add(k);
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
}

describe("ai rate-limit", () => {
  afterEach(async () => {
    setEnv(realEnv);
    await run("DELETE FROM rate_limits WHERE key LIKE 'ai:%'");
  });

  it("reads config from env with defaults", () => {
    setEnv({});
    expect(getAIMaxPerMinute()).toBe(10);
    expect(getAIMaxDaily()).toBe(100);
    setEnv({ AI_MAX_REQUESTS_PER_MINUTE: "3", AI_MAX_DAILY_REQUESTS: "50" });
    expect(getAIMaxPerMinute()).toBe(3);
    expect(getAIMaxDaily()).toBe(50);
    setEnv({ AI_MAX_REQUESTS_PER_MINUTE: "0", AI_MAX_DAILY_REQUESTS: "abc" });
    expect(getAIMaxPerMinute()).toBe(10);
    expect(getAIMaxDaily()).toBe(100);
  });

  it("allows requests under the limit", async () => {
    setEnv({ AI_MAX_REQUESTS_PER_MINUTE: "3", AI_MAX_DAILY_REQUESTS: "100" });
    const r1 = await checkAIRateLimit(`test-${Date.now()}`);
    expect(r1.allowed).toBe(true);
    expect(r1.remainingMinute).toBe(2);
  });

  it("blocks after per-minute limit", async () => {
    setEnv({ AI_MAX_REQUESTS_PER_MINUTE: "2", AI_MAX_DAILY_REQUESTS: "100" });
    const key = `test-${Date.now()}`;
    const r1 = await checkAIRateLimit(key);
    const r2 = await checkAIRateLimit(key);
    const r3 = await checkAIRateLimit(key);
    expect(r1.allowed).toBe(true);
    expect(r2.allowed).toBe(true);
    expect(r3.allowed).toBe(false);
    expect(r3.remainingMinute).toBe(0);
  });

  it("blocks after daily limit", async () => {
    setEnv({ AI_MAX_REQUESTS_PER_MINUTE: "100", AI_MAX_DAILY_REQUESTS: "2" });
    const key = `test-${Date.now()}`;
    const r1 = await checkAIRateLimit(key);
    const r2 = await checkAIRateLimit(key);
    const r3 = await checkAIRateLimit(key);
    expect(r1.allowed).toBe(true);
    expect(r2.allowed).toBe(true);
    expect(r3.allowed).toBe(false);
  });

  it("keeps separate counters per subject", async () => {
    setEnv({ AI_MAX_REQUESTS_PER_MINUTE: "1", AI_MAX_DAILY_REQUESTS: "100" });
    const key = `test-${Date.now()}`;
    const r1 = await checkAIRateLimit(`${key}-a`);
    const r2 = await checkAIRateLimit(`${key}-b`);
    expect(r1.allowed).toBe(true);
    expect(r2.allowed).toBe(true);
    const r3 = await checkAIRateLimit(`${key}-a`);
    expect(r3.allowed).toBe(false);
  });
});

describe("student memory", () => {
  afterEach(async () => {
    await cleanupSeed();
  });

  async function cleanupSeed() {
    await run("DELETE FROM lesson_reads WHERE user_id = 4242");
    await run("DELETE FROM user_progress WHERE user_id = 4242");
    await run("DELETE FROM lessons WHERE title IN ('La dérivée', 'La cellule')");
    await run(
      "DELETE FROM quizzes WHERE chapter_id IN (SELECT id FROM chapters WHERE code IN ('C1', 'C2'))",
    );
    await run("DELETE FROM chapters WHERE code IN ('C1', 'C2')");
    await run("DELETE FROM subjects WHERE code IN ('PMATHS', 'PSVT')");
    await run("DELETE FROM users WHERE id = 4242");
  }

  async function seedUserData() {
    await cleanupSeed();
    await run(
      "INSERT INTO users (id, password_hash, first_name, last_name) VALUES (4242, 'x', 'Aya', 'Koné')",
    );
    await run(
      "INSERT INTO subjects (code, name, icon, color) VALUES ('PMATHS', 'Mathématiques', 'functions', '#1976d2'), ('PSVT', 'SVT', 'biotech', '#2e7d32')",
    );
    const subjects = (await queryOne<{ id: number }>("SELECT id FROM subjects WHERE code = 'PMATHS'"))!;
    const svt = (await queryOne<{ id: number }>("SELECT id FROM subjects WHERE code = 'PSVT'"))!;
    await run("INSERT INTO chapters (subject_id, grade_id, code, title) VALUES (?, 1, 'C1', 'Fonctions')", subjects.id);
    await run("INSERT INTO chapters (subject_id, grade_id, code, title) VALUES (?, 1, 'C2', 'Biologie')", svt.id);
    const ch1 = (await queryOne<{ id: number }>("SELECT id FROM chapters WHERE code = 'C1'"))!;
    const ch2 = (await queryOne<{ id: number }>("SELECT id FROM chapters WHERE code = 'C2'"))!;
    await run(
      "INSERT INTO lessons (chapter_id, title, summary, duration_min, difficulty, is_premium, position) VALUES (?, 'La dérivée', 'Résumé dérivée', 15, 1, 0, 1), (?, 'La cellule', 'Résumé cellule', 15, 1, 0, 1)",
      ch1.id,
      ch2.id,
    );
    const l1 = (await queryOne<{ id: number }>("SELECT id FROM lessons WHERE title = 'La dérivée'"))!;
    const l2 = (await queryOne<{ id: number }>("SELECT id FROM lessons WHERE title = 'La cellule'"))!;
    return { userId: 4242, l1: l1.id, l2: l2.id, mathsId: subjects.id, svtId: svt.id };
  }

  it("builds memory from lesson reads and progress", async () => {
    const { userId, l1, l2, mathsId } = await seedUserData();
    await run("INSERT INTO lesson_reads (user_id, lesson_id) VALUES (?, ?), (?, ?)", userId, l1, userId, l2);
    await run("INSERT INTO user_progress (user_id, lesson_id, completed, time_spent_min) VALUES (?, ?, 0, 12)", userId, l1);

    const memory = await buildStudentMemory(userId);
    expect(memory.recentLessons.length).toBe(2);
    expect(memory.recentLessons[0].title).toBe("La dérivée");
    expect(memory.recentLessons[0].subjectName).toBe("Mathématiques");
    expect(memory.inProgress.length).toBe(1);
    expect(memory.inProgress[0].title).toBe("La dérivée");
    expect(memory.favoriteSubjectIds).toContain(mathsId);
  });

  it("returns empty memory for unknown user", async () => {
    const memory = await buildStudentMemory(999999);
    expect(memory.recentLessons).toEqual([]);
    expect(memory.inProgress).toEqual([]);
    expect(memory.favoriteSubjectIds).toEqual([]);
  });

  it("buildMemoryPromptBlock formats and hides internals", () => {
    const memory: StudentMemory = {
      recentLessons: [{ lessonId: 1, title: "La dérivée", chapterId: 1, subjectId: 1, subjectName: "Mathématiques" }],
      inProgress: [],
      favoriteSubjectIds: [1],
      favoriteSubjectNames: ["Mathématiques"],
    };
    const block = buildMemoryPromptBlock(memory);
    expect(block).toContain("Mémoire pédagogique de l'élève");
    expect(block).toContain("La dérivée");
    expect(block).toContain("Mathématiques");
    expect(block).not.toContain("undefined");
    expect(block).not.toContain("Mémoire »");
  });

  it("returns empty block without data", () => {
    const empty: StudentMemory = {
      recentLessons: [],
      inProgress: [],
      favoriteSubjectIds: [],
      favoriteSubjectNames: [],
    };
    expect(buildMemoryPromptBlock(empty)).toBe("");
  });
});

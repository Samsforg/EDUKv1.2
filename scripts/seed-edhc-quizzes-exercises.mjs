import { readFileSync, writeFileSync } from "node:fs";
import { EDHC_QUIZZES, EDHC_EXERCISES } from "./edhc-quiz-data.mjs";
import { EDHC_SUBJECT_ID, EDHC_GRADES } from "./edhc-content-data.mjs";

const BASE = "https://edukora.net";
const CREDS = readFileSync(process.env.TEMP + "/opencode/qa-admin-creds.txt", "utf8").trim().split(/\r?\n/);

async function api(path, opts = {}) {
  const res = await fetch(BASE + path, opts);
  const text = await res.text();
  let body = null;
  try { body = JSON.parse(text); } catch { body = text; }
  return { status: res.status, body };
}

async function main() {
  const loginRes = await fetch(BASE + "/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier: CREDS[0], password: CREDS[1] }),
    redirect: "manual",
  });
  const cookie = (loginRes.headers.get("set-cookie") || "").split(";")[0];
  if (!cookie) {
    console.error("LOGIN FAILED", loginRes.status, await loginRes.text());
    process.exit(1);
  }
  const auth = { "Content-Type": "application/json", Cookie: cookie };

  const chapterMap = new Map();
  for (const grade of EDHC_GRADES) {
    const r = await api(`/api/cours/EDHC/${grade.code}`, { headers: { Cookie: cookie } });
    if (r.status === 200 && Array.isArray(r.body?.chapters)) {
      for (const c of r.body.chapters) chapterMap.set(c.code, c.id);
      console.log(`[${grade.code}] ${r.body.chapters.length} chapitres mappés`);
    } else {
      console.error(`MAP FAIL ${grade.code}: ${r.status} ${JSON.stringify(r.body)}`);
      process.exit(1);
    }
  }

  const existingQuizzes = new Map();
  const qr = await api("/api/quiz", { headers: { Cookie: cookie } });
  if (qr.status === 200 && Array.isArray(qr.body?.quizzes)) {
    for (const q of qr.body.quizzes) existingQuizzes.set(q.title, q);
  }

  const stats = { quizzes: 0, quizzesExisting: 0, questions: 0, exercises: 0, exerciseGroups: 0 };
  const log = [];

  for (const quiz of EDHC_QUIZZES) {
    const chapterId = chapterMap.get(quiz.chapterCode);
    if (!chapterId) {
      console.error(`QUIZ FAIL: chapitre introuvable pour code « ${quiz.chapterCode} »`);
      process.exit(1);
    }
    const prev = existingQuizzes.get(quiz.title);
    let quizId;
    if (prev) {
      quizId = prev.id;
      stats.quizzesExisting++;
      log.push(`QUIZ #${quizId} (existant) — ${quiz.title}`);
      console.log(`= quiz existant ${quizId} « ${quiz.title} »`);
    } else {
      const r = await api("/api/admin/content/quiz", {
        method: "POST",
        headers: auth,
        body: JSON.stringify({ subject_id: EDHC_SUBJECT_ID, title: quiz.title, level: quiz.level, chapter_id: chapterId }),
      });
      if (r.status !== 201) {
        console.error(`QUIZ FAIL ${quiz.title}: ${r.status} ${JSON.stringify(r.body)}`);
        process.exit(1);
      }
      quizId = r.body.id;
      stats.quizzes++;
      log.push(`QUIZ #${quizId} — ${quiz.title}`);
      console.log(`+ quiz ${quizId} « ${quiz.title} » (chapitre ${chapterId})`);
    }

    const qr2 = await api("/api/admin/content/questions", {
      method: "POST",
      headers: auth,
      body: JSON.stringify({ quiz_id: quizId, questions: quiz.questions }),
    });
    if (!qr2.body?.ok) {
      console.error(`QUESTIONS FAIL ${quiz.title}: ${qr2.status} ${JSON.stringify(qr2.body)}`);
      process.exit(1);
    }
    stats.questions += quiz.questions.length;
    console.log(`  + ${quiz.questions.length} questions`);
  }

  const lessonCache = new Map();
  const groups = new Map();
  for (const g of EDHC_EXERCISES) {
    if (!groups.has(g.chapterCode)) groups.set(g.chapterCode, []);
    groups.get(g.chapterCode).push(g);
  }

  for (const [chapterCode, group] of groups) {
    const chapterId = chapterMap.get(chapterCode);
    if (!chapterId) {
      console.error(`EXERCISE FAIL: chapitre introuvable pour code « ${chapterCode} »`);
      process.exit(1);
    }
    let lessons = lessonCache.get(chapterId);
    if (!lessons) {
      const r = await api(`/api/cours/chapitres/${chapterId}/lecons`, { headers: { Cookie: cookie } });
      if (r.status === 200 && Array.isArray(r.body?.lessons)) {
        lessons = r.body.lessons;
        lessonCache.set(chapterId, lessons);
      } else {
        console.error(`LESSONS FAIL chap ${chapterId}: ${r.status} ${JSON.stringify(r.body)}`);
        process.exit(1);
      }
    }
    const byTitle = new Map(lessons.map((l) => [l.title, l.id]));
    for (const g of group) {
      const lessonId = byTitle.get(g.lessonTitle);
      if (!lessonId) {
        console.error(`EXERCISE FAIL: leçon introuvable « ${g.lessonTitle} » (chapitre ${chapterCode})`);
        process.exit(1);
      }
      const r = await api("/api/admin/content/exercise", {
        method: "POST",
        headers: auth,
        body: JSON.stringify({ lesson_id: lessonId, exercises: g.exercises }),
      });
      if (!r.body?.ok) {
        console.error(`EXERCISE FAIL « ${g.lessonTitle} »: ${r.status} ${JSON.stringify(r.body)}`);
        process.exit(1);
      }
      stats.exercises += g.exercises.length;
      stats.exerciseGroups++;
      console.log(`+ ${g.exercises.length} exercices → leçon ${lessonId} « ${g.lessonTitle} »`);
    }
  }

  console.log("\n=== RÉSUMÉ ===");
  console.log(JSON.stringify(stats, null, 2));
  writeFileSync(
    "scripts/edhc-quiz-seed-report.json",
    JSON.stringify({ at: new Date().toISOString(), stats, created: log }, null, 2)
  );
}

main().catch((e) => { console.error(e); process.exit(1); });
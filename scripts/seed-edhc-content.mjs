import { readFileSync } from "node:fs";
import { EDHC_CONTENT, EDHC_SUBJECT_ID } from "./edhc-content-data.mjs";

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
  const cookieRaw = (loginRes.headers.get("set-cookie") || "").split(";")[0];
  if (!cookieRaw) {
    console.error("LOGIN FAILED", loginRes.status, await loginRes.text());
    process.exit(1);
  }
  const cookie = cookieRaw;

  const stats = { chapters: 0, lessons: 0, skippedLevels: 0, skippedChapters: 0 };
  const log = [];

  for (const grade of EDHC_CONTENT) {
    const existing = await getExistingChapters(grade, cookie);
    if (existing && existing.length > 0) {
      console.log(`[6eme/5eme/4eme/3eme] ${grade.gradeName}: SKIP (déjà ${existing.length} chapitres EDHC existants)`);
      stats.skippedLevels++;
      continue;
    }

    for (const ch of grade.chapters) {
      const r = await api("/api/admin/content/chapter", {
        method: "POST",
        headers: { "Content-Type": "application/json", Cookie: cookie },
        body: JSON.stringify({
          subject_id: EDHC_SUBJECT_ID,
          grade_id: grade.gradeId,
          code: ch.code,
          title: ch.title,
          description: ch.description,
          order_index: 0,
          position: 0,
        }),
      });
      if (r.status !== 201) {
        console.error(`CHAPITER FAIL ${grade.gradeName} / ${ch.code}: ${r.status} ${JSON.stringify(r.body)}`);
        process.exit(1);
      }
      const chapterId = r.body.id;
      stats.chapters++;
      log.push(`CHAPITRE #${chapterId} ${grade.gradeName} — ${ch.title}`);
      console.log(`+ chapitre ${chapterId} « ${ch.title} » (${grade.gradeName})`);

      for (const [i, lesson] of ch.lessons.entries()) {
        const lr = await api("/api/admin/content/lesson", {
          method: "POST",
          headers: { "Content-Type": "application/json", Cookie: cookie },
          body: JSON.stringify({
            chapter_id: chapterId,
            title: lesson.title,
            summary: lesson.summary,
            content_md: lesson.contentMd,
            video_url: "",
            duration_min: 15,
            difficulty: lesson.difficulty ?? 1,
            is_premium: 0,
            position: i,
          }),
        });
        if (lr.status !== 201) {
          console.error(`LEÇON FAIL ${grade.gradeName}/${lesson.title}: ${lr.status} ${JSON.stringify(lr.body)}`);
          process.exit(1);
        }
        stats.lessons++;
        log.push(`LEÇON #${lr.body.id} ${grade.gradeName} — ${lesson.title}`);
        console.log(`  + leçon ${lr.body.id} « ${lesson.title} »`);
      }
    }
  }

  console.log("\n=== RÉSUMÉ ===");
  console.log(JSON.stringify(stats, null, 2));
  const t = new Date().toISOString();
  await handleReport(log, stats, t);
}

function loginToCookie(_login) {
  return null;
}

async function getExistingChapters(grade, cookie) {
  const r = await api(`/api/cours/EDHC/${grade.gradeCode}`, { headers: { Cookie: cookie } });
  if (r.status === 200 && Array.isArray(r.body?.chapters)) return r.body.chapters;
  console.error(`CHECK FAIL ${grade.gradeName}: ${r.status} ${JSON.stringify(r.body)}`);
  return [];
}

async function handleReport(log, stats, t) {
  const fs = await import("node:fs");
  fs.writeFileSync(
    "scripts/edhc-seed-report.json",
    JSON.stringify({ at: t, stats, created: log }, null, 2)
  );
}

main().catch((e) => { console.error(e); process.exit(1); });
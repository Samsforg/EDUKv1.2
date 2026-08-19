const BASE = process.env.QA_BASE ?? "http://localhost:3108";
const TMP = process.env.TEMP || process.env.TMP || "/tmp";
const stateFile = `${TMP}\\opencode\\qa-prof-state.json`;

import { readFileSync, writeFileSync, existsSync } from "node:fs";

let cookie = "";
let quiet = false;

async function api(path, opts = {}) {
  const headers = { ...(opts.headers ?? {}) };
  if (cookie) headers.Cookie = cookie;
  if (opts.body) headers["Content-Type"] = "application/json";
  const res = await fetch(BASE + path, { ...opts, headers, redirect: "manual" });
  const setCk = res.headers.get("set-cookie");
  if (setCk) cookie = setCk.split(";")[0];
  let data = null;
  try {
    data = await res.json();
  } catch {}
  return { status: res.status, data };
}

function ok(name, cond, extra = "") {
  const mark = cond ? "PASS" : "FAIL";
  console.log(`  [${mark}] ${name}${extra ? " — " + extra : ""}`);
  if (!cond) process.exitCode = 1;
}

async function ensureTeacher() {
  const email = `prof-qa-${Date.now()}@mailtest.fr`;
  const r = await api("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      role: "teacher",
      email,
      phone: `07${String(Date.now()).slice(-8)}`,
      password: "Test@1234",
      first_name: "Prof",
      last_name: "QA",
      accept_privacy: true,
    }),
  });
  console.log("register status:", r.status, JSON.stringify(r.data));
  if (r.status !== 201) throw new Error("register échoué: " + r.status);
  if (r.data.user?.role !== "teacher") throw new Error("role non teacher: " + JSON.stringify(r.data));
  const login = await api("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ identifier: email, password: "Test@1234" }),
  });
  if (login.status !== 200) throw new Error("login échoué: " + login.status);
  return r.data;
}

async function main() {
  console.log("QA disciplines professeur — base", BASE);
  const me = await ensureTeacher();
  console.log("Professeur créé:", me.user.id, me.user.email);

  const subs = await api("/api/subjects");
  ok("GET /api/subjects", subs.status === 200, `(${subs.data?.subjects?.length} matières)`);
  const s = subs.data.subjects.map((x) => x.id);
  const grs = await api("/api/grades");
  const g = grs.data.grades[0].id;

  const profBefore = await api("/api/prof/subjects");
  ok("GET /api/prof/subjects vide au départ", profBefore.status === 200 && profBefore.data.subjects.length === 0);

  const gradesBefore = await api("/api/prof/grades");
  ok("GET /api/prof/grades vide au départ", gradesBefore.status === 200 && gradesBefore.data.grades.length === 0);
  const g1 = grs.data.grades[0].id;
  const g2 = grs.data.grades[1].id;

  const cls1 = await api("/api/prof/classes", {
    method: "POST",
    body: JSON.stringify({ name: "Terminale C1", subject_id: s[0], grade_id: null }),
  });
  ok("POST /api/prof/classes (1ère classe, auto-bind matière)", cls1.status === 201, `id=${cls1.data?.id}`);

  const after = await api("/api/prof/subjects");
  ok("GET /api/prof/subjects contient la matière après création", after.status === 200 && after.data.subjects.some((x) => x.subject_id === s[0]));

  const gradesAfterCls = await api("/api/prof/grades");
  ok("GET /api/prof/grades toujours vide (classe sans niveau)", gradesAfterCls.status === 200 && gradesAfterCls.data.grades.length === 0);

  const cls2 = await api("/api/prof/classes", {
    method: "POST",
    body: JSON.stringify({ name: "Autre matière", subject_id: s[1], grade_id: null }),
  });
  ok("POST /api/prof/classes autre matière → 403", cls2.status === 403, cls2.data?.error ?? "");

  const chWrong = await api("/api/prof/chapter", {
    method: "POST",
    body: JSON.stringify({ subject_id: s[1], grade_id: g, title: "Chapitre hors discipline" }),
  });
  ok("POST /api/prof/chapter hors discipline → 403", chWrong.status === 403, chWrong.data?.error ?? "");

  const codeBase = `QA${Date.now().toString().slice(-6)}`;
  const ch1 = await api("/api/prof/chapter", {
    method: "POST",
    body: JSON.stringify({ subject_id: s[0], grade_id: g, code: codeBase + "A", title: "Chapitre disci" }),
  });
  ok("POST /api/prof/chapter dans sa discipline → 201", ch1.status === 201, `id=${ch1.data?.id}`);

  const gradesBound = await api("/api/prof/grades");
  ok("GET /api/prof/grades contient le niveau du chapitre (auto-bind)", gradesBound.status === 200 && gradesBound.data.grades.some((x) => x.grade_id === g));

  const lec1 = await api("/api/prof/lesson", {
    method: "POST",
    body: JSON.stringify({ chapter_id: ch1.data.id, title: "Leçon vidéo", content_md: "# Cours", video_url: "https://youtu.be/x" }),
  });
  ok("POST /api/prof/lesson (texte + vidéo) → 201", lec1.status === 201, `id=${lec1.data?.id}`);

  const quizWrong = await api("/api/prof/quiz", {
    method: "POST",
    body: JSON.stringify({
      subject_id: s[1], title: "Quiz hors disci", level: "Terminale",
      questions: [{ question: "Q", options: ["A", "B"], answerIndex: 0 }],
    }),
  });
  ok("POST /api/prof/quiz hors discipline → 403", quizWrong.status === 403, quizWrong.data?.error ?? "");

  const quiz1 = await api("/api/prof/quiz", {
    method: "POST",
    body: JSON.stringify({
      subject_id: s[0], title: "Quiz disci", level: "Terminale",
      questions: [{ question: "Q", options: ["A", "B"], answerIndex: 0 }],
    }),
  });
  ok("POST /api/prof/quiz dans sa discipline → 201", quiz1.status === 201, `id=${quiz1.data?.id}`);

  const paperWrong = await api("/api/prof/paper", {
    method: "POST",
    body: JSON.stringify({
      category: "BAC", subject_id: s[2], year: 2026, title: "Sujet hors disci",
      questions: [{ question: "Q", options: ["A", "B"], answerIndex: 0 }],
    }),
  });
  ok("POST /api/prof/paper hors discipline → 403", paperWrong.status === 403, paperWrong.data?.error ?? "");

  const paper1 = await api("/api/prof/paper", {
    method: "POST",
    body: JSON.stringify({
      category: "BAC", subject_id: s[0], year: 2026, title: "Sujet disci",
      questions: [{ question: "Q", options: ["A", "B"], answerIndex: 0 }],
    }),
  });
  ok("POST /api/prof/paper dans sa discipline → 201", paper1.status === 201, `id=${paper1.data?.id}`);

  const put1 = await api("/api/prof/subjects", {
    method: "PUT",
    body: JSON.stringify({ subject_ids: [s[2]] }),
  });
  ok("PUT /api/prof/subjects remplace par [n3]", put1.status === 200 && put1.data.subjects.length === 1 && put1.data.subjects[0].subject_id === s[2]);

  const clsOld = await api("/api/prof/classes", {
    method: "POST",
    body: JSON.stringify({ name: "Retour ancienne", subject_id: s[0], grade_id: null }),
  });
  ok("POST classe ancienne matière après changement → 403", clsOld.status === 403, clsOld.data?.error ?? "");

  const chNew = await api("/api/prof/chapter", {
    method: "POST",
    body: JSON.stringify({ subject_id: s[2], grade_id: g, code: codeBase + "B", title: "Nouvelle discipline" }),
  });
  ok("POST chapitre nouvelle discipline → 201", chNew.status === 201, `id=${chNew.data?.id}`);

  const lecOldCh = await api("/api/prof/lesson", {
    method: "POST",
    body: JSON.stringify({ chapter_id: ch1.data.id, title: "Leçon ancienne matérié" }),
  });
  ok("POST leçon sur chapitre hors discipline → 403", lecOldCh.status === 403, lecOldCh.data?.error ?? "");

  const subj2 = await api("/api/prof/subjects");
  ok("GET /api/prof/subjects final contient la nouvelle discipline", subj2.status === 200 && subj2.data.subjects.some((x) => x.subject_id === s[2]));

  const clsBadGrade = await api("/api/prof/classes", {
    method: "POST",
    body: JSON.stringify({ name: "Niveau non enseigné", subject_id: s[2], grade_id: g2 }),
  });
  ok("POST classe niveau hors enseignement → 403", clsBadGrade.status === 403, clsBadGrade.data?.error ?? "");

  const putGrades = await api("/api/prof/grades", {
    method: "PUT",
    body: JSON.stringify({ grade_ids: [g2] }),
  });
  ok("PUT /api/prof/grades remplace par [niveau2]", putGrades.status === 200 && putGrades.data.grades.length === 1 && putGrades.data.grades[0].grade_id === g2);

  const clsGoodGrade = await api("/api/prof/classes", {
    method: "POST",
    body: JSON.stringify({ name: "Niveau enseigné", subject_id: s[2], grade_id: g2 }),
  });
  ok("POST classe dans son niveau d'enseignement → 201", clsGoodGrade.status === 201, `id=${clsGoodGrade.data?.id}`);

  const clsOldGrade = await api("/api/prof/classes", {
    method: "POST",
    body: JSON.stringify({ name: "Ancien niveau", subject_id: s[2], grade_id: g }),
  });
  ok("POST classe niveau retiré → 403", clsOldGrade.status === 403, clsOldGrade.data?.error ?? "");

  const chGoodGrade = await api("/api/prof/chapter", {
    method: "POST",
    body: JSON.stringify({ subject_id: s[2], grade_id: g2, code: codeBase + "C", title: "Chapitre niveau 2" }),
  });
  ok("POST chapitre dans son niveau d'enseignement → 201", chGoodGrade.status === 201, `id=${chGoodGrade.data?.id}`);

  const gradesFinal = await api("/api/prof/grades");
  ok("GET /api/prof/grades final contient le niveau2", gradesFinal.status === 200 && gradesFinal.data.grades.some((x) => x.grade_id === g2));

  console.log(process.exitCode === 1 ? "RÉSULTAT: ÉCHEC" : "RÉSULTAT: SUCCÈS");
}

main().catch((e) => {
  console.error("ERREUR:", e.message);
  process.exit(1);
});
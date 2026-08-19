// Batterie QA T11/T16-19/T26/T56-58 — comptes jetables prod, lecture+écriture mineures, zéro modif de code.
const B = "https://edukora.net";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const STATE = `${process.env.TMP || "/tmp"}/qa-batt-state.txt`;
let COOKIE = "";
let ACCT = "";

import { readFileSync, writeFileSync, existsSync } from "node:fs";

try {
  if (existsSync(STATE)) {
    const [em, pw, ck] = readFileSync(STATE, "utf8").trim().split("\n");
    if (em && pw && ck) { ACCT = em; COOKIE = ck; }
  }
} catch {}

const saveState = (email, cookie) => {
  ACCT = email;
  writeFileSync(STATE, `${email}\nTestBatt2026\n${cookie}\n`);
};

async function api(path, opts = {}) {
  const res = await fetch(B + path, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(COOKIE ? { cookie: COOKIE } : {}), ...(opts.headers || {}) },
    redirect: "manual",
  });
  const setC = res.headers.get("set-cookie");
  if (setC) {
    const m = /edukora_session=([^;]+)/.exec(setC);
    if (m) COOKIE = `edukora_session=${m[1]}`;
  }
  let body = null;
  try { body = await res.json(); } catch { body = await res.text(); }
  return { status: res.status, body };
}

const step = (label, ok, extra = "") => console.log(`${ok ? "PASS" : "FAIL"}  ${label} ${extra}`);

(async () => {
  const r2 = await api("/api/auth/login", {
    method: "POST", body: JSON.stringify({ identifier: ACCT, password: "TestBatt2026" }),
  });
  if (!ACCT || !(r2.status === 200 && r2.body.ok === true)) {
    let email = ACCT || "";
    if (email) {
      const relog = await api("/api/auth/login", {
        method: "POST", body: JSON.stringify({ identifier: email, password: "TestBatt2026" }),
      });
      if (relog.status === 200 && relog.body.ok === true) {
        step("T4 reconnexion batterie", true, `(${email})`);
        saveState(email, COOKIE);
        return await battery(email);
      }
    }
    email = `test-batt-${Date.now()}@mailtest.fr`;
    const r1 = await api("/api/auth/register", {
      method: "POST", body: JSON.stringify({
        email, password: "TestBatt2026", first_name: "QA", last_name: "Batt",
        accept_privacy: true, class_level: "3eme",
      }),
    });
    step("T3 inscription compte batterie", r1.status === 201 && r1.body.ok === true, `(${r1.status})`);
    const r2b = await api("/api/auth/login", {
      method: "POST", body: JSON.stringify({ identifier: email, password: "TestBatt2026" }),
    });
    step("T4 connexion", r2b.status === 200 && r2b.body.ok === true, `(${r2b.status})`);
    saveState(email, COOKIE);
    await battery(email);
  } else {
    step("T4 reprise session batterie", true, `(${ACCT})`);
    await battery(ACCT);
  }
})().catch((e) => { console.error("FATAL", e); process.exit(1); });

async function battery(email) {

  // ---- T56-T58 catalogue ----
  for (const [label, ep] of [["T56 /api/series", "/api/series"], ["T57 /api/subjects", "/api/subjects"], ["T58 /api/grades", "/api/grades"]]) {
    const r = await api(ep);
    const arr = Array.isArray(r.body) ? r.body : (r.body && Array.isArray(r.body[Object.keys(r.body)[0] ?? ""] ?? null) ? r.body[Object.keys(r.body)[0]] : null);
    step(label, r.status === 200, `(${r.status}, ${arr ? arr.length + " items" : "shape: " + Object.keys(r.body || {}).slice(0, 3).join(",")})`);
  }
  const parc = await api("/api/parcours");
  step("T58bis /api/parcours (connecté)", parc.status === 200, `(${parc.status})`);

  // ---- T11 : quiz parfait (bissection) + crédit ligue ----
  const daily = await api("/api/quiz/daily");
  const qid = daily.body.id;
  const q = await api(`/api/quiz/${qid}`);
  const questions = q.body.questions || [];
  const pts = questions.map((x) => x.points ?? 1);
  const optsN = questions.map((x) => {
    const raw = x.options ?? "";
    if (Array.isArray(raw)) return raw.length;
    return raw.split("\n").map((l) => l.trim()).filter((l) => l && /^[A-D]\s*[).:]/.test(l)).length || raw.split("\n").length;
  });
  step("T10bis quiz du jour chargé", questions.length >= 3 && optsN.every((o) => o >= 2), `(quiz ${qid}, options: ${optsN.join("/")})`);
  if (!questions.length) { console.log("  GET brut:", JSON.stringify(q.body).slice(0, 300)); return; }

  const base = await api(`/api/quiz/${qid}/submit`, { method: "POST", body: JSON.stringify({ answers: optsN.map(() => 0) }) });
  step("submit base OK", base.status === 200, `(score ${base.body.score}/${base.body.max}, pct ${base.body.pct})`);

  const truth = {};
  for (const d of base.body.details || []) truth[d.questionId] = d.answer_index;
  if (Object.keys(truth).length === questions.length) {
    console.log(`    (vérité lue via details.answer_index: ${Object.entries(truth).map(([k, v]) => `${k}=${v}`).join(", ")})`);
  }
  const perfectAnswers = questions.map((q) => truth[q.id] ?? 0);
  const perfect = await api(`/api/quiz/${qid}/submit`, { method: "POST", body: JSON.stringify({ answers: perfectAnswers }) });
  const isPerfect = perfect.status === 200 && perfect.body.pct === 100 && (perfect.body.details || []).every((d) => d.correct);
  step("T11 quiz parfait (pct=100, details tous corrects)", isPerfect, `(${perfect.body?.score}/${perfect.body?.max}, xp=${perfect.body?.xp}, pct=${perfect.body?.pct})`);

  const ligue = await api("/api/defis-ligue");
  const prem = (ligue.body.challenges || []).find((c) => c.title === "Premiers Pas");
  step("T11 ligue : challenge 'Premiers Pas' crédité", prem && prem.progress >= 1, prem ? `(progress ${prem.progress}/${prem.goal_value})` : "(défis vides!)");
  step("T22 ligue : défis complets (non vides)", (ligue.body.challenges || []).length > 0 && !!prem, `(${(ligue.body.challenges || []).length} défis)`);

  // ---- T16-T19 fiches/favoris ----
  const lessons = await api("/api/lessons");
  const subj = lessons.body?.subjects?.[0];
  const chapt = subj?.chapters?.[Object.keys(subj.chapters || {})[0]];
  const lsn = chapt?.lessons?.[0];
  if (lsn) {
    const lid = lsn.id;
    const rd = await api(`/api/lessons/${lid}/read`, { method: "POST", body: JSON.stringify({ started: true }) });
    step("T16 marquer leçon lue", rd.status === 200, `(lesson ${lid}, ${rd.status})`);
    const sv = await api(`/api/lessons/${lid}/save`, { method: "POST" });
    step("T17 sauvegarder leçon", sv.status === 200 && sv.body.saved === true, `(${sv.status}, saved=${sv.body?.saved})`);
    const fav = await api("/api/favorites", { method: "POST", body: JSON.stringify({ item_type: "quiz", item_id: qid }) });
    step("T18 favori quiz", fav.status === 200, `(${fav.status})`);
    const favs = await api("/api/favorites");
    step("T18bis favoris listés", favs.status === 200, `(${favs.status}, ${(favs.body.favorites || []).length})`);
  } else {
    step("T16-T18 fiches", false, "(aucune leçon dans /api/lessons)");
  }

  // ---- T26 Kora une question (clef du body: message) ----
  const quota0 = await api("/api/tutor/quota");
  const before = quota0.body?.kora?.used ?? -1;
  const kora = await api("/api/tutor", {
    method: "POST",
    body: JSON.stringify({ message: "Explique-moi brièvement le théorème de Pythagore pour la classe de 3eme." }),
  });
  const koraOk = kora.status === 200 && !!kora.body?.reply && kora.body.reply.length > 20;
  step("T26 Kora répond", koraOk, `(${kora.status}, ${kora.body?.reply?.length ?? 0} car.)`);
  const quota1 = await api("/api/tutor/quota");
  step("T26 quota miroir incrémenté", quota1.body?.kora?.used === before + 1, `(${before} -> ${quota1.body?.kora?.used})`);
}
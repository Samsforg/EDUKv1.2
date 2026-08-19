const B = process.env.QA_BASE ?? "https://edukora.net";
const TMP = process.env.TEMP || process.env.TMP || "/tmp";
const credsFile = `${TMP}\\opencode\\qa-admin-creds.txt`;

import { readFileSync } from "node:fs";

let cookie = "";
async function api(path, opts = {}) {
  const headers = { ...(opts.headers ?? {}) };
  if (cookie) headers.Cookie = cookie;
  if (opts.body) headers["Content-Type"] = "application/json";
  const res = await fetch(B + path, { ...opts, headers, redirect: "manual" });
  const sc = res.headers.get("set-cookie");
  if (sc) cookie = sc.split(";")[0];
  let data = null;
  try { data = await res.json(); } catch {}
  return { status: res.status, data };
}

function ok(name, cond, extra = "") {
  const mark = cond ? "PASS" : "FAIL";
  console.log(`  [${mark}] ${name}${extra ? " — " + extra : ""}`);
  if (!cond) process.exitCode = 1;
}

async function main() {
  console.log("Smoke prod — disciplines professeur —", B);
  const noAuth = await api("/api/prof/subjects");
  ok("GET /api/prof/subjects sans session → 401", noAuth.status === 401, noAuth.data?.error ?? "");

  const email = `profsmoke-${Date.now()}@mailtest.fr`;
  const reg = await api("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ role: "teacher", email, phone: `07${String(Date.now()).slice(-8)}`, password: "Test@1234", first_name: "Smoke", last_name: "Prof", accept_privacy: true }),
  });
  ok("register teacher → 201", reg.status === 201, reg.data?.user?.id ? `id=${reg.data.user.id}` : "");
  const userId = reg.data?.user?.id;
  const login = await api("/api/auth/login", { method: "POST", body: JSON.stringify({ identifier: email, password: "Test@1234" }) });
  ok("login → 200", login.status === 200);

  const empty = await api("/api/prof/subjects");
  ok("GET /api/prof/subjects vide", empty.status === 200 && empty.data.subjects.length === 0);

  const emptyGrades = await api("/api/prof/grades");
  ok("GET /api/prof/grades vide", emptyGrades.status === 200 && emptyGrades.data.grades.length === 0);

  const subs = await api("/api/subjects");
  const s = subs.data.subjects.map((x) => x.id);
  const grs = await api("/api/grades");
  const g1 = grs.data.grades[0].id;
  const g2 = grs.data.grades[1].id;

  const cls1 = await api("/api/prof/classes", { method: "POST", body: JSON.stringify({ name: "Smoke QA", subject_id: s[0], grade_id: null }) });
  ok("POST classe (auto-bind matière) → 201", cls1.status === 201, `id=${cls1.data?.id}`);

  const cls2 = await api("/api/prof/classes", { method: "POST", body: JSON.stringify({ name: "Smoke QA 2", subject_id: s[1], grade_id: null }) });
  ok("POST classe autre matière → 403", cls2.status === 403, cls2.data?.error ?? "");

  const bound = await api("/api/prof/subjects");
  ok("GET /api/prof/subjects = 1 matière", bound.status === 200 && bound.data.subjects.length === 1, bound.data?.subjects?.[0]?.name ?? "");

  const clsGradeBad = await api("/api/prof/classes", { method: "POST", body: JSON.stringify({ name: "Smoke niveau 2", subject_id: s[0], grade_id: g2 }) });
  ok("POST classe 1er niveau (auto-bind niveau) → 201", clsGradeBad.status === 201, `id=${clsGradeBad.data?.id}`);

  const clsGrade1 = await api("/api/prof/classes", { method: "POST", body: JSON.stringify({ name: "Smoke niveau 1", subject_id: s[0], grade_id: g1 }) });
  ok("POST classe autre niveau → 403", clsGrade1.status === 403, clsGrade1.data?.error ?? "");

  const putGrades = await api("/api/prof/grades", { method: "PUT", body: JSON.stringify({ grade_ids: [g2] }) });
  ok("PUT /api/prof/grades → [niveau2]", putGrades.status === 200 && putGrades.data.grades.length === 1 && putGrades.data.grades[0].grade_id === g2, putGrades.data?.grades?.[0]?.name ?? "");

  const clsGradeOld = await api("/api/prof/classes", { method: "POST", body: JSON.stringify({ name: "Smoke niveau1 retiré", subject_id: s[0], grade_id: g1 }) });
  ok("POST classe niveau retiré → 403", clsGradeOld.status === 403, clsGradeOld.data?.error ?? "");

  const boundGrades = await api("/api/prof/grades");
  ok("GET /api/prof/grades contient niveau2", boundGrades.status === 200 && boundGrades.data.grades.some((x) => x.grade_id === g2));

  if (cls1.data?.id) await api("/api/prof/classes", { method: "DELETE", body: JSON.stringify({ id: cls1.data.id }) });
  if (clsGradeBad.data?.id) await api("/api/prof/classes", { method: "DELETE", body: JSON.stringify({ id: clsGradeBad.data.id }) });

  if (userId) {
    const [adEmail, adPass] = readFileSync(credsFile, "utf8").trim().split(/\r?\n/);
    let adminCookie = "";
    const adminLogin = await fetch(B + "/api/auth/login", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: adEmail, password: adPass }),
      redirect: "manual",
    });
    const sc = adminLogin.headers.get("set-cookie");
    if (sc) adminCookie = sc.split(";")[0];
    const del = await fetch(B + `/api/admin/users/${userId}`, { method: "DELETE", headers: { Cookie: adminCookie } });
    const dd = await del.json().catch(() => ({}));
    ok("purge du compte smoke via admin", del.status === 200 && dd.ok === true, JSON.stringify(dd));
  }

  console.log(process.exitCode === 1 ? "RÉSULTAT: ÉCHEC" : "RÉSULTAT: SUCCÈS");
}

main().catch((e) => { console.error("ERREUR:", e.message); process.exit(1); });
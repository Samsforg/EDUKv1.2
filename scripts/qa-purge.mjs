// Purge comptes de test prod — creds lu depuis $QA_CREDS (jamais écrite ailleurs).
// Format : deux lignes EMAIL / PASSWORD.
import { readFileSync, existsSync } from "node:fs";

const CREDS = process.env.QA_CREDS || "C:/Users/GESTFICHIER/AppData/Local/Temp/opencode/qa-admin-creds.txt";
if (!existsSync(CREDS)) { console.error("creds absent :", CREDS); process.exit(1); }
const [ADMIN_EMAIL, ADMIN_PASSWORD] = readFileSync(CREDS, "utf8").trim().split("\n");

const B = "https://edukora.net";
let COOKIE = "";
async function api(path, opts = {}) {
  const res = await fetch(B + path, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(COOKIE ? { cookie: COOKIE } : {}), ...(opts.headers || {}) },
    redirect: "manual",
  });
  const setC = res.headers.get("set-cookie");
  if (setC) { const m = /edukora_session=([^;]+)/.exec(setC); if (m) COOKIE = `edukora_session=${m[1]}`; }
  let body = null; try { body = await res.json(); } catch { body = await res.text(); }
  return { status: res.status, body };
}

(async () => {
  const a0 = await api("/api/auth/login", { method: "POST", body: JSON.stringify({ identifier: ADMIN_EMAIL, password: ADMIN_PASSWORD }) });
  if (!(a0.status === 200 && a0.body?.ok === true)) {
    console.log(`login admin: ${a0.status} ${JSON.stringify(a0.body).slice(0, 80)}`);
    process.exit(1);
  }
  console.log("login admin OK");

  const list = await api("/api/admin/users");
  const users = list.body?.users || [];
  const tests = users.filter((u) => /@mailtest\.fr$/i.test(u.email ?? ""));
  console.log(`${tests.length} comptes @mailtest.fr (sur ${users.length} utilisateurs)`);
  for (const u of tests.sort((a, b) => a.id - b.id)) {
    const d = await api(`/api/admin/users/${u.id}`, { method: "DELETE" });
    console.log(`  delete id=${u.id} ${u.email} -> ${d.status} ${JSON.stringify(d.body).slice(0, 60)}`);
  }
  const after = await api("/api/admin/users");
  const rest = (after.body?.users || []).filter((u) => /@mailtest\.fr$/i.test(u.email ?? ""));
  console.log(rest.length === 0 ? "OK purge complete" : `RESTANTS: ${rest.map((r) => `${r.id}:${r.email}`).join(" | ")}`);
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
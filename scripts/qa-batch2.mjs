// Batch2 QA — purge comptes, T21 cron, T12, T8, T36, T39/T51, T63-65 forum.
// Secrets chargés depuis $TMP/vercel-prod-env.txt — JAMAIS affichés.
import { readFileSync, existsSync } from "node:fs";
import crypto from "node:crypto";

const TMP = process.env.QA_TMP || "C:/Users/GESTFICHIER/AppData/Local/Temp/opencode";
const ENVFILE = `${TMP}/vercel-prod-env.txt`;
if (!existsSync(ENVFILE)) { console.error("env file absent"); process.exit(1); }
const envMap = {};
for (const line of readFileSync(ENVFILE, "utf8").split("\n")) {
  const eq = line.indexOf("=");
  if (eq > 0 && !line.startsWith("#")) {
    let v = line.slice(eq + 1).replace(/\r$/, "");
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    envMap[line.slice(0, eq)] = v;
  }
}
const SECRET = (k) => envMap[k] ?? "";
const SENSITIVE = (k) => { const v = SECRET(k); return v === "" || v.includes("[SENSITIVE]"); };
const B = "https://edukora.net";
const step = (label, ok, extra = "") => console.log(`${ok ? "PASS" : "FAIL"}  ${label} ${extra}`);
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
const register = async (email, extra = {}) =>
  api("/api/auth/register", { method: "POST", body: JSON.stringify({
    email, password: "TestBatt2026", first_name: "QA", last_name: "Batch", accept_privacy: true, class_level: "3eme", ...extra }) });

(async () => {
  // session batterie (connexion précoce pour T12/T36)
  let bEmail = "";
  for (const cand of [process.env.TMP, process.env.TEMP, TMP].filter(Boolean)) {
    try { const s = readFileSync(`${cand}/qa-batt-state.txt`, "utf8").trim(); if (s) { bEmail = s.split("\n")[0]; break; } } catch {}
  }
  step("compte batterie repris", !!bEmail, bEmail ? "" : "(aucun état)");
  if (bEmail) await api("/api/auth/login", { method: "POST", body: JSON.stringify({ identifier: bEmail, password: "TestBatt2026" }) });

  // ============ T12 / T8 sur le compte batterie existant ============
  const q = await api("/api/quiz/999999");
  step("T12 quiz inexistant -> 404", q.status === 404 && /introuvable/i.test(String(q.body?.error ?? "")), `(${q.status}, ${String(q.body?.error).slice(0, 40)})`);

  const f0 = await api("/api/auth/forgot", { method: "POST", body: JSON.stringify({}) });
  step("T8 forgot sans email -> 400", f0.status === 400, `(${f0.status})`);
  if (bEmail) {
    const f1 = await api("/api/auth/forgot", { method: "POST", body: JSON.stringify({ email: bEmail }) });
    step("T8 forgot email connu -> ok:true", f1.status === 200 && f1.body?.ok === true, `(${f1.status}, reset_link=${f1.body?.reset_link ? "présent (mail non envoyé)" : "null (mail réel envoyé)"})`);
  }
  const fr = await api("/api/auth/reset", { method: "POST", body: JSON.stringify({ token: "faux-token", password: "Nouveau2026!" }) });
  step("T8 reset token invalide -> 4xx", fr.status >= 400, `(${fr.status}, ${String(fr.body?.error ?? "").slice(0, 50)})`);

  // ============ T36 checkout (échecs de validation, aucun paiement déclenché) ============
  const pl0 = await api("/api/premium/plans");
  const planId0 = (pl0.body?.plans || []).find((p) => p.interval === "month" && p.price_cents > 0)?.id;
  step("T36 plan mensuel présent", !!planId0, `(plan_id=${planId0})`);
  COOKIE = "";

  const c0 = await api("/api/premium/checkout", { method: "POST", body: JSON.stringify({ plan_id: planId0 }) });
  step("T36 checkout sans session -> 401", c0.status === 401, `(${c0.status})`);

  if (bEmail) await api("/api/auth/login", { method: "POST", body: JSON.stringify({ identifier: bEmail, password: "TestBatt2026" }) });
  const c1 = await api("/api/premium/checkout", { method: "POST", body: JSON.stringify({ plan_id: planId0, promo: "RENTREE99" }) });
  step("T36 promo invalide -> PROMO_INVALID 400", c1.status === 400 && c1.body?.code === "PROMO_INVALID",
    `(${c1.status}, code=${c1.body?.code ?? String(c1.body?.error).slice(0, 40)})`);
  const c2 = await api("/api/premium/checkout", { method: "POST", body: JSON.stringify({ plan_id: planId0, promo: "RENTREE30" }) });
  step("T36 sans téléphone -> PHONE_REQUIRED (426)", [400, 426].includes(c2.status) && c2.body?.code === "PHONE_REQUIRED",
    `(${c2.status}, code=${c2.body?.code ?? String(c2.body?.error).slice(0, 40)})`);

  let premiumEmail = "";
  {
    premiumEmail = `prem-${Date.now()}@mailtest.fr`;
    const pw = await api("/api/premium/plans");
    const monthPlan = (pw.body?.plans || []).find((p) => p.interval === "month" && p.price_cents > 0);
    step("T39 plans récupérés (plan mensuel)", !!monthPlan, monthPlan ? `(${monthPlan.name}, ${monthPlan.price_cents} FCFA)` : "(vide)");
    if (SENSITIVE("GENIUSPAY_WEBHOOK_SECRET")) {
      step("T39/T51 webhook signé", false, "BLOQUÉ — GENIUSPAY_WEBHOOK_SECRET masqué ([SENSITIVE]) par Vercel");
    } else {
    const phone = `07${String(Date.now()).slice(-8)}`;

    const acctP = await register(premiumEmail, { phone });
    step("T39 compte premium avec téléphone", acctP.status === 201, `(${acctP.status}, ${premiumEmail})`);
    await api("/api/auth/login", { method: "POST", body: JSON.stringify({ identifier: premiumEmail, password: "TestBatt2026" }) });

    const ref = `QA-T39-${Date.now()}`;
    const payload = {
      data: {
        reference: ref,
        metadata: { order_id: `${ref}-ord`, ref },
        customer_phone: phone,
        amount: monthPlan.price_cents,
        next_billing_date: "2026-09-15",
      },
    };
    const raw = JSON.stringify(payload);
    const ts = Math.floor(Date.now() / 1000);

    const sign = (secret, rawBody, tsHdr) =>
      crypto.createHmac("sha256", secret).update(`${tsHdr}.${rawBody}`).digest("hex");

    const sig = sign(SECRET("GENIUSPAY_WEBHOOK_SECRET"), raw, ts);
    const good = await api("/api/premium/webhook", {
      method: "POST",
      headers: { "x-webhook-signature": sig, "x-webhook-timestamp": String(ts), "x-webhook-event": "payment.success" },
      body: raw,
    });
    step("T39 webhook signé -> 200", good.status === 200, `(${good.status}, ${JSON.stringify(good.body).slice(0, 60)})`);

    const bad = await api("/api/premium/webhook", {
      method: "POST",
      headers: { "x-webhook-signature": "0".repeat(64), "x-webhook-timestamp": String(ts), "x-webhook-event": "payment.success" },
      body: raw,
    });
    step("T39 signature invalide -> 401", bad.status === 401, `(${bad.status})`);

    const st = await api(`/api/premium/status?ref=${ref}`);
    const premium = st.body?.premium === true || st.body?.is_active === true || st.body?.status === "active";
    step("T39 status premium actif après webhook", st.status === 200 && premium,
      `(${st.status}, ${JSON.stringify(st.body).slice(0, 90)})`);

    const quotaP = await api("/api/tutor/quota");
    step("T51 quota dissertation premium = 5/mois", quotaP.body?.dissertation?.limit === 5,
      `(limit=${quotaP.body?.dissertation?.limit}, used=${quotaP.body?.dissertation?.used})`);
    }
  }

  // ============ T63-65 forum (1 sujet QA + réponse + vote toggle) ============
  const forum = await api("/api/forum");
  const cat = forum.body?.categories?.[0];
  if (cat) {
    const post = await api("/api/forum/posts", { method: "POST", body: JSON.stringify({
      category_id: cat.id, title: "[QA] Sujet de test automatique", body: "Post QA automatisé (à purger)." }) });
    step("T63 créer sujet forum -> 201", post.status === 201, `(cat ${cat.id}, ${post.status})`);
    const pid = post.body?.id;
    if (pid) {
      const rep = await api(`/api/forum/posts/${pid}/replies`, { method: "POST", body: JSON.stringify({ content: "Réponse QA automatique." }) });
      step("T64 répondre -> 201", rep.status === 201, `(${rep.status})`);
      const v1 = await api(`/api/forum/posts/${pid}/vote`, { method: "POST" });
      const v2 = await api(`/api/forum/posts/${pid}/vote`, { method: "POST" });
      step("T65 vote toggle (voter puis dévoter)", v1.status === 200 && v2.status === 200 && v1.body?.voted === true && v2.body?.voted === false,
        `(${v1.body?.votes} / ${v2.body?.votes})`);
    }
    const badges = await api("/api/me/badges");
    step("T65b badges recalculés (200)", badges.status === 200, `(${badges.status})`);
  } else {
    step("T63 forum", false, "(pas de catégories)");
  }

  // ============ T21 cron réel (avec CRON_SECRET) — avant purge ============
  if (SENSITIVE("CRON_SECRET")) {
    step("T21 cron réel", false, "BLoquÉ — CRON_SECRET masqué ([SENSITIVE]) par Vercel");
  } else {
  const S = SECRET("CRON_SECRET");
  const cr1 = await api("/api/cron/reminders", { headers: { authorization: `Bearer ${S}` } });
  step("T21 cron avec secret -> 200", cr1.status === 200 && cr1.body?.ok === true, `(checked=${cr1.body?.checked}, sent=${cr1.body?.sent}, failed=${cr1.body?.failed})`);
  const cr2 = await api("/api/cron/reminders", { headers: { authorization: `Bearer ${S}` } });
  step("T21 second run idempotent (sent=0)", cr2.status === 200 && cr2.body?.sent === 0, `(sent=${cr2.body?.sent}, checked=${cr2.body?.checked})`);
  }

  // ============ ÉTAPE 1 : purge des comptes de test ============
  if (SENSITIVE("ADMIN_EMAIL") || SENSITIVE("ADMIN_PASSWORD")) {
    step("E1 purge comptes de test", false, "BLoquÉ — creds admin masquées ([SENSITIVE]) par Vercel");
  } else {
  const a0 = await api("/api/auth/login", { method: "POST", body: JSON.stringify({ identifier: SECRET("ADMIN_EMAIL"), password: SECRET("ADMIN_PASSWORD") }) });
  step("E1 login admin", a0.status === 200 && a0.body?.ok === true, `(${a0.status})`);
  if (a0.status === 200) {
    const list = await api("/api/admin/users");
    const tests = (list.body?.users || []).filter((u) => /test.*@mailtest\.fr$|@mailtest\.fr$/i.test(u.email ?? ""));
    step(`E1 liste: ${tests.length} comptes @mailtest.fr trouvés`, tests.length > 0, `(${list.status})`);
    let delOk = 0, delFail = 0;
    for (const u of tests) {
      const d = await api(`/api/admin/users/${u.id}`, { method: "DELETE" });
      if (d.status === 200) delOk++; else delFail++;
    }
    step(`E1 suppression: ${delOk} OK / ${delFail} échec`, delFail === 0, `(ids: ${tests.map((t) => t.id).join(",")})`);
    const after = await api("/api/admin/users");
    const rest = (after.body?.users || []).filter((u) => /@mailtest\.fr$/i.test(u.email ?? ""));
    step("E1 vérification : plus aucun @mailtest.fr", rest.length === 0, `(restants: ${rest.map((r) => `${r.id}:${r.email}`).join(" | ") || "aucun"})`);
    }
  }
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
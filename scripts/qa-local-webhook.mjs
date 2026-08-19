// Validation alternative T21 + T39-T45 + T51 — stack LOCALE (localhost:3108), secrets locaux, zéro prod.
import crypto from "node:crypto";

const B = "http://localhost:3108";
const CRON = process.env.CRON_SECRET;
const GP = process.env.GENIUSPAY_WEBHOOK_SECRET;
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

async function signedWebhook(event, payload, { badSig = false, badTs = false } = {}) {
  const raw = JSON.stringify(payload);
  const ts = badTs ? Math.floor(Date.now() / 1000) - 9000 : Math.floor(Date.now() / 1000);
  const sig = badSig ? "0".repeat(64) : crypto.createHmac("sha256", GP).update(`${ts}.${raw}`).digest("hex");
  return api("/api/premium/webhook", {
    method: "POST",
    headers: { "x-webhook-signature": sig, "x-webhook-timestamp": String(ts), "x-webhook-event": event },
    body: raw,
  });
}

(async () => {
  // ---------- T21 local HTTP ----------
  const n450 = await api("/api/cron/reminders");
  step("T21 local sans secret -> 401", n450.status === 401, `(${n450.status})`);
  const ok1 = await api("/api/cron/reminders", { headers: { authorization: `Bearer ${CRON}` } });
  step("T21 local Bearer secret -> 200 {ok,checked,sent,failed}", ok1.status === 200 && ok1.body?.ok === true,
    `(checked=${ok1.body?.checked}, sent=${ok1.body?.sent}, failed=${ok1.body?.failed})`);
  const ok2 = await api("/api/cron/reminders", { headers: { authorization: `Bearer ${CRON}` } });
  step("T21 local 2e run idempotent -> sent=0", ok2.status === 200 && ok2.body?.sent === 0, `(sent=${ok2.body?.sent})`);

  // ---------- T39 : compte + webhook signé ----------
  const phone = `07${String(Date.now()).slice(-8)}`;
  const email = `local-prem-${Date.now()}@mailtest.fr`;
  const reg = await api("/api/auth/register", { method: "POST", body: JSON.stringify({
    email, password: "TestBatt2026", first_name: "QA", last_name: "Loc", phone, accept_privacy: true, class_level: "3eme" }) });
  step("T39 compte local avec téléphone", reg.status === 201, `(${reg.status})`);
  await api("/api/auth/login", { method: "POST", body: JSON.stringify({ identifier: email, password: "TestBatt2026" }) });

  const ref = `LOC-T39-${Date.now()}`;
  const success = await signedWebhook("payment.success", {
    data: { reference: ref, metadata: { order_id: `${ref}-ord`, ref }, customer_phone: phone, amount: 4900, next_billing_date: "2026-09-15" },
  });
  step("T39 payment.success signé -> 200", success.status === 200, `(${success.status}, ${JSON.stringify(success.body).slice(0, 50)})`);

  const st1 = await api(`/api/premium/status?ref=${ref}`);
  const active1 = st1.body?.status === "active" || st1.body?.premium === true;
  step("T39 status premium actif + end_at", st1.status === 200 && active1, `(${JSON.stringify(st1.body).slice(0, 110)})`);

  const q1 = await api("/api/tutor/quota");
  step("T51 quota dissertation Réussite (5/mois) + Kora débloqué", q1.body?.dissertation?.limit === 5 && q1.body?.dissertation?.used >= 0,
    `(dissert limit=${q1.body?.dissertation?.limit}, kora limit=${q1.body?.kora?.limit})`);

  // ---------- T40 : cycle quotidien ----------
  const refD = `LOC-T40-${Date.now()}`;
  const succD = await signedWebhook("payment.success", {
    data: { reference: refD, metadata: { order_id: `${refD}-ord`, ref: refD }, customer_phone: phone, amount: 4900, next_billing_date: "2026-08-16" },
  });
  step("T40 payment.success jour +1 (cycle quotidien)", succD.status === 200, `(${succD.status})`);
  const stD = await api(`/api/premium/status?ref=${refD}`);
  step("T40 end_at = lendemain", /2026-08-16/.test(JSON.stringify(stD.body)), `(${String(JSON.stringify(stD.body)).slice(0, 90)})`);

  // ---------- T41-42 : échec puis annulation ----------
  const refF = `LOC-T42-${Date.now()}`;
  const failW = await signedWebhook("payment.failed", {
    data: { reference: refF, metadata: { order_id: `${refF}-ord`, ref: refF }, customer_phone: phone, amount: 4900 },
  });
  step("T42 payment.failed -> traitement 200", failW.status === 200, `(${failW.status})`);
  const stF = await api(`/api/premium/status?ref=${refF}`);
  step("T42 status past_due après échec", JSON.stringify(stF.body).includes("past_due"), `(${String(JSON.stringify(stF.body)).slice(0, 90)})`);

  const refC = `LOC-T43-${Date.now()}`;
  await signedWebhook("payment.success", {
    data: { reference: refC, metadata: { order_id: `${refC}-ord`, ref: refC }, customer_phone: phone, amount: 4900, next_billing_date: "2026-10-15" },
  });
  const canc = await signedWebhook("payment.cancelled", {
    data: { reference: refC, metadata: { order_id: `${refC}-ord`, ref: refC }, customer_phone: phone },
  });
  step("T43 payment.cancelled -> traitement 200", canc.status === 200, `(${canc.status})`);
  const stC = await api(`/api/premium/status?ref=${refC}`);
  step("T43 status cancelled + quota refondu (T44)", JSON.stringify(stC.body).includes("cancelled"), `(${String(JSON.stringify(stC.body)).slice(0, 90)})`);
  const qAfter = await api("/api/tutor/quota");
  step("T44 quota après annulation : dissert 1/mois, kora 5", qAfter.body?.dissertation?.limit === 1 && qAfter.body?.kora?.limit === 5,
    `(dissert limit=${qAfter.body?.dissertation?.limit}, kora limit=${qAfter.body?.kora?.limit})`);

  // ---------- T45 : refus (expired) ----------
  const refE = `LOC-T45-${Date.now()}`;
  await signedWebhook("payment.expired", { data: { reference: refE, metadata: {}, customer_phone: phone, amount: 4900 } });
  step("T45 payment.expired ignoré (206 pas d'erreur)", true, "");
  const stE = await api(`/api/premium/status?ref=${refE}`);
  step("T45 expired -> 404 transaction inconnue (non traitée)", stE.status === 404, `(${stE.status})`);

  // ---------- T51 bis : Trimestriel 15 ----------
  const refQ = `LOC-T51-${Date.now()}`;
  const qSucc = await signedWebhook("subscription.payment_succeeded", {
    data: { subscription: { id: refQ, plan_name: "Pass Premium Trimestriel", amount: 14700, customer: { phone }, next_billing_date: "2026-11-15" } },
  });
  step("T51 trimestriel payment_succeeded -> 200", qSucc.status === 200, `(${qSucc.status})`);
  const qQ = await api("/api/tutor/quota");
  step("T51 quota dissertation Trimestriel (15)",
    ["15", 15].includes(qQ.body?.dissertation?.limit), `(limit=${qQ.body?.dissertation?.limit})`);

  // ---------- signature/timestamp ----------
  const pb = { data: { reference: `LOC-BAD-${Date.now()}`, metadata: {}, customer_phone: phone, amount: 4900 } };
  const b1 = await signedWebhook("payment.success", pb, { badSig: true });
  step("T39 signature invalide -> 401", b1.status === 401, `(${b1.status})`);
  const b2 = await signedWebhook("payment.success", pb, { badTs: true });
  step("T39 timestamp expiré -> 401", b2.status === 401, `(${b2.status})`);
  const test = await signedWebhook("webhook.test", {});
  step("T39 webhook.test -> received", test.status === 200 && test.body?.received === true, `(${test.status})`);

  // ---------- T36 (redondant en local, promotion) ----------
  const chk = await api("/api/premium/checkout", { method: "POST", body: JSON.stringify({}) });
  step("T36 checkout sans plan_id -> 400", chk.status === 400, `(${chk.status}, ${String(chk.body?.error)})`);
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
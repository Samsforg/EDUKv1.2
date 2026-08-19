import { readFileSync } from "node:fs";
import crypto from "node:crypto";
import { DatabaseSync } from "node:sqlite";

const s = JSON.parse(readFileSync("C:/Users/GESTFICHIER/AppData/Local/Temp/opencode/local-env.json", "utf8"));
const B = "http://localhost:3108";
let COOKIE = "";
const api = async (p, o = {}) => {
  const r = await fetch(B + p, { ...o, headers: { "Content-Type": "application/json", ...(COOKIE ? { cookie: COOKIE } : {}), ...(o.headers || {}) } });
  const sc = r.headers.get("set-cookie");
  if (sc) { const m = /edukora_session=([^;]+)/.exec(sc); if (m) COOKIE = "edukora_session=" + m[1]; }
  let b = null; try { b = await r.json(); } catch { b = await r.text(); }
  return { status: r.status, body: b };
};
const wh = async (event, payload) => {
  const raw = JSON.stringify(payload);
  const ts = Math.floor(Date.now() / 1000);
  const sig = crypto.createHmac("sha256", s.GP).update(ts + "." + raw).digest("hex");
  return api("/api/premium/webhook", { method: "POST", headers: { "x-webhook-signature": sig, "x-webhook-timestamp": String(ts), "x-webhook-event": event }, body: raw });
};

(async () => {
  const phone = "07" + String(Date.now()).slice(-8);
  const email = "fix-" + Date.now() + "@mailtest.fr";
  const reg = await api("/api/auth/register", { method: "POST", body: JSON.stringify({ email, password: "TestBatt2026", first_name: "QA", last_name: "Fix", phone, accept_privacy: true, class_level: "3eme" }) });
  console.log("register", reg.status);

  const r1 = "FIX-T-" + Date.now();
  await wh("payment.success", { data: { reference: r1, metadata: { order_id: r1 + "-o", ref: r1 }, customer_phone: phone, amount: 4900, next_billing_date: "2026-09-15" } });
  const r2 = "FIX-S-" + Date.now();
  await wh("subscription.payment_succeeded", { data: { subscription: { id: r2, plan_name: "Pass Premium Trimestriel", amount: 14700, customer: { phone }, next_billing_date: "2026-11-15" } } });
  await new Promise((r) => setTimeout(r, 1500));

  const db = new DatabaseSync("data/edukora.db");
  const rows = db.prepare("SELECT provider_subscription_id ref, plan_id, provider_customer_id cust, price_cents, status FROM subscriptions WHERE provider_subscription_id IN (?,?)").all(r1, r2);
  let allOk = true;
  for (const x of rows) {
    const custOk = String(x.cust ?? "").includes(phone);
    const priceOk = x.price_cents === (x.plan_id === 5 ? 14700 : 4900);
    if (!custOk || !priceOk) allOk = false;
    console.log(`${x.ref.slice(0, 9)}  plan=${x.plan_id}  cust_ok=${custOk}  price=${x.price_cents}  status=${x.status}`);
  }
  console.log(allOk && rows.length === 2 ? "PASS fix webhook (transaction + héritage)" : "FAIL fix webhook");
  await api("/api/auth/logout", { method: "POST" });
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
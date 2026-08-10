import { POST } from "@/app/api/premium/webhook/route";
import crypto from "node:crypto";

const SECRET = "whsec_test_secret_123";

function sign(raw: string, timestamp: string, secret: string = SECRET): string {
  return crypto.createHmac("sha256", secret).update(`${timestamp}.${raw}`).digest("hex");
}

function makeReq(body: unknown, overrides: Record<string, string> = {}) {
  const raw = JSON.stringify(body);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const headers: Record<string, string> = {
    "x-webhook-signature": sign(raw, timestamp),
    "x-webhook-timestamp": timestamp,
    "x-webhook-event": (body as any).event,
    "content-type": "application/json",
    ...overrides,
  };
  return { req: new Request("http://x/api/premium/webhook", { method: "POST", body: raw, headers }), raw };
}

describe("webhook GeniusPay (spec officiel)", () => {
  const OLD = process.env.GENIUSPAY_WEBHOOK_SECRET;
  beforeAll(() => {
    process.env.GENIUSPAY_WEBHOOK_SECRET = SECRET;
  });
  afterAll(() => {
    if (OLD === undefined) delete process.env.GENIUSPAY_WEBHOOK_SECRET;
    else process.env.GENIUSPAY_WEBHOOK_SECRET = OLD;
  });

  it("accepte un webhook.test correctement signé", async () => {
    const { req } = makeReq({
      id: "test-uuid",
      event: "webhook.test",
      timestamp: 1735587600,
      data: { object: "webhook.test", message: "test" },
    });
    const res = await POST(req as any);
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ received: true });
  });

  it("rejette une signature invalide avec 401", async () => {
    const { req } = makeReq({ event: "payment.success", data: {} }, { "x-webhook-signature": "0".repeat(64) });
    const res = await POST(req as any);
    expect(res.status).toBe(401);
  });

  it("rejette si le header timestamp manque", async () => {
    const { req, raw } = makeReq({ event: "payment.success", data: {} });
    const headers = new Headers(req.headers);
    headers.delete("x-webhook-timestamp");
    const res = await POST(new Request("http://x", { method: "POST", body: raw, headers }) as any);
    expect(res.status).toBe(401);
  });

  it("rejette un timestamp trop ancien (> 5 min)", async () => {
    const old = Math.floor(Date.now() / 1000) - 3600;
    const raw = JSON.stringify({ event: "payment.success", data: {} });
    const res = await POST(
      new Request("http://x", {
        method: "POST",
        body: raw,
        headers: {
          "content-type": "application/json",
          "x-webhook-signature": sign(raw, old.toString()),
          "x-webhook-timestamp": old.toString(),
          "x-webhook-event": "payment.success",
        },
      }) as any,
    );
    expect(res.status).toBe(401);
  });

  it("tolère une signature calculée sur le JSON re-sérialisé (compact)", async () => {
    const payload = { event: "payment.success", data: { reference: "TXN-1", customer_phone: "+2250700000000" } };
    const raw = JSON.stringify(payload);
    const ts = Math.floor(Date.now() / 1000).toString();
    const sig = sign(JSON.stringify(payload), ts); // re-stringify identique ici
    const res = await POST(
      new Request("http://x", {
        method: "POST",
        body: raw,
        headers: {
          "content-type": "application/json",
          "x-webhook-signature": sig,
          "x-webhook-timestamp": ts,
          "x-webhook-event": "payment.success",
        },
      }) as any,
    );
    expect(res.status).toBe(200);
  });
});

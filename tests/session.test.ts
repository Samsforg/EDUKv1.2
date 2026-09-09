import { createHmac, timingSafeEqual } from "node:crypto";

const TOKEN_VERSION = "v1";

function signToken(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function signPayload(userId: number, exp: number, secret: string): string {
  const payload = Buffer.from(JSON.stringify({ uid: userId, exp })).toString("base64url");
  return `${TOKEN_VERSION}.${payload}.${signToken(payload, secret)}`;
}

function verifySessionToken(token: string, secret: string): { uid: number; exp: number } | null {
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== TOKEN_VERSION) return null;
  const [, payload, sig] = parts;
  const expected = signToken(payload, secret);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof data.uid !== "number" || typeof data.exp !== "number") return null;
    if (data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

describe("session token", () => {
  const SECRET = "test-session-secret-key-for-unit-tests";

  it("should create and verify a valid session token", () => {
    const token = signPayload(42, Date.now() + 86400000, SECRET);
    const session = verifySessionToken(token, SECRET);
    expect(session).not.toBeNull();
    expect(session!.uid).toBe(42);
  });

  it("should reject expired tokens", () => {
    const token = signPayload(42, Date.now() - 1000, SECRET);
    const session = verifySessionToken(token, SECRET);
    expect(session).toBeNull();
  });

  it("should reject tokens with wrong secret", () => {
    const token = signPayload(42, Date.now() + 86400000, SECRET);
    const session = verifySessionToken(token, "wrong-secret");
    expect(session).toBeNull();
  });

  it("should reject malformed tokens", () => {
    expect(verifySessionToken("not-a-token", SECRET)).toBeNull();
    expect(verifySessionToken("v1.bad.sig", SECRET)).toBeNull();
    expect(verifySessionToken("v2.payload.sig", SECRET)).toBeNull();
  });

  it("should reject tokens with invalid payload", () => {
    const badPayload = Buffer.from(JSON.stringify({ uid: "not-a-number" })).toString("base64url");
    const sig = signToken(badPayload, SECRET);
    const token = `v1.${badPayload}.${sig}`;
    expect(verifySessionToken(token, SECRET)).toBeNull();
  });
});

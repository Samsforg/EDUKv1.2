import { NextRequest, NextResponse } from "next/server";

function requireCronSecret(req: NextRequest): NextResponse | null {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "CRON_SECRET non configuré — route désactivée" },
      { status: 500 },
    );
  }

  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  return null;
}

function makeReq(authHeader?: string): NextRequest {
  return new NextRequest("https://example.com/api/cron/test", {
    headers: authHeader ? { authorization: authHeader } : {},
  });
}

describe("requireCronSecret", () => {
  const originalEnv = process.env.CRON_SECRET;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.CRON_SECRET;
    } else {
      process.env.CRON_SECRET = originalEnv;
    }
  });

  it("should reject when CRON_SECRET is not set", () => {
    delete process.env.CRON_SECRET;
    const res = requireCronSecret(makeReq("Bearer test"));
    expect(res).not.toBeNull();
    expect(res!.status).toBe(500);
  });

  it("should reject when authorization header is missing", () => {
    process.env.CRON_SECRET = "my-secret";
    const res = requireCronSecret(makeReq());
    expect(res).not.toBeNull();
    expect(res!.status).toBe(401);
  });

  it("should reject when authorization header is wrong", () => {
    process.env.CRON_SECRET = "my-secret";
    const res = requireCronSecret(makeReq("Bearer wrong-secret"));
    expect(res).not.toBeNull();
    expect(res!.status).toBe(401);
  });

  it("should pass when authorization header matches", () => {
    process.env.CRON_SECRET = "my-secret";
    const res = requireCronSecret(makeReq("Bearer my-secret"));
    expect(res).toBeNull();
  });
});

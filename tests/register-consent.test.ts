import { POST } from "@/app/api/auth/register/route";
import { NextRequest } from "next/server";
import { queryOne } from "@/lib/db";

function makeReq(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": `test-${Date.now()}.0.0.1` },
    body: JSON.stringify(body),
  });
}

describe("register — consentement RGPD", () => {
  it("rejette 400 si accept_privacy est absent", async () => {
    const res = await (POST as any)(
      makeReq({
        first_name: "Test",
        last_name: "Consent",
        email: `c-${Date.now()}@test.ci`,
        password: "secret123",
      }),
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/politique de confidentialité/i);
  });

  it("rejette 400 si accept_privacy est false", async () => {
    const res = await (POST as any)(
      makeReq({
        first_name: "Test",
        last_name: "Consent",
        email: `c2-${Date.now()}@test.ci`,
        password: "secret123",
        accept_privacy: false,
      }),
    );
    expect(res.status).toBe(400);
  });

  it("accepte 201 si accept_privacy est true", async () => {
    const email = `c3-${Date.now()}@test.ci`;
    const res = await (POST as any)(
      makeReq({
        first_name: "Test",
        last_name: "Consent",
        email,
        password: "secret123",
        accept_privacy: true,
        class_level: "Terminale",
      }),
    );
    expect(res.status).toBe(201);

    const user = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ?", email);
    expect(user).toBeTruthy();
    const consent = await queryOne<{ type: string; ip: string }>(
      "SELECT type, ip FROM user_consents WHERE user_id = ?",
      user!.id,
    );
    expect(consent).toBeTruthy();
    expect(consent!.type).toBe("privacy_policy");
    expect(consent!.ip).toMatch(/^test-/);
  });
});

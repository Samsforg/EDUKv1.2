import { hashPassword } from "@/lib/auth";
import { run, queryOne } from "@/lib/db";
import { GET as exportGET } from "@/app/api/me/export/route";
import { DELETE } from "@/app/api/me/route";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/auth/register/route";

const mockGetCurrentUser = jest.fn();

jest.mock("@/lib/session", () => ({
  ...jest.requireActual("@/lib/session"),
  getCurrentUser: () => mockGetCurrentUser(),
}));

async function makeUser(email: string): Promise<number> {
  await run(
    `INSERT INTO users (role, email, password_hash, first_name, last_name, class_level, referral_code)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    "student",
    email,
    hashPassword("test123"),
    "GDPR",
    "Test",
    "Terminale",
    `EDK-TEST-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
  );
  const u = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ?", email);
  return u!.id;
}

describe("GDPR — data export & deletion", () => {
  let uid: number;

  beforeAll(async () => {
    uid = await makeUser(`gdpr-${Date.now()}@test.ci`);
    await run(
      "INSERT INTO user_consents (user_id, type, ip, created_at) VALUES (?, 'privacy_policy', '1.2.3.4', datetime('now'))",
      uid,
    );
  });

  beforeEach(() => {
    mockGetCurrentUser.mockReset();
  });

  it("GET /api/me/export → 401 sans session", async () => {
    mockGetCurrentUser.mockResolvedValue(null);
    const res = await (exportGET as any)(new NextRequest("http://localhost/api/me/export"));
    expect(res.status).toBe(401);
  });

  it("GET /api/me/export → 200 avec données JSON et pas de password_hash", async () => {
    mockGetCurrentUser.mockResolvedValue({ id: uid, role: "student" });
    const res = await (exportGET as any)(new NextRequest("http://localhost/api/me/export"));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/json");
    const text = await res.text();
    const payload = JSON.parse(text);
    expect(payload.user_id).toBe(uid);
    expect(payload.profile).toBeTruthy();
    expect(payload.data).toBeTruthy();
    expect(payload.data.consents).toHaveLength(1);
    expect(payload.data.consents[0].type).toBe("privacy_policy");
    expect(text).not.toContain("password_hash");
  });

  it("DELETE /api/me → 200 et le compte est supprimé", async () => {
    mockGetCurrentUser.mockResolvedValue({ id: uid, role: "student" });
    const res = await (DELETE as any)(new NextRequest("http://localhost/api/me", { method: "DELETE" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);

    const remaining = await queryOne<{ id: number }>("SELECT id FROM users WHERE id = ?", uid);
    expect(remaining).toBeUndefined();

    const consentsLeft = await queryOne<{ id: number }>("SELECT id FROM user_consents WHERE user_id = ?", uid);
    expect(consentsLeft).toBeUndefined();
  });
});

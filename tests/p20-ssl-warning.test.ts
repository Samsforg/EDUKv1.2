/**
 * P2.0 C — warning PostgreSQL SSL.
 *
 * Origine : pg-connection-string 2.14 (dépendance de pg 8.22) émet
 * « SECURITY WARNING : SSL modes prefer/require/verify-ca sont des alias
 *  de verify-full » (disparition prévue en pg v9) dès que l'URL contient
 * sslmode=require. Correctif : p20StripSslMode retire sslmode en mémoire
 * dans getPool(), qui fournit déjà ssl:{rejectUnauthorized:true} ≡
 * verify-full → comportement identique, warning = 0.
 *
 * Aucun secret : uniquement des URLs fictives de test.
 */
import { p20StripSslMode } from "@/lib/db";
import { parse } from "pg-connection-string";

const RAW = "postgresql://user:pass@db-****.example.com/edukora?sslmode=require&channel_binding=require";

function captureWarnings(fn: () => unknown): { messages: string[]; ret: unknown } {
  const messages: string[] = [];
  const spy = jest.spyOn(process, "emitWarning").mockImplementation(((...args: unknown[]) => {
    messages.push(String(args[0]));
  }) as never);
  try {
    const ret = fn();
    return { messages, ret };
  } finally {
    spy.mockRestore();
  }
}

describe("P2.0 C — SSL warning", () => {
  test("T-C1 : strip retire sslmode sans rien casser d'autre", () => {
    const out = p20StripSslMode(RAW);
    expect(out).not.toContain("sslmode");
    expect(out).toContain("channel_binding=require");
    expect(out).toContain("db-****.example.com/edukora");
    expect(out).not.toMatch(/\?&|&&|\?$/);
    expect(p20StripSslMode("postgresql://localhost/db")).toBe("postgresql://localhost/db");
    expect(p20StripSslMode("postgresql://localhost/db?sslmode=verify-full")).toBe("postgresql://localhost/db");
    expect(p20StripSslMode("")).toBe("");
    expect(p20StripSslMode(RAW)).toContain("?channel_binding=require");
  });

  test("T-C2 : URL brute → 1 warning SSL ; URL strippée → 0 warning, mêmes options", () => {
    const raw = captureWarnings(() => parse(RAW));
    expect(raw.messages.filter((m) => m.includes("SECURITY WARNING"))).toHaveLength(1);

    const stripped = p20StripSslMode(RAW);
    const clean = captureWarnings(() => parse(stripped));
    expect(clean.messages.filter((m) => m.includes("SECURITY WARNING"))).toHaveLength(0);

    const a = raw.ret as { host: string; database: string; ssl: unknown };
    const b = clean.ret as { host: string; database: string; ssl: unknown };
    expect(b.host).toBe(a.host);
    expect(b.database).toBe(a.database);
    // sslmode retiré → parse ne renvoie plus d'option ssl : getPool fournit
    // ssl:{rejectUnauthorized:true} explicitement (≡ verify-full ancien).
    expect(a.ssl).toBeTruthy();
    expect(b.ssl).toBeFalsy();
  });
});

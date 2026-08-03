import { query, queryOne, run } from "./db";
import { logAudit } from "./audit";

export interface PromoRow {
  id: number;
  code: string;
  discount_type: "percent" | "fixed";
  discount_value: number;
  max_uses: number;
  used_count: number;
  starts_at: string | null;
  expires_at: string | null;
  active: number;
  created_at: string;
  status: "active" | "expired" | "exhausted" | "disabled";
  remaining: number;
}

export function getPromoCodes(): PromoRow[] {
  const rows = query<PromoRow>(
    `SELECT id, code, discount_type, discount_value, max_uses, used_count,
            starts_at, expires_at, active, created_at
     FROM promo_codes ORDER BY id DESC`,
  );
  const today = new Date().toISOString().slice(0, 10);
  return rows.map((r) => {
    let status: PromoRow["status"] = "active";
    if (!r.active) status = "disabled";
    else if (r.expires_at && r.expires_at.slice(0, 10) < today) status = "expired";
    else if (r.max_uses > 0 && r.used_count >= r.max_uses) status = "exhausted";
    return { ...r, status, remaining: Math.max(0, r.max_uses - r.used_count) };
  });
}

export function createPromoCode(
  input: {
    code: string;
    discount_type: "percent" | "fixed";
    discount_value: number;
    max_uses: number;
    starts_at?: string | null;
    expires_at?: string | null;
  },
  actorId: number,
): { ok: true; id: number } | { error: string } {
  const code = input.code.trim().toUpperCase();
  if (!/^[A-Z0-9]{3,20}$/.test(code)) {
    return { error: "Le code doit contenir 3 à 20 lettres ou chiffres (ex. RENTREE25)" };
  }
  if (input.discount_type !== "percent" && input.discount_type !== "fixed") {
    return { error: "Type de remise invalide" };
  }
  const value = Number(input.discount_value);
  if (!Number.isFinite(value) || value <= 0) return { error: "Valeur de remise invalide" };
  if (input.discount_type === "percent" && value > 100) {
    return { error: "Une remise en % ne peut pas dépasser 100" };
  }
  const maxUses = Math.round(Number(input.max_uses));
  if (!Number.isFinite(maxUses) || maxUses < 1) return { error: "Nombre d'utilisations invalide" };

  const existing = queryOne<{ id: number }>("SELECT id FROM promo_codes WHERE code = ?", code);
  if (existing) return { error: "Ce code existe déjà" };

  const id = Number(
    run(
      "INSERT INTO promo_codes (code, discount_type, discount_value, max_uses, starts_at, expires_at, active, created_by) VALUES (?, ?, ?, ?, ?, ?, 1, ?)",
      code,
      input.discount_type,
      value,
      maxUses,
      input.starts_at || null,
      input.expires_at || null,
      actorId,
    ).lastInsertRowid,
  );
  logAudit(
    actorId,
    "promo",
    `Code promo « ${code} » créé (${input.discount_type === "percent" ? `-${value}%` : `-${value} F`}, ${maxUses} util.)`,
  );
  return { ok: true, id };
}

export function setPromoActive(id: number, active: boolean, actorId: number): { ok: true } | { error: string } {
  const row = queryOne<{ id: number; code: string }>("SELECT id, code FROM promo_codes WHERE id = ?", id);
  if (!row) return { error: "Code promo introuvable" };
  run("UPDATE promo_codes SET active = ? WHERE id = ?", active ? 1 : 0, id);
  logAudit(actorId, "promo", `Code promo « ${row.code} » ${active ? "activé" : "désactivé"}`);
  return { ok: true };
}

export function deletePromoCode(id: number, actorId: number): { ok: true } | { error: string } {
  const row = queryOne<{ id: number; code: string }>("SELECT id, code FROM promo_codes WHERE id = ?", id);
  if (!row) return { error: "Code promo introuvable" };
  run("DELETE FROM promo_codes WHERE id = ?", id);
  logAudit(actorId, "promo", `Code promo « ${row.code} » supprimé`);
  return { ok: true };
}

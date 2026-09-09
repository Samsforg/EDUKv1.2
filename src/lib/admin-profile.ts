import { queryOne, run } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export interface AdminProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  serie_id: number | null;
  class_level: string | null;
  commune: string | null;
  xp: number;
  streak: number;
  referral_code: string | null;
  created_at: string | null;
}

export async function getAdminProfile(actorId: number): Promise<AdminProfile | null> {
  return (await queryOne<AdminProfile>(
    `SELECT id, first_name, last_name, email, phone, serie_id, class_level, commune, xp, streak, referral_code, created_at
     FROM users WHERE id = ?`,
    actorId,
  )) ?? null;
}

export async function updateAdminProfile(
  actorId: number,
  fields: Record<string, unknown>,
): Promise<{ ok: true; profile: AdminProfile } | { error: string }> {
  const allowed = ["first_name", "last_name", "email", "phone", "commune"] as const;
  const updates: string[] = [];
  const params: (string | number | null)[] = [];

  for (const [key, value] of Object.entries(fields)) {
    if (!allowed.includes(key as (typeof allowed)[number])) continue;
    const raw = value === undefined ? null : value;
    const v = raw === "" ? null : raw;

    if (key === "first_name" || key === "last_name") {
      if (v === null || !String(v).trim()) return { error: "Le prénom et le nom sont obligatoires" };
    }
    if (key === "email" && v === null) return { error: "L'email est obligatoire" };
    if (v !== null && key === "email") {
      const exists = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ? AND id != ?", String(v), actorId);
      if (exists) return { error: "Cet email est déjà utilisé" };
    }
    if (v !== null && key === "phone") {
      const exists = await queryOne<{ id: number }>("SELECT id FROM users WHERE phone = ? AND id != ?", String(v), actorId);
      if (exists) return { error: "Ce numéro est déjà utilisé" };
    }

    updates.push(`${key} = ?`);
    params.push(v as string | number | null);
  }

  if (updates.length === 0) return { error: "Aucun champ valide à mettre à jour" };

  params.push(actorId);
  await run(`UPDATE users SET ${updates.join(", ")} WHERE id = ?`, ...params);
  await logAudit(actorId, "profile", `Profil administrateur mis à jour : ${Object.keys(fields).join(", ")}`);

  const profile = await getAdminProfile(actorId);
  return { ok: true, profile: profile! };
}

export async function changeAdminPassword(
  actorId: number,
  currentPassword: string,
  newPassword: string,
): Promise<{ ok: true } | { error: string }> {
  const user = await queryOne<{ password_hash: string }>("SELECT password_hash FROM users WHERE id = ?", actorId);
  if (!user) return { error: "Utilisateur introuvable" };
  if (!verifyPassword(currentPassword, user.password_hash)) return { error: "Mot de passe actuel incorrect" };
  if (!newPassword || newPassword.length < 8) {
    return { error: "Le nouveau mot de passe doit contenir au moins 8 caractères" };
  }
  if (newPassword === currentPassword) return { error: "Le nouveau mot de passe doit être différent de l'actuel" };

  await run("UPDATE users SET password_hash = ? WHERE id = ?", hashPassword(newPassword), actorId);
  await run("DELETE FROM sessions WHERE user_id = ?", actorId);
  await logAudit(actorId, "mot_de_passe", "Mot de passe administrateur modifié");
  return { ok: true };
}

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminProfileEditor } from "@/components/admin/AdminProfileEditor";
import { LogoutButton } from "@/components/parent/LogoutButton";

export const metadata: Metadata = { title: "Edukora Admin - Profil" };

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  return (
    <AdminShell active="profile">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">Profil administrateur</h2>
          <p className="text-on-surface-variant font-body mt-1">Configurez entièrement votre profil et vos identifiants.</p>
        </div>
        <LogoutButton redirectTo="/connexion-administrateur-edukora" />
      </div>

      <AdminProfileEditor />
    </AdminShell>
  );
}

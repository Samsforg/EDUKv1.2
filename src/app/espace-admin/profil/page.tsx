import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { AdminShell } from "@/components/admin/AdminShell";
import { LogoutButton } from "@/components/parent/LogoutButton";

export const metadata: Metadata = { title: "Edukora Admin - Profil" };

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  const initials = `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
  const fields = [
    { label: "Email", value: user.email ?? "—" },
    { label: "Téléphone", value: user.phone ?? "—" },
    { label: "Rôle", value: "Administrateur" },
    { label: "Code de parrainage", value: user.referral_code ?? "—" },
    { label: "XP", value: String(user.xp) },
    { label: "Série de jours", value: `${user.streak} j` },
  ];

  return (
    <AdminShell active="profile">
      <section className="mb-6">
        <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">Profil administrateur</h2>
        <p className="text-on-surface-variant font-body mt-1">Vos informations de compte sur la console admin.</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <section className="lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-headline text-3xl font-bold mb-4">
            {initials}
          </div>
          <h3 className="font-headline text-headline-md font-bold text-on-surface">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-sm text-on-surface-variant mt-1">Super Admin • Edukora</p>
          <div className="w-full mt-6">
            <LogoutButton redirectTo="/connexion-administrateur-edukora" />
          </div>
        </section>

        <section className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="p-6 border-b border-outline-variant">
            <h3 className="font-headline text-headline-md font-semibold text-on-surface">Informations du compte</h3>
          </div>
          <div className="divide-y divide-outline-variant">
            {fields.map((f) => (
              <div key={f.label} className="px-6 py-4 flex justify-between items-center gap-4">
                <span className="text-sm text-on-surface-variant">{f.label}</span>
                <span className="font-semibold text-on-surface">{f.value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}

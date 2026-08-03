import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { ParentShell } from "@/components/parent/ParentShell";
import { LogoutButton } from "@/components/parent/LogoutButton";

export const metadata: Metadata = { title: "Espace Parent - Profil" };

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "parent") redirect("/accueil-edukora");

  const initials = `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();

  const links = [
    {
      href: "/espace-parent/reglages-notifications",
      icon: "notifications_active",
      label: "Réglages des notifications",
      desc: "Alertes académiques et communication",
    },
    {
      href: "/espace-parent/jumelage",
      icon: "family_restroom",
      label: "Jumelage Parent-Enfant",
      desc: "Gérer les enfants liés à votre compte",
    },
  ];

  return (
    <ParentShell active="profile">
      <div className="space-y-6">
        <section className="bg-primary rounded-2xl p-6 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-on-primary/10 rounded-full blur-2xl"></div>
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-on-primary flex items-center justify-center text-primary font-headline text-2xl font-extrabold shadow-lg">
              {initials}
            </div>
            <div>
              <h2 className="font-headline text-2xl font-extrabold text-on-primary">
                {user.first_name} {user.last_name}
              </h2>
              <p className="text-on-primary/80 text-sm">{user.email ?? user.phone ?? ""}</p>
            </div>
            <span className="bg-on-primary/20 text-on-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Compte parent
            </span>
          </div>
        </section>

        <section className="space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center gap-4 hover:border-primary transition-colors"
            >
              <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">{l.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-on-surface text-sm">{l.label}</p>
                <p className="text-xs text-on-surface-variant truncate">{l.desc}</p>
              </div>
              <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
            </Link>
          ))}
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 space-y-2">
          <div className="flex justify-between items-center py-1">
            <span className="text-sm text-on-surface-variant">Type de compte</span>
            <span className="text-sm font-semibold text-on-surface">Parent</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-sm text-on-surface-variant">Identifiant</span>
            <span className="text-sm font-semibold text-on-surface truncate max-w-[50%]">
              {user.email ?? user.phone}
            </span>
          </div>
        </section>

        <LogoutButton />
      </div>
    </ParentShell>
  );
}

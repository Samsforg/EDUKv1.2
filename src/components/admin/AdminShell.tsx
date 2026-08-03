import Link from "next/link";
import type { ReactNode } from "react";
import { getCurrentUser } from "@/lib/session";
import { LogoutButton } from "@/components/parent/LogoutButton";

type ActiveTab =
  | "overview"
  | "users"
  | "content"
  | "approval"
  | "moderation"
  | "promo"
  | "disputes"
  | "journal"
  | "referral"
  | "proctoring"
  | "profile";

const TABS: { key: ActiveTab; href: string; icon: string; label: string; mobileLabel: string }[] = [
  { key: "overview", href: "/espace-admin", icon: "dashboard", label: "Overview", mobileLabel: "Overview" },
  { key: "users", href: "/espace-admin/utilisateurs", icon: "group", label: "Utilisateurs", mobileLabel: "Utilisateurs" },
  { key: "content", href: "/espace-admin/cours", icon: "auto_stories", label: "Contenu", mobileLabel: "Contenu" },
  { key: "approval", href: "/espace-admin/approbation", icon: "approval", label: "Approbation", mobileLabel: "Approbation" },
  { key: "moderation", href: "/espace-admin/moderation", icon: "fact_check", label: "Modération", mobileLabel: "Modération" },
  { key: "promo", href: "/espace-admin/promo", icon: "confirmation_number", label: "Codes promo", mobileLabel: "Promo" },
  { key: "disputes", href: "/espace-admin/litiges", icon: "gavel", label: "Litiges", mobileLabel: "Litiges" },
  { key: "journal", href: "/espace-admin/journal", icon: "history", label: "Journal", mobileLabel: "Journal" },
  { key: "referral", href: "/espace-admin/parrainage", icon: "diversity_3", label: "Parrainage", mobileLabel: "Parrainage" },
  { key: "proctoring", href: "/espace-admin/proctoring", icon: "monitor_heart", label: "Proctoring", mobileLabel: "Proctoring" },
  { key: "profile", href: "/espace-admin/profil", icon: "person", label: "Profil", mobileLabel: "Profil" },
];

export async function AdminShell({ active, children }: { active: ActiveTab; children: ReactNode }) {
  const user = await getCurrentUser();
  const initials = user ? `${user.first_name[0] ?? ""}${user.last_name[0] ?? ""}`.toUpperCase() : "AD";

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <aside className="fixed left-0 top-0 h-full flex-col z-40 bg-surface dark:bg-inverse-surface w-64 border-r border-outline-variant hidden md:flex">
        <div className="px-6 py-8 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <img alt="Edukora Logo" className="w-10 h-10 rounded-lg shadow-sm" src="/images/ecran-346.png" />
            <div>
              <h1 className="font-headline text-headline-md font-bold text-primary leading-tight">Console admin</h1>
              <p className="font-body text-label-xs text-on-surface-variant">Contrôleur de plateforme</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 mt-4 overflow-y-auto">
          {TABS.map((t) => (
            <Link
              key={t.key}
              href={t.href}
              className={
                active === t.key
                  ? "flex items-center gap-3 bg-primary-container text-on-primary-container rounded-lg p-3 mx-2 active:scale-95 duration-150 transition-all"
                  : "flex items-center gap-3 text-on-surface-variant p-3 mx-2 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all"
              }
            >
              <span
                className="material-symbols-outlined"
                style={active === t.key ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {t.icon}
              </span>
              <span className="font-body text-body-md whitespace-nowrap">{t.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-outline-variant">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-label text-label-sm font-semibold truncate">
                {user ? `${user.first_name} ${user.last_name}` : "Utilisateur admin"}
              </p>
              <p className="font-label text-label-xs text-on-surface-variant">Super Admin</p>
            </div>
          </div>
          <div className="mt-2">
            <LogoutButton redirectTo="/connexion-administrateur-edukora" />
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen md:ml-64">
        <header className="w-full top-0 sticky z-30 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-sm flex justify-between items-center px-4 md:px-8 py-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-on-primary">shield_person</span>
            <span className="font-headline text-headline-md font-bold text-on-primary">Edukora Admin</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-on-primary/20 flex items-center justify-center text-on-primary border-2 border-on-primary/20">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
          </div>
        </header>

        <div className="flex-1 px-4 md:px-8 py-6 max-w-6xl w-full mx-auto">{children}</div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-highest flex justify-start items-center py-3 z-50 border-t border-outline-variant overflow-x-auto">
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={t.href}
            className={
              (active === t.key ? "text-primary" : "text-on-surface-variant") +
              " flex flex-col items-center gap-1 shrink-0 px-3"
            }
          >
            <span
              className="material-symbols-outlined"
              style={active === t.key ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {t.icon}
            </span>
            <span className="text-[10px] font-bold whitespace-nowrap">{t.mobileLabel}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

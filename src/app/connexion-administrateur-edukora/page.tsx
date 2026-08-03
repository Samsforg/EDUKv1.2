import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { AdminLoginForm } from "./form";

export const metadata: Metadata = { title: "Connexion Sécurisée | Edukora Admin" };

export default async function Page() {
  const user = await getCurrentUser();
  if (user?.role === "admin") redirect("/espace-admin");
  if (user) redirect(user.role === "parent" ? "/espace-parent" : "/accueil-edukora");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 security-pattern pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary-fixed/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-secondary-fixed/20 rounded-full blur-[100px] pointer-events-none"></div>
      <main className="w-full max-w-md px-6 z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-6">
            <img alt="Edukora Logo" className="h-16 w-16 drop-shadow-sm" src="/images/ecran-082.png" />
          </div>
          <h1 className="font-headline text-3xl font-bold text-primary tracking-tight mb-2">Edukora Admin</h1>
          <p className="font-body text-on-surface-variant text-sm font-medium tracking-wide uppercase">Portail Administrateur</p>
        </div>

        <AdminLoginForm />

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-outline-variant/50 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
            </span>
            <span className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Serveurs Opérationnels - UTC+0</span>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-8 px-margin-desktop w-full border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4 text-outline z-10">
        <p className="text-[11px] font-medium">© 2024 Edukora Admin - Portail de Sécurité Académique</p>
        <div className="flex items-center gap-6">
          <a className="text-[11px] font-semibold hover:text-primary transition-colors uppercase tracking-wider" href="/mot-de-passe-oubli-edukora">Mot de passe oublié</a>
          <a className="text-[11px] font-semibold hover:text-primary transition-colors uppercase tracking-wider" href="/">Retour au site</a>
        </div>
      </footer>
    </div>
  );
}

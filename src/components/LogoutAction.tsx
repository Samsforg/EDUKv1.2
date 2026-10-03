"use client";

import type { ReactNode } from "react";

// A5 : la deconnexion est une mutation d'etat et passe désormais par POST,
// protege par verifyCsrf() dans proxy.ts. Le client global installe par
// CsrfInit ajoute automatiquement l'en-tete x-csrf-token : aucun jeton n'a
// donc a etre gere ici.
export async function performLogout(redirectTo = "/connexion-edukora") {
  try {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      window.location.href = redirectTo;
      return;
    }
  } catch {
    // echec reseau : on recharge plutot que de laisser un bouton bloque.
  }
  window.location.reload();
}

export function LogoutLink({
  redirectTo = "/connexion-edukora",
  className,
  children,
}: {
  redirectTo?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" onClick={() => performLogout(redirectTo)} className={className}>
      {children}
    </button>
  );
}
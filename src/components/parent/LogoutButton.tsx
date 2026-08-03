"use client";

import { useState } from "react";

export function LogoutButton({ redirectTo = "/connexion-edukora" }: { redirectTo?: string }) {
  const [loading, setLoading] = useState(false);
  return (
    <button
      onClick={async () => {
        setLoading(true);
        await fetch("/api/auth/logout", { method: "POST" });
        location.href = redirectTo;
      }}
      disabled={loading}
      className="w-full bg-error-container text-on-error-container font-headline font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-md hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60"
    >
      {loading ? (
        <span className="material-symbols-outlined animate-spin">progress_activity</span>
      ) : (
        <>
          <span className="material-symbols-outlined">logout</span>
          Déconnexion
        </>
      )}
    </button>
  );
}

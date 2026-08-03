"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteUserButton({ userId, userName }: { userId: number; userName: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleDelete() {
    if (
      !window.confirm(
        `Supprimer définitivement ${userName} ? Toutes ses données (tentatives, notifications, posts) seront supprimées.`,
      )
    ) {
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
      } else {
        router.refresh();
      }
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={busy}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-on-surface-variant hover:bg-error-container/30 hover:text-error transition-colors disabled:opacity-50"
        title="Supprimer le compte"
      >
        {busy ? (
          <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
        ) : (
          <span className="material-symbols-outlined text-sm">person_remove</span>
        )}
        Supprimer
      </button>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}

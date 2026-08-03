"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeletePostButton({ postId }: { postId: number }) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!window.confirm("Supprimer ce sujet du forum ?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/forum/${postId}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        window.alert(data.error ?? "Erreur lors de la suppression");
      }
    } catch {
      window.alert("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={busy}
      className="flex items-center gap-1 text-error border border-error/40 px-3 py-1 rounded-lg text-label-xs font-semibold hover:bg-error-container/30 transition-colors disabled:opacity-50"
    >
      {busy ? (
        <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
      ) : (
        <>
          <span className="material-symbols-outlined text-sm">delete</span>
          Supprimer
        </>
      )}
    </button>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ApproveButton({ kind, id }: { kind: "quiz" | "paper"; id: number }) {
  const [busy, setBusy] = useState<string | null>(null);
  const router = useRouter();

  async function handle(status: "approved" | "rejected") {
    setBusy(status);
    try {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, status }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        window.alert(data.error ?? "Erreur");
        setBusy(null);
      }
    } catch {
      window.alert("Erreur réseau");
      setBusy(null);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handle("approved")}
        disabled={busy !== null}
        className="flex items-center gap-1 bg-tertiary text-on-tertiary px-3 py-1.5 rounded-lg text-label-xs font-semibold hover:brightness-110 transition-all disabled:opacity-50"
      >
        {busy === "approved" ? (
          <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
        ) : (
          <>
            <span className="material-symbols-outlined text-sm">check_circle</span>
            Approuver
          </>
        )}
      </button>
      <button
        onClick={() => handle("rejected")}
        disabled={busy !== null}
        className="flex items-center gap-1 text-error border border-error/40 px-3 py-1.5 rounded-lg text-label-xs font-semibold hover:bg-error-container/30 transition-colors disabled:opacity-50"
      >
        {busy === "rejected" ? (
          <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
        ) : (
          <>
            <span className="material-symbols-outlined text-sm">block</span>
            Rejeter
          </>
        )}
      </button>
    </div>
  );
}

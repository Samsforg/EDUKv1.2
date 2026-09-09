"use client";

import { useState } from "react";
import { getCsrfToken } from "@/lib/csrf-client";

export function PurgeTestAccountsButton({ count }: { count: number }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  if (count === 0) return null;
  if (result) {
    return (
      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${result.ok ? "bg-tertiary-container text-on-tertiary-container" : "bg-error-container text-on-error-container"}`}>
        <span className="material-symbols-outlined text-[18px]">{result.ok ? "check_circle" : "error"}</span>
        {result.message}
      </div>
    );
  }

  return (
    <button
      onClick={async () => {
        if (!confirm(`Supprimer les ${count} comptes de test ? Cette action est irréversible.`)) return;
        setLoading(true);
        try {
          const token = await getCsrfToken();
          const headers: Record<string, string> = { "Content-Type": "application/json" };
          if (token) headers["x-csrf-token"] = token;
          const res = await fetch("/api/admin/test-accounts", { method: "DELETE", headers });
          const data = await res.json();
          if (res.ok) {
            setResult({ ok: true, message: `${data.deleted} compte(s) de test supprimé(s).` });
          } else {
            setResult({ ok: false, message: data.error || "Erreur" });
          }
        } catch (e) {
          setResult({ ok: false, message: e instanceof Error ? e.message : "Erreur réseau" });
        } finally {
          setLoading(false);
        }
      }}
      disabled={loading}
      className="bg-error-container text-on-error-container px-4 py-2 rounded-lg font-label text-label-sm font-semibold flex items-center gap-2 hover:brightness-90 transition-opacity disabled:opacity-50"
    >
      <span className="material-symbols-outlined text-[18px]">{loading ? "progress_activity" : "delete_sweep"}</span>
      Supprimer {count} compte{count > 1 ? "s" : ""} de test
    </button>
  );
}

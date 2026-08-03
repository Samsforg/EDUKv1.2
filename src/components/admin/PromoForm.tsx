"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function PromoForm() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [type, setType] = useState<"percent" | "fixed">("percent");
  const [value, setValue] = useState("");
  const [maxUses, setMaxUses] = useState("100");
  const [expiresAt, setExpiresAt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          discount_type: type,
          discount_value: Number(value),
          max_uses: Number(maxUses),
          expires_at: expiresAt || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
        return;
      }
      setOpen(false);
      setCode("");
      setValue("");
      setMaxUses("100");
      setExpiresAt("");
      router.refresh();
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg text-label-sm font-semibold hover:opacity-90 transition-opacity"
      >
        <span className="material-symbols-outlined text-[18px]">add</span>
        Nouveau code
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-surface-container-low border border-outline-variant rounded-xl shadow-lg p-4 z-20">
          <p className="text-label-sm font-semibold text-on-surface mb-3">Créer un code promo</p>
          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="block text-xs text-on-surface-variant mb-1">Code (lettres et chiffres)</label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="RENTREE25"
                className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary uppercase"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-on-surface-variant mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as "percent" | "fixed")}
                  className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none"
                >
                  <option value="percent">% de remise</option>
                  <option value="fixed">Montant fixe (F)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-on-surface-variant mb-1">Valeur</label>
                <input
                  type="number"
                  min="1"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={type === "percent" ? "25" : "10000"}
                  className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-on-surface-variant mb-1">Utilisations max</label>
                <input
                  type="number"
                  min="1"
                  value={maxUses}
                  onChange={(e) => setMaxUses(e.target.value)}
                  className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-on-surface-variant mb-1">Expire le (optionnel)</label>
                <input
                  type="date"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            {error && <p className="text-xs text-error">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full flex items-center justify-center gap-1 bg-primary text-on-primary rounded-lg px-3 py-2 text-label-sm font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {busy ? <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> : <span className="material-symbols-outlined text-sm">confirmation_number</span>}
              Créer le code
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface TariffPlan {
  id: number;
  name: string;
  interval: string;
  price_cents: number;
  currency: string;
  features: string | null;
  sort_order: number;
}

const INTERVAL_LABEL: Record<string, string> = {
  month: "Mensuel",
  quarter: "Trimestriel",
  year: "Annuel",
};

function formatPrice(p: number): string {
  return `${p.toLocaleString("fr-FR")} FCFA`;
}

export function TariffsManager({ initialPlans }: { initialPlans: TariffPlan[] }) {
  const router = useRouter();
  const [plans, setPlans] = useState<TariffPlan[]>(initialPlans);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", interval: "month", price_cents: "", features: "", sort_order: "0" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  function startEdit(p: TariffPlan) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      interval: p.interval,
      price_cents: String(p.price_cents),
      features: p.features ?? "",
      sort_order: String(p.sort_order),
    });
    setError("");
    setDone("");
  }

  function startAdd() {
    setEditingId(0);
    setForm({ name: "", interval: "month", price_cents: "4900", features: "", sort_order: String(plans.length) });
    setError("");
    setDone("");
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setDone("");
    try {
      const payload = {
        name: form.name.trim(),
        interval: form.interval,
        price_cents: Math.max(0, Math.round(Number(form.price_cents) || 0)),
        features: form.features,
        sort_order: Math.round(Number(form.sort_order) || 0),
      };
      const url = editingId ? `/api/admin/plans/${editingId}` : "/api/admin/plans";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur lors de l'enregistrement");
        return;
      }
      setDone(editingId ? "Plan mis à jour avec succès." : "Plan créé avec succès.");
      setEditingId(null);
      router.refresh();
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  async function removePlan(p: TariffPlan) {
    if (!window.confirm(`Supprimer le plan « ${p.name} » ?`)) return;
    setBusy(true);
    setError("");
    setDone("");
    try {
      const res = await fetch(`/api/admin/plans/${p.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur lors de la suppression");
        return;
      }
      setDone("Plan supprimé.");
      router.refresh();
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  const inputCls =
    "w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary";

  return (
    <div className="space-y-4">
      {error && <p className="text-sm text-error bg-error-container/40 rounded-lg px-4 py-3">{error}</p>}
      {done && (
        <p className="text-sm text-primary bg-primary-container/40 rounded-lg px-4 py-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          {done}
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {plans.map((p) => (
          <div key={p.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            {editingId === p.id ? (
              <form onSubmit={save} className="space-y-3">
                <p className="text-sm font-semibold text-on-surface">Modifier le plan</p>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Nom du plan"
                  required
                  className={inputCls}
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={form.interval}
                    onChange={(e) => setForm((f) => ({ ...f, interval: e.target.value }))}
                    className={inputCls}
                  >
                    <option value="month">Mensuel</option>
                    <option value="quarter">Trimestriel</option>
                    <option value="year">Annuel</option>
                  </select>
                  <input
                    value={form.price_cents}
                    onChange={(e) => setForm((f) => ({ ...f, price_cents: e.target.value }))}
                    type="number"
                    min={0}
                    step={100}
                    placeholder="Prix (FCFA)"
                    required
                    className={inputCls}
                  />
                </div>
                <textarea
                  value={form.features}
                  onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
                  placeholder={"Avantages (un par ligne)"}
                  rows={5}
                  className={`${inputCls} leading-relaxed`}
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-on-surface-variant whitespace-nowrap">Ordre d'affichage</span>
                  <input
                    value={form.sort_order}
                    onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
                    type="number"
                    className={`${inputCls} max-w-24`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    disabled={busy}
                    className="flex items-center gap-1 bg-primary text-on-primary rounded-lg px-3 py-2 text-sm font-semibold hover:opacity-90 disabled:opacity-50"
                  >
                    {busy ? (
                      <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                    ) : (
                      <span className="material-symbols-outlined text-sm">save</span>
                    )}
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="px-3 py-2 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-on-surface">{p.name}</h3>
                    <p className="text-xs text-on-surface-variant">
                      {INTERVAL_LABEL[p.interval] ?? p.interval} • {formatPrice(p.price_cents)}
                    </p>
                  </div>
                  {p.price_cents === 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-tertiary-container text-on-tertiary-container shrink-0">
                      Gratuit
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary-container text-on-primary-container shrink-0">
                      Payant
                    </span>
                  )}
                </div>
                <ul className="space-y-1 mb-4">
                  {(p.features ?? "").split("\n").filter(Boolean).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-[14px] text-primary shrink-0">check</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                    Modifier
                  </button>
                  <button
                    onClick={() => removePlan(p)}
                    disabled={busy}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-error hover:bg-error-container/40 transition-colors disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                    Supprimer
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {editingId === 0 && (
          <div className="bg-surface-container-lowest border border-primary/40 rounded-xl p-5">
            <form onSubmit={save} className="space-y-3">
              <p className="text-sm font-semibold text-on-surface">Nouveau plan</p>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Nom du plan"
                required
                className={inputCls}
              />
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={form.interval}
                  onChange={(e) => setForm((f) => ({ ...f, interval: e.target.value }))}
                  className={inputCls}
                >
                  <option value="month">Mensuel</option>
                  <option value="quarter">Trimestriel</option>
                  <option value="year">Annuel</option>
                </select>
                <input
                  value={form.price_cents}
                  onChange={(e) => setForm((f) => ({ ...f, price_cents: e.target.value }))}
                  type="number"
                  min={0}
                  step={100}
                  placeholder="Prix (FCFA)"
                  required
                  className={inputCls}
                />
              </div>
              <textarea
                value={form.features}
                onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
                placeholder={"Avantages (un par ligne)"}
                rows={5}
                className={`${inputCls} leading-relaxed`}
              />
              <div className="flex items-center gap-2">
                <span className="text-xs text-on-surface-variant whitespace-nowrap">Ordre d'affichage</span>
                <input
                  value={form.sort_order}
                  onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
                  type="number"
                  className={`${inputCls} max-w-24`}
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={busy}
                  className="flex items-center gap-1 bg-primary text-on-primary rounded-lg px-3 py-2 text-sm font-semibold hover:opacity-90 disabled:opacity-50"
                >
                  {busy ? (
                    <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                  ) : (
                    <span className="material-symbols-outlined text-sm">add</span>
                  )}
                  Créer le plan
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {editingId !== 0 && (
        <button
          onClick={startAdd}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-primary border border-primary/40 hover:bg-primary/5 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Ajouter un plan
        </button>
      )}
    </div>
  );
}

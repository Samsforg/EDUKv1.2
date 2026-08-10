"use client";

import { useEffect, useState } from "react";

interface Ad {
  id: number;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  link_url: string | null;
  background: string | null;
  enabled: number;
  sort_order: number;
  created_at: string | null;
}

type FormState = {
  title: string;
  subtitle: string;
  image_url: string;
  link_url: string;
  background: string;
  enabled: boolean;
  sort_order: string;
};

const EMPTY: FormState = {
  title: "",
  subtitle: "",
  image_url: "",
  link_url: "",
  background: "",
  enabled: true,
  sort_order: "0",
};

const PRESETS = [
  { label: "Ivoire", value: "#f5f5f4" },
  { label: "Bleu", value: "#1e3a5f" },
  { label: "Indigo", value: "#4338ca" },
  { label: "Vert", value: "#166534" },
  { label: "Orange", value: "#c2410c" },
  { label: "Rouge", value: "#b91c1c" },
  { label: "Noir", value: "#111827" },
];

export function AdsManager() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/ads")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setAds(d.ads ?? []))
      .catch(() => setError("Impossible de charger les pubs."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startEdit = (ad?: Ad) => {
    setEditing(ad?.id ?? null);
    setError(null);
    setSuccess(null);
    if (ad) {
      setForm({
        title: ad.title,
        subtitle: ad.subtitle ?? "",
        image_url: ad.image_url ?? "",
        link_url: ad.link_url ?? "",
        background: ad.background ?? "",
        enabled: ad.enabled === 1,
        sort_order: String(ad.sort_order),
      });
    } else {
      setForm(EMPTY);
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    const payload = {
      ...form,
      enabled: form.enabled,
      sort_order: Number(form.sort_order) || 0,
    };
    try {
      const url = editing ? `/api/admin/ads/${editing}` : "/api/admin/ads";
      const method = editing ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Erreur lors de l'enregistrement.");
      } else {
        setSuccess(editing ? "Pub mise à jour." : "Pub créée.");
        setEditing(null);
        load();
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setSaving(false);
    }
  };

  const toggleEnabled = async (ad: Ad) => {
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`/api/admin/ads/${ad.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...ad, title: ad.title, enabled: ad.enabled === 1 ? 0 : 1 }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setError(json.error ?? "Erreur lors de la bascule.");
      } else {
        load();
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    }
  };

  const remove = async (ad: Ad) => {
    if (!confirm(`Supprimer la pub « ${ad.title} » ?`)) return;
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`/api/admin/ads/${ad.id}`, { method: "DELETE" });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setError(json.error ?? "Erreur lors de la suppression.");
      } else {
        setSuccess("Pub supprimée.");
        load();
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    }
  };

  const inputCls =
    "w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";

  return (
    <div className="space-y-6">
      {error && (
        <p className="text-sm text-error bg-error-container/40 rounded-lg px-4 py-3">{error}</p>
      )}
      {success && (
        <p className="text-sm text-primary bg-primary-container/40 rounded-lg px-4 py-3">{success}</p>
      )}

      <form onSubmit={save} className="bg-surface border border-outline-variant rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-label-md font-semibold text-on-surface">
            {editing ? `Modifier « ${ads.find((a) => a.id === editing)?.title ?? ""} »` : "Nouvelle pub"}
          </h3>
          {editing !== null && (
            <button
              type="button"
              onClick={() => startEdit()}
              className="text-label-sm text-on-surface-variant hover:text-primary"
            >
              Annuler
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-on-surface">Titre *</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              maxLength={80}
              placeholder="Ex : Obtiens ton BAC avec Edukora"
              className={inputCls}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-on-surface">Sous-titre</label>
            <input
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              maxLength={200}
              placeholder="Ex : -20% sur l'abonnement jusqu'à dimanche"
              className={inputCls}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-on-surface">Image (URL)</label>
            <input
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              placeholder="https://exemple.com/pub.jpg (optionnel)"
              className={inputCls}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-on-surface">Lien de destination</label>
            <input
              value={form.link_url}
              onChange={(e) => setForm({ ...form, link_url: e.target.value })}
              placeholder="https://exemple.com/offre (optionnel)"
              className={inputCls}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-on-surface">Couleur de fond</label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setForm({ ...form, background: p.value })}
                  className={`w-9 h-9 rounded-lg border-2 transition-transform hover:scale-105 ${
                    form.background === p.value ? "border-primary scale-110" : "border-outline-variant"
                  }`}
                  style={{ backgroundColor: p.value }}
                  aria-label={p.label}
                  title={p.label}
                />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-on-surface">Ordre d'affichage</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
              min={0}
              className={inputCls}
            />
            <p className="text-xs text-on-surface-variant">Les pubs sont triées par ordre croissant.</p>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-on-surface cursor-pointer">
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
            className="w-5 h-5 text-primary border-outline-variant rounded focus:ring-primary bg-surface"
          />
          Pub activée (affichée sur la page d&apos;accueil)
        </label>

        <button
          type="submit"
          disabled={saving}
          className="w-full md:w-auto bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {saving ? (
            <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
          ) : (
            <span className="material-symbols-outlined text-lg">campaign</span>
          )}
          {editing ? "Enregistrer les modifications" : "Créer la pub"}
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="font-label-md font-semibold text-on-surface">Pubs existantes ({ads.length})</h3>
        {loading ? (
          <p className="text-on-surface-variant text-sm">Chargement…</p>
        ) : ads.length === 0 ? (
          <p className="bg-surface border border-outline-variant rounded-xl p-5 text-center font-body-sm text-on-surface-variant">
            Aucune pub pour l&apos;instant. Créez votre première bannière ci-dessus.
          </p>
        ) : (
          ads.map((ad) => (
            <div
              key={ad.id}
              className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4"
            >
              <div
                className="w-24 h-16 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                style={{ backgroundColor: ad.background ?? "#e0e0e0" }}
              >
                {ad.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={ad.image_url} alt={ad.title} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <span className="material-symbols-outlined text-on-surface-variant">campaign</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-label-md font-semibold text-on-surface truncate">{ad.title}</p>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ad.enabled === 1 ? "bg-primary-container text-on-primary-container" : "bg-outline-variant/50 text-on-surface-variant"
                    }`}
                  >
                    {ad.enabled === 1 ? "ACTIVE" : "INACTIVE"}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">
                    ordre {ad.sort_order}
                  </span>
                </div>
                {ad.subtitle && <p className="font-label-xs text-on-surface-variant truncate">{ad.subtitle}</p>}
                {ad.link_url && (
                  <p className="font-label-xs text-primary truncate">{ad.link_url}</p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleEnabled(ad)}
                  className="w-9 h-9 rounded-lg bg-surface-container-high text-on-surface-variant flex items-center justify-center hover:text-primary transition-colors"
                  aria-label={ad.enabled === 1 ? "Désactiver" : "Activer"}
                  title={ad.enabled === 1 ? "Désactiver" : "Activer"}
                >
                  <span className="material-symbols-outlined text-lg">
                    {ad.enabled === 1 ? "visibility" : "visibility_off"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => startEdit(ad)}
                  className="w-9 h-9 rounded-lg bg-surface-container-high text-on-surface-variant flex items-center justify-center hover:text-primary transition-colors"
                  aria-label="Modifier"
                  title="Modifier"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => remove(ad)}
                  className="w-9 h-9 rounded-lg bg-error-container/30 text-error flex items-center justify-center hover:bg-error-container/60 transition-colors"
                  aria-label="Supprimer"
                  title="Supprimer"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
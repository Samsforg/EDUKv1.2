"use client";

import { useEffect, useState } from "react";

interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  commune: string | null;
  created_at: string | null;
}

const INPUT_CLASS =
  "w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary";

export function AdminProfileEditor() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    commune: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/profile")
      .then((r) => r.json())
      .then((p) => {
        if (cancelled) return;
        if (p.profile) {
          setProfile(p.profile);
          setForm({
            first_name: p.profile.first_name ?? "",
            last_name: p.profile.last_name ?? "",
            email: p.profile.email ?? "",
            phone: p.profile.phone ?? "",
            commune: p.profile.commune ?? "",
          });
        }
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setSuccess(false);
    setError("");
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!form.first_name.trim() || !form.last_name.trim()) {
      setError("Le prénom et le nom sont obligatoires.");
      return;
    }
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      const payload: Record<string, unknown> = {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
      };
      if (form.phone.trim()) payload.phone = form.phone.trim();
      if (form.commune.trim()) payload.commune = form.commune.trim();

      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur lors de l'enregistrement");
        return;
      }
      if (data.profile) setProfile(data.profile);
      setSuccess(true);
    } catch {
      setError("Erreur réseau");
    } finally {
      setSaving(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (pw.next.length < 8) {
      setPwError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (pw.next !== pw.confirm) {
      setPwError("La confirmation ne correspond pas au nouveau mot de passe.");
      return;
    }
    setPwSaving(true);
    setPwError("");
    setPwSuccess(false);
    try {
      const res = await fetch("/api/admin/profile/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: pw.current, newPassword: pw.next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPwError(data.error ?? "Erreur lors du changement de mot de passe");
        return;
      }
      setPw({ current: "", next: "", confirm: "" });
      setPwSuccess(true);
    } catch {
      setPwError("Erreur réseau");
    } finally {
      setPwSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-on-surface-variant">
        <span className="material-symbols-outlined animate-spin">progress_activity</span>
      </div>
    );
  }

  const initials = profile ? `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase() : "AD";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <section className="lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-headline text-3xl font-bold mb-4">
          {initials}
        </div>
        <h3 className="font-headline text-headline-md font-bold text-on-surface">
          {profile?.first_name} {profile?.last_name}
        </h3>
        <p className="text-sm text-on-surface-variant mt-1">Compte administrateur</p>
        <div className="w-full mt-6 space-y-2">
          <div className="bg-surface-container rounded-xl p-4 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant">Email</span>
            <span className="font-semibold text-on-surface truncate ml-2">{profile?.email ?? "—"}</span>
          </div>
          <div className="bg-surface-container rounded-xl p-4 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant">Téléphone</span>
            <span className="font-semibold text-on-surface">{profile?.phone ?? "—"}</span>
          </div>
          <div className="bg-surface-container rounded-xl p-4 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant">Commune</span>
            <span className="font-semibold text-on-surface">{profile?.commune ?? "—"}</span>
          </div>
          <div className="bg-surface-container rounded-xl p-4 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant">Membre depuis</span>
            <span className="font-semibold text-on-surface">
              {profile?.created_at ? new Date(profile.created_at).toLocaleDateString("fr-FR") : "—"}
            </span>
          </div>
        </div>
      </section>

      <div className="lg:col-span-8 space-y-4">
        <form onSubmit={saveProfile} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="p-6 border-b border-outline-variant">
            <h3 className="font-headline text-headline-md font-semibold text-on-surface">Informations du compte</h3>
            <p className="text-sm text-on-surface-variant mt-1">Configurez les informations de votre profil d'administrateur.</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="font-label-sm text-on-surface-variant mb-1 block">Prénom</span>
                <input value={form.first_name} onChange={(e) => set("first_name", e.target.value)} required className={INPUT_CLASS} />
              </label>
              <label className="block">
                <span className="font-label-sm text-on-surface-variant mb-1 block">Nom</span>
                <input value={form.last_name} onChange={(e) => set("last_name", e.target.value)} required className={INPUT_CLASS} />
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="font-label-sm text-on-surface-variant mb-1 block">Email (identifiant de connexion)</span>
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required className={INPUT_CLASS} />
              </label>
              <label className="block">
                <span className="font-label-sm text-on-surface-variant mb-1 block">Téléphone</span>
                <input value={form.phone} onChange={(e) => set("phone", e.target.value)} className={INPUT_CLASS} />
              </label>
            </div>
            <label className="block">
              <span className="font-label-sm text-on-surface-variant mb-1 block">Commune</span>
              <input value={form.commune} onChange={(e) => set("commune", e.target.value)} placeholder="Ex. Cocody" className={INPUT_CLASS} />
            </label>

            {error && <p className="bg-error-container/20 text-error font-label-sm px-4 py-3 rounded-xl">{error}</p>}
            {success && (
              <p className="bg-tertiary-container/30 text-tertiary font-label-sm px-4 py-3 rounded-xl flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Profil mis à jour avec succès.
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="h-11 px-6 rounded-full bg-primary text-on-primary font-label-md font-semibold flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98] transition-transform duration-100"
              >
                {saving ? (
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-[18px]">save</span>
                )}
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </form>

        <form onSubmit={changePassword} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="p-6 border-b border-outline-variant">
            <h3 className="font-headline text-headline-md font-semibold text-on-surface">Changer le mot de passe</h3>
            <p className="text-sm text-on-surface-variant mt-1">Après modification, vous serez déconnecté des autres sessions.</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="block">
                <span className="font-label-sm text-on-surface-variant mb-1 block">Mot de passe actuel</span>
                <input
                  type="password"
                  value={pw.current}
                  onChange={(e) => {
                    setPw((p) => ({ ...p, current: e.target.value }));
                    setPwSuccess(false);
                    setPwError("");
                  }}
                  required
                  className={INPUT_CLASS}
                />
              </label>
              <label className="block">
                <span className="font-label-sm text-on-surface-variant mb-1 block">Nouveau mot de passe</span>
                <input
                  type="password"
                  value={pw.next}
                  onChange={(e) => {
                    setPw((p) => ({ ...p, next: e.target.value }));
                    setPwSuccess(false);
                    setPwError("");
                  }}
                  required
                  minLength={8}
                  className={INPUT_CLASS}
                />
              </label>
              <label className="block">
                <span className="font-label-sm text-on-surface-variant mb-1 block">Confirmer le nouveau mot de passe</span>
                <input
                  type="password"
                  value={pw.confirm}
                  onChange={(e) => {
                    setPw((p) => ({ ...p, confirm: e.target.value }));
                    setPwSuccess(false);
                    setPwError("");
                  }}
                  required
                  minLength={8}
                  className={INPUT_CLASS}
                />
              </label>
            </div>

            {pwError && <p className="bg-error-container/20 text-error font-label-sm px-4 py-3 rounded-xl">{pwError}</p>}
            {pwSuccess && (
              <p className="bg-tertiary-container/30 text-tertiary font-label-sm px-4 py-3 rounded-xl flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Mot de passe modifié avec succès.
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={pwSaving}
                className="h-11 px-6 rounded-full bg-primary text-on-primary font-label-md font-semibold flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98] transition-transform duration-100"
              >
                {pwSaving ? (
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-[18px]">key</span>
                )}
                Changer le mot de passe
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

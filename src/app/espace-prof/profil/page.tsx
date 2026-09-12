"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const COMMUNES = ["Abobo", "Adjamé", "Attécoubé", "Cocody", "Koumassi", "Marcory", "Plateau", "Port-Bouët", "Treichville", "Yopougon", "Bouaké", "Yamoussoukro", "Daloa", "Korhogo", "San-Pédro", "Man", "Gagnoa", "Divo", "Abengourou", "Anyama", "Bingerville", "Grand-Bassam"];

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  commune: string | null;
  gender: string | null;
  role: string;
}

export default function ProfilEnseignantPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", commune: "", gender: "" });
  const [pw, setPw] = useState({ current_password: "", new_password: "", confirm: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [tab, setTab] = useState<"infos" | "password">("infos");

  useEffect(() => {
    fetch("/api/me/profile")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          setProfile(d.user);
          setForm({
            first_name: d.user.first_name ?? "",
            last_name: d.user.last_name ?? "",
            email: d.user.email ?? "",
            phone: d.user.phone ?? "",
            commune: d.user.commune ?? "",
            gender: d.user.gender ?? "",
          });
        }
      })
      .catch(() => {});
  }, []);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/me/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Erreur lors de la mise à jour.");
      } else {
        setSuccess("Profil mis à jour.");
        if (json.user) setProfile((p) => p ? { ...p, ...json.user } : p);
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setSaving(false);
    }
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    if (pw.new_password !== pw.confirm) {
      setError("La confirmation ne correspond pas.");
      setSaving(false);
      return;
    }
    if (pw.new_password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      setSaving(false);
      return;
    }
    if (!/[a-zA-Z]/.test(pw.new_password) || !/\d/.test(pw.new_password)) {
      setError("Le mot de passe doit contenir au moins 1 lettre et 1 chiffre.");
      setSaving(false);
      return;
    }
    try {
      const res = await fetch("/api/me/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current_password: pw.current_password, new_password: pw.new_password }),
      });
      const json = await res.json();
      if (!res.ok) setError(json.error ?? "Erreur.");
      else {
        setSuccess("Mot de passe mis à jour.");
        setPw({ current_password: "", new_password: "", confirm: "" });
      }
    } catch {
      setError("Erreur réseau.");
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
      </div>
    );
  }

  const inputClass = "w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";

  return (
    <div className="min-h-dvh bg-surface text-on-surface pb-24">
      <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/espace-prof" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low active:scale-95 transition-all">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-headline-md text-headline-md text-on-surface">Mon profil</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-md shrink-0">
            {profile.first_name[0]}{profile.last_name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-title-md text-on-surface truncate">{profile.first_name} {profile.last_name}</h2>
            <p className="text-sm text-on-surface-variant truncate">{profile.email}</p>
            <span className="inline-flex items-center gap-1 mt-1.5 bg-secondary-container/15 text-secondary px-2.5 py-0.5 rounded-full text-xs font-semibold">
              <span className="material-symbols-outlined text-[13px]">co_present</span>
              Professeur
            </span>
          </div>
        </section>

        <div className="flex gap-2">
          <button
            onClick={() => { setTab("infos"); setError(null); setSuccess(null); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === "infos" ? "bg-primary text-on-primary" : "bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container-low"}`}
          >
            Informations
          </button>
          <button
            onClick={() => { setTab("password"); setError(null); setSuccess(null); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === "password" ? "bg-primary text-on-primary" : "bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container-low"}`}
          >
            Mot de passe
          </button>
        </div>

        {error && (
          <div className="bg-error-container/20 text-error p-3 rounded-lg text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="bg-tertiary-container/20 text-tertiary p-3 rounded-lg text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{success}</span>
          </div>
        )}

        {tab === "infos" && (
          <form onSubmit={saveProfile} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-on-surface">Prénom</label>
                <input type="text" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} className={inputClass} />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-on-surface">Nom</label>
                <input type="text" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-on-surface">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-on-surface">Téléphone</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="Optionnel" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-on-surface">Genre</label>
                <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className={inputClass}>
                  <option value="">—</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-on-surface">Commune</label>
                <select value={form.commune} onChange={(e) => setForm({ ...form, commune: e.target.value })} className={inputClass}>
                  <option value="">—</option>
                  {COMMUNES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 bg-primary text-on-primary rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-60"
            >
              {saving ? <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span> : "Enregistrer"}
            </button>
          </form>
        )}

        {tab === "password" && (
          <form onSubmit={savePassword} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-on-surface">Mot de passe actuel</label>
              <input type="password" value={pw.current_password} onChange={(e) => setPw({ ...pw, current_password: e.target.value })} className={inputClass} required />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-on-surface">Nouveau mot de passe</label>
              <input type="password" value={pw.new_password} onChange={(e) => setPw({ ...pw, new_password: e.target.value })} className={inputClass} required />
              <p className="text-xs text-on-surface-variant">8+ caractères, 1 lettre et 1 chiffre.</p>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-on-surface">Confirmer</label>
              <input type="password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} className={inputClass} required />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 bg-primary text-on-primary rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-60"
            >
              {saving ? <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span> : "Changer le mot de passe"}
            </button>
          </form>
        )}

        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-semibold text-on-surface">Gestion du compte</h3>
          <a
            href="/api/auth/logout"
            className="w-full py-3 rounded-xl border border-outline-variant text-on-surface font-semibold text-sm flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Se déconnecter
          </a>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-outline-variant px-4 py-3">
        <div className="max-w-lg mx-auto grid grid-cols-3 gap-3">
          <Link href="/espace-prof/lives" className="h-12 rounded-full bg-surface-container-high text-on-surface font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
            <span className="material-symbols-outlined text-[18px]">live_tv</span> Lives
          </Link>
          <Link href="/espace-prof/classes" className="h-12 rounded-full bg-surface-container-high text-on-surface font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
            <span className="material-symbols-outlined text-[18px]">groups</span> Classes
          </Link>
          <Link href="/espace-prof/profil" className="h-12 rounded-full bg-primary text-on-primary font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
            <span className="material-symbols-outlined text-[18px]">person</span> Profil
          </Link>
        </div>
      </nav>
    </div>
  );
}

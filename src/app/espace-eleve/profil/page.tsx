"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AvatarUpload from "@/components/AvatarUpload";

const COMMUNES = ["Abobo", "Adjamé", "Attécoubé", "Cocody", "Koumassi", "Marcory", "Plateau", "Port-Bouët", "Treichville", "Yopougon", "Bouaké", "Yamoussoukro", "Daloa", "Korhogo", "San-Pédro", "Man", "Gagnoa", "Divo", "Abengourou", "Anyama", "Bingerville", "Grand-Bassam"];

const SERIES = [
  { id: 1, code: "C", name: "Sciences" },
  { id: 2, code: "D", name: "Sciences Exp." },
  { id: 3, code: "A", name: "Littéraire" },
  { id: 4, code: "B", name: "Économique" },
];

const CLASS_LEVELS = ["6eme", "5eme", "4eme", "3eme", "2nde", "1ere", "Terminale"];

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  commune: string | null;
  gender: string | null;
  avatar_url: string | null;
  role: string;
  serie_id: number | null;
  class_level: string | null;
  xp: number;
  streak: number;
}

export default function StudentProfilPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", commune: "", gender: "", serie_id: "", class_level: "" });
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
          setProfile({
            first_name: d.user.first_name ?? "",
            last_name: d.user.last_name ?? "",
            email: d.user.email ?? "",
            phone: d.user.phone ?? "",
            commune: d.user.commune ?? "",
            gender: d.user.gender ?? "",
            avatar_url: d.user.avatar_url ?? null,
            role: d.user.role ?? "student",
            serie_id: d.user.serie_id ?? null,
            class_level: d.user.class_level ?? null,
            xp: d.user.xp ?? 0,
            streak: d.user.streak ?? 0,
          });
          setForm({
            first_name: d.user.first_name ?? "",
            last_name: d.user.last_name ?? "",
            email: d.user.email ?? "",
            phone: d.user.phone ?? "",
            commune: d.user.commune ?? "",
            gender: d.user.gender ?? "",
            serie_id: d.user.serie_id ? String(d.user.serie_id) : "",
            class_level: d.user.class_level ?? "",
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
      const body: Record<string, string> = {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        commune: form.commune,
        gender: form.gender,
      };
      if (form.class_level) body.class_level = form.class_level;
      if (form.serie_id) body.serie_id = form.serie_id;
      const res = await fetch("/api/me/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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
  const serieName = profile.serie_id ? SERIES.find((s) => s.id === profile.serie_id)?.name ?? "" : "";

  return (
    <div className="min-h-dvh bg-surface text-on-surface pb-24">
      <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/accueil-edukora" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low active:scale-95 transition-all">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-headline-md text-headline-md text-on-surface">Mon profil</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col items-center gap-4">
          <AvatarUpload
            currentAvatar={profile.avatar_url ?? null}
            initials={`${profile.first_name[0]}${profile.last_name[0]}`}
            size="lg"
            onUploaded={(url) => setProfile((p) => p ? { ...p, avatar_url: url } : p)}
          />
          <div className="flex-1 min-w-0 text-center">
            <h2 className="font-title-md text-on-surface truncate">{profile.first_name} {profile.last_name}</h2>
            <p className="text-sm text-on-surface-variant truncate">{profile.email}</p>
            <div className="flex items-center justify-center gap-2 mt-2 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-secondary-container/15 text-secondary px-2.5 py-0.5 rounded-full text-xs font-semibold">
                <span className="material-symbols-outlined text-[13px]">school</span>
                {profile.class_level ?? "Élève"}
                {serieName ? ` — ${serieName}` : ""}
              </span>
              {profile.commune && (
                <span className="inline-flex items-center gap-1 bg-tertiary-container/15 text-tertiary px-2.5 py-0.5 rounded-full text-xs font-semibold">
                  <span className="material-symbols-outlined text-[13px]">location_on</span>
                  {profile.commune}
                </span>
              )}
              {profile.gender && (
                <span className="inline-flex items-center gap-1 bg-surface-container-high text-on-surface-variant px-2.5 py-0.5 rounded-full text-xs font-semibold">
                  {profile.gender === "M" ? "Masculin" : "Féminin"}
                </span>
              )}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 text-center">
            <span className="material-symbols-outlined text-primary text-xl">local_fire_department</span>
            <p className="font-headline-sm text-headline-sm text-on-surface mt-1">{profile.streak}</p>
            <p className="text-xs text-on-surface-variant">Série</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 text-center">
            <span className="material-symbols-outlined text-primary text-xl">workspace_premium</span>
            <p className="font-headline-sm text-headline-sm text-on-surface mt-1">{profile.xp}</p>
            <p className="text-xs text-on-surface-variant">XP</p>
          </div>
        </div>

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
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="Optionnel" />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-on-surface">Téléphone</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
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
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-on-surface">Classe</label>
                <select value={form.class_level} onChange={(e) => setForm({ ...form, class_level: e.target.value })} className={inputClass}>
                  <option value="">—</option>
                  {CLASS_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-on-surface">Série</label>
                <select value={form.serie_id} onChange={(e) => setForm({ ...form, serie_id: e.target.value })} className={inputClass}>
                  <option value="">—</option>
                  {SERIES.map((s) => <option key={s.id} value={String(s.id)}>{s.code} — {s.name}</option>)}
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
        <div className="max-w-lg mx-auto grid grid-cols-5 gap-1">
          <Link href="/accueil-edukora" className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span className="text-[10px] font-semibold">Accueil</span>
          </Link>
          <Link href="/quiz" className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[20px]">menu_book</span>
            <span className="text-[10px] font-semibold">Quiz</span>
          </Link>
          <Link href="/tuteur-ia" className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            <span className="text-[10px] font-semibold">Tuteur AI</span>
          </Link>
          <Link href="/simulateur" className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[20px]">description</span>
            <span className="text-[10px] font-semibold">Examens</span>
          </Link>
          <Link href="/espace-eleve/profil" className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl bg-primary text-on-primary">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            <span className="text-[10px] font-semibold">Profil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

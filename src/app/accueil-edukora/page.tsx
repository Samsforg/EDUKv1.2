"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

interface SessionUser {
  id: number;
  first_name: string;
  last_name: string;
  xp: number;
  streak: number;
  serie_id: number | null;
}

interface ProgressData {
  xp: number;
  streak: number;
  global_score: number | null;
  per_subject: {
    subject_id: number;
    name: string;
    icon: string;
    color: string;
    best_percent: number | null;
    total_attempts: number;
  }[];
  exams: { best: number | null; count: number };
  recent_quizzes: { id: number; title: string; score: number; max_score: number; completed_at: string }[];
  badges: { code: string; name: string; icon: string; description: string; earned_at: string }[];
}

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [unread, setUnread] = useState(0);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d.user) router.replace("/connexion-edukora");
        else setUser(d.user);
      })
      .catch(() => router.replace("/connexion-edukora"))
      .finally(() => setChecking(false));
  }, [router]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/me/progress")
      .then((r) => r.json())
      .then((d) => setProgress(d))
      .catch(() => setProgress(null));
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((d) => setUnread(d.unread ?? 0))
      .catch(() => {});
  }, [user]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/connexion-edukora");
  }

  if (checking) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24 font-['Hanken_Grotesk']">
<header className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center px-margin-mobile h-16">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full overflow-hidden border border-primary-fixed bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-001.png" alt="A professional headshot of a young Ivorian student in a bright, modern learning environment." />
</div>
<img alt="Edukora Logo" className="h-8 object-contain" src="/images/logo-edukora.png" />
</div>
<div className="flex items-center gap-1">
<ThemeToggle />
<button onClick={handleLogout} aria-label="Se déconnecter" className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors active:scale-95 duration-100">
<span className="material-symbols-outlined">logout</span>
</button>
<a href="/notifications" className="relative w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-surface-container-low transition-colors active:scale-95 duration-100">
<span className="material-symbols-outlined">notifications</span>
{unread > 0 && (
<span className="absolute -top-0.5 -right-0.5 flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-error border-2 border-surface text-[10px] font-bold text-on-primary">{unread > 9 ? "9+" : unread}</span>
)}
</a>
</div>
</header>
<main className="pt-20 px-margin-mobile space-y-stack-lg">
<section className="mt-4">
<h1 className="font-headline-md text-headline-md text-on-surface">Salut, {user?.first_name ?? "Élève"} 👋</h1>
<p className="text-on-surface-variant font-body-md mt-1">Prêt pour tes révisions du BAC aujourd'hui ?</p>
</section>
<section className="grid grid-cols-2 gap-gutter">
<div className="col-span-2 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant flex items-center justify-between shadow-sm">
<div className="space-y-1">
<p className="text-label-sm font-label-sm text-on-surface-variant">Score Global BAC 2024</p>
<p className="text-display-lg-mobile font-display-lg-mobile text-primary">{progress?.global_score != null ? `${progress.global_score}%` : "—"}</p>
<div className="flex gap-2">
<p className="text-label-xs font-label-xs text-secondary-container bg-secondary-container/10 px-2 py-0.5 rounded-full flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">local_fire_department</span> {progress?.streak ?? 0} jour{progress?.streak && progress.streak > 1 ? "s" : ""}</p>
<p className="text-label-xs font-label-xs text-on-tertiary-container bg-tertiary-container/10 px-2 py-0.5 rounded-full flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">bolt</span> {progress?.xp ?? 0} XP</p>
</div>
</div>
<div className="relative w-20 h-20">
<svg className="w-full h-full">
<circle className="text-outline-variant" cx="40" cy="40" fill="transparent" r="32" stroke="currentColor" strokeWidth="6" />
<circle className="text-primary progress-ring" cx="40" cy="40" fill="transparent" r="32" stroke="currentColor" strokeDasharray="201.06" strokeDashoffset={progress?.global_score != null ? 201.06 - (201.06 * progress.global_score) / 100 : 201.06} strokeLinecap="round" strokeWidth="6" />
</svg>
<div className="absolute inset-0 flex items-center justify-center">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
</div>
</div>
</div>
<a href="/simulateur" className="col-span-2 bento-card relative overflow-hidden bg-primary p-5 rounded-xl text-on-primary flex flex-col justify-between h-40 shadow-md active:scale-95 duration-200" style={{ transform: "scale(1)" }}>
<div className="absolute top-0 right-0 w-32 h-32 bg-on-primary/10 rounded-bl-full -mr-8 -mt-8"></div>
<div className="z-10 text-left">
<p className="text-label-sm font-label-sm opacity-80">Préparer l'examen</p>
<h3 className="font-headline-md text-headline-md mt-1">Simulateur BAC / BEPC</h3>
</div>
<div className="z-10 flex items-center gap-2">
<span className="bg-on-primary text-primary px-4 py-2 rounded-full text-label-sm font-label-sm flex items-center gap-2">
Lancer un sujet <span className="material-symbols-outlined text-[18px]">play_circle</span>
</span>
</div>
</a>
<a href="/tuteur-ia" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:bg-inverse-surface active:text-inverse-on-surface transition-colors">
<div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Parler à Kora (Tuteur AI)</p>
<p className="text-label-xs text-on-surface-variant">Une question sur un cours ?</p>
</div>
<span className="material-symbols-outlined ml-auto text-primary group-active:text-inverse-on-surface">chevron_right</span>
</a>
<a href="/fiches" className="col-span-2 bento-card bg-secondary-container border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Mes fiches de cours</p>
<p className="text-label-xs text-on-surface-variant">Relire et réviser hors-ligne</p>
</div>
<span className="material-symbols-outlined ml-auto text-secondary">chevron_right</span>
</a>
<a href="/parcours" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>route</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Mon parcours de révision</p>
<p className="text-label-xs text-on-surface-variant">Plan généré selon ta progression</p>
</div>
<span className="material-symbols-outlined ml-auto text-primary">chevron_right</span>
</a>
<a href="/forum" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Communauté</p>
<p className="text-label-xs text-on-surface-variant">Entraide et forum par matière</p>
</div>
<span className="material-symbols-outlined ml-auto text-tertiary">chevron_right</span>
</a>
<a href="/classement" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-tertiary shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Classement</p>
<p className="text-label-xs text-on-surface-variant">Comparer ta progression aux autres</p>
</div>
<span className="material-symbols-outlined ml-auto text-tertiary">chevron_right</span>
</a>
<a href="/ligues" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Ligue Académique</p>
<p className="text-label-xs text-on-surface-variant">Ton échelon et tes rivaux</p>
</div>
<span className="material-symbols-outlined ml-auto text-secondary">chevron_right</span>
</a>
<a href="/defis" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>swords</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Défis Inter-Communes</p>
<p className="text-label-xs text-on-surface-variant">Ta commune contre les autres</p>
</div>
<span className="material-symbols-outlined ml-auto text-primary">chevron_right</span>
</a>
<a href="/espace-live" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center text-error shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>live_tv</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Edukora Live</p>
<p className="text-label-xs text-on-surface-variant">Sessions directes et replays</p>
</div>
<span className="material-symbols-outlined ml-auto text-error">chevron_right</span>
</a>
<a href="/badges" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Mes badges</p>
<p className="text-label-xs text-on-surface-variant">Débloquer des récompenses</p>
</div>
<span className="material-symbols-outlined ml-auto text-primary">chevron_right</span>
</a>
<a href="/planning" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Planning de révisions</p>
<p className="text-label-xs text-on-surface-variant">Ta semaine générée automatiquement</p>
</div>
<span className="material-symbols-outlined ml-auto text-secondary">chevron_right</span>
</a>
</section>
<section className="space-y-stack-md pb-8">
<div className="flex justify-between items-center">
<h2 className="font-headline-md text-headline-md text-on-surface">Tes Matières</h2>
<a href="/matieres" className="text-primary font-label-sm">Voir tout</a>
</div>
<div className="grid grid-cols-1 gap-gutter">
{(progress?.per_subject ?? []).map((s) => (
<a key={s.subject_id} href={`/matieres/${s.subject_id}`} className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer">
<div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: s.color + "1A", color: s.color }}>
<span className="material-symbols-outlined text-[32px]">{s.icon || "menu_book"}</span>
</div>
<div className="flex-1">
<h4 className="font-body-lg text-body-lg text-on-surface">{s.name}</h4>
<div className="flex items-center gap-3 mt-1">
<div className="flex-1 h-1.5 bg-outline-variant rounded-full overflow-hidden">
<div className="h-full rounded-full" style={{ backgroundColor: s.color, width: `${s.best_percent ?? 0}%` }}></div>
</div>
<span className="text-label-xs font-label-xs text-on-surface-variant">{s.best_percent != null ? `${s.best_percent}%` : "—"}</span>
</div>
</div>
</a>
))}
{!progress && (
<div className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4">
<div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[32px]">menu_book</span>
</div>
<div className="flex-1">
<h4 className="font-body-lg text-body-lg text-on-surface">Lance-toi pour commencer !</h4>
<p className="text-label-xs text-on-surface-variant mt-1">Fais un quiz ou un sujet d'examen pour voir tes scores par matière.</p>
</div>
</div>
)}
</div>
</section>
{(progress?.badges ?? []).length > 0 && (
<section className="pb-8">
<div className="flex justify-between items-center mb-3">
<h2 className="font-headline-md text-headline-md text-on-surface">Tes Badges</h2>
</div>
<div className="flex gap-3 overflow-x-auto pb-2">
{progress!.badges.map((b) => (
<div key={b.code} className="shrink-0 w-24 bg-surface-container-high border border-outline-variant rounded-xl p-3 flex flex-col items-center gap-1.5 text-center">
<div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center">
<span className="material-symbols-outlined">{b.icon || "military_tech"}</span>
</div>
<p className="font-label-xs font-semibold text-on-surface leading-tight">{b.name}</p>
</div>
))}
</div>
</section>
)}
</main>
<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface shadow-[0_-1px_4px_rgba(0,0,0,0.1)] flex justify-around items-center h-20 pb-safe px-2">
<a className="flex flex-col items-center justify-center bg-primary text-on-primary rounded-xl px-4 py-1.5 active:scale-90 transition-transform duration-200" href="/accueil-edukora">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
<span className="font-label-xs text-label-xs mt-0.5">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200 w-16" href="/quiz">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label-xs text-label-xs mt-0.5">Quiz</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200 w-16" href="/tuteur-ia">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-xs text-label-xs mt-0.5">Tuteur AI</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200 w-16" href="/simulateur"><div className="relative">
<span className="material-symbols-outlined">description</span>
</div>
<span className="font-label-xs text-label-xs mt-0.5">Examens</span></a><a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200 w-16" href="/profil">
<span className="material-symbols-outlined">person</span>
<span className="font-label-xs text-label-xs mt-0.5">Profil</span>
</a>
</nav>
    </div>
  );
}

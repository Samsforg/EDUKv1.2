"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import ExamCountdown from "@/components/ExamCountdown";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import AdSenseBanner from "@/components/AdSenseBanner";

interface SessionUser {
  id: number;
  first_name: string;
  last_name: string;
  xp: number;
  streak: number;
  serie_id: number | null;
  class_level?: string | null;
  goal?: string | null;
}

const GOAL_LABELS: Record<string, string> = {
  bac: "Préparer le BAC",
  bepc: "Préparer le BEPC",
  notes: "Améliorer mes notes",
  programme: "Suivre le programme",
};

const CYCLE_BY_CLASS_KEY: Record<string, "BAC" | "BEPC"> = {
  "6eme": "BEPC",
  "5eme": "BEPC",
  "4eme": "BEPC",
  "3eme": "BEPC",
  "2nde": "BAC",
  "1ere": "BAC",
  "terminale": "BAC",
};

function examCycleOfClassLevel(raw: string | null): "BAC" | "BEPC" | null {
  if (!raw) return null;
  const key = raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
  const star = key.match(/^(6eme|5eme|4eme|3eme|2nde|1ere|terminale)/)?.[1];
  return CYCLE_BY_CLASS_KEY[star ?? key] ?? null;
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

interface ReReadItem {
  id: string;
  reason: string;
  href: string;
  subject_name: string;
  subject_icon: string;
  subject_color: string;
  chapter_title: string;
}

interface DailyQuiz {
  id: number;
  title: string;
  done_today: boolean;
  bonus_xp: number;
}

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [reReads, setReReads] = useState<ReReadItem[]>([]);
  const [unread, setUnread] = useState(0);
  const [daily, setDaily] = useState<DailyQuiz | null>(null);
  const [revisionDue, setRevisionDue] = useState<number | null>(null);
  const [checking, setChecking] = useState(true);
  const [streakInfo, setStreakInfo] = useState<{ current: number; isTodayDone: boolean; nextMilestone: number | null; bonusXp: number } | null>(null);
  const [ringAnimated, setRingAnimated] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d.user) router.replace("/connexion-edukora");
        else {
          setUser(d.user);
          if (d.user.role === "teacher") router.replace("/espace-prof");
        }
      })
      .catch(() => router.replace("/connexion-edukora"))
      .finally(() => setChecking(false));
  }, [router]);

  useEffect(() => {
    if (!user) return;
    setRingAnimated(false);
    fetch("/api/me/progress")
      .then((r) => r.json())
      .then((d) => {
        setProgress(d);
        if (d?.global_score != null) {
          requestAnimationFrame(() => setRingAnimated(true));
        }
      })
      .catch(() => setProgress(null));
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((d) => setUnread(d.unread ?? 0))
      .catch(() => {});
    fetch("/api/quiz/daily")
      .then((r) => r.json())
      .then((d) => setDaily(d.error ? null : d))
      .catch(() => {});
    fetch("/api/parcours")
      .then((r) => r.json())
      .then((d) => {
        const items: ReReadItem[] = (d.queue ?? [])
          .filter(
            (q: { type?: string; reason?: string }) =>
              q.type === "lesson" && typeof q.reason === "string" && q.reason.startsWith("Relire"),
          )
          .map((q: Record<string, unknown>) => ({
            id: q.id,
            reason: q.reason,
            href: q.href,
            subject_name: q.subject_name ?? "",
            subject_icon: q.subject_icon ?? "menu_book",
            subject_color: q.subject_color ?? "#0047ab",
            chapter_title: q.chapter_title ?? "",
          }));
        setReReads(items);
      })
      .catch(() => {});
    fetch("/api/gamification/streak")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setStreakInfo(d))
      .catch(() => {});
    fetch("/api/revision/due")
      .then((r) => r.json())
      .then((d) => setRevisionDue(d.summary?.total ?? 0))
      .catch(() => {});
  }, [user]);

  function handleLogout() {
    window.location.href = "/api/auth/logout";
  }

  const exam =
    user?.goal === "bac" || user?.goal === "bepc"
      ? user.goal.toUpperCase()
      : examCycleOfClassLevel(user?.class_level ?? null);
  const goalLabel = user?.goal ? GOAL_LABELS[user.goal] : null;

  if (checking) {
    return (
      <main role="main" className="min-h-dvh bg-surface text-on-surface flex flex-col items-center justify-center gap-4">
        <h1 className="sr-only">Tableau de bord Edukora</h1>
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
        <p className="text-on-surface text-sm">Chargement de ton espace…</p>
      </main>
    );
  }

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center px-margin-mobile h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary-fixed bg-surface-container">
            <Image className="w-full h-full object-cover" src="/images/ecran-001.webp" alt="A professional headshot of a young Ivorian student in a bright, modern learning environment." width={40} height={40} />
          </div>
          <Image  alt="Edukora Logo" className="h-8 object-contain" src="/images/logo-edukora.webp" loading="lazy" width={120} height={32} />
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button onClick={handleLogout} aria-label="Se déconnecter" className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container-low transition-colors active:scale-95 duration-100">
            <span className="material-symbols-outlined">logout</span>
          </button>
          <Link href="/notifications" className="relative w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-surface-container-low transition-colors active:scale-95 duration-100">
            <span className="material-symbols-outlined">notifications</span>
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-error border-2 border-surface text-[10px] font-bold text-on-primary">{unread > 9 ? "9+" : unread}</span>
            )}
          </Link>
        </div>
      </header>
      <main role="main" className="bg-background text-on-background font-body-md min-h-screen pb-24 font-['Hanken_Grotesk'] pt-20 px-margin-mobile space-y-stack-lg">
<section className="mt-4">
<h1 className="font-headline-md text-headline-md text-on-surface">Salut, {user?.first_name ?? "Élève"} 👋</h1>
<p className="text-on-surface font-body-md mt-1">Prêt pour tes révisions {exam ? `du ${exam} ` : ""}aujourd&apos;hui ?</p>
{goalLabel && (
<Link href="/bienvenue?edit=1" className="inline-flex items-center gap-1.5 mt-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-label-sm font-label-sm">
<span className="material-symbols-outlined text-[14px]">flag</span>
{goalLabel}
<span className="material-symbols-outlined text-[14px]">edit</span>
</Link>
)}
</section>
<section className="grid grid-cols-2 gap-gutter">
{exam && <ExamCountdown kind={exam as "BAC" | "BEPC"} />}
<div className="col-span-2 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant flex items-center justify-between shadow-sm">
<div className="space-y-1">
<p className="text-label-sm font-label-sm text-on-surface">Score Global {exam ?? "Edukora"}</p>
<p className="text-display-lg-mobile font-display-lg-mobile text-primary">{progress?.global_score != null ? `${progress.global_score}%` : "—"}</p>
<div className="flex gap-2">
<p className="text-label-xs font-label-xs text-on-surface bg-secondary-container/10 px-2 py-0.5 rounded-full flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">local_fire_department</span> {streakInfo?.current ?? progress?.streak ?? 0} jour{(streakInfo?.current ?? progress?.streak ?? 0) > 1 ? "s" : ""} {streakInfo?.isTodayDone ? "✓" : ""}</p>
<p className="text-label-xs font-label-xs text-on-surface bg-tertiary-container/10 px-2 py-0.5 rounded-full flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">bolt</span> {progress?.xp ?? 0} XP</p>
</div>
{streakInfo?.nextMilestone && (
<p className="text-label-xs text-on-surface mt-1">Prochain palier {streakInfo.nextMilestone}j → +{streakInfo.bonusXp} XP</p>
)}
</div>
<div className="relative w-20 h-20">
<svg className="w-full h-full">
<circle className="text-outline-variant" cx="40" cy="40" fill="transparent" r="32" stroke="currentColor" strokeWidth="6" />
<circle className="text-primary progress-ring" cx="40" cy="40" fill="transparent" r="32" stroke="currentColor" strokeDasharray="201.06" strokeDashoffset={progress?.global_score != null && ringAnimated ? 201.06 - (201.06 * progress.global_score) / 100 : 201.06} strokeLinecap="round" strokeWidth="6" />
</svg>
<div className="absolute inset-0 flex items-center justify-center">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
</div>
</div>
</div>
{daily && (
<Link href={`/quiz/${daily.id}`} className="col-span-2 bento-card relative overflow-hidden bg-secondary-container border border-outline-variant p-5 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="absolute -right-8 -top-8 w-28 h-28 bg-secondary/10 rounded-full"></div>
<div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-sm shrink-0">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>flag</span>
</div>
<div className="flex-1 min-w-0">
<p className="font-label-sm font-semibold text-on-surface flex items-center gap-1.5">
Défi du jour
{daily.done_today && (
<span className="inline-flex items-center gap-0.5 bg-impact-emerald/15 text-impact-emerald text-[10px] font-bold px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-[12px]">check_circle</span>
Relevé
</span>
)}
</p>
<p className="text-label-xs text-on-surface truncate mt-0.5">{daily.title}</p>
</div>
<div className="shrink-0 text-right">
<p className="text-label-xs font-bold text-on-primary">+{daily.bonus_xp} XP bonus</p>
<span className="text-label-xs text-on-surface group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">{daily.done_today ? "Rejouer" : "Lancer"}<span className="material-symbols-outlined text-[14px]">chevron_right</span></span>
</div>
</Link>
)}
{revisionDue != null && revisionDue > 0 && (
  <Link href="/revision" className="bg-tertiary-container/15 border border-tertiary/20 rounded-xl p-4 flex items-center gap-4 active:scale-[0.98] transition-transform duration-100">
    <div className="w-12 h-12 rounded-full bg-tertiary-container/30 flex items-center justify-center shrink-0">
      <span className="material-symbols-outlined text-tertiary">replay</span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-label-sm font-semibold text-on-surface">Révisions à faire</p>
      <p className="text-label-xs text-on-surface-variant">{revisionDue} quiz à réviser aujourd&apos;hui</p>
    </div>
<span className="material-symbols-outlined text-on-surface shrink-0">chevron_right</span>
  </Link>
)}
{reReads.length > 0 && (
<section className="space-y-stack-md">
<div className="flex justify-between items-center">
<h2 className="font-headline-md text-headline-md text-on-surface">À revoir</h2>
<Link href="/parcours" className="text-primary font-label-sm">Tout voir</Link>
</div>
{reReads.map((item) => (
<Link key={item.id} href={item.href} className="bg-surface-container-high border border-outline-variant rounded-xl p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer">
<div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: item.subject_color + "1A", color: item.subject_color }}>
<span className="material-symbols-outlined">{item.subject_icon}</span>
</div>
<div className="flex-1 min-w-0">
<p className="font-label-sm text-on-surface truncate">{item.reason}</p>
<p className="text-label-xs text-on-surface truncate">{item.chapter_title}</p>
</div>
<span className="material-symbols-outlined text-primary shrink-0">chevron_right</span>
</Link>
))}
</section>
)}
<Link href="/simulateur" className="col-span-2 bento-card relative overflow-hidden bg-primary p-5 rounded-xl text-on-primary flex flex-col justify-between h-40 shadow-md active:scale-95 duration-200" style={{ transform: "scale(1)" }}>
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
</Link>
<Link href="/mes-classes" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:bg-inverse-surface active:text-inverse-on-surface transition-colors">
<div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-surface shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
</div>
<div className="text-left">
<p className="font-label-sm font-label-sm text-primary">Mes classes</p>
<h4 className="text-label-xs text-label-xs text-on-surface">Rejoins la classe de ton professeur avec son code d&apos;invitation</h4>
</div>
<span className="material-symbols-outlined ml-auto text-primary shrink-0">chevron_right</span>
</Link>
<Link href="/tuteur-ia" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:bg-inverse-surface active:text-inverse-on-surface transition-colors">
<div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Parler à Kora (Tuteur AI)</p>
<p className="text-label-xs text-on-surface">Une question sur un cours ?</p>
</div>
<span className="material-symbols-outlined ml-auto text-primary group-active:text-inverse-on-surface">chevron_right</span>
</Link>
<Link href="/fiches" className="col-span-2 bento-card bg-secondary-container border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Mes fiches de cours</p>
<p className="text-label-xs text-on-surface">Relire et réviser hors-ligne</p>
</div>
<span className="material-symbols-outlined ml-auto text-on-surface">chevron_right</span>
</Link>
<Link href="/parcours" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>route</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Mon parcours de révision</p>
<p className="text-label-xs text-on-surface">Plan généré selon ta progression</p>
</div>
<span className="material-symbols-outlined ml-auto text-primary">chevron_right</span>
</Link>
<Link href="/forum" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Communauté</p>
<p className="text-label-xs text-on-surface">Entraide et forum par matière</p>
</div>
<span className="material-symbols-outlined ml-auto text-tertiary">chevron_right</span>
</Link>
<Link href="/classement" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-tertiary shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Classement</p>
<p className="text-label-xs text-on-surface">Comparer ta progression aux autres</p>
</div>
<span className="material-symbols-outlined ml-auto text-tertiary">chevron_right</span>
</Link>
<Link href="/parrainage" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>diversity_3</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Parrainage</p>
<p className="text-label-xs text-on-surface">Partager ton code et monter au classement</p>
</div>
<span className="material-symbols-outlined ml-auto text-on-surface">chevron_right</span>
</Link>
<Link href="/ligues" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-secondary-container/40 flex items-center justify-center text-on-surface shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Ligue Académique</p>
<p className="text-label-xs text-on-surface">Ton échelon et tes rivaux</p>
</div>
<span className="material-symbols-outlined ml-auto text-on-surface">chevron_right</span>
</Link>
<Link href="/defis" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>swords</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Défis Inter-Communes</p>
<p className="text-label-xs text-on-surface">Ta commune contre les autres</p>
</div>
<span className="material-symbols-outlined ml-auto text-primary">chevron_right</span>
</Link>
<Link href="/espace-live" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center text-error shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>live_tv</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Edukora Live</p>
<p className="text-label-xs text-on-surface">Sessions directes et replays</p>
</div>
<span className="material-symbols-outlined ml-auto text-error">chevron_right</span>
</Link>
<Link href="/badges" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Mes badges</p>
<p className="text-label-xs text-on-surface">Débloquer des récompenses</p>
</div>
<span className="material-symbols-outlined ml-auto text-primary">chevron_right</span>
</Link>
<Link href="/planning" className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
<div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center text-on-surface shadow-sm">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Planning de révisions</p>
<p className="text-label-xs text-on-surface">Ta semaine générée automatiquement</p>
</div>
<span className="material-symbols-outlined ml-auto text-on-surface">chevron_right</span>
</Link>
</section>
<section className="space-y-stack-md pb-8">
<div className="flex justify-between items-center">
<h2 className="font-headline-md text-headline-md text-on-surface">Tes Matières</h2>
<Link href="/matieres" className="text-primary font-label-sm">Voir tout</Link>
</div>
<div className="grid grid-cols-1 gap-gutter">
{(progress?.per_subject ?? []).map((s) => (
<Link key={s.subject_id} href={`/matieres/${s.subject_id}`} className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer">
<div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: s.color + "1A", color: s.color }}>
<span className="material-symbols-outlined text-[32px]">{s.icon || "menu_book"}</span>
</div>
<div className="flex-1">
<h4 className="font-body-lg text-body-lg text-on-surface">{s.name}</h4>
<div className="flex items-center gap-3 mt-1">
<div className="flex-1 h-1.5 bg-outline-variant rounded-full overflow-hidden">
<div className="h-full rounded-full" style={{ backgroundColor: s.color, width: `${s.best_percent ?? 0}%` }}></div>
</div>
<span className="text-label-xs font-label-xs text-on-surface">{s.best_percent != null ? `${s.best_percent}%` : "—"}</span>
</div>
</div>
</Link>
))}
{!progress && (
<div className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4">
<div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[32px]">menu_book</span>
</div>
<div className="flex-1">
<h4 className="font-body-lg text-body-lg text-on-surface">Lance-toi pour commencer !</h4>
<p className="text-label-xs text-on-surface mt-1">Fais un quiz ou un sujet d'examen pour voir tes scores par matière.</p>
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

{/* Bannière pub pour les utilisateurs gratuits */}
{!progress?.global_score && (
  <div className="pb-4">
    <AdSenseBanner slot="1234567891" format="fluid" minHeight={120} />
  </div>
)}
</main>
<nav aria-label="Navigation principale" className="fixed bottom-0 left-0 w-full z-50 bg-surface shadow-[0_-1px_4px_rgba(0,0,0,0.1)] flex items-stretch h-20 pb-safe px-2">
<Link prefetch href="/accueil-edukora" aria-current="page" className="flex-1 flex flex-col items-center justify-center gap-0.5 bg-primary text-on-primary active:scale-95 transition-transform duration-200">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
<span className="font-label-xs text-label-xs">Accueil</span>
</Link>
<Link prefetch href="/quiz" className="flex-1 flex flex-col items-center justify-center gap-0.5 text-on-surface hover:bg-surface-container-high transition-colors active:scale-95 duration-200">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label-xs text-label-xs">Quiz</span>
</Link>
<Link prefetch href="/tuteur-ia" className="flex-1 flex flex-col items-center justify-center gap-0.5 text-on-surface hover:bg-surface-container-high transition-colors active:scale-95 duration-200">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-xs text-label-xs">Tuteur AI</span>
</Link>
<Link prefetch href="/simulateur" className="flex-1 flex flex-col items-center justify-center gap-0.5 text-on-surface hover:bg-surface-container-high transition-colors active:scale-95 duration-200">
<span className="material-symbols-outlined">description</span>
<span className="font-label-xs text-label-xs">Examens</span>
</Link>
<Link prefetch href="/espace-eleve/profil" className="flex-1 flex flex-col items-center justify-center gap-0.5 text-on-surface hover:bg-surface-container-high transition-colors active:scale-95 duration-200">
<span className="material-symbols-outlined">person</span>
<span className="font-label-xs text-label-xs">Profil</span>
</Link>
  </nav>
      <PWAInstallPrompt />
    </>
  );
}

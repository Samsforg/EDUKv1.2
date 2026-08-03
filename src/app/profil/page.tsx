"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import PageHeader from "@/components/PageHeader";
import { PairingCodeCard } from "@/components/PairingCodeCard";
import { DisputeButton } from "@/components/DisputeButton";

interface ProfileData {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    serie: { code: string; name: string } | null;
    xp: number;
    streak: number;
  };
  stats: {
    global_score: number | null;
    quizzes_done: number;
    exams_done: number;
    best_exam: number | null;
    badges_earned: number;
  };
  badges: { code: string; name: string; icon: string; description: string; earned_at: string | null }[];
  quiz_history: { id: number; title: string; score: number; max_score: number; completed_at: string }[];
  exam_history: { id: number; title: string; score_over_20: number; duration_seconds: number; completed_at: string }[];
}

const NEXT_XP = 500;

export default function ProfilePage() {
  const [data, setData] = useState<ProfileData | null>(null);

  useEffect(() => {
    fetch("/api/me/profile")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) setData(d);
      });
  }, []);

  if (!data) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
      </div>
    );
  }

  const { user, stats, badges, quiz_history, exam_history } = data;
  const earned = badges.filter((b) => b.earned_at !== null);
  const locked = badges.filter((b) => b.earned_at === null);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <PageHeader
        title="Mon profil"
        backHref="/accueil-edukora"
        right={
          <>
            <ThemeToggle />
            <button
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                location.href = "/connexion-edukora";
              }}
              aria-label="Se déconnecter"
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low active:scale-95 duration-100"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          </>
        }
      />

      <main className="px-margin-mobile pt-6 pb-10 space-y-6">
        <section className="bg-surface border border-outline-variant rounded-xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-md shrink-0">
            {user.first_name[0]}{user.last_name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-title-md text-title-md text-on-surface truncate">{user.first_name} {user.last_name}</h2>
            <p className="font-label-sm text-on-surface-variant truncate">{user.email}</p>
            {user.serie ? (
              <span className="inline-flex items-center gap-1 mt-1.5 bg-secondary-container/15 text-secondary px-2.5 py-0.5 rounded-full font-label-xs">
                <span className="material-symbols-outlined text-[13px]">school</span>
                {user.serie.code} — {user.serie.name}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 mt-1.5 bg-surface-container-high text-on-surface-variant px-2.5 py-0.5 rounded-full font-label-xs">
                <span className="material-symbols-outlined text-[13px]">help</span>
                Série non renseignée
              </span>
            )}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Score global</p>
            <p className="font-headline-md text-headline-md text-primary mt-1">{stats.global_score != null ? `${stats.global_score}%` : "—"}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Série d'activité</p>
            <p className="font-headline-md text-headline-md text-secondary mt-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[22px]">local_fire_department</span>{user.streak} j
            </p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Quiz terminés</p>
            <p className="font-headline-md text-headline-md text-on-surface mt-1">{stats.quizzes_done}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Meilleur examen</p>
            <p className="font-headline-md text-headline-md text-on-surface mt-1">{stats.best_exam != null ? `${stats.best_exam}/20` : "—"}</p>
          </div>
        </section>

        <Link
          href="/reglages-rappels"
          className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 active:scale-[0.98] transition-transform duration-100"
        >
          <div className="w-11 h-11 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary shrink-0">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
          </div>
          <div className="flex-1">
            <p className="font-label-md font-semibold text-on-surface">Rappels de révision</p>
            <p className="font-label-xs text-on-surface-variant">Reste régulier avec des notifications</p>
          </div>
          <span className="material-symbols-outlined text-tertiary">chevron_right</span>
        </Link>

        <PairingCodeCard />

        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <div className="flex justify-between items-center mb-2">
            <p className="font-label-md font-semibold text-on-surface">XP total</p>
            <p className="font-label-md text-primary font-semibold">{user.xp} / {NEXT_XP} XP</p>
          </div>
          <div className="w-full bg-outline-variant h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full transition-all duration-500" style={{ width: `${Math.min(100, (user.xp / NEXT_XP) * 100)}%` }}></div>
          </div>
          <p className="font-label-xs text-on-surface-variant mt-2">{Math.max(0, NEXT_XP - user.xp)} XP avant le badge « Expert »</p>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-headline-md text-headline-md text-on-surface">Mes badges</h2>
            <span className="font-label-sm text-primary">{earned.length} / {badges.length}</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((b) => {
              const isEarned = b.earned_at !== null;
              return (
                <div key={b.code} className={`rounded-xl border p-3 flex flex-col items-center gap-1.5 text-center ${isEarned ? "bg-surface border-outline-variant" : "bg-surface-container-high border-outline-variant opacity-60"}`}>
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center ${isEarned ? "bg-primary/15 text-primary" : "bg-outline-variant/30 text-on-surface-variant"}`}>
                    <span className="material-symbols-outlined">{isEarned ? b.icon : "lock"}</span>
                  </div>
                  <p className="font-label-xs font-semibold text-on-surface leading-tight">{b.name}</p>
                  <p className="font-label-xs text-on-surface-variant leading-tight">{b.description}</p>
                </div>
              );
            })}
          </div>
          <Link href="/badges" className="mt-3 w-full bg-primary/10 text-primary rounded-xl p-3 flex items-center justify-center gap-2 font-label-md font-semibold active:scale-[0.98] transition-transform duration-150">
            <span className="material-symbols-outlined">military_tech</span>
            Voir ma progression détaillée
          </Link>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-3">Historique des quiz</h2>
          {quiz_history.length === 0 ? (
            <p className="bg-surface border border-outline-variant rounded-xl p-4 text-center font-body-sm text-on-surface-variant">Aucun quiz terminé pour l&apos;instant.</p>
          ) : (
            <div className="space-y-2.5">
              {quiz_history.map((q) => {
                const pct = q.max_score > 0 ? Math.round((q.score * 100) / q.max_score) : 0;
                return (
                  <Link key={`quiz-${q.id}-${q.completed_at}`} href={`/quiz/${q.id}`} className="block bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 active:scale-[0.98] transition-transform duration-150">
                    <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined">quiz</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-label-md font-semibold text-on-surface truncate">{q.title}</h3>
                      <p className="font-label-xs text-on-surface-variant">{q.score} / {q.max_score} · {q.completed_at.slice(0, 16).replace("T", " à ")}</p>
                    </div>
                    <span className={`font-title-md text-title-md shrink-0 ${pct >= 70 ? "text-primary" : pct >= 40 ? "text-secondary" : "text-error"}`}>{pct}%</span>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-3">Historique des examens</h2>
          {exam_history.length === 0 ? (
            <p className="bg-surface border border-outline-variant rounded-xl p-4 text-center font-body-sm text-on-surface-variant">Aucun examen simulé pour l&apos;instant.</p>
          ) : (
            <div className="space-y-2.5">
              {exam_history.map((e) => (
                <Link key={`exam-${e.id}-${e.completed_at}`} href={`/simulateur/${e.id}`} className="block bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 active:scale-[0.98] transition-transform duration-150">
                  <div className="w-10 h-10 rounded-full bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-label-md font-semibold text-on-surface truncate">{e.title}</h3>
                    <p className="font-label-xs text-on-surface-variant">{Math.floor(e.duration_seconds / 60)} min passées · {e.completed_at.slice(0, 16).replace("T", " à ")}</p>
                  </div>
                  <span className={`font-title-md text-title-md shrink-0 ${e.score_over_20 >= 10 ? "text-primary" : "text-error"}`}>{e.score_over_20}/20</span>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section>
          <DisputeButton />
        </section>
      </main>
    </div>
  );
}

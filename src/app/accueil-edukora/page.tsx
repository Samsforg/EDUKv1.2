import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import ExamCountdown from "@/components/ExamCountdown";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import AdSenseBanner from "@/components/AdSenseBanner";

import {
  getCurrentUser,
  getProgressData,
  getReReads,
  getUnreadNotificationsCount,
  getDailyQuiz,
  getStreakInfo,
  getRevisionDueCount,
  examCycleOfClassLevel,
} from "@/lib/accueil-data";

import type { SessionUser, ProgressData, ReReadItem, DailyQuiz, StreakInfo } from "@/lib/accueil-data";

const GOAL_LABELS: Record<string, string> = {
  bac: "Préparer le BAC",
  bepc: "Préparer le BEPC",
  notes: "Améliorer mes notes",
  programme: "Suivre le programme",
};

function HeaderSkeleton() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center px-margin-mobile h-16 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-surface-container"></div>
        <div className="w-32 h-8 rounded bg-surface-container"></div>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-10 h-10 rounded-full bg-surface-container"></div>
        <div className="w-10 h-10 rounded-full bg-surface-container"></div>
        <div className="w-10 h-10 rounded-full bg-surface-container"></div>
      </div>
    </header>
  );
}

function ProgressCardSkeleton() {
  return (
    <section className="grid grid-cols-2 gap-gutter animate-pulse">
      <div className="col-span-2 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant flex items-center justify-between shadow-sm">
        <div className="space-y-1">
          <div className="h-4 w-32 bg-surface-container rounded"></div>
          <div className="h-10 w-16 bg-surface-container rounded"></div>
          <div className="flex gap-2">
            <div className="h-6 w-32 bg-surface-container rounded-full"></div>
            <div className="h-6 w-24 bg-surface-container rounded-full"></div>
          </div>
          <div className="h-3 w-40 bg-surface-container rounded"></div>
        </div>
        <div className="relative w-20 h-20">
          <div className="w-full h-full rounded-full border-6 border-surface-container"></div>
        </div>
      </div>
    </section>
  );
}

function DailyQuizSkeleton() {
  return (
    <div className="col-span-2 bento-card relative overflow-hidden bg-surface-container border border-outline-variant p-5 rounded-xl flex items-center gap-4 animate-pulse">
      <div className="w-12 h-12 rounded-full bg-surface-container-high"></div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="h-4 w-24 bg-surface-container-high rounded"></div>
        <div className="h-3 w-40 bg-surface-container-high rounded"></div>
      </div>
      <div className="shrink-0 text-right space-y-1">
        <div className="h-4 w-20 bg-surface-container-high rounded"></div>
        <div className="h-3 w-24 bg-surface-container-high rounded"></div>
      </div>
    </div>
  );
}

function RevisionDueSkeleton() {
  return (
    <Link href="/revision" className="bg-surface-container border border-outline-variant rounded-xl p-4 flex items-center gap-4 animate-pulse">
      <div className="w-12 h-12 rounded-full bg-surface-container-high"></div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="h-4 w-28 bg-surface-container-high rounded"></div>
        <div className="h-3 w-32 bg-surface-container-high rounded"></div>
      </div>
      <div className="w-6 h-6 rounded-full bg-surface-container-high shrink-0"></div>
    </Link>
  );
}

function ReReadsSkeleton() {
  return (
    <section className="space-y-stack-md animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-6 w-24 bg-surface-container rounded"></div>
        <div className="h-5 w-16 bg-surface-container rounded"></div>
      </div>
      {[...Array(3)].map((_, i) => (
        <Link key={i} href="#" className="bg-surface-container-high border border-outline-variant rounded-xl p-4 flex items-center gap-4 cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-surface-container-high shrink-0"></div>
          <div className="flex-1 min-w-0 space-y-1">
            <div className="h-4 w-40 bg-surface-container rounded"></div>
            <div className="h-3 w-32 bg-surface-container rounded"></div>
          </div>
          <div className="w-6 h-6 rounded-full bg-surface-container shrink-0"></div>
        </Link>
      ))}
    </section>
  );
}

function SubjectCardsSkeleton() {
  return (
    <section className="space-y-stack-md pb-8 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-6 w-24 bg-surface-container rounded"></div>
        <div className="h-5 w-16 bg-surface-container rounded"></div>
      </div>
      <div className="grid grid-cols-1 gap-gutter">
        {[...Array(6)].map((_, i) => (
          <Link key={i} href="#" className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 cursor-pointer">
            <div className="w-14 h-14 rounded-lg bg-surface-container-high shrink-0"></div>
            <div className="flex-1 space-y-1">
              <div className="h-5 w-24 bg-surface-container-high rounded"></div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-surface-container-high rounded-full"></div>
                <div className="w-10 h-3 bg-surface-container-high rounded"></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BadgesSkeleton() {
  return (
    <section className="pb-8 animate-pulse">
      <div className="flex justify-between items-center mb-3">
        <div className="h-6 w-20 bg-surface-container rounded"></div>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="shrink-0 w-24 bg-surface-container-high border border-outline-variant rounded-xl p-3 flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-surface-container"></div>
            <div className="h-3 w-16 bg-surface-container rounded"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BentoGridSkeleton() {
  return (
    <section className="grid grid-cols-2 gap-gutter animate-pulse" aria-label="Actions rapides">
      {[...Array(12)].map((_, i) => (
        <Link key={i} href="#" className="bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-surface-container"></div>
          <div className="text-left space-y-1">
            <div className="h-4 w-20 bg-surface-container rounded"></div>
            <div className="h-3 w-28 bg-surface-container rounded"></div>
          </div>
          <div className="w-6 h-6 rounded-full bg-surface-container ml-auto shrink-0"></div>
        </Link>
      ))}
    </section>
  );
}

import HeaderClient from "./_components/HeaderClient";
import ProgressCardClient from "./_components/ProgressCardClient";
import DailyQuizClient from "./_components/DailyQuizClient";
import RevisionDueClient from "./_components/RevisionDueClient";
import ReReadsClient from "./_components/ReReadsClient";
import BentoGridClient from "./_components/BentoGridClient";
import SubjectCardsClient from "./_components/SubjectCardsClient";
import BadgesClient from "./_components/BadgesClient";
import AdsClient from "./_components/AdsClient";
import BottomNavigation from "./_components/BottomNavigation";

async function getUserProfile(): Promise<SessionUser | null> {
  const user = await getCurrentUser();
  if (!user) return null;
  if (user.role === "teacher") redirect("/espace-prof");
  return user;
}

async function getAllData() {
  const user = await getUserProfile();
  if (!user) redirect("/connexion-edukora");

  const [
    progress,
    reReads,
    unread,
    daily,
    streakInfo,
    revisionDue,
  ] = await Promise.all([
    getProgressData(user.id),
    getReReads(user.id),
    getUnreadNotificationsCount(user.id),
    getDailyQuiz(user.id),
    getStreakInfo(user.id),
    getRevisionDueCount(user.id),
  ]);

  const exam =
    user.goal === "bac" || user.goal === "bepc"
      ? (user.goal.toUpperCase() as "BAC" | "BEPC")
      : examCycleOfClassLevel(user.class_level ?? null);
  const goalLabel = user.goal ? GOAL_LABELS[user.goal] : null;

  return {
    user,
    progress,
    reReads,
    unread,
    daily,
    streakInfo,
    revisionDue,
    exam,
    goalLabel,
  };
}

export default async function Page() {
  const {
    user,
    progress,
    reReads,
    unread,
    daily,
    streakInfo,
    revisionDue,
    exam,
    goalLabel,
  } = await getAllData();

  return (
    <>
      <Suspense fallback={<HeaderSkeleton />}>
        <HeaderClient user={user} unread={unread} />
      </Suspense>

      <main role="main" className="bg-background text-on-background font-body-md min-h-screen pb-24 font-['Hanken_Grotesk'] pt-20 px-margin-mobile space-y-stack-lg">
        <section className="mt-4">
          <h1 className="font-headline-md text-headline-md text-on-surface">Salut, {user.first_name} 👋</h1>
          <p className="text-on-surface font-body-md mt-1">
            Prêt pour tes révisions {exam ? `du ${exam} ` : ""}aujourd'hui ?
          </p>
          {goalLabel && (
            <Link
              href="/bienvenue?edit=1"
              className="inline-flex items-center gap-1.5 mt-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-label-sm font-label-sm"
            >
              <span className="material-symbols-outlined text-[14px]">flag</span>
              {goalLabel}
              <span className="material-symbols-outlined text-[14px]">edit</span>
            </Link>
          )}
        </section>

        <section className="grid grid-cols-2 gap-gutter">
          {exam && <ExamCountdown kind={exam as "BAC" | "BEPC"} />}

          <Suspense fallback={<ProgressCardSkeleton />}>
            <ProgressCardClient
              progress={progress}
              streakInfo={streakInfo}
              exam={exam}
            />
          </Suspense>
        </section>

        {daily && (
          <Suspense fallback={<DailyQuizSkeleton />}>
            <DailyQuizClient daily={daily} />
          </Suspense>
        )}

        {revisionDue != null && revisionDue > 0 && (
          <Suspense fallback={<RevisionDueSkeleton />}>
            <RevisionDueClient revisionDue={revisionDue} />
          </Suspense>
        )}

        {reReads.length > 0 && (
          <Suspense fallback={<ReReadsSkeleton />}>
            <ReReadsClient reReads={reReads} />
          </Suspense>
        )}

        <Suspense fallback={<BentoGridSkeleton />}>
          <BentoGridClient />
        </Suspense>

        <Suspense fallback={<SubjectCardsSkeleton />}>
          <SubjectCardsClient subjects={progress?.per_subject ?? []} />
        </Suspense>

        {(progress?.badges ?? []).length > 0 && (
          <Suspense fallback={<BadgesSkeleton />}>
            <BadgesClient badges={progress!.badges} />
          </Suspense>
        )}

        {!progress?.global_score && (
          <Suspense fallback={<div className="pb-4 animate-pulse"><div className="h-32 bg-surface-container rounded-xl border border-outline-variant/30" /></div>}>
            <AdsClient />
          </Suspense>
        )}
      </main>

      <Suspense fallback={<nav className="fixed bottom-0 left-0 w-full z-50 bg-surface h-20" aria-hidden="true" />} >
        <BottomNavigation />
      </Suspense>

      <PWAInstallPrompt />
    </>
  );
}
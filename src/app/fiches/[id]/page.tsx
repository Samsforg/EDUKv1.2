"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { useParams } from "next/navigation";
import SimpleMarkdown from "@/components/SimpleMarkdown";
import { PremiumUpsell } from "@/components/PremiumUpsell";

interface Lesson {
  id: number;
  title: string;
  summary: string;
  content: string;
  chapter: string;
  subject: string;
  subjectIcon: string;
  subjectColor: string;
  saved: boolean;
  read: boolean;
}

interface Sibling {
  id: number;
  title: string;
}

interface QuotaInfo {
  used: number;
  limit: number | null;
  isPremium: boolean;
  planName: string | null;
}

interface PlanInfo {
  id: number;
  name: string;
  price_cents: number;
  interval: string;
}

export default function LessonReader() {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [prev, setPrev] = useState<Sibling | null>(null);
  const [next, setNext] = useState<Sibling | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quotaMsg, setQuotaMsg] = useState<string | null>(null);
  const [quota, setQuota] = useState<QuotaInfo | null>(null);
  const [plan, setPlan] = useState<PlanInfo | null>(null);
  const [decouvertePrice, setDecouvertePrice] = useState(0);

  useEffect(() => {
    fetch(`/api/lessons/${id}`)
      .then(async (r) => {
        if (!r.ok) {
          const d = await r.json().catch(() => null);
          if (d?.code === "fiche_quota_exceeded") {
            if (d.quota) setQuota(d.quota);
            if (d.plan) setPlan(d.plan);
            if (typeof d.decouverte_price === "number") setDecouvertePrice(d.decouverte_price);
            setQuotaMsg(d.error);
          } else {
            setError("Fiche introuvable ou connexion perdue.");
          }
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (d) {
          setLesson(d.lesson);
          setPrev(d.prev);
          setNext(d.next);
          if (!d.lesson.read) fetch(`/api/lessons/${id}/read`, { method: "POST" }).catch(() => {});
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function toggleSave() {
    if (!lesson) return;
    const res = await fetch(`/api/lessons/${id}/save`, { method: "POST" }).catch(() => null);
    if (res) setLesson((l) => (l ? { ...l, saved: !l.saved } : l));
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <PageHeader
        title={lesson?.title ?? ""}
        subtitle={lesson ? `${lesson.subject} · ${lesson.chapter}` : " "}
        backHref="/fiches"
        right={
          <button
            onClick={toggleSave}
            aria-label="Sauvegarder hors-ligne"
            className={`w-10 h-10 flex items-center justify-center rounded-full active:scale-95 duration-100 ${lesson?.saved ? "text-primary" : "text-on-surface-variant"}`}
          >
            <span className="material-symbols-outlined">{lesson?.saved ? "bookmark" : "bookmark_border"}</span>
          </button>
        }
      />

      <main className="px-margin-mobile pt-5 max-w-2xl mx-auto">
        {loading && (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        )}

        {error && (
          <div className="text-center py-16 space-y-4">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant inline-block">wifi_off</span>
            <p className="font-body-md text-on-surface-variant">{error}</p>
            <button onClick={() => window.location.reload()} className="inline-block bg-primary text-on-primary font-label-md px-6 py-3 rounded-full">
              Réessayer
            </button>
          </div>
        )}

        {!loading && quotaMsg && !lesson && (
          <div className="text-center py-16 space-y-3">
            <span className="material-symbols-outlined text-4xl text-primary inline-block">workspace_premium</span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Limite mensuelle atteinte</h2>
            <p className="font-body-md text-on-surface-variant max-w-xs mx-auto">{quotaMsg}</p>
            <Link
              href="/plans-d-abonnement-edukora-1"
              className="inline-flex items-center gap-2 mt-2 bg-secondary-container text-on-secondary-container font-extrabold px-6 py-3 rounded-xl active:scale-95 transition-transform duration-100"
            >
              Passer à Réussite <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        )}

        {!loading && lesson && (
          <>
            <h1 className="font-headline-sm text-headline-sm text-on-surface leading-tight mb-1">{lesson.title}</h1>
            <p className="font-body-sm text-on-surface-variant mb-6">{lesson.summary}</p>
            <SimpleMarkdown content={lesson.content} />

            {(prev || next) && (
              <nav className="mt-10 space-y-2 border-t border-outline-variant pt-5">
                {prev && (
                  <Link href={`/fiches/${prev.id}`} className="flex items-center gap-3 p-3 rounded-xl border border-outline-variant bg-surface hover:bg-surface-container-low active:scale-[0.99] duration-100">
                    <span className="material-symbols-outlined text-on-surface-variant">navigate_before</span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-label-xs text-on-surface-variant">Précédente</span>
                      <span className="block font-label-sm text-on-surface truncate">{prev.title}</span>
                    </span>
                  </Link>
                )}
                {next && (
                  <Link href={`/fiches/${next.id}`} className="flex items-center gap-3 p-3 rounded-xl border border-outline-variant bg-surface hover:bg-surface-container-low active:scale-[0.99] duration-100">
                    <span className="flex-1 min-w-0 text-right">
                      <span className="block font-label-xs text-on-surface-variant">Suivante</span>
                      <span className="block font-label-sm text-on-surface truncate">{next.title}</span>
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant">navigate_next</span>
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </main>

      <PremiumUpsell
        open={!!quotaMsg}
        onClose={() => setQuotaMsg(null)}
        message={quotaMsg ?? ""}
        plan={plan}
        decouvertePrice={decouvertePrice}
      />
    </div>
  );
}

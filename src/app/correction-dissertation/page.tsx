"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { PremiumUpsell } from "@/components/PremiumUpsell";

interface QuotaInfo {
  used: number;
  limit: number | null;
  isPremium: boolean;
  planName: string | null;
  windowLabel?: string | null;
}

interface PlanInfo {
  id: number;
  name: string;
  price_cents: number;
  interval: string;
}

interface Criteria {
  criterion: string;
  score: number;
  max: number;
  comment: string;
}

interface Correction {
  note: number;
  noteMax: number;
  summary: string;
  criteria: Criteria[];
  strengths: string[];
  improvements: string[];
  modelAnswer: string;
  raw: string | null;
}

const EXAM_CHOICES = ["BAC", "BEPC"] as const;
const SUBJECT_CHOICES = ["Français", "Philosophie", "Histoire-Géographie"] as const;

const EXAMPLES: Record<string, string> = {
  "Français":
    "Sujet : « Le travail est-il un moyen d'épanouissement ou une contrainte ? »\n\nDe nos jours, le travail occupe une place très importante dans nos sociétés. Pour certains, le travail est une source de bonheur et de réalisation personnelle. Pour d'autres, il constitue au contraire une contrainte qui empêche de profiter de la vie. Dans ce développement, nous allons montrer que le travail peut être à la fois un moyen d'épanouissement et une contrainte.\n\nD'abord, le travail permet à l'homme de gagner sa vie et de subvenir aux besoins de sa famille. Quand on travaille, on est utile à la société. Un travailleur a une place dans la communauté. Ensuite, le travail développe nos talents. Un bon avocat, un bon docteur, un bon enseignent deviennent bons parce qu'ils travaillent beaucoup. Le travail nous permet aussi de rencontrer d'autres personnes et de nouer des amitiés.\n\nCependant, le travail peut être une contrainte. Beaucoup de personnes sont obligées de travailler dans des conditions difficiles. Les ouvriers travaillent très tôt le matin jusqu'à très tard le soir. Le travail prend tout leur temps et ils n'ont plus le temps de s'occuper de leurs enfants. Certains travaux sont même dangereux pour la santé.\n\nEn conclusion, le travail est à la fois un moyen d'épanouissement et une contrainte. Il faut trouver un équilibre entre le travail et les autres aspects de la vie pour être vraiment heureux.",
};

export default function DissertationPage() {
  const [exam, setExam] = useState<string>("BAC");
  const [subject, setSubject] = useState<string>("Français");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [quota, setQuota] = useState<QuotaInfo | null>(null);
  const [plan, setPlan] = useState<PlanInfo | null>(null);
  const [decouvertePrice, setDecouvertePrice] = useState(0);
  const [upsell, setUpsell] = useState<{ open: boolean; message: string }>({ open: false, message: "" });
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Correction | null>(null);

  useEffect(() => {
    fetch("/api/tutor/quota")
      .then((r) => r.json())
      .then((d) => {
        if (d.dissertation) setQuota(d.dissertation);
        if (d.plan) setPlan(d.plan);
        if (typeof d.decouverte_price === "number") setDecouvertePrice(d.decouverte_price);
      })
      .catch(() => {});
  }, []);

  const blocked = !!quota && quota.limit !== null && quota.used >= quota.limit;
  const chars = text.trim().length;
  const charWarning = chars > 0 && chars < 200;

  function openUpsell(message: string) {
    setUpsell({ open: true, message });
  }

  async function submit() {
    const body = text.trim();
    if (!body || sending) return;
    setError(null);
    if (blocked) {
      openUpsell(
        quota!.isPremium
          ? `Vous avez atteint votre quota de ${quota!.limit} dissertations ${quota!.windowLabel ?? "pour cette période"} sur le plan « ${quota!.planName} ». Il se réinitialisera à la prochaine période d'abonnement.`
          : `Vous avez utilisé votre correction de dissertation gratuite du mois. Profitez d'en faire corriger davantage par Kora avec le plan Réussite.`,
      );
      return;
    }
    if (chars < 200) {
      setError("Votre copie est trop courte (200 caractères minimum).");
      return;
    }
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/api/tutor/dissertation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: body, exam, subject }),
      });
      const data = await res.json();
      if (data.code === "quota_exceeded") {
        if (data.quota) setQuota(data.quota);
        if (data.plan) setPlan(data.plan);
        openUpsell(data.error);
      } else if (data.correction) {
        setResult(data.correction);
        if (quota && quota.limit !== null) setQuota((q) => (q ? { ...q, used: q.used + 1 } : q));
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(data.error ?? "Kora n'a pas pu corriger votre copie. Réessayez.");
      }
    } catch {
      setError("Erreur réseau. Vérifiez votre connexion puis réessayez.");
    } finally {
      setSending(false);
    }
  }

  function fillExample() {
    setText(EXAMPLES[subject] ?? EXAMPLES["Français"]);
    setError(null);
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col font-['Hanken_Grotesk']">
      <PageHeader
        title="Kora corrige ta dissertation"
        subtitle={
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-base">edit_note</span> barème BEPC &amp; BAC
          </span>
        }
        right={
          <div className="flex items-center gap-2">
            {quota && (
              <button
                onClick={() =>
                  openUpsell(
                    quota.isPremium
                      ? quota.limit !== null
                        ? `Vous êtes abonné « ${quota.planName} » : il vous reste ${Math.max(0, quota.limit - quota.used)} dissertation${Math.max(0, quota.limit - quota.used) > 1 ? "s" : ""} ${quota.windowLabel ?? "pour cette période"}.`
                        : `Vous êtes abonné « ${quota.planName} » : corrections de dissertations illimitées, bravo !`
                      : `Vous avez encore ${Math.max(0, (quota.limit ?? 0) - quota.used)} correction${
                          Math.max(0, (quota.limit ?? 0) - quota.used) > 1 ? "s" : ""
                        } de dissertation gratuite${Math.max(0, (quota.limit ?? 0) - quota.used) > 1 ? "s" : ""} sur ${quota.limit} ${quota.windowLabel ?? "ce mois-ci"}.`,
                  )
                }
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all active:scale-95 ${
                  quota.isPremium
                    ? "bg-secondary-container text-on-secondary-container border-transparent"
                    : blocked
                      ? "bg-error-container text-on-error-container border-transparent"
                      : "bg-primary-container/60 text-on-primary-container border-outline-variant"
                }`}
                title="Voir les limites de ton plan"
              >
                <span className={`material-symbols-outlined text-base ${quota.isPremium ? "fill-icon" : ""}`}>
                  {quota.isPremium ? "workspace_premium" : "all_inclusive"}
                </span>
                {quota.isPremium && quota.limit === null
                  ? "Corrections illimitées"
                  : `${quota.used}/${quota.limit ?? 0} ${quota.windowLabel ?? "ce mois-ci"}`}
              </button>
            )}
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-xl">edit_document</span>
            </div>
          </div>
        }
      />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 pt-4 pb-28 space-y-4">
        {result ? (
          <section className="space-y-4">
            <div className="rounded-3xl bg-gradient-to-br from-primary to-tertiary-container text-on-primary p-6 shadow-lg">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-80 font-bold">{exam} · {subject}</p>
                  <p className="font-headline text-2xl font-extrabold mt-1">Ta copie est corrigée !</p>
                </div>
                <div className="text-center shrink-0">
                  <span className="text-5xl font-extrabold">{result.note}</span>
                  <span className="text-xl opacity-80">/{result.noteMax}</span>
                </div>
              </div>
              {result.summary && (
                <p className="mt-4 text-sm bg-on-primary/10 rounded-xl px-4 py-3 leading-relaxed">{result.summary}</p>
              )}
            </div>

            {result.criteria.length > 0 && (
              <div className="bg-surface border border-outline-variant rounded-2xl p-5 space-y-4">
                <h3 className="font-title-md font-bold text-on-surface">Détail par critère</h3>
                {result.criteria.map((c) => (
                  <div key={c.criterion} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-on-surface">{c.criterion}</span>
                      <span className="font-bold text-primary">
                        {c.score}/{c.max}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-container-high overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${c.max > 0 ? (c.score / c.max) * 100 : 0}%` }}
                      />
                    </div>
                    {c.comment && <p className="text-sm text-on-surface-variant leading-relaxed">{c.comment}</p>}
                  </div>
                ))}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-surface border border-outline-variant rounded-2xl p-5">
                <h3 className="font-title-md font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary-fixed fill-icon">thumb_up</span>
                  Points forts
                </h3>
                <ul className="space-y-2">
                  {result.strengths.length > 0 ? (
                    result.strengths.map((s, i) => (
                      <li key={i} className="text-sm text-on-surface-variant flex gap-2">
                        <span className="text-tertiary shrink-0">•</span>
                        <span className="leading-relaxed">{s}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-on-surface-variant">Aucun point fort relevé.</li>
                  )}
                </ul>
              </div>
              <div className="bg-surface border border-outline-variant rounded-2xl p-5">
                <h3 className="font-title-md font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-error fill-icon">trending_up</span>
                  Pour progresser
                </h3>
                <ul className="space-y-2">
                  {result.improvements.length > 0 ? (
                    result.improvements.map((s, i) => (
                      <li key={i} className="text-sm text-on-surface-variant flex gap-2">
                        <span className="text-error shrink-0">•</span>
                        <span className="leading-relaxed">{s}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-on-surface-variant">Aucune piste d'amélioration.</li>
                  )}
                </ul>
              </div>
            </div>

            {result.modelAnswer && (
              <details className="bg-surface border border-outline-variant rounded-2xl overflow-hidden">
                <summary className="list-none flex items-center justify-between px-5 py-4 cursor-pointer font-title-md font-bold text-on-surface">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">menu_book</span>
                    Le corrigé type
                  </span>
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-on-surface-variant whitespace-pre-wrap leading-relaxed">
                  {result.modelAnswer}
                </p>
              </details>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setResult(null);
                  setText("");
                }}
                className="flex-1 py-3.5 rounded-2xl bg-primary text-on-primary font-bold active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined align-middle text-lg mr-1">edit_document</span>
                Corriger une autre dissertation
              </button>
              <Link
                href="/tuteur-ia"
                className="px-6 py-3.5 rounded-2xl border border-outline-variant text-on-surface font-bold active:scale-95 transition-transform"
              >
                Retour à Kora
              </Link>
            </div>
          </section>
        ) : (
          <section className="space-y-4">
            {blocked && (
              <div className="rounded-2xl bg-error-container/40 text-on-error-container px-4 py-3 text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">lock</span>
                <span>Quota atteint : passez en Premium pour continuer à faire corriger vos dissertations.</span>
              </div>
            )}
            <div className="bg-surface border border-outline-variant rounded-2xl p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Examen</span>
                  <select
                    value={exam}
                    onChange={(e) => setExam(e.target.value)}
                    className="w-full mt-1.5 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm font-semibold text-on-surface focus:outline-none focus:border-primary"
                  >
                    {EXAM_CHOICES.map((e) => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Matière</span>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full mt-1.5 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm font-semibold text-on-surface focus:outline-none focus:border-primary"
                  >
                    {SUBJECT_CHOICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Ta dissertation (copie le sujet et ton texte)
                </span>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={12}
                  placeholder="Colle ici ta dissertation complète (introduction, développement, conclusion)…"
                  className="w-full mt-1.5 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary resize-y min-h-[220px] leading-relaxed"
                />
                <span className={`text-xs mt-1 block ${charWarning ? "text-error font-bold" : "text-on-surface-variant"}`}>
                  {chars.toLocaleString("fr-FR")} caractères {charWarning ? "— 200 minimum requis" : ""}
                </span>
              </label>
              {error && (
                <div className="rounded-xl bg-error-container/50 text-on-error-container px-4 py-3 text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">error</span>
                  <span>{error}</span>
                </div>
              )}
              <button
                onClick={submit}
                disabled={!text.trim() || sending || blocked}
                className="w-full py-4 rounded-2xl bg-primary text-on-primary font-extrabold active:scale-95 transition-transform disabled:opacity-40"
              >
                {sending ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-on-primary animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-on-primary animate-bounce" style={{ animationDelay: "0.15s" }}></span>
                    <span className="w-2 h-2 rounded-full bg-on-primary animate-bounce" style={{ animationDelay: "0.3s" }}></span>
                    Kora corrige ta copie…
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">school</span>
                    Faire corriger par Kora
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={fillExample}
              className="w-full py-3 rounded-2xl border border-dashed border-outline-variant text-on-surface-variant text-sm font-semibold active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined align-middle text-base mr-1">description</span>
              Essayer avec une copie d&apos;exemple
            </button>

            <div className="rounded-2xl bg-surface-container-low px-4 py-4 text-xs text-on-surface-variant space-y-1.5">
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">verified</span>
                Note sur 20 au barème officiel ivoirien ({exam === "BAC" ? "BAC" : "BEPC"})
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">insights</span>
                Critères détaillés, points forts, axes de progression et corrigé type
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">bolt</span>
                +10 XP à chaque copie corrigée
              </p>
            </div>
          </section>
        )}
      </main>

      <PremiumUpsell
        open={upsell.open}
        onClose={() => setUpsell({ open: false, message: "" })}
        message={upsell.message}
        plan={plan}
        decouvertePrice={decouvertePrice}
      />
    </div>
  );
}
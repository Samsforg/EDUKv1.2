"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

interface ReplayDetail {
  id: number;
  title: string;
  subject_name: string;
  tagline: string;
  description: string;
  category: string;
  animator_name: string;
  animator_title: string;
  status: string;
  starts_at: string;
  duration_minutes: number;
  viewers: number;
  gradient: string;
  resources: { id: number; title: string; file_type: string; size_mb: number }[];
  moments: { id: number; time_label: string; label: string }[];
  questions: { id: number; question: string; answer: string | null; name: string }[];
}

type Tab = "description" | "moments" | "ressources";

export default function ReplayDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const [data, setData] = useState<ReplayDetail | null>(null);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState<Tab>("description");
  const [asked, setAsked] = useState(false);

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/live/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (d.status !== "ended") throw new Error();
        setData(d);
      })
      .catch(() => setError(true));
  }, [id]);

  if (error)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-outline">lock</span>
        <p className="font-bold text-on-surface">Replay introuvable ou session non terminée</p>
        <Link href="/replays" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">
          Retour aux replays
        </Link>
      </div>
    );

  if (!data) return <div className="min-h-screen bg-background" />;

  const ask = () => {
    if (asked) return;
    fetch(`/api/live/${data.id}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "Le replay restera-t-il disponible après les examens ?" }),
    }).then((r) => r.ok && setAsked(true));
  };

  const TABS: { key: Tab; label: string }[] = [
    { key: "description", label: "Description" },
    { key: "moments", label: "Moments Clés" },
    { key: "ressources", label: "Ressources" },
  ];

  return (
    <div className="bg-background text-on-background font-['Hanken_Grotesk'] min-h-screen pb-16">
      <PageHeader
        title="Replay de session"
        backHref="/replays"
        right={
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-xs">
              {data.animator_name.slice(0, 1)}
            </button>
          </div>
        }
      />

      <main className="max-w-[1200px] mx-auto pb-8 lg:grid lg:grid-cols-12 lg:gap-8 lg:p-6">
        <section className="lg:col-span-8">
          <div className={`relative w-full aspect-video bg-gradient-to-br ${data.gradient} shadow-lg overflow-hidden lg:rounded-xl`}>
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="z-10 flex items-center justify-center w-20 h-20 bg-secondary-container text-on-secondary-container rounded-full active:scale-90 transition-all shadow-xl">
                <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="w-full h-1 bg-white/30 rounded-full mb-4 relative">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-secondary-container rounded-full" />
              </div>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined cursor-pointer">play_arrow</span>
                  <span className="material-symbols-outlined cursor-pointer">volume_up</span>
                  <span className="text-sm">15:30 / {data.duration_minutes}:00</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined cursor-pointer">closed_caption</span>
                  <span className="material-symbols-outlined cursor-pointer">fullscreen</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 lg:px-0">
            <h2 className="text-2xl font-bold text-primary mb-2">{data.title}</h2>
            <div className="flex flex-wrap items-center gap-3 text-on-surface-variant mb-6">
              <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                {data.subject_name}
              </span>
              <div className="flex items-center gap-1 text-xs">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                Diffusé le{" "}
                {new Date(data.starts_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="material-symbols-outlined text-sm">group</span>
                {data.viewers.toLocaleString("fr-FR")} élèves
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="material-symbols-outlined text-sm">person</span>
                {data.animator_name}
              </div>
            </div>

            <div className="border-b border-outline-variant mb-6 flex overflow-x-auto">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-6 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                    tab === t.key ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === "description" && (
              <div className="space-y-4">
                <p className="text-sm text-on-surface leading-relaxed">{data.description}</p>
                <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant">
                  <h4 className="font-bold text-primary mb-2 text-sm">Animation :</h4>
                  <p className="text-sm text-on-surface-variant">
                    {data.animator_name} — {data.animator_title}. {data.viewers.toLocaleString("fr-FR")} élèves ont suivi cette
                    session en direct.
                  </p>
                </div>
              </div>
            )}

            {tab === "moments" && (
              <div className="space-y-2">
                {data.moments.length === 0 && (
                  <p className="text-sm text-on-surface-variant bg-surface border border-outline-variant rounded-xl p-4">
                    Aucun moment clé n'a été signalé pour cette session.
                  </p>
                )}
                {data.moments.map((m) => (
                  <div
                    key={m.id}
                    className="group flex items-center justify-between p-3 bg-surface-container hover:bg-surface-container-high rounded-xl cursor-pointer transition-all border border-transparent hover:border-outline-variant"
                  >
                    <div className="flex items-center gap-4">
                      <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded font-bold text-xs">
                        {m.time_label}
                      </span>
                      <span className="text-on-surface font-medium text-sm">{m.label}</span>
                    </div>
                    <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      play_circle
                    </span>
                  </div>
                ))}
              </div>
            )}

            {tab === "ressources" && (
              <div className="space-y-3">
                {data.resources.length === 0 && (
                  <p className="text-sm text-on-surface-variant bg-surface border border-outline-variant rounded-xl p-4">
                    Aucun document attaché à cette session.
                  </p>
                )}
                {data.resources.map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-error-container text-error rounded flex items-center justify-center">
                        <span className="material-symbols-outlined">picture_as_pdf</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">{r.title}</p>
                        <p className="text-xs text-on-surface-variant">
                          {r.size_mb.toLocaleString("fr-FR")} MB • {r.file_type}
                        </p>
                      </div>
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors">
                      <span className="material-symbols-outlined text-primary">download</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <aside className="lg:col-span-4 p-4 lg:p-0 lg:pl-4 space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
            <h3 className="font-title-md font-semibold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">forum</span>
              Q&R de la session
            </h3>
            {data.questions.length === 0 && (
              <p className="text-sm text-on-surface-variant">Aucune question posée pendant cette session.</p>
            )}
            <div className="space-y-3">
              {data.questions.map((q) => (
                <div key={q.id} className="p-3 bg-surface-container rounded-xl">
                  <p className="text-xs font-bold text-on-surface">{q.name}</p>
                  <p className="text-sm text-on-surface mt-1">« {q.question} »</p>
                  {q.answer ? (
                    <p className="text-sm text-primary mt-2 leading-snug">
                      <strong>Réponse :</strong> {q.answer}
                    </p>
                  ) : (
                    <p className="text-xs text-on-surface-variant italic mt-2">Réponse à venir...</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-tertiary-container text-on-tertiary-container p-5 rounded-2xl">
            <h4 className="font-title-md font-bold flex items-center gap-2">
              <span className="material-symbols-outlined">lightbulb</span>
              Une question sur la session ?
            </h4>
            <p className="text-sm text-on-tertiary-container/80 mt-1">
              Pose ta question, le professeur y répondra lors de la prochaine session en direct.
            </p>
            <button
              onClick={ask}
              className="mt-4 w-full bg-on-tertiary-container text-tertiary-container font-bold px-5 py-3 rounded-xl active:scale-95 transition-transform shadow-lg flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">{asked ? "check_circle" : "help"}</span>
              {asked ? "Question envoyée !" : "Poser ma question"}
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchFresh } from "@/lib/client-fetch";
import PageHeader from "@/components/PageHeader";

interface Assignment {
  id: number;
  class_id: number;
  class_name: string;
  title: string;
  description: string | null;
  subject_name: string | null;
  deadline: string | null;
  max_score: number;
  created_at: string;
  submitted_at: string | null;
  content: string | null;
  score: number | null;
  feedback: string | null;
}

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const [busy, setBusy] = useState<Record<number, boolean>>({});
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function load() {
    try {
      const res = await fetchFresh("/api/classes/assignments").then(async (r) => {
        if (!r.ok) throw new Error((await r.json().catch(() => ({})))?.error ?? "Erreur");
        return r.json();
      });
      setAssignments(res.assignments ?? []);
      const initDraft: Record<number, string> = {};
      for (const a of res.assignments ?? []) if (a.content) initDraft[a.id] = a.content;
      setDrafts(initDraft);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(a: Assignment) {
    setBusy((b) => ({ ...b, [a.id]: true }));
    setMsg(null);
    try {
      const res = await fetchFresh(`/api/classes/assignments/${a.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: drafts[a.id] ?? "" }),
      });
      const data = await res.json();
      setMsg({ ok: res.ok, text: data.error ?? "Devoir rendu !" });
      if (res.ok) await load();
    } catch {
      setMsg({ ok: false, text: "Erreur réseau" });
    } finally {
      setBusy((b) => ({ ...b, [a.id]: false }));
    }
  }

  if (loading)
    return (
      <div className="bg-background text-on-background font-body-md min-h-screen font-['Hanken_Grotesk']">
        <div className="flex justify-center py-16">
          <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
        </div>
      </div>
    );
  if (error) return <div className="p-6 text-sm text-error">{error}</div>;

  const overdue = (d: string | null) => d && new Date(d + "T23:59:59").getTime() < Date.now();

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grutesk']">
      <PageHeader title="Mes devoirs" subtitle="Rends tes copies et suis tes notes" backHref="/mes-classes" />
      <main className="px-margin-mobile md:px-margin-desktop pt-6 space-y-4 max-w-2xl mx-auto">
        {msg && (
          <div className={`rounded-xl px-4 py-3 font-label-sm ${msg.ok ? "text-tertiary" : "text-error"}`}>{msg.text}</div>
        )}
        {assignments.length === 0 && (
          <p className="text-center font-body-sm text-on-surface-variant py-10">
            Aucun devoir publié pour tes classes.
          </p>
        )}
        {assignments.map((a) => {
          const isExpanded = expanded[a.id];
          const late = !a.submitted_at && overdue(a.deadline ?? "");
          return (
            <div key={a.id} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-label-md font-bold text-on-surface">{a.title}</h3>
                  <p className="font-label-xs text-on-surface-variant">
                    {a.class_name}
                    {a.subject_name ? ` · ${a.subject_name}` : ""} · Rendu : {a.deadline ?? "—"}
                  </p>
                </div>
                {a.score != null ? (
                  <span className="font-label-md font-bold text-primary rounded-full bg-primary/10 px-3 py-1">{a.score}/{a.max_score}</span>
                ) : a.submitted_at ? (
                  <span className="font-label-xs text-tertiary">Rendu ✓</span>
                ) : (
                  <span className={`font-label-xs ${late ? "text-error" : "text-on-surface-variant"}`}>
                    {late ? "En retard" : "À rendre"}
                  </span>
                )}
              </div>
              {a.description && <p className="font-body-sm text-on-surface-variant">{a.description}</p>}
              {a.feedback && (
                <p className="rounded-lg bg-primary/5 px-3 py-2 font-body-sm text-on-surface">
                  <b>Feedback :</b> {a.feedback}
                </p>
              )}

              {a.submitted_at ? (
                <div className="flex items-center gap-2 font-label-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  Rendu le {a.submitted_at}
                </div>
              ) : (
                <div className="space-y-2">
                  <textarea
                    value={drafts[a.id] ?? ""}
                    onChange={(e) => {
                      if (!isExpanded) {
                        setExpanded((m) => ({ ...m, [a.id]: true }));
                        setDrafts((m) => ({ ...m, [a.id]: e.target.value }));
                      } else setDrafts((m) => ({ ...m, [a.id]: e.target.value }));
                    }}
                    placeholder="Écris ta réponse ici…"
                    rows={isExpanded ? 4 : 1}
                    className="w-full rounded-xl border border-outline-variant bg-surface px-3 py-2 text-sm text-on- surface focus:border-primary focus:outline-none"
                  />
                  <button
                    onClick={() => submit(a)}
                    disabled={busy[a.id] || !(drafts[a.id]?.trim())}
                    className="w-full h-11 rounded-full bg-primary text-on-primary font-label-md font-semibold disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    {busy[a.id] ? "…" : "Rendre le devoir"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
}
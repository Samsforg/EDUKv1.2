"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchFresh } from "@/lib/client-fetch";
import PageHeader from "@/components/PageHeader";

interface Submission {
  student_id: number;
  first_name: string;
  last_name: string;
  content: string | null;
  score: number | null;
  feedback: string | null;
  submitted_at: string | null;
}

interface AssignmentInfo {
  id: number;
  class_id: number;
  title: string;
  description: string | null;
  max_score: number;
  deadline: string | null;
}

export default function AssignmentDetailPage() {
  const { id, aid } = useParams<{ id: string; aid: string }>();
  const [assignment, setAssignment] = useState<AssignmentInfo | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<number, string>>({});
  const [feedbacks, setFeedbacks] = useState<Record<number, string>>({});
  const [busy, setBusy] = useState<Record<number, boolean>>({});
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function load() {
    try {
        const res = await fetchFresh(`/api/prof/classes/${id}/assignments/${aid}`).then(async (r) => {
          if (!r.ok) throw new Error((await r.json().catch(() => ({})))?.error ?? "Erreur");
          return r.json();
        });
      setAssignment(res.assignment);
      setSubmissions(res.submissions ?? []);
      const initScore: Record<number, string> = {};
      const initFb: Record<number, string> = {};
      for (const s of res.submissions ?? []) {
        initScore[s.student_id] = s.score != null ? String(s.score) : "";
        initFb[s.student_id] = s.feedback ?? "";
      }
      setScores(initScore);
      setFeedbacks(initFb);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, aid]);

  async function grade(studentId: number) {
    setBusy((b) => ({ ...b, [studentId]: true }));
    setMsg(null);
    try {
        const res = await fetchFresh(`/api/prof/classes/${id}/assignments/${aid}`, {
          method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: studentId, score: Number(scores[studentId]), feedback: feedbacks[studentId] }),
      });
      const data = await res.json();
      setMsg({ ok: res.ok, text: data.error ?? "Note enregistrée" });
    } finally {
      setBusy((b) => ({ ...b, [studentId]: false }));
    }
  }

  if (loading) return <div className="p-6 text-center text-sm text-neutral-500">Chargement…</div>;
  if (error) return <div className="p-6 text-sm text-red-600">{error}</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <PageHeader title={assignment?.title ?? "Devoir"} backHref={`/espace-prof/classes/${id}/devoirs`} />
      <p className="text-sm text-muted-foreground">
        {assignment?.description} {assignment?.deadline ? `· Rendu : ${assignment.deadline}` : ""}
      </p>

      {msg && (
        <div className={`mt-2 rounded-lg px-3 py-2 text-sm ${msg.ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {msg.text}
        </div>
      )}

      <div className="mt-5 space-y-4">
        {submissions.length === 0 && <p className="text-sm text-muted-foreground">Aucune copie pour l'instant.</p>}
        {submissions.map((s) => (
          <div key={s.student_id} className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {s.first_name} {s.last_name}
              </h3>
              <span className="text-xs text-muted-foreground">
                {s.submitted_at ? `Rendu le ${s.submitted_at}` : "Pas encore rendu"}
              </span>
            </div>
            {s.content ? (
              <p className="mt-2 whitespace-pre-wrap rounded-lg bg-muted p-3 text-sm">{s.content}</p>
            ) : (
              <p className="mt-2 text-xs italic text-muted-foreground">Pas de copie fournie.</p>
            )}
            <div className="mt-3 grid gap-2 sm:grid-cols-[120px_1fr_auto_auto]">
              <input
                type="number"
                min="0"
                value={scores[s.student_id] ?? ""}
                onChange={(e) => setScores((m) => ({ ...m, [s.student_id]: e.target.value }))}
                placeholder={`/ ${assignment?.max_score}`}
                className="rounded-lg border px-3 py-2 text-sm bg-background"
              />
              <input
                value={feedbacks[s.student_id] ?? ""}
                onChange={(e) => setFeedbacks((m) => ({ ...m, [s.student_id]: e.target.value }))}
                placeholder="Feedback (optionnel)"
                className="rounded-lg border px-3 py-2 text-sm bg-background"
              />
              <button
                onClick={() => grade(s.student_id)}
                disabled={busy[s.student_id]}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
              >
                {busy[s.student_id] ? "…" : "Noter"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
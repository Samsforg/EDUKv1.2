"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchFresh } from "@/lib/client-fetch";
import PageHeader from "@/components/PageHeader";

interface Assignment {
  id: number;
  title: string;
  description: string | null;
  subject_id: number | null;
  subject_name: string | null;
  deadline: string | null;
  max_score: number;
  created_at: string;
  submissions: number;
  graded: number;
  avg_score: number | null;
}

interface Subject {
  id: number;
  name: string;
}

export default function ClassAssignmentsPage() {
  const { id } = useParams<{ id: string }>();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [deadline, setDeadline] = useState("");
  const [maxScore, setMaxScore] = useState("20");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function load() {
    try {
      const [a, s] = await Promise.all([
        fetchFresh(`/api/prof/classes/${id}/assignments`).then(async (r) => {
          if (!r.ok) throw new Error((await r.json().catch(() => ({})))?.error ?? "Erreur");
          return r.json();
        }),
        fetchFresh("/api/subjects").then((r) => r.json()),
      ]);
      setAssignments(a.assignments ?? []);
      setSubjects(s.subjects ?? []);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function createAssignment(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetchFresh(`/api/prof/classes/${id}/assignments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          subject_id: subjectId ? Number(subjectId) : null,
          deadline: deadline || null,
          max_score: Number(maxScore) || 20,
        }),
      });
      const data = await res.json();
      setMsg({ ok: res.ok, text: data.error ?? "Devoir créé !" });
      if (res.ok) {
        setTitle("");
        setDescription("");
        setSubjectId("");
        setDeadline("");
        setMaxScore("20");
        setShowForm(false);
        await load();
      }
    } catch {
      setMsg({ ok: false, text: "Erreur réseau" });
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <div className="p-6 text-center text-neutral-500 text-sm">Chargement…</div>;
  if (error) return <div className="p-6 text-red-600 text-sm">{error}</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <PageHeader title="Devoirs" subtitle={`Classe #${id}`} backHref={`/espace-prof/classes/${id}`} />

      <button
        onClick={() => setShowForm((v) => !v)}
        className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90"
      >
        {showForm ? "Annuler" : "+ Nouveau devoir"}
      </button>

      {showForm && (
        <form onSubmit={createAssignment} className="mb-6 space-y-3 rounded-xl border p-4 bg-card">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre du devoir *"
              required
              className="rounded-lg border px-3 py-2 text-sm bg-background"
            />
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="rounded-lg border px-3 py-2 text-sm bg-background"
            >
              <option value="">Matière (optionnel)</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description / consignes"
            rows={3}
            className="w-full rounded-lg border px-3 py-2 text-sm bg-background"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="rounded-lg border px-3 py-2 text-sm bg-background"
            />
            <input
              type="number"
              min="1"
              value={maxScore}
              onChange={(e) => setMaxScore(e.target.value)}
              className="rounded-lg border px-3 py-2 text-sm bg-background"
            />
          </div>
          {msg && <p className={`text-sm ${msg.ok ? "text-green-600" : "text-red-600"}`}>{msg.text}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {busy ? "…" : "Créer et notifier la classe"}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {assignments.length === 0 && (
          <p className="text-sm text-muted-foreground">Aucun devoir pour l'instant.</p>
        )}
        {assignments.map((a) => (
          <div key={a.id} className="rounded-xl border bg-card p-4">
            <Link href={`/espace-prof/classes/${id}/devoirs/${a.id}`} className="hover:underline">
              <h3 className="font-semibold">{a.title}</h3>
            </Link>
            <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
              {a.subject_name && <span>{a.subject_name}</span>}
              {a.deadline && <span>Rendu : {a.deadline}</span>}
              <span>Note : /{a.max_score}</span>
            </div>
            <div className="mt-2 flex gap-4 text-sm">
              <span className="text-xs">
                <b>{a.submissions}</b> rendus · <b>{a.graded}</b> notés
              </span>
              {a.avg_score != null && <span className="text-xs">Moyenne : {a.avg_score}</span>}
            </div>
            <Link
              href={`/espace-prof/classes/${id}/devoirs/${a.id}`}
              className="mt-3 inline-block rounded-full border px-3 py-1 text-xs font-semibold hover:bg-muted"
            >
              Voir les copies →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
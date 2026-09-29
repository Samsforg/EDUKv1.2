"use client";

import { useState, useEffect } from "react";
import { getCsrfToken } from "@/lib/csrf-client";
import PlanificationDialog from "./PlanificationDialog";

interface ClassRow {
  id: number;
  name: string;
  subject_id: number;
  grade_id: number;
  teacher_name: string;
}

interface ChapterRow {
  id: number;
  title: string;
  code: string;
  subject_name: string;
  grade_name: string;
}

interface ClassChapterRow {
  class_id: number;
  class_name: string;
  chapter_id: number;
  chapter_title: string;
  chapter_code: string;
  subject_name: string;
  grade_name: string;
  scheduled_at: string | null;
  status: string;
}

function PlanificationTable() {
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [chapters, setChapters] = useState<ChapterRow[]>([]);
  const [classChapters, setClassChapters] = useState<{
    class_id: number;
    class_name: string;
    chapter_id: number;
    chapter_title: string;
    chapter_code: string;
    subject_name: string;
    grade_name: string;
    scheduled_at: string | null;
    status: string;
  }[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    class_id: "",
    chapter_id: "",
    scheduled_at: "",
    status: "planned",
  });

  const fetchClasses = async () => {
    try {
      const res = await fetch("/api/admin/classes");
      const data = await res.json();
      if (data.classes) setClasses(data.classes);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchChapters = async (classId: number) => {
    try {
      const res = await fetch(`/api/admin/classes/${classId}/chapters`);
      const data = await res.json();
      if (data.chapters) setChapters(data.chapters);
      const res2 = await fetch(`/api/admin/content/class_chapter?class_id=${classId}`);
      const data2 = await res2.json();
      if (data2.chapters) setClassChapters(data2.chapters);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleClassChange = (value: string) => {
    const id = Number(value);
    setSelectedClassId(id);
    fetchChapters(id);
    setIsOpen(false);
    setFormData({ class_id: String(id), chapter_id: "", scheduled_at: "", status: "planned" });
  };

  const resetForm = () => {
    setFormData({ class_id: String(selectedClassId ?? ""), chapter_id: "", scheduled_at: "", status: "planned" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = await getCsrfToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["x-csrf-token"] = token;

      const body = {
        class_id: Number(formData.class_id),
        chapter_id: Number(formData.chapter_id),
        scheduled_at: formData.scheduled_at || undefined,
        status: formData.status,
      };

      const res = await fetch("/api/admin/content/class_chapter", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-csrf-token": (await getCsrfToken()) ?? "" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      if (selectedClassId) fetchChapters(selectedClassId);
      setIsOpen(false);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (classId: number, chapterId: number) => {
    if (!confirm("Retirer ce chapitre de la classe ?")) return;
    try {
      const token = await getCsrfToken();
      const res = await fetch(`/api/admin/content/class_chapter?class_id=${classId}&chapter_id=${chapterId}`, {
        method: "DELETE",
        headers: { "x-csrf-token": token ?? "" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      if (selectedClassId) fetchChapters(selectedClassId);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erreur");
    }
  };

  return (
    <>
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b border-outline-variant">
          <div className="font-headline-md text-on-surface">Sélectionner une classe</div>
          <select
            value={String(selectedClassId ?? "")}
            onChange={(e) => handleClassChange(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Choisir une classe</option>
            {classes.map((c) => (
              <option key={c.id} value={String(c.id)}>{c.name} — {c.teacher_name}</option>
            ))}
          </select>
        </div>
      </section>

      {selectedClassId && (
        <>
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b border-outline-variant">
              <div className="font-headline-md text-on-surface">Chapitres planifiés ({classChapters.length})</div>
              <button
                type="button"
                onClick={() => { resetForm(); setIsOpen(true); }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined">add</span>
                Ajouter un chapitre
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-high/60 text-label-xs uppercase tracking-wider text-on-surface-variant">
                  <tr>
                    <th className="px-6 py-3">Chapitre</th>
                    <th className="px-6 py-3">Matière / Niveau</th>
                    <th className="px-6 py-3">Programmé le</th>
                    <th className="px-6 py-3">Statut</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {classChapters.map((cc) => (
                    <tr key={`${cc.class_id}-${cc.chapter_id}`} className="hover:bg-surface-container transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-on-surface">{cc.chapter_title}</div>
                        <div className="text-label-sm text-on-surface-variant">{cc.chapter_code}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-on-surface">{cc.subject_name}</div>
                        <div className="text-label-sm text-on-surface-variant">{cc.grade_name}</div>
                      </td>
                      <td className="px-6 py-4 text-label-sm text-on-surface-variant">{cc.scheduled_at?.slice(0, 10) ?? "—"}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cc.status === "active" ? "bg-tertiary-container text-on-tertiary-container" : cc.status === "completed" ? "bg-primary-container text-on-primary-container" : "bg-warning-container text-on-warning-container"}`}>
                          {cc.status === "active" ? "En cours" : cc.status === "completed" ? "Terminé" : "Planifié"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(cc.class_id, cc.chapter_id)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-label-sm font-medium border border-error text-error hover:bg-error-container transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">remove</span>
                          Retirer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <PlanificationDialog
            isOpen={isOpen}
            onClose={() => { setIsOpen(false); resetForm(); }}
            selectedClassId={selectedClassId}
            chapters={chapters}
            classChapters={classChapters}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            loading={loading}
            error={error}
            setIsOpen={setIsOpen}
          />
        </>
      )}
    </>
  );
}
export default PlanificationTable;


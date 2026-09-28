"use client";

import { useState } from "react";
import { getCsrfToken } from "@/lib/csrf-client";

interface PlanificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedClassId: number | null;
  chapters: {
    id: number;
    title: string;
    code: string;
    subject_name: string;
    grade_name: string;
  }[];
  classChapters: {
    class_id: number;
    chapter_id: number;
    chapter_title: string;
    chapter_code: string;
    subject_name: string;
    grade_name: string;
    scheduled_at: string | null;
    status: string;
  }[];
  formData: { class_id: string; chapter_id: string; scheduled_at: string; status: string };
  setFormData: React.Dispatch<React.SetStateAction<{ class_id: string; chapter_id: string; scheduled_at: string; status: string }>>;
  onSubmit: (e: React.FormEvent) => void;
  onDelete: (classId: number, chapterId: number) => void;
  loading: boolean;
  error: string | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PlanificationDialog({
  isOpen,
  onClose,
  selectedClassId,
  chapters,
  classChapters,
  formData,
  setFormData,
  onSubmit,
  onDelete,
  loading,
  error,
  setIsOpen,
}: PlanificationDialogProps) {
  if (!isOpen || !selectedClassId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div className="bg-surface dark:bg-inverse-surface rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-outline-variant flex items-center justify-between">
          <div>
            <h2 className="font-headline-md text-on-surface">Ajouter un chapitre à la classe</h2>
            <p className="text-on-surface-variant font-body-sm mt-0.5">Sélectionnez un chapitre et définissez sa date de programmation.</p>
          </div>
          <button onClick={onClose} className="p-1 text-on-surface-variant hover:bg-surface-container-high rounded-full" aria-label="Fermer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-4 space-y-4">
          {error && <div className="bg-error-container text-on-error-container p-3 rounded-lg text-sm">{error}</div>}
          <input type="hidden" name="class_id" value={String(selectedClassId)} readOnly />
          <div className="space-y-2">
            <label className="block text-label-md font-medium text-on-surface">Chapitre *</label>
            <select
              value={formData.chapter_id}
              onChange={(e) => formData.chapter_id = e.target.value}
              required
              className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Choisir un chapitre</option>
              {chapters.map((c) => (
                <option key={c.id} value={String(c.id)}>{c.title} ({c.subject_name} / {c.grade_name})</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-label-md font-medium text-on-surface">Date de programmation</label>
            <input
              type="date"
              value={formData.scheduled_at}
              onChange={(e) => formData.scheduled_at = e.target.value}
              className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-label-md font-medium text-on-surface">Statut</label>
            <select
              value={formData.status}
              onChange={(e) => formData.status = e.target.value}
              className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="planned">Planifié</option>
              <option value="active">En cours</option>
              <option value="completed">Terminé</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => { formData.class_id = ""; formData.chapter_id = ""; formData.scheduled_at = ""; formData.status = "planned"; onClose(); }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-primary text-on-primary hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {loading ? <span className="animate-spin material-symbols-outlined">refresh</span> : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
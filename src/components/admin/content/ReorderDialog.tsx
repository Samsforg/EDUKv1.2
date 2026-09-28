"use client";

import { useState, useEffect } from "react";
import { getCsrfToken } from "@/lib/csrf-client";

interface ReorderDialogProps {
  open: boolean;
  onClose: () => void;
  entityType: "chapter" | "lesson";
  subjectId?: number;
  chapterId?: number;
  gradeId?: number;
  onSuccess?: () => void;
}

interface OrderItem {
  id: number;
  title: string;
  order: number;
}

export default function ReorderDialog({ open, onClose, entityType, subjectId, chapterId, gradeId, onSuccess }: ReorderDialogProps) {
  const [items, setItems] = useState<{ id: number; title: string; order: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draftOrder, setDraftOrder] = useState<number[]>([]);

  useEffect(() => {
    if (open) fetchItems();
  }, [open, entityType, subjectId, chapterId, gradeId]);

  const fetchItems = async () => {
    let url = "";
    if (entityType === "chapter" && subjectId) {
      url = `/api/admin/content/chapter?subject_id=${subjectId}`;
    } else if (entityType === "lesson" && chapterId) {
      url = `/api/admin/content/lesson?chapter_id=${chapterId}`;
    } else {
      return;
    }
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.chapters) setItems(data.chapters);
      else if (data.lessons) setItems(data.lessons);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (items.length) setDraftOrder(items.map((i) => i.id));
  }, [items]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...draftOrder];
    const item = newOrder.splice(index, 1)[0];
    newOrder.splice(index - 1, 0, item);
    setDraftOrder(newOrder);
  };

  const moveDown = (index: number) => {
    if (index === draftOrder.length - 1) return;
    const newOrder = [...draftOrder];
    const item = newOrder.splice(index, 1)[0];
    newOrder.splice(index + 1, 0, item);
    setDraftOrder(newOrder);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await (await import("@/lib/csrf-client")).getCsrfToken();
      const res = await fetch("/api/admin/content/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-csrf-token": token ?? "" },
        body: JSON.stringify({ entity_type: entityType, ordered_ids: draftOrder }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      onClose();
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={open ? "fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" : "hidden"} onClick={onClose}>
      <div className="bg-surface dark:bg-inverse-surface rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-outline-variant flex items-center justify-between">
          <div>
            <h2 className="font-headline-md text-on-surface">Réordonnancer les {entityType === "chapter" ? "chapitres" : "leçons"}</h2>
            <p className="text-on-surface-variant font-body-sm mt-0.5">Utilisez les flèches pour réorganiser. Cliquez sur Enregistrer pour appliquer.</p>
          </div>
          <button onClick={onClose} className="p-1 text-on-surface-variant hover:bg-surface-container-high rounded-full" aria-label="Fermer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-0">
          {error && <div className="bg-error-container text-on-error-container p-3 mx-4 rounded-lg text-sm">{error}</div>}
          <ul className="divide-y divide-outline-variant">
            {draftOrder.map((id, index) => {
              const item = items.find((i) => i.id === id);
              if (!item) return null;
              return (
                <li key={id} className="flex items-center gap-3 p-3 hover:bg-surface-container">
                  <span className="material-symbols-outlined text-on-surface-variant cursor-grab">drag_indicator</span>
                  <div className="flex-1">
                    <div className="font-medium text-on-surface">{item.title}</div>
                    <div className="text-label-sm text-on-surface-variant">Ordre : {index + 1}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-label-sm font-medium border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">keyboard_arrow_up</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(index)}
                    disabled={index === draftOrder.length - 1}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-label-sm font-medium border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex justify-end gap-2 p-4 border-t border-outline-variant">
          <button type="button" onClick={onClose} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors">
            Annuler
          </button>
          <button type="button" onClick={handleSave} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-primary text-on-primary hover:bg-primary/90 disabled:opacity-50 transition-colors">
            {loading ? <span className="animate-spin material-symbols-outlined">refresh</span> : "Enregistrer l'ordre"}
          </button>
        </div>
      </div>
    </div>
  );
}
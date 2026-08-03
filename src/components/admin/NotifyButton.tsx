"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function NotifyButton({
  userId,
  userName,
  all = false,
}: {
  userId?: number;
  userName?: string;
  all?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setDone("");
    try {
      const res = await fetch("/api/admin/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(all ? { title, body } : { user_id: userId, title, body }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
      } else {
        setDone(`Notification envoyée à ${data.count} destinataire${data.count > 1 ? "s" : ""}.`);
        setTitle("");
        setBody("");
        setTimeout(() => setDone(""), 3000);
        router.refresh();
      }
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  if (all) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label text-label-sm flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">campaign</span>
          Notifier tous les élèves
        </button>
        {open && (
          <form onSubmit={submit} className="mt-3 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 space-y-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de la notification"
              className="w-full bg-surface-container-high rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary border border-transparent"
              maxLength={80}
              required
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Message..."
              rows={2}
              className="w-full bg-surface-container-high rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary border border-transparent"
              maxLength={300}
              required
            />
            {error && <p className="text-xs text-error">{error}</p>}
            {done && <p className="text-xs text-tertiary">{done}</p>}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={busy}
                className="bg-primary text-on-primary px-4 py-2 rounded-lg text-label-sm font-semibold disabled:opacity-50"
              >
                {busy ? "Envoi..." : "Envoyer"}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg text-label-sm font-semibold text-on-surface-variant hover:bg-surface-container-high"
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => setOpen(true)}
      className="relative text-primary flex items-center gap-1 text-label-xs font-semibold hover:bg-primary-container/30 px-2 py-1 rounded-lg transition-colors"
      title={`Notifier ${userName ?? ""}`}
    >
      <span className="material-symbols-outlined text-sm">notifications</span>
      Notifier
      {open && (
        <form
          onSubmit={submit}
          className="absolute right-0 top-full mt-2 w-72 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 space-y-3 shadow-lg z-10"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre"
            className="w-full bg-surface-container-high rounded-lg px-3 py-2 text-sm focus:outline-none border border-transparent"
            maxLength={80}
            required
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Message..."
            rows={2}
            className="w-full bg-surface-container-high rounded-lg px-3 py-2 text-sm focus:outline-none border border-transparent"
            maxLength={300}
            required
          />
          {error && <p className="text-xs text-error">{error}</p>}
          {done && <p className="text-xs text-tertiary">{done}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={busy}
              className="bg-primary text-on-primary px-4 py-2 rounded-lg text-label-sm font-semibold disabled:opacity-50"
            >
              {busy ? "Envoi..." : "Envoyer"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg text-label-sm font-semibold text-on-surface-variant hover:bg-surface-container-high"
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </button>
  );
}

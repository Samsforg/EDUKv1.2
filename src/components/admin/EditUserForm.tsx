"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Serie {
  id: number;
  code: string;
  name: string;
}

export function EditUserForm({
  userId,
  initial,
}: {
  userId: number;
  initial: { first_name: string; last_name: string; email: string | null; phone: string | null; serie_id: number | null; class_level: string | null; gender: string | null; commune: string | null };
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [series, setSeries] = useState<Serie[] | null>(null);
  const [form, setForm] = useState({
    first_name: initial.first_name,
    last_name: initial.last_name,
    email: initial.email ?? "",
    phone: initial.phone ?? "",
    serie_id: initial.serie_id?.toString() ?? "",
    class_level: initial.class_level ?? "",
    gender: initial.gender ?? "",
    commune: initial.commune ?? "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function openPanel() {
    setOpen(!open);
    setDone(false);
    setError("");
    if (series === null) {
      try {
        const res = await fetch("/api/series");
        const data = await res.json();
        setSeries(data.series ?? []);
      } catch {
        setSeries([]);
      }
    }
  }

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const payload: Record<string, unknown> = {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
      };
      if (form.email.trim()) payload.email = form.email.trim();
      if (form.phone.trim()) payload.phone = form.phone.trim();
      payload.serie_id = form.serie_id ? Number(form.serie_id) : null;
      if (form.class_level.trim()) payload.class_level = form.class_level.trim();
      if (form.gender === "M" || form.gender === "F") payload.gender = form.gender;
      if (form.commune.trim()) payload.commune = form.commune.trim();

      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur lors de l'enregistrement");
        return;
      }
      setDone(true);
      router.refresh();
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={openPanel}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors"
        title="Modifier le profil"
      >
        <span className="material-symbols-outlined text-sm">edit</span>
        Modifier
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-surface-container-low border border-outline-variant rounded-xl shadow-lg p-4 z-20 max-h-[85vh] overflow-y-auto">
          <p className="text-label-sm font-semibold text-on-surface mb-1">Modifier le profil</p>
          <p className="text-label-xs text-on-surface-variant mb-3">
            Modifiez les informations de l'utilisateur # {userId}.
          </p>
          {done ? (
            <div className="text-sm text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Profil mis à jour avec succès.
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={form.first_name}
                  onChange={(e) => set("first_name", e.target.value)}
                  placeholder="Prénom"
                  required
                  className="bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary"
                />
                <input
                  value={form.last_name}
                  onChange={(e) => set("last_name", e.target.value)}
                  placeholder="Nom"
                  required
                  className="bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary"
                />
              </div>
              <input
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                type="email"
                placeholder="Email"
                className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary"
              />
              <input
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="Téléphone"
                className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary"
              />
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={form.serie_id}
                  onChange={(e) => set("serie_id", e.target.value)}
                  className="bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary"
                >
                  <option value="">Série —</option>
                  {series?.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <input
                  value={form.class_level}
                  onChange={(e) => set("class_level", e.target.value)}
                  placeholder="Classe (ex. Terminale C)"
                  className="bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={form.gender}
                  onChange={(e) => set("gender", e.target.value)}
                  className="bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary"
                >
                  <option value="">Genre —</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
                <input
                  value={form.commune}
                  onChange={(e) => set("commune", e.target.value)}
                  placeholder="Commune"
                  className="bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary"
                />
              </div>
              {error && <p className="text-xs text-error">{error}</p>}
              <button
                type="submit"
                disabled={busy}
                className="w-full flex items-center justify-center gap-1 bg-primary text-on-primary rounded-lg px-3 py-2 text-label-sm font-semibold hover:opacity-90 disabled:opacity-50"
              >
                {busy ? (
                  <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-sm">save</span>
                )}
                Enregistrer les modifications
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
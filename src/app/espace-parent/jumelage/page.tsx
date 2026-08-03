"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ParentShell } from "@/components/parent/ParentShell";

interface LinkedChild {
  child_id: number;
  first_name: string;
  last_name: string;
  class_level: string | null;
  serie_name: string | null;
  online: boolean;
}

export default function Page() {
  const [code, setCode] = useState("");
  const [children, setChildren] = useState<LinkedChild[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<LinkedChild | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadChildren = useCallback(async () => {
    try {
      const res = await fetch("/api/parent/children");
      if (res.ok) {
        const data = await res.json();
        setChildren(data.children ?? []);
      }
    } catch {
      // silencieux
    }
  }, []);

  useEffect(() => {
    loadChildren();
    inputRef.current?.focus();
  }, [loadChildren]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (code.length !== 6) {
      setError("Le code de jumelage contient 6 caractères.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/parent/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Code invalide.");
      } else {
        setSuccess(data.child);
        setCode("");
        await loadChildren();
        setTimeout(() => setSuccess(null), 3500);
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUnlink(childId: number) {
    if (!confirm("Retirer cet enfant de votre espace parent ?")) return;
    const res = await fetch("/api/parent/children", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ child_id: childId }),
    });
    if (res.ok) {
      setChildren((prev) => prev.filter((c) => c.child_id !== childId));
    }
  }

  return (
    <ParentShell active="dashboard">
      <div className="space-y-8">
        <section className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-fixed rounded-2xl mb-6">
            <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              family_restroom
            </span>
          </div>
          <h2 className="font-headline text-3xl font-bold text-primary mb-4">Jumelage Parent-Enfant</h2>
          <p className="text-on-surface-variant text-lg leading-relaxed px-2">
            Suivez la réussite de votre enfant en temps réel. Entrez le code de jumelage généré par l&apos;application de
            votre enfant pour commencer.
          </p>
        </section>

        <div className="bg-surface-container-lowest rounded-xl shadow-md border border-outline-variant p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-2" htmlFor="pairing_code">
                Code de jumelage (6 caractères)
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  className="block w-full px-5 py-4 text-2xl font-bold tracking-[0.5em] text-center uppercase bg-surface border-2 border-outline-variant rounded-xl focus:border-primary focus:outline-none transition-all duration-200 placeholder:opacity-30"
                  id="pairing_code"
                  maxLength={6}
                  placeholder="A1B2C3"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
                  autoComplete="off"
                />
              </div>
            </div>
            {error && (
              <p className="text-sm text-error bg-error-container/40 rounded-lg px-4 py-3" role="alert">
                {error}
              </p>
            )}
            {success && (
              <div className="bg-tertiary-container/20 border border-tertiary-container/40 rounded-lg px-4 py-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary">check_circle</span>
                <p className="text-sm font-medium text-on-surface">
                  {success.first_name} {success.last_name} est maintenant lié à votre espace parent.
                </p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-on-primary font-bold text-lg rounded-xl shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
              ) : (
                <>
                  Valider le jumelage
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          </form>
        </div>

        {children.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-lg font-bold text-on-surface">Enfants liés</h3>
              <Link href="/espace-parent" className="text-primary text-sm font-semibold hover:underline">
                Accéder au tableau de bord
              </Link>
            </div>
            {children.map((c) => (
              <div
                key={c.child_id}
                className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {c.first_name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">
                      {c.first_name} {c.last_name}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {c.class_level ?? "Élève"}
                      {c.serie_name ? ` • ${c.serie_name}` : ""}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleUnlink(c.child_id)}
                  className="text-error text-sm font-medium hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">link_off</span>
                  Retirer
                </button>
              </div>
            ))}
          </section>
        )}

        <section className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/50">
          <h3 className="font-headline text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">help</span>
            Où trouver ce code ?
          </h3>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-sm">
                1
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-on-surface mb-1">Ouvrez l&apos;application Edukora</h4>
                <p className="text-sm text-on-surface-variant">
                  Sur le téléphone ou la tablette de votre enfant, lancez l&apos;application Edukora Apprenant.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-sm">
                2
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-on-surface mb-1">Profil &gt; Jumelage</h4>
                <p className="text-sm text-on-surface-variant">
                  Allez dans l&apos;onglet &apos;Profil&apos; et cliquez sur le bouton &apos;Générer un code de jumelage&apos;.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ParentShell>
  );
}

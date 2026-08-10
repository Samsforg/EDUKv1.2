"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchFresh } from "@/lib/client-fetch";
import PageHeader from "@/components/PageHeader";

interface MyClass {
  name: string;
  invite_code: string | null;
  subject_name: string | null;
  icon: string | null;
  color: string | null;
  grade_name: string | null;
  teacher_first: string;
  teacher_last: string;
  joined_at: string;
}

export default function StudentClassesPage() {
  const router = useRouter();
  const [classes, setClasses] = useState<MyClass[]>([]);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetchFresh("/api/classes/mine");
    if (res.status === 401) {
      router.replace("/connexion-edukora");
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setClasses(data.classes ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function join(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetchFresh("/api/classes/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setMsg({ ok: res.ok, text: data.error ?? "Rejoint ! Bienvenue dans la classe." });
      if (res.ok) {
        setCode("");
        await load();
      }
    } catch {
      setMsg({ ok: false, text: "Erreur réseau" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <PageHeader title="Mes classes" subtitle="Rejoins la classe de ton professeur" backHref="/accueil-edukora" />

      <main className="px-margin-mobile md:px-margin-desktop pt-6 space-y-6 max-w-2xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        ) : (
          <>
            <form onSubmit={join} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-3">
              <div>
                <h2 className="font-title-md text-title-md text-on-surface font-bold">Rejoindre une classe</h2>
                <p className="font-label-sm text-on-surface-variant">Demande le code d&apos;invitation à ton professeur.</p>
              </div>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="CODE (ex : ABCD12)"
                maxLength={6}
                className="w-full h-14 rounded-xl border border-outline-variant bg-surface px-4 text-on-surface font-label-md tracking-[0.35em] text-center font-bold uppercase focus:border-primary focus:outline-none"
              />
              {msg && <p className={`font-label-sm ${msg.ok ? "text-tertiary" : "text-error"}`}>{msg.text}</p>}
              <button
                type="submit"
                disabled={busy || code.trim().length < 4}
                className="w-full h-12 rounded-full bg-primary text-on-primary font-label-md font-semibold disabled:opacity-50 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">group_add</span>
                {busy ? "..." : "Rejoindre"}
              </button>
            </form>

            <section>
              <h3 className="font-title-md text-title-md text-on-surface font-bold mb-3">
                {classes.length > 0 ? `Mes classes (${classes.length})` : "Pas encore de classe"}
              </h3>
              {classes.length === 0 ? (
                <p className="bg-surface border border-outline-variant rounded-xl p-4 text-center font-body-sm text-on-surface-variant">
                  Tu n&apos;es encore inscrit dans aucune classe. Entre le code reçu de ton professeur pour commencer.
                </p>
              ) : (
                <div className="space-y-3">
                  {classes.map((c, i) => (
                    <div key={i} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: (c.color ?? "#0047ab") + "22", color: c.color ?? "#0047ab" }}>
                        <span className="material-symbols-outlined">{c.icon ?? "school"}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-label-md font-semibold text-on-surface truncate">{c.name}</h4>
                        <p className="font-label-xs text-on-surface-variant">
                          {[c.subject_name, c.grade_name].filter(Boolean).join(" · ") || "Classe"} · Prof. {c.teacher_first} {c.teacher_last}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <div className="text-center pt-4">
              <Link href="/mes-classes/devoirs" className="text-primary font-label-sm font-bold">Voir mes devoirs</Link>
              <span className="mx-2 text-on-surface-variant">·</span>
              <Link href="/" className="text-primary font-label-sm font-bold">Retour à l&apos;accueil</Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
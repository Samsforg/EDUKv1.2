"use client";

import { useState } from "react";

export default function NewsletterSection({
  source = "home",
}: {
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Une erreur est survenue, réessaie plus tard.");
        return;
      }
      setStatus("success");
      setMessage("Inscription confirmée ! Tu recevras nos conseils de révision par email.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Une erreur est survenue, réessaie plus tard.");
    }
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-surface-container-low">
      <div className="max-w-4xl mx-auto bg-white rounded-[32px] border border-outline-variant p-8 md:p-12 shadow-sm">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-label-xs font-bold mb-4">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                mail
              </span>
              NEWSLETTER GRATUITE
            </span>
            <h2 className="text-[24px] md:text-[28px] font-extrabold text-primary mb-3">
              Reçois des conseils pour réussir ton BAC &amp; BEPC
            </h2>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Chaque semaine : méthodes de révision, plans de travail, gestion du stress et
              astuces d'élèves. Rejoins gratuitement notre communauté d'étudiants.
            </p>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 mt-5 text-primary font-bold text-body-md hover:underline"
            >
              Découvrir les articles du blog
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
          </div>
          <div>
            {status === "success" ? (
              <div className="bg-tertiary-container/20 border border-tertiary-container rounded-2xl p-6 text-center">
                <span className="material-symbols-outlined text-tertiary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  task_alt
                </span>
                <p className="mt-3 text-body-md font-semibold text-on-surface">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <label htmlFor="newsletter-email" className="block text-label-sm font-semibold text-on-surface mb-1">
                  Ton adresse email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemple@email.com"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-2xl px-5 py-4 text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-on-primary text-body-md font-bold px-6 py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      Inscription...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">send</span>
                      S'abonner gratuitement
                    </>
                  )}
                </button>
                {status === "error" && (
                  <p className="text-error text-label-sm font-semibold">{message}</p>
                )}
                <p className="text-label-xs text-on-surface-variant text-center">
                  Désabonnement en un clic à tout moment. Aucun spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { EVENTS, trackEvent } from "@/lib/analytics";

interface ReferralProfile {
  referral_code: string | null;
  filleuls: number;
  first_name: string;
}

export default function ParrainagePage() {
  const [profile, setProfile] = useState<ReferralProfile | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me/profile")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.user) {
          setProfile({
            referral_code: d.user.referral_code ?? null,
            filleuls: d.user.filleuls ?? 0,
            first_name: d.user.first_name,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const code = profile?.referral_code;

  const copyCode = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      trackEvent(EVENTS.referralCodeCopied, { code });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const share = () => {
    if (!code) return;
    const text = `Rejoins-moi sur Edukora pour réviser le BAC et le BEPC en Côte d'Ivoire ! Inscris-toi avec mon code de parrainage et gagne +50 XP de bienvenue : ${code}`;
    const link = "https://edukora.net/inscription-1-2-edukora";
    trackEvent(EVENTS.referralLinkShared, { code, method: "share" in navigator ? "native" : "whatsapp" });
    if ("share" in navigator) {
      navigator
        .share({ title: "Parrainage Edukora", text, url: link })
        .catch(() => {});
    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(`${text} — ${link}?ref=${code}`)}`,
        "_blank",
        "noopener",
      );
    }
  };
  const shareWhatsApp = () => {
    if (!code) return;
    const text = `Rejoins-moi sur Edukora ! Code parrain ${code} → +50 XP offerts. Inscris-toi : https://edukora.net/inscription-1-2-edukora?ref=${encodeURIComponent(code)}`;
    trackEvent(EVENTS.referralLinkShared, { code, method: "whatsapp" });
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <PageHeader title="Parrainage" subtitle="Partage, inscris, grimpe" backHref="/accueil-edukora" />

      <main className="px-margin-mobile max-w-2xl mx-auto pt-6 space-y-5">
        <section className="bg-surface border border-outline-variant rounded-2xl p-6 text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>diversity_3</span>
          </div>
          <h2 className="font-headline-md font-bold text-on-surface">Le parrainage Edukora</h2>
          <p className="font-body-sm text-on-surface-variant leading-relaxed">
            Partage ton code de parrainage avec tes amis, tes camarades de classe et ta famille.
            Chaque filleul qui s&apos;inscrit avec ton code te fait gagner
            <span className="text-primary font-semibold"> +150 XP immédiatement</span> (sans attendre
            de paiement), et ton filleul reçoit <span className="text-primary font-semibold">+50 XP de bienvenue</span> + <span className="text-primary font-semibold">-20% sur son 1er mois</span>.
            Tu grimpes aussi dans le <span className="text-primary font-semibold">classement Ambassadeurs</span>.
          </p>
        </section>

        {!loading && (
          <>
            {code ? (
              <section className="bg-surface border border-outline-variant rounded-2xl p-6 space-y-4">
                <div>
                  <p className="font-label-md font-semibold text-on-surface">Ton code de parrainage</p>
                  <p className="font-label-xs text-on-surface-variant">
                    {profile?.first_name ?? "Toi"}, tu as déjà {profile?.filleuls ?? 0} filleul{profile?.filleuls && profile.filleuls > 1 ? "s" : ""} inscrit{profile?.filleuls && profile.filleuls > 1 ? "s" : ""} !
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-background border border-outline-variant rounded-xl px-4 py-3 font-mono font-bold text-primary tracking-[0.15em] text-lg text-center select-all">
                    {code}
                  </code>
                  <button
                    type="button"
                    onClick={copyCode}
                    className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center active:scale-95 transition-transform duration-150"
                    aria-label="Copier le code"
                  >
                    <span className="material-symbols-outlined">{copied ? "check" : "content_copy"}</span>
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={share}
                    className="flex-1 bg-primary text-on-primary rounded-xl py-3 font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-150"
                  >
                    <span className="material-symbols-outlined text-lg">share</span>
                    Partager
                  </button>
                  <button
                    type="button"
                    onClick={shareWhatsApp}
                    className="flex-1 bg-[#25D366] text-white rounded-xl py-3 font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-150"
                  >
                    <span className="material-symbols-outlined text-lg">chat</span>
                    WhatsApp
                  </button>
                </div>
                <Link
                  href="/classement?view=ambassadeurs"
                  className="w-full bg-surface border border-outline-variant rounded-xl py-3 font-label-md font-semibold text-on-surface flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-150"
                >
                  <span className="material-symbols-outlined text-lg">leaderboard</span>
                  Voir le classement Ambassadeurs
                </Link>
              </section>
            ) : (
              <section className="bg-surface border border-outline-variant rounded-2xl p-6 text-center space-y-4">
                <p className="font-body-sm text-on-surface-variant">
                  Connecte-toi pour obtenir ton code de parrainage personnel.
                </p>
                <div className="flex gap-2">
                  <Link
                    href="/connexion-edukora?from=/parrainage"
                    className="flex-1 bg-primary text-on-primary rounded-xl py-3 font-label-md font-semibold flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">login</span>
                    Se connecter
                  </Link>
                  <Link
                    href="/inscription-1-2-edukora"
                    className="flex-1 bg-surface border border-outline-variant rounded-xl py-3 font-label-md font-semibold text-on-surface flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">person_add</span>
                    Créer un compte
                  </Link>
                </div>
              </section>
            )}
          </>
        )}

        <section className="bg-surface border border-outline-variant rounded-2xl p-6">
          <h3 className="font-label-md font-semibold text-on-surface mb-4">Comment ça marche ?</h3>
          <ol className="space-y-4">
            {[
              { icon: "badge", title: "1. Récupère ton code", text: "Ton code unique EDK-XXXXXX est généré automatiquement lors de ton inscription." },
              { icon: "send", title: "2. Partage-le autour de toi", text: "WhatsApp, Messenger, réseaux sociaux : chaque ami inscrit avec ton code devient ton filleul." },
              { icon: "leaderboard", title: "3. Grimpe dans le classement", text: "Chaque filleul inscrit = +150 XP pour toi et +50 XP + -20% sur son 1er mois pour lui, dès l'inscription. Continue de partager pour devenir Ambassadeur (Novice, Expert, Élite)." },
            ].map((s) => (
              <li key={s.title} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <div>
                  <p className="font-label-md font-semibold text-on-surface">{s.title}</p>
                  <p className="font-label-xs text-on-surface-variant leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
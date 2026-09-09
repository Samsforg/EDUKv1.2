"use client";

import { useState } from "react";
import { trackEvent, EVENTS } from "@/lib/analytics";

// Sélecteur Mensuel/Trimestriel + checkout — composant React pur (remplace les
// <script> inline qui ne s'exécutent pas en navigation client-side Next.js).

export interface PlanLite {
  id: number;
  name: string;
  price_cents: number;
}

const fmt = (n: number) => n.toLocaleString("fr-FR");

export default function PlanSelector({
  monthPlan,
  quarterPlan,
}: {
  monthPlan: PlanLite | null;
  quarterPlan: PlanLite | null;
}) {
  const [monthly, setMonthly] = useState(true);
  const [trial, setTrial] = useState(true);
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoMsg, setPromoMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [btnLabel, setBtnLabel] = useState("S'abonner maintenant");
  const [showPhone, setShowPhone] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState("");

  const current = monthly ? monthPlan : quarterPlan ?? monthPlan;
  const basePrice = current?.price_cents ?? 0;
  const effective = trial ? 0 : promo ? Math.max(0, Math.round((basePrice * (100 - promo.discount)) / 100)) : basePrice;

  async function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (!code) { setPromoMsg({ text: "Saisissez un code promo.", ok: false }); return; }
    setPromoMsg(null);
    try {
      const r = await fetch(`/api/promo/check?code=${encodeURIComponent(code)}`, { credentials: "same-origin" });
      const d = await r.json().catch(() => ({ valid: false }));
      if (d?.valid && d.discount_type === "percent") {
        setPromo({ code: d.code, discount: Number(d.discount_value) || 0 });
        setPromoMsg({ text: `Code appliqué : -${d.discount_value} %. Le prix affiché est votre prix final.`, ok: true });
      } else {
        setPromo(null);
        setPromoMsg({ text: d?.message || "Ce code promo ne peut pas être utilisé ici.", ok: false });
      }
    } catch {
      setPromoMsg({ text: "Erreur réseau. Réessayez.", ok: false });
    }
  }

  function trackCheckout(pid: number) {
    trackEvent(EVENTS.checkoutStarted, {
      plan_id: pid,
      value: effective,
      currency: "XOF",
      interval: monthly ? "month" : "quarter",
      promo: promo?.code ?? null,
    });
  }

  async function doCheckout(phoneOverride?: string) {
    const pid = current?.id ?? 0;
    if (!pid || pid <= 0) {
      setBtnLabel("Plans en cours de chargement…");
      return;
    }
    setBusy(true);
    setBtnLabel("Redirection vers le paiement...");
    trackCheckout(pid);
    const ctrl = new AbortController();
    const guard = setTimeout(() => ctrl.abort(), 25000);
    try {
      const r = await fetch("/api/premium/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        signal: ctrl.signal,
        body: JSON.stringify({ plan_id: pid, promo: promo?.code, trial, oneClick: true }),
      });
      const d = await r.json().catch(() => ({}) as Record<string, unknown>);
      if (r.status === 401) { window.location.href = "/connexion-edukora?from=/plans-d-abonnement-edukora-1"; return; }
      if (typeof d.url === "string" && d.url) { window.location.href = d.url; return; }
      if (d.code === "PHONE_REQUIRED") {
        setShowPhone(true);
        setBtnLabel("S'abonner maintenant");
        setBusy(false);
        return;
      }
      if (d.code === "PROMO_INVALID") { setPromo(null); setPromoMsg({ text: String(d.error ?? "Code promo invalide."), ok: false }); }
      setBtnLabel(String(d.error ?? "Erreur"));
    } catch {
      setBtnLabel("Erreur réseau. Réessayez.");
      setPhoneErr("Le paiement a échoué. Vérifiez votre connexion puis réessayez.");
    } finally {
      clearTimeout(guard);
      setTimeout(() => setBusy(false), 100);
    }
    void phoneOverride;
  }

  async function savePhoneAndCheckout() {
    const p = phone.trim();
    if (!p) { setPhoneErr("Veuillez saisir votre numéro de téléphone."); return; }
    setBusy(true);
    setPhoneErr("");
    try {
      const r = await fetch("/api/me/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ phone: p }),
      });
      const d = await r.json().catch(() => ({}) as Record<string, unknown>);
      if (d?.error) { setPhoneErr(String(d.error)); return; }
      setShowPhone(false);
      await doCheckout(p);
    } catch {
      setPhoneErr("Erreur réseau. Réessayez.");
    } finally {
      setBusy(false);
    }
  }

  const tabBase = "px-6 py-2 rounded-lg font-semibold transition-all";
  const activeTab = `${tabBase} bg-surface-container-lowest text-primary shadow-sm`;
  const idleTab = `${tabBase} text-on-surface-variant hover:bg-surface-container`;

  return (
    <div>
      {/* Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-surface-container-high p-1 rounded-xl flex gap-1">
          <button type="button" className={monthly ? activeTab : idleTab} onClick={() => setMonthly(true)}>Mensuel</button>
          <button
            type="button"
            className={(!monthly && quarterPlan) ? activeTab : (!quarterPlan ? `${idleTab} opacity-40 cursor-not-allowed` : idleTab)}
            disabled={!quarterPlan}
            onClick={() => quarterPlan && setMonthly(false)}
          >
            Trimestriel
          </button>
        </div>
      </div>

      {/* Bloc prix (dans la carte Réussite côté serveur, ce bloc remplace price-container) */}
      <input type="hidden" id="plan-selector-current" value={current?.id ?? 0} />

      {/* Promo */}
      <div className="mt-4 space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyPromo()}
            placeholder="Code promo (ex. RENTREE30)"
            autoComplete="off"
            className="flex-1 min-w-0 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
          />
          <button type="button" onClick={applyPromo} className="px-4 py-3 rounded-lg bg-surface-container-high text-on-surface font-bold text-sm transition-colors active:scale-95">
            Appliquer
          </button>
        </div>
        {promoMsg && (
          <p className={`text-xs rounded-lg px-3 py-2 ${promoMsg.ok ? "bg-tertiary-container/40 text-tertiary" : "bg-error-container/30 text-error"}`}>
            {promoMsg.text}
          </p>
        )}
      </div>

      {/* Trial */}
      <div className="mt-3 flex items-center gap-2">
        <input type="checkbox" id="trial-check" checked={trial} onChange={(e) => setTrial(e.target.checked)} className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
        <label htmlFor="trial-check" className="text-sm text-on-primary">Essai gratuit 3 jours (1ère fois, sans frais)</label>
      </div>
      <p className="text-xs text-on-primary">1-clic : ton numéro Mobile Money enregistré sera utilisé automatiquement.</p>

      {/* Subscribe */}
      <button
        type="button"
        disabled={busy}
        onClick={() => doCheckout()}
        className="w-full mt-4 py-4 px-4 rounded-lg bg-secondary-container text-on-secondary-container font-extrabold text-lg shadow-lg transition-all active:scale-95 hover:brightness-110 disabled:opacity-60"
      >
        {busy ? "Redirection vers le paiement..." : btnLabel === "S'abonner maintenant" ? `S'abonner${effective > 0 ? ` — ${fmt(effective)} FCFA` : " — 0 F aujourd'hui"}` : btnLabel}
      </button>

      {/* Phone modal inline */}
      {showPhone && (
        <div className="mt-4 rounded-xl bg-surface-container-low p-4 space-y-3">
          <p className="text-sm font-bold text-on-surface">Ajoutez votre numéro Mobile Money</p>
          <p className="text-xs text-on-surface-variant">Indispensable pour recevoir le paiement d&apos;abonnement (Orange, MTN, Moov, Wave).</p>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+225 07 00 00 00 00"
            className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 text-base text-on-surface focus:outline-none focus:border-primary transition-colors"
          />
          <button type="button" onClick={savePhoneAndCheckout} disabled={busy} className="w-full py-3 px-4 rounded-lg bg-primary text-on-primary font-bold text-base hover:bg-primary-container transition-colors">
            Enregistrer et continuer
          </button>
          {phoneErr && <p className="text-xs text-error bg-error-container/30 rounded-lg px-3 py-2">{phoneErr}</p>}
        </div>
      )}

      <p className="mt-4 text-[10px] text-center text-on-primary">Sans engagement. Annulez à tout moment.</p>
    </div>
  );
}

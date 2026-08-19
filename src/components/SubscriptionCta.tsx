"use client";

import Link from "next/link";
import { EVENTS, trackEvent } from "@/lib/analytics";
import { getClientPricingVariant } from "@/lib/ab-test";

export default function SubscriptionCta({
  href = "/plans-d-abonnement-edukora-1",
  label = "S'abonner maintenant",
  cta = "tarifs",
  icon = "verified",
  className,
}: {
  href?: string;
  label?: string;
  cta?: "tarifs" | "comparatif";
  icon?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={() => trackEvent(EVENTS.subscriptionStarted, { cta, ab_variant: getClientPricingVariant() ?? "unknown" })}
      className={
        className ??
        "w-full block text-center py-4 rounded-[16px] bg-secondary-container text-on-secondary-fixed font-bold hover:shadow-lg transition-all active:scale-95"
      }
    >
      <span className="material-symbols-outlined text-[18px] align-middle mr-1">{icon}</span>
      {label}
    </Link>
  );
}
"use client";

import { useEffect } from "react";
import { EVENTS, trackEvent } from "@/lib/analytics";
import { getClientPricingVariant } from "@/lib/ab-test";

export default function PricingVariantTracker({ serverVariant }: { serverVariant: "A" | "B" }) {
  useEffect(() => {
    const variant = getClientPricingVariant() ?? serverVariant;
    trackEvent(EVENTS.pricingVariantViewed, { variant });
  }, [serverVariant]);
  return null;
}
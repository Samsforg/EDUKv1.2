"use client";

import { useCallback, useRef } from "react";
import { captureException } from "@sentry/nextjs";

export function useErrorHandler() {
  const seen = useRef<Set<string>>(new Set());

  return useCallback((err: unknown, context?: Record<string, unknown>) => {
    const digest =
      typeof err === "object" && err !== null && "digest" in err
        ? String((err as { digest?: unknown }).digest ?? "")
        : "";
    const key = digest || (err instanceof Error ? `${err.message}::${err.stack}` : String(err));
    if (key && seen.current.has(key)) return;
    if (key) seen.current.add(key);
    if (context) {
      captureException(err, {
        extra: context,
      });
    } else {
      captureException(err);
    }
  }, []);
}
"use client";

export { getCsrfToken, invalidateCsrfToken } from "./csrf-core";
import { getCsrfToken, refreshCsrfToken } from "./csrf-core";

if (typeof window !== "undefined") {
  const originalFetch = window.fetch;

  window.fetch = async function (
    input: RequestInfo | URL,
    init?: RequestInit,
  ): Promise<Response> {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const method = (init?.method ?? "GET").toUpperCase();

    if (
      url.startsWith("/api/") &&
      !url.startsWith("/api/csrf") &&
      !url.startsWith("/api/auth") &&
      !url.startsWith("/api/premium/webhook") &&
      !url.startsWith("/api/health") &&
      !url.startsWith("/api/warmup") &&
      !url.startsWith("/api/cron/") &&
      (method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE")
    ) {
      let token = await getCsrfToken();
      if (!token) {
        token = await refreshCsrfToken();
      }
      if (token) {
        const headers = new Headers(init?.headers);
        if (!headers.has("x-csrf-token")) {
          headers.set("x-csrf-token", token);
        }
        init = { ...init, headers };
      }
    }

    const res = await originalFetch.call(window, input, init);

    if (res.status === 403) {
      try {
        const body = await res.clone().json();
        if (typeof body.error === "string" && body.error.includes("CSRF")) {
          await refreshCsrfToken();
        }
      } catch {
        // ignore
      }
    }

    return res;
  };
}

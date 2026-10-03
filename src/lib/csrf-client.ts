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
      // A5 : /api/auth/logout n'est plus exclu, c'est une mutation d'etat qui
      // doit recevoir un token CSRF. Les endpoints de pre-authentification
      // restent exclus car ils ne peuvent pas obtenir de token sans session.
      !url.startsWith("/api/auth/login") &&
      !url.startsWith("/api/auth/register") &&
      !url.startsWith("/api/auth/forgot") &&
      !url.startsWith("/api/auth/reset") &&
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

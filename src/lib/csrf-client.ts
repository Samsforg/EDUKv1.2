"use client";

let csrfToken: string | null = null;
let csrfPromise: Promise<string | null> | null = null;

async function fetchCsrfToken(): Promise<string | null> {
  try {
    const res = await fetch("/api/csrf");
    if (!res.ok) return null;
    const data = await res.json();
    return data.csrfToken ?? null;
  } catch {
    return null;
  }
}

export async function getCsrfToken(): Promise<string | null> {
  if (csrfToken) return csrfToken;
  if (!csrfPromise) {
    csrfPromise = fetchCsrfToken().then((t) => {
      csrfToken = t;
      csrfPromise = null;
      return t;
    });
  }
  return csrfPromise;
}

export function invalidateCsrfToken(): void {
  csrfToken = null;
  csrfPromise = null;
}

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
      const token = await getCsrfToken();
      if (token) {
        const headers = new Headers(init?.headers);
        if (!headers.has("x-csrf-token")) {
          headers.set("x-csrf-token", token);
        }
        init = { ...init, headers };
      }
    }

    return originalFetch.call(window, input, init);
  };
}

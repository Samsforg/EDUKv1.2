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

export async function refreshCsrfToken(): Promise<string | null> {
  csrfToken = null;
  csrfPromise = null;
  return getCsrfToken();
}

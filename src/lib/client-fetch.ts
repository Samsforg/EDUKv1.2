export async function fetchFresh(url: string, init?: RequestInit): Promise<Response> {
  const hasQuery = url.includes("?");
  const sep = hasQuery ? "&" : "?";
  const busted = `${url}${sep}_=${Date.now()}`;
  return fetch(busted, {
    ...init,
    cache: "no-store",
    credentials: "include",
  });
}

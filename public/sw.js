const CACHE = "edukora-v3";
const EDU_CACHE = "edukora-edu-v1";

const PRECACHE = [
  "/offline",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/fiches",
  "/cours",
  "/quiz",
  "/simulateur",
  "/accueil-edukora",
];

// ---------- INSTALL ----------
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// ---------- ACTIVATE ----------
self.addEventListener("activate", (event) => {
    event.waitUntil(
      caches.keys().then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE && k !== EDU_CACHE && !k.startsWith("api-")).map((k) => caches.delete(k)))
      ).then(() => self.clients.claim())
    );
});

// ---------- FETCH ----------
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  // Cross-origin fonts
  if (url.origin !== self.location.origin) {
    if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
      event.respondWith(staleWhileRevalidate(request, "google-fonts", 365 * 24 * 60 * 60));
      return;
    }
    return;
  }

  // Navigate → NetworkFirst + offline fallback
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, "pages", 50, 86400, 10));
    return;
  }

  // Static assets (_next/static, icons, fonts) → CacheFirst
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/") || url.pathname.startsWith("/fonts/")) {
    event.respondWith(cacheFirst(request, "next-static", 365 * 24 * 60 * 60));
    return;
  }

  // Educational content (PDF, video, images) → CacheFirst 30j
  if (url.pathname.match(/\.(pdf|mp4|webm|png|jpg|jpeg|svg|webp)$/)) {
    event.respondWith(cacheFirst(request, "edukora-edu", 30 * 24 * 60 * 60, 200));
    return;
  }

  // API → NetworkFirst (toujours frais en ligne pour respecter le statut premium/session,
  // le cache ne sert que de repli hors-ligne). On n'utilise PAS staleWhileRevalidate ici :
  // cela servait des réponses périmées (et potentiellement partagées entre utilisateurs).
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirstApi(request));
    return;
  }

  // Default → StaleWhileRevalidate
  event.respondWith(staleWhileRevalidate(request, "default", 86400, 50));
});

// ---------- HELPERS ----------
async function isFresh(cachedResponse, maxAgeSeconds) {
  if (!cachedResponse) return false;
  if (!maxAgeSeconds) return true;
  const cachedDate = cachedResponse.headers.get("date");
  if (!cachedDate) return true;
  const age = (Date.now() - new Date(cachedDate).getTime()) / 1000;
  return age < maxAgeSeconds;
}

async function cacheFirst(request, cacheName, maxAgeSeconds, maxEntries = 50) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached && (await isFresh(cached, maxAgeSeconds))) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
      // Cleanup old entries
      const keys = await cache.keys();
      if (keys.length > maxEntries) {
        await cache.delete(keys[0]);
      }
    }
    return response;
  } catch {
    return cached || caches.match("/offline");
  }
}

async function networkFirst(request, cacheName, maxEntries, maxAgeSeconds, timeout) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout * 1000);
    const response = await fetch(request, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (response.ok) {
      const copy = response.clone();
      const cache = await caches.open(cacheName);
      await cache.put(request, copy);
      // Cleanup
      const keys = await cache.keys();
      if (keys.length > maxEntries) await cache.delete(keys[0]);
    }
    return response;
  } catch {
    return cached || caches.match("/offline");
  }
}

async function staleWhileRevalidate(request, cacheName, maxAgeSeconds, maxEntries = 50) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then(async (response) => {
    if (response.ok) {
      const cache = await caches.open(cacheName);
      await cache.put(request, response.clone());
      const keys = await cache.keys();
      if (keys.length > maxEntries) await cache.delete(keys[0]);
    }
    return response;
  }).catch(() => cached);
  return cached || fetchPromise;
}

// API : réseau en priorité, cache uniquement en repli hors-ligne.
// Le cache est isolé par session (cookie) pour éviter de servir les données
// d'un utilisateur à un autre sur un appareil partagé.
async function networkFirstApi(request) {
  const cookie = request.headers.get("cookie") || "";
  let token = "anon";
  const m = /edukora_session=([^;]+)/.exec(cookie);
  if (m) token = m[1];
  const cacheName = "api-" + hashString(token).toString(36);
  const cache = await caches.open(cacheName);
  const keyed = new Request(request.url, { method: request.method, headers: request.headers, credentials: "include" });
  try {
    const response = await fetch(keyed);
    if (response.ok) {
      await cache.put(keyed, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(keyed);
    if (cached) return cached;
    return new Response(JSON.stringify({ error: "Hors-ligne" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
}

function hashString(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

// ---------- BACKGROUND SYNC ----------
self.addEventListener("sync", (event) => {
  if (event.tag === "edukora-sync") {
    event.waitUntil(syncQueue());
  }
});

async function syncQueue() {
  const clients = await self.clients.matchAll({ type: "window" });
  if (clients.length === 0) return;

  // Demande au client de traiter sa queue
  clients.forEach((client) => {
    client.postMessage({ type: "SYNC_QUEUE" });
  });
}

// ---------- PERIODIC SYNC (daily content sync) ----------
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "edukora-content-sync") {
    event.waitUntil(syncEducationalContent());
  }
});

async function syncEducationalContent() {
  try {
    // Fetch latest lessons/chapters metadata
    const response = await fetch("/api/cours/sync", { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      const cache = await caches.open("edukora-edu");
      for (const item of data.items || []) {
        if (item.url) {
          await cache.add(item.url);
        }
      }
    }
  } catch (e) {
    console.log("Periodic sync failed:", e);
  }
}

// ---------- PUSH NOTIFICATIONS ----------
self.addEventListener("push", (event) => {
  if (!event.data) return;
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: "/icons/icon-192.png",
    badge: "/icons/badge-72.png",
    vibrate: [200, 100, 200],
    tag: data.tag || "edukora-notification",
    data: { url: data.url || "/accueil-edukora" },
    actions: data.actions || [],
    requireInteraction: data.requireInteraction || false,
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/accueil-edukora";
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clients) => {
      for (const client of clients) {
        if (client.url === url && "focus" in client) return client.focus();
      }
      return self.clients.openWindow(url);
    })
  );
});

// ---------- HELPERS ----------
async function openCache(name) {
  return caches.open(name);
}
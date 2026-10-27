const CACHE_NAME = "pawconnect-cache-v1";
const STATIC_ASSETS = [
  "/",
  "/pets",
  "/how-it-works",
  "/success-stories",
  "/donate",
  "/about",
  "/favorites",
  "/favicon.svg",
  "/manifest.webmanifest",
];

// Install Event - Pre-cache core routes & assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.warn("Service worker precache error:", err);
      }),
  );
});

// Activate Event - Clean up old caches and take control immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Fetch Event - Dynamic caching with strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and browser extensions
  if (request.method !== "GET" || !url.protocol.startsWith("http")) {
    return;
  }

  // Skip Firebase auth/firestore endpoints from service worker caching
  if (
    url.hostname.includes("firebaseapp.com") ||
    url.hostname.includes("googleapis.com") ||
    url.hostname.includes("identitytoolkit") ||
    url.hostname.includes("firestore")
  ) {
    return;
  }

  // Strategy 1: Static assets (JS, CSS, Images, Fonts) -> Stale-While-Revalidate / Cache-First
  const isStaticAsset =
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image" ||
    request.destination === "font" ||
    url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|webp|woff2?|ico)$/i);

  if (isStaticAsset) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      }),
    );
    return;
  }

  // Strategy 2: HTML Page Navigation -> Network-First with Cache Fallback for offline support
  if (request.mode === "navigate" || request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then(async (networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // Fallback to home route if specific page isn't in cache
          return (await caches.match("/")) || new Response("Offline", { status: 503 });
        }),
    );
    return;
  }

  // Default: Try network, fallback to cache
  event.respondWith(
    fetch(request)
      .then(async (networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      })
      .catch(() => caches.match(request)),
  );
});

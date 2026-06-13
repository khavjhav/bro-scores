/* BroScores PWA service worker — app-shell + runtime cache.
   ESPN API calls are network-first (always try fresh scores, fall back to cache offline). */
const CACHE = "broscores-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isApi = /espn\.com/.test(url.hostname);
  if (isApi) {
    // network-first for live data
    e.respondWith(fetch(req).then((r) => { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); return r; }).catch(() => caches.match(req)));
    return;
  }
  if (url.origin === self.location.origin) {
    // cache-first for app shell / assets
    e.respondWith(caches.match(req).then((c) => c || fetch(req).then((r) => { const cp = r.clone(); caches.open(CACHE).then((cc) => cc.put(req, cp)); return r; })));
  }
});

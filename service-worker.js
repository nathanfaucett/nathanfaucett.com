const timestamp = 1639883584136;
const build = [
  "/_app/start-166f7037.js",
  "/_app/assets/start-d5b4de3e.css",
  "/_app/pages/__layout.svelte-76c5f9b7.js",
  "/_app/assets/pages/__layout.svelte-a8cc31b2.css",
  "/_app/error.svelte-9bec467d.js",
  "/_app/pages/index.svelte-dd74a852.js",
  "/_app/chunks/vendor-c5b59314.js"
];
const files = [
  "/background.jpg",
  "/favicon.png",
  "/robots.txt"
];
const CACHE_NAME = `static-cache-v${timestamp}`;
const FILES_TO_CACHE = [...build, ...files];
self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");
  evt.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    console.log("[ServiceWorker] Pre-caching offline page");
    return cache.addAll(FILES_TO_CACHE);
  }));
  self.skipWaiting();
});
self.addEventListener("activate", (evt) => {
  console.log("[ServiceWorker] Activate");
  evt.waitUntil(caches.keys().then((keyList) => Promise.all(keyList.map((key) => {
    if (key !== CACHE_NAME) {
      console.log("[ServiceWorker] Removing old cache", key);
      return caches.delete(key);
    }
  }))));
  self.clients.claim();
});
self.addEventListener("fetch", (evt) => {
  console.log("[ServiceWorker] Fetch", evt.request.url);
  if (evt.request.mode !== "navigate") {
    return;
  }
  evt.respondWith(fetch(evt.request).catch(() => caches.open(CACHE_NAME).then((cache) => cache.match("offline.html"))));
});

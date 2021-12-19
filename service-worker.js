const timestamp = 1639881728863;
const build = [
  "/_app/start-8c258b37.js",
  "/_app/assets/start-d5b4de3e.css",
  "/_app/pages/__layout.svelte-487ee890.js",
  "/_app/assets/pages/__layout.svelte-f6086fa0.css",
  "/_app/error.svelte-05746a35.js",
  "/_app/pages/index.svelte-d4c43247.js",
  "/_app/chunks/vendor-c4fd5fdc.js"
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

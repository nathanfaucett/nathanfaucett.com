const h = [
  "/internal/immutable/start-809cf014.js",
  "/internal/immutable/pages/__layout.svelte-9f19ad13.js",
  "/internal/immutable/assets/__layout-23dca12f.css",
  "/internal/immutable/error.svelte-eb6d89da.js",
  "/internal/immutable/pages/index.svelte-a1decc4c.js",
  "/internal/immutable/chunks/index-0cc78273.js"
], d = [
  "/background.jpg",
  "/favicon.png",
  "/manifest.json",
  "/robots.txt"
], o = "1658673646750", a = self, i = `cache${o}`, r = h.concat(d), u = new Set(r);
a.addEventListener("install", (t) => {
  t.waitUntil(caches.open(i).then((e) => e.addAll(r)).then(() => {
    a.skipWaiting();
  }));
});
a.addEventListener("activate", (t) => {
  t.waitUntil(caches.keys().then(async (e) => {
    for (const s of e)
      s !== i && await caches.delete(s);
    a.clients.claim();
  }));
});
async function f(t) {
  const e = await caches.open(`offline${o}`);
  try {
    const s = await fetch(t);
    return e.put(t, s.clone()), s;
  } catch (s) {
    const c = await e.match(t);
    if (c)
      return c;
    throw s;
  }
}
a.addEventListener("fetch", (t) => {
  if (t.request.method !== "GET" || t.request.headers.has("range"))
    return;
  const e = new URL(t.request.url), s = e.protocol.startsWith("http"), c = e.hostname === self.location.hostname && e.port !== self.location.port, n = e.host === self.location.host && u.has(e.pathname), l = t.request.cache === "only-if-cached" && !n;
  s && !c && !l && t.respondWith((async () => n && await caches.match(t.request) || f(t.request))());
});

/* Check Mate Suite service worker (home page only): opens at once and without a connection.
   Files of the home page: the phone's copy at once, refreshed from the server in the background.
   Firebase libraries and fonts (fixed versions): kept on the phone. The apps under /checkmate/ have their own. */
const CACHE = "suite-v1";
const SHELL = ["/index.html", "/suite-back.js", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png", "/favicon-32.png", "/creator.webp", "/checkmate/firebase-config.js"];
const LIBS = ["https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
              "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"];
const KEEP = /^https:\/\/(www\.gstatic\.com\/firebasejs\/|fonts\.googleapis\.com\/|fonts\.gstatic\.com\/)/;

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all([
    ...SHELL.map(u => c.add(u).catch(() => {})),
    ...LIBS.map(u => fetch(u, {mode: "no-cors"}).then(r => c.put(u, r)).catch(() => {}))
  ])).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("suite-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

const save = (req, res) => { if(res && (res.ok || res.type === "opaque")){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; };

self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  if(url.origin !== self.location.origin){
    if(!KEEP.test(req.url)) return;
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => save(req, res))));
    return;
  }
  /* only the home page and its own files (root level, plus the shared Firebase settings) */
  const p = url.pathname === "/" ? "/index.html" : url.pathname;
  if(!(/^\/[^/]*$/.test(p) || p === "/checkmate/firebase-config.js")) return;
  if(req.cache === "no-store" || req.cache === "reload"){
    e.respondWith(fetch(req).then(res => { if(req.cache === "reload") save(new Request(url.origin + p), res); return res; })
      .catch(() => caches.match(url.origin + p)));
    return;
  }
  const key = new Request(url.origin + p);
  e.respondWith(caches.match(key).then(hit => {
    const net = fetch(req).then(res => save(key, res)).catch(() => null);
    if(hit){ e.waitUntil(net); return hit; }
    return net.then(res => res || Response.error());
  }));
});

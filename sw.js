
const CACHE_NAME = "sap-quiz-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/sw.js",
  "/styles.css",
  "/script.js",
  "/img/sap-icon-192.png",
  "/img/sap-icon-512.png",
  "/img/sap_logo.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

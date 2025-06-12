self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('wa-cache').then(cache => {
      return cache.addAll(['.', 'index.html', 'manifest.json', 'icon.png']);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});

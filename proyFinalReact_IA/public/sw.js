// public/sw.js
self.addEventListener('install', function (event) {
  console.log('Service Worker instalado');
});


// // public/sw.js
// self.addEventListener('install', event => {
//   console.log('[SW] Instalado');
//   self.skipWaiting();
// });

// self.addEventListener('activate', event => {
//   console.log('[SW] Activado');
// });

// self.addEventListener('fetch', event => {
//   event.respondWith(fetch(event.request));
// });

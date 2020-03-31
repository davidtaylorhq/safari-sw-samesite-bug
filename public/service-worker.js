console.log('Hello from service-worker.js');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
  new RegExp("cachedroute"), 
  new workbox.strategies.NetworkFirst({
    cacheName: "offline",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
      })
    ]
  })
);
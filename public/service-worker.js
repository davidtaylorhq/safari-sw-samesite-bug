console.log('Hello from service-worker.js');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.setConfig({
  debug: true
});

var cacheEnabled = true;

workbox.routing.registerRoute(
  () => {
    return cacheEnabled;
  }, 
  new workbox.strategies.NetworkFirst({
    cacheName: "offline",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
      })
    ]
  })
);

self.addEventListener('message', function (evt) {
  console.log('postMessage received', evt.data);
  if(evt.data.enableCache){
    cacheEnabled = true;
  }else{
    cacheEnabled = false;
  }
  evt.ports[0].postMessage({cacheEnabled: cacheEnabled});
})


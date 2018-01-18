// Based on the code on:
// https://developers.google.com/web/fundamentals/primers/service-workers/
// https://developers.google.com/web/fundamentals/codelabs/offline/

// A very basic service worker to allow loading of the page offline

importScripts("serviceworker-cache-polyfill.js");

var CACHE_NAME = "easierprompter-v1";

function log() {
  var args = Array.from(arguments);
  args.unshift("SW:");
  console.log.apply(console, args);
}

// When installed: Cache offlines copies of the files
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      log("Loading cache");

      return cache.addAll([
        "/core.css", // core.css provides some basic styling
        "/easierprompter/", // the index
        "/easierprompter/dist/bundle.js", // javascript
      ]);
    })
  );
});

// When installed: Go to the network first
// If we found it, use it and cache it
// If it failed, return from the cache
// This isn't the most optimal thing, but it's the easiest to develop with
self.addEventListener("fetch", function(event) {
  var url = event.request.url;

  event.respondWith(
    fetch(event.request)
    .then(function(response) {
      var clone = response.clone();
      log("Got file from network: " + url);
      caches.open(CACHE_NAME).then(function(cache) {
        log("Caching: " + url);
        cache.put(event.request, clone);
      });
      return response;
    }).catch(function() {
      log("Got file from cache: " + url);
      return caches.match(event.request);
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          log("Deleted cache: " + cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

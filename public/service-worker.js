const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/index.js",
    "/manifest.webmanifest",
    "/styles.css",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
];
//caching files need for offline! ^^^^^^^
const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

//installing the files
self.addEventListener("install", (evt) => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("The files were pre-cached successfully!");
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});

// Retrieving the files through fetch

self.addEventListener("fetch", (evt) => {
    if(evt.request.url.includes("/api/")){
        evt.respondWith(
            caches.open(DATA_CACHE_NAME).then(cache => {
            return fetch(evt.request)
                .then(response => {
                    //If the response was successful, clone it and store it in the cache
                    if(response.status === 200) {
                        cache.put(evt.request.url, response.clone());
                    }
                    return response;
                })
                .catch(err => {
                    return cache.match(evt.request);
                });
            }).catch(err => console.log(err))
        );
        return;
    }

    evt.respondWith(
        caches.match(evt.request).then(response => {
            return response || fetch(evt.request);
        })
    );
});
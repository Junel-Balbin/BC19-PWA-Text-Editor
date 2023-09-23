// Imports workbox modules and strategies.
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache & route resources defined in self.__WB_MANIFEST.
precacheAndRoute(self.__WB_MANIFEST);

// Define a CacheFirst for caching pages.
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({ // Cache responses with status codes 0 and 200.
      statuses: [0, 200],
    }),
    new ExpirationPlugin({ // Set an expiration time for cached items.
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm up cache with specified URLs using the pageCache.
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Register a route for navigation requests using the pageCache.
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Implement asset caching.
registerRoute(
  // Cache style, script and worker requests.
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({ // Cache responses with status codes 0 and 200.
        statuses: [0, 200],
      }),
      new ExpirationPlugin({ // Set an expiration time for cached items.
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);


// Template Structure and Code Snippets from Mini Project 19.
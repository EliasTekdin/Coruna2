const HARD_CODED_CDN = 'https://eliastekdin.github.io/Coruna2/';

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Intercept requests to the hard-coded CDN
    if (url.href.includes(HARD_CODED_CDN)) {
        const localUrl = url.href.replace(HARD_CODED_CDN, self.location.origin + '/');
        console.log('[SW] Intercepting:', url.href, '→', localUrl);
        event.respondWith(fetch(localUrl));
    }
});
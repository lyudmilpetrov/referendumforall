﻿self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('referendumcache').then(cache => {
            return cache.addAll([
                'index.html',
                'browserconfig.xml',
                'favicon.ico',
                'manifest.json',
                'Views/LoadingFile.html',
                'Views/NewReferendum.html',
                'Views/offline.html',
                'Views/Start.html',
                'Views/SupportReferendum.html',
                'Views/emailme.html',
                'js/jquery-2.1.4.min.js',
                'js/angular.min.js',
                'js/angular-route.min.js',
                'js/angular-animate.min.js',
                'js/createDialog.min.js',
                'js/ngDialog.min.js',
                'js/angular-auto-focus.min.js',
                'js/angular-aria.min.js',
                'js/bootstrap.min.js',
                'js/bootstrap-filestyle.min.js',
                'js/jasny-bootstrap.min.js',
                'js/jquery.signalR-2.1.0.min.js',
                'css/bootstrap.min.css',
                'css/ngDialog.min.css',
                'css/ngDialog-theme-default.css',
                'css/font-awesome.min.css',
                'css/jasny-bootstrap.min.css',
                'css/referendum.min.css',
                'app.min.js',
                '/Images/l0.gif',
                '/Images/apple-touch-icon-57x57.png',
                '/Images/apple-touch-icon-60x60.png',
                '/Images/apple-touch-icon-72x72.png',
                '/Images/apple-touch-icon-76x76.png',
                '/Images/apple-touch-icon-114x114.png',
                '/Images/apple-touch-icon-120x120.png',
                '/Images/apple-touch-icon-144x144.png',
                '/Images/apple-touch-icon-152x152.png',
                '/Images/apple-touch-icon-180x180.png',
                '/Images/apple-touch-icon.png',
                '/Images/android-chrome-36x36.png',
                '/Images/android-chrome-48x48.png',
                '/Images/android-chrome-72x72.png',
                '/Images/android-chrome-96x96.png',
                '/Images/android-chrome-192x192.png',
                '/Images/android-chrome-256x256.png',
                '/Images/safari-pinned-tab.svg',
                '/Images/mstile-70x70.png',
                '/Images/mstile-144x144.png',
                '/Images/mstile-150x150.png',
                '/Images/mstile-310x150.png',
                '/Images/mstile-310x310.png',
                '/Images/favicon-16x16.png',
                '/Images/favicon-32x32.png',
                '/Images/favicon-194x194.png'
            ])
                .then(() => self.skipWaiting());
        })
    )
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
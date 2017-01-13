(function () {
    if (typeof (window['caches']) !== 'undefined' && ('serviceWorker' in navigator)) {
        navigator.serviceWorker.register('swLoad.min.js', { scope: '/' })
          .then(function (registration) {
          }).catch(function (error) {
              // error here
              console.log(error);
          });
        navigator.serviceWorker.ready.then(function (registration) {
        });
    };
}());
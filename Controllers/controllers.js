let bgrCtrl = bgr.controller('bgrCtrl', ['$window', '$scope', '$http', '$location', '$rootScope', '$timeout', '$route', '$interval', 'ngDialog', 'words', 'normalizePhone', 'trackChangesFactory', 'focusNewReferendumFactory', 'initializedSystemFactory', 'updateNewReferendumFactory', 'registerReferendumFactory', 'uploadFileFactory', 'confirmCodeFactory', 'voteForRefFactory', 'sendSMSFactory', 'sendEmailFactory', 'getReferendumInformationFactory', 'caching', 'globalVariables', 'signalRHub', 'getURLData', 'postURLData', function ($window, $scope, $http, $location, $rootScope, $timeout, $route, $interval, ngDialog, words, normalizePhone, trackChangesFactory, focusNewReferendumFactory, initializedSystemFactory, updateNewReferendumFactory, registerReferendumFactory, uploadFileFactory, confirmCodeFactory, voteForRefFactory, sendSMSFactory, sendEmailFactory, getReferendumInformationFactory, caching, globalVariables, signalRHub, getURLData, postURLData) {
    if (typeof $scope.words === 'undefined') {
        $scope.words = words("English USA");
        $scope.urlFile = '';
        //Offline here
        $scope.$watch(function (scope) { return scope.online },
            function (newValue, oldValue) {
                if (!newValue) {
                    ngDialog.closeAll();
                    $('#loadFile').removeClass('form-control ');
                    $scope.urlRef = 'Views/offline.html';
                    $scope.supRefReady = true;
                    $timeout(function () {
                        let e = $('#offline');
                        //  let e = $window.document.getElementById('#offline');
                        if (e)
                        e.focus();
                        e.selector.select;
                    }, 1000);
                } else {
                    $('#loadFile').removeClass('form-control ');
                    $scope.urlRef = '';
                    $scope.supRefReady = false;
                };
            });
        // Initializing global variables
        globalVariables.setProperty(0, globalVariables.getProperty(0, 'WebSocketCounter') + 1, 'WebSocketCounter');
        // Initializing signalR hub
        signalRHub($scope, globalVariables.getProperty(0, 'WebSocketCounter'), globalVariables.getObject(), caching);
        // Initilizing cache here for person
        caching.setCache(globalVariables.getProperty(1, 'storage', 'type'), globalVariables.getProperty(1, 'storage', 'name'), globalVariables.getProperty(0, 'person'), 'object');
        $scope.person = globalVariables.getProperty(0, 'person');
        if (typeof $scope.hub !== 'undefined') {
            // Here example for broadcasting changes to all users
            console.log('Initilizing SignalR here once connection is established is propagated accross all active users');
            console.log('Below is the connection to the SignalR hub, which has the task to propage the information to all users');
            console.log($scope.hub);
        };
        $scope.words.ariaBtn.btnNewRefFinal = $scope.words.ariaBtn.btnNewRefRegRem.reg;
        $scope.words.referendumsAll = [];
        $scope.dynamicButtons = {};
        $scope.dynamicButtons.regRef = $scope.words.registerRef.f;
        $scope.dynamicButtons.supRef = $scope.words.supportRef.f;
        $scope.dynamicButtons.supRefFinal = $scope.words.supportRef.f;
        //Start visibility
        $scope.words.fieldsRefTitle.h = false;
        //Sliding
        $(":file").filestyle({ input: true });
        $(":file").filestyle({ buttonBefore: true });
        //Factories
        $scope.initializedSystem = function () {
            initializedSystemFactory($scope);
        };
        $scope.focusNewReferendum = function (item, ni, ll, page) {
            focusNewReferendumFactory(item, ni, ll, $scope, $timeout, page);
        };
        $scope.updateNewReferendum = function (e, id) {
            updateNewReferendumFactory(e, id, $scope, normalizePhone, caching, $timeout, globalVariables);
        };
        $scope.trackChanges = function (item, ni, ll, cw) {
            trackChangesFactory(item, ni, ll, cw, $scope, $timeout);
        };
        $scope.registerReferendum = function () {
            let step1 = function (func, delay) {
                let promise = new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(func);
                    }, delay);
                });
                return promise;
            };
            step1(registerReferendumFactory($scope, postURLData, globalVariables, normalizePhone, $timeout), 0)
                .then(function () {
                }).catch(function (error) {
                    // address error here
                });
        };
        $scope.uploadFile = function (f) {
            uploadFileFactory($http, ngDialog);
        };
        $scope.confirmCode = function (cw) {
            confirmCodeFactory($scope, $http, ngDialog, normalizePhone, cw);
        };
        $scope.sendSMS = function () {
        };
        $scope.sendEmail = function () {
        };
        //Navigation
        $scope.newRef = function () {
            $scope.initializedSystem();
            $timeout(function () { $('#fieldsRefTitle').focus(); });
            $scope.urlFile = '';
            $scope.urlRef = 'Views/NewReferendum.html';
        };
        $scope.supportRef = function () {
            $scope.initializedSystem();
            $scope.urlFile = '';
            $('#loadFile').removeClass('form-control ');
            $scope.urlRef = 'Views/SupportReferendum.html';
        };
        /////////////////////////
        $scope.voteForRef = function (i, l) {
            let step1 = function (func, delay) {
                let promise = new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(func);
                    }, delay);
                });
                return promise;
            };
            let step2 = function (func, delay) {
                let promise = new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(func);
                    }, delay);
                });
                return promise;
            };
            step1($scope.initializedSystem(), 0)
                .then(
                step2(voteForRefFactory(i, l, $scope, postURLData, ngDialog, normalizePhone, caching, globalVariables), 0)
                )
        };
    };
}]);
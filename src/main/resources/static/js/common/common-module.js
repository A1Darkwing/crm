var commonModule = angular.module('commonModule',
    ['pascalprecht.translate', 'ngCookies', 'ngTagsInput', 'autoCompleteModule', 'bw.paging', 'ngStomp', 'ngIdle']);

commonModule.provider('ajax', function () {
  this.$get = ['$q', '$http', function ($q, $http) {
    return new AjaxService($q, $http);
  }];
});

commonModule.config(['$qProvider', function ($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);

commonModule.run(function ($q, $rootScope, $translate) {
  // Define App Constant
  $rootScope.imageUrl = {
    client: '/images/',
  };

});

// Important method to run 
commonModule.run(function ($rootScope, ajax) {
})


var module = angular.module('dashboardApp', ['interceptor', 'ngRoute', 'ngResource', 'commonModule']);

// Trigger the initiation of UI when ng-view is loaded via AngularJS Routes
module.run(function ($rootScope, $location) {
  $rootScope.$on('$viewContentLoaded', function (event, current, previous) {
    //initUI();//TODO check
  });
  var path = function () {
    return $location.path();
  };
  $rootScope.$watch(path, function (newVal, oldVal) {
    $rootScope.activetab = newVal;
  });
});

module.config(['$locationProvider', '$routeProvider', '$httpProvider',
  function ($locationProvider, $routeProvider, $httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    var VIEW_BASE_HOME = "/client/dashboard";
    $locationProvider.hashPrefix('');

    $routeProvider.when('/', {
      templateUrl: VIEW_BASE_HOME + '/dashboard',
      controller: 'ClientController',
      resolve: {
        clientsData: function (clientService) {
          return clientService.loadClients();
        },
        clientModel: function (clientService) {
	      return clientService.initClient();
	    }
      }
    }).otherwise({
      redirectTo: '/'
    });
  }]);
!function(angular, undefined) { 'use strict';

  angular.module('ngLocationUpdate', [])
      .run(['$route', '$rootScope', '$location', '$window', function ($route, $rootScope, $location, $window) {
        var globalPathToKeep = "";
        var prevent = null;
        $location.updatePath = function (path, keepPreviousPathInHistory) {
          if ($location.path() == path) return;
          var routeToKeep = $route.current;
          globalPathToKeep = $location.path();
          
          var unsubscribe = $rootScope.$on('$locationChangeSuccess', function () {
            if (routeToKeep) {
              $route.current = routeToKeep;
              routeToKeep = null;
            }
            unsubscribe();
            unsubscribe = null;
          });

          $location.path(path);
          if (!keepPreviousPathInHistory) $location.replace();
        };
        
        $location.updateWindowPath = function (url, data) {
          var preventLoad = true;
          if (prevent) {
            prevent();
            prevent = null;
          }
          prevent = $rootScope.$on('$locationChangeStart', function (e) {
            if (preventLoad) {
              e.preventDefault();
            }
            
          });
          $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            if (preventLoad) {
              event.preventDefault();
            }
          });
          $window.history.replaceState(data, '', url);
          
        };
        
        $location.restorePath = function () {
          $location.path(globalPathToKeep);
          globalPathToKeep = "";
          $rootScope.$apply();
        };
        
      }]);

}(window.angular);
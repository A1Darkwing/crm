/**
 * Copyright(c) 2017 Phuoc Vo
 */

module.service('navService', ['$q', '$rootScope', 'ajax', '$routeParams',
  function ($q, $rootScope, ajax, $routeParams) {
    var URL = DOMAIN + "/event";
    var BASE_NOTIFICATION_LINK = '/data/secured/notification';

    this.loadUnseenNotifications = function(showNotificationNumber) {
      var data = {'showNotificationNumber' : showNotificationNumber};
      var deferred = $q.defer();

      ajax.post(BASE_NOTIFICATION_LINK + '/getunseennotifications', data).then(
          function successCallback(response) {
            deferred.resolve(response.data.result);
          }, function errorCallback(err) {
            
          });

      return deferred.promise;
    }

    this.loadNotifications = function(showNotificationNumber) {
      var data = {'showNotificationNumber' : showNotificationNumber};
      var deferred = $q.defer();

      ajax.post(BASE_NOTIFICATION_LINK + '/getnotifications', data).then(
          function successCallback(response) {
            deferred.resolve(response.data.result);
          }, function errorCallback(err) {
            
          });

      return deferred.promise;
    }

    this.updateNotificationsToSeen = function() {
      var data = {};
      var deferred = $q.defer();

      ajax.post(BASE_NOTIFICATION_LINK + '/updatenotificationstoseen', data).then(
          function successCallback(response) {
            deferred.resolve(response.data.result);
          }, function errorCallback(err) {
            
          });

      return deferred.promise;
    }

    this.searchFunction = function (text) {
        var data = {id: text};
        var deferred = $q.defer();
        var urlRequest = '/data/organization/search';
        ajax.post(urlRequest, data).then(
            function successCallback(response) {
              deferred.resolve(response.data.result);
            }, function errorCallback(err) {
            });
        return deferred.promise;
      }

  }
]);
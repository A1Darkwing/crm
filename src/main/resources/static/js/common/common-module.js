/**
 * Copyright(c) 2017 Phuoc Vo
 */

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

commonModule.config(['KeepaliveProvider', function(KeepaliveProvider) {
  KeepaliveProvider.interval(1200); // heartbeat every 20 min
  KeepaliveProvider.http('/api/heartbeat'); // URL that makes sure session is alive
}]);

commonModule.run(function(Keepalive){
  Keepalive.start();
});

commonModule.run(function ($q, $rootScope, $translate) {
  // Define App Constant
  $rootScope.imageUrl = {
    client: '/images/',
  };

  // Define global variable
  $rootScope.userAvatarVer = 1;
  $rootScope.organizationAvatarVer = 1;
  $rootScope.organizationCoverVer = 1;

  $rootScope.showErrorMessage = function (message) {
	  showErrorMessageWithTitle($translate.instant('error.validation'), message);
  };
  
  $rootScope.showUpcomingMessage = function () {
    var notice = (new PNotify({
      title: $translate.instant("notification"),
      text: $translate.instant("info.upcoming"),
      icon: 'glyphicon glyphicon-question-sign',
      hide: false,
      confirm: {
        confirm: true,
        buttons: [{
          text: $translate.instant('button.ok'),
          addClass: 'btn btn-primary btn-round',
          click: function (notice) {
            notice.remove();
          }
        }, {
          text: 'Cancel',
          addClass: 'd-none',
          click: function (notice) {
            notice.remove();
          }
        }]
      },
      buttons: {
        closer: true,
        sticker: false
      },
      history: {
        history: false
      },
      addclass: 'stack-modal confirm-dialog',
      stack: {'dir1': 'down', 'dir2': 'right', 'modal': true}
    }))
  };

  $rootScope.showConfirmMessage = function showConfirmMessage(title, text, action) {
    var deferred = $q.defer();
    var notice = (new PNotify({
      title: $translate.instant(title),
      text: $translate.instant(text),
      icon: 'glyphicon glyphicon-question-sign',
      hide: false,
      confirm: {
        confirm: true,
        buttons: [{
          text: $translate.instant('button.cancel'),
          addClass: 'btn btn-primary btn-round',
          click: function (notice) {
            notice.remove();
            deferred.reject();
          }
        }, {
          text: $translate.instant('button.ok'),
          addClass: 'btn btn-simple',
          click: function (notice) {
            notice.remove();
            deferred.resolve();
          }
        }]
      },
      buttons: {
        closer: false,
        sticker: false
      },
      history: {
        history: false
      },
      addclass: 'stack-modal confirm-dialog',
      stack: {'dir1': 'down', 'dir2': 'right', 'modal': true}
    }))

    return deferred.promise;
  }

});

// Important method to run 
commonModule.run(function ($rootScope, ajax) {
})

commonModule.provider('validationService', function () {
  this.$get = ['$q', 'ajax', function ($q, ajax) {
    return new ValidationService($q, ajax);
  }];
});

commonModule.directive('csInput', ['$translate', '$sce', customInputDirective]);
commonModule.directive('csSelect', ['$translate' , '$timeout', selectDirective]);
commonModule.directive('img', imageDirective);
commonModule.directive('csComboDatetimePicker', customComboDatetimePickerDirective);
commonModule.directive('csTagsInput', customTagsInputDirective);
commonModule.directive('csUploadSimpleModel', ['$parse', customUploadSimpleDirective]);

commonModule.directive('onScrollCustom', onScrollDirective);
commonModule.directive('csEnterSubmit', enterSubmit);
commonModule.directive('escKey', escKey);
commonModule.directive('csCompile', ['$compile', compileDirective]);
commonModule.directive('csResizeTextArea', ['$timeout', resizeTextArea]);
commonModule.directive('csCarouselIndicator', carouselIndicator);

// Intercepting HTTP calls with AngularJS.
var app = angular.module('interceptor', []).run(function($rootScope) {
	
}).config(function($httpProvider) {
	// Add the interceptor to the $httpProvider.
	$httpProvider.interceptors.push('exceptionInterceptor');
	
}).factory('exceptionInterceptor', function($q, $rootScope) {
	
	return {
		// On request success
		request : function(config) {
			// console.log(config); // Contains the data about the request
			// before it is sent.
			// Return the config or wrap it in a promise if blank.
			return config || $q.when(config);
		},

		// On request failure
		requestError : function(rejection) {
			// console.log(rejection); // Contains the data about the error
			// on the request.
			switch (response.data.status) {
				case 500:
					showErrorMessage('500 Internal Server Error');
					return $q.reject(response);
				case 404:
					showErrorMessage('404 Not Found');
					return $q.reject(response);
				case 403:
					showErrorMessage('403 Access Denied');
					return $q.reject(response);
				default:
					showErrorMessage('Request ' + response.data.status + ' Error');
					return $q.reject(response);
			}
			// Return the promise rejection.
			return $q.reject(rejection);
		},

		// On response success
		response : function(response) {
			// console.log(response); // Contains the data from the
			// response.
			
			if (response.data.status == undefined || response.data.status == 'SUCCESS') {
				// console.log(2);
			} else {
				$rootScope.$broadcast('showError', response.data.result);
				return $q.reject(response);
			}
			// Return the response or promise.
			return response || $q.when(response);
		},

		// On response failture
		responseError : function(rejection) {
			// console.log(rejection); // Contains the data about the error.

			// Return the promise rejection.
			return $q.reject(rejection);
		}
	};
}).run(function($q, $rootScope, $translate) {
	var getErrorMessage = function(errorCode){
		var message = '';
		message = $translate.instant(errorCode);
		return message;
	};
	
	var showError = function(event, errorCodes) {
		var message = '';
		angular.forEach(errorCodes.systems, function(errorCode){
			message += getErrorMessage(errorCode) + '<br>';
		});
		if (message != '') {
			showErrorMessageWithTitle($translate.instant('error.system'), message);
		}
		message = '';
		angular.forEach(errorCodes.validations, function(errorCode){
			message += getErrorMessage(errorCode) + '<br>';
		});
		if (message != '') {
			showErrorMessageWithTitle($translate.instant('error.validation'), message);
		}
	};
	
	$rootScope.handleUploadError = function(data) {
	  if (data.status) {
  	  if (data.status == 'SUCCESS') {
        return true;
      } else {
        $rootScope.$broadcast('showError', data.result);
        return false;
      }
	  } else
	  if (data.textStatus === 'error') {
      $rootScope.$broadcast('showError', {'systems': ['error.system']});
      return false;
    } else {
      var response = data.result;
      if (response.status == undefined || response.status == 'SUCCESS') {
        return true;
      } else {
        $rootScope.$broadcast('showError', response.result);
        return false;
      }
    }
	};
	
	$rootScope.$on('showError', showError);
});

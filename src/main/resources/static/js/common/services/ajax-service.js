'use strict';
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
function AjaxPromise() {
  // the calling ajax method is success or not. If
  // success, this value will be Boolean.true
  this.isSuccess = undefined;
  this.successData = undefined;
};

/**
 * @param fn
 *            this function will be called after the ajax process is finished
 *            successfully. The fn should have 'data' argument to receive the
 *            result data.
 */
AjaxPromise.prototype.success = function (fn) {
  var self = this;
  if (self.isSuccess) {
    var data = self.successData;
    self.successData = undefined; // clear this data after using it.
    fn.call(self, data);
  }
};

AjaxPromise.prototype.error = function (fn) {
  var self = this;
  if (self.isSuccess)
    return;// don't run if result is success
  fn.call(self);
};

AjaxPromise.prototype.then = function (fnSuccess, fnError) {
  var self = this;
  if (self.isSuccess) {
    var data = self.successData;
    self.successData = undefined; // clear this data after using it.
    fnSuccess.call(self, data);
  } else {
    fnError.call(self);
  }
};

function AjaxService(q, $http) {
  this.q = q;
  this.$http = $http;
};

/**
 * This method doesn't use cache
 * @param url
 * @param requestData
 */
AjaxService.prototype.post = function (url, requestData) {
  return this.post(url, requestData, null, null);
};

/**
 * This method doesn't use cache
 * @param url
 * @param requestData
 * @param formMeta
 * @param validator
 * @returns HttpPromise
 */
AjaxService.prototype.post = function (url, requestData, formMeta, validator, $translate) {
  // Run validator before post
  if (validator && !validator.validateForm(formMeta, requestData, $translate)) {
    var messageKeys = validator.message;
    var messageHtml = '';
    $.each(messageKeys, function(index, messageKey) {
      var parsedMessage = $translate.instant(messageKey);
      messageHtml += '<br/>' + parsedMessage;
    } );
    alert(messageHtml);
    var deferred = this.q.defer();
    deferred.reject(validator.message);
    return deferred.promise;
  }
  var self = this;
  return self.$http.post(
      url,
      requestData,
      {
        cache: false,
        headers: {
        	'X-CSRF-TOKEN': token
    	  }
      }
  );
};

/**
 * This method doesn't use cache
 *
 * @param url
 * @param data
 * @returns HttpPromise
 */
AjaxService.prototype.get = function (url) {
  var self = this;
  return self.$http.get(
      url,
      {
        cache: false,
        headers: {
        	'X-CSRF-TOKEN': token
    	  }
      }
  );
};

/**
 * This method will call Ajax synchronously
 *
 * @param url
 * @returns an AjaxPromise. we use this approach to simulate the promise of
 *          Angular.$http
 */
AjaxService.prototype.getSync = function (url) {
  var promise = new AjaxPromise();
  $.getSync(url, function (data) {
    promise.isSuccess = true;
    promise.successData = data;
  });
  return promise;
};

/**
 * This method will call Ajax synchronously
 *
 * @param url
 * @param data
 *            a JavaScript request object (will be converted to JSON)
 * @returns an AjaxPromise. we use this approach to simulate the promise of
 *          Angular.$http
 */
AjaxService.prototype.postSync = function (url, requestData) {
  return this.postSync(url, requestData, null, null);
};

/**
 * This method will call Ajax synchronously
 *
 * @param url
 * @param data
 * @param form Meta data
 * @param validator
 *            a JavaScript request object (will be converted to JSON)
 * @returns an AjaxPromise. we use this approach to simulate the promise of
 *          Angular.$http
 */
AjaxService.prototype.postSync = function (url, requestData, formMeta, validator) {
  // Run validator before post
  if (validator && !validator.validate(formMeta, requestData)) {
    alert('Validation failed: ' + validator.message);
    var deferred = this.q.defer();
    deferred.reject(validator.message);
    return deferred.promise;
  }

  var promise = new AjaxPromise();
  if (requestData !== undefined) {
    $.postSync(url, requestData, function (data) {
      promise.isSuccess = true;
      promise.successData = data;// If there is some error, this code won't run
    }, function () {
      promise.isSuccess = false;
    });
  } else {
    $.postSyncNoData(url, function (data) {
      promise.isSuccess = true;
      promise.successData = data;// If there is some error, this code won't run
    }, function () {
      promise.isSuccess = false;
    });
  }

  return promise;
};

jQuery.support.cors = true;

(function ($) {
  $.postSync = function (url, data, fnSuccess, fnError) {
    return $.ajax({
      type: "POST",
      url: url,
      headers: {
    	  'X-CSRF-TOKEN': token
  	  },
      cache: false,
      contentType: "application/json",
      data: angular.toJson(data),
      dataType: "json",
      async: false,
      success: fnSuccess,
      error: fnError
    });
  };

  $.postSyncNoData = function (url, fnSuccess, fnError) {
    return $.ajax({
      type: "POST",
      url: url,
      headers: {
    	  'X-CSRF-TOKEN': token
  	  },
      cache: false,
      async: false,
      success: fnSuccess,
      error: fnError
    });
  };

  $.getSync = function (url, callback) {
    return $.ajax({
      type: "GET",
      url: url,
      headers: {
    	  'X-CSRF-TOKEN': token
  	  },
      cache: false,
      dataType: "json",
      async: false,
      success: callback
    });
  };
})(jQuery);

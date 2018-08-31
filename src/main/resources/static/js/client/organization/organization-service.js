/**
 * @author Minh Nguyen
 *
 * Copyright(c) 2017
 */

module.service("organizationService", [ '$resource', '$q', '$rootScope',
		'$routeParams', 'ajax', '$translate',
		function($resource, $q, $rootScope, $routeParams, ajax, $translate) {
		
		  this.insertCharityField = function(charityField, validator) {
		    return ajax.post(DOMAIN + '/admin/data/organization/charityfield/insert', charityField, CHARITY_FIELD_REQUEST, validator, $translate);
		  }
		  
		  this.updateCharityField = function(charityField, validator) {
		    return ajax.post(DOMAIN + '/admin/data/organization/charityfield/update', charityField, CHARITY_FIELD_REQUEST, validator, $translate);
		  }
		  
		  this.removeCharityField = function(fieldId) {
		    return ajax.post(DOMAIN + '/admin/data/organization/charityfield/remove', fieldId);
		  }
		  
			/**
			 * load all Charity Fields
			 */
			this.loadFields = function() {
				var deferred = $q.defer();
				ajax.get('/data/organization/loadfields').then(function successCallback(response) {
					deferred.resolve(response.data.result);
				}, function errorCallback(response) {
				});
				return deferred.promise;
			};
			
			this.getOrganization = function(orgId) {
        var data = {'id' : orgId.toString()};
        var deferred = $q.defer();
        ajax.post('/admin/data/organization/organization/get', data).then(
            function successCallback(response) {
              if (response.data.result) {
                deferred.resolve(response.data.result);
              }
            }, function errorCallback(err) {
            });
        return deferred.promise;
      }
			
			this.getBlogByOrgId = function(orgId) {
        var data = {'id' : orgId.toString()};
        var deferred = $q.defer();
        ajax.post('/admin/data/organization/blog/getbyorgid', data).then(
            function successCallback(response) {
              if (response.data.result) {
                deferred.resolve(response.data.result);
              }
            }, function errorCallback(err) {
            });
        return deferred.promise;
      }
			
			this.saveBlog = function(blog, file) {
			  var deferred = $q.defer();
			  var xhr, formData;
	      xhr = new XMLHttpRequest();
	      xhr.withCredentials = false;
	      xhr.open('POST', '/admin/data/organization/blog/save');
	      xhr.onload = function() {
	        var json;
	        if (xhr.status != 200) {
	          deferred.reject(xhr.responseText);
	          return;
	        }
	        deferred.resolve(xhr.responseText);
	      };
	      formData = new FormData();
	      formData.append('file', file);
	      formData.append('attr', JSON.stringify(blog));
	      xhr.setRequestHeader('X-CSRF-TOKEN', csrf_token);
	      xhr.send(formData);
        return deferred.promise;
      }

      this.searchOrganizations = function(searchString) {
				var data = {
					"searchString": searchString
				};
        var deferred = $q.defer();
        ajax.post('/admin/data/organization/organizations', data)
						.then(function successCallback(response) {
          deferred.resolve(response.data.result);
        }, function errorCallback(response) {
        });
        return deferred.promise;
      };

      this.enableOrganization = function(id) {
        var deferred = $q.defer();
        ajax.post('/admin/data/organization/enable/'+id)
            .then(function successCallback(response) {
              deferred.resolve(response.data.result);
            }, function errorCallback(response) {
            });
        return deferred.promise;
      };

      this.disableOrganization = function(id) {
        var deferred = $q.defer();
        ajax.post('/admin/data/organization/disable/'+id)
            .then(function successCallback(response) {
              deferred.resolve(response.data.result);
            }, function errorCallback(response) {
            });
        return deferred.promise;
      };
} ]);

module.service("clientService", [ '$resource', '$q', '$rootScope',
		'$routeParams', 'ajax', '$translate',
		function($resource, $q, $rootScope, $routeParams, ajax, $translate) {
		
		/**
		 * init client
		 */
		this.initClient = function() {
			var deferred = $q.defer();
			ajax.get('/client/data/init').then(function successCallback(response) {
				deferred.resolve(response.data.result);
			}, function errorCallback(response) {
			});
			return deferred.promise;
		};
		
		  this.insertClient = function(client) {
		    return ajax.post('/client/data/insert', client);
		  }
		  
		  this.updateClient = function(charityField) {
		    return ajax.post('/client/data/update', client);
		  }
		  
		  this.removeClient = function(clientId) {
		    return ajax.post('/client/data/remove', clientId);
		  }
		  
		/**
		 * load all clients
		 */
		this.loadClients = function() {
			var deferred = $q.defer();
			ajax.get('/client/data/getClients').then(function successCallback(response) {
				deferred.resolve(response.data.result);
			}, function errorCallback(response) {
			});
			return deferred.promise;
		};
			
			
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

} ]);

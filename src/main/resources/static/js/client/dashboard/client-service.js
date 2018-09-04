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
			
		this.saveClient = function(client) {
		      var deferred = $q.defer();
		      var xhr, formData;
		      xhr = new XMLHttpRequest();
		      xhr.withCredentials = false;
		      xhr.open('POST', '/client/data/save');
		      xhr.onload = function () {
		        var json;
		        if (xhr.status != 200) {
		          deferred.reject(JSON.parse(xhr.responseText));
		          return;
		        }
		        deferred.resolve(JSON.parse(xhr.responseText));
		      };
		      formData = new FormData();
		      if (client.contacts && client.contacts.length > 0) {
		        for (var i = 0; i < client.contacts.length; i++) {
		            formData.append('files', $("#contact-image-" + i)[0].files[0]);
		        }
		      }
		      formData.append('attr', JSON.stringify(client));
		      xhr.setRequestHeader('X-CSRF-TOKEN', csrf_token);
		      xhr.send(formData);
		      return deferred.promise;
      }

} ]);

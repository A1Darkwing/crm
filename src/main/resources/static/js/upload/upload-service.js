module.service("uploadService", function($resource, $q, $rootScope) {
    var URL = DOMAIN + "/cs/upload/file";
    var uploadResource = $resource(URL + '/:id', null , 
    {
        'getImage' : {
        	url : URL + "/item/:id",
        	method: 'POST',
        	params : { id : '@id' },
        	headers : {
                'X-CSRF-TOKEN' : csrf_token // X-CSRF-TOKEN 
            }
        },
        
        'getAllImages' : {
        	url : URL + "/all/:orgId",	
        	method : 'POST',
        	params : { orgId : '@orgId' },
        	headers : {
                'X-CSRF-TOKEN' : csrf_token // X-CSRF-TOKEN 
            }
        },
        'deleteImage' : {
        	url : URL + "/delete/:id",
        	method : 'POST',
        	params : { id : '@id' },
        	headers : {
                'X-CSRF-TOKEN' : csrf_token // X-CSRF-TOKEN 
            }
        },
        
    }
    );
    
    this.getImage = function(imageId) {
    	var deferred = $q.defer();
    	uploadResource.getImage({
    		id : imageId
    	}, function(data) {
    		deferred.resolve(data);
    	});
    	return deferred.promise;
    }
    
    this.getAllImages = function(orgId) {
    	var deferred = $q.defer();
    	uploadResource.getAllImages({
    		orgId : orgId
    	},
    	function(data) {
    		deferred.resolve(data);
    	});
    	
    	return deferred.promise;
    }
    
    this.deleteImage = function(imageId) {
    	var deferred = $q.defer();
    	uploadResource.deleteImage({
    		id : imageId
    	}, function(data) {
    		deferred.resolve(data.result);
    	});
    	return deferred.promise;
    }

}
);

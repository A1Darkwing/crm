module.directive("uploadDirective", function() {
	return {
		restrict : "E",
		/* NOTE: Normally I would set my attributes and bindings
        to be the same name but I wanted to delineate between
        parent and isolated scope. */ 
		scope:{
			username:'@username',
			imageids:'=imageids'
		},
		templateUrl : DOMAIN + "/cs/uploaddirective",
		controller : function($scope, Upload, $q, $timeout, $uibModal, uploadService) {
				var modalInstance = {};
				$scope.uploadedImages = [{}];
				  $scope.fileReaderSupported = window.FileReader !== undefined && (window.FileAPI === undefined || FileAPI.html5 !== false);

				  $scope.$watch('files', function () {
				    $scope.upload($scope.files);
				  });

				  progressHandler = function(evt) {
				    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
				  };

				  successHandler = function(data, status, headers, config) {
					  $q.when(data.result).then(function(imageData){
						  $scope.uploadedImages.push(imageData);
						  //Update the list uploaded Image for Upload
						  $scope.imageids.push(imageData.id);
						  
					  })
				  };

				  thumbHandler = function(file) {
				    generateThumb(file);
				  };

				  generateThumb = function(file) {
				    if (file !== undefined) {
				      if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
				        $timeout(function() {
				          var fileReader = new FileReader();
				          fileReader.readAsDataURL(file);
				          fileReader.onload = function(e) {
				            $timeout(function() {
				              file.dataUrl = e.target.result;
				            });
				          };
				        });
				      }
				    }
				  };
				
				  $scope.upload = function (files) {
				    if (files && files.length) {
				      for (var i = 0; i < files.length; i++) {
				        var file = files[i];
				        Upload.upload({
				        	url: '/cs/upload/file',
		                    headers : {
		                        'X-CSRF-TOKEN' : csrf_token // X-CSRF-TOKEN 
		                    },
		                    data: {
		                      username: $scope.username,
		                      file: file  
		                    }
				        })
				        .progress(progressHandler)
				        .success(successHandler)
				        .error(function (err) {
				          showErrowMessage('Error occured during upload');
				      });
				      }
				    }
				  };

				  $scope.$watch('files', function(files) {
				    $scope.formUpload = false;
				    if (files !== undefined && files !== null) {
				      for (var i = 0; i < files.length; i++) {
				        $scope.errorMsg = undefined;
				        (thumbHandler)(files[i]);
				      }
				    }
				  });
			  $scope.chooseUploadedImage = function(orgId) {
				    modalInstance = $uibModal.open({
				        animation: true,
				        templateUrl: DOMAIN + "/cs/uploadedimage",
				        controller: 'UploadedImageCtrl',
				        size: 'lg',
				        resolve: {
				        	allImages : function() {
			        			return uploadService.getAllImages(orgId);
			        		}, 
				        }
				      });
				    
				    modalInstance.result.then(function (data){
						if(data.isDeleted) {
								$scope.$broadcast('refreshUpload', { 
									key: true,
									data : data.image
								});	
						}
						
					}, function () {
				    });
			    }
			  
		},
		
	      link: function (scope, element, attrs) {
	    	  scope.$on('refreshUpload', function (event, args) {
	    		 if(args.key) {
	    			scope.uploadedImages.push(args.data);
	    		 } 
	    	  });
	    }
	};
});
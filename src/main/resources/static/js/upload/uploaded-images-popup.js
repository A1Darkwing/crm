module.controller('UploadedImageCtrl', [
		'$scope',
		'$q',
		'$filter',
		'$uibModal',
		'allImages',
		'uploadService',
		function($scope,$q,$filter, $uibModal, allImages, uploadService) {
			$scope.modal = {};
			$scope.modal.title = "Uploaded Images";
			//Put all images to variable
			$scope.allImagesContent = allImages;
			
			$scope.selectedImage = function(image) {
			$scope.data = {
					isDeleted : true,
					image : image
			}
			$uibModal.close($scope.data);
			};
			
			$scope.deleteImage = function(imageId) {
				uploadService.deleteImage(imageId).then(function(data){
					uploadService.getAllImages().then(function(data){
						$scope.allImagesContent = data;
					});
				});
				
			};
			$scope.modal.cancel = function(){
				$uibModal.dismiss('Cancel');
				
			};
			
}]);
			
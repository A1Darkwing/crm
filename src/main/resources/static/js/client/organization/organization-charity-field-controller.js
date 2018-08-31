module.controller('OrganizationCharityFieldController',[
  '$scope',
  '$rootScope',
  'organizationService', 
  'charityFieldsData',
  'validator',
  '$translate',
  '$filter',
  function($scope, $rootScope, organizationService, charityFieldsData, validator, $translate, $filter) {
	 $scope.charityFieldsSource = [];
	 //load from response to $scope
	 if (charityFieldsData.charityFieldsResponse) {
		 angular.copy(charityFieldsData.charityFieldsResponse, $scope.charityFieldsSource);
	 }
   
	 
	 $scope.editingData = {};
	    
    for (var i = 0, length = $scope.charityFieldsSource.length; i < length; i++) {
      $scope.editingData[i] = false;
    }


    $scope.modify = function(index){
        $scope.editingData[index] = true;
    };

   $scope.createCharityField = function() {
     var charityField = {
    		 "fieldName": $scope.fieldName
     };

     organizationService.insertCharityField(charityField, validator)
     .then(
       function successCallback(response) {
         $scope.fieldName = "";
         $scope.charityFieldsSource.push(response.data.result);
       }, function errorCallback(response) {
       }
     );
   }
   
   $scope.removeCharityField = function(charityField) {
     organizationService.removeCharityField(charityField.id, validator)
     .then(
       function successCallback(response) {
      	 if (response.data.result) {
	      	 $scope.charityFieldsSource = $filter('filter')($scope.charityFieldsSource, {id: ('!' + charityField.id)});
	      	 showInfoMessage($translate.instant("charityField.removed.success", {"fieldName":charityField.fieldName}));
      	 } else {
      		showErrorMessageWithTitle("ERROR", $translate.instant("charityField.removed.failed"));
      	 }
       }, function errorCallback(response) {
       }
     );
   }
   
   $scope.updateCharityField = function(charityField, index) {
     organizationService.updateCharityField(charityField, validator)
     .then(
       function successCallback(response) {
      	 if (response.data.result.success) {
	      	 showInfoMessage($translate.instant("charityField.updated.success", {"fieldName":charityField.fieldName}));
      	 } else {
      		showErrorMessageWithTitle("ERROR", $translate.instant("charityField.updated.failed"));
      		 charityField.fieldName = response.data.result.fieldName;
      	 }
      	 $scope.editingData[index] = false;
       }, function errorCallback(response) {
       }
     );
   }
} ]);
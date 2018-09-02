module.controller('ClientController',[
  '$scope',
  '$rootScope',
  'clientService', 
  'clientsData',
  'clientModel',
  '$translate',
  '$filter',
  function($scope, $rootScope, clientService, clientsData, clientModel, $translate, $filter) {
	 $scope.clientsSource = [];
	 //Define client Model
	 $scope.client = clientModel;
	 //load from response to $scope
	 if (clientsData.clientsResponse) {
		 angular.copy(clientsData.clientsResponse, $scope.clientsSource);
	 }
	 
	 
	 $scope.editingData = {};
	    
    for (var i = 0, length = $scope.clientsSource.length; i < length; i++) {
      $scope.editingData[i] = false;
    }


    $scope.modify = function(index){
        $scope.editingData[index] = true;
    };

   $scope.createClient = function() {
     var charityField = {
    		 "fieldName": $scope.fieldName
     };

     clientService.insertClient(client)
     .then(
       function successCallback(response) {
         $scope.clientModel = "";
         $scope.clientsSource.push(response.data.result);
       }, function errorCallback(response) {
       }
     );
   }
   
   $scope.removeClient = function(client) {
     clientService.removeClient(charityField.id)
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
   
   $scope.updateClient = function(client, index) {
     clientService.updateClient(client)
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
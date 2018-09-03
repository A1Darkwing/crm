module.controller('ClientController',[
  '$scope',
  '$rootScope',
  'clientService', 
  'clientsData',
  'clientModel',
  '$translate',
  '$filter',
  '$timeout',
  function($scope, $rootScope, clientService, clientsData, clientModel, $translate, $filter, $timeout) {
	 $scope.clientsSource = [];
	 $scope.emailTypes = ["", "Main", "Secondary", "Other"];
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
    
    //Add new Client Email
    $scope.addNewEmail = function(sourceToPush) {
 	   var newEmail = {
 			   "type" : null,
 			   "email" : null
 	   }
 	   sourceToPush.push(newEmail);
 	  $timeout(function() {
          $('.selectpicker').selectpicker('refresh');
      });
    };
    
   
    //Add new Client Phone
    $scope.addNewPhone = function(sourceToPush) {
 	   var newPhone = {
 			   "type" : null,
 			   "number" : null
 	   }
 	   sourceToPush.push(newPhone);
 	  $timeout(function() {
          $('.selectpicker').selectpicker('refresh');
      });
    };
    
   //Add new Contact Custom Field
    $scope.addNewCustomField = function(sourceToPush) {
 	   var newField = {
 			   "name" : null,
 			   "value" : null
 	   }
 	   sourceToPush.push(newField);
    };
    
    //Add new Client Phone
    $scope.addNewContact = function(sourceToPush) {
 	   var newContact = {
 			   "id" : null,
 			   "fistName" : null,
 			   "lastName" : null,
 			   "title" : null,
			   "imageId" : null,
			   "phones" : [],
 			   "emails" : [],
 			   "customFields" : []
 	   }
 	   sourceToPush.push(newContact);
    };
    
     //Cancel Client Email
    $scope.cancelClient = function() {
    	clientService.initClient()
        .then(
	       function successCallback(response) {
	    	   $scope.client = response;
	       }, function errorCallback(response) {
	       }
	     );
    }
    
   $scope.createClient = function() {

     clientService.insertClient($scope.client)
     .then(
       function successCallback(response) {
    	 showInfoMessage("New client has been created successfully!");
         $scope.clientsSource.push($scope.client);
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
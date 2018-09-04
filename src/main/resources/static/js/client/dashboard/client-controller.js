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
			   "phones" : [{
				      "id" : null,
				      "type" : "Main",
				      "number" : ""
				    }],
 			   "emails" : [{
 			      "id" : null,
 			      "type" : "Main",
 			      "email" : ""
 			    }],
 			   "customFields" : [{
 			      "id" : null,
 			      "name" : "",
 			      "value" : ""
 			    }]
 	   }
 	   sourceToPush.push(newContact);
 	  $timeout(function() {
          $('.selectpicker').selectpicker('refresh');
      });
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

     clientService.saveClient($scope.client)
     .then(
       function successCallback(response) {
    	 showInfoMessage("New client has been created successfully!");
    	 $scope.client.id = response.result;
    	 var newClient = {
    			 "id" : response.result,
    			 "client" : $scope.client
    	 }
         $scope.clientsSource.push(newClient);
       }, function errorCallback(response) {
       }
     );
   }
   
   $scope.removeClient = function(client) {
     clientService.removeClient(client.id)
     .then(
       function successCallback(response) {
      	 if (response.data.result) {
	      	 $scope.clientsSource = $filter('filter')($scope.clientsSource, {id: ('!' + client.id)});
	      	 showInfoMessage("An Client has been removed!");
      	 } else {
      		showErrorMessageWithTitle("ERROR", "Can't Remove Due To Error!!!");
      	 }
       }, function errorCallback(response) {
       }
     );
   }
   
   $scope.updateClient = function(client, index) {
     $scope.client = client;
   }
} ]);
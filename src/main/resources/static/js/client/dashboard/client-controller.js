module.controller('ClientController',[
  '$scope',
  'clientService', 
  'clientsData',
  'clientModel',
  '$timeout',
  function($scope, clientService, clientsData, clientModel, $timeout) {
	 $scope.clientsSource = [];
	 $scope.emailTypes = ["", "Main", "Secondary", "Other"];
	 $scope.tabs = [true, false, false];
	 $scope.changeTab = function (tab) {
	   if (0 == tab) {
	     $scope.tabs = [true, false, false];
	   } else if ( 1 == tab) {
	     $scope.tabs = [false, true, false];
	   } else if (2 == tab) {
	     $scope.tabs = [false, false, true];
	   }
	 }
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
    
    //Add new Site
    $scope.addNewSite = function(sourceToPush) {
     var newSite = {
         "id" : null,
         "name" : null,
         "imageId" : null,
         "address" : {
              "id" : null,
              "street" : null,
              "unitNumber" : 0,
              "city" : null,
              "state" : null,
              "country" : null,
              "zipCode" : 0
            }
     }
     sourceToPush.push(newSite);
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
    	   //Update current client to new created client with ID and imageId
    	   $scope.client = response.result.client;
    	   //Then push to client list
         $scope.clientsSource.push(response.result);
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
	      	 showInfoMessage("A Client has been removed!");
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
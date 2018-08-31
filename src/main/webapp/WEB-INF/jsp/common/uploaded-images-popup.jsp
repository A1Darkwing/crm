
      <div class="modal-header">
        <button type="button" class="close" ng-click="modal.cancel()">&times;</button>
 	    <h3 class="modal-title" ng-bind="modal.title"></h3>
      </div>
      <div class="modal-body">
      <div class="container-fluid">
			<!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
			<div class="row" >
			  <div class="col-xs-3 col-md-2 form-group" ng-repeat="image in allImagesContent.result">
					<img class="img-rounded" width="100" height="100" ng-bind="uploadImage"
					  ng-src="<%=request.getContextPath() %>/{{image.imageURL}}" ng-click="selectedImage(image);">
					 <span>{{image.name}}</span> 
					 <button type="button" class="close" ng-click="deleteImage(image.id);">&times;</button>
			  </div>
			  
			</div>
			</div>
     </div>
     
      <div class="modal-footer">
       
      </div>




















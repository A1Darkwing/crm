<style>
.upload-button {
    width: 120px;
    height: 120px;
    background-image: url("/images/common/add-image.png");
    background-size: 120px 120px;
    background-repeat: no-repeat;
}
</style>
<div>
    
  
	<div class="row">
		 <div class="col-md-2">
		 	<button class="upload-button" ngf-select="upload($files)" ngf-multiple="true">  </button>
		 </div>
	    <div ng-if="image.id" ng-repeat="image in uploadedImages" class="col-md-2">
	      <img class="img-responsive img-thumbnail" ng-src="/image/{{image.id}}" width="180"alt="Card image cap">
	    </div>
   	</div>
</div>

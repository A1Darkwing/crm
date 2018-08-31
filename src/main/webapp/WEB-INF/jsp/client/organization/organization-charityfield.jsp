<div class="content">
    <div class="container-fluid">
        <div class="row">
         <div class="col-md-6">
                <div class="card">
                    <div class="card-header card-header-icon" data-background-color="rose">
                        <i class="material-icons">contacts</i>
                    </div>
                    <div class="card-content">
                        <h4 class="card-title">{{'create.charityField.title' | translate}}</h4>
                        <form class="form-horizontal">
                            <div class="row">
                                <label class="col-md-3 label-on-left">{{'create.charityField.fieldName' | translate}}</label>
                                <div class="col-md-9">
                                    <div class="form-group label-floating is-empty">
                                        <label class="control-label"></label>
                                        <input type="text" class="form-control" 
                                        	ng-model="fieldName">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-md-3"></label>
                                <div class="col-md-9">
                                    <div class="form-group form-button">
                                        <button type="submit" class="btn btn-fill btn-rose"
                                        ng-click="createCharityField()">Add</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header card-header-icon" data-background-color="rose">
                        <i class="material-icons">assignment</i>
                    </div>
                    <div class="card-content">
                        <h4 class="card-title">Charity Fields</h4>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="text-center">#</th>
                                        <th>Name</th>
                                        <th class="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="item in charityFieldsSource track by $index">
                                        <td class="text-center">{{$index}}</td>
                                        <td>
                                        	<div ng-hide="editingData[$index]">{{item.fieldName}}</div>
                               				<div ng-show="editingData[$index]"><input type="text" 
                               				class="form-control" ng-model="item.fieldName" /></div>
                                        </td>
                                        <td class="td-actions text-right">
                                            <button  type="button" rel="tooltip" class="btn btn-success btn-round"
                                            	ng-hide="editingData[$index]" ng-click="modify($index)">
                                            	<i class="material-icons">build</i>
                                            </button>
                               				<button  type="button" rel="tooltip" class="btn btn-success btn-round"
                               					ng-show="editingData[$index]" ng-click="updateCharityField(item, $index)">
                               					<i class="material-icons">done</i>
                               				</button>
                                            <button type="button" rel="tooltip" class="btn btn-danger btn-round"
                                            ng-click="removeCharityField(item)">
                                                <i class="material-icons">close</i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
         </div>   
   </div>
</div>
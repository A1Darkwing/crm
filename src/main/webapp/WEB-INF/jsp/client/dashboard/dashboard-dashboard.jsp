<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <form>
                        <div class="card-header card-header-icon card-header-rose">
                            <div class="card-icon">
                                <i class="material-icons">perm_identity</i>
                            </div>
                            <h4 class="card-title">Company Information -
                                <small class="category">Please input company information</small>
                            </h4>
                            <button type="button" class="btn btn-rose pull-right" 
                            	ng-click="createClient()">Create Client</button>
                            <button type="button" class="btn btn-default pull-right"
                            	ng-click="cancelClient()">Cancel</button>
                        </div>
                        <br>
                        <br>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="row1">
                                        <div class="form-group">
                                            <label class="bmd-label-floating">Company Name</label>
                                            <input type="text" class="form-control" ng-model="client.company">
                                        </div>
                                    </div>
                                    <div class="row1">
                                        <div class="form-group">
                                            <label class="bmd-label-floating">Company Domain Name</label>
                                            <input type="text" class="form-control" ng-model="client.domain">
                                        </div>
                                    </div>
                                    <div class="row1">
                                        <div class="form-group">
                                            <label class="bmd-label-floating">Company Industry</label>
                                            <input type="text" class="form-control" ng-model="client.industry">
                                        </div>
                                    </div>
                                    <div class="row" ng-repeat="item in client.emails track by $index">
                                        <div class="col-md-5">
                                                <select ng-show="true" class="selectpicker active" data-size="4" 
                                                	data-style="select-with-transition"
                                                        title="Email Type" tabindex="-98"
                                                        ng-model="item.type">
                                                    <option class="bs-title-option" value=""></option>
                                                    <option value="Main">Main</option>
                                                    <option value="Secondary">Secondary</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">Email</label>
                                                <input type="email" class="form-control" ng-model="item.email">
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="row">
                                       	<button ng-click="addNewEmail(client.emails)" class="btn btn-rose btn-link btn-block">
                                       		Add New Email
                                       	</button>
                                    </div>
                                    <div class="row" ng-repeat="item in client.phones track by $index">
                                        <div class="col-md-5">
                                            <div class="form-group">
                                                <select ng-show="true" class="selectpicker active" data-size="4" data-style="select-with-transition"
                                                        title="Phone Type" tabindex="-98" ng-model="item.type">
                                                    <option class="bs-title-option" value=""></option>
                                                    <option value="Main">Main</option>
                                                    <option value="Secondary">Secondary</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">Phone</label>
                                                <input type="number" class="form-control" ng-model="item.number">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                      	<button ng-click="addNewPhone(client.phones)" class="btn btn-rose btn-link btn-block">
                                      		Add New Phone
                                      	</button>
                                    </div>
                                    <div class="row1">
                                        <div class="form-group">
                                            <label class="bmd-label-floating">Number of Employees</label>
                                            <input type="number" class="form-control" ng-model="client.numberOfEmployees">
                                        </div>
                                    </div>
                                    <div class="row1">
                                        <div class="form-group">
                                            <label class="bmd-label-floating">Annual Revenue</label>
                                            <input type="number" class="form-control" ng-model="client.annnualRevenue">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="row1">
                                        <div class="form-group">
                                            <label class="bmd-label-floating">Street Address</label>
                                            <input type="text" class="form-control" ng-model="client.address.street">
                                        </div>
                                    </div>
                                    <div class="row1">
                                        <div class="form-group">
                                            <label class="bmd-label-floating">Unit Number</label>
                                            <input type="number" class="form-control" ng-model="client.address.unitNumber">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">City</label>
                                                <input type="text" class="form-control" ng-model="client.address.city">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">State</label>
                                                <input type="text" class="form-control" ng-model="client.address.state">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">Country</label>
                                                <input type="text" class="form-control" ng-model="client.address.country">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">Zip Code</label>
                                                <input type="text" class="form-control" ng-model="client.address.zipCode">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <br/>
                            <!--Start Tab -->
                            <div class="col-md-12">
                                <div class="card2 ">
                                    <div class="card-body2 ">
                                        <ul class="nav nav-pills nav-pills-rose nav-pills-icons justify-content-center" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" data-toggle="tab" href="#link1" role="tablist">
                                                    Contact
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" href="#link2" role="tablist">
                                                    Site
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" href="#link3" role="tablist">
                                                    Asset
                                                </a>
                                            </li>
                                        </ul>
                                        <div class="tab-content tab-space">
                                            <!-- The div tab for Contacts section -->
                                            <div class="tab-pane active show" id="link1">
                                                <div class="row" ng-repeat="item in client.contacts track by $index">
                                                    <div class="col-md-2">
                                                    	<div class="form-group">
											                <label class="label-on-left">Contact Avatar:</label><br />
											                <div class="fileinput fileinput-new text-center"
											                  data-provides="fileinput">
											                  <div class="fileinput-new thumbnail">
											                    <img class="image">
											                  </div>
											                  <div
											                    class="fileinput-preview fileinput-exists thumbnail"></div>
											                  <div>
											                    <span class="btn btn-rose btn-round btn-file">
											                      <span class="fileinput-new">
											                      	<i class="fa fa-upload"></i> New Img
											                      </span> <span
											                      class="fileinput-exists">Change</span> <input
											                      type="file" name="file" id="contact-image-{{$index}}" />
											                    </span> <a href="#pablo"
											                      class="btn btn-danger btn-round fileinput-exists"
											                      data-dismiss="fileinput"><i
											                      class="fa fa-times"></i> Remove</a>
											                  </div>
											                </div>
											              </div>
                                                    </div>
                                                    <div class="col-md-10">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="form-group">
                                                                            <label class="bmd-label-floating">Title</label>
                                                                            <input type="text" class="form-control" ng-model="item.title">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="form-group">
                                                                            <label class="bmd-label-floating">First Name</label>
                                                                            <input type="text" class="form-control" ng-model="item.firstName">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="form-group">
                                                                            <label class="bmd-label-floating">Last Name</label>
                                                                            <input type="text" class="form-control" ng-model="item.lastName">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <!--start custom fields for Contacts section -->
	                                                        <div class="row">
	                                                            <div class="col-md-12">
	                                                                <div class="row" ng-repeat="contactCustomField in item.customFields track by $index">
	                                                                    <div class="col-md-5">
	                                                                        <div class="form-group">
	                                                                            <label class="bmd-label-floating">Custom Field Name</label>
	                                                                            <input type="text" class="form-control" ng-model="contactCustomField.name">
	                                                                        </div>
	                                                                    </div>
	                                                                    <div class="col-md-7">
	                                                                        <div class="form-group">
	                                                                            <label class="bmd-label-floating">Custom Field Value</label>
	                                                                            <input type="text" class="form-control" ng-model="contactCustomField.value">
	                                                                        </div>
	                                                                    </div>
	                                                                </div>
	                                                                <div class="row">
								                                       	<button ng-click="addNewCustomField(item.customFields)" class="btn btn-rose btn-link btn-block">
								                                       		Add New Custom Field
								                                       	</button>
							                                    	</div>
	                                                            </div>
	                                                        </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="row" ng-repeat="contactEmail in item.emails track by $index">
							                                        <div class="col-md-5">
							                                                <select ng-show="true" class="selectpicker active" data-size="4" 
							                                                	data-style="select-with-transition"
							                                                        title="Email Type" tabindex="-98"
							                                                        ng-model="contactEmail.type">
							                                                    <option class="bs-title-option" value=""></option>
							                                                    <option value="Main">Main</option>
							                                                    <option value="Secondary">Secondary</option>
							                                                    <option value="Other">Other</option>
							                                                </select>
							                                        </div>
							                                        <div class="col-md-7">
							                                            <div class="form-group">
							                                                <label class="bmd-label-floating">Email</label>
							                                                <input type="email" class="form-control" ng-model="contactEmail.email">
							                                            </div>
							                                        </div>
							                                        
							                                    </div>
							                                    <div class="row">
							                                       	<button ng-click="addNewEmail(item.emails)" class="btn btn-rose btn-link btn-block">
							                                       		Add New Email
							                                       	</button>
							                                    </div>
							                                    <div class="row" ng-repeat="contactPhone in item.phones track by $index">
							                                        <div class="col-md-5">
							                                            <div class="form-group">
							                                                <select ng-show="true" class="selectpicker active" data-size="4" data-style="select-with-transition"
							                                                        title="Phone Type" tabindex="-98" ng-model="contactPhone.type">
							                                                    <option class="bs-title-option" value=""></option>
							                                                    <option value="Main">Main</option>
							                                                    <option value="Secondary">Secondary</option>
							                                                    <option value="Other">Other</option>
							                                                </select>
							                                            </div>
							                                        </div>
							                                        <div class="col-md-7">
							                                            <div class="form-group">
							                                                <label class="bmd-label-floating">Phone</label>
							                                                <input type="number" class="form-control" ng-model="contactPhonenumber">
							                                            </div>
							                                        </div>
							                                    </div>
							                                    <div class="row">
							                                      	<button ng-click="addNewPhone(item.phones)" class="btn btn-rose btn-link btn-block">
							                                      		Add New Phone
							                                      	</button>
							                                    </div>
                                                                
                                                            </div>
                                                        </div>

                                                        
                                                    </div>
                                                    <div class="col-md-1">
                                                        <div class="td-actions">
                                                            <button type="button" rel="tooltip" data-placement="left" title="" class="btn btn-link" data-original-title="Remove item" aria-describedby="tooltip143066">
                                                                <i class="material-icons">close</i>
                                                                <div class="ripple-container"></div></button>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                </div>
                                                
                                                <hr/>
                                                <div ng-show="client.contacts.length == 0">
                                                	There is no contact. Please add a new one.
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <button class="btn btn-rose btn-link btn-block" ng-click="addNewContact(client.contacts)">
                                                            Add New Contact<div class="ripple-container"></div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- The div tab for Site section -->
                                            <div class="tab-pane" id="link2">
                                                <div class="row">
                                                    <div class="col-md-9">
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label class="bmd-label-floating">Site</label>
                                                                    <input type="text" class="form-control" ng-model="client.sites[0].name">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label class="bmd-label-floating">Street</label>
                                                                    <input type="text" class="form-control" ng-model="client.sites[0].address.street">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label class="bmd-label-floating">Unit Number</label>
                                                                    <input type="number" class="form-control" ng-model="client.sites[0].address.unitNumber">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label class="bmd-label-floating">City</label>
                                                                    <input type="text" class="form-control" ng-model="client.sites[0].address.city">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label class="bmd-label-floating">State</label>
                                                                    <input type="text" class="form-control" ng-model="client.sites[0].address.state">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label class="bmd-label-floating">Country</label>
                                                                    <input type="text" class="form-control" ng-model="client.sites[0].address.country">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label class="bmd-label-floating">Zip Code</label>
                                                                    <input type="number" class="form-control" ng-model="client.sites[0].address.zipCode">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="img-container" style="width:60%;">
                                                            <img src="/images/common/placeholder.jpg" alt="..." class="ng-isolate-scope" style="">
                                                        </div>
                                                        <button class="btn btn-link">
                                                            <i class="fa fa-upload"></i> Add Photo
                                                            <div class="ripple-container"></div>
                                                        </button>
                                                    </div>
                                                    <div class="col-md-1">
                                                        <div class="td-actions">
                                                            <button type="button" rel="tooltip" data-placement="left" title="" class="btn btn-link" data-original-title="Remove item" aria-describedby="tooltip143066">
                                                                <i class="material-icons">close</i>
                                                                <div class="ripple-container"></div></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div class="row">
                                                    <div class="col-md-9">
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label class="bmd-label-floating">Site</label>
                                                                    <input type="text" class="form-control" ng-model="client.sites[1].name">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label class="bmd-label-floating">Street</label>
                                                                    <input type="text" class="form-control" ng-model="client.sites[1].address.street">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label class="bmd-label-floating">Unit Number</label>
                                                                    <input type="number" class="form-control" ng-model="client.sites[1].address.unitNumber">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label class="bmd-label-floating">City</label>
                                                                    <input type="text" class="form-control" ng-model="client.sites[1].address.city">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label class="bmd-label-floating">State</label>
                                                                    <input type="text" class="form-control" ng-model="client.sites[1].address.state">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label class="bmd-label-floating">Country</label>
                                                                    <input type="text" class="form-control" ng-model="client.sites[1].address.country">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label class="bmd-label-floating">Zip Code</label>
                                                                    <input type="number" class="form-control" ng-model="client.sites[1].address.zipCode">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="img-container" style="width:60%;">
                                                            <img src="/images/common/placeholder.jpg" alt="..." class="ng-isolate-scope" style="">
                                                        </div>
                                                        <button class="btn btn-link">
                                                            <i class="fa fa-upload"></i> Add Photo
                                                            <div class="ripple-container"></div>
                                                        </button>
                                                    </div>
                                                    <div class="col-md-1">
                                                        <div class="td-actions">
                                                            <button type="button" rel="tooltip" data-placement="left" title="" class="btn btn-link" data-original-title="Remove item" aria-describedby="tooltip143066">
                                                                <i class="material-icons">close</i>
                                                                <div class="ripple-container"></div></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <button class="btn btn-rose btn-link btn-block">
                                                            Add Another Contact<div class="ripple-container"></div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="link3">
                                                Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.
                                                <br>
                                                <br>Dynamically innovate resource-leveling customer service for state of the art customer service.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- End tab -->
                            <div class="clearfix"></div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        
        <!-- Show all clients -->
       <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header card-header-icon" data-background-color="rose">
                        <i class="material-icons">assignment</i>
                    </div>
                    <div class="card-content">
                        <h4 class="card-title">Clients</h4>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="text-center">#</th>
                                        <th>Company</th>
                                        <th>Domain</th>
                                        <th>Industry</th>
                                        <th class="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="item in clientsSource track by $index">
                                        <td class="text-center">{{$index}}</td>
                                        <td>
                                        	<div ng-hide="editingData[$index]">{{item.client.company}}</div>
                                        </td>
                                        <td>
                                        	<div ng-hide="editingData[$index]">{{item.client.domain}}</div>
                                        </td>
                                        <td>
                                        	<div ng-hide="editingData[$index]">{{item.client.industry}}</div>
                                        </td>
                                        <td class="td-actions text-right">
                                            <button  type="button" rel="tooltip" class="btn btn-success btn-round"
                                            	ng-hide="editingData[$index]" ng-click="modify($index)">
                                            	<span class="input-group-text">
                                                  <i class="material-icons">build</i>
                                                </span>
                                            </button>
                               				<button  type="button" rel="tooltip" class="btn btn-success btn-round"
                               					ng-show="editingData[$index]" ng-click="updateClient(item, $index)">
                               					<span class="input-group-text">
                                                  <i class="material-icons">done</i>
                                                </span>
                               				</button>
                                            <button type="button" rel="tooltip" class="btn btn-danger btn-round"
                                            ng-click="removeClient(item)">
                                                <span class="input-group-text">
                                                  <i class="material-icons">close</i>
                                                </span>
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

<script>
    $(document).ready(function() {
        //    Activate bootstrap-select
        if ($(".selectpicker").length != 0) {
            $(".selectpicker").selectpicker();
        }
    });
</script>
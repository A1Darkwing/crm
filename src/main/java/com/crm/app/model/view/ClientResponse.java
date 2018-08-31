package com.crm.app.model.view;

public class ClientResponse {

  private String id;
  private String fieldName;
  private boolean success;
  
  public ClientResponse() {};

  public ClientResponse(String id, String fieldName, boolean success) {
    this.id = id;
    this.fieldName = fieldName;
    this.success = success;
  }

  public String getId() {
    return id;
  }

  public String getFieldName() {
    return fieldName;
  }

  public boolean isSuccess() {
	return success;
  }
  
}

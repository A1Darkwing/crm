package com.crm.app.model.persistance;

import org.springframework.data.annotation.Id;

/**
* @author tung.nguyen
*/

public class CustomField {
  
  @Id
  private String id;
  private String name;
  private String value;
  
  public CustomField() {
    super();
  }
  
  public CustomField(String name, String value) {
    super();
    this.name = name;
    this.value = value;
  }

  public String getId() {
    return id;
  }
  public void setId(String id) {
    this.id = id;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getValue() {
    return value;
  }
  public void setValue(String value) {
    this.value = value;
  }
}

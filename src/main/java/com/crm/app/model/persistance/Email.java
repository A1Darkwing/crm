package com.crm.app.model.persistance;

import org.springframework.data.annotation.Id;

/**
* @author tung.nguyen
*/

public class Email {

  @Id
  private String id;
  private String type;
  private String email;
  
  public Email() {
    super();
  }
  
  public Email(String type, String email) {
    super();
    this.type = type;
    this.email = email;
  }

  public String getId() {
    return id;
  }
  public void setId(String id) {
    this.id = id;
  }
  public String getType() {
    return type;
  }
  public void setType(String type) {
    this.type = type;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
}

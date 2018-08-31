package com.crm.app.model.persistance;

import org.springframework.data.annotation.Id;

/**
* @author tung.nguyen
*/

public class Email {

  @Id
  private String id;
  private ContactTypeEnum type;
  private String email;
  
  public Email() {
    super();
  }
  
  public Email(String id, ContactTypeEnum type, String email) {
    super();
    this.id = id;
    this.type = type;
    this.email = email;
  }

  public String getId() {
    return id;
  }
  public void setId(String id) {
    this.id = id;
  }
  public ContactTypeEnum getType() {
    return type;
  }
  public void setType(ContactTypeEnum type) {
    this.type = type;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
}

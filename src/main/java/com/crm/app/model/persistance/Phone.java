package com.crm.app.model.persistance;

import org.springframework.data.annotation.Id;

/**
* @author tung.nguyen
*/

public class Phone {
  
  @Id
  private String id;
  private ContactTypeEnum type;
  private String number;
  
  public Phone() {
    super();
  }
  
  
  public Phone(String id, ContactTypeEnum type, String number) {
    super();
    this.id = id;
    this.type = type;
    this.number = number;
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
  public String getNumber() {
    return number;
  }
  public void setNumber(String number) {
    this.number = number;
  }
}

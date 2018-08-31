package com.crm.app.model.persistance;

/**
* @author tung.nguyen
*/

public enum ContactTypeEnum {
  MAIN("Main"), SECONDARY("Secondary"), OTHER("Other");

  private String type;

  ContactTypeEnum(String type) {
    this.type = type;
  }

  public String getType() {
    return this.type;
  }
}

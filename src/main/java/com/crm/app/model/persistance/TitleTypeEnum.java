package com.crm.app.model.persistance;

/**
* @author tung.nguyen
*/

public enum TitleTypeEnum {
    TITLE1("Title_1"), TITLE2("Title_2"), TITLE3("Title_3");

    private String title;

    TitleTypeEnum(String title) {
      this.title = title;
    }

    public String getTitle() {
      return this.title;
    }
}

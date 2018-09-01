package com.crm.app.model.persistance;

import java.util.List;

import org.springframework.data.annotation.Id;

/**
* @author tung.nguyen
*/

public class Contact {
  
  @Id
  private String id;
  private String firstName;
  private String lastName;
  private TitleTypeEnum title;
  private String imageId;
  private List<Phone> phones;
  private List<Email> emails;
  private List<CustomField> customFields;
  
  public Contact() { 
    super();
  };
  
  public Contact(String firstName, String lastName, TitleTypeEnum title, String imageId,
      List<Phone> phones, List<Email> emails, List<CustomField> customFields) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.title = title;
    this.imageId = imageId;
    this.phones = phones;
    this.emails = emails;
    this.customFields = customFields;
  }

  public String getId() {
    return id;
  }
  public void setId(String id) {
    this.id = id;
  }
  public String getFirstName() {
    return firstName;
  }
  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }
  public String getLastName() {
    return lastName;
  }
  public void setLastName(String lastName) {
    this.lastName = lastName;
  }
  public TitleTypeEnum getTitle() {
    return title;
  }
  public void setTitle(TitleTypeEnum title) {
    this.title = title;
  }
  public String getImageId() {
    return imageId;
  }
  public void setImageId(String imageId) {
    this.imageId = imageId;
  }
  public List<Phone> getPhones() {
    return phones;
  }
  public void setPhones(List<Phone> phones) {
    this.phones = phones;
  }
  public List<Email> getEmails() {
    return emails;
  }
  public void setEmails(List<Email> emails) {
    this.emails = emails;
  }
  public List<CustomField> getCustomFields() {
    return customFields;
  }
  public void setCustomFields(List<CustomField> customFields) {
    this.customFields = customFields;
  }
}

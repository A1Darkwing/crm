package com.crm.app.model.persistance;

import java.util.Collection;

import org.springframework.data.annotation.Id;

/**
* @author tung.nguyen
*/

public class Contact {
  
  @Id
  private String id;
  private String firstName;
  private String lastName;
  private String title;
  private String imageId;
  private Collection<Phone> phones;
  private Collection<Email> emails;
  private Collection<CustomField> customFields;
  
  public Contact() { 
    super();
  };
  
  public Contact(String firstName, String lastName, String title, String imageId,
      Collection<Phone> phones, Collection<Email> emails, Collection<CustomField> customFields) {
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
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public String getImageId() {
    return imageId;
  }
  public void setImageId(String imageId) {
    this.imageId = imageId;
  }
  public Collection<Phone> getPhones() {
    return phones;
  }
  public void setPhones(Collection<Phone> phones) {
    this.phones = phones;
  }
  public Collection<Email> getEmails() {
    return emails;
  }
  public void setEmails(Collection<Email> emails) {
    this.emails = emails;
  }
  public Collection<CustomField> getCustomFields() {
    return customFields;
  }
  public void setCustomFields(Collection<CustomField> customFields) {
    this.customFields = customFields;
  }
}

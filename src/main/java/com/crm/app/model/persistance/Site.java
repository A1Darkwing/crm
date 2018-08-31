package com.crm.app.model.persistance;

import java.util.List;

import org.springframework.data.annotation.Id;

/**
* @author tung.nguyen
*/

public class Site {
  
  @Id
  private String id;
  
  private String name;
  
  private List<Address> addresses;
  
  private List<String> photoUrls;

  
  public Site() {
    super();
  }
  
  
  public Site(String id, String name, List<Address> addresses, List<String> photoUrls) {
    super();
    this.id = id;
    this.name = name;
    this.addresses = addresses;
    this.photoUrls = photoUrls;
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

  public List<Address> getAddresses() {
    return addresses;
  }

  public void setAddresses(List<Address> addresses) {
    this.addresses = addresses;
  }

  public List<String> getPhotoUrls() {
    return photoUrls;
  }

  public void setPhotoUrls(List<String> photoUrls) {
    this.photoUrls = photoUrls;
  }
}

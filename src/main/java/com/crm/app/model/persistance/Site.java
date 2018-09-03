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
  
  private Address address;
  
  private List<String> imageIds;

  
  public Site() {
    super();
  }
  
  
  public Site(String name, Address address, List<String> imageIds) {
    super();
    this.name = name;
    this.address = address;
    this.imageIds = imageIds;
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

  public Address getAddress() {
    return address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }

  public List<String> getImageIds() {
    return imageIds;
  }

  public void setImageIds(List<String> imageIds) {
    this.imageIds = imageIds;
  }
}

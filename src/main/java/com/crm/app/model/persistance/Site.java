package com.crm.app.model.persistance;

import java.util.Collection;

import org.springframework.data.annotation.Id;

/**
* @author tung.nguyen
*/

public class Site {
  
  @Id
  private String id;
  
  private String name;
  
  private Address address;
  
  private Collection<String> imageIds;

  
  public Site() {
    super();
  }
  
  
  public Site(String name, Address address, Collection<String> imageIds) {
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

  public Collection<String> getImageIds() {
    return imageIds;
  }

  public void setImageIds(Collection<String> imageIds) {
    this.imageIds = imageIds;
  }
}

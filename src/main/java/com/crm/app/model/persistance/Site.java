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
  
  private String imageId;

  private Integer imageIndex;
  
  public Site() {
    super();
  }
  
  
  public Site(String name, Address address, String imageId) {
    super();
    this.name = name;
    this.address = address;
    this.imageId = imageId;
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

  public String getImageId() {
    return imageId;
  }

  public void setImageId(String imageId) {
    this.imageId = imageId;
  }

  public Integer getImageIndex() {
    return imageIndex;
  }
}

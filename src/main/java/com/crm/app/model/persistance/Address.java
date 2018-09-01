package com.crm.app.model.persistance;

import org.springframework.data.annotation.Id;

/**
* @author tung.nguyen
*/

public class Address {
  
  @Id
  private String id;
  private String street;
  private int unitNumber;
  private String city;
  private String state;
  private String country;
  private int zipCode;
  
  public Address() {
    super();
  }
  
  public Address(String street, int unitNumber, String city, String state, String country, int zipCode) {
    super();
    this.street = street;
    this.unitNumber = unitNumber;
    this.city = city;
    this.state = state;
    this.country = country;
    this.zipCode = zipCode;
  }

  public String getId() {
    return id;
  }
  public void setId(String id) {
    this.id = id;
  }
  public String getStreet() {
    return street;
  }
  public void setStreet(String street) {
    this.street = street;
  }
  public int getUnitNumber() {
    return unitNumber;
  }
  public void setUnitNumber(int unitNumber) {
    this.unitNumber = unitNumber;
  }
  public String getCity() {
    return city;
  }
  public void setCity(String city) {
    this.city = city;
  }
  public String getState() {
    return state;
  }
  public void setState(String state) {
    this.state = state;
  }
  public String getCountry() {
    return country;
  }
  public void setCountry(String country) {
    this.country = country;
  }
  public int getZipCode() {
    return zipCode;
  }
  public void setZipCode(int zipCode) {
    this.zipCode = zipCode;
  }
}

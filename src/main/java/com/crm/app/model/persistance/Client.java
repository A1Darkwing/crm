package com.crm.app.model.persistance;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
* @author tung.nguyen
*/

@Document(collection = "Clients")
public class Client {

  @Id
  private String id;
  
  private String company;
  
  private String domain;
  
  private String industry;
  
  private double annnualRevenue;
  
  private List<Phone> phones;
  
  private List<Email> emails;
  
  private Address address;
  
  private List<Contact> contacts;
  
  private List<Site> sites;
  
  public Client() {
    super();
  }
  
  public Client(String id, String company, String domain, String industry, double annnualRevenue, List<Phone> phones,
        List<Email> emails, Address address, List<Contact> contacts, List<Site> sites) {
    super();
    this.id = id;
    this.company = company;
    this.domain = domain;
    this.industry = industry;
    this.annnualRevenue = annnualRevenue;
    this.phones = phones;
    this.emails = emails;
    this.address = address;
    this.contacts = contacts;
    this.sites = sites;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getCompany() {
    return company;
  }

  public void setCompany(String company) {
    this.company = company;
  }

  public String getDomain() {
    return domain;
  }

  public void setDomain(String domain) {
    this.domain = domain;
  }

  public String getIndustry() {
    return industry;
  }

  public void setIndustry(String industry) {
    this.industry = industry;
  }

  public double getAnnnualRevenue() {
    return annnualRevenue;
  }

  public void setAnnnualRevenue(double annnualRevenue) {
    this.annnualRevenue = annnualRevenue;
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

  public Address getAddress() {
    return address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }

  public List<Contact> getContacts() {
    return contacts;
  }

  public void setContacts(List<Contact> contacts) {
    this.contacts = contacts;
  }

  public List<Site> getSites() {
    return sites;
  }

  public void setSites(List<Site> sites) {
    this.sites = sites;
  }
}

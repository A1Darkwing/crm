package com.crm.app.model.persistance;

import java.util.ArrayList;
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
  
  private int numberOfEmployees;
  
  private List<Phone> phones;
  
  private List<Email> emails;
  
  private Address address;
  
  private List<Contact> contacts;
  
  private List<Site> sites;
  
  public Client() {
    this.company = "";
    this.domain = "";
    this.industry = "";
    this.annnualRevenue = 0;
    this.numberOfEmployees = 0;
    this.phones = new ArrayList<Phone>();
    this.emails = new ArrayList<Email>();
    this.address = new Address();
    this.contacts = new ArrayList<Contact>();
    this.sites = new ArrayList<Site>();
  }
  
  public Client(String company, String domain, String industry, double annnualRevenue, int numberOfEmployees,
		List<Phone> phones, List<Email> emails, Address address, List<Contact> contacts, List<Site> sites) {
    super();
    this.company = company;
    this.domain = domain;
    this.industry = industry;
    this.annnualRevenue = annnualRevenue;
    this.numberOfEmployees = numberOfEmployees;
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

	public int getNumberOfEmployees() {
		return numberOfEmployees;
	}
	
	public void setNumberOfEmployees(int numberOfEmployees) {
		this.numberOfEmployees = numberOfEmployees;
	}
  
}

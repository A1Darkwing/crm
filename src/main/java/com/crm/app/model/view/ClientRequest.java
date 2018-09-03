package com.crm.app.model.view;

import java.util.List;

import com.crm.app.model.persistance.Address;
import com.crm.app.model.persistance.Contact;
import com.crm.app.model.persistance.Email;
import com.crm.app.model.persistance.Phone;
import com.crm.app.model.persistance.Site;

public class ClientRequest {

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
	  
	  public ClientRequest() {
	    super();
	  }

	  public String getId() {
	    return id;
	  }

	  public String getCompany() {
	    return company;
	  }

	  public String getDomain() {
	    return domain;
	  }

	  public String getIndustry() {
	    return industry;
	  }

	  public double getAnnnualRevenue() {
	    return annnualRevenue;
	  }

	  public List<Phone> getPhones() {
	    return phones;
	  }

	  public List<Email> getEmails() {
	    return emails;
	  }

	  public Address getAddress() {
	    return address;
	  }

	  public List<Contact> getContacts() {
	    return contacts;
	  }

	  public List<Site> getSites() {
	    return sites;
	  }

	public int getNumberOfEmployees() {
		return numberOfEmployees;
	}
	  
}

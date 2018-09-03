package com.crm.app.model.view;

import java.util.Collection;

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
	  
	  private Collection<Phone> phones;
	  
	  private Collection<Email> emails;
	  
	  private Address address;
	  
	  private Collection<Contact> contacts;
	  
	  private Collection<Site> sites;
	  
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

	  public Collection<Phone> getPhones() {
	    return phones;
	  }

	  public Collection<Email> getEmails() {
	    return emails;
	  }

	  public Address getAddress() {
	    return address;
	  }

	  public Collection<Contact> getContacts() {
	    return contacts;
	  }

	  public Collection<Site> getSites() {
	    return sites;
	  }

	public int getNumberOfEmployees() {
		return numberOfEmployees;
	}
	  
}

package com.crm.app.repository;

import com.crm.app.model.persistance.Address;
import com.crm.app.model.persistance.Client;
import com.crm.app.model.persistance.Contact;
import com.crm.app.model.persistance.ContactTypeEnum;
import com.crm.app.model.persistance.Email;
import com.crm.app.model.persistance.Organization;
import com.crm.app.model.persistance.Phone;
import com.crm.app.model.persistance.Site;
import com.crm.app.model.persistance.TitleTypeEnum;
import com.crm.core.BaseRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public class ClientRepository extends BaseRepository {

  /**
   * insert Organization
   *
   * @param organization
   * @return new organization id
   */
  public String insertClient(Client client) {
    getMongoOperations().insert(client);
    return client.getId();
  }
    
  /**
   * insert Organization
   *
   * @param organization
   * @return new organization id
   */
  public String insertOrganization(Organization organization) {
    getMongoOperations().insert(organization);
    return organization.getId();
  }
  
  public static void main(String[] args) throws JsonProcessingException {
    Phone p1 = new Phone("Phone_ID1", ContactTypeEnum.MAIN, "+028-3457-980");
    Phone p2 = new Phone("Phone_ID2", ContactTypeEnum.SECONDARY, "+028-2563-880");
    List<Phone> phones = new ArrayList<>(Arrays.asList(p1, p2));
    
    Email m1 = new Email("Email_ID1", ContactTypeEnum.MAIN, "dxcvn@dxc.com");
    Email m2 = new Email("Email_ID2", ContactTypeEnum.SECONDARY, "excitingdxc@dxc.com");
    List<Email> emails = new ArrayList<>(Arrays.asList(m1, m2));
    
    Address address1 = new Address("Address_ID1", "Cong Hoa", 364, "HCM", "HCM", "Vietnam", 70000);
    Address address2 = new Address("Address_ID2", "Nguyen Trai", 108, "HCM", "HCM", "Vietnam", 70000);
    List<Address> addresses = new ArrayList<>(Arrays.asList(address1, address2));
    
    Contact ct1 = new Contact("Contact_ID1", "Freg", "MC", TitleTypeEnum.TITLE1, "https://domain.com/photo_ID1", 
            phones, emails, Collections.emptyList());
    Contact ct2 = new Contact("Contact_ID1", "Michael ", "MC", TitleTypeEnum.TITLE2, "https://domain.com/photo_ID2", 
            phones, emails, Collections.emptyList());
    List<Contact> contacts = new ArrayList<>(Arrays.asList(ct1, ct2));
    
    List<String> photoUrls = new ArrayList<>(Arrays.asList("https://domain.com/photo_ID1", "https://domain.com/photo_ID2"));
    Site site1 = new Site("Site_ID1", "Nguyen Trai Office", addresses, photoUrls);
    Site site2 = new Site("Site_ID2", "Etown Office", addresses, photoUrls);
    List<Site> sites = new ArrayList<>(Arrays.asList(site1, site2));
    
    Client client = new Client("Client_ID", "DXC Technology", "IT", "Software", 1200000000, phones, emails, address1, 
            contacts, sites);
    
    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
    String jsonString = ow.writeValueAsString(client);
    System.out.println(jsonString);
  }
}

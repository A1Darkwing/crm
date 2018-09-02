package com.crm.app.repository;

import com.crm.app.model.persistance.Address;
import com.crm.app.model.persistance.Client;
import com.crm.app.model.persistance.Contact;
import com.crm.app.model.persistance.ContactTypeEnum;
import com.crm.app.model.persistance.Email;
import com.crm.app.model.persistance.Phone;
import com.crm.app.model.persistance.Site;
import com.crm.app.model.persistance.TitleTypeEnum;
import com.crm.app.model.view.ClientRequest;
import com.crm.core.BaseRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.mongodb.WriteResult;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class ClientRepository extends BaseRepository {

  public List<Client> getClients() {
    
    List<Client> clients = getMongoOperations().findAll(Client.class, "Clients");
    
    return clients;
  }
  
  /**
   * insert Client
   *
   * @param Client
   * @return new Client id
   */
  public String insertClient(Client client) {
    getMongoOperations().insert(client);
    return client.getId();
  }
  
  /**
   * Remove Client
   * @param clientId
   * @return boolean
   */
	public boolean removeClient(String clientId) {
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").is(clientId));
		WriteResult result = getMongoOperations().remove(query, Client.class);
    return result.wasAcknowledged();
	}
	
	/**
	 * Update Client
	 * 
	 * @param updateRequest ClientRequest
	 * @return boolean
	 */
	public boolean updateClient(ClientRequest updateRequest) {
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").is(updateRequest.getId()));
		Update update = new Update();
		update.set("company", updateRequest.getCompany());
		update.set("domain", updateRequest.getDomain());
		update.set("industry", updateRequest.getIndustry());
		update.set("annualRevenue", updateRequest.getAnnnualRevenue());
		update.set("phones", updateRequest.getPhones());
		update.set("emails", updateRequest.getEmails());
		update.set("address", updateRequest.getAddress());
		update.set("contacts", updateRequest.getContacts());
		update.set("sites", updateRequest.getSites());
		
		WriteResult result = getMongoOperations().updateFirst(query, update, Client.class);
		return result.isUpdateOfExisting();
	}
    
  public static void main(String[] args) throws JsonProcessingException {
    Phone p1 = new Phone(ContactTypeEnum.MAIN, "+028-3457-980");
    Phone p2 = new Phone(ContactTypeEnum.SECONDARY, "+028-2563-880");
    List<Phone> phones = new ArrayList<>(Arrays.asList(p1, p2));
    
    Email m1 = new Email(ContactTypeEnum.MAIN, "dxcvn@dxc.com");
    Email m2 = new Email(ContactTypeEnum.SECONDARY, "excitingdxc@dxc.com");
    List<Email> emails = new ArrayList<>(Arrays.asList(m1, m2));
    
    Address address1 = new Address("Cong Hoa", 364, "HCM", "HCM", "Vietnam", 70000);
    Address address2 = new Address("Nguyen Trai", 108, "HCM", "HCM", "Vietnam", 70000);
    List<Address> addresses = new ArrayList<>(Arrays.asList(address1, address2));
    
    Contact ct1 = new Contact("Freg", "MC", TitleTypeEnum.TITLE1, "https://domain.com/photo_ID1", 
            phones, emails, Collections.emptyList());
    Contact ct2 = new Contact("Michael ", "MC", TitleTypeEnum.TITLE2, "https://domain.com/photo_ID2", 
            phones, emails, Collections.emptyList());
    List<Contact> contacts = new ArrayList<>(Arrays.asList(ct1, ct2));
    
    List<String> photoUrls = new ArrayList<>(Arrays.asList("https://domain.com/photo_ID1", "https://domain.com/photo_ID2"));
    Site site1 = new Site("Nguyen Trai Office", addresses, photoUrls);
    Site site2 = new Site("Etown Office", addresses, photoUrls);
    List<Site> sites = new ArrayList<>(Arrays.asList(site1, site2));
    
    Client client = new Client("DXC Technology", "IT", "Software", 1200000000, phones, emails, address1, 
            contacts, sites);
    
    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
    String jsonString = ow.writeValueAsString(client);
    System.out.println(jsonString);
  }
}

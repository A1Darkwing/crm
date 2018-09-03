package com.crm.app.service;

import com.crm.app.model.persistance.Client;
import com.crm.app.model.view.ClientRequest;
import com.crm.app.model.view.ClientResponse;
import com.crm.app.model.view.GetClientsResponse;
import com.crm.app.repository.ClientRepository;

import java.util.ArrayList;
import java.util.Collection;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

  @Autowired
  private ClientRepository clientRepository;


  /**
   * Get Clients
   * @return GetClientsResponse
   */
  public GetClientsResponse getClients() {
    Collection<Client> clients = clientRepository.getClients();
    Collection<ClientResponse> clientsResponse = new ArrayList<ClientResponse>();
    for (Client client : clients) {
      ClientResponse clientResponse = new ClientResponse(client.getId(), client);
      clientsResponse.add(clientResponse);
    }

    return new GetClientsResponse(clientsResponse);
  }
  
  public String saveClient(ClientRequest request) {
	    Client client = new Client(request.getCompany(), request.getDomain(), 
	    		request.getIndustry(), request.getAnnnualRevenue(), 
	    		request.getNumberOfEmployees() ,request.getPhones(), request.getEmails(), request.getAddress(), 
	            request.getContacts(), request.getSites());
	  return clientRepository.insertClient(client);
  }
  
  /**
   * Remove Client
   *
   * @param clientId String
   * @return boolean
   */
  public boolean removeClient(String clientId) {

    boolean result =  clientRepository.removeClient(clientId);
    return result;
  }
  
  /**
   * update Client
   * @param updateRequest ClientRequest
   * @return ClientResponse
   */
  public ClientResponse updateCharityField(ClientRequest updateRequest) {
    if (updateRequest == null || StringUtils.isBlank(updateRequest.getId())) {
      return new ClientResponse();
    }
    boolean result = clientRepository.updateClient(updateRequest);
    return new ClientResponse();
  }
}

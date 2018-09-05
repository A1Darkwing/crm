package com.crm.app.service;

import com.crm.ApplicationProperties;
import com.crm.app.model.persistance.Client;
import com.crm.app.model.persistance.Contact;
import com.crm.app.model.persistance.Site;
import com.crm.app.model.view.ClientRequest;
import com.crm.app.model.view.ClientResponse;
import com.crm.app.model.view.GetClientsResponse;
import com.crm.app.repository.ClientRepository;
import com.crm.core.common.AppConstant;
import com.crm.core.common.ApplicationUtils;
import com.crm.core.processor.ImageProcessor;
import com.crm.core.processor.ImageProcessor.ImageProcessorException;
import com.crm.core.processor.ImageProcessorBuilder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ClientService {

  @Autowired
  private ApplicationProperties appProperties;
  
  @Autowired
  private ClientRepository clientRepository;

  private ImageProcessor imgClientProcessor;
  
  @PostConstruct
  public void init() {
    ImageProcessorBuilder imgClientBuilder = new ImageProcessorBuilder(NumberUtils.toInt("8000000"),
            AppConstant.ALLOW_TYPE_EXT, AppConstant.ALLOW_TYPE_MIME);
    // Normal upload process.
    imgClientBuilder = imgClientBuilder.addImageMeta("C:/images/", false,
            NumberUtils.toInt("1200"),
            NumberUtils.toInt("1200"));
    imgClientProcessor = imgClientBuilder.build();
  }

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
  
  public ClientResponse saveClientAndImage(ClientRequest request, MultipartFile[] files) throws IOException, ImageProcessorException {
    if (files != null ) {
      for (Contact contact : request.getContacts()) {
        if (contact.getImageIndex() != null && files.length >= contact.getImageIndex()) {
          String imageId = ApplicationUtils.generateImageName();
          MultipartFile file = files[contact.getImageIndex()];
          imgClientProcessor.upload(file, imageId);
          contact.setImageId(imageId);
        }
      }
      
      for (Site site : request.getSites()) {
        if (site.getImageIndex() != null && files.length >= site.getImageIndex()) {
          String imageId = ApplicationUtils.generateImageName();
          MultipartFile file = files[site.getImageIndex()];
          imgClientProcessor.upload(file, imageId);
          site.setImageId(imageId);
        }
      }
    }
    Client client = new Client(request.getCompany(), request.getDomain(), 
        request.getIndustry(), request.getAnnnualRevenue(), 
        request.getNumberOfEmployees() ,request.getPhones(), request.getEmails(), request.getAddress(), 
            request.getContacts(), request.getSites());
    String clientId =  clientRepository.insertClient(client);
    client.setId(clientId);
    return new ClientResponse(clientId, client);
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
  public ClientResponse updateClient(ClientRequest updateRequest) {
    if (updateRequest == null || StringUtils.isBlank(updateRequest.getId())) {
      return new ClientResponse();
    }
    boolean result = clientRepository.updateClient(updateRequest);
    return new ClientResponse();
  }
}

package com.crm.app.model.view;

import java.util.Collection;

public class GetClientsResponse {

  private Collection<ClientResponse> clientsResponse;

  public GetClientsResponse() {};

  public GetClientsResponse(Collection<ClientResponse> clientsResponse) {
    this.clientsResponse = clientsResponse;
  }

  public Collection<ClientResponse> getClientsResponse() {
    return clientsResponse;
  }

  public void setClientsResponse(Collection<ClientResponse> clientsResponse) {
    this.clientsResponse = clientsResponse;
  }

  
}

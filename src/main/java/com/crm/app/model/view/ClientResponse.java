package com.crm.app.model.view;

import com.crm.app.model.persistance.Client;

public class ClientResponse {

  private String id;
  private Client client;
  
  public ClientResponse() {}

	public String getId() {
		return id;
	}
	
	public Client getClient() {
		return client;
	}
	
	public ClientResponse(String id, Client client) {
		super();
		this.id = id;
		this.client = client;
	};

  
}

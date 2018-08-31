/**
 *
 */
package com.crm.app.service;

import com.crm.app.model.persistance.Organization;
import com.crm.app.repository.ClientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

  @Autowired
  private ClientRepository organizationRepository;


  public void saveBlog(Organization org) {
	  organizationRepository.insertOrganization(org);
  }
}

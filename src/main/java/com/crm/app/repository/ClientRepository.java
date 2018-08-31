package com.crm.app.repository;

import com.crm.app.model.persistance.Organization;
import com.crm.core.BaseRepository;

import org.springframework.stereotype.Repository;

@Repository
public class ClientRepository extends BaseRepository {

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


}

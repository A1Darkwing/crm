package com.crm.app.controller.rest;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.crm.app.model.view.ClientRequest;
import com.crm.app.model.view.ClientResponse;
import com.crm.app.model.view.GetClientsResponse;
import com.crm.app.service.ClientService;
import com.crm.core.model.JsonResponse;

@RestController
@RequestMapping(value = "/client/data/")
public class ClientRestController {

  @Autowired
  ClientService clientService;
  
  @GetMapping("/insert")
  public JsonResponse<Object> clientInsert(@RequestParam ClientRequest request ) {
    return JsonResponse.accept(clientService.saveClient(request));
  }
  
  /**
   * load all clients
   *    
   * @return getCharityFieldsResponse
   */
  @GetMapping("/getClients")
  public JsonResponse<Object> getClients() {
    GetClientsResponse loadCharityFieldsResponse = clientService.getClients();
    return JsonResponse.accept(loadCharityFieldsResponse);
  }
}

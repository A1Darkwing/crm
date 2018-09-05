package com.crm.app.controller.rest;



import java.io.IOException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.crm.app.model.persistance.Client;
import com.crm.app.model.view.ClientRequest;
import com.crm.app.model.view.ClientResponse;
import com.crm.app.model.view.GetClientsResponse;
import com.crm.app.service.ClientService;
import com.crm.core.model.JsonResponse;
import com.crm.core.processor.ImageProcessor.ImageProcessorException;

@RestController
@RequestMapping(value = "/client/data/")
public class ClientRestController {

  @Autowired
  ClientService clientService;
  
  @GetMapping("/init")
  public JsonResponse<Object> initClient() {
    return JsonResponse.accept(new Client());
  }
  
  /**
   * load all clients
   *    
   * @return getCLientsResponse
   */
  @GetMapping("/getClients")
  public JsonResponse<Object> getClients() {
    GetClientsResponse loadCLientsResponse = clientService.getClients();
    return JsonResponse.accept(loadCLientsResponse);
  }
  
  @PostMapping("/insert")
  public JsonResponse<Object> clientInsert(@RequestBody ClientRequest createRequest) {
    String resultId = clientService.saveClient(createRequest);
    return JsonResponse.accept(resultId);
  }
  
  @PostMapping("/save")
  public JsonResponse<Object> clientInsert(@RequestPart(value = "files", required = false) MultipartFile[] files, 
      @RequestPart("attr") ClientRequest createRequest) throws IOException, ImageProcessorException {
    ClientResponse result = clientService.saveClientAndImage(createRequest, files);
    return JsonResponse.accept(result);
  }
  
  @PostMapping("/remove")
  public JsonResponse<Object> clientRemove(@RequestBody String clientId) {
    boolean result = clientService.removeClient(clientId);
    return JsonResponse.accept(result);
  }
  
  @PostMapping("/update")
  public JsonResponse<Object> clientUpdate(@RequestBody ClientRequest createRequest) {
	  ClientResponse result = clientService.updateClient(createRequest);
    return JsonResponse.accept(result);
  }
}

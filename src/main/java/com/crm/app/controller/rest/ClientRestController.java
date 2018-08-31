package com.crm.app.controller.rest;


import javax.validation.Valid;

import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import com.crm.app.model.view.ClientRequest;
import com.crm.app.model.view.ClientResponse;
import com.crm.core.model.JsonResponse;

@RestController
@RequestMapping(value = "/client/data/")
public class ClientRestController {

  @PostMapping("/insert")
  public JsonResponse<Object> clientInsert(@RequestBody @Valid ClientRequest createRequest, Errors errors) {

    return JsonResponse.accept("Hello World");
  }
  
  @GetMapping("/get")
  public JsonResponse<Object> getClient(){

    return JsonResponse.accept(new ClientResponse());
  }
}

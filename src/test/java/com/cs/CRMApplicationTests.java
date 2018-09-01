package com.cs;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.crm.app.model.view.GetClientsResponse;
import com.crm.app.service.ClientService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CRMApplicationTests {

	@Autowired
	  ClientService clientService;
	
	@Test
	public void contextLoads() {
		GetClientsResponse r = clientService.getClients();
		System.out.println(r);
	}

}

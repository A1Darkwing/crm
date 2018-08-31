package com.crm;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.crm.core.servlet.*;

@Configuration
public class ServletInitializer extends SpringBootServletInitializer {

  @Override
  protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
    return application.sources(CRMApplication.class);
  }

  @Bean
  public ServletRegistrationBean organizationAboutServletRegistrationBean() {
    ServletRegistrationBean imageServlet = new ServletRegistrationBean(new ClientImageServlet(), 
        "/images/organization/about/*");
    imageServlet.setName("organizationAboutImage");
    return imageServlet;
  }
  

}

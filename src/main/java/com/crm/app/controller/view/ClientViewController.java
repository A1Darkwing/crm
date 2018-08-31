package com.crm.app.controller.view;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping(value = "/client")
public class ClientViewController {

  private final static String VIEW_BASE_MAIN = "client";

  @GetMapping("")
  public String mainIndexPage() throws IOException {
    return "redirect:/client/dashboard";
  }

  @GetMapping("/dashboard")
  public String clientDashboardPage() {
    return VIEW_BASE_MAIN + "/dashboard/index";
  }

  @GetMapping("/dashboard/dashboard")
  public String dashboardDashboardPage() {
    return VIEW_BASE_MAIN + "/dashboard/dashboard-dashboard";
  }
  
  @GetMapping("/organization")
  public String adminOrganizationPage() {
    return VIEW_BASE_MAIN + "/organization/index";
  }
  
  @GetMapping("/organization/charityfield")
  public String organizationCharityFieldPage() {
    return VIEW_BASE_MAIN + "/organization/organization-charityfield";
  }
  
}
